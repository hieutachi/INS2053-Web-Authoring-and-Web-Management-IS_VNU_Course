import {
  Code,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Presentation,
  PresentationFragment,
  PresentationSlide,
  Stack,
  Row,
  Tag,
  Text,
  Callout,
  Divider,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 8: review and midterm)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 13px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. Everything from sessions 1 to 7, on one page ---------- */
function CourseMap({ t }: { t: CanvasTokens }) {
  const brick = (
    x: number, y: number, w: number, n: string, title: string, items: string, fill: string,
  ) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height="60" rx="7" fill={fill} />
      <text x="10" y="19" fontSize="11.5" fontWeight="700" fill={ON_FILL}>{n}</text>
      <text x="10" y="36" fontSize="12.5" fontWeight="600" fill={ON_FILL}>{title}</text>
      <text x="10" y="52" fontSize="11" fill={ON_FILL}>{items}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 268" width="100%" role="img"
         aria-label="A pyramid of what the course has covered. The bottom layer is HTML structure from sessions one to three. The middle layer is CSS styling from sessions four and five. The top layer is whole sites and CSS3 polish from sessions six and seven. Everything above rests on the layer below it.">
      <text x="0" y="15" fontSize="13" fontWeight="600" fill={t.text.primary}>Seven sessions, three layers. Each layer stands on the one below.</text>

      <text x="0" y="42" fontSize="11.5" fill={t.text.tertiary}>LAYER 3 — whole sites</text>
      {brick(0, 50, 274, "SESSION 6", "Multi-page sites", "relative links · nav · the active class", t.chart.green)}
      {brick(286, 50, 274, "SESSION 7", "CSS3 and web fonts", "Google Fonts · radius · shadow · transition", t.chart.green)}

      <text x="0" y="132" fontSize="11.5" fill={t.text.tertiary}>LAYER 2 — how it looks</text>
      {brick(0, 140, 274, "SESSION 4", "Applying CSS", "selectors · box model · specificity", t.chart.goldenYellow)}
      {brick(286, 140, 274, "SESSION 5", "Page layouts", "semantic tags · display · flexbox", t.chart.goldenYellow)}

      <text x="0" y="222" fontSize="11.5" fill={t.text.tertiary}>LAYER 1 — what it means</text>
      {brick(0, 230, 560, "SESSIONS 1-3", "HTML structure", "doctype · head vs body · headings · lists · links · images and alt text", t.chart.blue)}
    </svg>
  );
}

/* ---------- 2. Where the 90 minutes and the marks go ---------- */
function ExamBudget({ t }: { t: CanvasTokens }) {
  const W = 560;
  const probs = [
    { key: "P1", pts: 2, min: 15, label: "HTML Basics", hint: "about.html structure", fill: t.chart.blue },
    { key: "P2", pts: 3, min: 25, label: "CSS Styling", hint: "css/style.css rules", fill: t.chart.goldenYellow },
    { key: "P3", pts: 3, min: 25, label: "Page Layout", hint: "index.html semantic HTML", fill: t.chart.green },
    { key: "P4", pts: 2, min: 15, label: "Multi-page Nav", hint: "nav on all 3 pages", fill: t.chart.blue },
  ];
  let x = 0;

  return (
    <svg viewBox="0 0 560 232" width="100%" role="img"
         aria-label="A single bar split into four sections showing how the midterm marks are distributed across four practical coding problems: Problem 1 HTML Basics is two points, Problem 2 CSS Styling is three points, Problem 3 Page Layout is three points, and Problem 4 Multi-page Navigation is two points. Total is ten points in ninety minutes. Beneath the bar the same split is converted into a suggested time budget per problem.">
      <text x="0" y="15" fontSize="13" fontWeight="600" fill={t.text.primary}>90 min · 4 coding problems · 10 pts · No internet</text>

      {probs.map((p) => {
        const w = (p.pts / 10) * W;
        const g = (
          <g key={p.key} transform={`translate(${x},28)`}>
            <rect width={w} height="54" rx="6" fill={p.fill} />
            <text x={w / 2} y="24" fontSize="13" fontWeight="700" textAnchor="middle" fill={ON_FILL}>{p.key}</text>
            <text x={w / 2} y="42" fontSize="12" textAnchor="middle" fill={ON_FILL}>{p.pts} pts</text>
            <text x="0" y="76" fontSize="12.5" fill={t.text.primary}>{p.label}</text>
            <text x="0" y="94" fontSize="11.5" fill={t.text.tertiary}>{p.hint}</text>
            <text x="0" y="118" fontSize="12.5" fontFamily={MONO} fill={p.fill}>~{p.min} min</text>
          </g>
        );
        x += w;
        return g;
      })}

      <rect x="0" y="162" width="272" height="60" rx="6" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="12" y="180" fontSize="12.5" fill={t.chart.brightOrange}>The classic mistake</text>
      <text x="12" y="198" fontSize="12" fill={t.text.secondary}>Spending 40 minutes perfecting one problem,</text>
      <text x="12" y="214" fontSize="12" fill={t.text.secondary}>then leaving another problem blank.</text>

      <rect x="288" y="162" width="272" height="60" rx="6" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <text x="300" y="180" fontSize="12.5" fill={t.chart.green}>What to do instead</text>
      <text x="300" y="198" fontSize="12" fill={t.text.secondary}>Read all problems first. Save often.</text>
      <text x="300" y="214" fontSize="12" fill={t.text.secondary}>Partial code earns partial marks.</text>
    </svg>
  );
}

