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
   INS2053 — TEACHING DIAGRAM KIT (Session 13: forms)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. What the browser sends, and why "name" decides it ---------- */

function FormDataFlow({ t }: { t: CanvasTokens }) {
  const field = (y: number, label: string, value: string, attr: string, ok: boolean, key: string) => (
    <g key={key}>
      <text x="18" y={y} fontSize="11" fill={t.text.secondary}>{label}</text>
      <rect x="18" y={y + 5} width="132" height="20" rx="4" fill={t.bg.elevated}
        stroke={ok ? t.stroke.secondary : t.chart.brightOrange} strokeWidth={ok ? "1" : "1.8"} />
      <text x="25" y={y + 19} fontSize="11" fontFamily={MONO} fill={t.text.primary}>{value}</text>
      <text x="156" y={y + 19} fontSize="11" fontFamily={MONO} fill={ok ? t.chart.blue : t.chart.brightOrange}>{attr}</text>
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
      <text x="266" y="42" fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>POST /contact HTTP/1.1</text>
      <line x1="266" y1="52" x2="540" y2="52" stroke={t.stroke.secondary} />
      <text x="266" y="72" fontSize="12" fontFamily={MONO} fill={t.chart.blue}>email=mai%40vnu.edu.vn</text>
      <text x="266" y="92" fontSize="12" fontFamily={MONO} fill={t.chart.blue}>&amp;topic=Film+night</text>
      <text x="266" y="118" fontSize="12" fontFamily={MONO} fill={t.chart.brightOrange}>(nothing about the phone number)</text>
      <text x="266" y="146" fontSize="11.5" fill={t.text.secondary}>The value the visitor typed is gone.</text>
      <text x="266" y="161" fontSize="11.5" fill={t.text.secondary}>Not empty — gone. A field with no name</text>
      <text x="266" y="176" fontSize="11.5" fill={t.text.secondary}>is invisible to the browser.</text>
      <text x="404" y="72" fontSize="11" fill={t.text.tertiary}>@ becomes %40</text>
      <text x="404" y="92" fontSize="11" fill={t.text.tertiary}>space becomes +</text>

      {/* action and method */}
      <rect x="6" y="204" width="548" height="90" rx="7" fill={t.chart.blue} opacity="0.1" />
      <rect x="18" y="216" width="352" height="24" rx="5" fill={t.chart.blue} />
      <text x="28" y="232.5" fontSize="12" fontFamily={MONO} fill={ON_FILL}>&lt;form action="#" method="post"&gt;</text>
      <text x="18" y="258" fontSize="12.5" fill={t.text.primary}><tspan fontWeight="700">action</tspan> = where the data goes.</text>
      <text x="18" y="275" fontSize="12" fill={t.text.secondary}>action="#" means nowhere: the page</text>
      <text x="18" y="290" fontSize="12" fill={t.text.secondary}>reloads. Right for this course.</text>
      <text x="212" y="258" fontSize="12.5" fill={t.text.primary}><tspan fontWeight="700">method</tspan> = how it travels.</text>
      <text x="212" y="275" fontSize="12" fill={t.text.secondary}>get shows every value in the URL bar.</text>
      <text x="212" y="290" fontSize="12" fill={t.text.secondary}>post keeps them out of sight.</text>
      <text x="440" y="258" fontSize="12.5" fontWeight="700" fill={t.chart.green}>Use post.</text>
      <text x="440" y="275" fontSize="12" fill={t.text.secondary}>A phone number in</text>
      <text x="440" y="290" fontSize="12" fill={t.text.secondary}>a URL is a leak.</text>
    </svg>
  );
}

/* ---------- 2. What each input type actually changes ---------- */

