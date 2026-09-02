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
   INS2053 — TEACHING DIAGRAM KIT (Session 12: code-editing tools)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. What the five regions of VS Code are for ---------- */

function VSCodeLayout({ t }: { t: CanvasTokens }) {
  const badge = (x: number, y: number, n: string) => (
    <g key={"vsb" + n}>
      <circle cx={x} cy={y} r="11" fill={t.chart.goldenYellow} stroke={t.bg.elevated} strokeWidth="2" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={ON_FILL}>{n}</text>
    </g>
  );

  const tree = [
    ["STUDENT-CLUB", 0, true],
    ["index.html", 1, false],
    ["about.html", 1, false],
    ["css/", 1, true],
    ["style.css", 2, false],
    ["images/", 1, true],
  ] as const;

  const codeLines = [
    ["1", "<!DOCTYPE html>", t.chart.blue],
    ["2", '<html lang="en">', t.chart.blue],
    ["3", "<head>", t.chart.blue],
    ["4", '  <link rel="stylesheet" href="css/style.css">', t.chart.green],
    ["5", "<body>", t.chart.blue],
    ["6", "  <h1>Student Club</h1>", t.chart.goldenYellow],
  ] as const;

  const legend = [
    ["1", "Activity Bar", "jump between Explorer, Search, Git", 10, 232],
    ["2", "Sidebar", "the file tree of ONE project folder", 10, 256],
    ["3", "Editor", "where you type; one tab per open file", 10, 280],
    ["4", "Terminal", "Live Server prints its address here", 292, 232],
    ["5", "Status Bar", "language, cursor line, error count", 292, 256],
  ] as const;

  return (
    <svg viewBox="0 0 560 330" width="100%" height="330" role="img"
      aria-label="The five regions of the VS Code window: activity bar, sidebar file tree, editor, terminal and status bar, with a reminder to open the whole project folder rather than a single file.">
      {/* window shell */}
      <rect x="6" y="6" width="548" height="204" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      {/* title strip */}
      <rect x="6" y="6" width="548" height="24" rx="8" fill={t.fill.tertiary} />
      <rect x="6" y="24" width="548" height="6" fill={t.fill.tertiary} />
      <circle cx="20" cy="18" r="4" fill={t.chart.brightOrange} />
      <circle cx="34" cy="18" r="4" fill={t.chart.goldenYellow} />
      <circle cx="48" cy="18" r="4" fill={t.chart.green} />
      <text x="280" y="22" textAnchor="middle" fontSize="12" fill={t.text.secondary}>student-club — Visual Studio Code</text>

      {/* activity bar */}
      <rect x="6" y="30" width="40" height="166" fill={t.fill.tertiary} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={"ic" + i} x="16" y={44 + i * 26} width="20" height="16" rx="3"
          fill={t.chart.blue} opacity={i === 0 ? "0.95" : "0.35"} />
      ))}

      {/* sidebar */}
      <rect x="46" y="30" width="132" height="166" fill={t.bg.elevated} stroke={t.stroke.tertiary} />
      <text x="56" y="46" fontSize="11" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.6">EXPLORER</text>
      {tree.map(([name, depth, isFolder], i) => (
        <text key={"tr" + i} x={58 + depth * 12} y={68 + i * 20} fontSize="12" fontFamily={MONO}
          fontWeight={depth === 0 ? "700" : "400"}
          fill={isFolder ? t.chart.blue : t.text.primary}>
          {name}
        </text>
      ))}

      {/* editor */}
      <rect x="178" y="30" width="376" height="122" fill={t.bg.elevated} stroke={t.stroke.tertiary} />
      <rect x="178" y="30" width="110" height="22" fill={t.fill.tertiary} />
      <rect x="178" y="30" width="110" height="2.5" fill={t.chart.blue} />
      <text x="233" y="45" textAnchor="middle" fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>index.html</text>
      {codeLines.map(([n, code, fill], i) => (
        <g key={"cl" + i}>
          <text x="196" y={70 + i * 15} textAnchor="end" fontSize="11" fontFamily={MONO} fill={t.text.tertiary}>{n}</text>
          <text x="204" y={70 + i * 15} fontSize="12" fontFamily={MONO} fill={fill}>{code}</text>
        </g>
      ))}

      {/* terminal */}
      <rect x="178" y="152" width="376" height="44" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="188" y="167" fontSize="11" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.6">TERMINAL</text>
      <text x="188" y="186" fontSize="12" fontFamily={MONO} fill={t.chart.green}>Server running at http://127.0.0.1:5500</text>

      {/* status bar */}
      <rect x="6" y="196" width="548" height="14" fill={t.chart.blue} opacity="0.9" />
      <text x="16" y="206.5" fontSize="11" fill={ON_FILL} fontWeight="600">HTML</text>
      <text x="470" y="206.5" fontSize="11" fill={ON_FILL} fontWeight="600">Ln 6, Col 24</text>

      {badge(26, 42, "1")}
      {badge(164, 42, "2")}
      {badge(540, 42, "3")}
      {badge(540, 164, "4")}
      {badge(280, 203, "5")}

      {/* legend */}
      {legend.map(([n, name, what, x, y]) => (
        <g key={"lg" + n}>
          <circle cx={Number(x) + 11} cy={Number(y) - 4} r="10" fill={t.chart.goldenYellow} />
          <text x={Number(x) + 11} y={Number(y)} textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>{n}</text>
          <text x={Number(x) + 28} y={Number(y) - 8} fontSize="12.5" fontWeight="700" fill={t.text.primary}>{name}</text>
          <text x={Number(x) + 28} y={Number(y) + 6} fontSize="12" fill={t.text.secondary}>{what}</text>
        </g>
      ))}

      {/* the actual teaching point */}
      <rect x="6" y="294" width="548" height="30" rx="6" fill={t.chart.brightOrange} opacity="0.14" />
      <rect x="6" y="294" width="4" height="30" rx="2" fill={t.chart.brightOrange} />
      <text x="20" y="307" fontSize="12.5" fill={t.text.primary}>
        <tspan fontWeight="700">File &gt; Open Folder</tspan>, never File &gt; Open File. Open a single file and you get
      </text>
      <text x="20" y="323" fontSize="12.5" fill={t.text.primary}>
        no tree at all, and Live Server has no site to serve.
      </text>
    </svg>
  );
}

