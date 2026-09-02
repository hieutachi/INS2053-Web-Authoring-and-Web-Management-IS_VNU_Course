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
   INS2053 — TEACHING DIAGRAM KIT (Session 3: text & images)
   blue = structure · goldenYellow = attention · green = correct
   brightOrange = wrong.  Labels students must read: >= 13px.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const IMG_WEBPAGE = canvasImage("./s3-webpage.png");

/* ---------- 1. Correct vs skipped heading levels ------------------------- */

function HeadingOutline({ t }: { t: CanvasTokens }) {
  const bar = (x: number, y: number, w: number, h: number, label: string, fill: string, op: number, fs: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={fill} opacity={op} />
      <text x={x + 10} y={y + h / 2 + fs / 3} fontSize={fs} fontWeight="600" fill={ON_FILL}>{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 236" width="100%" height="236" role="img"
      aria-label="A correct outline goes h1, h2, h3 with no gaps; skipping from h1 to h3 breaks the outline that screen readers use">
      {/* correct */}
      <rect x="10" y="10" width="264" height="216" rx="10" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="10" fill={t.chart.green} />
      <text x="30" y="34.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>OK</text>
      <text x="48" y="35" fontSize="13" fontWeight="700" fill={t.chart.green}>No level is skipped</text>
      {bar(22, 48, 240, 30, "h1  Student Club", t.chart.blue, 0.95, 15)}
      {bar(38, 84, 224, 26, "h2  About Us", t.chart.blue, 0.7, 13)}
      {bar(54, 116, 208, 22, "h3  Our Mission", t.chart.blue, 0.45, 12)}
      {bar(54, 144, 208, 22, "h3  Our History", t.chart.blue, 0.45, 12)}
      {bar(38, 172, 224, 26, "h2  Events", t.chart.blue, 0.7, 13)}
      <text x="22" y="216" fontSize="11" fill={t.text.tertiary}>Reads like a table of contents.</text>

      {/* wrong */}
      <rect x="288" y="10" width="262" height="216" rx="10" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <circle cx="308" cy="30" r="10" fill={t.chart.brightOrange} />
      <text x="308" y="34.5" textAnchor="middle" fontSize="13" fontWeight="700" fill={ON_FILL}>X</text>
      <text x="326" y="35" fontSize="13" fontWeight="700" fill={t.chart.brightOrange}>h2 is missing</text>
      {bar(300, 48, 238, 30, "h1  Student Club", t.chart.blue, 0.95, 15)}
      <rect x="316" y="84" width="222" height="26" rx="5" fill="none" stroke={t.chart.brightOrange} strokeDasharray="4 4" />
      <text x="326" y="101" fontSize="12" fill={t.chart.brightOrange}>h2 — nothing here</text>
      {bar(332, 116, 206, 22, "h3  About Us", t.chart.blue, 0.45, 12)}
      {bar(348, 144, 190, 22, "h5  Our Mission", t.chart.blue, 0.3, 12)}
      <text x="300" y="196" fontSize="11" fill={t.chart.brightOrange}>Screen reader says "heading level 3"</text>
      <text x="300" y="212" fontSize="11" fill={t.chart.brightOrange}>after level 1 — outline is broken.</text>
    </svg>
  );
}

/* ---------- 2. What each img attribute actually does --------------------- */

function ImgAnatomy({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 272" width="100%" height="272" role="img"
      aria-label="src points at the file on disk, alt is the sentence a screen reader speaks, width and height reserve the space on the page">
      <defs>
        <marker id="s3a" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.stroke.secondary} />
        </marker>
        <pattern id="s3ph" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={t.chart.blue} opacity="0.25" />
          <path d="M0,10 L10,0" stroke={t.chart.blue} strokeWidth="1" opacity="0.4" />
        </pattern>
      </defs>

      {/* the tag */}
      <rect x="14" y="12" width="532" height="60" rx="8" fill={t.fill.tertiary} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="26" y="34" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>&lt;img</text>
      <rect x="70" y="20" width="176" height="20" rx="4" fill={t.chart.blue} opacity="0.9" />
      <text x="76" y="34" fontSize="12" fontFamily={MONO} fill={ON_FILL}>src="images/team.jpg"</text>
      <rect x="254" y="20" width="132" height="20" rx="4" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="260" y="34" fontSize="12" fontFamily={MONO} fill={ON_FILL}>alt="Five leaders…"</text>
      <rect x="70" y="44" width="164" height="20" rx="4" fill={t.chart.green} opacity="0.9" />
      <text x="76" y="58" fontSize="12" fontFamily={MONO} fill={ON_FILL}>width="400" height="300"</text>
      <text x="242" y="58" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>&gt;</text>
      <text x="404" y="34" fontSize="11" fill={t.text.tertiary}>no closing tag —</text>
      <text x="404" y="48" fontSize="11" fill={t.text.tertiary}>&lt;img&gt; stands alone</text>

      {/* src -> file on disk */}
      <line x1="158" y1="76" x2="158" y2="98" stroke={t.stroke.secondary} strokeWidth="1.5" markerEnd="url(#s3a)" />
      <rect x="14" y="104" width="164" height="118" rx="10" fill={t.bg.elevated} stroke={t.chart.blue} strokeWidth="1.5" />
      <text x="26" y="124" fontSize="13" fontWeight="700" fill={t.chart.blue}>src = the file</text>
      <rect x="26" y="132" width="140" height="18" rx="4" fill={t.fill.tertiary} />
      <text x="32" y="145" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>images/</text>
      <rect x="38" y="154" width="128" height="18" rx="4" fill={t.chart.blue} opacity="0.85" />
      <text x="44" y="167" fontSize="11" fontFamily={MONO} fill={ON_FILL}>team.jpg</text>
      <text x="26" y="192" fontSize="11" fill={t.text.tertiary}>Wrong path = broken</text>
      <text x="26" y="206" fontSize="11" fill={t.text.tertiary}>image icon, every time.</text>

      {/* alt -> screen reader */}
      <line x1="320" y1="76" x2="320" y2="98" stroke={t.stroke.secondary} strokeWidth="1.5" markerEnd="url(#s3a)" />
      <rect x="192" y="104" width="180" height="118" rx="10" fill={t.bg.elevated} stroke={t.chart.goldenYellow} strokeWidth="1.5" />
      <text x="204" y="124" fontSize="13" fontWeight="700" fill={t.chart.goldenYellow}>alt = the sentence</text>
      <path d="M204,134 h156 a6,6 0 0 1 6,6 v40 a6,6 0 0 1 -6,6 h-134 l-10,12 v-12 h-12 a6,6 0 0 1 -6,-6 v-40 a6,6 0 0 1 6,-6 z"
        fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="212" y="152" fontSize="11" fill={ON_FILL}>"Five club leaders in</text>
      <text x="212" y="166" fontSize="11" fill={ON_FILL}>front of the IT building"</text>
      <text x="204" y="200" fontSize="11" fill={t.text.tertiary}>Spoken aloud to blind users.</text>
      <text x="204" y="214" fontSize="11" fill={t.text.tertiary}>Also what Google reads.</text>

      {/* width/height -> reserved box */}
      <line x1="470" y1="76" x2="470" y2="98" stroke={t.stroke.secondary} strokeWidth="1.5" markerEnd="url(#s3a)" />
      <rect x="386" y="104" width="160" height="118" rx="10" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <text x="398" y="124" fontSize="13" fontWeight="700" fill={t.chart.green}>width/height = space</text>
      <rect x="416" y="134" width="100" height="60" fill="url(#s3ph)" stroke={t.chart.green} strokeWidth="1.5" />
      <text x="466" y="206" textAnchor="middle" fontSize="11" fill={t.chart.green}>400 x 300</text>
      <line x1="416" y1="128" x2="516" y2="128" stroke={t.chart.green} strokeWidth="1" />
      <line x1="404" y1="134" x2="404" y2="194" stroke={t.chart.green} strokeWidth="1" />

      <text x="14" y="246" fontSize="13" fill={t.text.secondary}>Set both numbers so the browser reserves space —</text>
      <text x="14" y="262" fontSize="13" fill={t.text.secondary}>text below stops jumping as images load.</text>
    </svg>
  );
}