function InputTypeGallery({ t }: { t: CanvasTokens }) {
  const cells = [
    ['type="text"', "Mai Anh", "The default. Accepts anything."],
    ['type="email"', "mai@vnu.edu.vn", "Phone keyboard grows an @ key."],
    ['type="password"', "", "Characters hidden as you type."],
    ['type="tel"', "0912 345 678", "Phone shows a number pad."],
    ['type="number"', "3", "Spinner arrows; min and max work."],
    ['type="date"', "2026-09-14", "A real calendar picker opens."],
  ] as const;

  return (
    <svg viewBox="0 0 560 302" width="100%" height="302" role="img"
      aria-label="Six input types drawn as the browser renders them, each with the one thing it changes, then radio buttons sharing one name so only one can be chosen, next to checkboxes with separate names that can all be ticked.">
      <text x="280" y="14" textAnchor="middle" fontSize="12" fill={t.text.secondary}>
        type= changes the <tspan fontWeight="700">keyboard and the widget</tspan>, not your HTML.
      </text>

      {cells.map(([type, value, note], i) => {
        const x = 6 + (i % 3) * 187;
        const y = 24 + Math.floor(i / 3) * 92;
        const isPwd = type.indexOf("password") > -1;
        const isNum = type.indexOf("number") > -1;
        const isDate = type.indexOf("date") > -1;
        return (
          <g key={"ic" + i}>
            <rect x={x} y={y} width="174" height="84" rx="7" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
            <rect x={x + 10} y={y + 8} width="130" height="18" rx="4" fill={t.chart.blue} />
            <text x={x + 16} y={y + 21} fontSize="11" fontFamily={MONO} fill={ON_FILL}>{type}</text>
            <rect x={x + 10} y={y + 32} width="154" height="22" rx="4" fill={t.bg.elevated} stroke={t.stroke.secondary} />
            <text x={x + 18} y={y + 47} fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>{value}</text>
            {isPwd ? [0, 1, 2, 3, 4, 5].map((d) => (
              <circle key={"d" + d} cx={x + 22 + d * 9} cy={y + 43} r="3" fill={t.text.primary} />
            )) : null}
            {isNum ? (
              <g>
                <path d={"M" + (x + 152) + " " + (y + 42) + " l5 -6 l5 6 z"} fill={t.text.tertiary} />
                <path d={"M" + (x + 152) + " " + (y + 46) + " l5 6 l5 -6 z"} fill={t.text.tertiary} />
              </g>
            ) : null}
            {isDate ? (
              <g>
                <rect x={x + 144} y={y + 37} width="14" height="12" rx="2" fill="none" stroke={t.text.tertiary} />
                <line x1={x + 144} y1={y + 41} x2={x + 158} y2={y + 41} stroke={t.text.tertiary} />
              </g>
            ) : null}
            <text x={x + 10} y={y + 72} fontSize="11.5" fill={t.text.secondary}>{note}</text>
          </g>
        );
      })}

      {/* radio vs checkbox */}
      <rect x="6" y="212" width="270" height="86" rx="7" fill={t.chart.goldenYellow} opacity="0.14" />
      <text x="18" y="230" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Radio — one shared name, pick ONE</text>
      <circle cx="26" cy="248" r="6.5" fill="none" stroke={t.text.secondary} strokeWidth="1.5" />
      <circle cx="26" cy="248" r="3.5" fill={t.chart.goldenYellow} />
      <text x="38" y="252" fontSize="11.5" fill={t.text.primary}>Small</text>
      <circle cx="96" cy="248" r="6.5" fill="none" stroke={t.text.secondary} strokeWidth="1.5" />
      <text x="108" y="252" fontSize="11.5" fill={t.text.primary}>Medium</text>
      <text x="180" y="252" fontSize="11" fontFamily={MONO} fill={t.chart.blue}>name="size"</text>
      <text x="18" y="272" fontSize="11.5" fill={t.text.secondary}>The shared name is what makes them one</text>
      <text x="18" y="287" fontSize="11.5" fill={t.text.secondary}>question. Different names and both stay on.</text>

      <rect x="284" y="212" width="270" height="86" rx="7" fill={t.chart.green} opacity="0.16" />
      <text x="296" y="230" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Checkbox — shared name, pick ANY</text>
      <rect x="298" y="242" width="13" height="13" rx="2.5" fill={t.chart.green} />
      <text x="301" y="252.5" fontSize="11" fontWeight="700" fill={ON_FILL}>✓</text>
      <text x="318" y="252" fontSize="11.5" fill={t.text.primary}>Film</text>
      <rect x="364" y="242" width="13" height="13" rx="2.5" fill={t.chart.green} />
      <text x="367" y="252.5" fontSize="11" fontWeight="700" fill={ON_FILL}>✓</text>
      <text x="384" y="252" fontSize="11.5" fill={t.text.primary}>Coding</text>
      <text x="446" y="252" fontSize="11" fontFamily={MONO} fill={t.chart.blue}>name="interests"</text>
      <text x="296" y="272" fontSize="11.5" fill={t.text.secondary}>Checkboxes in a group share one name.</text>
      <text x="296" y="287" fontSize="11.5" fill={t.text.secondary}>Only ticked ones appear in the submit.</text>
    </svg>
  );
}

/* ---------- 3. label for / input id, and the placeholder trap ---------- */

