import {
  Callout,
  Code,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Presentation,
  PresentationFragment,
  PresentationSlide,
  Row,
  Stack,
  Tag,
  Text,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 11: designing a compact site)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. A flat site map, and the two shapes to avoid ---------- */

function SiteMap({ t }: { t: CanvasTokens }) {
  const kids = [
    ["about.html", 22, false],
    ["events.html", 130, false],
    ["gallery.html", 238, false],
    ["contact.html", 346, false],
    ["members.html", 454, true],
  ] as const;

  const chain = ["index.html", "about.html", "team.html", "mai.html"] as const;

  return (
    <svg viewBox="0 0 560 302" width="100%" height="302" role="img"
      aria-label="A flat site map where every page sits one click below the home page, contrasted with two shapes to avoid: a chain three clicks deep, and an orphan page that nothing links to.">
      <defs>
        <marker id="s11-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 z" fill={t.chart.brightOrange} />
        </marker>
      </defs>

      {/* GOOD: flat map */}
      <rect x="6" y="4" width="548" height="148" rx="8" fill={t.chart.green} opacity="0.1" />
      <rect x="6" y="4" width="548" height="148" rx="8" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <rect x="18" y="-4" width="120" height="16" rx="8" fill={t.chart.green} />
      <text x="78" y="8" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>DRAW THIS FIRST</text>

      <rect x="232" y="26" width="96" height="30" rx="6" fill={t.chart.blue} />
      <text x="280" y="45.5" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ON_FILL}>index.html</text>
      <text x="336" y="45.5" fontSize="11.5" fill={t.text.secondary}>the home page</text>

      <line x1="280" y1="56" x2="280" y2="74" stroke={t.chart.green} strokeWidth="2" />
      <line x1="64" y1="74" x2="496" y2="74" stroke={t.chart.green} strokeWidth="2" />
      {kids.map(([name, x, future]) => (
        <g key={name}>
          <line x1={Number(x) + 42} y1="74" x2={Number(x) + 42} y2="88" stroke={t.chart.green} strokeWidth="2" />
          <rect x={x} y="88" width="84" height="30" rx="5"
            fill={future ? "none" : t.bg.elevated}
            stroke={future ? t.chart.green : t.stroke.secondary}
            strokeWidth="1.5" strokeDasharray={future ? "5 3" : undefined} />
          <text x={Number(x) + 42} y={future ? 101 : 107} textAnchor="middle" fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>{name}</text>
          {future ? <text x={Number(x) + 42} y="113" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>next term</text> : null}
        </g>
      ))}
      <text x="280" y="140" textAnchor="middle" fontSize="12.5" fill={t.text.primary}>
        Five pages, every one of them <tspan fontWeight="700">exactly one click</tspan> from home.
      </text>

      {/* BAD: too deep, and orphaned */}
      <rect x="6" y="160" width="548" height="102" rx="8" fill={t.chart.brightOrange} opacity="0.12" />
      <rect x="6" y="160" width="548" height="102" rx="8" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <rect x="18" y="152" width="152" height="16" rx="8" fill={t.chart.brightOrange} />
      <text x="94" y="164" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>THE TWO SHAPES TO AVOID</text>

      {chain.map((name, i) => (
        <g key={"ch" + i}>
          <rect x={16 + i * 84} y="184" width="76" height="26" rx="5" fill={t.bg.elevated} stroke={t.chart.brightOrange} />
          <text x={54 + i * 84} y="200.5" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={t.text.primary}>{name}</text>
          {i < 3 ? <line x1={94 + i * 84} y1="197" x2={98 + i * 84} y2="197" stroke={t.chart.brightOrange} strokeWidth="2" markerEnd="url(#s11-arrow)" /> : null}
        </g>
      ))}
      <text x="16" y="230" fontSize="12" fill={t.text.primary}>Three clicks to read one person's bio. Nobody</text>
      <text x="16" y="246" fontSize="12" fill={t.text.primary}>clicks that far. Keep everything within two.</text>

      <line x1="352" y1="176" x2="352" y2="252" stroke={t.stroke.secondary} strokeDasharray="4 3" />
      <rect x="372" y="184" width="128" height="26" rx="5" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeDasharray="5 3" strokeWidth="1.5" />
      <text x="436" y="200.5" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={t.text.primary}>prices.html</text>
      <text x="510" y="200.5" fontSize="16" fontWeight="700" fill={t.chart.brightOrange}>✗</text>
      <text x="372" y="230" fontSize="12" fill={t.text.primary}>An orphan page: it exists,</text>
      <text x="372" y="246" fontSize="12" fill={t.text.primary}>but no nav item links to it.</text>

      <text x="280" y="286" textAnchor="middle" fontSize="12.5" fill={t.text.secondary}>
        Draw this map on paper first. Saves an hour of renaming later.
      </text>
    </svg>
  );
}

