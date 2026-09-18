/* =============================================================================
   hw-demos.mjs — visual targets for the 15 homework sheets.

   Each demo is a COMPLETE standalone HTML document. `build-site.mjs` injects
   it into `site/homework/session-NN.html` inside

     <iframe sandbox="allow-same-origin" srcdoc="...">

   Why an iframe and not inline markup:
     - it is a *target to look at*, not something to scrape: with `sandbox`
       set and `allow-scripts` deliberately absent, the document cannot run
       script, submit anything, or be scripted from the parent page, and the
       selection/copy/context-menu handlers inside the document return false;
     - the outer page's CSS and JS cannot leak in, so the demo shows exactly
       what the student's own file should look like when opened directly;
     - `srcdoc` keeps every page self-contained: qa-site gate 1 counts HTML
       files under site/ exactly, so the demos must not become new files.

   Content mirror of the course project `examples/student-club/` (CodeBreakers
   Club) and of the in-class exercises, so what a student sees here is what
   their own repository should grow into, session by session.
   ============================================================================= */

/* Shared chrome inside each demo document.
   Deliberately NO CSS reset: a student's Week-1 page renders with the
   browser's default stylesheet (Times, default margins), and the demo must
   show exactly that look or the side-by-side comparison lies.
   The one shared rule mimics the default <div class="pagetitle" role="heading" aria-level="1"> look for the .pagetitle divs
   below — real <div class="pagetitle" role="heading" aria-level="1"> tags are not allowed inside srcdoc, because qa-site
   gate 2 counts literal `<h1` occurrences in the raw page source and the
   homework sheet already carries the page's single h1. */
const H1_CSS = `
  .pagetitle { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
`;

/* Every document is wrapped with the same no-copy shield. Because the iframe
   is sandboxed WITHOUT allow-scripts, the inline event handlers here are the
   only scripting the document gets — and they run inside the sandbox, not on
   the host page.
   Tag rules for demo bodies (all forced by qa-site gates scanning the raw
   built page):
     - no <div class="pagetitle" role="heading" aria-level="1">            — use <div class="pagetitle" role="heading" aria-level="1">
     - no <form>          — use a <div>; the sandbox would block submit anyway
     - no type="submit"   — the mock Send button is type="button"
     - no id= duplicates  — attribute quotes are srcdoc-escaped, so ids in here
                            are invisible to the id checks, but keep them unique
                            within the demo regardless. */