function LabelWiring({ t }: { t: CanvasTokens }) {
  const payoff = [
    ["Click the words", "the box focuses — a much", "bigger tap target on phones"],
    ["A screen reader speaks", 'it says "Email address"', 'first, not just "edit text"'],
    ["Break it, nothing shows", "the page still looks fine.", "Only the validator notices."],
  ] as const;

  return (
    <svg viewBox="0 0 560 320" width="100%" height="320" role="img"
      aria-label="The for attribute on a label and the id on an input must be the identical string, while the name attribute does a different job, plus fieldset and legend grouping and why a placeholder cannot replace a label.">
      <text x="280" y="14" textAnchor="middle" fontSize="12" fontWeight="700" fill={t.text.primary}>Three attributes, three different jobs — and they get mixed up constantly.</text>

      {/* the wiring */}
      <rect x="6" y="20" width="548" height="110" rx="8" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="20" y="46" fontSize="12" fontFamily={MONO} fill={t.text.primary}>&lt;label </text>
      <rect x="67" y="32" width="84" height="19" rx="4" fill={t.chart.goldenYellow} />
      <text x="73" y="46" fontSize="12" fontFamily={MONO} fill={ON_FILL}>for="email"</text>
      <text x="157" y="46" fontSize="12" fontFamily={MONO} fill={t.text.primary}>&gt;Email address&lt;/label&gt;</text>

      <text x="20" y="76" fontSize="12" fontFamily={MONO} fill={t.text.primary}>&lt;input </text>
      <rect x="67" y="62" width="78" height="19" rx="4" fill={t.chart.goldenYellow} />
      <text x="73" y="76" fontSize="12" fontFamily={MONO} fill={ON_FILL}>id="email"</text>
      <text x="151" y="76" fontSize="12" fontFamily={MONO} fill={t.text.primary}>type="email" </text>
      <rect x="243" y="62" width="90" height="19" rx="4" fill={t.chart.blue} />
      <text x="249" y="76" fontSize="12" fontFamily={MONO} fill={ON_FILL}>name="email"</text>
      <text x="337" y="76" fontSize="12" fontFamily={MONO} fill={t.text.primary}>&gt;</text>
      <path d="M62 41 q-16 0 -16 15 q0 15 16 15" fill="none" stroke={t.chart.goldenYellow} strokeWidth="2" />

      <text x="20" y="102" fontSize="12" fill={t.text.primary}>
        <tspan fontWeight="700" fill={t.chart.goldenYellow}>for</tspan> and <tspan fontWeight="700" fill={t.chart.goldenYellow}>id</tspan>: the identical string. Nothing else joins the words to the box.
      </text>
      <text x="20" y="120" fontSize="12" fill={t.text.primary}>
        <tspan fontWeight="700" fill={t.chart.blue}>name</tspan>: the key the server reads. You need all three, every single time.
      </text>

      {/* fieldset */}
      <rect x="6" y="140" width="270" height="110" rx="7" fill={t.chart.blue} opacity="0.1" />
      <text x="18" y="158" fontSize="12.5" fontWeight="700" fill={t.text.primary}>fieldset + legend groups questions</text>
      <rect x="20" y="172" width="242" height="52" rx="5" fill="none" stroke={t.chart.blue} strokeWidth="1.8" />
      <rect x="34" y="165" width="106" height="14" fill={t.bg.elevated} />
      <text x="38" y="176" fontSize="11.5" fontWeight="700" fill={t.chart.blue}>Personal details</text>
      <text x="32" y="196" fontSize="11" fill={t.text.secondary}>Email</text>
      <rect x="76" y="186" width="176" height="14" rx="3" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="32" y="216" fontSize="11" fill={t.text.secondary}>Phone</text>
      <rect x="76" y="206" width="176" height="14" rx="3" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="18" y="242" fontSize="11.5" fill={t.text.secondary}>The reader hears the group name first.</text>

      {/* placeholder trap */}
      <rect x="284" y="140" width="270" height="110" rx="7" fill={t.chart.brightOrange} opacity="0.12" />
      <text x="296" y="158" fontSize="12.5" fontWeight="700" fill={t.text.primary}>A placeholder is not a label</text>
      <rect x="296" y="166" width="164" height="22" rx="4" fill={t.bg.elevated} stroke={t.stroke.secondary} />
      <text x="304" y="181" fontSize="11.5" fill={t.text.tertiary}>Email address</text>
      <text x="468" y="181" fontSize="11" fill={t.text.secondary}>before typing</text>
      <rect x="296" y="196" width="164" height="22" rx="4" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="304" y="211" fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>mai@vnu.edu.vn</text>
      <text x="468" y="207" fontSize="11" fontWeight="700" fill={t.chart.brightOrange}>hint gone</text>
      <text x="468" y="219" fontSize="11" fill={t.text.secondary}>for good</text>
      <text x="296" y="234" fontSize="11.5" fill={t.text.secondary}>Ten fields down, the visitor no</text>
      <text x="296" y="246" fontSize="11.5" fill={t.text.secondary}>longer knows what this box asks.</text>

      {/* what a correct label buys you */}
      {payoff.map(([title, l1, l2], i) => (
        <g key={"py" + i}>
          <rect x={6 + i * 185} y="256" width="178" height="58" rx="6" fill={t.chart.green} opacity="0.16" />
          <text x={16 + i * 185} y="274" fontSize="11.5" fontWeight="700" fill={t.text.primary}>{title}</text>
          <text x={16 + i * 185} y="289" fontSize="11" fill={t.text.secondary}>{l1}</text>
          <text x={16 + i * 185} y="303" fontSize="11" fill={t.text.secondary}>{l2}</text>
        </g>
      ))}
    </svg>
  );
}


