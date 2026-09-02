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
  Text,
  Code,
  Callout,
  Divider,
  canvasImage,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 2)
   blue = structure · goldenYellow = action/attention · green = correct
   brightOrange = wrong/broken.  Labels students must read: >= 13px.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const IMG_FOLDER = canvasImage("./s2-folder.jpg");

/* ---------- 1. How a relative path resolves (slide: Relative vs Absolute) -- */

function PathResolver({ t }: { t: CanvasTokens }) {
  const row = (y: number, indent: number, label: string, accent?: string) => (
    <g key={y}>
      <text x={24 + indent} y={y} fontSize="12" fontFamily={MONO} fill={accent || t.text.secondary}>{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 252" width="100%" height="252" role="img"
      aria-label="A relative path is read from the file you are writing in; absolute paths break when the project moves">
      <defs>
        <marker id="s2ok" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.green} />
        </marker>
      </defs>

      {/* project tree */}
      <rect x="12" y="16" width="232" height="220" rx="10" fill={t.fill.tertiary} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="24" y="38" fontSize="13" fontWeight="700" fontFamily={MONO} fill={t.text.primary}>student-club/</text>
      {row(60, 12, "index.html")}
      <rect x="30" y="48" width="96" height="16" rx="4" fill={t.chart.goldenYellow} opacity="0.35" />
      <text x="132" y="60" fontSize="11" fill={t.chart.goldenYellow}>you are here</text>
      {row(82, 12, "about.html")}
      {row(104, 12, "css/")}
      {row(126, 30, "style.css")}
      {row(148, 12, "images/")}
      <rect x="52" y="156" width="90" height="18" rx="4" fill={t.chart.green} opacity="0.85" />
      <text x="58" y="169" fontSize="12" fontFamily={MONO} fill={ON_FILL}>logo.png</text>
      <text x="150" y="169" fontSize="11" fill={t.chart.green}>the target</text>
      <line x1="24" y1="44" x2="24" y2="164" stroke={t.stroke.tertiary} strokeDasharray="2 3" />
      <text x="24" y="204" fontSize="11" fill={t.text.tertiary}>A relative path is read FROM the</text>
      <text x="24" y="220" fontSize="11" fill={t.text.tertiary}>file you are typing in.</text>

      {/* case 1 — correct */}
      <rect x="268" y="28" width="280" height="52" rx="8" fill={t.bg.elevated} stroke={t.chart.green} strokeWidth="1.5" />
      <text x="280" y="48" fontSize="12" fontFamily={MONO} fill={t.text.primary}>src="images/logo.png"</text>
      <text x="280" y="68" fontSize="12" fill={t.chart.green}>Works on any computer, any server</text>
      <path d="M264,54 C250,54 250,165 148,165" fill="none" stroke={t.chart.green} strokeWidth="2" markerEnd="url(#s2ok)" />

      {/* case 2 — leading slash */}
      <rect x="268" y="92" width="280" height="52" rx="8" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="280" y="112" fontSize="12" fontFamily={MONO} fill={t.text.primary}>src="/images/logo.png"</text>
      <text x="280" y="132" fontSize="12" fill={t.chart.brightOrange}>Starts at the server root, not here</text>

      {/* case 3 — absolute disk path */}
      <rect x="268" y="156" width="280" height="66" rx="8" fill={t.bg.elevated} stroke={t.chart.brightOrange} strokeWidth="1.5" />
      <text x="280" y="176" fontSize="12" fontFamily={MONO} fill={t.text.primary}>src="C:/Users/Mai/logo.png"</text>
      <text x="280" y="196" fontSize="12" fill={t.chart.brightOrange}>Only works on YOUR laptop.</text>
      <text x="280" y="212" fontSize="12" fill={t.chart.brightOrange}>Broken for everyone else.</text>
    </svg>
  );
}

/* ---------- 2. Reading ../ one hop at a time (slide: The ../ Rule) -------- */

