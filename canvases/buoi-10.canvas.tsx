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
  PresentationSlide,
  Row,
  Stack,
  Tag,
  Text,
  useHostTheme,
  type CanvasTokens,
} from "qoder/canvas";

/* ============================================================================
   INS2053 — TEACHING DIAGRAM KIT (Session 10: video, audio and embeds)
   blue = structure / the markup you write
   goldenYellow = an action, a request, "look here"
   green = a result / correct / what the user finally sees
   brightOrange = a warning / wrong / deprecated
   Type floor: every label a student must read is >= 11px in a ~560 viewBox.
   ========================================================================== */

const ON_FILL = "#0B1220";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/* ---------- SVG 1: the video element, taken apart ---------- */

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
      <rect x="18" y="36" width="248" height="112" rx="4" fill={t.bg.editor} />
      <circle cx="142" cy="92" r="24" fill={t.chart.goldenYellow} opacity="0.92" />
      <path d="M134 80 l20 12 l-20 12 z" fill={ON_FILL} />
      <text x="142" y="132" textAnchor="middle" fontSize="11" fill={t.text.secondary}>poster="images/poster.jpg"</text>

      {/* control bar */}
      <rect x="18" y="152" width="248" height="24" rx="3" fill={t.bg.elevated} />
      <path d="M26 158 l8 6 l-8 6 z" fill={t.text.primary} />
      <line x1="42" y1="164" x2="196" y2="164" stroke={t.stroke.secondary} strokeWidth="3" />
      <line x1="42" y1="164" x2="96" y2="164" stroke={t.chart.goldenYellow} strokeWidth="3" />
      <circle cx="96" cy="164" r="4" fill={t.chart.goldenYellow} />
      <text x="210" y="168" fontSize="11" fontFamily={MONO} fill={t.text.primary}>1:24</text>
      <text x="252" y="168" textAnchor="middle" fontSize="11" fill={t.text.primary}>[ ]</text>
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
      <text x="20" y="220" fontSize="12" fontFamily={MONO} fill={t.chart.green}>&lt;video controls width="640"</text>
      <text x="34" y="236" fontSize="12" fontFamily={MONO} fill={t.chart.green}>  poster="images/poster.jpg"&gt;</text>
      <text x="34" y="252" fontSize="12" fontFamily={MONO} fill={t.chart.goldenYellow}>&lt;source src="video/promo.mp4"</text>
      <text x="34" y="266" fontSize="12" fontFamily={MONO} fill={t.chart.goldenYellow}>  type="video/mp4"&gt;</text>

      <text x="20" y="290" fontSize="12" fill={t.text.primary}>Fallback &lt;p&gt; is hidden unless no format works.</text>
      <text x="20" y="306" fontSize="12" fill={t.text.primary}>It provides a download link as last resort.</text>
    </svg>
  );
}

/* ---------- SVG 2: how the browser chooses a source ---------- */

function CodecFallback({ t }: { t: CanvasTokens }) {
  const scan = [
    ["1", 'promo.mp4', 'video/mp4', "Can I play this?  YES", "Plays it. Stops scanning.", t.chart.green],
    ["2", 'promo.webm', 'video/webm', "Never asked", "Already solved.", t.text.tertiary],
    ["3", '<p> fallback', "-", "Only if none matched", "Download link saves the day.", t.chart.goldenYellow],
  ] as const;

  const formats = [
    ["MP4 / H.264", "Every browser, every phone", "Put it FIRST", t.chart.green],
    ["WebM / VP9", "About 30% smaller file", "Put it second", t.chart.blue],
    ["Ogg / Theora", "Nothing needs it any more", "Skip it", t.chart.brightOrange],
  ] as const;

  return (
    <svg viewBox="0 0 560 324" width="100%" height="324" role="img"
      aria-label="The browser reads source elements top to bottom, asks whether it can play the type given, and stops at the first yes, so the second file is never downloaded. Without a type attribute the browser must begin downloading each file to find out. A table shows MP4 first, WebM second and Ogg skipped.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>The browser reads your sources top to bottom and stops at the first YES.</text>

      {/* ---- the scan ---- */}
      <rect x="6" y="22" width="548" height="118" rx="8" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
      {scan.map(([n, file, type, question, verdict, ink], i) => (
        <g key={"sc" + i}>
          <circle cx="26" cy={48 + i * 34} r="11" fill={ink as string} />
          <text x="26" y={52 + i * 34} textAnchor="middle" fontSize="12" fontWeight="700" fill={ON_FILL}>{n}</text>
          <text x="44" y={45 + i * 34} fontSize="11.5" fontFamily={MONO} fill={t.text.primary}>{file}</text>
          <text x="44" y={57 + i * 34} fontSize="11" fontFamily={MONO} fill={t.text.tertiary}>{type}</text>
          <text x="182" y={45 + i * 34} fontSize="11.5" fontWeight="700" fill={ink as string}>{question}</text>
          <text x="182" y={57 + i * 34} fontSize="11" fill={t.text.secondary}>{verdict}</text>
          <line x1="176" y1={34 + i * 34} x2="176" y2={62 + i * 34} stroke={t.stroke.tertiary} />
        </g>
      ))}
      <text x="400" y="132" textAnchor="middle" fontSize="11" fontWeight="700" fill={t.chart.green}>One video plays. One file crosses the network.</text>

      {/* ---- type present vs absent ---- */}
      <rect x="6" y="150" width="268" height="78" rx="7" fill={t.chart.green} opacity="0.12" />
      <text x="18" y="166" fontSize="11.5" fontWeight="700" fill={t.chart.green}>With type=, it is a question</text>
      <text x="18" y="182" fontSize="11" fontFamily={MONO} fill={t.text.primary}>type="video/webm"</text>
      <text x="18" y="198" fontSize="11" fill={t.text.secondary}>Safari answers NO instantly and</text>
      <text x="18" y="212" fontSize="11" fill={t.text.secondary}>moves to the next line. Nothing</text>
      <text x="18" y="224" fontSize="11" fill={t.text.secondary}>was downloaded to find out.</text>

      <rect x="286" y="150" width="268" height="78" rx="7" fill={t.chart.brightOrange} opacity="0.12" />
      <text x="298" y="166" fontSize="11.5" fontWeight="700" fill={t.chart.brightOrange}>Without type=, it is a gamble</text>
      <text x="298" y="182" fontSize="11" fontFamily={MONO} fill={t.text.tertiary}>&lt;source src="promo.webm"&gt;</text>
      <text x="298" y="198" fontSize="11" fill={t.text.secondary}>The browser must start fetching</text>
      <text x="298" y="212" fontSize="11" fill={t.text.secondary}>the file before it can tell. On</text>
      <text x="298" y="224" fontSize="11" fill={t.text.secondary}>mobile data that is your fault.</text>

      {/* ---- the format table ---- */}
      {formats.map(([name, why, verdict, ink], i) => (
        <g key={"ft" + i}>
          <rect x="6" y={240 + i * 26} width="548" height="22" rx="4" fill={ink as string} opacity={i % 2 === 0 ? 0.16 : 0.1} />
          <text x="18" y={255 + i * 26} fontSize="11.5" fontFamily={MONO} fontWeight="700" fill={t.text.primary}>{name}</text>
          <text x="150" y={255 + i * 26} fontSize="11.5" fill={t.text.secondary}>{why}</text>
          <text x="542" y={255 + i * 26} textAnchor="end" fontSize="11.5" fontWeight="700" fill={ink as string}>{verdict}</text>
        </g>
      ))}
      <text x="6" y="320" fontSize="11" fill={t.text.tertiary}>Compress first: HandBrake turns 40 MB into 4 MB.</text>
    </svg>
  );
}

