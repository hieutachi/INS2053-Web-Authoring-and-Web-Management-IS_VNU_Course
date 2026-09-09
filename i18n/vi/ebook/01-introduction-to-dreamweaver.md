# 🟦 SESSION 1
# **Làm quen Dreamweaver và nền tảng web**

Chào mừng bạn tới buổi học đầu tiên của INS2053 — Web Authoring and Web Management! Hôm nay bạn sẽ tìm hiểu một trang web thực chất là gì, các trang web vận hành ra sao ở phía sau, và cách dùng một trình soạn thảo code (Dreamweaver CS6 hoặc VS Code) để tạo tệp HTML đầu tiên của mình. Kết thúc buổi học, bạn sẽ có một trang web thật chạy được, lưu trên máy và mở bằng bất kỳ trình duyệt nào. Đừng lo nếu mọi thứ còn mới mẻ — chúng ta sẽ đi qua từng bước một, và tới cuối khóa bạn sẽ tự tay dựng hoàn chỉnh một **Student Club Website**.

---

# 📌 THÔNG TIN BUỔI HỌC


```
📅 Thời lượng:   3 tiết (150 phút) — Lý thuyết ~60 phút, Thực hành ~90 phút
📚 Tham chiếu:   MDN "Getting Started with the Web"
                 https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
🎯 Mục tiêu:     1. Giải thích website, webpage và tệp HTML là gì
                 2. Nhận diện các phần chính trong vùng làm việc của code editor (Dreamweaver / VS Code)
                 3. Tạo một cấu trúc thư mục dự án đúng chuẩn cho website
                 4. Viết, lưu và xem thử trang HTML5 đầu tiên
                 5. Hiểu giải phẫu cơ bản của một tài liệu HTML
📖 Chuẩn bị:     1. Cài Adobe Dreamweaver CS6 HOẶC Visual Studio Code (miễn phí) trên laptop
                 2. Tạo một thư mục rỗng tên là "club-website" bên trong thư mục Documents
                 3. Đọc MDN "How the Web works" (link ở phần Đọc thêm bên dưới)
🖼 Sơ đồ:        canvases/buoi-01.canvas.tsx — RequestResponseCycle, TagAnatomy, HeadVsBody
🔗 Kết quả:      CLO1 (làm chủ kỹ năng thiết kế và xây dựng web)
                 CLO4 (thiết kế và xây dựng một ứng dụng web)
```

Tên sơ đồ và đường dẫn trong khối trên giữ nguyên tiếng Anh vì đó chính là nhãn xuất hiện
trong slide và trong đề thi.

---

# 🎯 MỤC TIÊU HỌC TẬP

Sau buổi học này, bạn có thể:

- Định nghĩa các thuật ngữ **website**, **web page**, **HTML file** và **web browser** bằng ngôn ngữ của mình
- Mô tả sự khác nhau giữa Design View, Code View và Split View trong Dreamweaver
- Điều khiển vùng làm việc của Dreamweaver (hoặc VS Code) một cách tự tin
- Tạo một thư mục dự án gọn gàng, có thư mục con dành cho images, CSS và JavaScript
- Viết mới một tài liệu HTML5 hợp lệ từ đầu và xem thử nó trong trình duyệt
- Giải thích vai trò của từng phần trong bộ khung HTML5 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`)

---

# 📖 LÝ THUYẾT

## 1. Website là gì?

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `RequestResponseCycle` — slide `how-web-works` ("How the Web Works")

### 1.1 Định nghĩa

Một **website** là tập hợp các **web page** liên quan tới nhau, được lưu trên một máy tính (máy của chính bạn hoặc một máy chủ trên internet) và nối với nhau bằng **hyperlink**. Mỗi trang web là một tệp riêng viết bằng một ngôn ngữ tên là **HTML** (HyperText Markup Language).

Khi ai đó gõ một địa chỉ website (chẳng hạn `www.studentclub.edu.vn`) vào trình duyệt, trình duyệt tải các tệp HTML từ máy chủ về và hiển thị chúng thành một trang có hình ảnh, chữ nghĩa.

### 🎒 Ví dụ đời thực

Hãy hình dung một website giống như một **quyển giáo trình**:

- **Quyển giáo trình** = toàn bộ website
- Mỗi **chương** = một trang web (một tệp `.html`)
- **Mục lục** = menu điều hướng dẫn tới từng chương
- **Nhà in** = máy chủ web lưu và phát hành cuốn sách
- **Đôi mắt người đọc** = trình duyệt đọc và hiển thị nội dung

Cũng như một quyển giáo trình gồm nhiều chương đóng lại với nhau, một website gồm nhiều trang HTML liên kết với nhau.

### 1.2 Vì sao quan trọng

| Lý do | Giải thích |
|--------|-------------|
| Hiểu cấu trúc | Bạn không thể dựng một website tốt nếu không hiểu rằng nó được tạo từ từng tệp riêng lẻ |
| Lên kế hoạch cho dự án | Biết mỗi trang là một tệp riêng giúp bạn vẽ ra cấu trúc thư mục trước khi bắt đầu viết code |
| Gỡ lỗi | Khi có thứ gì đó hỏng, phân biệt được trang — tệp — site giúp bạn tìm ra vấn đề nhanh hơn |
| Giao tiếp trong nhóm | Trong một dự án nhóm, mọi người phải thống nhất "page", "site" và "file" nghĩa là gì |

```
HOW A WEBSITE WORKS (simplified):

+------------------+       +----------------+       +------------------+
|  YOU (Author)    | ----> |  WEB SERVER    | ----> |  USER'S BROWSER  |
|                  |       |                |       |                  |
| Write HTML files |       | Stores files   |       | Reads HTML       |
| Upload to server |       | Sends files    |       | Displays page    |
+------------------+       +----------------+       +------------------+

