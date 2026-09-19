# Bài tập 2: Tạo thư mục dự án của bạn

## Due Date
Chủ nhật, 23:59 (Tuần 3)

## Mục tiêu
- Học cách tổ chức file theo cấu trúc dự án chuẩn
- Hiểu quy tắc đặt tên file cho dự án web
- Tạo thư mục dự án làm việc bạn sẽ dùng suốt học kỳ

## Requirements

### Task 1: Tạo cấu trúc thư mục dự án
Lập một cấu trúc thư mục gọn gàng cho dự án Student Club Website của bạn. Cấu trúc này sẽ được dùng cho phần còn lại của khóa học.

**Tạo các thư mục và file sau:**
```
project/
  index.html
  about.html
  contact.html
  images/
    (thư mục chứa hình ảnh của bạn)
  css/
    (thư mục chứa stylesheet — để trống tạm thời)
```

> **Cấu trúc phẳng này là cấu trúc được chấm điểm.** `project/spec.md` và mọi mốc
> đồ án đều yêu cầu cả năm trang nằm ở gốc dự án — `index.html`, `about.html`,
> `activities.html`, `media.html`, `contact.html` — với duy nhất `css/` và `images/`
> làm thư mục con. Bạn sẽ thêm `activities.html` và `media.html` ở các bài tập sau.
> Giữ các trang ở gốc cũng nghĩa là mọi liên kết chỉ là tên file thuần, không có `../`.

**Quy tắc đặt tên bạn PHẢI tuân theo:**
- Mọi tên thư mục: chỉ chữ thường, không dấu cách
- Mọi tên file: chỉ chữ thường, dùng gạch nối (-) thay cho dấu cách
- Ví dụ: `about-us.html` là đúng, `About Us.html` là SAI

**Mỗi file cần chứa gì:**

1. `project/index.html` — Một trang chủ đơn giản cho website câu lạc bộ của bạn:
   - Cấu trúc HTML5
   - Một đề mục chào mừng (`<h1>`) với tên CLB (tự đặt, ví dụ "Coding Club" hoặc "Book Lovers Club")
   - Một đoạn văn ngắn chào khách
   - Một danh sách 3 hoạt động của CLB

2. `project/about.html` — Một trang giới thiệu đơn giản:
   - Cấu trúc HTML5
   - Một đề mục "About [Tên CLB]"
   - Một đoạn văn về CLB (3–4 câu)

3. `project/contact.html` — Một trang liên hệ đơn giản:
   - Cấu trúc HTML5
   - Một đề mục "Contact Us"
   - Một đoạn văn có địa chỉ email (dùng email giả)

### Task 2: Thêm ít nhất 2 hình ảnh *(làm phần này sau Buổi 3, khi `<img>` được dạy)*
- Đặt ít nhất 2 hình ảnh vào thư mục `images/` (bất kỳ ảnh nào bạn có quyền dùng; ảnh placeholder vẽ bằng Paint cũng được)
- Tham chiếu chúng từ `index.html` bằng đường dẫn tương đối
- Mỗi thẻ `<img>` phải có thuộc tính `alt`

> `<img>` và `alt` được dạy ở Buổi 3. Bài tập này nộp sau buổi đó, nên đến hạn
> nộp bạn đã học xong — nhưng nếu bạn ngồi làm trước Buổi 3, hãy làm Task 1
> trước rồi quay lại phần này.

**Đường dẫn file cần kiểm tra:**
- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/images/` (với ít nhất 2 file ảnh)

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở cây thư mục dự án của
bạn và giải thích vì sao website nằm trong `project/` còn bài tập nằm trong
`homework/session-02/`, và mỗi thư mục con (`css/`, `images/`) được dành riêng
cho việc gì**.

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
   `- Session 02 — <your Google Drive link>`
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
- Thêm mọi file mới: `git add project/`
- Commit: `git commit -m "HW2: Set up project folder structure"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Cấu trúc thư mục | 3 | Mọi thư mục tồn tại với tên đặt đúng |
| index.html | 2 | Có tên CLB, lời chào, danh sách, hình ảnh |
| about.html | 1 | Có đề mục và đoạn văn mô tả |
| contact.html | 1 | Có đề mục và thông tin liên hệ |
| Xử lý hình ảnh | 2 | 2+ ảnh có alt, đường dẫn tương đối đúng |
| Đặt tên file | 1 | Toàn bộ chữ thường, không dấu cách, đúng quy tắc |
| **Tổng** | **10** | |

## Tips
- Luôn dùng đường dẫn tương đối như `images/photo.jpg` thay vì đường dẫn đầy đủ như `C:/Users/...`
- Kiểm tra kỹ mọi tên thư mục và file chỉ dùng chữ thường và gạch nối
- Thư mục `images/` của bạn phải nằm trong `project/` để đường dẫn hoạt động đúng

## Example Output
Khi mở `index.html` trong trình duyệt, bạn sẽ thấy một trang chủ CLB có hình ảnh
và văn bản. Các trang about và contact nằm cạnh nó ở gốc dự án và tải qua liên
kết tên file thuần.