/* ---------- SVG 3: the autoplay rules, and the audio widget ---------- */

function AutoplayRules({ t }: { t: CanvasTokens }) {
  const cases = [
    ["<video autoplay>", "BLOCKED", "Sound without permission. Every", "browser refuses. Frozen frame.", false],
    ["<video autoplay muted>", "PLAYS", "Silent, so nothing is forced on", "anyone. This is the deal.", true],
    ["<video autoplay muted playsinline>", "PLAYS on iOS", "Without playsinline an iPhone", "hijacks the whole screen.", true],
  ] as const;

  return (
    <svg viewBox="0 0 560 322" width="100%" height="322" role="img"
      aria-label="Autoplay with sound is blocked by every browser, autoplay with muted is allowed, and autoplay muted plus playsinline is needed so an iPhone does not take the video fullscreen. Below, the rule that autoplay is only for decoration, and the ways an audio element differs from a video element.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>Autoplay with sound is blocked everywhere. No workaround exists.</text>

      {cases.map(([code, verdict, l1, l2, ok], i) => {
        const ink = ok ? t.chart.green : t.chart.brightOrange;
        const y = 24 + i * 58;
        return (
          <g key={"ap" + i}>
            <rect x="6" y={y} width="548" height="52" rx="7" fill={ink} opacity="0.12" />
            <text x="18" y={y + 20} fontSize="11.5" fontFamily={MONO} fontWeight="700" fill={t.text.primary}>{code}</text>
            <text x="18" y={y + 34} fontSize="11" fill={t.text.secondary}>{l1}</text>
            <text x="18" y={y + 46} fontSize="11" fill={t.text.secondary}>{l2}</text>

            {/* mini player */}
            <rect x="326" y={y + 8} width="96" height="36" rx="4" fill={ON_FILL} />
            {ok ? (
              <g>
                <path d="M348 0 l10 6 l-10 6 z" fill={t.chart.green} transform={`translate(0 ${y + 20})`} />
                <line x1="366" y1={y + 26} x2="412" y2={y + 26} stroke={t.stroke.secondary} strokeWidth="3" />
                <line x1="366" y1={y + 26} x2="392" y2={y + 26} stroke={t.chart.green} strokeWidth="3" />
                <text x="374" y={y + 40} fontSize="11" fill={t.text.secondary}>playing</text>
              </g>
            ) : (
              <g>
                <line x1="342" y1={y + 18} x2="406" y2={y + 34} stroke={t.chart.brightOrange} strokeWidth="2.5" />
                <text x="374" y={y + 30} textAnchor="middle" fontSize="11" fontWeight="700" fill={t.chart.brightOrange}>frozen</text>
              </g>
            )}
            <text x="440" y={y + 30} fontSize="12" fontWeight="700" fill={ink}>{verdict}</text>
          </g>
        );
      })}

      {/* ---- when autoplay is even allowed to be your choice ---- */}
      <rect x="6" y="204" width="548" height="60" rx="7" fill={t.chart.goldenYellow} opacity="0.14" />
      <text x="18" y="222" fontSize="12" fontWeight="700" fill={t.text.primary}>Muted autoplay is for decoration only.</text>
      <text x="18" y="238" fontSize="11.5" fill={t.text.secondary}>If the video carries the message, give a play button.</text>
      <text x="18" y="254" fontSize="11.5" fill={t.text.secondary}>Respect prefers-reduced-motion: a looping background makes some people ill.</text>

      {/* ---- audio is not video ---- */}
      <rect x="6" y="272" width="548" height="44" rx="7" fill={t.chart.blue} opacity="0.12" />
      <text x="18" y="290" fontSize="12" fontWeight="700" fill={t.text.primary}>&lt;audio&gt; is the same pattern with three attributes removed.</text>
      <text x="18" y="306" fontSize="11.5" fill={t.text.secondary}>No width/height/poster — browser draws a fixed widget. Lead with MP3.</text>
    </svg>
  );
}

