# KẾ HOẠCH VIỆT HÓA HỌC LIỆU — INS2053

**Tài liệu này là kế hoạch, chưa phải code.** Mọi con số trong bài được đo trực tiếp
trên repo ở commit `0674f56` (8/9/2026) bằng script tạm trong `_tools/tmp-*.mjs`
(đã xoá; `.gitignore` sẵn mục `_tools/tmp-*.mjs`, xem lại §1 nếu cần chạy lại).

Mục tiêu của việc việt hóa, theo đúng câu hỏi gốc: **sinh viên đọc được và học được**,
không phải "dịch cho hết". Hai thứ đó khác nhau, và toàn bộ kế hoạch này sắp xếp quanh
sự khác biệt đó.

---

## 0. Tóm tắt quyết định (8 mục — đọc riêng mục này cũng đủ để hành động)

1. **Không dịch toàn bộ ebook rồi mới công bố.** Dịch theo chương; mỗi chương vào
   `i18n/vi/ebook/` tự nó là một bản phát hành hợp lệ — kiến trúc fallback của repo đã
   thiết kế sẵn cho việc đó (xem comment đầu file `_tools/i18n.mjs`).
2. **Việc hiệu quả/ngữ cảnh lớn nhất không phải prose, mà là 3 nhóm nhãn:** tên 15 chủ đề
   buổi học trong điều hướng tiếng Việt (`topicVi`), bộ nhãn khối lặp lại
   (`Real-life Example` × 21, `Important Notes` × 17, `SELF-CHECK QUESTIONS` × 15…),
   và 40 nhãn dẫn (`Expected result` × 80, `Goal` × 65, `Steps` × 64…). Hiện tại toàn bộ
   chỗ này đang hiển thị **tiếng Anh bên trong cây `site/vi/`**.
3. **Slide deck và Marp source: không dịch nội dung.** 17 deck chứa ~37.500 từ và
   **0 ký tự tiếng Việt**; 9,7% số đó nằm trong `<text>` của SVG, bị
   `check-svg-ascii.js` chặn bằng policy ("nhãn SVG phải tiếng Anh vì sinh viên quốc tế")
   và bị `check-text-width.js` chặn bằng hình học (nhãn dài hơn sẽ tràn `viewBox`).
4. **`slides/` (Marp) không được phát hành.** `PUBLISH_ONLY = ["ebook", "slides-html",
   "homework"]` — dịch `slides/*.md` tốn công mà không sinh viên nào đọc. Bỏ khỏi kế hoạch.
5. **Coi chừng `qa-site.mjs` nhóm 11:** nó đòi chuỗi literal `>Practice Status</a>`,
   `>Save Your Practice Work</a>`, `>Reference Rubric</a>` trên **cả hai cây**, và
   `prepareHomeworkMarkdown()` chỉ replace heading tiếng Anh. **Dịch homework trước khi
   sửa gate này thì CI đỏ.** Đây là việc nền bắt buộc (§5.4).
6. **Trước khi dịch trọn một chương, thêm "xương" song ngữ cho chương đó** (§6 Gói B):
   tên chủ đề bằng tiếng Việt trong toàn bộ điều hướng, 11 heading cấp 1, và các nhãn dẫn
   (`Expected result`, `Goal`, `Steps`…). Rẻ, không viết văn, và đủ để một sinh viên yếu tiếng
   Anh định vị được mình đang ở đâu trong chương.
7. **Thêm quy tắc "Từ vựng" cho mỗi chương đã dịch:** một bảng `## Từ vựng` nối thuật ngữ
   EN ↔ VI. Lý do: **đề thi, rubric và tool chấm bài dùng tiếng Anh cho tên tiêu chí**
   (`cham-bai.html` là tiếng Việt nhưng tên tiêu chí rubric giữ tiếng Anh, theo
   `PROMPTS-cham-tu-dong.md:267`). Dịch hết mà sinh viên không đọc nổi rubric thì kế hoạch
   phản tác dụng.
8. **Chỉ tiêu đo được:** số trang mang thông báo `lang-fallback` hiện là **32**
   (15 ebook + 15 homework + `orientation` + `ai-agents`). Lộ trình đóng:
   **32 → 17** (sau gói E) **→ 2** (sau gói F) **→ 0** (sau gói G). Nếu chỉ làm gói A+B,
   số này **vẫn 32** nhưng mọi trang đã có điều hướng/mục lục/nhãn bước tiếng Việt — vì vậy
   phải theo dõi **hai** số, không phải một (§9).

---

## 1. Hiện trạng đo được

### 1.1 Khối lượng

| Tầng | Nguồn | File | Dòng | Ký tự | Từ hiển thị | Từ trong `<details>` | Từ code trong fence |
|---|---|---|---|---|---|---|---|
| Giáo trình | `ebook/*.md` | 16 | 21.810 | 826.637 | 78.002 (58.495 ngoài đáp án) | 19.507 | 21.151 |
| Slide Marp | `slides/*.md` | 15 | 2.976 | 82.809 | 8.023 | 362 | 1.645 |
| Deck canvas | `canvases/*.canvas.tsx` | 17 | — | 812.431 | 37.547 | — | — |
| Đề bài tập | `homework/session-NN/homework.md` | 15 | — | — | 6.410 | 0 | — |
| Bài trên lớp | `exercises/session-NN/exercise.md` | 15 | — | — | 16.598 | 6.500 | — |

Giáo trình chia theo vùng dạy học, **tách riêng phần nằm ngoài và nằm trong `<details>`**
(từ hiển thị, đã loại code trong fence; đo bằng `_tools/tmp-split.mjs`, cộng thêm khối
SESSION INFORMATION nằm trong fence):

| Vùng | Ngoài `<details>` | Trong `<details>` | Tổng |
|---|---|---|---|
| THEORY (lý thuyết) | **27.031** | 8.025 | 35.056 |
| PRACTICE / WORKED EXAMPLES / NEXT / READING | **16.160** | 3.083 | 19.243 |
| SELF-CHECK + WORKSHEET | 2.774 (câu hỏi) | 6.472 (đáp án) | 9.246 |
| COMMON ERRORS | **4.887** | 362 | 5.249 |
| THEORY SUMMARY | 2.054 | 174 | 2.228 |
| LEARNING OBJECTIVES | 1.404 | 31 | 1.435 |
| Các đoạn khác | 2.379 | 1.360 | 3.739 |
| SESSION INFORMATION (khối fence) | 1.806 | — | 1.806 |
| **Cộng** | **58.495** | **19.507** | **78.002** |

Đây là bảng quan trọng nhất để lập kế hoạch, vì **phần phải dịch để một trang không còn
fallback là 58.495 từ**, không phải 80.000. 19.507 từ đáp án có thể để sau (và để sau lâu
dài cũng được — xem §4).

**Cỡ việc:** dịch trọn phần thân giáo trình ≈ **58.500 từ**, gấp ~71 lần Phụ lục A (818 từ —
chương đã dịch duy nhất). Phụ lục A là đơn vị đo tốt: 818 từ ra một file 11 KB, và **toàn bộ
công sức nằm ở việc giữ cấu trúc khớp bản gốc**, không ở câu chữ.

Theo chương (từ hiển thị = prose + ô bảng, đã trừ code): chương lớn nhất là 12 (7.127),
15 (6.608), 8 (6.079), 11 (6.028), 01 (6.025); nhỏ nhất ngoài Phụ lục là 09 (3.898).
Trung bình **≈ 5.000 từ/chương** — đây là con số để lập lịch ở §8.

Cấu trúc mỗi chương rất ổn định: 15/16 chương có cùng 11 heading cấp 1 (`SESSION
INFORMATION`, `LEARNING OBJECTIVES`, `THEORY`, `THEORY SUMMARY`, `WORKED EXAMPLES`,
`HANDS-ON PRACTICE`, `COMMON ERRORS — …`, `SELF-CHECK QUESTIONS`, `SELF-ASSESSMENT
WORKSHEET`, `FURTHER READING`, `NEXT SESSION`), cộng `🟦 SESSION NN` và tên chương. Đó là
lý do gói "xương" (§6-B) rẻ đến vậy.

### 1.2 Tỷ lệ độ dài Anh → Việt (đo từ 128 chuỗi chrome đã dịch)

```
chrome strings compared: 128
total chars EN=5071 VI=4935   → aggregate ratio = 0.97x
per-string ratio:  min 0.57 | p25 0.87 | median 0.96 | p75 1.09 | max 2.25
```

Tiếng Việt nhìn chung **không** dài hơn, nhưng phần đuôi phải trả giá — nhãn càng cụt, tỷ
lệ càng tệ:

| Chuỗi | EN | VI | Tỷ lệ |
|---|---|---|---|
| `Home` | 4 | `Trang chủ` — 9 | **2,25x** |
| `Ebook` | 5 | `Giáo trình` — 10 | **2,00x** |
| `Orientation` | 11 | `Làm quen khóa học` — 17 | 1,55x |
| `Before class` | 12 | `Trước khi lên lớp` — 17 | 1,42x |

Tiêu đề chương: `Choosing Web Technologies — A Beginner's Decision Guide` (55 ký tự) →
`Chọn công nghệ web — cẩm nang ra quyết định cho người mới bắt đầu` (65 ký tự) = **1,18x**.
Với `.reading-page h1 { max-width: 23ch; line-height: 1.08 }`, bản Việt cần ~3,3 dòng ở
giãn dòng 1,08 — dấu thanh (`ặ`, `ồ`, `ữ`) sẽ chạm nhau. Đây là lỗi mỹ thuật **chắc chắn
xảy ra** khi dịch tiêu đề, không phải rủi ro giả định → xử lý ở §5.6.

### 1.3 Những gì **đã** xong