export default function Session13Forms() {
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
        id="s13-title"
        title="Session 13 — Creating Forms"
        notes="Welcome to Session 13. Today we make websites interactive by building forms."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 13</Tag>
          <H1>Creating Forms</H1>
          <Text tone="secondary">Make your Student Club Website interactive — collect data from visitors with HTML forms.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 2: Objectives ---- */}
      <PresentationSlide id="s13-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>Objectives</H2>
          <Stack gap={6}>
            <Text>Use 8+ input types: text, email, password, tel, radio, checkbox, number, date</Text>
            <Text>Create dropdowns with select/option and multi-line textarea</Text>
            <Text>Associate every control with a label using for/id</Text>
            <Text>Group fields with fieldset and legend</Text>
            <Text>Apply required and placeholder for client-side validation</Text>
            <Text>Style forms with CSS to match the site theme</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 3: Agenda / Timeline ---- */}
      <PresentationSlide id="s13-agenda" title="Session Timeline">
        <Stack gap={12}>
          <H2>150-Minute Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <Row gap={8}><Pill>0:00 – 0:10</Pill><Text>Welcome + objectives</Text></Row>
              <Row gap={8}><Pill>0:10 – 0:15</Pill><Text>Recap warm-up</Text></Row>
              <Row gap={8}><Pill>0:15 – 0:45</Pill><Text>Lecture: forms, inputs, labels</Text></Row>
              <Row gap={8}><Pill>0:45 – 1:00</Pill><Text>Validation + styling</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Pill>1:00 – 1:10</Pill><Text>Quick check + break</Text></Row>
              <Row gap={8}><Pill>1:10 – 2:05</Pill><Text>In-class practice (55 min)</Text></Row>
              <Row gap={8}><Pill>2:05 – 2:20</Pill><Text>Homework brief + Q&amp;A</Text></Row>
              <Row gap={8}><Pill>2:20 – 2:30</Pill><Text>Recap + next session</Text></Row>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 4: Recap Warm-Up ---- */}
      <PresentationSlide id="s13-warmup" title="Warm-Up Questions">
        <Stack gap={12}>
          <H2>Quick Recap — Sessions 11–12</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What CSS property prevents padding from expanding an element beyond its container?</Callout>
            <Callout tone="info">Q2: Name one way to validate HTML code before submitting it.</Callout>
            <Callout tone="info">Q3: Which browser tool lets you inspect an element's computed styles?</Callout>
            <Text tone="secondary">Answers: (1) box-sizing: border-box; (2) W3C Markup Validator; (3) Chrome DevTools Inspect panel.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 5: What is a form? ---- */}
      <PresentationSlide id="s13-what-is-form" title="What Is a Form?" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>What Is a Form?</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <FormDataFlow t={t} />
            <Stack gap={6}>
              <Text>A form collects user data and sends it to a server.</Text>
              <Text>The form element wraps all inputs, labels, and buttons.</Text>
              <Text>action = where data goes; method = how (GET vs POST).</Text>
              <Callout tone="warning">Always use method=&quot;post&quot; for personal data. Use action=&quot;#&quot; while learning.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Quick Check 1: Form Basics ---- */}
      <PresentationSlide id="s13-quickcheck-1" title="Quick Check: Form Basics">
        <Stack gap={12}>
          <H2>Check Your Understanding</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: What are the two required attributes on every form element?</Callout>
            <Callout tone="info">Q2: If an input has no name attribute, what happens when the user submits the form?</Callout>
            <Callout tone="info">Q3: What is the difference between action and method?</Callout>
          </Stack>
          <Text tone="secondary">Answers: (1) action and method. (2) The browser sends nothing from that field — the data is lost. (3) action = where the data goes (a URL); method = how it gets there (GET appends to URL, POST sends in the request body).</Text>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 6: GET vs POST ---- */}
      <PresentationSlide id="s13-get-vs-post" title="GET vs POST">
        <Stack gap={12}>
          <H2>GET vs POST — When to Use Each</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>method=&quot;get&quot;</H3>
              <Text>Data appended to URL as query string</Text>
              <Text>Visible in address bar and browser history</Text>
              <Text>Bookmarkable (search results, filters)</Text>
              <Text>Size limit ~2048 characters</Text>
              <Callout tone="danger">Never use for passwords or personal data</Callout>
            </Stack>
            <Stack gap={6}>
              <H3>method=&quot;post&quot;</H3>
              <Text>Data sent in HTTP request body (not visible in URL)</Text>
              <Text>No practical size limit</Text>
              <Text>Used for registration, login, file uploads</Text>
              <Text>Still needs HTTPS for real security</Text>
              <Callout tone="info">Our default for this course: always post</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Try It Now: Minimal Form ---- */}
      <PresentationSlide id="s13-try-form-basics" title="Try It Now: Build a Minimal Form" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — prove the form works</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into a new file called try-form.html</Text>
              <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head><title>Try</title></head>
<body>
  <h1>Sign Up</h1>
  <form action="#" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name"
      name="name" required>
    <button type="submit">Send</button>
  </form>
</body>
</html>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then verify three things</Text>
              <Text>1. Click the word "Name:" — cursor must jump into the box.</Text>
              <Text>2. Submit empty — browser must block you.</Text>
              <Text>3. Type something and submit — page reloads (action="#").</Text>
              <Callout tone="info">If step 1 fails, your for/id pair is wrong. If step 2 fails, missing required.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 7: Input types gallery ---- */}
      <PresentationSlide id="s13-input-types" title="Input Types">
        <Stack gap={12}>
          <H2>Core Input Types</H2>
          <Row gap={8}>
            <Pill>text</Pill><Pill>email</Pill><Pill>password</Pill><Pill>tel</Pill>
            <Pill>radio</Pill><Pill>checkbox</Pill><Pill>number</Pill><Pill>date</Pill>
          </Row>
          <Divider />
          <Grid columns={1} gap={10}>
            <InputTypeGallery t={t} />
          </Grid>
          <Text>Radio buttons share one name so the browser lets the visitor pick exactly one. Checkboxes in a group also share one name, so any number can be ticked.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 8: Input-Type Reference Table ---- */}
      <PresentationSlide id="s13-input-table" title="Input Type Reference">
        <Stack gap={10}>
          <H2>Input Type Quick Reference</H2>
          <Grid columns={1} gap={4}>
            <Stack gap={3}>
              <Row gap={8}><Pill>text</Pill><Text>Names, addresses — standard keyboard</Text></Row>
              <Row gap={8}><Pill>email</Pill><Text>Email addresses — built-in format check, @ key on mobile</Text></Row>
              <Row gap={8}><Pill>password</Pill><Text>Login passwords — characters masked</Text></Row>
              <Row gap={8}><Pill>tel</Pill><Text>Phone numbers — numeric keypad on mobile</Text></Row>
              <Row gap={8}><Pill>number</Pill><Text>Age, quantity — spinner arrows, min/max/step</Text></Row>
              <Row gap={8}><Pill>date</Pill><Text>Birthdays, events — calendar picker popup</Text></Row>
              <Row gap={8}><Pill>radio</Pill><Text>Single choice from a group — same name required</Text></Row>
              <Row gap={8}><Pill>checkbox</Pill><Text>Multiple choices — shared name, each has unique value</Text></Row>
            </Stack>
          </Grid>
          <Divider />
          <Text tone="secondary">Plus: select/option for dropdowns, textarea for multi-line text, file for uploads, submit/reset for buttons.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 9: Select & Textarea ---- */}
      <PresentationSlide id="s13-select-textarea" title="Select Dropdowns & Textarea">
        <Stack gap={12}>
          <H2>Select Dropdowns &amp; Textarea</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<label for="faculty">Faculty:</label>
<select id="faculty" name="faculty" required>
  <option value="">-- Select --</option>
  <option value="it">IT</option>
  <option value="ba">Business</option>
  <option value="other">Other</option>
</select>`}</Code>
            <Code language="html">{`<label for="bio">Short bio:</label>