For local testing (this course):
+------------------+       +------------------+
|  YOU (Author)    | ----> |  YOUR BROWSER    |
|                  |       |                  |
| Write HTML files |       | Opens local file |
| Save to folder   |       | Displays page    |
+------------------+       +------------------+
```

⚠️ Lưu ý quan trọng:

- Website KHÔNG phải một tệp duy nhất. Nó là nhiều tệp làm việc cùng nhau.
- Trang chính của bất kỳ website nào cũng nên đặt tên là `index.html`. Đây là quy ước phổ quát — máy chủ web tự động tìm tệp này khi có người ghé site của bạn.
- Dù suốt khóa học bạn làm việc trên máy của mình, các nguyên tắc vẫn y hệt khi bạn công bố site lên internet sau này.

---

## 2. Tệp HTML là gì?

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `TagAnatomy` — slide `what-is-html` ("What Is an HTML File?")

### 2.1 Định nghĩa

Một **HTML file** là một tệp văn bản thuần (plain text) chứa chỉ dẫn dành cho trình duyệt. Các chỉ dẫn này được viết bằng những ký hiệu đặc biệt gọi là **tag**. Tag cho trình duyệt biết những điều như "đây là một tiêu đề", "đây là một đoạn văn", "đây là một hình ảnh", v.v.

Phần đuôi `.html` báo cho hệ điều hành và trình duyệt biết tệp này chứa mã HTML.

### 🎒 Ví dụ đời thực

Hãy hình dung một tệp HTML giống như một **thẻ công thức nấu ăn**:

- Bản thân thẻ công thức = tệp `.html`
- Danh sách nguyên liệu = nội dung (chữ, hình ảnh)
- Các bước nấu = những tag HTML chỉ trình duyệt cách hiển thị từng nguyên liệu
- Người đầu bếp = trình duyệt, người làm theo chỉ dẫn

Đưa cùng một thẻ công thức cho hai đầu bếp khác nhau, họ sẽ cho ra món gần giống nhau. Tương tự, nếu bạn đưa một tệp HTML cho Chrome, Firefox hay Edge, cả ba đều hiển thị một trang gần như nhau.

### 2.2 Vì sao quan trọng

| Khái niệm | Vì sao bạn cần biết |
|---------|------------------------|
| Định dạng văn bản thuần | Tệp HTML chỉ là text — bạn có thể mở nó bằng Notepad, nhưng một trình soạn thảo code khiến mọi việc dễ hơn nhiều |
| Phần đuôi `.html` | Nếu bạn lưu tệp thành `.txt` thay vì `.html`, trình duyệt sẽ không coi đó là một trang web |
| Tag | Tag là viên gạch của mọi trang web; không hiểu tag thì không viết được HTML |
| Không phụ thuộc trình duyệt | Mọi trình duyệt hiện đại đều đọc được mọi tệp HTML hợp lệ — bạn không bị khóa vào một công cụ |

⚠️ Lưu ý quan trọng:

- HTML **không** phải ngôn ngữ lập trình. Nó là một **ngôn ngữ đánh dấu** (markup language) — nó mô tả cấu trúc của nội dung, không phải logic hay phép tính.
- Tệp HTML đọc được bằng mắt thường. Bạn có thể chuột phải vào bất kỳ tệp `.html` nào và mở bằng Notepad để xem mã nguồn.
- Luôn viết tag chữ thường: `<p>` chứ không phải `<P>`. Cả hai có thể chạy, nhưng chữ thường mới là chuẩn.

### 🧪 Tự thử — Đọc HTML của một trang thật

**Nhiệm vụ (4 phút):** Xác nhận rằng mọi site bạn đang dùng đều được dựng từ đúng những tag bạn đang học.

1. Mở một trang tin tức bất kỳ hoặc trang chủ của trường bạn.
2. Nhấn **Ctrl+U** để xem mã nguồn.
3. Nhấn **Ctrl+F** trong khung đó và tìm `<h1`, rồi tìm `<img`, rồi tìm `<a href`.

**Kết quả mong đợi:** Bạn tìm thấy cả ba. Trang đó dài và rối hơn trang của bạn, nhưng vốn từ thì giống hệt.

<details>
<summary>Đống rối kia là gì</summary>

Trang thật chứa đầy tên class do máy sinh ra, các script phân tích và output của framework. Không có gì trong đó là một ngôn ngữ khác — vẫn là HTML, chỉ do công cụ viết ra thay vì do người gõ tay. Kỹ năng bạn đang rèn là đọc ra cấu trúc xuyên qua chỗ rối đó: tìm `<body>`, rồi xem bên trong nó có những landmark element nào.

</details>


---

## 3. Trình duyệt web

### 3.1 Định nghĩa

Một **web browser** (trình duyệt web) là phần mềm đọc tệp HTML và hiển thị (render) nó thành trang web trực quan. Các trình duyệt phổ biến gồm Google Chrome, Mozilla Firefox, Microsoft Edge và Safari.

Trình duyệt làm ba việc:

1. **Tải về** (Downloads) tệp HTML — từ một máy chủ hoặc từ ổ cứng máy bạn
2. **Phân tích** (Parses) mã HTML — đọc và hiểu từng tag
3. **Hiển thị** (Renders) trang — vẽ chữ, hình ảnh, màu sắc và bố cục lên màn hình

### 🎒 Ví dụ đời thực

Hãy hình dung trình duyệt như một **phiên dịch viên tại Liên Hợp Quốc**:

- Người nói trình bày bằng một ngôn ngữ (mã HTML)
- Phiên dịch viên lắng nghe từng chữ (parse HTML)
- Phiên dịch viên chuyển lại ý đó bằng ngôn ngữ khác (hiển thị trang)

Những phiên dịch viên khác nhau có thể đặt câu hơi khác nhau một chút, nhưng ý nghĩa thì giữ nguyên. Tương tự, Chrome và Firefox có thể hiển thị một trang với vài khác biệt rất nhỏ, nhưng kết quả tổng thể vẫn như nhau.

### 3.2 Vì sao quan trọng

| Lý do | Chi tiết |
|--------|--------|
| Kiểm thử | Bạn nên thử trang của mình trên ít nhất hai trình duyệt để phát hiện khác biệt về cách hiển thị |
| Developer Tools | Mọi trình duyệt hiện đại đều có Developer Tools tích hợp (nhấn F12) cho phép bạn soi trang của mình |
| Hành vi mặc định | Mỗi trình duyệt có style mặc định cho heading, paragraph, link, v.v. — đó là lý do một trang chưa có CSS vẫn đọc được |
| Cập nhật | Trình duyệt cập nhật liên tục; tính năng mới xuất hiện dần theo thời gian |

⚠️ Lưu ý quan trọng:

- Với khóa học này, chúng tôi khuyến nghị **Google Chrome** hoặc **Microsoft Edge** làm trình duyệt kiểm thử chính.
- Nhấn **F12** ở bất kỳ trình duyệt nào để mở Developer Tools — một trong những công cụ gỡ lỗi quan trọng nhất mà bạn sẽ dùng.
- Đừng bao giờ giả định trang của bạn giống nhau trên mọi trình duyệt. Hãy luôn kiểm tra.

---

## 4. Trình soạn thảo code: Dreamweaver với VS Code

### 4.1 Định nghĩa

Một **code editor** (trình soạn thảo code) là trình soạn thảo văn bản chuyên dụng dành cho việc viết code. Khác với phần mềm soạn thảo văn bản thông thường (như Microsoft Word), code editor cung cấp:

- **Syntax highlighting** — tô màu khác nhau cho tag, attribute và value
- **Auto-completion** — gợi ý tag và attribute khi bạn gõ
- **Số dòng** — dễ tìm lỗi khi trình duyệt báo "error on line 47"
- **Quản lý tệp** — thấy toàn bộ tệp của dự án trong một panel
- **Live preview** — thấy thay đổi tức thì mà không phải đổi cửa sổ

### 4.2 Dreamweaver CS6

Adobe Dreamweaver CS6 ra mắt năm 2012, từng là một trong những công cụ phát triển web phổ biến nhất thời đó. Các tính năng chính:

- **Design View** — trình soạn thảo WYSIWYG (What You See Is What You Get), cho phép kéo thả phần tử trực quan
- **Code View** — trình soạn thảo code truyền thống có tô màu cú pháp
- **Split View** — hiện cả Design và Code cạnh nhau
- **Site Management** — công cụ tích hợp sẵn để khai báo và quản lý tệp của dự án
- **Properties Panel** — cho phép sửa thuộc tính của một phần tử bằng giao diện

```
DREAMWEAVER CS6 WORKSPACE (simplified):

