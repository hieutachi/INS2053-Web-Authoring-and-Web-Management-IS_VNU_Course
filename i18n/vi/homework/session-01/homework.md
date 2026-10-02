# Bài tập 1: Trang web đầu tiên của bạn

## Due Date
Chủ nhật, 23:59 (Tuần 2)

## Mục tiêu
- Luyện cấu trúc tài liệu HTML5 đến mức có thể gõ từ trí nhớ
- Hiểu từng dòng của bộ khung (boilerplate) làm việc gì
- Tạo bố cục thư mục bạn sẽ dùng cho phần còn lại của khóa học

## Yêu cầu

### Task 1: Tạo trang của bạn

Hãy xây dựng một trang giới thiệu bản thân với lớp, dùng **chỉ những thẻ đã học trong
Buổi 1**: `<h1>`, `<h2>`, `<p>`, và chú thích HTML (comment).

**Trang của bạn phải có:**
- Bộ khung HTML5 đầy đủ — cả năm dòng:
  `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="UTF-8">`,
  `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<title>`
- Một `<title>` chứa tên của bạn (kiểm tra nó hiện trong tab trình duyệt, không phải trên trang)
- Một `<h1>` với tên của bạn
- Ít nhất hai đoạn `<p>`: bạn là ai, và một điều bạn muốn xây dựng trong học kỳ này
- Một đề mục `<h2>` với ít nhất một đoạn văn bên dưới
- Ít nhất một chú thích HTML (`<!-- ... -->`) đặt tên cho một vùng của trang

**Đường dẫn file:** tạo file tại

```
homework/session-01/index.html
```

### Task 2: Tạo bố cục thư mục

Bên trong `homework/session-01/`, tạo hai thư mục con rỗng:

```
homework/session-01/
├── index.html
├── css/          <-- để trống, bạn sẽ dùng ở Buổi 4
└── images/       <-- để trống, bạn sẽ dùng ở Buổi 3
```

Git không theo dõi thư mục rỗng, nên hãy đặt một file tên `.gitkeep` (file rỗng,
không có đuôi) vào trong mỗi thư mục để chúng tồn tại qua lần push.

**Danh sách kiểm tra yêu cầu:**
- [ ] Đủ cả năm dòng boilerplate
- [ ] `<title>` là tên của bạn và hiện trong tab trình duyệt
- [ ] Một `<h1>`, một `<h2>`, tổng cộng ít nhất ba `<p>`
- [ ] Ít nhất một chú thích HTML
- [ ] `css/` và `images/` tồn tại
- [ ] Mọi thẻ mở đều có thẻ đóng
- [ ] Thụt lề nhất quán

<!-- HW-BRIEF:START -->
## Mô tả chi tiết — hãy đọc phần này trước

### Bạn thực sự đang xây gì

Bạn vừa mở VS Code lần đầu. Trước mọi thứ kiểu dáng, hình ảnh hay menu, mọi website trên thế giới đều bắt đầu từ cùng một thứ: một file HTML nói cho trình duyệt biết bạn là ai. Tuần này bạn chưa xây website club — bạn xây **danh thiếp của bạn trên web**, trang mà cả lớp sẽ mở.

### Vì sao bài tập này tồn tại

- Bộ khung HTML5 năm dòng là đoạn code bạn sẽ gõ mười lăm lần trong học kỳ này, cộng hai lần trong bài thi thực hành. Nếu nó đến từ copy-paste, mỗi buổi sau mất thêm vài phút. Nếu nó đến từ trí nhớ, nó không tốn gì cả.
- Bố cục thư mục bạn tạo hôm nay (`css/`, `images/`) là bố cục mọi bài tập và đồ án giả định sẵn. Đổi tên muộn hơn sẽ làm gãy những link vẫn chạy tốt trên máy bạn nhưng chết trên server.

### “Xong” nhìn như thế nào

Mở phiếu bài tập trên website và so trang của bạn với bản mẫu sống ở mục **“Mẫu đối chiếu trực quan — bạn đang xây dựng gì”**: tên to đậm, hai đoạn chữ đen trên nền trắng, một đề mục phụ, không có kiểu dáng gì. Ở Tuần 1, đơn giản là đúng — một trang đã tô màu nghĩa là bạn dành thời gian sai chỗ.

### Cách làm từng bước

1. **Thiết lập một lần (2 phút).** Mở thư mục chứa repository bằng VS Code (**File → Open Folder** — đừng mở từng file lẻ). Tạo `homework/session-01/` bên trong.
2. **Gõ bộ khung (10 phút).** Tạo `index.html`, rồi tự gõ năm dòng boilerplate — không paste. Lưu, double-click file, xác nhận tab trình duyệt hiện đúng `<title>`.
3. **Điền nội dung (15 phút).** Một `<h1>` tên bạn, hai `<p>` về bạn, một `<h2>` kèm một đoạn văn dưới nó. Thêm một `<!-- comment -->` đặt tên cho một vùng của trang.
4. **Tạo thư mục rỗng (2 phút).** `css/` và `images/` trong `homework/session-01/`, mỗi thư mục chứa một file `.gitkeep`, nếu không Git sẽ quên chúng.
5. **Tự kiểm tra (5 phút).** Mọi thẻ mở đều có thẻ đóng, thụt lề nhất quán, không còn chữ thừa ngoài `<body>`. Rồi chạy công cụ tự chấm trước khi push.

### Nơi sinh viên mất điểm

