# Nhận xét học liệu INS2053 — Web Authoring and Web Management

Người nhận xét: Claude (Opus 5) — 30/08/2026
Phạm vi đã đọc: `ebook/` (16 chương, 89.355 từ), `slides/` (15 deck Marp),
`canvases/` (17 deck, 60 diagram SVG), `exercises/` (15), `homework/` (14),
`exams/` (6), `project/` (3), `examples/student-club/`, `references/`, `schedule.md`.

Nhận xét dưới đây dựa trên số đo thực tế trên file, không phải cảm nhận. Chỗ nào
tôi chưa kiểm chứng được thì tôi nói rõ là chưa kiểm chứng.

---

## 0. Kết luận trước, giải thích sau

Bộ học liệu này **tốt hơn phần lớn học liệu web nhập môn mà tôi từng đọc** ở ba
điểm: khối lượng thực hành, tính nhất quán giữa 5 lớp tài liệu (ebook → slide →
exercise → homework → exam), và cách chương nào cũng được chia nhỏ thành đoạn
ngắn. Sinh viên yếu sẽ không bị "ngợp chữ" — điều này tôi đã đo và xác nhận.

Vấn đề lớn nhất **không phải là chất lượng nội dung**. Nó từng là:

> **60 diagram vừa được vẽ cho canvas hiện đang không được ebook hay slide nào
> trỏ tới.** Sinh viên đọc ebook ở nhà sẽ không bao giờ biết là có hình để xem.

> **CẬP NHẬT 31/08/2026 — đã sửa.** Cả 15 chương ebook, phụ lục A, 15 slide deck,
> `README.md` và `schedule.md` giờ đều trỏ sang deck canvas tương ứng. Chi tiết và
> cách đã kiểm chứng: mục **7.1**. Cùng lượt đó ba lỗi thống nhất khác cũng được sửa
> (150 vs 135 phút, định dạng khối session-info, cách ghi CLO) — mục **7.1b**.
> Phần còn lại của tài liệu này giữ nguyên như lúc viết, để bạn thấy được cả trước
> và sau.

> **CẬP NHẬT 02/09/2026 — mục 5.3, 7.3 và 7.4 đã xong, và một vấn đề mới được
> phát hiện rồi sửa.** `<details>` giờ có ở 15/16 chương (trước 2/16), mỗi chương
> có bảng lỗi thường gặp và 4–5 khối `Try It Yourself`, chương 15 dạy cả
> `min-width` lẫn `max-width`. Vấn đề mới: **`exercises/` chỉ có 1/15 file có đáp
> án** — đây là điểm chặn thật với sinh viên tự học, và không mục nào trong bản
> nhận xét gốc bắt được. Giờ là 15/15. Toàn bộ số đo mới ở **mục 9**; mục 4 có
> một con số đã hết đúng và được nói rõ ở 9.3.

Ba vấn đề còn lại, theo thứ tự mức độ:
1. **Slide là tài liệu yếu nhất về mặt trực quan** — 15/15 deck có 0 hình markdown, và 3 deck (03, 10, 13) có 0 dòng sơ đồ, trong đó có buổi ảnh và buổi form. Deck nhiều bảng nhất là 12 và 15 (27 và 24 dòng bảng, đo có bỏ code fence).
2. **Toàn bộ học liệu dạy `max-width` (desktop-first), không dạy `min-width`** — 27/27 breakpoint trong cả bộ là `max-width`, không có một breakpoint `min-width` nào. Đây là lệch so với chuẩn ngành hiện nay.
3. **Vài chương lệch về mật độ hình và tự kiểm tra** — chương 06 chỉ có 5 dòng sơ đồ dù là chương layout, `<details>` tự kiểm tra chỉ có ở 2/16 chương, và phụ lục A chỉ 1.197 từ so với 4.303–7.617 từ mỗi chương. (Độ dài chương thì ĐỀU — xem 5.1, tôi đã rút lại nhận xét cũ.)

---

## 1. Những điểm mạnh — nói trước cho công bằng

**1.1. Chia nhỏ nội dung rất tốt.** Tôi đo đoạn văn xuôi dài nhất (đếm ngoài các
khối code) của từng chương: dài nhất là **8 dòng** (chương 08, dòng 104), 12/16
chương có đoạn dài nhất chỉ **1–2 dòng**. Nghĩa là gần như không có chỗ nào sinh
viên phải đọc một khối chữ dài. Với sinh viên quốc tế yếu tiếng Anh, đây là
quyết định thiết kế đúng và quan trọng hơn nhiều thứ khác.

**1.2. Khối lượng thực hành thật.** 17.148 từ exercise + 7.315 từ homework +
496 khối code trong ebook (716 khối trên toàn bộ học liệu). Sinh viên có việc để
làm, không chỉ có việc để đọc.

**1.3. Chương 08 và 14 có `<details>` — 36 khối mỗi chương.** Đây là mô hình
self-check đúng: sinh viên tự thử rồi mới bung đáp án. Nên nhân rộng ra các
chương khác (xem mục 5).

