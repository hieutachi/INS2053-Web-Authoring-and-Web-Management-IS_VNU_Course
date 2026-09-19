# Bài tập 4: Trang trí bằng External CSS

## Due Date
Chủ nhật, 23:59 (Tuần 5)

## Mục tiêu
- Tạo một file CSS ngoài (external stylesheet)
- Học selector, property và value của CSS
- Áp dụng màu sắc, font chữ và khoảng cách cho các trang của bạn

## Requirements

### Task 1: Tạo file CSS ngoài
Tạo một file CSS và liên kết nó với trang About.

**Tạo file:** `project/css/style.css`

**Liên kết trong HTML:** thêm dòng này vào `<head>` của `project/about.html`:
```html
<link rel="stylesheet" href="css/style.css">
```

> Mọi trang trong dự án đều nằm ở gốc dự án, nên liên kết CSS giống nhau trên tất
> cả: `css/style.css`, không có `../`. Thêm dòng y hệt vào cả `index.html` và
> `contact.html` — một trang thiếu liên kết sẽ không có style, và đó là lý do số
> một khiến bài tập "trông như chẳng có gì xảy ra".

### Task 2: Trang trí trang About
Viết các quy tắc CSS để trang About trông hấp dẫn về mặt thị giác.

**CSS của bạn phải có:**

1. **Style cho body:**
   - Đặt màu nền (chọn màu sáng, dễ đọc)
   - Đặt màu chữ tương phản tốt với nền
   - Đặt font family mặc định (ví dụ Arial, Verdana, hoặc sans-serif)
   - Đặt cỡ chữ cho body

2. **Style cho đề mục:**
   - Style `h1` với màu cụ thể và cỡ chữ lớn hơn
   - Style `h2` với màu khác
   - Style `h3` với màu hoặc kiểu khác nữa

3. **Style cho đoạn văn:**
   - Đặt line height (ví dụ 1.6 hoặc 1.8)
   - Thêm margin hoặc padding tạo khoảng cách

4. **Style cho hình ảnh:**
   - Đặt max-width để ảnh không tràn khung
   - Thêm border hoặc border-radius cho đẹp
   - Thêm padding hoặc margin quanh ảnh

5. **Style cho danh sách:**
   - Style ít nhất một loại danh sách (ul hoặc ol)
   - Có thể đổi list-style hoặc thêm padding

**Đường dẫn file:**
- `project/css/style.css` (file CSS mới)
- `project/about.html` (cập nhật với liên kết CSS)

**Danh sách kiểm tra yêu cầu:**
- [ ] File CSS ngoài tồn tại tại `project/css/style.css`
- [ ] CSS được liên kết với `about.html`
- [ ] Body có màu nền và cài đặt font
- [ ] Cả 3 cấp đề mục có style phân biệt
- [ ] Đoạn văn có line height dễ đọc
- [ ] Ảnh có max-width và một chút style
- [ ] Ít nhất một danh sách được style

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở `css/style.css`, giải
thích `project/about.html` liên kết tới nó bằng `<link>` thế nào, rồi đi qua một
quy tắc bạn viết (selector → property → hiệu quả)**.

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
   `- Session 04 — <your Google Drive link>`
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
- Thêm thay đổi: `git add project/css/style.css project/about.html`
- Commit: `git commit -m "HW4: Add external CSS and style About page"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| File CSS | 2 | File tồn tại và được liên kết đúng |
| Màu sắc | 2 | Nền, chữ và màu đề mục được đặt |
| Typography | 2 | Font family, cỡ chữ, line height được định nghĩa |
| Khoảng cách | 2 | Margin, padding và line height cải thiện độ dễ đọc |
| Style ảnh | 1 | Ảnh được đặt kích thước và style hợp lý |
| Tổng thể | 1 | Trang trông sạch và chuyên nghiệp |
| **Tổng** | **10** | |

## Tips
- Liên kết CSS là `href="css/style.css"` trên mọi trang, vì tất cả các trang nằm ở gốc dự án
- Nếu trang vẫn không có style, nhấn F12 → Network, tải lại, và xem `style.css` trả về **200** (tìm thấy) hay **404** (sai đường dẫn)
- Chọn màu hợp nhau (thử một trang bảng màu như coolors.co)
- Kiểm tra trang trên trình duyệt sau mỗi lần sửa CSS để thấy hiệu quả

## Example Output
Trang About của bạn sẽ chuyển từ chữ đen trắng thuần sang một trang nhiều màu,
khoảng cách hợp lý, với đề mục được trang trí, đoạn văn dễ đọc và ảnh được đóng
khung đẹp mắt.
