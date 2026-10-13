// Public registry only: never import the instructor rubric into a public renderer.
export const SECTIONS = ['overview', 'requirements', 'pages', 'milestones', 'demo', 'checklist', 'submission', 'faq'];
export const PAGES = ['index', 'about', 'activities', 'media', 'contact'];
export const MILESTONES = [4, 5, 7, 9, 11, 14, 16, 16].map((week, i) => ({ id: `m${i + 1}`, week }));
export const CHECKLIST = [
  ['structure', 'Five root-level HTML pages, README and local asset folders', 'Đủ năm trang HTML ở thư mục gốc, README và thư mục tài nguyên cục bộ'],
  ['html', 'Unique titles, one h1, language, charset and viewport on every page', 'Mỗi trang có title riêng, một h1, lang, charset và viewport'],
  ['navigation', 'All five pages share working navigation and a current-page indicator', 'Cả năm trang dùng navigation nhất quán, link đúng và đánh dấu trang hiện tại'],
  ['home', 'Home has a logo, welcome, introduction and Join Us link', 'Home có logo, lời chào, giới thiệu và link Join Us'],
  ['about', 'About explains mission, history, team, activities and how to join', 'About trình bày sứ mệnh, lịch sử, nhóm, hoạt động và cách tham gia'],
  ['table', 'Activities has a captioned schedule with at least five rows and merged cells', 'Activities có bảng lịch với caption, ít nhất năm hàng và ô gộp'],
  ['media', 'Local video and audio play offline; fallback links and descriptions work', 'Video và audio cục bộ phát offline; link dự phòng và mô tả hoạt động'],
  ['contact', 'Contact has all specified fields, labels, fieldset and legend', 'Contact có đủ trường theo đề, label, fieldset và legend'],
  ['css', 'One external stylesheet, readable contrast and visible keyboard focus', 'Một stylesheet ngoài, tương phản dễ đọc và focus bàn phím rõ ràng'],
  ['responsive', 'Test narrow phone, tablet and desktop; no page-wide horizontal overflow', 'Kiểm tra điện thoại hẹp, tablet và desktop; không tràn ngang toàn trang'],
  ['assets', 'No missing assets, CDN dependencies or unlicensed content', 'Không thiếu tài nguyên, phụ thuộc CDN hoặc nội dung không có quyền sử dụng'],
  ['validation', 'Validate HTML/CSS, test every link and include explanatory comments', 'Validate HTML/CSS, thử mọi link và thêm comment giải thích'],
  ['package', 'Extract the correctly named ZIP and test it with the network off', 'Giải nén ZIP đúng tên và kiểm tra khi tắt mạng'],
];
export const PROJECT_UI = {
  en: { title: 'Project Hub', lead: 'Build your own five-page student club website, one milestone at a time.', sections: ['Overview', 'Requirements', 'Five pages', 'Milestones', 'Reference demo', 'Checklist', 'Submission', 'FAQ'], reset: 'Reset checklist', confirm: 'Reset all project checklist progress on this device?', progress: 'items complete', storage: 'Storage unavailable: progress lasts only for this visit.', print: 'Print full guide', checklist: 'Personal checklist — not a grade or submission record.', viewer: 'Demo Viewer', fit: 'Fit', validate: 'Check fields — no submission', clear: 'Clear fields', safe: 'Learning preview: scripts, form submission and top navigation are blocked. Nothing is sent or stored. The sandbox is not copy protection.', valid: 'Fields are valid. Simulation only: nothing was submitted.', invalid: 'Please complete the highlighted fields.', nav: 'Preview page', viewport: 'Preview viewport', status: 'Preview ready' },
  vi: { title: 'Project Hub', lead: 'Tự xây dựng website câu lạc bộ gồm năm trang, theo từng milestone.', sections: ['Tổng quan', 'Yêu cầu', 'Năm trang', 'Milestone', 'Demo tham khảo', 'Checklist', 'Nộp bài', 'Câu hỏi thường gặp'], reset: 'Đặt lại checklist', confirm: 'Xóa toàn bộ tiến độ checklist Project trên thiết bị này?', progress: 'mục hoàn thành', storage: 'Không dùng được bộ nhớ: tiến độ chỉ được giữ trong lượt truy cập này.', print: 'In toàn bộ hướng dẫn', checklist: 'Checklist cá nhân — không phải điểm hay bản ghi nộp bài.', viewer: 'Demo Viewer', fit: 'Vừa khung', validate: 'Kiểm tra trường — không gửi', clear: 'Xóa các trường', safe: 'Bản xem để học: script, gửi form và điều hướng trang cha đều bị chặn. Không gửi hay lưu dữ liệu. Sandbox không phải cơ chế chống sao chép.', valid: 'Các trường hợp lệ. Chỉ mô phỏng: chưa gửi thông tin nào.', invalid: 'Hãy điền đủ các trường được đánh dấu.', nav: 'Trang xem trước', viewport: 'Kích thước xem trước', status: 'Sẵn sàng xem trước' },
};