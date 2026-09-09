/* =============================================================================
   i18n.mjs — the site's interface strings, English and Vietnamese.

     node _tools/build-site.mjs   reads this to emit site/ (en) and site/vi/ (vi)

   WHY A DICTIONARY AND NOT A TRANSLATED MARKDOWN TREE
   ---------------------------------------------------
   The interface is a few hundred short strings repeated across every generated
   page — 53 English pages and their 53 Vietnamese twins. Prose is not. So the
   two are handled differently, deliberately:

     chrome  -> this file, keyed, both languages complete, always;
     prose   -> a Vietnamese source file per document under `i18n/vi/`,
                which is optional per file. Where it is missing the builder
                publishes the English document inside the Vietnamese chrome and
                says so on the page. Translation is therefore additive: drop a
                file in, rebuild, and nothing else has to change.

   Vietnamese is NOT a word-for-word rendering of the English. The English column
   is the source text and the Vietnamese column is what a Vietnamese student
   actually reads. Two rules were applied when writing it:

     1. Terminology follows what this repository already uses in Vietnamese, so
        the site does not invent a third vocabulary: `buoi-NN.canvas.tsx` gives
        "Buổi", `ins2053-bai-giang` gives "Bài giảng", `cham-bai.html` gives
        "chấm bài"/"tự chấm".
     2. Words that ARE the subject matter stay English. HTML, CSS, JavaScript,
        slide, rubric, repository, Git are technical vocabulary in this course —
        translating them would teach the wrong term. The course is taught in
        English; the interface orients the student, it does not replace the
        terminology.
   ============================================================================= */

/** The two published languages. `en` is the root of `site/`, the rest get a folder. */
export const LANGS = {
  en: { dir: "", name: "English", short: "EN", htmlLang: "en" },
  vi: { dir: "vi/", name: "Tiếng Việt", short: "VI", htmlLang: "vi" },
};

/** Storage key for the reader's language choice. Read by site.js in plain ES5. */
export const LANG_KEY = "ins2053.lang";

/** Where optional Vietnamese prose sources live, relative to the repo root. */
export const VI_SOURCE = "i18n/vi";

/** Fill `{slots}` in a UI string. Missing keys are left visible so QA can see them. */
export function t(pattern, vars) {
  return String(pattern).replace(/\{(\w+)\}/g, (m, k) =>
    vars && k in vars ? String(vars[k]) : m
  );
}

