import {
  Grid,
  H1,
  H2,
  Presentation,
  PresentationFragment,
  PresentationSlide,
  Stack,
  Row,
  Tag,
  Text,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (master overview deck)
   These diagrams are ported verbatim from the per-session decks so a student
   who saw them in class meets exactly the same picture again in the overview.
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- ported from buoi-01 ---------- */
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

/* ---------- ported from buoi-01 ---------- */
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

/* ---------- ported from buoi-04 ---------- */
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
      <text x="342" y="178" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>* {"{"} box-sizing: border-box; {"}"}</text>
      <text x="342" y="200" fontSize="12" fill={t.text.secondary}>Now width: 200px means</text>
      <text x="342" y="216" fontSize="12" fill={t.text.secondary}>200px on screen — padding and</text>
      <text x="342" y="232" fontSize="12" fill={t.text.secondary}>border grow inwards instead.</text>

      <text x="14" y="232" fontSize="12" fill={t.text.tertiary}>Padding is inside the border,</text>
      <text x="14" y="248" fontSize="12" fill={t.text.tertiary}>margin is outside it. Margin never gets a background colour.</text>
    </svg>
  );
}

/* ---------- ported from buoi-05 ---------- */
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

      <text x="14" y="232" fontSize="13" fill={t.text.secondary}>flex-direction: row is the default, so the main axis runs left to right.</text>
      <text x="14" y="250" fontSize="13" fill={t.text.secondary}>Switch to column and the two axes swap: justify-content now moves items DOWN.</text>
    </svg>
  );
}

/* ---------- ported from buoi-06 ---------- */
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
      <text x="0" y="34" fontSize="12" fill={t.text.tertiary}>Blue = copied unchanged   ·   Dashed yellow = the part you rewrite   ·   Green = active link</text>
      {page(0, "index.html", ["Hero banner", "Welcome text"], 0)}
      {page(198, "about.html", ["Our story", "Team photos"], 1)}
      {page(396, "events.html", ["Event list", "Sign-up form"], 2)}
      <text x="0" y="266" fontSize="12.5" fill={t.text.secondary}>Build index.html completely first, then Save As for each new page.</text>
      <text x="0" y="286" fontSize="12.5" fill={t.text.secondary}>Every page links to the SAME css/style.css, so one edit restyles the whole site.</text>
    </svg>
  );
}

/* ---------- ported from buoi-09 ---------- */
function TableAnatomy({ t }: { t: CanvasTokens }) {
  const cell = (x: number, y: number, w: number, txt: string, head: boolean) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height="30" fill={head ? t.chart.blue : "transparent"} stroke={t.stroke.secondary} />
      <text x={w / 2} y="20" fontSize="12.5" textAnchor="middle"
            fontWeight={head ? "700" : "400"} fill={head ? ON_FILL : t.text.primary}>{txt}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 258" width="100%" role="img"
         aria-label="A rendered table with labels pointing at each part. The whole grid is the table element. The top blue row is thead containing th header cells. The rows below are tbody containing tr rows made of td data cells. The caption sits above the table and is read aloud by screen readers.">
      <text x="0" y="15" fontSize="13" fontWeight="600" fill={t.text.primary}>One rendered table, five tags. Each label points at what it wraps.</text>

      <text x="30" y="42" fontSize="13" fontStyle="italic" fill={t.text.secondary}>Club Membership Fees 2026</text>
      <text x="238" y="42" fontSize="11.5" fontFamily={MONO} fill={t.chart.goldenYellow}>&lt;caption&gt;  read aloud first</text>

      <g>
        {cell(30, 52, 120, "Plan", true)}
        {cell(150, 52, 100, "Term", true)}
        {cell(250, 52, 90, "Fee", true)}
        <text x="356" y="72" fontSize="11.5" fontFamily={MONO} fill={t.chart.blue}>&lt;thead&gt; of &lt;th&gt; cells</text>

        {cell(30, 82, 120, "Student", false)}
        {cell(150, 82, 100, "1 semester", false)}
        {cell(250, 82, 90, "150,000", false)}
        {cell(30, 112, 120, "Student", false)}
        {cell(150, 112, 100, "Full year", false)}
        {cell(250, 112, 90, "250,000", false)}
        {cell(30, 142, 120, "Alumni", false)}
        {cell(150, 142, 100, "Full year", false)}
        {cell(250, 142, 90, "400,000", false)}
        <text x="356" y="122" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>&lt;tbody&gt; of &lt;tr&gt; rows</text>
        <text x="356" y="140" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>each row holds &lt;td&gt; cells</text>
      </g>

      <rect x="26" y="48" width="318" height="126" rx="4" fill="none"
            stroke={t.chart.green} strokeWidth="2" strokeDasharray="5 4" />
      <text x="26" y="190" fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>the dashed outline is &lt;table&gt; — everything lives inside it</text>

      <rect x="0" y="204" width="560" height="50" rx="6" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="12" y="222" fontSize="12.5" fill={t.text.primary}>th is not "bold td". A screen reader repeats th before every cell: "Fee, 150,000".</text>
      <text x="12" y="242" fontSize="12.5" fill={t.text.secondary}>Rows run across, cells down. Count td per row: a missing one shifts the grid.</text>
    </svg>
  );
}