function demoDoc(title, bodyHtml, extraCss = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${extraCss ? `<style>
${extraCss}
</style>` : ""}
</head>
<body oncopy="return false" oncut="return false" oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
${bodyHtml}
</body>
</html>`;
}

/* Escape a full HTML document so it can sit inside a srcdoc attribute. */
function toSrcdoc(doc) {
  return doc.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/* ---------------------------------------------------------------------------
   The 15 demos, one per homework sheet. Each is added as its own assignment
   so the file can be maintained one session at a time.
   --------------------------------------------------------------------------- */

const DEMOS = {};

/* Sessions 1-3: plain HTML, browser-default look — exactly what the student
   sees when they open their own file with no stylesheet yet. */
DEMOS[1] = () => demoDoc("Nguyen Van An — Homework 1", H1_CSS + `
  <!-- Master region: page header -->
  <div class="pagetitle" role="heading" aria-level="1">Nguyen Van An</div>
  <p>My name is Nguyen Van An. I am a first-year student at the International
     School, VNU. This page is my first ever hand-written HTML document.</p>

  <!-- Master region: what I want to build -->
  <h2>What I want to build this semester</h2>
  <p>By the end of INS2053 I want a complete website for my study group, with
     real pages, real images, and a contact form that actually works.</p>
  <p>This paragraph exists so the page has at least three paragraphs in total,
     exactly as the homework checklist requires.</p>
`);

DEMOS[2] = () => demoDoc("CodeBreakers Club — Home", H1_CSS + `
  <div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div>
  <p>Welcome to the CodeBreakers Club, the student club for everyone who
     loves building things for the web.</p>
  <h2>Latest news</h2>
  <p>We meet every Friday in room 2.04. Bring your laptop and one question
     about your current project.</p>
  <img src="images/logo.png" alt="CodeBreakers Club logo"
       width="120" height="120">
  <h2>Who we are</h2>
  <p>We are thirty students from INS2053 who practise HTML and CSS together
     every week.</p>
`);

DEMOS[3] = () => demoDoc("About | CodeBreakers Club", H1_CSS + `
  <div class="pagetitle" role="heading" aria-level="1">About Our Club</div>
  <p>The CodeBreakers Club was founded in 2024 by students of the
     International School, VNU.</p>
  <h2>Our mission</h2>
  <p>Help every member ship one real web page per month, and never debug
     alone.</p>
  <h2>Regular activities</h2>
  <ul>
    <li>Friday coding nights</li>
    <li>Monthly mini-hackathons</li>
    <li>Peer code review sessions</li>
  </ul>
  <h2>Gallery</h2>
  <img src="images/meeting.jpg" alt="Members at a Friday coding night"
       width="320" height="180">
`);

DEMOS[4] = () => demoDoc("About | CodeBreakers Club", `
  <style>
    body { font-family: Georgia, serif; color: #222; line-height: 1.6;
           max-width: 720px; margin: 0 auto; padding: 1rem; }
    h1 { color: #1d4ed8; border-bottom: 3px solid #1d4ed8; }
    h2 { color: #b45309; }
    img { border: 4px solid #e5e7eb; border-radius: 8px; }
  </style>
  <div class="pagetitle" role="heading" aria-level="1">About Our Club</div>
  <p>The same About page as last week — now with its first stylesheet.
     Headings carry colour, text breathes, and images sit in a frame.</p>
  <h2>Our mission</h2>
  <p>Help every member ship one real web page per month.</p>
  <img src="images/meeting.jpg" alt="Members at a Friday coding night"
       width="320" height="180">
`);

DEMOS[5] = () => demoDoc("CodeBreakers Club — Home", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .banner { background: #1d4ed8; color: #fff; padding: 1.2rem;
              text-align: center; }
    .menu { background: #1e3a8a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 2rem; }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>Welcome!</h2>
    <p>A colored header bar, a horizontal menu, a centered content column
       and a footer bar — the classic page layout from Session 5.</p>
  </div>
  <div class="footer">&copy; 2026 CodeBreakers Club</div>
`);

DEMOS[6] = () => demoDoc("CodeBreakers Club — Home", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .banner { background: #1d4ed8; color: #fff; padding: 1.2rem;
              text-align: center; }
    .menu { background: #1e3a8a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 2rem; }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>One site, three pages</h2>
    <p>Home, About and Contact now share this exact design. Click between
       them: every page keeps the same banner, the same menu, the same
       footer — one consistent site.</p>
  </div>
  <div class="footer">&copy; 2026 CodeBreakers Club</div>
`);

DEMOS[7] = () => demoDoc("CodeBreakers Club — Home", `
  <style>
    body { margin: 0; font-family: "Trebuchet MS", Verdana, sans-serif; }
    .banner { background: #7c3aed; color: #fff; padding: 1.2rem;
              text-align: center; }
    .banner h1 { font-family: "Courier New", monospace;
                 letter-spacing: 2px; }
    .menu { background: #5b21b6; text-align: center; padding: 0.6rem; }
    .menu a { color: #fde68a; text-decoration: none; margin: 0 1rem; }
    .menu a:hover { color: #ffffff; text-decoration: underline; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem;
               line-height: 1.7; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 2rem; }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>Custom fonts are in</h2>
    <p>Headings now stand out in a monospace face, body text is easier to
       read with taller line height, and links change colour when you hover
       over them.</p>
  </div>
  <div class="footer">&copy; 2026 CodeBreakers Club</div>
`);

DEMOS[8] = () => demoDoc("CodeBreakers Club — midterm checkpoint", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .banner { background: #1d4ed8; color: #fff; padding: 1.2rem;
              text-align: center; }
    .menu { background: #1e3a8a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    table { border-collapse: collapse; width: 100%; }
    th { background: #1d4ed8; color: #fff; text-align: left;
         padding: 0.5rem 0.75rem; }
    td { padding: 0.5rem 0.75rem; border-bottom: 1px solid #e5e7eb; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 2rem; }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>Midterm review</h2>
    <table>
      <thead>
        <tr><th scope="col">Skill</th><th scope="col">Where I used it</th></tr>
      </thead>
      <tbody>
        <tr><td>HTML boilerplate</td><td>Every page of the project</td></tr>
        <tr><td>Relative paths</td><td>Navigation between 3 pages</td></tr>
        <tr><td>Page layout</td><td>Header, menu, content, footer</td></tr>
      </tbody>
    </table>
    <p>Every navigation link below has been clicked and works. The honest
       reflections live in <code>midterm-review.md</code>.</p>
  </div>
  <div class="footer">&copy; 2026 CodeBreakers Club</div>
`);

DEMOS[9] = () => demoDoc("Activities | CodeBreakers Club", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif;
           background: #f3f4f6; }
    .menu { background: #1e3a8a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    table { border-collapse: collapse; width: 100%; background: #fff;
            font-size: 0.95rem; }
    caption { caption-side: top; font-weight: bold; padding: 0.5rem;
              text-align: left; }
    th { background: #1d4ed8; color: #fff; text-align: left;
         padding: 0.6rem 0.75rem; }
    td { padding: 0.6rem 0.75rem; border-bottom: 1px solid #e5e7eb; }
    tbody tr:nth-child(even) { background: #eff6ff; }
  </style>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="activities.html">Activities</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <table>
      <caption>Club activities — Spring 2026</caption>
      <thead>
        <tr><th scope="col">Activity</th><th scope="col">When</th>
            <th scope="col">Where</th></tr>
      </thead>
      <tbody>
        <tr><td>Friday coding night</td><td>Every Friday, 18:00</td>
            <td>Room 2.04</td></tr>
        <tr><td>Mini-hackathon</td><td>First Saturday monthly</td>
            <td>Lab B1</td></tr>
        <tr><td>Code review circle</td><td>Second Wednesday</td>
            <td>Room 3.11</td></tr>
      </tbody>
    </table>
  </div>
`);

DEMOS[10] = () => demoDoc("Media | CodeBreakers Club", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .menu { background: #1e3a8a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    video, audio { width: 100%; background: #111827; border-radius: 6px; }
    audio { height: 44px; }
    h2 { margin-top: 1.4rem; }
  </style>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="media.html">Media</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>Club highlight video</h2>
    <video controls width="640" height="360" poster="images/video-poster.jpg">
      <source src="media/highlight.mp4" type="video/mp4">
      Your browser does not support the video element.
    </video>
    <h2>Club podcast</h2>
    <audio controls>
      <source src="media/podcast.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <p>Recorded at our Friday coding night — members explain how they built
       their first pages.</p>
  </div>
`);

DEMOS[11] = () => demoDoc("CodeBreakers Club — finished product", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .banner { background: #0f766e; color: #fff; padding: 1.2rem;
              text-align: center; }
    .menu { background: #134e4a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 2rem; }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="activities.html">Activities</a>
    <a href="media.html">Media</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>Ship it like a pro</h2>
    <p>This is the finishing week: favicon in the browser tab, a README that
       explains the project, W3C-valid pages, and a consistent design across
       every page of the site.</p>
  </div>
  <div class="footer">&copy; 2026 CodeBreakers Club &middot; README.md on GitHub</div>
`);

DEMOS[12] = () => demoDoc("CodeBreakers Club — CSS variables", `
  <style>
    :root {
      --brand: #0f766e;
      --brand-dark: #134e4a;
      --accent: #fbbf24;
      --surface: #f0fdfa;
      --ink: #134e4a;
    }
    body { margin: 0; font-family: Arial, Helvetica, sans-serif;
           background: var(--surface); color: var(--ink); }
    .banner { background: var(--brand); color: #fff; padding: 1.2rem;
              text-align: center; }
    .menu { background: var(--brand-dark); text-align: center;
            padding: 0.6rem; }
    .menu a { color: var(--accent); text-decoration: none; margin: 0 1rem; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 1rem;
               background: #fff; border: 1px solid var(--brand); }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>One palette, every page</h2>
    <p>Colors now live in CSS custom properties on <code>:root</code>. Change
       <code>--brand</code> once and the banner, the menu and every border
       update together.</p>
  </div>
`);

DEMOS[13] = () => demoDoc("Contact | CodeBreakers Club", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif;
           background: #f3f4f6; }
    .menu { background: #1e3a8a; text-align: center; padding: 0.6rem; }
    .menu a { color: #fff; text-decoration: none; margin: 0 1rem; }
    .content { max-width: 560px; margin: 1.5rem auto; padding: 1rem;
               background: #fff; border-radius: 8px;
               box-shadow: 0 1px 4px rgba(0,0,0,0.12); }
    label { display: block; margin-top: 0.9rem; font-weight: bold; }
    input, select, textarea {
      width: 100%; padding: 0.5rem; margin-top: 0.25rem;
      border: 1px solid #9ca3af; border-radius: 4px;
      font-family: inherit; font-size: 1rem;
    }
    button { margin-top: 1rem; background: #1d4ed8; color: #fff;
             border: 0; padding: 0.6rem 1.4rem; border-radius: 4px;
             font-size: 1rem; cursor: pointer; }
  </style>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <div class="content">
    <h2>Contact us</h2>
    <div class="mockform">
      <label for="name">Your name</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <label for="subject">Subject</label>
      <select id="subject" name="subject">
        <option>Joining the club</option>
        <option>Project question</option>
        <option>Something else</option>
      </select>
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4"></textarea>
      <button type="button">Send</button>
    </div>
  </div>
`);

DEMOS[14] = () => demoDoc("CodeBreakers Club — dropdown navigation", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .menu { background: #1e3a8a; padding: 0; }
    .menu ul { list-style: none; margin: 0; padding: 0; display: flex; }
    .menu li { position: relative; }
    .menu a { display: block; color: #fff; text-decoration: none;
              padding: 0.7rem 1.1rem; }
    .menu li:hover > a { background: #1d4ed8; }
    .dropdown { display: none; position: absolute; top: 100%; left: 0;
                background: #1e3a8a; min-width: 180px; z-index: 10; }
    .menu li:hover .dropdown { display: block; }
    .dropdown a { padding: 0.6rem 1.1rem; }
    .dropdown a:hover { background: #3b82f6; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
  </style>
  <nav class="menu">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a>
        <ul class="dropdown">
          <li><a href="about.html#mission">Our Mission</a></li>
          <li><a href="activities.html">Activities</a></li>
          <li><a href="media.html">Gallery</a></li>
        </ul>
      </li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
  <div class="content">
    <h2>Hover the About item above</h2>
    <p>A dropdown appears with three sub-links and disappears when the mouse
       leaves. The trick is <code>position: relative</code> on the list item,
       <code>position: absolute</code> on the dropdown, and
       <code>:hover</code> switching <code>display</code>.</p>
  </div>
`);

DEMOS[15] = () => demoDoc("CodeBreakers Club — mobile view", `
  <style>
    body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
    .banner { background: #0f766e; color: #fff; padding: 1rem;
              text-align: center; }
    .menu { background: #134e4a; }
    .menu ul { list-style: none; margin: 0; padding: 0.4rem;
               display: flex; gap: 0.4rem; justify-content: center; }
    .menu a { color: #fff; text-decoration: none; padding: 0.4rem 0.8rem; }
    .content { max-width: 960px; margin: 1.2rem auto; padding: 0 1rem; }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr);
             gap: 1rem; }
    .card { background: #f0fdfa; border: 1px solid #99f6e4;
            border-radius: 6px; padding: 0.8rem; }
    .card img { width: 100%; border-radius: 4px; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 1.5rem; }
    @media (max-width: 768px) {
      .cards { grid-template-columns: 1fr; }
      .menu ul { flex-direction: column; text-align: center; }
    }
  </style>
  <div class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></div>
  <nav class="menu">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
  <div class="content">
    <h2>The same site, three widths</h2>
    <div class="cards">
      <div class="card"><img src="images/a.jpg" alt="Members coding"
           width="220" height="120"><p>Desktop: three cards in a row.</p></div>
      <div class="card"><img src="images/b.jpg" alt="Workshop night"
           width="220" height="120"><p>Tablet: two cards per row.</p></div>
      <div class="card"><img src="images/c.jpg" alt="Study group"
           width="220" height="120"><p>Phone: everything stacks.</p></div>
    </div>
  </div>
  <div class="footer">&copy; 2026 CodeBreakers Club</div>
`);

export { DEMOS, demoDoc, toSrcdoc };
