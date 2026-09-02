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
   INS2053 — TEACHING DIAGRAM KIT (Session 14: Spry, and what replaced it)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- SVG 1: what Spry cost, and what replaced it ---------- */

function SpryVsModern({ t }: { t: CanvasTokens }) {
  const spryFiles = [
    ["SpryAccordion.js", "17 KB of JavaScript"],
    ["SpryAccordion.css", "4 KB you must not edit"],
    ["SpryDOMUtils.js", "a helper the first one needs"],
    ["index.html", "markup + an init script"],
  ] as const;

  // [circle x, year, note text, note x, note anchor, ink]
  const era = [
    [64, "2007", "Shipped in Dreamweaver CS3", 20, "start", t.chart.blue],
    [268, "2012", "Adobe stops all work", 268, "middle", t.chart.brightOrange],
    [468, "2026", "14 years unmaintained", 540, "end", t.chart.brightOrange],
  ] as const;

  return (
    <svg viewBox="0 0 560 306" width="100%" height="306" role="img"
      aria-label="A Spry accordion needed four separate files and twenty-one kilobytes of unmaintained JavaScript, while the same accordion today needs one HTML file and no JavaScript at all. A timeline underneath shows Spry shipping in 2007, Adobe abandoning it in 2012, and fourteen years passing since.">
      <text x="140" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.chart.brightOrange}>One accordion, the Spry way</text>
      <text x="420" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.chart.green}>The same accordion, today</text>

      {/* ---- left: the Spry bill ---- */}
      <rect x="6" y="22" width="268" height="196" rx="8" fill={t.chart.brightOrange} opacity="0.1" />
      {spryFiles.map(([name, cost], i) => (
        <g key={"sf" + i}>
          <rect x="18" y={32 + i * 38} width="244" height="32" rx="5" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.2" />
          <text x="28" y={45 + i * 38} fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>{name}</text>
          <text x="28" y={58 + i * 38} fontSize="11" fill={t.text.secondary}>{cost}</text>
        </g>
      ))}
      <text x="140" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill={t.chart.brightOrange}>4 files. 21 KB. No patches.</text>
      <text x="140" y="212" textAnchor="middle" fontSize="11" fill={t.text.secondary}>Delete one and the menu dies silently.</text>

      {/* ---- right: the modern bill ---- */}
      <rect x="286" y="22" width="268" height="196" rx="8" fill={t.chart.green} opacity="0.1" />
      <rect x="298" y="32" width="244" height="32" rx="5" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.2" />
      <text x="308" y="45" fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>index.html</text>
      <text x="308" y="58" fontSize="11" fill={t.text.secondary}>that is the whole list</text>

      <rect x="298" y="74" width="244" height="106" rx="5" fill={ON_FILL} />
      <text x="308" y="92" fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>&lt;details&gt;</text>
      <text x="318" y="108" fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>&lt;summary&gt;Opening hours&lt;/summary&gt;</text>
      <text x="318" y="124" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>&lt;p&gt;Mon to Fri, 9am to 5pm.&lt;/p&gt;</text>
      <text x="308" y="140" fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>&lt;/details&gt;</text>
      <text x="308" y="164" fontSize="11" fill={t.text.tertiary}>No script tag. No CSS needed.</text>

      <text x="420" y="198" textAnchor="middle" fontSize="12" fontWeight="700" fill={t.chart.green}>1 file. 0 KB of JavaScript.</text>
      <text x="420" y="212" textAnchor="middle" fontSize="11" fill={t.text.secondary}>Works in every browser since 2020.</text>

      {/* ---- timeline ---- */}
      <line x1="20" y1="248" x2="540" y2="248" stroke={t.stroke.secondary} strokeWidth="2" />
      {era.map(([cx, year, note, nx, anchor, ink], i) => (
        <g key={"er" + i}>
          <circle cx={cx as number} cy="248" r="6" fill={ink as string} />
          <text x={cx as number} y="238" textAnchor="middle" fontSize="12" fontWeight="700" fill={ink as string}>{year}</text>
          <text x={nx as number} y="268" textAnchor={anchor as string} fontSize="11" fill={t.text.secondary}>{note}</text>
        </g>
      ))}
      <text x="20" y="294" fontSize="12" fill={t.text.primary}>An unpatched 2012 library on a live site is a security hole.</text>
    </svg>
  );
}

/* ---------- SVG 2: the details/summary accordion ---------- */