export const UI = {
  /* ----------------------------------------------------------------- english */
  en: {
    // top bar
    navSessions: "Sessions",
    navEbook: "Ebook",
    navSlides: "Slides",
    navHomework: "Homework",
    brandSub: "Web Authoring & Management",
    courseResources: "Course resources",
    skipToContent: "Skip to content",
    switchTheme: "Switch to {name} theme",
    themeLight: "light",
    themeDark: "dark",
    themeLabelLight: "Light",
    themeLabelDark: "Dark",
    themeWord: "Theme",
    langAria: "Change language",
    langCurrent: "Current language: {name}",


    // shared furniture
    onThisPage: "On this page",
    breadcrumb: "Breadcrumb",
    crumbHome: "Home",
    defaultEyebrow: "INS2053 learning materials",
    chapterNav: "Chapter navigation",
    sessionNav: "Session navigation",
    sessionOverview: "Session {n} overview",
    chapterN: "Chapter {n}",
    appendixA: "Appendix A",
    footTagline: "Web Authoring & Web Management",
    footNote:
      "Student learning materials only. Exam papers, marking rubrics and in-class answer keys are not published here.",

    // notices
    fallbackTitle: "This page has no Vietnamese translation yet",
    fallbackBody:
      "The text below is the English original. Interface and navigation are in Vietnamese; code, HTML and CSS stay English in every version of this site, because they are the subject being taught.",
    fallbackCta: "Read this page in English",
    practiceModeTitle: "Practice mode.",
    practiceModeBody:
      "Online submission and grading are not enabled yet. Complete the work locally and keep it in your own Git repository until your lecturer announces the submission flow.",
    practiceModeTool:
      "Want to know how this sheet scores before you hand it in? Open the <a href=\"{href}\">self-check tool</a>, pick session {n}, and paste or point it at your files. It runs entirely in your browser, uploads nothing, and marks only the mechanical half of the rubric — the rest is your lecturer's judgement.",
    sheetLead:
      "Practice brief for this session. Online submission and grading are not enabled yet.",

    // session hub
    whenBefore: "Before class",
    whenIn: "In class",
    whenAfter: "After class",
    whenCheck: "Check yourself",
    stepReadTitle: "Read the chapter",
    stepReadNote:
      "Work the 🧪 Try It Yourself blocks as you go — each one tells you the expected result, so you can check yourself.",
    stepDeckTitle: "Lecture deck",
    stepDeckNote:
      "The slides your lecturer projects, with the teaching diagrams. Press <kbd>j</kbd> and <kbd>k</kbd> to move, <kbd>n</kbd> for speaker notes.",
    stepHwTitle: "Homework {nn}",
    stepHwTitle8: "Homework 07 review",
    stepHwNote:
      "Use the published brief for practice and keep your work in your own repository. Online submission and grading are not enabled yet.",
    stepToolTitle: "Self-check tool",
    stepToolNote:
      "Grades the mechanical half of the rubric in your own browser — nothing is uploaded. It reports where you stand, not your final mark; your lecturer decides that.",
    stepToolCta: "Open the self-check tool",
    chapterCta: "Chapter {n}",
    deckCta: "Deck {n}",
    homeworkCta: "Homework {nn}",
    midtermTitle: "Week 8 is the midterm.",
    midtermBody:
      " The paper is practical, 90 minutes, with no internet. You may bring your own notes, the ebook chapters offline, and your project files. This chapter is the revision guide — the exam paper itself is not published here.",
    exerciseNote:
      "<strong>The in-class exercise is not on this site.</strong> It carries the worked answer key, so your lecturer hands it out during the session.",
    hubLead:
      "Week {n} of 15. Read the chapter before class, follow the deck in class, then use the homework brief for practice.",
    hubEyebrow: "Week {nn} · Learning flow",
    pagerPrev: "← Session {n}",
    pagerNext: "Session {n} →",
    hubTitle: "Session {n}: {topic}",

    // home page
    homeTitle: "Build for the web. Learn by doing.",
    homeLead:
      "Your complete INS2053 learning path — ebook, lecture slides and weekly homework, organised into one clear flow.",
    homeEyebrow: "INS2053 · Student learning portal",
    startCta: "Start with Session 1",
    exploreCta: "Explore 15 weeks",
    statSessions: "guided sessions",
    statChapters: "ebook chapters",
    statDecks: "lecture decks",
    resKicker: "Everything in one place",
    resHeading: "Course resources",
    resSub: "Start with your session, or jump straight to the material you need.",
    tileSessions: "Sessions",
    tileSessionsSub: "Week by week, in teaching order",
    tileEbook: "Student ebook",
    tileEbookSub: "15 chapters + Appendix A",
    tileSlides: "Lecture slides",
    tileSlidesSub: "17 decks · 60 diagrams",
    tileHomework: "Homework",
    tileHomeworkSub: "15 practice sheets · submission later",
    tileTool: "Self-check tool",
    tileToolSub: "Score your homework against the rubric, in your own browser",
    tileGuide: "New here?",
    tileGuideSub: "How to use the ebook, slides, exercises and self-check tool",
    tileAgents: "AI Agents guide",
    tileAgentsSub: "VS Code + Copilot or Cline — set up and use AI for your homework",
    flowKicker: "A simple weekly rhythm",
    flowHeading: "How each week works",
    flowSub: "Prepare before class, learn together, then turn that knowledge into practice.",
    flow1Body:
      "Read the ebook chapter and complete its <em>Try It Yourself</em> blocks.",
    flow2Body: "150 minutes of lecture, guided practice and a homework start.",
    flow3Body:
      "Practise with the homework brief and keep the result in your repository. Online submission and grading are not enabled yet.",
    schedHeading: "The 15 weeks",
    schedCaption: "Each row links to that week's chapter, deck and homework sheet.",
    thWeek: "Week",
    thSession: "Session",
    thRead: "Read",
    thSlides: "Slides",
    thHomework: "Homework",
    extraHeading: "Also worth reading",
    extraSub: "how to choose between web technologies once the course is over.",
    notHereHeading: "What is not on this site",
    notHereBody:
      "Exam papers, marking rubrics, worked solutions and the in-class exercises with their answer keys stay with your lecturer. Homework submission and marking are not handled here either — follow the instructions your lecturer gives in class.",
    sessionCrumbLabel: "Session {n}",

    // index pages
    eyebrowCount: "{n} learning resources",
    smallMidterm: "Midterm week",
    eyebrowChapter: "Ebook · Chapter {nn}",
    eyebrowAppendix: "Ebook · Appendix",
    eyebrowHomework: "Session {nn} · Homework",
    subAppendix: "Appendix A",
    unpubTitle: "Handed out in class, not published on this site",
    idxSessionsHeading: "Sessions",
    idxSessionsLead:
      "Fifteen weeks, in teaching order. Each session page gathers that week's chapter, deck and homework.",
    idxEbookHeading: "The student ebook",
    idxEbookLead: "Fifteen chapters plus an appendix. Read the week's chapter before class.",
    idxHomeworkHeading: "Homework",
    idxHomeworkLead:
      "One practice sheet per session, with requirements and a reference rubric.",
    idxSlidesHeading: "Lecture slides",
    idxSlidesLead:
      "Seventeen decks with 60 teaching diagrams. Use j and k to move between slides, n for speaker notes.",
    idxSlidesNote:
      "<strong>About the language:</strong> the decks themselves stay in English on purpose. They are what your lecturer projects in class, and the labels inside the 60 diagrams are exactly the terms the exam paper and the rubric use — translating them would teach a word you will never be asked to find. The written material beside them is where you can read in Vietnamese: open the chapter of the week, then the deck.",
    idxPracticeNote:
      "<strong>Practice mode:</strong> online submission and grading are not enabled yet. Complete each sheet locally and keep the result in your own Git repository until your lecturer announces the submission flow. To see how a sheet scores against its rubric, open the <a href=\"{href}\">self-check tool</a> — it runs in your browser and uploads nothing.",
    idxCourseWide: "Course-wide lecture deck",
    idxOverviewDeck: "Course overview deck",
    idxAllSessions: "All sessions",
    idxOrientation: "Orientation",
    idxWeekN: "Week {n}",
    idxWeekMidterm: "Week 8 · midterm exam",
    idxSessionN: "Session {n}",
    idxChapterLabel: "Chapter {n} — {title}",
    idxSessionLabel: "Session {n} — {topic}",
    idxDeckLabel: "Deck {n} — {topic}",
    langSwitchNotice: "Also available in {name}",
  },

  /* --------------------------------------------------------------- vietnamese */
  vi: {
    navSessions: "Buổi học",
    navEbook: "Giáo trình",
    navSlides: "Slide",
    navHomework: "Bài tập",
    brandSub: "Soạn thảo & Quản trị Web",
    courseResources: "Học liệu khóa học",
    skipToContent: "Đến nội dung chính",
    switchTheme: "Chuyển sang chủ đề {name}",
    themeLight: "sáng",
    themeDark: "tối",
    themeLabelLight: "Sáng",
    themeLabelDark: "Tối",
    themeWord: "Chủ đề",
    langAria: "Đổi ngôn ngữ",
    langCurrent: "Ngôn ngữ hiện tại: {name}",

    onThisPage: "Trong trang này",
    breadcrumb: "Đường dẫn",
    crumbHome: "Trang chủ",
    defaultEyebrow: "Học liệu INS2053",
    chapterNav: "Điều hướng chương",
    sessionNav: "Điều hướng buổi học",
    sessionOverview: "Tổng quan Buổi {n}",
    chapterN: "Chương {n}",
    appendixA: "Phụ lục A",
    footTagline: "Soạn thảo và Quản trị Web",
    footNote:
      "Chỉ chứa học liệu dành cho sinh viên. Đề thi, rubric chấm điểm và đáp án bài tập trên lớp không được đăng ở đây.",

    fallbackTitle: "Trang này chưa có bản dịch tiếng Việt",
    fallbackBody:
      "Phần bên dưới là nguyên bản tiếng Anh. Giao diện và điều hướng vẫn dùng tiếng Việt; code, HTML và CSS để tiếng Anh ở mọi phiên bản của trang này, vì đó chính là nội dung được học.",
    fallbackCta: "Đọc trang này bằng tiếng Anh",
    practiceModeTitle: "Chế độ luyện tập.",
    practiceModeBody:
      "Việc nộp và chấm bài trực tuyến chưa mở. Hãy làm bài trên máy và giữ kết quả trong repository Git của bạn tới khi giảng viên thông báo lịch nộp.",
    practiceModeTool:
      "Muốn biết đề này được chấm thế nào trước khi nộp? Hãy mở <a href=\"{href}\">công cụ tự chấm</a>, chọn Buổi {n}, rồi dán hoặc trỏ tới file của bạn. Công cụ chạy hoàn toàn trên trình duyệt, không tải gì lên, và chỉ chấm phần cơ học của rubric — phần còn lại do giảng viên quyết định.",
    sheetLead:
      "Đề luyện tập cho buổi này. Việc nộp và chấm bài trực tuyến chưa mở.",

    whenBefore: "Trước khi lên lớp",
    whenIn: "Trên lớp",
    whenAfter: "Sau khi lên lớp",
    whenCheck: "Tự kiểm tra",
    stepReadTitle: "Đọc chương",
    stepReadNote:
      "Vừa đọc vừa làm các khối 🧪 Try It Yourself — mỗi khối đều ghi rõ kết quả mong đợi, nên bạn tự kiểm tra được ngay.",
    stepDeckTitle: "Slide bài giảng",
    stepDeckNote:
      "Bộ slide giảng viên chiếu trên lớp, kèm các sơ đồ giảng dạy. Dùng phím <kbd>j</kbd> và <kbd>k</kbd> để chuyển slide, <kbd>n</kbd> để xem ghi chú giảng viên.",
    stepHwTitle: "Bài tập {nn}",
    stepHwTitle8: "Bài tập 07 — ôn tập",
    stepHwNote:
      "Dùng đề đã công bố để luyện tập và giữ bài làm trong repository của bạn. Việc nộp và chấm bài trực tuyến chưa mở.",
    stepToolTitle: "Công cụ tự chấm",
    stepToolNote:
      "Chấm phần cơ học của rubric ngay trên trình duyệt của bạn — không tải gì lên. Công cụ cho biết bạn đang đứng ở đâu, chưa phải điểm cuối; giảng viên mới là người quyết định.",
    stepToolCta: "Mở công cụ tự chấm",
    chapterCta: "Chương {n}",
    deckCta: "Slide {n}",
    homeworkCta: "Bài tập {nn}",
    midtermTitle: "Tuần 8 là tuần thi giữa kỳ.",
    midtermBody:
      " Đề thi thực hành, 90 phút, không dùng internet. Bạn được mang theo ghi chú của mình, các chương giáo trình ngoại tuyến và file dự án. Chương này là hướng dẫn ôn tập — đề thi thật không đăng ở đây.",
    exerciseNote:
      "<strong>Bài tập trên lớp không có trên trang này.</strong> Vì nó kèm đáp án chi tiết nên giảng viên sẽ phát trực tiếp trong buổi học.",
    hubLead:
      "Tuần {n} trong 15 tuần. Đọc chương trước khi lên lớp, theo slide trên lớp, rồi dùng đề bài tập để luyện thêm.",
    hubEyebrow: "Tuần {nn} · Mạch học",
    pagerPrev: "← Buổi {n}",
    pagerNext: "Buổi {n} →",
    hubTitle: "Buổi {n}: {topic}",

    homeTitle: "Học làm web bằng cách làm thật.",
    homeLead:
      "Toàn bộ lộ trình học INS2053 — giáo trình, slide bài giảng và bài tập mỗi tuần — được sắp xếp thành một mạch học rõ ràng.",
    homeEyebrow: "INS2053 · Cổng học tập cho sinh viên",
    startCta: "Bắt đầu từ Buổi 1",
    exploreCta: "Xem 15 tuần học",
    statSessions: "buổi học có hướng dẫn",
    statChapters: "chương giáo trình",
    statDecks: "slide bài giảng",
    resKicker: "Mọi thứ nằm chung một chỗ",
    resHeading: "Học liệu khóa học",
    resSub: "Bắt đầu từ buổi học của bạn, hoặc mở thẳng tới tài liệu bạn cần.",
    tileSessions: "Buổi học",
    tileSessionsSub: "Từng tuần, theo đúng thứ tự lên lớp",
    tileEbook: "Giáo trình sinh viên",
    tileEbookSub: "15 chương + Phụ lục A",
    tileSlides: "Slide bài giảng",
    tileSlidesSub: "17 bộ slide · 60 sơ đồ",
    tileHomework: "Bài tập",
    tileHomeworkSub: "15 đề luyện tập · nộp bài sau",
    tileTool: "Công cụ tự chấm",
    tileToolSub: "Tự chấm bài theo rubric ngay trên trình duyệt của bạn",
    tileGuide: "Bạn mới tới?",
    tileGuideSub: "Cách dùng giáo trình, slide, bài tập và công cụ tự chấm",
    tileAgents: "Hướng dẫn AI Agents",
    tileAgentsSub: "VS Code + Copilot hoặc Cline — cài và dùng AI cho bài tập của bạn",
    flowKicker: "Một nhịp học mỗi tuần",
    flowHeading: "Mỗi tuần học diễn ra thế nào",
    flowSub: "Chuẩn bị trước khi lên lớp, học chung trên lớp, rồi biến kiến thức thành bài làm.",
    flow1Body:
      "Đọc chương giáo trình và làm hết các khối <em>Try It Yourself</em> trong đó.",
    flow2Body: "150 phút gồm lý thuyết, thực hành có hướng dẫn và bắt đầu làm bài tập.",
    flow3Body:
      "Luyện tiếp theo đề bài và giữ kết quả trong repository của bạn. Việc nộp và chấm bài trực tuyến chưa mở.",
    schedHeading: "15 tuần học",
    schedCaption: "Mỗi dòng dẫn tới chương, slide và đề bài tập của tuần đó.",
    thWeek: "Tuần",
    thSession: "Buổi",
    thRead: "Đọc",
    thSlides: "Slide",
    thHomework: "Bài tập",
    extraHeading: "Nên đọc thêm",
    extraSub: "cách chọn giữa các công nghệ web sau khi khóa học đã kết thúc.",
    notHereHeading: "Những gì không có trên trang này",
    notHereBody:
      "Đề thi, rubric chấm điểm, bài giải mẫu và các bài tập trên lớp kèm đáp án đều dành riêng cho giảng viên. Việc nộp và chấm bài tập cũng không diễn ra ở đây — hãy làm theo hướng dẫn giảng viên thông báo trên lớp.",
    sessionCrumbLabel: "Buổi {n}",

    eyebrowCount: "{n} học liệu",
    smallMidterm: "Tuần thi giữa kỳ",
    eyebrowChapter: "Giáo trình · Chương {nn}",
    eyebrowAppendix: "Giáo trình · Phụ lục",
    eyebrowHomework: "Buổi {nn} · Bài tập",
    subAppendix: "Phụ lục A",
    unpubTitle: "Được phát trên lớp, không công bố trên trang này",
    idxSessionsHeading: "Buổi học",
    idxSessionsLead:
      "Mười lăm tuần, theo đúng thứ tự lên lớp. Mỗi trang buổi học gom sẵn chương, slide và đề bài tập của tuần đó.",
    idxEbookHeading: "Giáo trình sinh viên",
    idxEbookLead: "Mười lăm chương kèm một phụ lục. Hãy đọc chương của tuần trước khi lên lớp.",
    idxHomeworkHeading: "Bài tập",
    idxHomeworkLead: "Mỗi buổi một đề luyện tập, kèm yêu cầu và rubric tham khảo.",
    idxSlidesHeading: "Slide bài giảng",
    idxSlidesLead:
      "Mười bảy bộ slide với 60 sơ đồ giảng dạy. Dùng phím j và k để chuyển slide, n để xem ghi chú giảng viên.",
    idxSlidesNote:
      "<strong>Về ngôn ngữ:</strong> các bộ slide <em>giữ tiếng Anh có chủ đích</em>, không phải vì chưa dịch kịp. Slide là thứ giảng viên chiếu trên lớp, và nhãn trong 60 sơ đồ đúng là thuật ngữ mà đề thi thực hành cùng rubric dùng — dịch chúng ra tiếng Việt sẽ dạy bạn một từ khoá mà bạn không bao giờ phải tìm trong đề. Phần bạn đọc bằng tiếng Việt là học liệu viết: hãy mở chương của tuần, rồi tới slide. Mười lăm tên buổi học bên dưới hiển thị bằng tiếng Việt để bạn định vị được buổi cần tìm.",
    idxPracticeNote:
      "<strong>Chế độ luyện tập:</strong> việc nộp và chấm bài trực tuyến chưa mở. Hãy làm từng đề trên máy và giữ kết quả trong repository Git của bạn tới khi giảng viên thông báo lịch nộp. Muốn biết một đề được chấm thế nào theo rubric, hãy mở <a href=\"{href}\">công cụ tự chấm</a> — công cụ chạy ngay trên trình duyệt và không tải gì lên.",
    idxCourseWide: "Slide tổng hợp cả khóa",
    idxOverviewDeck: "Slide giới thiệu khóa học",
    idxAllSessions: "Tất cả buổi học",
    idxOrientation: "Làm quen khóa học",
    idxWeekN: "Tuần {n}",
    idxWeekMidterm: "Tuần 8 · thi giữa kỳ",
    idxSessionN: "Buổi {n}",
    idxChapterLabel: "Chương {n} — {title}",
    idxSessionLabel: "Buổi {n} — {topic}",
    idxDeckLabel: "Slide {n} — {topic}",
    langSwitchNotice: "Trang này có cả bản {name}",
  },
};




