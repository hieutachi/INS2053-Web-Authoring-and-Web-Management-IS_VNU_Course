# Bài tập 13: Xây biểu mẫu liên hệ

## Due Date
Chủ nhật, 23:59 (Tuần 14)

## Mục tiêu
- Học cách tạo biểu mẫu HTML
- Luyện dùng các loại input khác nhau
- Xây một biểu mẫu liên hệ hoạt động được cho website CLB

## Requirements

### Task 1: Tạo biểu mẫu liên hệ
Cập nhật trang `project/contact.html` để có một biểu mẫu liên hệ hoạt động đầy đủ.

> Đây là trang mà mốc **M6 (Tuần 14)** chấm — biểu mẫu xây ở đây chính là những gì
> checklist của mốc đó yêu cầu, nên làm tốt bài tập này là hoàn thành M6.

**Biểu mẫu của bạn phải có ít nhất 5 loại input khác nhau:**

1. **Text input** — Trường họ tên:
```html
<label for="fullname">Full Name:</label>
<input type="text" id="fullname" name="fullname" required>
```

2. **Email input** — Trường địa chỉ email:
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
```

3. **Tel input** — Trường số điện thoại:
```html
<label for="phone">Phone Number:</label>
<input type="tel" id="phone" name="phone">
```

4. **Select dropdown** — Chọn chủ đề:
```html
<label for="subject">Subject:</label>
<select id="subject" name="subject">
  <option value="">-- Select a topic --</option>
  <option value="membership">Membership Inquiry</option>
  <option value="event">Event Information</option>
  <option value="feedback">Feedback</option>
  <option value="other">Other</option>
</select>
```

5. **Textarea** — Trường lời nhắn:
```html
<label for="message">Message:</label>
<textarea id="message" name="message" rows="5" required></textarea>
```

6. **Phần tử bổ sung (chọn thêm ít nhất 1):**
   - `<input type="date">` cho ngày gặp mong muốn
   - `<input type="radio">` cho giới tính hoặc loại thành viên
   - `<input type="checkbox">` cho đăng ký bản tin
   - `<input type="file">` cho đính kèm file

**Biểu mẫu của bạn cũng phải có:**
- Một phần tử `<form>` với thuộc tính `action` và `method`
- Một nút gửi: `<button type="submit">Send Message</button>`
- Một nút xóa: `<button type="reset">Clear Form</button>`
- Các nhãn (label) nối với input qua thuộc tính `for` và `id`
- Thuộc tính `required` trên các trường bắt buộc

### Task 2: Style biểu mẫu
Thêm CSS để biểu mẫu đẹp và dễ dùng.

**CSS của bạn phải có:**
- Style label: display block, margin-bottom, font-weight
- Style input: width, padding, border, border-radius
- Style nút gửi: màu nền, màu chữ, padding, cursor
- Style hiệu ứng hover của nút
- Thêm khoảng cách giữa các nhóm biểu mẫu
- Cho biểu mẫu trông căn giữa và gọn gàng

**Ví dụ CSS:**
```css
form label {
  display: block;
  margin-bottom: 5px;
}
```

**Đường dẫn file:**
- `project/contact.html` (thêm biểu mẫu)
- `project/css/style.css` (thêm style biểu mẫu)

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
hết mọi thứ. Với buổi này, lựa chọn tốt và dễ nhất là **mở biểu mẫu liên hệ và đi
qua ba loại input khác nhau bạn đã dùng, giải thích mỗi loại thu thập gì và nhãn
nào thuộc về input nào**.

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
   `- Session 13 — <your Google Drive link>`
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
- Thêm thay đổi: `git add project/contact.html project/css/style.css`
- Commit: `git commit -m "HW13: Add contact form with multiple input types"`
- Push: `git push`

## Grading Rubric
| Tiêu chí | Điểm | Mô tả |
|---|---|---|
| Loại input | 3 | Dùng ít nhất 5 loại input khác nhau |
| Cấu trúc biểu mẫu | 2 | Kết nối form, label, input đúng cách |
| Trường bắt buộc | 1 | Dùng thuộc tính `required` hợp lý |
| Nút bấm | 1 | Có cả nút submit và reset |
| Style biểu mẫu | 3 | Label, input, nút đều được style đẹp |
| **Tổng** | **10** | |

## Tips
- Mỗi input nên có một label tương ứng — điều này giúp khả năng tiếp cận
- Dùng `type="email"` thay cho `type="text"` cho trường email — trình duyệt tự kiểm tra hợp lệ
- Kiểm tra biểu mẫu bằng cách điền thử để chắc chắn mọi thứ hoạt động

## Example Output
Trang Contact của bạn sẽ có một biểu mẫu trông chuyên nghiệp, nơi khách truy cập
gõ tên, email, chọn chủ đề, viết lời nhắn và bấm Send. Mọi trường được style gọn
gàng và dễ dùng.