/* ---------- 3. What the screen reader hears ------------------------------ */

function AltTextCompare({ t }: { t: CanvasTokens }) {
  const row = (y: number, code: string, spoken: string, tone: string, verdict: string) => (
    <g key={y}>
      <rect x="12" y={y} width="536" height="42" rx="8" fill={t.bg.elevated} stroke={tone} strokeWidth="1.5" />
      <text x="24" y={y + 26} fontSize="12" fontFamily={MONO} fill={t.text.primary}>{code}</text>
      <text x="238" y={y + 26} fontSize="12" fill={t.text.secondary}>{spoken}</text>
      <text x="470" y={y + 26} fontSize="12" fontWeight="700" fill={tone}>{verdict}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 200" width="100%" height="200" role="img"
      aria-label="Compare what a screen reader says for a useless alt value, an empty alt on a decorative image, and a descriptive alt">
      <text x="24" y="16" fontSize="11" fontWeight="700" fill={t.text.tertiary}>YOU WRITE</text>
      <text x="238" y="16" fontSize="11" fontWeight="700" fill={t.text.tertiary}>THE SCREEN READER SAYS</text>
      <text x="470" y="16" fontSize="11" fontWeight="700" fill={t.text.tertiary}>VERDICT</text>
      {row(24, 'alt="image"', '"image" — and nothing else', t.chart.brightOrange, "useless")}
      {row(74, 'alt="IMG_2341.jpg"', '"I M G underscore 2 3 4 1"', t.chart.brightOrange, "worse")}
      {row(124, 'alt="Five club leaders…"', '"Five club leaders in front of…"', t.chart.green, "correct")}
      <text x="12" y="186" fontSize="12" fill={t.text.tertiary}>Decorative image? Use alt="" so the reader skips it.</text>
    </svg>
  );
}

/* ---------- 4. Which format for which picture --------------------------- */