/* ---------- 3. The six mistakes that cost the most marks ---------- */
function MarkLosers({ t }: { t: CanvasTokens }) {
  const rows = [
    { bad: `<h1>Club</h1`, good: `<h1>Club</h1>`, why: "a missing > swallows the next line too" },
    { bad: `.header { }  on <div id="header">`, good: `#header { }`, why: "dot is a class, hash is an id" },
    { bad: `text-color: navy;`, good: `color: navy;`, why: "there is no text-color property in CSS" },
    { bad: `href="style.css"`, good: `href="css/style.css"`, why: "the file lives inside the css folder" },
    { bad: `<ul><li>One<li>Two</ul>`, good: `<ul><li>One</li><li>Two</li></ul>`, why: "every li needs closing in exam answers" },
    { bad: `no <!DOCTYPE html>`, good: `<!DOCTYPE html> on line 1`, why: "without it the browser uses quirks mode" },
  ];

  return (
    <svg viewBox="0 0 560 292" width="100%" role="img"
         aria-label="A three column table of the six most common exam mistakes. The first column shows what students write, marked in orange. The second column shows the correct version, marked in green. The third column gives the one line reason it matters.">
      <text x="0" y="14" fontSize="12.5" fontWeight="700" fill={t.chart.brightOrange}>WHAT LOSES THE MARK</text>
      <text x="212" y="14" fontSize="12.5" fontWeight="700" fill={t.chart.green}>WHAT EARNS IT</text>
      <text x="410" y="14" fontSize="12.5" fontWeight="700" fill={t.text.tertiary}>WHY</text>
      <line x1="0" y1="22" x2="560" y2="22" stroke={t.stroke.secondary} />

      {rows.map((r, i) => (
        <g key={i} transform={`translate(0,${30 + i * 39})`}>
          <rect width="560" height="34" rx="5" fill={i % 2 ? t.fill.tertiary : "transparent"} />
          <text x="6" y="15" fontSize="11" fontFamily={MONO} fill={t.chart.brightOrange}>{r.bad}</text>
          <text x="6" y="29" fontSize="11" fill={t.text.tertiary}>&#10007;</text>
          <text x="212" y="15" fontSize="11" fontFamily={MONO} fill={t.chart.green}>{r.good}</text>
          <text x="212" y="29" fontSize="11" fill={t.text.tertiary}>&#10003;</text>
          <text x="410" y="22" fontSize="11" fill={t.text.secondary}>{r.why}</text>
        </g>
      ))}

      <text x="0" y="266" fontSize="12.5" fill={t.text.secondary}>Comment your code: &lt;!-- nav --&gt; and /* card styles */</text>
      <text x="0" y="282" fontSize="12.5" fill={t.text.secondary}>show the marker you understood the structure.</text>
    </svg>
  );
}


