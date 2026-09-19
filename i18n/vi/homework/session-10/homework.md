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
