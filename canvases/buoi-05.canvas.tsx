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
  canvasImage,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 5: layout)
   blue = structure · goldenYellow = attention · green = correct/result
   brightOrange = wrong.  Labels students must read: >= 13px.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const IMG_WIRE = canvasImage("./s5-wireframe.png");

/* ---------- 1. Semantic skeleton vs div soup ---------------------------- */

function SemanticSkeleton({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 256" width="100%" height="256" role="img"
      aria-label="The same page built from semantic elements and from anonymous divs; only the semantic version tells a screen reader what each region is">
      {/* semantic */}
      <text x="14" y="16" fontSize="13" fontWeight="700" fill={t.chart.green}>Semantic — the name IS the meaning</text>
      <rect x="14" y="26" width="256" height="34" rx="5" fill={t.chart.blue} opacity="0.9" />
      <text x="142" y="48" textAnchor="middle" fontSize="14" fontFamily={MONO} fill={ON_FILL}>&lt;header&gt;</text>
      <rect x="14" y="64" width="256" height="26" rx="5" fill={t.chart.blue} opacity="0.7" />
      <text x="142" y="82" textAnchor="middle" fontSize="13" fontFamily={MONO} fill={ON_FILL}>&lt;nav&gt;</text>
      <rect x="14" y="94" width="178" height="94" rx="5" fill={t.chart.green} opacity="0.8" />
      <text x="103" y="126" textAnchor="middle" fontSize="14" fontFamily={MONO} fill={ON_FILL}>&lt;main&gt;</text>
      <rect x="26" y="132" width="154" height="22" rx="3" fill={t.bg.elevated} opacity="0.55" />
      <text x="103" y="147" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={ON_FILL}>&lt;section&gt;</text>
      <rect x="26" y="158" width="154" height="22" rx="3" fill={t.bg.elevated} opacity="0.55" />
      <text x="103" y="173" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={ON_FILL}>&lt;section&gt;</text>
      <rect x="198" y="94" width="72" height="94" rx="5" fill={t.chart.goldenYellow} opacity="0.8" />
      <text x="234" y="138" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={ON_FILL}>&lt;aside&gt;</text>
      <rect x="14" y="192" width="256" height="30" rx="5" fill={t.chart.blue} opacity="0.9" />
      <text x="142" y="212" textAnchor="middle" fontSize="13" fontFamily={MONO} fill={ON_FILL}>&lt;footer&gt;</text>
      <text x="14" y="242" fontSize="11" fill={t.chart.green}>A screen reader can jump straight to main.</text>
      <text x="14" y="254" fontSize="11" fill={t.chart.green}>Google knows which part is the content.</text>

      {/* div soup */}
      <text x="290" y="16" fontSize="12.5" fontWeight="700" fill={t.chart.brightOrange}>Div soup — same look, no meaning</text>
      <rect x="290" y="26" width="256" height="34" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="418" y="48" textAnchor="middle" fontSize="14" fontFamily={MONO} fill={t.text.secondary}>&lt;div class="top"&gt;</text>
      <rect x="290" y="64" width="256" height="26" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="418" y="82" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>&lt;div class="menu"&gt;</text>
      <rect x="290" y="94" width="178" height="94" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="379" y="144" textAnchor="middle" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>&lt;div class="body"&gt;</text>
      <rect x="474" y="94" width="72" height="94" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="510" y="144" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>&lt;div&gt;</text>
      <rect x="290" y="192" width="256" height="30" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="418" y="212" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>&lt;div class="bottom"&gt;</text>
      <text x="290" y="242" fontSize="11" fill={t.chart.brightOrange}>Screen readers see five unnamed boxes.</text>
      <text x="290" y="254" fontSize="11" fill={t.chart.brightOrange}>Class names carry no meaning for them.</text>
    </svg>
  );
}

/* ---------- 2. block vs inline vs inline-block --------------------------- */

