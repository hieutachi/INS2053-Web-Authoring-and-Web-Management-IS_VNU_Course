# Session 10 — In-Class Exercise: Embedding Video and Audio

## Objective
- Embed video in a web page using the HTML5 `<video>` tag
- Embed audio using the HTML5 `<audio>` tag
- Use multiple `<source>` elements and control attributes

## Time Required
Estimated time: 50 minutes

## Instructions

### Task 1: Understand the Old Way (Flash) vs. The New Way (HTML5)
In the past, websites used **Adobe Flash** to show video and audio. Flash is now **dead** — browsers no longer support it. Today, HTML5 provides built-in tags:

- `<video>` — for embedding video files
- `<audio>` — for embedding audio files

These work in all modern browsers without any plugins.

### Task 2: Prepare Media Files
You need actual media files to practice with. You can use any of these options:

**Option A: Use your own files**
- Find a short video file (`.mp4` format is best)
- Find a short audio file (`.mp3` format is best)
- Copy them into `club-website/images/` (we will reuse the images folder for media)

**Option B: Use free sample files from the internet**
Download these free sample files:
- Video: Search for "sample mp4 download" — use any small MP4 file
- Audio: Search for "sample mp3 download" — use any small MP3 file

Save the video as `sample-video.mp4` and the audio as `sample-audio.mp3` inside `club-website/images/`.

> **Note:** For simplicity, we store media files in `images/`. In a larger project, you would use a separate `media/` folder.

### Task 3: Add Video to Your Page
Create a new file called `media.html` in the `club-website` folder:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Media Page</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>
        <h1>Student Technology Club</h1>
    </header>

    <nav class="main-nav">
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="pages/events.html">Events</a></li>
            <li><a href="pages/contact.html">Contact</a></li>
        </ul>
    </nav>

    <main>
        <h2>Club Introduction Video</h2>
        <p>Watch this short video about our club activities:</p>

        <video width="560" height="315" controls>
            <source src="images/sample-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </main>

    <footer>
        <p>&copy; 2025 Student Technology Club</p>
    </footer>
</body>
</html>
```

**Attributes for `<video>`:**

| Attribute | Purpose |
|-----------|---------|
| `width` | Width of the video player in pixels |
| `height` | Height of the video player in pixels |
| `controls` | Shows play, pause, volume, and fullscreen buttons |
| `autoplay` | Starts playing automatically (not recommended — annoying for users) |
| `loop` | Repeats the video when it ends |
| `muted` | Starts with sound off |
| `poster` | Shows an image before the video plays |

**Try adding more attributes** to the video tag:

```html
        <video width="560" height="315" controls poster="images/banner.jpg">
            <source src="images/sample-video.mp4" type="video/mp4">
            <source src="images/sample-video.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>
```

- `poster="images/banner.jpg"` shows a preview image before the user clicks play
- Two `<source>` tags give the browser options — it picks the first format it supports

### Task 4: Add Audio to Your Page
Add an audio section below the video in `media.html`:

```html
    <main>
        <h2>Club Introduction Video</h2>
        <p>Watch this short video about our club activities:</p>

        <video width="560" height="315" controls>
            <source src="images/sample-video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>

        <h2>Club Podcast</h2>
        <p>Listen to our latest podcast episode about web development:</p>

        <audio controls>
            <source src="images/sample-audio.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>

        <h2>Background Music (with controls)</h2>
        <p>Audio without controls (for demonstration only):</p>

        <audio controls loop>
            <source src="images/sample-audio.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </main>
```

**Attributes for `<audio>`:**

| Attribute | Purpose |
|-----------|---------|
| `controls` | Shows play, pause, and volume buttons |
| `autoplay` | Starts playing automatically |
| `loop` | Repeats the audio when it ends |
| `muted` | Starts with sound off |

**About `<source>` tags:**
- `<source src="file.mp3" type="audio/mpeg">` — MP3 format (works everywhere)
- `<source src="file.ogg" type="audio/ogg">` — OGG format (better quality, not supported by all browsers)
- The browser tries each `<source>` from top to bottom and plays the first one it supports

### Task 5: Add a Link to Media Page from Navigation
Add a "Media" link to the navigation in all HTML files. In each file, add this `<li>` inside `<nav>`:

For files in the root folder (`index.html`, `about.html`, `media.html`):
```html
<li><a href="media.html">Media</a></li>
```

For files in the `pages/` folder (`events.html`, `contact.html`):
```html
<li><a href="../media.html">Media</a></li>
```

Save and test. Click the Media link from every page to make sure it works.

## Starter Files
- `club-website` folder from previous sessions
- A video file (`.mp4`) and an audio file (`.mp3`) placed inside `images/`
- `css/style.css` with all previous CSS rules

## Expected Result

```
┌──────────────────────────────────────────────────┐
│  [dark header]                                   │
│         Student Technology Club                  │
├──────────────────────────────────────────────────┤
│  [nav bar] Home | About | Events | Contact | Media│
├──────────────────────────────────────────────────┤
│                                                  │
│  Club Introduction Video                         │
│  Watch this short video about our activities:    │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │                                        │      │
│  │          [VIDEO PLAYER]                │      │
│  │                                        │      │
│  │         ▶ 00:00 ────●──── 02:30 🔊    │      │
│  └────────────────────────────────────────┘      │
│  (560px wide, with controls: play, pause,        │
│   volume, fullscreen)                            │
│                                                  │
│  Club Podcast                                    │
│  Listen to our latest podcast episode:           │
│                                                  │
│  ┌────────────────────────────────────────┐      │
│  │  ▶ 00:00 ────●──── 05:00 🔊          │      │
│  └────────────────────────────────────────┘      │
│  (audio player bar — no video, just controls)    │
│                                                  │
├──────────────────────────────────────────────────┤
│  [footer]  (c) 2025 Student Technology Club      │
└──────────────────────────────────────────────────┘
```

## Self-Check (answers included)

Answer from **your own media page** first, then open the arrow.

<details>
<summary>1. Why give `<video>` two `<source>` elements when your MP4 already plays in Chrome?</summary>

Because "plays in Chrome" is not the same as "plays". No single format is
guaranteed everywhere, and codec support is a licensing matter as much as a
technical one.

The browser reads the `<source>` list **top to bottom, stops at the first one it
can play**, and ignores the rest.

```html
<video controls>
    <source src="images/club-intro.mp4" type="video/mp4">
    <source src="images/club-intro.webm" type="video/webm">
    Your browser cannot play this video.
