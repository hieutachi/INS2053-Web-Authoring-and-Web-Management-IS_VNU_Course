# Bài tập 7: Typography với Google Fonts

## Due Date
Chủ nhật, 23:59 (Tuần 8)

## Mục tiêu
- Nhập và dùng font web tùy chỉnh từ Google Fonts
- Cải thiện typography tổng thể của mini-site
- Hiểu ảnh hưởng của lựa chọn font tới thiết kế

## Requirements

### Task 1: Chọn và thêm Google Fonts
Truy cập [Google Fonts](https://fonts.google.com/) và chọn font cho website của bạn.

**Chọn font cho:**
- Đề mục: chọn một font đậm, bắt mắt (ví dụ Poppins, Montserrat, Playfair Display)
- Nội dung: chọn một font sạch, dễ đọc (ví dụ Open Sans, Lato, Roboto)

**Thêm Google Fonts vào các trang:**
- Thẻ `<link>` của Google Fonts vào phần `<head>` của CẢ BA trang HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=YourHeadingFont&family=YourBodyFont&display=swap" rel="stylesheet">
```
- Thay `YourHeadingFont` và `YourBodyFont` bằng font bạn thực sự chọn

### Task 2: Áp dụng font trong CSS
Cập nhật `project/css/style.css` để dùng font đã chọn.

**CSS của bạn phải có:**
- Đặt heading font family (h1, h2, h3) thành font đề mục của bạn
- Đặt body font family thành font nội dung của bạn
- Thêm các mức `font-weight` tạo phân cấp thị giác
- Đặt `letter-spacing` hợp lý cho đề mục (tùy chọn nhưng đẹp)
- Đảm bảo `line-height` của nội dung ít nhất là 1.6

**Ví dụ CSS:**
```css
body {
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Poppins', sans-serif;
}

h1 {
  font-weight: 700;
  font-size: 2.5em;
}
```

### Task 3: Tinh chỉnh typography
Cải thiện typography thêm cho toàn mini-site:

- Điều chỉnh cỡ chữ h1, h2, h3 tạo phân cấp thị giác rõ ràng
- Style đoạn văn cho dễ đọc (line height, max-width cho khối chữ)
- Style liên kết (đổi màu, thêm hiệu ứng hover với `a:hover`)
- Style các mục danh sách để khoảng cách đẹp hơn

**Đường dẫn file:**
- `project/index.html` (thêm liên kết Google Fonts)
- `project/about.html` (thêm liên kết Google Fonts)
- `project/contact.html` (thêm liên kết Google Fonts)
- `project/css/style.css` (cập nhật với quy tắc font)

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở thẻ `<link>` Google
Fonts trong `<head>` và các quy tắc `font-family` trong CSS, rồi giải thích bạn
đã chọn và ghép cặp hai font đó thế nào**.

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
   `- Session 07 — <your Google Drive link>`
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
- Commit: `git commit -m "HW7: Add Google Fonts and improve typography"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Tích hợp Google Fonts | 3 | Font tải được trên cả 3 trang |
| Áp dụng font | 2 | Đề mục và nội dung dùng font khác nhau |
| Phân cấp typography | 2 | Khác biệt rõ về cỡ/độ đậm giữa các cấp đề mục |
| Style liên kết | 2 | Liên kết có màu riêng và hiệu ứng hover |
| Độ dễ đọc | 1 | Chữ dễ đọc với khoảng cách hợp lý |
| **Tổng** | **10** | |

## Tips
- Đừng dùng quá 2–3 font khác nhau — sẽ nhìn rối
- Đảm bảo font đề mục khác font nội dung để tạo tương phản
- Kiểm tra trang với mạng chậm — Google Fonts cần thời gian tải
- **Luôn viết font dự phòng** sau web font: `font-family: 'Poppins', Verdana, sans-serif`. Nếu font không tải được, trình duyệt dùng font kế tiếp trong danh sách.

> ⚠️ **Link CDN này chỉ dùng cho bài tập.** Bản nộp đồ án cuối phải chạy được khi
> tắt mạng (`project/spec.md` §8) và cả hai kỳ thi đều offline. Trước khi nộp dự
> án, hãy tải file font về `project/css/fonts/` và dùng `@font-face`, hoặc xóa
> `<link>` và giữ một hệ font của máy. Hãy dựa vào font dự phòng, không dựa vào CDN.

## Example Output
Mini-site của bạn sẽ trông chỉn chu hơn hẳn với font tùy chỉnh. Đề mục nổi bật
với phong cách riêng, nội dung sạch và dễ đọc. Liên kết đổi màu khi rê chuột.
