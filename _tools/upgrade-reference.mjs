// One-shot migration, kept to document the reference's safety/asset corrections.
import { readFileSync, writeFileSync } from 'node:fs';
for (const page of ['index', 'about', 'activities', 'media', 'contact']) {
  const file = new URL(`../examples/student-club/${page}.html`, import.meta.url);
  let s = readFileSync(file, 'utf8');
  s = s.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- INS2053 teaching reference. Fictional club; original media, CC0-1.0. -->')
    .replace('<body>', '<body>\n    <a class="skip-link" href="#main">Skip to content</a>')
    .replace('<header>', '<header id="top">')
    .replace('<div class="logo">CB</div>', '<img class="logo" src="images/logo.svg" alt="CodeBreakers code-bracket logo" width="80" height="80">')
    .replace('<main>', '<main id="main">\n        <p class="example-note">Fictional teaching reference. Names, schedules and contact details are illustrative. No messages are sent.</p>')
    .replace('class="active"', 'class="active" aria-current="page"')
    .replaceAll('contact@codebreakers.edu', 'contact@example.invalid');
  s = s.replace(/<li>(<a href="about\.html"[^>]*>About<\/a>)<\/li>/, (_, a) => `<li class="has-dropdown">${a}<ul class="dropdown"><li><a href="about.html#mission">Mission</a></li><li><a href="about.html#activities">Activities</a></li><li><a href="about.html#gallery">Gallery</a></li></ul></li>`);
  for (const [old, name] of [['club-photo.jpg','club-photo.png'], ['team-photo.jpg','meeting.png'], ['event-1.jpg','event-1.png'], ['video-poster.jpg','video-poster.png']]) s = s.replaceAll(`images/${old}`, `images/${name}`);
  s = s.replace('alt="Members of CodeBreakers Club working together at a workshop"', 'alt="Original diagram showing the Learn, Build, Share cycle"')
    .replace('alt="The CodeBreakers Club leadership team smiling at a club event"', 'alt="Original diagram of the Plan, Test, Explain workshop cycle"')
    .replace('alt="Students presenting projects at the annual hackathon"', 'alt="Original diagram showing HTML, CSS and review stages"');
  writeFileSync(file, s);
}