| Hạng mục | Trạng thái |
|---|---|
| Dictionary chrome `_tools/i18n.mjs` | **128 key, EN và VI đủ, không thiếu key nào** |
| `site/vi/` | 53 trang, `lang="vi"`, switch + hreflang đúng twin |
| Ebook đã dịch prose | 1/16 (Phụ lục A) |
| Homework đã dịch | 0/15 — **thư mục `i18n/vi/homework/` còn chưa tồn tại** |
| Trang mang `lang-fallback` trong cây VI | **32** = 15 ebook + 15 homework + `orientation` + `ai-agents` |
| `cham-bai.html` | **Đã tiếng Việt** (1.620 dấu tiếng Việt, `lang="vi"`), không cần đụng tới |
| QA | `npm run qa:site` → **SITE QA PASS**, 16 nhóm, assert fallback đúng chỗ |
| Deploy | GitHub Pages xanh, có bước `qa:site` chặn trước khi upload |


### 1.4 Tính khớp cấu trúc của bản dịch đang có

Bằng chứng cho gate ở §5.5. So `ebook/appendix-a-technology-landscape.md` ↔
`i18n/vi/ebook/appendix-a-technology-landscape.md`:

```
fences            4  = 4
code lines       29  = 29
box-art lines    16  = 16
table rows       36  = 36   (cùng số ô mỗi dòng)
headings         22  = 22   (h1 9/9 · h2 3/3 · h3 10/10)
links             4  = 4
inline code spans 1 = 1     (không lệch phần tử nào)
chuỗi độ sâu heading: giống hệt
dòng "🖼 Diagram":    0 = 0
```

Khối fence duy nhất **được phép** khác nội dung là khối SESSION INFORMATION (13 dòng,
đã dịch nhãn). Khối có ký tự vẽ khung (`┌─│└`) hiện **giống hệt từng byte**:
`← you know this`, `Behaviour`, `CSS helpers` vẫn tiếng Anh.

Đó chính xác là hành vi cần nhân bản, và nó thành **rule cứng**:

> Mọi khối ASCII-art (fence không tag ngôn ngữ, có ký tự `U+2500–U+257F`) phải
> **byte-identical** với bản gốc. Muốn chú thích tiếng Việt thì **thêm một dòng thường
> ngay dưới khối**, không được sửa bên trong khung.

Lý do: 98/538 khối fence trong ebook **không có tag ngôn ngữ** — 40 khối chứa ASCII-art
(500 dòng), 37 khối là khối meta kiểu SESSION INFORMATION (394 dòng), 21 khối còn lại.
`marked` render cả ba loại thành `<pre>` giống hệt nhau, nên nếu dịch vào trong khối vẽ
khung thì cộtẽ vỡ ngay và **không có QA nào báo** (qa-site chỉ kiểm tra markdown không
render lỗi, không kiểm tra alignment của art).

---

## 2. Tiêu chí quyết định: cái gì giúp sinh viên học được, không phải cái gì dịch xong

Repo đã tự trả lời một phần, và câu trả lời nên được tôn trọng:

```
i18n.mjs header, rule 2:
  "Words that ARE the subject matter stay English. HTML, CSS, JavaScript, slide,
   rubric, repository, Git are technical vocabulary in this course — translating
   them would teach the wrong term."
```

Cộng thêm ba ràng buộc hiện thực:

| Ràng buộc | Hệ quả cho việc dịch |
|---|---|
| Đề thi thực hành, **không internet**, được mang theo `ebook/` offline (`schedule.md:90`) | Sinh viên sẽ **lướt tìm bằng thuật ngữ tiếng Anh** trong đề. Dịch mất `box model`, `specificity`, `selector` nghĩa là lấy đi từ khoá tra cứu của họ |
| **Mọi nhãn SVG phải tiếng Anh** (`PROMPTS-handover.md:45`, `check-svg-ascii.js`) — vì sinh viên quốc tế | Sơ đồ trên slide giữ nguyên tiếng Anh dù trang đọc là tiếng Việt |
| `cham-bai.html` và rubric giữ **tên tiêu chí tiếng Anh** (`PROMPTS-cham-tu-dong.md:267`) | Bảng điểm máy và bản dịch người phải đọc khớp nhau |

Ba cái này hợp lại thành nguyên tắc dẫn đường:

> **Nguyên tắc K-W-S (Keep – Translate – Signpost).**
> *Keep:* mã, tên thẻ/thuộc tính, đường dẫn file, thuật ngữ đã là nội dung dạy.
> *Translate:* câu giải thích, bước làm, lỗi thường gặp, câu hỏi tự kiểm tra.
> *Signpost:* mỗi chương đã dịch phải có **bảng Từ vựng** đặt thuật ngữ Anh cạnh nghĩa
> Việt, để sinh viên đi được từ bản dịch sang đề thi/rubric tiếng Anh.

Một nguyên tắc thứ hai, về **thứ tự**: giá trị không tăng dần đều theo số từ đã dịch.
Nó tăng vọt khi (a) sinh viên định vị được trong trang tiếng Việt, và (b) đọc được
phần "kết quả mong đợi là gì / lỗi này sửa thế nào". Nó đi ngang khi dịch phần lý thuyết
dài dòng mà chưa làm (a) và (b). Vì vậy §6 đặt **"xương" và Common Errors trước**
prose THEORY.




---

## 3. Những gì sinh viên tiếng Việt thực sự nhìn — và chỗ nào đang "dở"

Kiểm chứng trên `site/vi/` đã build (không phải suy đoán từ source):

### 3.1 Điều hướng: **một nửa tiếng Việt, một nửa tiếng Anh**

`site/vi/index.html`:

```html
<td class="topic" data-label="Buổi"><a href="./sessions/session-04.html">Applying CSS to Your Website</a></td>
```

`site/vi/ebook/index.html`:

```html
<a href="04-…"><strong>Chương 4 — Applying CSS to Your Website</strong><span>Buổi 4</span></a>
```

`site/vi/sessions/session-04.html`:

```html
<h1>Buổi 4: Applying CSS to Your Website</h1>
<title>Buổi 4: Applying CSS to Your Website — INS2053 · Web Authoring &amp; Web Management</title>
```

Nguyên nhân: `SESSIONS[n].topic` (`build-site.mjs:285-301`) là hằng tiếng Anh duy nhất,
được **4 chỗ** dùng chung: hub title (`hubTitle`, dòng 566), bảng tuần trên trang chủ
(dòng 598), mục lục buổi học (`idxSessionLabel`, dòng 1411), mục lục slide
(`idxDeckLabel`, dòng 1471). Trang chương dùng dòng 2 của file markdown
(`build-site.mjs:1271`) — nên Phụ lục A **đã** tự động có `Chương…/Buổi…` + tiêu đề Việt
mà không cần sửa builder. 15 chương còn lại thì dòng 2 vẫn tiếng Anh, đúng như thiết kế.

**Hệ quả với người học:** sinh viên mở `/vi/`, thấy "Buổi 4" nhưng không biết buổi 4 là về
gọi tên tiếng Việt. Đây là chỗ rẻ nhất, nhanh nhất, tác động lớn nhất trong toàn kế hoạch.

### 3.2 Nhãn khối và nhãn dẫn: **100% tiếng Anh trong trang tiếng Việt**

Bằng chứng trực tiếp trên `site/vi/ebook/04-applying-css-to-website.html` — mục lục
"Trong trang này" đã Việt, nhưng **mọi mục bên trong vẫn tiếng Anh**:

```html
<h2 id="toc-h">Trong trang này</h2>
<li class="d2"><a href="#6-the-box-model">6. The Box Model</a></li>
<li class="d2"><a href="#best-practices">✅ Best Practices</a></li>
<li class="d2"><a href="#common-mistakes">❌ Common Mistakes</a></li>
```

Nhãn đầu tới từ dictionary (`onThisPage`, đã dịch), còn mục lục tới từ heading của
markdown nên không qua dictionary. Heading cấp 1 lặp lại y hệt 15/16 chương
(`SELF-CHECK QUESTIONS`, `HANDS-ON PRACTICE`, `COMMON ERRORS — WHAT THE BROWSER SHOWS
YOU`…). Toàn bộ đi qua `slugify()` và TOC, không qua dictionary.

Nhãn dẫn in đậm đầu đoạn, đo số lần xuất hiện trong `ebook/`:

| Nhãn | Lần | Nhãn | Lần | Nhãn | Lần |
|---|---|---|---|---|---|
| `Expected result` | **80** | `Situation` | 52 | `Wrong` | 43 |
| `Goal` | **65** | `Result` | 48 | `Correct` | 43 |
| `Steps` | **64** | `Diagram` | 45 | `Check` | 39 |

Nhãn heading lặp lại ≥ 4 lần phủ được **32,1%** số heading; nhãn dẫn ≥ 6 lần phủ
**53,2%** số nhãn dẫn. Tức một dictionary ~60–70 key bao phủ phần lớn "giao diện nội dung".

### 3.3 Trang "Làm quen khóa học": **nguyên văn tiếng Anh sau một thông báo tiếng Việt**

`site/vi/orientation.html` — `untranslated: lang === "vi"` hardcode (`build-site.mjs:866`),
body là HTML strings trong builder (dòng 748-861, ~1.800 từ tiếng Anh):

```html
<h1>How to Use This Course</h1>
<div class="callout warn lang-fallback" role="note">  <!-- thông báo tiếng Việt -->
```

Đây là **trang đầu tiên** sinh viên năm nhất nên đọc, và `orientationPage()` **không có cơ
chế nạp file markdown nào** — nó không đi qua con đường `i18n/vi/`. Muốn dịch nó phải sửa
builder, không chỉ thả file. Đáng làm nhất trong các trang chrome-vì-nó-là-cửa-ngõ.

### 3.4 Trang slide tiếng Việt: **không nói rằng slide tiếng Anh**

