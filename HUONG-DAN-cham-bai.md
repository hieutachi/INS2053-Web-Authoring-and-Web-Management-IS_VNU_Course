# Hướng dẫn sử dụng bộ chấm bài INS2053

Tài liệu này mô tả toàn bộ quy trình tự kiểm tra của sinh viên, tiếp nhận và chấm của
giảng viên, và cách dùng JSON làm bản ghi có thể tái kiểm tra.

## 1. Công cụ làm gì — và không làm gì

Bộ chấm đọc HTML/CSS/Markdown như **văn bản**, đối chiếu với rubric của 15 buổi và tạo
thẻ kết quả ngay trong trình duyệt. Nó không chạy code sinh viên, không `eval`, không
gửi bài lên server, không analytics và không tự ghi điểm vào hệ thống nào.

Kết quả chia thành ba tier:

- `AUTO`: máy kiểm tra và chốt phần cơ học.
- `ASSIST`: máy đo được một phần; giảng viên phải đọc nhận xét và xác nhận.
- `MANUAL`: máy không kết luận; giảng viên chấm.

Điểm hiện trên thẻ **không phải điểm cuối**. Chỉ giảng viên được chốt điểm sau khi xem
các dòng `ASSIST`/`MANUAL` và xử lý dòng thiếu file.

## 2. Mở công cụ

### Trên website

Mở `https://ins2053-web-course.vercel.app/cham-bai.html` sau khi giảng viên xác nhận
bản production đã được triển khai.

### Dùng offline

Từ bản sao đầy đủ của repository, double-click:

`_tools/grader/cham-bai.html`

Chrome, Edge và Firefox hiện đại đều dùng được. Tab **Dán code** và chọn thư mục không
cần mạng. Tab **Dán link GitHub** cần mạng và repository phải đọc được khi không đăng
nhập; công cụ không hỏi và không lưu GitHub token.

## 3. Sinh viên: chuẩn bị bài

1. Hoàn thành đúng homework của buổi cần chấm.
2. Giữ nguyên cấu trúc đường dẫn, ví dụ `index.html`, `about.html`,
   `css/style.css`, `images/hero.png`.
3. Push commit cần nộp lên GitHub nếu dùng link. Không tiếp tục sửa commit đó; công cụ
   sẽ ghi `owner/repo@sha7` lên thẻ.
4. Không đặt mật khẩu, API key, access token hoặc dữ liệu riêng tư trong source. File
   JSON xuất ra chứa nguyên văn HTML/CSS đã chấm.

## 4. Sinh viên: tự chấm từng bước

1. Mở công cụ và chọn đúng **Buổi**.
2. Điền **Họ và tên**, **MSSV**, **Lớp**. Kiểm tra kỹ vì các giá trị này đi vào tên
   file JSON và thẻ kết quả.
3. Cung cấp bài theo một trong ba cách dưới đây.
4. Bấm **Chấm bài**.
5. Đọc cảnh báo phía trên thẻ. Nếu báo thiếu file, sửa đường dẫn hoặc nạp lại đúng thư
   mục; dòng thiếu file được ghi `chưa có file`, không tự động tính là 0.
6. Đọc từng tiêu chí, sửa bài, rồi bấm **Chấm bài** lại. Chỉ dùng kết quả cuối cùng.

### Cách A — dán link GitHub

1. Chọn tab **Dán link GitHub**.
2. Dán một trong các dạng:
   - `https://github.com/owner/repo`
   - `https://github.com/owner/repo/tree/main/thu-muc-bai`
   - link `raw.githubusercontent.com`
3. Bấm **Tải bài từ GitHub**.
4. Chờ dòng `Đã tải ... file tại commit abc1234`, rồi bấm **Chấm bài**.

Nên link thẳng tới thư mục homework nếu repository chứa nhiều nội dung. Đường dẫn trong
thư mục đó được quy về tương đối, nên `project/index.html` sẽ được chấm như
`index.html` khi link trỏ tới `project/`.

Công cụ tải nội dung `.html`, `.htm`, `.css`, `.md`; file khác được giữ dưới dạng
đường dẫn asset, không tải byte nhị phân. Giới hạn: tối đa 40 file kể cả asset,
512 KB mỗi file text, 5 MB tổng nội dung text, 15 giây mỗi request. GitHub không xác
thực thường giới hạn khoảng 60 request/giờ/IP. Khi hết lượt, repo private, hoặc mất
mạng, chuyển sang cách B/C.

