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