`site/vi/slides/index.html` hiện:

```html
<p class="lead">Mười bảy bộ slide với 60 sơ đồ giảng dạy. Dùng phím j và k …</p>
```

Không có `lang-fallback` (đúng — deck là chrome-only, `proseSource()` trả `null`),
nhưng cũng **không có dòng nào nói "deck giữ tiếng Anh có chủ đích"**. Người đọc Việt bấm
vào một deck toàn tiếng Anh và không được báo trước. Chỉ cần thêm 1 key dictionary
(`idxDeckEnglishNote`) vào `idxSlidesLead` là đủ.

### 3.5 Các trang gốc chia sẻ: đã ổn

`/cham-bai.html` đã tiếng Việt (1.620 dấu, `lang="vi"`) và chỉ có **một bản** cho cả hai
cây (byte-identical gate, `qa-site.mjs` nhóm 13). `/vi/` không có bản riêng → không phát
sinh việc dịch.


---

## 4. Những việc **không** làm (và lý do, để sau này không ai làm lại)

| Không làm | Lý do kỹ thuật, kiểm chứng được |
|---|---|
| Dịch `canvases/*.canvas.tsx` (17 deck) | 37.547 từ, trong đó **9,7% (3.658 từ) nằm trong `<text>` SVG**. `check-svg-ascii.js` fail cứng với mọi ký tự ngoài ASCII (chỉ cho phép em-dash, mũi tên, ✓/✗), và nó nằm trong `npm run qa`. `check-text-width.js` ước lượng bề rộng `<text>` theo `viewBox` — nhãn Việt dài hơn sẽ tràn và fail tiếp. Muốn dịch sơ đồ phải **đổi cả policy lẫn hình học của 60 sơ đồ**, tức làm lại thứ đang xanh |
| Dịch `slides/*.md` (Marp) | Không phát hành: `PUBLISH_ONLY = ["ebook", "slides-html", "homework"]` (dòng 122). Không sinh viên nào đọc file này trên web. Chỉ `build-html-slides.mjs:59` đọc nó để lấy *tagline* cho deck — dịch ra làm lệch metadata mà không đổi gì cho người học |
| Dịch `exercises/` | Có chủ đích không publish, vì mỗi sheet chứa `## Self-Check (answers included)`. Sinh viên không học được bằng cách đọc đáp án đã Việt hoá trôi chảy |
| Dịch `exams/`, `project/rubric.md` | Không publish; đề thi và rubric là tiếng Anh theo đề cương |
| Bỏ thông báo `lang-fallback` cho đẹp | Comment trong builder ghi rõ: *"Silent fallback reads as a broken translation."* Đó là tính năng, không phải nợ |
| Dịch 150 block Try It Yourself một lần cuối cùng | Xem §2 — giá trị học tập thấp hơn nhiều so với phần đầu chương, vì sinh viên làm theo code hơn là đọc mô tả |
| Dịch tên tiêu chí rubric trong `cham-bai.html` | Đã **một lần** quyết định giữ tiếng Anh cho sinh viên quốc tế (`PROMPTS-cham-tu-dong.md:267`). Và file đang bị gate byte-identical; sửa trực tiếp sẽ đỏ QA |
| Đặt `i18n/vi/slides/` để mong có trang tiếng Việt | `proseSource()` (`qa-site.mjs:525-533`) không map deck sang nguồn prose nào → `buildTree` không bao giờ đọc thư mục đó. Thêm file vào đó = **tệp chết**, và là loại nợ mà 6 tháng sau không ai giải thích được vì sao nó tồn tại |

---

## 5. Việc nền bắt buộc — làm **trước** khi thả bất kỳ file dịch nào

Bảy việc này tồn tại vì dịch vào hệ thống hiện tại mà không sửa nó sẽ gây ra đúng ba kiểu
hỏng: **CI đỏ**, **anchor chết / tuyên bố dịch sai**, và **drift giữa Anh và Việt**.

### 5.1 `topicVi` — tên chủ đề buổi học bằng tiếng Việt

`SESSIONS[n].topic` hiện là hằng tiếng Anh dùng chung cho **cả hai cây** qua 4 chỗ
(dòng 566, 598, 1411, 1471). Cách sửa nhỏ nhất và đúng với kiến trúc đã có:

```js
// _tools/build-site.mjs:285 — thêm một khoá, không đổi khoá cũ
{ n: 4, topic: "Applying CSS to Your Website", topicVi: "Áp dụng CSS vào website" },
```

Và một helper chọn theo ngôn ngữ:

```js
const topicOf = (s, lang) => (lang === "vi" && s.topicVi) || s.topic;
```

Thay `s.topic` → `topicOf(s, lang)` tại **dòng 566, 598, 1411, 1471**.

Ràng buộc phải giữ:
- Đường dẫn file **không đổi** (`ebook/04-applying-css-to-website.html`) — slug lấy từ tên
  file (dòng 1275), nên đổi tên file sẽ làm chết mọi liên kết đã chia sẻ.
- Khoá `topic` tiếng Anh vẫn là sự thật cho cây EN và cho `schedule.md`.
- Thiếu `topicVi` thì tự động rơi về `topic` — không vỡ build.

Danh sách 15 tên đề xuất: xem §7.3.
### 5.2 Dictionary nhãn khối / nhãn dẫn, áp vào cây VI

Đây là phần tế nhị nhất, và lý do tế nhị nằm ở `slugify()`:

```js
// build-site.mjs:177 — id anchor được sinh từ chính text của heading
function slugify(text) {
  return plain(text).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").trim()
    .replace(/\s+/g, "-").replace(/-+/g, "-");
}
```

Đổi `## Real-life Example` → `## Ví dụ đời thực` sẽ đổi id từ `real-life-example` sang
`ví-dụ-đời-thực`. Đã kiểm chứng là **an toàn**:

- Số internal anchor `](#…)` trong toàn bộ 16 chương `ebook/` = **0**. Anchor `#` duy nhất
  tới từ URL ngoài (MDN), không phải trong trang.
- TOC được sinh lại trong cùng một lần render (`makeRenderer` vừa gán id vừa push vào
  `headings`), nên trong một trang luôn tự khớp.
- `qa-site.mjs` nhóm 5 đã assert *mọi same-page anchor trỏ tới một id có thật*, **trên cả
  hai cây** — nếu builder lệch nhau ở đâu đó, QA đỏ ngay lần chạy đầu.

**Rule cứng để không bao giờ vỡ:** với chương *chưa* dịch trọn, không được dịch **dòng 1
(`# 🟦 SESSION NN`) và dòng 2 (tên chương)** một phần. Tiêu đề trang lấy từ dòng 2
(`build-site.mjs:1271`), nên dịch nửa vời sẽ tạo trang "Buổi 4: Áp dụng CSS…" trong khi
heading TOC vẫn tiếng Anh. Một chương chuyển sang Việt thì chuyển cả tiêu đề.

Nhóm cần vào dictionary (số lần đo trên `ebook/`):

| Nhóm | Phủ | Ví dụ key |
|---|---|---|
| Heading cấp 1 lặp lại | `THEORY` ×16, `FURTHER READING` ×16, 9 nhãn khác ×14-15 | `theory → Lý thuyết` |
| Heading cấp 3 lặp lại | `Real-life Example` ×21 (+16 biến thể thường), `Important Notes` ×17 (+15), `Common Mistakes` ×9, `N.N Definition` ×~40 | khớp không phân biệt hoa thường |
| Nhãn dẫn in đậm | `Expected result` ×80, `Goal` ×65, `Steps` ×64, `Situation` ×52, `Result` ×48, `Wrong`/`Correct` ×43, `Check` ×39 | `**Expected result:**` → `**Kết quả mong đợi:**` |

Tổng cộng: heading lặp ≥4 lần phủ **32,1%** số heading; nhãn dẫn ≥6 lần phủ **53,2%**.
Một dictionary 60–70 key do đó bao phủ phần lớn "giao diện nội dung" với ~1 ngày công.

Cách áp dụng an toàn nhất — **một hàm `labelize(md, lang)` chạy trên markdown source của
cây VI trước khi render**, với ba ràng buộc:
1. Dictionary là dữ liệu, đặt cạnh chrome trong `_tools/i18n.mjs`. Builder chỉ có một chỗ sửa.
2. Regex **neo đầu dòng**: `^#{2,6}\s+` cho heading và `^(\s*(?:[-*]\s*)?)\*\*(…)\*\*(:?)\*`
   cho nhãn dẫn. Không khớp tự do giữa câu, để không phá `**box model**` hay `[Common
   Errors](#…)`.
3. Chỉ áp cho cây `vi`. Cây EN đi qua `labelize()` nguyên trạng — để `npm run build:site`
   không bao giờ đổi byte của `site/` tiếng Anh.

### 5.3 Cờ `untranslated` cho trang chrome-only

`build-site.mjs:866` hardcode `untranslated: lang === "vi"` cho `orientationPage()` và
`:1077` tương tự cho `aiAgentsPage()`. Cả hai **có body tiếng Anh nằm trong builder**
(~1.800 từ và ~1.400 từ), nên thông báo fallback hiện tại là *đúng sự thật*. **Không tắt cờ
cho đẹp.** Muốn tắt thì phải chuyển body của chúng sang nguồn markdown hai ngôn ngữ trước —
đó là Gói G (§6), không phải việc sửa cờ.

### 5.4 `qa-site.mjs` nhóm 11 + `prepareHomeworkMarkdown()` — **chặn đường dịch homework**

Đây là lỗi-class nghiêm trọng nhất mà kế hoạch này tìm ra *trước khi* nó xảy ra.