/* ---------- ported from buoi-13 ---------- */
function FormDataFlow({ t }: { t: CanvasTokens }) {
  const field = (y: number, label: string, value: string, attr: string, ok: boolean, key: string) => (
    <g key={key}>
      <text x="18" y={y} fontSize="11" fill={t.text.secondary}>{label}</text>
      {/* Input 108 wide, attribute at x=132: at 11px mono, name="email" is ~79
          units, so the annotation ends at ~211 and stays inside the 216-wide
          card instead of running into the submit arrow at x=222. */}
      <rect x="18" y={y + 5} width="108" height="20" rx="4" fill={t.bg.elevated}
        stroke={ok ? t.stroke.secondary : t.chart.brightOrange} strokeWidth={ok ? "1" : "1.8"} />
      <text x="25" y={y + 19} fontSize="11" fontFamily={MONO} fill={t.text.primary}>{value}</text>
      <text x="132" y={y + 19} fontSize="11" fontFamily={MONO} fill={ok ? t.chart.blue : t.chart.brightOrange}>{attr}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 300" width="100%" height="300" role="img"
      aria-label="A three-field contact form next to the exact text the browser sends on submit, showing that the phone field is absent from the submission because it has no name attribute, and an explanation of the action and method attributes.">
      <defs>
        <marker id="s13-send" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>

      <text x="111" y="14" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.4">WHAT THE VISITOR FILLS IN</text>
      <text x="403" y="14" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.4">WHAT THE SERVER ACTUALLY RECEIVES</text>

      {/* the form */}
      <rect x="6" y="22" width="210" height="172" rx="8" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
      <text x="18" y="40" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Contact the club</text>
      {field(56, "Email", "mai@vnu.edu.vn", 'name="email"', true, "f1")}
      {field(98, "Topic", "Film night", 'name="topic"', true, "f2")}
      {field(140, "Phone", "0912 345 678", "no name", false, "f3")}
      <rect x="18" y="170" width="76" height="18" rx="9" fill={t.chart.goldenYellow} />
      <text x="56" y="183" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>Send</text>

      <line x1="222" y1="104" x2="246" y2="104" stroke={t.chart.goldenYellow} strokeWidth="3" markerEnd="url(#s13-send)" />
      <text x="234" y="96" textAnchor="middle" fontSize="11" fill={t.text.secondary}>submit</text>

      {/* the payload */}
      <rect x="252" y="22" width="302" height="172" rx="8" fill={ON_FILL} />
      <text x="266" y="42" fontSize="11.5" fontFamily={MONO} fill="#7DD3A0">POST /contact HTTP/1.1</text>
      <line x1="266" y1="52" x2="540" y2="52" stroke="#3A4A5A" />
      <text x="266" y="72" fontSize="12" fontFamily={MONO} fill="#8AB4F8">email=mai%40vnu.edu.vn</text>
      <text x="266" y="92" fontSize="12" fontFamily={MONO} fill="#8AB4F8">&amp;topic=Film+night</text>
      <text x="266" y="118" fontSize="12" fontFamily={MONO} fill="#F0A860">(nothing about the phone number)</text>
      <text x="266" y="146" fontSize="11.5" fill="#C9D4E0">The value the visitor typed is gone. Not</text>
      <text x="266" y="161" fontSize="11.5" fill="#C9D4E0">empty — gone. A field with no name is not</text>
      <text x="266" y="176" fontSize="11.5" fill="#C9D4E0">part of the form as far as the browser cares.</text>
      {/* x=432, not 404: the encoded email line above is 22 mono characters wide
          and reaches about x=424, so the annotation used to start underneath it. */}
      <text x="432" y="72" fontSize="11" fill="#7A8896">@ becomes %40</text>
      <text x="432" y="92" fontSize="11" fill="#7A8896">space becomes +</text>

      {/* action and method */}
      <rect x="6" y="204" width="548" height="90" rx="7" fill={t.chart.blue} opacity="0.1" />
      <rect x="18" y="216" width="352" height="24" rx="5" fill={t.chart.blue} />
      <text x="28" y="232.5" fontSize="12" fontFamily={MONO} fill={ON_FILL}>&lt;form action="#" method="post"&gt;</text>
      <text x="18" y="258" fontSize="12.5" fill={t.text.primary}><tspan fontWeight="700">action</tspan> = where the data goes.</text>
      {/* Rewrapped shorter: the first column is only 194 units wide before the
          "method" column starts at x=212. */}
      <text x="18" y="275" fontSize="12" fill={t.text.secondary}>action="#" means nowhere:</text>
      <text x="18" y="290" fontSize="12" fill={t.text.secondary}>the page just reloads.</text>
      <text x="212" y="258" fontSize="12.5" fill={t.text.primary}><tspan fontWeight="700">method</tspan> = how it travels.</text>
      <text x="212" y="275" fontSize="12" fill={t.text.secondary}>get shows values in the URL.</text>
      <text x="212" y="290" fontSize="12" fill={t.text.secondary}>post keeps them out of sight.</text>
      <text x="440" y="258" fontSize="12.5" fontWeight="700" fill={t.chart.green}>Use post.</text>
      <text x="440" y="275" fontSize="12" fill={t.text.secondary}>A phone number in</text>
      <text x="440" y="290" fontSize="12" fill={t.text.secondary}>a URL is a leak.</text>
    </svg>
  );
}

