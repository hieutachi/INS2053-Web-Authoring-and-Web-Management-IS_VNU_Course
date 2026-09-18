/* =============================================================================
   INS2053 — one-shot content update: video reflection homework flow

     node _tools/homework-video.mjs

   What it does (idempotent — safe to run twice):

     1. homework/session-NN/homework.md
        Inserts a uniform "## Part 2 — Video Reflection (OBS)" section right
        before "## Submission Guide", with a per-session presentation topic.
     2. homework/session-NN/submissions.md
        Creates the link-collection file students append their Drive link to.
     3. ebook/NN-*.md  (and i18n/vi translations when present)
        Inserts a "HOMEWORK & SUBMISSION — Session NN" section right before the
        "# ⏭️ NEXT SESSION" heading, so the chapter a student reads before
        class tells them, in flow order, what the homework is, how to do it
        (Part 1 code + Part 2 video) and how to hand both in.

   Deliberately NOT touched by this script: rubric JSON fixtures, the grader
   artifact, and anything under site/ (rebuild site/ afterwards with
   `npm run build:site && npm run qa:site`).
   ============================================================================= */

import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const MARK_HW = "## Part 2 — Video Reflection (OBS)";
const MARK_EBOOK = "HOMEWORK & SUBMISSION";

/* One presentation topic per session: EN + VI. Shown in both the homework
   sheet and the ebook chapter, always pointing at THIS week's own tasks. */
const TOPICS = [
  {
    en: "show `homework/session-01/index.html` and explain the job of each line of the five-line HTML5 boilerplate, then show where your `<title>` appears in the browser tab",
    vi: "mở `homework/session-01/index.html`, giải thích công dụng từng dòng trong bộ khung HTML5 5 dòng, rồi chỉ `<title>` của bạn hiện ở tab trình duyệt",
  },
  {
    en: "show your project folder tree and explain why the site lives in `project/` and the homework in `homework/session-02/`, and what each subfolder (`css/`, `images/`) is reserved for",
    vi: "chỉ cây thư mục dự án và giải thích vì sao site nằm trong `project/`, bài tập nằm trong `homework/session-02/`, và thư mục `css/`, `images/` được dành cho việc gì",
  },
  {
    en: "show one image added to the gallery in your About page and explain what the `src`, `alt` and width/height attributes each do",
    vi: "chỉ một ảnh trong gallery ở trang About và giải thích `src`, `alt` và width/height — mỗi thuộc tính làm gì",
  },
  {
    en: "show `css/style.css`, explain how `project/about.html` links to it with `<link>`, and walk through one rule you wrote (selector → property → effect)",
    vi: "mở `css/style.css`, giải thích `project/about.html` nối tới file này bằng `<link>` thế nào, và đi qua một quy tắc CSS bạn viết (selector → thuộc tính → hiệu quả)",
  },
  {
    en: "show the layout template and explain which semantic tag (`header`, `nav`, `main`, `aside`, `footer`) does which job, and how the CSS turns it into two columns",
    vi: "chỉ layout template và giải thích từng thẻ ngữ nghĩa (`header`, `nav`, `main`, `aside`, `footer`) đảm nhận việc gì, và CSS biến nó thành bố cục 2 cột ra sao",
  },
  {
    en: "show the navigation menu on all three pages and explain how the same `<ul>` menu works on every page and how the current page is highlighted",
    vi: "chỉ menu điều hướng trên cả 3 trang và giải thích cách cùng một `<ul>` menu chạy trên mọi trang và trang hiện tại được làm nổi bật thế nào",
  },
  {
    en: "show the Google Fonts `<link>` in your `<head>` and the `font-family` rules in CSS, and explain how you picked and paired the two fonts",
    vi: "chỉ thẻ `<link>` Google Fonts trong `<head>` và quy tắc `font-family` trong CSS, giải thích cách bạn chọn và ghép 2 font",
  },
  {
    en: "pick ONE thing you got wrong in the practice midterm (or in Task 2's table), open that file, and explain what the correct approach is and why",
    vi: "chọn MỘT điểm bạn làm sai trong đề luyện giữa kỳ (hoặc Bài tập 2 — bảng), mở file đó ra và giải thích cách làm đúng và vì sao",
  },

  {
    en: "show your schedule table and explain what `<thead>`, `<tbody>` and `colspan`/`rowspan` do in it, plus one styling choice you made",
    vi: "chỉ bảng lịch học và giải thích `<thead>`, `<tbody>`, `colspan`/`rowspan` làm gì trong bảng của bạn, kèm một lựa chọn định dạng bảng",
  },
  {
    en: "show the media page and explain how the `<video>` (or `<audio>`) element with `controls` works, including the fallback text and the `poster`/`source` attributes you used",
    vi: "chỉ trang media và giải thích cách phần tử `<video>` (hoặc `<audio>`) với `controls` hoạt động, gồm fallback text và thuộc tính `poster`/`source` bạn dùng",
  },
  {
    en: "show your `README.md` and favicon, and explain what each README section promises a visitor and how the favicon is wired into the pages",
    vi: "chỉ `README.md` và favicon, giải thích mỗi mục trong README hứa hẹn điều gì với khách truy cập và favicon được gắn vào các trang ra sao",
  },
  {
    en: "show one HTML validation error and one CSS warning from the W3C validators and explain what caused them and how you fixed them",
    vi: "chỉ một lỗi HTML và một cảnh báo CSS từ W3C validator, giải thích nguyên nhân và cách bạn sửa",
  },
  {
    en: "show the contact form and walk through three different input types you used, explaining what each collects and which label belongs to which input",
    vi: "chỉ form liên hệ và đi qua 3 kiểu input khác nhau bạn dùng, giải thích mỗi kiểu thu thập gì và label nào gắn với input nào",
  },
  {
    en: "show the dropdown menu and explain how `:hover` on the list item reveals the hidden sub-menu, and what `position: absolute` does there",
    vi: "chỉ menu dropdown và giải thích cách `:hover` trên `<li>` làm menu con ẩn hiện ra, và `position: absolute` đóng vai trò gì ở đó",
  },
  {
    en: "show your site in the browser device toolbar, narrow the viewport live, and explain which media query rule fires and what it changes",
    vi: "mở site của bạn trong device toolbar, thu hẹp màn hình trực tiếp, và giải thích quy tắc media query nào vừa kích hoạt và nó thay đổi gì",
  },
];