### Cách B — chọn hoặc kéo thả thư mục

1. Ở tab **Dán code**, bấm chọn thư mục hoặc kéo thư mục bài vào vùng nét đứt.
2. Kiểm tra danh sách file đã đọc.
3. Bấm **Chấm bài**.

HTML/CSS/Markdown được đọc tại máy. Ảnh, video và font chỉ được giữ đường dẫn để rubric
xác nhận chúng tồn tại; byte nhị phân không được đưa vào kết quả.

### Cách C — dán từng file

1. Dán code vào ô đầu tiên và nhập đúng đường dẫn file.
2. Dùng **+ Thêm file HTML** hoặc **+ Thêm file CSS** cho các file còn lại.
3. Với ảnh/media, dùng **+ Thêm ảnh (chỉ đường dẫn)**, nhập đường dẫn và để trống nội
   dung.
4. Bấm **Chấm bài**.

## 5. Sinh viên: đọc thẻ kết quả

Bốn số ở đầu thẻ phải đọc riêng, không cộng với nhau:

- **MÁY ĐÃ CHẤM:** điểm đã tính trên các phần máy kiểm tra được.
- **CHỜ NGƯỜI XEM:** trọng số dòng `MANUAL`; chưa phải điểm được cộng.
- **CHƯA CHẤM ĐƯỢC:** trọng số bị chặn do thiếu file; không mặc định là 0.
- **TỔNG RUBRIC:** tổng trọng số rubric, thường là 10; không phải điểm cuối.

Ở từng dòng, `✓` là đạt, `~` là đạt một phần, `✗` là chưa đạt, còn `?` hoặc
**Người chấm** là phần máy không kết luận. **Chưa có file** yêu cầu kiểm tra bài nộp và
đường dẫn trước khi trừ điểm. Các dòng mất điểm có bằng chứng và gợi ý sửa.

Công cụ không quyết định bài có do sinh viên tự viết, thiết kế có đẹp, nội dung có chất
lượng, website có dùng tốt trên thiết bị thật, bài có đúng hạn, hoặc có vi phạm quy định
học thuật. Kết quả tự kiểm không thay thế việc nộp bài và không phải điểm cuối.

## 6. Sinh viên: lưu bằng chứng kết quả

Sau lần chấm cuối, lưu ảnh/PDF để đọc nhanh và JSON để giảng viên tái chấm.

### Chụp PNG bằng `Win + Shift + S`

1. Kiểm tra đúng họ tên, MSSV, lớp, buổi và nguồn bài trên thẻ.
2. Nhấn `Win + Shift + S`, chọn **Rectangular snip**.
3. Kéo khung bao trọn thẻ kết quả. Nếu thẻ dài hơn màn hình, giảm zoom bằng
   `Ctrl` + `-`, hoặc chụp các phần liên tiếp; luôn giữ phần đầu có tên, MSSV, buổi và
   SHA-256.
4. Bấm thông báo Snipping Tool, chọn **Save as**, lưu
   `INS2053-HWNN-MSSV.png`.
5. Mở lại PNG, kiểm tra mọi dòng rubric và SHA-256 còn đọc được.

Ảnh PNG do Snipping Tool tạo, không phải nút trong bộ chấm. Trình duyệt không có API
chuẩn để chụp một DOM dài thành PNG mà không thêm thư viện/rủi ro.

### Lưu PDF

1. Bấm **In / Lưu PDF** sau khi chấm.
2. Chọn **Save as PDF** hoặc **Microsoft Print to PDF**.
3. Bật **Background graphics** nếu trình duyệt có tùy chọn này.
4. Lưu `INS2053-HWNN-MSSV.pdf` và mở lại để kiểm tra.

PDF có thể dài hơn một trang A4; không cắt mất các dòng cuối.

### Tải JSON

1. Bấm **Tải JSON**; trình duyệt tạo `INS2053-HWNN-MSSV.json`.
2. Không mở rồi Save lại bằng Word, không sửa trường hoặc nội dung code.
3. Nộp JSON cùng PNG/PDF qua kênh giảng viên quy định.