/* ---------- 2. DRY: the cost of copying one line into four files ---------- */

function DryPrinciple({ t }: { t: CanvasTokens }) {
  const files = ["index.html", "about.html", "events.html", "contact.html"] as const;

  const card = (
    px: number, py: number, name: string, body: string, ink: string, ring: string, key: string
  ) => (
    <g key={key}>
      <rect x={px} y={py} width="116" height="60" rx="6" fill={t.bg.elevated} stroke={ring} strokeWidth="1.5" />
      <rect x={px} y={py} width="116" height="17" rx="6" fill={t.fill.tertiary} />
      <rect x={px} y={py + 11} width="116" height="6" fill={t.fill.tertiary} />
      <text x={px + 58} y={py + 12.5} textAnchor="middle" fontSize="11" fontFamily={MONO} fill={t.text.secondary}>{name}</text>
      <text x={px + 58} y={py + 41} textAnchor="middle" fontSize="11" fontFamily={MONO} fill={ink}>{body}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 296" width="100%" height="296" role="img"
      aria-label="The same email address copied into four pages, which means four edits every time it changes, next to the DRY version where the address lives once on the contact page and the other three pages link to it.">
      <text x="142" y="16" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.chart.brightOrange}>COPIED INTO EVERY PAGE</text>
      <text x="420" y="16" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.chart.green}>WRITTEN ONCE, LINKED TO</text>

      <rect x="6" y="24" width="272" height="194" rx="8" fill={t.chart.brightOrange} opacity="0.1" />
      <rect x="286" y="24" width="268" height="194" rx="8" fill={t.chart.green} opacity="0.1" />

      {files.map((f, i) =>
        card(18 + (i % 2) * 130, 40 + Math.floor(i / 2) * 68, f, "club@vnu.edu.vn", t.chart.brightOrange, t.chart.brightOrange, "bad" + i)
      )}
      {files.map((f, i) =>
        card(
          298 + (i % 2) * 130, 40 + Math.floor(i / 2) * 68, f,
          i === 3 ? "club@vnu.edu.vn" : "→ contact.html",
          i === 3 ? t.chart.green : t.chart.blue,
          i === 3 ? t.chart.green : t.stroke.secondary,
          "good" + i
        )
      )}

      <text x="18" y="190" fontSize="12" fill={t.text.primary}>The club changes its email. Four files to edit,</text>
      <text x="18" y="206" fontSize="12" fill={t.text.primary}>and you will miss one. That one is now a lie.</text>
      <text x="298" y="190" fontSize="12" fill={t.text.primary}>New email? One file to edit.</text>
      <text x="298" y="206" fontSize="12" fill={t.text.primary}>Nothing else can fall out of date.</text>

      <rect x="6" y="226" width="548" height="64" rx="7" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="20" y="248" fontSize="12.5" fill={t.text.primary}>
        <tspan fontWeight="700">DRY — Don't Repeat Yourself.</tspan> Every fact lives in exactly one place:
      </text>
      <rect x="20" y="256" width="290" height="24" rx="5" fill={t.chart.blue} />
      <text x="30" y="272.5" fontSize="12" fontFamily={MONO} fill={ON_FILL}>&lt;a href="contact.html"&gt;Get in touch&lt;/a&gt;</text>
      <text x="322" y="266" fontSize="12" fill={t.text.secondary}>Also why all four pages</text>
      <text x="322" y="280" fontSize="12" fill={t.text.secondary}>share one style.css.</text>
    </svg>
  );
}

/* ---------- 3. Visual hierarchy: the same words, twice ---------- */