+---------------------------------------------------------------+
|  Menu Bar                                                     |
|  (File | Edit | View | Insert | Modify | Text | Site)         |
+---------------------------------------------------------------+
|  Document Toolbar                                             |
|  [ Design | Split | Code ]  [ Title field ]  [ Preview btn ]  |
+---------------------+-----------------------------------------+
|                     |                                         |
|  Files Panel        |   Document Window                       |
|  (Your project      |   (Shows Design View, Code View,        |
|   files listed      |    or Split View depending on           |
|   here)             |    which mode you selected)             |
|                     |                                         |
|  - index.html       |                                         |
|  - about.html       |                                         |
|  - images/          |                                         |
|  - css/             |                                         |
|                     |                                         |
+---------------------+-----------------------------------------+
|  Properties Panel                                             |
|  (Shows options for whatever element is currently selected)   |
+---------------------------------------------------------------+
```

### 4.3 VS Code (Visual Studio Code)

VS Code là trình soạn thảo code miễn phí, mã nguồn mở của Microsoft, và là chuẩn công nghiệp hiện nay. Các tính năng chính:

- **Nhẹ và nhanh** — mở tức thì, kể cả trên máy cấu hình cũ
- **Extensions** — hàng nghìn tiện ích miễn phí cho HTML, CSS, live preview, Git và nhiều thứ khác
- **Terminal tích hợp** — chạy lệnh mà không phải rời khỏi trình soạn thảo
- **Tích hợp Git** — quản lý phiên bản ngay trong editor
- **Extension Live Server** — tự động nạp lại trình duyệt mỗi khi bạn lưu tệp

### 🔍 Bảng so sánh

| Hạng mục | Dreamweaver CS6 | VS Code |
|---------|----------------|---------|
| Giá | Trả phí (đắt) | Miễn phí, mã nguồn mở |
| Năm phát hành | 2012 | 2015 (vẫn được cập nhật) |
| Design View (WYSIWYG) | Có | Không (dùng extension Live Server thay thế) |
| Sửa code | Tốt | Rất tốt |
| Extensions / Plugins | Hạn chế | Hàng nghìn cái có sẵn |
| Tốc độ | Chậm hơn trên hệ thống hiện đại | Nhanh và nhẹ |
| Mức dùng trong ngành hiện nay | Hiếm | Rất phổ biến |
| Quản lý site tích hợp | Có | Dùng extension hoặc tự cấu hình |
| Hỗ trợ Git | Cơ bản | Rất tốt |
| Phù hợp nhất với khóa này | Học trực quan + code song song | Quy trình làm việc chuyên nghiệp |

⚠️ Lưu ý quan trọng:

- **Với khóa học này, bạn dùng Dreamweaver CS6 hoặc VS Code đều được.** Giảng viên sẽ demo trên Dreamweaver, nhưng mọi ví dụ code hoạt động y hệt trên cả hai editor.
- Nếu chọn VS Code, hãy cài extension **"Live Server"** của Ritwick Dey — nó cho bạn khả năng xem thử gần giống Design View của Dreamweaver.
- Dreamweaver CS6 là phần mềm cũ, một số tính năng có thể không hoàn hảo trên Windows 11. VS Code được khuyến nghị cho đường dài.
- Dù dùng editor nào, **bạn vẫn phải học cách đọc và viết trực tiếp mã HTML.** Đừng chỉ dựa vào công cụ kéo thả trực quan.

---

## 5. Cấu trúc thư mục dự án

### 5.1 Định nghĩa

**Cấu trúc thư mục dự án** (project folder structure) là cách bạn tổ chức toàn bộ tệp tạo nên website của mình. Tổ chức tốt giúp bạn tránh nhầm lẫn, link hỏng và tệp bị thất lạc.

Mọi website chuyên nghiệp đều dùng một cấu trúc thư mục nhất quán. Với Student Club Website của chúng ta, bạn sẽ dùng đúng cấu trúc này suốt khóa học:

```
club-website/              <-- Root folder (your "site")
│
├── index.html                   <-- Home page (MUST be named index.html)
├── about.html                   <-- About Us page
├── events.html                  <-- Events page
├── contact.html                 <-- Contact page
│
├── images/                      <-- ALL images go here
│   ├── club-logo.png
│   ├── banner.jpg
│   └── team-photo.jpg
│
├── css/                         <-- ALL stylesheets go here
│   └── style.css
│
├── js/                          <-- ALL JavaScript files go here
│   └── main.js
│
└── documents/                   <-- Downloads, PDFs, etc.
    └── club-constitution.pdf
```

### 🎒 Ví dụ đời thực

Hãy hình dung thư mục dự án như một **tủ hồ sơ trong văn phòng**:

- Bản thân tủ = thư mục gốc (`club-website/`)
- Mỗi ngăn kéo = một thư mục con (`images/`, `css/`, `js/`, `documents/`)
- Mỗi tờ giấy trong ngăn = một tệp (`logo.png`, `style.css`, `main.js`)

Nếu bạn nhét tất cả giấy vào một ngăn mà không phân loại, bạn sẽ không bao giờ tìm thấy gì. Với tệp của website cũng vậy.

### 5.2 Vì sao quan trọng

| Lợi ích | Giải thích |
|---------|-------------|
| Dễ điều hướng | Bạn luôn biết chỗ tìm images, style hay script |
| Đường dẫn tương đối chạy đúng | Liên kết giữa các tệp phụ thuộc vào vị trí thư mục đoán trước được |
| Làm việc nhóm | Mọi người trong nhóm đều biết đặt tệp mới ở đâu |
| Triển khai (deployment) | Khi bạn tải lên máy chủ, toàn bộ cấu trúc thư mục được sao y nguyên |
| Bảo trì | Sáu tháng sau bạn vẫn tìm và cập nhật tệp nhanh chóng |

⚠️ Lưu ý quan trọng:

- **Không bao giờ** lưu tệp website ngay trên Desktop hoặc rải rác ở nhiều nơi.
- **Luôn** tạo cấu trúc thư mục TRƯỚC khi bắt đầu viết code.
- Giữ tên thư mục và tệp **chữ thường**, dùng **dấu gạch nối** thay vì khoảng trắng, và tránh ký tự đặc biệt.
- Tên thư mục gốc nên trùng với tên dự án: `club-website`.
### 🧪 Tự thử — Tạo cấu trúc thư mục ngay bây giờ

**Nhiệm vụ (5 phút):** Tạo đúng cái cây thư mục bạn sẽ dùng cho toàn bộ đồ án cuối kỳ.

1. Trong `Documents`, tạo một thư mục tên chính xác là `club-website`.
2. Bên trong, tạo bốn thư mục con — giống hệt bốn cái trong cây ở mục 5: `images`, `css`, `js`, `documents`.
3. Trong VS Code, dùng **File → Open Folder** và chọn `club-website`.
4. Trên sidebar Explorer, tạo một `index.html` rỗng ở thư mục gốc và một `style.css` rỗng bên trong `css`.

**Kết quả mong đợi:** Sidebar hiển thị `club-website` ở trên cùng, bên dưới là `css`, `documents`, `images`, `js` và `index.html`.

> Giữ đúng những tên này. Mọi buổi học sau, mọi bài tập về nhà và đồ án cuối kỳ đều giả định
> cái cây đó, nên `images` (không phải `img`) và `css` (không phải `styles`) quan trọng ngay từ ngày đầu.

<details>
<summary>Vì sao phải mở thư mục, không mở từng tệp</summary>

Mở một *thư mục* cho VS Code một project root. Đó chính là điều khiến Live Server, gợi ý đường dẫn tương đối và tìm kiếm toàn dự án hoạt động. Mở một tệp lẻ thì bạn chỉ có một trình soạn thảo, không có gì thêm.

Lưu ý thêm: mọi tên ở đây đều chữ thường và không có khoảng trắng. Máy chủ chạy Linux coi `IMG/` và `img/` là hai thư mục khác nhau, nên giữ chữ thường ngay từ đầu giúp bạn khỏi phải đi tìm ảnh vỡ sau lần tải lên đầu tiên.

</details>


---

## 6. Tạo tệp HTML đầu tiên

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `HeadVsBody` — slide `head-vs-body` ("Where Does Each Part Show Up?")

### 6.1 Bộ khung HTML5

Mọi trang HTML5 đều bắt đầu bằng cùng một cấu trúc. Người ta gọi đó là **boilerplate**. Hãy nhớ nằm lòng khối này — bạn sẽ dùng nó cho mọi trang mình tạo:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title Here</title>
</head>
<body>
    <!-- All visible content goes here -->
</body>
</html>
```

### 6.2 Giải thích từng dòng

| Dòng | Code | Vai trò |
|------|------|---------|
| 1 | `<!DOCTYPE html>` | Báo cho trình duyệt "đây là tài liệu HTML5". Thiếu nó, trình duyệt có thể rơi vào "quirks mode" và hiển thị trang sai. |
| 2 | `<html lang="en">` | Phần tử gốc. Mọi thứ khác nằm bên trong tag này. `lang="en"` cho trình duyệt và công cụ tìm kiếm biết trang viết bằng tiếng Anh. |
| 3 | `<head>` | Chứa metadata — thông tin VỀ trang, KHÔNG hiển thị trên chính trang đó. |
| 4 | `<meta charset="UTF-8">` | Đặt bảng mã ký tự là UTF-8, hỗ trợ gần như mọi ngôn ngữ và ký hiệu. LUÔN có dòng này. |
| 5 | `<meta name="viewport"...>` | Giúp trang responsive trên thiết bị di động. Bắt buộc nếu muốn thiết kế web hiện đại. |
| 6 | `<title>` | Đặt chữ hiển thị trên tab trình duyệt. Công cụ tìm kiếm cũng dùng nó làm tiêu đề kết quả. |
| 7 | `</head>` | Đóng phần head. |
| 8 | `<body>` | Chứa MỌI THỨ nhìn thấy trên trang — chữ, hình ảnh, link, video, v.v. |
| 9 | `<!-- comment -->` | Một chú thích HTML. Comment vô hình trong trình duyệt nhưng giúp lập trình viên hiểu code. |
| 10 | `</body>` | Đóng phần body. |
| 11 | `</html>` | Đóng phần tử gốc. Hết tài liệu. |

