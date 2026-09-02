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
  Text,
  Code,
  Callout,
  Divider,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 15: responsive layout)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- SVG 1: what the viewport meta tag actually does ---------- */

function ViewportMeta({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 344" width="100%" height="344" role="img"
      aria-label="Without the viewport meta tag a phone pretends to be 980 pixels wide and shrinks the whole page; with it, 375 pixels really means 375 pixels.">
      <text x="18" y="18" fontSize="12.5" fontWeight="700" fill={t.text.primary}>The same page on the same phone. One line of HTML apart.</text>

      {/* ---- LEFT: no meta viewport ---- */}
      <rect x="14" y="30" width="258" height="184" rx="10" fill={t.fill.tertiary} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="26" y="49" fontSize="11.5" fontWeight="700" fill={t.chart.brightOrange}>No meta viewport</text>

      <rect x="110" y="56" width="66" height="96" rx="8" fill={ON_FILL} stroke={t.stroke.secondary} />
      <rect x="114" y="62" width="58" height="84" fill={ON_FILL} />
      {/* a whole desktop layout squeezed into a phone screen */}
      <rect x="117" y="65" width="52" height="4" fill={t.chart.blue} opacity="0.7" />
      <rect x="117" y="73" width="16" height="30" fill={t.chart.blue} opacity="0.3" />
      <rect x="136" y="73" width="16" height="30" fill={t.chart.blue} opacity="0.3" />
      <rect x="155" y="73" width="14" height="30" fill={t.chart.blue} opacity="0.3" />
      <rect x="117" y="108" width="52" height="1.5" fill={t.stroke.secondary} />
      <rect x="117" y="113" width="52" height="1.5" fill={t.stroke.secondary} />
      <rect x="117" y="118" width="52" height="1.5" fill={t.stroke.secondary} />
      <rect x="117" y="123" width="40" height="1.5" fill={t.stroke.secondary} />
      <rect x="117" y="133" width="24" height="6" fill={t.chart.brightOrange} opacity="0.5" />

      <text x="22" y="170" fontSize="11.5" fill={t.text.secondary}>The phone pretends to be 980px wide,</text>
      <text x="22" y="183" fontSize="11.5" fill={t.text.secondary}>then shrinks the page to fit. Type</text>
      <text x="22" y="196" fontSize="11.5" fill={t.text.secondary}>lands at about 4px. Unreadable.</text>

      {/* ---- RIGHT: with meta viewport ---- */}
      <rect x="288" y="30" width="258" height="184" rx="10" fill={t.fill.tertiary} stroke={t.chart.green} strokeWidth="1.5" />
      <text x="300" y="49" fontSize="11.5" fontWeight="700" fill={t.chart.green}>With meta viewport</text>

      <rect x="384" y="56" width="66" height="96" rx="8" fill={ON_FILL} stroke={t.stroke.secondary} />
      <rect x="388" y="62" width="58" height="84" fill={ON_FILL} />
      <rect x="391" y="65" width="52" height="7" fill={t.chart.blue} opacity="0.7" />
      <rect x="391" y="76" width="52" height="22" fill={t.chart.green} opacity="0.28" />
      <rect x="391" y="103" width="52" height="3" fill={t.text.tertiary} />
      <rect x="391" y="110" width="52" height="3" fill={t.text.tertiary} />
      <rect x="391" y="117" width="38" height="3" fill={t.text.tertiary} />
      <rect x="391" y="126" width="34" height="10" rx="2" fill={t.chart.green} opacity="0.75" />

      <text x="296" y="170" fontSize="11.5" fill={t.text.secondary}>width=device-width means 375px</text>
      <text x="296" y="183" fontSize="11.5" fill={t.text.secondary}>really is 375px. One column, type</text>
      <text x="296" y="196" fontSize="11.5" fill={t.text.secondary}>at the size you actually set.</text>

      {/* ---- the tag itself ---- */}
      <rect x="14" y="226" width="532" height="78" rx="10" fill={ON_FILL} stroke={t.stroke.secondary} />
      <text x="24" y="248" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>
        &lt;meta name=<tspan fill={t.chart.green}>"viewport"</tspan> content=<tspan fill={t.chart.goldenYellow}>"width=device-width, initial-scale=1.0"</tspan>&gt;
      </text>
      <text x="24" y="268" fontSize="11" fill={t.text.tertiary}>width=device-width — use the real screen width, not a fake 980px.</text>
      <text x="24" y="283" fontSize="11" fill={t.text.tertiary}>initial-scale=1.0 — open at 100% zoom, not zoomed out.</text>
      <text x="24" y="298" fontSize="11" fill={t.chart.brightOrange}>user-scalable=no — never ship this. It blocks pinch-zoom.</text>

      <text x="18" y="322" fontSize="12" fill={t.text.primary}>One line in &lt;head&gt;. Without it, no media query you write will ever fire.</text>
      <text x="18" y="337" fontSize="11.5" fill={t.text.tertiary}>The phone is already 375px wide. The tag just stops the browser lying about it.</text>
    </svg>
  );
}

/* ---------- SVG 2: mobile-first vs desktop-first ---------- */