function FormatChooser({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 264" width="100%" height="264" role="img"
      aria-label="Choose JPG for photographs, PNG for transparency, SVG for logos that must stay sharp, GIF only for short animations">
      <defs>
        <linearGradient id="s3jpg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.chart.blue} />
          <stop offset="55%" stopColor={t.chart.green} />
          <stop offset="100%" stopColor={t.chart.goldenYellow} />
        </linearGradient>
        <pattern id="s3trans" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill={t.bg.elevated} />
          <rect width="6" height="6" fill={t.fill.tertiary} />
          <rect x="6" y="6" width="6" height="6" fill={t.fill.tertiary} />
        </pattern>
      </defs>

      {/* JPG */}
      <rect x="10" y="12" width="130" height="188" rx="10" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <rect x="24" y="26" width="102" height="66" rx="4" fill="url(#s3jpg)" />
      <text x="75" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={t.text.primary}>JPG</text>
      <text x="75" y="132" textAnchor="middle" fontSize="12" fill={t.text.secondary}>photographs</text>
      <text x="24" y="154" fontSize="11" fill={t.text.tertiary}>millions of colours</text>
      <text x="24" y="170" fontSize="11" fill={t.chart.brightOrange}>no transparency</text>
      <text x="24" y="190" fontSize="11" fill={t.text.tertiary}>team photo, banner</text>

      {/* PNG */}
      <rect x="150" y="12" width="130" height="188" rx="10" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <rect x="164" y="26" width="102" height="66" rx="4" fill="url(#s3trans)" stroke={t.stroke.tertiary} />
      <circle cx="215" cy="59" r="22" fill={t.chart.blue} opacity="0.9" />
      <text x="215" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={t.text.primary}>PNG</text>
      <text x="215" y="132" textAnchor="middle" fontSize="12" fill={t.text.secondary}>transparency</text>
      <text x="164" y="154" fontSize="11" fill={t.chart.green}>see-through corners</text>
      <text x="164" y="170" fontSize="11" fill={t.text.tertiary}>bigger than JPG</text>
      <text x="164" y="190" fontSize="11" fill={t.text.tertiary}>logo, screenshot</text>

      {/* SVG */}
      <rect x="290" y="12" width="130" height="188" rx="10" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <rect x="304" y="26" width="102" height="66" rx="4" fill={t.fill.tertiary} />
      <path d="M330,78 L355,38 L380,78 z" fill={t.chart.green} opacity="0.9" />
      <text x="355" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={t.text.primary}>SVG</text>
      <text x="355" y="132" textAnchor="middle" fontSize="12" fill={t.text.secondary}>stays sharp</text>
      <text x="304" y="154" fontSize="11" fill={t.chart.green}>same file at any size</text>
      <text x="304" y="170" fontSize="11" fill={t.text.tertiary}>tiny, editable text</text>
      <text x="304" y="190" fontSize="11" fill={t.text.tertiary}>icons, logo, diagrams</text>

      {/* GIF */}
      <rect x="430" y="12" width="120" height="188" rx="10" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <rect x="442" y="26" width="30" height="66" rx="3" fill={t.chart.goldenYellow} opacity="0.4" />
      <rect x="476" y="26" width="30" height="66" rx="3" fill={t.chart.goldenYellow} opacity="0.7" />
      <rect x="510" y="26" width="30" height="66" rx="3" fill={t.chart.goldenYellow} opacity="1" />
      <text x="490" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={t.text.primary}>GIF</text>
      <text x="490" y="132" textAnchor="middle" fontSize="12" fill={t.text.secondary}>short animation</text>
      <text x="442" y="154" fontSize="11" fill={t.chart.brightOrange}>only 256 colours</text>
      <text x="442" y="170" fontSize="11" fill={t.chart.brightOrange}>heavy files</text>
      <text x="442" y="190" fontSize="11" fill={t.text.tertiary}>use video instead</text>

      <text x="10" y="222" fontSize="13" fill={t.text.secondary}>Photo = JPG. Drawing that must scale = SVG.</text>
      <text x="10" y="238" fontSize="13" fill={t.text.secondary}>Needs a see-through background and is not a drawing? PNG.</text>
      <text x="10" y="254" fontSize="13" fontWeight="700" fill={t.chart.goldenYellow}>Always resize before you upload: keep a content photo under 200 KB.</text>
    </svg>
  );
}