### 🎒 Ví dụ đời thực

Hãy hình dung bộ khung HTML5 như một **bức thư trang trọng**:

- `<!DOCTYPE html>` = tiêu đề đầu thư cho biết đó là loại văn bản gì
- `<head>` = phong bì — chứa người gửi, người nhận và con tem (metadata), nhưng không phần nào xuất hiện trong nội dung thư
- `<title>` = dòng tiêu đề trên phong bì
- `<body>` = chính là nội dung thư mà người nhận đọc
- `</html>` = chữ ký khép lại bức thư

### ⚠️ Lưu ý quan trọng về tag

- Hầu hết tag HTML đi thành **cặp**: tag mở `<p>` và tag đóng `</p>`
- Một số tag **tự đóng** (còn gọi là void element): `<img>`, `<br>`, `<hr>`, `<meta>`, `<link>`. Chúng KHÔNG có tag đóng.
- Tag có thể **lồng** vào nhau, nhưng phải lồng đúng thứ tự:
  - ✅ Đúng: `<p><strong>Hello</strong></p>`
  - ❌ Sai: `<p><strong>Hello</p></strong>` (hai tag chéo nhau)
- Thụt lề không ảnh hưởng cách trình duyệt hiển thị trang, nhưng làm code dễ đọc cho con người. Luôn thụt lề phần tử lồng nhau.


### 🧪 Tự thử — Trang đầu tiên, từ đầu tới cuối

**Nhiệm vụ (8 phút):** Tự xây và xem thử một trang HTML5 hoàn chỉnh, không copy gì cả.

1. Trong VS Code, tạo `club-website/index.html`.
2. Gõ lại khối sau theo trí nhớ — không dán:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <title>Student Web Club</title>
   </head>
   <body>
       <h1>Student Web Club</h1>
       <p>We meet every Friday at 5pm in Room B203.</p>
   </body>
   </html>
   ```
3. Lưu bằng **Ctrl+S**, rồi mở tệp trong trình duyệt.

**Kết quả mong đợi:** Tab hiển thị "Student Web Club", heading lớn và đậm, câu văn nằm ngay dưới bằng chữ thường.

<details>
<summary>Kiểm lại mình</summary>

- Tab hiện `index.html` thay vì tiêu đề → `<title>` của bạn bị thiếu hoặc nằm ngoài `<head>`.
- Bạn thấy nguyên mã hiện thành chữ → tệp đã lưu dưới dạng `.txt`; đổi tên thành `.html`.
- Heading không đậm, không lớn → kiểm tra xem có gõ sai `<h1>` ở đâu đó không.

Hãy gõ lại bộ khung này bằng tay vài lần trong tuần. Đó là khối duy nhất bạn sẽ viết ở đầu mọi trang trong suốt khóa học.

</details>


---

## 7. Phần đuôi và loại tệp

### 7.1 Các phần đuôi web phổ biến

| Phần đuôi | Loại | Vai trò |
|-----------|------|---------|
| `.html` | Tài liệu HTML | Cấu trúc và nội dung của một trang web |
| `.css` | Stylesheet CSS | Điều khiển màu sắc, font, bố cục, khoảng cách |
| `.js` | JavaScript | Thêm tương tác (menu, animation, kiểm tra dữ liệu nhập) |
| `.jpg` / `.jpeg` | Ảnh (JPEG) | Ảnh chụp và ảnh phức tạp |
| `.png` | Ảnh (PNG) | Logo, icon, ảnh cần trong suốt |
| `.gif` | Ảnh (GIF) | Animation đơn giản |
| `.svg` | Scalable Vector Graphics | Icon và logo phóng to không vỡ hạt |
| `.pdf` | Tài liệu PDF | Tài liệu cho tải về |

### 7.2 Vì sao phần đuôi quan trọng

Phần đuôi cho trình duyệt biết phải xử lý tệp thế nào. Nếu bạn lưu một tệp HTML thành `page.txt`, trình duyệt sẽ hiển thị nguyên mã thay vì render trang. Luôn kiểm tra lại phần đuôi khi lưu.

⚠️ Lưu ý quan trọng:

- Windows đôi khi ẩn phần đuôi tệp theo mặc định. Vào **View > Show > File name extensions** trong File Explorer để chắc chắn bạn nhìn thấy chúng.
- Khi lưu trong Dreamweaver hoặc VS Code, luôn chọn **"All Files"** hoặc **"HTML"** làm loại tệp để tránh vô tình bị thêm `.txt`.

---

## 8. Chú thích trong HTML

### 8.1 Định nghĩa

**HTML comment** là phần chữ trong code mà trình duyệt bỏ qua hoàn toàn. Comment chỉ hiện ra khi ai đó đọc mã nguồn. Người ta dùng nó để lại ghi chú cho chính mình hoặc cho lập trình viên khác.

Cú pháp là:
```html
<!-- This is a comment -->
```

Comment có thể trải nhiều dòng:
```html
<!--
    This section contains the main navigation.
    Last updated: March 2024
    Author: Nguyen Van A
-->
```

### 8.2 Khi nào nên viết comment

| Tình huống | Ví dụ comment |
|-----------|----------------|
| Đánh dấu các vùng của trang | `<!-- ===== HEADER SECTION ===== -->` |
| Giải thích VÌ SAO làm như vậy | `<!-- Using UTF-8 to support Vietnamese characters -->` |
| Tạm ẩn code | `<!-- <p>This paragraph is hidden for now</p> -->` |
| Ghi chú TODO | `<!-- TODO: Add team photos here -->` |
| Tài liệu hóa cấu trúc phức tạp | `<!-- Navigation: 5 links, active class on current page -->` |

### ⚠️ Lưu ý quan trọng về comment

- Comment VÔ HÌNH trong trình duyệt nhưng HIỆN RÕ trong View Source. Đừng bao giờ đặt mật khẩu hay dữ liệu nhạy cảm vào comment.
- Comment không ảnh hưởng hiệu năng trang theo cách đáng kể.
- Comment tốt giải thích VÌ SAO, không giải thích CÁI GÌ. Code đã cho thấy nó làm gì; comment nên nêu lý do.
- Xóa code bị comment hóa trước khi công bố. Code chết làm file rối.

### 🧪 Tự thử — Comment nào thực sự đáng viết

**Nhiệm vụ (4 phút):** Dùng comment để dán nhãn từng vùng của trang.

1. Trong `index.html`, thêm một comment phía trên mỗi khối lớn:
   ```html
   <!-- ===== Header: club name and navigation ===== -->
   <!-- ===== Main: welcome text and events ===== -->
   <!-- ===== Footer: contact and copyright ===== -->
   ```
2. Lưu và nạp lại trang trong trình duyệt.
3. Giờ nhấn **Ctrl+U** để xem mã nguồn.

**Kết quả mong đợi:** Comment vô hình trên trang nhưng đọc rõ ràng trong View Source.

<details>
<summary>Điểm sinh viên hay bỏ lỡ</summary>

Comment bị loại khỏi trang đã render nhưng KHÔNG bị loại khỏi tệp mà trình duyệt tải về. Ai cũng có thể đọc chúng. Vậy hãy chú thích *cấu trúc* ("navigation starts here"), đừng viết gì riêng tư — không mật khẩu, không ghi chú cá nhân, không "TODO: fix this security hole".

</details>


---


## 9. Trình duyệt hiển thị trang ra sao

> 🖼 **Diagram:** `canvases/buoi-01.canvas.tsx` → `RequestResponseCycle` — slide `how-web-works` ("How the Web Works")

### 9.1 Quy trình render

Khi bạn mở một tệp HTML trong trình duyệt, nhiều bước diễn ra ở phía sau:

```
STEP 1: LOAD        Browser reads the HTML file from disk or server
         |
