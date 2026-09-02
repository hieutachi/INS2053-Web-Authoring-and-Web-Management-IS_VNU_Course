import {
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Presentation,
  PresentationSlide,
  Stack,
  Row,
  Tag,
  Code,
  Text,
  Callout,
  Divider,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 6: many pages, one design)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 13px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. One template, many pages ---------- */
function MultiPageNav({ t }: { t: CanvasTokens }) {
  const page = (x: number, name: string, body: string[], active: number) => (
    <g transform={`translate(${x},44)`}>
      <rect width="164" height="196" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <rect x="1" y="1" width="162" height="20" rx="7" fill={t.fill.tertiary} />
      <text x="10" y="15" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>{name}</text>

      <rect x="10" y="30" width="144" height="20" rx="4" fill={t.chart.blue} />
      <text x="82" y="44" fontSize="11" textAnchor="middle" fill={ON_FILL}>header + nav</text>
      <g>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={16 + i * 46} y={34} width="40" height="12" rx="3"
                fill={i === active ? t.chart.green : "rgba(11,18,32,0.22)"} />
        ))}
      </g>

      <rect x="10" y="58" width="144" height="98" rx="5" fill="none"
            stroke={t.chart.goldenYellow} strokeWidth="2" strokeDasharray="5 3" />
      <text x="82" y="80" fontSize="13" textAnchor="middle" fill={t.text.primary}>&lt;main&gt;</text>
      {body.map((line, i) => (
        <text key={i} x="82" y={100 + i * 17} fontSize="12" textAnchor="middle" fill={t.text.secondary}>{line}</text>
      ))}

      <rect x="10" y="164" width="144" height="20" rx="4" fill={t.chart.blue} />
      <text x="82" y="178" fontSize="11" textAnchor="middle" fill={ON_FILL}>footer</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 296" width="100%" role="img"
         aria-label="Three pages of the same site placed side by side. The blue header, navigation and footer bars are identical on all three. Only the dashed yellow main area differs, and the green highlight in the navigation moves to whichever page you are on.">
      <text x="0" y="16" fontSize="13" fontWeight="600" fill={t.text.primary}>Same shell on every page. Only main changes.</text>
      <text x="0" y="34" fontSize="12" fill={t.text.tertiary}>Blue = copied unchanged · Yellow dashed = you rewrite · Green = active link</text>
      {page(0, "index.html", ["Hero banner", "Welcome text"], 0)}
      {page(198, "about.html", ["Our story", "Team photos"], 1)}
      {page(396, "events.html", ["Event list", "Sign-up form"], 2)}
      <text x="0" y="266" fontSize="12.5" fill={t.text.secondary}>Build index.html completely first, then Save As for each new page.</text>
      <text x="0" y="286" fontSize="12.5" fill={t.text.secondary}>All pages share css/style.css — one edit restyles everything.</text>
    </svg>
  );
}