</video>
```

Get the `type` attribute right. It lets the browser skip a format without
downloading it first; a wrong `type` can make it reject a file it could actually
play.

Order by preference: put your best-supported format first.

</details>

<details>
<summary>2. Your video area is blank — no player at all. Then a different problem: the player appears but shows a black box. Different causes. What are they?</summary>

**No player at all** → the `<video>` element itself is wrong. Usually a missing
`controls` attribute (so there is nothing to see until it plays) or the whole tag
is misspelled.

**Player appears, black box** → the element is fine; the **file** is not being
loaded. The path is wrong, the file name differs in case, or the format is
unsupported.

The distinction matters because it tells you where to look — markup versus file.
To confirm which, press **F12** and open the Network tab, then reload. A 404 on
the media file proves it is the path, not the tag.

`poster="images/banner.jpg"` also removes the black box while the video is
un-played, which is why real sites always set one.

</details>

<details>
<summary>3. Why is `autoplay` considered bad practice, and what is the one situation where it is accepted?</summary>

Because it takes control from the visitor: unexpected sound, wasted mobile data,
and it talks over a screen reader. Browsers now treat it as abuse and **block
autoplay with sound by default**, so it often does not even work.

The accepted case is a silent decorative background video:

```html
<video autoplay muted loop playsinline>
```

All four attributes are load-bearing — `muted` is what browsers require before
allowing autoplay at all, and without it your `autoplay` is simply ignored.

For any content the visitor is meant to *watch*, use `controls` and let them
press play.

</details>

<details>
<summary>4. Challenge — no code given: embed a podcast episode with a visible title, fallback text, and a direct download link for students with slow connections. Write it yourself first.</summary>

```html
<h2>Club Podcast — Episode 3</h2>
<p>Interview with a graduate now working as a front-end developer.</p>

<audio controls>
    <source src="images/podcast-ep3.mp3" type="audio/mpeg">
    <source src="images/podcast-ep3.ogg" type="audio/ogg">
    Your browser cannot play this audio.
    <a href="images/podcast-ep3.mp3">Download the MP3 instead</a>.
</audio>

<p><a href="images/podcast-ep3.mp3" download>Download episode 3 (MP3, 8 MB)</a></p>
```

Four things worth noting in your version:

1. MP3's MIME type is `audio/mpeg`, **not** `audio/mp3`. This one catches almost
   everybody.
2. The fallback content between the tags may contain a link — so a browser that
   cannot play the file still offers a way to hear it.
3. The `download` attribute makes the browser save the file rather than navigate
   to it.
4. Stating the size (8 MB) is a courtesy on a metered mobile connection.

</details>

## Checklist
- [ ] Created `media.html` with proper HTML5 structure
- [ ] Added a `<video>` tag with `controls` attribute
- [ ] Set `width` and `height` on the video player
- [ ] Used `<source>` with the correct `src` and `type` attributes
- [ ] Added fallback text ("Your browser does not support the video tag")
- [ ] Added an `<audio>` tag with `controls`
- [ ] Added an `<audio>` tag with the `loop` attribute
- [ ] Linked `media.html` from the navigation on all pages
- [ ] Previewed the page and confirmed video/audio players appear

## Tips
- If the video does not play, check: is the file path correct? Is the file format `.mp4`? Is the file actually inside the `images/` folder?
- The text between `<video>` and `</video>` (e.g., "Your browser does not support the video tag") is only shown if the browser cannot play the video at all. It is a fallback message.
- `controls` is a **boolean attribute** — you just write `controls`, not `controls="true"`. Its presence means "true."
- For the best browser support, provide multiple `<source>` files in different formats (MP4 + WebM for video, MP3 + OGG for audio).
- Never use `autoplay` on a public website — it is very annoying for users.