STEP 2: PARSE       Browser reads each tag and builds the DOM (Document Object Model)
         |          The DOM is a tree structure representing every element
         |
STEP 3: STYLE       Browser applies CSS rules to each DOM element
         |          Default styles + your stylesheet = computed styles
         |
STEP 4: LAYOUT      Browser calculates the size and position of every element
         |          (also called "reflow")
         |
STEP 5: PAINT       Browser draws pixels on the screen
                    Text, colors, borders, images all rendered visually
```

### 9.2 Vì sao điều này liên quan tới bạn

Hiểu quy trình render giúp bạn gỡ lỗi:

| Vấn đề | Nguyên nhân có thể | Bước nào? |
|---------|-------------|-------------|
| Trang hiện nguyên mã HTML | Tệp lưu thành `.txt` thay vì `.html` | Bước 1: Load |
| Phần tử hiện ra nhưng trông sai | Thiếu CSS rule, hoặc rule bị ghi đè | Bước 3: Style |
| Phần tử vô hình | `display: none` hoặc định vị sai | Bước 4: Layout |
| Ảnh hiện icon vỡ | Đường dẫn trong thuộc tính `src` sai | Bước 1: Load |
| Bố cục nhảy khi ảnh tải xong | Thiếu thuộc tính width/height | Bước 4: Layout |

### 🎒 Ví dụ đời thực

Hãy hình dung việc render như một **nhà hàng**:

- Phục vụ bàn chuyển order (tệp HTML) vào bếp
- Bếp trưởng đọc từng món trên phiếu (parse HTML thành DOM)
- Phó bếp thêm gia vị và trang trí (áp CSS style)
- Khu vực ra bài bày mọi thứ lên đĩa (tính layout)
- Món hoàn tất được dọn lên bàn (vẽ ra màn hình)

Nếu phiếu viết bằng thứ tiếng bếp trưởng không hiểu (sai loại tệp), không món nào được nấu. Nếu gia vị sai (CSS hỏng), món ăn dở. Nếu bày biện cẩu thả (lỗi bố cục), món trông xấu dù vị vẫn ổn.

⚠️ Lưu ý quan trọng:

- Trình duyệt xử lý HTML từ TRÊN XUỐNG DƯỚI. Phần tử ở đầu tệp được parse trước.
- Đó là lý do các tag `<link>` CSS đặt trong `<head>` — trình duyệt cần style TRƯỚC khi bắt đầu vẽ body.
- Tag `<script>` JavaScript theo truyền thống đặt ở cuối `<body>` để không chặn việc parse HTML (các thuộc tính `defer` và `async` hiện đại làm thay đổi điều này).

---

## ✅ Thói quen tốt

1. **Luôn bắt đầu bằng bộ khung HTML5.** Copy-paste nó cho mỗi trang mới. Không bao giờ bỏ `<!DOCTYPE html>`.
2. **Tạo cấu trúc thư mục trước.** Trước khi viết dòng code đầu tiên, hãy tạo `images/`, `css/`, `js/` và `documents/`.
3. **Đặt tên trang chủ là `index.html`.** Không thương lượng — đây là quy ước web phổ quát.
4. **Dùng chữ thường cho mọi tên tệp và tên thư mục.** `About.html` và `about.html` là hai tệp khác nhau trên máy chủ Linux.
5. **Dùng dấu gạch nối, không dùng khoảng trắng, trong tên tệp.** `my-page.html` là đúng; `my page.html` gây rắc rối.
6. **Lưu thường xuyên.** Nhấn Ctrl+S sau vài lần sửa. Việc chưa lưu là việc có thể mất.
7. **Xem thử trong trình duyệt thật thường xuyên.** Nhấn F12 (Dreamweaver) hoặc dùng Live Server (VS Code) để kiểm tra định kỳ.
8. **Thêm comment vào code.** Dùng `<!-- comment -->` để dán nhãn từng vùng HTML, sau này còn tìm ra.
9. **Thụt lề nhất quán.** Dùng 4 khoảng trắng (hoặc 1 tab) cho mỗi cấp thụt lề. Thụt lề đều giúp gỡ lỗi dễ hơn nhiều.
10. **Kiểm tra trên ít nhất hai trình duyệt.** Thứ trông hoàn hảo trên Chrome có thể khác trên Firefox.

---

## ❌ Lỗi thường gặp

### Lỗi 1: Quên `<!DOCTYPE html>`

❌ Sai:
```html
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

✅ Đúng:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Page</title>
</head>
<body>
    <h1>Hello</h1>
</body>
</html>
```

Thiếu `<!DOCTYPE html>`, trình duyệt rơi vào "quirks mode" và có thể hiển thị trang của bạn sai.

### Lỗi 2: Lưu tệp có khoảng trắng trong tên

❌ Sai: `My Home Page.html` → trong URL sẽ thành `My%20Home%20Page.html`
✅ Đúng: `index.html` hoặc `my-home-page.html`

### Lỗi 3: Chưa lưu đã xem thử

Nếu bạn sửa code rồi nhấn F12 mà chưa lưu (Ctrl+S), trình duyệt sẽ hiện phiên bản CŨ. Luôn lưu trước.

### Lỗi 4: Nhầm `<head>` với `<body>`

❌ Sai:
```html
<head>
    <h1>Welcome</h1>  <!-- Headings do NOT belong in head! -->
</head>
<body>
    <title>My Page</title>  <!-- Title does NOT belong in body! -->
</body>
```

✅ Đúng:
```html
<head>
    <title>My Page</title>  <!-- Metadata goes in head -->
</head>
<body>
    <h1>Welcome</h1>  <!-- Visible content goes in body -->