/* ---------- 2. How one Emmet abbreviation becomes a whole nav bar ---------- */

function EmmetExpand({ t }: { t: CanvasTokens }) {
  const keys = [
    [".", "class"],
    ["#", "id"],
    [">", "inside"],
    ["+", "next to"],
    ["*", "repeat"],
    ["{ }", "text"],
  ] as const;

  const tokens = [
    ["nav", 40, "el"],
    [">", 18, "op"],
    ["ul", 32, "el"],
    [">", 18, "op"],
    ["li", 26, "el"],
    ["*3", 32, "op"],
    [">", 18, "op"],
    ["a", 22, "el"],
  ] as const;

  let tx = 168;

  return (
    <svg viewBox="0 0 560 312" width="100%" height="312" role="img"
      aria-label="One Emmet abbreviation, nav greater-than ul greater-than li times three greater-than a, expands after pressing Tab into a nested nav, ul and three list items, and a warning that a single space stops Emmet working.">
      <defs>
        <marker id="s12-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>

      {/* symbol key */}
      {keys.map(([sym, mean], i) => (
        <g key={"k" + i}>
          <rect x={6 + i * 91.6} y="4" width="89" height="38" rx="6" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
          <text x={6 + i * 91.6 + 44.5} y="21" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily={MONO} fill={t.chart.goldenYellow}>{sym}</text>
          <text x={6 + i * 91.6 + 44.5} y="36" textAnchor="middle" fontSize="11.5" fill={t.text.secondary}>{mean}</text>
        </g>
      ))}

      {/* the abbreviation, token by token */}
      <text x="280" y="60" textAnchor="middle" fontSize="11.5" fill={t.text.tertiary} letterSpacing="0.5">YOU TYPE THIS, WITH NO SPACES</text>
      {tokens.map(([label, w, kind], i) => {
        const x = tx;
        tx += Number(w) + 4;
        const isOp = kind === "op";
        return (
          <g key={"tk" + i}>
            <rect x={x} y="68" width={w} height="28" rx="5"
              fill={isOp ? t.chart.goldenYellow : t.chart.blue} />
            <text x={x + Number(w) / 2} y="87" textAnchor="middle" fontSize="14.5" fontWeight="700" fontFamily={MONO} fill={ON_FILL}>{label}</text>
          </g>
        );
      })}
      <text x="280" y="114" textAnchor="middle" fontSize="12.5" fill={t.text.secondary}>
        blue = element · yellow = instruction about placement
      </text>

      {/* Tab */}
      <line x1="280" y1="120" x2="280" y2="140" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s12-arrow)" />
      <rect x="292" y="122" width="72" height="18" rx="9" fill={t.chart.goldenYellow} />
      <text x="328" y="135.5" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={ON_FILL}>press Tab</text>

      {/* nested result */}
      <rect x="40" y="148" width="480" height="102" rx="8" fill="none" stroke={t.chart.blue} strokeWidth="2" />
      <rect x="52" y="142" width="52" height="14" rx="4" fill={t.chart.blue} />
      <text x="78" y="153" textAnchor="middle" fontSize="11.5" fontWeight="700" fontFamily={MONO} fill={ON_FILL}>&lt;nav&gt;</text>

      <rect x="56" y="170" width="448" height="72" rx="6" fill="none" stroke={t.chart.blue} strokeWidth="1.5" strokeDasharray="5 3" />
      <rect x="68" y="164" width="44" height="14" rx="4" fill={t.chart.blue} opacity="0.85" />
      <text x="90" y="175" textAnchor="middle" fontSize="11.5" fontWeight="700" fontFamily={MONO} fill={ON_FILL}>&lt;ul&gt;</text>

      {[0, 1, 2].map((i) => (
        <g key={"li" + i}>
          <rect x="72" y={184 + i * 19} width="416" height="16" rx="4" fill={t.chart.green} opacity="0.9" />
          <text x="82" y={196 + i * 19} fontSize="11.5" fontFamily={MONO} fill={ON_FILL}>&lt;li&gt;&lt;a href=""&gt;&lt;/a&gt;&lt;/li&gt;</text>
        </g>
      ))}
      <path d="M496 188 q10 0 10 10 v18 q0 10 10 10 q-10 0 -10 10 v18 q0 10 -10 10"
        fill="none" stroke={t.chart.goldenYellow} strokeWidth="1.8" />
      <text x="520" y="212" fontSize="11.5" fontWeight="700" fill={t.chart.goldenYellow}>*3</text>
      <text x="504" y="228" fontSize="11" fill={t.text.secondary}>made</text>
      <text x="504" y="240" fontSize="11" fill={t.text.secondary}>these</text>

      {/* the mistake */}
      <rect x="6" y="258" width="548" height="48" rx="6" fill={t.chart.brightOrange} opacity="0.14" />
      <rect x="6" y="258" width="4" height="48" rx="2" fill={t.chart.brightOrange} />
      <text x="20" y="277" fontSize="12.5" fill={t.text.primary}>
        Emmet stops at the first space — <tspan fontFamily={MONO} fontWeight="700">nav &gt; ul</tspan> leaves plain letters.
      </text>
      <text x="20" y="295" fontSize="12.5" fill={t.text.primary}>
        Nothing happened on Tab? Check the file is saved as <tspan fontFamily={MONO} fontWeight="700">.html</tspan>, not .txt.
      </text>
    </svg>
  );
}

/* ---------- 3. Reading a W3C validator report ---------- */