/* ---------- 2. Which href do I write? ---------- */
function LinkTargets({ t }: { t: CanvasTokens }) {
  const row = (y: number, code: string, meaning: string, tone: string) => (
    <g transform={`translate(0,${y})`}>
      <rect width="290" height="34" rx="6" fill={t.fill.tertiary} stroke={tone} strokeWidth="1.5" />
      <text x="12" y="22" fontSize="13" fontFamily={MONO} fill={t.text.primary}>{code}</text>
      <text x="302" y="22" fontSize="12.5" fill={t.text.secondary}>{meaning}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 274" width="100%" role="img"
         aria-label="A folder tree of the site on the left, and on the right four href examples: a plain filename for a page in the same folder, folder slash filename to go down into a subfolder, dot dot slash to come back up out of a subfolder, and a full https address for another website.">
      <text x="0" y="15" fontSize="13" fontWeight="600" fill={t.text.primary}>You are writing this link inside index.html</text>

      <rect x="0" y="26" width="176" height="126" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="12" y="46" fontSize="12.5" fontFamily={MONO} fill={t.text.secondary}>my-site/</text>
      <text x="26" y="66" fontSize="12.5" fontFamily={MONO} fill={t.chart.goldenYellow}>index.html</text>
      <text x="188" y="66" fontSize="11" fill={t.chart.goldenYellow}>you are here</text>
      <text x="26" y="86" fontSize="12.5" fontFamily={MONO} fill={t.text.primary}>about.html</text>
      <text x="26" y="106" fontSize="12.5" fontFamily={MONO} fill={t.text.secondary}>css/</text>
      <text x="40" y="126" fontSize="12.5" fontFamily={MONO} fill={t.text.primary}>style.css</text>
      <text x="26" y="146" fontSize="12.5" fontFamily={MONO} fill={t.text.secondary}>images/</text>

      <g transform="translate(258,26)">
        {row(0, `href="about.html"`, "same folder", t.chart.green)}
        {row(42, `href="css/style.css"`, "down into a folder", t.chart.green)}
        {row(84, `href="../index.html"`, "up out of a folder", t.chart.green)}
        {row(126, `href="https://vnu.edu.vn"`, "a different website", t.chart.blue)}
      </g>

      <rect x="0" y="176" width="560" height="30" rx="6" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="12" y="196" fontSize="12.5" fill={t.chart.brightOrange}>Never C:\Users\Mai\site\... — only works on YOUR laptop.</text>

      <text x="0" y="228" fontSize="12.5" fill={t.text.secondary}>Always forward slashes, always lowercase, never a space in a filename.</text>
      <text x="0" y="246" fontSize="12.5" fill={t.text.secondary}>Linux treats About.html and about.html as different files.</text>
      <text x="0" y="264" fontSize="12.5" fill={t.text.secondary}>Windows does not. That is why links break only after you upload.</text>
    </svg>
  );
}

/* ---------- 3. The active class moves with you ---------- */
function ActiveClassWalk({ t }: { t: CanvasTokens }) {
  const bar = (x: number, y: number, file: string, active: number, ok: boolean) => (
    <g transform={`translate(${x},${y})`}>
      <text x="0" y="0" fontSize="12.5" fontFamily={MONO} fill={t.text.secondary}>{file}</text>
      <rect y="8" width="248" height="32" rx="6" fill={t.chart.blue} />
      {["Home", "About", "Events"].map((label, i) => {
        const isOn = i === active;
        return (
          <g key={label} transform={`translate(${8 + i * 78},14)`}>
            <rect width="72" height="20" rx="4"
                  fill={isOn ? (ok ? t.chart.green : t.chart.brightOrange) : "rgba(11,18,32,0.18)"} />
            <text x="36" y="14" fontSize="11.5" textAnchor="middle" fill={ON_FILL}>{label}</text>
          </g>
        );
      })}
    </g>
  );

  return (
    <svg viewBox="0 0 560 244" width="100%" role="img"
         aria-label="Left column shows the correct result: on each of the three pages the green highlight sits on that page's own navigation link. Right column shows the mistake: the highlight stays on Home on every page because the active class was never moved.">
      <text x="0" y="14" fontSize="13" fontWeight="600" fill={t.chart.green}>Correct — the class moves with the page</text>
      <text x="290" y="14" fontSize="13" fontWeight="600" fill={t.chart.brightOrange}>Wrong — copied, never edited</text>

      {bar(0, 40, "index.html", 0, true)}
      {bar(0, 100, "about.html", 1, true)}
      {bar(0, 160, "events.html", 2, true)}

      {bar(290, 40, "index.html", 0, false)}
      {bar(290, 100, "about.html", 0, false)}
      {bar(290, 160, "events.html", 0, false)}

      <rect x="0" y="196" width="560" height="42" rx="6" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="12" y="214" fontSize="12.5" fontFamily={MONO} fill={t.text.primary}>&lt;a href="about.html" class="active"&gt;About&lt;/a&gt;</text>
      <text x="12" y="232" fontSize="12.5" fill={t.text.secondary}>CSS: nav a.active. Move the class by hand on each page.</text>
    </svg>
  );
}

