# Bài tập 5: Bố cục trang với HTML ngữ nghĩa

## Due Date
Chủ nhật, 23:59 (Tuần 6)

## Mục tiêu
- Học các phần tử HTML5 ngữ nghĩa (header, nav, main, footer)
- Xây bố cục trang đúng chuẩn bằng CSS
- Tạo một template bố cục dùng lại được cho dự án

## Requirements

### Task 1: Tạo template bố cục
Xây bố cục trang cho `project/index.html` bằng các phần tử HTML ngữ nghĩa và CSS.

**HTML của bạn phải dùng các phần tử ngữ nghĩa sau:**
- `<header>` — Chứa tên/logo của CLB
- `<nav>` — Chứa các liên kết điều hướng (Home, About, Contact)
- `<main>` — Chứa nội dung chính của trang
- `<footer>` — Chứa thông tin bản quyền và liên kết mạng xã hội

**Ví dụ cấu trúc:**
```html
<header>
  <h1>Your Club Name</h1>
</header>
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
<main>
  <h2>Welcome to Our Club</h2>
  <p>Your content here...</p>
</main>
<footer>
  <p>&copy; 2026 Your Club Name</p>
</footer>
```

> **Lưu ý:** Mọi trang dự án đều nằm ở gốc dự án, nên ba liên kết này giống hệt
> nhau trên mọi trang — tên file thuần, không bao giờ `../`. Dán cùng khối `<nav>`
> vào `index.html`, `about.html` và `contact.html`, chỉ đổi chỗ liên kết nào mang
> `class="active"`. Kiểm tra mọi liên kết bằng cách bấm vào nó, không phải bằng
> cách đọc nó.

### Task 2: Style bố cục bằng CSS
Thêm các quy tắc CSS vào `project/css/style.css` để bố cục trông như một trang
web đúng nghĩa.

> **Đừng bỏ qua bước này:** để `project/index.html` nhận được stylesheet,
> `<head>` của nó phải chứa `<link rel="stylesheet" href="css/style.css">` — đã
> thêm ở Buổi 4. Nếu trang vẫn không có style, mở DevTools (F12) → tab Network,
> tải lại, và xem `style.css` tải với mã 200 hay 404; 404 nghĩa là đường dẫn
> `href` sai.

**CSS của bạn phải có:**

1. **Style header:**
   - Màu nền
   - Màu chữ
   - Padding tạo khoảng cách
   - Căn chữ (căn giữa là được)

2. **Style điều hướng:**
   - Hiện các liên kết nav theo hàng ngang (dùng `display: inline-block` hoặc `flex`)
   - Thêm màu nền cho thanh nav
   - Bỏ dấu chấm đầu dòng của danh sách
   - Thêm khoảng cách giữa các liên kết

3. **Vùng nội dung chính:**
   - Đặt max-width (ví dụ 900px)
   - Căn giữa nội dung
   - Thêm padding hai bên

4. **Style footer:**
   - Màu nền (khác với header)
   - Căn chữ (giữa)
   - Padding

5. **Dọn dẹp chung:**
   - Bỏ margin mặc định của body
   - Cho bố cục chiếm full chiều rộng

**Đường dẫn file:**
- `project/index.html` (cập nhật với HTML ngữ nghĩa)
- `project/css/style.css` (cập nhật với style bố cục)

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở template bố cục và giải
thích thẻ ngữ nghĩa nào (`header`, `nav`, `main`, `aside`, `footer`) đảm nhiệm việc
gì, và CSS biến nó thành hai cột thế nào**.

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
   `- Session 05 — <your Google Drive link>`
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
- Thêm thay đổi: `git add project/index.html project/css/style.css`
- Commit: `git commit -m "HW5: Add semantic layout to index page"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| HTML ngữ nghĩa | 3 | Dùng header, nav, main, footer đúng cách |
| Điều hướng | 2 | Liên kết hoạt động, hiển thị đúng |
| Bố cục CSS | 3 | Header, nav, main, footer đều được style |
| Chất lượng thị giác | 1 | Trang trông như bố cục một website thật |
| Chất lượng code | 1 | HTML và CSS sạch, thụt lề đẹp |
| **Tổng** | **10** | |

## Tips
- Dùng `* { margin: 0; padding: 0; }` để bỏ khoảng cách mặc định trước khi thêm khoảng cách của riêng bạn
- Các liên kết nav phải trỏ tới đúng file với đường dẫn tương đối đúng
- Kiểm tra tất cả liên kết điều hướng để chắc chắn chúng hoạt động

## Example Output
`index.html` của bạn sẽ trông như một website thật: thanh header có màu trên cùng,
một menu điều hướng nằm ngang, vùng nội dung căn giữa, và thanh footer ở dưới.
