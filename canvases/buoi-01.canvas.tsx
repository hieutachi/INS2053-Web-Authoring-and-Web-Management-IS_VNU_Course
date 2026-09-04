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
  Text,
  Code,
  Callout,
  Divider,
  Table,
  canvasImage,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 1)
   Visual language shared by all 15 decks:
     blue         = structure / the markup you write
     goldenYellow = an action, a request, "look here"
     green        = a result / correct / what the user finally sees
     brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 13px in a ~560 viewBox.
   ========================================================================== */

/** Text placed ON a saturated fill. Fixed, so contrast survives light AND dark themes. */
const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const IMG_DATACENTER = canvasImage("./s1-datacenter.jpg");

/* ---------- 1. The request/response cycle (slide: How the Web Works) ------- */

function RequestResponseCycle({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 250" width="100%" height="250" role="img"
      aria-label="A browser sends a GET request, the server replies with HTML and CSS, the browser renders the page">
      <defs>
        <marker id="s1rq" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.goldenYellow} />
        </marker>
        <marker id="s1rs" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.green} />
        </marker>
        <filter id="s1sh" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* ---- Browser ---- */}
      <g filter="url(#s1sh)">
        <rect x="14" y="40" width="184" height="148" rx="12" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      </g>
      <line x1="14" y1="68" x2="198" y2="68" stroke={t.stroke.tertiary} strokeWidth="1" />
      <circle cx="31" cy="54" r="3.5" fill={t.stroke.tertiary} />
      <circle cx="43" cy="54" r="3.5" fill={t.stroke.tertiary} />
      <circle cx="55" cy="54" r="3.5" fill={t.stroke.tertiary} />
      <rect x="68" y="47" width="118" height="15" rx="7.5" fill={t.fill.tertiary} />
      <text x="127" y="58" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>student-club.com</text>
      <rect x="28" y="80" width="156" height="16" rx="3" fill={t.chart.blue} opacity="0.85" />
      <rect x="28" y="104" width="70" height="46" rx="3" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <path d="M40,138 L58,116 L74,138 z" fill={t.chart.green} opacity="0.7" />
      <rect x="106" y="104" width="78" height="7" rx="3.5" fill={t.fill.tertiary} />
      <rect x="106" y="117" width="78" height="7" rx="3.5" fill={t.fill.tertiary} />
      <rect x="106" y="130" width="52" height="7" rx="3.5" fill={t.fill.tertiary} />
      <rect x="28" y="160" width="156" height="16" rx="3" fill={t.fill.tertiary} />
      <text x="106" y="208" textAnchor="middle" fontSize="14" fontWeight="600" fill={t.text.primary}>Browser</text>
      <text x="106" y="226" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>on your laptop</text>

      {/* ---- Server ---- */}
      <g filter="url(#s1sh)">
        <rect x="362" y="40" width="184" height="148" rx="12" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      </g>
      <rect x="376" y="54" width="156" height="26" rx="5" fill={t.chart.blue} opacity="0.9" />
      <text x="454" y="71" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={ON_FILL}>index.html</text>
      <rect x="376" y="86" width="156" height="26" rx="5" fill={t.chart.blue} opacity="0.6" />
      <text x="454" y="103" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={ON_FILL}>css/style.css</text>
      <rect x="376" y="118" width="156" height="26" rx="5" fill={t.chart.blue} opacity="0.35" />
      <text x="454" y="135" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.primary}>images/logo.png</text>
      <rect x="376" y="152" width="156" height="22" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} strokeDasharray="3 3" />
      <text x="454" y="167" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>your other files</text>
      <text x="454" y="208" textAnchor="middle" fontSize="14" fontWeight="600" fill={t.text.primary}>Web server</text>
      <text x="454" y="226" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>a computer that stores your files</text>

      {/* ---- Request ---- */}
      <line x1="206" y1="86" x2="354" y2="86" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s1rq)" />
      <circle cx="222" cy="68" r="10" fill={t.chart.goldenYellow} />
      <text x="222" y="72.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>1</text>
      <text x="296" y="72.5" textAnchor="middle" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>GET /index.html</text>

      {/* ---- Response ---- */}
      <line x1="354" y1="142" x2="206" y2="142" stroke={t.chart.green} strokeWidth="2.5" markerEnd="url(#s1rs)" />
      <circle cx="344" cy="122" r="10" fill={t.chart.green} />
      <text x="344" y="126.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>2</text>
      {/* Two lines: one line of this label is wider than the 164px gap between
          the browser and server cards, and used to run under the badge. */}
      <text x="280" y="162" textAnchor="middle" fontSize="12.5" fill={t.text.secondary}>200 OK</text>
      <text x="280" y="178" textAnchor="middle" fontSize="12.5" fill={t.text.secondary}>HTML, CSS, images</text>

      {/* ---- Step 3 ---- */}
      <circle cx="34" cy="200" r="10" fill={t.chart.blue} />
      <text x="34" y="204.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>3</text>
      <text x="34" y="226" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>renders</text>
    </svg>
  );
}

/* ---------- 2. Anatomy of one element (slide: What Is an HTML File?) ------- */

