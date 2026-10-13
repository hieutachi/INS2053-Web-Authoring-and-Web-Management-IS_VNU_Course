/* Complete lesson targets. The shared Viewer isolates styles, blocks scripts/forms,
   handles approved navigation and simulates validation. It is not copy protection.
   Each decoded srcdoc is audited as an independent document. */
const H1_CSS = `
  .pagetitle { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
`;

function demoDoc(title, bodyHtml, extraCss = "") {
  bodyHtml = bodyHtml.replace(H1_CSS, '').replace(/<div class="pagetitle" role="heading" aria-level="1">([\s\S]*?)<\/div>/g, '<h1>$1</h1>');
  // Move author CSS into the document head; early lessons remain unstyled.
  bodyHtml = bodyHtml.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => { extraCss += css; return ''; });
  let headHtml = '';
  bodyHtml = bodyHtml.replace(/<link\b[^>]*>/g, link => { headHtml += link + '\n'; return ''; });
  if (!/<h1[ >]/.test(bodyHtml)) bodyHtml = '<h1>' + title + '</h1>' + bodyHtml;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${headHtml}
${extraCss ? `<style>
${extraCss}
</style>` : ""}
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

/* Escape a full HTML document so it can sit inside a srcdoc attribute. */
function toSrcdoc(doc) {
  return doc.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
     real pages, real images, and a clearly labelled demonstration form.</p>
  <p>This paragraph exists so the page has at least three paragraphs in total,
     exactly as the homework checklist requires.</p>
`);

DEMOS[2] = () => demoDoc("CodeBreakers Club — Home", H1_CSS + `
  <div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div>
  <p>Welcome to the CodeBreakers Club, the student club for everyone who
     loves building things for the web.</p>
  <h2>What we do</h2><ul><li>Practise HTML</li><li>Review code</li><li>Build projects</li></ul>
  <h2>Latest news</h2>
  <p>We meet every Friday in room 2.04. Bring your laptop and one question
     about your current project.</p>
  <img src="images/logo.svg" alt="CodeBreakers Club logo"
       width="120" height="120">
  <h2>Who we are</h2>
  <p>We are thirty students from INS2053 who practise HTML and CSS together
     every week.</p>
  <img src="images/club-photo.png" alt="Original Learn, Build, Share diagram" width="320" height="180">
`);

DEMOS[3] = () => demoDoc("About | CodeBreakers Club", H1_CSS + `
  <div class="pagetitle" role="heading" aria-level="1">About Our Club</div>
  <p>The CodeBreakers Club was founded in 2024 by students of the
     International School, VNU.</p>
  <h2>Our mission</h2>
  <p>Help every member ship one real web page per month, and never debug
     alone.</p>
  <p>Beginners and alumni can join. Peer feedback helps members gain confidence.</p>
  <h2>Regular activities</h2><h3>Weekly events</h3>
  <ul>
    <li>Friday coding nights</li>
    <li>Monthly mini-hackathons</li>
    <li>Peer code review sessions</li><li>HTML workshops</li><li>Alumni mentoring</li>
  </ul>
  <h2>How to join</h2><ol><li>Read about us</li><li>Choose an activity</li><li>Visit Contact</li></ol>
  <h2>Gallery</h2>
  <img src="images/club-photo.png" alt="Original Learn, Build, Share diagram" width="320" height="180">
  <img src="images/event-1.png" alt="Original HTML, CSS and review diagram" width="320" height="180">
  <img src="images/meeting.png" alt="Original Plan, Test, Explain diagram"
       width="320" height="180">
`);

DEMOS[4] = () => demoDoc("About | CodeBreakers Club", `
  <style>
    body { background: #f4f8fd; font-size: 16px; font-family: Georgia, serif; color: #222; line-height: 1.6;
           max-width: 720px; margin: 0 auto; padding: 1rem; }
    h1 { color: #1d4ed8; border-bottom: 3px solid #1d4ed8; }
    h2 { color: #b45309; }
    h3 { color: #00665c; }
    ul { padding: 1rem 2rem; background: #e4edf8; }
    p { margin: 1rem 0; }
    img { max-width: 100%; height: auto; border: 4px solid #e5e7eb; border-radius: 8px; }
  </style>
  <div class="pagetitle" role="heading" aria-level="1">About Our Club</div>
  <p>The same About page as last week — now with its first stylesheet.
     Headings carry colour, text breathes, and images sit in a frame.</p>
  <h3>Learning together</h3><p>Beginners and experienced students help each other.</p>
  <ul><li>Practise</li><li>Review</li><li>Share</li></ul>
  <h2>Our mission</h2>
  <p>Help every member ship one real web page per month.</p>
  <img src="images/meeting.png" alt="Original Plan, Test, Explain diagram"
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
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main class="content">
    <h2>Welcome!</h2>
    <p>A colored header bar, a horizontal menu, a centered content column
       and a footer bar — the classic page layout from Session 5.</p>
  </main>
  <footer class="footer">&copy; 2026 CodeBreakers Club</footer>
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
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main class="content">
    <h2>One site, three pages</h2>
    <p>Home, About and Contact now share this exact design. Click between
       them: every page keeps the same banner, the same menu, the same
       footer — one consistent site.</p>
  <h2>Why join?</h2><ul><li>Friendly feedback</li><li>Regular practice</li><li>Project partners</li></ul>
  <img src="images/club-photo.png" alt="Original learning cycle diagram" width="320" height="180">
  <img src="images/meeting.png" alt="Original workshop cycle diagram" width="320" height="180">
  </main>
  <footer class="footer">&copy; 2026 CodeBreakers Club</footer>
`);

DEMOS[7] = () => demoDoc("CodeBreakers Club — Home", `
  <style>
    body { margin: 0; font-family: "Trebuchet MS", Verdana, sans-serif; }
    .banner { background: #7c3aed; color: #fff; padding: 1.2rem;
              text-align: center; }
    h1, h2, h3 { font-family: "Courier New", monospace; }
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
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main class="content">
    <h2>Typography and offline fallback</h2>
    <p>This offline preview uses system fonts instead of a Google Fonts request. Headings stand out in a monospace face, body text is easier to
       read with taller line height, and links change colour when you hover
       over them.</p>
  </main>
  <footer class="footer">&copy; 2026 CodeBreakers Club</footer>
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
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main class="content">
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
    <p>Click and verify every navigation link yourself. This preview cannot prove
       your repository includes midterm-review.md or the Activities skeleton.</p>
  </main>
  <footer class="footer">&copy; 2026 CodeBreakers Club</footer>
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
        <tr><th scope="col">Day</th><th scope="col">Time</th><th scope="col">Activity</th><th scope="col">Location</th></tr>
      </thead>
      <tbody>
        <tr><td>Monday</td><td>18:00</td><td>HTML workshop</td><td>Room 2.04</td></tr>
        <tr><td>Tuesday</td><td>18:00</td><td>CSS practice</td><td>Lab B1</td></tr>
        <tr><td>Wednesday</td><td>18:00</td><td>Code review</td><td>Room 3.11</td></tr>
        <tr><td>Friday</td><td>18:00</td><td>Coding night</td><td>Room 2.04</td></tr>
        <tr><td>Sunday</td><td colspan="3">Rest and independent practice</td></tr>
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
    <h2>Original narrated HTML tutorial</h2>
    <video controls width="640" height="360" poster="images/video-poster.png">
      <source src="media/workshop.mp4" type="video/mp4">
      Your browser does not support the video element.
    </video>
    <h2>Audio edition</h2>
    <audio controls>
      <source src="media/podcast.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <p>Original educational tutorial with a synthetic voice, not an event recording.
       Create index.html with doctype, head, body, title and viewport. Add a heading
       and two paragraphs; save and open it. Keep five pages at the same folder level,
       use relative links and test offline. The complete transcript is on the companion Media page.</p>
  </div>
`);

DEMOS[11] = () => demoDoc("CodeBreakers Club — finished product", `
  <link rel="icon" href="images/logo.svg" type="image/svg+xml">
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
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="activities.html">Activities</a>
    <a href="media.html">Media</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main class="content">
    <h2>Ship it like a pro</h2>
    <p>This is the finishing week: favicon in the browser tab, a README that
       explains the project, W3C-valid pages, and a consistent design across
       every page of the site.</p>
  </main>
  <footer class="footer">&copy; 2026 CodeBreakers Club &middot; Local README documents the pages and asset sources</footer>
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
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main class="content">
    <h2>Clean, validated code</h2>
    <p>Use consistent indentation, section comments and validation. CSS variables are optional,
       not the goal of Homework 12. A preview cannot prove that your source passes the validator.</p>
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
    input, select, textarea { box-sizing: border-box;
      width: 100%; padding: 0.5rem; margin-top: 0.25rem;
      border: 1px solid #9ca3af; border-radius: 4px;
      font-family: inherit; font-size: 1rem;
    }
    input[type="radio"], input[type="checkbox"] { width: auto; }
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
      <fieldset><legend>Your details</legend><label for="name">Full name</label>
      <input type="text" id="name" name="name" required>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
      <label for="phone">Phone (optional)</label><input type="tel" id="phone" name="phone">
      </fieldset><fieldset><legend>Membership and message</legend>
      <label for="student"><input type="radio" id="student" name="membership" value="student" required> Student</label>
      <label for="alumni"><input type="radio" id="alumni" name="membership" value="alumni" required> Alumni</label>
      <label for="department">Department</label><select id="department" name="department" required><option value="">Choose a department</option><option>Computer Science</option><option>Mathematics</option><option>Physics</option><option>Chemistry</option></select>
      <label for="subject">Subject</label>
      <select id="subject" name="subject">
        <option>Joining the club</option>
        <option>Project question</option>
        <option>Feedback</option><option>Something else</option>
      </select>
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="4" required></textarea>
      <label for="consent"><input type="checkbox" id="consent" name="consent" required> I agree to the club rules</label></fieldset>
      <p>Simulation only. Nothing is sent or stored. Use the Viewer controls to validate and clear fields.</p>
      <button type="button" data-reference-check>Check fields</button><button type="button" data-reference-clear>Clear fields</button>
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
    .menu li:hover .dropdown, .menu li:focus-within .dropdown { display: block; }
    .dropdown a { padding: 0.6rem 1.1rem; }
    .dropdown a:hover { background: #3b82f6; }
    .content { max-width: 760px; margin: 1.5rem auto; padding: 0 1rem; }
    @media (hover: none) { .dropdown { display: block; position: static; } }
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
    <h2>Hover or focus the About item above</h2>
    <p>A dropdown appears with three sub-links and disappears when the mouse
       leaves or keyboard focus moves away. On touch devices the sublinks remain visible. The trick is <code>position: relative</code> on the list item,
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
    .card img { width: 100%; height: auto; border-radius: 4px; }
    .footer { background: #111827; color: #d1d5db; text-align: center;
              padding: 1rem; margin-top: 1.5rem; }
    @media (max-width: 960px) { .cards { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .cards { grid-template-columns: 1fr; } }
    @media (max-width: 768px) {
      .menu ul { flex-direction: column; text-align: center; }
      .banner { padding: .6rem; }
      h1 { font-size: 1.6rem; }
      .content { padding: 0 .6rem; }
      .footer { padding: .6rem; font-size: .9rem; }
    }
  </style>
  <header class="banner"><div class="pagetitle" role="heading" aria-level="1">CodeBreakers Club</div></header>
  <nav class="menu">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
  </nav>
  <main class="content">
    <h2>The same site, three widths</h2>
    <div class="cards">
      <div class="card"><img src="images/club-photo.png" alt="Original Learn, Build, Share diagram"
           width="220" height="120"><p>Desktop: three cards in a row.</p></div>
      <div class="card"><img src="images/meeting.png" alt="Original Plan, Test, Explain diagram"
           width="220" height="120"><p>Tablet: two cards per row.</p></div>
      <div class="card"><img src="images/event-1.png" alt="Original HTML, CSS and review diagram"
           width="220" height="120"><p>Phone: everything stacks.</p></div>
    </div>
  </main>
  <footer class="footer">&copy; 2026 CodeBreakers Club</footer>
`);

export { DEMOS, demoDoc, toSrcdoc };