export default function Session06Lecture() {
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
        id="s06-title"
        title="Session 6 — Multi-Page Sites"
        notes="Welcome to Session 6. Today we extend the layout into a full multi-page website with navigation highlighting and shared CSS."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 6</Tag>
          <H1>Multi-Page Sites &amp; Navigation</H1>
          <Text tone="secondary">Relative links, active-class highlighting, and one shared stylesheet across all your pages.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s06-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>Learning Objectives</H2>
          <Stack gap={6}>
            <Text>1. Build a multi-page website with consistent layout</Text>
            <Text>2. Create a navigation menu with current-page highlighting</Text>
            <Text>3. Use relative links to navigate between pages in the same folder</Text>
            <Text>4. Share one CSS stylesheet across all pages</Text>
            <Text>5. Plan what content each page of the site will need</Text>
            <Text>6. Preview reusable components (event cards, gallery grid, forms) built later in the course</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s06-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">0:00–0:10</Tag><Text>Welcome, objectives, warm-up recap</Text></Row>
            <Row gap={8}><Tag tone="info">0:10–0:20</Tag><Text>Recap: What did we learn in Session 5?</Text></Row>
            <Row gap={8}><Tag tone="primary">0:20–0:45</Tag><Text>Multi-page architecture + copy-and-modify workflow</Text></Row>
            <Row gap={8}><Tag tone="primary">0:45–1:05</Tag><Text>Relative links + active class demonstration</Text></Row>
            <Row gap={8}><Tag tone="primary">1:05–1:30</Tag><Text>New components (event cards, gallery, forms) + worked example</Text></Row>
            <Row gap={8}><Tag tone="success">1:30–2:20</Tag><Text>In-class practice (exercises/session-06)</Text></Row>
            <Row gap={8}><Tag tone="warning">2:20–2:30</Tag><Text>Homework briefing + recap + next session</Text></Row>
          </Stack>
          <Callout tone="info">
            Theory ~60 min · Practice ~80 min · Wrap-up ~10 min
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s06-warmup" title="Warm-Up: Session 5 Recap">
        <Stack gap={12}>
          <H2>Quick Check — What Do You Remember?</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: Name three semantic HTML5 elements and what they mean.</Callout>
            <Callout tone="info">Q2: What does display: flex do, and where do you put it?</Callout>
            <Callout tone="info">Q3: What is the difference between justify-content and align-items?</Callout>
            <Callout tone="info">Q4: If main has flex: 3 and aside has flex: 1, what ratio of width does each get?</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: Multi-Page Architecture ───────────────────── */}
      <PresentationSlide id="s06-architecture" title="Multi-Page Architecture">
        <Stack gap={12}>
          <H2>One Template, Many Pages</H2>
          <MultiPageNav t={t} />
          <Stack gap={6}>
            <Text>Header, nav, sidebar, and footer stay the same on every page.</Text>
            <Text>Only the &lt;main&gt; content changes per page.</Text>
            <Text>All pages link to the same css/style.css file.</Text>
          </Stack>
          <Callout tone="info">
            Workflow: build index.html completely, then Save As for each new page. Change the title, move the active class, replace main content.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Copy-and-Modify Checklist ─────────────────── */}
      <PresentationSlide id="s06-copy-checklist" title="Copy-and-Modify Checklist">
        <Stack gap={12}>
          <H2>The 5-Step Page Creation Checklist</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="success">Step 1</Text> — File &gt; Save As &gt; new-page.html (same folder).</Text>
            <Text><Text as="span" tone="success">Step 2</Text> — Change &lt;title&gt; to "Student Club - Page Name".</Text>
            <Text><Text as="span" tone="success">Step 3</Text> — Move class="active" to THIS page's nav link.</Text>
            <Text><Text as="span" tone="success">Step 4</Text> — Replace ONLY the &lt;main&gt; content.</Text>
            <Text><Text as="span" tone="success">Step 5</Text> — Verify header, nav, aside, footer are identical.</Text>
          </Stack>
          <Divider />
          <Callout tone="danger">
            Common mistake: Forgetting Step 3! The wrong page stays highlighted in the nav. Always check the active class.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Relative Links ────────────────────────────── */}
      <PresentationSlide id="s06-relative-links" title="Relative Links">
        <Stack gap={12}>
          <H2>Relative Links Between Pages</H2>
          <LinkTargets t={t} />
          <Callout tone="danger">
            Never use absolute paths like C:\Users\... — they only work on YOUR computer. Always use forward slashes (/).
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Path Examples Table ───────────────────────── */}
      <PresentationSlide id="s06-path-examples" title="Path Reference Table">
        <Stack gap={12}>
          <H2>Relative Path Quick Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <H3>Same Folder</H3>
              <Code language="html">{`<a href="about.html">About</a>`}</Code>
              <Text tone="secondary">Just the filename. No path prefix needed.</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Into a Subfolder</H3>
              <Code language="html">{`<link href="css/style.css">
<img src="images/logo.png">`}</Code>
              <Text tone="secondary">folder/filename — goes DOWN into a folder.</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Up to Parent Folder</H3>
              <Code language="html">{`<a href="../index.html">Home</a>`}</Code>
              <Text tone="secondary">../ means "go up one level". Used from pages/ subfolder.</Text>
            </Stack>
            <Stack gap={4}>
              <H3>External Website</H3>
              <Code language="html">{`<a href="https://vnu.edu.vn">VNU</a>`}</Code>
              <Text tone="secondary">Full URL with https:// for external sites only.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Active Class ──────────────────────────────── */}
      {/* ── Try It Now: Relative Links ────────────────────────── */}
      <PresentationSlide id="s06-try-nav" title="Try It Now: Fix These Paths" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — fix four broken links</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">You are editing pages/about.html. Fix these hrefs:</Text>
              <Code language="html">{`<!-- Bug 1: link to home page -->
<a href="index.html">Home</a>

<!-- Bug 2: link to contact page -->
<a href="contact.html">Contact</a>

<!-- Bug 3: link to stylesheet -->
<link rel="stylesheet" href="style.css">

<!-- Bug 4: link to image -->
<img src="images/logo.png" alt="Logo">`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>about.html is inside pages/. To reach index.html, you need to go UP one folder.</Text>
              <Text>contact.html is in the same folder — no ../ needed.</Text>
              <Text>style.css is in css/, which is at the root — need ../css/style.css.</Text>
              <Text>images/ is at the root — need ../images/logo.png.</Text>
              <Callout tone="info">Open each fixed link in the browser. If you see a 404, the path is still wrong.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s06-active-class" title="Active Navigation">
        <Stack gap={12}>
          <H2>Highlighting the Current Page</H2>
          <ActiveClassWalk t={t} />
          <Code language="css">{`.main-nav ul li a.active {\n  background-color: #2980b9;\n  color: white;\n}`}</Code>
          <Callout tone="warning">
            You must manually move the active class on each page. This is the most commonly forgotten step!
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Shared CSS Organisation ──────────────────── */}
      <PresentationSlide id="s06-shared-css" title="Shared CSS Organisation">
        <Stack gap={12}>
          <H2>Organising Your Shared Stylesheet</H2>
          <Code language="css">{`/* === RESET & BASE === */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* === LAYOUT === */
.wrapper { max-width: 1000px; margin: 0 auto; }

/* === HEADER === */
header { background-color: #1a5276; color: white; }

/* === NAVIGATION === */
nav { background-color: #2874a6; }
nav ul li a.active { background-color: #1a5276; }

/* === MAIN CONTENT === */
main { flex: 3; padding: 25px; }

/* === SIDEBAR === */
aside { flex: 1; background-color: #f0f4f8; }

/* === COMPONENTS === */
.event-card { ... }
.gallery { ... }

/* === FOOTER === */
footer { background-color: #1a5276; color: white; }`}</Code>
          <Text tone="secondary">One CSS file styles ALL pages. Add new component styles at the bottom in the COMPONENTS section.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: New Components ────────────────────────────── */}
      <PresentationSlide id="s06-components" title="New Components">
        <Stack gap={12}>
          <H2>Styling New Components</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Tag tone="info">Event Cards</Tag>
              <Text tone="secondary">.event-card with left border, date, location, and .btn action link.</Text>
              <Tag tone="info">Gallery Grid</Tag>
              <Text tone="secondary">.gallery with flex-wrap: wrap and gap. Items use flex: 1 1 200px.</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="info">Data Tables</Tag>
              <Text tone="secondary">border-collapse: collapse, th background, tr:nth-child(even) zebra striping.</Text>
              <Tag tone="info">Contact Form</Tag>
              <Text tone="secondary">Labels above inputs, :focus highlight, required attribute for validation.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Quick Check ───────────────────────────────── */}
      <PresentationSlide id="s06-quick-check" title="Quick Check">
        <Stack gap={12}>
          <H2>Discussion: Think About It</H2>
          <Stack gap={8}>
            <Callout tone="info">If you create events.html but forget to move class="active", what will the user see?</Callout>
            <Callout tone="info">Why should every page link to the SAME css/style.css instead of having separate CSS files?</Callout>
            <Callout tone="info">What happens if you write href="About.html" but the file is named about.html?</Callout>
          </Stack>
          <Text tone="secondary">Raise your hand when you have an answer.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Worked Example 1 ──────────────────────────── */}
      <PresentationSlide id="s06-code-example" title="Worked Example">
        <Stack gap={10}>
          <H2>Creating about.html from index.html</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="html">{`<!-- Step 1: Save As → about.html -->
<!-- Step 2: Update the title -->
<title>Student Club - About Us</title>

<!-- Step 3: Move class="active" -->
<nav><ul>
  <li><a href="index.html">Home</a></li>
  <li><a href="about.html" class="active">About</a></li>
  <li><a href="events.html">Events</a></li>
</ul></nav>

<!-- Step 4: Replace <main> only -->
<main>
  <h2>About Us</h2>
  <p>We are a community of students
     who love technology.</p>
  <table>
    <tr><th>Name</th><th>Role</th></tr>
    <tr><td>Nguyen Van A</td>
        <td>President</td></tr>
  </table>
</main>`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>The copy-and-modify workflow:</Text>
              <Text><Text as="span" tone="success">Step 1</Text> — File &gt; Save As &gt; about.html (same folder).</Text>
              <Text><Text as="span" tone="success">Step 2</Text> — Change &lt;title&gt; so each tab is unique.</Text>
              <Text><Text as="span" tone="success">Step 3</Text> — Move class="active" to THIS page's link.</Text>
              <Text><Text as="span" tone="success">Step 4</Text> — Replace ONLY &lt;main&gt; content.</Text>
              <Text><Text as="span" tone="success">Step 5</Text> — Header, nav, aside, footer stay identical.</Text>
              <Divider />
              <Text tone="secondary">&lt;link href="css/style.css"&gt; is already there — same CSS for all pages.</Text>
            </Stack>
          </Grid>
          <Callout tone="success">
            In the browser: about.html looks identical to index.html except "About" is highlighted in the nav and the main area shows club info + leaders table. Click "Home" to go back — "Home" lights up again.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Worked Example 2 ──────────────────────────── */}
      <PresentationSlide id="s06-worked-example-2" title="Worked Example: Event Cards">
        <Stack gap={10}>
          <H2>Building Events Page with Event Cards</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="html">{`<main>
  <h2>Events &amp; Activities</h2>
  <div class="event-card">
    <h3>Web Design Workshop</h3>
    <p class="event-date">Mar 15 | 2-4 PM</p>
    <p class="event-location">Room 301</p>
    <p>Learn HTML and CSS basics.</p>
    <a href="contact.html" class="btn">
      Register Now
    </a>
  </div>
  <div class="event-card">
    <h3>Music Night</h3>
    <p class="event-date">Mar 29 | 7 PM</p>
    <p>An evening of live music!</p>
    <a href="contact.html" class="btn">
      Get Tickets
    </a>
  </div>
</main>`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>Key points:</Text>
              <Text><Text as="span" tone="success">.event-card</Text> — styled block with left border accent.</Text>
              <Text><Text as="span" tone="success">.event-date</Text> — bold blue text via CSS.</Text>
              <Text><Text as="span" tone="success">.event-location</Text> — grey italic text.</Text>
              <Text><Text as="span" tone="success">.btn</Text> — inline-block link styled as button.</Text>
              <Text>Cards stack vertically with margin-bottom spacing.</Text>
              <Divider />
              <Text tone="secondary">Remember: set class="active" on the Events nav link!</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Common Mistakes ───────────────────────────── */}
      <PresentationSlide id="s06-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>Common Mistakes (and How to Fix Them)</H2>
          <Stack gap={6}>
            <Callout tone="danger">Forgetting to move the active class — wrong page appears highlighted. FIX: Always move it when creating a new page.</Callout>
            <Callout tone="danger">Broken relative links — wrong filename casing or absolute file paths. FIX: Use lowercase, forward slashes, relative paths only.</Callout>
            <Callout tone="danger">Inconsistent page structure — missing &lt;aside&gt; on one page breaks the layout. FIX: Keep header/nav/aside/footer identical on every page.</Callout>
            <Callout tone="danger">Different CSS paths — every page must link to css/style.css identically. FIX: Copy the &lt;link&gt; tag from index.html.</Callout>
            <Callout tone="danger">Duplicate &lt;title&gt; tags — each page needs a unique, descriptive title. FIX: Format "Student Club - Page Name".</Callout>
            <Callout tone="danger">Forgetting to test all links. FIX: Click through every nav link from every page before submitting.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s06-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>Three broken links. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">This nav looks correct and has three bugs</Text>
              <Code language="html">{`<!-- in pages/about.html -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html" class="active">About</a></li>
    <li><a href="Pages/contact.html">Contact</a></li>
  </ul>
</nav>
<link rel="stylesheet" href="style.css">`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. href="index.html" — wrong. about.html is in pages/, so Home needs ../index.html.</Text>
              <Text tone="danger">2. href="Pages/contact.html" — wrong casing. Folder is pages/ (lowercase), not Pages/.</Text>
              <Text tone="danger">3. href="style.css" — wrong path. CSS is in ../css/style.css, not in the pages/ folder.</Text>
              <Callout tone="info">Rule: every path is relative to WHERE the file is, not where the root is.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 16: Summary Table ─────────────────────────────── */}
      <PresentationSlide id="s06-summary-table" title="Session 6 Summary">
        <Stack gap={12}>
          <H2>Concept Summary Table</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">Multi-page site</Text> — Multiple HTML files linked together</Text>
              <Text><Text as="span" tone="primary">Relative link</Text> — Path relative to current file (about.html)</Text>
              <Text><Text as="span" tone="primary">Active nav</Text> — class="active" on current page link</Text>
              <Text><Text as="span" tone="primary">Shared CSS</Text> — One stylesheet linked by all pages</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">Event card</Text> — Styled block with left border accent</Text>
              <Text><Text as="span" tone="primary">Gallery grid</Text> — flex-wrap layout for photo thumbnails</Text>
              <Text><Text as="span" tone="primary">Zebra striping</Text> — tr:nth-child(even) alternating rows</Text>
              <Text><Text as="span" tone="primary">Form styling</Text> — Labels above inputs, :focus states</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Gallery Grid Layout ───────────────────────── */}
      <PresentationSlide id="s06-gallery-grid" title="Worked Example: Gallery Grid">
        <Stack gap={10}>
          <H2>Building a Photo Gallery with Flexbox</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="css">{`.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.gallery-item {
  flex: 1 1 200px;   /* grow, shrink, basis */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.gallery-item img {
  width: 100%;
  height: auto;
  display: block;     /* removes bottom gap */
}`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>Key properties:</Text>
              <Text><Text as="span" tone="success">flex-wrap: wrap</Text> — items flow to next line when space runs out.</Text>
              <Text><Text as="span" tone="success">flex: 1 1 200px</Text> — start at 200px, grow/shrink as needed.</Text>
              <Text><Text as="span" tone="success">overflow: hidden</Text> — clips images that exceed container.</Text>
              <Text><Text as="span" tone="success">display: block on img</Text> — removes the mysterious 4px gap below inline images.</Text>
              <Divider />
              <Text tone="secondary">Result: Responsive photo grid that adjusts columns automatically when you resize the browser.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Contact Form Styling ──────────────────────── */}
      {/* ── Try It Now: Gallery Grid ──────────────────────────── */}
      <PresentationSlide id="s06-try-gallery" title="Try It Now: Build a Gallery Grid" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — create a photo gallery</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into gallery.html</Text>
              <Code language="html">{`<section class="gallery">
  <h2>Club Photos</h2>
  <div class="gallery-grid">
    <img src="images/photo1.jpg" alt="Event 1">
    <img src="images/photo2.jpg" alt="Event 2">
    <img src="images/photo3.jpg" alt="Event 3">
    <img src="images/photo4.jpg" alt="Event 4">
  </div>
</section>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then add this CSS</Text>
              <Code language="css">{`.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.gallery-grid img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}`}</Code>
              <Callout tone="info">object-fit: cover crops the image to fill the box without stretching. Try removing it to see the difference.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s06-contact-form" title="Styling Contact Forms">
        <Stack gap={10}>
          <H2>Contact Page: Form Best Practices</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="html">{`<form action="#" method="post">
  <label for="name">Your Name</label>
  <input type="text" id="name" required>

  <label for="email">Email</label>
  <input type="email" id="email" required>

  <label for="message">Message</label>
  <textarea id="message" rows="5"></textarea>

  <button type="submit">Send</button>