function DetailsAccordion({ t }: { t: CanvasTokens }) {
  const faq = [
    ["How do I join?", false],
    ["When do you meet?", true],
    ["Is there a fee?", false],
  ] as const;

  return (
    <svg viewBox="0 0 560 330" width="100%" height="330" role="img"
      aria-label="A details element drawn closed and then open, the markup that produces it with summary labelled as the always-visible line, a group of three details sharing one name attribute so only one can be open at a time, and the trap of putting summary anywhere except first.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>The browser already owns this widget. You only supply the words.</text>

      {/* ---- closed ---- */}
      <text x="140" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.text.secondary}>CLOSED - the page starts here</text>
      <rect x="6" y="44" width="268" height="88" rx="7" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <path d="M22 62 l8 5 l-8 5 z" fill={t.text.primary} />
      <text x="38" y="72" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Opening hours</text>
      <line x1="18" y1="84" x2="262" y2="84" stroke={t.stroke.tertiary} strokeDasharray="3 3" />
      <text x="140" y="104" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>the paragraph is in your HTML,</text>
      <text x="140" y="118" textAnchor="middle" fontSize="11" fill={t.text.tertiary}>just not painted yet</text>

      {/* ---- open ---- */}
      <text x="420" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={t.chart.green}>OPEN - one click, no JavaScript</text>
      <rect x="286" y="44" width="268" height="88" rx="7" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.6" />
      <path d="M298 63 l10 0 l-5 8 z" fill={t.chart.green} />
      <text x="318" y="72" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Opening hours</text>
      <line x1="298" y1="84" x2="542" y2="84" stroke={t.chart.green} opacity="0.5" />
      <text x="318" y="102" fontSize="12" fill={t.text.primary}>Mon to Fri, 9am to 5pm.</text>
      <text x="318" y="120" fontSize="12" fill={t.text.primary}>Saturday mornings in term time.</text>

      {/* ---- the markup, annotated ---- */}
      <rect x="6" y="144" width="548" height="84" rx="7" fill={ON_FILL} />
      <text x="20" y="164" fontSize="12" fontFamily={MONO} fill={t.chart.green}>&lt;details&gt;</text>
      <text x="180" y="164" fontSize="11" fill={t.text.tertiary}>the container. It holds the open / closed state for you.</text>
      <text x="34" y="184" fontSize="12" fontFamily={MONO} fill={t.chart.goldenYellow}>&lt;summary&gt;Opening hours&lt;/summary&gt;</text>
      <text x="290" y="184" fontSize="11" fill={t.chart.goldenYellow}>always visible. This is the click target.</text>
      <text x="34" y="204" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>&lt;p&gt;Mon to Fri, 9am to 5pm.&lt;/p&gt;</text>
      <text x="290" y="204" fontSize="11" fill={t.text.tertiary}>everything after summary is the body.</text>
      <text x="20" y="222" fontSize="12" fontFamily={MONO} fill={t.chart.green}>&lt;/details&gt;</text>

      {/* ---- exclusive group via name ---- */}
      <rect x="6" y="238" width="268" height="76" rx="7" fill={t.chart.blue} opacity="0.1" />
      <text x="18" y="254" fontSize="11.5" fontWeight="700" fill={t.text.primary}>Give them all the same name=</text>
      {faq.map(([q, open], i) => (
        <g key={"fq" + i}>
          <rect x="18" y={260 + i * 17} width="244" height="15" rx="3"
            fill={open ? t.chart.blue : t.fill.tertiary} opacity={open ? 0.9 : 1}
            stroke={t.stroke.tertiary} strokeWidth="0.8" />
          <text x="26" y={271 + i * 17} fontSize="11" fill={open ? ON_FILL : t.text.secondary}>{q}</text>
          <text x="254" y={271 + i * 17} textAnchor="end" fontSize="11" fontWeight="700" fill={open ? ON_FILL : t.text.tertiary}>{open ? "open" : "shut"}</text>
        </g>
      ))}

      {/* ---- the trap ---- */}
      <rect x="286" y="238" width="268" height="76" rx="7" fill={t.chart.brightOrange} opacity="0.12" />
      <text x="298" y="254" fontSize="11.5" fontWeight="700" fill={t.chart.brightOrange}>summary must be the FIRST child</text>
      <text x="298" y="272" fontSize="11" fontFamily={MONO} fill={t.text.tertiary}>&lt;details&gt;&lt;p&gt;...&lt;/p&gt;&lt;summary&gt;</text>
      <text x="298" y="288" fontSize="11" fill={t.text.secondary}>Put it second and the browser draws</text>
      <text x="298" y="302" fontSize="11" fill={t.text.secondary}>its own blank toggle above your text.</text>

      <text x="280" y="326" textAnchor="middle" fontSize="12" fill={t.text.primary}>name= makes it exclusive, like radio buttons. Without it, panels open alone.</text>
    </svg>
  );
}

/* ---------- SVG 3: the CSS-only dropdown, taken apart ---------- */

