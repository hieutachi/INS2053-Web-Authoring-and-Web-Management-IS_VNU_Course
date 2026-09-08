# 🧭 APPENDIX A
# **Chọn công nghệ web — cẩm nang ra quyết định cho người mới bắt đầu**

> Phụ lục này hỗ trợ **CLO3: CHOOSE (lựa chọn) công nghệ phù hợp cho phát triển ứng dụng web.**
> Khóa học dạy bạn BUILD (xây dựng) bằng HTML + CSS (+ Dreamweaver/VS Code). Nhưng một người làm
> nghề chuyên nghiệp cũng phải biết còn gì KHÁC tồn tại và CHỌN thế nào. Phụ lục này cho bạn nhận
> biết đó và một cách ra quyết định đơn giản, lặp lại được. Đây là tài liệu đọc thêm — bạn KHÔNG
> bị buộc phải học các công cụ khác.

---

# 📌 THÔNG TIN PHỤ LỤC

```
📅 Khi nào đọc:      Bất kỳ lúc nào sau Buổi 11 — tốt nhất là trước khi chọn công nghệ
                     cho đồ án cuối kỳ. Không gắn với buổi học nào; khoảng 45 phút đọc.
📚 Tài liệu gốc:     MDN "Web technology for developers" (chỉ các trang tổng quan)
🎯 Mục tiêu:         1. Giải thích vì sao chọn công nghệ là kỹ năng riêng, khác với viết code
                     2. Áp dụng khung 5 tiêu chí để so sánh hai công nghệ
                     3. Gọi tên các tầng chính của toàn cảnh công nghệ web
                     4. Viết ra lý do cho một lựa chọn công nghệ
📖 Chuẩn bị:         1. Có đề bài đồ án cuối kỳ của bạn ngay trước mặt
                     2. Sẵn sàng nêu tên hai công nghệ ứng viên để so sánh
🖼 Sơ đồ:            không có sơ đồ riêng; bộ slide toàn khóa: canvases/ins2053-overview.canvas.tsx
                     (tour đề cương) và canvases/ins2053-bai-giang.canvas.tsx (9 sơ đồ)
🔗 Kết quả học tập:  CLO3 (lựa chọn công nghệ phù hợp cho phát triển ứng dụng web)
                     CLO5 (đánh giá, tài liệu hóa và trình bày một ứng dụng web)
```

---

# 🎯 BẠN SẼ HỌC ĐƯỢC GÌ

- Vì sao "chọn một công nghệ" là một kỹ năng thật sự, tách biệt với việc viết code
- Một **khung ra quyết định gồm 5 tiêu chí** đơn giản, áp dụng được cho mọi lựa chọn
- **Bản đồ toàn cảnh công nghệ web** (còn gì ngoài HTML/CSS)
- Cách viết ra lý do cho một lựa chọn (kỹ năng nhà tuyển dụng đánh giá cao)

---

# 📖 LÝ THUYẾT

## 1. Chọn cũng là một kỹ năng

### 1.1 Định nghĩa

**Lựa chọn công nghệ** là quá trình chọn công cụ, ngôn ngữ và nền tảng cho một dự án
*sau khi so sánh các phương án với nhu cầu thật của dự án* — không phải cứ dùng cái
mình đã biết sẵn.

### 🎒 Ví dụ đời thực

Hình dung bạn cần đi từ Hà Nội tới một thị xã bên cạnh:

- **Xe máy** = rẻ, linh hoạt, ổn cho 1–2 người, nhưng mệt nếu đi xa
- **Xe buýt** = rẻ và an toàn, nhưng chậm và đi theo tuyến cố định
- **Ô tô** = thoải mái và nhanh, nhưng đắt và cần người lái

Không có "phương tiện tốt nhất". Lựa chọn tốt nhất phụ thuộc vào: **đi mấy người, xa bao
nhiêu, ngân sách, và thời gian.** Chọn công nghệ web cũng đúng như vậy.

### 1.2 Vì sao quan trọng