function DotDotLadder({ t }: { t: CanvasTokens }) {
  return (
    <svg viewBox="0 0 560 214" width="100%" height="214" role="img"
      aria-label="Reading the path dot dot slash images slash banner.jpg as three hops: climb out of css, enter images, take the file">
      <defs>
        <marker id="s2hop" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>

      {/* the path, split into hops */}
      <rect x="96" y="14" width="60" height="34" rx="6" fill={t.chart.goldenYellow} opacity="0.9" />
      <text x="126" y="36" textAnchor="middle" fontSize="16" fontFamily={MONO} fill={ON_FILL}>../</text>
      <rect x="160" y="14" width="94" height="34" rx="6" fill={t.chart.blue} opacity="0.85" />
      <text x="207" y="36" textAnchor="middle" fontSize="16" fontFamily={MONO} fill={ON_FILL}>images/</text>
      <rect x="258" y="14" width="130" height="34" rx="6" fill={t.chart.green} opacity="0.85" />
      <text x="323" y="36" textAnchor="middle" fontSize="16" fontFamily={MONO} fill={ON_FILL}>banner.jpg</text>
      <circle cx="104" cy="12" r="9" fill={t.chart.goldenYellow} />
      <text x="104" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>1</text>
      <circle cx="168" cy="12" r="9" fill={t.chart.blue} />
      <text x="168" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>2</text>
      <circle cx="266" cy="12" r="9" fill={t.chart.green} />
      <text x="266" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fill={ON_FILL}>3</text>

      {/* nested folders */}
      <rect x="12" y="66" width="330" height="134" rx="10" fill="none" stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="24" y="86" fontSize="13" fontWeight="700" fontFamily={MONO} fill={t.text.primary}>student-club/</text>

      <rect x="30" y="96" width="140" height="46" rx="8" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="40" y="113" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>css/</text>
      <rect x="40" y="118" width="120" height="18" rx="4" fill={t.chart.goldenYellow} opacity="0.35" />
      <text x="46" y="131" fontSize="11" fontFamily={MONO} fill={t.text.primary}>style.css</text>
      <text x="40" y="156" fontSize="11" fill={t.chart.goldenYellow}>you are typing here</text>

      <rect x="186" y="96" width="140" height="46" rx="8" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="196" y="113" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>images/</text>
      <rect x="196" y="118" width="120" height="18" rx="4" fill={t.chart.green} opacity="0.85" />
      <text x="202" y="131" fontSize="11" fontFamily={MONO} fill={ON_FILL}>banner.jpg</text>

      {/* hop arrows on the tree */}
      <path d="M100,100 C100,78 100,78 118,78" fill="none" stroke={t.chart.goldenYellow} strokeWidth="2" markerEnd="url(#s2hop)" />
      <text x="106" y="72" fontSize="11" fill={t.chart.goldenYellow}>1 climb out of css/</text>
      <path d="M172,119 L182,119" stroke={t.chart.blue} strokeWidth="2" markerEnd="url(#s2hop)" />
      <text x="196" y="170" fontSize="11" fill={t.chart.blue}>2 enter images/  3 take the file</text>

      {/* rule box */}
      <rect x="366" y="66" width="182" height="134" rx="10" fill={t.fill.tertiary} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <text x="380" y="90" fontSize="13" fontWeight="700" fill={t.text.primary}>The rule</text>
      <text x="380" y="112" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>../</text>
      <text x="410" y="112" fontSize="12" fill={t.text.secondary}>up one folder</text>
      <text x="380" y="134" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>../../</text>
      <text x="424" y="134" fontSize="12" fill={t.text.secondary}>up two folders</text>
      <text x="380" y="156" fontSize="13" fontFamily={MONO} fill={t.text.secondary}>name/</text>
      <text x="424" y="156" fontSize="12" fill={t.text.secondary}>down into it</text>
      <text x="380" y="182" fontSize="11" fill={t.text.tertiary}>Give directions from where</text>
      <text x="380" y="196" fontSize="11" fill={t.text.tertiary}>you stand, not from home.</text>
    </svg>
  );
}

/* ---------- 3. Where Git puts your files (slide: Git & GitHub Basics) ----- */

function GitFlow({ t }: { t: CanvasTokens }) {
  const stage = (x: number, title: string, sub: string, fill: string) => (
    <g key={x}>
      <rect x={x} y="52" width="116" height="76" rx="10" fill={fill} opacity="0.9" />
      <text x={x + 58} y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill={ON_FILL}>{title}</text>
      <text x={x + 58} y="100" textAnchor="middle" fontSize="11" fill={ON_FILL}>{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 560 190" width="100%" height="190" role="img"
      aria-label="Files move from your folder to the staging area with git add, into the local repository with git commit, and up to GitHub with git push">
      <defs>
        <marker id="s2git" markerWidth="9" markerHeight="9" refX="7" refY="3.2" orient="auto">
          <path d="M0,0 L7,3.2 L0,6.4 z" fill={t.chart.goldenYellow} />
        </marker>
      </defs>

      <text x="12" y="28" fontSize="12" fill={t.text.tertiary}>Run once at the start:</text>
      <rect x="150" y="14" width="76" height="20" rx="5" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      <text x="188" y="28" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.primary}>git init</text>

      {stage(10, "Your folder", "files you edit", t.chart.blue)}
      {stage(158, "Staging area", "chosen changes", t.chart.goldenYellow)}
      {stage(306, "Local repo", "saved history", t.chart.green)}
      <rect x="440" y="52" width="110" height="76" rx="10" fill={t.bg.elevated} stroke={t.stroke.secondary} strokeWidth="1.5" />
      <circle cx="495" cy="78" r="13" fill={t.text.secondary} />
      <text x="495" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill={t.text.primary}>GitHub</text>

      <line x1="130" y1="90" x2="152" y2="90" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s2git)" />
      <text x="141" y="146" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>git add .</text>
      <line x1="278" y1="90" x2="300" y2="90" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s2git)" />
      <text x="289" y="146" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>git commit -m</text>
      <line x1="426" y1="90" x2="434" y2="90" stroke={t.chart.goldenYellow} strokeWidth="2.5" markerEnd="url(#s2git)" />
      <text x="430" y="146" textAnchor="middle" fontSize="12" fontFamily={MONO} fill={t.text.secondary}>git push</text>

      <text x="12" y="172" fontSize="12" fill={t.text.tertiary}>Nothing reaches GitHub until you push.</text>
      <text x="12" y="188" fontSize="12" fill={t.text.tertiary}>A commit is a save point you can undo.</text>
    </svg>
  );
}