function DropdownAnatomy({ t }: { t: CanvasTokens }) {
  const navItems = [
    [20, "Home", false],
    [86, "About", false],
    [156, "Events", true],
    [232, "Contact", false],
  ] as const;

  const subItems = ["All events", "Film nights", "Workshops"] as const;

  const notes = [
    "position: relative goes on the li,",
    "not on the ul and not on the a.",
    "That li becomes the origin.",
    "",
    "position: absolute then measures",
    "from the li, and top: 100% means",
    "the li's own bottom edge.",
  ] as const;

  return (
    <svg viewBox="0 0 560 344" width="100%" height="344" role="img"
      aria-label="A navigation bar with an open dropdown under the Events item, showing that position relative on the parent list item makes it the origin and top one hundred percent places the panel at that item's bottom edge, the CSS that produces it, and the two failures: forgetting position relative sends the panel to the corner of the page, and using hover alone locks out keyboard users.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>A dropdown is one nested list plus three lines of CSS.</text>

      {/* ---- the rendered nav ---- */}
      <rect x="6" y="26" width="330" height="30" rx="4" fill={t.chart.blue} />
      {navItems.map(([x, label, active], i) => (
        <g key={"nv" + i}>
          {active && <rect x={(x as number) - 8} y="26" width="66" height="30" fill={t.chart.goldenYellow} />}
          <text x={x as number} y="45" fontSize="12" fontWeight={active ? "700" : "400"} fill={ON_FILL}>{label}</text>
        </g>
      ))}
      <path d="M203 48 l6 0 l-3 5 z" fill={ON_FILL} />

      {/* the open panel */}
      <rect x="148" y="56" width="164" height="76" rx="4" fill={t.bg.elevated} stroke={t.chart.goldenYellow} strokeWidth="1.6" />
      {subItems.map((s, i) => (
        <g key={"sb" + i}>
          <text x="160" y={76 + i * 22} fontSize="11.5" fill={t.text.primary}>{s}</text>
          {i < 2 && <line x1="156" y1={82 + i * 22} x2="304" y2={82 + i * 22} stroke={t.stroke.tertiary} />}
        </g>
      ))}

      {/* origin marker + measurement */}
      <circle cx="148" cy="56" r="4" fill={t.chart.green} />
      <text x="94" y="70" fontSize="11" fontWeight="700" fill={t.chart.green}>origin</text>
      <line x1="120" y1="26" x2="120" y2="56" stroke={t.chart.green} strokeWidth="1.4" strokeDasharray="3 2" />
      <text x="56" y="44" fontSize="11" fill={t.chart.green}>top: 100%</text>

      {/* right-hand notes */}
      {notes.map((n, i) => (
        <text key={"nt" + i} x="350" y={34 + i * 15} fontSize="11" fill={n.startsWith("position") ? t.text.primary : t.text.secondary}>{n}</text>
      ))}

      {/* ---- the CSS ---- */}
      <rect x="6" y="146" width="548" height="88" rx="7" fill={ON_FILL} />
      <text x="20" y="166" fontSize="12" fontFamily={MONO} fill={t.chart.green}>.main-nav &gt; li &#123; position: relative; &#125;</text>
      <text x="330" y="166" fontSize="11" fill={t.text.tertiary}>makes the li the reference box</text>
      <text x="20" y="186" fontSize="12" fontFamily={MONO} fill={t.chart.goldenYellow}>.dropdown &#123; display: none; position: absolute; top: 100%; &#125;</text>
      <text x="20" y="206" fontSize="12" fontFamily={MONO} fill={t.chart.goldenYellow}>li:hover &gt; .dropdown, li:focus-within &gt; .dropdown &#123;</text>
      <text x="34" y="224" fontSize="12" fontFamily={MONO} fill={t.chart.green}>display: block; &#125;</text>
      <text x="200" y="224" fontSize="11" fill={t.text.tertiary}>the whole interaction, in one rule</text>

      {/* ---- failure 1 ---- */}
      <rect x="6" y="244" width="268" height="94" rx="7" fill={t.chart.brightOrange} opacity="0.12" />
      <text x="18" y="260" fontSize="11.5" fontWeight="700" fill={t.chart.brightOrange}>Forget position: relative</text>
      <rect x="18" y="266" width="120" height="64" rx="3" fill="none" stroke={t.stroke.secondary} />
      <rect x="20" y="268" width="52" height="16" rx="2" fill={t.chart.brightOrange} />
      <text x="26" y="280" fontSize="11" fill={ON_FILL}>menu</text>
      <text x="26" y="306" fontSize="11" fill={t.text.tertiary}>page corner</text>
      <text x="148" y="282" fontSize="11" fill={t.text.secondary}>It jumps to the top</text>
      <text x="148" y="296" fontSize="11" fill={t.text.secondary}>corner of the page and</text>
      <text x="148" y="310" fontSize="11" fill={t.text.secondary}>students blame the ul.</text>

      {/* ---- failure 2 ---- */}
      <rect x="286" y="244" width="268" height="94" rx="7" fill={t.chart.green} opacity="0.12" />
      <text x="298" y="260" fontSize="11.5" fontWeight="700" fill={t.chart.green}>Why :focus-within is not optional</text>
      <rect x="298" y="268" width="52" height="22" rx="4" fill={t.fill.tertiary} stroke={t.stroke.secondary} />
      <text x="324" y="283" textAnchor="middle" fontSize="11" fontFamily={MONO} fill={t.text.primary}>Tab</text>
      <text x="360" y="283" fontSize="11" fill={t.text.secondary}>A finger and a keyboard</text>
      <text x="360" y="297" fontSize="11" fill={t.text.secondary}>never hover. :hover alone</text>
      <text x="298" y="316" fontSize="11" fontWeight="700" fill={t.chart.green}>locks out every keyboard and touch user.</text>
      <text x="298" y="330" fontSize="11" fill={t.text.secondary}>Always ship both selectors together.</text>
    </svg>
  );
}

/* ---------- SVG 4: how to take Spry out of a site you inherited ---------- */

function SpryRemoval({ t }: { t: CanvasTokens }) {
  const steps = [
    ["Find it", "Search the HTML for SpryAssets and for any", "class that starts with Spry.", t.chart.goldenYellow],
    ["Keep the words", "The text lives in your HTML, never in the JS.", "Copy it out before you delete anything.", t.chart.blue],
    ["Rebuild it native", "Accordion and tabs become details + summary.", "Menu bar becomes a nested ul.", t.chart.green],
    ["Delete the folder", "Remove SpryAssets/ and every script and link", "tag that pointed into it.", t.chart.brightOrange],
  ] as const;

  const before = ["SpryMenuBar.css", "SpryMenuBar.js", "SpryAccordion.css", "SpryAccordion.js", "SpryDOMUtils.js"] as const;

  return (
    <svg viewBox="0 0 560 316" width="100%" height="316" role="img"
      aria-label="A four step recipe for removing Spry from an inherited site: find it, keep the words out of the HTML, rebuild each widget with a native element, then delete the SpryAssets folder. Beside it, the five files that leave the head of the document and the single stylesheet that remains, and a proof test at the bottom.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>You will meet a Spry site. This is the order you take it apart in.</text>

      {steps.map(([title, l1, l2, ink], i) => (
        <g key={"st" + i}>
          <rect x="6" y={24 + i * 58} width="330" height="52" rx="7" fill={ink as string} opacity="0.12" />
          <circle cx="28" cy={50 + i * 58} r="13" fill={ink as string} />
          <text x="28" y={55 + i * 58} textAnchor="middle" fontSize="13" fontWeight="700" fill={ON_FILL}>{i + 1}</text>
          <text x="50" y={42 + i * 58} fontSize="12" fontWeight="700" fill={t.text.primary}>{title}</text>
          <text x="50" y={56 + i * 58} fontSize="11" fill={t.text.secondary}>{l1}</text>
          <text x="50" y={69 + i * 58} fontSize="11" fill={t.text.secondary}>{l2}</text>
        </g>
      ))}

      {/* ---- what leaves the head ---- */}
      <text x="348" y="36" fontSize="11.5" fontWeight="700" fill={t.chart.brightOrange}>Out of &lt;head&gt;</text>
      <rect x="348" y="42" width="206" height="102" rx="6" fill={ON_FILL} />
      {before.map((f, i) => (
        <g key={"bf" + i}>
          <text x="358" y={60 + i * 18} fontSize="11" fontFamily={MONO} fill={t.chart.brightOrange} textDecoration="line-through">{f}</text>
        </g>
      ))}

      <text x="348" y="170" fontSize="11.5" fontWeight="700" fill={t.chart.green}>What is left</text>
      <rect x="348" y="176" width="206" height="42" rx="6" fill={ON_FILL} />
      <text x="358" y="194" fontSize="11" fontFamily={MONO} fill={t.chart.green}>css/style.css</text>
      <text x="358" y="210" fontSize="11" fill={t.text.tertiary}>and nothing else</text>

      <text x="348" y="240" fontSize="11" fill={t.text.secondary}>Five requests become one. The</text>
      <text x="348" y="254" fontSize="11" fill={t.text.secondary}>page also gets faster for free.</text>

      {/* ---- the proof ---- */}
      <rect x="6" y="266" width="548" height="44" rx="7" fill={t.chart.green} opacity="0.16" />
      <text x="18" y="284" fontSize="12" fontWeight="700" fill={t.text.primary}>The proof test: rename SpryAssets, then reload with the Network tab open.</text>
      <text x="18" y="300" fontSize="12" fill={t.text.secondary}>Zero 404s and the menu still opens? Spry is no longer needed — delete it.</text>
    </svg>
  );
}