function VisualHierarchy({ t }: { t: CanvasTokens }) {
  const flat = [
    "Student Club",
    "About the club",
    "We meet every Friday in room 305 to",
    "build small websites together.",
    "Upcoming events",
    "Film night, coding clinic, careers talk.",
    "Contact",
    "Write to club@vnu.edu.vn any time.",
  ] as const;

  const levers = [
    ["SIZE", "36px beats 16px"],
    ["WEIGHT", "700 beats 400"],
    ["SPACE", "air marks a new idea"],
    ["COLOUR", "one accent, not five"],
  ] as const;

  return (
    <svg viewBox="0 0 560 288" width="100%" height="288" role="img"
      aria-label="The same eight lines of text set flat at one size, where the eye has nowhere to land, next to the same lines set with a heading scale and spacing, plus the four levers of hierarchy and the CSS size ladder.">
      <text x="142" y="16" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.chart.brightOrange}>EVERY LINE THE SAME SIZE</text>
      <text x="420" y="16" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.chart.green}>A SCALE THE EYE CAN FOLLOW</text>

      {/* flat version */}
      <rect x="6" y="24" width="272" height="144" rx="8" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      {flat.map((line, i) => (
        <text key={"f" + i} x="20" y={44 + i * 15} fontSize="11.5" fill={t.text.secondary}>{line}</text>
      ))}
      <text x="20" y="162" fontSize="11.5" fontStyle="italic" fill={t.chart.brightOrange}>Where does the page even begin?</text>

      {/* hierarchy version */}
      <rect x="286" y="24" width="268" height="144" rx="8" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <text x="300" y="50" fontSize="19" fontWeight="700" fill={t.chart.blue}>Student Club</text>
      <rect x="300" y="56" width="42" height="3" rx="1.5" fill={t.chart.goldenYellow} />
      <text x="300" y="80" fontSize="14" fontWeight="700" fill={t.text.primary}>About the club</text>
      <text x="300" y="96" fontSize="11.5" fill={t.text.secondary}>We meet every Friday in room 305 to</text>
      <text x="300" y="110" fontSize="11.5" fill={t.text.secondary}>build small websites together.</text>
      <text x="300" y="132" fontSize="14" fontWeight="700" fill={t.text.primary}>Upcoming events</text>
      <text x="300" y="148" fontSize="11.5" fill={t.text.secondary}>Film night, coding clinic, talk.</text>
      <text x="300" y="162" fontSize="11.5" fill={t.chart.green}>Same words. Only scale and air.</text>

      {/* the four levers */}
      {levers.map(([name, how], i) => (
        <g key={"lv" + i}>
          <rect x={6 + i * 138} y="178" width="130" height="34" rx="6" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
          <text x={71 + i * 138} y="193" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.chart.goldenYellow} letterSpacing="0.5">{name}</text>
          <text x={71 + i * 138} y="206" textAnchor="middle" fontSize="11" fill={t.text.secondary}>{how}</text>
        </g>
      ))}

      {/* the ladder in CSS */}
      <rect x="6" y="220" width="548" height="42" rx="6" fill={t.chart.blue} opacity="0.12" />
      <text x="20" y="238" fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>h1 {"{"} font-size: 36px; font-weight: 700; {"}"}   h2 {"{"} 26px; 600 {"}"}</text>
      <text x="20" y="255" fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>p  {"{"} font-size: 16px; line-height: 1.6; {"}"}   .caption {"{"} 13px; grey {"}"}</text>

      <text x="280" y="280" textAnchor="middle" fontSize="12.5" fill={t.text.primary}>
        <tspan fontWeight="700">One h1 per page.</tspan> h2 sits under h1, h3 under h2 — never skip a level.
      </text>
    </svg>
  );
}

/* ---------- 4. Turning a vague client brief into a 7-line spec ---------- */