function DisplayTypes({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 232" width="100%" height="232" role="img"
      aria-label="Block elements take the full line, inline elements sit in the text and ignore width, inline-block sits in the text but accepts width and height">
      {/* block */}
      <rect x="14" y="26" width="172" height="130" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="26" y="20" fontSize="13" fontWeight="700" fontFamily={MONO} fill={t.chart.blue}>display: block</text>
      <rect x="26" y="38" width="148" height="26" rx="4" fill={t.chart.blue} opacity="0.85" />
      <text x="100" y="55" textAnchor="middle" fontSize="11" fill={ON_FILL}>always a full line</text>
      <rect x="26" y="70" width="148" height="26" rx="4" fill={t.chart.blue} opacity="0.6" />
      <text x="100" y="87" textAnchor="middle" fontSize="11" fill={ON_FILL}>next one goes below</text>
      <text x="26" y="118" fontSize="11" fill={t.text.secondary}>width / height: yes</text>
      <text x="26" y="134" fontSize="11" fill={t.text.tertiary}>p, h1, div, header, main</text>
      <text x="26" y="150" fontSize="11" fill={t.text.tertiary}>section, footer, ul, li</text>

      {/* inline */}
      <rect x="196" y="26" width="172" height="130" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="208" y="20" fontSize="13" fontWeight="700" fontFamily={MONO} fill={t.chart.goldenYellow}>display: inline</text>
      <text x="208" y="52" fontSize="11" fill={t.text.secondary}>Join the</text>
      <rect x="256" y="40" width="44" height="16" rx="3" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="278" y="52" textAnchor="middle" fontSize="11.5" fill={ON_FILL}>club</text>
      <text x="304" y="52" fontSize="11" fill={t.text.secondary}>this</text>
      <text x="208" y="70" fontSize="11" fill={t.text.secondary}>week and meet the</text>
      <rect x="208" y="76" width="52" height="16" rx="3" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="234" y="88" textAnchor="middle" fontSize="11.5" fill={ON_FILL}>team</text>
      <text x="266" y="88" fontSize="11" fill={t.text.secondary}>on Friday.</text>
      <text x="208" y="118" fontSize="11" fill={t.chart.brightOrange}>width / height: ignored</text>
      <text x="208" y="134" fontSize="11" fill={t.text.tertiary}>span, a, strong, em, img</text>
      <text x="208" y="150" fontSize="11" fill={t.text.tertiary}>sits inside a line of text</text>

      {/* inline-block */}
      <rect x="378" y="26" width="168" height="130" rx="8" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <text x="390" y="20" fontSize="12" fontWeight="700" fontFamily={MONO} fill={t.chart.green}>display: inline-block</text>
      <rect x="390" y="38" width="46" height="40" rx="4" fill={t.chart.green} opacity="0.85" />
      <rect x="442" y="38" width="46" height="40" rx="4" fill={t.chart.green} opacity="0.85" />
      <rect x="494" y="38" width="46" height="40" rx="4" fill={t.chart.green} opacity="0.85" />
      <text x="465" y="94" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>three in one row, all 46x40</text>
      <text x="390" y="118" fontSize="11" fill={t.chart.green}>width / height: yes</text>
      <text x="390" y="134" fontSize="11" fill={t.text.tertiary}>Set it yourself in CSS.</text>
      <text x="390" y="150" fontSize="11" fill={t.text.tertiary}>Good for nav buttons, cards.</text>

      <text x="14" y="186" fontSize="13" fill={t.text.secondary}>Set width on an inline element? Nothing happens.</text>
      <text x="14" y="204" fontSize="13" fill={t.text.secondary}>Switch to inline-block and width works.</text>
      <text x="14" y="222" fontSize="13" fill={t.text.secondary}>display never changes what the element MEANS.</text>
    </svg>
  );
}

/* ---------- 3. Flex axes, with the two alignment properties ------------- */

function FlexAxesDiagram({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 258" width="100%" height="258" role="img"
      aria-label="justify-content moves items along the main axis, align-items moves them along the cross axis">
      <defs>
        <marker id="s5m" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.goldenYellow} />
        </marker>
        <marker id="s5c" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.green} />
        </marker>
      </defs>

      {/* the container */}
      <rect x="60" y="42" width="330" height="128" rx="8" fill={t.fill.tertiary} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="60" y="34" fontSize="12" fontFamily={MONO} fill={t.text.tertiary}>.container {"{"} display: flex; {"}"}</text>
      <rect x="80" y="72" width="82" height="68" rx="6" fill={t.chart.blue} opacity="0.85" />
      <text x="121" y="111" textAnchor="middle" fontSize="12" fill={ON_FILL}>item 1</text>
      <rect x="174" y="72" width="82" height="68" rx="6" fill={t.chart.blue} opacity="0.7" />
      <text x="215" y="111" textAnchor="middle" fontSize="12" fill={ON_FILL}>item 2</text>
      <rect x="268" y="72" width="82" height="68" rx="6" fill={t.chart.blue} opacity="0.55" />
      <text x="309" y="111" textAnchor="middle" fontSize="12" fill={ON_FILL}>item 3</text>
      <text x="80" y="160" fontSize="11" fill={t.text.tertiary}>only DIRECT children become flex items</text>

      {/* main axis */}
      <line x1="60" y1="188" x2="390" y2="188" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s5m)" />
      <text x="225" y="206" textAnchor="middle" fontSize="13" fontWeight="700" fill={t.chart.goldenYellow}>main axis — justify-content</text>

      {/* cross axis */}
      <line x1="40" y1="42" x2="40" y2="170" stroke={t.chart.green} strokeWidth="2.5" markerEnd="url(#s5c)" />
      <text x="30" y="106" fontSize="13" fontWeight="700" fill={t.chart.green} transform="rotate(-90 30 106)" textAnchor="middle">cross axis — align-items</text>

      {/* cheat sheet */}
      <rect x="406" y="42" width="142" height="128" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="418" y="62" fontSize="12" fontWeight="700" fill={t.chart.goldenYellow}>justify-content</text>
      <text x="418" y="80" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>flex-start</text>
      <text x="418" y="96" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>center</text>
      <text x="418" y="112" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>space-between</text>
      <text x="418" y="134" fontSize="12" fontWeight="700" fill={t.chart.green}>align-items</text>
      <text x="418" y="152" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>center · stretch</text>

      <text x="14" y="232" fontSize="13" fill={t.text.secondary}>Row is default: main axis runs left to right.</text>
      <text x="14" y="250" fontSize="13" fill={t.text.secondary}>Column swaps axes: justify moves items DOWN.</text>
    </svg>
  );
}