function MobileFirstLadder({ t }: { t: CanvasTokens }) {
  // [x, y, w, h, width label, line a, line b, ink]
  const steps = [
    [16, 112, 140, 60, "375px phone", "the plain rules", "no @media at all", t.chart.green],
    [176, 84, 170, 88, "768px tablet", "@media", "(min-width: 768px)", t.chart.blue],
    [366, 52, 178, 120, "1200px desktop", "@media", "(min-width: 1200px)", t.chart.blue],
  ] as const;

  const css = [
    ".cards { display: grid; grid-template-columns: 1fr; }",
    "",
    "@media (min-width: 768px) {",
    "  .cards { grid-template-columns: 1fr 1fr; }",
    "}",
    "@media (min-width: 1200px) {",
    "  .cards { grid-template-columns: 1fr 1fr 1fr; }",
    "}",
  ];

  return (
    <svg viewBox="0 0 560 372" width="100%" height="372" role="img" aria-label="Mobile-first CSS starts with the phone layout and adds rules as the screen grows wider, using min-width media queries. The alternative, max-width, starts from the desktop layout instead.">
      <text x="8" y="16" fontSize="11.5" fill={t.text.primary}>
        Mobile-first: the plain rules ARE the phone layout.
      </text>
      <text x="8" y="30" fontSize="11.5" fill={t.text.secondary}>
        Every @media query only adds rules, never undoes them.
      </text>

      {steps.map(([x, y, w, h, label, a, b, ink]) => (
        <g key={label}>
          <rect x={x} y={y} width={w} height={h} rx="8" fill={t.fill.tertiary} stroke={ink} strokeWidth="1.5" />
          <rect x={x} y={y} width={w} height="24" rx="8" fill={ink} opacity="0.9" />
          <rect x={x} y={y + 16} width={w} height="8" fill={ink} opacity="0.9" />
          <text x={x + 10} y={y + 17} fontSize="12" fontWeight="700" fill={ON_FILL}>{label}</text>
          <text x={x + 10} y={y + 44} fontSize="11" fontFamily={MONO} fill={t.text.primary}>{a}</text>
          <text x={x + 10} y={y + 59} fontSize="11" fontFamily={MONO} fill={t.text.secondary}>{b}</text>
        </g>
      ))}

      <text x="26" y="188" fontSize="11" fill={t.chart.green}>one column</text>
      <text x="186" y="188" fontSize="11" fill={t.chart.blue}>two columns</text>
      <text x="376" y="188" fontSize="11" fill={t.chart.blue}>three columns</text>

      <defs>
        <marker id="mfl-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>
      <line x1="158" y1="138" x2="174" y2="118" stroke={t.chart.goldenYellow} strokeWidth="2" markerEnd="url(#mfl-arrow)" />
      <line x1="348" y1="110" x2="364" y2="88" stroke={t.chart.goldenYellow} strokeWidth="2" markerEnd="url(#mfl-arrow)" />
      <text x="150" y="76" fontSize="11" fill={t.chart.goldenYellow}>screen gets wider, so we ADD</text>

      <rect x="8" y="200" width="544" height="132" rx="8" fill={ON_FILL} stroke={t.stroke.tertiary} />
      {css.map((line, i) => (
        <text key={i} x="22" y={222 + i * 14} fontSize="11" fontFamily={MONO} fill={line.startsWith("@") ? t.chart.goldenYellow : t.text.secondary}>
          {line}
        </text>
      ))}

      <text x="8" y="352" fontSize="11.5" fontWeight="700" fill={t.chart.goldenYellow}>
        Both directions work.
      </text>
      <text x="150" y="352" fontSize="11.5" fill={t.text.secondary}>
        min-width adds rules as the screen grows;
      </text>
      <text x="8" y="366" fontSize="11.5" fill={t.text.secondary}>
        max-width cancels them as it shrinks. Exercises use max-width, so read both.
      </text>
    </svg>
  );
}

/* ---------- SVG 3: one media query, taken apart ---------- */

function MediaQueryAnatomy({ t }: { t: CanvasTokens }) {
  // [x, width, label, caption line, ink]
  const parts = [
    [24, 96, "@media", "the at-rule. \"only if\"", t.chart.goldenYellow],
    [128, 168, "(min-width: 768px)", "the condition. This wide or wider.", t.chart.blue],
    [304, 40, "\u007B", "opens the block", t.text.tertiary],
    [352, 152, "selector { ... }", "normal CSS, only applied when true", t.chart.green],
  ] as const;

  return (
    <svg viewBox="0 0 560 362" width="100%" height="362" role="img" aria-label="A single CSS media query broken into its four parts, with the rule-order trap shown underneath">
      <text x="18" y="20" fontSize="13" fontWeight="700" fill={t.text.primary}>A media query is one CSS rule wrapped in a condition</text>

      {/* the query, spelled out on a dark strip */}
      <rect x="14" y="32" width="532" height="52" rx="8" fill={ON_FILL} stroke={t.stroke.tertiary} />
      {parts.map(([x, w, label, , ink], i) => (
        <g key={i}>
          <rect x={x} y="42" width={w} height="32" rx="5" fill={ink as string} opacity="0.16" />
          <text x={(x as number) + (w as number) / 2} y="63" textAnchor="middle" fontSize="12.5" fontFamily={MONO} fill={ink as string}>{label}</text>
        </g>
      ))}

      {/* captions, staggered onto two rows so neighbours cannot collide */}
      {parts.map(([x, w, , caption, ink], i) => (
        <g key={`c${i}`}>
          <line x1={(x as number) + (w as number) / 2} y1="84" x2={(x as number) + (w as number) / 2} y2={i % 2 === 0 ? 94 : 112} stroke={ink as string} strokeWidth="1.5" />
          <text x={x} y={i % 2 === 0 ? 108 : 126} fontSize="11" fill={t.text.secondary}>{caption}</text>
        </g>
      ))}

      {/* worked example */}
      <rect x="14" y="146" width="532" height="98" rx="8" fill={ON_FILL} stroke={t.stroke.tertiary} />
      <text x="24" y="164" fontSize="11" fontWeight="700" fill={t.text.tertiary}>THE WHOLE THING, AS YOU WOULD TYPE IT</text>
      <text x="24" y="184" fontSize="12.5" fontFamily={MONO} fill={t.text.secondary}>.cards &#123; grid-template-columns: 1fr; &#125;   <tspan fill={t.chart.green}>/* base: every phone */</tspan></text>
      <text x="24" y="206" fontSize="12.5" fontFamily={MONO} fill={t.chart.goldenYellow}>@media (min-width: 768px) &#123;</text>
      <text x="44" y="223" fontSize="12.5" fontFamily={MONO} fill={t.text.secondary}>.cards &#123; grid-template-columns: 1fr 1fr; &#125;</text>
      <text x="24" y="238" fontSize="12.5" fontFamily={MONO} fill={t.chart.goldenYellow}>&#125;</text>

      {/* the ordering trap */}
      <rect x="14" y="256" width="262" height="90" rx="8" fill={t.chart.brightOrange} opacity="0.1" />
      <rect x="14" y="256" width="262" height="90" rx="8" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="26" y="275" fontSize="12" fontWeight="700" fill={t.chart.brightOrange}>Query first, base second</text>
      <text x="26" y="294" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>@media (min-width: 768px) &#123; ... &#125;</text>
      <text x="26" y="309" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>.cards &#123; grid-template-columns: 1fr; &#125;</text>
      <text x="26" y="329" fontSize="11" fill={t.text.secondary}>The base rule comes last, so it wins</text>
      <text x="26" y="342" fontSize="11" fill={t.text.secondary}>everywhere. The query does nothing.</text>

      <rect x="284" y="256" width="262" height="90" rx="8" fill={t.chart.green} opacity="0.1" />
      <rect x="284" y="256" width="262" height="90" rx="8" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <text x="296" y="275" fontSize="12" fontWeight="700" fill={t.chart.green}>Base first, query second</text>
      <text x="296" y="294" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>.cards &#123; grid-template-columns: 1fr; &#125;</text>
      <text x="296" y="309" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>@media (min-width: 768px) &#123; ... &#125;</text>
      <text x="296" y="329" fontSize="11" fill={t.text.secondary}>Same weight, so the later rule wins</text>
      <text x="296" y="342" fontSize="11" fill={t.text.secondary}>on wide screens. This is what you want.</text>

      <text x="18" y="358" fontSize="11" fill={t.text.tertiary}>Two rules of equal weight: the one written later wins. That is the whole mechanism.</text>
    </svg>
  );
}

