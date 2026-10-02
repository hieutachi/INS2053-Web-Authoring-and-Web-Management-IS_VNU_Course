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

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Điều hướng tự nâng cấp: một menu dropdown thuần CSS — sub-menu hiện ra khi hover, định vị chính xác, và được style để nằm trên nội dung trang.

### Vì sao bài tập này tồn tại

- Tuần này CSS positioning hết trừu tượng. `position: relative` trên phần tử cha cộng `position: absolute` trên phần tử con là mẫu đứng sau tooltip, modal và menu trong mọi giao diện thật.
- Ẩn/hiện bằng `display`/`visibility` khi `:hover` dạy bạn style theo trạng thái — cùng cơ chế với `:focus` và `:active`.
- `z-index` và stacking context giải thích vì sao dropdown đôi khi nằm *sau* nội dung. Học ở đây, đừng để tới bài thi cuối.
- Task 3 bonus (“về đầu trang”) cố ý là tùy chọn: chỉ làm khi dropdown đã vững.

### “Xong” nhìn như thế nào

Mẫu sống: rê chuột lên mục cha làm sub-menu dạng hộp hiện ra ngay bên dưới, lệch trái khớp mục cha, có transition nhẹ, và không bao giờ bị cột nội dung che mất.

### Cách làm từng bước

1. **Dựng cấu trúc (15 phút).** Danh sách lồng: `<nav>` → `<ul>` → `<li>` → (`<a>` + một `<ul>` lồng cho mục con). Danh sách lồng chính là sub-menu.
2. **Ẩn nó (5 phút).** `<ul>` con nhận `position: absolute`, `top: 100%`, `left: 0`, `display: none`.
3. **Neo nó (10 phút).** `<li>` cha nhận `position: relative` để phần tử absolute định vị theo cha, không theo trang.
4. **Hiện khi hover (10 phút).** `nav li:hover > ul { display: block; }`. Hover và xác nhận hộp hiện đúng dưới mục cha.
5. **Style hộp (15 phút).** Nền, viền, padding, khoảng cách mục, màu khi hover của link, `z-index` trên nội dung chính.
6. **Test khoảng hở (10 phút).** Đưa chuột chéo từ cha sang con: không nhấp nháy, không menu biến mất. Chỉnh padding để lấp vùng chết.

### Nơi sinh viên mất điểm

- Con absolute mà không có tổ tiên relative — menu bay ra góc trang.
- `display: none` đổi bằng `opacity` đơn thuần: không nhìn thấy nhưng vẫn bấm được, nên cướp hover của nội dung bên dưới.
- Áp dụng dropdown cho một trang duy nhất và mất nhất quán nav.

### File bài tập phải tạo ra

- `project/css/style.css`
- Ít nhất 2 file HTML (cập nhật navigation)

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-14/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW14: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu menu dropdown và giải thích `:hover` trên mục danh sách làm hiện sub-menu ẩn thế nào, và `position: absolute` đảm nhiệm gì ở đó.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 14 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 14, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