export default function Session03Lecture() {
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
        title="Session 3 — Working with Text and Images"
        notes="Students should have 5 pages with navigation from Session 2. Today we fill those pages with rich content."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 3 · 150 min</Tag>
          <H1>Working with Text &amp; Images</H1>
          <Text tone="secondary">Headings, paragraphs, lists, bold/italic, images with alt text, and choosing the right image format.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 2: Objectives ===== */}
      <PresentationSlide id="objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>After this session you will be able to:</H2>
          <Stack gap={6}>
            <Text>1. Use headings (h1-h6) correctly in proper hierarchy</Text>
            <Text>2. Format text with p, strong, em, br, hr</Text>
            <Text>3. Create unordered and ordered lists, including nested lists</Text>
            <Text>4. Insert images with src, alt, width, and height attributes</Text>
            <Text>5. Choose JPG, PNG, GIF, or SVG based on image type</Text>
            <Text>6. Write meaningful alt text for accessibility</Text>
          </Stack>
          <Callout tone="info">Linked outcomes: CLO2 (create structured websites), CLO3 (apply formatting and media), CLO4</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 3: Agenda / Timeline ===== */}
      <PresentationSlide id="agenda" title="Today's 150-Minute Plan">
        <Stack gap={12}>
          <H2>Session timeline</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="info">0 – 10 min</Tag><Text>Welcome &amp; objectives</Text></Row>
              <Row gap={8}><Tag tone="info">10 – 18 min</Tag><Text>Recap of Session 2</Text></Row>
              <Row gap={8}><Tag tone="success">18 – 90 min</Tag><Text>New content + live demos</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="success">90 – 140 min</Tag><Text>In-class practice (Tasks 1–4)</Text></Row>
              <Row gap={8}><Tag tone="warning">140 – 148 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">148 – 150 min</Tag><Text>Recap &amp; next session</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Theory ~60 min · Practice ~90 min. Have images ready in your images/ folder.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 4: Recap of Session 2 ===== */}
      <PresentationSlide id="recap-s2" title="Recap: What Did We Learn Last Time?">
        <Stack gap={12}>
          <H2>Quick review — Session 2</H2>
          <Stack gap={8}>
            <Callout tone="info">What is a relative path? (A path starting from the current file's location.)</Callout>
            <Callout tone="info">When do you need ../ ? (When linking FROM a subfolder to a file outside it.)</Callout>
            <Callout tone="info">What naming rules must you follow? (Lowercase, hyphens, no spaces, no special chars.)</Callout>
            <Callout tone="info">Why must every page have the same nav menu? (So users never get lost.)</Callout>
          </Stack>
          <Text tone="secondary">If you cannot answer these, review Session 2 before continuing.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 5: Headings ===== */}
      <PresentationSlide id="headings" title="Headings: Page Structure" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={16}>
          <H2>Headings create a page outline</H2>
          <HeadingOutline t={t} />
          <Text tone="secondary">h1 = the book title (one per page) · h2 = chapter titles · h3 = sections inside a chapter. Headings are structure, never a way to make text bigger — that is CSS.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 5b: Anatomy of a Real Page ===== */}
      <PresentationSlide
        id="anatomy-real-page"
        title="Anatomy of a Real Web Page"
        notes="Walk through each bullet and point at the matching area in the screenshot. Emphasize that every visible element on any web page is built from simple tags — the same ones we learn today. Students should open their own browser and compare."
        background={{ pattern: "grid", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>Anatomy of a Real Web Page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={8}>
              <img
                src={IMG_WEBPAGE}
                alt="The English Wikipedia home page open in a browser, showing headings, text, links and images"
                style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.stroke.tertiary}` }}
              />
              <Text size="small" tone="tertiary">Screenshot: QuickQuokka — Public domain, Wikimedia Commons</Text>
            </Stack>
            <Stack gap={8}>
              <Text><Text as="span" tone="primary">Spot these on the page:</Text></Text>
              <Text>The one big title at the top = <Text as="span" tone="primary">&lt;h1&gt;</Text></Text>
              <Text>Blocks of readable text = <Text as="span" tone="primary">&lt;p&gt;</Text> paragraphs</Text>
              <Text>Blue underlined clickable words = <Text as="span" tone="primary">&lt;a&gt;</Text> links</Text>
              <Text>Photos with captions below them = <Text as="span" tone="primary">&lt;img&gt;</Text> + alt text</Text>
              <Text>The menu on the left side = a list of links (<Text as="span" tone="primary">&lt;ul&gt;</Text>)</Text>
              <Divider />
              <Callout tone="info">Every single one of those is a tag you will learn today. Real websites are just many small tags put together.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 6: Heading Rules Table ===== */}
      <PresentationSlide id="heading-table" title="Heading Tag Reference">
        <Stack gap={12}>
          <H2>Six heading levels at a glance</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Tag</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Default Size</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Usage</Text></Text>

            <Text>&lt;h1&gt;</Text><Text>~32px, bold</Text><Text>Main title — ONE per page</Text>
            <Text>&lt;h2&gt;</Text><Text>~24px, bold</Text><Text>Major sections</Text>
            <Text>&lt;h3&gt;</Text><Text>~20px, bold</Text><Text>Subsections under h2</Text>
            <Text>&lt;h4&gt;</Text><Text>~18px, bold</Text><Text>Sub-subsections</Text>
            <Text>&lt;h5&gt;</Text><Text>~16px, bold</Text><Text>Rarely needed</Text>
            <Text>&lt;h6&gt;</Text><Text>~14px, bold</Text><Text>Very rarely needed</Text>
          </Grid>
          <Callout tone="danger">Do NOT use headings just to make text big. Use CSS font-size for visual sizing without structural meaning.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 7: Text Formatting ===== */}
      <PresentationSlide id="text-formatting" title="Text Formatting">
        <Stack gap={12}>
          <H2>Paragraphs, bold, italic, breaks</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Code language="html">{`<p>A paragraph of text.</p>

<strong>Important</strong> = bold + semantic
<em>Emphasis</em> = italic + semantic

<br>   = line break (addresses, poetry)
<hr>   = horizontal rule (section divider)`}</Code>
            </Stack>
            <Stack gap={6}>
              <Callout tone="warning">Use strong/em instead of b/i for meaningful emphasis.</Callout>
              <Callout tone="danger">Do NOT use br for spacing — use CSS margin/padding instead.</Callout>
              <Text tone="secondary">HTML ignores extra whitespace. Pressing Enter in code does NOT create a new line in the browser.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 8: Strong vs B, Em vs I ===== */}
      <PresentationSlide id="strong-vs-b" title="strong/em vs b/i">
        <Stack gap={12}>
          <H2>Same look, different meaning</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="success">Semantic (preferred)</Tag>
              <Code language="html">{`<strong>deadline</strong>
<em>strictly</em>`}</Code>
              <Text tone="secondary">Bold/italic + meaning. Screen readers announce emphasis.</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="info">Visual only</Tag>
              <Code language="html">{`<b>product name</b>
<i>foreign word</i>`}</Code>
              <Text tone="secondary">Bold/italic with NO meaning. Purely visual styling.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">For beginners: always use &lt;strong&gt; for bold and &lt;em&gt; for italic. These are semantically correct in most situations.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 9: br and hr Done Right ===== */}
      <PresentationSlide id="br-hr-usage" title="Using br and hr Correctly">
        <Stack gap={12}>
          <H2>When to use br and hr</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="success">Correct uses</Tag>
              <Code language="html">{`<!-- br: addresses, poetry -->
<p>Room 101<br>
Building A<br>
University Campus</p>

<!-- hr: thematic section break -->
<hr>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Tag tone="danger">Wrong uses</Tag>
              <Code language="html">{`<!-- WRONG: spacing between sections -->
<p>Section 1</p>
<br><br><br>
<p>Section 2</p>

<!-- Use CSS margin instead! -->`}</Code>
            </Stack>
          </Grid>
          <Callout tone="warning">br = line break within content (addresses, poems). hr = thematic divider between sections. Neither is for layout spacing.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 9b: Text Elements Reference Table ===== */}
      <PresentationSlide
        id="text-elements-ref"
        title="Text Elements Reference"
        notes="This is your cheat sheet for every text tag in Session 3. Bookmark or screenshot this slide. When you are coding, come back here if you forget which tag to use."
        background={{ pattern: "dots", accent: t.chart.green }}
      >
        <Stack gap={12}>
          <H2>All Text Tags at a Glance</H2>
          <Table
            headers={["Element", "What it renders", "When to use it"]}
            rows={[
              ["h1 – h6", "Headings, largest to smallest", "Page outline — one h1 per page, never skip levels"],
              ["p", "A paragraph block with spacing", "Any block of running text"],
              ["strong", "Bold text with importance", "Key terms, warnings, deadlines"],
              ["em", "Italic text with emphasis", "Words you would stress when speaking"],
              ["ul + li", "Bulleted list items", "Items where order does not matter"],
              ["ol + li", "Numbered list items", "Steps, rankings, anything sequential"],
              ["blockquote", "Indented quotation block", "Quoting someone — club motto, testimonial"],
              ["br", "Line break (self-closing)", "Addresses, poetry — never for spacing"],
              ["hr", "Horizontal rule (self-closing)", "Thematic divider between sections"],
            ]}
          />
          <Callout tone="info">br and hr are self-closing — they have no closing tag. Every other tag above needs an opening AND closing tag.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 10: Lists ===== */}
      <PresentationSlide id="lists" title="Lists: ul, ol, Nested">
        <Stack gap={12}>
          <H2>Unordered, ordered, and nested lists</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H3>Unordered (bullets)</H3>
              <Code language="html">{`<ul>
  <li>Web Workshop</li>
  <li>Photo Contest</li>
  <li>Music Night</li>
</ul>`}</Code>
              <Text tone="secondary">Order does NOT matter</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Ordered (numbers)</H3>
              <Code language="html">{`<ol>
  <li>Fill out form</li>
  <li>Attend orientation</li>
  <li>Pay membership fee</li>
</ol>`}</Code>
              <Text tone="secondary">Order IS critical</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Nested lists go INSIDE the li element. You can mix ul inside ol and vice versa.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 10: Nested List Example ===== */}
      <PresentationSlide id="nested-lists" title="Nested Lists Explained">
        <Stack gap={12}>
          <H2>A list inside a list</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<ul>
  <li>Frontend Skills
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend Skills
    <ul>
      <li>PHP</li>
      <li>MySQL</li>
    </ul>
  </li>
