# Bài tập 3: Xây dựng trang About

## Due Date
Chủ nhật, 23:59 (Tuần 4)

## Mục tiêu
- Luyện dùng các cấp đề mục, đoạn văn và danh sách
- Học cách thêm hình ảnh với alt text có ý nghĩa
- Xây nội dung phong phú bằng các phần tử HTML ngữ nghĩa

## Requirements

### Task 1: Nâng cấp trang About
Cập nhật file `project/about.html` để trở thành một trang nội dung đầy đủ, phong
phú về CLB của bạn.

**Trang About của bạn phải có:**

1. **Đề mục:** dùng ít nhất 3 cấp đề mục khác nhau:
   - `<h1>` cho tên CLB
   - `<h2>` cho tên các phần (ví dụ "Our Mission", "Our Activities")
   - `<h3>` cho các phần con (ví dụ "Weekly Events")

2. **Đoạn văn:** ít nhất 3 đoạn nói về:
   - CLB của bạn là gì (mục đích)
   - Ai có thể tham gia (thành viên)
   - Vì sao nên tham gia (lợi ích)

3. **Danh sách:** ít nhất 2 loại danh sách:
   - Một danh sách không thứ tự (`<ul>`) với ít nhất 5 hoạt động hoặc sự kiện của CLB
   - Một danh sách có thứ tự (`<ol>`) với ít nhất 3 bước (ví dụ "How to Join")

4. **Hình ảnh:** ít nhất 2 ảnh có alt text mô tả:
   - Một ảnh đại diện cho CLB
   - Một ảnh chụp hoạt động hoặc sự kiện (ảnh phù hợp nào cũng được)
   - Mỗi `<img>` phải có thuộc tính `alt` có ý nghĩa (không rỗng, không phải chữ "image")

### Task 2: Thêm phần Thư viện ảnh
Tạo một phần với đề mục `<h2>Photo Gallery</h2>` chứa ít nhất 3 ảnh sắp xếp trong
một bố cục đơn giản.

- Mỗi ảnh phải có alt text khác nhau mô tả nội dung ảnh
- Thêm một chú thích `<p>` ngắn bên dưới mỗi ảnh

**Đường dẫn file:** `project/about.html`

**Danh sách kiểm tra yêu cầu:**
- [ ] Dùng đề mục h1, h2 và h3
- [ ] Có 3+ đoạn văn
- [ ] Có 1 danh sách không thứ tự với 5+ mục
- [ ] Có 1 danh sách có thứ tự với 3+ mục
- [ ] Có 2+ ảnh với alt text mô tả
- [ ] Có phần thư viện ảnh với 3+ ảnh và chú thích

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở một ảnh trong thư viện
của trang About và giải thích thuộc tính `src`, `alt` và width/height mỗi cái làm gì**.

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
   `- Session 03 — <your Google Drive link>`
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
- Thêm thay đổi: `git add project/about.html`
- Commit: `git commit -m "HW3: Enhance About page with rich content"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Phân cấp đề mục | 2 | Dùng h1, h2, h3 đúng cách |
| Đoạn văn | 2 | Có 3+ đoạn văn viết tốt |
| Danh sách | 2 | Có cả danh sách có thứ tự và không thứ tự |
| Hình ảnh + alt text | 3 | Ảnh tải được, alt text mô tả rõ |
| Thư viện ảnh | 1 | Có phần thư viện với chú thích |
| **Tổng** | **10** | |

## Tips
- Đề mục phải theo thứ tự hợp lý: đừng nhảy từ h1 sang h3
- Alt text nên mô tả ảnh chụp điều gì (ví dụ "Students working together on a coding project")
- Dùng ảnh của bạn hoặc ảnh miễn phí từ các trang như Unsplash hay Pixabay
- Vì `about.html` nằm ở gốc dự án cạnh `index.html`, đường dẫn ảnh là thuần:
  `images/logo.png` — không có `../`

## Example Output
Trang About của bạn sẽ giống một hồ sơ CLB chi tiết với các phần, danh sách hoạt
động và ảnh. Người xem có thể hiểu mọi thứ về CLB của bạn chỉ từ trang này.
