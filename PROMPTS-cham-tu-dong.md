# Prompt sinh hệ thống chấm tự động + môi trường chấm (INS2053)

Một prompt duy nhất. Copy nguyên khối trong dấu ``` bên dưới cho agent thực thi.

Kết quả agent phải giao: một công cụ chấm chạy **trong browser, offline, một file HTML
tự chứa** — dán link GitHub *hoặc* dán trực tiếp HTML/CSS vào, bấm chấm, ra một thẻ kết
quả gọn một màn hình để chụp ảnh và nộp.

Ba dữ kiện đã đo trên cây làm việc, prompt dựa vào chúng nên đừng bỏ:

- `_tools/qa-site.mjs` check 11 **cấm** `<form>`, `input[type=file]`, submit button,
  `FormData(`, `fetch(` trong mọi trang dưới `site/`. Đặt công cụ chấm vào `site/` là
  làm `npm run qa:site` fail và mất cổng deploy.
- `_tools/build-site.mjs` dùng allowlist `PUBLISH_ONLY = ["ebook","slides-html","homework"]`,
  và `NEVER_PUBLISH` đã có `_tools`. Nên `_tools/grader/` là chỗ an toàn duy nhất không
  cần sửa builder.
- Rubric thật: 15 sheet `homework/session-NN/homework.md`, mỗi sheet đúng 10 điểm, tổng
  76 dòng tiêu chí. Một phần trong đó **không** chấm máy được.

Đã kiểm chứng bằng request thật: `api.github.com` và `raw.githubusercontent.com` đều trả
`Access-Control-Allow-Origin: *` (HTTP 200), nên chế độ dán link chạy thuần client.

---

## Prompt — sinh bộ chấm tự động và môi trường chấm

```
Bạn xây một hệ thống chấm tự động cho học phần INS2053 (Web Authoring and Web
Management, VNU-IS, sinh viên QUỐC TẾ), kèm môi trường chấm chạy trong browser.

Thư mục gốc: C:\Users\N4G\OneDrive\11. VNU - IS School\INS2053 - WEB

BƯỚC 1 — ĐỌC TRƯỚC KHI VIẾT DÒNG CODE NÀO
- _archive/ins2053_part9_autograding.md, mục 9.1.2 (bảy nguyên tắc bất biến) và
  9.11 (tự kiểm tra bộ test bằng fixture). Đây là thiết kế đã chốt, không thiết kế
  lại từ đầu.
- Cả 15 file homework/session-NN/homework.md. Lấy đúng bảng "## Grading Rubric" và
  phần "## Requirements" của từng buổi. Rubric là NGUỒN SỰ THẬT duy nhất về điểm.
- _tools/qa-site.mjs mục "== 11. submission and grading stay disabled ==" và
  "== 6. content policy ==". Hai check này quyết định công cụ được đặt ở đâu.
- _tools/build-site.mjs dòng 49 và 52 (PUBLISH_ONLY, NEVER_PUBLISH).
- _tools/build-html-slides.mjs và _tools/qa-site.mjs: học cách viết builder + QA gate
  của repo này (header comment giải thích lý do, check đọc lại output từ disk, exit
  non-zero khi fail). Bộ mới phải cùng phong cách.
- _tools/site-assets/site.css: lấy đúng design token đang dùng (--accent: #3157d5,
  --accent-green: #17845b, --accent-orange: #e96a2c, --text-primary: #111a2e,
  --radius: 14px, --font-sans, khối [data-theme="dark"]). Đừng phát minh palette mới.

PHẠM VI v1 — CHỐT CỨNG
Chấm homework buổi 01–15. KHÔNG chấm midterm, final, capstone.
Lý do bắt buộc tôn trọng: exams/midterm/rubric.md, exams/final/rubric.md,
exams/*/sample-solution.md và project/rubric.md là tài liệu KHÔNG public. Công cụ
này là file HTML sinh viên mở được, nên nhúng rubric thi vào đó là làm lộ đáp án.
Nếu thấy cần chấm thi, dừng lại và hỏi, đừng tự làm.

BƯỚC 2 — FILE PHẢI TẠO (đúng đường dẫn này, không đặt chỗ khác)
  _tools/grader/rubrics/session-01.json … session-15.json   15 file rubric máy đọc
  _tools/grader/src/html-parse.js      tokenizer HTML nhỏ, 0 dependency
  _tools/grader/src/css-parse.js       parser CSS nhỏ, 0 dependency
  _tools/grader/src/checks.js          thư viện check, thuần hàm, chạy được cả Node
  _tools/grader/src/grade.js           máy chấm: (rubric, files) -> result object
  _tools/grader/src/ui.js              chỉ phần UI browser
  _tools/grader/src/grader.css         style, dùng token của site.css
  _tools/grader/src/index.template.html
  _tools/grader/fixtures/session-NN/pass/  và  fail/   bài mẫu để tự kiểm tra
  _tools/grader/cham-bai.html          OUTPUT: một file tự chứa, mở bằng double-click
  _tools/build-grader.mjs              inline css+js+rubric vào một file
  _tools/qa-grader.mjs                 cổng verify
Thêm vào package.json: "build:grader", "qa:grader", "clean:grader". Không đổi script
đang có.

BƯỚC 3 — MÔI TRƯỜNG CHẤM: cham-bai.html
Một file HTML tự chứa. Không CDN, không import từ mạng, không build tool để MỞ nó.
Double-click là chạy trên Chrome/Edge/Firefox. Mở từ file:// phải hoạt động.

Đầu trang: chọn buổi (dropdown 01–15, đọc tên bài từ rubric JSON đã inline).

Hai tab nhập bài, cùng một máy chấm phía sau:

  TAB "Dán code" — mặc định, luôn hoạt động, không cần mạng.
    - Một ô textarea cho HTML, một ô cho CSS, một ô nhập tên file HTML (mặc định
      index.html). Nút "+ Thêm file" cho bài nhiều trang (buổi 05, 06, 09, 10, 11).
    - Rubric nào cần nhiều file mà sinh viên chỉ dán một file: chấm phần chấm được,
      những dòng còn lại đánh dấu "chưa có file", KHÔNG cho điểm và KHÔNG trừ oan —
      ghi rõ ở thẻ kết quả là thiếu file nào.
    - Ô kéo-thả cả folder: dùng <input type="file" webkitdirectory> và
      DataTransferItem, đọc bằng FileReader. Đây là input CỤC BỘ, không upload đi đâu.

  TAB "Dán link GitHub" — cần mạng.
    - Nhận cả 3 dạng: https://github.com/user/repo,
      .../tree/<branch>/<đường/dẫn>, và URL raw.
    - Gọi api.github.com/repos/{owner}/{repo}/git/trees/{sha}?recursive=1 rồi tải
      từng file .html/.css qua raw.githubusercontent.com. Cả hai host đã kiểm chứng
      trả Access-Control-Allow-Origin: * nên fetch thẳng từ browser được, KHÔNG cần
      proxy, KHÔNG cần token.
    - CHỐT commit SHA: đọc SHA của branch trước, rồi tải mọi file theo SHA đó, và IN
      SHA 7 ký tự lên thẻ kết quả. Nguyên tắc 6 mục 9.1.2: chấm theo commit cố định,
      không theo HEAD trôi nổi.
    - Giới hạn cứng: chỉ .html/.css/.md, tối đa 40 file, mỗi file tối đa 512 KB, tổng
      tối đa 5 MB, timeout 15 s mỗi request. Vượt thì báo lỗi rõ và dừng.
    - Rate limit GitHub chưa đăng nhập là 60 request/giờ mỗi IP. Bắt HTTP 403 kèm
      x-ratelimit-remaining: 0 và nói đúng câu: hết lượt, chờ đến <giờ reset>, hoặc
      chuyển sang tab Dán code. Không được để màn hình trắng.

RÀNG BUỘC AN TOÀN — VI PHẠM LÀ LÀM LẠI
- KHÔNG thực thi code sinh viên. Không innerHTML với bài của sinh viên, không
  document.write, không eval, không new Function, không <iframe srcdoc>, không
  DOMParser rồi chèn vào trang. Bài của sinh viên là DỮ LIỆU: chỉ tokenize bằng
  regex/parser tự viết trong html-parse.js và css-parse.js.
- Muốn cho xem preview thì render bằng <iframe sandbox> KHÔNG có allow-scripts và
  KHÔNG có allow-same-origin, nội dung nạp qua Blob URL, và nêu rõ trong comment vì
  sao hai flag đó phải vắng. Nếu không tự tin làm đúng, BỎ preview.
- KHÔNG gửi bài đi đâu. Chỉ hai host được phép fetch: api.github.com và
  raw.githubusercontent.com, và chỉ ở tab GitHub. Không analytics, không telemetry.
- Thêm <meta http-equiv="Content-Security-Policy"> với default-src 'none';
  script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: blob:;
  connect-src https://api.github.com https://raw.githubusercontent.com. Nếu CSP làm
  chính công cụ hỏng khi mở bằng file://, ghi lại đúng triệu chứng trong header
  comment và chọn cấu hình chạy được — đừng để một file mở ra là trắng.
- Escape mọi chuỗi lấy từ bài sinh viên trước khi hiện trong thông báo lỗi. Tên class
  của sinh viên có thể là </div><script>.

BƯỚC 4 — RUBRIC MÁY ĐỌC: session-NN.json
Dịch bảng "## Grading Rubric" trong homework.md sang JSON. Tổng điểm mỗi buổi phải
đúng 10 — nếu lệch, dừng lại và báo, đừng tự làm tròn.

Schema (giữ đúng tên khoá):
{
  "session": 1,
  "title": "Homework 1: My First Web Page",
  "total": 10,
  "files": [{ "path": "index.html", "required": true }],
  "criteria": [
    {
      "id": "s01-html-structure",
      "label": "HTML structure",
      "points": 3,
      "tier": "auto",
      "rubricNote": "Correct DOCTYPE, html/head/body, all tags closed and nested",
      "checks": [
        { "type": "hasDoctype",   "weight": 0.8 },
        { "type": "hasElement",   "tag": "html",  "attr": { "lang": "*" }, "weight": 0.6 },
        { "type": "tagsBalanced", "weight": 1.0 }
      ],
      "hint": "Thiếu </p> ở dòng 14. Xem ebook chương 01 mục HTML boilerplate.",
      "lesson": "ebook/01-introduction-to-dreamweaver.md"
    }
  ]
}

"tier" nhận đúng 3 giá trị, và đây là phần quan trọng nhất của cả hệ thống:
  "auto"   máy chấm hết, điểm là điểm cuối.
  "assist" máy đo được một phần, người xác nhận. Ví dụ buổi 03 "alt text is
           descriptive": máy đếm được alt có tồn tại và dài hơn 3 từ, KHÔNG đo được
           có mô tả đúng ảnh hay không.
  "manual" máy không chấm được, chỉ hiện checklist cho người chấm tick. Bắt buộc
           dùng cho những dòng rubric sau, đã đọc thật trong 15 sheet:
             buổi 01 "Content — own words"
             buổi 04 "Overall look — clean and professional"
             buổi 05 "Visual quality — looks like a real website"
             buổi 06 "Overall consistency — unified and professional"
             buổi 07 "Readability"
             buổi 08 "Midterm reflection — 3 mistakes with explanations"
             buổi 11 "Content quality — well-written, no errors"
             buổi 11 "Visual polish"
             buổi 12 "Zero errors on W3C validator" (validator là dịch vụ ngoài,
                     v1 không gọi mạng để chấm; yêu cầu sinh viên nộp ảnh chụp)
             buổi 15 "Mobile layout looks good", "Site tested at multiple widths"
Cấm gán "auto" cho những dòng trên. Một máy chấm nói chắc chắn về cái nó không đo được
thì tệ hơn không có máy chấm. Thẻ kết quả phải phân biệt rõ ba tier bằng nhãn chữ, KHÔNG
chỉ bằng màu — sinh viên mù màu vẫn phải đọc được, và ảnh chụp có thể đen trắng.

BƯỚC 5 — THƯ VIỆN CHECK (checks.js)
Mỗi check là hàm thuần: (input, spec) -> { pass, score01, detail, evidence }.
"evidence" là dòng + đoạn trích ngắn để sinh viên tìm được chỗ sai. Tối thiểu phải có:
  hasDoctype, hasElement(tag, attr, minCount), tagsBalanced, tagsNested,
  attrPresent(tag, attr), attrNotEmpty, singleH1, headingOrder,
  imgHasAlt(minWords), relativePathOnly, fileExists, folderExists,
  cssRuleExists(selector), cssDeclEquals(selector, prop, value),
  cssDeclExists(selector, prop), cssLinkedExternally, cssNoInlineStyle,
  cssBalancedBraces, mediaQueryExists(maxWidth, minDeclCount),
  viewportMetaPresent, minCount(tag, n), textWordCount(tag, n),
  navLinksResolve(files), tableHasParts([caption,thead,tbody,th,td]),
  mediaHasFallback(tag), formLabelsBound.
So màu phải chuẩn hoá: #fff = #FFFFFF = white = rgb(255,255,255). Rubric buổi 04 và
midterm đều so màu, làm sai chỗ này là trừ oan cả lớp.
Mỗi hàm ghi comment nói rõ nó KHÔNG kết luận được điều gì.

BƯỚC 6 — THẺ KẾT QUẢ ĐỂ CHỤP ẢNH VÀ NỘP
Đây là đầu ra sinh viên nộp, nên thiết kế cho việc chụp màn hình, không phải cho việc
cuộn trang:
- Lọt trong 1200×900 px, KHÔNG cần cuộn ở mức chi tiết mặc định.
- Trên cùng: tên buổi, điểm lớn dạng "7.5 / 10", và ba con số tách riêng: auto đã
  chốt, assist chờ xác nhận, manual chưa chấm. KHÔNG gộp thành một điểm giả vờ là
  điểm cuối.
- Ô danh tính do sinh viên tự nhập: Họ tên, MSSV, Lớp. Hiện lại trên thẻ để ảnh chụp
  có thông tin. Không tự đoán, không lấy từ đâu khác.
- Dấu vết kiểm chứng được, in ngay trên thẻ: thời điểm chấm theo giờ địa phương +
  ISO UTC, phiên bản rubric, phiên bản công cụ, và nguồn bài: hoặc "GitHub
  owner/repo@<sha7>", hoặc "Dán code — N file, <tổng KB>", kèm SHA-256 8 ký tự đầu
  của nội dung đã chấm (dùng crypto.subtle.digest, có sẵn trong browser). Chuỗi này
  làm ảnh chụp khó sửa mà không bị phát hiện, và cho phép giảng viên chấm lại đúng
  bài đó.
- Bảng tiêu chí: nhãn, điểm/điểm tối đa, tier, và với mỗi dòng mất điểm thì một dòng
  bằng chứng + một câu sửa. Câu sửa phải nói được chỗ nào và sửa thế nào, chiếu tới
  chương ebook — nguyên tắc 7 mục 9.1.2.
- Nút "Tải ảnh PNG": vẽ thẻ lên <canvas> rồi canvas.toBlob() để tải về, đặt tên
  INS2053-HW<NN>-<MSSV>.png. Không dùng thư viện ngoài. Nếu tự vẽ canvas quá nặng,
  thay bằng nút "In / Lưu PDF" dùng window.print() với @media print đã style sẵn, và
  nói rõ trong README lý do chọn cách đó.
- Nút "Tải JSON": xuất result object đầy đủ. Giảng viên nhập lại được, và đây là thứ
  bảng điểm dùng, không phải ảnh.
- @media print: một thẻ = một trang A4, không cắt giữa bảng.
- Hỗ trợ [data-theme="dark"] như site.css, nhưng ảnh chụp mặc định là theme sáng.

BƯỚC 7 — FIXTURE VÀ CỔNG VERIFY (mục 9.11)
Bộ test không có ai test thì không tin được. Với mỗi buổi tạo 2 bài mẫu trong
_tools/grader/fixtures/session-NN/: pass/ đạt gần trọn điểm auto, fail/ sai có chủ ý
mỗi tiêu chí một lỗi. Viết ngay cạnh mỗi fixture một file expected.json ghi điểm auto
mong đợi.

_tools/qa-grader.mjs (chạy bằng node, đọc lại output từ disk như qa-site.mjs) phải fail
non-zero khi:
  1. Tổng điểm một rubric khác 10, hoặc tier không thuộc {auto,assist,manual}.
  2. Một criteria tier="auto" mà không có checks, hoặc dùng "type" không tồn tại
     trong checks.js.
  3. Chấm fixture pass/ hoặc fail/ ra điểm khác expected.json.
  4. cham-bai.html chứa eval(, new Function(, document.write, .innerHTML =,
     srcdoc, hoặc <iframe> thiếu thuộc tính sandbox.
  5. cham-bai.html có fetch tới host ngoài api.github.com và raw.githubusercontent.com.
  6. cham-bai.html tham chiếu file ngoài (src=/href= trỏ http, hoặc trỏ file cục bộ
     không tồn tại) — nó phải tự chứa hoàn toàn.
  7. Bất kỳ dòng rubric nằm trong danh sách bắt buộc manual ở BƯỚC 4 lại bị gán auto.
  8. Bất kỳ nội dung nào từ exams/ hoặc project/rubric.md xuất hiện trong
     _tools/grader/ — chống lộ đáp án.
In cuối cùng đúng một dòng: GRADER QA PASS hoặc GRADER QA FAIL, theo mẫu qa-site.mjs.

Chạy đủ và phải PASS hết trước khi báo xong:
  node _tools/build-grader.mjs
  node _tools/qa-grader.mjs
  npm run qa
  npm run build:site && npm run qa:site      <-- chứng minh không phá cổng cũ
Nếu qa:site fail vì công cụ chấm lọt vào site/, đó là lỗi của bạn: đưa nó ra khỏi
site/, đừng nới lỏng check 11 trong qa-site.mjs.

BƯỚC 8 — QUY TRÌNH NỘP, VIẾT VÀO README CỦA GRADER
Viết _tools/grader/README.md, tiếng Việt, gồm đúng 6 bước cho sinh viên:
  1. Mở _tools/grader/cham-bai.html (double-click, không cần cài gì).
  2. Chọn buổi.
  3. Dán link GitHub repo bài làm, HOẶC dán HTML/CSS vào tab Dán code.
  4. Điền Họ tên, MSSV, Lớp. Bấm "Chấm bài".
  5. Chụp toàn bộ thẻ kết quả (Windows: Win+Shift+S), hoặc bấm "Tải ảnh PNG".
  6. Nộp ảnh + file JSON theo kênh giảng viên thông báo.
Và một mục cho giảng viên: cách chấm lại một bài từ file JSON, cách xác minh ảnh chụp
bằng chuỗi SHA-256 trên thẻ, cách sửa rubric rồi chạy lại build:grader + qa:grader.
Nói thẳng trong README: điểm auto là điểm máy, dòng assist và manual phải có người
xem, tổng trên thẻ CHƯA phải điểm cuối cùng cho tới khi giảng viên xác nhận.

CÁCH LÀM VIỆC
- Băm nhỏ, làm liên tục, mỗi tool call một việc: một rubric JSON, một nhóm check, một
  phần UI. Đừng nghĩ lâu rồi không ra được task nào.
- Thứ tự bắt buộc: checks.js + parser trước → rubric buổi 01 → fixture buổi 01 →
  qa-grader.mjs → chạy PASS → mới làm 14 buổi còn lại → UI → build-grader.mjs.
  Lý do: có cổng verify trước khi có 15 rubric thì sai một cái phát hiện ngay.
- Xong mỗi buổi báo một dòng rồi đi tiếp, không hỏi lại.
- Trả lời bằng tiếng Việt. Nhãn trên giao diện: tiếng Việt cho hướng dẫn, giữ nguyên
  tiếng Anh cho tên tiêu chí rubric và tên thẻ HTML/CSS — sinh viên quốc tế đọc rubric
  bản tiếng Anh.

ĐỪNG
- Đừng sửa homework/session-NN/homework.md. Rubric là nguồn sự thật, không phải thứ
  bẻ cho khớp máy chấm. Thấy rubric mơ hồ thì ghi vào README mục "Rubric cần làm rõ".
- Đừng thêm dependency vào package.json. Cả bộ chạy bằng Node có sẵn + browser.
  esbuild/marked/react đang có là của builder khác, đừng mượn.
- Đừng đặt bất cứ thứ gì của grader vào site/, slides-html/ hay ebook/.
- Đừng sửa _tools/qa-site.mjs, _tools/build-site.mjs, _tools/build-html-slides.mjs,
  _tools/canvas-runtime/*, canvases/*.
- Đừng tự deploy, đừng commit, đừng push. Làm xong, chạy verify, báo cáo.
- Đừng nói "đã verify" chung chung. Nói rõ: cái gì chạy được và ra kết quả gì, cái gì
  chỉ kiểm được bằng đọc, cái gì không kiểm được.
```

---

## Bốn quyết định thiết kế đã chốt trong prompt

**Đặt ở `_tools/grader/`, không ở `site/`.** `qa-site.mjs` check 11 cấm `<form>`,
`input[type=file]`, `fetch(` trong mọi trang `site/`. Công cụ chấm cần cả ba. Đặt vào
`site/` là phải nới check — mà check đó tồn tại để trang public không hứa một tính năng
nộp bài chưa có. `_tools` đã nằm trong `NEVER_PUBLISH` nên không cần sửa builder.

**Ba tier `auto`/`assist`/`manual`.** Đọc hết 76 dòng rubric thì có khoảng 12 dòng máy
không đo được: "own words", "looks professional", "visual polish", "zero errors on W3C
validator". Nếu để máy đoán những dòng này, điểm sai theo hướng khó phát hiện. Prompt liệt
kê đích danh và bắt `qa-grader.mjs` fail nếu chúng bị gán `auto`.

**Chấm thuần client, không thực thi code sinh viên.** Đúng nguyên tắc 1 và 5 mục 9.1.2
của `_archive/ins2053_part9_autograding.md`. Không server nghĩa là không phải nuôi hạ tầng,
không token, không rủi ro lộ secret; và vì bài chỉ được tokenize chứ không chạy, không cần
sandbox container.

**Chỉ homework 01–15.** `exams/*/rubric.md`, `exams/*/sample-solution.md` và
`project/rubric.md` không public. Công cụ này là file HTML sinh viên mở được, nhúng rubric
thi vào là lộ đáp án — nên `qa-grader.mjs` có hẳn một check chặn nội dung từ `exams/` lọt
vào `_tools/grader/`.
