/* =============================================================================
   INS2053 grader — browser UI.

   Concatenated into cham-bai.html by _tools/build-grader.mjs, which strips the
   import line below and prepends `const RUBRICS = { "01": {...}, … }` built from
   _tools/grader/rubrics/*.json. This file therefore does not run on its own in
   Node; grade.js and checks.js do, and they hold all the scoring logic.

   Two rules shape every line here:

   1. Student work is DATA, never markup and never code. Nothing from a
      submission is ever assigned to .innerHTML, passed to DOMParser, written
      into an <iframe>, or evaluated. Every visible string goes through
      textContent, so a class named `</div><script>` renders as those characters.
      That is why this file builds nodes with document.createElement instead of
      template strings — the safe path has to be the only path available.

   2. Nothing leaves the machine except two GitHub reads the marker explicitly
      asked for. No analytics, no telemetry, no beacon.

   What this file does NOT decide: any score. It renders what gradeSubmission()
   returned and nothing else.
   ============================================================================= */

import { buildContext, gradeSubmission, validateRubric, canonicalBytes, isTextPath } from "./grade.js";

const TOOL_VERSION = "1.0.0";

/* --- tiny DOM helpers ------------------------------------------------------ */

/**
 * Build an element. `text` is always set through textContent, so callers cannot
 * accidentally inject markup even when the string came from a submission.
 *
 *   el("td", { class: "pts", text: "3 / 3" })
 *   el("ul", {}, items.map((s) => el("li", { text: s })))
 */
function el(tag, opts = {}, kids = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(opts)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "text") node.textContent = String(v);
    else if (k === "class") node.className = String(v);
    else node.setAttribute(k, v === true ? "" : String(v));
  }
  for (const kid of [].concat(kids)) {
    if (kid) node.appendChild(kid);
  }
  return node;
}

/** Replace a container's children. */
function fill(node, kids) {
  while (node.firstChild) node.removeChild(node.firstChild);
  for (const kid of [].concat(kids)) if (kid) node.appendChild(kid);
}

const $ = (id) => document.getElementById(id);

/** Two decimals, but only when they carry information: 3 not 3.00, 2.5 not 2.50. */
const fmt = (n) =>
  n === null || n === undefined || Number.isNaN(n)
    ? "—"
    : String(Math.round(Number(n) * 100) / 100);

/* --- state ---------------------------------------------------------------- */

const state = {
  /** [{ id, path, text }] — the paste-code tab's editors. */
  editors: [],
  /** Files loaded from a folder pick or from GitHub; overrides the editors. */
  loaded: null,
  /** Where `loaded` came from, printed on the card for provenance. */
  loadedFrom: null,
  /** Last report, kept for the JSON download: `{ report, meta, files }`. */
  last: null,
  seq: 0,
};

const SESSION_KEYS = Object.keys(RUBRICS).sort();

/* --- messages ------------------------------------------------------------- */

function say(kind, title, lines) {
  const box = el("div", { class: kind === "error" ? "alert error" : "alert" }, [
    el("b", { text: title }),
  ]);
  for (const line of [].concat(lines ?? [])) {
    box.appendChild(el("div", { text: line }));
  }
  $("messages").appendChild(box);
}


/* --- session picker -------------------------------------------------------- */

function initSessionPicker() {
  const sel = $("session");
  fill(sel, SESSION_KEYS.map((k) => {
    const r = RUBRICS[k];
    // Rubric titles stay in English: the students read the English rubric sheet.
    return el("option", { value: k, text: `${k} — ${r.title ?? ""}`.trim() });
  }));
  sel.value = SESSION_KEYS[0];
}

const currentRubric = () => RUBRICS[$("session").value];

/* --- paste-code editors ---------------------------------------------------- */

function addEditor(path, text = "") {
  state.editors.push({ id: ++state.seq, path, text });
  renderEditors();
}