**1.4. Xử lý nội dung lỗi thời khá tỉnh táo.** Chương 10 nói thẳng về Flash:
"If you find old tutorials or textbooks that teach Flash, **ignore them**." Và
diagram `SpryVsModern` / `SpryRemoval` ở buổi 14 dạy cách *thay thế* Spry chứ
không dạy Spry như thể nó còn sống. Với một môn học mang tên Dreamweaver, đây là
cách xử lý trung thực và đúng nghề.

**1.5. `examples/student-club/` thiếu ảnh là CỐ Ý và đã ghi rõ.** Tôi đã kiểm
tra `README.md` của example đó: *"That is intentional... the pages still work...
This mirrors what you will do in your own project."* Trước đó tôi đã ghi nhận
đây là lỗi — **tôi rút lại nhận xét đó, nó không phải lỗi.**

**1.6. Ebook KHÔNG hề trống trực quan.** Nó có sơ đồ ASCII / box-drawing:
chương 11 = 87 dòng, ch14 = 51, ch02 = 43, ch12 = 43, ch10 = 37, ch15 = 36.
Tổng cộng 445 dòng sơ đồ. Đây không phải là ebook chỉ có chữ.

---

## 2. Vấn đề #1 — 60 diagram từng bị "mồ côi" (ĐÃ SỬA 31/08/2026)

> **Trạng thái:** đã sửa. Bảng mapping ở cuối mục này giờ nằm thật trong 15 chương
> ebook (dòng `🖼 Diagrams:`) và 15 slide deck (slide tiêu đề). Đọc mục 7.1 để biết
> đã kiểm chứng thế nào. Phần dưới giữ nguyên nguyên văn lúc phát hiện vấn đề.

Số đo lúc phát hiện: **0 tham chiếu** từ ebook hoặc slide sang bất kỳ deck canvas nào.
(Một kết quả grep trùng chữ "canvas" trong `ebook/10` là thẻ HTML `<canvas>`,
không phải tham chiếu học liệu.)

Hệ quả thực tế:
- Sinh viên đọc ebook lúc 11 giờ đêm không biết là có hình `BoxModelDiagram`.
- Giảng viên dạy buổi 12 phải tự nhớ là buổi đó có 4 diagram nào.
- 60 diagram chỉ sống được nếu người mở canvas là chính bạn.

**Cách sửa, mỗi chương một dòng.** Chèn vào ngay dưới tiêu đề `#` của mỗi chương
ebook và vào slide đầu của mỗi deck một dòng như sau:

```markdown
> **Xem hình:** mở `canvases/buoi-04.canvas.tsx` — `RuleAnatomy`,
> `BoxModelDiagram`, `SpecificityScale`.
```

Bảng tra cứu đầy đủ để bạn dán vào (đây là mapping thật, đã kiểm tra):

| Buổi | Diagram trong deck canvas |
|---|---|
| 01 | `RequestResponseCycle`, `TagAnatomy`, `HeadVsBody` |
| 02 | `PathResolver`, `DotDotLadder`, `GitFlow` |
| 03 | `HeadingOutline`, `ImgAnatomy`, `AltTextCompare`, `FormatChooser` |
| 04 | `RuleAnatomy`, `BoxModelDiagram`, `SpecificityScale` |
| 05 | `SemanticSkeleton`, `DisplayTypes`, `FlexAxesDiagram` |
| 06 | `MultiPageNav`, `LinkTargets`, `ActiveClassWalk` |
| 07 | `GoogleFontsFlow`, `FontStackChain`, `PolishLab` |
| 08 | `CourseMap`, `ExamBudget`, `MarkLosers` |
| 09 | `TableAnatomy`, `SpanGrid`, `TableStylePreview` |
| 10 | `VideoAnatomy`, `CodecFallback`, `AutoplayRules`, `IframeEmbed` |
| 11 | `SiteMap`, `DryPrinciple`, `VisualHierarchy`, `BriefToSpec` |
| 12 | `VSCodeLayout`, `EmmetExpand`, `ValidatorReport`, `DevToolsLoop` |
| 13 | `FormDataFlow`, `InputTypeGallery`, `LabelWiring` |
| 14 | `SpryVsModern`, `DetailsAccordion`, `DropdownAnatomy`, `SpryRemoval` |
| 15 | `ViewportMeta`, `MobileFirstLadder`, `MediaQueryAnatomy`, `ResponsiveDevices` |

Công sức: khoảng 31 dòng thêm vào (16 chương + 15 deck). Giá trị: 60 diagram từ
chỗ vô hình thành chỗ dùng được.

---

## 3. Vấn đề #2 — slide là mắt xích yếu nhất, và nó bù bằng bảng

Số đo từng deck, **đã bỏ qua nội dung trong code fence** (đây là điểm khác biệt
quan trọng — xem 6.3). Định nghĩa của từng cột: `dòng bảng` = dòng bắt đầu bằng
`|` **ngoài** code fence; `sơ đồ` = dòng chứa ký tự vẽ khung Unicode ngoài code
fence; `hình` = số ảnh markdown `![](...)`.