/* ---------- SVG 4: embedding someone else's video with an iframe ---------- */

function IframeEmbed({ t }: { t: CanvasTokens }) {
  const chips = [
    ['title="..."', "A screen reader reads it.", 'Without it: just "iframe".', 6, 176],
    ["allowfullscreen", "The fullscreen button", "does nothing without it.", 190, 176],
    ['loading="lazy"', "Not fetched until it", "scrolls into view.", 374, 180],
  ] as const;

  return (
    <svg viewBox="0 0 560 364" width="100%" height="364" role="img"
      aria-label="To embed a YouTube video you must change the watch question-mark-v URL into an embed URL, because YouTube refuses to be framed from the address-bar URL. Every embed also needs a title, allowfullscreen and lazy loading, plus a wrapper with padding-bottom 56.25 percent so the iframe keeps a sixteen-by-nine shape at every width.">
      <text x="280" y="14" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={t.text.primary}>You cannot embed the address-bar URL. Change it.</text>

      {/* ---- the wrong URL ---- */}
      <rect x="6" y="22" width="548" height="44" rx="7" fill={t.chart.brightOrange} opacity="0.12" />
      <text x="18" y="39" fontSize="12" fontWeight="700" fill={t.chart.brightOrange}>Wrong - the URL you copied out of the address bar</text>
      <text x="18" y="56" fontSize="11" fontFamily={MONO} fill={t.text.primary}>{'src="https://youtube.com/watch?v=OQSNhk5ICTI"'}</text>
      <text x="352" y="39" fontSize="11" fill={t.text.secondary}>You get an empty grey box.</text>
      <text x="352" y="56" fontSize="11" fill={t.text.secondary}>YouTube refuses to be framed.</text>

      {/* ---- the right URL ---- */}
      <rect x="6" y="70" width="548" height="44" rx="7" fill={t.chart.green} opacity="0.12" />
      <text x="18" y="87" fontSize="12" fontWeight="700" fill={t.chart.green}>{"Right - swap /watch?v= for /embed/"}</text>
      <text x="18" y="104" fontSize="11" fontFamily={MONO} fill={t.text.primary}>{'src="https://www.youtube.com/embed/OQSNhk5ICTI"'}</text>
      <text x="352" y="87" fontSize="11" fill={t.text.secondary}>The player appears.</text>
      <text x="352" y="104" fontSize="11" fill={t.text.secondary}>Same video, framable URL.</text>

      {/* ---- the whole tag ---- */}
      <rect x="6" y="118" width="548" height="68" rx="7" fill={ON_FILL} />
      <text x="18" y="134" fontSize="11" fill={t.text.secondary}>The whole tag - three things every embed needs:</text>
      <text x="18" y="151" fontSize="11" fontFamily={MONO} fill={t.text.primary}>{'<iframe src="https://www.youtube.com/embed/OQSNhk5ICTI"'}</text>
      <text x="18" y="164" fontSize="11" fontFamily={MONO} fill={t.chart.goldenYellow}>{'        title="How to upload with FileZilla"'}</text>
      <text x="18" y="177" fontSize="11" fontFamily={MONO} fill={t.chart.goldenYellow}>{'        allowfullscreen loading="lazy"></iframe>'}</text>

      {/* ---- the three required attributes ---- */}
      {chips.map(([code, l1, l2, x, w], i) => (
        <g key={"ch" + i}>
          <rect x={x} y="192" width={w} height="56" rx="7" fill={t.fill.tertiary} stroke={t.stroke.tertiary} />
          <rect x={x} y="192" width="4" height="56" fill={t.chart.blue} />
          <text x={x + 14} y="211" fontSize="11" fontFamily={MONO} fontWeight="700" fill={t.chart.blue}>{code}</text>
          <text x={x + 14} y="227" fontSize="11" fill={t.text.secondary}>{l1}</text>
          <text x={x + 14} y="240" fontSize="11" fill={t.text.secondary}>{l2}</text>
        </g>
      ))}

      {/* ---- keeping 16:9 at every width ---- */}
      <rect x="6" y="254" width="548" height="92" rx="7" fill={t.chart.blue} opacity="0.12" />
      <text x="18" y="272" fontSize="12" fontWeight="700" fill={t.text.primary}>Iframes have a fixed size. Wrap to keep 16:9 ratio.</text>
      <rect x="14" y="280" width="310" height="58" rx="5" fill={ON_FILL} />
      <text x="22" y="294" fontSize="11" fontFamily={MONO} fill={t.chart.green}>{".ratio { position: relative;"}</text>
      <text x="22" y="307" fontSize="11" fontFamily={MONO} fill={t.chart.goldenYellow}>{"  padding-bottom: 56.25%; height: 0; }"}</text>
      <text x="22" y="320" fontSize="11" fontFamily={MONO} fill={t.chart.green}>{".ratio iframe { position: absolute;"}</text>
      <text x="22" y="333" fontSize="11" fontFamily={MONO} fill={t.text.primary}>{"  inset: 0; width: 100%; height: 100%; }"}</text>
      <text x="336" y="296" fontSize="12" fontWeight="700" fill={t.chart.green}>{"9 / 16 = 0.5625"}</text>
      <text x="336" y="312" fontSize="11" fill={t.text.secondary}>{"= 56.25% of the WIDTH,"}</text>
      <text x="336" y="328" fontSize="11" fill={t.text.secondary}>{"so height follows width."}</text>

      <text x="18" y="358" fontSize="11.5" fill={t.text.tertiary}>Use youtube-nocookie.com to stop tracking cookies.</text>
    </svg>
  );
}