function renderEditors() {
  fill($("files"), state.editors.map((f, i) => {
    const nameId = `f-path-${f.id}`;
    const areaId = `f-text-${f.id}`;
    // Whether the box is needed follows the path the student typed, live: rename
    // "hero.png" to "hero.html" and the box turns into a real editor.
    const asset = !isTextPath(f.path);

    const nameInput = el("input", {
      type: "text", id: nameId, value: f.path,
      autocomplete: "off", spellcheck: "false",
    });
    nameInput.addEventListener("input", () => {
      f.path = nameInput.value;
      if (!isTextPath(f.path) !== asset) renderEditors();
    });

    const area = el("textarea", { id: areaId, spellcheck: "false" });
    area.value = f.text;
    area.addEventListener("input", () => { f.text = area.value; });

    const remove = el("button", { type: "button", text: "Xoá file này" });
    remove.addEventListener("click", () => {
      state.editors = state.editors.filter((x) => x.id !== f.id);
      if (!state.editors.length) addEditor("index.html");
      else renderEditors();
    });

    return el("div", { class: "filecard" }, [
      el("div", { class: "head" }, [
        el("div", { class: "field" }, [
          el("label", { for: nameId, text: `Đường dẫn file ${i + 1}` }),
          nameInput,
        ]),
        remove,
      ]),
      asset
        ? el("p", { class: "hint", text:
            "File ảnh / media — chỉ cần đường dẫn, không cần nội dung. Rubric chỉ kiểm tra file có tồn tại và link có trỏ đúng." })
        : el("div", { class: "field" }, [
            el("label", { for: areaId, text: "Nội dung file" }),
            area,
          ]),
    ]);
  }));
}

/* --- collecting the submission -------------------------------------------- */

/* TEXT_EXT and isTextPath come from grade.js: which extensions get read is a
   grading decision, and the Node fixture harness has to make the same one. */
const MAX_FILES = 40;
const MAX_BYTES_FILE = 512 * 1024;
const MAX_BYTES_TOTAL = 5 * 1024 * 1024;

const extOf = (p) => {
  const b = String(p).split("/").pop();
  const i = b.lastIndexOf(".");
  return i > 0 ? b.slice(i + 1).toLowerCase() : "";
};

/**
 * The file list to grade, plus a label describing where it came from.
 *
 * A folder pick or a GitHub load wins over the textareas, because that is the
 * more specific action the student just took. Switching back is one click on
 * "Xoá bài đã tải".
 *
 * A card whose path is an asset (`images/hero.png`) counts with an EMPTY box: an
 * image cannot be pasted as text, and the rubrics only ever ask whether the path
 * was submitted. Requiring content there would dock marks for a file the student
 * has no way to hand in through this tab.
 */
function collectFiles() {
  if (state.loaded && state.loaded.length) {
    return { files: state.loaded, from: state.loadedFrom };
  }
  const files = state.editors
    .map((f) => ({ path: String(f.path ?? "").trim(), text: f.text ?? "" }))
    .filter((f) => f.path && (f.text.trim() || !isTextPath(f.path)))
    .map((f) => ({ path: f.path, text: isTextPath(f.path) ? f.text : "" }));
  const bytes = files.reduce((s, f) => s + f.text.length, 0);
  return {
    files,
    from: `Dán code — ${files.length} file, ${(bytes / 1024).toFixed(1)} KB`,
  };
}

/**
 * Read a FileList (folder pick or drop), applying the hard limits.
 *
 * Text files are read. An image, video or font is KEPT AS A PATH with empty text,
 * because the rubrics ask "does `images/` exist" and "does this `src` resolve" —
 * questions a path answers. Dropping them silently cost real marks: a session-11
 * folder with five images and a favicon scored 9.38/10 instead of 10/10 for
 * "thiếu: images/", and the student had submitted the images.
 */
async function readLocalFiles(list) {
  const picked = [];
  let total = 0;
  const skipped = [];
  for (const file of list) {
    const path = String(file.webkitRelativePath || file.name).replace(/\\/g, "/");
    if (/(^|\/)(\.git|node_modules)(\/|$)/i.test(path)) continue;
    if (picked.length >= MAX_FILES) { skipped.push(`${path} — vượt ${MAX_FILES} file`); continue; }
    if (!isTextPath(path)) {
      // Asset: the name is the evidence, the bytes are irrelevant and unreadable
      // as text. Costs nothing against the byte budget.
      picked.push({ path, text: "" });
      continue;
    }
    if (file.size > MAX_BYTES_FILE) { skipped.push(`${path} — quá 512 KB`); continue; }
    if (total + file.size > MAX_BYTES_TOTAL) { skipped.push(`${path} — vượt tổng 5 MB`); continue; }
    total += file.size;
    picked.push({ path, text: await file.text() });
  }
  return { picked, skipped, total };
}


