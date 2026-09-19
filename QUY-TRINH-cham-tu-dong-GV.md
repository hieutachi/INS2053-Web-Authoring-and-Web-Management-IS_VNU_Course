# QUY TRÌNH CHẤM TỰ ĐỘNG INS2053 — CHO GIẢNG VIÊN

> Tài liệu này là quy trình vận hành **đang sống** của hệ thống chấm. Mọi bước
> dưới đây đã được kiểm chứng trên repository thật (xem dòng "Đã kiểm chứng").

## 0. Hệ thống gồm gì

| Thành phần | Ở đâu | Ai dùng |
|---|---|---|
| Công cụ tự chấm (student-facing) | `/cham-bai.html` trên website (GitHub Pages + Vercel), hoặc mở `_tools/grader/cham-bai.html` offline | Sinh viên tự kiểm trước khi nộp |
| 15 bộ rubric máy | `_tools/grader/rubrics/session-NN.json` (không public) | Chỉ công cụ đọc |
| Chấm lại một bài | `node _tools/grader/regrade.mjs <file.json>` | GV kiểm một JSON |
| **Bảng điểm cả lớp** | `node _tools/grader/scoresheet.mjs <thư-mục-json> [-o bang-diem.csv]` | GV tổng hợp |

**Lưu ý quan trọng về bảo mật:** hệ thống này **không có tài khoản, không có
mật khẩu, không lưu điểm trên server**. GitHub Pages chỉ host web tĩnh — mọi
điểm nằm trong file JSON sinh viên nộp và bảng CSV trên máy GV. Không cấp
"ID/mật khẩu" cho ai; nếu một dịch vụ yêu cầu đăng nhập để "xem điểm", đó
không phải hệ thống này.

## 1. Sinh viên làm gì (bạn chỉ cần thông báo)

1. Vào `/cham-bai.html`, chọn đúng **Buổi**, dán link GitHub (hoặc chọn thư mục
   bài ở máy), điền **Họ tên / MSSV / Lớp**, bấm **Chấm bài**.
2. Sửa bài và chấm lại tới khi hết lỗi máy móc.
3. Bấm **Tải JSON**, đổi tên file thành `MSSV-HW<buổi>.json`
   (vd `2151012345-HW03.json`), gửi bạn qua kênh lớp (email/Drive/LMS).
4. Riêng phần video OBS 4 điểm: nộp link Drive trong `homework/submissions.md`.

## 2. Bạn làm gì khi nhận bài

### Một bài lẻ — kiểm tra nhanh tính xác thực

```
node _tools/grader/regrade.mjs "đường-dẫn/2151012345-HW03.json"
```

Kết quả có 3 dạng:
- `REGRADE KHỚP` — JSON không bị sửa, điểm máy xác nhận. Tin điểm máy.
- `REGRADE KHÁC — SHA-256 không khớp` — file bị sửa sau khi chấm. Yêu cầu nộp lại.
- `REGRADE KHÁC — điểm máy lệch` — rubric đã đổi sau khi SV chấm; xem chi tiết từng dòng.

### Cả lớp — bảng điểm tổng hợp

1. Gom toàn bộ JSON của lớp vào **một thư mục** (vd `nop-hw03/`).
2. Chạy:

```
node _tools/grader/scoresheet.mjs "nop-hw03" -o bang-diem-hw03.csv
```

3. Đọc kết quả:
   - Cột `HW3 máy/m` = điểm máy (AUTO+ASSIST) đã chốt + số điểm MANUAL còn lại.
   - Cột `GHI CHÚ` nêu file đáng ngờ: `SỬA-SAU-KHI-CHẤM`, `KHÔNG-CÓ-SHA`,
     `CHẤM-LẠI-LỆCH x/y`.
   - File CSV mở trực tiếp bằng Excel (UTF-8 BOM, có sẵn cột SHA để đối chiếu).

## 3. Deadline từng bài

Hệ thống hiện **không có ô set deadline** (thiết kế có chủ đích: không server,
không tài khoản). Hai cách đang dùng được:

- **Kênh lớp (khuyến nghị):** thông báo deadline từng buổi trên LMS/Classroom/
  group lớp; khi tổng hợp điểm, đối chiếu `gradedAt` (giờ ISO in trong JSON) với
  hạn đó — scoresheet in sẵn `gradedAt` của từng file.
- Muốn khóa cứng "nộp trễ = 0" bằng máy: dùng deadline trên LMS làm chuẩn,
  JSON chỉ là minh chứng đã tự kiểm. Không tự chế ô deadline trên web tĩnh —
  nó không thể thực thi vì không có server ghi nhận thời điểm nộp.

## 4. Điểm nào máy chốt, điểm nào bạn chốt

| Tier | Máy | Bạn |
|---|---|---|
| AUTO | Chốt toàn bộ | Chỉ tra lại khi có flag |
| ASSIST | Chấm phần đo được | Đọc ghi chú từng dòng, xác nhận |
| MANUAL | Không kết luận | Chấm trực tiếp (đẹp/professional/reflection/video 4đ) |

Điểm cuối mỗi buổi = máy + MANUAL bạn chấm + video 4đ (xem link Drive).
Cột "Tổng rubric 10đ" trong JSON **không** gồm video 4đ.

## 5. Đã kiểm chứng (ngày 19/09/2026)

- `regrade.mjs` trên 2 JSON thật từ audit 2026-09-07: `REGRADE KHỚP`, 10/10 cả hai.
- `scoresheet.mjs` trên cùng dữ liệu: bảng ra đúng 1 SV/demo, 10/10, ghi CSV được.
- `npm run qa:grader` — GRADER QA PASS 15/15 buổi, 42 loại check.
- `npm run build:site && npm run qa:site` — SITE QA PASS (cham-bai.html vẫn
  byte-identical, không lộ rubric, không upload dữ liệu).

## 6. Deploy đang chạy ở đâu

- **GitHub Pages:** push `main` → workflow `.github/workflows/deploy-pages.yml`
  build + QA rồi publish; URL xem trong Settings → Pages của repo
  `hieutachi/INS2053-Web-Authoring-and-Web-Management-IS_VNU_Course`.
- **Vercel:** cùng repo, cấu hình trong `vercel.json`
  (`https://ins2053-web-course.vercel.app/cham-bai.html`).
- Hai kênh đều tự cập nhật sau mỗi push — không cần thao tác thêm.

## 7. Những việc KHÔNG làm với hệ thống này

- Không thêm form upload/server ghi điểm vào `site/` — `qa-site` nhóm 11 chặn
  cứng, và đúng vậy: bài SV là dữ liệu, không được gửi đi đâu.
- Không sửa JSON sinh viên nộp — SHA sẽ lệch, regrade phát hiện được.
- Không đổi tier MANUAL/ASSIST thành AUTO cho "đỡ phải chấm tay" — cổng G9 chặn.
- Không đưa rubric thi/midterm/final vào grader — G11 chặn (tài liệu không public).