function TagAnatomy({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 190" width="100%" height="190" role="img"
      aria-label="An HTML element is made of an opening tag, the content, and a closing tag that contains a slash">
      <path d="M102,62 L102,52 L458,52 L458,62" fill="none" stroke={t.stroke.secondary} strokeWidth="1.5" />
      <rect x="228" y="26" width="104" height="22" rx="11" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="280" y="41" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.text.secondary}>ONE element</text>

      <rect x="102" y="72" width="52" height="38" rx="6" fill={t.chart.blue} opacity="0.9" />
      <text x="128" y="97" textAnchor="middle" fontSize="19" fontFamily={MONO} fill={ON_FILL}>&lt;h1&gt;</text>
      <rect x="160" y="72" width="232" height="38" rx="6" fill={t.chart.green} opacity="0.85" />
      <text x="276" y="97" textAnchor="middle" fontSize="19" fontFamily={MONO} fill={ON_FILL}>Welcome to the Club</text>
      <rect x="398" y="72" width="60" height="38" rx="6" fill={t.chart.blue} opacity="0.9" />
      <text x="428" y="97" textAnchor="middle" fontSize="19" fontFamily={MONO} fill={ON_FILL}>&lt;/h1&gt;</text>

      <line x1="128" y1="114" x2="128" y2="130" stroke={t.stroke.tertiary} strokeWidth="1" />
      <text x="122" y="146" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.text.primary}>opening tag</text>
      <text x="122" y="162" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>names the element</text>

      <line x1="276" y1="114" x2="276" y2="130" stroke={t.stroke.tertiary} strokeWidth="1" />
      <text x="276" y="146" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.text.primary}>content</text>
      <text x="276" y="162" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>what the reader sees</text>

      <line x1="428" y1="114" x2="428" y2="130" stroke={t.stroke.tertiary} strokeWidth="1" />
      <text x="434" y="146" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.text.primary}>closing tag</text>
      <text x="434" y="162" textAnchor="middle" fontSize="11" fill={t.chart.brightOrange}>the / is required</text>
    </svg>
  );
}

/* ---------- 3. head vs body (slide: The HTML5 Boilerplate) ---------------- */

function HeadVsBody({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 268" width="100%" height="268" role="img"
      aria-label="The head holds information about the page and stays invisible; the body holds the content the reader sees">
      <defs>
        <marker id="s1hb" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.goldenYellow} />
        </marker>
        <marker id="s1bb" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.green} />
        </marker>
      </defs>

      <rect x="12" y="26" width="266" height="228" rx="10" fill="none" stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="22" y="19" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>&lt;html lang="en"&gt;</text>

      <rect x="26" y="44" width="238" height="96" rx="8" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="36" y="62" fontSize="13" fontFamily={MONO} fontWeight="700" fill={t.text.primary}>&lt;head&gt;</text>
      <rect x="36" y="68" width="218" height="19" rx="4" fill={t.bg.elevated} stroke={t.stroke.tertiary} />
      <text x="43" y="81.5" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>&lt;meta charset="UTF-8"&gt;</text>
      <rect x="36" y="90" width="218" height="19" rx="4" fill={t.bg.elevated} stroke={t.stroke.tertiary} />
      <text x="43" y="103.5" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>&lt;meta name="viewport" ...&gt;</text>
      <rect x="36" y="112" width="218" height="19" rx="4" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="43" y="125.5" fontSize="11.5" fontFamily={MONO} fill={ON_FILL}>&lt;title&gt;Student Club&lt;/title&gt;</text>

      <rect x="26" y="150" width="238" height="94" rx="8" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="36" y="168" fontSize="13" fontFamily={MONO} fontWeight="700" fill={t.text.primary}>&lt;body&gt;</text>
      <rect x="36" y="174" width="218" height="22" rx="4" fill={t.chart.green} opacity="0.9" />
      <text x="43" y="189" fontSize="12" fontFamily={MONO} fill={ON_FILL}>&lt;h1&gt;Welcome&lt;/h1&gt;</text>
      <rect x="36" y="199" width="218" height="19" rx="4" fill={t.chart.green} opacity="0.55" />
      <text x="43" y="212.5" fontSize="11.5" fontFamily={MONO} fill={ON_FILL}>&lt;p&gt;Join us today.&lt;/p&gt;</text>
      <text x="36" y="233" fontSize="11" fill={t.text.tertiary}>everything the reader sees</text>

      <rect x="336" y="40" width="212" height="152" rx="10" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <path d="M344,40 L344,26 L452,26 L452,40 z" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="398" y="37" textAnchor="middle" fontSize="11" fill={ON_FILL}>Student Club</text>
      <line x1="336" y1="62" x2="548" y2="62" stroke={t.stroke.tertiary} />
      <text x="352" y="92" fontSize="17" fontWeight="700" fill={t.text.primary}>Welcome</text>
      <text x="352" y="114" fontSize="12" fill={t.text.secondary}>Join us today.</text>
      <rect x="352" y="128" width="180" height="7" rx="3.5" fill={t.fill.tertiary} />
      <rect x="352" y="140" width="180" height="7" rx="3.5" fill={t.fill.tertiary} />
      <rect x="352" y="152" width="120" height="7" rx="3.5" fill={t.fill.tertiary} />

      <path d="M258,121 C300,121 306,33 340,33" fill="none" stroke={t.chart.goldenYellow} strokeWidth="2" markerEnd="url(#s1hb)" />
      <path d="M270,185 C310,185 312,95 344,95" fill="none" stroke={t.chart.green} strokeWidth="2" markerEnd="url(#s1bb)" />

      <rect x="298" y="206" width="14" height="14" rx="3" fill={t.chart.goldenYellow} />
      <text x="320" y="217" fontSize="13" fill={t.text.secondary}>head = ABOUT the page (invisible)</text>
      <rect x="298" y="228" width="14" height="14" rx="3" fill={t.chart.green} />
      <text x="320" y="239" fontSize="13" fill={t.text.secondary}>body = the page itself</text>
    </svg>
  );
}