/* ---------- ported from buoi-10 ---------- */
function VideoAnatomy({ t }: { t: CanvasTokens }) {
  const attrs = [
    ["controls", "Draws the play bar. Leave it off and", "the visitor sees a frozen rectangle.", t.chart.green],
    ["poster", "The still frame shown before play.", "Without it you get a black box.", t.chart.blue],
    ["preload", 'metadata = fetch the length only.', "auto on a 40 MB file costs real money.", t.chart.goldenYellow],
    ["width", "Set one number, not both. The height", "follows and the video keeps its shape.", t.chart.blue],
  ] as const;

  return (
    <svg viewBox="0 0 560 320" width="100%" height="320" role="img"
      aria-label="A rendered video player with its poster frame and control bar labelled, next to the four attributes that produce it: controls draws the play bar, poster is the still frame shown first, preload metadata fetches only the length, and width sets the size while height follows.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Four attributes decide everything the visitor sees before they press play.</text>

      {/* ---- the rendered player ---- */}
      <rect x="6" y="24" width="272" height="164" rx="8" fill={ON_FILL} stroke={t.stroke.secondary} />
      <rect x="18" y="36" width="248" height="112" rx="4" fill="#1B2838" />
      <circle cx="142" cy="92" r="24" fill={t.chart.goldenYellow} opacity="0.92" />
      <path d="M134 80 l20 12 l-20 12 z" fill={ON_FILL} />
      <text x="142" y="132" textAnchor="middle" fontSize="11" fill="#8FA3BF">poster="images/poster.jpg"</text>

      {/* control bar */}
      <rect x="18" y="152" width="248" height="24" rx="3" fill="#101A26" />
      <path d="M26 158 l8 6 l-8 6 z" fill="#C9D4E4" />
      <line x1="42" y1="164" x2="196" y2="164" stroke="#3A4A5E" strokeWidth="3" />
      <line x1="42" y1="164" x2="96" y2="164" stroke={t.chart.goldenYellow} strokeWidth="3" />
      <circle cx="96" cy="164" r="4" fill={t.chart.goldenYellow} />
      <text x="210" y="168" fontSize="11" fontFamily={MONO} fill="#C9D4E4">1:24</text>
      <text x="252" y="168" textAnchor="middle" fontSize="11" fill="#C9D4E4">[ ]</text>
      <text x="142" y="184" textAnchor="middle" fontSize="11" fontWeight="700" fill={t.chart.green}>controls drew this whole bar for you</text>

      {/* ---- the attribute table ---- */}
      {attrs.map(([name, l1, l2, ink], i) => (
        <g key={"va" + i}>
          <rect x="290" y={24 + i * 42} width="264" height="38" rx="6" fill={ink as string} opacity="0.12" />
          <rect x="290" y={24 + i * 42} width="4" height="38" rx="2" fill={ink as string} />
          <text x="302" y={38 + i * 42} fontSize="11.5" fontFamily={MONO} fontWeight="700" fill={t.text.primary}>{name}</text>
          <text x="302" y={50 + i * 42} fontSize="11" fill={t.text.secondary}>{l1}</text>
          <text x="302" y={60 + i * 42} fontSize="11" fill={t.text.secondary}>{l2}</text>
        </g>
      ))}

      {/* ---- the markup ---- */}
      <rect x="6" y="200" width="548" height="76" rx="7" fill={ON_FILL} />
      <text x="20" y="220" fontSize="12" fontFamily={MONO} fill="#7DD3A0">&lt;video controls width="640" poster="images/poster.jpg" preload="metadata"&gt;</text>
      <text x="34" y="238" fontSize="12" fontFamily={MONO} fill="#F2C14E">&lt;source src="video/promo.mp4" type="video/mp4"&gt;</text>
      <text x="34" y="254" fontSize="12" fontFamily={MONO} fill="#C9D4E4">&lt;p&gt;Cannot play this? &lt;a href="video/promo.mp4"&gt;Download it&lt;/a&gt;&lt;/p&gt;</text>
      <text x="20" y="270" fontSize="12" fontFamily={MONO} fill="#7DD3A0">&lt;/video&gt;</text>

      <text x="20" y="296" fontSize="12" fill={t.text.primary}>The paragraph inside is never shown to anyone whose browser works. It is there for</text>
      <text x="20" y="312" fontSize="12" fill={t.text.primary}>the one visitor whose browser does not, and it is the only thing they will get.</text>
    </svg>
  );
}

