# Bài tập 12: Kiểm tra tính hợp lệ HTML & CSS và dọn code

## Due Date
Chủ nhật, 23:59 (Tuần 13)

## Mục tiêu
- Học kiểm tra tính hợp lệ (validate) HTML và CSS bằng công cụ trực tuyến
- Tìm và sửa lỗi trong code của bạn
- Luyện thói quen định dạng code sạch

## Requirements

### Task 1: Kiểm tra tính hợp lệ của HTML
Truy cập [W3C HTML Validator](https://validator.w3.org/) và kiểm tra từng file HTML.

**Cách kiểm tra:**
1. Mở https://validator.w3.org/
2. Chọn "Validate by Direct Input"
3. Copy-paste code HTML của bạn vào ô văn bản
4. Bấm "Check"
5. Xem lại các lỗi và cảnh báo

**Bạn phải kiểm tra các file sau:**
- `project/index.html`
- `project/about.html`
- `project/activities.html`
- `project/media.html`
- `project/contact.html`

**Sửa TẤT CẢ lỗi tìm được.** Các lỗi thường gặp:
- Thiếu thuộc tính `alt` trên ảnh
- Thẻ chưa đóng (như `<p>` thiếu `</p>`)
- Thiếu thuộc tính `lang` trên thẻ `<html>`
- Giá trị `id` trùng nhau
- Lồng phần tử sai cách

### Task 2: Kiểm tra tính hợp lệ của CSS
Truy cập [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) và kiểm tra stylesheet.

**Cách kiểm tra:**
1. Mở https://jigsaw.w3.org/css-validator/
2. Chọn "By direct input"
3. Copy-paste code CSS của bạn
4. Bấm "Check"
5. Sửa mọi lỗi

**Các lỗi CSS thường gặp:**
- Sai chính tả tên property
- Thiếu dấu chấm phẩy
- Giá trị property không hợp lệ
- Property không tồn tại

### Task 3: Dọn dẹp định dạng code
Định dạng lại các file HTML và CSS theo đúng chuẩn.

**Quy tắc định dạng HTML:**
- Dùng thụt lề 2 dấu cách (không dùng tab, không dùng 4 dấu cách)
- Mỗi phần tử nằm trên một dòng riêng khi nó có phần tử con
- Thẻ tự đóng như `<img>` và `<br>` nên nằm trên dòng riêng
- Thêm chú thích phân tách các phần: `<!-- Navigation -->`, `<!-- Main Content -->`

**Quy tắc định dạng CSS:**
- Mỗi dòng một property
- Ngoặc mở cùng dòng với selector
- Ngoặc đóng nằm trên dòng riêng
- Thêm dòng trống giữa các selector khác nhau
- Gom các quy tắc liên quan lại với nhau
- Thêm chú thích cho từng phần: `/* Header Styles */`, `/* Navigation */`

**Ví dụ HTML sạch:**
```html
<!-- Header Section -->
<header>
  <h1>Club Name</h1>
</header>

<!-- Navigation -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
  </ul>
</nav>
```

**Đường dẫn file:**
- `project/index.html`
- `project/about.html`
- `project/activities.html`
- `project/media.html`
- `project/contact.html`
- `project/css/style.css`

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Tuần validator. Bạn thôi đoán code đúng hay sai và bắt đầu chứng minh: W3C soi HTML, công cụ W3C soi CSS, rồi một lượt định dạng để code đọc sạch.

### Vì sao bài tập này tồn tại

- Validator bắt được những lỗi trình duyệt bỏ qua: thẻ chưa đóng, lồng sai, thiếu alt, property không tồn tại. Sự bao dung ấy giấu lỗi sẽ bộc lộ trên thiết bị khác hoặc trong phòng thi.
- Đọc báo cáo validation là kỹ năng nghề — dòng lỗi, nguyên nhân, cách sửa — và đó chính là điều phần video của bài này yêu cầu bạn trình bày.
- Thụt lề nhất quán và comment là cách người khác (hoặc bạn sau ba tuần) đọc được file. Rubric trả tiền cho việc đó.

### “Xong” nhìn như thế nào

Thành công trông như thế này: W3C trả về “No errors” (warning được giải thích trong ghi chú của bạn), CSS validator không còn lỗi, và file của bạn thụt lề hai space kèm một comment cho mỗi vùng.

### Cách làm từng bước

1. **Soi HTML (20 phút).** Gửi từng trang lên W3C Nu checker (theo URI hoặc dán file). Ghi lại mọi lỗi: dòng, thông báo, nguyên nhân.
2. **Sửa và chạy lại (20 phút).** Sửa lỗi xuất hiện sớm nhất trước — các lỗi sau thường là hiệu ứng dây chuyền. Validate tới khi sạch.
3. **Soi CSS (15 phút).** Chạy `css/style.css` qua W3C CSS validator, sửa property lạ và lỗi chính tả.
4. **Định dạng (15 phút).** Thụt lề hai space, mỗi declaration một dòng, gom property theo nhóm, comment đầu mỗi vùng.
5. **Hồi quy (10 phút).** Tải lại mọi trang: sửa markup có thể đổi cách hiển thị. Xác nhận không gì hỏng.
6. **Viết báo cáo (10 phút).** Lưu kết quả validator vào một file trong `homework/session-12/` để ghi chú đi cùng bài tập.

### Nơi sinh viên mất điểm

- Xoá phăng phần tử bị báo lỗi thay vì sửa nó, và mất luôn tính năng được chấm.
- Tin một warning là dương tính giả — hãy giải thích trong ghi chú thay vì bẻ code đúng thành sai.
- Dùng auto-formatter viết lại luôn đường dẫn hoặc xoá comment của bạn.

### File bài tập phải tạo ra

- Toàn bộ file HTML trong `project/`
- `project/css/style.css`

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-12/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW12: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu một lỗi HTML validation và một cảnh báo CSS từ validator, giải thích nguyên nhân và cách bạn sửa.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 12 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 12, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
3. Lưu thẻ kết quả (ảnh chụp thấy cả hash, Print → PDF, Download JSON) để bạn chứng minh được mình đã nộp gì.

<!-- HW-BRIEF:END -->

## Phần 2 — Suy ngẫm bằng video (OBS) — bắt buộc, không tùy chọn

Code chỉ là một nửa bài tập này. Nửa còn lại là một **video quay màn hình ngắn**
chứng minh bài làm là của bạn và bạn có thể *giải thích* nó — chính là kỹ năng mà
thi thực hành giữa kỳ, thi thực hành cuối kỳ, và mọi buổi phỏng vấn xin việc sau
này đều đòi hỏi. Dùng công cụ AI hoặc tutorial để làm các task trên là được phép;
nhưng việc giải thích được từng dòng của những gì bạn giữ lại là điều không tùy chọn.

### Quay nội dung gì

Với **OBS Studio** (miễn phí — <https://obsproject.com>), quay **60–120 giây**,
**bắt buộc có giọng nói** (khuôn mặt tùy chọn), chia sẻ màn hình trong khi bạn
trình bày MỘT phần của bài tập này. Chọn một chủ đề duy nhất — đừng cố covering
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **chọn một lỗi kiểm tra HTML
và một cảnh báo CSS từ công cụ W3C, giải thích nguyên nhân và cách bạn đã sửa**.

Yêu cầu cho bản ghi:

- [ ] Độ dài **1–2 phút**. Quá 2 phút mất điểm cấu trúc; dưới 1 phút thường nghĩa là không có nội dung.
- [ ] **Màn hình được chia sẻ suốt video** — giảng viên phải thấy trình soạn thảo và trình duyệt thật của bạn, không phải một loạt ảnh chụp màn hình.
- [ ] Bạn **nói** trong video (tiếng Việt hoàn toàn được; thuật ngữ kỹ thuật giữ tiếng Anh), và tên + mã số sinh viên hiện lên hoặc được đọc ở đầu video.
- [ ] Bạn **vừa chỉ vừa giải thích**, không đọc thuộc lòng: mở file thật, chỉ vào dòng thật, chạy kết quả thật trên trình duyệt.

### Cách nộp video

Bạn nộp một **link**, không bao giờ nộp file video:

1. Tải bản ghi (`MP4`, 720p trở lên) lên **Google Drive của chính bạn**.
2. Đặt chế độ chia sẻ thành **"Anyone with the link → Viewer"**.
3. Mở `homework/submissions.md` trong repository của bạn và thêm **một dòng**:
   `- Session 12 — <your Google Drive link>`
4. Commit và push file đó cùng với phần còn lại của bài tập.

Hệ thống thu và chấm phần code (nó chạy công cụ tự kiểm tra trên repository của
bạn). Với video, hệ thống chỉ lưu **link** — giảng viên xem và chấm sau. Link
thiếu, riêng tư, hoặc hỏng nghĩa là phần video không thể chấm.

### Phần video được chấm thế nào (4 điểm, cộng trên rubric 10 điểm)

| Tiêu chí | Điểm | Giảng viên nhìn vào điều gì |
|---|---|---|
| Cấu trúc bài nói | 1 | Có mở đầu (bạn đã xây gì), giữa (nó hoạt động thế nào, chỉ vào code thật), và kết thúc (bạn học được gì hoặc sẽ cải thiện gì). |
| Trình bày trên màn hình | 1 | Dự án thật trên màn hình — trình soạn thảo và trình duyệt cùng lúc, không phải slideshow ảnh chụp. |
| Giải thích đúng | 2 | Bạn giải thích code làm gì và tại sao. Đọc một kịch bản học thuộc trên code bạn không giải thích được bị chấm 0. |
| **Tổng** | **4** | |

> Vì sao phải quay video? Công cụ AI có thể viết code bài tập, nên bằng chứng học
> tập chuyển sang phần giải thích. Sáu mươi giây bạn giải thích chính dòng code
> của mình là bằng chứng hiểu thật mạnh nhất — và nó cũng chính là một buổi phỏng
> vấn kỹ thuật điển hình.

## Submission Guide
- Thêm thay đổi: `git add project/`
- Commit: `git commit -m "HW12: Validate HTML/CSS and clean up code"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Kiểm tra HTML | 3 | Không còn lỗi trên W3C validator |
| Kiểm tra CSS | 3 | Không còn lỗi trên W3C validator |
| Định dạng HTML | 2 | Thụt lề, chú thích, cấu trúc đúng chuẩn |
| Định dạng CSS | 2 | Định dạng sạch với chú thích |
| **Tổng** | **10** | |

## Tips
- Lỗi kiểm tra tính hợp lệ là chuyện bình thường — cả dân chuyên nghiệp cũng mắc lỗi
- Sửa lỗi từng file một và kiểm tra lại sau mỗi lần sửa
- Code sạch dễ đọc, dễ gỡ lỗi và dễ bảo trì hơn

## Example Output
Mọi file HTML của bạn phải qua được W3C validation với không lỗi. File CSS cũng
phải qua validation. Code phải trông gọn gàng, có tổ chức với thụt lề đúng và chú
thích hữu ích.