export default function Session01Lecture() {
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
      {/* ===== SLIDE 1: Title ===== */}
      <PresentationSlide
        id="title"
        title="Session 1 — Introduction to Dreamweaver"
        notes="Welcome students to INS2053. This is their very first web authoring session. Emphasize that no prior coding experience is needed."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 1 · 150 min</Tag>
          <H1>Introduction to Dreamweaver &amp; Web Fundamentals</H1>
          <Text tone="secondary">What is a website? What is HTML? Create your first web page from scratch.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 1b: Course map (Week 1 only) ===== */}
      <PresentationSlide
        id="s01-course-map"
        title="Welcome to INS2053 — How This Course Works"
        notes="Week 1 only. Spend 6-8 minutes here. The one thing they must leave with: the capstone is ONE site built across all 15 weeks, not 15 throwaway exercises."
        background={{ pattern: "grid", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>4 credits · 15 weeks · 150 minutes per week · taught in English</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={8}>
              <Text fontWeight="700">How you are assessed</Text>
              <Table
                headers={["Component", "Weight"]}
                rows={[
                  ["Attendance, participation & homework", "10%"],
                  ["Midterm — practical, Week 8", "30%"],
                  ["Final — practical + capstone, Week 15", "60%"],
                ]}
              />
              <Text size="small" tone="secondary">Both exams are hands-on and offline: no internet, you build in a real editor.</Text>
            </Stack>
            <Stack gap={8}>
              <Text fontWeight="700">One project, fifteen weeks</Text>
              <Text>You build a Student Club Website. Every session adds one layer to the same site — structure, then text and images, then CSS, layout, tables, media, forms, responsive.</Text>
              <Text>Eight milestones (M1–M8) are checked along the way and carry 40 points of the final grade.</Text>
              <Callout tone="info">Nothing you build gets thrown away. Week 15 you submit the site Week 2 started.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 2: Objectives ===== */}
      <PresentationSlide id="objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>After this session you will be able to:</H2>
          <Stack gap={6}>
            <Text>1. Explain what a website, webpage, and HTML file are</Text>
            <Text>2. Identify the main parts of a code editor workspace (Dreamweaver / VS Code)</Text>
            <Text>3. Create a proper project folder structure for a website</Text>
            <Text>4. Write, save, and preview your first HTML5 page</Text>
            <Text>5. Explain each part of the HTML5 boilerplate</Text>
          </Stack>
          <Callout tone="info">Linked outcomes: CLO1 (explain web concepts), CLO4 (use development tools)</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 3: Agenda / Timeline ===== */}
      <PresentationSlide id="agenda" title="Today's 150-Minute Plan">
        <Stack gap={12}>
          <H2>Session timeline</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="info">0 – 10 min</Tag><Text>Welcome &amp; objectives</Text></Row>
              <Row gap={8}><Tag tone="info">10 – 20 min</Tag><Text>Icebreaker &amp; what you already know</Text></Row>
              <Row gap={8}><Tag tone="success">20 – 90 min</Tag><Text>New content + live demos</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="success">90 – 140 min</Tag><Text>In-class practice (Tasks 1–3)</Text></Row>
              <Row gap={8}><Tag tone="warning">140 – 148 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">148 – 150 min</Tag><Text>Recap &amp; next session</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Theory ~60 min · Practice ~90 min. Raise your hand any time you get stuck.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 4: Icebreaker ===== */}
      <PresentationSlide id="icebreaker" title="Warm-Up: What Do You Already Know?">
        <Stack gap={12}>
          <H2>Quick show of hands</H2>
          <Stack gap={8}>
            <Callout tone="info">How many of you have visited a website today?</Callout>
            <Callout tone="info">Can anyone name the language websites are built with?</Callout>
            <Callout tone="info">What happens when you type a URL and press Enter?</Callout>
            <Callout tone="info">Have you ever looked at View Source on a web page?</Callout>
          </Stack>
          <Text tone="secondary">No wrong answers. By the end of today you will understand what happens behind the scenes.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 5: How the Web Works ===== */}
      <PresentationSlide id="how-web-works" title="How the Web Works" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={16}>
          <H2>How the web works</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <RequestResponseCycle t={t} />
            <Stack gap={8}>
              <Text>Your browser asks a server for a page.</Text>
              <Text>The server sends back HTML + CSS files.</Text>
              <Text>The browser renders them into what you see.</Text>
              <Divider />
              <Text tone="secondary">Real-life analogy: A website is like a textbook. Each chapter = one .html file. The table of contents = navigation menu. The printing press = web server.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 6: Real Web Servers (photo) ===== */}
      <PresentationSlide
        id="s01-real-web-servers"
        title="Real Web Servers"
        notes="This slide makes the abstract 'server' concept concrete. Emphasize that while developing, each student's laptop IS the server thanks to Live Server or Dreamweaver preview. The datacenter photo shows what production hosting looks like."
        background={{ pattern: "grid", accent: t.chart.blue }}
      >
        <Stack gap={14}>
          <H2>What does a real web server look like?</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <img
                src={IMG_DATACENTER}
                alt="Racks of servers with blue LEDs in a data center"
                style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.stroke.tertiary}` }}
              />
              <Text size="small" tone="tertiary">Photo: BalticServers.com — CC BY-SA 3.0, Wikimedia Commons</Text>
            </Stack>
            <Stack gap={8}>
              <Text>A web server is just a computer kept on 24/7 so visitors can reach your site any time.</Text>
              <Text>A data center racks hundreds of these servers together with backup power and cooling.</Text>
              <Text>Big sites use many servers; your CodeBreakers club site needs only one cheap plan.</Text>
              <Divider />
              <Callout tone="info">While developing, YOUR laptop acts as the server — Live Server or Dreamweaver preview serves files locally.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 7: Key Terms Glossary ===== */}
      <PresentationSlide
        id="s01-key-terms-glossary"
        title="Key Terms Glossary"
        notes="Use this as a quick-reference while reading the ebook. Every term here appears in Session 1 exercises. Students should be able to define each term without looking at notes by the end of self-study."
        background={{ pattern: "dots", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>Vocabulary reference</H2>
          <Table
            headers={["Term", "What it means", "Example"]}
            rows={[
              ["Website", "A collection of connected web pages stored on a server", "codebreakers.club"],
              ["Webpage", "A single HTML document the browser can display", "about.html"],
              ["Browser", "Software that reads HTML and draws the page on screen", "Chrome, Edge, Firefox"],
              ["Web server", "A computer that stores and delivers web files on request", "Your laptop with Live Server"],
              ["URL", "The address used to find a specific page on the web", "http://codebreakers.club/index.html"],
              ["HTML", "HyperText Markup Language — describes structure, not logic", "<h1>Welcome</h1>"],
              ["Tag", "A marker in angle brackets that tells the browser what something is", "<p>, <img>, <a>"],
              ["Code editor", "A specialized text editor for writing code with highlighting", "VS Code, Dreamweaver"],
            ]}
          />
          <Callout tone="info">HTML is NOT a programming language. It is a markup language — it describes structure, never logic.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 7: What is HTML ===== */}
      <PresentationSlide id="what-is-html" title="What Is an HTML File?">
        <Stack gap={12}>
          <H2>HTML = HyperText Markup Language</H2>
          <Text tone="secondary">HTML is NOT a programming language. It describes the STRUCTURE of content using tags.</Text>
          <TagAnatomy t={t} />
          <Row gap={8}>
            <Tag tone="info">plain text file, .html</Tag>
            <Tag tone="info">tags describe structure</Tag>
            <Tag tone="success">any browser can read it</Tag>
          </Row>
          <Text tone="secondary">Like a recipe card: the card = the .html file, the ingredients = your content, the instructions = the tags, and the cook = the browser.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE: Anatomy of a URL ===== */}
      <PresentationSlide
        id="s01-anatomy-of-url"
        title="Anatomy of a URL"
        notes="Walk through each part slowly. Students often confuse the domain with the file path. Remind them that http:// is the protocol, the domain tells the browser WHERE to go, and the path tells it WHICH file to request. In this course all URLs start with http:// or https://."
        background={{ pattern: "grid", accent: t.chart.goldenYellow }}
      >
        <Stack gap={12}>
          <H2>Breaking down a URL</H2>
          <Code language="text">http://www.codebreakers.club/about.html</Code>
          <Table
            headers={["Part", "Value", "What the browser does"]}
            rows={[
              ["Protocol", "http://", "Tells the browser how to talk to the server (http or https)."],
              ["Domain", "www.codebreakers.club", "The address of the server that holds the site files."],
              ["File path", "/about.html", "Which specific file on that server to download and display."],
            ]}
          />
          <Divider />
          <Text tone="secondary">If you type just the domain without a path, the server sends back index.html by default.</Text>
          <Callout tone="info">In our course project the URL might be http://localhost:5500/about.html — localhost means your own laptop is the server.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 8: Self-Closing Tags ===== */}
      <PresentationSlide id="self-closing-tags" title="Two Kinds of Tags">
        <Stack gap={12}>
          <H2>Paired tags vs self-closing tags</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="success">Paired (most tags)</Tag>
              <Code language="html">{`<h1>Hello</h1>
