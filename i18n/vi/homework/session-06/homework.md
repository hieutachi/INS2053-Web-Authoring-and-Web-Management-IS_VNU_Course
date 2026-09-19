# Bài tập 6: Xây mini-site 3 trang

## Due Date
Chủ nhật, 23:59 (Tuần 7)

## Mục tiêu
- Kết nối mọi trang bằng một menu điều hướng chung
- Giữ bố cục nhất quán trên nhiều trang
- Tạo một website nhiều trang hoạt động được

## Requirements

### Task 1: Thêm điều hướng cho cả 3 trang
Cập nhật cả ba trang (index.html, about.html, contact.html) để chúng dùng chung
cấu trúc điều hướng và bố cục.

**Mọi trang phải có:**
- Cùng `<header>` với tên CLB
- Cùng `<nav>` với liên kết tới: Home, About, Contact
- Cùng `<footer>` với thông tin bản quyền
- Cùng khối `<main>` bọc nội dung
- Cùng file stylesheet được liên kết

**Các liên kết điều hướng giống hệt nhau trên mọi trang** — cả ba file đều nằm ở
gốc dự án, nên mỗi liên kết là một tên file thuần:

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

Copy đúng khối này vào cả ba trang, chỉ đổi chỗ liên kết nào nhận `class="active"`.
Không có `../` ở bất kỳ đâu.

### Task 2: Hoàn thiện trang Contact
Xây `project/contact.html` với nội dung đầy đủ:

- Một đề mục "Contact Us"
- Một đoạn văn mời khách liên hệ
- Một danh sách các kênh liên hệ (email, điện thoại, mạng xã hội — dùng thông tin giả)
- Một đoạn văn với địa điểm/địa chỉ họp của CLB
- Ít nhất 1 hình ảnh

### Task 3: Cải thiện trang chủ
Cập nhật `project/index.html` với nội dung phong phú hơn:

- Một phần chào mừng với đoạn giới thiệu
- Một phần "What We Do" với danh sách hoạt động
- Một phần "Why Join Us?" với 3 lợi ích
- Ít nhất 2 hình ảnh
- Một phần "Latest News" hoặc "Upcoming Events"

**Đường dẫn file:**
- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/style.css`

**Danh sách kiểm tra yêu cầu:**
- [ ] Cả 3 trang có cùng header, nav và footer
- [ ] Liên kết điều hướng hoạt động đúng từ mọi trang
- [ ] Trang contact có nội dung đầy đủ
- [ ] Trang chủ có nhiều phần
- [ ] CSS được liên kết trên mọi trang
- [ ] Bố cục nhất quán trên tất cả các trang

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở menu điều hướng trên cả
ba trang và giải thích vì sao cùng một menu `<ul>` hoạt động trên mọi trang, và
trang hiện tại được làm nổi bật thế nào**.

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
   `- Session 06 — <your Google Drive link>`
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
- Commit: `git commit -m "HW6: Complete 3-page mini-site with navigation"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Liên kết điều hướng | 3 | Mọi liên kết hoạt động đúng trên cả 3 trang |
| Bố cục nhất quán | 2 | Cùng header, nav, footer trên mọi trang |
| Nội dung trang contact | 2 | Có đầy đủ các phần tử nội dung yêu cầu |
| Nội dung trang chủ | 2 | Có nhiều phần và hình ảnh |
| Tính thống nhất chung | 1 | Website cảm giác thống nhất và chuyên nghiệp |
| **Tổng** | **10** | |

## Tips
- Mọi trang đều nằm ở gốc dự án, nên liên kết là tên file thuần — nếu bạn thấy mình gõ `../`, có gì đó nằm sai thư mục
- Kiểm tra mọi liên kết bằng cách bấm vào nó trên trình duyệt
- Nếu một liên kết hỏng, kiểm tra kỹ đường dẫn tương đối

## Example Output
Bạn sẽ có một website 3 trang, bấm qua lại giữa các trang Home, About và Contact
được. Mỗi trang phải cảm giác thuộc cùng một website với thiết kế đồng nhất.