const nn2 = (n) => String(n).padStart(2, "0");

function videoSectionEN(n) {
  const t = TOPICS[n - 1].en;
  return `## Part 2 — Video Reflection (OBS) — required, not optional

Code is only half of this homework. The other half is a **short screen-recorded
video** that proves the work is yours and that you can *explain* it — the same
skill the midterm practical, the final practical exam, and every job interview
afterwards will ask of you. Using an AI tool or a tutorial to build the tasks
above is allowed; being able to walk through every line of what you keep is not
optional.

### What to record

With **OBS Studio** (free — <https://obsproject.com>), record **60–120 seconds**,
your **voice required** (face optional), sharing your screen while you present
ONE part of this homework. Pick a single topic — do not try to cover everything.
For this session, the easiest good choice is to **${t}**.

Requirements for the recording:

- [ ] Length **1–2 minutes**. Over 2 minutes loses structure points; under 1 minute usually means there is no substance.
- [ ] The **screen is shared the whole time** — the lecturer must see your real editor and browser, not a slideshow of screenshots.
- [ ] You **speak** through the video (Vietnamese is fine; technical terms stay in English), and your name + student ID are visible or spoken at the start.
- [ ] You **show and explain**, not read: open the actual file, point at the actual lines, show the actual result in the browser.

### How to hand in the video

You submit a **link**, never the video file itself:

1. Upload the recording (\`MP4\`, 720p or higher) to **your own Google Drive**.
2. Set sharing to **"Anyone with the link → Viewer"**.
3. Open \`homework/submissions.md\` in your repository and add **one line**:
   \`- Session ${nn2(n)} — <your Google Drive link>\`
4. Commit and push that file together with the rest of this homework.

The system collects and grades the code part (it runs the self-check on your
repository). For the video it stores **only the link** — your lecturer watches
it and grades it afterwards. A missing, private, or dead link means the video
part cannot be graded.

### How the video part is graded (4 points, on top of the 10-point rubric)

| Criteria | Points | What the lecturer looks for |
|---|---|---|
| Structure of the talk | 1 | A beginning (what you built), a middle (how it works, pointing at real code), and an end (what you learned or would improve). |
| Screen walkthrough | 1 | The real project on screen — editor and browser together, no slideshow of screenshots. |
| Correct explanation | 2 | You explain what the code does and why. Reading a memorised script over code you cannot explain scores 0. |
| **Total** | **4** | |

> Why a video? AI tools can write homework code, so the proof of learning moves
> to the explanation. Sixty seconds of you explaining your own lines is the
> strongest evidence of real understanding — and it is exactly what a technical
> interview looks like.

`;
}

