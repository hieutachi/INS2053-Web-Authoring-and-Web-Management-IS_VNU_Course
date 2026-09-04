# Prompt sinh gói học liệu mới từ một ebook có sẵn

Mục đích: dùng một ebook thô (ví dụ `hieutachi/VNU_IS_Ebook_INS3064`) làm **nguồn nội
dung**, và dùng gói INS2053 này làm **chuẩn chất lượng**, để sinh ra một gói học liệu
đầy đủ cho môn khác.

Tài liệu này KHÔNG phải một prompt. Nó là **bảy prompt** chạy theo thứ tự, vì lý do đo
được ở mục 0: một gói đạt chuẩn INS2053 nặng hơn 183.000 từ, không model nào sinh một lượt.
Prompt 2–4 là vòng lặp chạy 15 lần, mỗi lần một buổi.

Mọi con số trong tài liệu này lấy từ `_tools/audit-selfstudy.js` chạy trên cây làm việc
hiện tại ngày 04/09/2026, và từ việc đọc thật repo INS3064. Không có số nào ước lượng.
Chạy lại `node _tools/audit-selfstudy.js` để lấy số mới nếu gói đã thay đổi.

---

## 0. Khoảng cách giữa nguồn và đích — đo trước khi viết

### Nguồn: `VNU_IS_Ebook_INS3064` (PHP & MySQL, 3 tín chỉ)

Cấu trúc thật trên `main`:

```
Vietnamese/   appendix/ phan_1_php_foundation/ phan_2_mysql_database/
              phan_3_integration_advanced/ phan_4_security_jquery/
              00_gioi_thieu_tong_quan.md  00_huong_dan_cai_dat.md
              buoi_08_review_midterm.md
English/      cùng bố cục, đổi tiền tố part_N_ và session_NN_
Slide/        Slide00_01.html … Slide15.html  (15 file HTML viết tay)
SYLLABUS.md   README.md
create_remaining_sessions.py  create_slides_from_vietnamese.py  translate_to_english.py
```

Những gì nguồn **có** và đáng giữ:
- Khung 15 buổi rõ ràng, chia 4 phần, ánh xạ LO1–LO8 sang từng buổi (`SYLLABUS.md`).
- Giọng "cầm tay chỉ việc", có `🎒 Ví dụ đời sống` mỗi khái niệm — cùng tinh thần với
  gói INS2053.
- Bố cục section đã gần đúng: `📌 THÔNG TIN BUỔI HỌC` (khối fence) → `🎯 MỤC TIÊU HỌC
  TẬP` → `LÝ THUYẾT` đánh số → `EXAMPLE` → `PRACTICE` → `✅ KEY TAKEAWAYS` →
  `📋 PHIẾU HỌC TẬP` → `🔗 CHUẨN BỊ CHO BUỔI SAU` → `📚 TÀI LIỆU THAM KHẢO`.

Những gì nguồn **thiếu** — đây chính là việc của prompt:
- **Độ dài bằng 1/4.** `buoi_01_intro_php.md` = 20,5 KB; `session_05_intro_sql.md` =
  11,0 KB. Chương INS2053 mỏng nhất là 46,2 KB, chương ít từ nhất 6.260 từ; dày nhất
  67,5 KB (10.024 từ).
- **Không có đáp án.** Phiếu học tập kiểu `Đáp án: _______` và `Trả lời: _________`.
  Không có một khối `<details><summary>Answer</summary>` nào. Gói INS2053 có **214**
  khối `<details>` trong ebook và **56** trong exercises, 15/15 exercise có answer key.
- **Không có bảng lỗi.** Không có `Symptom → Cause → How to confirm → Fix`. Gói INS2053
  có ở 15/16 chương.
- **Không có `🧪 Try It Yourself`** kèm *Expected result*. Gói INS2053 có **58** khối.
- **Gần như không có hình.** Cả buổi 1 chỉ một sơ đồ ASCII box-drawing. Không có
  `![...]`. Gói INS2053 có 60 diagram SVG dạy học trong 17 canvas deck, mỗi chương
  trỏ tới 3–5 diagram bằng dòng cross-ref kiểm được bằng script.
- **10 file bên English là stub rỗng.** `create_remaining_sessions.py` ghi ra đúng chữ
  "This session content is being translated from the Vietnamese version." Còn phần
  "dịch" thật thì là chuỗi `.replace()` từng từ — không dùng lại được.
- **README mô tả thứ không tồn tại.** README hứa `projects/mini_projects/` và
  `projects/final_project/`; trên `main` không có thư mục `projects/` nào. Đừng tin
  README của nguồn, chỉ tin cây file.
- **Không có exercises/homework/exams riêng.** Bài tập nằm lẫn trong chương. Không có
  đề mẫu, không có lời giải, không có rubric.
- **Không có tooling.** Không QA, không CI, không builder slide.

### Đích: gói INS2053 này (số đo thật)

| Lớp | Số file | Số từ | details | Try It | answer key | bảng lỗi |
|---|---|---|---|---|---|---|
| `ebook/` | 16 | 119.799 | 214 | 58 | — | 15/16 |
| `exercises/` | 15 | 26.307 | 56 | 0 | 15/15 | 0/15 |
| `homework/` | 15 | 8.617 | 0 | 0 | 0/15 (cố ý — có điểm) | 0/15 |
| `slides/` | 15 | 11.920 | 0 | 0 | — | — |
| `exams/` | 6 | 8.463 | — | — | có lời giải | — |
| `project/` | 3 | 6.864 | — | — | — | — |
| `references/` | 1 | 1.112 | — | — | — | — |
| **Tổng** | | **183.082** | | | | |

`canvases/`: 17 deck, **484** slide, **60** diagram SVG.
`slides-html/`: 25 file, mở là chạy, không cần install.

Chương ebook: 1.205–1.725 dòng, 6.260–10.024 từ, 12–13 `<details>`, 4–5 `Try It`,
3–5 cross-ref diagram. (Chương 08 là ngoại lệ có chủ ý: 44 `<details>` vì là chương ôn
tập giữa kỳ, và 0 `Try It` vì cả chương là đề luyện.)

---

## Cách dùng bảy prompt

```
PROMPT 1  → dựng khung + schedule + syllabus          (1 lần)
PROMPT 2  → ebook chương NN                            (lặp 15 lần)
PROMPT 3  → exercise + homework buổi NN                (lặp 15 lần, sau P2 buổi đó)
PROMPT 4  → canvas deck buổi NN + wire cross-ref       (lặp 15 lần, sau P2 buổi đó)
PROMPT 5  → exams (midterm + final) + capstone project (1 lần, sau khi xong 15 buổi)
PROMPT 6  → tooling QA + CI + builder slide HTML       (1 lần, nên chạy SỚM — xem ghi chú)
PROMPT 7  → soát toàn gói, viết báo cáo nhận xét       (1 lần, cuối)
```