| Lý do | Giải thích |
|--------|-------------|
| Fit (phù hợp) | Sai công cụ khiến một việc đơn giản thành khó (ví dụ dùng framework cho site 3 trang kiểu brochure) |
| Chi phí | Có công cụ tốn tiền license hoặc cần hosting đắt |
| Khả năng bảo trì | Một công cụ không ai trong nhóm biết sẽ thành gánh nặng |
| Cơ hội nghề nghiệp | Cử nhân MIS thường được yêu cầu *khuyến nghị* công cụ, không chỉ dùng chúng |

---

## 2. Khung ra quyết định 5 tiêu chí

Khi so sánh hai (hoặc nhiều) công nghệ, cho điểm chúng theo **năm tiêu chí**:

| # | Tiêu chí | Câu hỏi cần đặt |
|---|-----------|-----------------|
| 1 | **Requirements fit** | Nó có thật sự làm được điều dự án cần không? |
| 2 | **Chi phí** | Phí license? Phí hosting? Thời gian của lập trình viên? |
| 3 | **Đường cong học** | Nhóm có học được trong khoảng thời gian cho phép không? |
| 4 | **Cộng đồng & hỗ trợ** | Có tài liệu, hướng dẫn và chỗ nhờ khi bí không? |
| 5 | **Bảo trì & tương lai** | Nó có đang được cập nhật, hay đã chết (như Flash)? |

### Cách dùng

1. Liệt kê các công nghệ ứng viên.
2. Cho điểm từng tiêu chí từ 1 (kém) đến 5 (xuất sắc).
3. Cộng điểm; tổng cao nhất là khuyến nghị của bạn.
4. **Viết một câu giải thích cho mỗi điểm** — phần giải thích mới là kỹ năng thật.

### 🔍 Bài mẫu: "Website câu lạc bộ 3 trang"

| Tiêu chí | Plain HTML/CSS | WordPress | React |
|-----------|---------------|-----------|-------|
| Requirements fit | 5 (site tĩnh nhỏ chính là đây) | 3 (quá tay) | 1 (quá xa rời nhu cầu) |
| Chi phí | 5 (miễn phí, hosting rẻ) | 3 (hosting + plugin) | 3 (bộ công cụ build) |
| Đường cong học | 5 (bạn vừa học xong) | 3 | 1 (dốc) |
| Cộng đồng | 5 | 5 | 5 |
| Bảo trì | 5 (chuẩn thì không chết) | 3 (cần cập nhật) | 3 |
| **Tổng** | **25** ✅ | 17 | 13 |

**Kết luận:** Với một site tĩnh nhỏ, plain HTML/CSS thắng. Đó chính xác là lý do khóa học dùng nó.

---

## 3. Toàn cảnh công nghệ web (để biết)

Bạn không cần học những thứ này — chỉ cần biết chúng tồn tại và mỗi thứ giải quyết vấn đề gì.

### 3.1 Chiếc bánh nhiều lớp

```
┌────────────────────────────────────────────┐
│  Content / Structure      HTML             │  ← you know this
│  Presentation             CSS              │  ← you know this
│  Behaviour                JavaScript       │  ← awareness
├────────────────────────────────────────────┤
│  CSS helpers        Bootstrap, Tailwind,   │  ← awareness
│                     Sass (preprocessor)    │
│  CMS (no-code)      WordPress, Wix,        │  ← awareness
│                     Google Sites           │
│  Static generators  Jekyll, Hugo,          │  ← awareness
│                     Eleventy               │
│  JS frameworks      React, Vue, Angular    │  ← awareness
│  Backend            PHP, Node.js, Python   │  ← out of scope
│  Hosting            GitHub Pages, Netlify, │  ← awareness
│                     Vercel, shared hosting │
└────────────────────────────────────────────┘
```

### 3.2 Bảng định hướng nhanh

