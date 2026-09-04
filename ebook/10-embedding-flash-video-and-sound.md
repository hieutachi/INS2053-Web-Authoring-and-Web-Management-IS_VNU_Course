# 🟦 SESSION 10
# **Embedding Flash, Video and Sound**

Welcome back, friend! In this session we are going to make your Student Club Website come alive with **video** and **audio**. Imagine a visitor landing on your club page and immediately seeing a promo video of your last event, or hearing your club anthem playing softly in the background — that is the power of multimedia on the web. You will also learn why an old technology called "Flash" is no longer used, so you never waste time on something that is dead. By the end of this session you will be able to embed videos and audio players confidently, using modern HTML5 standards that work in every browser. Let us get started!

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    MDN "Video and audio content"; MDN "Multimedia and embedding"
🎯 Objectives:   1. Explain why Flash was deprecated and what replaced it
                 2. Embed video with <video> and audio with <audio>
                 3. Supply multiple source formats and a text fallback
                 4. Embed third-party content safely with <iframe>
                 5. Add multimedia to the Student Club Website
📖 Prepare:      1. Review Sessions 4-9 (HTML structure, CSS styling, images)
                 2. Install VS Code
                 3. Download the sample media files
🖼 Diagrams:     canvases/buoi-10.canvas.tsx — VideoAnatomy, CodecFallback, AutoplayRules,
                 IframeEmbed
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO3 (choose appropriate technologies for web development)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Explain what Adobe Flash was and why it has been completely discontinued
- Describe the timeline of Flash's decline and the rise of HTML5 multimedia
- Embed a video in a web page using the HTML5 `<video>` element with proper attributes
- Embed an audio file using the HTML5 `<audio>` element
- Provide multiple video/audio formats (`<source>`) for maximum browser compatibility
- Use the `poster` attribute to display a thumbnail before a video plays
- Write meaningful fallback text inside `<video>` and `<audio>` for accessibility
- Embed a YouTube or Vimeo video using an `<iframe>`
- Style video and audio elements with CSS for a polished look
- Add a fully functional Media page to the Student Club Website project

---

# 📖 THEORY

## 1. The Rise and Fall of Adobe Flash

### 1.1 Definition

**Adobe Flash** (originally Macromedia Flash) was a multimedia software platform used from the late 1990s through the 2010s to create animations, interactive games, video players, and rich web applications. Flash content was delivered as `.swf` (ShockWave Flash) files and required a browser plugin called "Flash Player" to run.

For nearly two decades, Flash was *the* way to put anything animated or interactive on a website. Early YouTube, countless banner ads, entire game portals, and fancy restaurant menus were all built in Flash.

### 🎒 Real-life example

Think about the early 2000s internet. When you visited a cool website, you often saw a loading bar that said "Loading Flash Player..." before any content appeared. That was Flash. Many students' first experience with online games (like those on Miniclip or Newgrounds) was through Flash. Even YouTube originally used Flash to play videos — before switching to HTML5 in 2015.

### 1.2 Why Flash Was Discontinued

Flash had serious problems that eventually killed it:

1. **Security vulnerabilities**: Flash Player was one of the most exploited pieces of software in history. Hackers constantly found bugs in it to install malware on users' computers. Adobe released emergency security patches almost every month.

2. **Poor mobile performance**: Flash consumed enormous amounts of CPU and battery on mobile devices. Apple famously refused to support Flash on iPhone and iPad. Steve Jobs published an open letter in 2010 titled "Thoughts on Flash" explaining why Apple would never allow it.

3. **Not accessible**: Screen readers used by blind or visually impaired people could not read Flash content. This made Flash websites unusable for millions of people and violated accessibility laws in many countries.

4. **Required a plugin**: Users had to install and update Flash Player separately. Many corporate networks blocked it. Browsers eventually began blocking it by default.

5. **Open web standards emerged**: HTML5, CSS3, and JavaScript matured to provide everything Flash could do — but natively in the browser, without plugins, with better performance and security.

#### Flash Death Timeline

```
1996 ──── Flash created (Macromedia)
  │
2005 ──── YouTube launches using Flash video player
  │
2008 ──── Adobe buys Macromedia, renames to Adobe Flash
  │
2010 ──── Steve Jobs publishes "Thoughts on Flash"
  │         Apple blocks Flash on iOS forever
  │
2012 ──── Adobe stops developing Flash Player for Android
  │
2015 ──── YouTube switches to HTML5 video by default
  │         Facebook begins replacing Flash with HTML5
  │
2017 ──── Adobe announces Flash will reach End-of-Life
  │         by December 31, 2020
  │
2020 ──── Dec 31: Adobe officially kills Flash Player
  │         All major browsers remove Flash support
  │
2021+ ─── Flash content no longer runs in ANY modern browser
           Using Flash today = guaranteed broken website
```

⚠️ **Important notes**

- **NEVER use Flash for any new project.** It is completely dead.
- If you find old tutorials or textbooks that teach Flash, **ignore them**. They are outdated.
- Any `.swf` file embedded in a webpage today will show a blank space or an error.
- Modern replacements: HTML5 `<video>`, `<audio>`, `<canvas>`, CSS animations, JavaScript/WebGL.

### 🧪 Try It Yourself — Spot Legacy Media Code

**Task (4 min):** Learn to recognise the markup you must never copy.

1. Search the web for a 2008-era tutorial on "embed video in HTML".
2. Look for any of these signals:
   ```html
   <object type="application/x-shockwave-flash" data="movie.swf">
   <embed src="movie.swf">
   <param name="movie" value="movie.swf">
   ```
3. Now write the modern equivalent of the same intent:
   ```html
   <video controls width="640">
       <source src="video/movie.mp4" type="video/mp4">
   </video>
   ```

**Expected result:** Four lines of plugin configuration collapse into three lines of standard HTML that needs no plugin at all.

<details>
<summary>Why this chapter still mentions Flash</summary>

Flash was removed from every browser on **31 December 2020**. Adobe ended support, and the runtime actively blocks content. A `.swf` file today is unplayable — not deprecated, not discouraged, but dead.

It stays in the syllabus for two reasons. First, the course textbook predates its removal, and you will meet the terminology. Second, you will be asked to maintain sites built in that era, and the job is recognising `<object>`/`<embed>`/`.swf` and knowing what replaces it:

| Old Flash use | Modern replacement |
|---|---|
| Video player | `<video>` |
| Audio player | `<audio>` |
| Animation | CSS animations, or SVG |
| Interactive widget | HTML, CSS, and JavaScript |
| Games | `<canvas>` and JavaScript, or WebGL |

The lesson underneath is worth more than the history: proprietary plugins requiring a separate runtime lose to open standards built into the browser. That is why `<video>` won.

</details>


---

## 2. HTML5 Video: The `<video>` Element

> 🖼 **Diagrams:** `canvases/buoi-10.canvas.tsx` → `VideoAnatomy` — slide `s10-video` ("The video Element"); `CodecFallback` — slide `s10-codec` ("Source & Codec Selection")

### 2.1 Definition

The HTML5 `<video>` element is a **built-in browser feature** that lets you embed video directly into a web page — no plugins, no downloads, no Flash. Every modern browser (Chrome, Firefox, Edge, Safari) supports it natively.

### 🎒 Real-life example

Every time you watch a video on a news website, a university lecture recording, or a product demo page that is NOT YouTube/Vimeo, it is probably using the HTML5 `<video>` element. Netflix's web player, for instance, uses HTML5 video under the hood.

### 2.2 Basic Syntax

```html
<!-- BASIC VIDEO EMBED -->
<video src="video/club-promo.mp4" controls width="640" height="360">
    Your browser does not support the video element.
</video>
```

Let us break down every part:

| Part | Meaning |
|------|---------|
| `<video>` | Opens the video element |
| `src="video/club-promo.mp4"` | Path to the video file (relative to your HTML file) |
| `controls` | Shows the browser's built-in play/pause/volume/fullscreen buttons |
| `width="640"` | Display width in pixels |
| `height="360"` | Display height in pixels |
| Text between tags | **Fallback text** shown if the browser cannot play the video |
| `</video>` | Closes the element |

### 2.3 All Important Attributes

| Attribute | Value | What it does |
|-----------|-------|-------------|
| `src` | URL/path | Specifies the video file location |
| `controls` | *(no value needed)* | Displays playback controls (play, pause, volume, seek, fullscreen) |
| `width` | number (pixels) | Sets the display width |
| `height` | number (pixels) | Sets the display height |
| `autoplay` | *(no value needed)* | Starts playing automatically when the page loads |
| `loop` | *(no value needed)* | Restarts the video from the beginning when it ends |
| `muted` | *(no value needed)* | Starts the video with sound turned off |
| `poster` | URL/path | Shows an image thumbnail BEFORE the user clicks play |
| `preload` | `auto`, `metadata`, `none` | Controls how much of the video loads before playing |
| `playsinline` | *(no value needed)* | On iOS, plays the video inside the page instead of going fullscreen |

⚠️ **Important notes about `autoplay`**

Modern browsers **block autoplay if the video has sound**. This is a user-experience protection — nobody wants a loud video blasting when they open a page. If you truly need autoplay, you MUST also add `muted`:

```html
<!-- This WILL autoplay (muted) -->
<video autoplay muted loop playsinline>
    <source src="video/background.mp4" type="video/mp4">
</video>

<!-- This will PROBABLY NOT autoplay (has sound) -->
<video autoplay>
    <source src="video/promo.mp4" type="video/mp4">
</video>
```

### 2.4 Video File Formats

Not all browsers support all video formats. Here is the comparison:

| Format | Extension | MIME Type | Chrome | Firefox | Safari | Edge | Best For |
|--------|-----------|-----------|--------|---------|--------|------|----------|
| **MP4 (H.264)** | `.mp4` | `video/mp4` | Yes | Yes | Yes | Yes | Universal compatibility — always include this |
| **WebM (VP8/VP9)** | `.webm` | `video/webm` | Yes | Yes | No* | Yes | Smaller file size, open format |
| **Ogg (Theora)** | `.ogv` | `video/ogg` | Yes | Yes | No | Partial | Legacy fallback, rarely needed now |

*Safari added limited WebM support in version 14.1+ but MP4 is still safer for Safari.

✅ **Best practice:** Always provide **MP4 as your primary format**. Optionally add WebM as a secondary source for browsers that prefer it.

### 2.5 Multiple Sources with `<source>`

Instead of a single `src` attribute, you can nest multiple `<source>` elements. The browser picks the **first format it supports**:

```html
<video controls width="640" height="360" poster="images/video-poster.jpg">
    <!-- Browser tries MP4 first (most compatible) -->
    <source src="video/club-promo.mp4" type="video/mp4">
    <!-- If MP4 fails, try WebM -->
    <source src="video/club-promo.webm" type="video/webm">
    <!-- If neither works, show this message -->
    <p>Your browser does not support HTML5 video.
       You can <a href="video/club-promo.mp4">download the video</a> instead.</p>
</video>
```

How the browser decides:
```
Browser opens <video>
    │
    ├── Can I play video/mp4? ──YES──▶ Play club-promo.mp4 ✓
    │
    └── NO ──▶ Can I play video/webm? ──YES──▶ Play club-promo.webm ✓
                                      │
                                      └── NO ──▶ Show fallback <p> text
```

⚠️ **Important notes**

- The `type` attribute on `<source>` tells the browser the MIME type so it can decide WITHOUT downloading the file first.
- Always put the **most compatible format first** (MP4).
- Always include **fallback text** inside the `<video>` tag for very old browsers or assistive technologies.
- The fallback text should include a **download link** so users can still access the content.

### 2.6 The `poster` Attribute Explained

The `poster` attribute specifies an image that appears as a thumbnail before the video starts playing. Without a poster, some browsers show a black rectangle or the first frame of the video (which might be blurry or unattractive).

```html
<video controls width="640" poster="images/video-thumbnail.jpg">
    <source src="video/club-promo.mp4" type="video/mp4">
</video>
```

Tips for good poster images:
- Use the same aspect ratio as the video (e.g., 16:9 → 640×360)
- Choose a visually appealing frame that represents the video content
- Optimize the image (JPEG, under 200KB) so it loads quickly
- Include text overlay like "Click to Play" if appropriate

### 2.7 Preload Options

The `preload` attribute hints to the browser how much of the video to load before the user presses play:

| Value | Behavior | When to Use |
|-------|----------|-------------|
| `auto` | Download the entire video immediately | Short clips where instant playback matters |
| `metadata` | Only download headers (duration, dimensions) | Most pages — balances speed and data usage |
| `none` | Do not download anything until play is pressed | Pages with many videos; saves bandwidth |