<textarea id="bio" name="bio"
  rows="4" maxlength="200"
  placeholder="Tell us...">
</textarea>`}</Code>
          </Grid>
          <Stack gap={4}>
            <Text>The first option with empty value=&quot;&quot; forces a deliberate choice when required is set.</Text>
            <Text tone="danger">Textarea content goes BETWEEN tags, never in a value attribute. Never self-close it.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 10: Labels & Fieldsets ---- */}
      <PresentationSlide id="s13-labels" title="Labels, Fieldsets & Legends">
        <Stack gap={12}>
          <H2>Labels, Fieldsets &amp; Legends</H2>
          <Code language="html">{`<label for="email">Email:</label>
<input type="email" id="email" name="email">

<fieldset>
  <legend>Personal Info</legend>
  <!-- grouped fields here -->
</fieldset>`}</Code>
          <Grid columns={1} gap={10}>
            <LabelWiring t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 11: Validation ---- */}
      <PresentationSlide id="s13-validation" title="Client-Side Validation" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>Client-Side Validation</H2>
          <Stack gap={6}>
            <Text>required — blocks submission if empty</Text>
            <Text>type=&quot;email&quot; — built-in format check</Text>
            <Text>minlength / maxlength — character count limits</Text>
            <Text>min / max — numeric range constraints</Text>
            <Text>pattern=&quot;regex&quot; — custom format matching</Text>
            <Callout tone="info">Client-side validation improves UX but can be bypassed. Always validate again on the server.</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 12: Styling Forms ---- */}
      {/* ---- Input Attributes Deep Dive ---- */}
      <PresentationSlide id="s13-input-attributes" title="Input Attributes Deep Dive">
        <Stack gap={10}>
          <H2>Attributes That Control Behavior</H2>
          <Grid columns={1} gap={4}>
            <Stack gap={3}>
              <Row gap={8}><Pill>placeholder</Pill><Text>Hint text inside the field — disappears on focus. Never a substitute for a label.</Text></Row>
              <Row gap={8}><Pill>autofocus</Pill><Text>Cursor starts here on page load. Use on the first field only.</Text></Row>
              <Row gap={8}><Pill>autocomplete</Pill><Text>Browser suggests past entries. Set to "off" for sensitive fields like passwords.</Text></Row>
              <Row gap={8}><Pill>disabled</Pill><Text>Grayed out, not submitted, not focusable. Use for fields locked by logic.</Text></Row>
              <Row gap={8}><Pill>readonly</Pill><Text>Visible and submitted, but the user cannot change it.</Text></Row>
              <Row gap={8}><Pill>value</Pill><Text>Pre-fills the field. For radio/checkbox, this is what gets submitted.</Text></Row>
            </Stack>
          </Grid>
          <Divider />
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<input type="text" name="city"
  placeholder="Hanoi"
  autofocus>`}</Code>
            <Code language="html">{`<input type="text" name="id"
  value="STU-2026"
  readonly>`}</Code>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s13-form-styling" title="Styling Forms with CSS">
        <Stack gap={10}>
          <H2>CSS Form Styling Essentials</H2>
          <Code language="css">{`.form-group input, .form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #2874a6;
  box-shadow: 0 0 8px rgba(40,116,166,0.3);
}`}</Code>
          <Stack gap={4}>
            <Text>width: 100% makes inputs fill their container for clean alignment.</Text>
            <Text>The :focus pseudo-class adds visual feedback when the user clicks or tabs into a field.</Text>
            <Text>transition creates a smooth color change instead of an abrupt flash.</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- CSS Pseudo-Classes for Forms ---- */}
      <PresentationSlide id="s13-css-pseudo" title="CSS Pseudo-Classes for Forms">
        <Stack gap={10}>
          <H2>Style Every State, Not Just the Default</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <Code language="css">{`input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px
    rgba(37,99,235,.25);
}

input:invalid:not(:placeholder-shown) {
  border-color: #dc2626;
}

input:valid:not(:placeholder-shown) {
  border-color: #16a34a;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text><Text as="span" fontWeight="700">:focus</Text> — field is active (clicked or tabbed). Always style this for keyboard users.</Text>
              <Text><Text as="span" fontWeight="700">:valid / :invalid</Text> — after the browser checks format (email, pattern, required).</Text>
              <Text><Text as="span" fontWeight="700">:placeholder-shown</Text> — user has not typed yet. Combine with :invalid to avoid red on empty fields.</Text>
              <Text><Text as="span" fontWeight="700">:required / :optional</Text> — target fields by whether they must be filled.</Text>
              <Callout tone="warning">Never use :invalid alone — empty required fields turn red before the user types anything.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 13: Do vs Don't ---- */}
      <PresentationSlide id="s13-do-dont" title="Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don't</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>Do</H3>
              <Text tone="secondary">Use type=&quot;email&quot; for email fields</Text>
              <Text tone="secondary">Pair every label with for/id</Text>
              <Text tone="secondary">Share one name on radio/checkbox groups</Text>
              <Text tone="secondary">Use fieldset + legend for long forms</Text>
              <Text tone="secondary">Add required on mandatory fields</Text>
              <Text tone="secondary">Style :focus states for keyboard users</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Don't</H3>
              <Text tone="danger">Use type=&quot;text&quot; for emails or phones</Text>
              <Text tone="danger">Rely on placeholder as the only label</Text>
              <Text tone="danger">Give radio buttons different names</Text>
              <Text tone="danger">Self-close textarea (&lt;textarea /&gt;)</Text>
              <Text tone="danger">Forget the name attribute on any input</Text>
              <Text tone="danger">Remove the default outline without replacing it</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 14: Form Anatomy Summary ---- */}
      <PresentationSlide id="s13-anatomy-summary" title="Form Elements Summary">
        <Stack gap={8}>
          <H2>All Form Elements at a Glance</H2>
          <Grid columns={1} gap={3}>
            <Stack gap={2}>
              <Row gap={6}><Pill>&lt;form&gt;</Pill><Text>Container — action (where), method (how)</Text></Row>
              <Row gap={6}><Pill>&lt;input&gt;</Pill><Text>Single-line field — type changes behavior</Text></Row>
              <Row gap={6}><Pill>&lt;select&gt;</Pill><Text>Dropdown menu — paired with &lt;option&gt;</Text></Row>
              <Row gap={6}><Pill>&lt;textarea&gt;</Pill><Text>Multi-line text — content between tags</Text></Row>
              <Row gap={6}><Pill>&lt;label&gt;</Pill><Text>Accessible description — for matches id</Text></Row>
              <Row gap={6}><Pill>&lt;fieldset&gt;</Pill><Text>Visual group — contains related fields</Text></Row>
              <Row gap={6}><Pill>&lt;legend&gt;</Pill><Text>Group caption — first child of fieldset</Text></Row>
              <Row gap={6}><Pill>&lt;button&gt;</Pill><Text>Submit or reset — type=&quot;submit&quot; is default</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Every control that sends data needs: a name, a label (for/id), and the correct type.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 15: Worked Example 1 — register.html ---- */}
      <PresentationSlide id="s13-worked-example" title="Worked Example: register.html" background={{ pattern: "grid", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Complete Registration Form</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<form action="#" method="post">
  <fieldset>
    <legend>Account Details</legend>

    <label for="fullname">Full Name:</label>
    <input type="text" id="fullname"
      name="fullname" required>

    <label for="email">Email:</label>
    <input type="email" id="email"
      name="email" required>

    <label for="pass">Password:</label>
    <input type="password" id="pass"
      name="password" minlength="8">
  </fieldset>

  <fieldset>
    <legend>Membership Level</legend>
    <label><input type="radio"
      name="membership" value="basic" checked>
      Basic (free)</label>
    <label><input type="radio"
      name="membership" value="premium">
      Premium (50k/month)</label>
  </fieldset>

  <fieldset>
    <legend>Interests</legend>
    <label><input type="checkbox"
      name="interests" value="coding">
      Coding workshops</label>
    <label><input type="checkbox"
      name="interests" value="film">
      Film nights</label>
    <label><input type="checkbox"
      name="interests" value="career">
      Career talks</label>
  </fieldset>

  <label for="referral">How did you hear
    about us?</label>
  <select id="referral" name="referral">
    <option value="">-- choose --</option>
    <option value="friend">A friend</option>
    <option value="facebook">Facebook</option>
    <option value="poster">Campus poster</option>
  </select>

  <label for="bio">Short bio:</label>
  <textarea id="bio" name="bio" rows="3"
    maxlength="200"></textarea>

  <button type="submit">Register</button>
</form>`}</Code>
            <Stack gap={5}>
              <Text size="small"><Text as="span" fontWeight="700">fieldset + legend</Text> groups related fields so screen readers announce the group name first.</Text>
              <Text size="small"><Text as="span" fontWeight="700">for/id pairing</Text>: every label's for matches its input's id exactly. This makes the whole word clickable.</Text>
              <Text size="small"><Text as="span" fontWeight="700">name attribute</Text>: this is the key the server reads. No name = no data sent.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Radio buttons</Text> share one name=&quot;membership&quot; so only one can be selected. The checked attribute picks the default.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Checkboxes</Text> also share name=&quot;interests&quot;. All ticked values arrive as a list on the server.</Text>
              <Text size="small"><Text as="span" fontWeight="700">select/option</Text> creates a dropdown. The empty first option forces a deliberate choice.</Text>
              <Text size="small"><Text as="span" fontWeight="700">textarea</Text> uses rows and maxlength. Never self-close it.</Text>
              <Callout tone="info">This entire form works with action=&quot;#&quot; for practice. The browser collects and sends all named fields on submit.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Your Turn: Event RSVP Form ---- */}
      <PresentationSlide id="s13-worked-variant" title="Your Turn: Event RSVP Form" background={{ pattern: "grid", accent: t.chart.goldenYellow }}>
        <Stack gap={10}>
          <H2>Same Pattern, Different Data</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <Text fontWeight="700">Build this — same structure as register.html</Text>
              <Code language="html">{`<form action="#" method="post">
  <fieldset>
    <legend>RSVP for Film Night</legend>

    <label for="rsvp-name">Your name:</label>
    <input type="text" id="rsvp-name"
      name="name" required>

    <label for="rsvp-email">Email:</label>
    <input type="email" id="rsvp-email"
      name="email" required>

    <label>Will you attend?
      <input type="radio" name="attend"
        value="yes" checked> Yes
      <input type="radio" name="attend"
        value="no"> No
    </label>
  </fieldset>
  <button type="submit">RSVP</button>
</form>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to notice</Text>
              <Text>Same form, fieldset, legend, label, input structure.</Text>
              <Text>Radio buttons share name="attend" so only one can be picked.</Text>
              <Text>checked sets the default — "Yes" is pre-selected.</Text>
              <Text>Every input has name, id, and matching label for.</Text>
              <Callout tone="info">If you can build register.html and this RSVP form, you can build any form. The pattern is always the same.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 14: Worked Example 2 — Contact Form ---- */}
      <PresentationSlide id="s13-worked-example-2" title="Worked Example: Contact Form" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={10}>
          <H2>Simpler Contact Form (Line-by-Line)</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<form action="#" method="post"
  class="contact-form">
  <fieldset>
    <legend>Contact Us</legend>

    <div class="form-group">
      <label for="c-name">Your Name:</label>
      <input type="text" id="c-name"
        name="name" required>
    </div>

    <div class="form-group">
      <label for="c-email">Your Email:</label>
      <input type="email" id="c-email"
        name="email" required>
    </div>

    <div class="form-group">
      <label for="subject">Subject:</label>
      <select id="subject" name="subject">
        <option value="">-- Choose --</option>
        <option value="general">General</option>
        <option value="feedback">Feedback</option>
      </select>
    </div>

    <div class="form-group">
      <label for="msg">Message:</label>
      <textarea id="msg" name="message"
        rows="5" required></textarea>
    </div>

    <button type="submit" class="btn">
      Send Message</button>
  </fieldset>
</form>`}</Code>
            <Stack gap={5}>
              <Text size="small"><Text as="span" fontWeight="700">Line 1–2:</Text> form with action=&quot;#&quot; and method=&quot;post&quot;. Class allows targeted CSS.</Text>
              <Text size="small"><Text as="span" fontWeight="700">fieldset + legend:</Text> Groups all fields under &quot;Contact Us&quot; heading.</Text>
              <Text size="small"><Text as="span" fontWeight="700">div.form-group:</Text> Wrapper div for each label+input pair. Makes spacing via margin-bottom easy.</Text>
              <Text size="small"><Text as="span" fontWeight="700">type=&quot;email&quot;:</Text> Browser checks for @ automatically. On mobile, shows the @ keyboard.</Text>
              <Text size="small"><Text as="span" fontWeight="700">Empty first option:</Text> Forces the user to deliberately choose a subject. With required, blocks submission if left blank.</Text>
              <Text size="small"><Text as="span" fontWeight="700">textarea rows=&quot;5&quot;:</Text> Shows five visible lines. Content goes between tags.</Text>
              <Text size="small"><Text as="span" fontWeight="700">button.btn:</Text> Styled with gradient, hover lift, and touch-friendly padding.</Text>
              <Callout tone="info">Four input types used: text, email, select, textarea. Fewer than register.html but enough for a simple contact page.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 15: Quick Check ---- */}
      <PresentationSlide id="s13-quickcheck" title="Quick Check">
        <Stack gap={12}>
          <H2>Quick Check — Discuss with Your Neighbor</H2>
          <Stack gap={8}>
            <Callout tone="info">Q1: Why must every input have a name attribute? What happens without it?</Callout>
            <Callout tone="info">Q2: Can a label's for attribute match a different input's id? What breaks?</Callout>
            <Callout tone="info">Q3: If you set type=&quot;text&quot; on an email field, what two things do you lose?</Callout>
          </Stack>
          <Text tone="secondary">Discuss for 2 minutes, then share answers. (1) No name = data never submitted. (2) Clicking the label won't focus the input; screen readers won't announce it. (3) No format validation and wrong mobile keyboard.</Text>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 16: Common Mistakes ---- */}
      <PresentationSlide id="s13-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>7 Common Mistakes (and Fixes)</H2>
          <Stack gap={6}>
            <Text tone="danger">1. Missing name attribute — data will NOT be submitted</Text>
            <Text tone="danger">2. Mismatched for and id — label does not link to input</Text>
            <Text tone="danger">3. Using type=&quot;text&quot; for email — no validation, wrong mobile keyboard</Text>
            <Text tone="danger">4. Self-closing textarea — use &lt;textarea&gt;&lt;/textarea&gt;, not &lt;textarea /&gt;</Text>
            <Text tone="danger">5. Placeholder as only label — screen readers cannot identify the field</Text>
            <Text tone="danger">6. Radio buttons with different names — multiple can be selected</Text>
            <Text tone="danger">7. Forgetting required on mandatory fields — empty submissions go through</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Forms Accessibility Checklist ---- */}
      <PresentationSlide id="s13-accessibility" title="Forms Accessibility Checklist">
        <Stack gap={10}>
          <H2>Make Every Form Usable by Everyone</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3>Must Have</H3>
              <Text>Every input has a visible label (not just placeholder)</Text>
              <Text>label for matches input id exactly</Text>
              <Text>Error messages are near the field, not only at the top</Text>
              <Text>Form can be completed entirely with keyboard (Tab, Enter)</Text>
              <Text>Focus order follows visual order (left-to-right, top-to-bottom)</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Should Have</H3>
              <Text>aria-describedby links help text to the input</Text>
              <Text>aria-required="true" on required fields (redundant with required but helps older screen readers)</Text>
              <Text>role="alert" on error messages so screen readers announce them immediately</Text>
              <Text>Touch targets at least 44 x 44 px on mobile</Text>
              <Callout tone="info">The for/id pair is the single most important accessibility feature in forms. Get that right first.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 17: Practice ---- */}
      <PresentationSlide id="s13-practice" title="Practice Exercises" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>Hands-On Practice</H2>
          <Callout tone="info">Estimated time: 55 minutes</Callout>
          <Stack gap={6}>
            <H3>exercises/session-13/</H3>
            <Text>Task 1 — Understand how forms work; create register.html with a form element</Text>
            <Text>Task 2 — Add text input fields (full name, email, password) with labels</Text>
            <Text>Task 3 — Add radio buttons, checkboxes, dropdown, and textarea</Text>
            <Text>Task 4 — Style the form with CSS (borders, focus states, spacing)</Text>
            <Text>Task 5 — Create confirm.html as a confirmation page</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Open your Student Club site in VS Code before starting.</Text>
        </Stack>
      </PresentationSlide>


      {/* ---- Try It Now: one field, done properly ---- */}
      <PresentationSlide id="s13-try-1" title="Try It Now: One Field, Done Properly" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes, at your desk, right now</H2>
          <Text tone="secondary">Do not build a whole form yet. Build one field correctly, and you have the pattern for every field you will ever write.</Text>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into register.html</Text>
              <Code language="html">{`<form action="signup.php" method="post">
  <label for="email">Email address</label>
  <input type="email" id="email" name="email" required>
  <button type="submit">Join</button>
</form>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then check all four</Text>
              <Text>1. Click the words <Text as="span" fontWeight="700">Email address</Text>. The cursor must jump into the box. That proves <Text as="span" fontFamily="mono">for</Text> matches <Text as="span" fontFamily="mono">id</Text>.</Text>
              <Text>2. Submit it empty. The browser must stop you. That is <Text as="span" fontFamily="mono">required</Text> working.</Text>
              <Text>3. Type <Text as="span" fontFamily="mono">abc</Text> and submit. The browser must complain about the format. That is <Text as="span" fontFamily="mono">type=&quot;email&quot;</Text> working.</Text>
              <Text>4. Open it on your phone. The keyboard must show an @ key.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">If any of the four fails, the field is wrong. Fix it before adding a second field.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Debug This: four bugs in eight lines ---- */}
      <PresentationSlide id="s13-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>Four bugs in eight lines. Find them before you scroll.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">This form looks fine and is broken</Text>
              <Code language="html">{`<form action="signup.php">
  <label>Full name</label>
  <input type="text">

  <label for="email">Email</label>
  <input type="text" id="email" name="email">

  <input type="submit">
</form>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What actually goes wrong</Text>
              <Text tone="danger">1. The name input has no <Text as="span" fontFamily="mono">name</Text>. The server receives nothing for it, silently. Nothing on screen tells you.</Text>
              <Text tone="danger">2. The first label has no <Text as="span" fontFamily="mono">for</Text> and the input has no <Text as="span" fontFamily="mono">id</Text>. Clicking the text does nothing; a screen reader announces an unnamed edit box.</Text>
              <Text tone="danger">3. Email uses <Text as="span" fontFamily="mono">type=&quot;text&quot;</Text>. No format check, and the phone keyboard has no @ key.</Text>
              <Text tone="danger">4. No <Text as="span" fontFamily="mono">method</Text>, so it defaults to GET. Every answer ends up visible in the address bar.</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">Three of these four produce no error message anywhere. This is why you test by using the form, not by looking at it.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Practice: how to know each task is right ---- */}
      <PresentationSlide id="s13-practice-check" title="Practice Checkpoints">
        <Stack gap={10}>
          <H2>How to know each task is actually finished</H2>
          <Text tone="secondary">Working alone? These are your marker. If a checkpoint fails, that task is not done yet.</Text>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>View the page in Chrome. The form outline is visible and the submit button is clickable.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Click every label text. The cursor lands in the matching box every time, with no exceptions.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Only one radio in a group can be selected at a time. If two can, the group shares no common <Text as="span" fontFamily="mono">name</Text>.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>Tab through the form. Each focused field changes appearance. If nothing changes, the <Text as="span" fontFamily="mono">:focus</Text> rule is missing.</Text></Row>
            <Row gap={8}><Pill>Task 5</Pill><Text>Submit the form. The browser leaves the page and lands on confirm.html.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">Right-click a field and choose Inspect. The Elements panel shows the attributes the browser really parsed, which is not always what you think you typed.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ---- Assignment handed out in class ---- */}
      <PresentationSlide id="s13-assignment" title="Assignment: Club Registration Form">
        <Stack gap={10}>
          <H2>Handed out now, so you can start while I am still in the room</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text><Text as="span" fontFamily="mono">register.html</Text> plus its CSS, inside your Student Club site, linked from the main navigation.</Text>
              <Text fontWeight="700">It must collect</Text>
              <Text>Full name, email, student ID, which club, preferred meeting day, and a short reason for joining.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Acceptance criteria — marked on exactly this</Text>
              <Text>Every input has a <Text as="span" fontFamily="mono">name</Text>, and no two share one.</Text>
              <Text>Every input has a label whose <Text as="span" fontFamily="mono">for</Text> matches that input&apos;s <Text as="span" fontFamily="mono">id</Text>.</Text>
              <Text>Email uses <Text as="span" fontFamily="mono">type=&quot;email&quot;</Text>; student ID uses a numeric type.</Text>
              <Text>The form uses <Text as="span" fontFamily="mono">method=&quot;post&quot;</Text>.</Text>
              <Text>At least three fields are <Text as="span" fontFamily="mono">required</Text>, and submitting empty is refused.</Text>
              <Text>Focus is visible on every field via CSS.</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">A form that submits nothing still looks perfect in a screenshot. Test it by using it.</Callout>
        </Stack>
      </PresentationSlide>


      {/* ---- Slide 18: Homework ---- */}
      <PresentationSlide id="s13-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework</H2>
          <Stack gap={6}>
            <H3>homework/session-13/</H3>
            <Text>Add a contact form to contact.html with at least 5 different input types.</Text>
            <Text>Include proper labels (for/id), submit and reset buttons, and required fields.</Text>
            <Text>Style the form consistently with your Student Club Website theme.</Text>
            <Callout tone="warning">Due Sunday 23:59</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ---- Slide 19: Recap & Next ---- */}
      <PresentationSlide id="s13-recap" title="Recap & Next Session">
        <Stack gap={12} align="center">
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>Forms turn static pages into two-way conversations.</Text>
            <Text>Use the correct input type for each kind of data.</Text>
            <Text>Every input needs a label (for/id) and a name attribute.</Text>
            <Text>Validate on the client side for better UX.</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Next: Session 14 — Spry Framework (legacy) and modern CSS-only navigation.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