function submissionsFile(n) {
  return `# Homework ${n} — Video Submission Links

> This file is the single place where you hand in your video link. Add **one
> line per submission** below the last one, then commit and push together with
> the rest of your homework. Google Drive sharing must be **"Anyone with the
> link → Viewer"** so the lecturer can watch it. Keep the video itself on
> Drive — do not commit video files to this repository.

- Session ${nn2(n)} — (paste your Google Drive link here)
`;
}

function ebookSectionEN(n) {
  const t = TOPICS[n - 1].en;
  return `## 🏠 HOMEWORK & SUBMISSION — Session ${n}

After class, this session has exactly one deliverable set: **Homework ${nn2(n)}**.
Everything you need sits on one page — the task list, the video brief and the
reference rubric: [homework/session-${nn2(n)}/homework.md](../homework/session-${nn2(n)}/homework.md).
Do the in-class exercise first; the homework deliberately starts where the
exercise ends.

**How this session's homework works, in order:**

1. **Build — Part 1 (code, 10 points).** Complete every task in the homework
   sheet inside your own repository. AI tools are allowed — understand every
   line you keep.
2. **Explain — Part 2 (video, 4 points).** Record a **60–120 second** OBS
   screen recording presenting ONE part of this homework — for example: ${t}.
   Voice required, screen shared the whole time; the full requirement checklist
   is in the homework sheet.
3. **Submit the video as a link — never the file.** Upload the recording to
   your own **Google Drive** (Anyone with the link → Viewer), add one line with
   the link to \`homework/submissions.md\` in your repository, then commit and
   push. The system collects and grades the code part; for the video it stores
   only the link, and your lecturer watches and grades it afterwards.
4. **Check yourself first.** Open the self-check tool (\`cham-bai.html\`), point
   it at your repository, and fix what it flags **before** the deadline.

**Deadline: Sunday 23:59.** The practice round of every homework sheet stays
public on the website; the official sheet is handed out in class and lives in
your copy of the repository.

`;
}

function ebookSectionVI(n) {
  const t = TOPICS[n - 1].vi;
  return `## 🏠 BÀI TẬP VÀ NỘP BÀI — Buổi ${n}

Sau buổi học, buổi này có đúng một bộ sản phẩm cần nộp: **Bài tập ${nn2(n)}**.
Mọi thứ nằm trên một trang — danh sách việc làm, yêu cầu video và rubric tham
chiếu: [homework/session-${nn2(n)}/homework.md](../homework/session-${nn2(n)}/homework.md).
Hãy làm xong bài tập trên lớp trước; đề bài tập được thiết kế để bắt đầu đúng
từ nơi bài trên lớp kết thúc.

**Bài tập của buổi này chạy theo thứ tự sau:**

1. **Làm — Phần 1 (code, 10 điểm).** Hoàn thành mọi nhiệm vụ trong đề bài tập
   ngay trong repository của bạn. Được phép dùng công cụ AI — nhưng phải hiểu
   từng dòng bạn giữ lại.
2. **Trình bày — Phần 2 (video, 4 điểm).** Quay một video màn hình bằng OBS
   dài **60–120 giây** trình bày MỘT phần của bài tập — ví dụ: ${t}.
   Bắt buộc có giọng nói, chia sẻ màn hình trong suốt video; danh sách yêu cầu
   đầy đủ nằm trong đề.
3. **Nộp video bằng link — không nộp file.** Tải video lên **Google Drive của
   bạn** (Anyone with the link → Viewer), thêm **một dòng** chứa link vào
   \`homework/submissions.md\` trong repository, rồi commit và push. Hệ thống
   thu thập và chấm phần code; với video, hệ thống chỉ lưu link — giảng viên
   sẽ xem và chấm sau.
4. **Tự kiểm tra trước.** Mở công cụ tự chấm (\`cham-bai.html\`), trỏ tới
   repository của bạn và sửa hết cảnh báo **trước** hạn nộp.

**Hạn nộp: Chủ nhật 23:59.** Bản luyện tập của mọi đề bài tập luôn công bố trên
website; đề chính thức được phát trên lớp và nằm trong bản repository của bạn.

`;
}