export default function Session02Lecture() {
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
      {/* ===== SLIDE 1: Title ===== */}
      <PresentationSlide
        id="title"
        title="Session 2 — Creating a New Site"
        notes="Students should have completed Session 1 tasks. Today focuses on multi-page sites, paths, naming, and Git intro."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 2 · 150 min</Tag>
          <H1>Creating a New Site &amp; Organizing Your Project</H1>
          <Text tone="secondary">Multi-page websites, relative paths, file naming conventions, and Git basics.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 2: Objectives ===== */}
      <PresentationSlide id="objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>After this session you will be able to:</H2>
          <Stack gap={6}>
            <Text>1. Define a site in Dreamweaver or set up a project in VS Code</Text>
            <Text>2. Create a complete folder structure for a multi-page website</Text>
            <Text>3. Explain the difference between relative and absolute paths</Text>
            <Text>4. Apply professional file naming conventions</Text>
            <Text>5. Perform basic Git operations (init, add, commit, push)</Text>
          </Stack>
          <Callout tone="info">Linked outcomes: CLO1, CLO2 (create structured websites), CLO4</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 3: Agenda / Timeline ===== */}
      <PresentationSlide id="agenda" title="Today's 150-Minute Plan">
        <Stack gap={12}>
          <H2>Session timeline</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="info">0 – 10 min</Tag><Text>Welcome &amp; objectives</Text></Row>
              <Row gap={8}><Tag tone="info">10 – 18 min</Tag><Text>Recap of Session 1</Text></Row>
              <Row gap={8}><Tag tone="success">18 – 90 min</Tag><Text>New content + live demos</Text></Row>
            </Stack>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="success">90 – 140 min</Tag><Text>In-class practice (Tasks 1–4)</Text></Row>
              <Row gap={8}><Tag tone="warning">140 – 148 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">148 – 150 min</Tag><Text>Recap &amp; next session</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Theory ~60 min · Practice ~90 min. Save frequently during practice.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 4: Recap of Session 1 ===== */}
      <PresentationSlide id="recap-s1" title="Recap: What Did We Learn Last Time?">
        <Stack gap={12}>
          <H2>Quick review — Session 1</H2>
          <Stack gap={8}>
            <Callout tone="info">What does HTML stand for? (HyperText Markup Language)</Callout>
            <Callout tone="info">Which tag wraps all visible content? (&lt;body&gt;)</Callout>
            <Callout tone="info">What must every HTML page start with? (&lt;!DOCTYPE html&gt;)</Callout>
            <Callout tone="info">Where do images, CSS, and JS files go? (In separate subfolders)</Callout>
          </Stack>
          <Text tone="secondary">If you cannot answer these, review Session 1 slides before continuing.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 5: What Is a Site ===== */}
      <PresentationSlide id="what-is-site" title="What Is a 'Site'?">
        <Stack gap={12}>
          <H2>Defining your site</H2>
          <Text>A site = the root folder containing ALL files for one website. Tell your editor where it lives.</Text>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="info">Dreamweaver</Tag>
              <Text>Site → New Site → set name + local folder</Text>
              <Text tone="secondary">Files panel shows project tree</Text>
            </Stack>
            <Stack gap={6}>
              <Tag tone="success">VS Code</Tag>
              <Text>File → Open Folder → select root</Text>
              <Text tone="secondary">Explorer panel shows project tree</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">Analogy: Setting up an apartment — choose rooms (subfolders), move furniture in (files), give your address to the landlord (define the site).</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 5b: Your Site Is Just a Folder (photo) ===== */}
      <PresentationSlide
        id="site-is-folder"
        title="Your Site Is Just a Folder"
        notes="Self-study note: Many students think a Dreamweaver 'site' is something online. Emphasize that it is just one folder on their own computer. The manila folder in the photo is a perfect analogy — your local root folder holds all documents, just like a physical folder holds papers. Site Setup only tells Dreamweaver which folder to watch; nothing is uploaded anywhere yet."
        background={{ pattern: "grid", accent: t.chart.green }}
      >
        <Stack gap={12}>
          <H2>Your site is just a folder</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <img
                src={IMG_FOLDER}
                alt="A manila folder with a paperclip, like a site folder holds your files"
                style={{ width: "100%", borderRadius: 8, border: `1px solid ${t.stroke.tertiary}` }}
              />
              <Text size="small" tone="tertiary">Photo: allispossible.org.uk — CC BY 2.0, Wikimedia Commons</Text>
            </Stack>
            <Stack gap={8}>
              <Text>A Dreamweaver "site" is NOT something uploaded to the internet.</Text>
              <Text>It is one folder on YOUR computer — called the <Text as="span" tone="primary">local root folder</Text>.</Text>
              <Text>The manila folder in the photo = your local root folder.</Text>
              <Text>Documents inside = your .html, .css, and image files.</Text>
              <Text><Text as="span" tone="primary">Site &gt; New Site</Text> simply tells Dreamweaver which folder to watch.</Text>
              <Callout tone="info">For CodeBreakers club: your folder might be C:\sites\codebreakers\ — that entire folder IS your site.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 6: Complete Folder Structure ===== */}
      <PresentationSlide id="folder-structure" title="Complete Folder Structure">
        <Stack gap={12}>
          <H2>The standard web project layout</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Code language="text">{`StudentClubWebsite/
├── index.html          <-- home page
├── about.html
├── events.html
├── gallery.html
├── contact.html
├── images/             <-- all images
│   ├── club-logo.png
│   └── banner.jpg
├── css/                <-- stylesheets
│   └── style.css
├── js/                 <-- scripts
│   └── main.js
└── documents/          <-- PDFs`}</Code>
            <Stack gap={6}>
              <Text tone="secondary">Like a kitchen: pots in one cabinet, plates in another, utensils in a drawer.</Text>
              <Row gap={8}>
                <Tag tone="success">lowercase names</Tag>
                <Tag tone="success">hyphens not spaces</Tag>
              </Row>
              <Callout tone="danger">Create ALL folders BEFORE writing code. Takes 30 seconds, saves hours.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 7: Folder Rules Table ===== */}
      <PresentationSlide id="folder-rules" title="Folder Organization Rules">
        <Stack gap={12}>
          <H2>Six rules for clean folders</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">One root folder per project</Text> — keeps everything contained and portable.</Text>
            <Text><Text as="span" tone="primary">Separate by file type</Text> — images/, css/, js/, documents/.</Text>
            <Text><Text as="span" tone="primary">HTML pages in root only</Text> — everything else goes in subfolders.</Text>
            <Text><Text as="span" tone="primary">Two levels maximum</Text> — root → subfolder → files. No deep nesting.</Text>
            <Text><Text as="span" tone="primary">Lowercase folder names</Text> — avoids case-sensitivity issues on Linux servers.</Text>
            <Text><Text as="span" tone="primary">No spaces in folder names</Text> — spaces become %20 in URLs.</Text>
          </Stack>
          <Callout tone="info">If you need a new folder mid-project, create it immediately. Never dump files in the wrong place.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 7b: Site Setup, Field by Field ===== */}
      <PresentationSlide
        id="site-setup-fields"
        title="Site Setup, Field by Field"
        notes="Self-study note: Walk students through each field of the Dreamweaver CS6 Site Setup dialog. The two required fields are Site Name and Local Site Folder. Everything else can stay at defaults for now. Stress that the local site folder is where all project files must live — if a file is outside this folder, Dreamweaver cannot manage it. Mention the VS Code equivalent so students using either editor feel included."
        background={{ pattern: "dots", accent: t.chart.blue }}
      >
        <Stack gap={12}>
          <H2>Site &gt; New Site — what to type</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Dialog field</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Type it for CodeBreakers</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Why it matters</Text></Text>

            <Text>Site name</Text>
            <Text><Text as="span" tone="primary">codebreakers-club</Text></Text>
            <Text>Shows in the Files panel title</Text>

            <Text>Local site folder</Text>
            <Text><Text as="span" tone="primary">C:\sites\codebreakers</Text></Text>
            <Text>Every link is relative to this folder</Text>
          </Grid>
          <Divider />
          <Stack gap={6}>
            <Text tone="secondary">Leave all other fields at their defaults for now.</Text>
            <Text tone="secondary">Click <Text as="span" tone="primary">Save</Text>. The Files panel now shows your project tree.</Text>
          </Stack>
          <Callout tone="info">VS Code equivalent: File &gt; Open Folder — same idea, fewer fields. Pick the same root folder and the Explorer panel shows your files.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 8: Relative vs Absolute Paths ===== */}
      <PresentationSlide id="paths" title="Relative vs Absolute Paths" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={16}>
          <H2>File paths: relative vs absolute</H2>
          <PathResolver t={t} />
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={4}>
              <Tag tone="success">Relative (ALWAYS use)</Tag>
              <Code language="html">{`<img src="images/logo.png">
<a href="about.html">About</a>`}</Code>
            </Stack>
            <Stack gap={4}>
              <Tag tone="danger">Absolute (NEVER use)</Tag>
              <Code language="html">{`<img src="C:\\Users\\...\\logo.png">
<a href="C:\\...\\about.html">`}</Code>
            </Stack>
          </Grid>
          <Text tone="secondary">Relative paths work after moving folders, sharing projects, or uploading to a server. Absolute paths break.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 9: Path Comparison Table ===== */}
      <PresentationSlide id="path-table" title="Relative vs Absolute: Quick Reference">
        <Stack gap={12}>
          <H2>When to use which?</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Feature</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Relative</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Absolute</Text></Text>

            <Text>Starts from</Text><Text tone="success">Current file</Text><Text>Drive root / domain</Text>
            <Text>Example</Text><Text>images/logo.png</Text><Text>C:\Users\...\logo.png</Text>
            <Text>Works after moving?</Text><Text tone="success">Yes</Text><Text tone="danger">No</Text>
            <Text>Works on server?</Text><Text tone="success">Yes</Text><Text tone="danger">No</Text>
            <Text>Easy to maintain?</Text><Text tone="success">Yes</Text><Text tone="danger">No</Text>
            <Text>Recommended?</Text><Text tone="success">ALWAYS</Text><Text tone="danger">NEVER</Text>
          </Grid>
          <Callout tone="info">The ONLY exception: linking to external resources like Google Fonts via https://...</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 10: The ../ Rule ===== */}
      <PresentationSlide id="dotdot-rule" title="The ../ Rule">
        <Stack gap={12}>
          <H2>The ../ rule — going up a folder</H2>
          <Text>When linking FROM a subfolder, use <Text as="span">../</Text> to go up one level first.</Text>
          <Code language="css">{`/* Inside css/style.css */
header {
    /* Go UP one level, then into images/ */
    background-image: url("../images/banner.jpg");
}`}</Code>
          <DotDotLadder t={t} />
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 11: Path Scenarios Table ===== */}
      <PresentationSlide id="path-scenarios" title="Common Path Scenarios">
        <Stack gap={12}>
          <H2>From where to where?</H2>
          <Stack gap={6}>
            <Text tone="secondary"><Text as="span" tone="primary">From index.html to about.html</Text> → <Text as="span">about.html</Text> (same folder)</Text>
            <Text tone="secondary"><Text as="span" tone="primary">From index.html to images/logo.png</Text> → <Text as="span">images/logo.png</Text> (into subfolder)</Text>
            <Text tone="secondary"><Text as="span" tone="primary">From css/style.css to index.html</Text> → <Text as="span">../index.html</Text> (up one level)</Text>
            <Text tone="secondary"><Text as="span" tone="primary">From css/style.css to images/logo.png</Text> → <Text as="span">../images/logo.png</Text> (up, then down)</Text>
            <Text tone="secondary"><Text as="span" tone="primary">From pages/events.html to index.html</Text> → <Text as="span">../index.html</Text> (up one level)</Text>
          </Stack>
          <Callout tone="warning">If an image does not display, the FIRST thing to check is whether the relative path is correct.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 12: Quick Check ===== */}
      <PresentationSlide id="quick-check" title="Quick Check: Paths">
        <Stack gap={12}>
          <H2>Test yourself</H2>
          <Stack gap={8}>
            <Callout tone="info">You are editing about.html in the root. What is the path to images/team.jpg? (Answer: images/team.jpg)</Callout>
            <Callout tone="info">You are editing css/style.css. What is the path to index.html? (Answer: ../index.html)</Callout>
            <Callout tone="info">Should you ever write C:\Users\... in your HTML? (Answer: NEVER — always use relative paths.)</Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbor for 30 seconds.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Paths ─────────────────────────────────── */}
      <PresentationSlide id="s02-try-paths" title="Try It Now: Fix These Paths" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — fix four broken paths</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">You are editing pages/about.html. Fix these hrefs:</Text>
              <Code language="html">{`<!-- Bug 1: link to home page -->
<a href="index.html">Home</a>

<!-- Bug 2: link to contact page -->
<a href="contact.html">Contact</a>

<!-- Bug 3: link to stylesheet -->
<link rel="stylesheet" href="style.css">

<!-- Bug 4: link to image -->
<img src="images/logo.png" alt="Logo">`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>about.html is inside pages/. To reach index.html, you need to go UP one folder.</Text>
              <Text>contact.html is in the same folder — no ../ needed.</Text>
              <Text>style.css is in css/, which is at the root — need ../css/style.css.</Text>
              <Text>images/ is at the root — need ../images/logo.png.</Text>
              <Callout tone="info">Open each fixed link in the browser. If you see a 404, the path is still wrong.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ===== SLIDE 13: File Naming ===== */}
      <PresentationSlide id="naming" title="File Naming Conventions">
        <Stack gap={12}>
          <H2>Naming rules — non-negotiable</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Row gap={8}><Tag tone="success">lowercase only</Tag><Tag tone="success">hyphens for spaces</Tag></Row>
              <Row gap={8}><Tag tone="success">no special chars</Tag><Tag tone="success">short + descriptive</Tag></Row>
              <Row gap={8}><Tag tone="success">always include extension</Tag><Tag tone="success">index.html = home</Tag></Row>
            </Stack>
            <Stack gap={6}>
              <Text tone="secondary">Correct:</Text>
              <Code language="text">{`about.html
team-photo.jpg
events-news.html`}</Code>
              <Text tone="secondary">Wrong:</Text>
              <Code language="text">{`About.HTML
team photo.jpg
events&news.html`}</Code>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 14: Naming Rules Table ===== */}
      <PresentationSlide id="naming-table" title="Naming Rules Reference">
        <Stack gap={12}>
          <H2>Why each rule matters</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Rule</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Correct</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Why</Text></Text>

            <Text>Lowercase</Text><Text>about-us.html</Text><Text>Linux is case-sensitive</Text>
            <Text>Hyphens</Text><Text>team-photo.jpg</Text><Text>Spaces become %20</Text>
            <Text>No special chars</Text><Text>events.html</Text><Text>#%&@! break URLs</Text>
            <Text>Short names</Text><Text>contact.html</Text><Text>Easier to type</Text>
            <Text>Meaningful</Text><Text>gallery.html</Text><Text>Not page2.html</Text>
            <Text>Extension</Text><Text>style.css</Text><Text>Browser needs it</Text>
          </Grid>
          <Callout tone="danger">Rename files BEFORE linking to them. Changing names later breaks links.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 14b: Naming Rules — Do / Don't ===== */}
      <PresentationSlide
        id="naming-do-dont"
        title="Naming Rules: Do / Don't"
        notes="Self-study note: This slide gives concrete side-by-side examples so students can check their own file names. The three most common mistakes are spaces in names, uppercase letters, and not using index.html for the home page. Remind students that real web servers (Linux) treat About.html and about.html as two different files. For CodeBreakers club, every image should have a meaningful name like club-logo.png, never IMG_0231.JPG."
        background={{ pattern: "grid", accent: t.chart.goldenYellow }}
      >
        <Stack gap={12}>
          <H2>Naming rules — do vs don't</H2>
          <Grid columns="repeat(3, minmax(0,1fr))" gap={4}>
            <Text tone="secondary"><Text as="span" tone="primary">Do</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Don't</Text></Text>
            <Text tone="secondary"><Text as="span" tone="primary">Reason</Text></Text>

            <Text tone="success">about-us.html</Text>
            <Text tone="danger">About Us.HTML</Text>
            <Text>Spaces &amp; uppercase break links on real servers</Text>

            <Text tone="success">images/logo.png</Text>
            <Text tone="danger">IMG_0231.JPG</Text>
            <Text>Meaningful names help you find files later</Text>

            <Text tone="success">index.html</Text>
            <Text tone="danger">home-page.html</Text>
            <Text>Servers look for index.html automatically</Text>

            <Text tone="success">team-photo.jpg</Text>
            <Text tone="danger">team photo.jpg</Text>
            <Text>Spaces become %20 in URLs — broken links</Text>

            <Text tone="success">events.html</Text>
            <Text tone="danger">events&amp;news.html</Text>
            <Text>Special chars (#%&amp;@!) have URL meanings</Text>
          </Grid>
          <Callout tone="danger">Rename files BEFORE linking to them. Changing names later breaks every link that points to that file.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 15: Git Basics ===== */}
      <PresentationSlide id="git-basics" title="Git & GitHub Basics" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>Version control with Git</H2>
          <GitFlow t={t} />
          <Code language="bash">{`git init                                    # Start tracking
git add .                                   # Stage all changes
git commit -m "Add navigation to all pages" # Save snapshot
git remote add origin https://github.com/...
git push -u origin main                     # Upload to GitHub`}</Code>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 16: Git Terms Table ===== */}
      <PresentationSlide id="git-terms" title="Git Vocabulary">
        <Stack gap={12}>
          <H2>Key terms explained</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Repository (repo)</Text> — A project tracked by Git. Like a photo album.</Text>
            <Text><Text as="span" tone="primary">Commit</Text> — A saved snapshot. Like a photo in the album.</Text>
            <Text><Text as="span" tone="primary">Stage</Text> — Changes ready to be committed. Photos laid out before adding to album.</Text>
            <Text><Text as="span" tone="primary">Push</Text> — Upload commits to GitHub. Sending photos to cloud storage.</Text>
            <Text><Text as="span" tone="primary">Pull</Text> — Download commits from GitHub. Getting photos from cloud.</Text>
            <Text><Text as="span" tone="primary">Clone</Text> — Download an entire repo. Copying someone's photo album.</Text>
          </Stack>
          <Callout tone="info">Git is optional for this course but HIGHLY recommended. Commit early and often!</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 17: Consistent Navigation ===== */}
      <PresentationSlide id="navigation" title="Consistent Navigation">
        <Stack gap={12}>
          <H2>Same nav menu on every page</H2>
          <Code language="html">{`<nav>
  <ul>
    <li><a href="index.html" class="active">Home</a></li>
    <li><a href="about.html">About Us</a></li>
    <li><a href="events.html">Events</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>`}</Code>
          <Text>Move <Text as="span">class="active"</Text> to the current page link on each file. Test EVERY link on EVERY page.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 18: Worked Example 1 — From Root ===== */}
      <PresentationSlide id="worked-example-1" title="Worked Example 1: Paths from Root">
        <Stack gap={10}>
          <H2>Linking images and CSS from index.html</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<!-- Inside index.html (root folder) -->