/* ---------- SVG 4: one layout, three widths ---------- */

function ResponsiveDevices({ t }: { t: CanvasTokens }) {
  // [label, frame x, frame w, columns, breakpoint caption]
  const screens = [
    ["Phone 375px", 14, 132, 1, "base rule, no query"],
    ["Tablet 768px", 166, 176, 2, "@media (min-width: 768px)"],
    ["Desktop 1024px", 358, 188, 3, "@media (min-width: 1024px)"],
  ] as const;

  return (
    <svg viewBox="0 0 560 348" width="100%" height="348" role="img" aria-label="The same card layout shown at phone, tablet and desktop widths, going from one column to two to three, with the CSS that causes each change">
      <text x="18" y="20" fontSize="13" fontWeight="700" fill={t.text.primary}>One page. One stylesheet. Three shapes.</text>

      {screens.map(([label, fx, fw, cols, note], i) => {
        const x = fx as number;
        const w = fw as number;
        const n = cols as number;
        const gap = 6;
        const inner = w - 20;
        const cardW = (inner - gap * (n - 1)) / n;
        const rows = n === 1 ? 3 : n === 2 ? 2 : 1;
        return (
          <g key={i}>
            {/* device frame */}
            <rect x={x} y="34" width={w} height="150" rx="9" fill={t.fill.tertiary} stroke={t.stroke.secondary} strokeWidth="1.5" />
            {/* header bar, identical in all three */}
            <rect x={x + 10} y="44" width={inner} height="14" rx="3" fill={t.chart.blue} opacity="0.55" />
            {/* the cards */}
            {Array.from({ length: n * rows }).map((_, k) => {
              const col = k % n;
              const row = Math.floor(k / n);
              const cardH = rows === 3 ? 30 : rows === 2 ? 48 : 100;
              return (
                <rect
                  key={k}
                  x={x + 10 + col * (cardW + gap)}
                  y={66 + row * (cardH + gap)}
                  width={cardW}
                  height={cardH}
                  rx="4"
                  fill={t.chart.green}
                  opacity="0.28"
                  stroke={t.chart.green}
                  strokeWidth="1"
                />
              );
            })}
            <text x={x + w / 2} y="200" textAnchor="middle" fontSize="12" fontWeight="700" fill={t.text.primary}>{label}</text>
            <text x={x + w / 2} y="216" textAnchor="middle" fontSize="11" fill={i === 0 ? t.chart.green : t.chart.goldenYellow}>{n} column{n > 1 ? "s" : ""}</text>
            <text x={x + w / 2} y="231" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={t.text.tertiary}>{note}</text>
          </g>
        );
      })}

      {/* the CSS that does all of it */}
      <rect x="14" y="244" width="532" height="96" rx="8" fill={ON_FILL} stroke={t.stroke.tertiary} />
      <text x="24" y="262" fontSize="11" fontWeight="700" fill={t.text.tertiary}>THE ENTIRE STYLESHEET FOR THAT</text>
      <text x="24" y="281" fontSize="11" fontFamily={MONO} fill={t.chart.green}>.cards &#123; display: grid; gap: 16px; grid-template-columns: 1fr; &#125;</text>
      <text x="24" y="299" fontSize="11" fontFamily={MONO} fill={t.chart.goldenYellow}>@media (min-width: 768px) &#123; .cards &#123; grid-template-columns: repeat(2, 1fr); &#125; &#125;</text>
      <text x="24" y="317" fontSize="11" fontFamily={MONO} fill={t.chart.goldenYellow}>@media (min-width: 1024px) &#123; .cards &#123; grid-template-columns: repeat(3, 1fr); &#125; &#125;</text>
      <text x="24" y="334" fontSize="11" fill={t.text.tertiary}>Three lines. No duplicated HTML, no separate mobile site, no JavaScript.</text>
    </svg>
  );
}