```js
// qa-site.mjs:394-403 — chạy cho CẢ HAI cây (for (const lang of Object.keys(LANGS)))
const required = ["Practice Status", "Save Your Practice Work", "Reference Rubric"];
const missing  = required.filter((label) => !s.includes(`>${label}</a>`));
const stale    = [[/>Due Date</, …], [/>Submission Guide</, …], [/Sunday,\s*23:59/i, …],
                  [/\bgrace day\b/i, …], [/\bby the deadline\b/i, …]];
```

```js
// build-site.mjs:261-272 — prepareHomeworkMarkdown() CHỈ replace bản tiếng Anh
.replace(/^## Due Date\s*\r?\n[^\r\n]*(?:\r?\n)?/m, "## Practice Status\n…")
.replace(/^## Submission Guide\s*$/m, "## Save Your Practice Work")
.replace(/^## Grading Rubric\s*$/m, "## Reference Rubric")
```

Hệ quả nếu thả `i18n/vi/homework/session-04/homework.md` với heading đã dịch: build vẫn
xanh, nhưng `npm run qa:site` fail trên 15 trang vì *missing Practice Status / missing
Save Your Practice Work / missing Reference Rubric*. `deploy-pages.yml` có bước
"QA the built site" → **không deploy được**, và người dịch kết luận sai rằng bản dịch của
mình hỏng, trong khi gate chưa theo kịp.

**Việc nền, làm trước.** Cách chọn:

- **A (khuyên dùng):** thêm `UI[lang].practiceHeadings = { status, save, rubric }`, cho
  `prepareHomeworkMarkdown(md, lang)` replace theo đúng ngôn ngữ của nguồn, và để QA lấy bảng
  từ khoá theo `lang` của trang. Cũng phải Việt hoá cả danh sách `stale`:
  `Sunday 23:59` → `Chủ nhật 23:59`, `grace day` → `ngày nộp muộn`, `by the deadline` →
  `trước hạn nộp`. Không làm bước này thì QA báo *stale copy* trên bản dịch đúng.
- **B (sửa ít hơn):** quy ước file Việt **giữ nguyên 3 heading machine bằng tiếng Anh**, chỉ
  dịch phần thân. Đơn giản, nhưng để một vệt tiếng Anh khó hiểu trên trang Việt — trái §2.

Chọn A. Sau khi xong, thêm 1 assertion vào QA: *homework VI không còn một trong các literal
EN nào, và có đủ 3 literal VI tương ứng* — để lần sau không ai dịch homework rồi mới biết.

### 5.5 Gate mới: `_tools/qa-i18n.mjs` (quét) + `_tools/vi-new.mjs` (một cặp)

Không có gì trong QA hiện tại kiểm tra **chất lượng một bản dịch**. Rủi ro thật: một file
dịch vào, build xanh, QA xanh, nhưng nó đã **đánh rơi một TASK**, **dịch vào trong khối
ASCII-art**, hoặc **thêm một liên kết tới file chưa publish**. `qa:site` không bắt được 2/3
thứ đó.

Đề xuất một công cụ, hai chế độ, theo đúng văn hoá `_tools/` (mỗi thứ một file, exit
non-zero, in `ok`/`BAD`):

```
node _tools/qa-i18n.mjs            # quét mọi cặp ebook|homework ↔ i18n/vi/…
node _tools/vi-new.mjs ebook/12-using-code-editing-tools.md
```

Kiểm tra — mỗi mục đã được xác nhận là **khớp** trên cặp Phụ lục A (§1.4), nên gate sẽ
không báo lỗi giả:

| # | Kiểm tra | Vì sao cần |
|---|---|---|
| 1 | Cùng số **khối fence**; mọi khối chứa ASCII-art phải **byte-identical** | khối vẽ khung vỡ cột là hỏng nhìn, không QA nào bắt |
| 2 | Cùng số **dòng bảng** và cùng số **ô mỗi dòng** | bảng thiếu ô vẫn có thể qua nhóm 14 |
| 3 | Cùng số heading mỗi cấp; **chuỗi độ sâu** giống hệt | bảo đảm TOC hai cây đồng hình |
| 4 | Cùng số `<details>` và cùng số câu trong vùng SELF-CHECK | đáp án bị rơi là lỗi dịch nghiêm trọng nhất |
| 5 | Tập inline `` `code spans` `` **khớp chính xác** | mã và đường dẫn là nội dung dạy, phải còn nguyên |
| 6 | Tập link tương đối **bằng nhau** ở hai chiều | bản Việt không được bịa link |
| 7 | Dòng `> 🖼 **Diagram…**` khớp **từng ký tự** | `check-diagram-links.js:11` hardcode `ebook/` → dòng Diagram trong `i18n/vi/ebook/` **không còn được kiểm** khi chương đã dịch |
| 8 | Không còn **prose tiếng Anh** sót, trừ glossary và code | phát hiện chương "dịch 40% rồi đánh dấu xong" |
| 9 | Không có **dấu tiếng Việt bên trong code fence** | code là tiếng Anh ở mọi phiên bản |
| 10 | In **số từ nguồn / từ đã dịch / % phủ** từng cặp | số liệu cho §9, và là phép thử trung thực |

Mục 7 đáng nhấn mạnh: hôm nay nó vô hình vì chỉ Phụ lục A đã dịch. Khi 15 chương dịch xong,
toàn bộ liên kết sơ đồ nằm trong `i18n/vi/` và checker hiện hành không nhìn thấy.
`qa-i18n.mjs` mục 7 vá lỗ đó mà không phải viết lại checker.

Gắn nó vào `package.json` (`"qa:i18n"`) và thêm một bước vào **cả hai** workflow
(`qa.yml` và `deploy-pages.yml`), cạnh `qa:site` đang chặn upload.

### 5.6 Sửa CSS cho chữ tiếng Việt

Ba thay đổi khuếch tán, không đụng cấu trúc:

```css
/* 1. Giãn dòng cho tiêu đề có dấu — site.css:362 (h1), :1027 (.reading-page h1) */
html[lang="vi"] h1 { line-height: 1.22; letter-spacing: -0.02em; }

/* 2. max-width: 23ch (:1024) tính theo tiếng Anh; tiếng Việt 1,18x */
html[lang="vi"] .reading-page h1,
html[lang="vi"] .session-page h1 { max-width: 30ch; }

/* 3. TOC + breadcrumb: nhãn Việt dài hơn ("Trang chủ" = 2,25x "Home") */
html[lang="vi"] .toc a { line-height: 1.5; }
```

Lý do: `.reading-page h1 { max-width: 23ch; line-height: 1.08 }` kết hợp dấu thanh
(`ặ/ồ/ữ`) là tổ hợp hỏng **nhìn thấy trước** khi dịch tiêu đề (§1.2: 65 ký tự ≈ 3,3 dòng).

Font stack `--font-sans: Inter, "Segoe UI", system-ui, …` **không cần đổi** — Inter và
Segoe UI đều phủ đủ tổ hợp dấu. **Không** thêm webfont: `site/` hiện không gọi mạng, và điều
đó quan trọng vì đề thi không internet, sinh viên mang ebook offline.

Cảnh báo thao tác: `site/` là **generated** (`clean:site` xoá cả thư mục). Nguồn CSS thật là
**`_tools/site-assets/site.css`** (`build-site.mjs:52`: `ASSETS = HERE/site-assets`), và dòng
kẻ sang file đã copy **khớp 1:1** — kiểm chứng: `site.css:362` của cả hai bản đều là
`line-height: 1.03;`. Sửa ở `_tools/site-assets/`, không sửa `site/assets/`.
### 5.7 Khoảng trống thiết kế: bản dịch **một phần** hiện không biểu đạt được

Đây là vấn đề nghiêm trọng nhất của kiến trúc i18n hiện tại, và nó quyết định thứ tự của mọi
gói phía dưới.

`build-site.mjs:1265` quyết định trạng thái bằng **một phép thử duy nhất**:

```js
const hasVi = lang === "vi" && existsSync(viSrc);   // chỉ: tồn tại / không tồn tại
untranslated: lang === "vi" && !hasVi,              // → bật/tắt thông báo fallback
```

`qa-site.mjs:621-651` sau đó *assert đúng cơ chế đó*: trang có file `i18n/vi/` thì **không được
mang** thông báo fallback. Nghĩa là:

> Chỉ cần thả một file `i18n/vi/ebook/12-…md` dịch 5% (chỉ phần đầu chương), thông báo
> "Trang này chưa có bản dịch tiếng Việt" **biến mất**, và trang tự nhận là đã dịch.

