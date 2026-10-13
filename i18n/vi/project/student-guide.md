## overview | Tổng quan

Xây dựng **website câu lạc bộ sinh viên gồm năm trang** cho sinh viên mới, sinh viên có kinh nghiệm và cựu sinh viên. Giúp người đọc hiểu câu lạc bộ, tìm hoạt động và biết cách tham gia. Tự chọn tên, viết nội dung và tạo thiết kế của mình; CodeBreakers là ví dụ giảng dạy hư cấu, không phải bài để nộp nguyên bản.

Hub hướng dẫn này dùng điều hướng từng mục. **Bài làm của bạn không phải SPA:** nộp năm file HTML riêng, liên kết bằng đường dẫn tương đối, dùng HTML và CSS. Không cần framework, backend, dịch vụ upload hay chấm bài trực tuyến tại đây.

Làm lần lượt M1–M8, giữ nguyên các tuần **4, 5, 7, 9, 11, 14, 16, 16**. Checklist chỉ lưu tiến độ cá nhân trên thiết bị, dùng chung giữa EN/VI, không báo cáo cho giảng viên.

## requirements | Yêu cầu

### requirements-files | Cấu trúc file và mã nguồn

Đặt `index.html`, `about.html`, `activities.html`, `media.html`, `contact.html` cùng cấp trong `club-website/`. Thêm `README.md`, `css/style.css`, `images/`, `media/`. Tên viết thường, không dấu cách. Dùng link `about.html`, `images/logo.svg`, không dùng đường dẫn riêng của máy.

- Mỗi trang có doctype HTML5, `lang="en"`, UTF-8, viewport, title riêng, một heading chính và header/nav/main/footer có ngữ nghĩa.
- Dùng chung header, navigation đủ năm link, footer và một stylesheet ngoài; đánh dấu trang hiện tại. Dùng class tái sử dụng. Không có style inline hoặc khối style trong HTML bài nộp.
- Heading rõ ràng, đoạn văn tự viết, danh sách và alt ảnh có ý nghĩa. Comment đầu file ghi tên/mã sinh viên; mỗi trang ít nhất hai comment giải thích.
- Tương phản dễ đọc, mọi control có label, focus bàn phím rõ ràng; link và dropdown dùng được không cần chuột.
- Có ảnh thật sự tồn tại, audio/video cục bộ phát được, mô tả và link dự phòng. Dùng nội dung tự tạo hoặc có giấy phép, ghi nguồn. Không để thiếu tài nguyên hoặc phụ thuộc CDN.
- Bảng dễ đọc, control form toàn chiều rộng trên mobile, navigation xếp dọc tại breakpoint bắt buộc `max-width: 768px`. Thử 320/375, 768 và desktop.

### requirements-test | Cách kiểm chứng

Mở trực tiếp từng trang, bấm mọi link, tắt mạng rồi thử lại. Validate HTML/CSS, kiểm tra chữ hoa/thường trong tên file, dùng phím Tab và thay đổi chiều rộng trình duyệt. Đẹp ở một kích thước chưa đủ.

## pages | Đề bài chi tiết cho năm trang

### pages-home | Home — index.html

**Mục đích:** giúp sinh viên mới hiểu ngay câu lạc bộ. Có tên câu lạc bộ trong h1, logo là ảnh, navigation đủ năm trang, hero/lời chào/tagline, một hoặc hai đoạn giới thiệu, link nổi bật **Join Us → contact.html**, footer ghi copyright/email. Có thể dùng minh họa cộng đồng nếu ghi rõ đó là minh họa.

**Kiểm tra:** người đọc biết câu lạc bộ làm gì, đến Contact bằng một lần bấm. Logo tải offline, link Home hiện tại được phân biệt.

### pages-about | About — about.html

**Mục đích:** giải thích lý do thành lập và đối tượng tham gia. Có sứ mệnh, lịch sử, nhóm ít nhất ba tên/vai trò, hoạt động, danh sách ul/ol và ảnh có alt mô tả. Dùng h2 cho mục, h3 cho mục con. Có anchor `mission`, `activities`, `gallery` nếu dropdown trỏ đến đó. Không gán thông tin bịa đặt cho người thật; đánh dấu nội dung mẫu hư cấu.

**Kiểm tra:** đọc được các bước tham gia, hiểu vai trò nhóm ngay cả khi không nhìn ảnh, mọi anchor đều tồn tại.

### pages-activities | Activities — activities.html