export default function Session14Spry() {
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
        id="s14-title"
        title="Session 14 — Spry Framework & Modern CSS"
        notes="Today we study Spry as web history, then build the same features with pure CSS."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 14</Tag>
          <H1>Spry Framework &amp; Modern CSS Navigation</H1>
          <Text tone="secondary">Understand a legacy framework, then replace it with CSS-only dropdowns and accordions.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 2: Objectives ---- */}
      <PresentationSlide id="s14-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>Objectives</H2>
          <Stack gap={6}>
            <Text>Describe what Spry is and why it is considered legacy</Text>
            <Text>Name the three main Spry widgets: Accordion, Tabbed Panels, Menu Bar</Text>
            <Text>Build a CSS-only dropdown navigation using nested ul + :hover</Text>
            <Text>Add :focus-within for keyboard-accessible dropdowns</Text>
            <Text>Create an accordion with HTML5 details/summary elements</Text>
            <Text>Decide when to replace legacy code with modern alternatives</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 3: Agenda / Timeline ---- */}
      <PresentationSlide id="s14-agenda" title="Session Timeline">
        <Stack gap={12}>
          <H2>150-Minute Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <Row gap={8}><Pill>0:00 – 0:10</Pill><Text>Welcome + objectives</Text></Row>
              <Row gap={8}><Pill>0:10 – 0:15</Pill><Text>Recap warm-up</Text></Row>
              <Row gap={8}><Pill>0:15 – 0:40</Pill><Text>Lecture: Spry history + widgets</Text></Row>
              <Row gap={8}><Pill>0:40 – 1:00</Pill><Text>CSS-only dropdowns + accordions</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Pill>1:00 – 1:10</Pill><Text>Quick check + break</Text></Row>
              <Row gap={8}><Pill>1:10 – 2:00</Pill><Text>In-class practice (50 min)</Text></Row>
              <Row gap={8}><Pill>2:00 – 2:15</Pill><Text>Homework brief + Q&amp;A</Text></Row>
              <Row gap={8}><Pill>2:15 – 2:30</Pill><Text>Recap + next session</Text></Row>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 4: Recap Warm-Up ---- */}
      <PresentationSlide id="s14-warmup" title="Warm-Up Questions">
        <Stack gap={12}>
          <H2>Quick Recap — Session 13</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What attribute must every input have for its data to be submitted?</Callout>
            <Callout tone="info">Q2: Why should you use method=&quot;post&quot; instead of &quot;get&quot; for registration forms?</Callout>
            <Callout tone="info">Q3: What does the required attribute do on a form field?</Callout>
            <Text tone="secondary">Answers: (1) name attribute; (2) post hides data from URL bar; (3) blocks submission if the field is empty.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 5: What is Spry? ---- */}
      <PresentationSlide id="s14-what-is-spry" title="What Is Spry?" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>What Is the Spry Framework?</H2>
          <Grid columns={1} gap={10}>
            <SpryVsModern t={t} />
          </Grid>
          <Stack gap={6}>
            <Text>Adobe JavaScript widget library bundled with Dreamweaver CS3–CS6 (2007–2012).</Text>
            <Text>Provided dropdown menus, accordions, tabbed panels without writing JS manually.</Text>
            <Text>Required three files per widget: specific HTML + CSS file + JS file + init script.</Text>
            <Callout tone="danger">Do NOT use Spry in new projects. It is unmaintained, insecure, and not mobile-friendly.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 6: Three Spry Widgets ---- */}
      <PresentationSlide id="s14-spry-widgets" title="The Three Spry Widgets">
        <Stack gap={12}>
          <H2>Spry Widget Types</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>Accordion</H3>
              <Text>Stacked collapsible panels. Only one open at a time.</Text>
              <Text tone="secondary">Used for FAQs, event details.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Tabbed Panels</H3>
              <Text>Content organized under clickable tabs, like browser tabs.</Text>
              <Text tone="secondary">Used for workshops/social/events sections.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Menu Bar</H3>
              <Text>Horizontal or vertical navigation with dropdown submenus.</Text>
              <Text tone="secondary">Most relevant to our Student Club site.</Text>
            </Stack>
          </Grid>
          <Divider />
          <Text>Each widget required: (1) specific HTML classes, (2) linked CSS file, (3) linked JS file, (4) initialization script. Missing any one breaks it.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 7: Spry HTML Structure ---- */}
      <PresentationSlide id="s14-spry-html" title="Recognizing Spry Code">
        <Stack gap={10}>
          <H2>What Spry Code Looks Like</H2>
          <Code language="html">{`<!-- Spry Accordion (LEGACY) -->
<div id="Accordion1" class="Accordion">
  <div class="AccordionPanel">
    <div class="AccordionPanelTab">Title</div>
    <div class="AccordionPanelContent">
      <p>Content here</p>
    </div>
  </div>
</div>
<!-- Required files in <head>: -->
<link href="SpryAssets/SpryAccordion.css"
  rel="stylesheet">
<script src="SpryAssets/SpryAccordion.js"></script>
<!-- Init script at bottom of page: -->
<script>var Accordion1 =
  new Spry.Widget.Accordion("Accordion1");
</script>`}</Code>
          <Stack gap={4}>
            <Text>If you see class names starting with &quot;Spry&quot;, &quot;Accordion&quot;, &quot;MenuBar&quot;, or &quot;TabbedPanels&quot; — it's Spry.</Text>
            <Text tone="danger">Three dependencies: HTML classes + CSS file + JS file + init script. Remove any one and the widget breaks silently.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 8: Why Spry is legacy ---- */}
      <PresentationSlide id="s14-why-legacy" title="Why Spry Is Legacy">
        <Stack gap={12}>
          <H2>Five Reasons Spry Is Obsolete</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="danger">1.</Text> No longer maintained since ~2012 — no patches, no fixes</Text>
            <Text><Text as="span" tone="danger">2.</Text> Not mobile-friendly — touch events not handled; dropdowns fail on phones</Text>
            <Text><Text as="span" tone="danger">3.</Text> Security risks — unmaintained JS may contain unpatched vulnerabilities</Text>
            <Text><Text as="span" tone="danger">4.</Text> Better alternatives exist — modern CSS replicates all widgets without JS</Text>
            <Text><Text as="span" tone="danger">5.</Text> Browser compatibility — outdated JS patterns break in Chrome 100+, Safari 16+</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 8: Spry-vs-Modern Comparison Table ---- */}
      <PresentationSlide id="s14-comparison" title="Spry vs Modern Alternatives">
        <Stack gap={10}>
          <H2>Comparison Table</H2>
          <Grid columns={1} gap={4}>
            <Stack gap={3}>
              <Row gap={8}><Pill>Accordion</Pill><Text>Spry: JS + CSS + init &rarr; Modern: &lt;details&gt; + &lt;summary&gt; (pure HTML5)</Text></Row>
              <Row gap={8}><Pill>Tabbed Panels</Pill><Text>Spry: JS + CSS + init &rarr; Modern: radio-button hack or details name=</Text></Row>
              <Row gap={8}><Pill>Menu Bar</Pill><Text>Spry: JS + CSS + init &rarr; Modern: nested ul + :hover/:focus-within</Text></Row>
              <Row gap={8}><Pill>File count</Pill><Text>Spry: 4+ files per widget &rarr; Modern: 0 extra files</Text></Row>
              <Row gap={8}><Pill>Maintenance</Pill><Text>Spry: dead since 2012 &rarr; Modern: part of HTML/CSS standard forever</Text></Row>
              <Row gap={8}><Pill>Mobile</Pill><Text>Spry: broken on touch &rarr; Modern: works natively on all devices</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Key insight: if behavior can be triggered by hover, focus, or click on summary, CSS can respond without JavaScript.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 9: Modern CSS Alternatives ---- */}
      <PresentationSlide id="s14-modern-css" title="Modern CSS Alternatives" background={{ pattern: "spotlight", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>Modern CSS Can Do It Alone</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H3>Spry Widget</H3>
              <Text>Accordion</Text>
              <Text>Tabbed Panels</Text>
              <Text>Menu Bar</Text>
            </Stack>
            <Stack gap={6}>
              <H3>CSS Replacement</H3>
              <Text>&lt;details&gt; + &lt;summary&gt; (pure HTML5)</Text>
              <Text>Radio-button hack or details name</Text>
              <Text>Nested ul + :hover / :focus-within</Text>
            </Stack>
          </Grid>
          <Divider />
          <Grid columns={1} gap={10}>
            <DetailsAccordion t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 10: CSS-only dropdown code ---- */}
      <PresentationSlide id="s14-dropdown-code" title="CSS-Only Dropdown Navigation">
        <Stack gap={12}>
          <H2>CSS-Only Dropdown Navigation</H2>
          <Code language="css">{`.main-nav > li { position: relative; }
.dropdown { display: none; position: absolute;
            top: 100%; left: 0; z-index: 1000; }
.has-dropdown:hover .dropdown,
.has-dropdown:focus-within .dropdown {
  display: block;
}`}</Code>
          <Grid columns={1} gap={10}>
            <DropdownAnatomy t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 10b: CSS Positioning Refresher ---- */}
      {/* ── Try It Now: Hamburger Toggle ───────────────────────── */}
      <PresentationSlide id="s14-try-hamburger" title="Try It Now: CSS-Only Mobile Menu" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — a toggle menu with zero JavaScript</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">HTML</Text>
              <Code language="html">{`<input type="checkbox" id="menu-toggle"
       class="menu-checkbox">
<label for="menu-toggle"
       class="menu-button">&#9776; Menu</label>

<nav class="mobile-nav">
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>`}</Code>
              <Text fontWeight="700">CSS</Text>
              <Code language="css">{`.menu-checkbox { display: none; }
.mobile-nav { display: none; }

.menu-checkbox:checked ~ .mobile-nav {
  display: block;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. The checkbox itself is hidden — you only see the label.</Text>
              <Text>2. Click the label — clicking a &lt;label for="x"&gt; toggles checkbox #x.</Text>
              <Text>3. The nav appears. Click again and it hides.</Text>
              <Text>4. The ~ is the general sibling selector: nav must come AFTER the checkbox.</Text>
              <Callout tone="info">This is the checkbox hack. It works because :checked is a real CSS state, so no JavaScript is needed.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s14-position-refresher" title="CSS Positioning Refresher">
        <Stack gap={10}>
          <H2>Positioning Refresher</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>position: relative</H3>
              <Text>The element stays in normal flow but becomes a reference point for any absolutely positioned children.</Text>
              <Text tone="secondary">Without it, absolute children measure from the nearest ancestor that has a position set — often the page itself.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>position: absolute</H3>
              <Text>The element is removed from normal flow and positioned relative to its nearest positioned ancestor.</Text>
              <Text tone="secondary">top: 100% means &quot;place my top edge at the bottom edge of my parent.&quot;</Text>
            </Stack>
          </Grid>
          <Divider />
          <Stack gap={4}>
            <Text><Text as="span" fontWeight="700">In dropdowns:</Text> The parent li gets position: relative. The nested ul.dropdown gets position: absolute + top: 100%. This pins the panel directly below the parent menu item.</Text>
            <Callout tone="info">If you forget position: relative on the li, the dropdown measures from the page corner instead. This is the most common positioning bug in CSS navigation.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 11: Worked Example — Complete CSS Dropdown ---- */}
      <PresentationSlide id="s14-worked-example" title="Worked Example: CSS Dropdown Nav" background={{ pattern: "grid", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Complete CSS-Only Dropdown Navigation</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<!-- HTML: nested ul inside li -->
<nav>
  <ul class="main-nav">
    <li><a href="index.html">Home</a></li>
    <li class="has-dropdown">
      <a href="events.html">Events ▾</a>
      <ul class="dropdown">
        <li><a href="workshops.html">
          Workshops</a></li>
        <li><a href="films.html">
          Film Nights</a></li>
        <li><a href="talks.html">
          Career Talks</a></li>
      </ul>
    </li>
    <li><a href="join.html">Join</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>`}</Code>
            <Code language="css">{`.main-nav { list-style: none;
  display: flex; gap: 0; padding: 0; }
.main-nav > li { position: relative; }
.main-nav a { display: block;
  padding: 10px 18px; color: #fff; }

/* hidden by default */
.dropdown { display: none;
  position: absolute; top: 100%;
  left: 0; min-width: 180px;
  background: #1a1a2e; z-index: 1000;
  list-style: none; padding: 0; }

/* show on hover OR keyboard focus */
.has-dropdown:hover .dropdown,
.has-dropdown:focus-within .dropdown {
  display: block; }`}</Code>
          </Grid>
          <Stack gap={4}>
            <Text size="small"><Text as="span" fontWeight="700">position: relative</Text> on the parent li makes it the origin point for the absolutely positioned dropdown panel.</Text>
            <Text size="small"><Text as="span" fontWeight="700">top: 100%</Text> places the panel exactly at the bottom edge of the parent li.</Text>
            <Text size="small"><Text as="span" fontWeight="700">:focus-within</Text> ensures keyboard users can Tab into the submenu. Without it, only mouse hover works.</Text>
            <Text size="small"><Text as="span" fontWeight="700">z-index: 1000</Text> keeps the dropdown above other page content.</Text>
            <Callout tone="info">Result in browser: hovering or tabbing to &quot;Events&quot; reveals three sub-links. No JavaScript needed.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 12: Worked Example 2 — Accordion ---- */}
      {/* ── Try It Now: CSS Dropdown ─────────────────────────── */}
      <PresentationSlide id="s14-try-dropdown" title="Try It Now: Build a Dropdown" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — add a dropdown to your nav</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Add this to your HTML</Text>
              <Code language="html">{`<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li>
      <a href="#">Activities ▾</a>
      <ul>
        <li><a href="#">Sports</a></li>
        <li><a href="#">Music</a></li>
        <li><a href="#">Art</a></li>
      </ul>
    </li>
    <li><a href="about.html">About</a></li>
  </ul>
</nav>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then add this CSS</Text>
              <Code language="css">{`nav ul li { position: relative; }
nav ul li ul {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
}
nav ul li:hover > ul,
nav ul li:focus-within > ul {
  display: block;
}`}</Code>
              <Callout tone="info">Hover over "Activities" — the submenu should appear below it. If it appears in the wrong place, check position: relative on the li.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s14-worked-example-2" title="Worked Example: CSS Accordion" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={10}>
          <H2>Complete CSS-Only Accordion</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<div class="css-accordion">
  <details open>
    <summary>Web Design Workshop</summary>
    <div class="accordion-content">
      <p>Learn HTML & CSS basics.</p>
      <p><strong>Date:</strong> March 15</p>
      <p><strong>Room:</strong> Lab A</p>
    </div>
  </details>

  <details>
    <summary>Photo Walk</summary>
    <div class="accordion-content">
      <p>Explore campus with cameras.</p>
      <p><strong>Meet:</strong> Main Gate, 9 AM</p>
    </div>
  </details>

  <details>
    <summary>Hackathon 2024</summary>
    <div class="accordion-content">
      <p>48-hour coding challenge!</p>
      <p><strong>Teams:</strong> 2–4 students</p>
    </div>
  </details>
</div>`}</Code>
            <Stack gap={5}>
              <Text size="small"><Text as="span" fontWeight="700">&lt;details open&gt;</Text>: first panel starts open so visitors see content immediately.</Text>
              <Text size="small"><Text as="span" fontWeight="700">&lt;summary&gt;</Text>: the always-visible clickable header. Browser adds a triangle automatically.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Everything after summary</Text> is the collapsible body. Hidden until clicked.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Multiple &lt;details&gt; siblings</Text>: each operates independently. Add name=&quot;group&quot; to make them exclusive (one open at a time).</Text>
              <Text size="small"><Text as="span" fontWeight="700">Zero JavaScript</Text>: the browser handles all open/close logic natively.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Accessibility</Text>: screen readers announce the summary text and the expanded/collapsed state.</Text>
              <Callout tone="info">Compare to Spry: same visual result, but 0 KB of JavaScript, full mobile support, and semantic HTML.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 12b: Sub-Submenus & Advanced Patterns ---- */}
      <PresentationSlide id="s14-sub-submenu" title="Sub-Submenus & Advanced Patterns">
        <Stack gap={10}>
          <H2>Going Deeper: Multi-Level Dropdowns</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<li class="has-dropdown">
  <a href="events.html">Events ▾</a>
  <ul class="dropdown">
    <li class="has-dropdown">
      <a href="#">Workshops ▸</a>
      <ul class="dropdown">
        <li><a href="web.html">Web</a></li>
        <li><a href="photo.html">Photo</a></li>
      </ul>
    </li>
    <li><a href="films.html">Films</a></li>
  </ul>