JSON chứa nguyên văn file text, đường dẫn asset, metadata, report và SHA-256 của lần
chấm. Nó không chứa byte ảnh/video/font. Không gửi JSON lên dịch vụ công khai vì source
có thể chứa thông tin sinh viên không muốn công bố.

## 7. Giảng viên: tiếp nhận bài

Khuyến nghị yêu cầu mỗi sinh viên nộp:

1. một PNG hoặc PDF của thẻ kết quả;
2. một JSON tải từ đúng lần chấm đó;
3. link GitHub kèm commit nếu lớp dùng GitHub.

Tạo thư mục theo đợt chấm, ví dụ:

```text
submissions/
└── HW14/
    ├── 22070001/
    │   ├── INS2053-HW14-22070001.png
    │   └── INS2053-HW14-22070001.json
    └── 22070002/
        ├── INS2053-HW14-22070002.pdf
        └── INS2053-HW14-22070002.json
```

Kiểm tra tên/MSSV/buổi trên ảnh khớp JSON và tên file. Không nhận ảnh cắt mất SHA-256
nếu không có JSON đi kèm.

## 8. Giảng viên: xác minh và chấm lại JSON

Tại thư mục gốc repository, chạy:

```powershell
node _tools/grader/regrade.mjs "submissions/HW14/22070001/INS2053-HW14-22070001.json"
```

Kết quả tốt kết thúc bằng:

```text
REGRADE KHỚP — JSON không bị sửa và rubric hiện tại cho cùng kết quả
```

Lệnh này xác minh SHA-256, chạy rubric hiện tại trên đúng nội dung trong JSON, đối
chiếu điểm/trạng thái từng dòng và in phiên bản công cụ đã lưu để làm ngữ cảnh.

Mã thoát:

- `0`: digest và kết quả khớp;
- `1`: JSON bị sửa hoặc rubric hiện tại cho kết quả khác;
- `2`: thiếu đối số, JSON hỏng, thiếu `submission`, hoặc không tìm thấy rubric.

Đối chiếu `SHA-256 tính lại` với 8 ký tự trên PNG/PDF. Nếu JSON khớp nhưng ảnh khác
digest, yêu cầu xuất lại từ đúng bài; không suy đoán điểm. Rubric đổi sau ngày tự kiểm
có thể gây lệch mà không phải gian lận; ghi rõ policy và áp dụng giống nhau cho cả lớp.

### Kiểm tra một thư mục JSON trong PowerShell

```powershell
Get-ChildItem "submissions/HW14" -Recurse -Filter *.json | ForEach-Object {
  Write-Host "`n=== $($_.FullName) ==="
  node _tools/grader/regrade.mjs $_.FullName
  if ($LASTEXITCODE -ne 0) { Write-Warning "Cần xem lại: $($_.Name)" }
}
```

Batch chỉ xác minh phần máy chấm, không tự động chốt điểm cuối.

## 9. Giảng viên: chấm phần người và ghi sổ điểm

Repository chưa có trình nhập gradebook hay xuất CSV. Quy trình có kiểm soát:

1. Chạy `regrade.mjs`; chỉ tiếp tục khi khớp hoặc đã ghi lý do rubric đổi.
2. Mở JSON/ảnh và bài gốc để xem từng dòng `ASSIST`, `MANUAL`, `blocked`.
3. Chấm phần máy chưa kết luận theo rubric homework gốc. Không cộng toàn bộ
   `manualPoints`; đây chỉ là trọng số chờ người xem.
4. Ghi một hàng gồm tối thiểu: `MSSV`, `Họ tên`, `Buổi`, `Auto awarded`,
   `Auto points`, `Điểm người chấm`, `Điểm cuối`, `Digest`, `Tool version`,
   `Graded at`, `Ghi chú`.
5. Lưu đường dẫn JSON gốc. Không nhúng source vào bảng điểm dùng chung.
6. Nếu sửa điểm, ghi người sửa, thời điểm, lý do và giá trị trước/sau. Không sửa JSON
   sinh viên để làm nó “khớp” sổ điểm.

| Cột sổ điểm | Trường JSON |
|---|---|
| MSSV | `student.id` |
| Họ tên | `student.name` |
| Lớp | `student.class` |
| Buổi | `session` |
| Điểm máy | `report.autoAwarded` / `report.autoPoints` |
| Chờ chấm tay | `report.manualPoints` |
| Thiếu file | `report.blockedPoints` |
| Digest | `contentDigestSha256` |
| Phiên bản | `tool.version` |
| Thời điểm | `gradedAt.iso` |

`report.autoAwarded`, `manualPoints` và `blockedPoints` không đủ để suy ra điểm cuối;
giảng viên phải xử lý từng dòng rubric.

## 10. Giảng viên: SHA-256 và cách phát công cụ

Web Crypto cần secure context. Các cách đã kiểm trong Chrome:

| Cách mở | SHA-256 trên thẻ |
|---|---|
| URL Vercel qua `https://` | Có |
| Double-click bằng `file://` | Có |
| `http://localhost` hoặc `http://127.0.0.1` | Có trên máy chạy server |
| `http://<LAN-IP>` từ máy khác | **Không có** |