- Paste boilerplate thay vì gõ tay — bạn sẽ hối hận ở bài thi giữa kỳ, vốn không có internet.
- Đặt `<meta charset="UTF-8">` sau `<title>`: tên tiếng Việt của bạn hiển thị thành `Ã¡` lỗi font.
- Quên `.gitkeep`: hai thư mục rỗng `css/` và `images/` biến mất sau push và mất điểm phần bố cục thư mục.

### File bài tập phải tạo ra

- `homework/session-01/index.html`
- `homework/session-01/css/.gitkeep`
- `homework/session-01/images/.gitkeep`

### Cách nộp bài

Bài tập này gồm hai phần, nộp cùng nhau và chấm riêng: **Phần 1 code (10 điểm)** và **Phần 2 video (4 điểm)**. Việc nộp bài trực tuyến chưa mở, nên repository Git của bạn chính là nơi nộp.

**Phần 1 — phần code**

1. Bảo đảm mọi file liệt kê ở trên tồn tại đúng đường dẫn đó — công cụ chấm tìm file theo đường dẫn, nên một trang đặt chỗ khác coi như không tồn tại.
2. Thêm vào staging: `git add homework/session-01/ project/` (chỉ thêm những gì buổi này động tới).
3. Commit với message nói rõ đã đổi gì: `git commit -m "HW1: <tóm tắt ngắn>"`.
4. Push: `git push`. Một commit nằm lại trên laptop không phải là bài nộp.

**Phần 2 — phần video**

1. Quay 60–120 giây bằng OBS Studio (<https://obsproject.com>): chia sẻ màn hình suốt buổi, bắt buộc có giọng nói của bạn, tên và mã số sinh viên nói ra hoặc hiện trên màn hình ở đầu video.
2. Trình bày MỘT phần của bài tập này thôi, không phải tất cả. Với buổi này: mở `homework/session-01/index.html`, giải thích năm dòng boilerplate mỗi dòng làm nhiệm vụ gì, rồi chỉ cho thấy `<title>` xuất hiện ở đâu trên tab trình duyệt.
3. Tải file MP4 (720p trở lên) lên **Google Drive của chính bạn** và đặt quyền chia sẻ là **“Ai có liên kết → Xem”**.
4. Mở `homework/submissions.md` trong repository và thêm một dòng: `- Session 01 — (dán link Google Drive của bạn vào đây)`.
5. Commit và push file đó cùng phần còn lại của bài tập. Link thiếu, để riêng tư hoặc hỏng nghĩa là phần video không chấm được.

**Trước khi push**

1. Tick từng mục trong danh sách kiểm tra ở phần Yêu cầu, đối chiếu với file thật chứ không đoán từ trí nhớ.
2. Mở công cụ tự chấm (`site/cham-bai.html`), chọn buổi 1, trỏ tới thư mục repository hoặc dán code, rồi sửa những gì nó báo. Công cụ trả về AUTO / MANUAL / BLOCKED — AUTO là điểm máy xác nhận được, MANUAL vẫn thuộc phán quyết của giảng viên.
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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở `homework/session-01/index.html`
và giải thích nhiệm vụ của từng dòng trong bộ khung HTML5 năm dòng, rồi chỉ chỗ
`<title>` của bạn hiện trong tab trình duyệt**.

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
   `- Session 01 — <your Google Drive link>`
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
- Lưu file đúng vị trí
- Thêm bài làm vào Git: `git add homework/session-01/`
- Commit với thông điệp: `git commit -m "HW1: Add first web page"`
- Push lên repository GitHub của bạn: `git push`

> Mới dùng Git? Buổi 2 sẽ dạy kỹ. Tuần này, làm đúng theo ba lệnh trên; nếu chúng
> báo lỗi, mang thông báo lỗi đến Buổi 2 và chúng ta sửa cùng nhau.

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Cấu trúc HTML | 3 | DOCTYPE đúng, `<html>`, `<head>`, `<body>`, mọi thẻ được đóng và lồng đúng |
| Đủ bộ khung | 2 | Đủ năm dòng, `charset` trước `title`, có `lang` |
| Nội dung | 2 | Lời của bạn: h1, h2, và ba đoạn văn trở lên |
| Bố cục thư mục | 2 | `css/` và `images/` tồn tại cạnh `index.html` |
| Code sạch | 1 | Thụt lề nhất quán, ít nhất một chú thích hữu ích |
| **Tổng** | **10** | |

## Tips
- Gõ bộ khung bằng tay thay vì copy. Bạn sẽ viết nó trong cả mười lăm buổi, nên
  đáng để nhớ từ trí nhớ.
- Lưu (`Ctrl+S`) trước khi tải lại trình duyệt. Thay đổi chưa lưu sẽ không hiện.
- Kiểm tra tab trình duyệt: nếu nó vẫn ghi "Untitled Document", `<title>` của bạn
  bị thiếu hoặc đặt sai chỗ.
- Tuần này chưa yêu cầu: hình ảnh, liên kết, `<hr>`, `<br>`, và CSS. Hình ảnh và
  liên kết đến ở Buổi 3, CSS ở Buổi 4. Thêm chúng bây giờ không mất điểm cũng
  không được điểm.

## Example Output
Một trang có tên bạn làm đề mục lớn, hai hoặc ba đoạn văn về bạn, một đề mục phụ
với một đoạn văn bên dưới, và tên bạn trong tab trình duyệt. Chữ đen nền trắng —
chưa có gì trang trí. Đúng như vậy cho Tuần 1.