| Họ | Ví dụ | Hợp với | Quá thừa cho |
|--------|----------|----------|--------------|
| CSS framework | Bootstrap, Tailwind | UI nhanh và thống nhất trên site lớn | một trang cá nhân nhỏ |
| CSS preprocessor | Sass | stylesheet lớn có biến/mixin | stylesheet chỉ 1 file |
| CMS | WordPress, Wix | chủ site không chuyên, sửa nội dung thường xuyên | site không bao giờ thay đổi |
| Static site generator | Jekyll, Hugo | blog/docs nhiều trang giống nhau | site 3 trang |
| JS framework | React, Vue, Angular | app tương tác (dashboard, SPA) | site tĩnh kiểu brochure |
| Static hosting | GitHub Pages, Netlify, Vercel | host miễn phí/rẻ cho site tĩnh | site cần database |

### ⚠️ Lưu ý quan trọng (phạm vi khóa học)

Khóa học cố ý giữ stack **bắt buộc** ở mức HTML + CSS (+ Dreamweaver/VS Code), đúng theo đề cương.
Các công cụ ở trên là để bạn **biết**, nhờ đó *chọn* sáng suốt hơn ở các dự án sau (CLO3) —
chúng KHÔNG bị kiểm tra và KHÔNG bắt buộc cho đồ án cuối kỳ.

---

# 📋 TÓM TẮT

| Ý tưởng | Điều cần nhớ |
|------|----------|
| Chọn ≠ viết code | Lựa chọn là so sánh các phương án với nhu cầu |
| 5 tiêu chí | Fit, Chi phí, Đường cong học, Cộng đồng, Bảo trì |
| Cho điểm + giải thích | Chấm 1–5 mỗi tiêu chí và viết một lý do cho mỗi điểm |
| Biết toàn cảnh | Framework, CMS, generator, hosting — mỗi thứ giải quyết một vấn đề khác nhau |
| Chọn đúng cỡ | Site tĩnh nhỏ → plain HTML/CSS thường là đáp án đúng |

---

# 🛠️ THỰC HÀNH — BÀI TẬP RA QUYẾT ĐỊNH

### TASK 1: Cho điểm một tình huống thật

**Tình huống:** Chủ một nhà hàng địa phương (không chuyên kỹ thuật) muốn một website để giới thiệu
menu, giờ mở cửa và số điện thoại. Cô ấy sẽ muốn tự đổi giá mỗi tuần và không có ngân sách dành cho
lập trình viên.

Dùng khung 5 tiêu chí, so sánh **plain HTML/CSS**, **WordPress** và **Wix**, điền vào một bảng
giống bài mẫu ở trên. Sau đó viết một khuyến nghị gồm 3 câu gửi cô chủ, bằng ngôn ngữ dễ hiểu.

✅ **Tự kiểm tra câu trả lời: **
- Bạn có chấm cao tiêu chí "chủ tự sửa được mà không cần lập trình viên" không? (Tiêu chí này ủng hộ CMS/site-builder.)
- Bạn có xét chi phí và đường cong học cho cô chủ, chứ không phải cho chính bạn không?
- Khuyến nghị của bạn có lý do, hay chỉ là đoán?

💾 **File cần lưu:  ** `notes/technology-choice-restaurant.md`

### TASK 2: Biện hộ cho chính lựa chọn của khóa học

Viết 5 câu giải thích vì sao khóa học này dùng plain HTML/CSS cho Student Club Website,
dựa trên 5 tiêu chí. (Đây cũng là một cách ôn tập tốt cho kỳ thi cuối kỳ.)

---

# 🔗 ĐỌC THÊM

- [MDN — Choosing and installing tools](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software)
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [WordPress.org](https://wordpress.org/)

---

# ⏭️ PHỤ LỤC NÀY ĐỨNG Ở ĐÂU

Hãy đọc phụ lục này sau **Buổi 11** (lập kế hoạch site) và đọc lại trước **kỳ thi cuối kỳ**,
khi bạn có thể được yêu cầu biện hộ cho một lựa chọn công nghệ hoặc cấu trúc.