```html
<!-- Recommended default for most cases -->
<video controls preload="metadata">
    <source src="video/club-promo.mp4" type="video/mp4">
</video>
```

⚠️ Note: `preload` is only a *hint*. Mobile browsers often ignore it to save data.

### 🧪 Try It Yourself — A Video Element That Behaves

**Task (7 min):** Add a video and remove each attribute in turn to see what it was doing.

1. Start with the complete element:
   ```html
   <video controls width="640" height="360" poster="images/video-cover.jpg" preload="metadata">
       <source src="video/intro.mp4" type="video/mp4">
       <track kind="captions" src="video/intro.vtt" srclang="en" label="English" default>
       <p>Your browser does not support HTML5 video.
          <a href="video/intro.mp4">Download the video</a>.</p>
   </video>
   ```
2. Reload and confirm it plays and the CC button appears.
3. Now remove `controls`, reload, and try to play it.
4. Put `controls` back, remove `poster`, and reload.
5. Remove `width` and `height`, then reload with the Network tab throttled to Slow 3G.

**Expected result:** No `controls` gives a frozen first frame with no way to start it. No `poster` shows a black rectangle until playback begins. No `width`/`height` makes the page jump as the video's real size arrives.

<details>
<summary>What each attribute is actually for</summary>

| Attribute | Without it |
|---|---|
| `controls` | No play button. The video is unusable unless you script your own controls. |
| `poster` | A black box before play. The poster is your one chance to make the video look inviting. |
| `width` / `height` | Layout shift as the metadata loads — content jumps under the reader's cursor. |
| `preload="metadata"` | Either the whole file downloads (`auto`) or the duration is unknown (`none`). |
| `<track>` | No captions. The video is inaccessible to deaf users and unusable in a silent room. |

On `autoplay`: mobile browsers block it unless the video is also `muted`, and even then it is intrusive. If you must autoplay, use `autoplay muted loop playsinline` and no audio track — that combination is for background decoration, not for content anyone needs to hear.

Always provide MP4 (H.264). WebM is smaller and fine as an additional `<source>`, but MP4 is the one format every browser and device can play.

</details>


---

## 3. HTML5 Audio: The `<audio>` Element

> 🖼 **Diagram:** `canvases/buoi-10.canvas.tsx` → `AutoplayRules` — slide `s10-audio` ("Audio & Autoplay Rules")

### 3.1 Definition

The `<audio>` element works almost identically to `<video>`, but for sound files. It displays a compact audio player with play/pause, volume, and seek controls.

### 🎒 Real-life example

Podcast websites, music streaming previews, pronunciation guides on dictionary sites, and notification sound demos all use the `<audio>` element.

### 3.2 Basic Syntax

```html
<audio src="audio/club-anthem.mp3" controls>
    Your browser does not support the audio element.
</audio>
```

### 3.3 Audio File Formats

| Format | Extension | MIME Type | Chrome | Firefox | Safari | Edge | Notes |
|--------|-----------|-----------|--------|---------|--------|------|-------|
| **MP3** | `.mp3` | `audio/mpeg` | Yes | Yes | Yes | Yes | Universal — always include this |
| **WAV** | `.wav` | `audio/wav` | Yes | Yes | Yes | Yes | Uncompressed, large files |
| **Ogg Vorbis** | `.ogg` | `audio/ogg` | Yes | Yes | No | Partial | Open format, smaller than MP3 |
| **AAC** | `.aac` | `audio/aac` | Yes | Yes | Yes | Yes | Better quality than MP3 at same bitrate |

✅ **Best practice:** MP3 is the safest choice for universal compatibility. Provide Ogg as a secondary source if you want.

### 3.4 Multiple Audio Sources

```html
<audio controls>
    <source src="audio/club-anthem.mp3" type="audio/mpeg">
    <source src="audio/club-anthem.ogg" type="audio/ogg">
    <p>Your browser does not support the audio element.
       <a href="audio/club-anthem.mp3">Download the MP3</a>.</p>
</audio>
```

### 3.5 Shared Attributes with `<video>`

The `<audio>` element shares these attributes with `<video>`:

- `controls` — show playback controls
- `autoplay` — start automatically (same browser restrictions apply)
- `loop` — repeat when finished
- `muted` — start silent
- `preload` — `auto`, `metadata`, or `none`

⚠️ **Important notes**

- Unlike `<video>`, the `<audio>` element does NOT have `width`, `height`, or `poster` attributes. The browser renders a fixed-size audio widget.
- You CAN style the surrounding container with CSS, but the player controls themselves are browser-rendered and vary between browsers.

### 🧪 Try It Yourself — Audio With a Real Fallback

**Task (5 min):** Add a podcast clip that stays usable when playback fails.

1. Add the element:
   ```html
   <audio controls preload="metadata">
       <source src="audio/interview.mp3" type="audio/mpeg">
       <source src="audio/interview.ogg" type="audio/ogg">
       <p>Your browser cannot play audio.
          <a href="audio/interview.mp3">Download the interview (4 MB)</a>.</p>
   </audio>
   ```
2. Reload and confirm the controls appear and play.
3. Now break both `src` paths on purpose and reload.
4. Watch the Console and Network tabs.

**Expected result:** With broken paths you get a player that will not play and a Console error — but the download link never appears, because the fallback text only shows in browsers that do not support `<audio>` at all.

<details>
<summary>The distinction worth understanding</summary>

There are two different failure modes, and they need different handling:

1. **The element is unsupported** — the fallback `<p>` inside `<audio>` renders. This is now rare; every current browser supports `<audio>`.
2. **The file will not load or the codec is unsupported** — the element renders, the fallback does not, and the user gets a dead player.

Case 2 is the realistic one, and the fix is a visible download link *outside* the element as well:

```html
<p><a href="audio/interview.mp3">Download the interview (MP3, 4 MB)</a></p>
```

Stating the format and size is a small courtesy that matters on a metered mobile connection.

`preload="metadata"` is the right default: it fetches duration and track info so the controls are accurate, without downloading the whole file for someone who may never press play.

</details>


---

## 4. Image Formats Recap

Since we are discussing media, let us quickly review image formats relevant to multimedia pages (especially for `poster` images):