</li>`}</Code>
            <Stack gap={5}>
              <Text size="small"><Text as="span" fontWeight="700">Same pattern, nested:</Text> Each sub-level is another li.has-dropdown with its own ul.dropdown inside.</Text>
              <Text size="small"><Text as="span" fontWeight="700">CSS stays identical:</Text> The same .dropdown rules apply at every nesting level because they target any .dropdown descendant of .has-dropdown.</Text>
              <Text size="small"><Text as="span" fontWeight="700">left: 100%</Text> on nested dropdowns opens them to the right instead of below. Use this for sub-submenus.</Text>
              <Text size="small"><Text as="span" fontWeight="700">z-index stacking:</Text> Each deeper level needs a higher z-index so it appears above its parent panel.</Text>
              <Callout tone="warning">Limit nesting to 2–3 levels. Deeper menus are hard to navigate on mobile and confuse users.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 13: Quick Check ---- */}
      <PresentationSlide id="s14-quickcheck" title="Quick Check">
        <Stack gap={12}>
          <H2>Quick Check — Discuss with Your Neighbor</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: Why does a CSS dropdown need position: relative on the parent li?</Callout>
            <Callout tone="info">Q2: What happens if you use :hover but forget :focus-within?</Callout>
            <Callout tone="info">Q3: Name one reason you should never start a new project with Spry.</Callout>
          </Stack>
          <Text tone="secondary">Discuss for 2 minutes. (1) Without it, the dropdown positions relative to the page, not the parent. (2) Keyboard and touch users cannot access the submenu. (3) Unmaintained since 2012 — security risk.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Dropdown Accessibility ─────────────────────────────── */}
      <PresentationSlide id="s14-dropdown-a11y" title="Dropdown Accessibility">
        <Stack gap={12}>
          <H2>Hover-Only Menus Exclude People</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">The problem</Text>
              <Text>:hover requires a mouse. Keyboard users and touch-screen users never trigger it.</Text>
              <Text>A submenu that only opens on hover is invisible to anyone tabbing through the page.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">The fix</Text>
              <Code language="css">{`.dropdown:hover .submenu,