/* Insertion helpers. The script re-finds its anchor text itself on every run,
   so it stays correct even if line numbers drift in future edits. */
function insertBeforeLine(lines, predicate, block) {
  const idx = lines.findIndex(predicate);
  if (idx === -1) return null;
  lines.splice(idx, 0, ...block.split("\n"));
  return idx + 1;
}

function readNormalize(text) {
  const crlf = text.includes("\r\n");
  return { crlf, body: crlf ? text.replace(/\r\n/g, "\n") : text };
}

function restore({ crlf, body }) {
  return crlf ? body.replace(/\r?\n/g, "\r\n") : body;
}

async function processHomework(n) {
  const file = path.join(ROOT, "homework", `session-${nn2(n)}`, "homework.md");
  const raw = await readFile(file, "utf8");
  if (raw.includes(MARK_HW)) return "skip (already updated)";
  const { crlf, body } = readNormalize(raw);
  const lines = body.split("\n");
  const at = insertBeforeLine(
    lines,
    (l) => l.trim() === "## Submission Guide",
    videoSectionEN(n)
  );
  if (at === null) throw new Error(`no "## Submission Guide" anchor`);
  await writeFile(file, restore({ crlf, body: lines.join("\n") }), "utf8");
  return `inserted before line ${at}`;
}

async function processSubmissions(n) {
  const file = path.join(ROOT, "homework", `session-${nn2(n)}`, "submissions.md");
  const existing = await readFile(file, "utf8").catch(() => null);
  if (existing) return "skip (exists)";
  await writeFile(file, submissionsFile(n), "utf8");
  return "created";
}

async function processEbook(n) {
  const out = [];
  const names = await readdir(path.join(ROOT, "ebook"));
  const chapter = names.find((f) => f.startsWith(nn2(n) + "-") && f.endsWith(".md"));
  if (!chapter) throw new Error(`no ebook chapter for session ${n}`);
  const targets = [path.join(ROOT, "ebook", chapter)];
  const vi = path.join(ROOT, "i18n", "vi", "ebook", chapter);
  if (await readFile(vi, "utf8").then(() => true).catch(() => false)) {
    targets.push(vi);
  }
  for (const file of targets) {
    const isVi = file.includes("i18n");
    const raw = await readFile(file, "utf8");
    if (raw.includes(MARK_EBOOK)) {
      out.push(`${path.relative(ROOT, file)}: skip (already updated)`);
      continue;
    }
    const { crlf, body } = readNormalize(raw);
    const lines = body.split("\n");
    const nextHeading = isVi ? "# ⏭️ BUỔI TIẾP THEO" : "# ⏭️ NEXT SESSION";
    const at = insertBeforeLine(
      lines,
      (l) => l.trim() === nextHeading,
      isVi ? ebookSectionVI(n) : ebookSectionEN(n)
    );
    if (at === null) throw new Error(`no "${nextHeading}" anchor`);
    await writeFile(file, restore({ crlf, body: lines.join("\n") }), "utf8");
    out.push(`${path.relative(ROOT, file)}: inserted before line ${at}`);
  }
  return out.join(" | ");
}

let failures = 0;
for (let n = 1; n <= 15; n++) {
  try {
    const a = await processHomework(n);
    const b = await processSubmissions(n);
    const c = await processEbook(n);
    console.log(`session ${nn2(n)}: homework ${a} · submissions ${b}`);
    console.log(`            ebook ${c}`);
  } catch (err) {
    failures++;
    console.error(`session ${nn2(n)}: FAILED — ${err.message}`);
  }
}
if (failures) {
  console.error(`\n${failures} session(s) failed — fix and re-run.`);
  process.exit(1);
}
console.log("\nDone. Next: npm run build:site && npm run qa:site");
