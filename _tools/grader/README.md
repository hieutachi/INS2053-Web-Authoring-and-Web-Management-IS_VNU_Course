# Chấm bài tập về nhà INS2053

Một file HTML tự chứa, dùng tại URL `/cham-bai.html` của website môn học hoặc mở
`_tools/grader/cham-bai.html` bằng double-click. Không cài gì, không cần mạng ở chế độ
dán code, bài làm không được gửi đi đâu.

Hướng dẫn vận hành đầy đủ cho sinh viên và giảng viên: [`../../HUONG-DAN-cham-bai.md`](../../HUONG-DAN-cham-bai.md).

Điểm trên thẻ **chưa phải điểm cuối cùng**. Máy chỉ chốt những dòng `AUTO`; dòng
`ASSIST` máy đo được một phần và dòng `MANUAL` máy không kết luận gì — cả hai loại
đó phải có người xem. Giảng viên là người chốt điểm.

---

## Dành cho sinh viên — 6 bước

1. Mở công cụ trên website môn học tại `/cham-bai.html`. Nếu giảng viên gửi file
   `_tools/grader/cham-bai.html`, có thể double-click để dùng offline. Chrome, Edge
   và Firefox đều được; laptop dễ đọc và chụp thẻ kết quả hơn điện thoại.
2. Chọn đúng **Buổi** ở góc trên phải. Rubric và tên bài trên thẻ phải khớp bài đang
   tự kiểm.
3. Đưa bài vào công cụ bằng một trong hai tab:
   - **Dán code** — cách ít lỗi nhất là bấm chọn cả thư mục bài làm hoặc kéo thả thư
     mục. Cũng có thể dán từng file vào các ô. Ghi đường dẫn tương đối đúng như trong
     repo, dùng dấu `/`, ví dụ `index.html`, `css/style.css`.
   - **Dán link GitHub** — dán `https://github.com/tenban/repo`, link
     `.../tree/<nhánh>/<thư/mục>`, hoặc link raw. Công cụ chỉ gửi request `GET` để
     đọc repo công khai; cách này cần mạng.
4. Nếu dán code thủ công, khai báo cả ảnh, video, font và favicon mà HTML/CSS tham
   chiếu: bấm **+ Thêm ảnh (chỉ đường dẫn)** rồi nhập, ví dụ
   `images/hero.png`. Không dán dữ liệu nhị phân. Khi chọn thư mục hoặc dùng GitHub,
   các asset này được giữ tự động dưới dạng đường dẫn; nội dung byte không bị đọc.
5. Điền **Họ và tên**, **MSSV**, **Lớp**, rồi bấm **Chấm bài**. Đọc từng dòng, sửa
   file gốc và chấm lại cho đến khi hết lỗi cơ học có thể sửa.
6. Khi cần nộp minh chứng, bấm **In / Lưu PDF** hoặc chụp toàn bộ thẻ kết quả
   (Windows: `Win + Shift + S`), rồi bấm **Tải JSON**. Nộp cả PDF/ảnh và JSON theo
   kênh giảng viên thông báo. PDF có thể dài hơn một trang A4; JSON giúp giảng viên
   chấm lại đúng bài đã tạo ra thẻ.

File JSON chứa nội dung các file text đã chấm và đường dẫn asset. Đừng sửa JSON:
SHA-256 tính từ dữ liệu đó sẽ không còn khớp với thẻ và `regrade.mjs` phát hiện được.

### Đọc thẻ kết quả

| Nhãn | Nghĩa |
|---|---|
| `AUTO` | Máy kiểm đầy đủ phần được mô tả trong dòng này và tính điểm cơ học. |
| `ASSIST` | Máy tính điểm phần đo được; ghi chú nói rõ phần nào vẫn cần người xem. |
| `MANUAL` | Máy không cho điểm dòng này; giảng viên phải xem bài. |
| `Chưa có file` | Không tìm thấy file mà dòng rubric cần. Dòng bị chặn, **không bị gán 0**, nhưng cũng chưa phải điểm được công nhận. |

Bốn ô ở đầu thẻ là bốn đại lượng riêng:

- **MÁY ĐÃ CHẤM**: tổng điểm trên các dòng `AUTO` và `ASSIST` mà công cụ chạy được;
- **CHỜ NGƯỜI XEM**: số điểm thuộc dòng `MANUAL`;
- **CHƯA CHẤM ĐƯỢC**: số điểm đang bị chặn vì thiếu file;
- **TỔNG RUBRIC**: tổng trọng số của rubric, thường là 10.

