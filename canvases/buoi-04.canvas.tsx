import {
  Grid,
  H1,
  H2,
  H3,
  Presentation,
  PresentationSlide,
  Stack,
  Row,
  Tag,
  Pill,
  Code,
  Text,
  Callout,
  Divider,
  Table,
  useHostTheme,
  canvasImage,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 4: CSS)
   blue = structure · goldenYellow = attention · green = correct/result
   brightOrange = wrong.  Labels students must read: >= 13px.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const IMG_CSS = canvasImage("./s4-css.jpg");

/* ---------- 1. The parts of one CSS rule -------------------------------- */

function RuleAnatomy({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 218" width="100%" height="218" role="img"
      aria-label="A CSS rule is a selector followed by a declaration block; each declaration is a property, a colon, a value and a semicolon">
      {/* rule */}
      <rect x="14" y="40" width="106" height="36" rx="6" fill={t.chart.blue} opacity="0.9" />
      <text x="67" y="64" textAnchor="middle" fontSize="18" fontFamily={MONO} fill={ON_FILL}>p.intro</text>
      <text x="130" y="64" fontSize="18" fontFamily={MONO} fill={t.text.secondary}>{"{"}</text>
      <rect x="152" y="40" width="128" height="36" rx="6" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="216" y="64" textAnchor="middle" fontSize="16" fontFamily={MONO} fill={ON_FILL}>font-size</text>
      <text x="288" y="64" fontSize="18" fontFamily={MONO} fill={t.text.secondary}>:</text>
      <rect x="302" y="40" width="82" height="36" rx="6" fill={t.chart.green} opacity="0.9" />
      <text x="343" y="64" textAnchor="middle" fontSize="16" fontFamily={MONO} fill={ON_FILL}>18px</text>
      <text x="392" y="64" fontSize="18" fontFamily={MONO} fill={t.chart.brightOrange}>;</text>
      <text x="410" y="64" fontSize="18" fontFamily={MONO} fill={t.text.secondary}>{"}"}</text>

      {/* brackets */}
      <path d="M126,84 L126,94 L430,94 L430,84" fill="none" stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="278" y="110" textAnchor="middle" fontSize="13" fontWeight="600" fill={t.text.secondary}>declaration block — as many lines as you need</text>

      {/* labels */}
      <line x1="67" y1="36" x2="67" y2="24" stroke={t.stroke.tertiary} />
      <text x="67" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill={t.chart.blue}>selector</text>
      <line x1="216" y1="36" x2="216" y2="24" stroke={t.stroke.tertiary} />
      <text x="216" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill={t.chart.goldenYellow}>property</text>
      <line x1="343" y1="36" x2="343" y2="24" stroke={t.stroke.tertiary} />
      <text x="343" y="18" textAnchor="middle" fontSize="13" fontWeight="700" fill={t.chart.green}>value</text>

      {/* what it means, in words */}
      <rect x="14" y="126" width="252" height="78" rx="8" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
      <text x="26" y="148" fontSize="13" fontWeight="700" fill={t.text.primary}>Read it out loud:</text>
      <text x="26" y="170" fontSize="12" fill={t.text.secondary}>"Find every p that has class intro,</text>
      <text x="26" y="188" fontSize="12" fill={t.text.secondary}>and set its font size to 18 pixels."</text>

      <rect x="282" y="126" width="266" height="78" rx="8" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="294" y="148" fontSize="13" fontWeight="700" fill={t.chart.brightOrange}>Miss the semicolon</text>
      <text x="294" y="170" fontSize="12" fill={t.text.secondary}>and the browser silently drops that</text>
      <text x="294" y="188" fontSize="12" fill={t.text.secondary}>line AND the next one silently.</text>
    </svg>
  );
}

/* ---------- 2. The box model, with the arithmetic ----------------------- */

