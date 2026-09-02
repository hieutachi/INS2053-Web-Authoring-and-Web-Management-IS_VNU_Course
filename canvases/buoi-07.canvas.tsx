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
   INS2053 — TEACHING DIAGRAM KIT (Session 7: CSS3 polish and web fonts)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 13px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. How a Google Font reaches the screen ---------- */
function GoogleFontsFlow({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 244" width="100%" role="img"
         aria-label="Your HTML link tag asks Google Fonts for a font file, Google sends the font file back, and the browser then paints your heading in Roboto Slab. Below, a comparison shows that with display swap the text is readable immediately in a fallback font, while without it the text is invisible until the font arrives.">
      <defs>
        <marker id="s07-req" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={t.chart.goldenYellow} />
        </marker>
        <marker id="s07-res" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={t.chart.green} />
        </marker>
      </defs>

      <rect x="0" y="26" width="150" height="76" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="12" y="20" fontSize="12.5" fill={t.text.tertiary}>Your page</text>
      <text x="12" y="50" fontSize="12" fontFamily={MONO} fill={t.chart.blue}>&lt;link href=</text>
      <text x="12" y="66" fontSize="12" fontFamily={MONO} fill={t.chart.blue}>"...Roboto Slab</text>
      <text x="12" y="82" fontSize="12" fontFamily={MONO} fill={t.chart.blue}>&amp;display=swap"&gt;</text>

      <rect x="212" y="26" width="136" height="76" rx="8" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
      <text x="280" y="60" fontSize="13" textAnchor="middle" fill={t.text.primary}>Google Fonts</text>
      <text x="280" y="80" fontSize="12" textAnchor="middle" fill={t.text.secondary}>CDN server</text>

      <rect x="410" y="26" width="150" height="76" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="485" y="52" fontSize="12" textAnchor="middle" fill={t.text.tertiary}>rendered heading</text>
      <text x="485" y="82" fontSize="20" textAnchor="middle" fontWeight="700" fill={t.chart.green}>Club Night</text>

      <line x1="152" y1="50" x2="208" y2="50" stroke={t.chart.goldenYellow} strokeWidth="2" markerEnd="url(#s07-req)" />
      <text x="180" y="42" fontSize="11" textAnchor="middle" fill={t.chart.goldenYellow}>1 asks</text>
      <line x1="350" y1="50" x2="406" y2="50" stroke={t.chart.green} strokeWidth="2" markerEnd="url(#s07-res)" />
      <text x="378" y="42" fontSize="11" textAnchor="middle" fill={t.chart.green}>2 sends .woff2</text>

      <text x="0" y="128" fontSize="13" fontWeight="600" fill={t.text.primary}>What the visitor sees in the first half second</text>

      <rect x="0" y="140" width="272" height="58" rx="6" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <text x="12" y="158" fontSize="12" fill={t.chart.green}>display=swap</text>
      <text x="12" y="180" fontSize="16" fill={t.text.primary} fontFamily="Arial, sans-serif">Club Night</text>
      <text x="120" y="180" fontSize="11" fill={t.text.tertiary}>readable at once, in Arial</text>

      <rect x="288" y="140" width="272" height="58" rx="6" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="300" y="158" fontSize="12" fill={t.chart.brightOrange}>no display=swap</text>
      <rect x="300" y="168" width="92" height="16" rx="3" fill={t.fill.tertiary} />
      <text x="404" y="180" fontSize="11" fill={t.text.tertiary}>invisible until font loads</text>

      <text x="0" y="222" fontSize="12.5" fill={t.text.secondary}>Use &lt;link&gt; in HTML, not @import — link loads in parallel.</text>
      <text x="0" y="240" fontSize="12.5" fill={t.text.secondary}>Each extra family/weight = another download. Two is enough.</text>
    </svg>
  );
}