Không cộng bốn ô thành điểm cuối. `ASSIST` vẫn cần đọc ghi chú, `MANUAL` cần người
chấm, và `Chưa có file` không chứng minh bài đạt yêu cầu. Công cụ cũng không quyết
định nội dung có phải do sinh viên tự viết, thiết kế có đẹp, website có dùng tốt trên
máy thật, bài có nộp đúng hạn hay có vi phạm quy định học thuật. Giảng viên chốt điểm.

Không có mạng, repo riêng tư, hoặc GitHub báo hết lượt tải API (thường 60 lượt/giờ
cho mỗi IP khi không đăng nhập): chuyển sang tab **Dán code** và chọn thư mục tại máy.
Cách cục bộ không tải bài lên mạng và dùng cùng một bộ chấm.

### File được đọc và giới hạn GitHub

Công cụ đọc nội dung của `.html`, `.htm`, `.css`, `.md`. Mọi phần mở rộng khác được
giữ dưới dạng **đường dẫn asset rỗng** để kiểm tra thư mục `images/` và đích
`src`/`href`; công cụ không kiểm tra ảnh có đẹp hoặc byte ảnh có hợp lệ hay không.

Tối đa 40 file kể cả asset; mỗi file text tối đa 512 KB; tổng nội dung text tối đa
5 MB; mỗi request GitHub chờ tối đa 15 giây. Link GitHub được chốt theo **commit
SHA** và 7 ký tự đầu in trên thẻ. Sửa repo sau đó không thay đổi thẻ/JSON đã sinh.

Kiểm tra quy tắc đặt tên chỉ tính file bài làm. Metadata chuẩn của repo như
`README.md`, `LICENSE`, `SECURITY.md`, `CODEOWNERS`, `.gitignore` và `.github/**`
không làm mất điểm; tên vi phạm thật như `About.html` hoặc `my page.html` vẫn bị bắt.

---

## Dành cho giảng viên

### Xuất bản lên website public

Không sửa `_tools/grader/cham-bai.html` hoặc `site/cham-bai.html` bằng tay. Hai file
này là artefact sinh ra từ `_tools/grader/src/`, `_tools/grader/rubrics/` và được
kiểm trước khi phát hành.

Chạy một lượt từ thư mục gốc:

```bash
npm ci                                      # lần đầu hoặc khi package-lock đổi
npm run qa:grader                           # build + 11 cổng riêng của grader
npm run build:site && npm run qa:site       # build site + 13 cổng public site
npm run qa                                  # tài liệu, Canvas, link, HTML slides
node _tools/test-strip-literals.js
```

`npm run build:site` luôn chạy `build-grader.mjs` trước, rồi sao chép artefact sang
`site/cham-bai.html` **byte-for-byte**. `qa:site` check 13 so sánh hai bản; khác một
byte là fail. Sau khi tất cả lệnh pass, push nhánh được Vercel kết nối hoặc chạy
`npx vercel --prod` trong repo đã link. Cấu hình deploy nằm trong `vercel.json`:

- build command: `npm run build:site`;
- output directory: `site`;
- `/cham-bai.html`: CSP chỉ cho script/style nội tuyến và hai host GitHub đọc-only;
- `/cham-bai.html`: `Cache-Control: no-store` để rubric cũ không bị giữ trong cache.

Nếu `vercel --prod` trả `BLOCKED` / `TEAM_ACCESS_REQUIRED`, xem `HUONG-DAN-cham-bai.md`
§12 — đường deploy prebuilt từ thư mục không có `.git`, kèm bước hoàn nguyên
`package-lock.json` sau khi `vercel build` chạy `npm install`.

Sau deploy, mở `/cham-bai.html`, chấm một fixture và kiểm response headers. Trang chủ,
homework index, 15 homework sheet và 15 session hub phải dẫn tới công cụ: 32 trang.

### Chấm lại một bài từ file JSON

```bash
node _tools/grader/regrade.mjs duong/dan/INS2053-HW14-22070999.json
```

JSON mang theo nội dung file text và đường dẫn asset đã được chấm. Lệnh chạy rubric
**hiện tại** trên chính dữ liệu đó, in từng dòng và trả mã thoát:

- `0`: SHA-256 và mọi dòng chấm lại khớp;
- `1`: JSON bị sửa hoặc điểm/tình trạng một dòng đã đổi;
- `2`: thiếu đối số, JSON hỏng, thiếu `submission`, hoặc không có rubric tương ứng.

Ba lớp đối chiếu là SHA-256, kết quả từng dòng rubric và phiên bản công cụ ghi trong
JSON. Rubric thay đổi sau ngày sinh viên tự kiểm có thể làm kết quả khác mà không phải
gian lận; đọc chênh lệch trước khi vào điểm và áp dụng cùng một policy cho cả lớp.

### Xác minh ảnh/PDF và secure context

Trên thẻ có `SHA-256: xxxxxxxx` — 8 ký tự hex đầu tính từ dữ liệu đã chấm. Đối chiếu
với `SHA-256 tính lại` của `regrade.mjs`: khớp nghĩa là ảnh/PDF và JSON nói về cùng
một bài. Sửa một ký tự trong file text hoặc một đường dẫn asset sẽ đổi chuỗi.

`crypto.subtle` cần secure context. Chrome thực tế đã xác nhận các trường hợp sau:

| Cách mở | SHA-256 |
|---|---|
| Website Vercel qua `https://` | Có |
| Double-click `file://` | Có |
| `http://localhost` hoặc `http://127.0.0.1` | Có trên chính máy chạy server |
| `http://<LAN-IP>` từ máy sinh viên | **Không có** |

Vì vậy không phục vụ file từ laptop giảng viên bằng HTTP LAN. Công cụ vẫn chấm nhưng
mọi thẻ sẽ ghi `không tính được trên trình duyệt này`, làm mất đối chiếu ảnh–JSON.
Dùng URL Vercel HTTPS hoặc gửi file HTML để sinh viên mở trực tiếp.

### Sửa rubric — đúng thứ tự

1. Sửa bảng `## Grading Rubric` trong `homework/session-NN/homework.md`; đây là nguồn
   sự thật sinh viên đọc.
2. Sửa `_tools/grader/rubrics/session-NN.json` cho cùng tiêu chí, điểm và tier.
3. Nếu thay semantics của check, sửa `_tools/grader/src/checks.js`; không nhét nhận
   định chủ quan vào check `auto`.
4. Cập nhật cả fixture `pass/`, `fail/` và
   `_tools/grader/fixtures/session-NN/expected.json` cho chủ đích mới.
5. Chạy `npm run qa:grader`, sau đó `npm run build:site && npm run qa:site`.

Không sửa `expected.json` chỉ để làm cổng xanh. Trước tiên đọc diff dòng G4/G6, xác
nhận rubric nguồn, fixture và check cùng mô tả một yêu cầu.

### 11 cổng grader và 13 cổng site

`qa:grader` chạy 15 buổi, 76 dòng rubric và 42 loại check:

| Cổng | Điều bị chặn |
|---|---|
| G1 | Rubric sai schema, tier lạ, hoặc tổng không đúng 10. |
| G2 | Thiếu fixture `pass/`, `fail/` hoặc `expected.json`. |
| G3 | Bài mẫu đúng bị mất điểm. |
| G4 | Bài mẫu sai không mất điểm đúng dòng dự kiến. |
| G5 | Bài rỗng bị gán 0 thay vì `Chưa có file`. |
| G6 | Điểm trôi khỏi `expected.json`. |
| G7 | Check crash, parse error hoặc loại check không tồn tại. |
| G8 | Kết quả không tất định hoặc loại check không rubric nào dùng. |
| G9 | Dòng cần phán đoán con người bị gán `auto`. |
| G10 | Artefact không tự chứa hoặc có thể thực thi/chèn bài sinh viên. |
| G11 | Nội dung thi hoặc project rubric lọt vào công cụ. |

`qa:site` kiểm output đã build: (1) số trang; (2) cấu trúc document; (3) ID trùng;
(4) link/asset nội bộ; (5) anchor; (6) policy nội dung; (7) encoding; (8) markdown
chưa render; (9) text điều hướng escape đúng một lần; (10) đủ session hub; (11) không
có UI/API nộp bài trong các trang khóa học; (12) shared assets; và (13) công cụ tự
kiểm byte-identical, self-contained, không upload dữ liệu, chỉ đọc đúng hai host
GitHub, đồng thời có ít nhất 32 link dẫn tới nó.

### Baseline kiểm thử của bản phát hành này