export default function Session05Lecture() {
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
        id="s05-title"
        title="Session 5 — Page Layouts"
        notes="Welcome to Session 5. Today we move from single-column stacking to professional two-column layouts using semantic HTML and Flexbox."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 5</Tag>
          <H1>Creating Page Layouts</H1>
          <Text tone="secondary">Semantic HTML5 elements, display types, and Flexbox — building a two-column page skeleton.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s05-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>Learning Objectives</H2>
          <Stack gap={6}>
            <Text>1. Use semantic HTML5 elements (header, nav, main, section, aside, footer)</Text>
            <Text>2. Explain block vs inline vs inline-block display types</Text>
            <Text>3. Create layouts using Flexbox (display: flex)</Text>
            <Text>4. Control alignment with justify-content and align-items</Text>
            <Text>5. Build a complete two-column layout (main + sidebar)</Text>
            <Text>6. Wrap a page in a centred container with max-width</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s05-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">0:00–0:10</Tag><Text>Welcome, objectives, and warm-up recap</Text></Row>
            <Row gap={8}><Tag tone="info">0:10–0:20</Tag><Text>Recap: What did we learn in Session 4?</Text></Row>
            <Row gap={8}><Tag tone="primary">0:20–0:50</Tag><Text>Semantic HTML5 elements + live demo</Text></Row>
            <Row gap={8}><Tag tone="primary">0:50–1:10</Tag><Text>Display types &amp; box model property table</Text></Row>
            <Row gap={8}><Tag tone="primary">1:10–1:40</Tag><Text>Flexbox basics, axes, worked examples</Text></Row>
            <Row gap={8}><Tag tone="success">1:40–2:20</Tag><Text>In-class practice (exercises/session-05)</Text></Row>
            <Row gap={8}><Tag tone="warning">2:20–2:30</Tag><Text>Homework briefing + recap + next session</Text></Row>
          </Stack>
          <Callout tone="info">
            Theory ~60 min · Practice ~80 min · Wrap-up ~10 min
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s05-warmup" title="Warm-Up: Session 4 Recap">
        <Stack gap={12}>
          <H2>Quick Check — What Do You Remember?</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What are the three ways to add CSS to an HTML page?</Callout>
            <Callout tone="info">Q2: Which selector has higher specificity: .card or #sidebar?</Callout>
            <Callout tone="info">Q3: In the box model, what comes between content and border?</Callout>
            <Callout tone="info">Q4: Why do we use box-sizing: border-box?</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: Semantic HTML ─────────────────────────────── */}
      <PresentationSlide id="s05-semantic" title="Semantic HTML5">
        <Stack gap={12}>
          <H2>Semantic HTML5 Elements</H2>
          <Text>The two pages below look identical in the browser. Only one of them can be understood by a screen reader or a search engine.</Text>
          <SemanticSkeleton t={t} />
          <Callout tone="info">
            Replace &lt;div id="header"&gt; with &lt;header&gt;. The element name IS the meaning.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5b: Draw Before You Code ─────────────────────── */}
      <PresentationSlide
        id="s05-draw-first"
        title="Draw Before You Code"
        notes="A wireframe is just a quick sketch of boxes on paper. Each box becomes one div or semantic element. Professionals always sketch first because it saves an hour of rewriting CSS later. For the CodeBreakers site, draw five boxes: header across the top, nav strip below, big content box on the left, smaller sidebar on the right, footer across the bottom."
        background={{ pattern: "grid", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>Draw Before You Code</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <img src={IMG_WIRE} alt="A hand-drawn wireframe of a web page with browser bar, content boxes and a dialog" style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.stroke.tertiary}` }} />
              <Text size="small" tone="tertiary">Wireframe: Dereckson — CC BY 3.0, Wikimedia Commons</Text>
            </Stack>
            <Stack gap={6}>
              <Text>A <Text as="span" tone="primary">wireframe</Text> is a sketch of boxes that represent your layout regions.</Text>
              <Text>Professionals sketch on paper <Text as="span" tone="primary">before</Text> writing any code.</Text>
              <Text>Each box you draw becomes one <Text as="span" tone="primary">&lt;div&gt;</Text> or semantic tag (<Text as="span" tone="primary">&lt;header&gt;</Text>, <Text as="span" tone="primary">&lt;nav&gt;</Text>, <Text as="span" tone="primary">&lt;main&gt;</Text>, <Text as="span" tone="primary">&lt;aside&gt;</Text>, <Text as="span" tone="primary">&lt;footer&gt;</Text>).</Text>
              <Text>Sketching first saves an hour of rewriting CSS when you realise the layout is wrong.</Text>
              <Callout tone="info">For CodeBreakers: draw five boxes — header, nav, main content, sidebar, footer.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Semantic Elements Table ───────────────────── */}
      <PresentationSlide id="s05-semantic-table" title="Semantic Element Reference">
        <Stack gap={12}>
          <H2>Semantic HTML5 Quick Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">&lt;header&gt;</Text> — Site title, logo, banner area</Text>
              <Text><Text as="span" tone="primary">&lt;nav&gt;</Text> — Navigation links (menu, breadcrumbs)</Text>
              <Text><Text as="span" tone="primary">&lt;main&gt;</Text> — Primary page content (one per page!)</Text>
              <Text><Text as="span" tone="primary">&lt;section&gt;</Text> — Thematic group with a heading</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">&lt;article&gt;</Text> — Self-contained content (blog post)</Text>
              <Text><Text as="span" tone="primary">&lt;aside&gt;</Text> — Sidebar, tangential content</Text>
              <Text><Text as="span" tone="primary">&lt;footer&gt;</Text> — Copyright, contact info</Text>
            </Stack>
          </Grid>
          <Divider />
          <Stack gap={4}>
            <Text tone="danger">Only ONE &lt;main&gt; per page.</Text>
            <Text tone="danger">Never use &lt;section&gt; as a generic wrapper — that is what &lt;div&gt; is for.</Text>
            <Text tone="danger">&lt;nav&gt; should contain navigation links, not random content.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Why Semantic Matters ──────────────────────── */}
      <PresentationSlide id="s05-why-semantic" title="Why Semantic HTML Matters">
        <Stack gap={12}>
          <H2>Three Reasons to Go Semantic</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Tag tone="success">Accessibility</Tag>
              <Text tone="secondary">Screen readers announce "navigation region" at &lt;nav&gt;, helping blind users navigate quickly.</Text>
            </Stack>
            <Stack gap={4}>
              <Tag tone="success">SEO</Tag>
              <Text tone="secondary">Search engines give more weight to content inside &lt;main&gt; and &lt;article&gt;.</Text>
            </Stack>
            <Stack gap={4}>
              <Tag tone="success">Maintainability</Tag>
              <Text tone="secondary">When you read &lt;header&gt;, you know what it is. No guessing from class names.</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text tone="secondary">Both pages render identically with CSS. But only the semantic version communicates structure to assistive technology and search engines.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7b: Region → Tag → CSS ─────────────────────── */}
      <PresentationSlide
        id="s05-region-tag-css"
        title="Region to Tag to CSS"
        notes="This table is your cheat sheet for the CodeBreakers layout. The wrapper div centres everything at max-width 1000px with margin 0 auto. Header spans full width inside the wrapper. Nav is a full-width strip below header. Main content floats left or uses flex:3 for roughly 70-75 percent width. Sidebar floats right or uses flex:1 for roughly 25-30 percent. Footer uses clear both in float layouts so it drops below both columns; in flexbox it just stacks naturally."
        background={{ pattern: "dots", accent: t.chart.goldenYellow }}
      >
        <Stack gap={12}>
          <H2>Region → Tag → CSS That Shapes It</H2>
          <Text tone="secondary">The five regions of the classic CodeBreakers layout and the CSS that sizes each one.</Text>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={8}>
            <Stack gap={2}>
              <Tag tone="info">Region</Tag>
              <Text><Text as="span" tone="primary">Header</Text></Text>
              <Text><Text as="span" tone="primary">Nav bar</Text></Text>
              <Text><Text as="span" tone="primary">Main content</Text></Text>
              <Text><Text as="span" tone="primary">Sidebar</Text></Text>
              <Text><Text as="span" tone="primary">Footer</Text></Text>
            </Stack>
            <Stack gap={2}>
              <Tag tone="info">HTML tag / id</Tag>
              <Text><Text as="span" tone="primary">&lt;header&gt;</Text> (#header)</Text>
              <Text><Text as="span" tone="primary">&lt;nav&gt;</Text> (#nav)</Text>
              <Text><Text as="span" tone="primary">&lt;main&gt;</Text> (#content)</Text>
              <Text><Text as="span" tone="primary">&lt;aside&gt;</Text> (#sidebar)</Text>
              <Text><Text as="span" tone="primary">&lt;footer&gt;</Text> (#footer)</Text>
            </Stack>
            <Stack gap={2}>
              <Tag tone="info">CSS that shapes it</Tag>
              <Text>width 100%, height, background</Text>
              <Text>float left or full-width strip</Text>
              <Text>width ~70%, float left (or flex: 3)</Text>
              <Text>width ~30%, float right (or flex: 1)</Text>
              <Text>clear: both, full width</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">
            In float layouts the footer needs <Text as="span" tone="primary">clear: both</Text> so it drops below both columns. In Flexbox this happens automatically.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Display Types ─────────────────────────────── */}
      <PresentationSlide id="s05-display" title="Display Types">
        <Stack gap={12}>
          <H2>Block, Inline, and Inline-Block</H2>
          <DisplayTypes t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Box Model Property Table ──────────────────── */}
      <PresentationSlide id="s05-box-model-table" title="Box Model Properties">
        <Stack gap={12}>
          <H2>Box Model Property Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <H3>Four Layers (inside out)</H3>
              <Text><Text as="span" tone="primary">Content</Text> — text, images, child elements</Text>
              <Text><Text as="span" tone="primary">Padding</Text> — space between content and border</Text>
              <Text><Text as="span" tone="primary">Border</Text> — visible line around padding</Text>
              <Text><Text as="span" tone="primary">Margin</Text> — space outside border, separates elements</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Key Properties</H3>
              <Text><Text as="span" tone="primary">box-sizing: border-box</Text> — padding+border count inside width</Text>
              <Text><Text as="span" tone="primary">margin: 0 auto</Text> — centres a block with defined width</Text>
              <Text><Text as="span" tone="primary">max-width</Text> — limits element width, shrinks on small screens</Text>
              <Text><Text as="span" tone="primary">min-height: 100vh</Text> — at least full viewport height</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">
            Without border-box, adding padding to a 70% column makes it wider than 70%. Always set * {"{"} box-sizing: border-box; {"}"} globally.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Flexbox Basics ────────────────────────────── */}
      <PresentationSlide id="s05-flexbox" title="Flexbox Basics">
        <Stack gap={12}>
          <H2>Flexbox — One-Dimensional Layout</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <FlexAxesDiagram t={t} />
            <Stack gap={6}>
              <Text>Apply display: flex to the parent container.</Text>
              <Text><Text as="span" tone="primary">Main axis</Text> — direction items flow (row by default).</Text>
              <Text><Text as="span" tone="primary">Cross axis</Text> — perpendicular to main axis.</Text>
              <Text><Text as="span" tone="primary">Flex items</Text> — only direct children are affected.</Text>
            </Stack>
          </Grid>
          <Code language="css">{`main {\n  display: flex;   /* activates flexbox on children */\n}`}</Code>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Flex Properties ───────────────────────────── */}
      <PresentationSlide id="s05-flex-properties" title="Key Flex Properties">
        <Stack gap={12}>
          <H2>Container &amp; Item Properties</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <H3>Container</H3>
              <Text>justify-content — main axis alignment</Text>
              <Text>align-items — cross axis alignment</Text>
              <Text>flex-direction — row | column</Text>
              <Text>flex-wrap — nowrap | wrap</Text>
              <Text>gap — space between items</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Item</H3>
              <Text>flex-grow — grow ratio relative to siblings</Text>
              <Text>flex-shrink — shrink when space is tight</Text>
              <Text>flex-basis — starting size before grow/shrink</Text>
              <Text>Shorthand: flex: grow shrink basis</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Quick Check ───────────────────────────────── */}
      <PresentationSlide id="s05-quick-check" title="Quick Check">
        <Stack gap={12}>
          <H2>Discussion: Think About It</H2>
          <Stack gap={8}>
            <Callout tone="info">If main {`{`} flex: 3 {`}`} and aside {`{`} flex: 1 {`}`}, what percentage of width does each get?</Callout>
            <Callout tone="info">What happens if you put display: flex on the child instead of the parent?</Callout>
            <Callout tone="info">Which property controls horizontal alignment in a row-direction flex container: justify-content or align-items?</Callout>
          </Stack>
          <Text tone="secondary">Raise your hand when you have an answer. We will discuss together.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Worked Example 1 ──────────────────────────── */}
      {/* ── Try It Now: Flexbox ───────────────────────────────── */}
      <PresentationSlide id="s05-try-flexbox" title="Try It Now: Build a Flex Layout" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — create a two-column layout</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into layout.html</Text>
              <Code language="html">{`<div class="container">
  <header>My Club</header>
  <div class="content">
    <main>
      <h2>Welcome</h2>
      <p>Main content goes here.</p>
    </main>
    <aside>
      <h3>Sidebar</h3>
      <p>Links and info.</p>
    </aside>
  </div>
  <footer>© 2025 My Club</footer>
</div>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then add this CSS</Text>
              <Code language="css">{`.container {
  max-width: 1200px;
  margin: 0 auto;
}

.content {
  display: flex;
  gap: 20px;
}

main { flex: 3; }
aside { flex: 1; }`}</Code>
              <Callout tone="info">The main area should be 3x wider than the sidebar. If they are equal width, check that flex: 3 and flex: 1 are set correctly.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s05-code-example" title="Worked Example: Two-Column Layout">
        <Stack gap={10}>
          <H2>Worked Example: Semantic Layout with Flexbox</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="html">{`<!-- index.html -->
<header>
  <h1>Student Technology Club</h1>
</header>
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>
<main>
  <section>
    <h2>Welcome</h2>
    <p>Club content here...</p>
  </section>
  <aside>
    <h3>Quick Links</h3>
    <ul><li><a href="#">Calendar</a></li></ul>
  </aside>
</main>
<footer>&copy; 2025 Student Tech Club</footer>`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>What each part does:</Text>
              <Text>&lt;header&gt; — site title at the top (block, full width).</Text>
              <Text>&lt;nav&gt; — horizontal link bar below header.</Text>
              <Text>&lt;main display:flex&gt; — makes section + aside sit side by side.</Text>
              <Text>&lt;section&gt; — main articles area (grows to fill space).</Text>
              <Text>&lt;aside flex:1&gt; — sidebar takes remaining width.</Text>
              <Text>&lt;footer&gt; — copyright at the bottom.</Text>
              <Divider />
              <Text tone="secondary">No wrapper div needed! display:flex goes directly on &lt;main&gt;.</Text>
            </Stack>
          </Grid>
          <Code language="css">{`main { padding: 20px; max-width: 960px; margin: 0 auto;
       display: flex; gap: 20px; }
aside { background-color: #ecf0f1; padding: 15px;
        border-radius: 4px; flex: 1; }`}</Code>
          <Callout tone="success">
            In the browser: dark header on top, nav bar below, then section (left) and aside (right) side by side, footer at bottom. Resize the window — columns adjust automatically.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Worked Example 2 ──────────────────────────── */}
      <PresentationSlide id="s05-worked-example-2" title="Worked Example: Horizontal Nav Bar">
        <Stack gap={10}>
          <H2>Worked Example: Horizontal Navigation with Flexbox</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="css">{`nav ul {
  list-style: none;
  margin: 0; padding: 0;
  display: flex;
  justify-content: center;
  background-color: #2874a6;
}
nav ul li a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  transition: background-color 0.3s;
}
nav ul li a:hover {
  background-color: #1a5276;
}`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>Line-by-line:</Text>
              <Text><Text as="span" tone="success">list-style: none</Text> — removes bullet points from &lt;ul&gt;.</Text>
              <Text><Text as="span" tone="success">display: flex</Text> on &lt;ul&gt; — list items sit in a row.</Text>
              <Text><Text as="span" tone="success">justify-content: center</Text> — centres nav links in the bar.</Text>
              <Text><Text as="span" tone="success">display: block</Text> on &lt;a&gt; — entire padding area clickable.</Text>
              <Text><Text as="span" tone="success">transition</Text> — smooth 0.3s colour animation on hover.</Text>
              <Divider />
              <Text tone="secondary">Result: Centred horizontal nav bar with smooth hover effects.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14b: Three Layout Patterns ─────────────────── */}
      <PresentationSlide
        id="s05-three-patterns"
        title="Three Layout Patterns"
        notes="Pattern one is a single centred column — just a wrapper with max-width and no sidebar. Good for simple pages like a notice or announcement. Pattern two is the classic header plus two columns plus footer — this is what we use for most CodeBreakers pages. Pattern three stacks full-width strips vertically, which gives a modern landing-page look. Pick pattern two as your default; switch to one or three only when the content fits better."
        background={{ pattern: "grid", accent: t.chart.green }}
      >
        <Stack gap={12}>
          <H2>Three Layout Patterns</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Tag tone="info">1. Single Column</Tag>
              <Code language="css">{`.wrapper {\n  max-width: 700px;\n  margin: 0 auto;\n}`}</Code>
              <Text>Simplest layout. One centred column of content.</Text>
              <Text tone="secondary">Good for: notices page, short announcements.</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="success">2. Two Columns (our standard)</Tag>
              <Code language="css">{`.page-body {\n  display: flex;\n}\nmain { flex: 3; }\naside { flex: 1; }`}</Code>
              <Text>Header + nav + main beside sidebar + footer.</Text>
              <Text tone="secondary">Good for: most CodeBreakers club pages.</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="warning">3. Full-Width Strips</Tag>
              <Code language="css">{`section {\n  width: 100%;\n  padding: 40px 0;\n}`}</Code>
              <Text>Stacked horizontal bands, each full width.</Text>
              <Text tone="secondary">Good for: modern landing page look.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Start with pattern 2 for your capstone. You can mix in pattern 1 for simple sub-pages later.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Common Mistakes ───────────────────────────── */}
      <PresentationSlide id="s05-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>Common Mistakes (and How to Fix Them)</H2>
          <Stack gap={6}>
            <Callout tone="danger">Putting display: flex on the child instead of the parent container. FIX: Put it on the PARENT.</Callout>
            <Callout tone="danger">Forgetting that only direct children are flex items — grandchildren are unaffected. FIX: Target the right level.</Callout>
            <Callout tone="danger">Fixed widths + padding exceeding container — overflow! FIX: Use flex ratios or border-box.</Callout>
            <Callout tone="danger">Using &lt;div&gt; when a semantic element exists. FIX: Use &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;aside&gt;, &lt;footer&gt;.</Callout>
            <Callout tone="danger">Confusing justify-content (main axis) with align-items (cross axis). FIX: justify = horizontal (in row), align = vertical.</Callout>
            <Callout tone="danger">Sidebar drops below main content. FIX: Use flex: 3 / flex: 1 ratios instead of fixed percentages + padding.</Callout>
            <Callout tone="danger">Forgetting box-sizing: border-box globally. FIX: Add * {"{"} box-sizing: border-box; {"}"} at top of CSS.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 16: Summary Table ─────────────────────────────── */}
      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s05-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This layout has three bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy CSS</Text>
              <Code language="css">{`.container {
  display: flex;
  flex-direction: row;
}

.main {
  flex: 3;
}

.sidebar {
  flex: 1;
}

footer {
  background-color: #333;
  color: white;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. No max-width on .container — on wide screens, content stretches edge to edge. Add max-width: 1200px and margin: 0 auto.</Text>
              <Text tone="danger">2. No gap or padding between .main and .sidebar — text touches the edge. Add gap: 20px to the flex container.</Text>
              <Text tone="danger">3. footer is outside the flex container — it will not respect the flex layout. Move it inside .container or use a separate flex row.</Text>
              <Callout tone="info">Inspect the layout in DevTools — the flex container should show the main and sidebar as flex items.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s05-summary-table" title="Session 5 Summary">
        <Stack gap={12}>
          <H2>Concept Summary Table</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">Semantic HTML</Text> — Elements that describe their meaning</Text>
              <Text><Text as="span" tone="primary">display: block</Text> — Full width, new line, accepts dimensions</Text>
              <Text><Text as="span" tone="primary">display: inline</Text> — Content width, no line break, no dimensions</Text>
              <Text><Text as="span" tone="primary">display: flex</Text> — Activates Flexbox on container</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">justify-content</Text> — Main axis alignment</Text>
              <Text><Text as="span" tone="primary">align-items</Text> — Cross axis alignment</Text>
              <Text><Text as="span" tone="primary">flex: 3 / flex: 1</Text> — Proportional column widths</Text>
              <Text><Text as="span" tone="primary">Wrapper</Text> — max-width + margin: 0 auto for centring</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Float vs Flexbox ──────────────────────────── */}
      <PresentationSlide id="s05-float-vs-flex" title="Float vs Flexbox">
        <Stack gap={12}>
          <H2>Legacy Knowledge: Float vs Flexbox</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <H3>Float (Legacy)</H3>
              <Text tone="secondary">Originally for wrapping text around images.</Text>
              <Text tone="secondary">Vertical alignment: difficult.</Text>
              <Text tone="secondary">Equal height columns: requires hacks.</Text>
              <Text tone="secondary">Requires clearfix on parent.</Text>
              <Text tone="danger">Not recommended for new projects.</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Flexbox (Modern)</H3>
              <Text tone="secondary">Designed specifically for layout.</Text>
              <Text tone="secondary">Vertical alignment: easy (align-items).</Text>
              <Text tone="secondary">Equal height columns: automatic.</Text>
              <Text tone="secondary">gap property replaces margin hacks.</Text>
              <Text tone="success">Use this for all new layouts.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">
            Learn floats only so you can read older code and Dreamweaver templates. Always use Flexbox for new work.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Sticky Footer Pattern ─────────────────────── */}
      <PresentationSlide id="s05-sticky-footer" title="Worked Example: Sticky Footer">
        <Stack gap={10}>
          <H2>Bonus Pattern: Sticky Footer with Flexbox</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="css">{`.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-body {
  flex: 1;          /* grows to fill space */
  display: flex;    /* nested flexbox! */
}`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>How it works:</Text>
              <Text><Text as="span" tone="success">flex-direction: column</Text> — wrapper stacks header, nav, page-body, footer vertically.</Text>
              <Text><Text as="span" tone="success">min-height: 100vh</Text> — wrapper is at least viewport height.</Text>
              <Text><Text as="span" tone="success">page-body flex: 1</Text> — grows to fill remaining vertical space, pushing footer down.</Text>
              <Text><Text as="span" tone="success">Nested flexbox</Text> — page-body is ALSO a horizontal flex container for main + aside.</Text>
              <Divider />
              <Text tone="secondary">Result: Footer always at bottom, even with short content. No JavaScript needed.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Self-Assessment ───────────────────────────── */}
      <PresentationSlide id="s05-self-assess" title="Self-Assessment">
        <Stack gap={12}>
          <H2>Check Your Understanding</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={8}>
            <Stack gap={3}>
              <Text>1. Name five semantic HTML5 elements</Text>
              <Text>2. Explain block vs inline display</Text>
              <Text>3. Activate Flexbox on a container</Text>
              <Text>4. Use justify-content correctly</Text>
            </Stack>
            <Stack gap={3}>
              <Text>5. Use align-items correctly</Text>
              <Text>6. Create two-column layout with flex ratios</Text>
              <Text>7. Centre a wrapper with max-width + margin: 0 auto</Text>
              <Text>8. Explain why Flexbox beats floats</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text tone="secondary">If you answered "No" to any item, re-read that section in ebook chapter 5 and redo the corresponding practice task.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19b: Self-Study Check ───────────────────────── */}
      <PresentationSlide
        id="s05-self-check"
        title="Self-Study Check"
        notes="Answer key: 1. float: left (or flexbox display:flex on the parent). 2. clear: both prevents the footer from sliding up beside floated columns — it forces the footer below all floats. 3. Roughly 70% (the remaining width after sidebar takes 30%). 4. To centre the page on wide screens and prevent content from stretching edge to edge — max-width plus margin 0 auto. 5. Header, navigation bar, main content, sidebar, footer."
      >
        <Stack gap={12}>
          <H2>Self-Study Check</H2>
          <Text tone="secondary">Answer these five questions before moving to practice. Answers are in the speaker notes.</Text>
          <Stack gap={6}>
            <Callout tone="info">1. Which CSS property moves a region to the left side of the page?</Callout>
            <Callout tone="info">2. What does <Text as="span" tone="primary">clear: both</Text> on the footer prevent?</Callout>
            <Callout tone="info">3. If the sidebar is 30% wide, what width should main content be (roughly)?</Callout>
            <Callout tone="info">4. Why wrap all regions in one centred container div?</Callout>
            <Callout tone="info">5. Name the five regions of the classic layout.</Callout>
          </Stack>
          <Divider />
          <Text tone="tertiary">Stuck? Re-read the Region → Tag → CSS slide or ebook section 4.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Practice ──────────────────────────────────── */}
      <PresentationSlide id="s05-practice" title="Hands-On Practice">
        <Stack gap={12}>
          <H2>In-Class Practice (≈ 55 min)</H2>
          <Text>Open exercises/session-05/exercise.md in your project folder.</Text>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="success">Task 1</Tag><Text>Learn About Semantic HTML</Text></Row>
            <Row gap={8}><Tag tone="success">Task 2</Tag><Text>Fill In the Layout Structure</Text></Row>
            <Row gap={8}><Tag tone="success">Task 3</Tag><Text>Understand the Box Model</Text></Row>
            <Row gap={8}><Tag tone="success">Task 4</Tag><Text>Update index.html with the Same Structure</Text></Row>
          </Stack>
          <Divider />
          <Text tone="secondary">Create layout.html with semantic elements, add CSS box-model rules, then update index.html to share the same structure.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s05-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>You can name 5 semantic HTML5 elements and explain when to use each one.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Your layout.html has header, nav, main, aside, and footer — all visible in the browser.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Open DevTools → inspect the box model — you can see margin, border, padding, and content for each element.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>Your index.html shares the same semantic structure as layout.html.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If the layout looks like a wall of text, check that you added display: flex to the parent container.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s05-assignment" title="Assignment: Semantic Layout">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>A semantic page layout for your Student Club Website.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>&lt;header&gt; with club name and logo.</Text>
              <Text>&lt;nav&gt; with horizontal links (Home, About, Contact).</Text>
              <Text>&lt;main&gt; with centered content (max-width + margin: auto).</Text>
              <Text>&lt;footer&gt; with copyright text.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Right-click → Inspect — do you see semantic tags (not just div)?</Text>
              <Text>Resize the browser — does the layout hold at different widths?</Text>
              <Text>Validate HTML at validator.w3.org.</Text>
              <Callout tone="warning">Using &lt;div&gt; for everything loses marks. Use semantic elements: header, nav, main, aside, footer.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s05-do-dont" title="Layout: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use header, nav, main, section, article, footer</Text>
              <Text>Reach for Flexbox for one-dimensional layout</Text>
              <Text>Set box-sizing: border-box once, globally</Text>
              <Text>Sketch the layout on paper before writing CSS</Text>
              <Text>Use gap for spacing between flex children</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Wrap everything in &lt;div&gt; when a semantic tag exists</Text>
              <Text>Use &lt;table&gt; or float for page layout</Text>
              <Text>Put more than one &lt;main&gt; on a page</Text>
              <Text>Fight the box model with negative margins</Text>
              <Text>Add margin to every child instead of gap on the parent</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility: Landmarks ──────────────────────────── */}
      <PresentationSlide id="s05-accessibility" title="Semantic Tags Are Accessibility Landmarks">
        <Stack gap={12}>
          <H2>Why the Tag Name Matters to a Screen Reader</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>banner</Pill><Text>&lt;header&gt; becomes the banner landmark — the user can jump straight to it.</Text></Row>
            <Row gap={8}><Pill>navigation</Pill><Text>&lt;nav&gt; becomes the navigation landmark. Screen readers list all landmarks so users can skip to the menu.</Text></Row>
            <Row gap={8}><Pill>main</Pill><Text>&lt;main&gt; is the &quot;skip to content&quot; target. One per page, wrapping the unique content only.</Text></Row>
            <Row gap={8}><Pill>contentinfo</Pill><Text>&lt;footer&gt; becomes contentinfo — where users expect contact details and copyright.</Text></Row>
            <Row gap={8}><Pill>region</Pill><Text>&lt;section&gt; with a heading becomes a navigable region. Without a heading it is just a div with extra steps.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="warning">A page built entirely from &lt;div&gt; has zero landmarks. A screen reader user must read it top to bottom with no way to skip.</Callout>
        </Stack>
      </PresentationSlide>



      {/* ── Slide 18: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s05-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 5 — Page Layout with Semantic HTML</H2>
          <Text>See homework/session-05/homework.md for full requirements.</Text>
          <Stack gap={6}>
            <Text>Build a page layout for project/index.html using semantic HTML elements:</Text>
            <Text>&lt;header&gt; (club name), &lt;nav&gt; (Home, About, Contact), &lt;main&gt; (content), &lt;footer&gt; (copyright).</Text>
            <Text>Style the layout with CSS: header background/color/padding, horizontal nav links, centered main content with max-width, styled footer.</Text>
            <Text>General cleanup: remove default body margins, full-width layout.</Text>
          </Stack>
          <Callout tone="warning">
            Due Sunday 23:59. Submit via git push.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Recap & Next ─────────────────────────────── */}
      <PresentationSlide id="s05-recap" title="Recap & Next">
        <Stack gap={12}>
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>Semantic HTML gives meaning: header, nav, main, aside, footer.</Text>
            <Text>Block elements stack vertically; inline elements flow within text.</Text>
            <Text>Flexbox arranges items in one dimension — row or column.</Text>
            <Text>justify-content = main axis, align-items = cross axis.</Text>
            <Text>Use flex ratios (flex: 3 / flex: 1) for proportional columns.</Text>
          </Stack>
          <Divider />
          <H3>Next Session</H3>
          <Text tone="secondary">Session 6: Multi-page sites and navigation — building About, Events, Gallery, and Contact pages with active-class highlighting and shared CSS.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