.dropdown:focus-within .submenu {
  display: block;
}`}</Code>
              <Text>:focus-within keeps the submenu open while any child link has keyboard focus.</Text>
            </Stack>
          </Grid>
          <Stack gap={6}>
            <Row gap={8}><Pill>aria-haspopup</Pill><Text>Add aria-haspopup="true" to the parent link.</Text></Row>
            <Row gap={8}><Pill>Tab test</Pill><Text>Tab through the nav with no mouse. Every submenu link must be reachable.</Text></Row>
            <Row gap={8}><Pill>Touch</Pill><Text>On phones, prefer a click/checkbox toggle over hover entirely.</Text></Row>
          </Stack>
          <Callout tone="warning">Always pair :hover with :focus-within. One line of CSS makes the menu usable for keyboard users.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ───────────────────────────────── */}
      <PresentationSlide id="s14-checkpoints-2" title="Checkpoints: Interactive Navigation">
        <Stack gap={12}>
          <H2>Can You Do These Without Notes?</H2>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="primary">1</Tag><Text>Explain why Spry is legacy and name its modern replacement.</Text></Row>
            <Row gap={8}><Tag tone="primary">2</Tag><Text>Build a two-level dropdown using only position and :hover.</Text></Row>
            <Row gap={8}><Tag tone="primary">3</Tag><Text>Explain the relationship between position: relative on the parent and position: absolute on the submenu.</Text></Row>
            <Row gap={8}><Tag tone="primary">4</Tag><Text>Add :focus-within so the dropdown works with the keyboard.</Text></Row>
            <Row gap={8}><Tag tone="primary">5</Tag><Text>Build a checkbox-hack toggle menu with no JavaScript.</Text></Row>
            <Row gap={8}><Tag tone="primary">6</Tag><Text>Use &lt;details&gt;/&lt;summary&gt; to create an accordion.</Text></Row>
          </Stack>
          <Callout tone="info">Any checkpoint you cannot do from memory is your homework tonight. Build it twice.</Callout>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 14: Migrating from Spry ---- */}
      <PresentationSlide id="s14-migration" title="Migrating from Spry">
        <Stack gap={12}>
          <H2>Removing Spry from an Inherited Site</H2>
          <Grid columns={1} gap={10}>
            <SpryRemoval t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 15: Common Mistakes ---- */}
      <PresentationSlide id="s14-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>7 Common Mistakes (and Fixes)</H2>
          <Stack gap={6}>
            <Text tone="danger">1. Using Spry in a new project — it is dead; use CSS-only solutions</Text>
            <Text tone="danger">2. Forgetting position: relative on parent li — dropdown flies to page corner</Text>
            <Text tone="danger">3. Using :hover without :focus-within — locks out keyboard/touch users</Text>
            <Text tone="danger">4. Forgetting z-index on dropdown — hides behind other content</Text>
            <Text tone="danger">5. Using div instead of details for accordions — loses semantics and accessibility</Text>
            <Text tone="danger">6. Putting summary anywhere except first child of details — browser renders blank toggle</Text>
            <Text tone="danger">7. Patching old Spry code instead of replacing it — waste of time; rebuild native</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s14-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This dropdown does not work. Why?</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy CSS</Text>
              <Code language="css">{`nav ul li {
  display: inline-block;
}