/* ---------- 2. The font stack is a fallback chain ---------- */
function FontStackChain({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 240" width="100%" role="img"
         aria-label="A font stack read left to right as a chain of fallbacks: the browser tries Roboto Slab first, then Arial, then any sans-serif the device owns. The last item is a generic family and is never allowed to be missing. Below, the same sentence is shown with a tight line height and a comfortable line height of one point six.">
      <text x="0" y="15" fontSize="13" fontWeight="600" fill={t.text.primary}>font-family is a list of attempts, not one choice</text>

      <rect x="0" y="28" width="560" height="34" rx="6" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="12" y="50" fontSize="13.5" fontFamily={MONO} fill={t.text.primary}>font-family: 'Roboto Slab', Arial, sans-serif;</text>

      <g transform="translate(0,74)">
        <rect width="172" height="52" rx="6" fill={t.chart.blue} />
        <text x="86" y="22" fontSize="12.5" textAnchor="middle" fill={ON_FILL}>1. 'Roboto Slab'</text>
        <text x="86" y="40" fontSize="11" textAnchor="middle" fill={ON_FILL}>the webfont you asked for</text>

        <rect x="194" width="172" height="52" rx="6" fill={t.chart.goldenYellow} />
        <text x="280" y="22" fontSize="12.5" textAnchor="middle" fill={ON_FILL}>2. Arial</text>
        <text x="280" y="40" fontSize="11" textAnchor="middle" fill={ON_FILL}>already on nearly every device</text>

        <rect x="388" width="172" height="52" rx="6" fill={t.chart.green} />
        <text x="474" y="22" fontSize="12.5" textAnchor="middle" fill={ON_FILL}>3. sans-serif</text>
        <text x="474" y="40" fontSize="11" textAnchor="middle" fill={ON_FILL}>whatever the device has</text>
      </g>

      <text x="0" y="141" fontSize="12.5" fill={t.text.secondary}>Quote any name with a space. Always finish with a generic family —</text>
      <text x="0" y="154" fontSize="12.5" fill={t.text.secondary}>a device that lacks your font falls back to Times without it.</text>

      <rect x="0" y="160" width="272" height="66" rx="6" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="12" y="178" fontSize="12" fill={t.chart.brightOrange}>line-height: 1  — cramped</text>
      <text x="12" y="194" fontSize="12" fill={t.text.primary}>The club meets every Friday</text>
      <text x="12" y="206" fontSize="12" fill={t.text.primary}>evening in room B203 and new</text>
      <text x="12" y="218" fontSize="12" fill={t.text.primary}>members are always welcome.</text>

      <rect x="288" y="160" width="272" height="66" rx="6" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <text x="300" y="178" fontSize="12" fill={t.chart.green}>line-height: 1.6  — readable</text>
      <text x="300" y="196" fontSize="12" fill={t.text.primary}>The club meets every Friday</text>
      <text x="300" y="212" fontSize="12" fill={t.text.primary}>evening in room B203 and new</text>
    </svg>
  );
}

/* ---------- 3. What each CSS3 property actually does ---------- */
function PolishLab({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 250" width="100%" role="img"
         aria-label="Four sample cards rendered side by side. The first is a plain square box. The second has rounded corners from border radius. The third has a soft drop shadow from box shadow. The fourth has a blue gradient background. A circle avatar made with border radius fifty percent is shown as well.">
      <defs>
        <linearGradient id="s07-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.chart.blue} />
          <stop offset="100%" stopColor={t.chart.green} />
        </linearGradient>
        <filter id="s07-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000" floodOpacity="0.28" />
        </filter>
      </defs>

      <text x="0" y="15" fontSize="13" fontWeight="600" fill={t.text.primary}>Same card, four lines of CSS3 added one at a time</text>

      <g transform="translate(0,28)">
        <rect width="128" height="82" rx="0" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
        <text x="64" y="46" fontSize="12.5" textAnchor="middle" fill={t.text.secondary}>plain box</text>
        <text x="0" y="102" fontSize="11.5" fontFamily={MONO} fill={t.text.tertiary}>no extra CSS</text>
      </g>

      <g transform="translate(144,28)">
        <rect width="128" height="82" rx="14" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
        <text x="64" y="46" fontSize="12.5" textAnchor="middle" fill={t.text.secondary}>rounded</text>
        <text x="0" y="102" fontSize="11.5" fontFamily={MONO} fill={t.chart.goldenYellow}>border-radius: 14px</text>
      </g>

      <g transform="translate(288,28)">
        <rect width="128" height="82" rx="14" fill={t.bg.elevated} stroke={t.stroke.secondary} filter="url(#s07-shadow)" />
        <text x="64" y="46" fontSize="12.5" textAnchor="middle" fill={t.text.secondary}>lifted</text>
        <text x="0" y="102" fontSize="11.5" fontFamily={MONO} fill={t.chart.goldenYellow}>box-shadow: 0 4px 10px</text>
      </g>

      <g transform="translate(432,28)">
        <rect width="128" height="82" rx="14" fill="url(#s07-grad)" />
        <text x="64" y="46" fontSize="12.5" textAnchor="middle" fill={ON_FILL}>gradient</text>
        <text x="0" y="102" fontSize="11.5" fontFamily={MONO} fill={t.chart.goldenYellow}>linear-gradient(135deg, ...)</text>
      </g>

      <g transform="translate(0,124)">
        <circle cx="34" cy="34" r="32" fill={t.chart.blue} />
        <text x="34" y="39" fontSize="13" textAnchor="middle" fill={ON_FILL}>MN</text>
        <text x="78" y="26" fontSize="12.5" fill={t.text.primary}>border-radius: 50% turns a SQUARE into a circle.</text>
        <text x="78" y="44" fontSize="12.5" fill={t.text.secondary}>Rectangle? You get an oval. Use equal W + H.</text>
        <text x="78" y="62" fontSize="12.5" fill={t.text.secondary}>box-shadow order: x-offset  y-offset  blur  colour.</text>
      </g>

      <rect x="0" y="204" width="560" height="40" rx="6" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="12" y="222" fontSize="12.5" fill={t.chart.brightOrange}>Use rgba(0,0,0,0.15) for shadows. Solid black reads as a 1990s bevel.</text>
      <text x="12" y="238" fontSize="12.5" fill={t.chart.brightOrange}>Gradients belong on headers and buttons, never behind body text.</text>
    </svg>
  );
}