/* --- GitHub tab ------------------------------------------------------------
   Only two hosts are ever contacted, both confirmed to send
   Access-Control-Allow-Origin: *, so no proxy and no token are needed:

     api.github.com              — resolve the branch to a commit SHA, list the tree
     raw.githubusercontent.com   — read each file at that SHA

   Grading is pinned to one commit SHA rather than to a moving branch head, so
   re-grading the same submission later gives the same answer.
   -------------------------------------------------------------------------- */

const GH_TIMEOUT_MS = 15000;

/** Parse the three link shapes into { owner, repo, ref, dir }. */
function parseGitHubUrl(raw) {
  const url = String(raw ?? "").trim().replace(/[?#].*$/, "");
  if (!url) return { error: "Chưa dán link." };

  let m = url.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*)$/i);
  if (m) {
    const dir = m[4].split("/").slice(0, -1).join("/");
    return { owner: m[1], repo: m[2], ref: m[3], dir };
  }
  m = url.match(/^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)(?:\/(tree|blob)\/([^/]+)(?:\/(.*))?)?\/?$/i);
  if (m) {
    const isBlob = (m[3] ?? "").toLowerCase() === "blob";
    const rest = m[5] ?? "";
    return {
      owner: m[1],
      repo: m[2].replace(/\.git$/i, ""),
      ref: m[4] ?? null,
      dir: isBlob ? rest.split("/").slice(0, -1).join("/") : rest,
    };
  }
  return { error: "Link không đúng dạng GitHub. Ví dụ: https://github.com/tenban/repo/tree/main/project" };
}

/** fetch with a hard timeout, so a hung request cannot freeze the page. */
async function fetchWithTimeout(url, init = {}) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), GH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: ctl.signal, redirect: "follow" });
  } finally {
    clearTimeout(timer);
  }
}

/** Turn a rate-limited response into the one sentence the student can act on. */
function rateLimitMessage(res) {
  if (res.status !== 403 && res.status !== 429) return null;
  if (res.headers.get("x-ratelimit-remaining") !== "0") return null;
  const reset = Number(res.headers.get("x-ratelimit-reset") ?? 0);
  const when = reset
    ? new Date(reset * 1000).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    : "khoảng một giờ nữa";
  return `GitHub đã hết lượt tải cho mạng của bạn (60 lượt mỗi giờ). Chờ đến ${when}, hoặc chuyển sang tab "Dán code".`;
}