function BoxModelDiagram({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 264" width="100%" height="264" role="img"
      aria-label="Concentric layers: content, padding, border, margin, and how they add up to the total width">
      {/* margin */}
      <rect x="14" y="14" width="300" height="196" rx="6" fill={t.chart.goldenYellow} opacity="0.18" stroke={t.chart.goldenYellow} strokeDasharray="5 4" />
      <text x="24" y="30" fontSize="12" fontWeight="700" fill={t.chart.goldenYellow}>margin  20px</text>
      {/* border */}
      <rect x="54" y="46" width="220" height="132" rx="4" fill="none" stroke={t.text.secondary} strokeWidth="8" />
      <text x="64" y="42" fontSize="12" fontWeight="700" fill={t.text.secondary}>border  4px</text>
      {/* padding */}
      <rect x="62" y="54" width="204" height="116" fill={t.chart.green} opacity="0.22" />
      <text x="72" y="72" fontSize="12" fontWeight="700" fill={t.chart.green}>padding  16px</text>
      {/* content */}
      <rect x="96" y="82" width="136" height="60" rx="3" fill={t.chart.blue} opacity="0.85" />
      <text x="164" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill={ON_FILL}>content</text>
      <text x="164" y="126" textAnchor="middle" fontSize="12" fill={ON_FILL}>width: 200px</text>

      {/* dimension line */}
      <line x1="96" y1="196" x2="232" y2="196" stroke={t.chart.blue} strokeWidth="1.5" />
      <text x="164" y="192" textAnchor="middle" fontSize="11" fill={t.chart.blue}>200</text>

      {/* arithmetic */}
      <rect x="330" y="14" width="216" height="112" rx="8" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="342" y="34" fontSize="13" fontWeight="700" fill={t.chart.brightOrange}>Default: content-box</text>
      <text x="342" y="56" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>200 content</text>
      <text x="342" y="72" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>+ 32 padding (16 each side)</text>
      <text x="342" y="88" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>+  8 border (4 each side)</text>
      <line x1="342" y1="96" x2="534" y2="96" stroke={t.stroke.tertiary} />
      <text x="342" y="114" fontSize="13" fontFamily={MONO} fontWeight="700" fill={t.chart.brightOrange}>= 240px on screen</text>

      <rect x="330" y="136" width="216" height="112" rx="8" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <text x="342" y="156" fontSize="13" fontWeight="700" fill={t.chart.green}>Fix: border-box</text>
      <text x="342" y="178" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>*{"{"}box-sizing:border-box;{"}"}</text>
      <text x="342" y="200" fontSize="12" fill={t.text.secondary}>Now width: 200px means</text>
      <text x="342" y="216" fontSize="12" fill={t.text.secondary}>200px on screen — padding and</text>
      <text x="342" y="232" fontSize="12" fill={t.text.secondary}>border grow inwards instead.</text>

      <text x="14" y="232" fontSize="12" fill={t.text.tertiary}>Padding is inside the border,</text>
      <text x="14" y="248" fontSize="12" fill={t.text.tertiary}>margin is outside it. Margin never gets a background colour.</text>
    </svg>
  );
}

/* ---------- 3. Specificity as a weighing scale -------------------------- */

function SpecificityScale({ t }: { t: CanvasTokens }) {
  const tier = (y: number, w: number, score: string, code: string, weight: string, fill: string) => (
    <g key={y}>
      <rect x="14" y={y} width={w} height="34" rx="6" fill={fill} opacity="0.9" />
      <text x="26" y={y + 22} fontSize="13" fontFamily={MONO} fill={ON_FILL}>{code}</text>
      <text x={w + 26} y={y + 22} fontSize="12" fontFamily={MONO} fill={t.text.secondary}>{score}</text>
      <text x={w + 96} y={y + 22} fontSize="12" fill={t.text.tertiary}>{weight}</text>
    </g>
  );
  return (
    /* The two notes sit under the ladder, not beside it: the widest bar plus its
       score and plain-English weight already reach about x=518, so a right-hand
       column would land on top of the "#header" row. */
    <svg viewBox="0 0 560 356" width="100%" height="356" role="img"
      aria-label="Specificity ladder from element selectors up to inline styles, and the rule that decides a tie">
      <text x="14" y="16" fontSize="12" fontWeight="700" fill={t.text.tertiary}>WEAKEST</text>
      {tier(24, 96, "(0,0,1)", "p", "one element", t.chart.blue)}
      {tier(64, 150, "(0,1,0)", ".intro", "one class", t.chart.blue)}
      {tier(104, 206, "(0,1,1)", "p.intro", "class + element", t.chart.goldenYellow)}
      {tier(144, 262, "(1,0,0)", "#header", "an id — hard to override", t.chart.brightOrange)}
      <text x="14" y="200" fontSize="12" fontWeight="700" fill={t.text.tertiary}>STRONGEST</text>

      <text x="14" y="228" fontSize="13" fill={t.text.secondary}>Count ids, then classes, then elements.</text>
      <text x="14" y="244" fontSize="13" fill={t.text.secondary}>First column that differs decides it.</text>

      {/* the tie-break */}
      <rect x="6" y="258" width="270" height="92" rx="8" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
      <text x="18" y="278" fontSize="13" fontWeight="700" fill={t.text.primary}>Same score? Last one wins.</text>
      <text x="18" y="300" fontSize="11" fontFamily={MONO} fill={t.text.tertiary}>p{"{"}color:black;{"}"}</text>
      <text x="18" y="318" fontSize="11" fontFamily={MONO} fill={t.chart.green}>p{"{"}color:navy;{"}"} &lt;-- wins</text>
      <text x="18" y="340" fontSize="11" fill={t.text.tertiary}>Order matters only at same score.</text>

      <rect x="286" y="258" width="268" height="92" rx="8" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="298" y="278" fontSize="13" fontWeight="700" fill={t.chart.brightOrange}>Avoid !important</text>
      <text x="298" y="300" fontSize="12" fill={t.text.secondary}>It wins now but blocks fixes</text>
      <text x="298" y="318" fontSize="12" fill={t.text.secondary}>later. Add a class instead,</text>
      <text x="298" y="336" fontSize="12" fill={t.text.secondary}>or use a precise selector.</text>
    </svg>
  );
}

