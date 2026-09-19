# Bài tập 14: Điều hướng dropdown bằng CSS

## Due Date
Chủ nhật, 23:59 (Tuần 15)

## Mục tiêu
- Xây menu dropdown tương tác chỉ bằng HTML và CSS thuần
- Hiểu cách các website hiện đại thay widget Spry lỗi thời bằng CSS `:hover`
- Thêm một phần tử tương tác vào website CLB

## Requirements

### Task 1: Thêm menu dropdown vào điều hướng
Tạo menu điều hướng dropdown chỉ bằng HTML và CSS — không cần JavaScript.

**Thêm dropdown vào nav của bạn** (đường dẫn hiển thị cho `project/index.html` ở
gốc site):

```html
<nav>
  <ul class="menu">
    <li><a href="index.html">Home</a></li>
    <li class="dropdown">
      <a href="about.html">About</a>
      <ul class="dropdown-content">
        <li><a href="about.html#mission">Our Mission</a></li>
        <li><a href="about.html#activities">Activities</a></li>
        <li><a href="about.html#gallery">Gallery</a></li>
      </ul>
    </li>
    <li><a href="activities.html">Activities</a></li>
    <li><a href="media.html">Media</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

**CSS cho dropdown:**
```css
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}
```

> Đây chính là mẫu menu mà Buổi 14 dạy như bản thay thế hiện đại cho Spry Menu
> Bar đã ngừng hỗ trợ — `:hover` trên `<li>` cha làm hiện `<ul>` con.

### Task 2: Style và tích hợp menu
Thêm CSS dropdown vào stylesheet và cập nhật điều hướng trên mọi trang.

**CSS của bạn phải có:**
- Style khung chứa dropdown (`position: relative` trên `<li>` cha)
- Nội dung dropdown ẩn theo mặc định
- Hiện dropdown khi hover
- Style các liên kết dropdown (padding, đổi màu khi hover)
- Hiệu ứng chuyển động mượt

**Phần cập nhật HTML của bạn phải có:**
- Nav cập nhật với cấu trúc dropdown trên ít nhất 2 trang
- Liên kết đúng bên trong dropdown (dùng trang và anchor của chính bạn)

### Task 3: Thêm nút "Back to Top" (Bonus)
Thêm một nút "Back to Top" đơn giản vào các trang của bạn.

**Cài đặt tối thiểu (HTML + CSS):**
```html
<a href="#top" class="back-to-top">Back to Top</a>
```

```css
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #2c3e50;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
}
```

**Đường dẫn file:**
- `project/index.html`, `project/about.html` (thêm dropdown vào nav)
- `project/css/style.css` (thêm style dropdown)
- Các trang khác (cập nhật nav đồng bộ)

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở menu dropdown và giải
thích `:hover` trên phần tử danh sách làm hiện menu con ẩn thế nào, và
`position: absolute` đóng vai trò gì ở đó**.

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
   `- Session 14 — <your Google Drive link>`
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
- Commit: `git commit -m "HW14: Add interactive dropdown menu"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Cấu trúc menu | 3 | HTML dropdown được cấu trúc đúng |
| Style CSS | 3 | Dropdown hiện khi hover, liên kết được style |
| Tích hợp | 2 | Dropdown hoạt động trong điều hướng hiện có |
| Back to top | 1 | Nút tồn tại và trỏ lên đầu trang |
| Chất lượng code | 1 | Code sạch, chú thích đầy đủ |
| **Tổng** | **10** | |

## Tips
- Chìa khóa của CSS dropdown là `display: none` mặc định và `display: block` khi `:hover`
- Dùng `position: relative` trên `<li>` cha và `position: absolute` trên `<ul>` dropdown
- Nếu dropdown tràn khỏi màn hình, điều chỉnh giá trị `left` hoặc `right`

## Example Output
Khi rê chuột lên mục "About", một dropdown sẽ hiện ra với các liên kết con như
"Our Mission", "Activities" và "Gallery". Dropdown biến mất khi bạn đưa chuột đi
khỏi.