Đó chính là kiểu lỗi im lặng mà comment của builder (*"Silent fallback reads as a broken
translation"*) đã cố phòng — nhưng phòng được ở cấp *trang*, không ở cấp *phần trong trang*.

**Việc nền A7 — thêm trạng thái "dịch một phần", ~2 giờ:**

1. Một ledger duy nhất `i18n/vi/LEDGER.json`:

```json
{
  "ebook/appendix-a-technology-landscape.md": "full",
  "ebook/12-using-code-editing-tools.md": "partial",
  "homework/session-04/homework.md": "partial"
}
```

2. `page()` nhận thêm `translationState` ∈ `full | partial | none` và chọn thông báo:
   - `none` → giữ nguyên `fallbackTitle/fallbackBody` như hiện tại;
   - `partial` → callout mới, trung thực và có số: *"Chương này đã dịch một phần (~40%). Phần
     chưa dịch là nguyên bản tiếng Anh; code và thuật ngữ luôn giữ tiếng Anh ở mọi phiên bản."*
     kèm link sang bản EN.
3. `qa-i18n.mjs` mục 10 **tính % phủ từ file thật** và fail nếu ledger nói `full` mà % phủ
   < 85%, hoặc nói `partial` mà % phủ ≥ 85% — ledger không được phép nói dối lâu.
4. `qa-site.mjs` nhóm 15d nới từ "có / không có notice" sang "đúng *loại* notice theo ledger".

Có A7 thì Gói C và D mới đi được. Không có A7 thì chỉ còn hai đường trung thực: (a) **chỉ**
dùng dictionary nhãn (không đụng file nào), hoặc (b) dịch **trọn** chương một phát. Tài liệu
này thiên về A7 vì nó cho phép nhịp dịch khớp nhịp lên lớp — nhưng tuyệt đối không thả file
một phần trước khi A7 xong.





---

## 6. Các gói công việc, theo thứ tự phụ thuộc

Mỗi gói là một commit độc lập, tự deploy được, tự có giá trị. Không gói nào yêu cầu một gói
chưa làm.

### Gói A — Nền tảng (điều kiện tiên quyết, ~2 ngày cho A1–A7)

| # | Việc | File |
|---|---|---|
| A1 | `topicVi` + `topicOf()` (§5.1) | `_tools/build-site.mjs` |
| A2 | Dictionary khối/nhãn + `labelize()` (§5.2) | `_tools/i18n.mjs`, `build-site.mjs` |
| A3 | `practiceHeadings` theo ngôn ngữ; `prepareHomeworkMarkdown(md, lang)` + QA nhóm 11 (§5.4) | `build-site.mjs`, `qa-site.mjs` |
| A4 | CSS tiếng Việt (§5.6) | nguồn của `site.css` |
| A5 | 1 key mới: ghi chú "deck giữ tiếng Anh có chủ đích" trên `site/vi/slides/` (§3.4) | `i18n.mjs` |
| A6 | `_tools/qa-i18n.mjs` + script `qa:i18n` + bước mới trong 2 workflow (§5.5) | mới |
| A7 | Trạng thái `partial` + `i18n/vi/LEDGER.json` + notice mới + nới QA nhóm 15d (§5.7) | `build-site.mjs`, `i18n.mjs`, `qa-site.mjs` |

**A1 + A2 + A5 là ~90% giá trị cho sinh viên và gần như không có rủi ro.** A3 *phải* xong
trước Gói E (homework). A6 nên xong trước khi thả bất kỳ file dịch lớn nào. **A7 *phải* xong
trước Gói C và D** — nếu không, hai gói đó tự tay tạo ra trang "tuyên bố đã dịch mà chưa".

Kiểm nghiệm gói A: `npm run build:site && npm run qa:site && npm run qa:i18n` — số trang
`lang-fallback` phải **vẫn là 32** (gói A không dịch thêm prose nào, chỉ dịch nhãn).

### Gói B — "Xương" song ngữ cho 15 chương (~3,5 giờ, không viết văn)

Không phải dịch chương. Là làm cho **mọi** chương trong cây VI định vị được, kể cả chương
chưa dịch. Bốn việc máy móc, chạy bằng cơ chế của A1 + A2:

1. `topicVi` cho 15 buổi (§7.3) → hub title, bảng tuần, hai mục lục đều Việt.
2. A2 phủ 11 heading cấp 1 + `N.N Definition` / `Real-life Example` / `Important Notes` /
   `Common Mistakes` / `Best Practices` → **mục lục "On this page" của cả 15 chương** thành
   tiếng Việt, và anchor vẫn resolve vì TOC được sinh cùng lúc.
3. Nhãn dẫn: `Expected result`, `Goal`, `Steps`, `Situation`, `Result`, `Wrong`, `Correct`,
   `Check`, `Save`, `Task (N min)`, `File(s) to save`, `Line-by-line explanation` → phủ 803
   trong 1.453 lượt nhãn dẫn (55%).
4. Khối SESSION INFORMATION: **không** làm bằng dictionary (đó là prose) — thuộc Gói C.

Đầu ra đo được: cây VI không còn trang nào *thuần* tiếng Anh; mọi trang còn fallback đều có
navigation + mục lục + nhãn bước bằng tiếng Việt.

### Gói C — 15 trang "đầu chương" (session-info + objectives + summary), ~2 ngày

Phần **có mật độ giá trị / số từ cao nhất**, vì nó quyết định sinh viên có đọc tiếp không:

| Vùng | Từ | Vì sao ưu tiên |
|---|---|---|
| SESSION INFORMATION | 1.806 | khối 13 dòng đầu mỗi chương: thời lượng, mục tiêu, chuẩn bị, **tên sơ đồ sẽ chiếu**. Là "bản đồ chương" |
| LEARNING OBJECTIVES | 1.404 | sinh viên đối chiếu mình học được gì; trùng câu chữ với CLO trong đề cương |
| THEORY SUMMARY | 2.054 | bảng "Ý tưởng / Điều cần nhớ" — đọc 2 phút nắm cả chương |

Tổng ≈ **5.300 từ** = 9% phần thân ebook nhưng phủ **ba điểm chạm đầu tiên** của mọi chương.
Làm 3 lô: 01-05, 06-10, 11-15 (Phụ lục đã xong).

### Gói D — Bảng COMMON ERRORS + câu SELF-CHECK, ~2,5 ngày

Đây là phần **chỉ có trong học liệu này** và là thứ sinh viên tra lúc 11 giờ đêm khi bài
không chạy:

- 14/16 chương có bảng Common Errors 4 cột, **4.887 từ** ngoài đáp án. Cột *Symptom* mô tả
  **cái họ đang nhìn thấy trên màn hình**; cột *How to fix* là hành động. Dịch hai cột đó,
  giữ nguyên `code` trong ô.
- **2.774 từ** câu hỏi SELF-CHECK / WORKSHEET nằm ngoài `<details>`. **Chỉ dịch phần hỏi**,
  chưa đụng 6.472 từ đáp án bên trong `<details>` — đáp án nặng code/giải thích kỹ thuật,
  tỷ lệ giá trị/công thấp hơn (xem §4).

Tổng gói D ≈ **7.660 từ**.

Nguyên tắc trình bày cho cả gói D: thuật ngữ trong ô *Cause* viết dạng
`specificity (độ ưu tiên của selector)` — Anh trước, Việt trong ngoặc, vì đề thi dùng từ
tiếng Anh.

### Gói E — 15 đề bài tập (`i18n/vi/homework/`), ~1,5 ngày

Cỡ việc nhỏ nhất so với giá trị: **6.410 từ** hiển thị, không có `<details>`, cấu trúc rất
đều (Situation / Requirements / Tasks / Reference Rubric). Hết trở ngại kỹ thuật ngay sau A3.

**Thứ tự: làm E trước khi dịch THEORY.** Đề bài là trang sinh viên buộc phải mở mỗi tuần;
lý thuyết họ còn nghe được trên lớp. Và đề bài tiếng Việt giúp hiểu *yêu cầu cần đạt* — đúng
chỗ sinh viên sai nhiều nhất.

Ràng buộc: ba heading machine (`Practice Status` / `Save Your Practice Work` /
`Reference Rubric`) do `prepareHomeworkMarkdown()` Việt hoá từ A3 — **không** tự gõ tiếng Việt
vào các heading đó trong file nguồn, vì hàm replace sẽ không khớp và QA sẽ đỏ.

### Gói F — THEORY + THỰC HÀNH theo chương, bám tiến độ khoá học, ~10-12 ngày

≈ **45.570 từ** — toàn bộ phần thân còn lại nằm ngoài `<details>`: THEORY 27.031,
PRACTICE/WORKED EXAMPLES/FURTHER READING 16.160, các đoạn khác 2.379. (Sau khi C và D đã lấy
đi info/objectives/summary/errors/câu-hỏi.) Đây là phần dài nhất và **nên kéo dài cả học kỳ**,
không phải một sprint.

Ba quy tắc để prose không phá cấu trúc (tất cả đều được chứng minh bằng cặp Phụ lục A):

1. **Không đụng vào trong fence.** 21.151 từ code giữ nguyên. Muốn chú thích ASCII-art, thêm
   một dòng thường ngay dưới khối — tuyệt đối không sửa bên trong khung `┌─│└`.
2. **Không đụng dòng `> 🖼 **Diagram:**`.** Nó là hợp đồng với `check-diagram-links.js`: mẫu
   `` `([A-Z][\w$]*)` — slide `([^`]+)` `` dùng cả dấu "—" lẫn backtick làm neo parse. Dịch
   "slide" thành "trình chiếu" là mất liên kết sơ đồ, và checker **không** quét `i18n/vi/`.
3. **Không đổi số dòng / số ô của bảng.** `qa-site` nhóm 14 và cơ chế empty-state
   (`table-empty-state.mjs`) tính theo cấu trúc bảng.

Thứ tự gợi ý nếu khoá đã bắt đầu: **01→05** cho 5 tuần đầu; **06→08** trước giữa kỳ;
**09→11**; **12→15** trước kỳ thi cuối. Mỗi chương ≈ 4.100-7.100 từ.

### Gói G — Trang `orientation` và `ai-agents`, ~1 ngày

`site/vi/orientation.html` là cửa ngõ của sinh viên năm nhất và đang nguyên văn tiếng Anh
(~1.800 từ) sau một thông báo tiếng Việt; `ai-agents.html` ~1.400 từ. Vì body của chúng nằm
**trong builder** (`build-site.mjs:748-861`), cần một bước hạ tầng nhỏ: đưa hai body đó ra
`content/orientation.{en,vi}.md` để `orientationPage(lang)` nạp file, cùng cơ chế với
`i18n/vi/`. Chỉ khi đó mới được bỏ hardcode `untranslated: lang === "vi"` (dòng 866) một cách
trung thực (§5.3).

Làm G **sau** A6, để gate đã có sẵn khi cặp file đầu tiên xuất hiện.

### Gói H — Vệ sinh tài liệu, 30 phút, đi kèm gói A

`README.md:145-153` và `INSTRUCTOR-GUIDE.md:202` mô tả đúng kiến trúc nhưng **thiếu** hai điều
sắp thành quy tắc: (a) nhãn khối đi qua dictionary chứ không qua file dịch; (b) `slides/` và
`canvases/` có chủ đích không dịch. Thêm ~6 dòng vào README (mục site bilingual) và một mục
vào `INSTRUCTOR-GUIDE.md` §6. Đây cũng là chỗ ghi **lộ trình 32 → 17 → 2 → 0** (§9) để người
sau biết kế hoạch kết thúc ở đâu — tránh kiểu nợ "dịch cho hết ebook" không bao giờ đóng được.

### Tổng kết nỗ lực

| Gói | Việc | Thời gian | Từ nguồn cần dịch | Trang fallback sau |
|---|---|---|---|---|
| A | Nền tảng (7 mục A1–A7) | 2 ngày | 0 (nhãn, không prose) | 32 |
| B | Xương 15 chương | 0,5 ngày | ~0 (nhãn) | 32 |
| C | Đầu chương (info + objectives + summary) | 2 ngày | 5.300 | 32 → vẫn 32* |
| D | Errors + câu SELF-CHECK (không đáp án) | 2,5 ngày | 7.660 | 32 |
| E | 15 đề bài tập | 1,5 ngày | 6.410 | **17** |
| F | THEORY + PRACTICE + các đoạn khác, 15 chương | 10-12 ngày | 45.570 | **2** |
| G | Orientation + Agents | 1 ngày | 3.200 | **0** |
| H | Tài liệu maintenance | 0,5 giờ | 0 | 0 |
| | **Cộng** | **~20-22 ngày công** | **≈ 68.100** | |

\* Gói C và D chỉ dịch *vùng* trong chương, nên không xoá được thông báo fallback; chỉ E, F, G
mới làm được việc đó. Vì vậy phải theo dõi **hai** số (§9): số trang fallback *và* % phủ theo
chương. Nếu chỉ nhìn fallback, hai tuần làm việc nặng vẫn hiện ra là "không tiến bộ".

Lưu ý về con số 68.100: đó là **phần nằm ngoài đáp án `<details>`**. Toàn bộ 19.507 từ đáp án
không nằm trong kế hoạch này (xem §4 và T16+ ở §8.2). Một chương chỉ đạt ngưỡng "đã dịch"
(§9) khi phần thân xong; đáp án tiếng Anh bên trong `<details>` là trạng thái chấp nhận được
và có chủ đích.

Phần **không** làm: 21.151 từ code, 19.507 từ đáp án `<details>` (có chủ đích — xem §4),
37.547 từ deck, 8.023 từ Marp, 16.598 từ exercise. Tổng để ngoài kế hoạch: **~103.000 từ**,
nhiều hơn cả phần được làm. Một kế hoạch không nói rõ mình bỏ gì sẽ bị đọc như lời hứa dịch
200.000 từ.

---

## 7. Glossary và danh sách từ cần quyết định một lần

### 7.1 Nguyên tắc từ vựng: Keep – Translate – Signpost

Repo đã có rule (comment đầu `_tools/i18n.mjs`, rule 2). Đây là bản mở rộng cho prose:

| Keep (giữ tiếng Anh, không dịch) | Translate (dịch) | Signpost (ghi chú lần đầu) |
|---|---|---|
| Tên công nghệ: HTML, CSS, JavaScript, Git, GitHub, VS Code, Dreamweaver, WordPress | Câu giải thích khái niệm | `box model (mô hình hộp)` |
| Thẻ/tục tính: `<header>`, `padding`, `font-family`, `!important`, `@media` | Hướng dẫn từng bước | `specificity (độ ưu tiên)` |
| Đường dẫn, tên file, URL: `css/style.css`, `index.html` | Lý do / hậu quả / mẹo | `viewport (vùng hiển thị)` |
| Từ đã là thuật ngữ khoá học: **slide, rubric, repository, commit, deploy, host/hosting, branch** | Mô tả lỗi và cách sửa | `landmark (vùng định vị)` |
| Chuỗi lỗi trình duyệt in ra: `404 Not Found`, `unexpected }` | Câu hỏi tự kiểm tra | `breakpoint (điểm dừng)` |

Lý do `slide`, `rubric`, `repository` giữ nguyên **có ghi chép** trong repo (`i18n.mjs`
comment + `PROMPTS-cham-tu-dong.md:267`): giảng viên chiếu slide, công cụ chấm in "rubric",
và sinh viên gõ `git`. Dịch sang "trang chiếu"/"bảng tiêu chí"/"kho chứa" tạo ra một từ điển
riêng mà không môi trường nào họ dùng có.

### 7.2 Glossary Anh → Việt (dùng thống nhất, quyết một lần cho cả khoá)

Nhóm **khái niệm nền** — dịch sang tên đã thành chuẩn ở Việt Nam:

| EN | VI đề xuất | Ghi chú |
|---|---|---|
| website / web page | trang web / trang | không viết "trang mạng" |
| browser | trình duyệt | |
| server | máy chủ | |
| domain name | tên miền | |
| hosting | hosting *(giữ)* | hoặc "nơi lưu trữ" khi nói với người mới |
| extension (`.html`) | phần đuôi file / phần mở rộng | |
| absolute / relative path | đường dẫn tuyệt đối / tương đối | |
| folder / directory | thư mục | |
| root folder | thư mục gốc | |
| live / publish | lên sóng / công bố | site đã *lên sóng* |
| syntax | cú pháp | |
| validation | kiểm tra tính hợp lệ | động từ: "validate" → "kiểm tra hợp lệ" |
| encoding | bảng mã | UTF-8 là bảng mã |
| accessibility | khả năng tiếp cận | đừng dùng "trợ giúp người khuyết tật" |
| semantics / semantic HTML | ngữ nghĩa / HTML ngữ nghĩa | |
| responsive | responsive *(giữ)* | hoặc "thích ứng" khi cần giải thích |
| layout | bố cục | không dùng "layout" nửa vời trong văn xuôi |
| navigation | điều hướng | |
| wireframe | bản phác bố cục (wireframe) | signpost |
| design brief | đề bài thiết kế | |

Nhóm **CSS** — giữ nguyên tên thuộc tính, dịch khái niệm:

| EN | VI đề xuất |
|---|---|
| selector | bộ chọn (selector) |
| declaration | khai báo |
| rule | quy tắc |
| property / value | thuộc tính / giá trị |
| cascade | cascade (thác đổ) |
| specificity | độ ưu tiên (specificity) |
| inheritance | kế thừa |
| box model | mô hình hộp (box model) |
| padding / margin / border | padding / margin / border — **giữ nguyên**, dịch là "lớp đệm trong/ngoài" chỉ khi giải thích |
| content box / border-box | hộp nội dung / `border-box` |
| shorthand | viết tắt (shorthand) |
| reset (CSS reset) | reset (đặt lại mặc định) |
| class / ID | class / ID — **giữ nguyên** |
| web font / fallback font | font web / font dự phòng |
| media query | media query *(giữ)* |
| breakpoint | điểm dừng (breakpoint) |
| viewport | vùng hiển thị (viewport) |

Nhóm **HTML cấu trúc**:

| EN | VI đề xuất |
|---|---|
| heading | thẻ heading / tiêu đề |
| paragraph | đoạn văn (`<p>`) |
| ordered / unordered list | danh sách có thứ tự / không thứ tự |
| list item | mục danh sách |
| alt text | văn bản thay thế (`alt`) |
| thumbnail | ảnh thu nhỏ (thumbnail) |
| raster / vector | ảnh raster / ảnh vector |
| table cell / header cell | ô bảng / ô tiêu đề |
| rowspan / colspan | **giữ nguyên** (là thuộc tính) |
| form / field / label | biểu mẫu / trường / nhãn (`label`) |
| submit button | nút gửi (submit) |
| placeholder | placeholder *(giữ)* hoặc "chữ gợi ý" |
| radio button / checkbox / dropdown | nút chọn đơn / hộp chọn / danh sách thả xuống |
| validation | kiểm tra dữ liệu nhập |
| video / audio / embed | video / audio / nhúng |
| codec | codec *(giữ)* |

Nhóm **quy trình và đánh giá**:

| EN | VI đề xuất |
|---|---|
| session | Buổi |
| chapter | Chương |
| homework | Bài tập |
| exercise | Bài tập trên lớp |
| rubric | rubric *(giữ)* |
| milestone | mốc (M1…M8) |
| capstone project | đồ án cuối kỳ |
| CLO / learning objective | kết quả học tập / mục tiêu học tập |
| midterm / final | thi giữa kỳ / thi cuối kỳ |
| grace day | ngày nộp muộn (−20%) |
| deadline | hạn nộp |
| repository / commit / push | repository / commit / push *(giữ)* |

### 7.3 Mười lăm tên `topicVi` đề xuất

Cột EN là `SESSIONS[n].topic` hiện hành (`build-site.mjs:286-300`) — không đổi.

| n | topic (EN, giữ nguyên) | `topicVi` đề xuất |
|---|---|---|
| 1 | Introduction to Dreamweaver & Web Fundamentals | Làm quen Dreamweaver và nền tảng web |
| 2 | Creating a New Site & Organizing Your Project | Tạo site mới và tổ chức dự án |
| 3 | Working with Text and Images | Làm việc với văn bản và hình ảnh |
| 4 | Applying CSS to Your Website | Áp dụng CSS vào website |
| 5 | Creating Page Layouts | Tạo bố cục trang |
| 6 | Creating Page Layouts (Continued) | Tạo bố cục trang (tiếp theo) |
| 7 | CSS3 and Web Fonts | CSS3 và font web |
| 8 | Review & Midterm Exam Preparation | Ôn tập và chuẩn bị thi giữa kỳ |
| 9 | Working with Tables | Làm việc với bảng |
| 10 | Embedding Flash, Video and Sound | Nhúng Flash, video và âm thanh |
| 11 | Designing a Compact Site | Thiết kế một site gọn |
| 12 | Using Code-Editing Tools | Dùng công cụ sửa code |
| 13 | Creating Forms | Tạo biểu mẫu |
| 14 | Working with Spry Framework | Làm việc với Spry Framework |
| 15 | Mobile Interface Design and Review | Thiết kế giao diện di động và ôn tập |

---

## 8. Lịch theo tuần

### 8.1 neo thời gian

`schedule.md` chỉ dùng **số tuần**, không có ngày tuyệt đối (đã kiểm tra: bảng Key Dates ghi
`Week 8`, `Week 15`, `Week 16 Sunday 23:59`). Ngày duy nhất có thật trong repo là
`HANDOVER-teaching-start.md:3` — *"teaching begins the following day"* sau 2026-09-06, tức
**khóa khai giảng thứ Hai 07/09/2026**. Từ đó suy ra:

| Tuần khoá học | Ngày (thứ Hai → Chủ nhật) | Sự kiện |
|---|---|---|
| W1 | 07–13/09/2026 | Buổi 1 — *đang diễn ra* |
| W8 | 26/10–01/11/2026 | **Thi giữa kỳ** (sessions 1–7) |
| W11 | 16–22/11/2026 | Điểm rơi khuyến nghị để đọc Phụ lục A (nó tự ghi "sau Buổi 11") |
| W15 | 14–20/12/2026 | **Thi cuối kỳ** + buổi 15 |
| W16 | 21–27/12/2026 | Nộp ZIP đồ án, Chủ nhật 23:59 |

**Hệ quả lên lịch dịch:** việc dịch **phải chạy trước giảng dạy một tuần**, vì sinh viên đọc
chương của tuần *trước khi lên lớp*. Hôm nay là 09/09 — tuần 1 đã bắt đầu, nên lịch dưới đây
không bắt đầu bằng "dịch chương 1".

### 8.2 Lịch 14 tuần, hai luồng song song

Luồng **KỸ THUẬT** (gói A, G, H — cần code) và luồng **NỘI DUNG** (B, C, D, E, F — chỉ cần
markdown, làm song song được, có thể giao cho người không biết build).

| Tuần lịch | Tuần khoá | Luồng kỹ thuật | Luồng nội dung | Gate phải xanh |
|---|---|---|---|---|
| T0 | W1 (07–13/09) | **A1 + A4 + A5** | chốt glossary §7 (1 giờ, xem §11) | `qa:site` |
| T1 | W2 | **A2 + A3** | đọc lại Phụ lục A như mẫu; lập LEDGER.json rỗng | `qa:site` |
| T2 | W2 | **A6 + A7** (`qa-i18n`, CI, trạng thái `partial`) | **B**: `topicVi` 15 buổi + dictionary nhãn | `qa:site`, `qa:i18n` |
| T3 | W3 | — | **C** lô 1: đầu chương 01–05 → LEDGER ghi `partial` | `qa:i18n` |
| T4 | W4 | **H**: README + INSTRUCTOR-GUIDE | **E**: homework 01–07 | tất cả |
| T5 | W5 | — | **E**: homework 08–15 → **fallback 32 → 17** | tất cả |
| T6 | W6 | — | **C** lô 2+3: đầu chương 06–15 | tất cả |
| T7 | W7 | — | **D**: Common Errors 01–08 + câu SELF-CHECK 01–08 | tất cả |
| T8 | **W8 giữa kỳ** | *không đụng nội dung trong tuần thi* | **D** tiếp: Errors 09–15 | tất cả |
| T9 | W9 | **G**: đưa body `orientation`/`ai-agents` ra markdown 2 bản | **F**: chương 01–02 → LEDGER `full` | tất cả |
| T10 | W10 | — | **F**: chương 03–05 | tất cả |
| T11 | W11 | — | **F**: chương 06–08 (08 = ôn giữa kỳ, hữu ích nhất lúc này) | tất cả |
| T12 | W12 | — | **F**: chương 09–11 | tất cả |
| T13 | W13 | — | **F**: chương 12–13 | tất cả |
| T14 | W14 | — | **F**: chương 14–15 → **fallback → 0** | tất cả |
| T15 | **W15 thi** | *đóng băng* | chỉ sửa lỗi nhỏ | tất cả |
| T16+ | nghỉ | — | 19.507 từ đáp án `<details>`, nếu còn muốn | — |

Hai điểm đã đổi so với bản nháp đầu, và cả hai đều do kiểm chứng mà ra:

- **A7 nằm ở T2, trước C.** Không có nó thì mọi ô "C" ở T3/T6 là không thể làm trung thực (§5.7).
- **Tổng ~20-22 ngày công, không phải ~17**, vì phép đo tách `<details>` cho thấy Gói F thật
  là 45.570 từ chứ không phải 26.000 (§1.1). Lịch trên vẫn chạy được vì F dàn ra T9–T14
  (6 tuần × 2-3 chương ≈ 7.600 từ/tuần).

Ba quy tắc của lịch này:

1. **T2 trở đi không được trễ quá 1 tuần**, vì mọi gói nội dung sau đó phụ thuộc gate A6 và
   dictionary A2. Trễ A2 = cả tuần T3-T7 phải dịch lại nhãn bằng tay.
2. **Tuần thi (T8, T15) đóng băng.** Repo đã có tiền lệ: `INSTRUCTOR-GUIDE.md:277` từ chối
   đổi `min-width` giữa học kỳ *vì phải sửa đồng thời 5 tầng học liệu*. Dịch cũng vậy — một
   trang đang có sinh viên đọc không được đổi giữa tuần thi.
3. **Nếu chỉ làm được 3 tuần: T0, T1, T2** (toàn bộ gói A + B). Đó là điểm "dừng có giá trị":
   sau 3 tuần, 100% trang `site/vi/` có điều hướng, tiêu đề, mục lục và nhãn bước bằng tiếng
   Việt, và mọi thứ còn lại có thể thêm dần mà không vỡ gì. Đây là khuyến nghị thật của tài
   liệu này nếu thời gian có hạn.

### 8.3 Nhịp lặp cho mỗi lô dịch (đọc trước khi bắt đầu, vì OneDrive)

OneDrive đã gây lỗi build/QA khi chạy lệnh song song (đã ghi nhận ở phiên trước). Nhịp chuẩn:

```powershell
# 1. MỘT lệnh, lần lượt, không song song:
npm.cmd run build:site; npm.cmd run qa:i18n; npm.cmd run qa:site; npm.cmd run qa

