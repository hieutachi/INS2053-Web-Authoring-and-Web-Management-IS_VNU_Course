# CodeBreakers Club — Complete Example Website

This is the **finished reference website** for the INS2053 capstone project.
Open `index.html` in your browser to see it.

## What this example shows

Every technique taught in the course appears here:

| Technique | Where to see it |
|---|---|
| Semantic HTML (`header`, `nav`, `main`, `section`, `footer`) | Every page |
| External CSS (`<link>`) | Every page links `css/style.css` |
| Consistent navigation with `class="active"` | Every page |
| Flexbox layout | Navigation bar, team cards |
| HTML tables (`caption`, `thead`, `tbody`, `colspan`) | `activities.html` |
| HTML5 video and audio with fallback text | `media.html` |
| Forms (text, email, tel, select, radio, checkbox, textarea) | `contact.html` |
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
├── images/             Put your images here (.jpg / .png)
├── media/              Put your videos (.mp4) and audio (.mp3) here
└── README.md           This file
```

## About the missing images and media

The HTML references files in `images/` and `media/` that are not included
(for example `images/club-photo.jpg` and `media/workshop.mp4`).

That is intentional. To run this example fully:

1. Create the `images/` and `media/` folders.
2. Add your own files with the same names, **or**
3. Leave them out — the pages still work; the browser just shows a
   broken-image icon where the media should be.

This mirrors what you will do in your own project: replace the example
content with content about **your** club.

## A note about the club name

The ebook chapters use a club called **"Student Technology Club"** as the
running teaching example. This finished reference uses **"CodeBreakers Club"**
(the name in the project specification). The techniques are identical — use
whatever name you like for your own project.

## How to use this example

- **Do not copy it.** Study it, then build your own version step by step as
  the course progresses.
- Each week's homework adds one more piece. By Week 15 your project should
  look similar in structure to this example.
- When you get stuck, compare your code to the matching file here.