| Format | Best For | Transparency | Animation | Compression |
|--------|----------|-------------|-----------|-------------|
| **JPEG** (.jpg) | Photos, complex images | No | No | Lossy — small files |
| **PNG** (.png) | Logos, screenshots, graphics | Yes | No | Lossless — larger files |
| **GIF** (.gif) | Simple animations | Limited (1-bit) | Yes (limited colors) | Lossless but limited palette |
| **WebP** (.webp) | Modern replacement for JPEG/PNG | Yes | Yes | Both lossy and lossless |
| **SVG** (.svg) | Icons, logos, vector graphics | Yes | Yes (CSS/JS) | Scalable, tiny for simple shapes |

✅ For video poster images: use **JPEG** (small file, photographic quality).
✅ For icons and logos on your media page: use **SVG** or **PNG**.
✅ For modern projects: consider **WebP** for better compression.

---

## 5. Embedding Third-Party Videos (YouTube / Vimeo)

> 🖼 **Diagram:** `canvases/buoi-10.canvas.tsx` → `IframeEmbed` — slide `s10-iframe` ("YouTube / Vimeo Embeds")

### 5.1 Why Use an Iframe Instead of Self-Hosting?

Hosting your own video files has drawbacks:

- Large files consume YOUR server bandwidth and storage
- You must convert to multiple formats yourself
- No adaptive streaming (quality adjustment based on connection speed)
- No built-in analytics, captions, or sharing features

Platforms like YouTube and Vimeo handle all of this for free. You simply embed their player.

### 5.2 How to Get the Embed Code

1. Go to the YouTube video
2. Click **Share** → **Embed**
3. Copy the `<iframe>` code provided
4. Paste it into your HTML

### 5.3 Iframe Embed Syntax

```html
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Student Club Promo Video"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
```

| Attribute | Purpose |
|-----------|---------|
| `src` | YouTube embed URL with the video ID |
| `title` | Descriptive title for accessibility (screen readers announce this) |
| `frameborder="0"` | Removes the border around the iframe |
| `allow` | Lists permissions the embedded player needs |
| `allowfullscreen` | Allows the user to go fullscreen |

⚠️ **Important notes**