**Mục đích:** giúp sinh viên lên lịch tham dự. Bảng có caption, thead/tbody, ít nhất bốn cột (ngày, giờ, hoạt động, địa điểm), năm hàng dữ liệu. Có colspan hoặc rowspan với ý nghĩa nhóm nội dung. Thêm mô tả hoạt động chính. CSS có border, padding, header rõ, hàng xen kẽ và trạng thái hover/focus-within.

**Kiểm tra:** xác định được thời gian/địa điểm. Trên điện thoại chỉ vùng bảng có nhãn cuộn ngang, không làm cả trang tràn ngang.

### pages-media | Media — media.html

**Mục đích:** cho người đọc xem/nghe học liệu câu lạc bộ. Có video cục bộ với controls, poster, source/type và text/link dự phòng; audio cục bộ có controls, source/type và text/link dự phòng; gallery nhỏ. Không autoplay. Có phụ đề hoặc transcript tương đương cho lời nói. Mô tả đúng nội dung: tutorial tự tạo là media tham khảo, không giả làm bản ghi sự kiện.

**Kiểm tra:** play/pause/tua hoạt động khi offline, dễ tìm phụ đề/transcript và thông tin nguồn/giấy phép.

### pages-contact | Contact — contact.html

**Mục đích:** minh họa form liên hệ/tham gia dễ tiếp cận. Có **Full name, Email, radio Student/Alumni cùng name, Department ít nhất bốn lựa chọn thật, Message và checkbox đồng ý bắt buộc**. Dùng input type phù hợp, label-for/id khớp, required, fieldset/legend và control submit trong cấu trúc form của bài làm. Thêm thông tin liên hệ và địa điểm gặp mặt.

**An toàn ở ví dụ:** Viewer không gửi form. Nút “Kiểm tra trường” ở trang cha mô phỏng native validation; có nút xóa dữ liệu. Không lưu Contact. Bản tham khảo mở độc lập cố ý dùng nút kiểm tra thay vì endpoint gửi thật; điều này không bỏ yêu cầu form-markup trong bài nộp.

**Kiểm tra:** phát hiện trường trống/email sai; dùng bàn phím chọn radio và đồng ý. Không nhập dữ liệu cá nhân thật vào demo.

## milestones | Milestone và tiêu chí hoàn thành

### milestones-m1 | M1 — Tuần 4: cấu trúc và Home

Sau Buổi 1–3, tạo index.html và thư mục css/images. Home có cấu trúc hợp lệ, title/h1 tên câu lạc bộ, ít nhất hai đoạn văn, ảnh cục bộ có alt. **Thử:** mở thư mục đã giải nén, kiểm tra ảnh và title trên tab.

### milestones-m2 | M2 — Tuần 5: CSS cơ bản

Tạo và link css/style.css. Đặt font/background body, màu chữ/heading, ít nhất ba selector, comment CSS có tổ chức. **Thử:** đổi một rule và quan sát Home thay đổi.

### milestones-m3 | M3 — Tuần 7: nhiều trang

Hoàn thành Home, About và Activities cơ bản với bố cục semantic/navigation nhất quán, link tương đối, đánh dấu trang hiện tại. **Thử:** từ mỗi trang đi đến hai trang còn lại không thiếu file.

### milestones-m4 | M4 — Tuần 9: CSS và bố cục nâng cao

Hoàn thiện bố cục chung, typography, khoảng cách, màu và trạng thái link bằng kiến thức đã học. **Thử:** header/footer nhất quán, chiều rộng đọc thoải mái, không cắt mất nội dung.

### milestones-m5 | M5 — Tuần 11: bảng và media

Hoàn thành lịch Activities và Media. Bảng có caption/header, năm hàng và ô gộp; video/audio cục bộ có controls/dự phòng. Cập nhật navigation mọi trang hiện có. **Thử:** đọc bảng và phát media khi tắt mạng.

### milestones-m6 | M6 — Tuần 14: Contact form

Đủ control/label theo đề, radio cùng name, bốn department, consent, fieldset/legend và cấu trúc form. Thêm Contact vào mọi navigation. **Thử:** bàn phím và required/email validation; không cần dữ liệu cá nhân thật.

### milestones-m7 | M7 — Tuần 16: responsive

Viewport trên cả năm trang, media query gồm max-width: 768px. Navigation xếp dọc, padding phù hợp, ảnh co giãn, bảng đọc được và control form toàn chiều rộng. **Thử:** điện thoại hẹp, tablet, desktop và thao tác bàn phím.