# 2. Đọc 3 con số trong output:
#    - "all 106 generated pages exist in both trees"  → cấu trúc hai cây vẫn khớp
#    - "fallback notice appears exactly where…"       → số trang fallback GIẢM đúng dự kiến
#    - qa:i18n: % phủ từng chương                      → chương nào dịch thật, chương nào 40%

# 3. commit + push, rồi kiểm tra CI:
gh run list --repo hieutachi/INS2053-Web-Authoring-and-Web-Management-IS_VNU_Course --branch main --limit 3
```

Nếu `build:site` báo `site/` trống hoặc QA fail không giải thích được → nhiều khả năng là
khoá file của OneDrive, không phải lỗi nội dung: chạy lại **đúng một lần** chuỗi trên theo
thứ tự, hoặc tạm pause OneDrive trong lúc build.


---

## 9. Đo lường: hai con số, không phải một

| Chỉ số | Lấy từ đâu | Hôm nay | Sau A+B | Sau C | Sau E | Sau F+G |
|---|---|---|---|---|---|---|
| Trang `lang-fallback` trong `site/vi/` | output `qa:site` nhóm 15, hoặc lệnh §9.1 | **32** | 32 | 32 | 17 | **0** |
| Trang đang ở trạng thái `partial` (callout mới, cần A7) | `i18n/vi/LEDGER.json` | 0 | 0 | **15** | 15 | **0** |
| % từ hiển thị **đã dịch** — mẫu số 87.612 (= 78.002 ebook + 6.410 homework + 3.200 orientation/agents) | `qa-i18n.mjs` mục 10 | **1%** | 1% | 9% | 17% | **100%** |
| Số chương ebook đạt ≥ 85% **phạm vi dịch được** (ngưỡng "được tính là đã dịch") | `qa-i18n.mjs` mục 10 | 1/16 | 1/16 | 1/16 | 1/16 | **16/16** |
| Trang VI có điều hướng + TOC + nhãn bước tiếng Việt | `qa:i18n` mục 3 | 0/53 | **53/53** | 53/53 | 53/53 | 53/53 |
| Khoá `topicVi` phủ | đếm trong `SESSIONS` | 0/15 | **15/15** | 15/15 | 15/15 | 15/15 |

Đọc bảng theo **cột**, không theo hàng: sau Gói A+B, số trang fallback **không đổi** (32)
nhưng hàng điều hướng/TOC nhảy từ 0 lên 53 — đó là lúc phần lớn giá trị đã nằm trên site.
Hàng "% từ hiển thị" chỉ đi lên ở F+G. Hai nhóm hàng này đo hai chuyện khác nhau có chủ đích
(xem ghi chú ở §6, *Tổng kết nỗ lực*).

Định nghĩa "phạm vi dịch được" phải được ghi rõ trong `qa-i18n.mjs`, nếu không chỉ tiêu này sẽ
vô nghĩa: **toàn bộ từ hiển thị, trừ (a) code trong fence và (b) đáp án bên trong
`<details>`**. Lý do (b) quan trọng: `qa:site` quyết định hiện thông báo fallback **chỉ bằng
sự tồn tại của file `i18n/vi/…`**, nên khi Gói F xong, 15 chương sẽ mất thông báo fallback dù
bên trong vẫn còn ~19.500 từ đáp án tiếng Anh. Không định nghĩa phạm vi một cách trung thực thì
con số "% phủ" sẽ tự nó nói dối — đó chính là lỗ hổng A7 ở §5.7.

Ba con số **không bao giờ về 0**, và nên nói công khai để không bị hiểu là dịch ẩu —

- **21.151 từ code** trong `site/vi/` mãi mãi tiếng Anh: đó là nội dung dạy.
- **37.547 từ deck** tại `site/slides/` (một bản dùng chung) tiếng Anh, kèm ghi chú giải
  thích ở §3.4 / việc A5.
- **~45 thuật ngữ** giữ nguyên theo §7.1.

### 9.1 Lệnh đo nhanh (chạy được ngay hôm nay, chưa cần code mới)

```powershell
# Số trang fallback trong cây Việt (hiện = 32)
(Get-ChildItem site/vi -Recurse -Filter *.html |
  Where-Object { (Get-Content -Raw $_.FullName) -match 'lang-fallback' }).Count