| Lượt kiểm | Kết quả |
|---|---|
| `npm run qa:grader` | PASS 15/15 buổi, 42 loại check, đủ G1–G11. |
| `npm run build:site && npm run qa:site` | PASS 14/14 nhóm trên 69 trang HTML. |
| Chrome/CDP browser sweep | PASS 28/28: `file://`, 15 fixture đúng, fixture sai/rỗng/thiếu file, chống injection, JSON + regrade + tamper, PDF, asset path, tính tất định, CSP và console. |
| GitHub live dưới production CSP | PASS với repo công khai: chỉ `GET`, `api.github.com` và `raw.githubusercontent.com`, không CSP violation. |
| `npm run qa` + literal-strip test | PASS toàn bộ QA tài liệu hiện có. |

Nếu một lần phát hành sau không đạt cùng các cổng bắt buộc, không deploy bằng cách
nới gate hoặc sửa trực tiếp output.

### Rubric cần làm rõ

Những dòng dưới đây rubric viết bằng ngôn ngữ người, máy chỉ đo được phần cơ học.
Chúng đang là `assist` hoặc `manual`, và cổng G9 chặn việc gán chúng thành `auto`.

| Buổi | Dòng | Máy không kết luận được |
|---|---|---|
| 01 | Content — *own words* | Chữ có phải sinh viên tự viết hay không. |
| 03 | Images + alt text — *descriptive* | Alt có mô tả đúng ảnh hay không. |
| 04 | Overall look — *clean and professional* | Đẹp hay không đẹp. |
| 05 | Visual quality — *looks like a real website* | Không đo được bằng máy. |
| 06 | Overall consistency | Cảm giác thống nhất. |
| 07 | Readability | Chữ có dễ đọc thật hay không. |
| 08 | Midterm reflection | Nội dung tự nhìn lại có thật và có ích. |
| 08 | Project links verified | Yêu cầu là *mở từng trang và click* — grader không mở trình duyệt. |
| 11 | Content quality, Visual polish | Chất lượng viết và độ hoàn thiện thị giác. |
| 12 | HTML/CSS validation — *zero errors on W3C validator* | Grader chạy offline, không gọi `validator.w3.org`. Cần ảnh chụp validator của sinh viên. |
| 15 | Mobile layout, Testing | Bố cục trên máy thật, và việc đã tự thử ở 320/768/1024px. |

### Nguồn ở `_tools/`, một artifact được xuất bản

Toàn bộ mã nguồn, rubric, fixture và công cụ chấm lại nằm trong `_tools/grader/` và
không được xuất bản. Sau khi vượt qua `qa:grader`, đúng **một** artifact tự chứa được
`_tools/build-site.mjs` sao chép nguyên byte sang `site/cham-bai.html`; trên production
nó có URL `/cham-bai.html`. Check 13 của `_tools/qa-site.mjs` xác nhận hai file giống
nhau và áp các kiểm tra an toàn riêng cho trang này.

Check 11 vẫn cấm `<form>`, `input[type=file]`, nút submit, `FormData(` và `fetch(` trên
mọi trang học liệu khác. Ngoại lệ có tên chỉ dành cho `cham-bai.html`: đây là công cụ
tự kiểm tra chạy tại trình duyệt, không phải hệ thống nhận bài hay ghi điểm. Danh sách
`NEVER_PUBLISH` tiếp tục chặn cả thư mục `_tools/`, vì vậy rubric JSON, fixture, script
và đáp án nhạy cảm không thể lọt sang `site/`.

### An toàn

Bài của sinh viên là **dữ liệu**, không bao giờ là code. Không `eval`, không
`new Function`, không `innerHTML` với nội dung bài, không `DOMParser`, không
`<iframe srcdoc>`. Mọi chuỗi hiện ra đều qua `textContent`, nên một class tên
`</div><script>` hiển thị đúng như mấy ký tự đó. HTML và CSS chỉ được tokenize bằng
parser tự viết trong `src/html-parse.js` và `src/css-parse.js`. Cổng G10 đọc lại
`cham-bai.html` từ disk và fail nếu bất kỳ điều trên bị vi phạm.

Mạng: đúng hai host, chỉ ở tab GitHub, và chỉ đọc — `api.github.com` và
`raw.githubusercontent.com`. CSP `default-src 'none'` chặn phần còn lại. Không
analytics, không telemetry.
