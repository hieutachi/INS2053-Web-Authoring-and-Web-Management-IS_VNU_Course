/* =============================================================================
   hw-briefs.mjs — the detailed homework brief for each of the 15 sessions.

   WHY THIS FILE EXISTS
   --------------------
   The homework sheets (`homework/session-NN/homework.md`) listed the tasks, the
   rubric and a short "Submission Guide" bullet list, but never told a student
   what they are actually building, why it matters, or in which order to work.
   That is the difference between an assignment sheet and a real flow:
   assign -> describe -> demonstrate -> how to do -> how to hand in -> graded.

   The content lives here as data, once per session, in both languages, because:
     - `build-hw-briefs.mjs` injects it into all 30 markdown sources, so the 15
       sheets can never drift apart from each other;
     - the session hub pages read the same table, so the overview page and the
       sheet tell exactly the same story;
     - editing one session's brief is one edit, not fifteen.

   CONVENTIONS
   -----------
   - `files` are paths inside the STUDENT'S repository, always with the folder
     they belong to (`project/…` or `homework/session-NN/…`). Never write a bare
     file name: the self-check tool looks up files by path.
   - Technical terms stay English (HTML, CSS, nav, alt text, media query) even in
     the Vietnamese copy — that is the vocabulary this course teaches.
   - No sentence may contain a deadline ("Sunday", "deadline", "grace day"):
     `_tools/qa-site.mjs` gate 11 fails the build if the published practice copy
     carries hand-in deadline wording. Timing belongs to `## Due Date`, which the
     builder renames to "Practice Status" before publishing.
   - Code samples use fenced blocks WITHOUT a language tag. The sheets already
     mix tagged and untagged fences; untagged keeps the injected block readable
     in the raw markdown a lecturer edits.
   ============================================================================= */