export default function Session08ReviewAndMidterm() {
  const { tokens } = useHostTheme();
  const t = tokens;

  return (
    <Presentation
      keyboard
      controls
      progress
      slideNumber
      overview
      fullscreen
      speakerNotes
      deepLink
      touch
      loop={false}
      aspectRatio="16 / 9"
    >
      {/* ── Slide 1: Title ─────────────────────────────────────── */}
      <PresentationSlide
        id="s8-title"
        title="Session 8 — Review & Midterm"
        notes="Welcome to Session 8. This is a revision session — no new theory. We recap Sessions 1-7, practise exam questions, and prepare for the midterm this week."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="warning">INS2053 · Session 8 · Midterm this week</Tag>
          <H1>Review &amp; Midterm Preparation</H1>
          <Text tone="secondary">Consolidate Sessions 1–7 · understand the exam format · practise with sample questions.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s8-objectives" title="Session Objectives">
        <Stack gap={12}>
          <H2>Today's Goals</H2>
          <Stack gap={6}>
            <Text>1. Recap all key concepts from Sessions 1–7</Text>
            <Text>2. Understand the midterm format and marking criteria</Text>
            <Text>3. Practise with worked exam solutions (from sample-solution.md)</Text>
            <Text>4. Build a personal study plan for remaining gaps</Text>
            <Text>5. Complete a timed mini practice problem</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s8-agenda" title="Review Session Agenda">
        <Stack gap={12}>
          <H2>150-Minute Review Session Plan</H2>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">0:00–0:10</Tag><Text>Welcome, objectives, exam format overview</Text></Row>
            <Row gap={8}><Tag tone="primary">0:10–0:40</Tag><Text>Recap: Sessions 1–7 key concepts (layer by layer)</Text></Row>
            <Row gap={8}><Tag tone="primary">0:40–1:00</Tag><Text>Topic checklist + what the midterm covers</Text></Row>
            <Row gap={8}><Tag tone="primary">1:00–1:20</Tag><Text>Worked solutions to sample midterm problems</Text></Row>
            <Row gap={8}><Tag tone="success">1:20–1:50</Tag><Text>Timed mini practice problem (25 min build challenge)</Text></Row>
            <Row gap={8}><Tag tone="primary">1:50–2:10</Tag><Text>Common exam mistakes + study planning</Text></Row>
            <Row gap={8}><Tag tone="warning">2:10–2:30</Tag><Text>Q&amp;A, self-assessment, final tips</Text></Row>
          </Stack>
          <Callout tone="info">
            This is YOUR revision session. Ask questions about anything from Sessions 1–7.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up ───────────────────────────────────── */}
      <PresentationSlide id="s8-warmup" title="Warm-Up Challenge">
        <Stack gap={12}>
          <H2>Quick Fire — Can You Answer These?</H2>
          <Stack gap={8}>
            <Callout tone="info">What must be the very first line of every HTML5 document?</Callout>
            <Callout tone="info">What is the difference between a class selector (.) and an ID selector (#)?</Callout>
            <Callout tone="info">Name the four layers of the CSS box model, from inside to outside.</Callout>
            <Callout tone="info">Where does the transition property go: on the base rule or on :hover?</Callout>
          </Stack>
          <Text tone="secondary">You have 3 minutes. Write answers on paper, then we check together.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: The whole course on one page ──────────────── */}
      <PresentationSlide
        id="s8-course-map"
        title="Everything So Far, On One Page"
        notes="Put this up and stay on it. Ask the class to point at the layer they feel least sure about, then spend the revision time there."
      >
        <Stack gap={12}>
          <H2>Seven Sessions, Three Layers</H2>
          <CourseMap t={t} />
          <Callout tone="info">
            If your CSS "does not work", the fault is almost always one layer down: an unclosed tag, or a wrong path to style.css.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Recap Sessions 1-3 ────────────────────────── */}
      <PresentationSlide id="s8-recap-1-3" title="Recap: Sessions 1–3">
        <Stack gap={12}>
          <H2>Sessions 1–3: HTML foundations</H2>
          <Stack gap={6}>
            <Text><Text as="span">S1 — Dreamweaver &amp; HTML basics:</Text> DOCTYPE html, html/head/body, Design/Code/Split views.</Text>
            <Text><Text as="span">S2 — Site setup &amp; navigation:</Text> folder structure, relative paths, nav/ul/li/a.</Text>
            <Text><Text as="span">S3 — Text &amp; images:</Text> h1-h6, p, ul/ol, img with alt, strong/em.</Text>
          </Stack>
          <Callout tone="info">
            Key skill: Write a valid HTML5 document from memory with proper structure and semantic elements.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Recap Sessions 4-5 ────────────────────────── */}
      <PresentationSlide id="s8-recap-4-5" title="Recap: Sessions 4–5">
        <Stack gap={12}>
          <H2>Sessions 4–5: CSS &amp; Layouts</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H3>Session 4: Applying CSS</H3>
              <Text>Three ways: inline, internal, external.</Text>
              <Text>Selectors: element, class (.), ID (#).</Text>
              <Text>Box model: content → padding → border → margin.</Text>
              <Text>box-sizing: border-box globally.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Session 5: Page Layouts</H3>
              <Text>Semantic HTML: header, nav, main, aside, footer.</Text>
              <Text>display: block | inline | inline-block | flex.</Text>
              <Text>Flexbox: justify-content, align-items, flex ratios.</Text>
              <Text>Centred wrapper: max-width + margin: 0 auto.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Recap Sessions 6-7 ────────────────────────── */}
      <PresentationSlide id="s8-recap-6-7" title="Recap: Sessions 6–7">
        <Stack gap={12}>
          <H2>Sessions 6–7: Multi-Page &amp; CSS3</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H3>Session 6: Multi-Page Sites</H3>
              <Text>Same template, only &lt;main&gt; changes.</Text>
              <Text>class="active" highlights current page.</Text>
              <Text>Relative links: about.html, ../index.html.</Text>
              <Text>Components: event cards, gallery, forms.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Session 7: CSS3 &amp; Web Fonts</H3>
              <Text>Google Fonts via &lt;link&gt; + fallback stacks.</Text>
              <Text>border-radius, box-shadow, gradients.</Text>
              <Text>transition on base selector + :hover transform.</Text>
              <Text>Roboto Slab + Open Sans for our project.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Topic Checklist ────────────────────────────── */}
      <PresentationSlide id="s8-topic-checklist" title="What the Midterm Covers">
        <Stack gap={12}>
          <H2>Midterm Topic Checklist with Point Mapping</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <H3>Problem 1 — HTML Basics (2 pts)</H3>
              <Text>DOCTYPE, html/head/body structure</Text>
              <Text>Headings (h1), paragraphs (p), lists (ul/li)</Text>
              <Text>Images with src and alt attributes</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Problem 2 — CSS Styling (3 pts)</H3>
              <Text>body, h1, p selectors with exact values</Text>
              <Text>.container class (max-width, margin, padding)</Text>
              <Text>nav and nav a styling</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Problem 3 — Page Layout (3 pts)</H3>
              <Text>Semantic elements: header, nav, main, footer</Text>
              <Text>CSS link in head, image with alt</Text>
              <Text>Proper nesting and closed tags</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Problem 4 — Multi-page Nav (2 pts)</H3>
              <Text>Consistent nav on all 3 pages</Text>
              <Text>Correct relative paths</Text>
              <Text>class="active" + CSS rule for highlighting</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">
            Total: 2+3+3+2 = 10 points · 90 minutes · No internet · No multiple choice · All practical coding
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Exam format ───────────────────────────────── */}
      <PresentationSlide id="s8-exam-format" title="Midterm format" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>Midterm exam structure (90 minutes)</H2>
          <ExamBudget t={t} />
          <Text tone="secondary">All practical coding — no multiple choice, no short answer. Create files in exam-midterm/ folder. Covers Sessions 1–7.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Worked Solution 1 ─────────────────────────── */}
      <PresentationSlide id="s8-worked-solution-1" title="Worked Solution: CSS File">
        <Stack gap={10}>
          <H2>Sample Solution: css/style.css (Problem 2)</H2>
          <Text tone="secondary">This is a FULL solution from sample-solution.md. Study the structure and comments.</Text>
          <Code language="css">{`/* ===== BODY STYLES ===== */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f5f5f5;
}
/* ===== HEADING STYLES ===== */
h1 { color: #003366; text-align: center; }

/* ===== PARAGRAPH STYLES ===== */
p { font-size: 16px; line-height: 1.5; color: #333; }

/* ===== CONTAINER ===== */
.container {
  max-width: 960px; margin: 20px auto;
  padding: 10px; background-color: #fff;
}
/* ===== NAVIGATION BAR ===== */
nav { background-color: #003366; padding: 10px; }
nav a { color: #fff; text-decoration: none; margin-right: 15px; }
nav a.active { font-weight: bold; color: #ffcc00; }`}</Code>
          <Callout tone="info">
            Markers check: all 6 selectors present, exact values match, CSS file in css/ folder, linked correctly in HTML.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Worked Solution 2 ─────────────────────────── */}
      <PresentationSlide id="s8-worked-example" title="Worked Solution: About Page" background={{ pattern: "grid", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Sample Solution: about.html (Problem 1)</H2>
          <Text tone="secondary">From sample-solution.md. Notice every required element is present.</Text>
          <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About — CodeBreakers Club</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header><h1>CodeBreakers Club</h1></header>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html" class="active">About</a>
    <a href="activities.html">Activities</a>
  </nav>
  <div class="container"><main>
    <h1>About CodeBreakers Club</h1>
    <p>Founded in 2020 by CS students at VNU.</p>
    <p>We hold weekly workshops and hackathons.</p>
    <ul>
      <li>Weekly coding workshops</li>
      <li>Hackathon training</li>
      <li>Industry networking</li>
    </ul>
    <img src="images/logo.png" alt="CodeBreakers Club logo">
  </main></div>
  <footer><p>Copyright 2025 CodeBreakers Club</p></footer>
</body></html>`}</Code>
          <Callout tone="info">
            Check: DOCTYPE line 1, CSS link, class="active" on About, 2 paragraphs, 3 list items, img with alt, all tags closed.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Timed Mini Practice ───────────────────────── */}
      <PresentationSlide id="s8-timed-practice" title="Timed Mini Practice" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>Try This Now (15 Minutes)</H2>
          <Text>Create a file called practice.html. Build from memory:</Text>
          <Stack gap={6}>
            <Text>1. Valid HTML5 structure with DOCTYPE</Text>
            <Text>2. Link to css/style.css</Text>
            <Text>3. Header with h1 "Practice Page"</Text>
            <Text>4. Nav with 3 links (Home, About, Practice — Practice is active)</Text>
            <Text>5. Main content with h2, one paragraph, and an unordered list with 3 items</Text>
            <Text>6. Footer with copyright</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Set a timer for 15 minutes. STOP when time is up. Then compare with the sample solution.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Sample Practice Question ──────────────────── */}
      {/* ── Try It Now: Build from Memory ─────────────────────── */}
      <PresentationSlide id="s08-try-html" title="Try It Now: Build a Page from Memory" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — no notes, no peeking</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Build this from scratch</Text>
              <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Practice Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>My Title</h1>
    <nav>
      <a href="index.html" class="active">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>
  <main>
    <p>Hello world.</p>
  </main>
</body>
</html>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Checklist (all from memory)</Text>
              <Text>☐ DOCTYPE on line 1</Text>
              <Text>☐ lang="en" on &lt;html&gt;</Text>
              <Text>☐ meta charset UTF-8</Text>
              <Text>☐ meta viewport</Text>
              <Text>☐ title element</Text>
              <Text>☐ link to stylesheet</Text>
              <Text>☐ class="active" on current page link</Text>
              <Callout tone="info">If you missed any item, that is what you need to study. Write it down and try again.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Try It Now: CSS from Memory ───────────────────────── */}
      <PresentationSlide id="s08-try-css" title="Try It Now: Write CSS from Memory" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — no notes, no peeking</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Write CSS for this HTML</Text>
              <Code language="html">{`<header>
  <h1>My Club</h1>
  <nav>
    <a href="index.html" class="active">Home</a>
    <a href="about.html">About</a>
  </nav>
</header>`}</Code>
              <Text fontWeight="700">Requirements (from memory)</Text>
              <Text>Header: dark background, white text, padding</Text>
              <Text>Nav links: horizontal, no bullets, spaced out</Text>
              <Text>.active: underline or different color</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Checklist</Text>
              <Text>☐ header {`{ background-color: #333; color: white; padding: 20px; }`}</Text>
              <Text>☐ nav a {`{ text-decoration: none; margin-right: 15px; }`}</Text>
              <Text>☐ .active {`{ text-decoration: underline; font-weight: bold; }`}</Text>
              <Text>☐ nav ul {`{ list-style: none; display: flex; }`}</Text>
              <Callout tone="info">If you cannot remember the property names, that is what you need to study. Write them down and try again.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s8-practice-q" title="Sample CSS question" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>Try this now (CSS style)</H2>
          <Text>Write CSS for an event card with: light grey background, blue left border (5px), rounded corners (8px), subtle box-shadow, smooth hover lift (3px up, deeper shadow). Transition duration 0.3s.</Text>
          <PresentationFragment index={0} effect="fade">
            <Code language="css">{`.event-card {
  background-color: #f8f9fa;
  border-left: 5px solid #3498db;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}`}</Code>
          </PresentationFragment>
          <Text tone="secondary">Key points: transition on BASE selector, translateY negative = up, rgba not #000.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s08-debug" title="Debug This: Exam-Style" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This exam answer has four errors. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Student's answer</Text>
              <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Club</title>
</head>
<body>
  <header>
    <h1>Welcome<h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
    </nav>
  </header>
  <main>
    <p class="intro">We meet every Friday.
  </main>
</body>
</html>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Errors</Text>
              <Text tone="danger">1. &lt;h1&gt;Welcome&lt;h1&gt; — missing / in closing tag. Should be &lt;/h1&gt;.</Text>
              <Text tone="danger">2. No &lt;link rel="stylesheet"&gt; — the CSS file is not connected.</Text>
              <Text tone="danger">3. &lt;p class="intro"&gt; — missing closing &lt;/p&gt; tag.</Text>
              <Text tone="danger">4. No &lt;meta name="viewport"&gt; — page will not be responsive.</Text>
              <Callout tone="info">In the exam, check every opening tag has a closing tag. Count them: &lt;h1&gt;...&lt;/h1&gt;, &lt;p&gt;...&lt;/p&gt;, &lt;a&gt;...&lt;/a&gt;.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 15: Common exam mistakes ─────────────────────── */}
      <PresentationSlide id="s8-mistakes" title="Common exam mistakes">
        <Stack gap={12}>
          <H2>Avoid these mark-losers</H2>
          <MarkLosers t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 16: More Common Mistakes ──────────────────────── */}
      <PresentationSlide id="s8-more-mistakes" title="More Exam Pitfalls">
        <Stack gap={12}>
          <H2>Additional Common Mistakes</H2>
          <Stack gap={6}>
            <Callout tone="danger">Forgetting alt attribute on &lt;img&gt; → -0.15 points per rubric.</Callout>
            <Callout tone="danger">Using absolute paths (C:\Users\...) instead of relative → -0.25 points.</Callout>
            <Callout tone="danger">Not creating activities.html at all → -0.5 points immediately.</Callout>
            <Callout tone="danger">Writing text-color instead of color → partial credit only.</Callout>
            <Callout tone="danger">Putting @import after other CSS rules → silently ignored.</Callout>
            <Callout tone="danger">Navigation HTML differs between pages → consistency marks lost.</Callout>
            <Callout tone="danger">CSS file saved in root instead of css/ folder → -0.1 points.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Exam day tips ─────────────────────────────── */}
      <PresentationSlide id="s8-tips" title="Exam day tips">
        <Stack gap={12}>
          <H2>Maximise your marks</H2>
          <Stack gap={6}>
            <Text>Read ALL 4 problems first — budget your time, tackle easier ones first.</Text>
            <Text>Write EVERY file — partial code earns partial marks (2+3+3+2 = 10).</Text>
            <Text>Save frequently — use Ctrl+S after every change. Don't lose work.</Text>
            <Text>Check file names and paths: about.html, css/style.css, images/logo.png.</Text>
            <Text>Use comments: &lt;!-- navigation --&gt; and /* nav styles */ show understanding.</Text>
            <Text>If stuck on one problem, move on — come back later. Secure easy marks first.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Study Planning ────────────────────────────── */}
      {/* ── Try It Now: Flexbox from Memory ───────────────────── */}
      <PresentationSlide id="s08-try-flexbox" title="Try It Now: Flexbox from Memory" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — write flexbox CSS from scratch</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Make this layout: sidebar (30%) + main (70%)</Text>
              <Code language="html">{`<div class="container">
  <aside>Sidebar</aside>
  <main>Main content</main>
</div>`}</Code>
              <Text fontWeight="700">Write the CSS (from memory)</Text>
              <Code language="css">{`.container {
  display: flex;
  gap: 20px;
}

aside { flex: 1; }
main { flex: 2; }`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Checklist</Text>
              <Text>☐ display: flex on the PARENT (container)</Text>
              <Text>☐ flex: 1 and flex: 2 on the CHILDREN</Text>
              <Text>☐ gap for spacing between columns</Text>
              <Text>☐ justify-content if you need alignment</Text>
              <Callout tone="info">flex: 1 + flex: 2 = 3 total parts. aside gets 1/3 (33%), main gets 2/3 (67%). Close enough to 30/70.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s8-study-plan" title="Build Your Study Plan">
        <Stack gap={12}>
          <H2>Create a Targeted Revision Plan</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="success">Step 1</Text> — Fill in the self-assessment worksheet honestly (ebook chapter 8).</Text>
            <Text><Text as="span" tone="success">Step 2</Text> — For each "No": note which session to re-read + one practice task.</Text>
            <Text><Text as="span" tone="success">Step 3</Text> — Schedule 30-minute revision blocks before the exam.</Text>
            <Text><Text as="span" tone="success">Step 4</Text> — Build a mini-page from scratch without notes — best revision activity.</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Active recall beats passive reading. Close the book, write what you remember, then check.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Self-Assessment ───────────────────────────── */}
      {/* ── Exam Strategy ─────────────────────────────────────── */}
      <PresentationSlide id="s08-exam-strategy" title="Exam Strategy: Read, Plan, Code, Check">
        <Stack gap={12}>
          <H2>Four Steps for Every Exam Question</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1: Read (2 min)</Text>
              <Text>Read the question twice. Underline what they are asking for.</Text>
              <Text fontWeight="700">Step 2: Plan (1 min)</Text>
              <Text>Sketch the HTML structure in your head. Which tags? Which selectors?</Text>
              <Text fontWeight="700">Step 3: Code (5 min)</Text>
              <Text>Write HTML first, then CSS. Do not try to do both at once.</Text>
              <Text fontWeight="700">Step 4: Check (2 min)</Text>
              <Text>Count closing tags. Check semicolons. Verify selectors match.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Time management</Text>
              <Text>90 minutes ÷ 10 questions = 9 minutes per question.</Text>
              <Text>If stuck, skip and come back. Do not spend 20 minutes on one question.</Text>
              <Text>Easy questions first — build confidence and secure marks.</Text>
              <Callout tone="warning">The #1 cause of lost marks is not lack of knowledge — it is rushing and making careless errors.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s08-do-dont" title="Exam: Do vs Don't">
        <Stack gap={10}>
          <H2>Exam Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Read every question twice before writing</Text>
              <Text>Write HTML structure first, then CSS</Text>
              <Text>Check for closing tags and semicolons</Text>
              <Text>Use meaningful class names (not .x or .thing)</Text>
              <Text>Leave time to review all answers</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Rush through without reading carefully</Text>
              <Text>Skip the boilerplate (DOCTYPE, html, head, body)</Text>
              <Text>Forget the viewport meta tag</Text>
              <Text>Use inline styles (style="...") instead of CSS file</Text>
              <Text>Leave any question blank — write something</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s8-self-assess" title="Self-Assessment Worksheet">
        <Stack gap={12}>
          <H2>Rate Yourself Honestly</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={8}>
            <Stack gap={3}>
              <Text>1. Write complete HTML5 document from memory</Text>
              <Text>2. Create proper relative file paths</Text>
              <Text>3. Use semantic elements correctly</Text>
              <Text>4. Link external CSS and explain why</Text>
              <Text>5. Write class, ID, element selectors</Text>
            </Stack>
            <Stack gap={3}>
              <Text>6. Explain box model and calculate width</Text>
              <Text>7. Build layout with semantic HTML</Text>
              <Text>8. Create consistent multi-page navigation</Text>
              <Text>9. Add Google Fonts with fallback stacks</Text>
              <Text>10. Use transitions, transforms, shadows</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text><Text as="span" tone="success">9-10 Yes:</Text> Well-prepared. Focus on timed practice.</Text>
          <Text><Text as="span" tone="primary">6-8 Yes:</Text> Good foundation. Revise weak areas 1-2 hours.</Text>
          <Text><Text as="span" tone="danger">Below 6:</Text> Significant gaps. Dedicate 3-4 hours before exam.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Debugging Practice ────────────────────────── */}
      <PresentationSlide id="s8-debugging" title="Debugging Practice">
        <Stack gap={12}>
          <H2>Spot the Errors (5 Minutes)</H2>
          <Text tone="secondary">Each code snippet below has one error. Find it and fix it.</Text>
          <Stack gap={6}>
            <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head><title>My Page</head>