async function loadFromGitHub(raw) {
  const parsed = parseGitHubUrl(raw);
  if (parsed.error) return { error: parsed.error };
  const { owner, repo } = parsed;
  const dir = String(parsed.dir ?? "").replace(/^\/+|\/+$/g, "");
  const api = "https://api.github.com/repos/" + encodeURIComponent(owner) + "/" + encodeURIComponent(repo);

  let ref = parsed.ref;
  if (!ref) {
    const res = await fetchWithTimeout(api);
    const limited = rateLimitMessage(res);
    if (limited) return { error: limited };
    if (!res.ok) return { error: `Không đọc được repo (HTTP ${res.status}). Kiểm tra repo có public không.` };
    ref = (await res.json()).default_branch ?? "main";
  }

  // Resolve ref -> commit SHA first: everything after this is pinned.
  const refRes = await fetchWithTimeout(`${api}/commits/${encodeURIComponent(ref)}`);
  const refLimited = rateLimitMessage(refRes);
  if (refLimited) return { error: refLimited };
  if (!refRes.ok) return { error: `Không tìm thấy nhánh hoặc commit "${ref}" (HTTP ${refRes.status}).` };
  const sha = (await refRes.json()).sha;

  const treeRes = await fetchWithTimeout(`${api}/git/trees/${sha}?recursive=1`);
  const treeLimited = rateLimitMessage(treeRes);
  if (treeLimited) return { error: treeLimited };
  if (!treeRes.ok) return { error: `Không đọc được danh sách file (HTTP ${treeRes.status}).` };
  const tree = await treeRes.json();

  const prefix = dir ? dir + "/" : "";
  const inScope = (tree.tree ?? [])
    .filter((n) => n.type === "blob")
    .filter((n) => !prefix || n.path.startsWith(prefix))
    .filter((n) => !/(^|\/)(\.git|node_modules)(\/|$)/i.test(n.path));

  // Text files are downloaded; assets are recorded as paths only. That keeps
  // `images/` gradable without pulling megabytes of PNG through the browser, and
  // it is the same rule the folder picker uses.
  const wanted = inScope.filter((n) => isTextPath(n.path));
  const assets = inScope.filter((n) => !isTextPath(n.path));

  if (!wanted.length) {
    return { error: dir
      ? `Trong "${dir}" không có file .html/.css/.md nào.`
      : "Repo này không có file .html/.css/.md nào." };
  }
  if (inScope.length > MAX_FILES) {
    return { error: `Có ${inScope.length} file, vượt giới hạn ${MAX_FILES}. Dán link trỏ thẳng vào thư mục bài làm.` };
  }

  const rel = (p) => (prefix ? p.slice(prefix.length) : p);
  const files = assets.map((n) => ({ path: rel(n.path), text: "" }));
  let total = 0;
  for (const node of wanted) {
    if (node.size > MAX_BYTES_FILE) return { error: `${node.path} lớn hơn 512 KB.` };
    total += node.size ?? 0;
    if (total > MAX_BYTES_TOTAL) return { error: "Tổng dung lượng vượt 5 MB." };
    const rawUrl = "https://raw.githubusercontent.com/"
      + encodeURIComponent(owner) + "/" + encodeURIComponent(repo) + "/" + sha + "/"
      + node.path.split("/").map(encodeURIComponent).join("/");
    const res = await fetchWithTimeout(rawUrl);
    if (!res.ok) return { error: `Không tải được ${node.path} (HTTP ${res.status}).` };
    // Paths are made relative to the folder that was linked, so a rubric asking
    // for "index.html" matches "project/index.html" in the repo.
    files.push({ path: rel(node.path), text: await res.text() });
  }

  return {
    files,
    sha,
    from: `GitHub ${owner}/${repo}@${sha.slice(0, 7)}${dir ? " · " + dir : ""}`,
  };
}


/* --- provenance ------------------------------------------------------------
   The card is meant to be screenshotted and handed in, so it carries enough to
   re-grade the exact same bytes later: local time + ISO UTC, rubric and tool
   version, where the files came from, and a SHA-256 prefix of the graded
   content. The hash makes a doctored screenshot detectable — change one file and
   the digest no longer matches.
   -------------------------------------------------------------------------- */

/** SHA-256 of the graded files, first 8 hex chars. */
async function digestOf(files) {
  // canonicalBytes lives in grade.js so regrade.mjs hashes the identical string.
  const canonical = canonicalBytes(files);
  try {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(canonical));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 8);
  } catch {
    // crypto.subtle is unavailable on some file:// setups. Say so rather than
    // printing a fake hash that would survive tampering.
    return null;
  }
}

/** Ebook chapter for a session, so every lost mark points at something to read. */
const CHAPTERS = {
  "01": "ebook/01-introduction-to-dreamweaver.md",
  "02": "ebook/02-creating-a-new-site.md",
  "03": "ebook/03-working-with-text-and-images.md",
  "04": "ebook/04-applying-css-to-website.md",
  "05": "ebook/05-creating-page-layouts.md",
  "06": "ebook/06-creating-page-layouts-continued.md",
  "07": "ebook/07-css3-and-web-fonts.md",
  "08": "ebook/08-review-and-midterm.md",
  "09": "ebook/09-working-with-tables.md",
  "10": "ebook/10-embedding-flash-video-and-sound.md",
  "11": "ebook/11-designing-a-compact-site.md",
  "12": "ebook/12-using-code-editing-tools.md",
  "13": "ebook/13-creating-forms.md",
  "14": "ebook/14-working-with-spry-framework.md",
  "15": "ebook/15-mobile-interface-design-and-review.md",
};

/* --- rendering the result card --------------------------------------------- */