export default function Session15MobileReview() {
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
      {/* ---- Slide 1: Title ---- */}
      <PresentationSlide
        id="s15-title"
        title="Session 15 — Mobile Design & Course Review"
        notes="Final session! Responsive design, full course recap, presentation skills, and exam prep."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 15 (Final)</Tag>
          <H1>Mobile Interface Design &amp; Review</H1>
          <Text tone="secondary">Make your site responsive, review all 15 sessions, learn to present your project (CLO5), and prepare for the final exam.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 2: Objectives ---- */}
      <PresentationSlide id="s15-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>Objectives</H2>
          <Stack gap={6}>
            <Text>Add the viewport meta tag to every page</Text>
            <Text>Write media queries with both min-width (mobile-first) and max-width (desktop-first) approaches</Text>
            <Text>Make images flexible with max-width: 100% and height: auto</Text>
            <Text>Ensure touch targets are at least 44 x 44 px</Text>
            <Text>Test responsive layouts with Chrome DevTools Device Toolbar</Text>
            <Text>Present your web project effectively (CLO5)</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 3: Agenda / Timeline ---- */}
      <PresentationSlide id="s15-agenda" title="Session Timeline">
        <Stack gap={12}>
          <H2>150-Minute Plan (Final Session)</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <Row gap={8}><Pill>0:00 – 0:10</Pill><Text>Welcome + objectives</Text></Row>
              <Row gap={8}><Pill>0:10 – 0:15</Pill><Text>Recap warm-up</Text></Row>
              <Row gap={8}><Pill>0:15 – 0:45</Pill><Text>Lecture: viewport + media queries</Text></Row>
              <Row gap={8}><Pill>0:45 – 1:00</Pill><Text>Responsive checklist + testing</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Pill>1:00 – 1:10</Pill><Text>Break</Text></Row>
              <Row gap={8}><Pill>1:10 – 2:05</Pill><Text>In-class practice (55 min)</Text></Row>
              <Row gap={8}><Pill>2:05 – 2:20</Pill><Text>Course recap + CLO5 presenting</Text></Row>
              <Row gap={8}><Pill>2:20 – 2:30</Pill><Text>Exam prep + farewell</Text></Row>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 4: Recap Warm-Up ---- */}
      <PresentationSlide id="s15-warmup" title="Warm-Up Questions">
        <Stack gap={12}>
          <H2>Quick Recap — Session 14</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What CSS pseudo-class should always accompany :hover for dropdown menus?</Callout>
            <Callout tone="info">Q2: Which HTML5 element creates a native accordion without JavaScript?</Callout>
            <Callout tone="info">Q3: Why should you never start a new project with Spry?</Callout>
            <Text tone="secondary">Answers: (1) :focus-within; (2) details + summary; (3) unmaintained since 2012, insecure, not mobile-friendly.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 5: Why Mobile Matters ---- */}
      <PresentationSlide id="s15-why-mobile" title="Why Mobile Design Matters">
        <Stack gap={12}>
          <H2>The Mobile Reality</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <Text>Over 60% of global web traffic is from mobile devices</Text>
              <Text>Google uses mobile-first indexing for search rankings</Text>
              <Text>57% of users won't recommend a business with a bad mobile site</Text>
              <Text>Average phone width: 360px–430px CSS pixels</Text>
            </Stack>
            <Stack gap={6}>
              <Text>Average tablet width: 600px–1024px CSS pixels</Text>
              <Text>Your Student Club visitors check events on phones between classes</Text>
              <Text>If the site doesn't work on mobile, they leave</Text>
              <Callout tone="warning">Responsive = ONE website that adapts. NOT a separate mobile site.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 6: Viewport Meta Tag ---- */}
      <PresentationSlide id="s15-responsive" title="Viewport & Media Queries" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>Why a phone needs to be told the truth</H2>
          <Grid columns={1} gap={10}>
            <ViewportMeta t={t} />
          </Grid>
          <Text tone="secondary">One line in <Text as="span">&lt;head&gt;</Text> decides whether your site is readable on a phone. Everything else on this slide deck assumes it is there.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 7: Media Query Anatomy + Mobile-First ---- */}
      <PresentationSlide id="s15-media-queries" title="Media Query Breakpoints">
        <Stack gap={12}>
          <H2>Mobile first, and one query taken apart</H2>
          <Grid columns={1} gap={10}>
            <MobileFirstLadder t={t} />
          </Grid>
          <Divider />
          <Grid columns={1} gap={10}>
            <MediaQueryAnatomy t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 8: Breakpoint Reference Table ---- */}
      <PresentationSlide id="s15-breakpoints" title="Common Breakpoints">
        <Stack gap={10}>
          <H2>Breakpoint Quick Reference</H2>
          <Grid columns={1} gap={4}>
            <Stack gap={3}>
              <Row gap={8}><Pill>480px</Pill><Text>Small phones — tighter spacing, smaller headings</Text></Row>
              <Row gap={8}><Pill>768px</Pill><Text>Tablets / large phones — stack columns, compact nav</Text></Row>
              <Row gap={8}><Pill>1024px</Pill><Text>Landscape tablets — may restore some side-by-side layout</Text></Row>
              <Row gap={8}><Pill>1200px</Pill><Text>Desktops — full layout, max-width container</Text></Row>
            </Stack>
          </Grid>
          <Divider />
          <Grid columns={1} gap={10}>
            <ResponsiveDevices t={t} />
          </Grid>
          <Divider />
          <Stack gap={4}>
            <Text><Text as="span" fontWeight="700">min-width (mobile-first):</Text> base rules are the phone layout; queries ADD complexity as screen grows. Ascending order: 480px, then 768px.</Text>
            <Text><Text as="span" fontWeight="700">max-width (desktop-first):</Text> base rules are the desktop layout; queries OVERRIDE for smaller screens. Exercises use this approach.</Text>
            <Callout tone="info">Pick one direction per project. Do not mix min-width and max-width unless you have a specific reason.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 9: Flexible Images + Touch Targets ---- */}
      {/* ── Try It Now: Media Queries ─────────────────────────── */}
      <PresentationSlide id="s15-try-media" title="Try It Now: Add a Media Query" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — make your page responsive</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Add this to the bottom of style.css</Text>
              <Code language="css">{`/* Mobile: screens 768px and below */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }

  nav ul {
    flex-direction: column;
  }

  .two-column {
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then test it</Text>
              <Text>1. Press F12 → click the device toolbar icon (or Ctrl+Shift+M).</Text>
              <Text>2. Select "iPhone SE" or set width to 375px.</Text>
              <Text>3. The nav links should stack vertically, not overflow.</Text>
              <Text>4. The two-column layout should become one column.</Text>
              <Callout tone="info">If nothing changes, check that the media query is at the BOTTOM of the CSS file (later rules override earlier ones).</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Try It Now: Responsive Grid ─────────────────────────── */}
      <PresentationSlide id="s15-try-grid" title="Try It Now: Auto-Responsive Grid" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Four minutes — a grid that reflows with no media query</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">HTML</Text>
              <Code language="html">{`<div class="card-grid">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
  <article class="card">Card 4</article>
</div>`}</Code>
              <Text fontWeight="700">CSS</Text>
              <Code language="css">{`.card-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. On a wide window you get 3–4 columns.</Text>
              <Text>2. Narrow the window slowly — columns drop to 2, then 1.</Text>
              <Text>3. You wrote zero media queries. auto-fit did the work.</Text>
              <Text>4. minmax(250px, 1fr): never narrower than 250px, otherwise share space equally.</Text>
              <Callout tone="info">auto-fit + minmax is the single most useful responsive pattern in modern CSS. Memorise this line.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s15-flexible" title="Flexible Images & Touch Targets">
        <Stack gap={12}>
          <H2>Two Rules You Must Always Apply</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>Flexible Images</H3>
              <Code language="css">{`img {
  max-width: 100%;
  height: auto;
}`}</Code>
              <Text>Image shrinks to fit its container but never grows beyond natural size. height: auto preserves aspect ratio.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Touch Targets (44px minimum)</H3>
              <Code language="css">{`nav a, .btn {
  min-height: 44px;
  padding: 12px 16px;
}`}</Code>
              <Text>Average fingertip contact area is ~44x44 CSS pixels. Buttons and links below this cause mis-taps. Apple HIG + WCAG 2.5.5 standard.</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">font-size: 16px on form inputs prevents iOS Safari from auto-zooming on focus.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 10: Worked Example — Complete Mobile-First CSS ---- */}
      <PresentationSlide id="s15-worked-example" title="Worked Example: Mobile-First CSS" background={{ pattern: "grid", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Complete Mobile-First Responsive Layout</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="css">{`/* === BASE: phone (375px) === */
.container { padding: 12px; }
.nav { display: flex; flex-direction: column; }
.nav a { padding: 12px; /* 44px touch target */ }
.cards { display: grid;
  grid-template-columns: 1fr; gap: 16px; }
.hero-img { width: 100%; height: auto; }
.sidebar { display: none; }

/* === LARGE PHONE (480px+) === */
@media (min-width: 480px) {
  .hero-title { font-size: 2rem; }
  .cards { gap: 20px; }
}

/* === TABLET (768px+) === */
@media (min-width: 768px) {
  .container { padding: 24px; max-width: 720px;
    margin: 0 auto; }
  .nav { flex-direction: row; }
  .cards { grid-template-columns: 1fr 1fr; }
  .sidebar { display: block; }
}`}</Code>
            <Stack gap={5}>
              <Text size="small"><Text as="span" fontWeight="700">Base rules first</Text>: these ARE the phone layout. No media query needed for 375px.</Text>
              <Text size="small"><Text as="span" fontWeight="700">flex-direction: column</Text> stacks nav links vertically on phones. Each link has 12px padding for 44px touch targets.</Text>
              <Text size="small"><Text as="span" fontWeight="700">grid-template-columns: 1fr</Text> means one column on phones. Cards stack naturally.</Text>
              <Text size="small"><Text as="span" fontWeight="700">width: 100%; height: auto</Text> makes images shrink to fit any screen without distortion.</Text>
              <Text size="small"><Text as="span" fontWeight="700">@media (min-width: 480px)</Text> adjusts font sizes and spacing for larger phones. Ascending order: 480px before 768px.</Text>
              <Text size="small"><Text as="span" fontWeight="700">@media (min-width: 768px)</Text> adds two-column cards, horizontal nav, and shows the sidebar. Rules ADD, never undo.</Text>
              <Callout tone="info">Test in Chrome DevTools: press F12, toggle Device Toolbar (Ctrl+Shift+M), resize to 375px / 480px / 768px and watch the layout change.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 11: Worked Example 2 — Desktop-First ---- */}
      <PresentationSlide id="s15-worked-example-2" title="Worked Example: Desktop-First CSS" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={10}>
          <H2>Desktop-First Approach (Exercises Use This)</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="css">{`/* === DESKTOP DEFAULTS === */
main { width: 65%; float: left; padding: 25px; }
#sidebar { width: 35%; float: left; }
.gallery-item { width: calc(33.33% - 10px); }

/* === TABLET (<=768px) === */
@media (max-width: 768px) {
  main, #sidebar { width: 100%; float: none; }
  #sidebar { border-top: 2px solid #2874a6;
    margin-top: 20px; }
  .gallery-item { width: 100%; }
  .btn { display: block; width: 100%;
    padding: 14px; font-size: 16px; }
}

/* === SMALL PHONE (<=480px) === */
@media (max-width: 480px) {
  header h1 { font-size: 24px; }
  nav ul li a { padding: 8px 10px;
    font-size: 12px; }
  main { padding: 10px; }
}`}</Code>
            <Stack gap={5}>
              <Text size="small"><Text as="span" fontWeight="700">Base rules = desktop</Text>: the non-query styles build the full two-column layout.</Text>
              <Text size="small"><Text as="span" fontWeight="700">max-width: 768px</Text> overrides for tablets/phones: stacks columns, removes floats, full-width buttons.</Text>
              <Text size="small"><Text as="span" fontWeight="700">max-width: 480px</Text> further reduces heading sizes and padding for small phones.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Order matters:</Text> 768px query BEFORE 480px query. Both apply at 375px, but 480px rules come later and win for overlapping properties.</Text>
              <Text size="small"><Text as="span" fontWeight="700">float: none</Text> undoes the desktop float layout. On mobile, elements stack naturally in document order.</Text>
              <Callout tone="info">Both approaches produce the same visual result. Pick one direction per project and stay consistent.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 12: Testing with DevTools ---- */}
      <PresentationSlide id="s15-devtools" title="Testing with Chrome DevTools">
        <Stack gap={12}>
          <H2>How to Test Responsive Design</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>Step-by-Step</H3>
              <Text>1. Open page in Chrome</Text>
              <Text>2. Press F12 to open DevTools</Text>
              <Text>3. Click Device Toggle icon (or Ctrl+Shift+M)</Text>
              <Text>4. Select a device preset or drag to custom width</Text>
              <Text>5. Rotate between portrait and landscape</Text>
            </Stack>
            <Stack gap={6}>
              <H3>What to Check</H3>
              <Text>Navigation usable (stacked or scrollable)?</Text>
              <Text>Text readable without zooming?</Text>
              <Text>Images within screen bounds?</Text>
              <Text>Buttons tappable (44px+ tall)?</Text>
              <Text>Forms fillable (full-width inputs)?</Text>
              <Text>No horizontal scroll bar?</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Test at minimum three widths: 375px (phone), 768px (tablet), 1200px (desktop). Resize slowly to catch layout breaks.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 13: Quick Check ---- */}
      <PresentationSlide id="s15-quickcheck" title="Quick Check">
        <Stack gap={12}>
          <H2>Quick Check — Discuss with Your Neighbor</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What happens on a phone if you forget the viewport meta tag?</Callout>
            <Callout tone="info">Q2: In mobile-first CSS, should breakpoints go in ascending or descending order?</Callout>
            <Callout tone="info">Q3: Why do we set img to max-width: 100% and height: auto?</Callout>
          </Stack>
          <Text tone="secondary">Discuss for 2 minutes. (1) Phone renders at 980px then shrinks — everything tiny. (2) Ascending: base, then 480px, then 768px. (3) So images scale down without distortion on narrow screens.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Mobile Nav Stack ────────────────────────── */}
      <PresentationSlide id="s15-try-nav-stack" title="Try It Now: Stack the Nav on Mobile" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Four minutes — horizontal on desktop, vertical on phone</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Mobile-first CSS</Text>
              <Code language="css">{`/* Base = mobile: stacked */
nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
}

nav a {
  display: block;
  padding: 12px;
  min-height: 44px;
}

/* Tablet and up: horizontal */
@media (min-width: 768px) {
  nav ul {
    flex-direction: row;
    gap: 20px;
  }
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Open DevTools (F12) and toggle device toolbar (Ctrl+Shift+M).</Text>
              <Text>2. Pick iPhone SE — links stack vertically, each easy to tap.</Text>
              <Text>3. Switch to iPad — links line up horizontally.</Text>
              <Text>4. min-height: 44px is the Apple-recommended minimum touch target.</Text>
              <Text>5. display: block on the link makes the whole padded area tappable.</Text>
              <Callout tone="info">Mobile-first means the base CSS is the phone layout. Media queries only ADD complexity for bigger screens.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 14: Responsive Checklist ---- */}
      <PresentationSlide id="s15-checklist" title="Responsive Design Checklist">
        <Stack gap={10}>
          <H2>Before You Ship: The Checklist</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={4}>
              <Text>Every page has the viewport meta tag</Text>
              <Text>All images use max-width: 100% + height: auto</Text>
              <Text>box-sizing: border-box applied globally</Text>
              <Text>Touch targets are 44px+ on mobile</Text>
              <Text>Columns stack vertically below 768px</Text>
            </Stack>
            <Stack gap={4}>
              <Text>Nav is usable on mobile (stacked or hamburger)</Text>
              <Text>Forms have full-width inputs on small screens</Text>
              <Text>Tables scroll horizontally if too wide</Text>
              <Text>Tested at 375px, 768px, and 1200px</Text>
              <Text>No user-scalable=no in viewport tag</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 15: Common Mistakes ---- */}
      <PresentationSlide id="s15-mistakes" title="Common Mistakes" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={12}>
          <H2>7 Common Mistakes (and Fixes)</H2>
          <Stack gap={6}>
            <Text tone="danger">1. Forgetting the viewport meta tag — everything tiny on mobile</Text>
            <Text tone="danger">2. Fixed-width images — overflow on narrow screens; use max-width: 100%</Text>
            <Text tone="danger">3. Only testing on desktop — resize to 375px, 768px, 1200px minimum</Text>
            <Text tone="danger">4. Tiny touch targets — nav links and buttons must be at least 44px tall</Text>
            <Text tone="danger">5. Disabling zoom (user-scalable=no) — accessibility violation</Text>
            <Text tone="danger">6. Writing the media query before the base rule — the base wins and the query does nothing</Text>
            <Text tone="danger">7. Mixing min-width and max-width in the same project — confusing cascade</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 15b: Responsive Do vs Don't ---- */}
      <PresentationSlide id="s15-do-dont" title="Responsive Do vs Don't">
        <Stack gap={10}>
          <H2>Responsive Design: Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Include the viewport meta tag on every page</Text>
              <Text>Use max-width: 100% on all images</Text>
              <Text>Write base styles first, then add media queries</Text>
              <Text>Make touch targets at least 44px tall</Text>
              <Text>Test at 375px, 768px, and 1200px minimum</Text>
              <Text>Pick one strategy: mobile-first OR desktop-first per project</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Skip the viewport meta tag (everything renders tiny)</Text>
              <Text>Set fixed pixel widths on images or containers</Text>
              <Text>Use user-scalable=no (blocks zoom for low-vision users)</Text>
              <Text>Mix min-width and max-width in the same stylesheet</Text>
              <Text>Only test on your laptop screen</Text>
              <Text>Hide content with display: none just to fit small screens</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 16: Practice ---- */}
      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s15-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This responsive CSS has three bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy CSS</Text>
              <Code language="css">{`/* Desktop styles */
.container {
  width: 960px;
  margin: 0 auto;
}

/* Mobile */
@media (max-width: 768px) {
  .container {
    width: 960px;
  }

  nav ul li {
    display: inline-block;
  }

  img {
    width: 960px;
  }
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. .container width is still 960px inside the media query — should be 100% or auto for mobile.</Text>
              <Text tone="danger">2. nav ul li is still inline-block — should be display: block to stack vertically on mobile.</Text>
              <Text tone="danger">3. img width is 960px — should be max-width: 100% to fit the mobile screen.</Text>
              <Callout tone="info">The media query is correct, but the values inside it are still desktop values. The whole point of a media query is to CHANGE the layout.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Mobile Accessibility ───────────────────────────────── */}
      <PresentationSlide id="s15-mobile-a11y" title="Mobile Accessibility">
        <Stack gap={12}>
          <H2>Small Screens, Bigger Accessibility Stakes</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Touch targets</Pill><Text>Buttons and links need at least 44&#215;44px of tappable area.</Text></Row>
            <Row gap={8}><Pill>Spacing</Pill><Text>Leave 8px minimum between tappable elements so fingers do not hit the wrong one.</Text></Row>
            <Row gap={8}><Pill>Zoom</Pill><Text>Never use maximum-scale=1 or user-scalable=no — it blocks users who need to zoom.</Text></Row>
            <Row gap={8}><Pill>Font size</Pill><Text>16px minimum for body text. Smaller text triggers auto-zoom on iOS form fields.</Text></Row>
            <Row gap={8}><Pill>Orientation</Pill><Text>The layout must work in both portrait and landscape.</Text></Row>
            <Row gap={8}><Pill>No hover</Pill><Text>Anything that only appears on :hover is unreachable on touch devices.</Text></Row>
          </Stack>
          <Callout tone="warning">The viewport meta tag must stay &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt; — nothing more.</Callout>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s15-practice" title="Practice Exercises" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>Hands-On Practice</H2>
          <Callout tone="info">Estimated time: 55 minutes</Callout>
          <Stack gap={6}>
            <H3>exercises/session-15/</H3>
            <Text>Task 1 — Understand responsive design principles</Text>
            <Text>Task 2 — Add the viewport meta tag to all HTML pages</Text>
            <Text>Task 3 — Test your site on different screen sizes with DevTools</Text>
            <Text>Task 4 — Write media queries at 768px (tablet) and 480px (phone) breakpoints</Text>
            <Text>Task 5 — Make navigation mobile-friendly and add touch target rules</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 17: Full-Course Recap ---- */}
      <PresentationSlide id="s15-recap-full" title="Full Course Recap">
        <Stack gap={10}>
          <H2>15 Sessions in Review</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={10}>
            <Stack gap={4}>
              <H3>Sessions 1–5</H3>
              <Text>HTML structure, CSS basics, box model, two-column layouts</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Sessions 6–10</H3>
              <Text>Multi-page sites, CSS3 effects, tables, HTML5 media</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Sessions 11–15</H3>
              <Text>Compact design, debugging, forms, CSS-only nav, responsive</Text>
            </Stack>
          </Grid>
          <Divider />
          <Row gap={8}>
            <Pill>HTML5</Pill><Pill>CSS3</Pill><Pill>Flexbox</Pill><Pill>Forms</Pill><Pill>Tables</Pill><Pill>Media Queries</Pill><Pill>Accessibility</Pill>
          </Row>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 18: Course-Wide Recap Table ---- */}
      <PresentationSlide id="s15-recap-table" title="Key Skills by Session">
        <Stack gap={8}>
          <H2>Skills Map</H2>
          <Grid columns={1} gap={3}>
            <Stack gap={2}>
              <Row gap={6}><Pill>1–3</Pill><Text>HTML docs, text, images, links, lists</Text></Row>
              <Row gap={6}><Pill>4–5</Pill><Text>CSS selectors, box model, two-column float layout</Text></Row>
              <Row gap={6}><Pill>6–7</Pill><Text>Multi-page nav, CSS3 effects, Google Fonts</Text></Row>
              <Row gap={6}><Pill>8</Pill><Text>Midterm review and practice exam</Text></Row>
              <Row gap={6}><Pill>9–10</Pill><Text>Data tables (colspan/rowspan), HTML5 video/audio</Text></Row>
              <Row gap={6}><Pill>11–12</Pill><Text>Compact design, W3C validation, DevTools debugging</Text></Row>
              <Row gap={6}><Pill>13</Pill><Text>Forms: input types, labels, fieldsets, validation</Text></Row>
              <Row gap={6}><Pill>14</Pill><Text>Spry legacy, CSS-only dropdowns, details/summary</Text></Row>
              <Row gap={6}><Pill>15</Pill><Text>Viewport, media queries, responsive, course review</Text></Row>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This: Responsive ──────────────────────────────── */}
      <PresentationSlide id="s15-debug-2" title="Debug This: Broken Responsive Page">
        <Stack gap={10}>
          <H2>Find five problems</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Broken code</Text>
              <Code language="html">{`<meta name="viewport"
      content="width=1024, user-scalable=no">`}</Code>
              <Code language="css">{`.container { width: 1200px; }

img { width: 800px; }

@media (max-width: 768px) {
  .container { width: 1200px; }
}

nav a { padding: 2px; font-size: 11px; }`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">The five problems</Text>
              <Row gap={8}><Tag tone="danger">1</Tag><Text>viewport says width=1024 — must be width=device-width.</Text></Row>
              <Row gap={8}><Tag tone="danger">2</Tag><Text>user-scalable=no blocks zoom. Remove it — it is an accessibility failure.</Text></Row>
              <Row gap={8}><Tag tone="danger">3</Tag><Text>.container has a fixed 1200px width. Use max-width: 1200px; width: 100%.</Text></Row>
              <Row gap={8}><Tag tone="danger">4</Tag><Text>img width: 800px overflows phones. Use max-width: 100%; height: auto.</Text></Row>
              <Row gap={8}><Tag tone="danger">5</Tag><Text>Nav links are 11px with 2px padding — far below the 44px touch target and 16px text minimum.</Text></Row>
              <Callout tone="warning">Bonus: the media query re-declares the same 1200px, so it changes nothing. A media query that repeats the base value is dead code.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 19: Presenting Your Project (CLO5) ---- */}
      <PresentationSlide id="s15-clo5" title="Presenting Your Project (CLO5)">
        <Stack gap={12}>
          <H2>Presenting Your Project (CLO5)</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H3>7-Slide Talk Structure</H3>
              <Text>1. Title — project name + your name</Text>
              <Text>2. Goal &amp; audience — who it helps and how</Text>
              <Text>3. Site map — pages and connections</Text>
              <Text>4. Live demo — follow a visitor's journey</Text>
              <Text>5. Design decisions — I chose X because Y</Text>
              <Text>6. Challenges &amp; fixes — one bug you solved</Text>
              <Text>7. Conclusion — what you would add next</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Demo Tips</H3>
              <Text>Open with the finished page, not your code</Text>
              <Text>Narrate while clicking — no silent pauses</Text>
              <Text>Resize window to show responsive design</Text>
              <Text>Translate jargon into user benefits</Text>
              <Callout tone="info">Keep screenshots as backup if projector fails.</Callout>
            </Stack>
          </Grid>
          <Text tone="secondary" size="small">Optional exam prep — not graded homework. Practice once out loud, timing yourself to 5 minutes.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 20: Final Exam Prep ---- */}
      <PresentationSlide id="s15-exam" title="Final Exam Preparation">
        <Stack gap={12}>
          <H2>Final Exam Prep</H2>
          <Stack gap={6}>
            <H3>Must-Know Topics</H3>
            <Text>Write a complete HTML5 page with proper structure</Text>
            <Text>Create two-column layouts (header, nav, main, sidebar, footer)</Text>
            <Text>Build and style forms with 5+ input types, labels, fieldsets</Text>
            <Text>Create data tables with colspan/rowspan</Text>
            <Text>Write media queries and explain the viewport meta tag</Text>
            <Text>Apply CSS3 effects: border-radius, box-shadow, transitions</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Your Student Club Website IS your study guide — it contains examples of every topic.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s15-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>You can explain why the viewport meta tag is required for mobile-friendly pages.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Every HTML page has &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Open DevTools (F12) → Toggle Device Toolbar → your site looks correct at 375px and 768px.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>At 768px, the layout changes — columns stack, font sizes adjust, nav becomes mobile-friendly.</Text></Row>
            <Row gap={8}><Pill>Task 5</Pill><Text>Touch targets (buttons, links) are at least 44×44px — easy to tap on a phone.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If nothing changes when you resize, check that the media query is inside the CSS file and the file is linked correctly.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s15-assignment" title="Assignment: Make Your Site Responsive">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>Your Student Club Website is fully responsive at 320px, 768px, and 1024px.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>Viewport meta tag on every HTML page.</Text>
              <Text>Media query at 768px with changes for at least 5 elements.</Text>
              <Text>Images are responsive (max-width: 100%, height: auto).</Text>
              <Text>Navigation works on mobile (stacked or hamburger-style).</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Test at 320px, 768px, and 1024px in DevTools.</Text>
              <Text>Check that no horizontal scrollbar appears at any width.</Text>
              <Text>Ask a friend to test on their actual phone.</Text>
              <Callout tone="warning">A site that only works on your laptop is not a website. Test on real devices.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 21: Homework & Close ---- */}
      <PresentationSlide id="s15-close" title="Homework & Farewell">
        <Stack gap={12} align="center">
          <H2>Last Homework &amp; Farewell</H2>
          <Stack gap={6}>
            <H3>homework/session-15/</H3>
            <Text>Add the viewport meta tag to all HTML pages.</Text>
            <Text>Write a media query at 768px with changes for at least 5 elements.</Text>
            <Text>Make images responsive (max-width: 100%, height: auto).</Text>
            <Text>Test your site at 320px, 768px, and 1024px.</Text>
            <Callout tone="warning">Due Sunday 23:59 — final submission</Callout>
          </Stack>
          <Divider />
          <Stack gap={6}>
            <Text tone="secondary" size="small">Optional: Prepare a 7-slide presentation outline for the final exam (CLO5).</Text>
            <Text>Congratulations on completing INS2053!</Text>
            <Text tone="secondary">You can now build, style, and present complete responsive websites. Good luck on the final exam.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