export default function Session10Lecture() {
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
        id="s10-title"
        title="Session 10 — Multimedia"
        notes="Welcome to Session 10. Today we embed video and audio using HTML5 — Flash is dead."
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.blue, accentSecondary: t.chart.goldenYellow }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">INS2053 · Session 10 · 3 periods</Tag>
          <H1>Embedding Video &amp; Audio</H1>
          <Text tone="secondary">HTML5 multimedia for the modern web — Flash is gone forever.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 2: Objectives ────────────────────────────────── */}
      <PresentationSlide id="s10-objectives" title="Learning Objectives">
        <Stack gap={12}>
          <H2>By the end of this session you will…</H2>
          <Stack gap={6}>
            <Text>Explain why Adobe Flash was discontinued (Dec 2020)</Text>
            <Text>Embed video with <Text as="span">&lt;video&gt;</Text> + controls, poster, preload</Text>
            <Text>Provide multiple formats via <Text as="span">&lt;source&gt;</Text> for cross-browser support</Text>
            <Text>Embed audio with <Text as="span">&lt;audio&gt;</Text> and fallback text</Text>
            <Text>Embed YouTube/Vimeo via responsive <Text as="span">&lt;iframe&gt;</Text></Text>
            <Text>Add a Media page to the Student Club Website</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 3: Agenda / Timeline ─────────────────────────── */}
      <PresentationSlide id="s10-agenda" title="Today's Agenda">
        <Stack gap={12}>
          <H2>150-Minute Session Plan</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Warm-up recap from Session 9</Text></Row>
              <Row gap={8}><Tag tone="info">50 min</Tag><Text>Theory: video, audio, iframe embeds</Text></Row>
              <Row gap={8}><Tag tone="info">50 min</Tag><Text>In-class practice (5 tasks)</Text></Row>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Tag tone="info">10 min</Tag><Text>Homework briefing</Text></Row>
              <Row gap={8}><Tag tone="info">5 min</Tag><Text>Recap &amp; next session preview</Text></Row>
              <Row gap={8}><Tag tone="info">25 min</Tag><Text>Buffer / Q&amp;A / catch-up time</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="info">Practice starts after theory. Have your club-website folder open in VS Code and media files ready in images/.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 4: Warm-Up Recap ─────────────────────────────── */}
      <PresentationSlide id="s10-warmup" title="Warm-Up Recap">
        <Stack gap={12}>
          <H2>Quick Recall — Session 9</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">Q1:</Text> What is the first CSS property you should set on any table?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q2:</Text> After adding <Text as="span">rowspan="2"</Text>, what must you do to the next row?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">Q3:</Text> Why should tables never be used for page layout?
            </Callout>
          </Stack>
          <Text tone="secondary">Discuss with your neighbour for 2 minutes, then share answers.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 5: Flash is Dead ─────────────────────────────── */}
      <PresentationSlide id="s10-flash" title="Flash Is Dead">
        <Stack gap={12}>
          <H2>The Rise &amp; Fall of Flash</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text>Flash powered early YouTube, games, and ads for two decades.</Text>
              <Text tone="secondary">Killed by security holes, poor mobile performance, inaccessibility, and the rise of open HTML5 standards.</Text>
            </Stack>
            <Stack gap={4}>
              <Row gap={8}><Pill>2010</Pill><Text>Apple blocks Flash on iOS</Text></Row>
              <Row gap={8}><Pill>2015</Pill><Text>YouTube switches to HTML5</Text></Row>
              <Row gap={8}><Pill>2020</Pill><Text>Adobe kills Flash Player</Text></Row>
              <Row gap={8}><Pill>2021+</Pill><Text>No browser runs Flash</Text></Row>
            </Stack>
          </Grid>
          <Callout tone="danger">Never use Flash for any new project. It is completely dead.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 6: <video> Element ───────────────────────────── */}
      <PresentationSlide id="s10-video" title="The video Element" background={{ pattern: "grid", accent: t.chart.blue }}>
        <Stack gap={12}>
          <H2>HTML5 <Text as="span">&lt;video&gt;</Text></H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <VideoAnatomy t={t} />
            <Stack gap={6}>
              <Text>Built-in browser feature — no plugins needed.</Text>
              <Text>Key attributes:</Text>
              <Row gap={6}>
                <Tag tone="success">controls</Tag>
                <Tag tone="success">poster</Tag>
                <Tag tone="success">preload</Tag>
                <Tag tone="success">width</Tag>
              </Row>
              <Text tone="secondary">Always include fallback text with a download link inside the tag.</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 7: Video Attributes Reference ────────────────── */}
      <PresentationSlide id="s10-video-attrs" title="Video Attributes Reference">
        <Stack gap={12}>
          <H2>All &lt;video&gt; Attributes at a Glance</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={4}>
              <Text fontWeight="700">Essential</Text>
              <Text><Text as="span">controls</Text> — show play bar (always add this)</Text>
              <Text><Text as="span">width</Text> — player width in pixels</Text>
              <Text><Text as="span">poster</Text> — thumbnail before play</Text>
              <Text><Text as="span">preload="metadata"</Text> — fetch length only</Text>
            </Stack>
            <Stack gap={4}>
              <Text fontWeight="700">Optional</Text>
              <Text><Text as="span">autoplay</Text> — requires muted</Text>
              <Text><Text as="span">muted</Text> — start without sound</Text>
              <Text><Text as="span">loop</Text> — repeat when finished</Text>
              <Text><Text as="span">playsinline</Text> — prevent iOS fullscreen</Text>
            </Stack>
          </Grid>
          <Callout tone="warning">Boolean attributes (controls, muted, loop) need no value. Just write the name: &lt;video controls muted&gt;.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 8: Source & Codec Selection ──────────────────── */}
      <PresentationSlide id="s10-codec" title="Source & Codec Selection" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={12}>
          <H2>How the Browser Chooses a Format</H2>
          <CodecFallback t={t} />
          <Callout tone="info">Always put type= on every source. Without it the browser downloads each file to check — wasting bandwidth on mobile.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 9: Format Comparison Table ───────────────────── */}
      <PresentationSlide id="s10-formats" title="Media Format Comparison">
        <Stack gap={12}>
          <H2>Which Formats to Use</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Video formats</Text>
              <Text><Text as="span">MP4 (H.264)</Text> — universal, always first</Text>
              <Text><Text as="span">WebM (VP9)</Text> — 30% smaller, second choice</Text>
              <Text tone="danger"><Text as="span">Ogg (Theora)</Text> — obsolete, skip it</Text>
              <Text tone="secondary">Compress with HandBrake before uploading.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Audio formats</Text>
              <Text><Text as="span">MP3</Text> — works everywhere, always first</Text>
              <Text><Text as="span">OGG</Text> — better quality, not universal</Text>
              <Text tone="secondary">Keep audio under 5 MB. Use Audacity to compress.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Rule of thumb: MP4 + WebM for video, MP3 + OGG for audio. Two sources cover every browser.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 10: Worked Example — Video + Audio ───────────── */}
      <PresentationSlide id="s10-video-code" title="Worked Example: Video + Audio">
        <Stack gap={8}>
          <H2>Complete video with poster, controls &amp; fallback</H2>
          <Code language="html">{`<section class="media-section">
  <h3>Watch Our Promo Video</h3>
  <video controls width="640" height="360"
         poster="images/promo-thumb.jpg"
         preload="metadata">
    <source src="video/club-promo.mp4"
            type="video/mp4">
    <source src="video/club-promo.webm"
            type="video/webm">
    <p>Your browser cannot play this video.
       <a href="video/club-promo.mp4">Download</a>
    </p>
  </video>
</section>`}</Code>
          <Callout tone="info">
            Browser shows the poster image first. Clicking play loads MP4 (universal). If MP4 fails, it tries WebM. If both fail, the fallback paragraph with download link appears.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 11: <audio> + Autoplay Rules ─────────────────── */}
      <PresentationSlide id="s10-audio" title="Audio & Autoplay Rules">
        <Stack gap={12}>
          <H2><Text as="span">&lt;audio&gt;</Text> &amp; Autoplay</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <H3>Audio basics</H3>
              <Text>Same pattern as video: <Text as="span">controls</Text>, multiple <Text as="span">&lt;source&gt;</Text>, fallback text.</Text>
              <Text>MP3 is universal. Ogg as optional secondary.</Text>
              <Text tone="secondary">No width/height/poster — browser renders a fixed widget.</Text>
            </Stack>
            <Stack gap={6}>
              <H3>Autoplay rules</H3>
              <Callout tone="warning">Browsers block autoplay WITH sound.</Callout>
              <Text>Autoplay requires <Text as="span">muted</Text>.</Text>
              <Text>Pair with <Text as="span">loop</Text> + <Text as="span">playsinline</Text> for background video.</Text>
              <Text tone="secondary">Better UX: let users click play.</Text>
            </Stack>
          </Grid>
          <Grid columns={1} gap={10}>
            <AutoplayRules t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 12: Worked Example — Audio Section ───────────── */}
      <PresentationSlide id="s10-audio-code" title="Worked Example: Audio Section">
        <Stack gap={8}>
          <H2>Audio player with fallback</H2>
          <Code language="html">{`<div class="audio-player">
  <h3>Club Anthem</h3>
  <audio controls>
    <source src="audio/anthem.mp3"
            type="audio/mpeg">
    <source src="audio/anthem.ogg"
            type="audio/ogg">
    <p>Cannot play? <a href="audio/anthem.mp3">
      Download the MP3</a>.</p>
  </audio>
</div>`}</Code>
          <Callout tone="info">
            Audio follows the same pattern as video: controls attribute, multiple source elements ordered by compatibility, and fallback text with a download link. No poster or dimensions needed.
          </Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 13: Iframe Embeds ────────────────────────────── */}
      {/* ── Try It Now: Poster Image ───────────────────────────── */}
      <PresentationSlide id="s10-try-poster" title="Try It Now: Add a Poster Image" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Three minutes — control what shows before play</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this</Text>
              <Code language="html">{`<video controls
       poster="images/promo-thumb.jpg"
       preload="metadata"
       width="640">
  <source src="images/promo.mp4" type="video/mp4">
  <source src="images/promo.webm" type="video/webm">
  <p>Your browser cannot play this video.
    <a href="images/promo.mp4">Download it</a>.
  </p>
</video>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Before you press play, the poster image fills the player.</Text>
              <Text>2. Remove poster and reload — you get a black rectangle instead.</Text>
              <Text>3. preload="metadata" loads only duration info, not the whole file.</Text>
              <Text>4. Browsers try each &lt;source&gt; in order and use the first one they support.</Text>
              <Callout tone="info">Without a poster, most browsers show the first frame — often black. A poster makes the page look finished.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s10-iframe" title="YouTube / Vimeo Embeds">
        <Stack gap={12}>
          <H2>Responsive Iframe Embeds</H2>
          <Code language="html">{`<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Club Event Highlights"
    allowfullscreen>
  </iframe>
</div>`}</Code>
          <Text>CSS: <Text as="span">padding-bottom: 56.25%</Text> on container preserves 16:9 ratio.</Text>
          <Text tone="secondary">Always add <Text as="span">title</Text> for accessibility. Use YouTube/Vimeo for videos over 5 min.</Text>
          <Grid columns={1} gap={10}>
            <IframeEmbed t={t} />
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 14: Worked Example — Podcast Page ────────────── */}
      <PresentationSlide id="s10-podcast-example" title="Worked Example: Podcast Page">
        <Stack gap={10}>
          <H2>Building a Complete Media Page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Text fontWeight="700">Step 1 — Create media.html structure:</Text>
              <Code language="html">{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Media - Student Club</title>
  <link rel="stylesheet"
        href="css/style.css">
</head>
<body>
  <header>...</header>
  <nav>...add Media link...</nav>
  <main>
    <h2>Club Media</h2>
    <!-- video section -->
    <!-- audio section -->
  </main>
  <footer>...</footer>
</body>
</html>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Step 2 — Add video + audio sections:</Text>
              <Text>Add a heading and description paragraph for each section.</Text>
              <Text>Insert the video element with controls, poster, and source tags.</Text>
              <Text>Insert the audio element below with controls and source tags.</Text>
              <Text>Add at least one image related to media content.</Text>
              <Callout tone="info">Remember to update navigation on ALL pages to include the Media link.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 15: Quick Check ──────────────────────────────── */}
      <PresentationSlide id="s10-quick-check" title="Quick Check: Multimedia">
        <Stack gap={12}>
          <H2>Discussion Prompts</H2>
          <Stack gap={8}>
            <Callout tone="info">
              <Text fontWeight="700">1.</Text> Why does <Text as="span">autoplay</Text> require <Text as="span">muted</Text>? What happens if you omit muted?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">2.</Text> Why can't you use the YouTube address-bar URL in an iframe? What must you change?
            </Callout>
            <Callout tone="info">
              <Text fontWeight="700">3.</Text> A student uploads a 200 MB video file directly. What should they do first?
            </Callout>
          </Stack>
          <Text tone="secondary">Think for 1 minute, then discuss with your neighbour.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 16: Responsive Media CSS ─────────────────────── */}
      {/* ── Try It Now: Video Tag ─────────────────────────────── */}
      <PresentationSlide id="s10-try-video" title="Try It Now: Add a Video Player" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Five minutes — embed a video in your page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Type this into media.html</Text>
              <Code language="html">{`<section>
  <h2>Club Promo Video</h2>
  <video
    width="640"
    controls
    poster="images/video-thumb.jpg"
    preload="metadata"
  >
    <source src="images/club-video.mp4" type="video/mp4">
    <source src="images/club-video.webm" type="video/webm">
    <p>Your browser does not support HTML5 video.
      <a href="images/club-video.mp4">Download the video</a>.
    </p>
  </video>
</section>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. The video player appears with a play button and timeline.</Text>
              <Text>2. Click play — the video should load and play.</Text>
              <Text>3. If you see a black box with no controls, check that controls is spelled correctly.</Text>
              <Text>4. The poster image shows before the video plays.</Text>
              <Callout tone="info">If the video does not play, check the file path. Open DevTools → Network tab → look for a 404 on the video file.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s10-responsive-css" title="Responsive Media CSS">
        <Stack gap={12}>
          <H2>Making Media Work on Every Screen</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Video responsiveness</Text>
              <Code language="css">{`video {
  max-width: 100%;
  height: auto;
}`}</Code>
              <Text tone="secondary">Prevents video from overflowing its container on phones.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Audio styling</Text>
              <Code language="css">{`.audio-player {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}`}</Code>
              <Text tone="secondary">Gives the audio widget visual breathing room.</Text>
            </Stack>
          </Grid>
          <Callout tone="info">Always set max-width: 100% on video elements. Fixed pixel widths break on mobile screens narrower than the video.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 17: Common Mistakes (expanded to 7) ──────────── */}
      {/* ── Do vs Don't ──────────────────────────────────────── */}
      <PresentationSlide id="s10-do-dont" title="Multimedia: Do vs Don't">
        <Stack gap={10}>
          <H2>Do vs Don&apos;t</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={14}>
            <Stack gap={6}>
              <H3 tone="success">Do</H3>
              <Text>Always add the controls attribute</Text>
              <Text>Provide multiple &lt;source&gt; formats (MP4 + WebM)</Text>
              <Text>Add a poster image so the video looks intentional before play</Text>
              <Text>Set max-width: 100% so media never overflows</Text>
              <Text>Include fallback text inside &lt;video&gt; and &lt;audio&gt;</Text>
            </Stack>
            <Stack gap={6}>
              <H3 tone="danger">Don&apos;t</H3>
              <Text>Use autoplay with sound — browsers block it and users hate it</Text>
              <Text>Forget the type attribute on &lt;source&gt;</Text>
              <Text>Hard-code pixel widths on video (breaks on mobile)</Text>
              <Text>Upload 200MB video files — compress first or use YouTube</Text>
              <Text>Use &lt;embed&gt; or &lt;object&gt; for video (obsolete)</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Media Accessibility ───────────────────────────────── */}
      <PresentationSlide id="s10-media-a11y" title="Media Accessibility">
        <Stack gap={12}>
          <H2>Not Everyone Can Hear or See Your Media</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Captions</Pill><Text>Add &lt;track kind="captions" src="captions.vtt" srclang="en" label="English"&gt; inside &lt;video&gt;.</Text></Row>
            <Row gap={8}><Pill>Transcript</Pill><Text>Provide a text transcript below the player. It helps deaf users AND search engines.</Text></Row>
            <Row gap={8}><Pill>Controls</Pill><Text>Native controls are keyboard accessible. Custom controls usually are not.</Text></Row>
            <Row gap={8}><Pill>No autoplay</Pill><Text>Autoplaying media disorients screen reader users and people with cognitive disabilities.</Text></Row>
            <Row gap={8}><Pill>iframe title</Pill><Text>Every &lt;iframe&gt; needs a title attribute describing what it contains.</Text></Row>
          </Stack>
          <Callout tone="warning">A video without captions excludes deaf users entirely. A transcript is the minimum accessible baseline.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Try It Now: Responsive Video Wrapper ──────────────── */}
      <PresentationSlide id="s10-try-responsive" title="Try It Now: Responsive Video Wrapper" background={{ pattern: "dots", accent: t.chart.green }}>
        <Stack gap={10}>
          <H2>Four minutes — make an embed scale with the page</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">HTML</Text>
              <Code language="html">{`<div class="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Club promo video"
    allowfullscreen>
  </iframe>
</div>`}</Code>
              <Text fontWeight="700">CSS</Text>
              <Code language="css">{`.video-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
.video-wrapper iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">What to check</Text>
              <Text>1. Resize the browser window — the video should shrink and grow with it.</Text>
              <Text>2. The aspect ratio stays 16:9 — no black bars, no squashing.</Text>
              <Text>3. 56.25% = 9 ÷ 16. For 4:3 video use 75%.</Text>
              <Text>4. The wrapper needs height: 0 or padding-bottom will not work.</Text>
              <Callout tone="info">This trick works because percentage padding is calculated from the element&apos;s WIDTH, not height.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      <PresentationSlide id="s10-mistakes" title="Common Mistakes" background={{ pattern: "spotlight", accent: t.chart.goldenYellow }}>
        <Stack gap={10}>
          <H2>Seven Pitfalls to Avoid</H2>
          <Stack gap={4}>
            <Text tone="danger">1. Using Flash or <Text as="span">&lt;object&gt;</Text> for media — use HTML5 instead</Text>
            <Text tone="danger">2. Forgetting <Text as="span">controls</Text> — user sees a frozen rectangle with no way to play</Text>
            <Text tone="danger">3. Only one obscure format (e.g., Ogg only) — always lead with MP4</Text>
            <Text tone="danger">4. Autoplay with sound — browser blocks it; add <Text as="span">muted</Text></Text>
            <Text tone="danger">5. Huge uncompressed files — compress with HandBrake / Audacity first</Text>
            <Text tone="danger">6. Missing <Text as="span">title</Text> on iframes — screen readers need it</Text>
            <Text tone="danger">7. Missing <Text as="span">type</Text> on <Text as="span">&lt;source&gt;</Text> — browser wastes bandwidth guessing formats</Text>
          </Stack>
          <Callout tone="warning">Fix: always add controls, always lead with MP4/MP3, always include type=, always compress first.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Debug This ───────────────────────────────────────── */}
      <PresentationSlide id="s10-debug" title="Debug This" background={{ pattern: "spotlight", accent: t.chart.brightOrange }}>
        <Stack gap={10}>
          <H2>This video has three bugs. Find them.</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Buggy HTML</Text>
              <Code language="html">{`<video width="640" autoplay>
  <source src="club-video.mp4">
  <source src="club-video.webm">
  <p>Your browser does not support video.</p>
</video>`}</Code>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Bugs</Text>
              <Text tone="danger">1. autoplay without muted — browsers block autoplay with sound. Add muted or remove autoplay.</Text>
              <Text tone="danger">2. No controls attribute — user cannot play, pause, or adjust volume. Add controls.</Text>
              <Text tone="danger">3. No poster attribute — video shows a black frame before playing. Add poster="images/video-thumb.jpg".</Text>
              <Callout tone="info">Rule: always add controls. autoplay is almost always a bad UX decision — let the user choose to play.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 17: Theory Summary ───────────────────────────── */}
      <PresentationSlide id="s10-summary" title="Theory Summary">
        <Stack gap={10}>
          <H2>Session 10 — Complete Reference</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={3}>
              <Text fontWeight="700">HTML Elements</Text>
              <Text><Text as="span">&lt;video&gt;</Text> — embed video files</Text>
              <Text><Text as="span">&lt;audio&gt;</Text> — embed audio files</Text>
              <Text><Text as="span">&lt;source&gt;</Text> — provide multiple formats</Text>
              <Text><Text as="span">&lt;iframe&gt;</Text> — embed YouTube/Vimeo</Text>
              <Text>Fallback text inside tags for old browsers</Text>
            </Stack>
            <Stack gap={3}>
              <Text fontWeight="700">Key Attributes &amp; CSS</Text>
              <Text><Text as="span">controls</Text> — always add this</Text>
              <Text><Text as="span">poster</Text> — thumbnail for video</Text>
              <Text><Text as="span">preload="metadata"</Text> — save bandwidth</Text>
              <Text><Text as="span">type="video/mp4"</Text> — avoid guessing</Text>
              <Text><Text as="span">padding-bottom: 56.25%</Text> — responsive iframe</Text>
              <Text><Text as="span">max-width: 100%</Text> — responsive video</Text>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 18: Practice ─────────────────────────────────── */}
      <PresentationSlide id="s10-practice" title="Hands-On Practice">
        <Stack gap={12}>
          <H2>Practice — exercises/session-10/ (~50 min)</H2>
          <Stack gap={6}>
            <Row gap={8}><Tag tone="info">Task 1</Tag><Text>Understand Flash (dead) vs HTML5 video/audio tags</Text></Row>
            <Row gap={8}><Tag tone="info">Task 2</Tag><Text>Prepare media files (sample-video.mp4 + sample-audio.mp3 in images/)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 3</Tag><Text>Create media.html with a &lt;video&gt; element (controls, width, source, fallback)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 4</Tag><Text>Add &lt;audio&gt; section to media.html (controls, loop, multiple sources)</Text></Row>
            <Row gap={8}><Tag tone="info">Task 5</Tag><Text>Add "Media" link to navigation on ALL pages and test</Text></Row>
          </Stack>
          <Text tone="secondary">Deliverable: club-website/media.html with video + audio players, nav updated on all pages.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Practice Checkpoints ──────────────────────────────── */}
      <PresentationSlide id="s10-practice-check" title="Practice Checkpoints">
        <Stack gap={12}>
          <H2>How to Know Each Task Is Done</H2>
          <Stack gap={6}>
            <Row gap={8}><Pill>Task 1</Pill><Text>You can explain why Flash is dead and HTML5 video/audio replaced it.</Text></Row>
            <Row gap={8}><Pill>Task 2</Pill><Text>Sample video and audio files are in the images/ folder and load in the browser.</Text></Row>
            <Row gap={8}><Pill>Task 3</Pill><Text>The video player shows controls, a poster image, and fallback text if the format is unsupported.</Text></Row>
            <Row gap={8}><Pill>Task 4</Pill><Text>The audio player has controls and plays the file. No autoplay (browsers block it).</Text></Row>
            <Row gap={8}><Pill>Task 5</Pill><Text>The "Media" link appears in the nav on every page and loads media.html correctly.</Text></Row>
          </Stack>
          <Divider />
          <Callout tone="info">If the video shows a black box with no controls, check that you added the controls attribute to the &lt;video&gt; tag.</Callout>
        </Stack>
      </PresentationSlide>

      {/* ── Assignment ────────────────────────────────────────── */}
      <PresentationSlide id="s10-assignment" title="Assignment: Club Media Page">
        <Stack gap={10}>
          <H2>Start in class — finish for homework</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={12}>
            <Stack gap={6}>
              <Text fontWeight="700">Deliverable</Text>
              <Text>A media.html page in your Student Club site with video and audio players.</Text>
              <Text fontWeight="700">Acceptance criteria</Text>
              <Text>&lt;video&gt; with controls, poster, width, and fallback text.</Text>
              <Text>&lt;audio&gt; with controls and fallback text.</Text>
              <Text>Video is responsive (max-width: 100%).</Text>
              <Text>"Media" link in navigation on all pages.</Text>
            </Stack>
            <Stack gap={6}>
              <Text fontWeight="700">Before you submit</Text>
              <Text>Play the video and audio — do they actually work?</Text>
              <Text>Resize the browser — does the video scale down?</Text>
              <Text>Check that the nav link works from every page.</Text>
              <Callout tone="warning">A video without controls attribute looks like a broken image. Always add controls.</Callout>
            </Stack>
          </Grid>
        </Stack>
      </PresentationSlide>


      {/* ── Slide 19: Homework ─────────────────────────────────── */}
      <PresentationSlide id="s10-homework" title="Homework">
        <Stack gap={12}>
          <H2>Homework — homework/session-10/</H2>
          <Callout tone="info">Due Sunday 23:59</Callout>
          <Stack gap={6}>
            <Text>Create <Text as="span">project/pages/media.html</Text> with a video section (&lt;video&gt; + controls + poster + fallback text)</Text>
            <Text>Add an audio section (&lt;audio&gt; + controls + fallback text)</Text>
            <Text>Include page content: heading "Club Media", descriptions of video and audio, at least one image</Text>
            <Text>Style the media page: center video, style audio player, make video responsive (max-width: 100%)</Text>
            <Text>Add "Media" link to navigation on ALL pages</Text>
          </Stack>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 20: Recap ────────────────────────────────────── */}
      <PresentationSlide id="s10-recap" title="Recap">
        <Stack gap={12}>
          <H2>Session 10 Recap</H2>
          <Grid columns="repeat(2, minmax(0,1fr))" gap={16}>
            <Stack gap={6}>
              <Tag tone="success">Flash = dead</Tag>
              <Tag tone="success">&lt;video&gt; + controls + poster</Tag>
              <Tag tone="success">&lt;audio&gt; + controls</Tag>
            </Stack>
            <Stack gap={6}>
              <Tag tone="success">MP4 first, WebM second</Tag>
              <Tag tone="success">Fallback text + download link</Tag>
              <Tag tone="success">Responsive iframe (56.25%)</Tag>
            </Stack>
          </Grid>
          <Text tone="secondary">Your Student Club Website now has a fully functional Media page.</Text>
        </Stack>
      </PresentationSlide>

      {/* ── Slide 21: Next Session ─────────────────────────────── */}
      <PresentationSlide
        id="s10-next"
        title="Next: Compact Site Design"
        background={{ color: t.bg.elevated, pattern: "aurora", accent: t.chart.green, accentSecondary: t.chart.blue }}
      >
        <Stack gap={16} align="center">
          <Tag tone="info">Session 11</Tag>
          <H1>Designing a Compact Site</H1>
          <Text tone="secondary">Plan, organize, and polish a small multi-page website. Plus: Requirements Analysis (CLO2).</Text>
        </Stack>
      </PresentationSlide>
    </Presentation>
  );
}
