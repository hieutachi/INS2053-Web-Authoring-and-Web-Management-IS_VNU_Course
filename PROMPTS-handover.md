# Prompt bàn giao cho Agent tiếp nhận

Copy nguyên khối bên dưới cho agent mới. Xem thêm `HANDOVER-canvas-diagrams.md`
để biết chi tiết công việc.

---

## Prompt A — nâng cấp diagram + viết nhận xét (dùng chung 1 agent)

```
Bạn tiếp nhận công việc dở dang trong package học liệu INS2053 (Web Authoring
and Web Management, VNU-IS — dạy sinh viên QUỐC TẾ).

Thư mục gốc: C:\Users\N4G\OneDrive\11. VNU - IS School\INS2053 - WEB

BƯỚC 1, TRƯỚC KHI SỬA BẤT CỨ THỨ GÌ:
- Đọc hết HANDOVER-canvas-diagrams.md ở thư mục gốc (260 dòng). Trong đó có:
  lý do công việc tồn tại, 4 lỗi của diagram gốc, bộ house rules mọi diagram
  mới phải tuân theo, bảng 28 diagram đã xong ở buổi 1–9, quy trình sửa an
  toàn, và 5 cái bẫy đã từng mất thời gian.
- Đọc canvases/buoi-09.canvas.tsx để thấy chuẩn đầu ra thực tế.

NHIỆM VỤ 1 — nâng cấp diagram các deck còn lại, theo thứ tự ưu tiên:
  buoi-12 (chữ 7px, tệ nhất) → buoi-11, buoi-13 (9px) → buoi-14, buoi-10,
  buoi-15 → ins2053-bai-giang (deck tổng hợp: PORT hàm đã hoàn thiện từ deck
  buổi lẻ sang, đừng viết lại lần thứ năm; NHỚ đổi id trong <defs> cho khỏi
  trùng).
Mỗi deck 3 diagram, thay diagram cũ, wire vào slide. Mục 5a HANDOVER ghi rõ
mỗi deck cần diagram dạy cái gì.

NHIỆM VỤ 2 — viết bài NHẬN XÉT ebook + slide bằng TIẾNG VIỆT. Đây là yêu cầu
ĐẦU TIÊN của giảng viên và vẫn chưa trả. Bằng chứng audit đã gom sẵn ở mục 1
và 5b HANDOVER, đừng audit lại. Phải đọc thật ít nhất 5 chương ebook + 5 slide
deck + examples/student-club, trích dẫn cụ thể, phủ 4 nhóm: mật độ chữ; ebook
thiếu hình và chỗ nào nên đặt hình gì; 7 asset hỏng trong example; slide lạm
dụng bảng/bullet ở chỗ đáng lẽ dùng hình. Cân nhắc riêng rào cản ngôn ngữ và
thuật ngữ cho sinh viên quốc tế.

RÀNG BUỘC BẮT BUỘC:
- KHÔNG có compiler: không package.json, không tsconfig.json, qoder/canvas
  không resolve được → KHÔNG type-check được. Kiểm chứng bằng cấu trúc thôi.
  Đừng nói "đã verify" chung chung — nói rõ cái gì kiểm được, cái gì không.
- Mọi nhãn trong SVG phải TIẾNG ANH.
- Tuân thủ chính xác house rules mục 3 HANDOVER: viewBox 560, sàn chữ 11px
  (nhãn thân 12.5–13px), ON_FILL="#0B1220" cho chữ trên nền t.chart.*, ngữ
  pháp 4 màu (blue=cấu trúc / goldenYellow=hành động / green=kết quả đúng /
  brightOrange=sai hoặc deprecated), role="img" + aria-label là CÂU đầy đủ,
  id trong <defs> đặt theo deck.
- Diagram phải dạy cái sinh viên hay làm SAI (đối chiếu đúng-vs-sai, phép tính
  thật), không minh hoạ lại tiêu đề slide.
- Dùng đúng quy trình mục 6 HANDOVER: backup → viết module bằng heredoc CÓ
  trích dẫn <<'EOF' theo chunk nhỏ → check cân bằng ngoặc TRƯỚC khi splice →
  splice → wire từng slide MỘT bằng _tools/replace-once.js → QA.
- Cổng verify sau MỖI deck: cd canvases && bash ../_tools/qa-canvases.sh phải
  ra QA PASS (exit 0). Chưa PASS thì không sang deck sau.

ĐỪNG:
- Đừng sửa buoi-01..09 — đã xong, đã QA PASS.
- Đừng dọn cảnh báo UNUSED-IMPORT có từ trước ở deck 10–15 khi chưa viết lại
  diagram deck đó (mục 5c HANDOVER).
- Đừng gộp nhiều slide edit vào một lần ghi — replace-once.js từ chối khi khớp
  nhập nhằng chính là lưới an toàn.

CÁCH LÀM VIỆC (yêu cầu trực tiếp của giảng viên):
Băm task nhỏ ra rồi làm liên tục — mỗi tool call một diagram hoặc một slide.
Đừng suy nghĩ lâu rồi mãi không rặn được task nào. Trả lời bằng tiếng Việt.
Xong deck nào báo ngắn deck đó rồi đi tiếp, không cần hỏi lại.
```

