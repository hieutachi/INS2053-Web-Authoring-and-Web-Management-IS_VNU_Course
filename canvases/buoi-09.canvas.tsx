import {
  Code,
  H1,
  H2,
  H3,
  Pill,
  Divider,
  Presentation,
  PresentationFragment,
  PresentationSlide,
  Stack,
  Row,
  Tag,
  Text,
  Callout,
  Grid,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 9: tables)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 13px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- 1. Which tag wraps which part of a table ---------- */
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
        <text x="356" y="72" fontSize="11.5" fontFamily={MONO} fill={t.chart.blue}>&lt;thead&gt; of &lt;th&gt;</text>

        {cell(30, 82, 120, "Student", false)}
        {cell(150, 82, 100, "1 semester", false)}
        {cell(250, 82, 90, "150,000", false)}
        {cell(30, 112, 120, "Student", false)}
        {cell(150, 112, 100, "Full year", false)}
        {cell(250, 112, 90, "250,000", false)}
        {cell(30, 142, 120, "Alumni", false)}
        {cell(150, 142, 100, "Full year", false)}
        {cell(250, 142, 90, "400,000", false)}
        <text x="356" y="122" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>&lt;tbody&gt; of &lt;tr&gt;</text>
        <text x="356" y="140" fontSize="11.5" fontFamily={MONO} fill={t.text.secondary}>rows hold &lt;td&gt;</text>
      </g>

      <rect x="26" y="48" width="318" height="126" rx="4" fill="none"
            stroke={t.chart.green} strokeWidth="2" strokeDasharray="5 4" />
      <text x="26" y="190" fontSize="11.5" fontFamily={MONO} fill={t.chart.green}>the dashed outline is &lt;table&gt; — everything lives inside it</text>

      <rect x="0" y="204" width="560" height="50" rx="6" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="12" y="222" fontSize="12.5" fill={t.text.primary}>th is not "bold td". Screen readers repeat th</text>
      <text x="12" y="242" fontSize="12.5" fill={t.text.secondary}>before each cell. Count td per row carefully.</text>
    </svg>
  );
}

/* ---------- 2. colspan and rowspan, and the cell you must delete ---------- */
function SpanGrid({ t }: { t: CanvasTokens }) {
  const box = (x: number, y: number, w: number, h: number, txt: string, fill: string, ink: string) => (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} fill={fill} stroke={t.stroke.secondary} />
      <text x={w / 2} y={h / 2 + 5} fontSize="12" textAnchor="middle" fill={ink}>{txt}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 304" width="100%" role="img"
         aria-label="Left: a colspan of three shown as one yellow cell stretching across a whole row. Right: a rowspan of two shown as one green cell stretching down two rows, with the second row containing one fewer data cell because the tall cell already fills that position.">
      <text x="0" y="14" fontSize="13" fontWeight="600" fill={t.chart.goldenYellow}>colspan = stretch sideways</text>
      <text x="300" y="14" fontSize="13" fontWeight="600" fill={t.chart.green}>rowspan = stretch downwards</text>

      <g transform="translate(0,26)">
        {box(0, 0, 252, 30, "Semester 1 Results", t.chart.goldenYellow, ON_FILL)}
        {box(0, 30, 84, 30, "Name", "transparent", t.text.primary)}
        {box(84, 30, 84, 30, "Score", "transparent", t.text.primary)}
        {box(168, 30, 84, 30, "Grade", "transparent", t.text.primary)}
        {box(0, 60, 84, 30, "Mai", "transparent", t.text.secondary)}
        {box(84, 60, 84, 30, "88", "transparent", t.text.secondary)}
        {box(168, 60, 84, 30, "A", "transparent", t.text.secondary)}
        <text x="0" y="110" fontSize="12" fontFamily={MONO} fill={t.text.primary}>&lt;td colspan="3"&gt;</text>
        <text x="0" y="128" fontSize="12" fill={t.text.secondary}>That row now holds ONE td, not three.</text>
      </g>

      <g transform="translate(300,26)">
        {box(0, 0, 84, 60, "Student", t.chart.green, ON_FILL)}
        {box(84, 0, 84, 30, "1 semester", "transparent", t.text.primary)}
        {box(168, 0, 84, 30, "150,000", "transparent", t.text.primary)}
        {box(84, 30, 84, 30, "Full year", "transparent", t.text.secondary)}
        {box(168, 30, 84, 30, "250,000", "transparent", t.text.secondary)}
        {box(0, 60, 84, 30, "Alumni", "transparent", t.text.secondary)}
        {box(84, 60, 84, 30, "Full year", "transparent", t.text.secondary)}
        {box(168, 60, 84, 30, "400,000", "transparent", t.text.secondary)}
        <text x="0" y="110" fontSize="12" fontFamily={MONO} fill={t.text.primary}>&lt;td rowspan="2"&gt;Student&lt;/td&gt;</text>
        <text x="0" y="128" fontSize="12" fill={t.text.secondary}>The SECOND row has only two td.</text>
      </g>

      <rect x="0" y="176" width="560" height="42" rx="6" fill="none" stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="12" y="194" fontSize="12.5" fill={t.chart.brightOrange}>The rowspan rule everyone gets wrong: after a rowspan, DELETE one td</text>
      <text x="12" y="212" fontSize="12.5" fill={t.chart.brightOrange}>from each row it reaches into. Leave it in and that row grows a column.</text>

      <text x="0" y="240" fontSize="12.5" fill={t.text.secondary}>Draw the grid on paper first, then count td per row.</text>
      <text x="0" y="256" fontSize="12.5" fill={t.text.secondary}>Two minutes of paper saves ten minutes of debugging.</text>
      <text x="0" y="278" fontSize="12.5" fontWeight="600" fill={t.chart.brightOrange}>Merging is for real data groupings — never to force a layout.</text>
      <text x="0" y="294" fontSize="12.5" fill={t.text.secondary}>Layout is flexbox work, not table work.</text>
    </svg>
  );
}