function ValidatorReport({ t }: { t: CanvasTokens }) {
  const rows = [
    {
      says: ['Error: End tag "li" seen,', "but there were open elements."],
      means: ["You opened a tag inside the", "li and never closed it."],
      fix: ["Add the missing", "</a> or </strong>."],
    },
    {
      says: ['Error: An "img" element must', 'have an "alt" attribute.'],
      means: ["A screen reader has no idea", "what that picture shows."],
      fix: ['alt="Club members at', 'the 2026 fair"'],
    },
    {
      says: ['Error: Duplicate ID "header".', ""],
      means: ["Two elements share one id.", "An id must be unique."],
      fix: ['Use class="header"', "on both instead."],
    },
  ];

  return (
    <svg viewBox="0 0 560 314" width="100%" height="314" role="img"
      aria-label="How to submit a page to the W3C validator and how to translate three common validator error messages into plain English and a fix.">
      {/* the two ways in */}
      <rect x="6" y="4" width="270" height="64" rx="7" fill={t.chart.brightOrange} opacity="0.14" />
      <rect x="6" y="4" width="270" height="64" rx="7" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="20" y="24" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Validate by URI</text>
      <text x="20" y="42" fontSize="12" fill={t.text.secondary}>Only works once the site is uploaded</text>
      <text x="20" y="58" fontSize="12" fill={t.text.secondary}>to a real server. Not for localhost.</text>

      <rect x="284" y="4" width="270" height="64" rx="7" fill={t.chart.green} opacity="0.16" />
      <rect x="284" y="4" width="270" height="64" rx="7" fill="none" stroke={t.chart.green} strokeWidth="1.5" />
      <text x="298" y="24" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Validate by File Upload</text>
      <text x="298" y="42" fontSize="12" fill={t.text.secondary}>Pick index.html straight off your</text>
      <text x="298" y="58" fontSize="12" fill={t.text.secondary}>laptop. Use this one in class.</text>

      {/* report table */}
      <rect x="6" y="78" width="548" height="24" rx="5" fill={t.fill.tertiary} />
      <text x="18" y="94.5" fontSize="11.5" fontWeight="700" fill={t.text.secondary} letterSpacing="0.4">WHAT THE VALIDATOR SAYS</text>
      <text x="232" y="94.5" fontSize="11.5" fontWeight="700" fill={t.text.secondary} letterSpacing="0.4">WHAT IT MEANS</text>
      <text x="402" y="94.5" fontSize="11.5" fontWeight="700" fill={t.text.secondary} letterSpacing="0.4">WHAT YOU CHANGE</text>

      {rows.map((r, i) => {
        const y = 102 + i * 46;
        return (
          <g key={"vr" + i}>
            <rect x="6" y={y} width="548" height="46" fill={i % 2 === 0 ? t.bg.elevated : t.fill.tertiary} opacity={i % 2 === 0 ? "1" : "0.45"} />
            <rect x="6" y={y} width="3" height="46" fill={t.chart.brightOrange} />
            <text x="18" y={y + 20} fontSize="11" fontFamily={MONO} fill={t.chart.brightOrange}>{r.says[0]}</text>
            <text x="18" y={y + 35} fontSize="11" fontFamily={MONO} fill={t.chart.brightOrange}>{r.says[1]}</text>
            <text x="232" y={y + 20} fontSize="12" fill={t.text.primary}>{r.means[0]}</text>
            <text x="232" y={y + 35} fontSize="12" fill={t.text.primary}>{r.means[1]}</text>
            <text x="402" y={y + 20} fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>{r.fix[0]}</text>
            <text x="402" y={y + 35} fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>{r.fix[1]}</text>
          </g>
        );
      })}
      <line x1="226" y1="78" x2="226" y2="240" stroke={t.stroke.tertiary} />
      <line x1="396" y1="78" x2="396" y2="240" stroke={t.stroke.tertiary} />
      <rect x="6" y="78" width="548" height="162" rx="5" fill="none" stroke={t.stroke.secondary} />

      {/* the state you are aiming for */}
      <rect x="6" y="248" width="548" height="56" rx="7" fill={t.chart.green} opacity="0.18" />
      <circle cx="28" cy="268" r="11" fill={t.chart.green} />
      <text x="28" y="273" textAnchor="middle" fontSize="13" fontWeight="700" fill={ON_FILL}>✓</text>
      <text x="48" y="263" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Document checking completed. No errors or warnings to show.</text>
      <text x="48" y="279" fontSize="12" fill={t.text.secondary}>This green bar is what you screenshot for the homework.</text>
      <text x="48" y="295" fontSize="12" fill={t.text.secondary}>Fix errors top to bottom — one bad tag often causes five messages.</text>
    </svg>
  );
}

/* ---------- 4. DevTools: the loop, and why the fix disappears ---------- */