export default function Session04Lecture() {
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
        id="s04-title"
        title="Session 4 — Applying CSS"
        notes="Welcome to Session 4. Today we add colour, fonts, and spacing to our HTML skeleton using CSS."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 4 · 150 min</Tag>
          <H1>Applying CSS to Your Website</H1>
          <Text tone="secondary">Selectors, colours, fonts, the box model, and specificity — painting your HTML skeleton.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s04-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>Learning Objectives</H2>
          <Stack gap={6}>
            <Text>1. Explain what CSS is and why it is separate from HTML</Text>
            <Text>2. Link an external stylesheet to any HTML page using &lt;link&gt;</Text>
            <Text>3. Write rules with element, class, and ID selectors</Text>
            <Text>4. Apply colour, font-size, margin, and padding</Text>
            <Text>5. Describe the four layers of the CSS box model</Text>
            <Text>6. Predict which rule wins when two rules conflict (specificity)</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s04-agenda" title="Today's 150-Minute Plan">
        <Stack gap={12}>
          <H2>Session timeline</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="info">0 – 10 min</Tag><Text>Welcome &amp; objectives</Text></Row>
              <Row gap={8}><Tag tone="info">10 – 18 min</Tag><Text>Recap of Session 3</Text></Row>
              <Row gap={8}><Tag tone="success">18 – 90 min</Tag><Text>New content + live demos</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="success">90 – 140 min</Tag><Text>In-class practice (Tasks 1–4)</Text></Row>
              <Row gap={8}><Tag tone="warning">140 – 148 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">148 – 150 min</Tag><Text>Recap &amp; next session</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Theory ~60 min · Practice ~90 min. Have css/style.css ready in your project.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Recap of Session 3 ────────────────────────── */}
      <PresentationSlide id="s04-recap-s3" title="Recap: What Did We Learn Last Time?">
        <Stack gap={12}>
          <H2>Quick review — Session 3</H2>
          <Stack gap={8}>
            <Callout tone="info">How many h1 tags per page? (Answer: Exactly one.)</Callout>
            <Callout tone="info">Which tag makes text bold with semantic meaning? (Answer: &lt;strong&gt;)</Callout>
            <Callout tone="info">What four attributes does every img need? (Answer: src, alt, width, height)</Callout>
            <Callout tone="info">Which format for photographs? For logos? (Answer: JPG for photos, SVG/PNG for logos)</Callout>
          </Stack>
          <Text tone="secondary">Your pages have content. Today we make them look good.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: What is CSS? ──────────────────────────────── */}
      <PresentationSlide id="s04-what-is-css" title="What Is CSS?">
        <Stack gap={12}>
          <H2>What Is CSS?</H2>
          <Text>CSS = Cascading Style Sheets. It tells the browser how HTML should look.</Text>
          <Callout tone="info">
            Analogy: HTML = bricks and walls of a house. CSS = paint, wallpaper, and furniture.
          </Callout>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Separation of concerns</Text> — HTML handles meaning; CSS handles looks.</Text>
            <Text><Text as="span" tone="primary">Consistency</Text> — one stylesheet styles every page.</Text>
            <Text><Text as="span" tone="primary">Efficiency</Text> — change one file instead of dozens.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5b: This Is CSS in Real Life ─────────────────── */}
      <PresentationSlide
        id="s04-css-real-life"
        title="This Is CSS in Real Life"
        notes="The coloured lines you see in any code editor ARE CSS rules. Each rule has a selector on the left and declarations inside curly braces. Point out that one external style.css file can restyle every page of the CodeBreakers club site at once — that is the whole point of separating HTML from CSS."
        background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}
      >
        <Stack gap={12}>
          <H2>This Is CSS in Real Life</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={8}>
              <img src={IMG_CSS} alt="A laptop screen showing colored CSS rules in a code editor" style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.stroke.tertiary}` }} />
              <Text size="small" tone="tertiary">Photo: Negative Space — CC0, Wikimedia Commons</Text>
            </Stack>
            <Stack gap={8}>
              <Text>The coloured lines on this screen <Text as="span" tone="primary">are CSS rules</Text>.</Text>
              <Text>Each rule = <Text as="span" tone="primary">selector</Text> + <Text as="span" tone="primary">declarations</Text>.</Text>
              <Text>HTML says <Text as="span" tone="primary">WHAT</Text> the content is.</Text>
              <Text>CSS says <Text as="span" tone="primary">HOW IT LOOKS</Text>.</Text>
              <Divider />
              <Callout tone="info">One external style.css can restyle every page of the CodeBreakers club site at once.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Three Ways to Add CSS ─────────────────────── */}
      <PresentationSlide id="s04-three-methods" title="Three Ways to Add CSS">
        <Stack gap={12}>
          <H2>Three Ways to Add CSS</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Pill tone="danger">Inline</Pill>
              <Text tone="secondary">style="..." on the element. One element only. Avoid in production.</Text>
            </Stack>
            <Stack gap={6}>
              <Pill tone="warning">Internal</Pill>
              <Text tone="secondary">&lt;style&gt; in &lt;head&gt;. One page only. Rarely used.</Text>
            </Stack>
            <Stack gap={6}>
              <Pill tone="success">External</Pill>
              <Text tone="secondary">Separate .css file linked via &lt;link&gt;. One file for the entire site.</Text>
            </Stack>
          </Grid>
          <Divider />
          <Code language="html">{`<link rel="stylesheet" href="css/style.css">`}</Code>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: CSS Methods Comparison Table ──────────────── */}
      <PresentationSlide id="s04-methods-table" title="CSS Methods Compared">
        <Stack gap={12}>
          <H2>Why external always wins</H2>
          <Grid columns="repeat(4, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Feature</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Inline</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Internal</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">External</Text></Text>

            <Text>Scope</Text><Text>One element</Text><Text>One page</Text><Text tone="success">Entire site</Text>
            <Text>Reusable?</Text><Text>No</Text><Text>No</Text><Text tone="success">Yes</Text>
            <Text>Maintainable?</Text><Text tone="danger">Terrible</Text><Text tone="warning">Poor</Text><Text tone="success">Excellent</Text>
            <Text>Recommended?</Text><Text tone="danger">Never</Text><Text tone="warning">Rarely</Text><Text tone="success">Always</Text>
          </Grid>
          <Callout tone="info">The &lt;link&gt; tag goes INSIDE &lt;head&gt;, never in &lt;body&gt;.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Anatomy of one rule ───────────────────────── */}
      <PresentationSlide
        id="s04-rule-anatomy"
        title="Anatomy of a CSS Rule"
        notes="Do not move on until the class can name all four parts out loud. Most CSS that 'does nothing' is a missing semicolon or a missing closing brace."
      >
        <Stack gap={12}>
          <H2>Every rule has the same four parts</H2>
          <RuleAnatomy t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8b: CSS Vocabulary ────────────────────────────── */}
      <PresentationSlide
        id="s04-css-vocabulary"
        title="CSS Vocabulary"
        notes="Read each row aloud. A declaration is one property-value pair ending with a semicolon. A rule is the selector plus the entire declaration block. Students should be able to point at any part of a CSS rule and name it."
        background={{ pattern: "dots", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>CSS Vocabulary</H2>
          <Code language="css">{`p.notice { color: navy; font-size: 14px; }`}</Code>
          <Table
            headers={["Part", "In the example", "Name"]}
            rows={[
              ["p.notice", "the bit before {", "selector"],
              ["color / font-size", "left of each colon", "property"],
              ["navy / 14px", "right of each colon", "value"],
              ["color: navy;", "one property:value pair + ;", "declaration"],
              ["everything shown", "selector + { declarations }", "rule"],
            ]}
          />
          <Callout tone="info">A rule can have as many declarations as you need. Each one ends with a semicolon.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Selectors ─────────────────────────────────── */}
      <PresentationSlide id="s04-selectors" title="CSS Selectors">
        <Stack gap={12}>
          <H2>Selectors: Element, Class, ID</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Tag tone="info">Element</Tag>
              <Code language="css">{`p { color: #333; }`}</Code>
              <Text tone="secondary">Targets ALL elements of that tag. Low specificity (0,0,1).</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="success">Class</Tag>
              <Code language="css">{`.highlight {\n  background: #ffffcc;\n}`}</Code>
              <Text tone="secondary">Reusable on many elements. Medium specificity (0,1,0).</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="warning">ID</Tag>
              <Code language="css">{`#header {\n  background: #1a5276;\n}`}</Code>
              <Text tone="secondary">Unique per page. High specificity (1,0,0). Use sparingly.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Selector Types Table ─────────────────────── */}
      <PresentationSlide id="s04-selector-table" title="Selector Reference Table">
        <Stack gap={12}>
          <H2>When to use which selector</H2>
          <Table
            headers={["Selector", "Example", "Matches"]}
            rows={[
              ["Element", "p", "Every <p> on the page"],
              ["Class", ".notice", "Any element with class=\"notice\""],
              ["ID", "#header", "The one element with id=\"header\""],
              ["Descendant", "nav a", "Every <a> inside a <nav>"],
              ["Pseudo-class", "a:hover", "Any <a> the mouse is over"],
            ]}
          />
          <Callout tone="warning">Prefer classes over IDs. Classes are reusable and easier to override.</Callout>
          <Text tone="secondary">Descendant selectors and pseudo-classes let you target elements precisely without adding extra classes everywhere.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Common CSS Properties ────────────────────── */}
      <PresentationSlide id="s04-properties" title="Common CSS Properties">
        <Stack gap={12}>
          <H2>Properties you will use most</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">color</Text> — text color</Text>
              <Text><Text as="span" tone="primary">background-color</Text> — fill color</Text>
              <Text><Text as="span" tone="primary">font-family</Text> — typeface</Text>
              <Text><Text as="span" tone="primary">font-size</Text> — text size (px)</Text>
              <Text><Text as="span" tone="primary">font-weight</Text> — bold/normal</Text>
              <Text><Text as="span" tone="primary">text-align</Text> — left/center/right</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">margin</Text> — space OUTSIDE</Text>
              <Text><Text as="span" tone="primary">padding</Text> — space INSIDE</Text>
              <Text><Text as="span" tone="primary">border</Text> — line around element</Text>
              <Text><Text as="span" tone="primary">width / height</Text> — dimensions</Text>
              <Text><Text as="span" tone="primary">line-height</Text> — line spacing</Text>
              <Text><Text as="span" tone="primary">text-decoration</Text> — underline, etc.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Every declaration ends with a semicolon. Missing ; is the #1 CSS bug.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Color Values ─────────────────────────────── */}
      <PresentationSlide id="s04-colors" title="Color Values in CSS">
        <Stack gap={12}>
          <H2>Three ways to specify colors</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Tag tone="info">Named</Tag>
              <Code language="css">{`color: navy;
background: white;`}</Code>
              <Text tone="secondary">Easy to read, limited palette</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="success">Hex codes</Tag>
              <Code language="css">{`color: #1a5276;
background: #f5f5f5;`}</Code>
              <Text tone="secondary">Most common. Exact colors.</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="warning">RGB</Tag>
              <Code language="css">{`color: rgb(26, 82, 118);
rgba(0,0,0, 0.5);`}</Code>
              <Text tone="secondary">Red, Green, Blue values. Alpha for transparency.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Tip: Use coolors.co or a color picker to find hex codes that look good together.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Quick Check ──────────────────────────────── */}
      <PresentationSlide id="s04-quick-check" title="Quick Check: CSS Basics">
        <Stack gap={12}>
          <H2>Test yourself</H2>
          <Stack gap={8}>
            <Callout tone="info">Where does the &lt;link&gt; tag go? (Answer: Inside &lt;head&gt;, never in &lt;body&gt;.)</Callout>
            <Callout tone="info">What character separates property and value? (Answer: A colon :)</Callout>
            <Callout tone="info">What character ends every declaration? (Answer: A semicolon ;)</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbor for 30 seconds.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Box Model ─────────────────────────────────── */}
      {/* ── Try It Now: First CSS ─────────────────────────────── */}
      <PresentationSlide id="s04-try-css" title="Try It Now: Style Your First Page" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — add CSS to your page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1: Create style.css</Text>
              <Code language="css">{`body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Step 2: Link it in HTML</Text>
              <Code language="html">{`<head>
  <meta charset="UTF-8">
  <title>My Page</title>
  <link rel="stylesheet" href="style.css">
</head>`}</Code>
              <Text fontWeight="700">What to check</Text>
              <Text>1. The page background changes to light gray.</Text>
              <Text>2. The heading is dark blue with an underline.</Text>
              <Text>3. If nothing changes, check that the &lt;link&gt; tag is in the &lt;head&gt;.</Text>
              <Callout tone="info">If the CSS does not apply, open DevTools → Console. Look for a 404 error on style.css.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s04-box-model" title="The Box Model">
        <Stack gap={12}>
          <H2>The Box Model</H2>
          <BoxModelDiagram t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Margin vs Padding ────────────────────────── */}
      <PresentationSlide id="s04-margin-padding" title="Margin vs Padding">
        <Stack gap={12}>
          <H2>The difference that trips everyone up</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="success">Padding = INSIDE</Tag>
              <Text>Space between content and border.</Text>
              <Text tone="secondary">Gets the background color.</Text>
              <Code language="css">{`padding: 15px;
padding: 10px 20px;`}</Code>
            </Stack>
            <Stack gap={6}>
              <Tag tone="warning">Margin = OUTSIDE</Tag>
              <Text>Space between this element and others.</Text>
              <Text tone="secondary">Never gets a background color.</Text>
              <Code language="css">{`margin: 20px;
margin: 10px auto;`}</Code>
            </Stack>
          </Grid>
          <Callout tone="info">Remember: padding is like stuffing inside a box. Margin is the space between boxes on a shelf.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 16: CSS Reset ────────────────────────────────── */}
      <PresentationSlide id="s04-css-reset" title="Start with a CSS Reset">
        <Stack gap={12}>
          <H2>Why start every stylesheet with a reset?</H2>
          <Code language="css">{`/* Put this at the TOP of style.css */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}`}</Code>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">margin: 0; padding: 0</Text> — removes browser-default spacing so YOU control everything.</Text>
            <Text><Text as="span" tone="primary">box-sizing: border-box</Text> — width includes padding and border. No more surprise sizes.</Text>
            <Text><Text as="span" tone="primary">*</Text> — the universal selector. Applies to EVERY element on the page.</Text>
          </Stack>
          <Callout tone="warning">Without a reset, different browsers apply different default margins. Your layout will be inconsistent.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Specificity ───────────────────────────────── */}
      <PresentationSlide id="s04-specificity" title="Specificity">
        <Stack gap={12}>
          <H2>Specificity: Which Rule Wins?</H2>
          <Text>Score = (ids, classes, elements). The bigger score wins, whatever the order in the file.</Text>
          <SpecificityScale t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Worked Example 1 — Body & Typography ─────── */}
      <PresentationSlide id="s04-worked-example-1" title="Worked Example 1: Body & Typography">
        <Stack gap={10}>
          <H2>Setting base styles for the whole site</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="css">{`/* === BASE STYLES === */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333333;
    background-color: #f5f5f5;
}