const TIER_LABEL = {
  auto: "AUTO",
  assist: "ASSIST",
  manual: "MANUAL",
};

const TIER_HELP = {
  auto: "máy chấm, điểm đã chốt",
  assist: "máy đo một phần, người chấm xác nhận",
  manual: "máy không chấm được, người chấm quyết định",
};

/** The one-line state word for a row, in words rather than colour alone. */
function rowStateCell(row) {
  if (row.state === "manual") return el("span", { class: "state manual", text: "Người chấm" });
  if (row.state === "blocked") return el("span", { class: "state blocked", text: "Chưa có file" });
  return el("span", { text: `${fmt(Math.round(row.ratio * 100))}%` });
}

/**
 * The "what to fix" line for a row that lost marks.
 *
 * Built from the failing checks' own `detail` strings, which already name the
 * file and what is missing, plus the ebook chapter for the session. A rubric row
 * may override it with a `fix` string.
 */
function fixLine(row, sessionKey, rubricFix) {
  const failing = (row.checks ?? [])
    .filter((c) => c.score01 !== null && c.score01 < 1)
    .map((c) => c.detail)
    .filter(Boolean);
  const what = rubricFix || failing[0] || "";
  if (!what) return null;
  const line = el("p", { class: "fixit" }, [el("b", { text: "Cách sửa: " })]);
  line.appendChild(document.createTextNode(what));
  const chapter = CHAPTERS[sessionKey];
  if (chapter) {
    line.appendChild(document.createTextNode(` — đọc lại ${chapter}`));
  }
  return line;
}

/** The evidence block: file, line and the offending source line. */
function evidenceBlock(row) {
  const first = (row.checks ?? []).find((c) => c.evidence && c.score01 !== null && c.score01 < 1);
  if (!first?.evidence) return null;
  const e = first.evidence;
  const where = e.line ? `${e.path ?? e.file} dòng ${e.line}` : String(e.path ?? e.file ?? "");
  // textContent, always: e.text is a line of the student's own file.
  return el("pre", { class: "evidence", text: e.text ? `${where}\n${e.text}` : where });
}


/** One <tr> per rubric row. */
function rubricRow(row, sessionKey) {
  const tier = row.tier ?? "auto";
  const pts = row.state === "graded" ? `${fmt(row.awarded)} / ${fmt(row.points)}` : `— / ${fmt(row.points)}`;

  const detail = el("td", {}, [
    el("div", {}, [el("b", { text: row.criteria })]),
  ]);
  if (row.description) detail.appendChild(el("div", { class: "note", text: row.description }));

  // Per-check lines, so a partial row shows which half passed.
  const checks = (row.checks ?? []).filter((c) => c.detail);
  if (checks.length && row.state !== "manual") {
    detail.appendChild(el("ul", { class: "checks" }, checks.map((c) => {
      const mark = c.score01 === null ? "?" : c.score01 === 1 ? "✓" : c.score01 > 0 ? "~" : "✗";
      return el("li", {
        class: c.score01 === null ? "miss" : null,
        text: `${mark} ${c.detail}`,
      });
    })));
  }

  const ev = evidenceBlock(row);
  if (ev) detail.appendChild(ev);

  if (row.state === "graded" && row.awarded < row.points) {
    const fx = fixLine(row, sessionKey, row.fix);
    if (fx) detail.appendChild(fx);
  }
  if (row.note) detail.appendChild(el("p", { class: "note", text: row.note }));

  return el("tr", {}, [
    detail,
    el("td", {}, [el("span", { class: `tier ${tier}`, text: TIER_LABEL[tier] ?? "AUTO" })]),
    el("td", { class: "pts" }, [rowStateCell(row)]),
    el("td", { class: "pts", text: pts }),
  ]);
}

/** The rubric table's shared empty state — the same dashed-panel design the
    course site (.table-empty) and the slide decks (.c-table-empty) use.
    Rubrics are validated to carry rows, so this should never render; it
    exists so a rubric that slips through validation shows a message instead
    of a hollow table. */