nav ul li ul {
  display: none;
  position: absolute;
}

nav ul li:hover > ul {
  display: block;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. No position: relative on nav ul li — the absolute dropdown positions itself relative to the viewport, not the parent.</Text>
              <Text tone="danger">2. No z-index on the dropdown — it hides behind page content.</Text>
              <Text tone="danger">3. No :focus-within — keyboard users cannot open the dropdown.</Text>
              <Text tone="danger">4. No min-width on dropdown — it collapses to the width of the text.</Text>
              <Callout tone="info">Fix: add position: relative to li, z-index: 10 to dropdown, :focus-within alongside :hover, and min-width: 200px.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 15b: Do vs Don't ---- */}
      <PresentationSlide id="s14-do-dont" title="Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use &lt;details&gt; + &lt;summary&gt; for accordions</Text>
              <Text>Include :focus-within with :hover on dropdowns</Text>
              <Text>Set position: relative on the parent li</Text>
              <Text>Add z-index to keep dropdowns above content</Text>
              <Text>Replace Spry widgets when you inherit a legacy site</Text>
              <Text>Test keyboard navigation (Tab through every menu)</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Start new projects with Spry framework</Text>
              <Text>Use :hover alone without :focus-within</Text>
              <Text>Put summary anywhere except first child of details</Text>
              <Text>Patch old Spry JS instead of replacing it</Text>
              <Text>Nest dropdowns deeper than 3 levels</Text>
              <Text>Forget to delete the SpryAssets folder after migration</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: details/summary Accordion ───────────────── */}
      <PresentationSlide id="s14-try-details" title="Try It Now: Native Accordion" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — an accordion with no CSS tricks at all</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">HTML only</Text>
              <Code language="html">{`<details>
  <summary>When do we meet?</summary>
  <p>Every Tuesday at 6pm in Room B203.</p>
</details>

<details open>
  <summary>How do I join?</summary>
  <p>Fill in the form on the Contact page.</p>
</details>`}</Code>
              <Text fontWeight="700">Optional styling</Text>
              <Code language="css">{`details {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 8px;
}
summary { cursor: pointer; font-weight: 700; }`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Click a summary — the panel opens and closes.</Text>
              <Text>2. The second one starts open because of the open attribute.</Text>
              <Text>3. Tab to a summary and press Enter — it works with the keyboard for free.</Text>
              <Text>4. Zero JavaScript, zero CSS required for the behaviour.</Text>
              <Callout tone="success">This is what Spry accordions needed 200 lines of JavaScript to do. Two HTML tags replaced all of it.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 16: Practice ---- */}
      <PresentationSlide id="s14-practice" title="Practice Exercises" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>Hands-On Practice</H2>
          <Callout tone="info">Estimated time: 50 minutes</Callout>
          <Stack gap={6}>
            <H3>exercises/session-14/</H3>
            <Text>Task 1 — Understand what the Spry Framework is and its role in web history</Text>
            <Text>Task 2 — Explore the Spry MenuBar structure (nested ul with dropdown submenus)</Text>
            <Text>Task 3 — Create spry-menu.html with a multi-level navigation menu</Text>
            <Text>Task 4 — Write CSS for the Spry-style menu (dropdowns, hover, sub-submenus)</Text>
            <Text>Task 5 — Compare Spry with modern CSS approaches (arrow indicators via ::after)</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s14-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>You can explain in your own words why Spry is no longer used and what replaced it.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>You can identify the nested ul/li structure that creates dropdown submenus.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Your spry-menu.html shows a dropdown menu that opens on hover and stays open on focus.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>The dropdown has z-index so it appears above page content, not behind it.</Text></Row>
            <Row gap={8}><Pill>Task 5</Pill><Text>You can describe one advantage of CSS-only menus over JavaScript-based Spry widgets.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If the dropdown appears behind other elements, add position: relative to the parent li and z-index: 10 to the dropdown ul.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s14-assignment" title="Assignment: CSS Dropdown Menu">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>A CSS-only dropdown navigation menu added to your Student Club site.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>At least one dropdown submenu with 3+ items.</Text>
              <Text>Opens on :hover AND :focus-within (keyboard accessible).</Text>
              <Text>position: relative on parent li, z-index on dropdown.</Text>
              <Text>Arrow indicator via ::after pseudo-element.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Tab through the menu with keyboard — can you reach every link?</Text>
              <Text>Check that the dropdown does not hide behind page content.</Text>
              <Text>Remove any leftover SpryAssets folder if you migrated.</Text>
              <Callout tone="warning">A dropdown that only works on hover fails accessibility. Always add :focus-within.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 17: Homework ---- */}
      <PresentationSlide id="s14-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework</H2>
          <Stack gap={6}>
            <H3>homework/session-14/</H3>
            <Text>Choose one option:</Text>
            <Text><Text as="span" fontWeight="700">Option A:</Text> Add a CSS dropdown navigation menu with at least two submenus</Text>
            <Text><Text as="span" fontWeight="700">Option B:</Text> Describe what a Spry-style menu bar would include (write spry-menu.md)</Text>
            <Text tone="secondary">Bonus: Add a "Back to Top" button to your pages</Text>
            <Callout tone="warning">Due Sunday 23:59</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 18: Recap & Next ---- */}
      <PresentationSlide id="s14-recap" title="Recap & Next Session">
        <Stack gap={12} align="center">
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>Spry was useful in its era but is now dead — do not use it in new work.</Text>
            <Text>Modern CSS replaces every Spry widget: dropdowns via :hover/:focus-within, accordions via details/summary.</Text>
            <Text>Always include :focus-within alongside :hover for keyboard accessibility.</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Next: Session 15 — Mobile responsive design, full course review, and final exam prep.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