### milestones-m8 | M8 — Tuần 16: hoàn thiện

Đủ nội dung, sửa mọi link/tài nguyên lỗi, validate HTML/CSS, comment tác giả/giải thích, README, đóng gói toàn thư mục. **Thử:** giải nén mới và mở offline, không sửa đường dẫn bằng tay.

M1–M6 đến hạn vào đầu buổi lab của tuần tương ứng. Chính sách hiện hành cho một ngày gia hạn với −20%, sau đó mất điểm milestone (phần việc vẫn được tính trong bài cuối). M7 + M8 nằm trong bài nộp cuối. Hướng dẫn này không thay đổi chính sách chấm điểm.

## demo | Khám phá ví dụ

Dùng nút năm trang và chọn viewport 375 / 768 / 1200 / Vừa khung. Thay đổi **viewport iframe thật**, không phóng thu ảnh. Trên màn hình hẹp có thể cuộn ngang vùng preview desktop. CSS ví dụ tách biệt với trang học liệu.

Trang cha xử lý navigation qua registry cho phép. Script, gửi form và điều hướng trang cha từ preview bị tắt. Vẫn chọn được văn bản: đây là công cụ học, **không chống sao chép**. Tắt JavaScript vẫn đọc được preview ban đầu; chuyển trang và mô phỏng validation cần JavaScript.

## checklist | Checklist cá nhân

Chỉ đánh dấu sau khi thử. Tiến độ có phiên bản, dùng chung EN/VI trên trình duyệt này. Reset cần xác nhận. Bộ nhớ bị chặn vẫn dùng checklist trong lượt truy cập. Chỉ lưu ID mục, không lưu Contact, điểm hay dữ liệu nộp bài.

## submission | Đóng gói và nộp bài

1. Hoàn thành năm HTML, README, CSS và mọi ảnh/media cục bộ. Xóa file tạm; tải font có giấy phép về máy hoặc dùng system font, không phụ thuộc bên ngoài.
2. Comment đầu mỗi HTML ghi tên/mã sinh viên. Ít nhất hai comment giải thích/trang và indentation nhất quán.
3. ZIP toàn thư mục `club-website/` thành **INS2053_[YourName]_[StudentID].zip**.
4. Giải nén ZIP ở vị trí khác, mở index.html. Thử mọi trang, ảnh, media và link khi tắt mạng.
5. Nộp qua kênh giảng viên thông báo, **Tuần 16, Chủ nhật 23:59**. Phạt muộn bài cuối hiện hành: **−10% mỗi ngày**. Hub không nhận file/tin nhắn và không xác nhận nộp bài.

Không nhầm hướng dẫn milestone với quy trình repository/video của bài tập tuần. Theo thông báo kênh nộp của giảng viên; checklist không tạo cơ chế upload mới.

## faq | Câu hỏi thường gặp

### faq-spa | Website câu lạc bộ có phải SPA không?

Không. Chỉ Hub hướng dẫn dùng section routing. Bài làm vẫn gồm năm trang HTML/CSS riêng và mở được từ file đã giải nén.

### faq-copy | Có thể nộp nguyên CodeBreakers không?

Không. Học cấu trúc rồi tự tạo tên, nội dung, bố cục và tài nguyên. Cần giải thích được mã nguồn. Sandbox dùng để cách ly/chặn request, không che mã nguồn.

### faq-offline | Có được dùng Google Fonts hoặc video online không?

Bài tập 7 dạy web font, nhưng bài cuối phải chạy offline. Tải tài nguyên có giấy phép vào thư mục hoặc dùng system font. Không phụ thuộc CDN, ảnh online hay streaming embed.

### faq-form | Demo có gửi tin nhắn không?

Không. Viewer chặn form/script và chỉ mô phỏng validation ở trang cha. Không gửi/lưu gì. Bản tham khảo độc lập cũng không có hành động gửi. Dùng giá trị thử hư cấu.

### faq-progress | Tiến độ checklist có phải điểm không?

Không. Chỉ ở trình duyệt này, có thể mất khi xóa site data hoặc đổi thiết bị. Không đồng bộ, upload hoặc hiển thị cho giảng viên.

### faq-late | Bắt đầu muộn hoặc thấy hướng dẫn mâu thuẫn thì sao?

Bù theo thứ tự milestone. Hướng dẫn giữ nguyên tuần/hạn đã công bố, không thay thông báo giảng viên. Hỏi giảng viên khi có mâu thuẫn thật, không tự đặt hạn mới.