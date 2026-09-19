/* ============================================================================
   INS2053 — instructor verification runtime (kiem-tra-bai.html).

   The build inlines three things above this file:
     const RUBRICS  = … (the fifteen rubrics, same build as cham-bai.html)
     const M_*      = … (html-parse, css-parse, checks, grade — same wrappers)
     const PAYLOADS = … (the handed-in JSONs, `submission` bytes included)

   Everything below reads from those. Two rules carried over from ui.js:
     1. Student work is DATA: every string reaches the DOM through textContent.
     2. Nothing is fetched, nothing is sent — the page is a closed report.

   Verification per payload, same recipe as regrade.mjs / scoresheet.mjs:
     a. SHA-256 over canonicalBytes(submission) — first 8 hex chars;
     b. gradeSubmission(rubric, buildContext(submission)) — the machine score;
   and the flags mirror scoresheet.mjs exactly, so the table here and the CSV
   there can never disagree about which file to distrust.
   ============================================================================ */

const { canonicalBytes, buildContext, gradeSubmission } = M_grade;

const el = (tag, opts = {}, kids = []) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(opts)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "text") node.textContent = String(v);
    else if (k === "class") node.className = String(v);
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  for (const kid of [].concat(kids)) if (kid) node.appendChild(kid);
  return node;
};

const fill = (node, kids) => {
  while (node.firstChild) node.removeChild(node.firstChild);
  for (const kid of [].concat(kids)) if (kid) node.appendChild(kid);
};

const $ = (id) => document.getElementById(id);

const fmt = (n) =>
  n === null || n === undefined || Number.isNaN(n) ? "—" : String(Math.round(Number(n) * 100) / 100);

const near = (a, b) => Math.abs(Number(a ?? 0) - Number(b ?? 0)) <= 0.005;

/* crypto.subtle is unavailable on some file:// setups. Say so rather than
   printing a fake hash that would survive tampering. */
async function sha256_8(text) {
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 8);
  } catch {
    return null;
  }
}

/* --- verify every payload once on load -------------------------------------- */

const VERDICTS = new Map(); // payload index -> verified record

async function verifyAll() {
  for (let i = 0; i < PAYLOADS.length; i++) {
    const p = PAYLOADS[i];
    const sessionKey = String(p.session ?? "").padStart(2, "0");
    const rubric = RUBRICS[sessionKey];
    const files = Array.isArray(p.submission) ? p.submission : [];
    const rec = { sessionKey, rubric, files, flags: [], ok: false };

    if (!rubric) {
      rec.error = `Không có rubric cho buổi ${p.session} — file không chấm được.`;
      rec.flags.push("KHÔNG-CÓ-RUBRIC");
      VERDICTS.set(i, rec);
      continue;
    }
    if (!files.length) {
      rec.error = "JSON không có mục submission (phiên bản công cụ cũ).";
      rec.flags.push("KHÔNG-CÓ-BÀI");
      VERDICTS.set(i, rec);
      continue;
    }

    /* a. digest — the tamper check */
    const digest = await sha256_8(canonicalBytes(files));
    rec.digest = digest;
    if (!p.contentDigestSha256) rec.flags.push("KHÔNG-CÓ-SHA");
    else if (digest === null) rec.flags.push("SHA-KHÔNG-TÍNH-ĐƯỢC");
    else if (p.contentDigestSha256 !== digest) rec.flags.push("SỬA-SAU-KHI-CHẤM");

    /* b. re-grade — the rubric-drift / doctored-report check */
    const report = gradeSubmission(rubric, buildContext(files));
    rec.report = report;
    const stored = p.report ?? {};
    if (!near(stored.autoAwarded, report.autoAwarded) || !near(stored.autoPoints, report.autoPoints)) {
      rec.flags.push(`CHẤM-LẠI-LỆCH ${fmt(report.autoAwarded)}/${fmt(report.autoPoints)}`);
    }

    rec.ok = !rec.flags.length;
    VERDICTS.set(i, rec);
  }
}

/* --- grouping ---------------------------------------------------------------- */

