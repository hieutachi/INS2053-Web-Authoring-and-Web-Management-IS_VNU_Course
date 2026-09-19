# Bài tập 8: Ôn tập giữa kỳ và luyện bảng

## Due Date
Chủ nhật, 23:59 (Tuần 9)

## Mục tiêu
- Sửa những điểm yếu bị phát hiện trong kỳ thi giữa kỳ
- Học căn bản về bảng HTML trước Buổi 9
- Giữ dự án Student Club Website của bạn luôn cập nhật

## Requirements

### Task 1: Suy ngẫm sau giữa kỳ
Mở bài thi giữa kỳ của bạn (hoặc đề luyện trong `exercises/session-08/`). Xác định
**ba lỗi** bạn mắc phải hoặc ba chủ đề bạn còn chưa chắc.

Với mỗi lỗi:
- Viết đáp án đúng là gì
- Viết một câu giải thích vì sao
- Tìm phần tương ứng trong các chương `ebook/` (1–7) và đọc lại

Tạo một file tên `midterm-review.md` bên trong `homework/session-08/` với ba mục của bạn:

```markdown
# Midterm Review

## Mistake 1: [chủ đề]
- **My answer:** ...
- **Correct answer:** ...
- **Why:** ...
- **Where to review:** ebook/0X-...md, section ...

## Mistake 2: [chủ đề]
...

## Mistake 3: [chủ đề]
...
```

### Task 2: Xây một bảng đơn giản — file luyện tập, chưa phải dự án
Tạo một file **luyện tập** tại `homework/session-08/table-practice.html` với một
bảng thể hiện hoạt động hằng tuần của CLB. Đây là phần khởi động: ở Bài tập 9 bạn
sẽ xây trang `project/activities.html` thật, với nhiều cột hơn và `colspan`. Giữ
riêng file này nghĩa là bạn thoải mái thử nghiệm mà không làm hỏng dự án.

**Bảng của bạn phải có:**
- Một `<caption>` mô tả bảng
- Một `<thead>` với các ô tiêu đề cột (Day, Time, Activity, Location)
- Một `<tbody>` với ít nhất 4 dòng dữ liệu
- Dùng `<th>` cho ô tiêu đề và `<td>` cho ô dữ liệu

**Ví dụ cấu trúc:**
```html
<table>
  <caption>Weekly Club Schedule</caption>
  <thead>
    <tr>
      <th>Day</th>
      <th>Time</th>
      <th>Activity</th>
      <th>Location</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>3:00 PM</td>
      <td>Coding Workshop</td>
      <td>Room 301</td>
    </tr>
    <!-- add more rows -->
  </tbody>
</table>
```

### Task 3: Style bảng ở mức cơ bản
Thêm CSS cho bảng. Đặt trong `homework/session-08/table-practice.css` (được liên
kết từ trang luyện tập) — bạn sẽ chuyển các quy tắc hoạt động tốt sang
`project/css/style.css` ở Bài tập 9:

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #333;
  color: white;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

### Task 4: Kiểm tra điều hướng dự án
Các trang dự án (`index.html`, `about.html`, `contact.html`) đều nằm ở gốc dự án,
nên mỗi liên kết nav là một tên file thuần. Mở mọi trang và bấm mọi liên kết —
sửa bất kỳ liên kết nào bị 404 trước khi Bài tập 9 thêm hai trang nữa.

**Đường dẫn file:**
- `homework/session-08/midterm-review.md` (file mới)
- `homework/session-08/table-practice.html` (trang luyện tập mới có bảng)
- `homework/session-08/table-practice.css` (style bảng)

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **chọn MỘT điều bạn làm sai
trong đề luyện giữa kỳ (hoặc trong bảng của Task 2), mở file đó, và giải thích
cách làm đúng là gì và vì sao**.

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
   `- Session 08 — <your Google Drive link>`
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
- Thêm thay đổi: `git add homework/session-08/ project/`
- Commit: `git commit -m "HW8: Midterm review and table practice"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Suy ngẫm giữa kỳ | 3 | Ba lỗi được chỉ ra với đáp án đúng và giải thích |
| Cấu trúc bảng | 3 | Dùng caption, thead, tbody, th, td đúng cách |
| Style bảng | 2 | Đã áp dụng border, màu tiêu đề, zebra striping |
| Liên kết dự án đã kiểm | 2 | Mọi liên kết nav trên mọi trang dự án bấm qua đúng |
| **Tổng** | **10** | |

## Tips
- Phần suy ngẫm giữa kỳ là việc học từ lỗi — không bị trừ điểm cho câu trả lời trung thực
- Bạn sẽ học bảng chi tiết ở Buổi 9; bài tập này giúp bạn đi trước một bước
- Dùng `border-collapse: collapse` để tránh viền kép
- Giữ bảng luyện tập đơn giản; Bài tập 9 mới là nơi nó trở thành trang dự án thật

## Example Output
Một file `midterm-review.md` với ba suy ngẫm trung thực, cùng một trang bảng luyện
tập sạch sẽ — và một dự án mà bạn đã tự tay bấm qua từng liên kết điều hướng.
