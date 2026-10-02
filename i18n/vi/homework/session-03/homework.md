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

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Trang About của bạn hết là một mẩu ghi chú và trở thành một trang thật: phân cấp đề mục đúng, danh sách dễ quét mắt, và ảnh vẫn nói lên điều gì đó khi nó không tải được.

### Vì sao bài tập này tồn tại

- Cấp đề mục là cấu trúc, không phải cỡ chữ. Dùng `<h3>` vì nó trông nhỏ sẽ làm rối trình đọc màn hình và công cụ tìm kiếm, đồng thời mất điểm phần cấu trúc trong rubric.
- Danh sách là cách rẻ nhất để nội dung dễ đọc: không thứ tự cho những việc ngang nhau (hoạt động club), có thứ tự cho các bước hoặc xếp hạng.
- `alt` không phải chi tiết trang trí. Đó là thứ người khiếm thị nghe thấy, thứ hiện ra khi ảnh lỗi, và thứ Google lập chỉ mục. Alt mô tả là yêu cầu được chấm, không phải gợi ý.
- Đường dẫn tương đối là lý do site chạy tốt trên máy bạn nhưng chết sau khi upload. Xử lý đúng một lần ở đây giúp mọi buổi sau nhẹ đi.

### “Xong” nhìn như thế nào

So với mẫu sống: tiêu đề, đoạn giới thiệu, ba cấp đề mục, một danh sách gạch đầu dòng, một danh số thứ tự, rồi thư viện ít nhất ba ảnh có chú thích. Chữ chảy một cột từ trên xuống — chưa có CSS.

### Cách làm từng bước

1. **Mở lại trang tuần trước (1 phút).** Sửa trực tiếp `project/about.html`. Đừng tạo file mới; trang này lớn dần mỗi tuần.
2. **Vẽ dàn ý (10 phút).** `<h1>` tên club/trang → `<h2>` mục → `<h3>` mục con, mỗi đề mục kèm đoạn văn của nó.
3. **Thêm hai danh sách (10 phút).** Một `<ul>` 5+ mục, một `<ol>` 3+ mục. Mỗi mục ngắn gọn.
4. **Thả ảnh (15 phút).** Đặt file vào `project/images/`, tham chiếu bằng `<img src="images/ten-file.jpg" alt="mô tả nội dung ảnh">` kèm `width`/`height`.
5. **Xây thư viện ảnh (10 phút).** Ba ảnh trở lên, mỗi ảnh có chú thích hiện trên trang, nằm trong một mục có `<h2>`.
6. **Rà soát alt (5 phút).** Đọc to trang của bạn chỉ bằng các dòng alt. Nếu người nghe không hình dung được trang, viết lại.

### Nơi sinh viên mất điểm

- `alt="image"` hay `alt="photo"` — không nói gì, mất trọn điểm phần alt.
- `src="/images/x.jpg"` (dấu gạch chéo đầu = tuyệt đối từ gốc web) thay vì `src="images/x.jpg"`.
- Nhảy cấp đề mục (`h1` → `h3`) chỉ để chữ nhỏ hơn.

### File bài tập phải tạo ra

- `project/about.html`
- `project/images/` (file ảnh mới)

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-03/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW3: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu một ảnh bạn thêm vào thư viện và giải thích `src`, `alt`, `width`/`height` mỗi thứ làm gì, và chuyện gì xảy ra nếu thiếu từng thứ.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 03 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 3, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