| Deck | dòng | dòng bảng | sơ đồ | hình |
|---|---|---|---|---|
| 01 | 194 | 7 | 28 | 0 |
| 02 | 177 | 14 | 11 | 0 |
| **03** | 191 | **24** | **0** | 0 |
| 04 | 205 | 10 | 12 | 0 |
| 05 | 216 | 9 | 24 | 0 |
| **06** | 179 | 6 | **1** | 0 |
| 07 | 209 | 12 | 8 | 0 |
| 08 | 195 | 11 | 9 | 0 |
| 09 | 227 | 6 | 7 | 0 |
| **10** | 200 | 12 | **0** | 0 |
| 11 | 214 | 12 | 10 | 0 |
| **12** | 171 | **27** | 12 | 0 |
| **13** | 180 | **17** | **0** | 0 |
| **14** | 187 | 12 | **1** | 0 |
| 15 | 228 | 24 | 5 | 0 |

Ba điều đọc ra được từ bảng này:

**3.1. Năm deck gần như không có sơ đồ: 03, 10, 13 (0 dòng), 06 và 14 (1 dòng).**
Đây đúng là 5 buổi *cần hình nhất*: ảnh và định dạng ảnh (03), layout (06), video
(10), form (13), thay thế Spry (14). Cả 5 buổi này giờ đã có diagram canvas —
chỉ cần trỏ tới, và mục 2 đã làm việc đó.

**3.2. Deck 15 đã được cắt: 42 → 24 dòng bảng.** Bảng "Full Course Recap" 15 dòng
liệt kê lại cả 15 buổi trên một slide đã được thay bằng 4 dòng gộp theo khối, và
bảng "7-slide presentation" 7 dòng thành danh sách. Slide 15 nói về responsive —
chủ đề mà bảng là dạng trình bày *tệ nhất có thể*, vì bản chất nó là hình học;
diagram `ResponsiveDevices` làm đúng việc mà bảng đó đang cố làm.

**3.3. Deck 12 KHÔNG có bảng 36 dòng — tôi đã đo sai.** 27 dòng bảng của nó nằm
rải trong bốn bảng, bảng lớn nhất chỉ 7 dòng, hoàn toàn chấp nhận được. Chín dòng
chênh lệch so với con số cũ là một sơ đồ ASCII mô phỏng cửa sổ VS Code **nằm
trong code fence**. Không cần cắt gì ở deck 12. Sau khi đo lại có bỏ fence, bảng
lớn nhất trong cả 15 deck là 10 dòng (deck 13) — **không deck nào còn vấn đề về
bảng dài.**

**3.4. Không deck nào có hình.** Nếu bạn chỉ làm được một việc nữa cho slide, thì
chèn ảnh export của diagram canvas vào các slide chủ đề chính. Slide Marp hỗ trợ
`![](path)` bình thường.

---

## 4. Vấn đề #3 — toàn bộ học liệu dạy desktop-first, gần như bỏ mobile-first

Số đo. Lưu ý: tôi chỉ đếm `min-width`/`max-width` **nằm trong `@media`**, vì
`max-width: 960px` trên `.container` là bề rộng layout, không phải breakpoint —
gộp hai thứ đó lại sẽ ra một con số phóng đại.

| Thư mục | breakpoint `min-width` | breakpoint `max-width` | `max-width` ngoài `@media` |
|---|---|---|---|
| ebook | **0** | 14 | 50 |
| slides | **0** | 2 | 10 |
| exercises | **0** | 6 | 9 |
| homework | **0** | 2 | 8 |
| exams | **0** | 3 | 6 |
| project | **0** | 0 | 5 |
| **tổng** | **0** | **27** | 88 |

Con số đáng chú ý là cột đầu: **không có một breakpoint `min-width` nào trong
toàn bộ học liệu.** Cả 27 breakpoint đều là `max-width`, tức là 100% desktop-first
(viết layout desktop trước, rồi huỷ bớt khi màn hình nhỏ lại).

`min-width` chỉ xuất hiện 9 lần và không lần nào là breakpoint: 6 lần là
`min-width: 200px` kiểu chiều rộng tối thiểu của cột, 3 lần là *nhắc tên* khái
niệm mobile-first trong bảng so sánh ở chương 15.