</body>
```

Nhớ: `<head>` = thông tin VỀ trang. `<body>` = nội dung TRÊN trang.

### Lỗi 5: Không tạo thư mục dự án

❌ Sai: Lưu tệp thẳng ra Desktop hoặc thư mục Downloads
✅ Đúng: Tạo `C:\Users\YourName\Documents\club-website\` và lưu mọi thứ trong đó

### 🧪 Tự thử — Xem trình duyệt dựng trang ngay trước mắt

**Nhiệm vụ (5 phút):** Chứng kiến quy trình render diễn ra trên chính tệp của bạn.

1. Mở `index.html` trong Chrome hoặc Edge rồi nhấn **F12**.
2. Bấm tab **Elements**. Di chuột qua dòng `<h1>` — heading trên trang sẽ được tô sáng.
3. Nháy đúp vào chữ của heading trong panel Elements, gõ nội dung khác, nhấn Enter.
4. Giờ nạp lại trang (F5).

**Kết quả mong đợi:** Sửa xong hiện ra tức thì, rồi biến mất khi nạp lại. Chỉnh sửa trong DevTools thay đổi DOM trong bộ nhớ, không phải tệp trên đĩa.

<details>
<summary>Vì sao điều này quan trọng</summary>

Trình duyệt đọc tệp của bạn một lần, dựng DOM từ đó, rồi render từ DOM. DevTools cho phép sửa trực tiếp DOM, nên thay đổi xuất hiện mà không cần lưu và biến mất khi nạp lại. Đây là cách nhanh nhất để thử một bản sửa — nhưng sau đó bạn phải thay đổi y hệt trong tệp của mình thì nó mới ở lại.

</details>


---
# 📋 TÓM TẮT LÝ THUYẾT

| Khái niệm | Định nghĩa | Ví dụ |
|---------|-----------|---------|
| Website | Tập hợp các trang web nối với nhau, lưu trên máy chủ hoặc máy tính cục bộ | studentclub.edu.vn gồm trang Home, About, Events |
| Webpage | Một tài liệu HTML đơn lẻ mà trình duyệt hiển thị được | `about.html` |
| HTML | HyperText Markup Language — ngôn ngữ chuẩn để tạo trang web | `<h1>Welcome</h1>` |
| Web Browser | Phần mềm đọc HTML và hiển thị trực quan | Chrome, Firefox, Edge |
| Code Editor | Trình soạn thảo văn bản chuyên dụng để viết code | Dreamweaver CS6, VS Code |
| Boilerplate | Bộ khung chuẩn mở đầu cho mọi trang HTML5 | `<!DOCTYPE html><html>...` |
| Project Folder | Thư mục gốc chứa toàn bộ tệp website, tổ chức thành thư mục con | `club-website/images/`, `css/`, `js/` |
| `index.html` | Tên tệp trang mặc định mà máy chủ tự động tìm | Trang đầu tiên người dùng thấy khi ghé site |
| Tag | Ký hiệu trong HTML cho trình duyệt biết hiển thị nội dung thế nào | `<p>`, `<h1>`, `<img>` |
| Self-closing tag | Tag không cần tag đóng đi kèm | `<img>`, `<br>`, `<meta>` |

---

# 💡 VÍ DỤ MẪU

## Ví dụ 1: Trang web đơn giản nhất có thể

**Tình huống:** Bạn muốn tạo trang HTML tối giản nhất vẫn chạy đúng trong trình duyệt.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

**Giải thích từng dòng:**

- `<!DOCTYPE html>` — khai báo đây là tài liệu HTML5 để trình duyệt render ở chế độ chuẩn
- `<html lang="en">` — mở phần tử gốc; `lang="en"` khai báo ngôn ngữ trang là tiếng Anh
- `<head>` — mở phần metadata (không có gì ở đây hiển thị trên trang)
- `<meta charset="UTF-8">` — bảo đảm mọi ký tự (kể cả dấu tiếng Việt như ă, ê, ô) hiển thị đúng
- `<title>Simple Page</title>` — đặt tiêu đề tab trình duyệt thành "Simple Page"
- `</head>` — đóng phần metadata
- `<body>` — mở vùng nội dung hiển thị
- `<h1>Hello, World!</h1>` — tạo heading cấp cao nhất. Trình duyệt mặc định hiển thị chữ `<h1>` to và đậm
- `<p>This is my first web page.</p>` — tạo một đoạn văn. Trình duyệt tự thêm khoảng trống trên dưới đoạn
- `</body>` — đóng vùng nội dung hiển thị
- `</html>` — đóng phần tử gốc; hết tài liệu

**Kết quả:** Trình duyệt hiển thị một trang có heading lớn "Hello, World!" và ngay dưới là một đoạn văn cỡ thường "This is my first web page." Tab trình duyệt đọc "Simple Page."

---

## Ví dụ 2: Trang chủ Student Club

**Tình huống:** Bạn đang dựng trang chủ cho Student Club Website. Bạn muốn một heading, một lời chào, danh sách sự kiện sắp tới và một link email liên hệ.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>We are a community of students who love technology and creativity.</p>

    <h2>Upcoming Events</h2>
    <ul>
        <li>Web Design Workshop — March 15</li>
        <li>Photography Contest — March 22</li>
        <li>Music Night — March 29</li>
    </ul>

    <p>Contact us at: <a href="mailto:club@university.edu">club@university.edu</a></p>
</body>
</html>
```

**Giải thích từng dòng:**

- Dòng 1-7: Bộ khung HTML5 chuẩn, kèm viewport meta tag để responsive trên di động
- `<h1>Welcome to the Student Club</h1>`: Heading chính của trang — mỗi trang chỉ có MỘT `<h1>`
- `<p>We are a community...</p>`: Đoạn mở đầu giới thiệu câu lạc bộ
- `<h2>Upcoming Events</h2>`: Heading của mục — `<h2>` nhỏ hơn `<h1>` nhưng lớn hơn chữ thường
- `<ul>`: Mở một danh sách không thứ tự (danh sách gạch đầu dòng)
- `<li>Web Design Workshop — March 15</li>`: Mục danh sách đầu tiên — mỗi sự kiện bọc trong cặp `<li>`
- `</ul>`: Đóng danh sách
- `<a href="mailto:club@university.edu">`: Tạo một hyperlink. Tiền tố `mailto:` báo trình duyệt mở ứng dụng email của người dùng
- `club@university.edu</a>`: Phần chữ hiển thị của link, theo sau là tag đóng

**Kết quả:** Trình duyệt hiển thị một heading lớn, một đoạn chào mừng, danh sách gạch đầu dòng ba sự kiện, và một link email bấm được. Bấm vào link email sẽ mở ứng dụng email mặc định.

---

## Ví dụ 3: Hiểu tag lồng nhau

**Tình huống:** Bạn muốn tạo một đoạn văn trong đó một vài chữ đậm, vài chữ nghiêng, để hiểu cách tag lồng vào nhau.

**Code:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Nesting Example</title>
</head>
<body>
    <h1>Tag Nesting Demo</h1>
    <p>The <strong>Student Club</strong> offers <em>amazing</em> workshops.</p>
    <p>Join our <strong><em>free</em> coding bootcamp</strong> today!</p>
</body>
</html>
```

**Giải thích từng dòng:**

- `<p>The <strong>Student Club</strong> offers <em>amazing</em> workshops.</p>`:
  - Tag `<p>` bọc toàn bộ đoạn văn
  - `<strong>` làm "Student Club" thành đậm (về ngữ nghĩa là "quan trọng")
  - `<em>` làm "amazing" thành nghiêng (về ngữ nghĩa là "nhấn mạnh")
  - Chú ý `<strong>` mở VÀ đóng đều nằm trong `<p>` — lồng đúng cách

- `<p>Join our <strong><em>free</em> coding bootcamp</strong> today!</p>`:
  - `<strong>` bọc quanh `<em>` — tag `<em>` nằm trọn trong `<strong>`
  - `<em>free</em>` lồng bên trong `<strong>`, nên "free" vừa đậm vừa nghiêng
  - "coding bootcamp" chỉ đậm (bên trong `<strong>` nhưng ngoài `<em>`)
  - Đây là lồng ĐÚNG: tag đóng của phần tử trong phải đóng trước phần tử ngoài

**Kết quả:** Đoạn thứ nhất hiện "Student Club" đậm và "amazing" nghiêng. Đoạn thứ hai hiện "free" đậm nghiêng và "coding bootcamp" chỉ đậm.

---




# 🛠️ THỰC HÀNH TRÊN LỚP

## Chuẩn bị (Công cụ và thư mục)

Trước khi bắt đầu các nhiệm vụ, hãy chắc chắn bạn đã có:

1. **Một code editor đã cài:** Dreamweaver CS6 hoặc VS Code
2. **Một trình duyệt web:** Google Chrome hoặc Microsoft Edge (bản mới nhất)
3. **Một thư mục dự án đã tạo:**

Mở File Explorer và tạo đúng cấu trúc này:

```
C:\Users\YourName\Documents\club-website\
    images\
    css\
    js\
    documents\
```

Để tạo thư mục: chuột phải trong File Explorer → New → Folder → gõ tên → nhấn Enter.

Nếu dùng **VS Code**: mở thư mục `club-website` qua File → Open Folder. Cài extension "Live Server" từ panel Extensions (Ctrl+Shift+X).

Nếu dùng **Dreamweaver CS6**: vào Site → New Site → đặt Site Name là "Student Club Website" → đặt Local Site Folder tới thư mục `club-website` của bạn → nhấn Save.

---

### NHIỆM VỤ 1: Tạo trang HTML đầu tiên

🎯 **Mục tiêu:** Tạo mới một trang HTML5 cơ bản và xem nó trong trình duyệt.

📝 **Yêu cầu:**
- Trang phải có cấu trúc HTML5 hợp lệ
- Phải có một heading và ít nhất một đoạn văn
- Phải được lưu tên `index.html` ở thư mục gốc của thư mục dự án

🔧 **Các bước:**

**Bước 1:** Mở code editor (Dreamweaver hoặc VS Code).

**Bước 2:** Tạo một tệp mới:
- Dreamweaver: File → New → HTML → Create
- VS Code: File → New File → lưu với tên `index.html`

**Bước 3:** Gõ lại đoạn code sau CHÍNH XÁC (không copy-paste — gõ tay giúp bạn nhớ):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>This is the official website of our university student club.</p>
    <p>We are a community of creative and enthusiastic students.</p>
</body>
</html>
```