/* ---------- 3. border-collapse, and what CSS does to a table ---------- */
function TableStylePreview({ t }: { t: CanvasTokens }) {
  const plainRow = (y: number, a: string, b: string) => (
    <g transform={`translate(0,${y})`}>
      <rect x="0" width="80" height="26" fill="none" stroke={t.stroke.secondary} />
      <rect x="82" width="80" height="26" fill="none" stroke={t.stroke.secondary} />
      <text x="8" y="18" fontSize="11.5" fill={t.text.secondary}>{a}</text>
      <text x="90" y="18" fontSize="11.5" fill={t.text.secondary}>{b}</text>
    </g>
  );

  const niceRow = (y: number, a: string, b: string, zebra: boolean) => (
    <g transform={`translate(0,${y})`}>
      <rect width="200" height="26" fill={zebra ? t.fill.tertiary : "transparent"} />
      <line x1="0" y1="26" x2="200" y2="26" stroke={t.stroke.tertiary} />
      <text x="10" y="18" fontSize="11.5" fill={t.text.primary}>{a}</text>
      <text x="120" y="18" fontSize="11.5" fill={t.text.primary}>{b}</text>
    </g>
  );

  return (
    <svg viewBox="0 0 560 250" width="100%" role="img"
         aria-label="Left: a default table with doubled gaps between every cell border. Right: the same table after border-collapse collapse, padding, a coloured header and zebra striping on alternate rows, which reads far more easily. Below, a narrow phone frame shows a wide table inside a horizontally scrolling wrapper.">
      <text x="0" y="14" fontSize="13" fontWeight="600" fill={t.chart.brightOrange}>Default table</text>
      <text x="248" y="14" fontSize="13" fontWeight="600" fill={t.chart.green}>Styled: collapse + padding + zebra</text>

      <g transform="translate(0,26)">
        <text x="0" y="4" fontSize="11" fill={t.text.tertiary}>borders drawn twice</text>
        {plainRow(6, "Plan", "Fee")}
        {plainRow(36, "Student", "150,000")}
        {plainRow(66, "Alumni", "400,000")}
      </g>

      <g transform="translate(248,26)">
        <rect y="6" width="200" height="26" fill={t.chart.blue} />
        <text x="10" y="24" fontSize="11.5" fontWeight="700" fill={ON_FILL}>Plan</text>
        <text x="120" y="24" fontSize="11.5" fontWeight="700" fill={ON_FILL}>Fee</text>
        {niceRow(32, "Student", "150,000", false)}
        {niceRow(58, "Alumni", "400,000", true)}
      </g>

      <g transform="translate(0,138)">
        <rect width="118" height="96" rx="10" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="2" />
        <rect x="8" y="24" width="102" height="52" fill="none" stroke={t.chart.goldenYellow} strokeDasharray="4 3" />
        <text x="14" y="42" fontSize="11" fill={t.text.secondary}>Plan  Term  Fee  Pa</text>
        <text x="14" y="58" fontSize="11" fill={t.text.secondary}>Student  1 sem  15</text>
        <rect x="8" y="80" width="60" height="5" rx="2.5" fill={t.chart.goldenYellow} />
        <text x="14" y="16" fontSize="11" fill={t.text.tertiary}>phone</text>
      </g>

      <text x="134" y="150" fontSize="12.5" fill={t.text.primary}>Tables do not reflow. Wide tables on phones</text>
      <text x="134" y="166" fontSize="12.5" fill={t.text.primary}>either shrink to nothing or break the page.</text>
      <text x="134" y="186" fontSize="12.5" fontFamily={MONO} fill={t.chart.goldenYellow}>.wrapper &#123; overflow-x: auto; &#125;</text>
      <text x="134" y="204" fontSize="12.5" fill={t.text.secondary}>Wrap the table in that div for sideways scroll.</text>
      <text x="134" y="224" fontSize="12.5" fill={t.text.secondary}>No collapse = 1990s double-border grid.</text>
      <text x="134" y="240" fontSize="12.5" fill={t.text.secondary}>It is the first line of any table CSS.</text>
    </svg>
  );
}