<p>A paragraph</p>
<a href="...">Click</a>`}</Code>
              <Text tone="secondary">Opening tag + content + closing tag</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="warning">Self-closing (void elements)</Tag>
              <Code language="html">{`<img src="..." alt="...">
<br>
<hr>
<meta charset="UTF-8">`}</Code>
              <Text tone="secondary">No closing tag needed — they stand alone</Text>
            </Stack>
          </Grid>
          <Callout tone="danger">Tags must nest properly: &lt;p&gt;&lt;strong&gt;OK&lt;/strong&gt;&lt;/p&gt; is correct. &lt;p&gt;&lt;strong&gt;BAD&lt;/p&gt;&lt;/strong&gt; is broken.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 9: Quick Check ===== */}
      <PresentationSlide id="quick-check-1" title="Quick Check">
        <Stack gap={12}>
          <H2>Think before we continue</H2>
          <Stack gap={8}>
            <Callout tone="info">Is HTML a programming language? (Answer: No — it is a markup language.)</Callout>
            <Callout tone="info">Does pressing Enter in your code create a new line in the browser? (Answer: No — HTML ignores extra whitespace.)</Callout>
            <Callout tone="info">Which tag wraps ALL visible content? (Answer: &lt;body&gt;)</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbor for 30 seconds.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 10: Code Editors ===== */}
      <PresentationSlide id="code-editors" title="Code Editors: Dreamweaver vs VS Code">
        <Stack gap={12}>
          <H2>Choosing your code editor</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="info">Dreamweaver CS6</Tag>
              <Text>Design View (WYSIWYG) + Code View + Split View</Text>
              <Text>Built-in site management &amp; properties panel</Text>
              <Text tone="secondary">Released 2012 — older but visual</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="success">VS Code (recommended)</Tag>
              <Text>Free, fast, thousands of extensions</Text>
              <Text>Install Live Server for auto-refresh preview</Text>
              <Text tone="secondary">Industry standard today</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">Regardless of editor choice, you MUST learn to read and write HTML code directly.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 11: Editor Comparison Table ===== */}
      <PresentationSlide id="editor-comparison" title="Editor Feature Comparison">
        <Stack gap={12}>
          <H2>Dreamweaver vs VS Code at a glance</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Feature</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Dreamweaver</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">VS Code</Text></Text>

            <Text>Price</Text><Text>Paid</Text><Text tone="success">Free</Text>
            <Text>Visual editor</Text><Text tone="success">Yes (WYSIWYG)</Text><Text>No</Text>
            <Text>Extensions</Text><Text>Limited</Text><Text tone="success">Thousands</Text>
            <Text>Speed</Text><Text>Slower</Text><Text tone="success">Fast</Text>
            <Text>Git support</Text><Text>Basic</Text><Text tone="success">Excellent</Text>
            <Text>Live preview</Text><Text>Design View</Text><Text>Live Server ext.</Text>
            <Text>Industry usage</Text><Text>Rare</Text><Text tone="success">Very common</Text>
          </Grid>
          <Callout tone="info">Both editors work fine for this course. Pick whichever feels comfortable.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 12: Folder Structure ===== */}
      <PresentationSlide id="folder-structure" title="Project Folder Structure">
        <Stack gap={12}>
          <H2>Organize before you code</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="text">{`club-website/
