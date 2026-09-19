# Bài tập 9: Tạo bảng HTML

## Due Date
Chủ nhật, 23:59 (Tuần 10)

## Mục tiêu
- Học cách xây bảng HTML
- Luyện dùng các phần tử bảng: table, tr, th, td
- Style bảng bằng CSS để dễ đọc

## Requirements

### Task 1: Tạo bảng lịch trình
Tạo một trang mới cho dự án hiển thị lịch hằng tuần hoặc thời khóa biểu hoạt động.

**Tạo file:** `project/activities.html`

> Đây là trang được `project/spec.md` và mốc M5 chấm — tên file phải chính xác là
> `activities.html`, nằm ở gốc dự án cạnh `index.html`.

**Bảng của bạn phải có:**
- Một phần tử `<caption>` mô tả bảng (ví dụ "Weekly Club Activities")
- Một phần `<thead>` với các ô tiêu đề cột
- Một phần `<tbody>` với các dòng dữ liệu
- Ít nhất 5 cột (ví dụ Day, Time, Activity, Location, Leader)
- Ít nhất 5 dòng dữ liệu
- Dùng `<th>` cho ô tiêu đề và `<td>` cho ô dữ liệu
- Dùng `colspan` hoặc `rowspan` ít nhất một lần

**Ví dụ cấu trúc:**
```html
<table>
  <caption>Weekly Club Activities</caption>
  <thead>
    <tr>
      <th>Day</th>
      <th>Time</th>
      <th>Activity</th>
      <th>Location</th>
      <th>Leader</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>3:00 PM</td>
      <td>Coding Workshop</td>
      <td>Room 301</td>
      <td>Nguyen Van A</td>
    </tr>
    <!-- more rows -->
  </tbody>
</table>
```

### Task 2: Style bảng
Thêm CSS để bảng trông chuyên nghiệp.

**CSS của bạn phải có:**
- Đặt `width: 100%` và `border-collapse: collapse` cho bảng
- Thêm viền cho mọi ô
- Style ô tiêu đề với màu nền và chữ trắng
- Thêm màu xen kẽ cho các dòng (zebra striping) bằng `tr:nth-child(even)`
- Thêm padding bên trong ô cho dễ đọc
- Thêm hiệu ứng hover cho các dòng

### Task 3: Cập nhật điều hướng
- Thêm liên kết "Activities" vào menu điều hướng trên TẤT CẢ các trang
- Mọi trang đều nằm ở gốc dự án, nên liên kết đơn giản là `href="activities.html"` ở mọi nơi
- Bấm thử từ mỗi trang để xác nhận

**Đường dẫn file:**
- `project/activities.html` (trang mới với bảng)
- `project/css/style.css` (cập nhật với style bảng)
- `project/index.html`, `project/about.html`, `project/contact.html` (thêm liên kết nav)

**Danh sách kiểm tra yêu cầu:**
- [ ] Bảng có caption, thead, tbody
- [ ] Có 5+ cột và 5+ dòng
- [ ] `colspan` hoặc `rowspan` được dùng ít nhất một lần
- [ ] Bảng được style với viền, màu tiêu đề, zebra striping
- [ ] Liên kết Activities có trên mọi trang và hoạt động

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở bảng lịch trình của
bạn và giải thích `<thead>`, `<tbody>` và `colspan`/`rowspan` làm gì trong đó,
cộng thêm một lựa chọn style bạn đã làm**.

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
   `- Session 09 — <your Google Drive link>`
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
- Commit: `git commit -m "HW9: Add schedule page with styled table"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Cấu trúc bảng | 3 | Dùng thead, tbody, caption, th, td đúng cách |
| Nội dung | 2 | Có 5+ cột, 5+ dòng, dùng colspan/rowspan |
| Style bảng | 3 | Viền, màu tiêu đề, zebra striping, hover |
| Điều hướng | 1 | Liên kết Activities được thêm vào mọi trang |
| Độ chính xác liên kết | 1 | Mọi liên kết điều hướng hoạt động đúng |
| **Tổng** | **10** | |

## Tips
- Dùng `border-collapse: collapse` để tránh viền kép
- Zebra striping giúp bảng dễ đọc hơn nhiều: `tr:nth-child(even) { background: #f2f2f2; }`
- Đảm bảo liên kết nav Activities là `href="activities.html"` trên mọi trang — không có `../`

## Example Output
Một bảng trông sạch sẽ, chuyên nghiệp trên trang riêng của nó. Dòng tiêu đề nổi
bật bằng màu, các dòng xen kẽ màu, và điều hướng có liên kết Activities trên mọi
trang.