---

## Prompt B — chỉ viết bài nhận xét (nếu tách agent riêng chạy song song)

```
Thư mục: C:\Users\N4G\OneDrive\11. VNU - IS School\INS2053 - WEB

Giảng viên dạy INS2053 (Web Authoring and Web Management, VNU-IS, sinh viên
QUỐC TẾ) cần một bài NHẬN XÉT chuyên sâu về bộ học liệu: ebook 16 chương trong
ebook/, 15 slide deck Marp trong slides/, và example trong
examples/student-club/. Đây là yêu cầu đầu tiên của giảng viên, vẫn chưa trả.

Đọc trước HANDOVER-canvas-diagrams.md mục 1 và 5b — bằng chứng audit đã gom
sẵn, đừng audit lại từ đầu:
- Toàn package KHÔNG có file ảnh nào (png/jpg/svg/gif/webp/pdf = 0)
- 16 chương ebook không có một cái ![...] nào; cả ebook chỉ 3 lần nhắc chữ
  "Figure"/"diagram"
- examples/student-club/images/ và media/ RỖNG nhưng HTML tham chiếu 7 asset
  không tồn tại → sinh viên làm theo gặp ảnh hỏng ngay
- Trước đợt nâng cấp: khoảng 1 diagram / 11 slide

Việc của bạn:
1. Đọc thật: ít nhất 5 chương ebook trải đều đầu/giữa/cuối khoá, 5 slide deck
   tương ứng, và example student-club. Trích dẫn cụ thể (file:dòng hoặc tên
   chương) — đừng nhận xét chung chung.
2. Viết bài nhận xét BẰNG TIẾNG VIỆT, có cả điểm mạnh và điểm cần sửa, mỗi
   nhận xét kèm bằng chứng và một đề xuất làm được ngay. Bắt buộc phủ 4 nhóm:
   (a) mật độ chữ / khả năng đọc, (b) ebook thiếu hình và CHỖ NÀO trong từng
   chương nên đặt hình gì, (c) 7 asset hỏng trong example, (d) slide lạm dụng
   bảng và bullet ở chỗ đáng lẽ dùng hình.
3. Cân nhắc riêng yếu tố sinh viên QUỐC TẾ: rào cản ngôn ngữ, thuật ngữ chưa
   giải thích, giả định về văn hoá/bối cảnh địa phương.
4. Kết bằng danh sách việc nên làm, xếp theo tác động/công sức.

Đừng sửa file nào. Đây là việc phân tích. Muốn tạo file markdown cho bài nhận
xét thì hỏi trước.
```