Ghi chú về thứ tự: **chạy PROMPT 6 ngay sau PROMPT 1**, đừng để cuối. Lý do rút ra từ
gói này: `_tools/audit-selfstudy.js` tồn tại vì các one-liner PowerShell mất output liên
tục, và vì regex đếm `<details>` không phân biệt fence cho kết quả sai — một `<details>`
nằm *trong* code fence làm ví dụ bị đếm thành thật. Có script đếm đúng từ đầu thì mỗi
chương sinh ra được kiểm ngay, không phải sửa hồi tố 15 chương.

Ba con số trong `HANDOVER-canvas-diagrams.md` mục 5c là bằng chứng: "2.104 dòng ASCII
diagram" thực ra là 445 (regex bắt cả dấu `|` của bảng markdown), "1.147 code block"
thực ra là 496, "31,5 mục `##`/chương" thực ra là 13,6. Ba số sai đó đã dẫn tới ba đề
xuất sai. Đo bằng script có state machine, đừng đo bằng regex.

---

# PROMPT 1 — dựng khung gói + schedule + syllabus

```
Bạn dựng một gói học liệu đại học hoàn chỉnh cho môn <MÃ MÔN> — <TÊN MÔN>, dạy tại
Trường Quốc tế, ĐHQG Hà Nội (VNU-IS), cho sinh viên QUỐC TẾ (nội dung học liệu bằng
TIẾNG ANH).

Thư mục làm việc: <ĐƯỜNG DẪN TUYỆT ĐỐI>

NGUỒN NỘI DUNG (chỉ là nguồn ý tưởng, KHÔNG phải chuẩn chất lượng):
<URL repo ebook nguồn>
Đọc SYLLABUS.md và 2 chương bất kỳ của nguồn để lấy: khung 15 buổi, ánh xạ LO,
danh sách công cụ, ý tưởng ví dụ đời sống. ĐỪNG copy độ dài hay bố cục của nguồn.

CHUẨN CHẤT LƯỢNG (đây mới là thứ phải đạt): gói INS2053 tại
c:\Users\N4G\OneDrive\11. VNU - IS School\INS2053 - WEB
Trước khi viết bất cứ thứ gì, đọc thật:
  - README.md            (bảng "Where everything lives", nhịp dạy 150 phút)
  - schedule.md          (bảng đánh giá, chính sách nộp muộn, "Material for each session")
  - ebook/04-applying-css-to-website.md   ĐỌC HẾT 1.514 dòng — đây là hình mẫu chương
  - exercises/session-04/exercise.md      chú ý mục "Self-Check (answers included)"
  - homework/session-04/homework.md       chú ý rubric 10 điểm cuối sheet
  - project/spec.md, project/milestones.md, project/rubric.md
  - HANDOVER-canvas-diagrams.md mục 2, 3, 6   (house rules diagram + quy trình an toàn)

VIỆC CỦA PROMPT NÀY — chỉ dựng khung, CHƯA viết nội dung buổi học:

1. Tạo cây thư mục ĐÚNG như gói mẫu, cùng quy ước đánh số:
     ebook/NN-<slug>.md            15 chương + appendix-a-<slug>.md
     slides/NN-<slug>.md           Marp markdown
     canvases/buoi-NN.canvas.tsx
     exercises/session-NN/exercise.md
     homework/session-NN/homework.md
     exams/midterm/{sample-exam,sample-solution,rubric}.md
     exams/final/{sample-exam,sample-solution,rubric}.md
     project/{spec,milestones,rubric}.md
     examples/<tên-ví-dụ>/         website mẫu chạy được
     references/resources.md
     _tools/                       script QA (PROMPT 6)
     schedule.md  README.md  package.json  .gitignore  .gitattributes
   RÀNG BUỘC ĐÁNH SỐ: mọi file của buổi NN phải dùng CÙNG số NN. Đây là thứ cho phép
   sinh viên và script tìm nhau. Ở buổi này chỉ tạo file rỗng có heading H1 đúng tên.

2. Viết schedule.md ĐẦY ĐỦ ngay:
   - bảng đánh giá với trọng số CỘNG ĐÚNG 100%
   - nếu đề cương gốc gộp một cục lớn (ví dụ "cuối kỳ 60%") mà bạn tách ra, phải có
     một khối blockquote giải thích tách thế nào và chấm theo rubric nào — gói mẫu làm
     đúng vậy ở schedule.md dòng 19-22
   - chính sách nộp muộn CỤ THỂ: hạn, ngày ân hạn, mức trừ, sau đó là 0
   - bảng 15 tuần: tuần | buổi | chủ đề | deliverable | CLO
   - mục "Material for each session" liệt kê 5 đường dẫn của mỗi buổi

3. Viết README.md: bảng "Where everything lives" (folder | what it is | who uses it),
   mục "How to teach a session (150 min)" chia 3 nhịp có số phút, mục "How to study",
   mục "Important notes" (deadline, exam, project, example là tham khảo không phải đáp án).

4. Viết references/resources.md: link MDN/W3C/tài liệu chính thức, phân nhóm.
   Chỉ link tài liệu gốc còn sống. Không link blog rác, không link video chung chung.

ĐỪNG:
- Đừng viết nội dung 15 buổi ở prompt này. Sẽ có prompt riêng cho từng buổi.
- Đừng bịa deliverable mà tuần đó chưa dạy đủ kỹ thuật để làm.
- Đừng để trọng số cộng ra 95% hay 105%. Cộng lại trước khi ghi file.

VERIFY TRƯỚC KHI BÁO XONG:
- liệt kê cây file vừa tạo, đếm số file mỗi thư mục
- cộng lại các trọng số đánh giá, in ra tổng
- kiểm mọi đường dẫn nhắc trong README.md và schedule.md đều tồn tại thật
Báo rõ cái gì kiểm được, cái gì chưa.
```

---

# PROMPT 2 — viết ebook chương NN (lặp 15 lần)

Đây là prompt tốn công nhất. Chạy MỘT chương một lần. Đừng gộp hai chương.