export default function Session09WorkingWithTables() {
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
        id="s9-title"
        title="Session 9 — Working with Tables"
        notes="Welcome to Session 9. Today we learn HTML tables for structured data — schedules, price lists, rosters. We cover semantic structure, cell merging, and professional CSS styling."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 9 · 3 periods</Tag>
          <H1>Working with Tables</H1>
          <Text tone="secondary">Semantic table structure, colspan/rowspan, professional CSS styling — for data, never for layout.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s9-objectives" title="Learning objectives">
        <Stack gap={12}>
          <H2>By the end of this session you will…</H2>
          <Stack gap={6}>
            <Text>Create tables with <Text as="span">&lt;table&gt;, &lt;tr&gt;, &lt;th&gt;, &lt;td&gt;</Text>.</Text>
            <Text>Structure tables semantically with <Text as="span">&lt;caption&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;</Text>.</Text>
            <Text>Merge cells horizontally (<Text as="span">colspan</Text>) and vertically (<Text as="span">rowspan</Text>).</Text>
            <Text>Style tables: border-collapse, zebra stripes, hover effects, responsive wrappers.</Text>
            <Text>Explain when to use tables (data) and when NOT to (layout).</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s9-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Warm-up recap from Session 8</Text></Row>
              <Row gap={8}><Tag tone="info">50 min</Tag><Text>Theory: table elements, merging, CSS</Text></Row>
              <Row gap={8}><Tag tone="info">55 min</Tag><Text>In-class practice (3 tasks)</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">5 min</Tag><Text>Recap &amp; next session preview</Text></Row>
              <Row gap={8}><Tag tone="info">20 min</Tag><Text>Buffer / Q&amp;A / catch-up time</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Practice starts after theory. Have your club-website folder open in VS Code before we begin.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s9-warmup" title="Warm-Up Recap">
        <Stack gap={12}>
          <H2>Quick Recall — Session 8</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">Q1:</Text> What four properties make up the CSS box model?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q2:</Text> Name three inline elements and explain how they differ from block elements.
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q3:</Text> When should you use a <Text as="span">&lt;div&gt;</Text> versus a <Text as="span">&lt;section&gt;</Text>?
            </Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: Table anatomy ─────────────────────────────── */}
      <PresentationSlide id="s9-anatomy" title="Table anatomy" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={16}>
          <H2>Semantic table structure</H2>
          <TableAnatomy t={t} />
          <PresentationFragment index={0} effect="fade">
            <Stack gap={4}>
              <Text>Order inside &lt;table&gt;: caption → thead → tbody → tfoot.</Text>
              <Text tone="secondary">&lt;td&gt; and &lt;th&gt; MUST be direct children of &lt;tr&gt; — never directly inside &lt;table&gt;.</Text>
            </Stack>
          </PresentationFragment>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: When to Use Tables ────────────────────────── */}
      <PresentationSlide id="s9-when-to-use" title="When to Use Tables">
        <Stack gap={12}>
          <H2>Tables Are for Data, Never for Layout</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H2 tone="success">DO use tables for</H2>
              <Text>Class timetables and schedules</Text>
              <Text>Price lists and fee structures</Text>
              <Text>Member rosters and directories</Text>
              <Text>Statistics and comparison charts</Text>
              <Text>Any spreadsheet-like data</Text>
            </Stack>
            <Stack gap={6}>
              <H2 tone="danger">DON'T use tables for</H2>
              <Text>Page layout (header, sidebar, content)</Text>
              <Text>Positioning elements on the page</Text>
              <Text>Creating columns for text flow</Text>
              <Text>Adding spacing between elements</Text>
              <Text>Anything CSS Flexbox can handle</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">
            Table-based layouts confuse screen readers, break on mobile, and are hard to maintain. Use CSS for layout.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Core Elements Reference ───────────────────── */}
      <PresentationSlide id="s9-elements-ref" title="Core Table Elements">
        <Stack gap={12}>
          <H2>The Four Core Elements</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">&lt;table&gt;</Tag><Text>Container wrapping the entire table</Text></Row>
              <Row gap={8}><Tag tone="info">&lt;tr&gt;</Tag><Text>One horizontal row of cells</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">&lt;th&gt;</Tag><Text>Header cell — bold, centred by default</Text></Row>
              <Row gap={8}><Tag tone="info">&lt;td&gt;</Tag><Text>Data cell — normal weight, left-aligned</Text></Row>
            </Stack>
          </Grid>
          <Code language="html">{`<table>
  <tr>
    <th>Event</th>   <!-- header cell -->
    <th>Date</th>
  </tr>
  <tr>
    <td>Workshop</td> <!-- data cell -->
    <td>Mar 15</td>
  </tr>
</table>`}</Code>
          <Callout tone="warning">Critical rule: &lt;td&gt; and &lt;th&gt; MUST be inside &lt;tr&gt;. A cell directly inside &lt;table&gt; is invalid HTML.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Basic table code ──────────────────────────── */}
      <PresentationSlide id="s9-basic-code" title="Worked Example: Event Schedule">
        <Stack gap={10}>
          <H2>Complete styled table with thead, tbody, tfoot</H2>
          <Code language="html">{`<table class="styled-table">
  <caption>Upcoming Events — March 2024</caption>
  <thead>
    <tr>
      <th>No.</th><th>Event</th>
      <th>Date</th><th>Venue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td><td>Web Workshop</td>
      <td>Mar 15</td><td>Room 301</td>
    </tr>
    <tr>
      <td>2</td><td>Photo Contest</td>
      <td>Mar 22</td><td>Online</td>
    </tr>
    <tr>
      <td>3</td><td>Music Night</td>
      <td>Mar 29</td><td>Auditorium</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Total Events</td>
      <td>3</td>
    </tr>
  </tfoot>
</table>`}</Code>
          <Callout tone="info">
            caption gives the table a title + accessible label. thead wraps header row(s). tbody wraps data rows. tfoot uses colspan="3" so "Total Events" spans three columns while "3" sits in the fourth.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Semantic Sections Deep Dive ───────────────── */}
      <PresentationSlide id="s9-semantic-deep" title="Semantic Sections Deep Dive">
        <Stack gap={10}>
          <H2>Why caption, thead, tbody, tfoot Matter</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text fontWeight="700">Correct order inside &lt;table&gt;:</Text>
              <Text>1. <Text as="span">&lt;caption&gt;</Text> — first (if present)</Text>
              <Text>2. <Text as="span">&lt;thead&gt;</Text> — header rows</Text>
              <Text>3. <Text as="span">&lt;tbody&gt;</Text> — data rows</Text>
              <Text>4. <Text as="span">&lt;tfoot&gt;</Text> — summary rows</Text>
            </Stack>
            <Stack gap={4}>
              <Text fontWeight="700">Why these sections matter:</Text>
              <Text><Text as="span">Accessibility:</Text> screen readers navigate by section</Text>
              <Text><Text as="span">Styling:</Text> apply different CSS to each section</Text>
              <Text><Text as="span">Print:</Text> browsers repeat thead on each printed page</Text>
              <Text><Text as="span">Semantics:</Text> machines understand table structure</Text>
            </Stack>
          </Grid>
          <Callout tone="info">You can have multiple &lt;tbody&gt; sections to group related data. Only ONE &lt;thead&gt; and ONE &lt;tfoot&gt; per table.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Quick Check ──────────────────────────────── */}
      <PresentationSlide id="s9-quick-check" title="Quick Check: Tables">
        <Stack gap={12}>
          <H2>Discussion Prompts</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">1.</Text> Why is <Text as="span">border-collapse: collapse</Text> considered the most important table CSS property?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">2.</Text> What happens if you skip <Text as="span">&lt;tbody&gt;</Text> and put <Text as="span">&lt;tr&gt;</Text> directly inside <Text as="span">&lt;table&gt;</Text>? Does it still render?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">3.</Text> Can a single table have multiple <Text as="span">&lt;tbody&gt;</Text> sections? When would that be useful?
            </Callout>
          </Stack>
          <Text tone="secondary">Think for 1 minute, then discuss with your neighbour.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: Worked Example — rowspan ─────────────────── */}
      {/* ── Try It Now: Build a Table ─────────────────────────── */}
      <PresentationSlide id="s09-try-table" title="Try It Now: Build a Table from Scratch" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — build a members table</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into tables.html</Text>
              <Code language="html">{`<table>
  <caption>Club Members</caption>
  <thead>
    <tr>
      <th>Name</th>
      <th>Role</th>
      <th>Joined</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>An</td>
      <td>President</td>
      <td>2024</td>
    </tr>
    <tr>
      <td>Minh</td>
      <td>Treasurer</td>
      <td>2025</td>
    </tr>
  </tbody>
</table>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Then check four things</Text>
              <Text>1. The caption appears above the table — that is the table title.</Text>
              <Text>2. Header row is bold and centered — that is th default styling.</Text>
              <Text>3. Right-click and Inspect — you should see thead and tbody in the DOM.</Text>
              <Text>4. Add a third row with your own name. Every row must have exactly 3 cells.</Text>
              <Callout tone="info">If the table looks like a wall of text with no borders, add border-collapse: collapse in CSS.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Try It Now: Audio ─────────────────────────────────── */}
      <PresentationSlide id="s09-try-audio" title="Try It Now: Add Audio" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — embed an audio player</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into media.html</Text>
              <Code language="html">{`<section>
  <h2>Club Anthem</h2>
  <audio controls preload="metadata">
    <source src="images/anthem.mp3" type="audio/mpeg">
    <source src="images/anthem.ogg" type="audio/ogg">
    <p>Your browser does not support audio.
      <a href="images/anthem.mp3">Download</a>.
    </p>
  </audio>
</section>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. The audio player appears with a play button and timeline.</Text>
              <Text>2. Click play — the audio should load and play.</Text>
              <Text>3. If you see nothing, check that controls is spelled correctly.</Text>
              <Text>4. The fallback text should be visible if the format is unsupported.</Text>
              <Callout tone="info">Do NOT add autoplay — browsers block it, and it annoys users. Always let the user choose to play.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s9-worked-example-rowspan" title="Worked Example: rowspan Table" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={10}>
          <H2>Membership fees with rowspan</H2>
          <Text tone="secondary">"Student" spans two rows — the next row has only 3 td, not 4.</Text>
          <Code language="html">{`<table class="styled-table">
  <caption>Membership Fees</caption>
  <thead>
    <tr>
      <th>Category</th><th>Duration</th>
      <th>Price</th><th>Benefits</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Student</td>
      <td>1 Semester</td>
      <td>50,000 VND</td>
      <td>All events + workshops</td>
    </tr>
    <tr>
      <!-- No td for Category: rowspan fills it -->
      <td>Full Year</td>
      <td>80,000 VND</td>
      <td>All events + T-shirt</td>
    </tr>
    <tr>
      <td>Guest</td><td>Per Event</td>
      <td>Free</td>
      <td>Single event only</td>
    </tr>
  </tbody>
</table>`}</Code>
          <Callout tone="warning">
            After rowspan="2", DELETE one td from the next row. Leaving it in creates an extra column and breaks the grid.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: colspan & rowspan ─────────────────────────── */}
      <PresentationSlide id="s9-merging" title="Merging cells" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>colspan &amp; rowspan</H2>
          <SpanGrid t={t} />
          <Callout tone="warning">
            rowspan rule: the NEXT row has one fewer &lt;td&gt; because the spanning cell already occupies that position.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Worked Example — Leadership mailto ───────── */}
      <PresentationSlide id="s9-worked-example-mailto" title="Worked Example: Leadership Table">
        <Stack gap={10}>
          <H2>Club Leadership with Email Links</H2>
          <Text tone="secondary">Table cells can contain any inline element — including links.</Text>
          <Code language="html">{`<table class="styled-table">
  <caption>Leadership Team 2024</caption>
  <thead>
    <tr>
      <th>Name</th><th>Position</th>
      <th>Faculty</th><th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Nguyen Van A</td>
      <td>President</td>
      <td>Information Technology</td>
      <td><a href="mailto:president@club.edu">
            president@club.edu</a></td>
    </tr>
    <tr>
      <td>Tran Thi B</td>
      <td>Vice President</td>
      <td>Business Administration</td>
      <td><a href="mailto:vp@club.edu">
            vp@club.edu</a></td>
    </tr>
  </tbody>
</table>`}</Code>
          <Callout tone="info">
            The mailto: link inside a &lt;td&gt; opens the user's email client. This is valid HTML — cells accept any inline content.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Styling tables ────────────────────────────── */}
      <PresentationSlide id="s9-styling" title="CSS table styling">
        <Stack gap={12}>
          <H2>Professional table CSS</H2>
          <TableStylePreview t={t} />
          <Code language="css">{`.styled-table {
  width: 100%;
  border-collapse: collapse;   /* single borders! */
  border-radius: 8px;
  overflow: hidden;
}
.styled-table thead { background: linear-gradient(135deg, #1a5276, #2874a6); }
.styled-table th    { color: white; padding: 12px 15px; text-align: left; }
.styled-table td    { padding: 10px 15px; border-bottom: 1px solid #ddd; }
.styled-table tbody tr:nth-child(even) { background-color: #f8f9fa; }
.styled-table tbody tr:hover { background-color: #eaf2f8; }`}</Code>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: CSS Properties Reference ─────────────────── */}
      <PresentationSlide id="s9-css-ref" title="Table CSS Reference">
        <Stack gap={12}>
          <H2>Essential Table CSS Properties</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text fontWeight="700">Structure &amp; Borders</Text>
              <Text><Text as="span">border-collapse: collapse</Text> — single borders</Text>
              <Text><Text as="span">width: 100%</Text> — full container width</Text>
              <Text><Text as="span">overflow: hidden</Text> — clips border-radius</Text>
            </Stack>
            <Stack gap={4}>
              <Text fontWeight="700">Visual Polish</Text>
              <Text><Text as="span">padding: 10px 15px</Text> — cell breathing room</Text>
              <Text><Text as="span">nth-child(even)</Text> — zebra stripe rows</Text>
              <Text><Text as="span">tr:hover</Text> — interactive highlight</Text>
              <Text><Text as="span">text-align: left</Text> — override th centering</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Always set border-collapse first. Without it, every cell draws its own border creating ugly double lines.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Style the Table ───────────────────────── */}
      <PresentationSlide id="s09-try-style" title="Try It Now: Style Your Table" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Add this to style.css</Text>
              <Code language="css">{`table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th { background-color: #333; color: white; }

tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Borders are single lines, not doubled — that is border-collapse working.</Text>
              <Text>2. Header row is dark with white text.</Text>
              <Text>3. Every other data row has a light grey background (zebra striping).</Text>
              <Text>4. Cells have breathing room from the padding.</Text>
              <Callout tone="info">Remove border-collapse: collapse and reload. See the double borders? That is why it must come first.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 16: Responsive wrapper ────────────────────────── */}
      <PresentationSlide id="s9-responsive" title="Responsive tables" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>Tables on small screens</H2>
          <Code language="html">{`<div class="table-wrapper">
  <table class="styled-table">...</table>
</div>`}</Code>
          <Code language="css">{`.table-wrapper {
  overflow-x: auto;  /* scrollbar only when needed */
  margin: 20px 0;
}`}</Code>
          <Text tone="secondary">Tables do not shrink gracefully. Wrap them in a scrollable container so content stays readable on phones.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Table Accessibility ─────────────────────── */}
      <PresentationSlide id="s9-accessibility" title="Table Accessibility">
        <Stack gap={12}>
          <H2>Making Tables Accessible</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Screen readers &amp; tables</Text>
              <Text>Screen readers read each cell aloud with its header.</Text>
              <Text><Text as="span">&lt;th&gt;</Text> tells the reader "this is a column label".</Text>
              <Text><Text as="span">&lt;caption&gt;</Text> is announced first as the table title.</Text>
              <Text tone="secondary">Without these, users hear "cell 1, cell 2..." with no context.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">The scope attribute</Text>
              <Code language="html">{`<th scope="col">Name</th>
<th scope="row">Student</th>`}</Code>
              <Text><Text as="span">scope="col"</Text> = this header labels a column</Text>
              <Text><Text as="span">scope="row"</Text> = this header labels a row</Text>
              <Text tone="secondary">Use scope when a table has headers on both axes.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Accessibility checklist: caption present, th for headers (not styled td), scope where needed, responsive wrapper for mobile.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s09-do-dont" title="Tables & Media: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Use &lt;table&gt; only for tabular data, not for layout</Text>
              <Text>Include &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt; for structure</Text>
              <Text>Add controls attribute to every &lt;video&gt; and &lt;audio&gt;</Text>
              <Text>Provide fallback text for media elements</Text>
              <Text>Use poster attribute on videos for a thumbnail</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Use tables to create page layouts (use flexbox/grid)</Text>
              <Text>Use autoplay on videos (browsers block it)</Text>
              <Text>Forget the type attribute on &lt;source&gt; elements</Text>
              <Text>Use absolute file paths for media files</Text>
              <Text>Embed videos without responsive wrapper (56.25% padding)</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Table Accessibility ───────────────────────────────── */}
      <PresentationSlide id="s09-table-a11y" title="Table Accessibility Checklist">
        <Stack gap={12}>
          <H2>Make Your Tables Accessible</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>caption</Pill><Text>Every table needs a &lt;caption&gt; — it is the table's title for screen readers.</Text></Row>
            <Row gap={8}><Pill>scope</Pill><Text>Add scope="col" to header cells in the first row, scope="row" for the first column.</Text></Row>
            <Row gap={8}><Pill>thead/tbody</Pill><Text>Use &lt;thead&gt; and &lt;tbody&gt; to separate headers from data — screen readers use this.</Text></Row>
            <Row gap={8}><Pill>Simple tables</Pill><Text>Avoid complex colspan/rowspan when possible — they confuse screen readers.</Text></Row>
          </Stack>
          <Callout tone="warning">A table without &lt;caption&gt; and scope attributes is like an image without alt text — inaccessible.</Callout>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 18: Common mistakes (expanded) ───────────────── */}
      <PresentationSlide id="s9-mistakes" title="Common Mistakes">
        <Stack gap={10}>
          <H2>Seven Pitfalls to Avoid</H2>
          <Stack gap={4}>
            <Text tone="danger">1. <Text as="span">&lt;td&gt;</Text> directly inside <Text as="span">&lt;table&gt;</Text> without a <Text as="span">&lt;tr&gt;</Text> wrapper</Text>
            <Text tone="danger">2. Forgetting <Text as="span">border-collapse: collapse</Text> → ugly double borders</Text>
            <Text tone="danger">3. Same number of <Text as="span">&lt;td&gt;</Text> in every row despite rowspan → extra cell breaks grid</Text>
            <Text tone="danger">4. Headers styled identically to data cells → no visual distinction</Text>
            <Text tone="danger">5. Using tables for page layout → bad semantics, poor accessibility</Text>
            <Text tone="danger">6. Missing <Text as="span">&lt;caption&gt;</Text> → screen readers cannot identify the table purpose</Text>
            <Text tone="danger">7. Forgetting responsive wrapper → table overflows on mobile</Text>
          </Stack>
          <Callout tone="warning">Fix: always wrap cells in &lt;tr&gt;, always collapse borders, always add caption, always use .table-wrapper.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 19: Summary Table ─────────────────────────────── */}
      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s09-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This table has three bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy code</Text>
              <Code language="html">{`<table>
  <tr>
    <th>Name</th>
    <th>Role</th>
  </tr>
  <tr>
    <td>An</td>
    <td>President</td>
    <td>2024</td>
  </tr>
  <tr>
    <td>Minh</td>
    <td>Vice</td>
  </tr>
</table>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. No thead/tbody — header row and data rows are not separated. Screen readers cannot tell them apart.</Text>
              <Text tone="danger">2. Row 1 has 3 cells but the header only has 2 columns — the table grid is broken.</Text>
              <Text tone="danger">3. No caption — the table has no title describing what the data is about.</Text>
              <Callout tone="info">Fix: add thead around the header row, tbody around data rows, add a caption, and make every row have the same number of cells.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s9-summary" title="Theory Summary">
        <Stack gap={10}>
          <H2>Session 9 — Complete Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={3}>
              <Text fontWeight="700">HTML Elements</Text>
              <Text><Text as="span">&lt;table&gt;</Text> — container</Text>
              <Text><Text as="span">&lt;tr&gt;</Text> — row</Text>
              <Text><Text as="span">&lt;th&gt;</Text> — header cell</Text>
              <Text><Text as="span">&lt;td&gt;</Text> — data cell</Text>
              <Text><Text as="span">&lt;caption&gt;</Text> — title</Text>
              <Text><Text as="span">&lt;thead/tbody/tfoot&gt;</Text> — sections</Text>
            </Stack>
            <Stack gap={3}>
              <Text fontWeight="700">Attributes &amp; CSS</Text>
              <Text><Text as="span">colspan</Text> — merge across columns</Text>
              <Text><Text as="span">rowspan</Text> — merge across rows</Text>
              <Text><Text as="span">border-collapse</Text> — single borders</Text>
              <Text><Text as="span">nth-child(even)</Text> — zebra stripes</Text>
              <Text><Text as="span">tr:hover</Text> — row highlight</Text>
              <Text><Text as="span">.table-wrapper</Text> — responsive scroll</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Practice ──────────────────────────────────── */}
      <PresentationSlide id="s9-practice" title="In-class practice">
        <Stack gap={12}>
          <H2>Hands-on — exercises/session-09/ (~55 min)</H2>
          <Stack gap={6}>
            <Text><Text as="span">Task 1:</Text> Create a basic members table in tables.html with caption, thead, tbody, th and td.</Text>
            <Text><Text as="span">Task 2:</Text> Add a weekly schedule table using colspan and rowspan to merge cells.</Text>
            <Text><Text as="span">Task 3:</Text> Style both tables with CSS: border-collapse, header colors, zebra stripes, hover effect.</Text>
          </Stack>
          <Text tone="secondary">Files: exercises/session-09/ · Open club-website folder. Deliverable: tables.html + css/style.css updates.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s09-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>Right-click the table in the browser and "Inspect" — you should see thead, tbody, th, and td in the DOM.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>The merged cell should span the correct number of rows or columns — count them in the Elements panel.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Resize the browser to 400px wide — the table should scroll horizontally inside .table-wrapper, not overflow the page.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If zebra stripes do not appear, check that border-collapse: collapse is on the table, not on the rows.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s09-assignment" title="Assignment: Club Activity Table">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>A schedule.html page in your Student Club site with a styled weekly activity table.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>Table has caption, thead, tbody.</Text>
              <Text>5+ columns, 5+ rows of real data.</Text>
              <Text>colspan or rowspan used at least once.</Text>
              <Text>CSS: border-collapse, header color, zebra stripes, hover.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Validate HTML at validator.w3.org.</Text>
              <Text>Check the table on a narrow screen — does it scroll?</Text>
              <Text>Ask a classmate to read the table — is the data clear?</Text>
              <Callout tone="warning">A table without border-collapse looks broken even when the HTML is correct. Style it.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 21: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s9-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework — homework/session-09/</H2>
          <Stack gap={6}>
            <Text>Create <Text as="span">project/pages/schedule.html</Text> with a weekly schedule or activity table.</Text>
            <Text>Table must have caption, thead, tbody, 5+ columns, 5+ rows, and use colspan OR rowspan at least once.</Text>
            <Text>Style the table with CSS: border-collapse, borders, header colors, zebra stripes, hover effect.</Text>
            <Text>Add a "Schedule" link to the navigation on ALL pages.</Text>
          </Stack>
          <Callout tone="info">
            Due: Sunday 23:59 · Submit via git push
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 22: Recap & next ─────────────────────────────── */}
      <PresentationSlide id="s9-recap" title="Recap & what's next">
        <Stack gap={12}>
          <H2>Session 9 recap</H2>
          <Row gap={8}>
            <Tag tone="success">&lt;table&gt; structure</Tag>
            <Tag tone="success">thead / tbody / tfoot</Tag>
            <Tag tone="success">colspan</Tag>
            <Tag tone="success">rowspan</Tag>
            <Tag tone="success">border-collapse</Tag>
            <Tag tone="success">Zebra stripes</Tag>
          </Row>
          <Text>Tables are for <Text as="span">tabular data</Text> — schedules, prices, rosters. Never for page layout.</Text>
          <Text tone="secondary">Next: Session 10 introduces <Text as="span">Multimedia</Text> — HTML5 video &amp; audio, Flash legacy.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