function DevToolsLoop({ t }: { t: CanvasTokens }) {
  const tree = [
    ["<body>", 0, false],
    ['<header class="hero">', 1, false],
    ['<div class="card">', 1, true],
    ["<h3>Events</h3>", 2, false],
    ["</div>", 1, false],
  ] as const;

  const tabs = ["Elements", "Console", "Network"] as const;

  const steps = [
    ["1", "Click the element", "in the Elements tree"],
    ["2", "Edit a value in Styles", "the page redraws as you type"],
    ["3", "Ctrl+Shift+M", "re-check it at phone width"],
  ] as const;

  return (
    <svg viewBox="0 0 560 302" width="100%" height="302" role="img"
      aria-label="A browser with DevTools open beside the page: the Elements tree, the Styles pane with an overridden property struck through, the three-step inspect and edit loop, and a warning that DevTools edits vanish on refresh.">
      <defs>
        <marker id="s12-tip" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>

      {/* browser shell */}
      <rect x="6" y="4" width="548" height="196" rx="8" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <rect x="6" y="4" width="548" height="22" rx="8" fill={t.fill.tertiary} />
      <rect x="6" y="20" width="548" height="6" fill={t.fill.tertiary} />
      <text x="20" y="19" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>127.0.0.1:5500/index.html</text>
      <rect x="470" y="8" width="76" height="14" rx="7" fill={t.chart.goldenYellow} />
      <text x="508" y="18.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>F12 opened</text>

      {/* the page, left half */}
      <rect x="6" y="26" width="292" height="174" fill={t.bg.elevated} />
      <rect x="18" y="38" width="268" height="30" rx="4" fill={t.chart.blue} opacity="0.85" />
      <text x="152" y="57" textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>Student Club</text>
      <rect x="18" y="80" width="268" height="72" rx="4" fill={t.fill.tertiary} stroke={t.chart.goldenYellow} strokeWidth="2" strokeDasharray="5 3" />
      <text x="30" y="100" fontSize="12" fontWeight="700" fill={t.text.primary}>Upcoming Events</text>
      <text x="30" y="118" fontSize="11.5" fill={t.text.secondary}>Film night, Friday 19:00</text>
      <text x="30" y="134" fontSize="11.5" fill={t.text.secondary}>Coding clinic, Saturday</text>
      <rect x="18" y="156" width="112" height="18" rx="3" fill={t.chart.goldenYellow} />
      <text x="74" y="169" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>268 × 72  .card</text>
      <line x1="298" y1="26" x2="298" y2="200" stroke={t.stroke.secondary} strokeWidth="1.5" />

      {/* devtools, right half */}
      <rect x="300" y="26" width="254" height="20" fill={t.fill.tertiary} />
      {tabs.map((tab, i) => (
        <g key={"tb" + i}>
          <text x={314 + i * 62} y="40" fontSize="11.5" fontWeight={i === 0 ? "700" : "400"}
            fill={i === 0 ? t.chart.blue : t.text.tertiary}>{tab}</text>
          {i === 0 ? <rect x={310} y="43.5" width="58" height="2.5" fill={t.chart.blue} /> : null}
        </g>
      ))}

      {tree.map(([line, depth, sel], i) => (
        <g key={"el" + i}>
          {sel ? <rect x="302" y={50 + i * 15} width="250" height="15" fill={t.chart.goldenYellow} opacity="0.3" /> : null}
          <text x={308 + depth * 10} y={61 + i * 15} fontSize="11" fontFamily={MONO}
            fill={sel ? t.text.primary : t.chart.blue} fontWeight={sel ? "700" : "400"}>{line}</text>
        </g>
      ))}
      <line x1="300" y1="128" x2="554" y2="128" stroke={t.stroke.tertiary} />
      <text x="308" y="140" fontSize="11" fontWeight="700" fill={t.text.tertiary} letterSpacing="0.4">STYLES</text>
      <text x="308" y="155" fontSize="11" fontFamily={MONO} fill={t.chart.green}>.card {"{"}</text>
      <text x="316" y="168" fontSize="11" fontFamily={MONO} fill={t.text.tertiary} textDecoration="line-through">padding: 4px;</text>
      <text x="316" y="181" fontSize="11" fontFamily={MONO} fill={t.chart.green}>padding: 24px;</text>
      <text x="308" y="194" fontSize="11" fontFamily={MONO} fill={t.chart.green}>{"}"}</text>
      <text x="440" y="168" fontSize="11" fill={t.text.tertiary}>beaten by</text>
      <text x="440" y="181" fontSize="11" fill={t.text.tertiary}>a later rule</text>

      {/* the loop */}
      {steps.map(([n, title, sub], i) => (
        <g key={"st" + i}>
          <rect x={6 + i * 186} y="212" width="176" height="44" rx="7" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
          <circle cx={24 + i * 186} cy="228" r="10" fill={t.chart.goldenYellow} />
          <text x={24 + i * 186} y="232.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>{n}</text>
          <text x={40 + i * 186} y="228" fontSize="12" fontWeight="700" fill={t.text.primary}>{title}</text>
          <text x={20 + i * 186} y="248" fontSize="11.5" fill={t.text.secondary}>{sub}</text>
          {i < 2 ? <line x1={186 + i * 186} y1="234" x2={190 + i * 186} y2="234" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s12-tip)" /> : null}
        </g>
      ))}

      {/* the trap */}
      <rect x="6" y="262" width="548" height="36" rx="6" fill={t.chart.brightOrange} opacity="0.14" />
      <rect x="6" y="262" width="4" height="36" rx="2" fill={t.chart.brightOrange} />
      <text x="20" y="279" fontSize="12.5" fill={t.text.primary}>
        Every DevTools edit dies on refresh. When a value looks right,
      </text>
      <text x="20" y="295" fontSize="12.5" fill={t.text.primary}>
        retype it into <tspan fontFamily={MONO} fontWeight="700">css/style.css</tspan> and save there.
      </text>
    </svg>
  );
}