├── index.html        <-- home page
├── about.html
├── events.html
├── contact.html
├── images/           <-- all images
│   └── club-logo.png
├── css/              <-- stylesheets
│   └── style.css
├── js/               <-- scripts
│   └── main.js
└── documents/        <-- PDFs, downloads`}</Code>
            <Stack gap={6}>
              <Text tone="secondary">Like a filing cabinet: each drawer holds one type of file.</Text>
              <Row gap={8}>
                <Tag tone="success">lowercase names</Tag>
                <Tag tone="success">hyphens not spaces</Tag>
                <Tag tone="success">index.html = home</Tag>
              </Row>
              <Callout tone="danger">Never save files on Desktop or scatter across folders.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 13: Common File Extensions ===== */}
      <PresentationSlide id="file-extensions" title="Common Web File Extensions">
        <Stack gap={12}>
          <H2>File types you will use</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">.html</Tag><Text>Web page structure</Text></Row>
              <Row gap={8}><Tag tone="info">.css</Tag><Text>Styles (colors, fonts)</Text></Row>
              <Row gap={8}><Tag tone="info">.js</Tag><Text>Interactivity &amp; behavior</Text></Row>
              <Row gap={8}><Tag tone="info">.jpg/.png</Tag><Text>Images</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">.svg</Tag><Text>Scalable icons/logos</Text></Row>
              <Row gap={8}><Tag tone="info">.gif</Tag><Text>Simple animations</Text></Row>
              <Row gap={8}><Tag tone="info">.pdf</Tag><Text>Downloadable documents</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="warning">Windows hides extensions by default. Enable View → Show → File name extensions to avoid saving page.txt instead of page.html.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 14: HTML5 Boilerplate ===== */}
      <PresentationSlide id="boilerplate" title="The HTML5 Boilerplate" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>The HTML5 boilerplate — memorize this!</H2>
          <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>Page Title Here</title>
</head>
<body>
    <!-- All visible content goes here -->
</body>
</html>`}</Code>
          <Text tone="secondary">&lt;!DOCTYPE html&gt; prevents quirks mode. &lt;head&gt; = metadata (invisible). &lt;body&gt; = visible content.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 15: Boilerplate Line-by-Line ===== */}
      <PresentationSlide id="boilerplate-breakdown" title="Boilerplate Line-by-Line">
        <Stack gap={12}>
          <H2>What each line does</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">&lt;!DOCTYPE html&gt;</Text> — Tells the browser this is HTML5. Without it, browsers enter quirks mode.</Text>
            <Text><Text as="span" tone="primary">&lt;html lang="en"&gt;</Text> — Root element. lang="en" declares English for accessibility and SEO.</Text>
            <Text><Text as="span" tone="primary">&lt;meta charset="UTF-8"&gt;</Text> — Supports all characters including Vietnamese diacritics.</Text>
            <Text><Text as="span" tone="primary">&lt;meta name="viewport"...&gt;</Text> — Makes the page responsive on mobile devices.</Text>
            <Text><Text as="span" tone="primary">&lt;title&gt;</Text> — Sets the browser tab text. NOT visible on the page itself.</Text>
            <Text><Text as="span" tone="primary">&lt;body&gt;</Text> — Everything visible goes here: headings, paragraphs, images, links.</Text>
            <Text><Text as="span" tone="primary">&lt;!-- comment --&gt;</Text> — Invisible notes for developers. Never shown in the browser.</Text>
          </Stack>
          <Callout tone="info">Analogy: DOCTYPE = letterhead. head = envelope (metadata). body = the letter content. &lt;/html&gt; = signature.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 16: Where each part shows up ===== */}
      <PresentationSlide
        id="head-vs-body"
        title="Where Does Each Part Show Up?"
        notes="Point at the diagram, not the code. Ask the class: if I change the title, what changes on screen? Answer: only the tab. This is the single most common beginner confusion."
      >
        <Stack gap={12}>
          <H2>head is about the page — body IS the page</H2>
          <HeadVsBody t={t} />
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 17: Worked Example 1 — Simplest Page ===== */}
      <PresentationSlide id="worked-example-1" title="Worked Example 1: Hello World Page">
        <Stack gap={10}>
          <H2>The simplest possible web page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;!DOCTYPE html&gt;</Text> — Declares HTML5 standards mode.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;title&gt;</Text> — Tab reads "Simple Page."</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;h1&gt;</Text> — Large bold heading on the page.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;p&gt;</Text> — Normal paragraph with automatic spacing.</Text>
              <Divider />
              <Callout tone="info">In the browser: one large heading and one paragraph below it. The tab says "Simple Page."</Callout>
              <Text tone="secondary">Save as index.html → Ctrl+S → F12 to preview.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 18: Worked Example 2 — Student Club Home ===== */}
      <PresentationSlide id="worked-example" title="Worked Example 2: Student Club Home Page">
        <Stack gap={10}>
          <H2>Your first complete web page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Club - Home</title>
