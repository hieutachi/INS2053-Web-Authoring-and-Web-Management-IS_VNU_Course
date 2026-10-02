# Bài tập 15: Làm website responsive

## Due Date
Chủ nhật, 23:59 (Tuần 16)

## Mục tiêu
- Học về thiết kế web responsive
- Dùng thẻ meta viewport cho thiết bị di động
- Viết CSS media queries để thích ứng bố cục với nhiều kích thước màn hình

## Requirements

### Task 1: Thêm thẻ meta viewport
Thêm thẻ meta viewport responsive vào phần `<head>` của TẤT CẢ các trang HTML.

**Thêm dòng này bên trong `<head>` trên mọi trang:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**File cần cập nhật:**
- `project/index.html`
- `project/about.html`
- `project/activities.html`
- `project/media.html`
- `project/contact.html`

### Task 2: Viết một media query
Thêm một media query vào CSS để đổi bố cục cho màn hình di động (màn hình nhỏ hơn 768px).

**Thêm vào `project/css/style.css`:**

```css
/* Responsive Design - Mobile Styles */
@media screen and (max-width: 768px) {

  /* Make navigation stack vertically on mobile */
  nav ul {
    flex-direction: column;
    text-align: center;
  }

  /* Make header smaller */
  header {
    padding: 15px;
  }

  header h1 {
    font-size: 1.5em;
  }

  /* Make main content full width */
  main {
    max-width: 100%;
    padding: 15px;
  }

  /* Make images responsive */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Make table scrollable on small screens */
  table {
    display: block;
    overflow-x: auto;
  }

  /* Adjust form inputs */
  form input,
  form select,
  form textarea {
    width: 100%;
  }

  /* Make footer smaller */
  footer {
    padding: 15px;
    font-size: 0.9em;
  }
}
```

**Media query của bạn phải có thay đổi cho ít nhất 5 trong các phần tử sau:**
- [ ] Menu điều hướng (xếp dọc hoặc chỉnh bố cục)
- [ ] Header (cỡ chữ nhỏ hơn, ít padding hơn)
- [ ] Vùng nội dung chính (full chiều rộng, ít padding hơn)
- [ ] Hình ảnh (max-width: 100%, height: auto)
- [ ] Bảng (cuộn ngang)
- [ ] Input của biểu mẫu (full chiều rộng)
- [ ] Footer (chữ nhỏ hơn, ít padding hơn)

### Task 3: Làm ảnh responsive
Đảm bảo mọi ảnh trên site co giãn đúng trên màn hình nhỏ.

**Thêm vào CSS gốc (ngoài media query):**
```css
img {
  max-width: 100%;
  height: auto;
}
```

### Task 4: Kiểm tra website của bạn
Kiểm tra website trên các kích thước màn hình khác nhau:

1. Mở website của bạn trong Chrome hoặc Firefox
2. Nhấn F12 để mở Developer Tools
3. Bấm nút "Toggle Device Toolbar" (biểu tượng điện thoại/máy tính bảng)
4. Kiểm tra ở các độ rộng: 320px (di động), 768px (máy tính bảng), 1024px (desktop)
5. Ghi lại các lỗi bố cục và sửa chúng

**Tùy chọn:** Thêm media query thứ hai cho màn hình nhỏ hơn nữa:
```css
@media screen and (max-width: 480px) {
  /* Extra small screen styles */
  h1 { font-size: 1.3em; }
  nav a { font-size: 0.9em; }
}
```

**Đường dẫn file:**
- Cả 5 file HTML (thẻ meta viewport)
- `project/css/style.css` (media queries + ảnh responsive)

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Tuần dựng bài cuối cùng: site của bạn thích ứng thay vì vỡ. Viewport meta, một media query tử tế, ảnh co giãn — kiểm trên cửa sổ cỡ điện thoại chứ không đoán.

### Vì sao bài tập này tồn tại