Không phát công cụ bằng HTTP từ IP LAN của laptop giảng viên. Dùng URL HTTPS production
hoặc gửi nguyên `_tools/grader/cham-bai.html` để sinh viên double-click.

## 11. Xử lý sự cố

### Bấm Chấm bài nhưng báo chưa có bài

- File text cần cả đường dẫn và nội dung.
- Nếu vừa nạp thư mục/GitHub, kiểm tra dòng xác nhận danh sách file.
- Xóa bài đã tải trước khi muốn quay lại các textarea.

### Thiếu file dù file có trong máy

- Kiểm tra dấu `/` và chữ hoa/thường trong đường dẫn.
- Chọn đúng thư mục bài, không chọn thư mục cha chứa nhiều project.
- Khi dán thủ công, asset cần đường dẫn như `images/photo.jpg`; nội dung để trống.

### GitHub không tải được

- Repo private không được hỗ trợ vì công cụ không nhận token.
- Kiểm tra link và branch; link quá sâu có thể không chứa đủ file rubric.
- Chờ nếu chạm rate limit, hoặc dùng chọn thư mục/dán code offline.
- CSP chỉ cho phép `api.github.com` và `raw.githubusercontent.com`.

### Không thấy nút tải JSON hoặc in

Hai nút chỉ bật sau một lần **Chấm bài** thành công.

### `REGRADE KHÁC`

- Digest lệch: `submission` trong JSON đã đổi; giữ file làm bằng chứng và yêu cầu bản
  nộp gốc.
- Dòng rubric lệch nhưng digest khớp: rubric/công cụ hiện tại có thể đã đổi; dùng
  `tool.version`, `gradedAt.iso`, commit triển khai và policy lớp để quyết định.
- Không có `submission`: JSON phiên bản cũ; chấm lại từ commit SHA hoặc bài gốc.

### SHA-256 trên thẻ là `—`

Mở URL HTTPS production hoặc trình duyệt hiện đại rồi chấm lại trước khi nộp chính thức.

## 12. Maintainer: build, QA và triển khai

Không sửa hai artifact HTML bằng tay. Sửa source/rubric, rồi từ thư mục gốc chạy:

```powershell
npm run build:grader
npm run qa:grader
npm run qa
npm run build:site
npm run qa:site
```

`build:site` chạy lại `build:grader` và sao chép đúng một artifact sang
`site/cham-bai.html`. Check 13 yêu cầu bản public byte-identical với bản đã qua 11 cổng
grader. Toàn bộ rubric, fixture, source và `regrade.mjs` vẫn chỉ ở `_tools/grader/`.

Trước commit, chạy `git diff --check`, đọc toàn bộ diff và không đưa file tạm/log vào
commit. Sau deploy, xác nhận:

1. `https://ins2053-web-course.vercel.app/cham-bai.html` trả HTTP 200;
2. response có CSP đúng `vercel.json` và `Cache-Control: no-store`;
3. trang mở được 15 rubric và chấm được một fixture;
4. trang chủ, homework index, 15 homework sheet và 15 session hub dẫn tới công cụ;
5. không có lỗi console/CSP trong luồng dán code, tải JSON và in.

Chỉ push `main` hoặc deploy production khi tài khoản Vercel/GitHub đã được liên kết,
email commit đã được xác minh và người quản lý repository xác nhận.