</form>`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>Form styling tips:</Text>
              <Text><Text as="span" tone="success">label above input</Text> — display: block on labels for stacked layout.</Text>
              <Text><Text as="span" tone="success">:focus state</Text> — outline or border-color change shows active field.</Text>
              <Text><Text as="span" tone="success">required attribute</Text> — browser validates before submission.</Text>
              <Text><Text as="span" tone="success">for/id pairing</Text> — clicking label focuses the input (accessibility).</Text>
              <Text><Text as="span" tone="success">button styling</Text> — background, padding, cursor: pointer.</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">
            Always pair &lt;label for="x"&gt; with &lt;input id="x"&gt;. Screen readers depend on this connection.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Style a Form ──────────────────────────── */}
      <PresentationSlide id="s06-try-form" title="Try It Now: Style a Contact Form" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — make a form look professional</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Add this CSS to style your form</Text>
              <Code language="css">{`form {
  max-width: 500px;
  margin: 0 auto;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Labels appear above their inputs (not beside them).</Text>
              <Text>2. Inputs stretch to the full width of the form.</Text>
              <Text>3. There is space between each field (margin-bottom).</Text>
              <Text>4. The form is centered on the page (max-width + margin: auto).</Text>
              <Callout tone="info">box-sizing: border-box is critical — without it, padding makes inputs wider than 100%.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Accessibility Checklist ───────────────────────────── */}
      <PresentationSlide id="s06-accessibility" title="Accessibility Checklist">
        <Stack gap={12}>
          <H2>Every Page Must Pass These Checks</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Images</Pill><Text>Every &lt;img&gt; has a descriptive alt attribute — not just alt="image".</Text></Row>
            <Row gap={8}><Pill>Links</Pill><Text>Link text is meaningful — not "click here" but "Read about our events."</Text></Row>
            <Row gap={8}><Pill>Headings</Pill><Text>Headings are in order: h1 → h2 → h3. No skipping levels.</Text></Row>
            <Row gap={8}><Pill>Navigation</Pill><Text>Nav is identical on every page — same links, same order.</Text></Row>
            <Row gap={8}><Pill>Language</Pill><Text>&lt;html lang="en"&gt; is set on every page.</Text></Row>
            <Row gap={8}><Pill>Contrast</Pill><Text>Text is readable against the background — no light gray on white.</Text></Row>
          </Stack>
          <Callout tone="warning">Accessibility is not optional. A site that is hard to read or navigate loses marks even if it looks pretty.</Callout>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 19: Self-Assessment ───────────────────────────── */}
      <PresentationSlide id="s06-self-assess" title="Self-Assessment">
        <Stack gap={12}>
          <H2>Check Your Understanding</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={8}>
            <Stack gap={3}>
              <Text>1. Explain the copy-and-modify workflow</Text>
              <Text>2. Write correct relative links</Text>
              <Text>3. Move class="active" on each page</Text>
              <Text>4. Share one CSS file across all pages</Text>
            </Stack>
            <Stack gap={3}>
              <Text>5. Build event cards with left border accent</Text>
              <Text>6. Create a responsive gallery grid</Text>
              <Text>7. Style a contact form with labels</Text>
              <Text>8. Test all navigation links from every page</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text tone="secondary">If you answered "No" to any item, re-read ebook chapter 6 and redo the corresponding exercise task.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Practice ──────────────────────────────────── */}
      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s06-do-dont" title="Multi-Page Sites: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use relative links (about.html, ../index.html)</Text>
              <Text>Put class="active" on the current page's nav link</Text>
              <Text>Share one CSS file across all pages</Text>
              <Text>Test every link from every page</Text>
              <Text>Use consistent folder structure (pages/, css/, images/)</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Use absolute paths (C:\Users\...\index.html)</Text>
              <Text>Copy-paste CSS into each page's &lt;style&gt; tag</Text>
              <Text>Forget to update nav on newly added pages</Text>
              <Text>Mix uppercase and lowercase in file names</Text>
              <Text>Leave broken links — they look worse than no nav</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s06-practice" title="Hands-On Practice">
        <Stack gap={12}>
          <H2>In-Class Practice (≈ 55 min)</H2>
          <Text>Open exercises/session-06/exercise.md in your project folder.</Text>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="success">Task 1</Tag><Text>Build a Shared Navigation Menu</Text></Row>
            <Row gap={8}><Tag tone="success">Task 2</Tag><Text>Add the Navigation to Every Page</Text></Row>
            <Row gap={8}><Tag tone="success">Task 3</Tag><Text>Test All Links</Text></Row>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s06-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>Click each nav link — the correct page loads, and the active link is highlighted on every page.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Open each page in the browser and press F12 — no 404 errors in the Console tab.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Resize the browser window — the layout does not break at common widths (768px, 1024px).</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If any link shows a 404, right-click and "Inspect" the href. The most common fix is adding or removing ../</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s06-assignment" title="Assignment: Multi-Page Site Polish">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>A 3-page Student Club Website (index, about, contact) with shared navigation, consistent layout, and styled components.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>All nav links work from every page.</Text>
              <Text>class="active" is correct on each page.</Text>
              <Text>One shared CSS file linked on all pages.</Text>
              <Text>At least one styled component (event card, gallery, or form).</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Click every link from every page.</Text>
              <Text>Validate HTML at validator.w3.org.</Text>
              <Text>Check that images load (no broken icons).</Text>
              <Callout tone="warning">A site with one broken nav link looks worse than a site with no nav at all. Test everything.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 18: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s06-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 6 — Build Your 3-Page Mini-Site</H2>
          <Text>See homework/session-06/homework.md for full requirements.</Text>
          <Stack gap={6}>
            <Text>Add navigation to all 3 pages: index.html, about.html, contact.html.</Text>
            <Text>Every page shares the same header, nav (Home, About, Contact), footer, and CSS stylesheet.</Text>
            <Text>Complete the contact page with heading, contact methods, address, and at least 1 image.</Text>
            <Text>Improve the home page with welcome section, activities list, benefits, 2+ images, and news/events section.</Text>
          </Stack>
          <Callout tone="warning">
            Due Sunday 23:59. Submit via git push.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Recap & Next ─────────────────────────────── */}
      <PresentationSlide id="s06-recap" title="Recap & Next">
        <Stack gap={12}>
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>Multi-page sites share one template — only &lt;main&gt; content changes.</Text>
            <Text>Relative links connect pages in the same folder (just the filename).</Text>
            <Text>class="active" highlights the current page in the navigation.</Text>
            <Text>One CSS file styles every page — add component styles as needed.</Text>
            <Text>New components: event cards, gallery grids, tables, and forms.</Text>
          </Stack>
          <Divider />
          <H3>Next Session</H3>
          <Text tone="secondary">Session 7: CSS3 &amp; Web Fonts — Google Fonts, text styling (section-title, quote, drop-cap), transitions, and visual effects.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