function rubricEmptyRow() {
  return el("tr", { class: "rubric-empty-row" }, [
    el("td", { colspan: 4 }, [
      el("div", { class: "rubric-empty" }, [
        el("div", { class: "rubric-empty-title", text: "Chưa có tiêu chí nào" }),
        el("div", { class: "rubric-empty-text", text: "Rubric buổi này không có dòng tiêu chí — hãy báo cho giảng viên." }),
      ]),
    ]),
  ]);
}

function renderCard(report, meta) {
  const rubric = meta.rubric;
  const sessionKey = meta.sessionKey;

  const head = el("div", { class: "card-head" }, [
    el("div", { class: "title" }, [
      el("div", { class: "session", text: `INS2053 — Buổi ${sessionKey}` }),
      el("div", { class: "hw", text: rubric.title ?? `Homework ${sessionKey}` }),
    ]),
    el("div", { class: "who" }, [
      el("div", { class: "name", text: meta.name || "(chưa nhập họ tên)" }),
      el("div", { class: "meta", text: `MSSV: ${meta.id || "—"} · Lớp: ${meta.klass || "—"}` }),
    ]),
    el("div", { class: "bigscore" }, [
      el("div", {}, [
        el("span", { class: "num", text: fmt(report.autoAwarded) }),
        el("span", { class: "den", text: ` / ${fmt(report.autoPoints)}` }),
      ]),
      el("div", { class: "cap", text: "điểm máy chấm được (auto + assist)" }),
    ]),
  ]);

  // Three separate numbers. Adding them would imply a final grade that only the
  // marker can decide, so they are never summed here.
  const tallies = el("div", { class: "tallies" }, [
    el("div", { class: "tally" }, [
      el("div", { class: "k", text: "MÁY ĐÃ CHẤM" }),
      el("div", { class: "v", text: `${fmt(report.autoAwarded)} / ${fmt(report.autoPoints)}` }),
      el("div", { class: "n", text: report.autoPercent === null ? "chưa có gì để chấm" : `${report.autoPercent}% phần chấm được` }),
    ]),
    el("div", { class: "tally" }, [
      el("div", { class: "k", text: "CHỜ NGƯỜI XEM" }),
      el("div", { class: "v", text: `${fmt(report.manualPoints)} điểm` }),
      el("div", { class: "n", text: "dòng MANUAL, máy không kết luận" }),
    ]),
    el("div", { class: "tally" }, [
      el("div", { class: "k", text: "CHƯA CHẤM ĐƯỢC" }),
      el("div", { class: "v", text: `${fmt(report.blockedPoints)} điểm` }),
      el("div", { class: "n", text: "thiếu file, không bị trừ" }),
    ]),
    el("div", { class: "tally" }, [
      el("div", { class: "k", text: "TỔNG RUBRIC" }),
      el("div", { class: "v", text: `${fmt(report.total)} điểm` }),
      el("div", { class: "n", text: "điểm cuối do giảng viên chốt" }),
    ]),
  ]);

  const table = el("table", { class: "rubric" }, [
    el("caption", { text: "Từng tiêu chí" }),
    el("thead", {}, [
      el("tr", {}, [
        el("th", { scope: "col", text: "Tiêu chí và nhận xét" }),
        el("th", { scope: "col", text: "Tier" }),
        el("th", { scope: "col", text: "Đạt" }),
        el("th", { scope: "col", text: "Điểm" }),
      ]),
    ]),
    el("tbody", {}, (report.rows ?? []).length
      ? (report.rows ?? []).map((r) => rubricRow(r, sessionKey))
      : [rubricEmptyRow()]),
  ]);

  const legend = el("p", { class: "note", text:
    `AUTO = ${TIER_HELP.auto}. ASSIST = ${TIER_HELP.assist}. MANUAL = ${TIER_HELP.manual}.` });

  const prov = el("div", { class: "provenance" }, [
    el("span", { text: `Chấm lúc ${meta.localTime}` }),
    el("span", { text: `UTC ${meta.isoTime}` }),
    el("span", { text: `Nguồn: ${meta.from}` }),
    el("span", {}, [
      document.createTextNode("SHA-256: "),
      el("code", { text: meta.digest ?? "không tính được trên trình duyệt này" }),
    ]),
    el("span", { text: `Rubric v${rubric.version ?? "1"} · Công cụ v${TOOL_VERSION}` }),
    el("span", { text: `${report.fileCount} file đã đọc` }),
  ]);

  const card = el("div", { class: "card" }, [head, tallies, table, legend, prov]);
  fill($("result"), card);
}