# Danh sách chính xác — biết chương nào còn nợ
Get-ChildItem site/vi -Recurse -Filter *.html |
  Where-Object { (Get-Content -Raw $_.FullName) -match 'lang-fallback' } |
  ForEach-Object { $_.FullName.Replace("$PWD\site\vi\", "") }

# Điều hướng Việt còn lẫn tiếng Anh không (hiện: 15 topic + 15 tiêu đề chương + 15 hub h1)
Select-String -Path site/vi/index.html -Pattern 'class="topic"'
```

---

## 10. Rủi ro đã biết, và cái nào chặn nó

| Rủi ro | Chặn bằng | Nếu không chặn |
|---|---|---|
| Dịch homework → `qa:site` nhóm 11 đỏ → CI đỏ → không deploy | **A3** làm trước Gói E | Người dịch tưởng bản dịch sai; pipeline kẹt cả tuần |
| Dịch dòng `> 🖼 **Diagram:**` → mất liên kết sơ đồ | `qa-i18n.mjs` mục 7 | Deck không mở được từ sách — đúng chỗ `NHAN-XET-hoc-lieu-INS2053.md` từng phàn nàn |
| Dịch vào **trong** ASCII-art → khung vỡ cột | mục 1 (byte-identical) | Trang Việt nhìn hỏng, rất "máy dịch" |
| Dịch heading trong TOC nhưng không dịch heading → anchor lệch | `labelize()` chạy **trước** `makeRenderer()` → id sinh từ text đã Việt; QA nhóm 5 kiểm cả hai cây | Mục lục "On this page" chết trên 15 trang |
| Mất đáp án trong `<details>` khi dịch | mục 4 (đếm `<details>` + số câu) | Sinh viên tự học mất công cụ self-check — lý do tồn tại của ebook này |
| Dịch sang từ không ai dùng ("trang chiếu", "bảng tiêu chí") | §7 chốt một lần + review §11 | Đọc được site Việt nhưng không đọc nổi đề thi tiếng Anh |
| Chương dịch 40% bị đánh dấu "xong" | mục 10 + quy ước **< 85% = chưa tính là đã dịch** | fallback biến mất khỏi trang mà trang vẫn tiếng Anh — kiểu lỗi im lặng tệ nhất |
| Tiêu đề Việt tràn / dấu chồng lên nhau | **A4** (`line-height: 1.22`, `max-width: 30ch`) | trang chương chật, hỏng trên mobile |
| File dịch "chết" đặt ở `i18n/vi/slides/` | §4 cấm + `qa-i18n.mjs` fail khi thấy file không có cặp nguồn | một thư mục rác không ai giải thích được sau 6 tháng |
| OneDrive khoá file lúc build | §8.3: chạy **một** lệnh, lần lượt | QA fail giả, `site/` rỗng, tưởng là lỗi nội dung |


---

## 11. Bảy quyết định cần chủ khoá chốt **trước** khi code (~1 giờ)

1. **Phạm vi cuối:** đóng hết fallback (tới Gói G, ~21-23 ngày công), hay dừng sau Gói A+B+E
   (~5 ngày; vẫn còn 17 trang fallback nhưng toàn bộ khung nhìn đã là tiếng Việt)?
   *Khuyến nghị của tài liệu này: làm ngay A+B+E rồi quyết tiếp — đó là điểm tốt nhất về
   giá trị/công và không phải cam kết dài hạn.*
2. **Slide:** xác nhận `slides/` + `canvases/` **không dịch** (§4). Nếu thật sự muốn có slide
   tiếng Việt, đó là một dự án riêng (60 SVG + 2 gate QA phải đổi), không phải việc i18n.
3. **Glossary §7.2:** duyệt 45 thuật ngữ, nhất là `padding/margin/border`, `selector`,
   `breakpoint`, `media query`, `hosting`. Duyệt **một lần rồi không đổi** — đổi sau khi đã dịch
   10 chương nghĩa là sửa lại 10 file.
4. Có chấp nhận nguyên tắc *"đề thi và rubric dùng tiếng Anh, nên chữ Anh còn lại là có chủ
   đích và được giải thích công khai"* không? Nếu không, phải viết lại kế hoạch từ §2.
5. Ai review bản dịch, và review **bằng số của §9** (% phủ theo chương), không bằng cảm giác?
6. Có chấp nhận ràng buộc "`labelize()` **không** được làm thay đổi một byte nào của cây EN"
   — tức `git diff` trên `site/ebook`, `site/sessions`, `site/homework` (không có `vi/`) phải
   rỗng sau mỗi build? Ràng buộc này chính là thứ làm cả kế hoạch đảo ngược được và an toàn.
7. Ngày bắt đầu: khoá đã chạy từ 07/09, nên tuần này chỉ kịp Gói A. Xác nhận **không** đóng
   băng repo trong T0–T2.

---

## 12. Việc đầu tiên, cụ thể tới mức mở editor là làm được

Nếu chỉ chọn một việc cho hôm nay: **A1 + A5** (thêm A3 nếu định động tới homework), một commit.

```js
// 1) _tools/build-site.mjs:286-300 — thêm topicVi cho đủ 15 dòng (bảng §7.3)
{ n: 1, topic: "Introduction to Dreamweaver & Web Fundamentals",
  topicVi: "Làm quen Dreamweaver và nền tảng web" },

// 2) _tools/build-site.mjs — helper mới, đặt cạnh pad() ở dòng 303
const topicOf = (s, lang) => (lang === "vi" && s.topicVi) || s.topic;

// 3) thay s.topic bằng topicOf(s, lang) tại 4 chỗ: dòng 566, 598, 1411, 1471.
//    Không phải sửa signature nào: sessionHub(s, chapterTitle, lang) và
//    homePage(chapters, lang) đã có sẵn lang; dòng 1411/1471 nằm trong buildTree(lang).

// 4) _tools/i18n.mjs — UI.vi.idxSlidesLead: thêm một câu
//    "Bộ slide giữ tiếng Anh có chủ đích: đó là tài liệu giảng viên chiếu trên lớp,
//     và thuật ngữ trong sơ đồ đúng là nội dung khóa học dạy bằng tiếng Anh."
```

Sau đó chạy chuỗi ở §8.3 và xem **hai** điều:

- `site/vi/index.html`: bảng 15 tuần phải hiện `Áp dụng CSS vào website`;
  `site/vi/sessions/session-04.html` phải có `<h1>Buổi 4: Áp dụng CSS vào website</h1>`.
- `site/index.html` và mọi file cây EN **không đổi một byte**.

Điều thứ hai là phép thử cho cả kiến trúc: thêm tiếng Việt không được làm động tiếng Anh. Nếu
nó đổi, nghĩa là `topicOf()`/`labelize()` đang áp nhầm sang cây `en` — dừng lại, sửa xong mới
đi tiếp.

---

## 13. Phụ lục: các con số trong tài liệu này được đo thế nào

Mọi số liệu ở §1, §5.2, §7, §9 đến từ script tạm `_tools/tmp-*.mjs` đã chạy trên commit
`0674f56` rồi bị xoá (`.gitignore` có sẵn mục `_tools/tmp-*.js` và `_tools/tmp-*.mjs`). Ba phép
đo dễ lặp lại nhất:

| Con số | Cách đo |
|---|---|
| 78.002 từ hiển thị của ebook (58.495 ngoài đáp án + 19.507 trong `<details>`) | đếm token `[A-Za-zÀ-ÿ]+` trên mọi dòng ngoài fence code, trừ marker heading; tách riêng phần nằm trong `<details>` |
| 37.547 từ deck canvas | text trong `<H1..H3>/<Text>/<Callout>/<li>/<td>/<strong>` + `<text>` SVG + prop `title=` + prop `notes=`, trên 17 file |
| 32 trang fallback | lệnh §9.1 |
| 128 chuỗi chrome, 0,97x | so `UI.en` ↔ `UI.vi` trong `_tools/i18n.mjs`, strip HTML tag và `{slot}` |
| 0 internal anchor trong ebook | `Select-String ebook/*.md -Pattern '\]\(#'` → 0 kết quả |

**Việc nên làm cùng Gói H:** biến các phép đo đó thành `_tools/qa-i18n.mjs` mục 10 (bảng % phủ
theo chương) để số liệu không chết cùng file `tmp-`. Nếu không, mọi con số trong tài liệu này
sẽ sai ngay lần `ebook/` tiếp theo được sửa, và không ai còn cách nào kiểm chứng lại.

---

*Tài liệu này chưa thay đổi file học liệu nào. Toàn bộ repo vẫn ở `0674f56`, `npm run qa:site`
vẫn PASS với 32 trang fallback, và cây `site/vi/` vẫn nguyên như bản đang chạy trên GitHub
Pages.*


