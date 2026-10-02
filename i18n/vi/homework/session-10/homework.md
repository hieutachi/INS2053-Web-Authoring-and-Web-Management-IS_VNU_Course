# Bài tập 10: Nhúng video và audio

## Due Date
Chủ nhật, 23:59 (Tuần 11)

## Mục tiêu
- Học nhúng video và audio bằng các phần tử HTML5
- Hiểu các định dạng media và tính tương thích của trình duyệt
- Thêm nội dung media phong phú vào website CLB

## Requirements

### Task 1: Tạo trang Media
Tạo một trang mới tên "Media" để giới thiệu nội dung video và audio của CLB.

**Tạo file:** `project/media.html`

**Trang Media của bạn phải có:**

1. **Phần Video:**
   - Dùng phần tử `<video>` để nhúng video
   - Có thuộc tính `controls` để người dùng phát/tạm dừng
   - Đặt thuộc tính `width` (ví dụ `width="560"`)
   - Thêm thuộc tính `poster` với một ảnh thumbnail
   - Thêm văn bản dự phòng cho trình duyệt không hỗ trợ video
   - Có thể dùng video mẫu từ internet hoặc file local

2. **Phần Audio:**
   - Dùng phần tử `<audio>` để nhúng audio
   - Có thuộc tính `controls`
   - Thêm văn bản dự phòng
   - Có thể dùng file audio mẫu hoặc URL audio royalty-free

3. **Nội dung trang:**
   - Một đề mục "Club Media"
   - Một đoạn văn mô tả video (video chụp điều gì)
   - Một đoạn văn mô tả nội dung audio
   - Ít nhất một hình ảnh liên quan đến media/sản xuất nội dung

**Ví dụ code:**
```html
<video width="560" controls poster="images/video-thumbnail.jpg">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>

<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

### Task 2: Style trang Media
Thêm CSS để trang media trông đẹp.

**CSS của bạn phải có:**
- Căn giữa phần tử video
- Style trình phát audio (thêm margin, có thể thêm nền)
- Style các đề mục của phần
- Thêm khoảng cách giữa các phần
- Cho video responsive với `max-width: 100%`

### Task 3: Cập nhật điều hướng
- Thêm liên kết "Media" vào điều hướng trên TẤT CẢ các trang
- Mọi trang đều nằm ở gốc dự án, nên liên kết là `href="media.html"` ở mọi nơi

**Đường dẫn file:**
- `project/media.html` (trang mới)
- `project/css/style.css` (thêm style media)
- Cả 4 trang HTML hiện có (cập nhật điều hướng)

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Site có chuyển động và âm thanh: một trang Media với video nhúng và một đoạn audio, mỗi thứ có điều khiển, có poster và có nội dung dự phòng cho trình duyệt không phát được.

### Vì sao bài tập này tồn tại

- `<video>` và `<audio>` là HTML thuần — không plugin, không Flash. Biết các thuộc tính (`controls`, `poster`, `preload`, `loop`, `muted`) là toàn bộ kỹ năng.
- Nội dung dự phòng trong thẻ không phải trang trí tuỳ chọn: đó là thứ người dùng thiếu codec nhìn thấy, và nó được chấm.
- File cục bộ hay nhúng ngoài rất quan trọng cho kỳ thi: bài thi thực hành không có internet, nên `<video>` của bạn với `source` cục bộ là thứ dựa được.
- Media rất nặng. Giới hạn kích thước, lazy loading và để file trong `project/media/` là thực hành tốt, không việc vặt.

### “Xong” nhìn như thế nào

Mẫu sống: trang Media có video hiển thị khung poster trước khi phát, phát với điều khiển nhìn thấy được, chiều rộng hợp lý, và hàng audio thẳng hàng với phần còn lại của bố cục.

### Cách làm từng bước

1. **Chuẩn bị asset (10 phút).** Một MP4 ngắn và một MP3 bạn có quyền dùng. Đặt trong `project/media/`.
2. **Tạo trang (5 phút).** `project/media.html` copy từ một trang đang có.
3. **Nhúng video (15 phút).** `<video>` có `controls`, `poster`, `width`/`height` rõ ràng, một `<source>` MP4, kèm chữ dự phòng và một link cho trình duyệt thất bại.
4. **Nhúng audio (10 phút).** `<audio controls>` có `<source>` và cùng mẫu dự phòng.
5. **Style trang (15 phút).** Giới hạn chiều rộng media theo cột nội dung, chú thích dưới từng clip, khoảng cách nhất quán với các trang khác.
6. **Kiểm tra chéo (5 phút).** Phát và tạm dừng cả hai, kéo thanh tiến trình, rồi xem source và chắc chắn chữ dự phòng là câu có nghĩa.

### Nơi sinh viên mất điểm

- `autoplay` — gây khó chịu và thường bị trình duyệt chặn.
- Commit video 200 MB vào Git; hãy giữ clip ngắn hoặc link ra ngoài và ghi rõ.
- Thiếu nội dung dự phòng: một khung trống ăn điểm 0 phần media.

### File bài tập phải tạo ra

- `project/media.html`
- `project/media/` (file video + audio)
- `project/css/style.css`
- Toàn bộ trang HTML đang có (cập nhật nav)

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-10/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW10: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu trang media và giải thích `<video>` (hoặc `<audio>`) với `controls` hoạt động thế nào, gồm cả chữ dự phòng và các thuộc tính `poster`/`source` bạn dùng.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 10 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 10, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở trang media và giải
thích phần tử `<video>` (hoặc `<audio>`) với `controls` hoạt động thế nào, kể cả
văn bản dự phòng và các thuộc tính `poster`/`source` bạn đã dùng**.

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
   `- Session 10 — <your Google Drive link>`
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
- Commit: `git commit -m "HW10: Add media page with video and audio"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Phần tử video | 3 | Dùng thẻ video với controls, poster, fallback |
| Phần tử audio | 3 | Dùng thẻ audio với controls và fallback |
| Nội dung trang | 2 | Có đề mục, mô tả, hình ảnh |
| Style media | 1 | Video căn giữa, audio được style |
| Điều hướng | 1 | Liên kết Media được thêm vào mọi trang, hoạt động đúng |
| **Tổng** | **10** | |

## Tips
- Nếu chưa có file video/audio, dùng URL mẫu từ w3schools.com hoặc tương tự
- Thuộc tính `poster` trên video hiện một ảnh trước khi video phát
- Kiểm tra cả video và audio trên nhiều trình duyệt nếu có thể

## Example Output
Trang Media của bạn sẽ có một trình phát video bấm phát/tạm dừng được, một trình
phát audio, và mô tả nội dung. Thanh điều hướng có liên kết "Media" hoạt động từ
mọi trang.