**Bước 4:** Lưu tệp:
- Nhấn Ctrl+S
- Điều hướng tới `C:\Users\YourName\Documents\club-website\`
- Chắc chắn tên tệp đúng là `index.html` (không phải `index.html.txt`)
- Nhấn Save

**Bước 5:** Xem thử trong trình duyệt:
- Dreamweaver: nhấn F12 hoặc File → Preview in Browser → Chrome
- VS Code: chuột phải vào tệp → Open with Live Server (hoặc chuột phải → Reveal in Explorer → nháy đúp tệp để mở bằng Chrome)

**Bước 6:** Kiểm tra trang có một heading lớn và hai đoạn văn. Kiểm tra tab trình duyệt ghi "Student Club - Home".

✅ **Kết quả mong đợi:** Một trang web đơn giản với heading lớn "Welcome to the Student Club" và hai đoạn văn bản. Tab trình duyệt hiển thị "Student Club - Home."

💾 **Tệp cần lưu:** `club-website/index.html`

---

### NHIỆM VỤ 2: Làm quen vùng làm việc của editor

🎯 **Mục tiêu:** Quen với các panel và chế độ hiển thị chính trong editor bạn chọn.

📝 **Yêu cầu:**
- Chuyển đổi giữa các chế độ hiển thị (nếu dùng Dreamweaver)
- Xác định vị trí Files panel / Explorer panel
- Tìm Properties Panel (Dreamweaver) hoặc thanh Status bar (VS Code)

🔧 **Các bước:**

**Bước 1 (Dreamweaver):** Bấm nút "Design" trên toolbar. Quan sát trang hiện ra trực quan thế nào. Sau đó bấm "Code" để xem mã HTML thô. Rồi bấm "Split" để xem cả hai cùng lúc.

**Bước 1 (VS Code):** Mở panel Explorer (Ctrl+Shift+E) bên trái. Bạn sẽ thấy `index.html` được liệt kê. Bấm vào để mở. Nhìn thanh status ở dưới cùng — nó hiện số dòng, cột, bảng mã và ngôn ngữ của tệp.

**Bước 2:** Trong panel Files/Explorer, xác nhận bạn thấy thư mục `club-website` và các thư mục con (`images/`, `css/`, `js/`, `documents/`).

**Bước 3:** Thêm một comment vào code. Đặt con trỏ ở đầu `<body>` và gõ:

```html
<!-- This is the main content area of the Student Club home page -->
```

Nhận xét cách comment hiện bằng màu khác (syntax highlighting).

**Bước 4:** Lưu (Ctrl+S) và xem thử lại để xác nhận comment vô hình trong trình duyệt.

✅ **Kết quả mong đợi:** Bạn chuyển được giữa các chế độ hiển thị, thấy tệp của dự án, và biết các panel chính nằm ở đâu. Comment trong code không hiển thị trên trang.

💾 **Tệp cần lưu:** `club-website/index.html` (đã cập nhật thêm comment)

---

### NHIỆM VỤ 3: Dựng một trang chủ hoàn chỉnh có điều hướng

🎯 **Mục tiêu:** Mở rộng `index.html` của bạn để có thêm menu điều hướng, nhiều mục nội dung và một footer — đúng cấu trúc bạn sẽ dùng suốt khóa học.

📝 **Yêu cầu:**
- Có `<header>` chứa tên site và điều hướng
- Có một vùng `<main>` với ít nhất hai mục con
- Có `<footer>` chứa dòng bản quyền
- Mọi link điều hướng phải trỏ tới các trang khác (chúng chưa chạy được, nhưng link phải có mặt)

🔧 **Các bước:**

**Bước 1:** Mở `index.html` và thay TOÀN BỘ nội dung hiện có bằng đoạn code sau:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Home</title>
</head>
<body>
    <!-- ===== HEADER SECTION ===== -->
    <header>
        <h1>Student Club</h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- ===== MAIN CONTENT ===== -->
    <main>
        <h2>Welcome to the Student Club</h2>
        <p>We are a community of creative and enthusiastic students.
           Join us for workshops, events, and fun activities!</p>

        <section>
            <h3>Latest News</h3>
            <article>
                <h4>Web Design Workshop</h4>
                <p>Learn the basics of HTML and CSS in our hands-on workshop.
                   Date: March 15, 2024. Time: 2:00 PM - 4:00 PM.</p>
            </article>
            <article>
                <h4>Photography Contest</h4>
                <p>Submit your best campus photos and win prizes!
                   Deadline: March 20, 2024.</p>
            </article>
        </section>

        <section>
            <h3>Quick Facts</h3>
            <ul>
                <li>Founded in 2020</li>
                <li>Over 200 active members</li>
                <li>50+ events organized each year</li>
                <li>Winner of Best Student Club 2023</li>
            </ul>
        </section>
    </main>

    <!-- ===== FOOTER ===== -->
    <footer>
        <p>&copy; 2024 Student Club. All rights reserved.</p>
    </footer>
</body>
</html>
```

**Bước 2:** Lưu tệp (Ctrl+S).

**Bước 3:** Xem thử trong trình duyệt (F12 hoặc Live Server).

**Bước 4:** Xem lại cấu trúc trang:
- Header hiện tên câu lạc bộ và các link điều hướng
- Vùng chính có lời chào, các bài tin tức và quick facts
- Footer hiện thông tin bản quyền
- Lưu ý: các link điều hướng tới `about.html`, `events.html`, v.v. sẽ báo "file not found" vì những trang đó chưa tồn tại. Điều này là bình thường — bạn sẽ tạo chúng ở Buổi 2.

**Bước 5:** Thử bấm link "Home". Trang hiện tại phải được nạp lại (vì `index.html` có thật).

✅ **Kết quả mong đợi:** Một trang có cấu trúc rõ ràng với header, thanh điều hướng (hiện dạng danh sách gạch đầu dòng chưa có style), hai mục nội dung gồm heading và bài viết, và một footer. Trang trông còn đơn giản (chưa có CSS) nhưng cấu trúc HTML đã đúng.

💾 **Tệp cần lưu:** `club-website/index.html` (bản hoàn chỉnh)

---


# 🐛 LỖI THƯỜNG GẶP — TRÌNH DUYỆT ĐANG CHO BẠN THẤY GÌ

Lỗi hiếm khi tự báo. Thay vào đó trình duyệt làm một điều gì đó lạ, và bạn phải đọc ngược từ hiện tượng về nguyên nhân. Dùng bảng này khi trang sai mà bạn không biết vì sao.