**Đây không phải là "sai".** `max-width` chạy đúng, và bài thi của bạn đang chấm
theo nó (checklist đề thi có dòng "Write a CSS media query using
`@media (max-width: ...)`"). Nhưng ba điều đáng cân nhắc:

1. **Chuẩn ngành hiện nay là mobile-first (`min-width`).** Bootstrap, Tailwind,
   MDN đều dạy `min-width`. Sinh viên đi thực tập sẽ gặp `min-width` trong mọi
   codebase và không nhận ra đó vẫn là thứ mình đã học.
2. **Thứ tự CSS quan trọng và học liệu không nói rõ.** Hai rule cùng trọng số
   thì rule viết *sau* thắng. Với `max-width` thì base phải viết trước; với
   `min-width` cũng vậy nhưng nội dung đảo ngược. Sinh viên viết `@media` trước
   base sẽ thấy code "không có tác dụng" và không hiểu tại sao.
3. **Sinh viên yếu thấy mobile-first dễ hơn**, vì bắt đầu từ 1 cột rồi *thêm* cột
   là cộng, còn desktop-first là trừ.

**Tôi ĐÃ xử lý phần canvas:** diagram `MobileFirstLadder` (buổi 15) hiện dạy cả
hai hướng và footer ghi rõ: *"Both directions work. min-width adds rules as the
screen grows; max-width cancels them as it shrinks. Your exercises use max-width,
so read both."* Diagram `MediaQueryAnatomy` giải thích thẳng cơ chế thứ tự.

**Tôi KHÔNG sửa ebook / exercise / homework / exam** — vì đó là thay đổi nội dung
được chấm điểm, và đó là quyết định của bạn, không phải của tôi. Nếu bạn muốn
đổi, việc đó nên làm ở đầu kỳ chứ không giữa kỳ, và phải đổi đồng thời cả 5 lớp
tài liệu, nếu không sinh viên sẽ học một kiểu và bị chấm một kiểu.

Đề xuất tối thiểu, ít rủi ro nhất: **thêm một mục ~200 từ vào chương 15** nói
"có hai hướng, môn này dùng `max-width`, ngoài ngành người ta dùng `min-width`,
đây là cách chuyển đổi" — không đổi gì trong bài tập hay đề thi.

---

## 5. Vấn đề #4 — độ đều giữa các chương

| Chương | từ | `##` | `###` | `<details>` | code | sơ đồ |
|---|---|---|---|---|---|---|
| 01 | 6.394 | 15 | 36 | 0 | 19 | 19 |
| 02 | 6.154 | 12 | 32 | 0 | 36 | 43 |
| 03 | 6.524 | 12 | 36 | 0 | 35 | 15 |
| 04 | 5.367 | 15 | 41 | 0 | **50** | **9** |
| 05 | 4.789 | 13 | 32 | 0 | 38 | 16 |
| **06** | 5.028 | 13 | 32 | 0 | 34 | **5** |
| 07 | 5.393 | 13 | 48 | 0 | 47 | 23 |
| **08** | 6.422 | 11 | 13 | **36** | 8 | **0** |
| 09 | **4.303** | 9 | 27 | 0 | 29 | 19 |
| 10 | 5.998 | 12 | 33 | 0 | 38 | 37 |
| 11 | 6.554 | 19 | 36 | 0 | 27 | **87** |
| 12 | **7.617** | 17 | 51 | 0 | 41 | 43 |
| 13 | 5.492 | 11 | 37 | 0 | 37 | 26 |
| **14** | 5.460 | 9 | 23 | **36** | 34 | 51 |
| 15 | 7.172 | **23** | 42 | 1 | 22 | 36 |
| **phụ lục A** | **1.197** | 3 | 10 | 0 | 1 | 16 |

Mọi số trên đều đếm **ngoài** các khối code. Điều này quan trọng: cách đếm cũ của
tôi đếm cả `##` nằm trong code fence, và nó đã cho ra một kết luận sai (xem 5.1).

Những chỗ lệch đáng chú ý:

**5.1. Độ dài chương thực ra ĐỀU — tôi rút lại nhận xét trước.** Trước đó tôi
viết "chương 11 có 37 mục `##`, gấp 3 lần trung bình". Sai. Đếm lại đúng cách
(bỏ các dòng trong code fence) thì chương 11 có **19** mục `##`; 18 dòng còn lại
là `## How to View`, `## Tech Stack`, `## 1. Goal`… nằm bên trong các khối code
mẫu README và template đặc tả — tức là *nội dung dạy học*, không phải mục của
chương. Số thật: trung bình **13,6** mục `##`/chương, thấp nhất 9 (ch09, ch14),
cao nhất 23 (ch15). Đây là độ đều tốt. **Không cần tách chương nào.**

Cái lệch thật nằm ở chỗ khác — 5.2 đến 5.5 dưới đây.

**5.2. Chương 06 chỉ có 5 dòng sơ đồ, thấp nhất bộ (trừ ch08).** Chương này là
"page layouts continued" — chủ đề *hình học nhất* của cả môn. Chương 05 cùng chủ
đề có 16 dòng, chương 11 có 87. Chương 06 nên có ít nhất 3 sơ đồ: cấu trúc
container lồng nhau, float/flex khác nhau ở đâu, và một layout hoàn chỉnh đi từ
wireframe → HTML → CSS.

**5.3. `<details>` chỉ có ở chương 08 và 14.** Cả hai đều là 36 khối — rõ ràng
là cùng một khuôn mẫu và nó hiệu quả. Nhưng 13 chương còn lại có 0. Sinh viên
yếu cần cơ chế "thử rồi mới xem đáp án" ở *mọi* chương, không chỉ chương ôn thi.
Đề xuất: mỗi chương thêm 5–8 `<details>` ở đúng chỗ sinh viên hay tắc.

**5.4. Chương 04 có 50 khối code nhưng chỉ 9 dòng sơ đồ.** Đây là chương CSS —
box model, specificity. Tỉ lệ code/hình lệch nhất bộ. Hai diagram
`BoxModelDiagram` và `SpecificityScale` đã có sẵn trong canvas buổi 04; chỉ cần
trỏ tới (mục 2).

**5.5. Phụ lục A chỉ 1.197 từ.** Nó đang là ghi chú hơn là phụ lục. Nếu nó có
nhiệm vụ trả lời câu "vì sao học Dreamweaver năm 2026", thì câu đó xứng đáng
2.500–3.000 từ và nên được trỏ tới từ chương 01 và 14.

---

## 6. Ba nhận xét trước đây của tôi — TÔI RÚT LẠI

Để bạn không đi sửa những thứ không hỏng:

**6.1. "Ebook có nhiều đoạn chữ dài (text wall)." — SAI, rút lại.**
Phép đo cũ của tôi đếm *xuyên qua* các khối code, nên báo có đoạn 152 / 74 / 46
dòng. Đo lại đúng cách (chỉ đếm dòng ngoài code fence): đoạn dài nhất toàn bộ
ebook là **8 dòng**, và 12/16 chương có đoạn dài nhất là **1–2 dòng**. Ebook
được chia nhỏ rất tốt. Không cần sửa gì.

**6.2. "`examples/student-club/` có 7 tham chiếu ảnh bị hỏng." — SAI, rút lại.**
`examples/student-club/README.md` ghi rõ đây là cố ý, mục "About the missing
images and media": *"That is intentional. To run this example fully: 1. Create the
`images/` and `media/` folders. 2. Add your own files with the same names, or
3. Leave them out — the pages still work... This mirrors what you will do in your
own project."* Đây là quyết định dạy học có chủ đích. Không cần sửa gì.

**6.3. "Deck 12 có 36 dòng bảng." — SAI, rút lại (31/08/2026).**
Vẫn đúng lỗi cũ: đếm dòng có ký tự `|` xuyên qua code fence. 9 dòng trong đó là
một sơ đồ ASCII mô phỏng cửa sổ VS Code (`| ACTIVITY BAR | SIDEBAR | EDITOR AREA |`)
nằm trong khối code, không phải bảng. Đo có bỏ fence: deck 12 có **27 dòng bảng
chia thành 4 bảng, bảng lớn nhất 7 dòng** — không có bảng nào quá dài. Deck 12
**không cần cắt**. Deck 15 thì đúng là có một bảng 15 dòng (recap 15 buổi) và đã
được cắt xuống 5 dòng theo giai đoạn, còn tổng deck 15 từ 42 → 24 dòng bảng.

Tôi cũng làm mềm một nhận xét thứ tư: **"ebook không có hình" là không chính
xác.** Đúng là ebook có **0 hình markdown** (`![]()`) trên toàn bộ 16 chương,
nhưng nó có **445 dòng sơ đồ ASCII/box-drawing**. Vấn đề thật là *slide*, không
phải ebook (mục 3).

---

## 7. Việc nên làm, theo thứ tự

Xếp theo tỉ lệ *giá trị / công sức*. Bạn có thể dừng ở bất kỳ mức nào — mỗi mức
đứng độc lập, không cần làm mức sau mới có tác dụng.

### Mức 1 — nửa buổi, giá trị cao nhất

**7.1. Trỏ ebook và slide sang 60 diagram canvas — ĐÃ LÀM (31/08/2026).**
Cụ thể đã làm:

- 15 chương ebook: khối session-info giờ có dòng `🖼 Diagrams:` ghi rõ tên deck
  **và tên từng diagram bên trong**. Đã kiểm chứng bằng script đối chiếu với source:
  15/15 chương khớp, 51 tên được dẫn = 51 hàm thật.
- Phụ lục A: có khối `📌 APPENDIX INFORMATION` riêng, ghi thật thà là "không có deck
  riêng", chỉ trỏ sang hai deck toàn khoá.
- 15 slide deck: slide tiêu đề in đủ ba đường dẫn anh em (`Read:` / `Practise:` /
  `Diagrams:`). Đã kiểm tra cả 45 đường dẫn đều tồn tại trên đĩa.
- `README.md`: **trước đó bảng thư mục không hề có dòng `canvases/`** —
  `grep -i canvas README.md` ra 0 kết quả. Giờ đã có, và bước 1 của mục "How to teach
  a session" nói rõ lúc nào thì chiếu deck.
- `schedule.md`: thêm bảng *Material for each session* nêu quy tắc đặt tên theo `NN`.

Còn lại: trỏ **theo từng mục** trong thân chương (dòng hiện tại cho biết chương có
những diagram nào, chưa cho biết diagram nào minh hoạ đoạn nào). Bảng ở mục 2 vẫn
dùng được cho việc đó.

**7.1b. Ba lỗi thống nhất khác cũng đã sửa cùng lượt (31/08/2026).**

- **Xung đột 150 vs 135 phút.** `ebook/07`–`ebook/15` ghi "3 periods (≈ 135 minutes)",
  trái với `schedule.md:6` và `README.md:7`. Một tiết VNU là 50 phút, nên 3 tiết =
  **150**; 135 là sai. Đã sửa cả 9 chương; `grep -rn '135 min'` toàn bộ package giờ
  không ra gì.
- **Khối session-info có 3–4 định dạng khác nhau.** Đã chuẩn hoá về một định dạng
  canh cột với đúng sáu nhãn, 15/15 chương.
- **Cách ghi CLO tự phát.** Nhiều chương diễn giải lại CLO (`CLO-2: Apply CSS
  styling…`) — những chuỗi đó **không có trong đề cương**. Giờ cả 15 chương dùng bản
  dịch ngắn của 5 CLO nguyên văn đã lưu ở `_archive/ins2053_qa_inventory.md` §9.3.
  Lưu ý chính file archive đó cũng cảnh báo: ánh xạ CLO-theo-buổi của đề cương nói
  *buổi nào cũng đạt cả 5 CLO*, tức không có giá trị phân biệt — nên phần gán CLO
  cho từng chương ở đây là **thu hẹp có lập luận**, không phải trích đề cương.

**7.2. Cắt bảng slide quá dài — ĐÃ LÀM một nửa (31/08/2026).** Deck 15 đã giảm từ
42 xuống **24 dòng bảng** (bảng "Full Course Recap" 15 dòng thay bằng 5 mốc + một
dòng trỏ sang `schedule.md`; bảng breakpoint 5 dòng thay bằng 3 dòng code CSS thật).
Bảng lớn nhất còn lại trong deck 15 là 6 dòng. **Deck 12 không cần cắt** — xem 6.3,
số "36" là tôi đo sai. Đo lại toàn bộ 15 deck có bỏ code fence: bảng dài nhất trong
cả bộ giờ là **10 dòng** (deck 13, bảng các loại `<input>` — hợp lý cho nội dung đó).

### Mức 2 — một đến hai buổi

**7.3. Thêm mục ~200 từ về `min-width` vào chương 15.** Nói rõ có hai hướng, môn
này chấm theo `max-width`, ngoài ngành dùng `min-width`. **Không** đổi exercise,
homework hay đề thi — xem lý do ở mục 4.

**7.4. Thêm 5–8 `<details>` vào mỗi chương chưa có.** Khuôn mẫu đã có sẵn ở
chương 08 và 14, chỉ cần nhân bản đúng chỗ sinh viên hay tắc: sau mỗi đoạn có
code mẫu, hỏi "cái này in ra gì?" rồi mới bung đáp án.

**7.5. Thêm 3 sơ đồ vào chương 06.** Container lồng nhau, float vs flex khác
nhau ở đâu, và một layout hoàn chỉnh đi wireframe → HTML → CSS.

### Mức 3 — khi có thời gian

**7.6. Xuất ảnh PNG/SVG từ diagram canvas rồi chèn vào slide.** Marp hỗ trợ
`![](path)` bình thường. Việc này biến 15 deck từ 0 hình thành có hình, nhưng cần
một bước export thủ công nên tôi để ở mức 3.

**7.7. Viết phụ lục A cho đủ tầm** — 2.500–3.000 từ trả lời "vì sao học
Dreamweaver năm 2026", trỏ tới từ chương 01 và 14. Hiện nó chỉ 1.197 từ, tức là
đang ở mức ghi chú chứ chưa phải phụ lục.

*(Mục "tách chương 11" trong bản nháp trước đã bị bỏ — xem 5.1, phép đo cũ sai.)*

---

## 8. Điều tôi CHƯA kiểm chứng được

Nói rõ để bạn không tin quá mức vào nhận xét trên:

- **Tôi chưa thấy diagram nào render thật.** Trong máy này không có
  `package.json`, không có `tsconfig.json`, và `qoder/canvas` không resolve được
  — nghĩa là **không có gì được type-check**. Toàn bộ 60 diagram chỉ được kiểm
  bằng 9 bước cấu trúc trong `_tools/qa-canvases.sh` (cân bằng ngoặc, mọi hàm
  đều được slide dùng, `role="img"` + `aria-label`, cỡ chữ ≥ 11px, `url(#id)`
  không treo, id `defs` không trùng, nhãn SVG toàn tiếng Anh, độ rộng chữ ước
  tính không vượt `viewBox`). **Hãy mở một deck trong canvas host và nhìn bằng
  mắt trước khi dạy.**
- **Tôi không đánh giá được độ chính xác kỹ thuật của từng câu trong 89.355 từ
  ebook.** Tôi đọc theo mẫu, không đọc hết từng dòng.
- **Tôi không biết sinh viên của bạn thực sự vướng ở đâu.** Mọi nhận xét về "sinh
  viên yếu cần gì" là suy luận từ thiết kế học liệu, không phải từ dữ liệu lớp.
  Nếu bạn có điểm bài tập hoặc câu hỏi hay gặp, dữ liệu đó đáng tin hơn tôi.
- **Số đo `min-width` / `max-width` ở mục 4 đã được đếm lại đúng cách.** Lần đếm
  đầu của tôi gộp cả `max-width: 960px` trên `.container` vào cùng một con số với
  breakpoint, cho ra "116 vs 9" — con số đó phóng đại và tôi đã bỏ. Số trong mục 4
  bây giờ chỉ đếm `min-width`/`max-width` nằm trong `@media`: **27 breakpoint
  `max-width`, 0 breakpoint `min-width`**. Kết luận không đổi, nhưng số thì khác.

---

## 9. Cập nhật 02/09/2026 — đã làm thêm gì, và số đo mới

Đo lại toàn bộ sau ba lượt sửa (D1–D4 cho ebook/slide, E cho exercise). Mọi số
dưới đây là số **mới**, đo lại từ đầu, không phải số trong các mục trên.

### 9.1. Số đo tổng, đối chiếu với lúc nhận xét đầu

| Lớp tài liệu | file | từ (30/08) | từ (02/09) | thay đổi |
|---|---|---|---|---|
| `ebook/` | 16 | 89.355 | **118.331** | +28.976 |
| `exercises/` | 15 | 17.165 | **25.105** | +7.940 |
| `homework/` | 15 | 7.315 | 7.858 | +543 |
| `slides/` | 15 | — | 11.884 | — |
| `exams/` | 6 | — | 8.130 | — |
| `project/` | 3 | — | 6.627 | — |
| `references/` | 1 | — | 1.112 | — |
| **tổng** | **71** | — | **179.047** | — |

Ebook theo chương, số mới (mọi chương 6.2k–10k từ, trừ phụ lục A):

| Chương | dòng | từ | Try It | `<details>` | trỏ canvas |
|---|---|---|---|---|---|
| 01 | 1.201 | 8.140 | 5 | 13 | 5 |
| 02 | 1.419 | 7.857 | 4 | 12 | 3 |
| 03 | 1.509 | 8.286 | 4 | 12 | 4 |
| 04 | 1.514 | 7.272 | 4 | 12 | 4 |
| 05 | 1.385 | 6.680 | 4 | 12 | 4 |
| 06 | 1.362 | 6.886 | 4 | 12 | 4 |
| 07 | 1.362 | 7.310 | 4 | 12 | 5 |
| 08 | 1.168 | 6.478 | 0 | **36** | 4 |
| 09 | 1.364 | 6.260 | 4 | 12 | 4 |
| 10 | 1.468 | 8.103 | 4 | 12 | 4 |
| 11 | 1.396 | 8.785 | 4 | 12 | 5 |
| 12 | 1.724 | 10.024 | 5 | 13 | 5 |
| 13 | 1.549 | 7.678 | 4 | 12 | 4 |
| 14 | 1.492 | 7.765 | 4 | 12 | 5 |
| 15 | 1.490 | 9.474 | 4 | 12 | 4 |
| phụ lục A | 197 | 1.333 | 0 | 0 | 0 |
| **tổng** | | **118.331** | **58** | **206** | **64** |

> **Ghi chú về cách đếm — quan trọng, vì tôi đã đếm sai một lần.** Bản đầu tôi
> đếm `<details>` bằng grep thẳng, ra chương 14 có **58** khối và tổng **253**.
> Sai. Chương 14 dạy cách *thay Spry bằng `<details>`*, nên nó có rất nhiều
> `<details>` **nằm trong khối code làm ví dụ** — đó là nội dung dạy học, không
> phải khối tự kiểm tra. Đếm lại bằng `_tools/audit-selfstudy.js` (có máy trạng
> thái theo dõi code fence, và bỏ cả `` `<details>` `` viết trong dấu backtick):
> chương 14 có **12**, tổng **206**. Đây là đúng cùng loại lỗi mà mục 5.1 và mục 6
> đã mắc với `##`. Bài học: đừng grep markdown, hãy phân tích nó.

### 9.2. Mục 5.3 đã xong — `<details>` giờ có ở 15/16 chương

Trước: 2/16 chương (08 và 14). Giờ: **15/16** — chỉ phụ lục A còn 0, và đó là
ghi chú 1.333 từ chứ không phải chương học. Mỗi chương thường có **12 khối**
(4 khối giải thích trong `Try It Yourself` + 8 câu tự kiểm tra). Chương 08 giữ
36 khối format đề thi.

Kèm theo: mỗi chương có một **bảng lỗi thường gặp 4 cột** (triệu chứng → nguyên
nhân → cách xác nhận trong DevTools → cách sửa), 8–12 dòng, có ở **14/16** chương
(trừ chương 08 và phụ lục A). Đây là thứ mục 5.3 chưa nghĩ tới nhưng quan trọng
hơn: nó dạy sinh viên *tự chẩn đoán*, không chỉ tự kiểm tra.

### 9.3. Mục 7.3 đã xong — chương 15 giờ dạy cả hai hướng

Chương 15 có mục `### 🔍 Desktop-First vs Mobile-First` (bảng so sánh hai hướng,
kèm nhược điểm từng hướng), một `Try It Yourself` yêu cầu viết **cùng một layout
theo cả hai hướng**, và `<details>` giải thích ba lý do mobile-first là chuẩn
ngành. Câu tự kiểm tra Q3 và Q4 kiểm đúng phần này, kể cả chuyện thứ tự
`min-width` phải tăng dần.

Số đo `@media` mới, theo thư mục:

| Thư mục | `max-width` | `min-width` |
|---|---|---|
| ebook | 27 | **5** |
| canvases | 5 | **22** |
| exercises | 13 | **3** |
| slides | 3 | 0 |
| homework | 2 | 0 |
| exams | 3 | 0 |
| examples | 1 | 0 |
| project | 1 | 0 |
| **tổng** | **55** | **30** |

Con số "0 breakpoint `min-width`" ở mục 4 **không còn đúng**. Giờ là 30. Lưu ý
là canvas nghiêng về `min-width` (22 vs 5) vì diagram `MobileFirstLadder` dạy
hướng chuẩn ngành, còn ebook/exercise vẫn nghiêng `max-width` vì đề thi chấm
theo đó. Đây là **cố ý** và giờ được nói rõ ở cả hai chỗ, không còn là lệch
ngầm. Quyết định "không đổi đề thi giữa kỳ" ở mục 4 vẫn giữ.

### 9.4. Lượt E — cái mục 4 và mục 5 đều bỏ sót: `exercises/` không có đáp án

Đây là lỗ hổng lớn nhất với sinh viên **tự học**, và không mục nào ở trên bắt
được nó. Số đo lúc phát hiện: **1/15** file exercise có đáp án (chỉ `session-08`,
vì nó là đề luyện thi). 14 file còn lại kết thúc ở `## Checklist` — sinh viên có
việc để làm và không có cách nào biết mình làm đúng hay sai, hay sai vì sao.

Đã thêm `## Self-Check (answers included)` vào 14 file, đặt giữa
`## Expected Result` và `## Checklist`. Mỗi file 4 khối `<details>`, tổng **56
khối**:

- Câu 1–3: một triệu chứng sinh viên **sẽ thật sự gặp** ở đúng buổi đó — "mất
  CSS khi mở `pages/contact.html`", "tab trình duyệt vẫn ghi Untitled Document",
  "media query chạy trong DevTools nhưng không chạy trên điện thoại thật" — trả
  lời kèm nguyên nhân *và* cách tự xác nhận, không chỉ cách sửa.
- Câu 4: **thử thách không cho code trong câu hỏi**. Sinh viên phải tự viết
  trước; mở ra mới có bài mẫu kèm 3–4 điểm cụ thể để đối chiếu.

Đáp án được viết *sau khi đọc từng file exercise*, nên nó gọi đúng số task, đúng
tên file và tên biến của buổi đó (`text-practice.html`, `spry-menu.css`,
`register.html`), không phải đáp án chung chung.

`session-08` đã đổi tiêu đề từ `## Answer Key (for self-checking after the
exercise)` sang `## Self-Check (answers included)` để cả 15 file đọc giống nhau.

**`homework/` cố ý KHÔNG có đáp án.** Homework được chấm và có rubric; công bố
đáp án là xoá phần đánh giá. Chỗ cần self-check là bài trong lớp — vì đó chính
là bài sinh viên làm lại ở nhà.

### 9.5. Bảng "sinh viên tự học có đủ không"

| Lớp hỗ trợ | trước | sau |
|---|---|---|
| exercise có đáp án | 1/15 | **15/15** |
| chương có `Try It Yourself` (kèm kết quả mong đợi) | 0/16 | **14/16** |
| chương có bảng lỗi thường gặp | 0/16 | **14/16** |
| chương có `<details>` tự kiểm tra | 2/16 | **15/16** |
| đề thi có bài giải mẫu | 2/2 | 2/2 |
| website mẫu chạy được | 5 trang + CSS | 5 trang + CSS |
| homework có đáp án | 0/15 | 0/15 *(cố ý)* |

Hai chỗ "14/16" là chương 08 và phụ lục A: chương 08 tự thân đã là 36 cặp
hỏi-đáp nên không cần thêm, phụ lục A là ghi chú tham khảo.

### 9.6. Kiểm chứng bằng công cụ — cách chạy lại

Đã thêm `_tools/audit-selfstudy.js`. Chạy bất cứ lúc nào, chỉ đọc, không sửa gì:

```
node _tools/audit-selfstudy.js
```

Nó in ra màn hình **và** ghi vào `_tools/audit-selfstudy.txt`, gồm 6 mục: toàn
vẹn markdown (fence, `<details>`/`<summary>` cân bằng, không BOM, không U+FFFD,
không sót thẻ của agent), số đo tự học theo lớp, ebook theo chương, exercise theo
buổi (có kiểm **thứ tự** Self-Check phải nằm trước Checklist), hướng `@media`, và
số slide/diagram từng deck canvas. Thoát mã 1 nếu có lỗi toàn vẹn.

Kết quả lần chạy cuối: **78 file markdown sạch**, 15/15 exercise có Self-Check
đúng thứ tự, `node _tools/qa-canvases.js` PASS, `node _tools/check-diagram-links.js`
resolve 49/49. Canvas: **483 slide, 60 diagram** trên 17 deck (15 deck buổi ở
30–34 slide/deck).

### 9.7. Vẫn chưa kiểm chứng được (không đổi so với mục 8)

- **Chưa thấy diagram nào render thật.** Vẫn không có `package.json`, không có
  `tsconfig.json`, `qoder/canvas` vẫn không resolve → **không có dòng TypeScript
  nào được type-check**. Hai script trên chỉ kiểm **cấu trúc**: cân bằng ngoặc,
  hàm có được slide dùng, `role="img"`/`aria-label`, cỡ chữ ≥ 11px, `url(#id)`
  không treo, nhãn SVG tiếng Anh, độ rộng chữ ước tính không vượt `viewBox`.
  Hãy mở một deck bằng mắt trước khi dạy.
- **Không có git repo ở bất kỳ đâu trong cây thư mục.** Rollback hiện chỉ dựa vào
  `_tools/backups/`. Snapshot mới nhất là `_tools/backups/post-waveE-*/` (33 file:
  toàn bộ `exercises/`, `homework/`, `README.md`, file kế hoạch và chính file
  này). Nên `git init` sớm.
- **Chưa đọc hết từng dòng trong 118.331 từ.** Đọc theo mẫu, như lần trước.
- **Chưa có dữ liệu lớp thật.** Mọi nhận định "sinh viên tự học cần gì" vẫn là
  suy luận từ thiết kế học liệu.