- Replace `VIDEO_ID` with the actual ID from the YouTube URL. For example, if the URL is `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, the ID is `dQw4w9WgXcQ`.
- Always include the `title` attribute for accessibility.
- For responsive iframes, wrap them in a container (see CSS below).

### 5.4 Responsive Iframe Container

Iframes have a fixed aspect ratio. To make them responsive, use the "padding-bottom hack":

```css
.video-container {
    position: relative;
    padding-bottom: 56.25%;   /* 16:9 aspect ratio = 9/16 = 0.5625 */
    height: 0;
    overflow: hidden;
    border-radius: 8px;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
```

How this works:
```
.video-container
┌─────────────────────────────────────┐
│  padding-bottom: 56.25%             │ ← Creates height proportional to width
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │     iframe (absolute)         │  │ ← Fills the container exactly
│  │     width: 100%               │  │
│  │     height: 100%              │  │
│  │                               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## ✅ Best Practices

1. **Always include `controls`** unless you are building a custom JavaScript player. Users need to be able to pause, adjust volume, and seek.

2. **Always provide fallback text** inside `<video>` and `<audio>` elements. Include a download link so users on incompatible browsers can still access the content.

3. **Provide MP4 as the primary video format.** It has the widest browser support. Add WebM as a bonus for smaller file sizes.

4. **Use `poster` for videos.** A good thumbnail invites clicks and looks professional.

5. **Compress your media files.** Use tools like HandBrake (free, https://handbrake.fr/) for video and Audacity (free, https://www.audacityteam.org/) for audio. Target:
   - Video: Under 10 MB for short clips (under 2 minutes)
   - Audio: Under 3 MB for songs (MP3, 128-192 kbps)
   - Poster images: Under 200 KB (JPEG, optimized)

6. **Use YouTube/Vimeo for long videos** (over 5 minutes). Self-hosting long videos wastes bandwidth and provides a worse experience.

7. **Never rely on `autoplay` with sound.** Always pair `autoplay` with `muted`. Better yet, let users choose when to play.

8. **Add `preload="metadata"`** to avoid downloading full videos before the user interacts with them.

9. **Make iframes responsive** using the padding-bottom container technique.

10. **Include descriptive `title` attributes** on iframes and meaningful fallback text for screen reader users.

---

## ❌ Common Mistakes

### Mistake 1: Trying to use Flash

❌ **Wrong:**
```html
<!-- DO NOT DO THIS — Flash is dead -->
<object type="application/x-shockwave-flash" data="intro.swf" width="640" height="360">
    <param name="movie" value="intro.swf">
</object>
```

✅ **Correct:**
```html
<video controls width="640" height="360">
    <source src="video/intro.mp4" type="video/mp4">
    <p>Your browser does not support HTML5 video.
       <a href="video/intro.mp4">Download the video</a>.</p>
</video>
```

### Mistake 2: Forgetting `controls`

❌ **Wrong:**
```html
<!-- User sees a frozen video with NO way to play it -->
<video src="video/promo.mp4" width="640"></video>
```

✅ **Correct:**
```html
<video src="video/promo.mp4" controls width="640"></video>
```

### Mistake 3: Using only one obscure format

❌ **Wrong:**
```html
<!-- Only Ogg — won't work in Safari -->
<video controls>
    <source src="video/promo.ogv" type="video/ogg">
</video>
```

✅ **Correct:**
```html
<!-- MP4 first (universal), then Ogg as fallback -->
<video controls>
    <source src="video/promo.mp4" type="video/mp4">
    <source src="video/promo.ogv" type="video/ogg">
    <p><a href="video/promo.mp4">Download video</a></p>
</video>
```

### Mistake 4: Autoplay with sound

❌ **Wrong:**
```html
<!-- Browser will BLOCK this -->
<video autoplay src="video/promo.mp4"></video>
```

✅ **Correct:**
```html
<!-- Muted autoplay works; OR just use controls and let users click play -->
<video autoplay muted loop playsinline>
    <source src="video/background.mp4" type="video/mp4">
</video>
```

### Mistake 5: Huge uncompressed video files

❌ **Wrong:** Uploading a 500 MB raw video file directly to your website folder.

✅ **Correct:** Compress with HandBrake first. Target H.264 codec, 720p or 1080p, reasonable bitrate (2-5 Mbps). Result: 10-30 MB for a 2-minute clip.

### Mistake 6: Missing `title` on iframes

❌ **Wrong:**
```html
<iframe src="https://www.youtube.com/embed/abc123" allowfullscreen></iframe>
```

✅ **Correct:**
```html
<iframe
    src="https://www.youtube.com/embed/abc123"
    title="Student Club Annual Gala Highlights"
    allowfullscreen>
</iframe>
```

### Mistake 7: No fallback text

❌ **Wrong:**
```html
<video controls>
    <source src="video/promo.mp4" type="video/mp4">
</video>
```

✅ **Correct:**
```html
<video controls>
    <source src="video/promo.mp4" type="video/mp4">
    <p>Your browser does not support HTML5 video.
       <a href="video/promo.mp4">Download the video</a>.</p>
</video>
```

### 🧪 Try It Yourself — Embed YouTube Without Slowing the Page

**Task (6 min):** Add a third-party video and measure what it costs.

1. On YouTube, use **Share → Embed** and copy the iframe. Add the accessibility and performance attributes yourself:
   ```html
   <iframe
       width="560" height="315"
       src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
       title="Student Web Club showcase 2026"
       loading="lazy"
       allowfullscreen>
   </iframe>
   ```
2. Reload with F12 → **Network** open and read the total transferred size at the bottom.
3. Now remove `loading="lazy"`, put the iframe far down the page, and compare.

**Expected result:** A YouTube embed pulls in roughly a megabyte of player code before anyone presses play. With `loading="lazy"` and the iframe below the fold, none of it loads until the visitor scrolls near it.

<details>
<summary>The four attributes and why each is there</summary>

- **`title`** — required for accessibility. An iframe with no title is announced only as "frame", so a screen reader user cannot tell what it contains. This is the most commonly missed attribute on the web.
- **`loading="lazy"`** — defers the whole embed until it is near the viewport. One attribute, large win.
- **`youtube-nocookie.com`** — the same player without tracking cookies set on load. Better for your visitors' privacy and often required by university policy.
- **`allowfullscreen`** — without it the fullscreen button is disabled.

Use the `/embed/` URL, not the `watch?v=` address bar URL. The watch URL refuses to load in a frame, and the console reports a frame-ancestors error rather than anything about YouTube.

Host your own file with `<video>` when the content is yours and small. Embed when the video is long — you get YouTube's bandwidth, adaptive quality, and captions for free.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---------|-----------|---------|
| Adobe Flash | Deprecated multimedia plugin, discontinued Dec 2020 | Old YouTube player, `.swf` banner ads |
| `<video>` | HTML5 element for embedding video natively | `<video controls src="clip.mp4">` |
| `<audio>` | HTML5 element for embedding audio natively | `<audio controls src="song.mp3">` |
| `<source>` | Child element specifying alternative media formats | `<source src="v.mp4" type="video/mp4">` |
| `controls` | Attribute showing browser playback UI | Play, pause, volume, seek bar, fullscreen |
| `poster` | Thumbnail image displayed before video plays | `poster="images/thumb.jpg"` |
| `autoplay` | Auto-starts media (must be muted for video) | `<video autoplay muted>` |
| `loop` | Repeats media when it reaches the end | `<audio loop controls>` |
| `preload` | Hint for how much media to pre-download | `preload="metadata"` |
| `<iframe>` | Embeds external content (YouTube, Vimeo) | `<iframe src="youtube.com/embed/...">` |
| Fallback text | Content inside `<video>`/`<audio>` for unsupported browsers | `<p>Download the video instead</p>` |
| MP4 (H.264) | Most universally supported video format | `.mp4` files |
| WebM | Open video format with smaller file sizes | `.webm` files |
| MP3 | Most universally supported audio format | `.mp3` files |
| Responsive iframe | Padding-bottom technique for fluid video embeds | `padding-bottom: 56.25%` |

---

# 💡 WORKED EXAMPLES

## Example 1: Basic Video with Controls and Poster

**Situation:** You want to add a promotional video for the Student Club on the home page. The video file is `club-promo.mp4` stored in the `video/` folder. You have a thumbnail image `promo-thumb.jpg` in the `images/` folder.

**Code:**
```html
<section class="media-section">
    <h3>Watch Our Promo Video</h3>
    <video controls
           width="640"
           height="360"
           poster="images/promo-thumb.jpg"
           preload="metadata">
        <source src="video/club-promo.mp4" type="video/mp4">
        <source src="video/club-promo.webm" type="video/webm">
        <p>Your browser does not support HTML5 video.
           <a href="video/club-promo.mp4">Download the video</a>.</p>
    </video>
    <p class="caption">See what our club is all about!</p>
</section>
```

**Line-by-line explanation:**

| Line | Explanation |
|------|-------------|
| `<section class="media-section">` | Wraps the video in a semantic section with a class for CSS styling |
| `<h3>Watch Our Promo Video</h3>` | Heading describing the video content |
| `<video controls` | Opens the video element; `controls` shows the playback toolbar |
| `width="640"` | Sets display width to 640 pixels |
| `height="360"` | Sets display height to 360 pixels (16:9 ratio) |
| `poster="images/promo-thumb.jpg"` | Shows this image before the user clicks play |
| `preload="metadata">` | Only loads video metadata (duration, size) initially — saves bandwidth |
| `<source src="video/club-promo.mp4" type="video/mp4">` | First choice: MP4 format (widest support) |
| `<source src="video/club-promo.webm" type="video/webm">` | Second choice: WebM format (smaller file, works in Chrome/Firefox/Edge) |
| `<p>Your browser does not...` | Fallback paragraph shown only if NO source format is supported |
| `<a href="video/club-promo.mp4">Download the video</a>` | Provides a direct download link as last resort |
| `</video>` | Closes the video element |
| `<p class="caption">...` | Caption text below the video |

**Result:** The browser displays a 640×360 video player with the thumbnail image visible. When the user clicks play, the video starts with full controls (play/pause, volume, timeline, fullscreen). If the browser cannot play either format, the user sees a message with a download link.

---

## Example 2: Background Decorative Video

**Situation:** You want a subtle looping video as a decorative background behind your hero section. It should autoplay silently and loop forever.

**Code:**
```html
<div class="hero-background">
    <video autoplay muted loop playsinline>
        <source src="video/campus-aerial.mp4" type="video/mp4">
    </video>
</div>
```

```css
.hero-background {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.hero-background video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    transform: translate(-50%, -50%);
    object-fit: cover;
}
```

**Line-by-line explanation:**

| Line | Explanation |
|------|-------------|
| `autoplay` | Video starts playing as soon as the page loads |
| `muted` | REQUIRED for autoplay to work in modern browsers |
| `loop` | Video restarts from the beginning when it ends — infinite loop |
| `playsinline` | On iOS, prevents the video from popping into fullscreen mode |
| No `controls` | Intentional — this is decorative, users should not interact with it |
| `position: absolute` + `transform` | Centers the video within its container regardless of aspect ratio |
| `object-fit: cover` | Ensures the video fills the container without distortion (crops edges if needed) |
| `overflow: hidden` | Clips any part of the video that extends beyond the container |

**Result:** A silent, looping video fills the hero section background. It autoplays on all modern browsers including mobile. There are no visible controls because this is purely decorative.

⚠️ **Accessibility warning:** Decorative background videos can be distracting for some users. Consider adding a "Pause animation" button nearby, and always ensure text on top of the video remains readable (add a semi-transparent overlay if needed).

---

## Example 3: Audio Player with Styling

**Situation:** You want to add the Student Club anthem as an audio player on the Media page, wrapped in a styled container.

**Code:**
```html
<div class="audio-player">
    <h3>🎵 Club Anthem</h3>
    <audio controls>
        <source src="audio/club-anthem.mp3" type="audio/mpeg">
        <source src="audio/club-anthem.ogg" type="audio/ogg">
        <p>Your browser does not support the audio element.
           <a href="audio/club-anthem.mp3">Download the MP3</a>.</p>
    </audio>
    <p class="caption">Listen to the official Student Club anthem.</p>
</div>
```

```css
.audio-player {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    text-align: center;
    border: 1px solid #e0e0e0;
}

.audio-player h3 {
    margin-bottom: 10px;
    color: #1a5276;
    font-size: 20px;
}

.audio-player audio {
    width: 100%;
    max-width: 400px;
}

.audio-player .caption {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    font-style: italic;
}
```

**Line-by-line explanation:**

| Line | Explanation |
|------|-------------|
| `<div class="audio-player">` | Wrapper div for styling the entire audio section |
| `<h3>🎵 Club Anthem</h3>` | Title above the player |
| `<audio controls>` | Audio element with browser-native playback controls |
| `<source ... type="audio/mpeg">` | Primary format: MP3 (universal) |
| `<source ... type="audio/ogg">` | Secondary format: Ogg (open format, smaller) |
| Fallback `<p>` with download link | Shown only if browser cannot play either format |
| `.audio-player { background-color: #f8f9fa }` | Light gray background to visually separate the player |
| `text-align: center` | Centers the heading, player, and caption |
| `audio { width: 100%; max-width: 400px }` | Makes the audio player responsive but caps its width |

**Result:** A neatly styled card containing the audio player. The player shows standard browser controls (play/pause, timeline, volume). Below it, an italic caption describes the audio.

---

## Example 4: Responsive YouTube Embed

**Situation:** You want to embed a YouTube video on the Media page so it resizes properly on mobile devices.

**Code:**
```html
<div class="video-container">
    <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Student Club Annual Event Highlights"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
    </iframe>
</div>
```

```css
.video-container {
    position: relative;
    padding-bottom: 56.25%;   /* 16:9 ratio */
    height: 0;
    overflow: hidden;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
```

**Line-by-line explanation:**

| Line | Explanation |
|------|-------------|
| `.video-container` | Wrapper div that maintains the 16:9 aspect ratio |
| `position: relative` | Establishes a positioning context for the absolutely-positioned iframe |
| `padding-bottom: 56.25%` | Creates vertical space equal to 56.25% of the container's WIDTH (= 9÷16). This is the magic that preserves aspect ratio. |
| `height: 0` | Actual height comes from padding, not from the height property |
| `overflow: hidden` | Clips anything that spills outside the container |
| `iframe { position: absolute }` | Takes the iframe out of normal flow and stretches it to fill the container |
| `width: 100%; height: 100%` | Fills the entire container area |
| `border: none` | Removes any default iframe border |
| `title="..."` | Accessibility: screen readers announce this description |
| `allowfullscreen` | Permits the YouTube player to enter fullscreen mode |

**Result:** The YouTube video scales fluidly from desktop to mobile, always maintaining the correct 16:9 proportions. No horizontal scrollbar, no squished video.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Before starting the tasks, prepare your project:

1. Open your **club-website** folder in VS Code.
2. Create two new folders inside the project root:
   ```
   club-website/
       video/          ← put video files here
       audio/          ← put audio files here
       images/         ← already exists; add poster images here
   ```
3. Download sample media files for testing:
   - Video: https://sample-videos.com/ (download a short MP4, rename to `club-promo.mp4`)
   - Audio: https://www.soundhelix.com/audio-examples (download an MP3, rename to `club-anthem.mp3`)
   - Alternatively, use any short video/audio files you already have
4. Create a poster image (640×360 JPEG) and save it as `images/video-poster.jpg`. You can take a screenshot from the video or use any relevant photo.

---

### TASK 1: Add a Promo Video Section to the Home Page

🎯 **Goal:** Embed a self-hosted HTML5 video on `index.html`.

🔧 **Steps:**

1. Open `index.html` in VS Code.
2. Inside the `<main>` element, after the welcome/intro section, add a new `<section>`:

```html
<section class="media-section">
    <h3>Watch Our Promo Video</h3>
    <video controls
           poster="images/video-poster.jpg"
           preload="metadata">
        <source src="video/club-promo.mp4" type="video/mp4">
        <p>Your browser does not support HTML5 video.
           <a href="video/club-promo.mp4">Download the video</a>.</p>
    </video>
    <p class="caption">See what our Student Club is all about!</p>
</section>
```

3. Save the file.
4. Open `css/style.css` and add these styles:

```css
/* --- Media Section --- */
.media-section {
    margin: 30px 0;
    text-align: center;
}

.media-section video {
    display: block;
    margin: 15px auto;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
}

.caption {
    font-size: 14px;
    color: #666;
    font-style: italic;
    margin-top: 8px;
}
```

5. Save the CSS file.

✅ **Check:** Open `index.html` in your browser (F12 or double-click). You should see:
- The poster image displayed in the video player
- Clicking play starts the video
- Controls (play/pause, volume, fullscreen) are visible
- The video resizes when you resize the browser window

💾 **Save** both files. Commit mentally: "Added promo video to home page."

---

### TASK 2: Create a Full Media Page

🎯 **Goal:** Create `media.html` with video, audio, and YouTube embed.

🔧 **Steps:**

1. Create a new file `media.html` in your project root.
2. Add the complete HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Club - Media</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="wrapper">
        <header>
            <h1>Student Club</h1>
            <p>Learn. Create. Connect.</p>
        </header>

        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="media.html" class="active">Media</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>

        <div id="main-area">
            <main>
                <h2>Media Center</h2>

                <!-- SECTION: Promotional Video -->
                <section>
                    <h3>Club Promotional Video</h3>
                    <video controls
                           poster="images/video-poster.jpg"
                           preload="metadata">
                        <source src="video/club-promo.mp4" type="video/mp4">
                        <source src="video/club-promo.webm" type="video/webm">
                        <p>Your browser does not support HTML5 video.
                           <a href="video/club-promo.mp4">Download the video</a>.</p>
                    </video>
                    <p class="caption">Our latest promotional video showcasing club activities.</p>
                </section>

                <!-- SECTION: YouTube Embed -->
                <section>
                    <h3>Event Highlights on YouTube</h3>
                    <div class="video-container">
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Student Club Event Highlights"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <p class="caption">Highlights from our annual gala event.</p>
                </section>

                <!-- SECTION: Audio Player -->
                <section>
                    <h3>Club Anthem</h3>
                    <div class="audio-player">
                        <audio controls>
                            <source src="audio/club-anthem.mp3" type="audio/mpeg">
                            <source src="audio/club-anthem.ogg" type="audio/ogg">
                            <p>Your browser does not support the audio element.
                               <a href="audio/club-anthem.mp3">Download the MP3</a>.</p>
                        </audio>
                        <p class="caption">Listen to the official Student Club anthem.</p>
                    </div>
                </section>
            </main>

            <aside id="sidebar">
                <h3>Media Library</h3>
                <ul>
                    <li><a href="#">Promo Videos</a> (3)</li>
                    <li><a href="#">Event Recordings</a> (12)</li>
                    <li><a href="#">Music</a> (5)</li>
                    <li><a href="#">Podcasts</a> (8)</li>
                </ul>

                <h3>Follow Us</h3>
                <p>
                    <a href="#">Facebook</a> |
                    <a href="#">Instagram</a> |
                    <a href="#">YouTube</a>
                </p>
            </aside>
        </div>

        <footer>
            <p>&copy; 2024 Student Club. All rights reserved.</p>
            <p>Email: <a href="mailto:club@university.edu">club@university.edu</a></p>
        </footer>
    </div>
</body>
</html>
```

3. Save the file.

✅ **Check:** Open `media.html` in your browser. Verify:
- The self-hosted video plays with controls
- The YouTube embed loads and plays
- The audio player shows and plays audio
- Sidebar and footer render correctly
- Navigation links work (including the highlighted "Media" link)

💾 **Save** the file.

---

### TASK 3: Update Navigation on ALL Other Pages

🎯 **Goal:** Ensure every page in the site links to `media.html`.

🔧 **Steps:**

1. Open each of these files in VS Code:
   - `index.html`
   - `about.html`
   - `events.html`
   - `gallery.html`
   - `contact.html`

2. In EACH file, find the `<nav><ul>` section and add this line AFTER the Gallery link:

```html
<li><a href="media.html">Media</a></li>
```

3. Make sure the navigation order is consistent across ALL pages:
   Home → About Us → Events → Gallery → **Media** → Contact

4. On `media.html` itself, ensure the Media link has `class="active"`:
```html
<li><a href="media.html" class="active">Media</a></li>
```

5. Save ALL modified files.

✅ **Check:** Navigate through every page using the nav bar. Click "Media" from each page. Verify you land on `media.html` every time. Verify the "Media" link is highlighted on `media.html`.

💾 **Save** all files.

---

### TASK 4: Add Multimedia CSS to Your Stylesheet

🎯 **Goal:** Add all necessary CSS for video, audio, and iframe elements.

🔧 **Steps:**

1. Open `css/style.css`.
2. Scroll to the bottom and add:

```css
/* ==========================================
   MULTIMEDIA STYLES (Session 10)
   ========================================== */

/* --- Video Styles --- */
video {
    display: block;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    height: auto;
}

/* --- Audio Player Container --- */
.audio-player {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    text-align: center;
    border: 1px solid #e0e0e0;
}

.audio-player audio {
    width: 100%;
    max-width: 400px;
}

.audio-player h3 {
    margin-bottom: 10px;
    color: #1a5276;
}

/* --- Responsive YouTube/Iframe Container --- */
.video-container {
    position: relative;
    padding-bottom: 56.25%;   /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin: 20px 0;
    border-radius: 8px;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* --- Captions --- */
.caption {
    font-size: 14px;
    color: #666;
    font-style: italic;
    text-align: center;
    margin-top: 8px;
}

/* --- Media Section --- */
.media-section {
    margin: 30px 0;
    text-align: center;
}
```

3. Save the CSS file.

✅ **Check:** Reload `media.html` in the browser. Verify:
- Videos have rounded corners and shadow
- Audio player has a light gray background card
- YouTube embed maintains 16:9 ratio when resizing the browser
- Captions are italicized and centered

💾 **Save** the stylesheet.

---

### TASK 5: Test Across Scenarios

🎯 **Goal:** Verify your multimedia works correctly in different conditions.

🔧 **Steps:**

1. **Test video controls:** Play, pause, adjust volume, seek to different timestamps, toggle fullscreen.
2. **Test poster image:** Refresh the page. Confirm the poster image shows before clicking play.
3. **Test audio:** Play the audio, adjust volume, verify it loops (if you added `loop`).
4. **Test YouTube embed:** Click play, verify it loads, test fullscreen.
5. **Test responsiveness:** Resize the browser window from wide to narrow. Verify:
   - Video scales down proportionally
   - YouTube embed maintains aspect ratio
   - Audio player stays within bounds
6. **Test fallback:** Temporarily rename your video file (e.g., `club-promo.mp4` → `club-promo.mp4.bak`). Reload the page. Verify the fallback text and download link appear. Rename the file back afterward.
7. **Test navigation:** Visit every page and click the Media link.

✅ **Check:** All tests pass. If any fail, revisit the relevant task above.

💾 **Final save.** Your Student Club Website now has a fully functional multimedia page!

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Media bugs are mostly path and format problems, and the browser's failure mode is a blank box rather than a message.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Black rectangle where the video should be | The `src` path is wrong | Network tab shows 404 for the video file | Fix the path, usually `video/name.mp4` |
| Video visible but no way to play it | The `controls` attribute is missing | Read the `<video>` tag | Add `controls` |
| Nothing happens on a phone but it works on a laptop | Mobile blocks autoplay with sound | Test on a real device | `autoplay` requires `muted`; prefer letting the user press play |
| Works in Chrome, blank in Safari | Codec unsupported — often WebM only | Console reports no supported source | Always provide an MP4 (H.264) source |
| Audio player is a tiny sliver | `<audio>` given a small width, or a CSS reset shrank it | Inspect the element's box | Set an explicit width, or leave the default |
| Layout jumps as the video loads | No `width`/`height`, so the box has no size until metadata arrives | Watch a throttled reload | Set `width` and `height`, or use `aspect-ratio` in CSS |
| Page load is very slow | The whole video preloads | Network tab shows a large early request | `preload="metadata"` and add a `poster` image |
| Downloaded YouTube embed shows nothing | The iframe was blocked, or the URL is the watch link | Console shows a frame error | Use the `/embed/` URL form from the Share → Embed dialog |
| Fallback text never appears in any browser | It is only for browsers with no `<video>` support | Nothing to confirm — it is correct behaviour | Keep it, plus a download link, for the rare case |
| Deaf students cannot follow the video | No captions track | Check for a `<track>` element | Add `<track kind="captions" src="captions.vtt" srclang="en" label="English">` |

**Never use Flash.** If you find `<object type="application/x-shockwave-flash">` in any tutorial, that tutorial predates 2020. Flash was removed from every browser on 31 December 2020; the replacement is `<video>` and `<audio>`, which need no plugin.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. Why is Flash dead, and what replaced it?**

<details>
<summary>Answer</summary>

Flash was a proprietary browser plugin with a long history of security vulnerabilities, poor mobile support (iOS never shipped it), and heavy battery use. Adobe ended support on 31 December 2020 and browsers removed the runtime. It was replaced by **native HTML5** `<video>` and `<audio>`, which need no plugin and work everywhere.

</details>

---

**Q2. What happens if you omit the `controls` attribute on `<video>`?**

<details>
<summary>Answer</summary>

The video renders with **no play button, timeline, or volume control**. Unless you build your own controls with JavaScript, the user cannot start it — the page looks broken. Native controls are also keyboard accessible for free, so always include `controls`.

</details>

---

**Q3. Why supply multiple `<source>` elements inside `<video>`?**

<details>
<summary>Answer</summary>

Browsers support different codecs. The browser walks the `<source>` list top to bottom and plays the first format it recognises. Providing MP4 (H.264) plus WebM covers essentially every browser. The `type` attribute matters: it lets the browser skip formats it cannot play without downloading them first.

</details>

---

**Q4. What does `poster` do, and why does it matter?**

<details>
<summary>Answer</summary>

`poster="images/thumb.jpg"` sets the still image shown before playback starts. Without it most browsers display the first frame — often black — so the page looks unfinished or broken. A deliberate poster frame makes the video look intentional and gives the user a reason to press play.

</details>

---

**Q5. Why do browsers block `autoplay` with sound?**

<details>
<summary>Answer</summary>

Unexpected audio is hostile: it startles users, wastes mobile data, and disorients screen reader users whose speech is drowned out. Chrome, Safari, and Firefox all require a user gesture before audio can play. Autoplay is only permitted when the video is also `muted` — and even then, use it sparingly.

</details>

---

**Q6. What does `preload="metadata"` do, and why prefer it over `preload="auto"`?**

<details>
<summary>Answer</summary>

`metadata` fetches only enough of the file to know its duration and dimensions, so the player renders correctly without downloading the media. `auto` may pull the entire file before the user clicks anything, wasting bandwidth on mobile plans. Use `metadata` unless you are confident the user will play.

</details>

---

**Q7. Explain why `padding-bottom: 56.25%` makes an iframe responsive.**

<details>
<summary>Answer</summary>

Percentage padding is calculated from the element's **width**, not its height. With `height: 0` and `padding-bottom: 56.25%` (9 ÷ 16), the wrapper's height always equals 56.25% of its width — a locked 16:9 box. The iframe is then absolutely positioned to fill that box at 100% width and height. For 4:3 content the value is 75%.

</details>

---

**Q8. What makes a video accessible?**

<details>
<summary>Answer</summary>

**Captions** via `<track kind="captions" src="captions.vtt" srclang="en" label="English">` for deaf and hard-of-hearing users. A **text transcript** below the player, which also helps search engines and anyone who prefers reading. Native `controls`, which are keyboard operable. And **no autoplay**. A video with no captions and no transcript excludes deaf users completely.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|----------|-----|----|
| 1 | Explain why Adobe Flash was discontinued and should never be used | ☐ | ☐ |
| 2 | Write a `<video>` element with `controls`, `poster`, and `preload` attributes | ☐ | ☐ |
| 3 | Provide multiple video formats using `<source>` elements | ☐ | ☐ |
| 4 | Write meaningful fallback text with a download link inside `<video>` and `<audio>` | ☐ | ☐ |
| 5 | Embed a YouTube video using `<iframe>` with a responsive container | ☐ | ☐ |
| 6 | Embed an audio file using `<audio>` with multiple format sources | ☐ | ☐ |
| 7 | Explain why `autoplay` requires `muted` in modern browsers | ☐ | ☐ |
| 8 | Add multimedia CSS styles (video, audio, responsive iframe) to a stylesheet | ☐ | ☐ |

If you answered "No" to any item, re-read the relevant Theory section and redo the corresponding Hands-On task.

---

# 🔗 FURTHER READING

- [Video and audio content — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)
- [`<video>` element reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [`<audio>` element reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [`<source>` element reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
- [`<iframe>` element reference — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
- [Responsive images and media — MDN Learn](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Media container formats — MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Containers)
- [Adobe Flash End of Life — Adobe](https://www.adobe.com/products/flashplayer/end-of-life.html)
- [Steve Jobs: Thoughts on Flash (2010) — Apple Archive](https://web.archive.org/web/20170610021536/https://www.apple.com/hotnews/thoughts-on-flash/)

---

# ⏭️ NEXT SESSION

In **Session 11: Designing a Compact Site**, you will learn how to plan, organize, and polish a small multi-page website — making your Student Club Website tighter, cleaner, and ready for submission.