<head>
  <link rel="stylesheet"
        href="css/style.css">
</head>
<body>
  <img src="images/event-workshop.jpg"
       alt="Web Design Workshop"
       width="400" height="300">
</body>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">href="css/style.css"</Text> — index.html is in root, css/ is a subfolder. Just go INTO css/.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">src="images/event-workshop.jpg"</Text> — same logic: root → images/ subfolder.</Text>
              <Text tone="secondary">No ../ needed because we are starting from the root folder.</Text>
              <Divider />
              <Callout tone="info">Rule: When the source file is in the root, paths to subfolders never start with ../</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 19: Worked Example 2 — Multi-Page Links ===== */}
      <PresentationSlide id="worked-example" title="Worked Example 2: Multi-Page Links">
        <Stack gap={10}>
          <H2>Two pages linked together</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Code language="html">{`<!-- index.html -->
<nav>
  <ul>
    <li><a href="index.html"
           class="active">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>

<!-- about.html (same nav!) -->
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html"
           class="active">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>`}</Code>
            <Stack gap={6}>
              <Text tone="secondary"><Text as="span" tone="primary">Same nav block</Text> — copy-paste the exact same &lt;nav&gt; into every page so users never get lost.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">class="active"</Text> — move this to the current page's link so visitors know where they are.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">href="about.html"</Text> — relative path: both files are in the root folder, so just use the filename.</Text>
              <Text tone="secondary"><Text as="span" tone="primary">&lt;title&gt;</Text> — different on each page for SEO and usability.</Text>
              <Divider />
              <Callout tone="info">Test every link on every page! Click Home, About, Contact from each page. Fix any broken links before moving on.</Callout>
              <Text tone="secondary">From a subfolder like css/, use <Text as="span">../index.html</Text> to go up first.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 20: Discussion Prompt ===== */}
      <PresentationSlide id="discussion" title="Discussion: Why Same Nav Everywhere?">
        <Stack gap={12}>
          <H2>Why must every page have the same navigation?</H2>
          <Stack gap={8}>
            <Text>Imagine a store where the exit sign moves to a different wall on every floor.</Text>
            <Text>Users expect consistent navigation. If links change, they get lost and leave.</Text>
            <Text>Copy-paste the &lt;nav&gt; block into every page. Later we will learn techniques to avoid repetition.</Text>
          </Stack>
          <Callout tone="info">For now, manual copying is perfectly fine. Focus on getting it right.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 21: Common Mistakes ===== */}
      <PresentationSlide id="common-mistakes" title="Common Mistakes">
        <Stack gap={12}>
          <H2>Watch out for these mistakes</H2>
          <Stack gap={8}>
            <Callout tone="danger">Using absolute paths (C:\...) in HTML — breaks when you move the folder</Callout>
            <Callout tone="danger">Forgetting ../ when linking from a subfolder — browser looks in wrong place</Callout>
            <Callout tone="danger">Inconsistent file names (About.html vs about.html) — Linux servers are case-sensitive</Callout>
            <Callout tone="danger">Different nav menus on different pages — users get stuck</Callout>
            <Callout tone="danger">Skipping site definition in Dreamweaver — paths and file panel won't work</Callout>
            <Callout tone="danger">Forgetting to save before previewing — browser shows the OLD version</Callout>
            <Callout tone="danger">No .gitignore — OS temp files clutter your repository</Callout>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 21b: Self-Study Check ===== */}
      <PresentationSlide
        id="self-study-check"
        title="Self-Study Check"
        notes="Answer key: 1) Site name and Local site folder. 2) False — the site folder lives on YOUR computer; you upload later. 3) Spaces become %20 in URLs, causing broken links on real servers. 4) index.html — web servers serve it automatically when a visitor types only the domain. 5) In an images/ subfolder inside the site root folder."
        background={{ pattern: "spotlight", accent: t.chart.green }}
      >
        <Stack gap={12}>
          <H2>Can you answer these?</H2>
          <Stack gap={8}>
            <Text><Text as="span" tone="primary">1.</Text> What two things does Site &gt; New Site ask for?</Text>
            <Text><Text as="span" tone="primary">2.</Text> True or false: the site folder must live on a web server.</Text>
            <Text><Text as="span" tone="primary">3.</Text> Why should file names never contain spaces?</Text>
            <Text><Text as="span" tone="primary">4.</Text> Which file opens by default when a visitor types only the domain?</Text>
            <Text><Text as="span" tone="primary">5.</Text> Where should images live inside your project?</Text>
          </Stack>
          <Divider />
          <Text tone="secondary">Answers are in the speaker notes. If you missed any, re-read the matching slide above.</Text>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 22: In-Class Practice ===== */}
      <PresentationSlide id="practice" title="In-Class Practice" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={12}>
          <H2>In-class practice (exercises/session-02/)</H2>
          <Stack gap={8}>
            <H3>Task 1: Create Your Site Folder Structure</H3>
            <Text>Build club-website/ with index.html, about.html, images/, css/, and pages/ subfolders. Register the site in Dreamweaver.</Text>
            <H3>Task 2: Learn File Naming Conventions</H3>
            <Text>Rename files to follow rules: lowercase only, hyphens instead of spaces, no special characters, correct extensions.</Text>
            <H3>Task 3: Understand Relative Paths</H3>
            <Text>Practice same-folder links, subfolder links, and ../ parent links. Add navigation code to pages/events.html.</Text>
            <H3>Task 4: Build Basic Pages with Navigation Links</H3>
            <Text>Create index.html, about.html, and pages/contact.html with working relative links between all pages.</Text>
          </Stack>
          <Callout tone="info">Estimated time: 50 minutes.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 23: Practice Tips ===== */}
      <PresentationSlide id="practice-tips" title="Practice Tips">
        <Stack gap={12}>
          <H2>Tips for the in-class tasks</H2>
          <Stack gap={6}>
            <Text><Text as="span" tone="primary">Create folders first</Text>, then create files inside them. Do not create files in the wrong place.</Text>
            <Text><Text as="span" tone="primary">Check every link</Text> by clicking it in the browser. Broken link = wrong path.</Text>
            <Text><Text as="span" tone="primary">From pages/ subfolder</Text>, remember ../ to reach files in the root.</Text>
            <Text><Text as="span" tone="primary">Verify file names</Text> are lowercase with hyphens before linking to them.</Text>
          </Stack>
          <Callout tone="warning">Stuck? Draw the folder tree on paper and trace the path with your finger.</Callout>
        </Stack>
      </PresentationSlide>
      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s02-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>Every link below is broken. Why?</H2>
          <Code language="html">{`<!-- File: pages/about.html -->
<a href="/index.html">Home</a>
<a href="pages/contact.html">Contact</a>
<img src="C:\\Users\\Nam\\site\\images\\logo.png" alt="Logo">
<link rel="stylesheet" href="style.css">`}</Code>
          <Divider />
          <Stack gap={4}>
            <Row gap={8}><Pill>Link 1</Pill><Text>/index.html means the server root. Opened locally that resolves to your C: drive. Use ../index.html</Text></Row>
            <Row gap={8}><Pill>Link 2</Pill><Text>We are already inside pages/, so pages/contact.html looks for pages/pages/. Use contact.html</Text></Row>
            <Row gap={8}><Pill>Image</Pill><Text>An absolute Windows path only works on your machine. Use ../images/logo.png</Text></Row>
            <Row gap={8}><Pill>CSS</Pill><Text>style.css is not in pages/. Use ../css/style.css</Text></Row>
          </Stack>
          <Callout tone="info">Rule of thumb: count how many folders up you must climb, then write that many ../ before the path.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Accessibility & Structure ────────────────────────── */}
      <PresentationSlide id="s02-accessibility" title="Accessibility: Structure That Helps Everyone">
        <Stack gap={12}>
          <H2>Folder and Naming Choices Are Accessibility Choices</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Names</Pill><Text>about-us.html reads clearly in a screen reader&apos;s URL announcement; page2.html tells the user nothing.</Text></Row>
            <Row gap={8}><Pill>Case</Pill><Text>Use lowercase everywhere. Linux servers are case-sensitive, so About.html works locally and 404s live.</Text></Row>
            <Row gap={8}><Pill>Spaces</Pill><Text>Spaces become %20 in URLs — ugly and error-prone. Use hyphens: student-club.html</Text></Row>
            <Row gap={8}><Pill>Nav order</Pill><Text>Keep nav links in the same order on every page. Users navigating by keyboard memorise the tab count.</Text></Row>
            <Row gap={8}><Pill>index.html</Pill><Text>Servers serve index.html automatically, so the user can type just the folder name. Any other name forces the full path.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="warning">A broken link is the most common accessibility failure in student projects, and the easiest to prevent.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s02-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>The folder tree matches the diagram: index.html at root, plus css/, images/, and pages/.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Every file name is lowercase with hyphens — no spaces, no capitals, no My Page (1).html</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>Clicking each nav link from every page lands on the right file. No file:/// errors.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>The stylesheet loads: change body background to red, reload, and confirm you see it.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">Press F12 and open the Network tab. Any red 404 row is a path you still need to fix.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ───────────────────────────────────────── */}
      <PresentationSlide id="s02-assignment" title="Assignment: Site Skeleton">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>A complete site folder for your Student Club Website: index.html, pages/about.html, pages/contact.html, css/style.css, and images/.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>All three pages link to each other with relative paths only.</Text>
              <Text>All three pages link the same css/style.css.</Text>
              <Text>Every file and folder name is lowercase with no spaces.</Text>
              <Text>At least one image loads correctly from images/.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Click all 9 link paths (3 pages × 3 nav links).</Text>
              <Text>Check the Network tab for 404s on CSS and images.</Text>
              <Text>Confirm no href starts with / or with C:\</Text>
              <Callout tone="warning">Get the folder structure right now. Restructuring after ten pages exist means rewriting every path in the site.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>



      {/* ===== SLIDE 24: Homework ===== */}
      <PresentationSlide id="homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework 2 (homework/session-02/)</H2>
          <Stack gap={8}>
            <Text><Text as="span">Setting Up Your Project Folder</Text> — create the full project structure you'll use all semester.</Text>
            <Text>Task 1: Create a <Text as="span">project/</Text> folder with index.html, pages/about.html, and pages/contact.html. Follow naming conventions.</Text>
            <Text>Task 2: Add at least 2 images with alt text in the images/ folder. Reference them from index.html using relative paths.</Text>
            <Divider />
            <Row gap={8}>
              <Tag tone="danger">Due: Sunday 23:59</Tag>
              <Tag tone="info">Submit via course platform</Tag>
            </Row>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ===== SLIDE 25: Recap & Next ===== */}
      <PresentationSlide id="recap" title="Recap & Next Session" background={{ pattern: "aurora", accent: t.chart.green, accentSecondary: t.chart.blue }}>
        <Stack gap={12}>
          <H2>Recap</H2>
          <Stack gap={6}>
            <Text>Define your site BEFORE creating any pages</Text>
            <Text>Use relative paths exclusively — never C:\ paths in HTML</Text>
            <Text>../ goes up one folder level when linking from subfolders</Text>
            <Text>Lowercase, hyphens, no spaces, no special characters</Text>
            <Text>Same navigation menu on every page</Text>
            <Text>Git tracks changes — commit early and often</Text>
          </Stack>
          <Divider />
          <H3>Next: Session 3</H3>
          <Text tone="secondary">Working with text &amp; images — headings, lists, img + alt, image formats.</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