/* --- grading ---------------------------------------------------------------- */

async function doGrade() {
  clearMessages();
  const sessionKey = $("session").value;
  const rubric = RUBRICS[sessionKey];

  const problems = validateRubric(rubric);
  if (problems.length) {
    say("error", `Rubric buổi ${sessionKey} có lỗi — báo cho giảng viên`, problems);
    return;
  }

  const { files, from } = collectFiles();
  if (!files.length) {
    say("error", "Chưa có bài để chấm", [
      "Dán code vào tab \"Dán code\", chọn thư mục bài làm, hoặc dán link GitHub.",
    ]);
    return;
  }

  const ctx = buildContext(files);
  const report = gradeSubmission(rubric, ctx);

  if (ctx.parseErrors?.length) {
    say("error", "Có file không đọc được", ctx.parseErrors.map((e) => `${e.path}: ${e.message}`));
  }
  if (report.missingFiles?.length) {
    say("warn", "Thiếu file mà rubric yêu cầu", [
      report.missingFiles.join(", "),
      "Những dòng liên quan được đánh dấu \"chưa có file\" và KHÔNG bị trừ điểm.",
    ]);
  }
  if (!report.totalsAgree) {
    say("error", `Rubric buổi ${sessionKey} cộng sai`, [
      `Các dòng cộng lại ${fmt(report.rowTotal)} nhưng total khai ${fmt(report.total)}.`,
    ]);
  }

  const now = new Date();
  const meta = {
    sessionKey,
    rubric,
    name: $("stu-name").value.trim(),
    id: $("stu-id").value.trim(),
    klass: $("stu-class").value.trim(),
    from: state.loadedFrom ?? from,
    localTime: now.toLocaleString("vi-VN"),
    isoTime: now.toISOString(),
    digest: await digestOf(files),
  };

  renderCard(report, meta);
  state.last = { report, meta, files };
  $("print").disabled = false;
  $("json").disabled = false;
}