```
Viết chương ebook buổi <NN> cho môn <MÃ MÔN> — <TÊN MÔN> (VNU-IS, sinh viên QUỐC TẾ,
viết bằng TIẾNG ANH).

Chủ đề buổi <NN>: <CHỦ ĐỀ>
Ghi ra file: ebook/<NN>-<slug>.md

TRƯỚC KHI VIẾT, đọc hai thứ:
1. HÌNH MẪU BẮT BUỘC: ebook/04-applying-css-to-website.md của gói INS2053. Đọc HẾT.
   Bố cục 15 mục H1 của nó là bố cục bạn phải theo, đúng thứ tự đó.
2. NGUỒN Ý TƯỞNG: chương tương ứng trong <URL repo nguồn>. Lấy ví dụ đời sống, thứ tự
   khái niệm, code mẫu. Nguồn dài ~11-20 KB; chương bạn viết phải dày gấp 3-4 lần nguồn.

BỐ CỤC BẮT BUỘC — 13 mục H1, đúng thứ tự này (2 dòng đầu là tiêu đề, 11 mục còn lại là
các phần thật của chương):

  # 🟦 SESSION <NN>
  # **<Tiêu đề chương>**
     → 1 đoạn mở bài 4-6 câu, nói thẳng hôm nay xong thì sản phẩm của sinh viên
       thay đổi thế nào. Nối tiếp buổi trước bằng tên cụ thể.

  # 📌 SESSION INFORMATION
     → một khối ``` fence, các dòng có emoji, thẳng cột như mẫu:
       📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
       📚 Reference:    <tài liệu chuẩn, ví dụ MDN "..."; W3C ...>
                        Course slides (Week <NN>)
       🎯 Objectives:   1. ... (6 mục, đánh số)
       📖 Prepare:      1. ... (3 mục)
       🖼 Diagrams:     canvases/buoi-<NN>.canvas.tsx — <Tên3Hàm>, <Diagram>, <Cách>
       🔗 Outcomes:     CLO1 (...)
                        CLO4 (...)

  # 🎯 LEARNING OBJECTIVES        → 8 bullet, động từ đo được, in đậm thuật ngữ
  # 📖 THEORY                     → 7-9 mục "## N. <Tên>", mỗi mục có "### N.1", "### N.2"
  # 📋 THEORY SUMMARY             → bảng | Concept | Definition | Example | 10 dòng
  # 💡 WORKED EXAMPLES            → 5 ví dụ "## Example N: ...", mỗi ví dụ có code
                                     ĐẦY ĐỦ chạy được + giải thích từng dòng
  # 🛠️ HANDS-ON PRACTICE          → "## Setup" + TASK 1..4, mỗi task có code và kết quả
  # 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU
     → bảng 4 cột | Symptom you see | Likely cause | How to confirm | Fix |
       9-10 dòng, XẾP THEO TẦN SUẤT thật, không theo thứ tự bài học.
       Cột "How to confirm" phải là thao tác cụ thể ("F12 → Network tab shows 404"),
       không phải "kiểm tra lại code".
       Kết bằng 1 đoạn dạy cách đọc công cụ, không dạy cách đoán.
  # ✅ SELF-CHECK QUESTIONS       → 8 câu Q1..Q8, MỖI câu một khối:
       **Q<n>. <câu hỏi>**
       <details>
       <summary>Answer</summary>
       <đáp án đầy đủ, có thể có bảng và code>
       </details>
  # 📝 SELF-ASSESSMENT WORKSHEET  → bảng | # | I can... | Yes | No | 8 dòng, ô ☐
  # 🔗 FURTHER READING            → 6-7 link MDN/W3C, tài liệu gốc
  # ⏭️ NEXT SESSION               → 1 đoạn, nói tên cụ thể buổi sau làm gì

RẢI TRONG PHẦN THEORY — bắt buộc có:

A. 4 khối 🧪 Try It Yourself, rải đều các mục lý thuyết. Mỗi khối ĐÚNG khuôn này:
     ### 🧪 Try It Yourself — <tên việc làm, không phải tên khái niệm>
     **Task (5 min):** <một câu, nói rõ làm gì VÀ để chứng minh điều gì>
     1. ... 2. ... 3. ... 4. ...        (các bước có code inline)
     **Expected result:** <kết quả CỤ THỂ nhìn thấy được, kèm cả trường hợp SAI
                          thì thấy gì — ví dụ "A pale yellow page and a 200 status.
                          A 404 means the path is wrong">
     <details>
     <summary><lý do sâu hơn, đặt tên theo cái học được></summary>
     <2-3 đoạn giải thích vì sao bước đó đáng làm, sai thì mất thời gian ở đâu>
     </details>
   Nguyên tắc: mỗi Try It phải có smoke test — một thay đổi hiển nhiên đến mức không
   thể không thấy, để tách lỗi KẾT NỐI khỏi lỗi NỘI DUNG.

B. 3 dòng cross-ref diagram, đặt NGAY TRƯỚC mục lý thuyết mà diagram đó dạy.
   Cú pháp phải ĐÚNG TỪNG KÝ TỰ, vì script kiểm nó:
     > 🖼 **Diagram:** `canvases/buoi-<NN>.canvas.tsx` → `<TênHàm>` — slide `s<NN>-<id>` ("<Tiêu đề slide>")
   Dấu → và — là ký tự Unicode thật, không phải -> hay --.

C. 12-13 khối <details> tổng cộng cả chương (8 ở Self-Check + 4 ở Try It Yourself).

D. Mỗi khái niệm mới có 1 khối "### 🎒 Real-life Example" — so sánh đời thường,
   3-5 câu. Đây là thứ ebook nguồn làm tốt, giữ lấy.

E. Mục "## ❌ Common Mistakes" trong THEORY: 5 lỗi "### Mistake N: <tên>", mỗi lỗi có
   code SAI, code ĐÚNG, và một câu vì sao lỗi này sống lâu.

ĐỊNH LƯỢNG — chương đạt khi:
  - 1.150-1.750 dòng
  - 6.200-10.000 từ
  - 12-13 khối <details>, mở/đóng cân bằng
  - 4 khối 🧪 Try It Yourself, mỗi khối CÓ dòng **Expected result:**
  - 3-5 dòng cross-ref diagram
  - 1 bảng COMMON ERRORS 4 cột, >= 9 dòng
  - 13 mục H1 đúng thứ tự trên

RÀNG BUỘC VIẾT:
- Sinh viên QUỐC TẾ: thuật ngữ tiếng Anh giải thích ngay lần đầu xuất hiện. Không giả
  định bối cảnh Việt Nam. Không dùng thành ngữ. Câu ngắn.
- Mọi code phải chạy được nguyên trạng: không "...", không "// TODO", không placeholder.
  Code dài thì cắt thành nhiều ví dụ, đừng cắt giữa một file.