## 13. Maintainer: sửa rubric đúng thứ tự

1. Sửa bảng `## Grading Rubric` trong `homework/session-NN/homework.md`; đây là nguồn
   sự thật sinh viên đọc.
2. Sửa `_tools/grader/rubrics/session-NN.json` cho cùng tiêu chí, trọng số và tier.
3. Nếu semantics đổi, sửa check trong `_tools/grader/src/checks.js`. Không biến nhận
   định chủ quan thành `auto` chỉ để tăng coverage.
4. Cập nhật fixture `pass/`, `fail/` và
   `_tools/grader/fixtures/session-NN/expected.json` theo chủ đích mới.
5. Chạy `npm run qa:grader`; đọc lỗi G4/G6 trước khi sửa expected. Không đổi expected
   chỉ để làm cổng xanh.
6. Chạy `npm run build:site && npm run qa:site` để kiểm đúng artifact sẽ public.

Các dòng cần con người gồm tính nguyên bản của nội dung, alt có thật sự mô tả ảnh, độ
đẹp/chuyên nghiệp, consistency/readability, reflection, kiểm link bằng trình duyệt,
chất lượng nội dung, W3C validation, mobile layout và việc test trên thiết bị. Cổng G9
chặn các yêu cầu này bị đổi thành `auto` ngoài ý muốn.

## 14. Maintainer: các cổng phát hành

### `qa:grader` — 11 cổng

| Cổng | Điều bị chặn |
|---|---|
| G1 | Rubric không đọc được, sai schema/tier hoặc không tổng đúng 10. |
| G2 | Thiếu fixture `pass/`, `fail/` hoặc `expected.json`. |
| G3 | Fixture đúng không đạt toàn bộ điểm rubric. |
| G4 | Fixture sai không mất điểm đúng dòng dự kiến. |
| G5 | Bài rỗng bị gán 0 thay vì `Chưa có file`. |
| G6 | Điểm fixture trôi khỏi baseline trong `expected.json`. |
| G7 | Check crash, parse error hoặc loại check không tồn tại. |
| G8 | Kết quả không tất định hoặc có check không rubric nào dùng. |
| G9 | Yêu cầu cần phán đoán con người bị gán `auto`. |
| G10 | `cham-bai.html` không tự chứa hoặc có thể thực thi/chèn bài sinh viên. |
| G11 | Nội dung thi hoặc `project/rubric.md` lọt vào grader. |

### `qa:site` — 13 nhóm

1. Page inventory.
2. Cấu trúc HTML document.
3. ID không trùng.
4. Link và asset nội bộ resolve.
5. Anchor cùng trang resolve.
6. Policy nội dung public.
7. Encoding.
8. Không sót Markdown hoặc placeholder.
9. Navigation chrome không double-escape entity.
10. Mỗi session hub nối đủ ba giai đoạn học.
11. Nộp bài và ghi điểm vẫn bị cấm trên mọi trang học liệu.
12. Shared assets tồn tại.
13. Grader public byte-identical với artifact đã qua gate, tự chứa, không upload, chỉ
    đọc hai host GitHub và có ít nhất 32 trang dẫn tới.

### Baseline một lượt phát hành

| Lượt kiểm | Baseline phải tái lập |
|---|---|
| `npm run qa:grader` | 15/15 buổi, 76 dòng rubric, 42 loại check, G1–G11 PASS. |
| `npm run build:site && npm run qa:site` | 69 trang HTML, 13/13 nhóm PASS. |
| Chrome/CDP | 28/28 PASS: `file://`, 15 fixture đúng, fixture sai/rỗng/thiếu file, injection, JSON/regrade/tamper, PDF, asset path, determinism, CSP và console. |
| GitHub dưới production CSP | Repo public chỉ dùng `GET` tới `api.github.com` và `raw.githubusercontent.com`, không CSP violation. |
| `npm run qa` và literal-strip test | Toàn bộ QA học liệu hiện có PASS. |

Baseline là điều phải chạy lại, không phải lời hứa rằng bản sửa sau tự động an toàn.
Nếu một gate bắt buộc fail, sửa source/rubric/fixture; không nới gate và không vá trực
tiếp artifact sinh ra.