export default function Session12Lecture() {
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
        id="s12-title"
        title="Session 12 — Code Tools"
        notes="Welcome to Session 12. Today we master VS Code, Emmet, W3C validation, and browser DevTools."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 12 · 3 periods</Tag>
          <H1>Using Code-Editing Tools</H1>
          <Text tone="secondary">VS Code, Emmet, W3C Validators &amp; Browser DevTools</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s12-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>By the end of this session you will…</H2>
          <Stack gap={6}>
            <Text>Navigate the VS Code interface confidently</Text>
            <Text>Install essential extensions (Live Server, Prettier, Auto Close Tag)</Text>
            <Text>Use Emmet abbreviations to generate HTML/CSS instantly</Text>
            <Text>Apply keyboard shortcuts for faster editing</Text>
            <Text>Validate HTML/CSS with W3C validators</Text>
            <Text>Debug layouts with browser DevTools (Elements, Console, Device Toolbar)</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s12-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Warm-up recap from Session 11</Text></Row>
              <Row gap={8}><Tag tone="info">50 min</Tag><Text>Theory: VS Code, Emmet, validation, DevTools</Text></Row>
              <Row gap={8}><Tag tone="info">50 min</Tag><Text>In-class practice (5 tasks)</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">5 min</Tag><Text>Recap &amp; course outlook</Text></Row>
              <Row gap={8}><Tag tone="info">25 min</Tag><Text>Buffer / Q&amp;A / catch-up time</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Have VS Code installed and your club-website folder ready. Install Live Server extension before practice.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s12-warmup" title="Warm-Up Recap">
        <Stack gap={12}>
          <H2>Quick Recall — Session 11</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">Q1:</Text> What is the maximum recommended depth for site navigation (clicks from home)?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q2:</Text> What does DRY stand for? Give one example of applying it in a website.
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q3:</Text> Name three of the seven lines in the CLO2 specification template.
            </Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: VS Code Interface ─────────────────────────── */}
      <PresentationSlide id="s12-vscode" title="VS Code Interface" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>VS Code — Your Primary Tool</H2>
          <VSCodeLayout t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: Extensions ────────────────────────────────── */}
      <PresentationSlide id="s12-extensions" title="Essential Extensions">
        <Stack gap={12}>
          <H2>Must-Have Extensions</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={6}><Tag tone="success">Live Server</Tag><Text>Auto-refresh on save</Text></Row>
              <Row gap={6}><Tag tone="success">Prettier</Tag><Text>Auto-format on save</Text></Row>
              <Row gap={6}><Tag tone="success">Auto Close Tag</Tag><Text>Insert closing tags</Text></Row>
              <Row gap={6}><Tag tone="success">Auto Rename Tag</Tag><Text>Rename both tags</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={6}><Tag tone="success">Path Intellisense</Tag><Text>Autocomplete paths</Text></Row>
              <Row gap={6}><Tag tone="success">W3C Validator</Tag><Text>In-editor validation</Text></Row>
              <Row gap={6}><Tag tone="info">Emmet</Tag><Text>Built-in abbreviation expander</Text></Row>
            </Stack>
          </Grid>
          <Text tone="secondary">Install via Ctrl+Shift+X. Reload if prompted.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Live Server Setup ─────────────────────────── */}
      <PresentationSlide id="s12-live-server" title="Live Server Setup">
        <Stack gap={12}>
          <H2>Auto-Refresh Preview with Live Server</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Setup steps</Text>
              <Text>1. Install "Live Server" by Ritwick Dey</Text>
              <Text>2. Open your project folder (File → Open Folder)</Text>
              <Text>3. Right-click index.html → "Open with Live Server"</Text>
              <Text>4. Browser opens at http://127.0.0.1:5500</Text>
              <Text tone="secondary">Every time you save a file, the browser refreshes automatically.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Why this matters</Text>
              <Text>No more manual save → switch → refresh cycle.</Text>
              <Text>Changes appear instantly as you type.</Text>
              <Text>CSS changes visible without refreshing.</Text>
              <Callout tone="warning">Live Server only works when you open a FOLDER, not a single file. File → Open Folder, always.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Emmet ─────────────────────────────────────── */}
      <PresentationSlide id="s12-emmet" title="Emmet Abbreviations" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>Emmet — Write HTML at Lightning Speed</H2>
          <EmmetExpand t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Emmet recipes ─────────────────────────────── */}
      <PresentationSlide id="s12-emmet-recipes" title="Emmet Recipes Worth Memorising"
        notes="Do not read this list out. Put it on screen, then ask the class to type each one and describe what appeared. The last two rows are the ones that save the most time in the final project: div.card*3>h3+p builds a whole card section, and the CSS shorthands remove most of the typing from a stylesheet.">
        <Stack gap={12}>
          <H2>Six Abbreviations That Cover Most of a Page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="text">{`!                     → whole HTML5 boilerplate
nav>ul>li*6>a[href]   → a six-item nav bar
ul>li{Item $}*4       → Item 1 … Item 4`}</Code>
            <Code language="text">{`div.card*3>h3+p       → three cards, each h3+p
table>tr*3>td*4       → a 3 by 4 table
d:f / jc:c / mt10     → CSS shorthands`}</Code>
          </Grid>
          <Callout tone="info">
            <Text as="span">$</Text> is a counter and <Text as="span">{`{}`}</Text> is text content, so <Text as="span">li{`{Item $}`}*4</Text> writes the numbering for you. Both work in .html only — in .css use the property shorthands instead.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Keyboard Shortcuts ───────────────────────── */}
      {/* ── Try It Now: Emmet ─────────────────────────────────── */}
      <PresentationSlide id="s12-try-emmet" title="Try It Now: Emmet Speed Round" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — type these abbreviations and press Tab</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type these in a .html file</Text>
              <Code language="html">{`!              → full HTML boilerplate
nav>ul>li*3    → nav with 3 list items
.container     → <div class="container">
#hero          → <div id="hero">
p.text{Hello}  → <p class="text">Hello</p>
ul>li.item$*5  → 5 items with numbered classes`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to notice</Text>
              <Text>! gives you the full HTML5 boilerplate in one keystroke.</Text>
              <Text>&gt; means "child" — nav contains ul contains li.</Text>
              <Text>*3 means "repeat 3 times."</Text>
              <Text>. means class, # means id — just like CSS selectors.</Text>
              <Text>$ is a number counter — item1, item2, item3...</Text>
              <Callout tone="info">If nothing happens when you press Tab, make sure you are in an .html file and Emmet is enabled.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s12-shortcuts" title="Keyboard Shortcuts">
        <Stack gap={12}>
          <H2>Edit Faster with Shortcuts</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <H3>Editing</H3>
              <Text><Text as="span">Ctrl+D</Text> — select next occurrence</Text>
              <Text><Text as="span">Alt+Up/Down</Text> — move line</Text>
              <Text><Text as="span">Shift+Alt+Down</Text> — copy line</Text>
              <Text><Text as="span">Ctrl+/</Text> — toggle comment</Text>
              <Text><Text as="span">Ctrl+Shift+K</Text> — delete line</Text>
            </Stack>
            <Stack gap={4}>
              <H3>Navigation</H3>
              <Text><Text as="span">Ctrl+P</Text> — quick-open file</Text>
              <Text><Text as="span">Ctrl+G</Text> — go to line</Text>
              <Text><Text as="span">Ctrl+Shift+F</Text> — find in all files</Text>
              <Text><Text as="span">Shift+Alt+F</Text> — format document</Text>
              <Text><Text as="span">Ctrl+B</Text> — toggle sidebar</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Problems Panel & IntelliSense ─────────────── */}
      {/* ── Try It Now: Live Server ─────────────────────────────── */}
      <PresentationSlide id="s12-try-liveserver" title="Try It Now: Live Server Workflow" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Four minutes — save-and-see instead of save-and-refresh</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Steps</Text>
              <Text>1. Right-click index.html in the Explorer panel.</Text>
              <Text>2. Choose &quot;Open with Live Server&quot;.</Text>
              <Text>3. The browser opens at http://127.0.0.1:5500.</Text>
              <Text>4. Put VS Code and the browser side by side.</Text>
              <Text>5. Change an &lt;h1&gt; and press Ctrl+S — watch the browser update itself.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to notice</Text>
              <Text>The address bar shows http://127.0.0.1:5500, not file:///C:/...</Text>
              <Text>Relative paths like images/logo.png now resolve the same way they will on a real server.</Text>
              <Text>You never press F5 again — saving is the refresh.</Text>
              <Callout tone="warning">Live Server binds to localhost only, so nobody else on the network can reach it. It is a dev tool, not hosting.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s12-problems" title="Problems Panel & IntelliSense">
        <Stack gap={12}>
          <H2>Real-Time Error Detection</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Problems panel (Ctrl+Shift+M)</Text>
              <Text>Shows errors and warnings in real time.</Text>
              <Text>Red squiggly = error, yellow = warning.</Text>
              <Text>Hover over underlined text to see the message.</Text>
              <Text tone="secondary">Bottom-left corner shows error count: "0 Errors, 0 Warnings" means clean code.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">IntelliSense autocomplete</Text>
              <Text>Type <Text as="span">&lt;h</Text> and wait — VS Code suggests h1-h6, head, header.</Text>
              <Text>Press Tab or Enter to accept a suggestion.</Text>
              <Text>Works for CSS properties too: type <Text as="span">mar</Text> and get margin, margin-top, etc.</Text>
              <Callout tone="info">Never guess property names or tag names. Let IntelliSense autocomplete them for you — fewer typos.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Validation ───────────────────────────────── */}
      <PresentationSlide id="s12-validation" title="W3C Validation">
        <Stack gap={12}>
          <H2>Validate Before You Submit</H2>
          <ValidatorReport t={t} />
          <Callout tone="warning">"It looks fine in Chrome" is not enough. Chrome forgives errors that break other browsers.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: CSS Validation ───────────────────────────── */}
      <PresentationSlide id="s12-css-validation" title="CSS Validation">
        <Stack gap={12}>
          <H2>Validate CSS Too</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">How to validate CSS</Text>
              <Text>Go to jigsaw.w3.org/css-validator</Text>
              <Text>Choose "By direct input"</Text>
              <Text>Paste your CSS code and click "Check"</Text>
              <Text tone="secondary">Fix all errors. Target: zero errors.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Common CSS errors</Text>
              <Text tone="danger">Misspelled property: <Text as="span">colr</Text> instead of <Text as="span">color</Text></Text>
              <Text tone="danger">Missing semicolon after a value</Text>
              <Text tone="danger">Invalid value: <Text as="span">font-size: big</Text></Text>
              <Text tone="danger">Unknown property: <Text as="span">text-colour</Text></Text>
              <Callout tone="info">CSS validation catches typos that browsers silently ignore. Always validate before submitting.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: DevTools ─────────────────────────────────── */}
      <PresentationSlide id="s12-devtools" title="Browser DevTools" background={{ pattern: "grid", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>DevTools — Inspect, Edit, Debug</H2>
          <Stack gap={6}>
            <Text>Open with <Text as="span">F12</Text> or right-click → Inspect.</Text>
            <Row gap={8}>
              <Tag tone="info">Elements</Tag>
              <Tag tone="info">Console</Tag>
              <Tag tone="info">Network</Tag>
              <Tag tone="info">Device Toolbar</Tag>
            </Row>
          </Stack>
          <DevToolsLoop t={t} />
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Worked Example — DevTools Fix ────────────── */}
      <PresentationSlide id="s12-worked-example" title="Worked Example — Debugging with DevTools">
        <Stack gap={10}>
          <H2>Worked Example: Sidebar Below Main Content</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Problem: sidebar appears below main, not beside it.</Text>
              <Code language="html">{`<!-- Inspect in DevTools -->
<div id="main-area">
  <main>...</main>
  <aside id="sidebar"
    style="width:30%; float:left;">
  </aside>
</div>`}</Code>
              <Text tone="secondary">The Computed panel shows sidebar is 100% wide. Why? Parent has no overflow fix.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Fix (test live in DevTools first):</Text>
              <Code language="css">{`/* Step 1: Click #main-area in DOM tree */
/* Step 2: Add new property in Styles */
#main-area {
  overflow: hidden;  /* ← type + Enter */
}

/* Sidebar snaps into place instantly! */
/* Step 3: Copy this rule to style.css */
/* Step 4: Save → refresh to confirm */`}</Code>
              <Callout tone="warning">DevTools edits are temporary. Always copy the working value back to your CSS file and save.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Quick Check ──────────────────────────────── */}
      <PresentationSlide id="s12-quick-check" title="Quick Check: Code Tools">
        <Stack gap={12}>
          <H2>Discussion Prompts</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">1.</Text> A student types <Text as="span">nav &gt; ul</Text> (with spaces) and presses Tab. Nothing happens. Why?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">2.</Text> You change padding in DevTools and it looks perfect. After refreshing, the change is gone. What did you forget?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">3.</Text> Why should you validate with the W3C validator even if your site "looks fine" in Chrome?
            </Callout>
          </Stack>
          <Text tone="secondary">Think for 1 minute, then discuss with your neighbour.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 16: Common Mistakes (expanded to 7) ──────────── */}
      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s12-do-dont" title="Tooling: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use Live Server so the page reloads as you save</Text>
              <Text>Run W3C validation before submitting anything</Text>
              <Text>Format with Shift+Alt+F to keep indentation consistent</Text>
              <Text>Read the Problems panel — it catches errors before the browser does</Text>
              <Text>Use Emmet abbreviations to type structure faster</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Open HTML with file:// and wonder why paths break</Text>
              <Text>Ignore squiggly underlines in the editor</Text>
              <Text>Mix tabs and spaces in the same file</Text>
              <Text>Install 40 extensions you never use — they slow VS Code down</Text>
              <Text>Edit CSS only in DevTools — those changes vanish on reload</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Validate ──────────────────────────────── */}
      <PresentationSlide id="s12-try-validate" title="Try It Now: Validate Your Page" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — find and fix real errors</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Steps</Text>
              <Text>1. Open validator.w3.org/nu in a browser.</Text>
              <Text>2. Choose &quot;Check by file upload&quot; and pick your index.html.</Text>
              <Text>3. Click Check. Read every red Error line.</Text>
              <Text>4. Fix the first error in VS Code, save, re-upload, repeat.</Text>
              <Text>5. Then do the same for style.css at jigsaw.w3.org/css-validator.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Errors you will probably see</Text>
              <Code language="text">{`Error: End tag "div" seen, but there
were open elements.
  -> a nested tag was never closed

Error: An "img" element must have an
"alt" attribute.
  -> add alt="..." to every image

Error: Duplicate ID "header".
  -> IDs must be unique per page`}</Code>
              <Callout tone="info">Fix errors top to bottom. One unclosed tag often causes five downstream errors that disappear together.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s12-mistakes" title="Common Mistakes">
        <Stack gap={10}>
          <H2>Seven Pitfalls to Avoid</H2>
          <Stack gap={4}>
            <Text tone="danger">1. Coding in Notepad — use VS Code with extensions</Text>
            <Text tone="danger">2. Ignoring validation errors — validate every page before submitting</Text>
            <Text tone="danger">3. Manual formatting — set up Prettier + Format on Save (Shift+Alt+F)</Text>
            <Text tone="danger">4. Edit-save-refresh cycle — use DevTools for live CSS testing</Text>
            <Text tone="danger">5. Guessing property names — let IntelliSense autocomplete</Text>
            <Text tone="danger">6. Leaving debug artifacts (console.log, red borders) in submission</Text>
            <Text tone="danger">7. Opening a single file instead of the folder — Live Server needs a folder</Text>
          </Stack>
          <Callout tone="warning">Fix: use VS Code with extensions, validate before submit, format on save, test in DevTools first.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s12-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This page has five bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy HTML</Text>
              <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Club Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to the Club<h1>
  <p>We meet every <b>Friday</b>.</p>
  <img src="photo.jpg">
  <p>Contact us at club@school.edu