export default function Session07CSS3AndWebFonts() {
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
        id="s7-title"
        title="Session 7 — CSS3 & Web Fonts"
        notes="Welcome to Session 7. Today we make the Student Club Website look modern and professional with custom fonts, shadows, gradients, and smooth animations."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 7 · 3 periods</Tag>
          <H1>CSS3 &amp; Web Fonts</H1>
          <Text tone="secondary">Google Fonts, border-radius, box-shadow, gradients, transitions &amp; hover effects — pure CSS, no images.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s7-objectives" title="Learning objectives">
        <Stack gap={12}>
          <H2>By the end of this session you will…</H2>
          <Stack gap={6}>
            <Text>Import and apply <Text as="span">Google Fonts</Text> via &lt;link&gt; tags.</Text>
            <Text>Write correct <Text as="span">font-family fallback stacks</Text>.</Text>
            <Text>Style text with text-align, line-height, letter-spacing, text-shadow.</Text>
            <Text>Create rounded corners (<Text as="span">border-radius</Text>) and depth (<Text as="span">box-shadow</Text>).</Text>
            <Text>Build linear &amp; radial <Text as="span">gradients</Text> as backgrounds.</Text>
            <Text>Animate property changes smoothly with <Text as="span">CSS3 transitions</Text> + :hover.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s7-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">0:00–0:10</Tag><Text>Welcome, objectives, warm-up recap</Text></Row>
            <Row gap={8}><Tag tone="info">0:10–0:20</Tag><Text>Recap: What did we learn in Session 6?</Text></Row>
            <Row gap={8}><Tag tone="primary">0:20–0:45</Tag><Text>Google Fonts + font stacks + text styling</Text></Row>
            <Row gap={8}><Tag tone="primary">0:45–1:10</Tag><Text>border-radius, box-shadow, gradients</Text></Row>
            <Row gap={8}><Tag tone="primary">1:10–1:35</Tag><Text>Transitions, transforms, hover effects + worked examples</Text></Row>
            <Row gap={8}><Tag tone="success">1:35–2:20</Tag><Text>In-class practice (exercises/session-07)</Text></Row>
            <Row gap={8}><Tag tone="warning">2:20–2:30</Tag><Text>Homework briefing + recap + next session</Text></Row>
          </Stack>
          <Callout tone="info">
            Theory ~60 min · Practice ~75 min · Wrap-up ~15 min
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s7-warmup" title="Warm-Up: Session 6 Recap">
        <Stack gap={12}>
          <H2>Quick Check — What Do You Remember?</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What are the 5 steps in the copy-and-modify workflow for creating a new page?</Callout>
            <Callout tone="info">Q2: What does class="active" do in the navigation bar?</Callout>
            <Callout tone="info">Q3: Write the correct relative path from pages/events.html to css/style.css.</Callout>
            <Callout tone="info">Q4: Why should all pages share ONE CSS file instead of separate files?</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: Google Fonts ──────────────────────────────── */}
      <PresentationSlide id="s7-google-fonts" title="Google Fonts" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={16}>
          <H2>Google Fonts — streaming typefaces</H2>
          <GoogleFontsFlow t={t} />
          <PresentationFragment index={0} effect="fade">
            <Stack gap={6}>
              <Text>Free library of 1,500+ font families hosted on Google CDN.</Text>
              <Text tone="secondary">Use <Text as="span">&lt;link&gt;</Text> in HTML (parallel, fast) — not @import in CSS (blocks rendering).</Text>
              <Text tone="secondary">Always add <Text as="span">display=swap</Text> so users see fallback text immediately.</Text>
            </Stack>
          </PresentationFragment>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Font stacks & text styling ────────────────── */}
      <PresentationSlide id="s7-font-stacks" title="Font stacks & text styling">
        <Stack gap={12}>
          <H2>Font-family stacks &amp; text properties</H2>
          <Code language="css">{`h1 {
  font-family: 'Roboto Slab', Arial, sans-serif;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
p {
  font-family: 'Open Sans', Arial, sans-serif;
  line-height: 1.6;          /* unitless = scalable */
}`}</Code>
          <FontStackChain t={t} />
          <Row gap={8}>
            <Tag tone="success">Quote multi-word names</Tag>
            <Tag tone="success">End with generic family</Tag>
            <Tag tone="warning">Limit to 2-3 families</Tag>
          </Row>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Text Styling Properties ───────────────────── */}
      <PresentationSlide id="s7-text-properties" title="Text Styling Reference">
        <Stack gap={12}>
          <H2>Text Styling Properties Quick Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">text-align</Text> — left | center | right | justify</Text>
              <Text><Text as="span" tone="primary">line-height</Text> — Use unitless (1.6), not pixels</Text>
              <Text><Text as="span" tone="primary">letter-spacing</Text> — Extra space between characters (1-3px for headings)</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">text-shadow</Text> — h-offset v-offset blur color</Text>
              <Text><Text as="span" tone="primary">text-transform</Text> — uppercase | lowercase | capitalize</Text>
              <Text><Text as="span" tone="primary">font-weight</Text> — 400 (regular), 600 (semi-bold), 700 (bold)</Text>
            </Stack>
          </Grid>
          <Divider />
          <Callout tone="warning">
            Use text-align: justify sparingly — it creates ugly rivers of white space in narrow columns.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: border-radius & box-shadow ────────────────── */}
      <PresentationSlide id="s7-corners-shadows" title="Rounded corners & shadows" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>border-radius &amp; box-shadow</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="css">{`.card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.avatar {
  border-radius: 50%;  /* circle if square */
}`}</Code>
            <Stack gap={6}>
              <Text><Text as="span">border-radius</Text>: TL TR BR BL (clockwise), or single value for all.</Text>
              <Text><Text as="span">box-shadow</Text>: h-offset v-offset blur spread color.</Text>
            </Stack>
          </Grid>
          <PolishLab t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Gradients ─────────────────────────────────── */}
      <PresentationSlide id="s7-gradients" title="CSS3 gradients">
        <Stack gap={12}>
          <H2>Linear &amp; radial gradients</H2>
          <Code language="css">{`header {
  background: linear-gradient(135deg, #1a5276 0%, #3498db 100%);
}
.spotlight {
  background: radial-gradient(circle, #ffcc00, #ff6600);
}`}</Code>
          <Stack gap={4}>
            <Text>Use for headers, buttons, banners — not full page backgrounds.</Text>
            <Text tone="secondary">Stick to 2-3 colours. Test contrast with white text at both ends.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: CSS3 Effects Summary Table ───────────────── */}
      <PresentationSlide id="s7-effects-table" title="CSS3 Effects Summary">
        <Stack gap={12}>
          <H2>CSS3 Visual Effects Quick Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">border-radius</Text> — Rounds corners (8px, 50%)</Text>
              <Text><Text as="span" tone="primary">box-shadow</Text> — Drop shadow (0 4px 12px rgba)</Text>
              <Text><Text as="span" tone="primary">text-shadow</Text> — Shadow behind text (2px 2px 4px)</Text>
              <Text><Text as="span" tone="primary">linear-gradient</Text> — Colour transition in a line</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">transition</Text> — Smooth animation (all 0.3s ease)</Text>
              <Text><Text as="span" tone="primary">transform</Text> — Move/scale/rotate (translateY(-3px))</Text>
              <Text><Text as="span" tone="primary">:hover</Text> — Pseudo-class for mouse-over state</Text>
              <Text><Text as="span" tone="primary">radial-gradient</Text> — Colour transition radiating outward</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Transitions & hover ───────────────────────── */}
      <PresentationSlide id="s7-transitions" title="Transitions & hover effects" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>CSS3 transitions + :hover</H2>
          <Code language="css">{`.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}`}</Code>
          <Callout tone="warning">
            Place <Text as="span">transition</Text> on the BASE selector, NOT on :hover — otherwise animation only plays inward.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Quick Check ───────────────────────────────── */}
      <PresentationSlide id="s7-quick-check" title="Quick Check">
        <Stack gap={12}>
          <H2>Discussion: Think About It</H2>
          <Stack gap={8}>
            <Callout tone="info">Why should you use &lt;link&gt; for Google Fonts instead of @import in CSS?</Callout>
            <Callout tone="info">Where should the transition property go: on the base rule or on :hover? Why?</Callout>
            <Callout tone="info">What is wrong with this shadow: box-shadow: 5px 5px 0px #000000 ?</Callout>
          </Stack>
          <Text tone="secondary">Raise your hand when you have an answer.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Worked Example 1 ──────────────────────────── */}
      {/* ── Try It Now: Google Fonts ──────────────────────────── */}
      <PresentationSlide id="s07-try-fonts" title="Try It Now: Add a Google Font" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — change your site's font</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1: Add the font link</Text>
              <Code language="html">{`<!-- Paste in <head> of every page -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">`}</Code>
              <Text fontWeight="700">Step 2: Use it in CSS</Text>
              <Code language="css">{`body {
  font-family: 'Roboto', Arial, sans-serif;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Open the page — the text should look different from the default serif font.</Text>
              <Text>2. Open DevTools → Network tab → filter by "Font" — you should see the font file loaded.</Text>
              <Text>3. If the font does not change, check that the &lt;link&gt; tag is in the &lt;head&gt;, not the &lt;body&gt;.</Text>
              <Callout tone="info">The fallback stack (Arial, sans-serif) ensures the page still looks OK if Google Fonts is slow or blocked.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Try It Now: Gradients ─────────────────────────────── */}
      <PresentationSlide id="s07-try-gradient" title="Try It Now: Create a Gradient" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — add a gradient background</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this CSS</Text>
              <Code language="css">{`header {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 100%
  );
  color: white;
  padding: 40px;
  text-align: center;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to notice</Text>
              <Text>135deg is the angle — try changing it to 90deg (left to right) or 180deg (top to bottom).</Text>
              <Text>0% and 100% are the start and end positions. Add a middle color at 50% for a three-color gradient.</Text>
              <Text>The gradient replaces the solid background-color — you cannot use both.</Text>
              <Callout tone="info">Use CSS Gradient generators (cssgradient.io) to visually design gradients, then copy the CSS.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s7-worked-example" title="Worked Example: Fonts + Card">
        <Stack gap={10}>
          <H2>Full Example: Fonts + Styled Card</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="html">{`<!-- Inside <head> of EVERY page -->
<link rel="preconnect"
  href="https://fonts.googleapis.com">
<link rel="preconnect"
  href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/
  css2?family=Roboto+Slab:wght@400;700
  &family=Open+Sans:wght@400;600
  &display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>What each line does:</Text>
              <Text><Text as="span" tone="success">preconnect</Text> — opens connection to Google early.</Text>
              <Text><Text as="span" tone="success">Roboto Slab 400;700</Text> — heading font (Regular + Bold).</Text>
              <Text><Text as="span" tone="success">Open Sans 400;600</Text> — body font (Regular + SemiBold).</Text>
              <Text><Text as="span" tone="success">display=swap</Text> — show fallback text immediately.</Text>
              <Text><Text as="span" tone="success">Place BEFORE style.css</Text> so fonts are ready.</Text>
            </Stack>
          </Grid>
          <Code language="css">{`h1,h2,h3 { font-family: 'Roboto Slab', serif; }
body,p,li { font-family: 'Open Sans', sans-serif; line-height: 1.6; }
.event-card { border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 25px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
.event-card:hover { transform: translateY(-3px); box-shadow: 0 5px 20px rgba(0,0,0,0.15); }`}</Code>
          <Callout tone="success">
            In the browser: headings render in the slab-serif Roboto Slab, body text in clean Open Sans. Event cards have rounded corners and a subtle shadow. Hover lifts the card smoothly with a deeper shadow.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Worked Example 2 ──────────────────────────── */}
      <PresentationSlide id="s7-worked-example-2" title="Worked Example: Gradient Header">
        <Stack gap={10}>
          <H2>Gradient Header with Text Shadow</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="css">{`header {
  background: linear-gradient(135deg,
    #1a5276 0%, #2874a6 50%, #3498db 100%);
  color: white;
  text-align: center;
  padding: 40px 20px;
}
header h1 {
  font-family: 'Roboto Slab', serif;
  font-size: 48px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 2px;
}
header p {
  font-size: 20px;
  opacity: 0.9;
}`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>Line-by-line:</Text>
              <Text><Text as="span" tone="success">linear-gradient(135deg, ...)</Text> — diagonal dark-to-light blue.</Text>
              <Text><Text as="span" tone="success">color: white</Text> — all header text white for contrast.</Text>
              <Text><Text as="span" tone="success">text-shadow</Text> — dark shadow makes white letters pop.</Text>
              <Text><Text as="span" tone="success">letter-spacing: 2px</Text> — premium editorial feel.</Text>
              <Text><Text as="span" tone="success">opacity: 0.9</Text> — tagline slightly faded, subordinate.</Text>
              <Divider />
              <Text tone="secondary">Result: Rich diagonal gradient header with bold white Roboto Slab title.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Common mistakes ───────────────────────────── */}
      <PresentationSlide id="s7-mistakes" title="Common mistakes">
        <Stack gap={12}>
          <H2>Watch out for these pitfalls</H2>
          <Stack gap={6}>
            <Text tone="danger">Missing fallback font: font-family: 'Roboto Slab'; → always add sans-serif.</Text>
            <Text tone="danger">@import after other CSS rules → silently ignored by browser.</Text>
            <Text tone="danger">Google Fonts link on only one page → add to EVERY page that uses the font.</Text>
            <Text tone="danger">Pixel line-height (24px) → use unitless (1.6) so it scales.</Text>
            <Text tone="danger">Changing top/left for hover movement → use transform (GPU-accelerated).</Text>
            <Text tone="danger">Harsh solid-black box-shadow → use rgba with low opacity.</Text>
            <Text tone="danger">Transition on :hover only → put it on the base selector for smooth IN and OUT.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 16: Transforms Deep Dive ──────────────────────── */}
      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s07-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This button effect has three bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy CSS</Text>
              <Code language="css">{`.btn {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}

.btn:hover {
  background-color: #2980b9;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. transition is on :hover — it only animates ON hover, not when the mouse leaves. Move it to .btn.</Text>
              <Text tone="danger">2. No cursor: pointer — the button does not look clickable.</Text>
              <Text tone="danger">3. No border: none — some browsers show a default button border that clashes with border-radius.</Text>
              <Callout tone="info">Rule: transition always goes on the BASE selector. The :hover only defines the END state.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Try It Now: Transitions ───────────────────────────── */}
      <PresentationSlide id="s07-try-transition" title="Try It Now: Add a Hover Transition" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — make a button animate</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this CSS</Text>
              <Code language="css">{`.btn {
  background-color: #3498db;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to notice</Text>
              <Text>transition is on .btn (the base), NOT on .btn:hover.</Text>
              <Text>Hover over the button — it should lift up and change color smoothly.</Text>
              <Text>Move the mouse away — it should animate back down smoothly.</Text>
              <Callout tone="info">If the hover works but the mouse-leave is instant, you put transition on :hover instead of the base selector.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s7-transforms" title="CSS Transforms">
        <Stack gap={12}>
          <H2>Common Transform Functions</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">translateY(-3px)</Text> — Move element up by 3 pixels</Text>
              <Text><Text as="span" tone="primary">translateX(10px)</Text> — Move element right by 10 pixels</Text>
              <Text><Text as="span" tone="primary">scale(1.05)</Text> — Grow element to 105% of its size</Text>
              <Text><Text as="span" tone="primary">rotate(5deg)</Text> — Rotate element 5 degrees clockwise</Text>
            </Stack>
            <Stack gap={4}>
              <Text><Text as="span" tone="primary">Combining</Text> — transform: translateY(-3px) scale(1.05);</Text>
              <Text><Text as="span" tone="primary">GPU-accelerated</Text> — smoother than changing top/left/margin</Text>
              <Text><Text as="span" tone="primary">Does not affect layout</Text> — other elements stay in place</Text>
              <Text><Text as="span" tone="primary">transform-origin</Text> — sets the pivot point for rotation/scale</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">
            Always use transform for hover movement instead of changing top/left/margin. Transforms are GPU-accelerated and do not trigger layout recalculation.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Typography Hierarchy ──────────────────────── */}
      <PresentationSlide id="s7-typography-hierarchy" title="Typography Hierarchy">
        <Stack gap={12}>
          <H2>Building Visual Hierarchy with Type</H2>
          <Code language="css">{`h1 { font-family: 'Roboto Slab', serif; font-size: 48px; font-weight: 700; }
h2 { font-family: 'Roboto Slab', serif; font-size: 32px; font-weight: 700; }
h3 { font-family: 'Roboto Slab', serif; font-size: 24px; font-weight: 600; }
p  { font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 1.6; }
small { font-size: 14px; color: #666; }`}</Code>
          <Stack gap={4}>
            <Text tone="primary" style={{ fontWeight: 700 }}>Hierarchy rules:</Text>
            <Text><Text as="span" tone="success">Size contrast</Text> — Each heading level should be noticeably different.</Text>
            <Text><Text as="span" tone="success">Weight contrast</Text> — Bold headings vs regular body text.</Text>
            <Text><Text as="span" tone="success">Font pairing</Text> — Serif headings (Roboto Slab) + sans-serif body (Open Sans).</Text>
            <Text><Text as="span" tone="success">Whitespace</Text> — margin-bottom on headings separates sections visually.</Text>
          </Stack>
          <Callout tone="info">
            Good typography hierarchy lets users scan the page and understand structure without reading every word.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Styled Buttons ────────────────────────────── */}
      <PresentationSlide id="s7-styled-buttons" title="Worked Example: Styled Buttons">
        <Stack gap={10}>
          <H2>Creating Polished CSS Buttons</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="css">{`.btn {
  display: inline-block;
  background-color: #2874a6;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease,
              transform 0.3s ease;
}
.btn:hover {
  background-color: #1a5276;
  transform: translateY(-2px);
}`}</Code>
            <Stack gap={4}>
              <Text tone="primary" style={{ fontWeight: 700 }}>Line-by-line:</Text>
              <Text><Text as="span" tone="success">display: inline-block</Text> — button sits in text flow but accepts padding/width.</Text>
              <Text><Text as="span" tone="success">border-radius: 6px</Text> — rounded corners look modern.</Text>
              <Text><Text as="span" tone="success">text-decoration: none</Text> — removes underline from &lt;a&gt; tag.</Text>
              <Text><Text as="span" tone="success">transition on base</Text> — smooth animation both IN and OUT.</Text>
              <Text><Text as="span" tone="success">translateY(-2px)</Text> — subtle lift on hover (GPU-accelerated).</Text>
              <Divider />
              <Text tone="secondary">Result: Professional-looking buttons with smooth colour change and lift effect on hover.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Self-Assessment ───────────────────────────── */}
      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s07-do-dont" title="Typography & Effects: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use Google Fonts via &lt;link&gt; in the &lt;head&gt;</Text>
              <Text>Always provide fallback fonts (Arial, sans-serif)</Text>
              <Text>Set line-height ≥ 1.6 for body text</Text>
              <Text>Put transition on the base selector, not :hover</Text>
              <Text>Use border-radius for rounded corners</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Use more than 2-3 fonts on one page</Text>
              <Text>Set font-size below 14px for body text</Text>
              <Text>Use text-shadow on every element (it becomes noise)</Text>
              <Text>Put transition on :hover (only animates one direction)</Text>
              <Text>Use gradients as background for text (readability suffers)</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility: Typography ─────────────────────────── */}
      <PresentationSlide id="s07-typography-a11y" title="Typography Accessibility">
        <Stack gap={12}>
          <H2>Readable Text = Accessible Text</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Font size</Pill><Text>Body text must be at least 16px. Headings should be clearly larger.</Text></Row>
            <Row gap={8}><Pill>Line height</Pill><Text>Set line-height: 1.6 or higher. Tight lines are hard to read.</Text></Row>
            <Row gap={8}><Pill>Contrast</Pill><Text>Text must be dark enough against the background. Use DevTools to check contrast ratio.</Text></Row>
            <Row gap={8}><Pill>Font choice</Pill><Text>Avoid decorative fonts for body text. Use them only for headings.</Text></Row>
            <Row gap={8}><Pill>Spacing</Pill><Text>Add margin-bottom to paragraphs. Cramped text is harder to read.</Text></Row>
          </Stack>
          <Callout tone="warning">If you squint to read your own page, your users will too. Make it comfortable for everyone.</Callout>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s7-self-assess" title="Self-Assessment">
        <Stack gap={12}>
          <H2>Check Your Understanding</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={8}>
            <Stack gap={3}>
              <Text>1. Add Google Fonts via &lt;link&gt; tags</Text>
              <Text>2. Write correct font-family fallback stacks</Text>
              <Text>3. Use line-height, letter-spacing, text-shadow</Text>
              <Text>4. Create rounded corners with border-radius</Text>
            </Stack>
            <Stack gap={3}>
              <Text>5. Add depth with box-shadow using rgba</Text>
              <Text>6. Build linear and radial gradients</Text>
              <Text>7. Place transition on base selector (not :hover)</Text>
              <Text>8. Use transform for hover movement</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text tone="secondary">If you answered "No" to any item, re-read ebook chapter 7 and redo the corresponding exercise task.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Practice ──────────────────────────────────── */}
      <PresentationSlide id="s7-practice" title="In-class practice">
        <Stack gap={12}>
          <H2>In-Class Practice (≈ 55 min)</H2>
          <Text>Open exercises/session-07/exercise.md in your project folder.</Text>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="success">Task 1</Tag><Text>Add Google Fonts (Roboto Slab + Open Sans) to all pages</Text></Row>
            <Row gap={8}><Tag tone="success">Task 2</Tag><Text>CSS3 text styling — section-title, quote, drop-cap</Text></Row>
            <Row gap={8}><Tag tone="success">Task 3</Tag><Text>Transitions and visual effects — hover effects, button, gradient header</Text></Row>
          </Stack>
          <Text tone="secondary">Files: exercises/session-07/ · Have your club-website folder open.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s07-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>Open DevTools → Computed tab → the heading font is "Roboto Slab" (not Times New Roman).</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>The section title has text-shadow, the quote has a left border, the first letter is larger.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Hover over the button — it changes color and lifts up smoothly (not instantly).</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If the Google Font does not load, check the Network tab in DevTools — look for a 404 on the font URL.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s07-assignment" title="Assignment: Typography & Effects Polish">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>Your Student Club Website uses Google Fonts and CSS3 effects throughout all pages.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>Google Fonts loaded via &lt;link&gt; on all pages.</Text>
              <Text>Heading and body use different font families.</Text>
              <Text>At least one CSS3 effect: border-radius, box-shadow, or gradient.</Text>
              <Text>Hover transitions on buttons or links (transition on base, not :hover).</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Check that fonts load (not fallback to system fonts).</Text>
              <Text>Test hover effects — they should be smooth, not instant.</Text>
              <Text>Validate CSS at jigsaw.w3.org/css-validator.</Text>
              <Callout tone="warning">If you put transition on :hover instead of the base selector, the effect only animates one direction.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 17: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s7-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 7 — Typography with Google Fonts</H2>
          <Text>See homework/session-07/homework.md for full requirements.</Text>
          <Stack gap={6}>
            <Text>Choose and add Google Fonts to all 3 pages (heading font + body font).</Text>
            <Text>Apply fonts in CSS: set heading and body font-family, add font-weight variations, set line-height &gt;= 1.6.</Text>
            <Text>Fine-tune typography: adjust h1/h2/h3 sizes for clear hierarchy, style links with custom colors and hover effects.</Text>
            <Text>Style paragraph text and list items for readability.</Text>
          </Stack>
          <Callout tone="info">
            Due Sunday 23:59. Submit via git push.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Recap ────────────────────────────────────── */}
      <PresentationSlide id="s7-recap" title="Recap">
        <Stack gap={12}>
          <H2>Session 7 recap</H2>
          <Row gap={8}>
            <Tag tone="success">Google Fonts</Tag>
            <Tag tone="success">Font stacks</Tag>
            <Tag tone="success">border-radius</Tag>
            <Tag tone="success">box-shadow</Tag>
            <Tag tone="success">Gradients</Tag>
            <Tag tone="success">Transitions</Tag>
          </Row>
          <Text>Your site now looks modern and professional — no image editor needed.</Text>
          <Text tone="secondary">Next: Session 8 is Review &amp; Midterm Preparation. No new content — bring your notes!</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