export const BRIEFS = {
  /* ------------------------------------------------------------------ 01 */
  1: {
    en: {
      scenario:
        "You have just opened VS Code for the first time. Before any styling, any image, any menu, every website on earth starts with the same thing: a plain HTML file that tells the browser who you are. This week you are not building a club site yet — you are building your **name card on the web**, the one page everyone in the class will open.",
      why: [
        "The five-line HTML5 boilerplate is the one piece of code you will type fifteen times this semester, plus twice in the practical exams. If it comes from copy-paste, every later session costs you minutes. If it comes from memory, it costs nothing.",
        "The folder layout you create today (`css/`, `images/`) is the layout every homework and the capstone assume. Renaming it later breaks links that work fine on your machine and die on the server.",
      ],
      demo:
        "Open the sheet on the website and compare your page against the live reference under **“Visual target — what you are building”**: big bold name, two paragraphs of plain black text on white, one subheading, no styling at all. Plain is correct for Week 1 — a styled page this week means you spent time on the wrong thing.",
      steps: [
        "**Set up once (2 min).** Open the folder that holds your repository in VS Code (**File → Open Folder** — never a single file). Create `homework/session-01/` inside it.",
        "**Type the skeleton (10 min).** Create `index.html`, then type the five boilerplate lines by hand — do not paste. Save, double-click the file, and confirm the browser tab shows your `<title>`.",
        "**Fill in the content (15 min).** One `<h1>` with your name, two `<p>` about you, one `<h2>` with a paragraph under it. Add one `<!-- comment -->` naming a region of the page.",
        "**Create the empty folders (2 min).** `css/` and `images/` inside `homework/session-01/`, each holding a `.gitkeep` file, otherwise Git forgets them.",
        "**Self-check (5 min).** Every opening tag has a closing tag, indentation consistent, no stray text outside `<body>`. Then run the self-check tool before you push.",
      ],
      pitfalls: [
        "Pasting the boilerplate instead of typing it — you will regret this in the midterm, which is closed-internet.",
        "`<meta charset=\"UTF-8\">` placed after `<title>`: your Vietnamese name renders as `Ã¡` garbage.",
        "Forgetting `.gitkeep`: the empty `css/` and `images/` folders vanish on push and the folder-layout points are lost.",
      ],
      files: ["`homework/session-01/index.html`", "`homework/session-01/css/.gitkeep`", "`homework/session-01/images/.gitkeep`"],
      videoTopic:
        "open `homework/session-01/index.html`, explain what each of the five boilerplate lines does, then show where your `<title>` appears in the browser tab.",
    },
    vi: {
      scenario:
        "Bạn vừa mở VS Code lần đầu. Trước mọi thứ kiểu dáng, hình ảnh hay menu, mọi website trên thế giới đều bắt đầu từ cùng một thứ: một file HTML nói cho trình duyệt biết bạn là ai. Tuần này bạn chưa xây website club — bạn xây **danh thiếp của bạn trên web**, trang mà cả lớp sẽ mở.",
      "why": [
        "Bộ khung HTML5 năm dòng là đoạn code bạn sẽ gõ mười lăm lần trong học kỳ này, cộng hai lần trong bài thi thực hành. Nếu nó đến từ copy-paste, mỗi buổi sau mất thêm vài phút. Nếu nó đến từ trí nhớ, nó không tốn gì cả.",
        "Bố cục thư mục bạn tạo hôm nay (`css/`, `images/`) là bố cục mọi bài tập và đồ án giả định sẵn. Đổi tên muộn hơn sẽ làm gãy những link vẫn chạy tốt trên máy bạn nhưng chết trên server.",
      ],
      demo:
        "Mở phiếu bài tập trên website và so trang của bạn với bản mẫu sống ở mục **“Mẫu đối chiếu trực quan — bạn đang xây dựng gì”**: tên to đậm, hai đoạn chữ đen trên nền trắng, một đề mục phụ, không có kiểu dáng gì. Ở Tuần 1, đơn giản là đúng — một trang đã tô màu nghĩa là bạn dành thời gian sai chỗ.",
      steps: [
        "**Thiết lập một lần (2 phút).** Mở thư mục chứa repository bằng VS Code (**File → Open Folder** — đừng mở từng file lẻ). Tạo `homework/session-01/` bên trong.",
        "**Gõ bộ khung (10 phút).** Tạo `index.html`, rồi tự gõ năm dòng boilerplate — không paste. Lưu, double-click file, xác nhận tab trình duyệt hiện đúng `<title>`.",
        "**Điền nội dung (15 phút).** Một `<h1>` tên bạn, hai `<p>` về bạn, một `<h2>` kèm một đoạn văn dưới nó. Thêm một `<!-- comment -->` đặt tên cho một vùng của trang.",
        "**Tạo thư mục rỗng (2 phút).** `css/` và `images/` trong `homework/session-01/`, mỗi thư mục chứa một file `.gitkeep`, nếu không Git sẽ quên chúng.",
        "**Tự kiểm tra (5 phút).** Mọi thẻ mở đều có thẻ đóng, thụt lề nhất quán, không còn chữ thừa ngoài `<body>`. Rồi chạy công cụ tự chấm trước khi push.",
      ],
      pitfalls: [
        "Paste boilerplate thay vì gõ tay — bạn sẽ hối hận ở bài thi giữa kỳ, vốn không có internet.",
        "Đặt `<meta charset=\"UTF-8\">` sau `<title>`: tên tiếng Việt của bạn hiển thị thành `Ã¡` lỗi font.",
        "Quên `.gitkeep`: hai thư mục rỗng `css/` và `images/` biến mất sau push và mất điểm phần bố cục thư mục.",
      ],
      files: ["`homework/session-01/index.html`", "`homework/session-01/css/.gitkeep`", "`homework/session-01/images/.gitkeep`"],
      videoTopic:
        "mở `homework/session-01/index.html`, giải thích năm dòng boilerplate mỗi dòng làm nhiệm vụ gì, rồi chỉ cho thấy `<title>` xuất hiện ở đâu trên tab trình duyệt.",
    },
  },

  /* ------------------------------------------------------------------ 02 */
  2: {
    en: {
      scenario:
        "This week you lay the ground the whole semester stands on: a real project folder. From now on the course runs on **two separate trees** in your repository, and mixing them up is the most common way students lose marks.",
      why: [
        "`project/` is your Student Club Website — the capstone you add features to every week and submit at the end of term. `homework/session-NN/` is throwaway practice for that week only. Grading looks at specific paths, so a page parked in the wrong tree simply does not exist for the grader.",
        "Flat structure at the project root (all pages beside each other, only `css/` and `images/` as subfolders) means every internal link is a plain file name with no `../` to get wrong.",
        "Lowercase-with-hyphens naming is not pedantry: Linux servers treat `About.html` and `about.html` as different files, and your links break the moment you deploy.",
      ],
      demo:
        "Your tree should look like the reference in Task 1: three working pages at the project root, two empty-but-present asset folders, nothing else. Compare against the live visual target on the website page.",
      steps: [
        "**Create the tree (5 min).** Make `project/` with `index.html`, `about.html`, `contact.html`, plus `project/css/` and `project/images/`.",
        "**Write the three stubs (20 min).** Each page gets the full HTML5 boilerplate, one `<h1>`, and the short content Task 1 describes. Invent a club name now — you will keep it until Week 16.",
        "**Apply the naming rules (5 min).** Lowercase, hyphens not spaces, no accents in file names. Rename anything that fails before you link to it.",
        "**Images — after Session 3 (10 min).** Task 2 needs `<img>`, which is taught next session. Do Task 1 now, come back to Task 2 after class 3; the sheet is due after that class.",
        "**Check paths, not looks (5 min).** Open each page from the file system and confirm the images load from `images/…` relative paths.",
      ],
      pitfalls: [
        "Putting homework pages inside `project/` — the capstone tree must stay clean.",
        "`About Us.html` or `Trang chủ.html`: spaces and diacritics in file names.",
        "Linking with `../images/x.png` from a root-level page: there is no parent to climb to.",
      ],
      files: ["`project/index.html`", "`project/about.html`", "`project/contact.html`", "`project/css/`", "`project/images/` (2+ image files)"],
      videoTopic:
        "show your project folder tree, explain why the site lives in `project/` while practice lives in `homework/session-02/`, and what `css/` and `images/` are reserved for.",
    },
    vi: {
      scenario:
        "Tuần này bạn đổ nền cho cả học kỳ: một thư mục dự án thật. Từ đây môn học chạy trên **hai cây tách biệt** trong repository, và nhầm lẫn giữa chúng là cách mất điểm phổ biến nhất.",
      why: [
        "`project/` là Student Club Website — đồ án bạn cộng thêm tính năng mỗi tuần và nộp cuối kỳ. `homework/session-NN/` là bài luyện tạm thời của riêng tuần đó. Việc chấm bài nhìn vào đường dẫn cụ thể, nên một trang đặt sai cây coi như không tồn tại với người chấm.",
        "Cấu trúc phẳng ở gốc project (các trang nằm cạnh nhau, chỉ `css/` và `images/` là thư mục con) khiến mọi link nội bộ chỉ là tên file, không có `../` để gõ sai.",
        "Đặt tên chữ thường có dấu gạch nối không phải là cầu toàn: server Linux coi `About.html` và `about.html` là hai file khác nhau, link của bạn gãy ngay khi deploy.",
      ],
      demo:
        "Cây thư mục của bạn phải giống tham chiếu trong Task 1: ba trang chạy được ở gốc project, hai thư mục asset rỗng nhưng có thật, không có gì thêm. So với mẫu sống trên trang website.",
      steps: [
        "**Tạo cây thư mục (5 phút).** Tạo `project/` gồm `index.html`, `about.html`, `contact.html`, cùng `project/css/` và `project/images/`.",
        "**Viết ba trang nháp (20 phút).** Mỗi trang có đủ bộ khung HTML5, một `<h1>` và nội dung ngắn Task 1 mô tả. Nghĩ tên club ngay bây giờ — bạn sẽ giữ nó tới Tuần 16.",
        "**Áp dụng quy tắc đặt tên (5 phút).** Chữ thường, dấu gạch nối thay khoảng trắng, không dấu trong tên file. Đổi tên mọi thứ sai trước khi link tới nó.",
        "**Hình ảnh — sau Buổi 3 (10 phút).** Task 2 cần `<img>` mà buổi sau mới học. Làm Task 1 bây giờ, quay lại Task 2 sau buổi 3; bài được thu sau buổi đó.",
        "**Kiểm tra đường dẫn, không kiểm tra đẹp (5 phút).** Mở từng trang từ file hệ thống và chắc chắn ảnh nạp từ đường dẫn tương đối `images/…`.",
      ],
      pitfalls: [
        "Để trang bài tập trong `project/` — cây đồ án phải sạch.",
        "`About Us.html` hay `Trang chủ.html`: khoảng trắng và dấu tiếng Việt trong tên file.",
        "Link bằng `../images/x.png` từ một trang ở gốc: không có thư mục cha nào để leo lên.",
      ],
      files: ["`project/index.html`", "`project/about.html`", "`project/contact.html`", "`project/css/`", "`project/images/` (2+ file ảnh)"],
      videoTopic:
        "chiếu cây thư mục project, giải thích vì sao website nằm ở `project/` còn bài luyện nằm ở `homework/session-02/`, và `css/` với `images/` được dành để làm gì.",
    },
  },

  /* ------------------------------------------------------------------ 03 */
  3: {
    en: {
      scenario:
        "Your About page stops being a note and becomes a page: real heading hierarchy, lists that scan, and photographs that still say something when they fail to load.",
      why: [
        "Heading levels are structure, not size. An `<h3>` used because it looks small confuses screen readers and search engines, and costs you the structure points in the rubric.",
        "Lists are the cheapest way to make content readable: unordered for things with no order (club activities), ordered for steps or rankings.",
        "`alt` text is not decoration. It is what a blind visitor hears, what shows while an image is missing, and what Google indexes. A descriptive alt is a graded requirement, not a suggestion.",
        "Relative paths are the reason your site works locally and dies after upload. Getting them right here, once, saves every later session.",
      ],
      demo:
        "Compare with the live visual target: title, intro paragraph, three heading levels, one bulleted list, one numbered list, then a gallery of at least three images each with a caption. Text flows top to bottom in one column — no CSS yet.",
      steps: [
        "**Re-open last week's page (1 min).** Edit `project/about.html` in place. Do not start a new file; this page grows every week.",
        "**Build the outline (10 min).** `<h1>` club/page title → `<h2>` section → `<h3>` subsection, each followed by its paragraph.",
        "**Add the two lists (10 min).** One `<ul>` with 5+ items, one `<ol>` with 3+ items. Keep list items short.",
        "**Drop in images (15 min).** Put files in `project/images/`, reference them with `<img src=\"images/ten-file.jpg\" alt=\"mô tả những gì trong ảnh\">` plus `width`/`height`.",
        "**Build the gallery (10 min).** Three or more images, each with a visible caption, inside a section headed `<h2>`.",
        "**Alt-text pass (5 min).** Read your page aloud using only the alt texts. If a listener cannot picture the page, rewrite them.",
      ],
      pitfalls: [
        "`alt=\"image\"` or `alt=\"photo\"` — says nothing, scores zero on the alt criterion.",
        "`src=\"/images/x.jpg\"` (leading slash = absolute from the web root) instead of `src=\"images/x.jpg\"`.",
        "Skipping heading levels (`h1` → `h3`) to get a smaller font.",
      ],
      files: ["`project/about.html`", "`project/images/` (new image files)"],
      videoTopic:
        "show one image you added to the gallery and explain what `src`, `alt` and `width`/`height` each do, and what happens if each one is missing.",
    },
    vi: {
      scenario:
        "Trang About của bạn hết là một mẩu ghi chú và trở thành một trang thật: phân cấp đề mục đúng, danh sách dễ quét mắt, và ảnh vẫn nói lên điều gì đó khi nó không tải được.",
      why: [
        "Cấp đề mục là cấu trúc, không phải cỡ chữ. Dùng `<h3>` vì nó trông nhỏ sẽ làm rối trình đọc màn hình và công cụ tìm kiếm, đồng thời mất điểm phần cấu trúc trong rubric.",
        "Danh sách là cách rẻ nhất để nội dung dễ đọc: không thứ tự cho những việc ngang nhau (hoạt động club), có thứ tự cho các bước hoặc xếp hạng.",
        "`alt` không phải chi tiết trang trí. Đó là thứ người khiếm thị nghe thấy, thứ hiện ra khi ảnh lỗi, và thứ Google lập chỉ mục. Alt mô tả là yêu cầu được chấm, không phải gợi ý.",
        "Đường dẫn tương đối là lý do site chạy tốt trên máy bạn nhưng chết sau khi upload. Xử lý đúng một lần ở đây giúp mọi buổi sau nhẹ đi.",
      ],
      demo:
        "So với mẫu sống: tiêu đề, đoạn giới thiệu, ba cấp đề mục, một danh sách gạch đầu dòng, một danh số thứ tự, rồi thư viện ít nhất ba ảnh có chú thích. Chữ chảy một cột từ trên xuống — chưa có CSS.",
      steps: [
        "**Mở lại trang tuần trước (1 phút).** Sửa trực tiếp `project/about.html`. Đừng tạo file mới; trang này lớn dần mỗi tuần.",
        "**Vẽ dàn ý (10 phút).** `<h1>` tên club/trang → `<h2>` mục → `<h3>` mục con, mỗi đề mục kèm đoạn văn của nó.",
        "**Thêm hai danh sách (10 phút).** Một `<ul>` 5+ mục, một `<ol>` 3+ mục. Mỗi mục ngắn gọn.",
        "**Thả ảnh (15 phút).** Đặt file vào `project/images/`, tham chiếu bằng `<img src=\"images/ten-file.jpg\" alt=\"mô tả nội dung ảnh\">` kèm `width`/`height`.",
        "**Xây thư viện ảnh (10 phút).** Ba ảnh trở lên, mỗi ảnh có chú thích hiện trên trang, nằm trong một mục có `<h2>`.",
        "**Rà soát alt (5 phút).** Đọc to trang của bạn chỉ bằng các dòng alt. Nếu người nghe không hình dung được trang, viết lại.",
      ],
      pitfalls: [
        "`alt=\"image\"` hay `alt=\"photo\"` — không nói gì, mất trọn điểm phần alt.",
        "`src=\"/images/x.jpg\"` (dấu gạch chéo đầu = tuyệt đối từ gốc web) thay vì `src=\"images/x.jpg\"`.",
        "Nhảy cấp đề mục (`h1` → `h3`) chỉ để chữ nhỏ hơn.",
      ],
      files: ["`project/about.html`", "`project/images/` (file ảnh mới)"],
      videoTopic:
        "chiếu một ảnh bạn thêm vào thư viện và giải thích `src`, `alt`, `width`/`height` mỗi thứ làm gì, và chuyện gì xảy ra nếu thiếu từng thứ.",
    },
  },

  /* ------------------------------------------------------------------ 04 */
  4: {
    en: {
      scenario:
        "From this week your site has a look, and the look lives in its own file. You move from writing pages to writing a stylesheet the whole site shares.",
      why: [
        "An external CSS file linked from every page is the core idea of web design: change one rule, every page updates. Inline styles and `<font>` tags are the pre-2000 way and cost you marks.",
        "Selectors are how CSS finds things. Understanding element vs class selectors now is what makes the layout, typography and responsive weeks possible.",
        "The cascade and specificity decide *which* rule wins when two disagree. Guessing here produces the classic “my CSS is not working” bug.",
      ],
      demo:
        "Against the live visual target your page should show: a coloured body background, a readable font, three visibly different heading levels, comfortable line spacing, and styled images and lists. Nothing fancy — legible and consistent is the target.",
      steps: [
        "**Create the file (2 min).** `project/css/style.css`, empty, saved inside the project.",
        "**Link it correctly (3 min).** In every HTML page, inside `<head>` and BEFORE `</head>`: `<link rel=\"stylesheet\" href=\"css/style.css\">`. Path is relative to the HTML file, not to the project root.",
        "**Style the base (10 min).** `body` gets `background-color`, `color`, `font-family`, `line-height`. Everything inherits from here.",
        "**Style the three heading levels (10 min).** Distinct size and colour for `h1`, `h2`, `h3`.",
        "**Style content elements (10 min).** Paragraph spacing, `img { max-width: 100%; }`, and at least one list styled.",
        "**Verify the link works (5 min).** Delete one property, save, reload: if the page does not change, the `<link>` path is wrong — fix that before writing more CSS.",
      ],
      pitfalls: [
        "`href=\"/css/style.css\"` — works on some setups, breaks on others; use `css/style.css`.",
        "CSS saved but not reloaded: check with F12 → Network, or Ctrl+F5.",
        "Styling headings by wrapping them in `<b>` or changing their text instead of using CSS.",
      ],
      files: ["`project/css/style.css`", "`project/about.html`", "`project/index.html`", "`project/contact.html`"],
      videoTopic:
        "show `css/style.css`, explain how `project/about.html` links to it with `<link>`, and walk through one rule you wrote: selector → property → visible effect.",
    },
    vi: {
      scenario:
        "Từ tuần này website của bạn có giao diện, và giao diện nằm trong một file riêng. Bạn chuyển từ viết trang sang viết một stylesheet mà cả site dùng chung.",
      why: [
        "Một file CSS ngoài được link từ mọi trang là ý cốt lõi của thiết kế web: đổi một rule, mọi trang cùng cập nhật. Style nội tuyến và thẻ `<font>` là cách của thời trước 2000 và sẽ trừ điểm.",
        "Selector là cách CSS tìm phần tử. Hiểu selector phần tử và selector class ngay bây giờ là điều làm nên các tuần bố cục, typography và responsive sau này.",
        "Cascade và specificity quyết định *rule nào thắng* khi hai rule mâu thuẫn. Đoán ở đây sinh ra lỗi kinh điển “CSS của tôi không chạy”.",
      ],
      demo:
        "So với mẫu sống, trang của bạn cần: nền body có màu, font dễ đọc, ba cấp đề mục khác nhau rõ rệt, giãn dòng thoải mái, ảnh và danh sách được định dạng. Không cần hoa mỹ — dễ đọc và nhất quán là đạt.",
      steps: [
        "**Tạo file (2 phút).** `project/css/style.css`, rỗng, lưu trong project.",
        "**Link đúng cách (3 phút).** Trong mọi trang HTML, đặt trong `<head>` và TRƯỚC `</head>`: `<link rel=\"stylesheet\" href=\"css/style.css\">`. Đường dẫn tính theo file HTML, không tính theo gốc project.",
        "**Định dạng nền tảng (10 phút).** `body` nhận `background-color`, `color`, `font-family`, `line-height`. Mọi thứ kế thừa từ đây.",
        "**Định dạng ba cấp đề mục (10 phút).** Cỡ và màu khác nhau rõ cho `h1`, `h2`, `h3`.",
        "**Định dạng nội dung (10 phút).** Giãn đoạn, `img { max-width: 100%; }`, và ít nhất một danh sách được style.",
        "**Xác nhận link hoạt động (5 phút).** Xoá một property, lưu, tải lại: trang không đổi nghĩa là đường dẫn `<link>` sai — sửa xong mới viết tiếp CSS.",
      ],
      pitfalls: [
        "`href=\"/css/style.css\"` — có máy chạy, có máy không; hãy dùng `css/style.css`.",
        "Lưu CSS nhưng chưa tải lại trang: kiểm tra bằng F12 → Network, hoặc Ctrl+F5.",
        "Style đề mục bằng cách bọc `<b>` hoặc sửa câu chữ thay vì dùng CSS.",
      ],
      files: ["`project/css/style.css`", "`project/about.html`", "`project/index.html`", "`project/contact.html`"],
      videoTopic:
        "chiếu `css/style.css`, giải thích `project/about.html` nối tới nó bằng `<link>` thế nào, và đọc qua một rule bạn viết: selector → property → hiệu quả nhìn thấy.",
    },
  },

  /* ------------------------------------------------------------------ 05 */
  5: {
    en: {
      scenario:
        "Your pages stop being one long scroll of text and become a layout: a header, a navigation strip, a main column, a sidebar, a footer — built from tags that say what the region *is*, not just where it sits.",
      why: [
        "Semantic tags (`header`, `nav`, `main`, `aside`, `footer`) give a machine the shape of your document. Screen readers jump between them; search engines weight `main` content higher. A page of only `<div>`s looks identical to a browser and meaningless to everything else.",
        "Layout is where CSS stops being decoration and becomes engineering: box model, width, float/flex, margins. This is the week that makes a two-column site possible.",
        "One reusable template means every later page is a copy with content swapped, not a rebuild.",
      ],
      demo:
        "The live visual target shows the goal: a dark header band with the club name, a horizontal nav row, a wide main column on the left, a narrow aside on the right, and a footer strip. Two clear columns, aligned, no overlapping text.",
      steps: [
        "**Mark up the regions (15 min).** Rewrite `project/index.html` body as `header` → `nav` → `main` → `aside` → `footer`, each with real content.",
        "**Give the boxes sizes (15 min).** In `css/style.css`: `main` about 70% width floated left, `aside` about 25% floated right (or use flex), `header`/`footer` full width.",
        "**Control the space (10 min).** Padding inside regions, margin between them, a `max-width` on the whole page so text does not stretch across a 4K monitor.",
        "**Clear the floats (5 min).** Without clearing, the footer climbs up beside the columns. Add `clear: both` on the footer (or switch to flex, which needs none).",
        "**Resize test (5 min).** Drag the window narrow and wide. Columns should hold their proportions and nothing should overlap.",
      ],
      pitfalls: [
        "Wrapping everything in `<div>` and styling that — semantically identical to a machine reading your page, and marked down.",
        "Forgetting to clear floats: footer overlaps the sidebar.",
        "Setting widths in pixels so the layout breaks on a laptop screen.",
      ],
      files: ["`project/index.html`", "`project/css/style.css`"],
      videoTopic:
        "show the layout template and explain which semantic tag does which job, and how your CSS turns those tags into two columns.",
    },
    vi: {
      scenario:
        "Trang của bạn hết là một dải chữ cuộn dài và trở thành một bố cục: header, dải điều hướng, cột chính, sidebar, footer — dựng bằng những thẻ nói lên vùng đó *là gì*, chứ không chỉ nằm ở đâu.",
      why: [
        "Thẻ ngữ nghĩa (`header`, `nav`, `main`, `aside`, `footer`) cho máy biết hình hài tài liệu. Trình đọc màn hình nhảy giữa chúng; công cụ tìm kiếm đánh giá cao nội dung trong `main`. Một trang toàn `<div>` trông y hệt với trình duyệt và vô nghĩa với mọi thứ còn lại.",
        "Bố cục là nơi CSS hết là trang trí và trở thành kỹ thuật: box model, width, float/flex, margin. Đây là tuần biến site hai cột thành hiện thực.",
        "Một template dùng lại được nghĩa là mọi trang sau chỉ là bản copy thay nội dung, không phải dựng lại.",
      ],
      demo:
        "Mẫu sống cho thấy mục tiêu: dải header tối màu có tên club, hàng nav ngang, cột chính rộng bên trái, aside hẹp bên phải, dải footer. Hai cột rõ ràng, thẳng hàng, không chồng chữ.",
      steps: [
        "**Đánh dấu các vùng (15 phút).** Viết lại phần body của `project/index.html` theo thứ tự `header` → `nav` → `main` → `aside` → `footer`, mỗi vùng có nội dung thật.",
        "**Cho các hộp kích thước (15 phút).** Trong `css/style.css`: `main` khoảng 70% width float trái, `aside` khoảng 25% float phải (hoặc dùng flex), `header`/`footer` full width.",
        "**Canh khoảng cách (10 phút).** Padding trong từng vùng, margin giữa các vùng, `max-width` cho cả trang để chữ không căng ngang màn 4K.",
        "**Clear float (5 phút).** Quên clear thì footer trèo lên cạnh cột. Thêm `clear: both` cho footer (hoặc đổi sang flex, không cần clear).",
        "**Thử kéo resize (5 phút).** Kéo cửa sổ hẹp rồi rộng. Hai cột giữ tỉ lệ và không gì chồng lên nhau.",
      ],
      pitfalls: [
        "Bọc mọi thứ trong `<div>` rồi style — với máy đọc trang thì không khác gì thẻ ngữ nghĩa, và bạn bị trừ điểm.",
        "Quên clear float: footer đè sidebar.",
        "Đặt width bằng pixel khiến bố cục vỡ trên màn laptop.",
      ],
      files: ["`project/index.html`", "`project/css/style.css`"],
      videoTopic:
        "chiếu template bố cục và giải thích thẻ ngữ nghĩa nào làm nhiệm vụ gì, cùng CSS biến các thẻ đó thành hai cột ra sao.",
    },
  },

  /* ------------------------------------------------------------------ 06 */
  6: {
    en: {
      scenario:
        "Three pages finally become one site. You wire them together with the same navigation on every page, finish the Contact page, and give the home page something worth landing on.",
      why: [
        "Navigation is the product. A visitor who cannot leave a page leaves the site. Identical markup on every page is what makes a site feel like one place.",
        "Relative links are the skill this week really tests: `href=\"about.html\"` between siblings, and why `../` would be wrong at the project root.",
        "Highlighting the current page (an `active` class on the matching item) is the difference between a menu and a map.",
      ],
      demo:
        "In the live visual target, click around: the same header, nav and footer on all three pages, every link lands, the current page is visibly marked, and the home page shows several distinct sections.",
      steps: [
        "**Write the menu once (10 min).** Build the `<ul>` nav in `index.html`, then copy the exact block into `about.html` and `contact.html` — same order, same classes.",
        "**Point the links (10 min).** `index.html`, `about.html`, `contact.html` as plain sibling file names. Click every link from every page before moving on.",
        "**Mark the current page (5 min).** Add `class=\"active\"` to the matching `<li>` on each page and style it in CSS.",
        "**Finish the contact page (15 min).** Real content per Task 2: heading, intro, address block, email written as text (the form comes in Week 13).",
        "**Build up the home page (15 min).** Several sections per Task 3 — welcome, highlights, what the club does — each with an `<h2>`.",
        "**Full crawl (5 min).** Start at `index.html`, visit every page by clicking only, never the address bar. Any dead link is a failed requirement.",
      ],
      pitfalls: [
        "Menu written slightly differently on each page — inconsistent nav loses consistency points.",
        "`href=\"index.html\"` everywhere including on index itself.",
        "Testing only one direction: links usually break on the page you did not think about.",
      ],
      files: ["`project/index.html`", "`project/about.html`", "`project/contact.html`", "`project/css/style.css`"],
      videoTopic:
        "show the navigation menu on all three pages and explain how the same `<ul>` works everywhere and how the current page gets highlighted.",
    },
    vi: {
      scenario:
        "Ba trang cuối cùng cũng thành một website. Bạn nối chúng bằng cùng một menu trên mọi trang, hoàn thiện trang Contact, và cho trang chủ thứ đáng để dừng lại.",
      why: [
        "Điều hướng chính là sản phẩm. Người xem không thoát được khỏi trang sẽ thoát khỏi site. Mã đánh dấu giống hệt nhau trên mọi trang là thứ khiến site có cảm giác là một nơi.",
        "Link tương đối là kỹ năng tuần này kiểm tra thật: `href=\"about.html\"` giữa các file cùng cấp, và vì sao `../` ở gốc project là sai.",
        "Đánh dấu trang hiện tại (thêm class `active` vào mục tương ứng) là khác biệt giữa một menu và một tấm bản đồ.",
      ],
      demo:
        "Trong mẫu sống, hãy bấm khắp nơi: cùng header, nav và footer trên cả ba trang, mọi link đều tới nơi, trang hiện tại được đánh dấu rõ, trang chủ có nhiều mục tách bạch.",
      steps: [
        "**Viết menu một lần (10 phút).** Dựng `<ul>` nav trong `index.html`, rồi copy nguyên khối đó sang `about.html` và `contact.html` — cùng thứ tự, cùng class.",
        "**Chỉ link (10 phút).** `index.html`, `about.html`, `contact.html` là tên file cùng cấp. Bấm mọi link từ mọi trang trước khi làm tiếp.",
        "**Đánh dấu trang hiện tại (5 phút).** Thêm `class=\"active\"` vào `<li>` tương ứng ở mỗi trang và style trong CSS.",
        "**Hoàn thiện trang liên hệ (15 phút).** Nội dung thật theo Task 2: đề mục, đoạn giới thiệu, khối địa chỉ, email viết dạng chữ (form sẽ ở Tuần 13).",
        "**Xây trang chủ (15 phút).** Nhiều mục theo Task 3 — chào mừng, điểm nổi bật, club làm gì — mỗi mục có `<h2>`.",
        "**Bò hết site (5 phút).** Bắt đầu ở `index.html`, thăm mọi trang chỉ bằng cách bấm, không gõ địa chỉ. Một link chết là một yêu cầu trượt.",
      ],
      pitfalls: [
        "Menu mỗi trang viết hơi khác nhau — thiếu nhất quán bị trừ điểm nhất quán.",
        "`href=\"index.html\"` đặt ở mọi nơi kể cả trong chính index.",
        "Chỉ thử một chiều: link thường hỏng ở trang bạn không nghĩ tới.",
      ],
      files: ["`project/index.html`", "`project/about.html`", "`project/contact.html`", "`project/css/style.css`"],
      videoTopic:
        "chiếu menu điều hướng trên cả ba trang và giải thích vì sao cùng một `<ul>` chạy ở mọi trang, và trang hiện tại được làm nổi bật thế nào.",
    },
  },

  /* ------------------------------------------------------------------ 07 */
  7: {
    en: {
      scenario:
        "The week your site gains a voice. You pick two real typefaces, load them from Google Fonts, and tune sizes and spacing until the pages look designed rather than merely rendered.",
      why: [
        "Typography is most of what people call “design”. Two well-chosen fonts and honest spacing beat any colour scheme.",
        "Web fonts must be *loaded* before CSS can use them: the `<link>` in the head plus a `font-family` rule. Forgetting one half is the usual reason the font “does not apply”.",
        "Pairing discipline — one face for headings, one for body text, a clear size ratio — is the actual skill being graded, not how exotic your font is.",
        "A CDN font link is fine for homework but the final capstone version must also work offline, which is why the sheet warns you here.",
      ],
      demo:
        "Against the live visual target your headings should read as a different face from your body text, with generous line height, a comfortable measure (not edge-to-edge lines), and consistent sizes per level across all pages.",
      steps: [
        "**Choose (10 min).** On Google Fonts pick one display face for headings and one text face for body. Preview them together with the site's own words.",
        "**Load them (5 min).** Copy the provided `<link>` tags into the `<head>` of all three pages, before your stylesheet link.",
        "**Apply (15 min).** In `css/style.css` set `font-family` for `body` and for `h1, h2, h3`, with a fallback stack (`'Font Name', Arial, sans-serif`).",
        "**Tune (15 min).** Heading sizes as a ratio, `line-height` around 1.5–1.7 for paragraphs, `margin` under headings, letter-spacing on small caps if used.",
        "**Consistency sweep (5 min).** Same page open in two tabs: old page and new page. Sizes per level must match exactly.",
      ],
      pitfalls: [
        "`font-family: 'Poppins';` without quotes or without the fallback list.",
        "Loading six weights you never use — the page downloads kilobytes for nothing.",
        "More than two typefaces on one page: it reads as noise, not design.",
      ],
      files: ["`project/index.html`", "`project/about.html`", "`project/contact.html`", "`project/css/style.css`"],
      videoTopic:
        "show the Google Fonts `<link>` in your `<head>` and the `font-family` rules in CSS, and explain how you picked and paired the two fonts.",
    },
    vi: {
      scenario:
        "Tuần website của bạn có giọng điệu. Bạn chọn hai bộ chữ thật, nạp từ Google Fonts, và chỉnh cỡ cùng khoảng cách cho tới khi trang trông như được thiết kế chứ không chỉ được hiển thị.",
      why: [
        "Typography là phần lớn những gì người ta gọi là “thiết kế”. Hai font chọn tốt và khoảng cách trung thực thắng mọi bảng màu.",
        "Web font phải được *nạp* rồi CSS mới dùng được: thẻ `<link>` trong head cộng một rule `font-family`. Quên một nửa là lý do phổ biến khiến font “không áp dụng”.",
        "Kỷ luật phối chữ — một bộ cho đề mục, một bộ cho thân bài, tỉ lệ cỡ rõ ràng — mới là kỹ năng được chấm, không phải font của bạn hiếm đến mức nào.",
        "Link font qua CDN ổn cho bài tập nhưng phiên bản đồ án cuối phải chạy được offline, đó là lý do phiếu bài nhắc bạn ở đây.",
      ],
      demo:
        "So với mẫu sống: đề mục phải khác bộ chữ với thân bài, giãn dòng rộng, độ dài dòng dễ đọc (không căng sát hai mép), cỡ chữ mỗi cấp nhất quán trên mọi trang.",
      steps: [
        "**Chọn (10 phút).** Trên Google Fonts chọn một bộ hiển thị cho đề mục và một bộ văn bản cho thân bài. Xem thử cả hai với chính chữ của site.",
        "**Nạp (5 phút).** Copy các thẻ `<link>` được cung cấp vào `<head>` của cả ba trang, trước link stylesheet.",
        "**Áp dụng (15 phút).** Trong `css/style.css` đặt `font-family` cho `body` và cho `h1, h2, h3`, kèm danh sách dự phòng (`'Font Name', Arial, sans-serif`).",
        "**Chỉnh (15 phút).** Cỡ đề mục theo tỉ lệ, `line-height` khoảng 1.5–1.7 cho đoạn, `margin` dưới đề mục, letter-spacing nếu dùng chữ in hoa nhỏ.",
        "**Quét nhất quán (5 phút).** Mở cùng lúc trang cũ và trang mới: cỡ mỗi cấp phải khớp tuyệt đối.",
      ],
      pitfalls: [
        "`font-family: 'Poppins';` thiếu dấu nháy hoặc thiếu danh sách dự phòng.",
        "Nạp sáu weight nhưng chỉ dùng một — trang tải vài chục KB vô ích.",
        "Nhiều hơn hai bộ chữ trên một trang: trông như nhiễu, không phải thiết kế.",
      ],
      files: ["`project/index.html`", "`project/about.html`", "`project/contact.html`", "`project/css/style.css`"],
      videoTopic:
        "chiếu thẻ `<link>` Google Fonts trong `<head>` và các rule `font-family` trong CSS, giải thích bạn chọn và phối hai font ra sao.",
    },
  },

  /* ------------------------------------------------------------------ 08 */
  8: {
    en: {
      scenario:
        "The week after the midterm. Two jobs: turn the exam into information — write down what you got wrong and fix it — and get ahead on tables, which is what Session 9 is built on.",
      why: [
        "A reflection you actually write is worth more than another page you half-copy. Naming three concrete mistakes, with the correct answer and the chapter section to re-read, is how the weak areas disappear before the final.",
        "Tables are the first HTML structure that is genuinely *grid-shaped*: rows, cells, headers, merging. Practising in a throwaway file first means Session 9 is about styling, not survival.",
        "Task 4 exists because navigation quietly rots: every page you added since Week 2 must still be reachable.",
      ],
      demo:
        "There is no polished page to chase this week. Your `midterm-review.md` should read like the template in Task 1 — mistake, my answer, correct answer, why, where to review. Your `table-practice.html` should show a bordered table with a shaded header row and merged cells where the task asks for them.",
      steps: [
        "**Recall while it is fresh (10 min).** Right after the exam, before discussing answers, list what you hesitated on.",
        "**Write the reflection (20 min).** Three items in `homework/session-08/midterm-review.md`, following the exact template: what the topic was, what you answered, what is correct, one sentence why, and the ebook section to re-read.",
        "**Re-read those sections (15 min).** Actually open chapters 1–7 at the sections you named.",
        "**Build the practice table (25 min).** `table-practice.html` per Task 2: `border`, a header row, at least one `colspan` or `rowspan`, real content — not lorem ipsum.",
        "**Style it (15 min).** Task 3: alternating row colours, padding in cells, header contrast — in `table-practice.css`.",
        "**Crawl the project (10 min).** Task 4: click from `index.html` to every page and back. Fix broken links and update the nav list.",
      ],
      pitfalls: [
        "Writing “I was careless” instead of a specific technical mistake — nothing to fix, no points.",
        "Building the table directly in `project/activities.html` before tables are taught; this week's table stays a practice file.",
        "Leaving `border=\"1\"` as your only styling — attribute borders are legacy, CSS is the requirement.",
      ],
      files: ["`homework/session-08/midterm-review.md`", "`homework/session-08/table-practice.html`", "`homework/session-08/table-practice.css`", "`project/` (navigation fixes)"],
      videoTopic:
        "pick ONE thing you got wrong in the midterm (or in Task 2's table), open that file, and explain what the correct approach is and why.",
    },
    vi: {
      scenario:
        "Tuần ngay sau bài thi giữa kỳ. Hai việc: biến bài thi thành thông tin — ghi lại mình sai gì và sửa — và đi trước về bảng, vì Buổi 9 dựng trên đó.",
      why: [
        "Một bản suy ngẫm bạn thật sự viết đáng giá hơn một trang nữa bạn chép nửa vời. Gọi tên ba lỗi cụ thể, kèm đáp án đúng và mục chương cần đọc lại, là cách điểm yếu biến mất trước bài thi cuối kỳ.",
        "Bảng là cấu trúc HTML đầu tiên thật sự *dạng lưới*: hàng, ô, đề mục cột, gộp ô. Luyện trong một file tạm trước nghĩa là Buổi 9 bàn về style, không phải vật lộn cú pháp.",
        "Task 4 tồn tại vì điều hướng âm thầm mục ruỗng: mọi trang bạn thêm từ Tuần 2 vẫn phải tới được.",
      ],
      demo:
        "Tuần này không có trang đẹp để đuổi theo. `midterm-review.md` của bạn phải đọc như template ở Task 1 — lỗi, câu trả lời của bạn, đáp án đúng, vì sao, và chỗ cần xem lại. `table-practice.html` hiển thị bảng có viền, hàng đề mục tô nền và các ô gộp đúng chỗ task yêu cầu.",
      steps: [
        "**Ghi khi còn mới (10 phút).** Ngay sau khi thi, trước khi bàn đáp án, liệt kê những chỗ bạn do dự.",
        "**Viết bản suy ngẫm (20 phút).** Ba mục trong `homework/session-08/midterm-review.md`, theo đúng template: chủ đề là gì, bạn trả lời gì, đáp án đúng, một câu giải thích, và mục ebook cần đọc lại.",
        "**Đọc lại các mục đó (15 phút).** Mở thật sự các chương 1–7 ở đúng mục bạn vừa nêu.",
        "**Dựng bảng luyện (25 phút).** `table-practice.html` theo Task 2: `border`, một hàng đề mục, ít nhất một `colspan` hoặc `rowspan`, nội dung thật — không lorem ipsum.",
        "**Style bảng (15 phút).** Task 3: xen kẽ màu hàng, padding trong ô, đề mục tương phản — viết trong `table-practice.css`.",
        "**Bò lại project (10 phút).** Task 4: bấm từ `index.html` tới mọi trang và quay lại. Sửa link gãy, cập nhật danh sách nav.",
      ],
      pitfalls: [
        "Viết “em bất cẩn” thay vì một lỗi kỹ thuật cụ thể — không có gì để sửa, không có điểm.",
        "Dựng bảng thẳng vào `project/activities.html` khi chưa học bảng; bảng tuần này vẫn phải là file luyện.",
        "Để `border=\"1\"` là style duy nhất — thuộc tính viền là kiểu cũ, CSS mới là yêu cầu.",
      ],
      files: ["`homework/session-08/midterm-review.md`", "`homework/session-08/table-practice.html`", "`homework/session-08/table-practice.css`", "`project/` (sửa điều hướng)"],
      videoTopic:
        "chọn MỘT thứ bạn làm sai trong bài thi giữa kỳ (hoặc trong bảng ở Task 2), mở file đó và giải thích cách đúng là gì và vì sao.",
    },
  },

  /* ------------------------------------------------------------------ 09 */
  9: {
    en: {
      scenario:
        "Tables move from practice file into the real site: an Activities page whose schedule is an honest HTML table, styled, and reachable from every other page.",
      why: [
        "A schedule is tabular data. Using a table for it is the correct semantics; using divs or a grid of paragraphs is what the rubric calls misuse.",
        "`thead`/`tbody`/`tfoot`, `<th scope=\"col\">` and captioned tables are what let a screen reader announce “row 3, column Wednesday” instead of a wall of text.",
        "`colspan` and `rowspan` are the merge primitives you will need again in the final exam.",
        "Adding a fifth page forces the nav-consistency habit: four existing pages must all learn about the new one.",
      ],
      demo:
        "The live visual target: a titled Activities page, a table with a shaded header row, at least one merged cell, zebra-striped body rows, padding so cells breathe, and the new page present in the nav of all four older pages.",
      steps: [
        "**Create the page (5 min).** `project/activities.html`, copied from an existing page so the boilerplate, nav and footer come along.",
        "**Draft the data (10 min).** Write the schedule as a plain list first: which events, which days, which rooms. Decide the grid before the markup.",
        "**Mark up the table (20 min).** `<table>` → `<caption>` → `<thead>` with `<th scope=\"col\">` → `<tbody>` with real rows → at least one `colspan` or `rowspan`.",
        "**Style it (20 min).** In `css/style.css`: `border-collapse: collapse`, cell padding, header background, `tbody tr:nth-child(even)` stripes, hover highlight.",
        "**Wire the navigation (10 min).** Add Activities to the nav on `index`, `about`, `contact` and `media` (if it exists yet); mark it active on the new page.",
        "**Accessibility pass (5 min).** Tab through, and read the table aloud imagining you cannot see it. Does every row identify its column?",
      ],
      pitfalls: [
        "Nested tables or spacer tricks for layout — layout tables are exactly what the course teaches you to avoid.",
        "`<td>` in the header row instead of `<th>`.",
        "Updating the nav on only one page and losing consistency points on the other three.",
      ],
      files: ["`project/activities.html`", "`project/css/style.css`", "`project/index.html`", "`project/about.html`", "`project/contact.html`"],
      videoTopic:
        "show your schedule table and explain what `<thead>`, `<tbody>` and `colspan`/`rowspan` do in it, plus one styling choice you made.",
    },
    vi: {
      scenario:
        "Bảng rời file luyện tập để vào site thật: một trang Activities mà lịch trình là bảng HTML đúng nghĩa, có style, và truy cập được từ mọi trang khác.",
      why: [
        "Lịch trình là dữ liệu dạng bảng. Dùng table cho nó là ngữ nghĩa đúng; dùng div hay đoạn văn xếp hàng là điều rubric gọi là lạm dụng.",
        "`thead`/`tbody`/`tfoot`, `<th scope=\"col\">` và bảng có caption là thứ giúp trình đọc màn hình nói “hàng 3, cột Thứ tư” thay vì một khối chữ.",
        "`colspan` và `rowspan` là hai primitive gộp ô bạn sẽ cần lại ở bài thi cuối kỳ.",
        "Thêm trang thứ năm buộc bạn phải thành thạo thói quen nhất quán nav: bốn trang cũ đều phải biết trang mới.",
      ],
      demo:
        "Mẫu sống: trang Activities có tiêu đề, bảng với hàng đề mục tô nền, ít nhất một ô gộp, thân bảng sọc ngựa, padding đủ rộng, và trang mới xuất hiện trong nav của cả bốn trang cũ.",
      steps: [
        "**Tạo trang (5 phút).** `project/activities.html`, copy từ một trang đang có để sẵn boilerplate, nav và footer.",
        "**Soạn dữ liệu (10 phút).** Viết lịch dưới dạng danh sách thuần trước: sự kiện nào, ngày nào, phòng nào. Quyết định lưới trước khi viết mã.",
        "**Đánh dấu bảng (20 phút).** `<table>` → `<caption>` → `<thead>` với `<th scope=\"col\">` → `<tbody>` các hàng thật → ít nhất một `colspan` hoặc `rowspan`.",
        "**Style (20 phút).** Trong `css/style.css`: `border-collapse: collapse`, padding ô, nền đề mục, sọc `tbody tr:nth-child(even)`, highlight khi hover.",
        "**Nối điều hướng (10 phút).** Thêm Activities vào nav của `index`, `about`, `contact` và `media` (nếu đã có); đánh dấu active ở trang mới.",
        "**Rà soát accessibility (5 phút).** Bấm Tab và đọc to bảng như thể không nhìn thấy. Mỗi hàng có tự nhận cột của nó không?",
      ],
      pitfalls: [
        "Table lồng nhau hoặc table chiếm chỗ để dàn trang — đúng thứ môn học dạy tránh.",
        "Dùng `<td>` thay `<th>` ở hàng đề mục.",
        "Cập nhật nav trên một trang rồi mất điểm nhất quán ở ba trang còn lại.",
      ],
      files: ["`project/activities.html`", "`project/css/style.css`", "`project/index.html`", "`project/about.html`", "`project/contact.html`"],
      videoTopic:
        "chiếu bảng lịch trình và giải thích `<thead>`, `<tbody>`, `colspan`/`rowspan` trong đó làm gì, cùng một lựa chọn style bạn đã quyết.",
    },
  },

  /* ------------------------------------------------------------------ 10 */
  10: {
    en: {
      scenario:
        "The site gains motion and sound: a Media page with an embedded video and an audio clip, each with controls, a poster and a fallback for the browser that cannot play it.",
      why: [
        "`<video>` and `<audio>` are native HTML — no plugin, no Flash. Knowing the attributes (`controls`, `poster`, `preload`, `loop`, `muted`) is the whole skill.",
        "Fallback content inside the element is not optional decoration: it is what a user without the codec sees, and it is graded.",
        "Local files versus embeds matter for the exam: the practical is closed-internet, so your own `<video>` with a local `source` is what you can rely on.",
        "Media is heavy. Sizing, lazy loading and keeping files in `project/media/` is good practice, not busywork.",
      ],
      demo:
        "Live visual target: a Media page whose video shows a poster frame before play, plays with visible controls, sits at a sane width, and whose audio row lines up with the rest of the layout.",
      steps: [
        "**Get assets (10 min).** One short MP4 and one MP3 you have the right to use. Put them in `project/media/`.",
        "**Create the page (5 min).** `project/media.html` copied from an existing page.",
        "**Embed the video (15 min).** `<video>` with `controls`, `poster`, explicit `width`/`height`, a `<source>` for MP4, and fallback text plus a link for browsers that fail.",
        "**Embed the audio (10 min).** `<audio controls>` with a `<source>` and the same fallback pattern.",
        "**Style the page (15 min).** Media width capped at the content column, captions under each clip, spacing consistent with other pages.",
        "**Cross-browser sanity (5 min).** Play both, pause both, drag the progress bar, then view source and confirm the fallback text is real sentences.",
      ],
      pitfalls: [
        "`autoplay` — annoying, and often blocked by the browser anyway.",
        "Committing a 200 MB video to Git; keep the file short or link out and note it.",
        "Missing fallback text: a blank rectangle scores zero on the media requirement.",
      ],
      files: ["`project/media.html`", "`project/media/` (video + audio files)", "`project/css/style.css`", "All existing HTML pages (nav updated)"],
      videoTopic:
        "show the media page and explain how `<video>` (or `<audio>`) with `controls` works, including the fallback text and the `poster`/`source` attributes you used.",
    },
    vi: {
      scenario:
        "Site có chuyển động và âm thanh: một trang Media với video nhúng và một đoạn audio, mỗi thứ có điều khiển, có poster và có nội dung dự phòng cho trình duyệt không phát được.",
      why: [
        "`<video>` và `<audio>` là HTML thuần — không plugin, không Flash. Biết các thuộc tính (`controls`, `poster`, `preload`, `loop`, `muted`) là toàn bộ kỹ năng.",
        "Nội dung dự phòng trong thẻ không phải trang trí tuỳ chọn: đó là thứ người dùng thiếu codec nhìn thấy, và nó được chấm.",
        "File cục bộ hay nhúng ngoài rất quan trọng cho kỳ thi: bài thi thực hành không có internet, nên `<video>` của bạn với `source` cục bộ là thứ dựa được.",
        "Media rất nặng. Giới hạn kích thước, lazy loading và để file trong `project/media/` là thực hành tốt, không việc vặt.",
      ],
      demo:
        "Mẫu sống: trang Media có video hiển thị khung poster trước khi phát, phát với điều khiển nhìn thấy được, chiều rộng hợp lý, và hàng audio thẳng hàng với phần còn lại của bố cục.",
      steps: [
        "**Chuẩn bị asset (10 phút).** Một MP4 ngắn và một MP3 bạn có quyền dùng. Đặt trong `project/media/`.",
        "**Tạo trang (5 phút).** `project/media.html` copy từ một trang đang có.",
        "**Nhúng video (15 phút).** `<video>` có `controls`, `poster`, `width`/`height` rõ ràng, một `<source>` MP4, kèm chữ dự phòng và một link cho trình duyệt thất bại.",
        "**Nhúng audio (10 phút).** `<audio controls>` có `<source>` và cùng mẫu dự phòng.",
        "**Style trang (15 phút).** Giới hạn chiều rộng media theo cột nội dung, chú thích dưới từng clip, khoảng cách nhất quán với các trang khác.",
        "**Kiểm tra chéo (5 phút).** Phát và tạm dừng cả hai, kéo thanh tiến trình, rồi xem source và chắc chắn chữ dự phòng là câu có nghĩa.",
      ],
      pitfalls: [
        "`autoplay` — gây khó chịu và thường bị trình duyệt chặn.",
        "Commit video 200 MB vào Git; hãy giữ clip ngắn hoặc link ra ngoài và ghi rõ.",
        "Thiếu nội dung dự phòng: một khung trống ăn điểm 0 phần media.",
      ],
      files: ["`project/media.html`", "`project/media/` (file video + audio)", "`project/css/style.css`", "Toàn bộ trang HTML đang có (cập nhật nav)"],
      videoTopic:
        "chiếu trang media và giải thích `<video>` (hoặc `<audio>`) với `controls` hoạt động thế nào, gồm cả chữ dự phòng và các thuộc tính `poster`/`source` bạn dùng.",
    },
  },

  /* ------------------------------------------------------------------ 11 */
  11: {
    en: {
      scenario:
        "Compact-site week: you take what you have and bring it up to release quality — every page consistent, favicon in place, and a README that lets a stranger run the site.",
      why: [
        "Polish is a gradeable skill: consistent spacing, aligned components, no orphan pages, no placeholder text. It is the difference between coursework and a portfolio piece.",
        "A favicon is a one-line `<link>` that changes how professional the tab looks — and forgetting it produces the noisy 404 in the console.",
        "A README is how anyone (including future you, and any employer who finds the repo) understands what the project is, what it needs, and how to open it.",
      ],
      demo:
        "Live visual target plus a console check: no red errors, favicon visible in the tab, all five pages visually consistent, and `README.md` rendering as a proper page on GitHub.",
      steps: [
        "**Audit first (15 min).** Open all pages side by side and list every inconsistency: heading sizes, spacing, colours, missing nav items. Fix the list, not the mood.",
        "**Polish the pages (20 min).** Apply the fixes in `css/style.css` so all pages benefit at once.",
        "**Add the favicon (10 min).** A 32×32 ICO/PNG in `project/images/`, then `<link rel=\"icon\" href=\"images/favicon.ico\">` in the `<head>` of every page.",
        "**Write the README (20 min).** `project/README.md` with the four required sections: what the site is, the page list, the technologies used, how to run it, and author credit.",
        "**Final crawl (10 min).** Visit every page, open DevTools, confirm zero 404s and zero console errors.",
      ],
      pitfalls: [
        "Favicon linked in only one page.",
        "A README that is three lines of prose — the rubric wants named sections.",
        "Fixing one page's spacing directly in that page instead of in shared CSS.",
      ],
      files: ["`project/README.md`", "`project/index.html`", "`project/about.html`", "`project/activities.html`", "`project/media.html`", "`project/contact.html`", "`project/css/style.css`", "`project/images/favicon.ico` (or `.png`)"],
      videoTopic:
        "show your `README.md` and favicon, and explain what each README section promises a visitor and how the favicon is wired into the pages.",
    },
    vi: {
      scenario:
        "Tuần site gọn: bạn lấy những gì đang có và nâng lên chất lượng phát hành — mọi trang nhất quán, có favicon, và một README để người lạ chạy được site.",
      why: [
        "Đánh bóng là kỹ năng chấm được: khoảng cách nhất quán, thành phần thẳng hàng, không trang mồ côi, không chữPlaceholder. Đó là khác biệt giữa bài tập và một món đồ nghề.",
        "Favicon là một dòng `<link>` đổi hẳn cảm giác chuyên nghiệp của tab — và quên nó sinh ra lỗi 404 ồn ào trong console.",
        "README là cách bất kỳ ai (kể cả bạn của tương lai, hay nhà tuyển dụng vào repo) hiểu project là gì, cần gì, và mở ra sao.",
      ],
      demo:
        "Mẫu sống cộng một lượt kiểm tra console: không lỗi đỏ, favicon hiện trên tab, năm trang nhất quán về nhìn, và `README.md` hiển thị đúng như một trang trên GitHub.",
      steps: [
        "**Khám trước (15 phút).** Mở tất cả trang cạnh nhau và liệt kê mọi chỗ lệch: cỡ đề mục, khoảng cách, màu, mục nav thiếu. Sửa theo danh sách, không sửa theo cảm tính.",
        "**Đánh bóng các trang (20 phút).** Áp dụng fixes trong `css/style.css` để mọi trang cùng được hưởng.",
        "**Thêm favicon (10 phút).** File ICO/PNG 32×32 trong `project/images/`, rồi `<link rel=\"icon\" href=\"images/favicon.ico\">` trong `<head>` của mọi trang.",
        "**Viết README (20 phút).** `project/README.md` với bốn mục bắt buộc: site là gì, danh sách trang, công nghệ dùng, cách chạy, và thông tin tác giả.",
        "**Bò lần cuối (10 phút).** Thăm mọi trang, mở DevTools, xác nhận không 404 và không lỗi console.",
      ],
      pitfalls: [
        "Favicon chỉ được link ở một trang.",
        "README ba dòng văn xuôi — rubric cần các mục được đặt tên.",
        "Sửa khoảng cách của một trang ngay trong trang đó thay vì trong CSS chung.",
      ],
      files: ["`project/README.md`", "`project/index.html`", "`project/about.html`", "`project/activities.html`", "`project/media.html`", "`project/contact.html`", "`project/css/style.css`", "`project/images/favicon.ico` (or `.png`)"],
      videoTopic:
        "chiếu `README.md` và favicon, giải thích từng mục README hứa hẹn gì với người xem và favicon được nối vào các trang thế nào.",
    },
  },

  /* ------------------------------------------------------------------ 12 */
  12: {
    en: {
      scenario:
        "Validator week. You stop guessing whether your code is correct and start proving it: W3C checks for the HTML, the Jigsaw/CSS validator for the stylesheet, then a formatting pass so the code reads cleanly.",
      why: [
        "Validators catch the errors browsers forgive: unclosed tags, wrong nesting, missing alt, unknown properties. Forgiveness hides bugs that surface on another device or in an exam.",
        "Reading a validation report is a professional skill — error line, cause, fix — and it is exactly what the video part of this homework asks you to demonstrate.",
        "Consistent indentation and comments are how someone else (or you in three weeks) reads your file. The rubric pays for it.",
      ],
      demo:
        "Success looks like this: the W3C checker returns “No errors” (warnings explained in your notes), the CSS validator returns zero errors, and your files are indented two spaces with a comment above each region.",
      steps: [
        "**Validate the HTML (20 min).** Submit each page to the W3C Nu checker (by URI or by pasting the file). Record every error: line, message, cause.",
        "**Fix and re-run (20 min).** Fix the earliest error first — later errors are often knock-on effects. Re-validate until clean.",
        "**Validate the CSS (15 min).** Run `css/style.css` through the W3C CSS validator, fix unknown properties and typos.",
        "**Format (15 min).** Two-space indent, one declaration per line, alphabetical or grouped properties, a comment marking each region.",
        "**Regression check (10 min).** Reload every page: fixing markup can change rendering. Confirm nothing broke.",
        "**Write the report (10 min).** Save the validator results in a file inside `homework/session-12/` so your notes travel with the homework.",
      ],
      pitfalls: [
        "Deleting the offending element instead of fixing it, and losing a graded feature.",
        "Believing a warning that is a false positive — explain it in your notes instead of mangling valid code.",
        "Reformatting with an auto-formatter that also rewrites your paths or strips your comments.",
      ],
      files: ["All HTML files in `project/`", "`project/css/style.css`"],
      videoTopic:
        "show one HTML validation error and one CSS warning from the validators and explain what caused them and how you fixed them.",
    },
    vi: {
      scenario:
        "Tuần validator. Bạn thôi đoán code đúng hay sai và bắt đầu chứng minh: W3C soi HTML, công cụ W3C soi CSS, rồi một lượt định dạng để code đọc sạch.",
      why: [
        "Validator bắt được những lỗi trình duyệt bỏ qua: thẻ chưa đóng, lồng sai, thiếu alt, property không tồn tại. Sự bao dung ấy giấu lỗi sẽ bộc lộ trên thiết bị khác hoặc trong phòng thi.",
        "Đọc báo cáo validation là kỹ năng nghề — dòng lỗi, nguyên nhân, cách sửa — và đó chính là điều phần video của bài này yêu cầu bạn trình bày.",
        "Thụt lề nhất quán và comment là cách người khác (hoặc bạn sau ba tuần) đọc được file. Rubric trả tiền cho việc đó.",
      ],
      demo:
        "Thành công trông như thế này: W3C trả về “No errors” (warning được giải thích trong ghi chú của bạn), CSS validator không còn lỗi, và file của bạn thụt lề hai space kèm một comment cho mỗi vùng.",
      steps: [
        "**Soi HTML (20 phút).** Gửi từng trang lên W3C Nu checker (theo URI hoặc dán file). Ghi lại mọi lỗi: dòng, thông báo, nguyên nhân.",
        "**Sửa và chạy lại (20 phút).** Sửa lỗi xuất hiện sớm nhất trước — các lỗi sau thường là hiệu ứng dây chuyền. Validate tới khi sạch.",
        "**Soi CSS (15 phút).** Chạy `css/style.css` qua W3C CSS validator, sửa property lạ và lỗi chính tả.",
        "**Định dạng (15 phút).** Thụt lề hai space, mỗi declaration một dòng, gom property theo nhóm, comment đầu mỗi vùng.",
        "**Hồi quy (10 phút).** Tải lại mọi trang: sửa markup có thể đổi cách hiển thị. Xác nhận không gì hỏng.",
        "**Viết báo cáo (10 phút).** Lưu kết quả validator vào một file trong `homework/session-12/` để ghi chú đi cùng bài tập.",
      ],
      pitfalls: [
        "Xoá phăng phần tử bị báo lỗi thay vì sửa nó, và mất luôn tính năng được chấm.",
        "Tin một warning là dương tính giả — hãy giải thích trong ghi chú thay vì bẻ code đúng thành sai.",
        "Dùng auto-formatter viết lại luôn đường dẫn hoặc xoá comment của bạn.",
      ],
      files: ["Toàn bộ file HTML trong `project/`", "`project/css/style.css`"],
      videoTopic:
        "chiếu một lỗi HTML validation và một cảnh báo CSS từ validator, giải thích nguyên nhân và cách bạn sửa.",
    },
  },

  /* ------------------------------------------------------------------ 13 */
  13: {
    en: {
      scenario:
        "The site learns to listen: a real contact form on `contact.html` — labels, the right input types, validation attributes, a textarea, radio buttons and a checkbox — styled to match the rest of the design.",
      why: [
        "Input types are not cosmetic. `type=\"email\"` gives you keyboard hints and free validation; `type=\"text\"` gives you neither. Choosing wrong is the most common lost point in this homework.",
        "Every field needs a `<label for>` bound to an `id`. Unlabelled inputs are inaccessible and are marked down hard.",
        "`required`, `placeholder`, `maxlength` and `pattern` are client-side validation — cheap protection before anything reaches a server.",
        "A form with no `action` still needs to look finished: this course grades presentation and semantics, not backend processing.",
      ],
      demo:
        "Live visual target: fields stacked with visible labels above each control, comfortable spacing, focus states, a textarea tall enough to read, radios and a checkbox aligned with their labels, and a button that looks like part of the design.",
      steps: [
        "**Map the fields (10 min).** Decide what you actually need: name, email, subject, message, enquiry type (radio), consent (checkbox).",
        "**Build the skeleton (10 min).** `<form>` with a method and action, wrapped in the page's existing `main` region.",
        "**Add fields one at a time (25 min).** Each: a `<label for=\"x\">` + an `<input id=\"x\">` with the correct type. Test after every field, not at the end.",
        "**Validation attributes (10 min).** `required` on essentials, `placeholder` as example not label, `maxlength` on the textarea.",
        "**Style (20 min).** Width, spacing, label weight, focus outline, button appearance — in `css/style.css`.",
        "**Keyboard pass (5 min).** Tab through the whole form. Every control reachable, every label announced.",
      ],
      pitfalls: [
        "`<label>Name</label>` with no `for`/`id` pair.",
        "`placeholder` used as the only label — it disappears the moment the user types.",
        "A submit button with `type=\"button\"` where the task expects a real submit control (this is teaching markup, not a live endpoint).",
      ],
      files: ["`project/contact.html`", "`project/css/style.css`"],
      videoTopic:
        "show the contact form and walk through three different input types you used, explaining what each collects and which label belongs to which input.",
    },
    vi: {
      scenario:
        "Site biết lắng nghe: một form liên hệ thật trên `contact.html` — nhãn, đúng loại input, thuộc tính validate, textarea, radio và checkbox — được style khớp với phần còn lại.",
      why: [
        "Loại input không phải chuyện hình thức. `type=\"email\"` cho bạn gợi ý bàn phím và validation miễn phí; `type=\"text\"` không cho gì. Chọn sai là lý do mất điểm phổ biến nhất của bài này.",
        "Mọi trường cần `<label for>` gắn với một `id`. Input không nhãn thì không tiếp cận được và bị trừ mạnh.",
        "`required`, `placeholder`, `maxlength`, `pattern` là validation phía client — lớp bảo vệ rẻ tiền trước khi dữ liệu tới server.",
        "Form chưa có `action` vẫn phải trông hoàn chỉnh: môn học chấm trình bày và ngữ nghĩa, không chấm xử lý backend.",
      ],
      demo:
        "Mẫu sống: các trường xếp dọc với nhãn nhìn thấy được phía trên từng control, khoảng cách dễ chịu, có trạng thái focus, textarea đủ cao để đọc, radio và checkbox thẳng hàng với nhãn, nút bấm trông như một phần của thiết kế.",
      steps: [
        "**Liệt kê trường (10 phút).** Quyết định thứ thật sự cần: tên, email, chủ đề, lời nhắn, loại câu hỏi (radio), đồng ý (checkbox).",
        "**Dựng khung (10 phút).** `<form>` có method và action, đặt trong vùng `main` sẵn có của trang.",
        "**Thêm từng trường (25 phút).** Mỗi trường: `<label for=\"x\">` + `<input id=\"x\">` đúng type. Test sau mỗi trường, không đợi tới cuối.",
        "**Thuộc tính validate (10 phút).** `required` cho trường thiết yếu, `placeholder` là ví dụ chứ không phải nhãn, `maxlength` cho textarea.",
        "**Style (20 phút).** Chiều rộng, khoảng cách, độ đậm nhãn, viền focus, diện mạo nút — trong `css/style.css`.",
        "**Lướt bằng bàn phím (5 phút).** Tab suốt form. Mọi control với tới được, mọi nhãn được đọc lên.",
      ],
      pitfalls: [
        "`<label>Tên</label>` không có cặp `for`/`id`.",
        "Dùng `placeholder` làm nhãn duy nhất — nó biến mất ngay khi người dùng gõ.",
        "Nút gửi đặt `type=\"button\"` trong khi task cần control submit thật (đây là dạy mã đánh dấu, không phải endpoint sống).",
      ],
      files: ["`project/contact.html`", "`project/css/style.css`"],
      videoTopic:
        "chiếu form liên hệ và đi qua ba loại input bạn đã dùng, giải thích mỗi loại thu thập gì và nhãn nào thuộc input nào.",
    },
  },

  /* ------------------------------------------------------------------ 14 */
  14: {
    en: {
      scenario:
        "Navigation upgrades itself: a dropdown menu built in pure CSS — a sub-menu that appears on hover, positioned precisely, and styled to sit above the page content.",
      why: [
        "This is the week CSS positioning stops being abstract. `position: relative` on the parent plus `position: absolute` on the child is the pattern behind tooltips, modals and menus in every real interface.",
        "Showing and hiding with `display`/`visibility` on `:hover` teaches you state-based styling — the same mechanism behind `:focus` and `:active`.",
        "`z-index` and stacking contexts explain why your dropdown sometimes hides *behind* content. Learn it here, not in the final.",
        "Bonus Task 3 (“back to top”) is deliberately optional: attempt it only once the dropdown is solid.",
      ],
      demo:
        "Live visual target: hovering a parent item reveals a boxed sub-menu directly beneath it, flush-left with the parent, with a small transition, and it never disappears behind the main column.",
      steps: [
        "**Structure the markup (15 min).** Nested list: `<nav>` → `<ul>` → `<li>` → (`<a>` + a nested `<ul>` for children). The nested list is the sub-menu.",
        "**Hide it (5 min).** Child `<ul>` gets `position: absolute`, `top: 100%`, `left: 0`, `display: none`.",
        "**Anchor it (10 min).** Parent `<li>` gets `position: relative` so the absolute child positions against it, not the page.",
        "**Reveal on hover (10 min).** `nav li:hover > ul { display: block; }`. Hover and confirm the box appears exactly under its parent.",
        "**Style the box (15 min).** Background, border, padding, item spacing, hover colour on links, `z-index` above the main content.",
        "**Test the gaps (10 min).** Move the mouse diagonally from parent to child: no flicker, no disappearing menu. Adjust padding to close dead zones.",
      ],
      pitfalls: [
        "Absolute child with no relatively positioned ancestor — the menu flies to the page corner.",
        "`display: none` toggled by `opacity` alone: invisible but still clickable, so it steals hover from content below.",
        "Applying the dropdown to only one page and losing nav consistency.",
      ],
      files: ["`project/css/style.css`", "At least 2 HTML files (updated navigation)"],
      videoTopic:
        "show the dropdown menu and explain how `:hover` on the list item reveals the hidden sub-menu, and what `position: absolute` does there.",
    },
    vi: {
      scenario:
        "Điều hướng tự nâng cấp: một menu dropdown thuần CSS — sub-menu hiện ra khi hover, định vị chính xác, và được style để nằm trên nội dung trang.",
      why: [
        "Tuần này CSS positioning hết trừu tượng. `position: relative` trên phần tử cha cộng `position: absolute` trên phần tử con là mẫu đứng sau tooltip, modal và menu trong mọi giao diện thật.",
        "Ẩn/hiện bằng `display`/`visibility` khi `:hover` dạy bạn style theo trạng thái — cùng cơ chế với `:focus` và `:active`.",
        "`z-index` và stacking context giải thích vì sao dropdown đôi khi nằm *sau* nội dung. Học ở đây, đừng để tới bài thi cuối.",
        "Task 3 bonus (“về đầu trang”) cố ý là tùy chọn: chỉ làm khi dropdown đã vững.",
      ],
      demo:
        "Mẫu sống: rê chuột lên mục cha làm sub-menu dạng hộp hiện ra ngay bên dưới, lệch trái khớp mục cha, có transition nhẹ, và không bao giờ bị cột nội dung che mất.",
      steps: [
        "**Dựng cấu trúc (15 phút).** Danh sách lồng: `<nav>` → `<ul>` → `<li>` → (`<a>` + một `<ul>` lồng cho mục con). Danh sách lồng chính là sub-menu.",
        "**Ẩn nó (5 phút).** `<ul>` con nhận `position: absolute`, `top: 100%`, `left: 0`, `display: none`.",
        "**Neo nó (10 phút).** `<li>` cha nhận `position: relative` để phần tử absolute định vị theo cha, không theo trang.",
        "**Hiện khi hover (10 phút).** `nav li:hover > ul { display: block; }`. Hover và xác nhận hộp hiện đúng dưới mục cha.",
        "**Style hộp (15 phút).** Nền, viền, padding, khoảng cách mục, màu khi hover của link, `z-index` trên nội dung chính.",
        "**Test khoảng hở (10 phút).** Đưa chuột chéo từ cha sang con: không nhấp nháy, không menu biến mất. Chỉnh padding để lấp vùng chết.",
      ],
      pitfalls: [
        "Con absolute mà không có tổ tiên relative — menu bay ra góc trang.",
        "`display: none` đổi bằng `opacity` đơn thuần: không nhìn thấy nhưng vẫn bấm được, nên cướp hover của nội dung bên dưới.",
        "Áp dụng dropdown cho một trang duy nhất và mất nhất quán nav.",
      ],
      files: ["`project/css/style.css`", "Ít nhất 2 file HTML (cập nhật navigation)"],
      videoTopic:
        "chiếu menu dropdown và giải thích `:hover` trên mục danh sách làm hiện sub-menu ẩn thế nào, và `position: absolute` đảm nhiệm gì ở đó.",
    },
  },

  /* ------------------------------------------------------------------ 15 */
  15: {
    en: {
      scenario:
        "The last build week: your site adapts instead of breaking. Viewport meta, one honest media query, images that scale — checked on a phone-sized window rather than assumed.",
      why: [
        "Without `<meta name=\"viewport\">` a phone pretends to be 980px wide and every media query you wrote is useless. It is one line and it is the prerequisite for everything else this week.",
        "This course teaches `max-width` (desktop-first) queries. Industry default is `min-width` (mobile-first); Chapter 15 explains both, but the exams expect `max-width`.",
        "`img { max-width: 100%; }` is the single rule that prevents horizontal scrolling on a phone.",
        "Responsive testing is a habit: resize, watch the breakpoint fire, confirm nothing overlaps. That habit is what the final practical rewards.",
      ],
      demo:
        "Open the live visual target and drag the iframe narrower: at the breakpoint the columns stack, text reflows, images shrink, and no horizontal scrollbar ever appears.",
      steps: [
        "**Add the viewport tag (5 min).** One line in the `<head>` of all five pages, before the stylesheet link.",
        "**Pick a breakpoint (10 min).** Look at your own layout, not a magic number. Somewhere around 768px is where two columns get cramped here.",
        "**Write the query (20 min).** `@media (max-width: 768px) { … }`: stack `main` and `aside` to full width, shrink headings, adjust padding.",
        "**Make images fluid (10 min).** `img { max-width: 100%; height: auto; }` inside the base rules.",
        "**Test for real (15 min).** DevTools device toolbar: 375px, 768px, desktop. Check nav, table, form and media page specifically — tables and forms overflow first.",
        "**Final crawl (10 min).** Every page at every width, no horizontal scroll anywhere.",
      ],
      pitfalls: [
        "Viewport tag added to one page only.",
        "Fixed pixel widths on containers that exceed the phone screen.",
        "Using `min-width` on the exam when the course standard is `max-width`.",
        "A table forcing sideways scroll — wrap it or reduce columns in the query.",
      ],
      files: ["All 5 HTML files (viewport meta tag)", "`project/css/style.css`"],
      videoTopic:
        "show your site in the browser device toolbar, narrow the viewport live, and explain which media query rule fires and what it changes.",
    },
    vi: {
      scenario:
        "Tuần dựng bài cuối cùng: site của bạn thích ứng thay vì vỡ. Viewport meta, một media query tử tế, ảnh co giãn — kiểm trên cửa sổ cỡ điện thoại chứ không đoán.",
      why: [
        "Không có `<meta name=\"viewport\">`, điện thoại giả vờ rộng 980px và mọi media query bạn viết thành vô dụng. Một dòng duy nhất, và là điều kiện tiên quyết cho cả tuần này.",
        "Môn học dạy query `max-width` (desktop-first). Chuẩn ngành là `min-width` (mobile-first); Chương 15 giải thích cả hai, nhưng bài thi cần `max-width`.",
        "`img { max-width: 100%; }` là rule duy nhất ngăn cuộn ngang trên điện thoại.",
        "Test responsive là một thói quen: kéo resize, nhìn breakpoint kích hoạt, xác nhận không chồng lấn. Chính thói quen đó được thưởng ở bài thi thực hành cuối kỳ.",
      ],
      demo:
        "Mở mẫu sống và kéo iframe hẹp dần: tới breakpoint hai cột xếp chồng, chữ trôi lại, ảnh nhỏ đi, và không bao giờ xuất hiện thanh cuộn ngang.",
      steps: [
        "**Thêm thẻ viewport (5 phút).** Một dòng trong `<head>` của cả năm trang, trước link stylesheet.",
        "**Chọn breakpoint (10 phút).** Nhìn bố cục của chính bạn, không nhìn số thần kỳ. Quanh 768px là nơi hai cột bắt đầu chật ở site này.",
        "**Viết query (20 phút).** `@media (max-width: 768px) { … }`: xếp `main` và `aside` full width, thu nhỏ đề mục, chỉnh padding.",
        "**Cho ảnh chảy (10 phút).** `img { max-width: 100%; height: auto; }` đặt trong rule nền tảng.",
        "**Test thật (15 phút).** Device toolbar của DevTools: 375px, 768px, desktop. Soi riêng nav, table, form và trang media — bảng và form tràn đầu tiên.",
        "**Bò cuối (10 phút).** Mọi trang ở mọi chiều rộng, không cuộn ngang ở đâu cả.",
      ],
      pitfalls: [
        "Thẻ viewport chỉ thêm vào một trang.",
        "Container đặt width pixel cố định vượt quá màn điện thoại.",
        "Dùng `min-width` trong bài thi trong khi chuẩn môn học là `max-width`.",
        "Bảng buộc cuộn ngang — bọc nó hoặc giảm số cột trong query.",
      ],
      files: ["Cả 5 file HTML (thẻ meta viewport)", "`project/css/style.css`"],
      videoTopic:
        "chiếu site trong device toolbar của trình duyệt, thu hẹp viewport trực tiếp, và giải thích rule media query nào kích hoạt cùng thay đổi của nó.",
    },
  },
};

/** Sessions covered, ascending. */
export const BRIEF_SESSIONS = Object.keys(BRIEFS)
  .map(Number)
  .sort((a, b) => a - b);