- Một ví dụ chạy XUYÊN SUỐT cả 15 chương (gói mẫu dùng "Student Club Website").
  Chương NN làm việc trên đúng file mà chương NN-1 đã tạo, gọi đúng tên file đó.
- Bảng thay đoạn văn khi so sánh >= 3 thứ. Đoạn văn thay bảng khi giải thích nguyên nhân.
- KHÔNG viết "Đáp án: ______" kiểu điền tay như ebook nguồn. Đáp án nằm trong <details>
  để sinh viên tự học được.

ĐỪNG:
- Đừng viết mỏng hơn 6.200 từ rồi bảo "đã đủ ý". Chương mỏng là lỗi thường gặp nhất khi
  sinh từ ebook nguồn, vì nguồn chỉ dày 1/4.
- Đừng bịa tên diagram rồi để đó. Ba tên hàm ghi ở 🖼 Diagrams và ở 3 dòng cross-ref sẽ
  được PROMPT 4 hiện thực hoá — ghi tên nào thì PROMPT 4 phải tạo đúng tên đó, và
  check-diagram-links.js sẽ đối chiếu.
- Đừng dùng emoji ngoài bộ đã liệt kê. Bộ emoji là quy ước điều hướng, không phải trang trí.

VERIFY TRƯỚC KHI BÁO XONG — đếm thật, in số ra: số dòng, số từ, số <details> mở/đóng,
số "🧪 Try It Yourself", số "**Expected result:**", số dòng cross-ref, số mục H1.
Thiếu chỉ tiêu nào thì viết bù NGAY trong lượt này, đừng báo xong rồi hẹn sau.
```

---

# PROMPT 3 — exercise + homework buổi NN (lặp 15 lần)

Chạy sau khi PROMPT 2 của buổi đó xong, vì exercise phải trỏ đúng vào file mà chương
vừa tạo.

```
Viết bài thực hành trên lớp và bài tập về nhà cho buổi <NN>, môn <MÃ MÔN> (TIẾNG ANH).

Ghi ra:
  exercises/session-<NN>/exercise.md
  homework/session-<NN>/homework.md

ĐỌC TRƯỚC:
  - ebook/<NN>-<slug>.md vừa viết — exercise phải luyện đúng những gì chương đó dạy,
    và tiếp tục trên đúng những file mà chương đó đã tạo
  - exercises/session-04/exercise.md và homework/session-04/homework.md của gói INS2053
    làm hình mẫu

--- exercise.md — bố cục bắt buộc, đúng thứ tự ---

  # Session <NN> — In-Class Exercise: <tên>
  ## Objective            → 3-5 bullet
  ## Time Required        → "45-60 minutes" (khớp nhịp 150 phút trong README)
  ## Instructions
     ### Task 1: <tên>    → 4 task. Mỗi task: mục tiêu, các bước đánh số, code mẫu
     ### Task 2: ...        đủ để làm theo, và một câu nói rõ làm xong thì thấy gì
     ### Task 3: ...
     ### Task 4: ...
  ## Starter Files        → liệt kê file sinh viên bắt đầu từ đó
  ## Expected Result      → mô tả cụ thể trang/kết quả sau khi làm xong 4 task
  ## Self-Check (answers included)
     → ĐÚNG 4 khối, mỗi khối:
       <details>
       <summary><n>. <câu hỏi đặt trong ngữ cảnh file sinh viên vừa làm></summary>
       <đáp án đầy đủ: có thể có bảng so sánh, code, và cách kiểm chứng bằng DevTools>
       </details>
     → CÂU CUỐI (số 4) KHÔNG cho code: bắt sinh viên tự viết trước khi mở đáp án.
  ## Checklist            → ô [ ] cho từng yêu cầu
  ## Tips                 → 4-6 mẹo, mỗi mẹo giải quyết một lỗi thật

  THỨ TỰ QUAN TRỌNG: "Self-Check" phải nằm TRƯỚC "Checklist". Script audit kiểm đúng
  thứ tự này (audit-selfstudy.js mục 4, cột order).

  Chỉ tiêu: 8-10 mục H2, đúng 4 khối <details>, 1.400-2.000 từ.

--- homework.md — bố cục bắt buộc ---

  # Homework <NN>: <tên>
  ## Due Date             → "Sunday, 23:59 (Week <NN+1>)"
  ## Objective            → 3 bullet
  ## Requirements
     ### Task 1: <tên>    → 2 task là đủ. Nêu rõ ĐƯỜNG DẪN FILE phải tạo/sửa
     ### Task 2: <tên>      và danh sách yêu cầu đánh số, có "Requirements checklist"
                            dạng ô [ ] ở cuối task
  ## Submission Guide     → 3 lệnh git cụ thể: git add <đường dẫn thật>, commit -m
                            "HW<NN>: ...", push
  ## Grading Rubric       → bảng | Criteria | Points | Description |, tổng ĐÚNG 10 điểm,
                            dòng cuối là | **Total** | **10** | |
  ## Tips                 → 4-5 mẹo
  ## Example Output       → 1-2 câu nói trang sẽ trông thế nào sau khi làm

  Chỉ tiêu: 500-700 từ. KHÔNG có <details>, KHÔNG có đáp án — homework được chấm điểm,
  rubric đã nói rõ chấm cái gì. Đây là lớp duy nhất trong gói cố ý không công bố đáp án.

RÀNG BUỘC:
- Cộng lại điểm rubric. Phải ra đúng 10. Đây là lỗi hay gặp.
- Mọi đường dẫn file nhắc trong exercise/homework phải là đường dẫn THẬT theo cấu trúc
  project đã định ở project/spec.md. Nếu spec nói mọi trang nằm phẳng ở gốc thì link CSS
  là "css/style.css" ở MỌI trang, không có "../". Sai chỗ này là sai cả 15 tuần.
- Exercise là luyện lại cái vừa học trên lớp; homework là mở rộng sang trang khác của
  project. Đừng để hai cái trùng nhau.