- Không có `<meta name="viewport">`, điện thoại giả vờ rộng 980px và mọi media query bạn viết thành vô dụng. Một dòng duy nhất, và là điều kiện tiên quyết cho cả tuần này.
- Môn học dạy query `max-width` (desktop-first). Chuẩn ngành là `min-width` (mobile-first); Chương 15 giải thích cả hai, nhưng bài thi cần `max-width`.
- `img { max-width: 100%; }` là rule duy nhất ngăn cuộn ngang trên điện thoại.
- Test responsive là một thói quen: kéo resize, nhìn breakpoint kích hoạt, xác nhận không chồng lấn. Chính thói quen đó được thưởng ở bài thi thực hành cuối kỳ.

### “Xong” nhìn như thế nào

Mở mẫu sống và kéo iframe hẹp dần: tới breakpoint hai cột xếp chồng, chữ trôi lại, ảnh nhỏ đi, và không bao giờ xuất hiện thanh cuộn ngang.

### Cách làm từng bước

1. **Thêm thẻ viewport (5 phút).** Một dòng trong `<head>` của cả năm trang, trước link stylesheet.
2. **Chọn breakpoint (10 phút).** Nhìn bố cục của chính bạn, không nhìn số thần kỳ. Quanh 768px là nơi hai cột bắt đầu chật ở site này.
3. **Viết query (20 phút).** `@media (max-width: 768px) { … }`: xếp `main` và `aside` full width, thu nhỏ đề mục, chỉnh padding.
4. **Cho ảnh chảy (10 phút).** `img { max-width: 100%; height: auto; }` đặt trong rule nền tảng.
5. **Test thật (15 phút).** Device toolbar của DevTools: 375px, 768px, desktop. Soi riêng nav, table, form và trang media — bảng và form tràn đầu tiên.
6. **Bò cuối (10 phút).** Mọi trang ở mọi chiều rộng, không cuộn ngang ở đâu cả.

### Nơi sinh viên mất điểm

- Thẻ viewport chỉ thêm vào một trang.
- Container đặt width pixel cố định vượt quá màn điện thoại.
- Dùng `min-width` trong bài thi trong khi chuẩn môn học là `max-width`.
- Bảng buộc cuộn ngang — bọc nó hoặc giảm số cột trong query.

### File bài tập phải tạo ra

- Cả 5 file HTML (thẻ meta viewport)
- `project/css/style.css`

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-15/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW15: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: chiếu site trong device toolbar của trình duyệt, thu hẹp viewport trực tiếp, và giải thích rule media query nào kích hoạt cùng thay đổi của nó.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 15 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 15, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở website của bạn trong
device toolbar của trình duyệt, thu hẹp viewport trực tiếp, và giải thích quy tắc
media query nào kích hoạt và nó thay đổi điều gì**.

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
   `- Session 15 — <your Google Drive link>`
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
- Commit: `git commit -m "HW15: Add responsive design with media queries"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Thẻ meta viewport | 2 | Được thêm vào mọi trang HTML |
| Media query | 3 | Ít nhất một media query với 5+ thay đổi phần tử |
| Ảnh responsive | 2 | Ảnh co giãn đúng trên mọi kích thước màn hình |
| Bố cục di động | 2 | Website trông đẹp trên màn hình di động (768px) |
| Kiểm thử | 1 | Website được kiểm tra và chạy tốt ở nhiều độ rộng |
| **Tổng** | **10** | |

## Tips
- Thẻ meta viewport là bắt buộc — thiếu nó, trình duyệt di động sẽ thu nhỏ để hiện toàn bộ bố cục desktop
- Kiểm tra sớm và thường — thu nhỏ cửa sổ trình duyệt trong lúc làm để phát hiện lỗi kịp thời
- `max-width: 100%` và `height: auto` trên ảnh ngăn chúng tràn khung trên màn hình nhỏ

## Example Output
Khi mở website trên điện thoại (hoặc thu cửa sổ trình duyệt về 320px), điều hướng
xếp dọc, ảnh vừa trong màn hình, header gọn gàng, và chữ đọc được mà không cần
zoom.