</head>
<body>
    <h1>Welcome to the Student Club</h1>
    <p>We are a community of students
       who love technology and creativity.</p>

    <h2>Upcoming Events</h2>
    <ul>
        <li>Web Workshop — Mar 15</li>
        <li>Photo Contest — Mar 22</li>
        <li>Music Night — Mar 29</li>
    </ul>

    <p>Contact: <a href="mailto:club@university.edu">
       club@university.edu</a></p>
</body>
</html>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;!DOCTYPE html&gt;</Text> — tells the browser this is HTML5 (prevents quirks mode).</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;title&gt;</Text> — text shown in the browser tab only, NOT on the page.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;h1&gt;</Text> — largest heading, one per page. Browsers render it bold and large.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;h2&gt;</Text> — sub-heading, smaller than h1. Creates section structure.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;ul&gt; + &lt;li&gt;</Text> — bulleted list. Each item wrapped in &lt;li&gt; tags.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;a href="mailto:..."&gt;</Text> — clickable email link that opens the mail app.</Text>
              <Divider />
              <Callout tone="info">In the browser: a large heading, a welcome paragraph, three bullet points, and a clickable email link. The tab reads "Student Club - Home."</Callout>
              <Text tone="secondary">Save as <Text as="span">index.html</Text> → Ctrl+S → F12 to preview.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 19: HTML Comments ===== */}
      <PresentationSlide id="html-comments" title="Using HTML Comments">
        <Stack gap={12}>
          <H2>Comments: notes for yourself</H2>
          <Code language="html">{`<!-- ===== HEADER SECTION ===== -->
<header>...</header>

<!-- TODO: Add team photos here -->

<!-- Using UTF-8 to support Vietnamese characters -->`}</Code>
          <Stack gap={6}>
            <Text>Comments are invisible in the browser but visible in source code.</Text>
            <Text tone="secondary">Use them to label sections, leave TODO notes, or explain WHY something is done.</Text>
          </Stack>
          <Callout tone="danger">Never put passwords or sensitive data in comments. They are visible via View Source.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 20: Discussion Prompt ===== */}
      <PresentationSlide id="discussion" title="Discussion: Why Separate Files?">
        <Stack gap={12}>
          <H2>Why not put everything in one file?</H2>
          <Stack gap={8}>
            <Text>A real website has 5, 10, or 50+ pages.</Text>
            <Text>If everything were in one file, it would be enormous and impossible to maintain.</Text>
            <Text>Separate files = easier editing, faster loading, better organization.</Text>
          </Stack>
          <Callout tone="info">Think about it: why do textbooks have chapters instead of being one giant wall of text?</Callout>
          <Text tone="secondary">We will build multi-page sites starting in Session 2.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 21: Common Mistakes ===== */}
      <PresentationSlide id="common-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>Watch out for these mistakes</H2>
          <Stack gap={8}>
            <Callout tone="danger">Forgetting &lt;!DOCTYPE html&gt; — triggers quirks mode, pages render incorrectly</Callout>
            <Callout tone="danger">Spaces in filenames — "My Page.html" becomes "My%20Page.html" in URLs</Callout>
            <Callout tone="danger">Not saving before previewing — browser shows the OLD version</Callout>
            <Callout tone="danger">Mixing up &lt;head&gt; and &lt;body&gt; — headings go in body, title goes in head</Callout>
            <Callout tone="danger">No project folder — never save files directly on Desktop</Callout>
            <Callout tone="danger">Saving as .txt — always verify the extension is .html, not .html.txt</Callout>
            <Callout tone="danger">Unclosed tags — every &lt;p&gt; needs &lt;/p&gt;, every &lt;h1&gt; needs &lt;/h1&gt;</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE: Self-Study Check ===== */}
      <PresentationSlide
        id="s01-self-study-check"
        title="Self-Study Check"
        notes="Answer key: 1) False — HTML is a markup language, not a programming language. 2) The file path (/about.html). 3) The browser sends the GET request. 4) A dedicated project folder (e.g. club-website/). 5) The body tag wraps all visible content."
      >
        <Stack gap={12}>
          <H2>Test yourself before practice</H2>
          <Stack gap={8}>
            <Text>1. True or false: HTML is a programming language.</Text>
            <Text>2. Which part of a URL names the specific file to display?</Text>
            <Text>3. Who sends the GET request — the browser or the server?</Text>
            <Text>4. Where should you save all your website files?</Text>
            <Text>5. Which HTML tag wraps ALL visible content on the page?</Text>
          </Stack>
          <Divider />
          <Callout tone="info">Answers are in the speaker notes. Try answering from memory first, then check.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 22: In-Class Practice ===== */}
      <PresentationSlide id="practice" title="In-Class Practice" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>In-class practice (exercises/session-01/)</H2>
          <Stack gap={8}>
            <H3>Task 1: Explore your editor</H3>
            <Text>VS Code: Explorer sidebar, editor tabs, status bar, Command Palette. Dreamweaver: Files panel plus the Design / Code / Split view buttons.</Text>
            <H3>Task 2: Create your first HTML file</H3>
            <Text>Type the HTML5 boilerplate by hand. Save as index.html in my-first-site/. Preview in the browser.</Text>
            <H3>Task 3: Read the structure you wrote</H3>
            <Text>Name what each line does. Change the title and watch the browser tab, not the page.</Text>
            <H3>Task 4: Experiment</H3>
            <Text>Add h2 subheadings and more paragraphs. Compare h1 with h2 on screen.</Text>
          </Stack>
          <Callout tone="info">Estimated time: 45 minutes. Ask your instructor if stuck.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 23: Practice Tips ===== */}
      <PresentationSlide id="practice-tips" title="Practice Tips">
        <Stack gap={12}>
          <H2>Tips for the in-class tasks</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Type, do not copy-paste.</Text> Typing builds muscle memory for the boilerplate.</Text>
            <Text><Text as="span" tone="primary">Save after every few changes</Text> (Ctrl+S). Unsaved work is lost work.</Text>
            <Text><Text as="span" tone="primary">Preview often</Text> (F12). Catch errors early rather than at the end.</Text>
            <Text><Text as="span" tone="primary">Check the tab title</Text> to confirm your &lt;title&gt; tag is working.</Text>
            <Text><Text as="span" tone="primary">If the image is broken</Text>, check the file path and extension carefully.</Text>
          </Stack>
          <Callout tone="warning">Stuck? Compare your code line-by-line against the worked example on the previous slides.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s01-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>You can find the Files panel, Properties panel, and Design/Code/Split view buttons in the editor.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Your index.html opens in the browser and shows "Hello World" — no blank page, no code visible.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Your home page has a visible header, nav links, main content, and footer — all in the browser.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If the browser shows raw HTML code instead of a page, check that the file extension is .html (not .txt).</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Boilerplate ───────────────────────────── */}
      <PresentationSlide id="s01-try-boilerplate" title="Try It Now: Type the Boilerplate" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — type this from memory</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">The HTML5 boilerplate</Text>
              <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What each line does</Text>
              <Text>&lt;!DOCTYPE html&gt; — tells the browser "this is HTML5."</Text>
              <Text>lang="en" — helps screen readers and search engines.</Text>
              <Text>meta charset — supports all characters (accents, emojis).</Text>
              <Text>meta viewport — makes the page work on phones.</Text>
              <Text>&lt;title&gt; — shows in the browser tab.</Text>
              <Callout tone="info">Type it three times today. By tomorrow, you will remember it from memory. That is the goal.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s01-do-dont" title="First HTML File: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Start every page with &lt;!DOCTYPE html&gt;</Text>
              <Text>Set &lt;html lang=&quot;en&quot;&gt; and &lt;meta charset=&quot;UTF-8&quot;&gt;</Text>
              <Text>Name your home page exactly index.html</Text>
              <Text>Use all-lowercase file names with no spaces</Text>
              <Text>Save with the .html extension, not .txt</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Skip the doctype — the browser falls back to quirks mode</Text>
              <Text>Write &lt;Title&gt; or &lt;BODY&gt; in mixed case</Text>
              <Text>Name files &quot;My Home Page.html&quot; with spaces</Text>
              <Text>Nest tags out of order: &lt;b&gt;&lt;i&gt;text&lt;/b&gt;&lt;/i&gt;</Text>
              <Text>Forget the closing tag on a container element</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s01-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>Three bugs. Find them before you scroll.</H2>
          <Code language="html">{`<!DOCTYPE html>
<html>
<head>
  <title>My Club<title>
</head>
<body>
  <h1>Welcome</h2>
  <p>Join us today!
</body>
</html>`}</Code>
          <Divider />
          <Stack gap={4}>
            <Row gap={8}><Pill>Bug 1</Pill><Text>&lt;title&gt; is never closed — the second one needs a slash: &lt;/title&gt;. Everything after it disappears.</Text></Row>
            <Row gap={8}><Pill>Bug 2</Pill><Text>&lt;h1&gt; is closed with &lt;/h2&gt;. Opening and closing tags must match.</Text></Row>
            <Row gap={8}><Pill>Bug 3</Pill><Text>&lt;html&gt; has no lang attribute — add lang=&quot;en&quot; so screen readers pick the right voice.</Text></Row>
          </Stack>
          <Callout tone="info">The unclosed &lt;p&gt; is legal HTML — the browser closes it at &lt;/body&gt; — but closing it yourself is the habit to build.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility Basics ─────────────────────────────── */}
      <PresentationSlide id="s01-accessibility" title="Accessibility Starts in the Boilerplate">
        <Stack gap={12}>
          <H2>Four Attributes You Set Once Per Page</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>lang</Pill><Text>&lt;html lang=&quot;en&quot;&gt; tells a screen reader which language to pronounce. Wrong lang makes speech unintelligible.</Text></Row>
            <Row gap={8}><Pill>charset</Pill><Text>&lt;meta charset=&quot;UTF-8&quot;&gt; must be first in &lt;head&gt; so accented and Vietnamese characters render instead of showing as ?.</Text></Row>
            <Row gap={8}><Pill>title</Pill><Text>&lt;title&gt; is the first thing announced and the label in the browser tab. Never leave it as &quot;Untitled Document&quot;.</Text></Row>
            <Row gap={8}><Pill>viewport</Pill><Text>The viewport meta tag lets users zoom on a phone. Without it, text is unreadably small.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="warning">These four lines cost you thirty seconds and decide whether the page is usable at all. Put them in every file from day one.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ───────────────────────────────────────── */}
      <PresentationSlide id="s01-assignment" title="Assignment: Your First Page">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>homework/session-01/index.html with the full HTML5 boilerplate and your own content, plus empty css/ and images/ beside it.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>Doctype, lang, charset, viewport, and title are all present.</Text>
              <Text>One &lt;h1&gt;, one &lt;h2&gt;, three or more &lt;p&gt;, and one HTML comment.</Text>
              <Text>Sub-folders css/ and images/ exist, even if still empty.</Text>
              <Text>File opens in the browser with the correct tab title.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Open the file in Chrome — is the tab title yours, not &quot;index.html&quot;?</Text>
              <Text>View Source (Ctrl+U) and check every tag is closed.</Text>
              <Text>Confirm the file name is index.html, lowercase, no spaces.</Text>
              <Callout tone="info">Type the boilerplate by hand this week. You will use it in all fifteen sessions, so it is worth knowing from memory.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>



      {/* ===== SLIDE 24: Homework ===== */}
      <PresentationSlide id="homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 1 (homework/session-01/)</H2>
          <Stack gap={8}>
            <Text><Text as="span">My First Web Page</Text> — build a page introducing yourself.</Text>
            <Text>Requirements: full HTML5 boilerplate, one h1, one h2, three or more paragraphs, one comment, empty css/ and images/.</Text>
            <Text>Not this week: images, links, hr, br, CSS. Those arrive in Sessions 3 and 4.</Text>
            <Divider />
            <Row gap={8}>
              <Tag tone="danger">Due: Sunday 23:59</Tag>
              <Tag tone="info">Submit via git push</Tag>
            </Row>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 25: Recap & Next Session ===== */}
      <PresentationSlide id="recap" title="Recap & Next Session" background={{ pattern: "aurora", accent: t.chart.green, accentSecondary: t.chart.blue }}>
        <Stack gap={12}>
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>A website = many HTML files linked together</Text>
            <Text>HTML = markup language using tags for structure</Text>
            <Text>Always start with the HTML5 boilerplate</Text>
            <Text>Create folder structure BEFORE writing code</Text>
            <Text>Name home page index.html, use lowercase + hyphens</Text>
          </Stack>
          <Divider />
          <H3>Next: Session 2</H3>
          <Text tone="secondary">Creating a new site — multi-page websites, relative paths, file naming, Git intro.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