/** The JSON the gradebook uses — the screenshot is for the student, this is the record. */
function downloadJson() {
  if (!state.last) return;
  const { report, meta, files } = state.last;
  const payload = {
    tool: { name: "INS2053 grader", version: TOOL_VERSION },
    gradedAt: { local: meta.localTime, iso: meta.isoTime },
    student: { name: meta.name, id: meta.id, class: meta.klass },
    source: meta.from,
    contentDigestSha256: meta.digest,
    session: meta.sessionKey,
    rubricTitle: meta.rubric.title ?? "",
    files: files.map((f) => f.path),
    // The exact bytes that produced `report`. Without them the marker can only
    // re-grade a GitHub submission (the card prints the commit SHA); a pasted
    // submission would be unreproducible, and an unreproducible score is a claim
    // nobody can check. Grading is offline, so carrying the text costs nothing.
    submission: files.map((f) => ({ path: f.path, text: f.text })),
    report,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = el("a", {
    href: url,
    download: `INS2053-HW${meta.sessionKey}-${(meta.id || "MSSV").replace(/[^\w.-]/g, "_")}.json`,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


/* --- wiring ---------------------------------------------------------------- */

function selectTab(which) {
  const paste = which === "paste";
  $("tab-paste").setAttribute("aria-selected", String(paste));
  $("tab-github").setAttribute("aria-selected", String(!paste));
  $("panel-paste").hidden = !paste;
  $("panel-github").hidden = paste;
}

/** Drop the files loaded from a folder or GitHub and go back to the textareas. */
function clearLoaded(infoNode) {
  state.loaded = null;
  state.loadedFrom = null;
  if (infoNode) infoNode.textContent = "";
}

/** Report a local folder read: same handler for the picker and for drag-drop. */
function acceptLocal(picked, skipped, label) {
  state.loaded = picked;
  const kb = (picked.reduce((s, f) => s + f.text.length, 0) / 1024).toFixed(1);
  const assets = picked.filter((f) => !isTextPath(f.path)).length;
  state.loadedFrom = `${label} — ${picked.length} file, ${kb} KB`
    + (assets ? ` (${assets} file ảnh/media tính theo đường dẫn)` : "");
  $("folder-info").textContent =
    `Đã đọc ${picked.length} file: ${picked.map((f) => f.path).join(", ")}`;
  if (skipped.length) say("warn", "Bỏ qua một số file", skipped);
}

function init() {
  initSessionPicker();
  addEditor("index.html");

  $("tab-paste").addEventListener("click", () => selectTab("paste"));
  $("tab-github").addEventListener("click", () => selectTab("github"));

  $("add-html").addEventListener("click", () => addEditor("about.html"));
  $("add-css").addEventListener("click", () => addEditor("css/style.css"));
  $("add-asset").addEventListener("click", () => addEditor("images/hero.png"));

  $("theme").addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", dark ? "light" : "dark");
  });

  /* Folder pick — read locally, never uploaded. */
  $("folder").addEventListener("change", async (e) => {
    clearMessages();
    const { picked, skipped } = await readLocalFiles(e.target.files ?? []);
    if (!picked.length) {
      clearLoaded($("folder-info"));
      say("error", "Thư mục không có file .html/.css/.md nào", skipped);
      return;
    }
    acceptLocal(picked, skipped, "Thư mục cục bộ");
  });

  /* Drag-and-drop. Same local read, no upload. */
  const zone = $("dropzone");
  const stop = (e) => { e.preventDefault(); e.stopPropagation(); };
  zone.addEventListener("dragover", (e) => { stop(e); zone.classList.add("hot"); });
  zone.addEventListener("dragleave", (e) => { stop(e); zone.classList.remove("hot"); });
  zone.addEventListener("drop", async (e) => {
    stop(e);
    zone.classList.remove("hot");
    clearMessages();
    const { picked, skipped } = await readLocalFiles([...(e.dataTransfer?.files ?? [])]);
    if (!picked.length) {
      say("error", "Không có file .html/.css/.md nào trong phần vừa kéo vào",
        skipped.length ? skipped : ["Nếu kéo cả thư mục không được, dùng nút chọn thư mục ở trên."]);
      return;
    }
    acceptLocal(picked, skipped, "Kéo thả");
  });

  /* GitHub load. */
  $("gh-load").addEventListener("click", async () => {
    clearMessages();
    const btn = $("gh-load");
    const info = $("gh-info");
    btn.disabled = true;
    info.textContent = "Đang tải từ GitHub…";
    try {
      const out = await loadFromGitHub($("gh-url").value);
      if (out.error) {
        clearLoaded(info);
        say("error", "Không tải được bài từ GitHub", [out.error]);
        return;
      }
      state.loaded = out.files;
      state.loadedFrom = out.from;
      info.textContent = `Đã tải ${out.files.length} file tại commit ${out.sha.slice(0, 7)}: `
        + out.files.map((f) => f.path).join(", ");
    } catch (err) {
      clearLoaded(info);
      const offline = typeof navigator !== "undefined" && navigator.onLine === false;
      say("error", "Không tải được bài từ GitHub", [
        offline
          ? "Máy đang không có mạng. Dùng tab \"Dán code\" là chấm được ngay."
          : `Lỗi mạng: ${String(err?.message ?? err)}. Thử lại, hoặc dùng tab "Dán code".`,
      ]);
    } finally {
      btn.disabled = false;
    }
  });

  $("grade").addEventListener("click", () => {
    doGrade().catch((err) => {
      say("error", "Chấm bài lỗi — đây là lỗi của công cụ, không phải của bài làm", [
        String(err?.message ?? err),
      ]);
    });
  });

  // window.print() with a print stylesheet instead of a hand-rolled <canvas>
  // renderer: the card is a table of live text, and re-wrapping Vietnamese text
  // on a canvas by hand is a lot of code that breaks at exactly the wrong moment.
  // Ctrl+P → "Save as PDF" gives a sharper artefact than a bitmap, and
  // Win+Shift+S is still the fastest path to a PNG. README says the same.
  $("print").addEventListener("click", () => window.print());
  $("json").addEventListener("click", downloadJson);

  selectTab("paste");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

const clearMessages = () => fill($("messages"), []);