- Câu Self-Check phải hỏi về file sinh viên VỪA LÀM ("your own style.css", "the
  .info-box you built"), không hỏi lý thuyết trừu tượng.

VERIFY: đếm số <details> (phải là 4), kiểm "Self-Check" xuất hiện trước "Checklist",
cộng điểm rubric in ra tổng, và kiểm mọi đường dẫn file nhắc tới có tồn tại hoặc là
file sinh viên sẽ tạo.
```

---

# PROMPT 4 — slide deck + diagram dạy học buổi NN (lặp 15 lần)

Đây là phần khác biệt lớn nhất so với ebook nguồn. Nguồn gần như không có hình; gói
INS2053 có 60 diagram SVG được thiết kế để dạy chỗ sinh viên hay sai.

```
Viết slide deck cho buổi <NN>, môn <MÃ MÔN>, gồm hai dạng:
  slides/<NN>-<slug>.md          Marp markdown (bản nhẹ, để in / chiếu nhanh)
  canvases/buoi-<NN>.canvas.tsx  deck tương tác + 3 diagram SVG dạy học

ĐỌC TRƯỚC — không đọc thì làm sai chắc chắn:
  1. HANDOVER-canvas-diagrams.md của gói INS2053, mục 2 (4 lỗi của diagram cũ), mục 3
     (house rules), mục 6 (quy trình sửa an toàn không cần compiler).
  2. canvases/buoi-04.canvas.tsx — đọc HẾT. Đây là chuẩn đầu ra thật.
  3. ebook/<NN>-<slug>.md vừa viết — lấy đúng 3 tên hàm diagram và 3 slide id đã khai
     ở khối 🖼 Diagrams và ở 3 dòng cross-ref. PHẢI trùng khớp từng ký tự.

--- slides/<NN>-<slug>.md (Marp) ---

  Front-matter đúng 5 dòng:
    ---
    marp: true
    theme: default
    paginate: true
    ---
  Slide 1: H1 tên buổi, in đậm tên môn, một câu định vị bài học, rồi dòng đường dẫn:
    Read: `ebook/<NN>-<slug>.md`  ·  Practise: `exercises/session-<NN>/exercise.md`  ·  Diagrams: `canvases/buoi-<NN>.canvas.tsx`
  Sau đó 10-14 slide, ngăn bằng `---`. Mỗi slide một H2, tối đa 6 bullet.
  Chỉ tiêu: 600-900 từ. Slide là dàn ý cho người dạy, không phải bản rút gọn của ebook.

--- canvases/buoi-<NN>.canvas.tsx ---

  Import từ "qoder/canvas": Grid, H1, H2, H3, Presentation, PresentationSlide, Stack,
  Row, Tag, Pill, Code, Text, Callout, Divider, Table, useHostTheme, canvasImage,
  type CanvasTokens. CHỈ import cái thật sự dùng.

  Đầu file, sau import, đặt hằng số:
    const ON_FILL = "#0B1220";
    const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

  Rồi 3 hàm diagram:
    function <TênHàm>({ t }: { t: CanvasTokens }) { return (<svg ...>...</svg>); }

  HOUSE RULES CHO MỌI SVG — không thoả là phải viết lại:
  - viewBox="0 0 560 <h>", width="100%", height="<h>"   (560 là chuẩn chung mọi deck)
  - Sàn chữ 11px. Nhãn thân 12.5-13px. Không có chữ nào nhỏ hơn 11.
  - Chữ nằm trên nền t.chart.* thì fill={ON_FILL}. TUYỆT ĐỐI không dùng t.text.* trên
    t.chart.* — nó đọc được ở theme sáng và gần như vô hình ở theme tối.
  - Ngữ pháp 4 màu, thống nhất cả 15 deck:
      t.chart.blue         = cấu trúc / markup sinh viên viết
      t.chart.goldenYellow = hành động, request, "để ý chỗ này"
      t.chart.green        = kết quả / đúng / cái người dùng thấy
      t.chart.brightOrange = cảnh báo / sai / deprecated
  - Mỗi <svg> có role="img" và aria-label là một CÂU đầy đủ mô tả diagram dạy gì,
    không phải nhắc lại tiêu đề.
  - Mọi id trong <defs> (marker, gradient, pattern, filter, clipPath) phải mang tiền tố
    deck: "s<NN>-arrow", "s<NN>-grad". Hai diagram cùng màn hình mà trùng id là hỏng cả hai.
  - MỌI nhãn trong SVG bằng TIẾNG ANH. Sinh viên là quốc tế.
  - Diagram phải dạy cái sinh viên hay làm SAI: đối chiếu đúng-vs-sai cạnh nhau, có
    PHÉP TÍNH THẬT (ví dụ 300 + 20*2 + 5*2 = 350px cho box model). Không minh hoạ lại
    tiêu đề slide — đó là lỗi số 4 trong HANDOVER mục 2.

  Rồi deck:
    export default function Session<NN>Lecture() {
      const { tokens } = useHostTheme();
      const t = tokens;
      return (
        <Presentation keyboard controls progress slideNumber overview fullscreen
          speakerNotes deepLink touch loop={false} aspectRatio="16 / 9">
          ... 30-35 <PresentationSlide> ...
        </Presentation>
      );
    }

  Mỗi PresentationSlide có id="s<NN>-<slug>" và title="...". Slide nào có nội dung
  cần nói thêm thì thêm notes="..." — speaker notes sẽ được builder HTML giữ lại.
  Slide 1 là title (có background pattern), slide 2 là objectives, slide 3 là timeline
  150 phút. Ba diagram mount vào đúng 3 slide id đã khai trong ebook.
  Kết deck bằng 1-2 slide quick-check có đáp án trong notes.

  Chỉ tiêu deck: 30-35 slide, 3-4 hàm diagram, số <svg> = số hàm diagram.

QUY TRÌNH AN TOÀN — có lý do, đọc HANDOVER mục 6 trước khi bỏ qua:
- Không có compiler cho "qoder/canvas": KHÔNG type-check được. Kiểm bằng cấu trúc.
- Viết file theo TỪNG CHUNK NHỎ, không ghi một lượt 50 KB.
- Kiểm cân bằng ngoặc TRƯỚC khi ghi tiếp: node _tools/check-balance.js <file>
- Wire diagram vào slide MỘT slide một lần. Đừng gộp nhiều sửa vào một lần ghi.
- Sau mỗi deck: node _tools/qa-canvases.js phải in QA PASS (exit 0). Chưa PASS thì
  không sang deck sau.
- Sau khi có ebook + deck: node _tools/check-diagram-links.js . phải in
  "all diagram cross-links resolve". Script này kiểm mỗi dòng 🖼 Diagram trong ebook
  trỏ tới deck có thật, hàm ĐƯỢC ĐỊNH NGHĨA, hàm ĐƯỢC MOUNT, và slide id có thật.

ĐỪNG:
- Đừng viết diagram thứ 4, 5 cho vui. 3 diagram dạy đúng 3 chỗ khó là đủ.
- Đừng đặt chữ 7-9px vì "cho vừa". Thu gọn nội dung, đừng thu nhỏ chữ. Diagram gốc của
  gói mẫu từng có chữ 7px và phải viết lại toàn bộ.
- Đừng copy nguyên diagram từ deck khác mà không đổi tiền tố id trong <defs>.

VERIFY: chạy node _tools/qa-canvases.js và node _tools/check-diagram-links.js, dán kết
quả. Nói rõ cái gì kiểm được (cấu trúc, ngoặc, id, aria, cỡ chữ) và cái gì KHÔNG kiểm
được (không có compiler nên không type-check, không render được để xem mắt thường).
```

---

# PROMPT 5 — đề thi, lời giải, rubric, và capstone project (1 lần)

```
Viết bộ đánh giá cho môn <MÃ MÔN> (TIẾNG ANH), gồm 9 file:

  exams/midterm/sample-exam.md      exams/final/sample-exam.md
  exams/midterm/sample-solution.md  exams/final/sample-solution.md
  exams/midterm/rubric.md           exams/final/rubric.md
  project/spec.md   project/milestones.md   project/rubric.md

ĐỌC TRƯỚC: cả 9 file tương ứng của gói INS2053, và schedule.md để lấy đúng trọng số.
Cũng đọc lại 15 chương ebook vừa viết — đề chỉ được hỏi thứ đã dạy.

--- Đề thi ---
Hai đề đều là THI THỰC HÀNH, KHÔNG internet. Midterm 90 phút (phủ buổi 1-7), final
120 phút (phủ cả môn, trọng tâm buổi 9-15). Sinh viên được mang ghi chú của mình và
bản ebook offline.

sample-exam.md: bối cảnh đề, danh sách file phải nộp, các phần có điểm ghi rõ, và một
mục "What you may bring". Chia phần theo kỹ năng, không theo chương.

sample-solution.md: lời giải ĐẦY ĐỦ, code chạy được nguyên trạng. Đây là bản người dạy
dùng để chấm và sinh viên dùng để ôn — không được có "tương tự như trên".

rubric.md: bảng tiêu chí, thang điểm ghi rõ mức nào được bao nhiêu, tổng khớp với
trọng số trong schedule.md.

--- Capstone project ---
spec.md phải có, theo đúng thứ tự:
  1. Project Overview (context, goal, timeline)
  2. Target Users (Personas) — 3 persona có tên, năm học, nhu cầu cụ thể
  3. Page-by-Page Specification — mỗi trang một mục con: nội dung bắt buộc, kỹ thuật
     bắt buộc, và trang đó được dạy ở buổi nào
  4. Technical Requirements — CẤU TRÚC FILE nói dứt khoát, không để mơ hồ
  5. Design Requirements (layout, typography, colour, navigation)
  6. Accessibility Requirements
  7. Grading Criteria — thang điểm khớp trọng số
  8. Submission Requirements — deadline, định dạng nộp, mức trừ nộp muộn
  9. Tips for Success

milestones.md: M1..M8, mỗi milestone gắn với MỘT TUẦN cụ thể, có Deliverables,
Acceptance Criteria, và Points. Tổng điểm các milestone + bài nộp cuối = tổng điểm
project trong rubric. Milestone tuần N chỉ được yêu cầu kỹ thuật đã dạy tới tuần N.

rubric.md: chấm chi tiết từng hạng mục, có thang chữ (A/B/C...) nếu trường dùng.

--- examples/<tên>/ — website mẫu hoàn chỉnh ---
Viết một website mẫu CHẠY ĐƯỢC, dùng đúng cấu trúc file trong spec.md, thể hiện MỌI
kỹ thuật dạy trong môn. Kèm README.md có bảng "Technique | Where to see it".
Nếu ví dụ tham chiếu ảnh/media không kèm theo, README PHẢI có một mục nói rõ đó là cố
ý và hướng dẫn sinh viên tự thêm file cùng tên — gói mẫu có mục "About the missing
images and media" đúng vì lý do này. Ví dụ tham chiếu 7 asset không tồn tại mà không
giải thích là một lỗi đã từng bị ghi vào biên bản nhận xét.
README cũng phải nói rõ: đây là TÀI LIỆU THAM KHẢO, không phải đáp án để copy.

RÀNG BUỘC:
- Cấu trúc file trong spec.md, milestones.md, examples/, và cả 15 bộ homework/exercise
  phải GIỐNG NHAU tuyệt đối. Một chỗ lệch là sinh viên sai đường dẫn suốt kỳ.
- Cộng lại mọi thang điểm. In tổng ra. Đừng để lệch 1 điểm.
- Đề thi không được hỏi kỹ thuật chưa dạy. Đối chiếu với schedule.md tuần nào dạy gì.

VERIFY: cộng điểm từng rubric in ra tổng; đối chiếu cấu trúc file giữa spec.md,
examples/ và homework/; mở website mẫu bằng cách đọc HTML kiểm mọi href/src trỏ tới
file có thật hoặc được README giải thích là cố ý thiếu.
```

---

# PROMPT 6 — tooling QA, CI, builder slide HTML (1 lần, chạy SỚM)

```
Viết bộ script QA không phá hoại cho gói học liệu <MÃ MÔN>, đặt trong _tools/.

ĐỌC TRƯỚC: toàn bộ _tools/ của gói INS2053, đặc biệt audit-selfstudy.js (đọc HẾT 242
dòng) và qa-canvases.js. Đọc cả .github/workflows/qa.yml và package.json.

Cần các script sau, mọi script CHỈ ĐỌC (trừ builder ghi ra slides-html/):

1. _tools/audit-selfstudy.js — đo mức độ tự học được của gói.
   BẮT BUỘC dùng state machine tách code fence khỏi prose, KHÔNG dùng regex thuần.
   Lý do có thật: một khối <details> nằm TRONG code fence làm ví dụ từng bị đếm thành
   <details> thật, và regex bắt cả dấu | của bảng markdown khiến "2.104 dòng ASCII
   diagram" thực ra chỉ có 445. Ba số liệu sai đã dẫn tới ba đề xuất sai.
   Cũng phải strip inline code span THEO TỪNG DÒNG — strip trên text đã join thì một
   backtick ở dòng này ghép với backtick cách đó 40 dòng và ăn mất markup ở giữa.
   In ra 6 mục: (1) toàn vẹn markdown — fence chưa đóng, details/summary lệch, tag rác
   của agent, BOM, U+FFFD; (2) bảng affordance theo lớp: files/words/details/tryIt/
   answers/errTable; (3) bảng theo từng chương; (4) exercises: có answer key không,
   Self-Check có trước Checklist không; (5) hướng @media (đếm max-width vs min-width);
   (6) canvas deck: slides/diagramFns/svg/KB.
   Ghi ra cả stdout và _tools/audit-selfstudy.txt. exit 1 nếu có lỗi toàn vẹn.

2. _tools/qa-canvases.js — 9 kiểm tra cấu trúc trên canvases/, theo đúng thứ tự:
   (1) cân bằng ngoặc () {} [] sau khi strip string/comment/JSX-literal
   (2) mọi hàm diagram đều được một slide dùng
   (3) named import không dùng  → chỉ CẢNH BÁO, không fail
   (4) mỗi <svg> có role="img" và aria-label
   (5) không có fontSize < 11  → chỉ CẢNH BÁO
   (6) không có url(#id) trỏ vào id không tồn tại
   (7) không trùng id trong <defs> trong cùng file
   (8) không có ký tự non-ASCII bên trong <svg> (nhãn phải tiếng Anh)
   (9) ước lượng bề rộng chữ so với viewBox — nhãn không được tràn
   Hard fail: 1,2,4,6,7,8,9. Advisory: 3,5. In "QA PASS"/"QA FAIL" và exit tương ứng.

3. _tools/check-diagram-links.js — mỗi dòng "> 🖼 **Diagram" trong ebook/ phải resolve:
   deck tồn tại, hàm được định nghĩa (^function <Tên>), hàm được mount (<Tên), và
   slide id có thật (id="<id>"). exit 1 nếu có cái nào không resolve.

4. _tools/strip-literals.js + test-strip-literals.js — tách literal khỏi code để đếm
   ngoặc đúng, KÈM test tự chạy. Script đếm mà không có test là script không tin được.

5. _tools/replace-once.js — thay một đoạn text, TỪ CHỐI nếu khớp nhiều hơn một lần.
   Đây là lưới an toàn khi sửa deck lớn, không phải bất tiện.

6. _tools/check-balance.js — đếm ngoặc một file, dùng trước khi ghi tiếp.

7. _tools/build-html-slides.mjs + _tools/canvas-runtime/ — render canvases/*.canvas.tsx
   thành slides-html/ HTML tĩnh, mở là chạy, không cần install. Mỗi deck một trang +
   index.html. Trang có: mục lục lọc được, điều hướng j/k, toggle sáng/tối, toggle
   speaker notes, và print style để in PDF. KHÔNG được sửa gì trong canvases/.

8. _tools/qa-html-slides.mjs — kiểm output đã build: đủ trang không thừa trang, mỗi
   trang có doctype/lang/meta/đúng 1 h1/id không trùng/<main>, mọi anchor và link nội
   bộ resolve, mọi asset tham chiếu có trên đĩa, mọi var() CSS có định nghĩa, không rò
   placeholder hay token, UTF-8 sạch không mojibake không U+FFFD, và không mất chữ nào
   khi dịch từ canvas sang HTML.

9. package.json — script "qa" chain cả 4 script kiểm; "build:slides", "qa:slides",
   "clean:slides". devDependencies GHIM ĐÚNG PHIÊN BẢN, không dùng ^ hay ~.

10. .github/workflows/qa.yml — chạy trên push và PR vào main: checkout, setup-node,
    git diff --check, rồi lần lượt audit-selfstudy, qa-canvases, check-diagram-links,
    test-strip-literals. permissions: contents: read. timeout 10 phút.

11. .gitignore — bỏ node_modules/, file tạm, và các script probe dùng một lần
    (_tools/tmp-*.js). Script probe không idempotent thì đừng commit: người sau không
    biết cái nào chạy lại được.

RÀNG BUỘC:
- Mọi script chạy được bằng node thuần, không cần bash. Máy có thể không có WSL và
  không có Git Bash — gói mẫu phải viết lại qa-canvases từ .sh sang .js đúng vì lý do này.
- Script phải in ra được cả khi chạy trong PowerShell. Đừng dựa vào pipe của bash.
- Non-destructive: chỉ đọc, trừ builder ghi slides-html/ và audit ghi file .txt của nó.

VERIFY: chạy npm run qa, dán toàn bộ output. Rồi thử LÀM SAI có chủ ý một chỗ (bỏ một
</details>, hạ một fontSize xuống 9, đổi một slide id) và chứng minh script BẮT ĐƯỢC.
Script QA chưa từng fail là script chưa biết nó có hoạt động hay không.
```

---

# PROMPT 7 — soát toàn gói và viết báo cáo nhận xét (1 lần, cuối)

```
Bạn nhận gói học liệu <MÃ MÔN> vừa sinh xong. Việc của bạn là SOÁT và VIẾT NHẬN XÉT,
KHÔNG sửa file nào.

Thư mục: <ĐƯỜNG DẪN>

BƯỚC 1 — đo bằng script, không đo bằng cảm giác:
  npm run qa
Dán output. Rồi lập bảng so với chuẩn INS2053:

  | Lớp | Files | Words | details | Try It | answers | errTable |
  | ebook       | 16 | 119.799 | 214 | 58 | —     | 15/16 |
  | exercises   | 15 |  26.307 |  56 |  0 | 15/15 |  0/15 |
  | homework    | 15 |   8.617 |   0 |  0 |  0/15 |  0/15 |
  | slides      | 15 |  11.920 |   0 |  0 | —     | —     |
  | exams       |  6 |   8.463 | —   | —  | có    | —     |
  | project     |  3 |   6.864 | —   | —  | —     | —     |
  | references  |  1 |   1.112 | —   | —  | —     | —     |
  | TỔNG        |    | 183.082 |     |    |       |       |
  canvases: 17 deck / 484 slide / 60 diagram

BƯỚC 2 — đọc THẬT, không đọc mục lục:
  - ít nhất 5 chương ebook, trải đều đầu/giữa/cuối kỳ
  - 5 exercise và 5 homework tương ứng
  - 3 canvas deck
  - toàn bộ examples/
  - cả 9 file exams/ và project/
Mọi nhận xét phải có TRÍCH DẪN cụ thể: đường dẫn file kèm số dòng, hoặc tên chương và
tên mục. Nhận xét không có trích dẫn thì bỏ đi.

BƯỚC 3 — soát 8 nhóm sau, mỗi nhóm nêu bằng chứng + một đề xuất làm được ngay:

 1. Chương nào MỎNG hơn 6.200 từ. Đây là lỗi hay xảy ra nhất khi sinh từ ebook nguồn,
    vì nguồn chỉ dày 1/4. Nêu số từ thật của từng chương.
 2. Chương nào THIẾU khối: không đủ 4 Try It, thiếu **Expected result:**, thiếu bảng
    COMMON ERRORS, dưới 12 <details>, thiếu cross-ref diagram.
 3. Độ ĐỀU giữa các chương: số mục ##/chương, chênh lệch max/min. Nhắc: đếm mục ## phải
    BỎ dòng nằm trong code fence, không thì ra số sai. Gói mẫu từng bị đếm sai 31,5
    trong khi số thật là 13,6.
 4. MẬT ĐỘ CHỮ và khả năng đọc: slide nào lạm dụng bảng/bullet ở chỗ đáng lẽ dùng hình.
 5. HÌNH ẢNH: gói có bao nhiêu diagram thật, tỉ lệ diagram/slide. Chỗ nào trong từng
    chương ĐÁNG có hình mà chưa có, và nên là hình gì.
 6. ASSET HỎNG: mọi href/src trong examples/ trỏ tới file không tồn tại VÀ không được
    README giải thích là cố ý.
 7. TÍNH NHẤT QUÁN đường dẫn project giữa spec.md, milestones.md, examples/, 15
    homework và 15 exercise. Một chỗ lệch là sinh viên sai suốt kỳ.
 8. SINH VIÊN QUỐC TẾ: thuật ngữ dùng mà chưa giải thích, giả định về bối cảnh Việt
    Nam, câu quá dài hoặc dùng thành ngữ.

BƯỚC 4 — viết báo cáo BẰNG TIẾNG VIỆT, bố cục:
  0. Kết luận trước, giải thích sau
  1. Điểm mạnh (nói trước cho công bằng, có bằng chứng)
  2..N. Từng vấn đề: bằng chứng → tác động lên sinh viên → đề xuất cụ thể
  N+1. Việc nên làm, xếp theo tác động/công sức
  N+2. Điều tôi CHƯA kiểm chứng được, và vì sao

RÀNG BUỘC — mục N+2 là bắt buộc, không được bỏ:
Nói rõ cái gì bạn đo được bằng script, cái gì chỉ đọc bằng mắt, cái gì không kiểm được
(ví dụ: không render được canvas nên không biết diagram trông thế nào thật; không chạy
được code nếu không có server). Đừng nói "đã verify" chung chung.

Nếu phát hiện một nhận xét trước đó của mình là SAI, ghi hẳn một mục "tôi rút lại" kèm
số đo đúng. Gói mẫu có mục 6 "Ba nhận xét trước đây của tôi — TÔI RÚT LẠI" đúng vì
việc này quan trọng hơn là giữ mặt.

ĐỪNG sửa file. Đây là việc phân tích. Muốn tạo file markdown cho báo cáo thì hỏi trước.
```

---

## Bảng đối chiếu nhanh: nguồn → đích

Dùng bảng này để biết mỗi prompt đang lấp khoảng cách nào.

| Hạng mục | INS3064 (nguồn) | Chuẩn cần đạt | Prompt lấp |
|---|---|---|---|
| Độ dài chương | 11–20 KB | 46–68 KB, 6.200–10.000 từ | P2 |
| Đáp án tự học | `Đáp án: ____` điền tay | 12–13 khối `<details>` | P2 |
| Bảng lỗi | không có | 4 cột, ≥9 dòng, 15/16 chương | P2 |
| Try It + Expected result | không có | 4 khối/chương | P2 |
| Diagram | 1 sơ đồ ASCII | 3 SVG/buổi, 60 toàn gói | P4 |
| Cross-ref ebook↔slide | không có | dòng `> 🖼 **Diagram:**`, kiểm được bằng script | P2 + P4 |
| exercises riêng | lẫn trong chương | 15 file, 15/15 có answer key | P3 |
| homework riêng | lẫn trong chương | 15 file, rubric 10 điểm | P3 |
| Đề thi + lời giải | không có | midterm + final, có solution | P5 |
| Capstone spec | README hứa, không có file | spec + milestones + rubric | P5 |
| Website mẫu | không có | `examples/` chạy được | P5 |
| Slide | 15 HTML viết tay | 15 Marp + 17 canvas + build HTML | P4 + P6 |
| QA / CI | không có | 4 script + workflow | P6 |
| File stub rỗng | 10 file bên `English/` | 0 | P7 phát hiện |

---

## Năm cái bẫy — đọc trước khi chạy prompt đầu tiên

1. **Chương mỏng.** Lỗi số một. Model đọc nguồn 11 KB rồi sinh ra 15 KB và tưởng đã
   xong. Chỉ tiêu 6.200 từ phải nằm trong prompt và phải đếm sau mỗi chương.

2. **Đếm bằng regex.** Đếm `<details>`, mục `##`, hay dòng diagram bằng regex thuần sẽ
   ra số sai vì code fence và bảng markdown. Ba con số sai trong gói mẫu (2.104 vs 445;
   1.147 vs 496; 31,5 vs 13,6) đều từ nguyên nhân này, và cả ba đã dẫn tới đề xuất sai.
   Dùng state machine.

3. **Đường dẫn project không nhất quán.** Nếu `spec.md` nói các trang nằm phẳng ở gốc
   mà một homework lại viết `../css/style.css`, sinh viên làm theo sẽ mất CSS và không
   hiểu vì sao. Chốt cấu trúc ở P1, rồi mọi prompt sau đọc lại `spec.md` chứ không tự nhớ.

4. **Diagram minh hoạ tiêu đề.** Diagram vẽ lại đúng cái tiêu đề slide đã nói thì không
   dạy gì. Diagram phải đặt đúng-cạnh-sai và có phép tính thật. Đây là lỗi thứ 4 trong
   `HANDOVER-canvas-diagrams.md` mục 2, và là lý do 60 diagram của gói mẫu phải viết lại.

5. **Tin README của nguồn.** README của INS3064 hứa `projects/mini_projects/` và
   `projects/final_project/`; trên `main` không có thư mục `projects/` nào. Luôn đọc cây
   file thật, đừng đọc mô tả.

---

## Cách chạy 15 vòng mà không bị trôi

Chạy tuần tự theo buổi, không nhảy:

```
buổi 01: P2 → P3 → P4 → npm run qa   (phải PASS mới đi tiếp)
buổi 02: P2 → P3 → P4 → npm run qa
...
buổi 15: P2 → P3 → P4 → npm run qa
```

Sau mỗi buổi, commit riêng một commit. Lý do: khi buổi 09 phát hiện quy ước đặt tên sai
từ buổi 03, có commit riêng thì thấy ngay chỗ nào cần sửa.

Cổng chặn: `npm run qa` chưa in PASS thì không sang buổi sau. Nợ kỹ thuật ở học liệu
tích lũy nhanh hơn ở code, vì 15 buổi phải nhất quán với nhau chứ không chỉ đúng riêng lẻ.