function BriefToSpec({ t }: { t: CanvasTokens }) {
  const brief = [
    "Hi! We need a website for our",
    "bookshop. Something modern.",
    "Show our books and let people",
    "contact us. Make it nice!",
  ] as const;

  const spec = [
    ["1 Goal", "sell books to local students", false],
    ["2 Audience", "students, mostly on phones", false],
    ["3 Pages", "index, books, about, contact", false],
    ["4 Functional", "price table + contact form", false],
    ["5 Non-func.", "works at 360px, loads < 3s", false],
    ["6 Out of scope", "no payment, no user accounts", true],
    ["7 Success", "5 form enquiries a week", false],
  ] as const;

  return (
    <svg viewBox="0 0 560 306" width="100%" height="306" role="img"
      aria-label="A vague four-line client brief for a bookshop turned into a seven-line written specification, with the difference between functional and non-functional requirements and why the out-of-scope line matters.">
      <defs>
        <marker id="s11-tip" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>

      <text x="104" y="14" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.4">WHAT THE CLIENT SENDS</text>
      <text x="396" y="14" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.4">WHAT YOU SEND BACK</text>

      {/* the brief */}
      <rect x="6" y="22" width="196" height="150" rx="4" fill={t.chart.goldenYellow} opacity="0.9" />
      {brief.map((line, i) => (
        <text key={"br" + i} x="20" y={48 + i * 18} fontSize="12" fill={ON_FILL}>{line}</text>
      ))}
      <text x="20" y="128" fontSize="11.5" fontStyle="italic" fill={ON_FILL}>— Nguyen, bookshop owner</text>
      <line x1="20" y1="138" x2="188" y2="138" stroke={ON_FILL} opacity="0.35" />
      <text x="20" y="156" fontSize="11.5" fontWeight="700" fill={ON_FILL}>"Modern" and "nice" are not</text>
      <text x="20" y="168" fontSize="11.5" fontWeight="700" fill={ON_FILL}>requirements. You decide them.</text>

      <line x1="206" y1="96" x2="230" y2="96" stroke={t.chart.goldenYellow} strokeWidth="3" markerEnd="url(#s11-tip)" />
      <text x="218" y="86" textAnchor="middle" fontSize="11" fill={t.text.secondary}>you</text>

      {/* the spec */}
      <rect x="238" y="22" width="316" height="150" rx="7" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <rect x="238" y="22" width="316" height="20" rx="7" fill={t.chart.green} />
      <rect x="238" y="36" width="316" height="6" fill={t.chart.green} />
      <text x="250" y="36" fontSize="11.5" fontWeight="700" fontFamily={MONO} fill={ON_FILL}>requirements.md</text>
      {spec.map(([label, value, hot], i) => (
        <g key={"sp" + i}>
          {hot ? <rect x="242" y={48 + i * 17} width="308" height="16" rx="3" fill={t.chart.brightOrange} opacity="0.2" /> : null}
          <text x="250" y={60 + i * 17} fontSize="11" fontFamily={MONO} fill={hot ? t.chart.brightOrange : t.text.tertiary}>{label}</text>
          <text x="340" y={60 + i * 17} fontSize="11" fontFamily={MONO} fill={hot ? t.chart.brightOrange : t.text.primary}>{value}</text>
        </g>
      ))}

      {/* functional vs non-functional */}
      <rect x="6" y="182" width="272" height="66" rx="7" fill={t.chart.blue} opacity="0.12" />
      <text x="20" y="200" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Functional — what it must DO</text>
      <text x="20" y="217" fontSize="12" fill={t.text.secondary}>Show book prices in a table.</text>
      <text x="20" y="233" fontSize="12" fill={t.text.secondary}>Let a visitor send a message.</text>
      <text x="20" y="244" fontSize="11" fill={t.text.tertiary}>Each one becomes a page or an element.</text>

      <rect x="286" y="182" width="268" height="66" rx="7" fill={t.chart.green} opacity="0.14" />
      <text x="300" y="200" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Non-functional — how it BEHAVES</text>
      <text x="300" y="217" fontSize="12" fill={t.text.secondary}>Readable on a 360px phone.</text>
      <text x="300" y="233" fontSize="12" fill={t.text.secondary}>The owner can edit it alone.</text>
      <text x="300" y="244" fontSize="11" fill={t.text.tertiary}>Each becomes a CSS or markup decision.</text>

      <rect x="6" y="258" width="548" height="42" rx="7" fill={t.chart.brightOrange} opacity="0.14" />
      <rect x="6" y="258" width="4" height="42" rx="2" fill={t.chart.brightOrange} />
      <text x="20" y="277" fontSize="12.5" fill={t.text.primary}>
        <tspan fontWeight="700">Line 6 is the one that protects you.</tspan> Agree in writing: no payment, no login,
      </text>
      <text x="20" y="293" fontSize="12.5" fill={t.text.primary}>and in week 10 it is a note you both signed — not an argument.</text>
    </svg>
  );
}