function groupBySession() {
  const map = new Map();
  PAYLOADS.forEach((p, i) => {
    const rec = VERDICTS.get(i);
    const key = rec?.sessionKey ?? String(p.session ?? "??").padStart(2, "0");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(i);
  });
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

/* --- rendering: class summary ------------------------------------------------ */

function flagSpans(flags) {
  return flags.map((f) =>
    el("span", {
      class: `flag ${f === "SỬA-SAU-KHI-CHẤM" || f.startsWith("CHẤM-LẠI-LỆCH") ? "bad" : "warn"}`,
      text: f,
    }));
}

function summaryRow(i) {
  const p = PAYLOADS[i];
  const rec = VERDICTS.get(i);
  const s = p.student ?? {};
  const mssv = s.id || "(không MSSV)";
  const verdictCell = rec && !rec.error
    ? rec.ok
      ? [el("span", { class: "flag good", text: "KHỚP" })]
      : flagSpans(rec.flags)
    : [el("span", { class: "flag bad", text: "LỖI" })];
  return el("tr", { "data-mssv": mssv.toLowerCase() }, [
    el("td", { text: mssv }),
    el("td", { text: s.name || "(không tên)" }),
    el("td", { text: s.class || s.klass || "—" }),
    el("td", { class: "pts", text: rec?.report ? `${fmt(rec.report.autoAwarded)}/${fmt(rec.report.autoPoints)}` : "—" }),
    el("td", { class: "pts", text: rec?.report ? `${fmt(rec.report.manualPoints)}m` : "—" }),
    el("td", { class: "pts", text: rec?.report ? fmt(rec.report.blockedPoints) : "—" }),
    el("td", { class: "iso", text: p.gradedAt?.iso ?? "—" }),
    el("td", { class: "flags" }, verdictCell),
    el("td", {}, [el("button", { type: "button", "data-open": i, text: "Xem bài" })]),
  ]);
}

function sessionSection([key, indexes]) {
  const rubric = RUBRICS[key];
  const verified = indexes.map((i) => VERDICTS.get(i)).filter((r) => r?.report);
  const sum = (pick) => verified.reduce((acc, r) => acc + (Number(pick(r.report)) || 0), 0);
  const flagged = indexes.filter((i) => !VERDICTS.get(i)?.ok).length;

  return el("details", { class: "hw" }, [
    el("summary", {}, [
      el("span", { class: "s-title", text: `Buổi ${key} — ${rubric?.title ?? "?"}` }),
      el("span", { class: "s-meta", text: `${indexes.length} bài nộp${flagged ? ` · ${flagged} cần xem` : " · tất cả khớp"}` }),
    ]),
    el("div", { class: "s-body" }, [
      el("p", { class: "note", text:
        verified.length
          ? `Tổng máy chốt: ${fmt(sum((r) => r.autoAwarded))} / ${fmt(sum((r) => r.autoPoints))} điểm máy · ` +
            `MANUAL còn lại: ${fmt(sum((r) => r.manualPoints))} đ · chưa chấm được: ${fmt(sum((r) => r.blockedPoints))} đ. ` +
            "Điểm cuối mỗi bài do giảng viên chốt."
          : "Không có bài hợp lệ nào trong buổi này." }),
      el("table", { class: "rubric" }, [
        el("thead", {}, [el("tr", {}, [
          el("th", { text: "MSSV" }),
          el("th", { text: "Họ tên" }),
          el("th", { text: "Lớp" }),
          el("th", { title: "Điểm máy chấm lại (auto + assist)", text: "Máy" }),
          el("th", { title: "Điểm MANUAL giảng viên phải chấm", text: "m" }),
          el("th", { title: "Điểm bị chặn vì thiếu file (không trừ)", text: "chặn" }),
          el("th", { text: "gradedAt (ISO)" }),
          el("th", { text: "Kiểm tra" }),
          el("th", { text: "" }),
        ])]),
        el("tbody", {}, indexes.map(summaryRow)),
      ]),
      el("div", { class: "cards" }, indexes.map(resultCard)),
    ]),
  ]);
}


/* --- rendering: per-paper result card ----------------------------------------- */

function resultCard(i) {
  const p = PAYLOADS[i];
  const rec = VERDICTS.get(i);
  const s = p.student ?? {};
  const report = rec?.report;
  const card = el("div", { class: "card", id: `bai-${i}` });

  if (!rec || rec.error) {
    card.appendChild(el("div", { class: "alert error" }, [
      el("b", { text: `${p._file ?? "?"}: ${rec?.error ?? "không kiểm tra được — xem ghi chú ở bảng."}` }),
    ]));
    return card;
  }

  const head = el("div", { class: "card-head" }, [
    el("div", { class: "title" }, [
      el("div", { class: "session", text: `INS2053 — Buổi ${rec.sessionKey}` }),
      el("div", { class: "hw", text: rec.rubric?.title ?? `Homework ${rec.sessionKey}` }),
      el("div", { class: "meta", text: `File nộp: ${p._file ?? "?"} · công cụ v${p.tool?.version ?? "?"}` }),
    ]),
    el("div", { class: "who" }, [
      el("div", { class: "name", text: s.name || "(không tên)" }),
      el("div", { class: "meta", text: `MSSV: ${s.id || "—"} · Lớp: ${s.class || s.klass || "—"}` }),
    ]),
    el("div", { class: "bigscore" }, [
      el("div", {}, [
        el("span", { class: "num", text: fmt(report.autoAwarded) }),
        el("span", { class: "den", text: ` / ${fmt(report.autoPoints)}` }),
      ]),
      el("div", { class: "cap", text: "máy chấm lại (auto + assist)" }),
    ]),
  ]);

  const verdict = rec.ok
    ? el("div", { class: "alert ok" }, [el("b", { text: "KHỚP — SHA và điểm máy xác nhận JSON không bị sửa" })])
    : el("div", { class: "alert error" }, [
        el("b", { text: "KHÔNG KHỚP — xem các flag trước khi tin điểm" }),
        ...rec.flags.map((f) => el("div", { text: `• ${f}` })),
      ]);

  const prov = el("div", { class: "provenance" }, [
    el("span", { text: `Chấm lần đầu: ${p.gradedAt?.local ?? "—"} (UTC ${p.gradedAt?.iso ?? "—"})` }),
    el("span", { text: `Nguồn: ${p.source ?? "—"}` }),
    el("span", {}, [
      document.createTextNode("SHA-256 JSON ghi: "),
      el("code", { text: p.contentDigestSha256 ?? "(không có)" }),
    ]),
    el("span", {}, [
      document.createTextNode("SHA-256 tính lại: "),
      el("code", { text: rec.digest ?? "không tính được trên trình duyệt này" }),
    ]),
    el("span", { text: `Rubric v${rec.rubric?.version ?? "1"} · ${report.fileCount} file đã đọc` }),
  ]);


  const table = el("table", { class: "rubric" }, [
    el("caption", { text: "Từng tiêu chí — chấm lại tại thời điểm mở trang" }),
    el("thead", {}, [el("tr", {}, [
      el("th", { scope: "col", text: "Tiêu chí và nhận xét" }),
      el("th", { scope: "col", text: "Tier" }),
      el("th", { scope: "col", text: "Đạt" }),
      el("th", { scope: "col", text: "Điểm" }),
    ])]),
    el("tbody", {}, (report.rows ?? []).map((r) => {
      const tier = r.tier ?? "auto";
      const pts = r.state === "graded" ? `${fmt(r.awarded)} / ${fmt(r.points)}` : `— / ${fmt(r.points)}`;
      const stateWord = r.state === "manual"
        ? "Người chấm"
        : r.state === "blocked"
          ? "Chưa có file"
          : `${fmt(Math.round((r.ratio ?? 0) * 100))}%`;
      const detail = el("td", {}, [el("b", { text: r.criteria })]);
      const checks = (r.checks ?? []).filter((c) => c.detail);
      if (checks.length && r.state !== "manual") {
        detail.appendChild(el("ul", { class: "checks" }, checks.map((c) => {
          const mark = c.score01 === null ? "?" : c.score01 === 1 ? "✓" : c.score01 > 0 ? "~" : "✗";
          return el("li", { class: c.score01 === null ? "miss" : null, text: `${mark} ${c.detail}` });
        })));
      }
      return el("tr", {}, [
        detail,
        el("td", {}, [el("span", { class: `tier ${tier}`, text: tier.toUpperCase() })]),
        el("td", { class: "pts" }, [el("span", { class: `state ${r.state}`, text: stateWord })]),
        el("td", { class: "pts", text: pts }),
      ]);
    })),
  ]);

  card.append(head, verdict, prov, table);
  return card;
}

/* --- search + init ------------------------------------------------------------ */

function applyFilter(q) {
  const query = q.trim().toLowerCase();
  document.querySelectorAll("table.rubric tbody tr[data-mssv]").forEach((tr) => {
    tr.hidden = query ? !tr.dataset.mssv.includes(query) : false;
  });
  document.querySelectorAll("details.hw").forEach((d) => { d.open = Boolean(query); });
}

async function init() {
  await verifyAll();
  fill($("summary"), groupBySession().map(sessionSection));

  const ok = [...VERDICTS.values()].filter((r) => r.ok).length;
  $("count").textContent =
    `${PAYLOADS.length} bài nộp, ${groupBySession().length} buổi — ` +
    `${ok} KHỚP, ${PAYLOADS.length - ok} cần xem. ` +
    "Điểm máy dưới đây được CHẤM LẠI ngay trong trang, cùng cơ chế regrade.mjs / scoresheet.mjs.";

  $("q").addEventListener("input", (e) => applyFilter(e.target.value));

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    const card = $(`bai-${btn.getAttribute("data-open")}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 1600);
    }
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