h1 { color: #2c3e50; font-size: 28px; }
h2 { color: #2980b9; font-size: 22px; }
p  { margin-bottom: 12px; }`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">*</Text> — resets ALL elements. Always put this first.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">body</Text> — sets defaults inherited by child elements.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">line-height: 1.6</Text> — comfortable reading spacing.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">h1, h2</Text> — distinct colors create visual hierarchy.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">margin-bottom</Text> — adds space below paragraphs.</Text>
              <Divider />
              <Callout tone="info">In the browser: light gray background, dark readable text, blue headings, spaced paragraphs.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Worked Example 2 — Header Styling ────────── */}
      <PresentationSlide id="s04-code-example" title="Worked Example 2: Styling the Header">
        <Stack gap={10}>
          <H2>Full header stylesheet explained</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="css">{`/* === HEADER === */
header {
  background-color: #1a5276;
  color: white;
  text-align: center;
  padding: 30px 20px;
}

header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

header p {
  font-size: 18px;
  opacity: 0.9;
}`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">background-color</Text> — dark blue fills the entire header area.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">color: white</Text> — all text inside header turns white. Child elements inherit this.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">padding: 30px 20px</Text> — 30px top/bottom, 20px left/right. Creates breathing room.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">header h1</Text> — descendant selector: targets only &lt;h1&gt; INSIDE &lt;header&gt;, not elsewhere.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">opacity: 0.9</Text> — subtitle is slightly transparent, creating visual hierarchy.</Text>
              <Divider />
              <Callout tone="info">In the browser: a full-width dark blue bar with large white centred title and a softer subtitle beneath it.</Callout>
              <Text tone="secondary">Save css/style.css → Ctrl+S → refresh browser to see changes.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Discussion Prompt ────────────────────────── */}
      <PresentationSlide id="s04-discussion" title="Discussion: Why Separate CSS from HTML?">
        <Stack gap={12}>
          <H2>Why not just style everything inline?</H2>
          <Stack gap={8}>
            <Text>Imagine 10 pages, each with inline styles. Want to change the heading color?</Text>
            <Text>You would have to edit ALL 10 files. With external CSS, you edit ONE file.</Text>
            <Text>Separation also means designers and developers can work independently.</Text>
          </Stack>
          <Callout tone="info">One stylesheet → one place to update → instant site-wide changes.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s04-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This CSS has three bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy CSS</Text>
              <Code language="css">{`body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.intro {
  font-size: 18px;
  line-height: 1.6;
  color: #666;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. No &lt;link rel="stylesheet" href="style.css"&gt; in the HTML — the CSS file is not connected to the page.</Text>
              <Text tone="danger">2. .intro class is defined but no HTML element has class="intro" — the style will never apply.</Text>
              <Text tone="danger">3. No box-sizing: border-box — padding will add to the total width, causing layout issues.</Text>
              <Callout tone="info">Rule: CSS only works if (1) the file is linked, (2) selectors match HTML elements, and (3) the box model is predictable.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 21: Common Mistakes ───────────────────────────── */}
      <PresentationSlide id="s04-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>Common Mistakes</H2>
          <Stack gap={8}>
            <Callout tone="danger">Forgetting to link the CSS file — no &lt;link&gt; in &lt;head&gt; means no styles.</Callout>
            <Callout tone="danger">Wrong selector syntax — using # for a class or . for an ID.</Callout>
            <Callout tone="danger">Missing semicolons — color: navy (no ;) breaks the next declaration.</Callout>
            <Callout tone="danger">Confusing margin vs padding — margin = outside, padding = inside.</Callout>
            <Callout tone="danger">No CSS reset — browsers apply different default margins. Start with * {"{"} margin: 0; padding: 0; box-sizing: border-box; {"}"}</Callout>
            <Callout tone="danger">Wrong path in &lt;link&gt; — from pages/ subfolder, use ../css/style.css not css/style.css</Callout>
            <Callout tone="danger">Using !important — it wins now but blocks fixes later. Use better selectors instead.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 21b: Self-Study Check ─────────────────────────── */}
      <PresentationSlide
        id="s04-self-study-check"
        title="Self-Study Check"
        notes="Answer key: 1. h1 is the selector. 2. A dot (.) starts a class selector; a hash (#) starts an id selector. 3. External, because one file styles every page and is easiest to maintain. 4. The <link> tag inside <head>. 5. True — property: value; with a colon between them and a semicolon at the end."
        background={{ pattern: "spotlight", accent: t.chart.green }}
      >
        <Stack gap={12}>
          <H2>Self-Study Check</H2>
          <Text tone="secondary">Can you answer these without scrolling back?</Text>
          <Stack gap={8}>
            <Callout tone="info">1. In h1 {"{"} color: red; {"}"} which word is the selector?</Callout>
            <Callout tone="info">2. Which symbol starts a class selector? An id selector?</Callout>
            <Callout tone="info">3. Which of the 3 ways to add CSS is recommended, and why?</Callout>
            <Callout tone="info">4. What tag in &lt;head&gt; links an external stylesheet?</Callout>
            <Callout tone="info">5. True or false: a property and its value are separated by a colon and end with a semicolon.</Callout>
          </Stack>
          <Divider />
          <Text tone="tertiary">Answers are in the speaker notes. Check your understanding before moving on.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 22: Practice ─────────────────────────────────── */}
      <PresentationSlide id="s04-practice" title="Hands-On Practice">
        <Stack gap={12}>
          <H2>Hands-On Practice</H2>
          <Text>Open exercises/session-04/ in your project folder.</Text>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="success">Task 1</Tag><Text>Create an External CSS File and Link It</Text></Row>
            <Row gap={8}><Tag tone="success">Task 2</Tag><Text>Tag Selectors, Class Selectors, and ID Selectors</Text></Row>
            <Row gap={8}><Tag tone="success">Task 3</Tag><Text>Practice Margin and Padding</Text></Row>
            <Row gap={8}><Tag tone="success">Task 4</Tag><Text>Apply CSS to All Pages</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">Estimated time: 55 minutes.</Callout>
          <Text tone="secondary">Preview in the browser after every save. Press F12 to inspect.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 23: Practice Tips ────────────────────────────── */}
      <PresentationSlide id="s04-practice-tips" title="Practice Tips">
        <Stack gap={12}>
          <H2>Tips for the in-class tasks</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Start with the reset</Text> (* {"{"} margin: 0; padding: 0; box-sizing: border-box; {"}"}) at the top of style.css.</Text>
            <Text><Text as="span" tone="primary">Save after every change</Text> and refresh the browser to see results immediately.</Text>
            <Text><Text as="span" tone="primary">Check the &lt;link&gt; path</Text> carefully — from pages/ use ../css/style.css.</Text>
            <Text><Text as="span" tone="primary">If nothing changes</Text>, check for missing semicolons or wrong selector names.</Text>
            <Text><Text as="span" tone="primary">Use F12 DevTools</Text> to inspect elements and see which styles are applied.</Text>
          </Stack>
          <Callout tone="warning">Stuck? Compare your CSS against the worked examples on previous slides.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s04-do-dont" title="CSS: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Keep all CSS in one external css/style.css</Text>
              <Text>Style with classes: .card, .btn, .nav-link</Text>
              <Text>Start the file with a reset: margin, padding, box-sizing</Text>
              <Text>Group related rules and comment each section</Text>
              <Text>Use rem or em for font sizes so text scales with user settings</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Sprinkle style=&quot;...&quot; attributes through the HTML</Text>
              <Text>Chain long selectors like body div div p span</Text>
              <Text>Reach for !important to win a specificity fight</Text>
              <Text>Style by id (#header) when a class would be reusable</Text>
              <Text>Hard-code the same colour value in twelve places</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility: Colour &amp; Type ──────────────────── */}
      <PresentationSlide id="s04-accessibility" title="Accessible Colour and Type">
        <Stack gap={12}>
          <H2>Styling Decisions That Decide Readability</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Contrast</Pill><Text>Body text needs a contrast ratio of at least 4.5:1 against its background. #999 on white fails; #595959 passes.</Text></Row>
            <Row gap={8}><Pill>Font size</Pill><Text>Never set body text below 16px. Small type is the most common complaint on student sites.</Text></Row>
            <Row gap={8}><Pill>Line height</Pill><Text>line-height: 1.5 or more for paragraphs. Tight lines are hard to track for dyslexic readers.</Text></Row>
            <Row gap={8}><Pill>Colour alone</Pill><Text>Never use colour as the only signal. Add an icon, underline, or label so colour-blind users get the message too.</Text></Row>
            <Row gap={8}><Pill>Focus</Pill><Text>Never write outline: none without providing a replacement focus style. Keyboard users need to see where they are.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">Check contrast in DevTools: inspect the element, click the colour swatch, and read the contrast ratio it reports.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s04-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>The external stylesheet is loading: change one colour, reload, and see the change.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>The reset works: the page has no unexpected gap at the very top edge.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Your class selectors match the HTML — inspect an element and confirm your rule appears in the Styles pane.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>Body text is at least 16px with line-height 1.5, and passes the contrast check.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If a rule seems ignored, inspect the element: DevTools strikes through overridden declarations and shows which selector won.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ───────────────────────────────────────── */}
      <PresentationSlide id="s04-assignment" title="Assignment: Style Your Site">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>css/style.css linked from every page of your Student Club Website, with zero inline style attributes remaining.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>A reset block at the top of the file.</Text>
              <Text>Body typography set: font-family, font-size, line-height, colour.</Text>
              <Text>Header and nav styled with class selectors.</Text>
              <Text>At least one reusable class used on two or more elements.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Validate the CSS at jigsaw.w3.org/css-validator.</Text>
              <Text>Search your HTML for style=&quot; — there should be no hits.</Text>
              <Text>Check text contrast on every coloured background.</Text>
              <Callout tone="warning">One stylesheet for the whole site. The moment you copy CSS into a second file, the two versions start drifting apart.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 24: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s04-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 4 (homework/session-04/)</H2>
          <Text>See homework/session-04/ for full requirements.</Text>
          <Stack gap={6}>
            <Text><Text as="span">Styling with External CSS</Text> — create an external stylesheet and style your About page.</Text>
            <Text>Task 1: Create project/css/style.css and link it in project/pages/about.html using a relative path.</Text>
            <Text>Task 2: Style the About page with body colors/fonts, distinct heading styles, paragraph line-height/spacing, image max-width/borders, and at least one styled list.</Text>
          </Stack>
          <Callout tone="warning">
            Due Sunday 23:59. Submit via the course portal.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 25: Recap & Next ─────────────────────────────── */}
      <PresentationSlide id="s04-recap" title="Recap & Next">
        <Stack gap={12}>
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>CSS separates style from structure — one file styles the whole site.</Text>
            <Text>Use external stylesheets, class selectors, and a CSS reset.</Text>
            <Text>The box model: content, padding, border, margin. Use border-box.</Text>
            <Text>Specificity decides which rule wins: ID &gt; class &gt; element.</Text>
          </Stack>
          <Divider />
          <H3>Next Session</H3>
          <Text tone="secondary">Session 5: Semantic HTML5 elements and Flexbox layouts — building a two-column page with header, nav, main + sidebar, and footer.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