<body>
  <h1>Welcome</h1>
</body>`}</Code>
            <Text tone="danger">Error: Missing &lt;/title&gt; closing tag, missing &lt;/html&gt;, no CSS link, no meta charset.</Text>
            <Code language="css">{`.header { color: navy; }
#nav { background-color: #003366; }
text-color: white;`}</Code>
            <Text tone="danger">Error: text-color is not a valid CSS property — use color: white instead.</Text>
          </Stack>
          <Callout tone="info">
            In the exam, read your code aloud line by line. Most errors are unclosed tags or misspelled properties.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 21: Key Concepts Quick Reference ──────────────── */}
      <PresentationSlide id="s8-quick-ref" title="Key Concepts Quick Reference">
        <Stack gap={12}>
          <H2>Everything You Need on One Slide</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={8}>
            <Stack gap={3}>
              <Text><Text as="span" tone="primary">&lt;!DOCTYPE html&gt;</Text> — Line 1, always</Text>
              <Text><Text as="span" tone="primary">Selectors</Text> — element, .class, #id</Text>
              <Text><Text as="span" tone="primary">box-sizing: border-box</Text> — global reset</Text>
              <Text><Text as="span" tone="primary">display: flex</Text> — on PARENT container</Text>
              <Text><Text as="span" tone="primary">justify-content</Text> — main axis alignment</Text>
            </Stack>
            <Stack gap={3}>
              <Text><Text as="span" tone="primary">align-items</Text> — cross axis alignment</Text>
              <Text><Text as="span" tone="primary">class="active"</Text> — current page highlight</Text>
              <Text><Text as="span" tone="primary">Relative paths</Text> — about.html, ../index.html</Text>
              <Text><Text as="span" tone="primary">transition</Text> — on base selector, not :hover</Text>
              <Text><Text as="span" tone="primary">font-family</Text> — always end with generic family</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text tone="secondary">Print this mentally before the exam. If you remember these ten items, you can reconstruct most solutions.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s08-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know You Are Ready</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Checkpoint 1</Pill><Text>You can write a complete HTML5 page from memory (DOCTYPE, html, head, body, meta charset, viewport, title).</Text></Row>
            <Row gap={8}><Pill>Checkpoint 2</Pill><Text>You can write a CSS rule for .class, #id, and element selectors without looking at notes.</Text></Row>
            <Row gap={8}><Pill>Checkpoint 3</Pill><Text>You can build a two-column layout with flexbox and explain what justify-content and align-items do.</Text></Row>
            <Row gap={8}><Pill>Checkpoint 4</Pill><Text>You can spot 3 errors in a broken HTML/CSS snippet within 2 minutes.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If you cannot do any of these from memory, re-read the corresponding ebook chapter and redo the exercise.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s08-assignment" title="Midterm Study Assignment">
        <Stack gap={10}>
          <H2>Prepare for the midterm — no graded homework this week</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Study tasks (do all four)</Text>
              <Text>1. Re-read ebook chapters 1–7. Summarize each chapter in 3 bullet points.</Text>
              <Text>2. Build a mini-page from scratch without notes — HTML + CSS, 10 minutes max.</Text>
              <Text>3. Complete the self-assessment worksheet on the previous slide.</Text>
              <Text>4. Fix all errors in the debugging practice slide — time yourself.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Exam strategy</Text>
              <Text>Read every question twice before writing code.</Text>
              <Text>Write the HTML structure first, then add CSS.</Text>
              <Text>Check for: closing tags, semicolons, correct selectors.</Text>
              <Callout tone="warning">The #1 mistake is rushing. Spend 2 minutes reading the question and 5 minutes writing the answer.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility in the Exam ─────────────────────────── */}
      <PresentationSlide id="s08-accessibility" title="Accessibility Marks You Can Bank">
        <Stack gap={12}>
          <H2>Cheap Points the Marker Always Checks</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>lang</Pill><Text>&lt;html lang=&quot;en&quot;&gt; on every page. One attribute, always marked.</Text></Row>
            <Row gap={8}><Pill>alt</Pill><Text>Descriptive alt on every &lt;img&gt;. Decorative images get alt=&quot;&quot; — empty, but present.</Text></Row>
            <Row gap={8}><Pill>Headings</Pill><Text>One &lt;h1&gt;, then h2 and h3 in order. Never skip a level to get a smaller font.</Text></Row>
            <Row gap={8}><Pill>Labels</Pill><Text>Every form input has a &lt;label for=&quot;id&quot;&gt;. Placeholder text is not a label.</Text></Row>
            <Row gap={8}><Pill>Landmarks</Pill><Text>header, nav, main, footer instead of four anonymous divs.</Text></Row>
            <Row gap={8}><Pill>Contrast</Pill><Text>Body text at 4.5:1 or better. Avoid light grey on white.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">In a 90-minute exam these six checks take about three minutes and are the most reliable marks on the paper.</Callout>
        </Stack>
      </PresentationSlide>



      {/* ── Slide 22: No homework + next ───────────────────────── */}
      <PresentationSlide id="s8-no-homework" title="No homework — midterm this week">
        <Stack gap={16} align="center">
          <H2>No homework this week!</H2>
          <Tag tone="warning">Midterm exam this week · 90 minutes · Sessions 1–7</Tag>
          <Stack gap={6} align="center">
            <Text>Focus your time on revision, not new assignments.</Text>
            <Text tone="secondary">Re-read ebook chapters 1–7. Practise coding from memory. Use the self-assessment worksheet.</Text>
            <Text tone="secondary">Build a mini-page from scratch without notes — that is the best revision.</Text>
          </Stack>
          <Divider />
          <Text>After the midterm: Session 9 introduces <Text as="span">Working with Tables</Text>.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