</ul>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">The inner &lt;ul&gt;</Text> is placed INSIDE the &lt;li&gt;, after the text and before &lt;/li&gt;.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">Indentation</Text> shows nesting visually but does not affect rendering.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">You can nest deeper</Text> but avoid going beyond 3 levels — it becomes hard to read.</Text>
              <Divider />
              <Callout tone="info">In the browser: indented bullet points under each parent item.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 11: Quick Check ===== */}
      <PresentationSlide id="quick-check" title="Quick Check: Text Tags">
        <Stack gap={12}>
          <H2>Test yourself</H2>
          <Stack gap={8}>
            <Callout tone="info">How many h1 tags should a page have? (Answer: Exactly one.)</Callout>
            <Callout tone="info">Which tag makes text bold AND tells screen readers it is important? (Answer: &lt;strong&gt;)</Callout>
            <Callout tone="info">Can you put a &lt;ul&gt; inside an &lt;ol&gt;? (Answer: Yes — nested lists can mix types.)</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbor for 30 seconds.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 12: Images ===== */}
      {/* ── Try It Now: Images ────────────────────────────────── */}
      <PresentationSlide id="s03-try-images" title="Try It Now: Add an Image" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — add an image to your page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1: Save an image</Text>
              <Text>Download any image and save it as images/club-photo.jpg in your project folder.</Text>
              <Text fontWeight="700">Step 2: Add the tag</Text>
              <Code language="html">{`<img
  src="images/club-photo.jpg"
  alt="Club members at the annual event"
  width="400"
>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. The image appears in the browser — no broken icon.</Text>
              <Text>2. If you see a broken icon, right-click → Inspect → check the src path in the Elements panel.</Text>
              <Text>3. The alt text is descriptive — it says what is IN the image, not just "image" or "photo."</Text>
              <Callout tone="info">The most common error: saving the image in the wrong folder. The src path must match where the file actually is.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="images" title="The img Tag" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>Every attribute of &lt;img&gt; does one job</H2>
          <ImgAnatomy t={t} />
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 13: Img Attributes Table ===== */}
      <PresentationSlide id="img-attributes" title="Image Attributes Reference">
        <Stack gap={12}>
          <H2>Four attributes you need</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Attribute</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Purpose</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Example</Text></Text>

            <Text>src</Text><Text>Path to the image file</Text><Text>images/photo.jpg</Text>
            <Text>alt</Text><Text>Description for screen readers</Text><Text>Club members at workshop</Text>
            <Text>width</Text><Text>Width in pixels</Text><Text>400</Text>
            <Text>height</Text><Text>Height in pixels</Text><Text>300</Text>
          </Grid>
          <Callout tone="warning">&lt;img&gt; is self-closing — no &lt;/img&gt; tag. Set width and height to prevent layout jump while loading.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 14: Alt Text ===== */}
      <PresentationSlide id="alt-text" title="Alt Text & Accessibility">
        <Stack gap={12}>
          <H2>Writing good alt text</H2>
          <Text>The alt attribute is NOT optional. Screen readers read it aloud. Search engines rely on it.</Text>
          <AltTextCompare t={t} />
          <Callout tone="warning">Describe WHAT THE IMAGE SHOWS. Keep under 125 characters. Never start with "Image of".</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 15: Image Formats ===== */}
      <PresentationSlide id="image-formats" title="Choosing Image Formats">
        <Stack gap={12}>
          <H2>JPG vs PNG vs GIF vs SVG</H2>
          <FormatChooser t={t} />
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 16: Image Format Decision Table ===== */}
      <PresentationSlide id="format-table" title="Which Format Do I Pick?">
        <Stack gap={12}>
          <H2>Quick decision guide</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Photograph?</Text> → JPG (millions of colors, small file size)</Text>
            <Text><Text as="span" tone="primary">Logo or icon that must stay sharp?</Text> → SVG (scales to any size)</Text>
            <Text><Text as="span" tone="primary">Need transparent background?</Text> → PNG (supports alpha channel)</Text>
            <Text><Text as="span" tone="primary">Short animation?</Text> → GIF (but consider video instead)</Text>
            <Text><Text as="span" tone="primary">Screenshot?</Text> → PNG (preserves text clarity)</Text>
          </Stack>
          <Callout tone="danger">Always resize images BEFORE uploading. A 5 MB camera photo kills page load speed. Keep content photos under 200 KB.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 16b: Choosing an Image Format (Table) ===== */}
      <PresentationSlide
        id="image-format-table"
        title="Choosing an Image Format"
        notes="Use this table when you are about to insert an image and are not sure which format to save it in. Remember: resize the actual file BEFORE inserting — do not rely on width and height attributes alone to shrink a huge photo."
        background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}
      >
        <Stack gap={12}>
          <H2>Format Quick Reference</H2>
          <Table
            headers={["Format", "Best for", "Avoid when"]}
            rows={[
              ["JPG", "Photos, banners, images with many colors", "You need transparency or sharp edges"],
              ["PNG", "Logos, screenshots, transparency, sharp edges", "The file is a photograph (use JPG instead)"],
              ["GIF", "Tiny animations, very few colors", "The image has more than 256 colors"],
              ["SVG", "Icons, logos that must stay sharp at any size", "The image is a photograph"],
            ]}
          />
          <Callout tone="warning">Size rules: keep each image under ~200 KB. Resize the file BEFORE inserting — do not just set width/height on a 5 MB photo. Always write alt text.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 17: Worked Example 1 — Simple Content ===== */}
      <PresentationSlide id="worked-example-1" title="Worked Example 1: Basic Text Page">
        <Stack gap={10}>
          <H2>Simple page with headings and lists</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<body>
  <h1>Student Club</h1>
  <h2>About Us</h2>
  <p>We are a community of
     <em>creators</em> and
     <strong>innovators</strong>.</p>

  <h3>Activities</h3>
  <ul>
    <li>Weekly workshops</li>
    <li>Design contests</li>
    <li>Social events</li>
  </ul>
</body>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">h1 → h2 → h3</Text> — proper hierarchy, no levels skipped.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;em&gt;</Text> adds italic emphasis. <Text as="span" tone="primary">&lt;strong&gt;</Text> adds bold importance.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;ul&gt;</Text> for items where order does not matter.</Text>
              <Divider />
              <Callout tone="info">In the browser: a large title, section heading, paragraph with styled words, and a bulleted list.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 18: Worked Example 2 — Rich About Page ===== */}
      <PresentationSlide id="worked-example" title="Worked Example 2: Rich About Page">
        <Stack gap={10}>
          <H2>About page with text, lists &amp; images</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<main>
  <h2>About Our Club</h2>
  <p>The <strong>Student Club</strong> is a
     community of <em>creators</em>.</p>

  <h3>What We Do</h3>
  <ul>
    <li><strong>Workshops:</strong> web design</li>
    <li><strong>Contests:</strong> photography</li>
    <li><strong>Social:</strong> movie nights</li>
  </ul>

  <h3>How to Join</h3>
  <ol>
    <li>Fill out the membership form</li>
    <li>Attend orientation</li>
    <li>Pay the annual fee</li>
  </ol>

  <img src="images/team-photo.jpg"
       alt="Five leaders at IT building"
       width="400" height="300">
</main>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;h2&gt; then &lt;h3&gt;</Text> — proper heading hierarchy. Never skip levels.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;strong&gt;</Text> = bold + semantic importance. <Text as="span" tone="primary">&lt;em&gt;</Text> = italic + emphasis.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;ul&gt;</Text> for unordered items (activities). <Text as="span" tone="primary">&lt;ol&gt;</Text> when order matters (steps).</Text>
              <Text tone="secondary"><Text as="span" tone="primary">alt text</Text> describes what the photo shows — not "image" or the filename.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">width/height</Text> prevent layout jump while loading.</Text>
              <Divider />
              <Callout tone="info">In the browser: section headings, a bulleted activity list, numbered joining steps, and a team photo. Screen readers announce every element correctly.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 19: Discussion Prompt ===== */}
      <PresentationSlide id="discussion" title="Discussion: Why Does Alt Text Matter?">
        <Stack gap={12}>
          <H2>Think about accessibility</H2>
          <Stack gap={8}>
            <Text>A blind person uses a screen reader to browse the web.</Text>
            <Text>Without alt text, they hear "image" or the filename — completely useless.</Text>
            <Text>With good alt text, they hear a description and understand the content.</Text>
          </Stack>
          <Callout tone="info">Accessibility is not optional. It is a core part of professional web development.</Callout>
          <Text tone="secondary">Google also reads alt text for image search rankings.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 20: Common Mistakes ===== */}
      <PresentationSlide id="common-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>Watch out for these mistakes</H2>
          <Stack gap={8}>
            <Callout tone="danger">Skipping heading levels (h1 → h3) — breaks document outline for screen readers</Callout>
            <Callout tone="danger">Missing or useless alt text ("image", "photo") — defeats accessibility purpose</Callout>
            <Callout tone="danger">Using huge unoptimized images (5 MB straight from camera) — kills page load speed</Callout>
            <Callout tone="danger">Using br for layout spacing — use CSS margin/padding instead</Callout>
            <Callout tone="danger">Content outside li in lists — everything must be wrapped in li tags</Callout>
            <Callout tone="danger">Multiple h1 tags per page — only ONE h1 allowed per page</Callout>
            <Callout tone="danger">Wrong image format — using GIF for photos or JPG for logos with transparency</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE: Self-Study Check ===== */}
      <PresentationSlide
        id="self-study-check"
        title="Self-Study Check"
        notes="Answer key: 1) h1 is the biggest heading tag. 2) alt shows replacement text when the image fails to load AND is read aloud by screen readers. 3) PNG — it supports transparent backgrounds. 4) False — br is self-closing and does NOT need a closing tag. 5) One h1 per page gives the page a single clear topic, which helps screen readers and search engines understand what the page is about."
        background={{ pattern: "grid", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>Can You Answer These?</H2>
          <Stack gap={8}>
            <Callout tone="info">1. Which heading tag is the biggest?</Callout>
            <Callout tone="info">2. What does alt do when the image fails to load?</Callout>
            <Callout tone="info">3. Which format for a club logo with a transparent background?</Callout>
            <Callout tone="info">4. True or false: &lt;br&gt; needs a closing tag.</Callout>
            <Callout tone="info">5. Why is one h1 per page a good habit?</Callout>
          </Stack>
          <Text tone="secondary">Check your answers in the speaker notes. If you missed two or more, re-read the relevant slides before starting practice.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 21: In-Class Practice ===== */}
      <PresentationSlide id="practice" title="In-Class Practice" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>In-class practice (exercises/session-03/)</H2>
          <Stack gap={8}>
            <H3>Task 1: Practice Headings (h1 through h6)</H3>
            <Text>Create text-practice.html with all six heading levels. One h1 per page.</Text>
            <H3>Task 2: Paragraphs and Text Formatting</H3>
            <Text>Add paragraphs using p, strong, em, br, and hr tags for text formatting.</Text>
            <H3>Task 3: Lists (Unordered and Ordered)</H3>
            <Text>Create ul and ol lists plus a nested list mixing both types.</Text>
            <H3>Task 4: Adding Images</H3>
            <Text>Insert images using img with src, alt, width, and title attributes via relative paths.</Text>
          </Stack>
          <Callout tone="info">Estimated time: 50 minutes.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 22: Practice Tips ===== */}
      <PresentationSlide id="practice-tips" title="Practice Tips">
        <Stack gap={12}>
          <H2>Tips for the in-class tasks</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Copy an image</Text> into your images/ folder BEFORE writing the &lt;img&gt; tag.</Text>
            <Text><Text as="span" tone="primary">Check the path carefully</Text> — if the image is broken, the path is wrong.</Text>
            <Text><Text as="span" tone="primary">Write real alt text</Text> — describe what you actually see in the photo.</Text>
            <Text><Text as="span" tone="primary">Preview after every save</Text> to verify headings render at different sizes.</Text>
          </Stack>
          <Callout tone="warning">Stuck? Compare your code against the worked examples on previous slides.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s03-do-dont" title="Text & Images: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use exactly one &lt;h1&gt; per page, then h2, h3 in order</Text>
              <Text>Write alt text that describes the image content</Text>
              <Text>Use &lt;strong&gt; and &lt;em&gt; for meaning</Text>
              <Text>Resize images to their display size before uploading</Text>
              <Text>Use &lt;ul&gt; for unordered and &lt;ol&gt; for ranked lists</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Pick a heading level because you like its font size</Text>
              <Text>Write alt=&quot;image&quot; or alt=&quot;photo.jpg&quot;</Text>
              <Text>Use &lt;br&gt;&lt;br&gt; to fake paragraph spacing — that is CSS margin</Text>
              <Text>Serve a 4000px photo scaled down in the browser</Text>
              <Text>Fake a list with hyphens and &lt;br&gt; tags</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s03-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>Four problems in eight lines. Spot them.</H2>
          <Code language="html">{`<h1>Our Club</h1>
<h3>About Us</h3>
<p>We meet weekly.<br><br>Everyone is welcome.</p>
<img src="images/team.jpg">
<ul>
  <p>Monday</p>
  <p>Wednesday</p>
</ul>`}</Code>
          <Divider />
          <Stack gap={4}>
            <Row gap={8}><Pill>Bug 1</Pill><Text>&lt;h3&gt; after &lt;h1&gt; skips h2. Screen reader users navigating by heading think a level is missing.</Text></Row>
            <Row gap={8}><Pill>Bug 2</Pill><Text>&lt;br&gt;&lt;br&gt; fakes spacing. Use two separate &lt;p&gt; elements and set margin in CSS.</Text></Row>
            <Row gap={8}><Pill>Bug 3</Pill><Text>The &lt;img&gt; has no alt attribute. A blind user hears only the file name, or nothing at all.</Text></Row>
            <Row gap={8}><Pill>Bug 4</Pill><Text>&lt;ul&gt; may only contain &lt;li&gt; children. Replace both &lt;p&gt; elements with &lt;li&gt;.</Text></Row>
          </Stack>
          <Callout tone="info">Run this through validator.w3.org — it flags bugs 3 and 4 instantly.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s03-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>Exactly one &lt;h1&gt; on the page, and heading levels descend without skipping.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Every &lt;img&gt; has alt text you could read aloud and still understand the page.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Both list types render correctly: bullets for &lt;ul&gt;, numbers for &lt;ol&gt;.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>No image file is larger than about 300 KB, and none is wider than 1200px.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">Fast alt-text test: hide every image with DevTools. If the page still makes sense, your alt text is doing its job.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ───────────────────────────────────────── */}
      <PresentationSlide id="s03-assignment" title="Assignment: Rich Content Page">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>pages/about.html for your Student Club Website, filled with real text and images.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>One &lt;h1&gt;, at least two &lt;h2&gt; sections, no skipped levels.</Text>
              <Text>At least two images, each with descriptive alt text.</Text>
              <Text>One &lt;ul&gt; and one &lt;ol&gt;, used for the right kind of content.</Text>
              <Text>At least one &lt;strong&gt; and one &lt;em&gt; used for meaning, not styling.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Validate at validator.w3.org — zero errors.</Text>
              <Text>Read your alt text aloud. Does it describe the image?</Text>
              <Text>Check every image loads — no broken-image icons.</Text>
              <Callout tone="warning">Missing alt text is the single most common accessibility failure on the web. Do not add yours to the count.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ===== SLIDE 23: Homework ===== */}
      <PresentationSlide id="homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 3 (homework/session-03/)</H2>
          <Stack gap={8}>
            <Text><Text as="span">Building the About Page</Text> — enhance your about.html with rich, accessible content.</Text>
            <Text>Task 1: Use h1/h2/h3 headings, 3+ paragraphs, ul + ol lists, and 2+ images with descriptive alt text.</Text>
            <Text>Task 2: Add a Photo Gallery section with h2 "Photo Gallery", at least 3 images, each with different alt text and a short caption paragraph.</Text>
            <Divider />
            <Row gap={8}>
              <Tag tone="danger">Due: Sunday 23:59</Tag>
              <Tag tone="info">Submit via course platform</Tag>
            </Row>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 24: Recap & Next ===== */}
      <PresentationSlide id="recap" title="Recap & Next Session" background={{ pattern: "aurora", accent: t.chart.green, accentSecondary: t.chart.blue }}>
        <Stack gap={12}>
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>One h1 per page; never skip heading levels</Text>
            <Text>Use strong/em for semantic emphasis, not b/i</Text>
            <Text>ul for unordered items, ol when order matters</Text>
            <Text>Every img needs src, alt, width, and height</Text>
            <Text>Choose format wisely: JPG for photos, PNG for logos, SVG for icons</Text>
            <Text>Alt text describes what the image shows — keep it concise</Text>
          </Stack>
          <Divider />
          <H3>Next: Session 4</H3>
          <Text tone="secondary">Using CSS — selectors, colors, fonts, linking external stylesheets to your HTML pages.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
