# Bài tập 11: Đánh bóng website gọn của bạn

## Due Date
Chủ nhật, 23:59 (Tuần 12)

## Mục tiêu
- Tinh chỉnh website thành một dự án chỉn chu, trông chuyên nghiệp
- Rà soát và cải thiện chất lượng nội dung trên mọi trang
- Viết file README để tài liệu hóa dự án

## Requirements

### Task 1: Đánh bóng mọi trang
Rà soát toàn bộ website và cải thiện để trông chuyên nghiệp.

**Đi qua từng trang và kiểm tra:**
- Có đủ 3–5 trang chưa? (Home, About, Contact, Schedule, Media)
- Nội dung viết tốt chưa, còn lỗi chính tả/ngữ pháp không?
- Mọi ảnh có tải được và đúng kích thước không?
- Mọi liên kết điều hướng có hoạt động trên mọi trang không?
- Bố cục có nhất quán trên mọi trang không?
- CSS có sạch và chuyên nghiệp không?

**Những cải thiện cần làm:**
- Sửa mọi ảnh hoặc liên kết hỏng
- Đảm bảo style đề mục nhất quán trên mọi trang
- Thêm chuyển động mượt hoặc hiệu ứng hover ở nơi phù hợp
- Đảm bảo footer giống nhau trên mọi trang

### Task 2: Thêm Favicon
Thêm một biểu tượng nhỏ (favicon) cho website.

- Tạo hoặc tìm một ảnh vuông nhỏ (16x16 hoặc 32x32 pixel)
- Lưu thành `favicon.ico` hoặc `favicon.png` trong thư mục `images/`
- Thêm liên kết này vào `<head>` của mọi trang HTML:
  - Mọi trang đều nằm ở gốc dự án, nên cùng một dòng dùng được cho cả năm trang:
```html
<link rel="icon" href="images/favicon.png" type="image/png">
```

### Task 3: Viết file README
Tạo file README tài liệu hóa dự án của bạn.

**Tạo file:** `project/README.md`

**README của bạn phải có:**
- Tên dự án (tên CLB của bạn)
- Mô tả ngắn website làm về gì (2–3 câu)
- Danh sách các trang trong site (ví dụ Home, About, Contact, Schedule, Media)
- Danh sách công nghệ dùng (HTML5, CSS3, Google Fonts)
- Hướng dẫn mở website trên máy local
- Tên và mã số sinh viên của bạn

**Ví dụ README:**
```markdown
# Student Club Website

A website for the [Club Name] at VNU-IS.

## Pages
- Home (index.html)
- About (about.html)
- Activities (activities.html)
- Media (media.html)
- Contact (contact.html)

## Technologies
- HTML5
- CSS3
- Google Fonts

## How to Run
Open `index.html` in any web browser.

## Author
[Your Name] - [Student ID]
```

**Đường dẫn file:**
- `project/README.md` (file mới)
- `project/index.html` (đánh bóng + favicon)
- `project/about.html` (đánh bóng + favicon)
- `project/activities.html` (đánh bóng + favicon)
- `project/media.html` (đánh bóng + favicon)
- `project/contact.html` (đánh bóng + favicon)
- `project/css/style.css` (hoàn thiện cuối)

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Tuần site gọn: bạn lấy những gì đang có và nâng lên chất lượng phát hành — mọi trang nhất quán, có favicon, và một README để người lạ chạy được site.

### Vì sao bài tập này tồn tại

- Đánh bóng là kỹ năng chấm được: khoảng cách nhất quán, thành phần thẳng hàng, không trang mồ côi, không chữPlaceholder. Đó là khác biệt giữa bài tập và một món đồ nghề.
- Favicon là một dòng `<link>` đổi hẳn cảm giác chuyên nghiệp của tab — và quên nó sinh ra lỗi 404 ồn ào trong console.
- README là cách bất kỳ ai (kể cả bạn của tương lai, hay nhà tuyển dụng vào repo) hiểu project là gì, cần gì, và mở ra sao.

### “Xong” nhìn như thế nào

Mẫu sống cộng một lượt kiểm tra console: không lỗi đỏ, favicon hiện trên tab, năm trang nhất quán về nhìn, và `README.md` hiển thị đúng như một trang trên GitHub.

### Cách làm từng bước

1. **Khám trước (15 phút).** Mở tất cả trang cạnh nhau và liệt kê mọi chỗ lệch: cỡ đề mục, khoảng cách, màu, mục nav thiếu. Sửa theo danh sách, không sửa theo cảm tính.
2. **Đánh bóng các trang (20 phút).** Áp dụng fixes trong `css/style.css` để mọi trang cùng được hưởng.
3. **Thêm favicon (10 phút).** File ICO/PNG 32×32 trong `project/images/`, rồi `<link rel="icon" href="images/favicon.ico">` trong `<head>` của mọi trang.
4. **Viết README (20 phút).** `project/README.md` với bốn mục bắt buộc: site là gì, danh sách trang, công nghệ dùng, cách chạy, và thông tin tác giả.
5. **Bò lần cuối (10 phút).** Thăm mọi trang, mở DevTools, xác nhận không 404 và không lỗi console.

### Nơi sinh viên mất điểm

- Favicon chỉ được link ở một trang.
- README ba dòng văn xuôi — rubric cần các mục được đặt tên.
- Sửa khoảng cách của một trang ngay trong trang đó thay vì trong CSS chung.

### File bài tập phải tạo ra

- `project/README.md`
- `project/index.html`
- `project/about.html`
- `project/activities.html`
- `project/media.html`
- `project/contact.html`
- `project/css/style.css`
- `project/images/favicon.ico`

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-11/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW11: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu `README.md` và favicon, giải thích từng mục README hứa hẹn gì với người xem và favicon được nối vào các trang thế nào.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 11 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 11, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở `README.md` và favicon
của bạn, giải thích mỗi phần của README hứa hẹn điều gì với người xem, và favicon
được gắn vào các trang thế nào**.

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
   `- Session 11 — <your Google Drive link>`
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
- Commit: `git commit -m "HW11: Polish site and add README"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Số trang | 1 | Có 3–5 trang |
| Chất lượng nội dung | 2 | Viết tốt, không lỗi, ảnh đẹp |
| Điều hướng | 2 | Mọi liên kết hoạt động trên mọi trang |
| Độ chỉn chu | 2 | Giao diện nhất quán, chuyên nghiệp |
| Favicon | 1 | Favicon hiện trong tab trình duyệt |
| README | 2 | Có đầy đủ các phần yêu cầu |
| **Tổng** | **10** | |

## Tips
- Đọc to nội dung của bạn để bắt lỗi chính tả và ngữ pháp
- Mở từng trang trên trình duyệt và bấm mọi liên kết để kiểm tra
- Một README tốt giúp người khác hiểu dự án của bạn

## Example Output
Website của bạn phải cảm giác như một sản phẩm hoàn chỉnh — sạch, nhất quán và
chuyên nghiệp. Tab trình duyệt hiện favicon của bạn. Bất kỳ ai đọc README cũng
hiểu dự án của bạn là về gì.
