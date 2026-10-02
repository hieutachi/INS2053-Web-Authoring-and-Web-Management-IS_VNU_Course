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

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Tuần này bạn đổ nền cho cả học kỳ: một thư mục dự án thật. Từ đây môn học chạy trên **hai cây tách biệt** trong repository, và nhầm lẫn giữa chúng là cách mất điểm phổ biến nhất.

### Vì sao bài tập này tồn tại

- `project/` là Student Club Website — đồ án bạn cộng thêm tính năng mỗi tuần và nộp cuối kỳ. `homework/session-NN/` là bài luyện tạm thời của riêng tuần đó. Việc chấm bài nhìn vào đường dẫn cụ thể, nên một trang đặt sai cây coi như không tồn tại với người chấm.
- Cấu trúc phẳng ở gốc project (các trang nằm cạnh nhau, chỉ `css/` và `images/` là thư mục con) khiến mọi link nội bộ chỉ là tên file, không có `../` để gõ sai.
- Đặt tên chữ thường có dấu gạch nối không phải là cầu toàn: server Linux coi `About.html` và `about.html` là hai file khác nhau, link của bạn gãy ngay khi deploy.

### “Xong” nhìn như thế nào

Cây thư mục của bạn phải giống tham chiếu trong Task 1: ba trang chạy được ở gốc project, hai thư mục asset rỗng nhưng có thật, không có gì thêm. So với mẫu sống trên trang website.

### Cách làm từng bước

1. **Tạo cây thư mục (5 phút).** Tạo `project/` gồm `index.html`, `about.html`, `contact.html`, cùng `project/css/` và `project/images/`.
2. **Viết ba trang nháp (20 phút).** Mỗi trang có đủ bộ khung HTML5, một `<h1>` và nội dung ngắn Task 1 mô tả. Nghĩ tên club ngay bây giờ — bạn sẽ giữ nó tới Tuần 16.
3. **Áp dụng quy tắc đặt tên (5 phút).** Chữ thường, dấu gạch nối thay khoảng trắng, không dấu trong tên file. Đổi tên mọi thứ sai trước khi link tới nó.
4. **Hình ảnh — sau Buổi 3 (10 phút).** Task 2 cần `<img>` mà buổi sau mới học. Làm Task 1 bây giờ, quay lại Task 2 sau buổi 3; bài được thu sau buổi đó.
5. **Kiểm tra đường dẫn, không kiểm tra đẹp (5 phút).** Mở từng trang từ file hệ thống và chắc chắn ảnh nạp từ đường dẫn tương đối `images/…`.

### Nơi sinh viên mất điểm

- Để trang bài tập trong `project/` — cây đồ án phải sạch.
- `About Us.html` hay `Trang chủ.html`: khoảng trắng và dấu tiếng Việt trong tên file.
- Link bằng `../images/x.png` từ một trang ở gốc: không có thư mục cha nào để leo lên.

### File bài tập phải tạo ra

- `project/index.html`
- `project/about.html`
- `project/contact.html`
- `project/css/`
- `project/images/` (2+ file ảnh)

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-02/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW2: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu cây thư mục project, giải thích vì sao website nằm ở `project/` còn bài luyện nằm ở `homework/session-02/`, và `css/` với `images/` được dành để làm gì.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 02 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 2, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