export default function Session11Lecture() {
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
        id="s11-title"
        title="Session 11 — Compact Site"
        notes="Welcome to Session 11. Today we plan, organize, and polish a compact multi-page site — plus requirements analysis for CLO2."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 11 · 3 periods</Tag>
          <H1>Designing a Compact Site</H1>
          <Text tone="secondary">Plan before you code. Organize content. Polish for submission.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s11-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>By the end of this session you will…</H2>
          <Stack gap={6}>
            <Text>Define a "compact site" and its key characteristics</Text>
            <Text>Draw a site map showing page hierarchy before coding</Text>
            <Text>Group content with single responsibility per page</Text>
            <Text>Eliminate redundancy using DRY + cross-linking</Text>
            <Text>Apply visual hierarchy (size, color, spacing)</Text>
            <Text>Analyze business requirements and write a spec (CLO2)</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s11-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Warm-up recap from Session 10</Text></Row>
              <Row gap={8}><Tag tone="info">50 min</Tag><Text>Theory: site planning, DRY, hierarchy, CLO2</Text></Row>
              <Row gap={8}><Tag tone="info">55 min</Tag><Text>In-class practice (5 tasks)</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">5 min</Tag><Text>Recap &amp; next session preview</Text></Row>
              <Row gap={8}><Tag tone="info">20 min</Tag><Text>Buffer / Q&amp;A / catch-up time</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Have your complete club-website folder open in VS Code. We will polish it during practice.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s11-warmup" title="Warm-Up Recap">
        <Stack gap={12}>
          <H2>Quick Recall — Session 10</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">Q1:</Text> Name two HTML5 elements that replaced Flash for media embedding.
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q2:</Text> What must you change about a YouTube URL to embed it in an iframe?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q3:</Text> Why does <Text as="span">autoplay</Text> require the <Text as="span">muted</Text> attribute?
            </Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: What Is a Compact Site ────────────────────── */}
      <PresentationSlide id="s11-compact" title="What Is a Compact Site?">
        <Stack gap={12}>
          <H2>Compact Site = Small, Focused, Efficient</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text>3-10 pages, each with ONE clear purpose.</Text>
              <Text>Simple flat navigation (4-6 items).</Text>
              <Text>Consistent design via shared CSS.</Text>
              <Text>No redundancy — DRY principle.</Text>
            </Stack>
            <Stack gap={6}>
              <Text tone="secondary">Like a well-organized brochure: each panel covers one topic, the flow makes sense, the reader finds what they need quickly.</Text>
              <Callout tone="info">"Compact" means efficient, not cramped. Every pixel earns its place.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Content Grouping Strategy ─────────────────── */}
      <PresentationSlide id="s11-content-grouping" title="Content Grouping Strategy">
        <Stack gap={12}>
          <H2>From Brainstorm to Page List</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1 — List ALL content ideas:</Text>
              <Text>Club history, team members, events calendar, photos, videos, contact form, meeting times, social media links, sponsors...</Text>
              <Text tone="secondary">Write everything down without organizing yet.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Step 2 — Group related items into pages:</Text>
              <Text>History + mission → About page</Text>
              <Text>Calendar + past events → Events page</Text>
              <Text>Photos + videos → Gallery or Media page</Text>
              <Text>Form + email + times → Contact page</Text>
              <Callout tone="info">Each page should have ONE clear purpose. If a page covers two unrelated topics, split it.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Site Map ──────────────────────────────────── */}
      <PresentationSlide id="s11-sitemap" title="Site Maps" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>Plan Before You Code</H2>
          <SiteMap t={t} />
          <PresentationFragment index={0} effect="fade">
            <Stack gap={4}>
              <Text>Steps: Define purpose → List content → Group into pages → Draw site map → Sketch wireframes → Code.</Text>
              <Text tone="secondary">Rules: every page reachable from Home in 1-2 clicks. No orphan pages. Max 7 pages.</Text>
            </Stack>
          </PresentationFragment>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: DRY & Redundancy ──────────────────────────── */}
      <PresentationSlide id="s11-dry" title="DRY — Don't Repeat Yourself">
        <Stack gap={12}>
          <H2>Eliminate Redundancy</H2>
          <DryPrinciple t={t} />
          <Callout tone="warning">Duplicate content causes maintenance nightmares, inconsistency, and user confusion.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Visual Hierarchy ──────────────────────────── */}
      <PresentationSlide id="s11-hierarchy" title="Visual Hierarchy">
        <Stack gap={12}>
          <H2>Guide the Reader's Eye</H2>
          <VisualHierarchy t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Navigation Consistency ────────────────────── */}
      <PresentationSlide id="s11-nav-consistency" title="Navigation Consistency">
        <Stack gap={12}>
          <H2>Same Nav on Every Page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Why consistency matters</Text>
              <Text>Users build a mental model of your site structure.</Text>
              <Text>If the nav changes between pages, users get lost.</Text>
              <Text>Screen readers rely on predictable landmarks.</Text>
              <Text tone="secondary">Same labels, same order, same links on every page.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Common mistakes</Text>
              <Text tone="danger">Different link text on different pages ("About" vs "About Us")</Text>
              <Text tone="danger">Links in different order on different pages</Text>
              <Text tone="danger">Missing links on some pages (e.g., Media only on home)</Text>
              <Text tone="danger">Broken relative paths in subfolders</Text>
              <Callout tone="info">Fix: copy-paste the exact same nav block into every HTML file. Update all at once when adding a new page.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Favicon & Meta Tags ──────────────────────── */}
      {/* ── Try It Now: Shared Nav ─────────────────────────────── */}
      <PresentationSlide id="s11-try-nav" title="Try It Now: Consistent Navigation" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Four minutes — copy this nav into every page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Paste identically into every .html file</Text>
              <Code language="html">{`<nav aria-label="Main navigation">
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="events.html">Events</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>`}</Code>
              <Text fontWeight="700">Then on each page, mark the current one</Text>
              <Code language="html">{`<li><a href="about.html"
       class="active"
       aria-current="page">About</a></li>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Click through all four pages — the nav never moves or changes order.</Text>
              <Text>2. On each page, exactly one link has class="active".</Text>
              <Text>3. Every link works — no 404s, no broken relative paths.</Text>
              <Text>4. aria-current="page" tells screen readers where you are.</Text>
              <Callout tone="warning">The only thing that changes between pages is which link has .active. Everything else is byte-identical.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s11-favicon" title="Favicon & Meta Tags">
        <Stack gap={12}>
          <H2>Polish Details That Matter</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Favicon</Text>
              <Text>The small icon shown in the browser tab.</Text>
              <Code language="html">{`<link rel="icon"
      href="favicon.ico"
      type="image/x-icon">`}</Code>
              <Text tone="secondary">Use a 16x16 or 32x32 .ico or .png file. Place in root folder.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Unique page titles</Text>
              <Code language="html">{`<!-- Each page needs a unique title -->
<title>About - Student Club</title>
<title>Events - Student Club</title>
<title>Contact - Student Club</title>`}</Code>
              <Text tone="secondary">The title appears in the browser tab and search results. Make each one descriptive and unique.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Add the favicon link to EVERY page's head section. For pages in subfolders, use ../favicon.ico as the path.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Requirements Analysis (CLO2) ─────────────── */}
      <PresentationSlide id="s11-clo2" title="Requirements Analysis (CLO2)" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={10}>
          <H2>Requirements Analysis — CLO2</H2>
          <BriefToSpec t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: 7-Line Spec Template (CLO2) ──────────────── */}
      <PresentationSlide id="s11-spec" title="7-Line Spec Template (CLO2)">
        <Stack gap={12}>
          <H2>The 7-Line Specification Template</H2>
          <Code>{`# Requirements Specification — [Client name]
1. Goal           : [one sentence]
2. Target audience: [who visits, devices]
3. Pages          : [list, each with one purpose]
4. Functional req.: [features: form, table, gallery...]
5. Non-functional : [mobile, fast, accessible, editable]
6. Out of scope   : [what we will NOT build]
7. Success metric : [how we measure success]`}</Code>
          <Text tone="secondary">"Out of scope" prevents scope creep. Each functional requirement maps to a page or feature.</Text>
          <Callout tone="info">This 7-line spec template is taught for CLO2 requirements analysis. Practice it with any project brief you encounter.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Worked Example — Site Map + Spec ─────────── */}
      <PresentationSlide id="s11-worked-example" title="Worked Example — From Brief to Spec">
        <Stack gap={10}>
          <H2>Worked Example: Coding Club Site Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1 — List content, then group into pages:</Text>
              <Code language="text">{`Group          → Page         Filename
───────────────────────────────────────
Welcome+overview → Home       index.html
Identity         → About      about.html
Activities       → Events     events.html
Visuals          → Gallery    gallery.html
Multimedia       → Media      media.html
Communication    → Contact    contact.html`}</Code>
              <Text tone="secondary">Blog excluded — link to Facebook instead. Application form goes on Contact page.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Step 2 — Write the 7-line spec (CLO2):</Text>
              <Code>{`1. Goal    : attract new members
2. Audience: students, mostly on phones
3. Pages   : index, about, events,
             gallery, media, contact
4. Func.   : event calendar, contact form,
             photo grid, video embed
5. Non-func: mobile-friendly, fast load,
             owner can edit alone
6. Out-of-scope: no payment, no login
7. Success : 5 enquiries per week`}</Code>
              <Callout tone="info">Every functional requirement maps to a page or feature. "Out of scope" protects you from scope creep.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Quick Check ──────────────────────────────── */}
      <PresentationSlide id="s11-quick-check" title="Quick Check: Site Design">
        <Stack gap={12}>
          <H2>Discussion Prompts</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">1.</Text> Your client says "make it modern and nice." Why is this NOT a valid requirement? What should you do instead?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">2.</Text> A student has 15 pages in their site map. What advice would you give them?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">3.</Text> Why does the "Out of scope" line in the spec protect both the developer AND the client?
            </Callout>
          </Stack>
          <Text tone="secondary">Think for 1 minute, then discuss with your neighbour.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Common Mistakes (expanded to 7) ──────────── */}
      {/* ── Try It Now: Write a Spec ──────────────────────────── */}
      <PresentationSlide id="s11-try-spec" title="Try It Now: Write a 7-Line Spec" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — plan a new page from scratch</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Your teacher says: "Add a Gallery page to the club site."</Text>
              <Code language="markdown">{`1. Goal: Show club photos and event images
2. Audience: Club members and visitors
3. Pages: gallery.html (new page)
4. Layout: Grid of images, 3 columns
5. Colors: Match existing site palette
6. Content: 6+ photos with captions
7. Deadline: Sunday 23:59`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to notice</Text>
              <Text>Goal is one sentence — what does this page DO?</Text>
              <Text>Audience — who will look at it?</Text>
              <Text>Pages — which file(s) do you need to create?</Text>
              <Text>Layout — how will content be arranged?</Text>
              <Text>Colors — does it match the rest of the site?</Text>
              <Text>Content — what goes on the page?</Text>
              <Text>Deadline — when is it due?</Text>
              <Callout tone="info">You do not need to build it now. The spec is a plan. Write it first, then build.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s11-do-dont" title="Site Design: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Keep navigation identical on every page</Text>
              <Text>Use the same CSS file across all pages</Text>
              <Text>Name files in lowercase with hyphens (about-us.html)</Text>
              <Text>Write a spec before you write any code</Text>
              <Text>Add a favicon and meta description to every page</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Duplicate CSS rules in every page&apos;s &lt;style&gt; block</Text>
              <Text>Use spaces or capitals in filenames (My Page.html)</Text>
              <Text>Change the nav order between pages — users get lost</Text>
              <Text>Build more than 5 pages for a compact site</Text>
              <Text>Skip the README — graders and future you need it</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Site Map ──────────────────────────────── */}
      <PresentationSlide id="s11-try-sitemap" title="Try It Now: Draw Your Site Map" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — sketch before you code</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">On paper, draw boxes for each page</Text>
              <Code language="text">{`         index.html
              |
   +----------+----------+
   |          |          |
about.html  events.html  contact.html
                              |
                        (form + map)`}</Code>
              <Text fontWeight="700">For each box, write</Text>
              <Text>Page title • Filename • What content goes on it • Which files it links to</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Checklist</Text>
              <Text>☐ Every page reachable from the home page in one click</Text>
              <Text>☐ Every page links back to index.html</Text>
              <Text>☐ Filenames are lowercase, no spaces, end in .html</Text>
              <Text>☐ 3–5 pages total (not 12)</Text>
              <Text>☐ One shared style.css for all pages</Text>
              <Callout tone="info">Ten minutes with a pencil saves two hours of restructuring folders later.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s11-mistakes" title="Common Mistakes">
        <Stack gap={10}>
          <H2>Seven Pitfalls to Avoid</H2>
          <Stack gap={4}>
            <Text tone="danger">1. Coding without a plan — draw the site map first</Text>
            <Text tone="danger">2. Too many pages (15+) — consolidate to 5-6 focused pages</Text>
            <Text tone="danger">3. Inconsistent navigation — same labels, order, links everywhere</Text>
            <Text tone="danger">4. Orphan pages — if it is not in the nav, delete it or link to it</Text>
            <Text tone="danger">5. Duplicate content across pages — DRY + cross-link instead</Text>
            <Text tone="danger">6. No visual hierarchy — wall of same-size text confuses readers</Text>
            <Text tone="danger">7. Missing favicon and unique titles — looks unfinished and unprofessional</Text>
          </Stack>
          <Callout tone="warning">Fix: plan first, keep nav identical, eliminate duplicates, apply heading scale, add favicon to every page.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s11-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This site has three design problems. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Scenario</Text>
              <Text>A student submitted a 5-page club website. The teacher opened it and found these issues:</Text>
              <Text>• index.html has the title "Page 1"</Text>
              <Text>• The nav on about.html has 7 links, but contact.html has only 3</Text>
              <Text>• The favicon works on index.html but not on any other page</Text>
              <Text>• README.md says "This is my project" and nothing else</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Problems</Text>
              <Text tone="danger">1. "Page 1" is not a meaningful title — every page needs a unique, descriptive title (e.g., "Home — VNU Club").</Text>
              <Text tone="danger">2. Inconsistent navigation — the nav must be IDENTICAL on every page. Same links, same order.</Text>
              <Text tone="danger">3. Favicon only on one page — the &lt;link rel="icon"&gt; must be in the &lt;head&gt; of EVERY page.</Text>
              <Callout tone="info">Bonus: README.md with one line is not documentation. Write: what the site is, how to run it, what tools you used.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 16: Theory Summary ───────────────────────────── */}
      <PresentationSlide id="s11-summary" title="Theory Summary">
        <Stack gap={10}>
          <H2>Session 11 — Complete Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={3}>
              <Text fontWeight="700">Site Planning</Text>
              <Text>3-10 pages, one purpose each</Text>
              <Text>Flat navigation (max 2 clicks deep)</Text>
              <Text>No orphan pages</Text>
              <Text>Site map before coding</Text>
            </Stack>
            <Stack gap={3}>
              <Text fontWeight="700">Design Principles</Text>
              <Text>DRY — one fact, one place</Text>
              <Text>Visual hierarchy (size, weight, space)</Text>
              <Text>Consistent nav across all pages</Text>
              <Text>Favicon + unique titles</Text>
              <Text>CLO2: 7-line spec template</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: README Documentation ─────────────────────── */}
      {/* ── Site Accessibility Checklist ───────────────────────── */}
      <PresentationSlide id="s11-site-a11y" title="Whole-Site Accessibility Checklist">
        <Stack gap={12}>
          <H2>Check Every Page Before You Submit</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Structure</Text>
              <Row gap={8}><Pill>lang</Pill><Text>&lt;html lang="en"&gt; on every page</Text></Row>
              <Row gap={8}><Pill>title</Pill><Text>Unique, descriptive &lt;title&gt; per page</Text></Row>
              <Row gap={8}><Pill>h1</Pill><Text>Exactly one &lt;h1&gt; per page, no skipped heading levels</Text></Row>
              <Row gap={8}><Pill>landmarks</Pill><Text>header, nav, main, footer on every page</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Content</Text>
              <Row gap={8}><Pill>alt</Pill><Text>Every &lt;img&gt; has alt (empty alt="" if decorative)</Text></Row>
              <Row gap={8}><Pill>labels</Pill><Text>Every form input has a matching &lt;label for="..."&gt;</Text></Row>
              <Row gap={8}><Pill>links</Pill><Text>Link text makes sense alone — no "click here"</Text></Row>
              <Row gap={8}><Pill>contrast</Pill><Text>Text is readable against its background</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Tab through each page using only the keyboard. If you cannot reach a link or button, it is not accessible.</Callout>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s11-readme" title="README Documentation">
        <Stack gap={12}>
          <H2>Document Your Project</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">What is README.md?</Text>
              <Text>A plain-text file that explains your project to anyone who opens it.</Text>
              <Text>Written in Markdown (simple formatting).</Text>
              <Text tone="secondary">GitHub displays it automatically on the repository page.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Required sections:</Text>
              <Code>{`# Student Club Website
A website for the Coding Club at VNU-IS.

## Pages
- Home (index.html)
- About (pages/about.html)
- Contact (pages/contact.html)

## Technologies
HTML5, CSS3, Google Fonts

## How to Run
Open index.html in any browser.

## Author
Your Name - Student ID`}</Code>
            </Stack>
          </Grid>
          <Callout tone="info">The README is part of your homework submission. Include project title, description, page list, technologies, run instructions, and your name.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Practice ─────────────────────────────────── */}
      <PresentationSlide id="s11-practice" title="Hands-On Practice">
        <Stack gap={12}>
          <H2>Practice — exercises/session-11/</H2>
          <Callout tone="info">Estimated time: 55 minutes</Callout>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">Task 1</Tag><Text>Plan with a site map (draw pages + connections)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 2</Tag><Text>Polish the visual design (consistent CSS across all pages)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 3</Tag><Text>Add a favicon to every page</Text></Row>
            <Row gap={8}><Tag tone="info">Task 4</Tag><Text>Create sitemap.html as a site index page</Text></Row>
            <Row gap={8}><Tag tone="info">Task 5</Tag><Text>Final review checklist (links, images, navigation, titles)</Text></Row>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Site Review Checklist ─────────────────────── */}
      <PresentationSlide id="s11-review-checklist" title="Site Review Checklist">
        <Stack gap={12}>
          <H2>Before You Submit — Check Everything</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text fontWeight="700">Structure &amp; Links</Text>
              <Text>All pages load without errors</Text>
              <Text>Every link works (click them all)</Text>
              <Text>Navigation is identical on every page</Text>
              <Text>No orphan pages exist</Text>
            </Stack>
            <Stack gap={4}>
              <Text fontWeight="700">Visual Polish</Text>
              <Text>Images display correctly (no broken icons)</Text>
              <Text>Header and footer are consistent</Text>
              <Text>Unique title on each page</Text>
              <Text>Favicon shows in browser tab</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">Open every page in the browser and click every link. Do not assume links work — test them. A broken link loses marks.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s11-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>You can draw your site map from memory — pages, connections, and hierarchy.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Your 7-line spec has all sections filled: Goal, Audience, Pages, Layout, Colors, Content, Deadline.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Your README.md has: project description, file structure, how to run, and credits.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>A classmate can navigate your site without asking you any questions.</Text></Row>
            <Row gap={8}><Pill>Task 5</Pill><Text>Every page has a unique &lt;title&gt;, a favicon, and consistent navigation.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If a classmate gets lost on your site, the navigation or site structure needs work. Ask them to try again after you fix it.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s11-assignment" title="Assignment: Site Polish & Documentation">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>Your Student Club Website is fully polished with documentation.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>All links work from every page (test every one).</Text>
              <Text>Favicon on every page.</Text>
              <Text>README.md with project description, file structure, and credits.</Text>
              <Text>Every page has a unique &lt;title&gt; and consistent navigation.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Click every link on every page — no 404 errors.</Text>
              <Text>Check that the favicon appears in the browser tab.</Text>
              <Text>Read your README — does it make sense to someone who has never seen your site?</Text>
              <Callout tone="warning">A polished site with broken links is worse than a simple site with everything working. Test everything.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 21: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s11-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework — homework/session-11/</H2>
          <Callout tone="info">Due Sunday 23:59</Callout>
          <Stack gap={6}>
            <Text>Task 1: Polish all pages (consistent design, working links, quality content)</Text>
            <Text>Task 2: Add a favicon to every page</Text>
            <Text>Task 3: Write a README.md documenting your project</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Recap + Next ─────────────────────────────── */}
      <PresentationSlide
        id="s11-recap"
        title="Recap & Next"
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.green, accentSecondary: t.chart.blue }}
      >
        <Stack gap={12} align="center">
          <H2>Session 11 Recap</H2>
          <Row gap={8}>
            <Tag tone="success">Compact = efficient</Tag>
            <Tag tone="success">Site map first</Tag>
            <Tag tone="success">DRY principle</Tag>
            <Tag tone="success">Visual hierarchy</Tag>
            <Tag tone="success">CLO2 spec template</Tag>
          </Row>
          <Text tone="secondary">Next: Session 12 — VS Code, Emmet, Validation &amp; DevTools</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
