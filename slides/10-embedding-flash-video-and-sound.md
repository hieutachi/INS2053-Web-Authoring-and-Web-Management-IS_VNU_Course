---
marp: true
theme: default
paginate: true
---

# Session 10: Embedding Flash, Video and Sound

**INS2053 — Web Authoring and Web Management**

*Flash is gone. HTML5 does it better, natively.*

Read: `ebook/10-embedding-flash-video-and-sound.md`  ·  Practise: `exercises/session-10/exercise.md`  ·  Diagrams: `canvases/buoi-10.canvas.tsx`

---

## Learning Objectives

- Explain what Adobe Flash was and why it is completely discontinued
- Embed video using the HTML5 `<video>` element with proper attributes
- Embed audio using the HTML5 `<audio>` element
- Provide multiple formats via `<source>` for cross-browser compatibility
- Embed YouTube/Vimeo videos using responsive `<iframe>`

---

## The Rise and Fall of Adobe Flash

Flash was a multimedia plugin used from the late 1990s through the 2010s for animations, games, and video players.

Think of early-2000s websites with "Loading Flash Player..." bars -- that was Flash. Even YouTube originally used it.

**Why Flash died:**
- Security vulnerabilities (constant exploits)
- Poor mobile performance (Apple blocked it on iOS in 2010)
- Not accessible to screen readers
- Required a separate plugin
- HTML5 replaced everything Flash could do

**Dec 31, 2020:** Adobe officially killed Flash. Never use it.

---

## HTML5 Video Element

```html
<video controls width="640" height="360"
       poster="images/video-poster.jpg" preload="metadata">
  <source src="video/club-promo.mp4" type="video/mp4">
  <source src="video/club-promo.webm" type="video/webm">
  <p>Your browser does not support HTML5 video.
     <a href="video/club-promo.mp4">Download the video</a>.</p>
</video>
```

| Attribute | Purpose |
|-----------|---------|
| `controls` | Show play/pause/volume/fullscreen buttons |
| `poster` | Thumbnail image before playback |
| `preload` | `auto`, `metadata`, or `none` |
| `autoplay` | Auto-start (MUST pair with `muted`) |
| `loop` | Restart when finished |

---

## Video Formats & Browser Compatibility

| Format | Extension | Chrome | Firefox | Safari | Edge |
|--------|-----------|--------|---------|--------|------|
| MP4 (H.264) | `.mp4` | Yes | Yes | Yes | Yes |
| WebM | `.webm` | Yes | Yes | Limited | Yes |
| Ogg | `.ogv` | Yes | Yes | No | Partial |

Always provide **MP4 first** (universal). Add WebM as secondary.

The browser tries each `<source>` in order and plays the first it supports. Always include fallback text with a download link.

---

## HTML5 Audio Element

Works identically to `<video>` but for sound files:

```html
<audio controls>
  <source src="audio/club-anthem.mp3" type="audio/mpeg">
  <source src="audio/club-anthem.ogg" type="audio/ogg">
  <p>Your browser does not support audio.
     <a href="audio/club-anthem.mp3">Download the MP3</a>.</p>
</audio>
```

Audio formats: **MP3** (universal), WAV (uncompressed), Ogg (open format)

Note: `<audio>` has no `width`, `height`, or `poster` -- the browser renders a fixed-size player widget.

---

## Embedding YouTube Videos with iframe

Self-hosting large videos wastes bandwidth. Use YouTube/Vimeo for long content.

```html
<div class="video-container">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Club Event Highlights"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```

Responsive container (16:9 aspect ratio):
```css
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 9/16 = 0.5625 */
  height: 0; overflow: hidden;
}
.video-container iframe {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; border: none;
}
```

---

## Live Code Example

```html
<!-- Self-hosted video with poster -->
<section class="media-section">
  <h3>Watch Our Promo</h3>
  <video controls width="100%"
         poster="images/poster.jpg" preload="metadata">
    <source src="video/promo.mp4" type="video/mp4">
    <p><a href="video/promo.mp4">Download video</a></p>
  </video>
</section>

<!-- Audio player in styled container -->
<div class="audio-player">
  <audio controls>
    <source src="audio/anthem.mp3" type="audio/mpeg">
  </audio>
</div>
```

---

## Common Mistakes

- Trying to use Flash (`<object type="application/x-shockwave-flash">`) -- it is dead
- Forgetting `controls` -- users see a frozen image with no way to play
- Using only one obscure format (e.g., Ogg only) -- Safari cannot play it
- Using `autoplay` without `muted` -- browsers block autoplay with sound
- Uploading huge uncompressed video files (compress with HandBrake first)
- Missing `title` attribute on `<iframe>` (accessibility issue)
- No fallback text inside `<video>` / `<audio>` elements

---

## In-Class Practice

Complete the hands-on tasks in **exercises/session-10/exercise.md**:

1. Add promo video section to home page with poster image
2. Create full Media page (`media.html`) with video, audio, and YouTube embed
3. Update navigation on ALL pages to include Media link
4. Add multimedia CSS styles (video, audio, responsive iframe)
5. Test across scenarios: controls, responsiveness, fallback text

---

## Homework

See **homework/session-10/homework.md**

Add a complete Media page to your Student Club Website with self-hosted video, audio player, and responsive YouTube embed. Update navigation on all pages.

**Due Sunday 23:59**

---

## Recap

- Flash is dead (killed Dec 2020) -- never use it for new projects
- Use `<video>` with `controls`, `poster`, and multiple `<source>` formats
- Use `<audio>` for sound -- MP3 is the most compatible format
- Always include fallback text with a download link
- Autoplay requires `muted` -- browsers block sound on auto-play
- Use `<iframe>` + responsive container for YouTube/Vimeo embeds

---

## Next Session

Session 11: **Designing a Compact Site** -- plan, organise, and polish your multi-page website for submission.