</body>
</html>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. &lt;h1&gt;Welcome to the Club&lt;h1&gt; — missing / in closing tag. Should be &lt;/h1&gt;.</Text>
              <Text tone="danger">2. &lt;img src="photo.jpg"&gt; — missing alt attribute. Add alt="Club photo".</Text>
              <Text tone="danger">3. &lt;p&gt;Contact us — missing closing &lt;/p&gt; tag.</Text>
              <Text tone="danger">4. &lt;b&gt;Friday&lt;/b&gt; — should be &lt;strong&gt; for semantic meaning.</Text>
              <Text tone="danger">5. No &lt;meta name="viewport"&gt; — page will not be responsive on mobile.</Text>
              <Callout tone="info">Paste this into validator.w3.org to see all five errors listed.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 17: Theory Summary ───────────────────────────── */}
      <PresentationSlide id="s12-summary" title="Theory Summary">
        <Stack gap={10}>
          <H2>Session 12 — Complete Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={3}>
              <Text fontWeight="700">VS Code Essentials</Text>
              <Text>Open Folder (not Open File)</Text>
              <Text>Live Server for auto-refresh</Text>
              <Text>Prettier for auto-format</Text>
              <Text>Problems panel for real-time errors</Text>
              <Text>IntelliSense for autocomplete</Text>
            </Stack>
            <Stack gap={3}>
              <Text fontWeight="700">Workflow Tools</Text>
              <Text>Emmet: type abbreviations, press Tab</Text>
              <Text>Shortcuts: Ctrl+D, Ctrl+P, Shift+Alt+F</Text>
              <Text>W3C validator: zero errors target</Text>
              <Text>DevTools: inspect, edit, test live</Text>
              <Text>Always copy DevTools fixes to CSS file</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Emmet Layout ────────────────────────────── */}
      <PresentationSlide id="s12-try-emmet-layout" title="Try It Now: Emmet a Full Page" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — build a page skeleton in one line</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">In a new file page.html, type this and press Tab</Text>
              <Code language="text">{`!`}</Code>
              <Text>You get the full HTML5 boilerplate including DOCTYPE, meta charset and viewport.</Text>
              <Text fontWeight="700">Then inside &lt;body&gt;, type this and press Tab</Text>
              <Code language="text">{`header>h1{My Club}+nav>ul>li*4>a[href=#]{Link $}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What Emmet generates</Text>
              <Code language="html">{`<header>
  <h1>My Club</h1>
  <nav>
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
      <li><a href="#">Link 4</a></li>
    </ul>
  </nav>
</header>`}</Code>
              <Text fontWeight="700">Decoding the syntax</Text>
              <Text>&gt; child • + sibling • *4 repeat • {`{text}`} content • $ auto-number</Text>
              <Callout tone="info">Ten seconds of typing replaced 11 lines of markup. Learn five Emmet patterns and you will never hand-type boilerplate again.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 19: Code Formatting Best Practices ───────────── */}
      <PresentationSlide id="s12-formatting" title="Code Formatting Rules">
        <Stack gap={12}>
          <H2>Clean Code = Professional Code</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">HTML formatting</Text>
              <Text>2-space indentation (not tabs, not 4 spaces)</Text>
              <Text>Each element on its own line when it has children</Text>
              <Text>Add section comments: <Text as="span">&lt;!-- Navigation --&gt;</Text></Text>
              <Text>Self-closing tags (<Text as="span">&lt;img&gt;</Text>, <Text as="span">&lt;br&gt;</Text>) on own line</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">CSS formatting</Text>
              <Text>One property per line</Text>
              <Text>Opening brace on same line as selector</Text>
              <Text>Closing brace on its own line</Text>
              <Text>Blank lines between different selectors</Text>
              <Text>Section comments: <Text as="span">/* Header Styles */</Text></Text>
            </Stack>
          </Grid>
          <Callout tone="info">Use Shift+Alt+F to auto-format. Set up Prettier extension for consistent formatting on every save.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Practice ─────────────────────────────────── */}
      <PresentationSlide id="s12-practice" title="Hands-On Practice">
        <Stack gap={12}>
          <H2>Practice — exercises/session-12/</H2>
          <Callout tone="info">Estimated time: 50 minutes</Callout>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">Task 1</Tag><Text>Set up VS Code for web development (open folder, install extensions)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 2</Tag><Text>Learn key VS Code features (auto-complete, Emmet, multi-cursor, shortcuts)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 3</Tag><Text>Validate your HTML code at validator.w3.org</Text></Row>
            <Row gap={8}><Tag tone="info">Task 4</Tag><Text>Format your code (Shift+Alt+F, consistent indentation)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 5</Tag><Text>Debug a broken page (find and fix 5 errors)</Text></Row>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s12-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>VS Code shows your project folder in the Explorer sidebar — not just one file.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Type div.container and press Tab — Emmet expands it to &lt;div class="container"&gt;&lt;/div&gt;.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Paste your HTML into validator.w3.org — zero errors, zero warnings.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>Press Shift+Alt+F — your code re-formats with consistent indentation.</Text></Row>
            <Row gap={8}><Pill>Task 5</Pill><Text>The broken page loads without errors in the browser console.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If Emmet does not expand, check that you are in an .html file and the Emmet extension is enabled.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s12-assignment" title="Assignment: Validate and Clean Up">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>All HTML and CSS files in your Student Club site pass W3C validation with zero errors.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>Every .html file validated at validator.w3.org — screenshot of zero errors.</Text>
              <Text>style.css validated at jigsaw.w3.org/css-validator — screenshot of zero errors.</Text>
              <Text>Code formatted consistently (2-space indent, one property per line in CSS).</Text>
              <Text>No debug artifacts (console.log, red test borders) left in code.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Open every page in the browser — no layout breaks.</Text>
              <Text>Check the Problems panel in VS Code — zero warnings.</Text>
              <Callout tone="warning">A submission with validation errors loses points even if the page "looks fine." Validate everything.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility Tooling ─────────────────────────────── */}
      <PresentationSlide id="s12-accessibility" title="Tools That Audit Accessibility">
        <Stack gap={12}>
          <H2>Let the Machine Find What Your Eyes Miss</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Lighthouse</Pill><Text>DevTools → Lighthouse → Accessibility. One click gives a score plus a prioritised list of failures with links to fixes.</Text></Row>
            <Row gap={8}><Pill>Contrast</Pill><Text>Inspect an element, click the colour swatch: DevTools prints the contrast ratio and flags anything under 4.5:1.</Text></Row>
            <Row gap={8}><Pill>Validator</Pill><Text>validator.w3.org catches missing alt attributes, duplicate ids, and mislabelled inputs as HTML errors.</Text></Row>
            <Row gap={8}><Pill>Keyboard</Pill><Text>Put the mouse down and press Tab through the page. If you cannot see the focus ring, keyboard users cannot either.</Text></Row>
            <Row gap={8}><Pill>Zoom</Pill><Text>Ctrl+Plus to 200%. Text must reflow and stay readable — nothing clipped, nothing overlapping.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="warning">Automated tools catch roughly a third of real accessibility problems. The Tab-key test finds most of the rest.</Callout>
        </Stack>
      </PresentationSlide>



      {/* ── Slide 19: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s12-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework — homework/session-12/</H2>
          <Callout tone="info">Due Sunday 23:59</Callout>
          <Stack gap={6}>
            <Text>Task 1: Validate all HTML files at validator.w3.org — zero errors</Text>
            <Text>Task 2: Validate CSS at jigsaw.w3.org/css-validator — zero errors</Text>
            <Text>Task 3: Clean up code formatting (proper indentation, comments)</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Recap + Next ─────────────────────────────── */}
      <PresentationSlide
        id="s12-recap"
        title="Recap & What's Next"
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.green, accentSecondary: t.chart.blue }}
      >
        <Stack gap={12} align="center">
          <H2>Session 12 Recap</H2>
          <Row gap={8}>
            <Tag tone="success">VS Code + extensions</Tag>
            <Tag tone="success">Emmet = speed</Tag>
            <Tag tone="success">Shortcuts = efficiency</Tag>
            <Tag tone="success">W3C validation</Tag>
            <Tag tone="success">DevTools = debug</Tag>
          </Row>
          <Text tone="secondary">Your workflow is now professional-grade. Keep building!</Text>
          <PresentationFragment index={0} effect="fade">
            <Text>Next sessions: Forms (13), Responsive Design (14-15), Final Project</Text>
          </PresentationFragment>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
