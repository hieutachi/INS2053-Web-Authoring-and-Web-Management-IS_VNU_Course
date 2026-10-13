# CodeBreakers Club — Complete Example Website

This is a **five-page teaching reference** for the INS2053 capstone project.
Open `index.html` in your browser to see it.
CodeBreakers, its people and its events are fictional. Build your own club identity
and content; do not submit this reference unchanged.

## What this example shows

Every technique taught in the course appears here:

| Technique | Where to see it |
|---|---|
| Semantic HTML (`header`, `nav`, `main`, `section`, `footer`) | Every page |
| External CSS (`<link>`) | Every page links `css/style.css` |
| Consistent navigation with `class="active"` | Every page |
| Flexbox and Grid layout | Navigation bar and responsive team cards |
| HTML tables (`caption`, `thead`, `tbody`, `colspan`) | `activities.html` |
| HTML5 video and audio with fallback text | `media.html` |
| Form controls (text, email, tel, select, radio, checkbox, textarea) | `contact.html`, validation simulation only |
| Labels linked to inputs (`for` / `id`) | `contact.html` |
| Responsive design (`viewport` meta + media query) | All pages + `css/style.css` section 11 |

## Folder structure

```
student-club/
├── index.html          Home page
├── about.html          About page
├── activities.html     Activities page (with a table)
├── media.html          Media page (with video + audio)
├── contact.html        Contact page (with a form)
├── css/
│   └── style.css       The shared stylesheet
├── images/             Included original PNG diagrams and SVG logo
├── media/              Included MP4, MP3, WAV, captions and transcript
├── ASSETS.md           Asset provenance, license and reproduction instructions
└── README.md           This file
```

## Included offline images and media

All referenced images and recordings are included. Images are original geometric
learning diagrams, not photos of real people or events. The approximately
84-second MP4 and its MP3 audio edition teach how to create a first HTML page,
using synthetic narration. They are not a real workshop recording or podcast.

See `ASSETS.md` for the CC0-1.0 dedication and reproduction instructions. Normal
site builds use the checked-in assets and do not require Windows speech or ffmpeg.

Test playback with the network off. Summary captions and an equivalent full text
transcript are provided. Some browsers block caption loading from `file:` URLs;
use a local HTTP server for caption-track testing. The transcript is also readable
directly on the Media page.

## Contact demonstration and the assignment contract

Contact deliberately uses a labelled, button-only validation demonstration, not
an active form or submission endpoint. Its small local script checks native field
validity and clears fields; it sends and stores nothing. The course Viewer removes
that script and performs the same simulation from the parent page. Use invented
test values only. This safety adaptation is **not** a waiver of the assignment's
`form` and submit-control requirements: implement those in your own work as
directed by your instructor, without collecting real personal information.

## A note about the club name

The ebook chapters use a club called **"Student Technology Club"** as the
running teaching example. This finished reference uses **"CodeBreakers Club"**
(the name in the project specification). The techniques are identical — use
whatever name you like for your own project.

## How to use this example

- **Do not copy it.** Study it, then build your own version step by step as
  the course progresses.
- Each week's homework adds one more piece. Follow M1–M8 in the Project Hub;
  the final responsive/polish milestones remain in Week 16.
- When you get stuck, compare your code to the matching file here.