| Hiện tượng bạn thấy | Nguyên nhân có thể | Cách xác nhận | Cách sửa |
|---|---|---|---|
| Tab ghi `index.html` thay vì tiêu đề của bạn | `<title>` thiếu, rỗng, hoặc nằm ngoài `<head>` | View Source (Ctrl+U) và nhìn vào trong `<head>` | Đặt `<title>Your Text</title>` bên trong `<head>` |
| Cả trang là một heading khổng lồ | Thiếu `</h1>`, nên heading không bao giờ kết thúc | Ctrl+U — `<h1>` không có cặp đóng | Thêm `</h1>` đóng lại |
| Trang hiện nguyên mã như `<h1>Welcome</h1>` thành chữ | Tệp lưu thành `.txt`, hoặc mở bằng trình soạn thảo chứ không phải trình duyệt | Kiểm tra phần đuôi tệp trong Explorer | Đổi tên thành `.html` và mở bằng trình duyệt |
| Chữ có dấu / tiếng Việt hiện thành `?` hoặc `Ã¡` | `<meta charset="UTF-8">` thiếu hoặc không đứng đầu `<head>` | Ctrl+U — charset có phải dòng đầu tiên trong `<head>` không? | Thêm meta tag charset ngay đầu `<head>` |
| Chữ siêu nhỏ, bố cục bị co trên điện thoại | Thiếu viewport meta tag | Mở device mode trong DevTools (Ctrl+Shift+M) | Thêm `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| Bố cục sai một cách mơ hồ không chỉ ra được | Thiếu Doctype — trình duyệt đang ở quirks mode | Gõ `document.compatMode` trong Console; phải trả về `CSS1Compat` | Đặt `<!DOCTYPE html>` thành dòng đầu tiên tuyệt đối |
| Chữ comment của bạn hiện ra trên trang | Comment viết thành `<!-- ... >` hoặc `< !-- ... -->` | Comment được render thay vì bị ẩn | Dùng đúng `<!--` và `-->` |
| Không gì hiển thị — trang trắng | Nội dung nằm ngoài `<body>`, hoặc `<body>` không bao giờ được mở | Ctrl+U và kiểm tra nội dung có nằm giữa `<body>` và `</body>` | Đưa nội dung vào trong `<body>` |

**Thói quen nên tạo:** khi thấy gì đó sai, hãy bấm F12 trước tiên. Tab Console báo điều trình duyệt phàn nàn, còn tab Elements cho thấy cấu trúc mà trình duyệt thực sự dựng nên — thường không phải cấu trúc bạn nghĩ mình đã viết.

---

# ✅ CÂU HỎI TỰ KIỂM TRA

Hãy trả lời từ trí nhớ trước, rồi mở phần đáp án ra kiểm tra lại.

**Q1. Website và web page khác nhau chỗ nào?**

<details>
<summary>Đáp án</summary>

Một **web page** là một tài liệu HTML đơn lẻ (một tệp, ví dụ `about.html`). Một **website** là tập hợp các trang web liên quan cùng với tài nguyên của chúng (ảnh, CSS, JavaScript), được tổ chức trong một cấu trúc thư mục và nối với nhau bằng điều hướng.

</details>

---

**Q2. Vì sao HTML được gọi là ngôn ngữ đánh dấu chứ không phải ngôn ngữ lập trình?**

<details>
<summary>Đáp án</summary>

HTML không có logic: không biến, không điều kiện, không vòng lặp, không tính toán. Nó chỉ *đánh dấu* nội dung để mô tả cấu trúc và ý nghĩa (đây là heading, đây là đoạn văn, đây là danh sách). Ngôn ngữ lập trình như JavaScript có thể ra quyết định và tính ra giá trị; HTML thì không.

</details>

---

**Q3. Kể tên bốn phần bắt buộc của bộ khung HTML5 và nói chức năng từng phần.**

<details>
<summary>Đáp án</summary>

1. `<!DOCTYPE html>` — báo trình duyệt dùng HTML5 standards mode.
2. `<html lang="en">` — phần tử gốc; `lang` khai báo ngôn ngữ tài liệu cho screen reader và công cụ tìm kiếm.
3. `<head>` — metadata mà người dùng không thấy: `<meta charset>`, `<meta name="viewport">`, `<title>`, các link CSS.
4. `<body>` — mọi thứ người dùng thực sự nhìn thấy trên trang.

</details>

---

**Q4. Điều gì xảy ra nếu bạn bỏ `<!DOCTYPE html>`?**

<details>
<summary>Đáp án</summary>

Trình duyệt rơi về **quirks mode**, giả lập hành vi đầy lỗi của thập niên 1990. Box sizing, margin và CSS inheritance đều xử lý thiếu nhất quán, và cùng một trang có thể trông khác nhau trên Chrome, Firefox và Safari. Chỉ một dòng — đừng bao giờ bỏ.

</details>

---

**Q5. Vì sao trang chủ phải tên `index.html` chứ không phải `home.html`?**

<details>
<summary>Đáp án</summary>

Máy chủ web mặc định tìm `index.html` khi có người ghé một URL dạng thư mục như `https://example.com/`. Nếu tệp tên là `home.html`, người vào sẽ thấy danh sách thư mục hoặc lỗi 404 trừ khi họ gõ trọn tên tệp.

</details>

---

**Q6. Vì sao tên tệp nên tránh khoảng trắng và chữ in hoa?**

<details>
<summary>Đáp án</summary>

Khoảng trắng trở thành `%20` trong URL, vừa xấu vừa dễ sai. Đa số máy chủ web chạy Linux, nơi tên tệp **phân biệt hoa thường** — `About.html` và `about.html` là hai tệp khác nhau. Một link chạy tốt trên máy Windows của bạn có thể 404 ngay sau khi tải lên. Dùng chữ thường với dấu gạch nối: `about-us.html`.

</details>

---

**Q7. `<head>` và `<header>` khác nhau chỗ nào?**

<details>
<summary>Đáp án</summary>

`<head>` là metadata dành cho trình duyệt và **không bao giờ hiển thị** — nó chứa `<title>`, `<meta>` và các link CSS. `<header>` nằm trong `<body>` và **có hiển thị** — đó là vùng banner nhìn thấy ở đầu trang, thường chứa logo, tên site và điều hướng.

</details>

---

**Q8. Vì sao phải tạo các thư mục con `images/`, `css/`, `js/` riêng thay vì để hết vào một chỗ?**

<details>
<summary>Đáp án</summary>

Tách ra giúp dự án còn điều hướng được khi nó lớn lên. Với 40 tệp trong một thư mục bạn không tìm thấy gì; có thư mục con thì bạn luôn biết chỗ để tìm. Cách này cũng khớp với mọi dự án chuyên nghiệp và mọi nền tảng hosting, đồng thời làm đường dẫn tương đối đoán trước được (`images/logo.png`, `css/style.css`).

</details>

---

# 📝 BẢNG TỰ ĐÁNH GIÁ

| # | Tôi có thể… | Có ☐ | Không ☐ |
|---|----------|-------|------|
| 1 | Giải thích website là gì và nó khác một trang web đơn lẻ thế nào | ☐ | ☐ |
| 2 | Định nghĩa HTML và nói rằng nó là ngôn ngữ đánh dấu, không phải ngôn ngữ lập trình | ☐ | ☐ |
| 3 | Kể bốn phần chính của bộ khung HTML5 và giải thích từng phần | ☐ | ☐ |
| 4 | Tạo một cấu trúc thư mục dự án đúng chuẩn với `images/`, `css/`, `js/` và `documents/` | ☐ | ☐ |
| 5 | Viết một trang HTML5 hợp lệ từ trí nhớ (không nhìn vở) | ☐ | ☐ |
| 6 | Lưu một tệp thành `index.html` đúng chỗ và xem thử trong trình duyệt | ☐ | ☐ |
| 7 | Chuyển giữa Design View, Code View và Split View trong Dreamweaver (hoặc điều hướng panel VS Code) | ☐ | ☐ |
| 8 | Giải thích vì sao `<!DOCTYPE html>` cần thiết và điều gì xảy ra khi thiếu nó | ☐ | ☐ |

**Hướng dẫn tự cho điểm:**
- 7-8 Có: Xuất sắc! Bạn đã sẵn sàng cho Buổi 2.
- 5-6 Có: Tốt. Hãy xem lại những mục bạn trả lời "Không" trước khi đi tiếp.
- 0-4 Có: Đọc lại phần Lý thuyết và làm lại Nhiệm vụ 1 và 3. Hãy hỏi giảng viên hoặc bạn cùng lớp.

---

# 🔗 ĐỌC THÊM

- [How the Web Works — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- [Getting Started with the Web — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web)
- [Introduction to HTML — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
- [HTML Basics — MDN](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [Document and Website Structure — MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [What is CSS? — MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS)
- [HTML Element Reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

---

# ⏭️ BUỔI TIẾP THEO

Ở Buổi 2, bạn sẽ học cách tạo một website nhiều trang hoàn chỉnh với tổ chức thư mục hợp lý, quy ước đặt tên tệp, đường dẫn tương đối và tuyệt đối, cùng phần giới thiệu Git và GitHub để quản lý phiên bản.