/* ---------- ported from buoi-15 ---------- */
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
      <text x="24" y="262" fontSize="11" fontWeight="700" fill="#8FA3BF">THE ENTIRE STYLESHEET FOR THAT</text>
      <text x="24" y="281" fontSize="12" fontFamily={MONO} fill="#7DD3A0">.cards &#123; display: grid; gap: 16px; grid-template-columns: 1fr; &#125;</text>
      <text x="24" y="299" fontSize="11" fontFamily={MONO} fill="#F2C14E">@media (min-width: 768px)  &#123; .cards &#123; grid-template-columns: repeat(2, 1fr); &#125; &#125;</text>
      <text x="24" y="317" fontSize="11" fontFamily={MONO} fill="#F2C14E">@media (min-width: 1024px) &#123; .cards &#123; grid-template-columns: repeat(3, 1fr); &#125; &#125;</text>
      <text x="24" y="334" fontSize="11" fill="#8FA3BF">Three lines. No duplicated HTML, no separate mobile site, no JavaScript.</text>
    </svg>
  );
}


export default function INS2053Lecture() {
  const { tokens } = useHostTheme();
  const t = tokens;
  return (
    <Presentation
      defaultSlide={0}
      keyboard
      controls
      progress
      slideNumber
      thumbnails
      overview
      fullscreen
      speakerNotes
      deepLink
      touch
      loop={false}
      transition="slide"
      aspectRatio="16 / 9"
      height="min(760px, calc(100vh - 48px))"
      aria-label="INS2053 Web Authoring lecture"
    >
      <PresentationSlide
        id="title"
        title="INS2053 — Web Authoring"
        notes="Welcome students. This course builds a complete website from zero."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · 4 credits · 15 weeks</Tag>
          <H1>Web Authoring &amp; Web Management</H1>
          <Text tone="secondary">Build a complete Student Club Website — from your first HTML file to a responsive, published site.</Text>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="web" title="How the web works" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={16}>
          <H2>How the web works</H2>
          <Grid columns={1} gap={10}>
            <RequestResponseCycle t={t} />
          </Grid>
          <Text tone="secondary">Your browser asks a server for a page; the server sends back files; the browser draws them. Every single thing in this course happens inside that loop.</Text>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="html" title="HTML = structure">
        <Stack gap={12}>
          <H2>HTML gives structure</H2>
          <Text tone="secondary">Headings, paragraphs, lists, images — the skeleton of every page.</Text>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="success">&lt;h1&gt; … &lt;h6&gt;</Tag>
              <Tag tone="success">&lt;p&gt; paragraph</Tag>
              <Tag tone="success">&lt;ul&gt; / &lt;ol&gt; lists</Tag>
              <Tag tone="success">&lt;img&gt; with alt</Tag>
            </Stack>
            <Stack gap={6}>
              <Text>Sessions 1–3</Text>
              <Text tone="secondary">Always add <Text as="span" tone="secondary">alt</Text> text to images for accessibility.</Text>
            </Stack>
          </Grid>
          <Grid columns={1} gap={10}>
            <TagAnatomy t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="css" title="CSS = style" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={16}>
          <H2>CSS gives style — the box model</H2>
          <Grid columns={1} gap={10}>
            <BoxModelDiagram t={t} />
          </Grid>
          <Text tone="secondary">Every element is a box: margin, then border, then padding, then the content. Use <Text as="span">box-sizing: border-box</Text> so width means what you think it means.</Text>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="layout" title="Layouts with Flexbox">
        <Stack gap={16}>
          <H2>Layouts with Flexbox</H2>
          <Grid columns={1} gap={10}>
            <FlexAxesDiagram t={t} />
          </Grid>
          <PresentationFragment index={0} effect="fade">
            <Text tone="secondary">justify-content = main axis · align-items = cross axis. Sessions 5–6.</Text>
          </PresentationFragment>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="multipage" title="Multi-page sites & navigation">
        <Stack gap={12}>
          <H2>One site, many pages, one menu</H2>
          <Text>Share a single CSS file; highlight the current page with an <Text as="span">active</Text> class.</Text>
          <Row gap={8}>
            <Tag tone="info">Home</Tag><Tag>About</Tag><Tag>Activities</Tag><Tag>Media</Tag><Tag>Contact</Tag>
          </Row>
          <Text tone="secondary">Relative links: <Text as="span">../</Text> goes up one folder. Session 6.</Text>
          <Grid columns={1} gap={10}>
            <MultiPageNav t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="tables" title="Tables for tabular data">
        <Stack gap={12}>
          <H2>Tables — for data, not layout</H2>
          <Text>Use <Text as="span">table / thead / tbody / caption</Text>; merge cells with colspan &amp; rowspan.</Text>
          <Text tone="secondary">Remember: a rowspan cell means fewer cells in the next row. Session 9.</Text>
          <Grid columns={1} gap={10}>
            <TableAnatomy t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="forms" title="Forms & labels">
        <Stack gap={12}>
          <H2>Forms — talk to your visitors</H2>
          <Row gap={8}>
            <Tag tone="info">text</Tag><Tag tone="info">email</Tag><Tag tone="info">radio</Tag><Tag tone="info">checkbox</Tag><Tag tone="info">select</Tag><Tag tone="info">textarea</Tag>
          </Row>
          <Text>Every input needs a <Text as="span">label</Text> (for = id). Session 13.</Text>
          <Grid columns={1} gap={10}>
            <FormDataFlow t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="media" title="Video & audio (HTML5)">
        <Stack gap={12}>
          <H2>Multimedia — HTML5, not Flash</H2>
          <Text>Flash is gone. Use <Text as="span">&lt;video&gt;</Text> and <Text as="span">&lt;audio&gt;</Text> with controls + fallback text. Session 10.</Text>
          <Grid columns={1} gap={10}>
            <VideoAnatomy t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="responsive" title="Responsive design" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={16}>
          <H2>One site, every screen</H2>
          <Grid columns={1} gap={10}>
            <ResponsiveDevices t={t} />
          </Grid>
          <PresentationFragment index={0} effect="fade">
            <Text tone="secondary">viewport meta first, then mobile-first queries: @media (min-width: 768px). Session 15.</Text>
          </PresentationFragment>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="capstone" title="Capstone: Student Club Website">
        <Stack gap={12}>
          <H2>Capstone — Student Club Website</H2>
          <Text>You build one site all semester; each week adds a skill.</Text>
          <Row gap={8}>
            <Tag tone="success">M1 structure</Tag><Tag tone="success">M3 navigation</Tag><Tag tone="success">M5 tables+media</Tag><Tag tone="success">M7 form</Tag><Tag tone="success">M8 responsive</Tag>
          </Row>
        </Stack>
      </PresentationSlide>

      <PresentationSlide id="assessment" title="Assessment & how to succeed">
        <Stack gap={12} align="center">
          <H2>Assessment</H2>
          <Row gap={12}>
            <Tag tone="info">Attendance 10%</Tag>
            <Tag tone="warning">Midterm 30% (wk 8)</Tag>
            <Tag tone="danger">Final 60%</Tag>
          </Row>
          <Text tone="secondary">Homework due every Sunday 23:59. Build a little every week — you will finish.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
