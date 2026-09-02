# 🟦 SESSION 7
# **CSS3 and Web Fonts**

Welcome back, everyone! In this session we are going to make your Student Club Website look truly *modern* and *professional*. Up until now, our pages have been functional but a little plain — rectangular boxes, flat colours, and system fonts that every other website uses. Today we change all of that. You will learn how to load beautiful custom fonts from Google Fonts, add rounded corners, shadows, gradients, and smooth hover animations using pure CSS3. By the end of this session your site will look like something you would actually be proud to show off. No image-editing software needed — just code!

---

# 📌 SESSION INFORMATION

```
📅 Duration:     3 periods (150 minutes) — Theory ~60 min, Practice ~90 min
📚 Reference:    Chapter 7 — CSS3 & Web Fonts (course ebook)
                 MDN: "CSS transitions", "Using CSS gradients", "@font-face"
🎯 Objectives:   1. Use Google Fonts, @font-face, and font-family stacks
                 2. Apply text styling (text-align, line-height, letter-spacing)
                 3. Create CSS3 transitions and hover effects
                 4. Enhance the Student Club Website with modern visuals
📖 Prepare:      1. Finish the Sessions 1-6 hands-on tasks
                 2. Have your student-club-site folder open in Dreamweaver / VS Code
                 3. Check your internet connection (Google Fonts loads online)
🖼 Diagrams:     canvases/buoi-07.canvas.tsx — GoogleFontsFlow, FontStackChain, PolishLab
🔗 Outcomes:     CLO1 (master basic web design and build skills)
                 CLO4 (design and build a web application)
```

---

# 🎯 LEARNING OBJECTIVES

By the end of this session you will be able to:

- Import and use **Google Fonts** in any HTML page via `<link>` tags.
- Write correct **`font-family` fallback stacks** so text always renders even if the custom font fails to load.
- Understand the difference between `@import` and `<link>` for loading fonts, and know which is preferred.
- Style text professionally using **`text-align`**, **`line-height`**, **`letter-spacing`**, and **`text-shadow`**.
- Create **rounded corners** with `border-radius` (including shorthand values).
- Add depth with **`box-shadow`** on cards, buttons, and containers.
- Build **linear and radial gradients** as background images.
- Animate property changes smoothly with **CSS3 `transition`**.
- Combine `transition` with **`:hover` pseudo-class** to create interactive hover effects.
- Apply all of the above to the **Student Club Website** project.

---

# 📖 THEORY

## 1. Web Fonts and Google Fonts

### 1.1 Definition

A **web font** is a font file that is downloaded by the browser when a visitor opens your page. Instead of relying only on fonts already installed on the user's computer (like Arial or Times New Roman), you can serve *any* font you like — as long as you have the right licence.

**Google Fonts** is a free, open-source library of over 1,500 font families hosted on Google's servers. You do not need to download or host the font files yourself; you simply tell the browser where to fetch them.

### 🎒 Real-life example

Think of Google Fonts like Spotify for typefaces. Spotify streams music from its servers instead of requiring you to own every MP3 file. Google Fonts streams font files to the visitor's browser on demand. The most popular fonts are cached worldwide, so they load very fast.

### 1.2 Why it matters

Without web fonts, your website is limited to the handful of "web-safe" fonts that happen to be pre-installed on each visitor's operating system. This means your carefully designed heading might render in boring Times New Roman on someone else's machine. Google Fonts gives you typographic control that was previously only possible in print design.

```
HOW GOOGLE FONTS WORKS (simplified):

Your HTML                Google Server           Visitor Browser
┌──────────────┐        ┌───────────────┐        ┌──────────────────┐
│ <link href=  │──GET──▶│ serves .woff2 │──file──▶│ Downloads font   │
│  "fonts.goog │        │ font file     │        │ Applies to text  │
│   leapis..." │        │               │        │                  │
└──────────────┘        └───────────────┘        └──────────────────┘
```

### ⚠️ Important notes

- You must have an **internet connection** while developing for Google Fonts to load. If you work offline, the fallback font will display instead.
- Only request the **font weights you actually use** (e.g., 400 and 700). Requesting every weight slows down page load.
- Always include a **fallback generic family** at the end of your `font-family` declaration (e.g., `sans-serif`, `serif`, `monospace`).

### 🧪 Try It Yourself — Load a Google Font Properly

**Task (6 min):** Add a web font and verify it arrived over the network.

1. Go to fonts.google.com, pick Roboto, and select the styles you will actually use — Regular 400 and Bold 700.
2. Copy the `<link>` tags into `<head>`, **above** your own stylesheet:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
   <link rel="stylesheet" href="css/style.css">
   ```
3. Apply it: `body { font-family: 'Roboto', sans-serif; }`
4. Reload with F12 → **Network** open, filter to **Font**, and count the requests.

**Expected result:** Two font files download (one per weight) and the page text visibly changes. If you requested nine weights, you would see nine files — for no benefit.

<details>
<summary>The three details that trip people up</summary>

**Order.** The font `<link>` must come before your stylesheet. If your CSS is parsed first, `font-family: 'Roboto'` refers to a font the browser has not been told how to fetch yet.

**Weights.** Every weight is a separate download. Selecting all nine on the Google Fonts page can add several hundred kilobytes to a page that uses two of them. Request 400 and 700, and add others only when you actually use them.

**`&display=swap`.** Without it, text can stay invisible for up to three seconds while the font loads — the "flash of invisible text". With it, the browser shows the fallback font immediately and swaps in the web font when it arrives. Visible text in a fallback beats no text at all.

</details>


---

## 2. Adding Google Fonts to Your Page

> 🖼 **Diagram:** `canvases/buoi-07.canvas.tsx` → `GoogleFontsFlow` — slide `s7-google-fonts` ("Google Fonts")

There are two ways to load Google Fonts: the `<link>` tag (recommended) and the CSS `@import` rule.

### 🔍 Comparison table

| Feature | `<link>` tag | `@import` rule |
|---|---|---|
| Where it goes | Inside `<head>` in HTML | At the very top of a `.css` file |
| Loading behaviour | Parallel (faster) | Blocks rendering until loaded (slower) |
| Ease of use | Copy-paste from Google Fonts site | Must remember to place first in CSS |
| Recommended? | ✅ Yes | ❌ Generally no |

### Method A — `<link>` tag (preferred)

<!-- Step-by-step walkthrough -->

1. Go to [https://fonts.google.com](https://fonts.google.com).
2. Search for a font, e.g. **Montserrat**.
3. Click the font card, then select the weights you need (e.g., Regular 400 and Bold 700).
4. On the right panel, copy the `<link>` tag provided under "Get embed code".
5. Paste it inside the `<head>` section of **every** HTML page that needs the font.

```html
<!-- Inside <head>, BEFORE your own stylesheet link -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap"
      rel="stylesheet">
```

#### Line-by-line explanation

| Line | Purpose |
|---|---|
| `<link rel="preconnect" href="https://fonts.googleapis.com">` | Tells the browser to start connecting to Google's API server early, saving time later. |
| `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` | Same thing for the actual font-file server (`gstatic`). The `crossorigin` attribute is required because fonts are served cross-domain. |
| `<link href="...display=swap" rel="stylesheet">` | Loads a tiny CSS file from Google that contains `@font-face` rules pointing to the actual font files. `display=swap` means "show fallback text immediately, then swap in the custom font once it loads." |

### Method B — `@import` (less preferred, but useful to know)

```css
/* MUST be the VERY FIRST rule in your CSS file */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap');
```

⚠️ If you put `@import` after any other CSS rule, the browser will ignore it silently. This is a very common bug.

### ✅ Best practices

- Use `<link>` in HTML rather than `@import` in CSS for better performance.
- Limit yourself to **2–3 font families** per site. More than that hurts load time and visual consistency.
- Always add `display=swap` so users see text immediately.
- Place the Google Fonts `<link>` **before** your own stylesheet `<link>` so the fonts are available when your CSS is parsed.

### ❌ Common mistakes

❌ **Wrong:** Forgetting the fallback font
```css
h1 {
    font-family: 'Montserrat';
}
```

✅ **Correct:** Including a generic fallback
```css
h1 {
    font-family: 'Montserrat', sans-serif;
}
```

❌ **Wrong:** Putting `@import` in the middle of your CSS
```css
body { margin: 0; }
@import url('https://fonts.googleapis.com/...'); /* IGNORED! */
```

✅ **Correct:** Putting `@import` as the absolute first line
```css
@import url('https://fonts.googleapis.com/...');
body { margin: 0; }
```

❌ **Wrong:** Adding the Google Fonts link to only one page
```html
<!-- Only index.html has the link; about.html shows fallback -->
```

✅ **Correct:** Adding the same Google Fonts `<link>` to **every** HTML page that uses those fonts.

---

## 3. Font-Family Stacks

> 🖼 **Diagram:** `canvases/buoi-07.canvas.tsx` → `FontStackChain` — slide `s7-font-stacks` ("Font stacks & text styling")

### 3.1 Definition

A **font stack** (or font-family stack) is a comma-separated list of fonts in a CSS `font-family` declaration. The browser tries each font in order and uses the first one it finds.

```css
body {
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
}
```

Reading left to right:
1. Try **'Open Sans'** (the Google Font we loaded).
2. If that failed, try **Arial** (commonly installed).
3. If that failed, try **Helvetica** (macOS default).
4. If nothing else worked, use whatever the browser considers a generic **sans-serif**.

### 3.2 Why it matters

Even though Google Fonts is extremely reliable, things can go wrong: the visitor might be offline, the CDN could be temporarily blocked in their country, or JavaScript errors could prevent loading. A good font stack guarantees your text remains readable in *all* circumstances.

### ✅ Best practices

- Always end with a **generic family keyword**: `serif`, `sans-serif`, or `monospace`. These are not quoted.
- Choose fallbacks that have similar proportions to your primary font so the layout does not shift dramatically.
- Quote font names that contain spaces: `'Open Sans'`, not `Open Sans`.

### ❌ Common mistakes

❌ **Wrong:** Missing quotes around multi-word font name
```css
font-family: Open Sans, sans-serif;
```

✅ **Correct:** Quoted
```css
font-family: 'Open Sans', sans-serif;
```

### 🧪 Try It Yourself — Watch the Fallback Happen

**Task (5 min):** Confirm which font the browser is really using.

1. Set a proper stack:
   ```css
   body { font-family: 'Roboto', 'Segoe UI', Arial, sans-serif; }
   ```
2. Reload, then inspect a paragraph in F12 → **Computed**. Scroll to the very bottom of that pane and read **Rendered Fonts**.
3. Now misspell the first font on purpose — `'Robotoo'` — and reload.
4. Read Rendered Fonts again.

**Expected result:** First it reports Roboto. After the typo it silently reports Segoe UI or Arial instead, with no error anywhere. The page still looks fine, just not as designed.

<details>
<summary>Why the stack has that shape</summary>

The browser tries each name left to right and uses the first one it can load. So order it from most specific to most general:

1. Your web font — `'Roboto'`
2. A good system font likely to be installed — `'Segoe UI'` on Windows, `-apple-system` on Mac
3. A font present almost everywhere — `Arial`, `Georgia`
4. A generic family as the final guarantee — `sans-serif`, `serif`, `monospace`

Never omit the generic family. It is the only entry the browser cannot fail to satisfy.

Quote any name containing a space: `'Segoe UI'`, not `Segoe UI`. And this is precisely why a silent fallback is easy to miss — nothing breaks, so Rendered Fonts is the only place the truth shows up.

</details>


---

## 4. Text Styling Properties

### 4.1 `text-align`

Controls horizontal alignment of inline content within a block element.

```css
header h1   { text-align: center; }  /* Centred heading */
p           { text-align: left; }    /* Default for LTR languages */
.price      { text-align: right; }   /* Numbers aligned right */
article p   { text-align: justify; } /* Both edges flush (newspaper style) */
```

⚠️ `text-align: justify` can create ugly rivers of white space in narrow columns. Use sparingly.

### 4.2 `line-height`

Controls the vertical space between baselines of consecutive lines of text. It is one of the **most important** properties for readability.

```css
/* Unitless value (RECOMMENDED) — relative to font-size */
p { line-height: 1.6; }   /* 1.6 × font-size */

/* Pixel value (avoid — does not scale) */
p { line-height: 24px; }

/* Percentage (works but unitless is cleaner) */
p { line-height: 160%; }
```

🎒 **Real-life analogy:** `line-height` is like the spacing between lines on ruled notebook paper. Too tight and it is hard to read; too loose and lines feel disconnected. For body text, **1.5 – 1.8** is usually ideal.

### 4.3 `letter-spacing`

Adds or removes horizontal space between characters. Useful for headings and uppercase text.

```css
h1 { letter-spacing: 2px; }     /* Wider, more dramatic */
.uppercase-nav { letter-spacing: 1px; text-transform: uppercase; }
.tight { letter-spacing: -0.5px; } /* Tighter than normal */
```

### 4.4 `text-shadow`

Adds a shadow behind text, giving it depth or a glow effect.

```css
/* Syntax: text-shadow: h-offset v-offset blur color; */
h1 {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
```

| Value | Meaning |
|---|---|
| `2px` | Horizontal offset (right) |
| `2px` | Vertical offset (down) |
| `4px` | Blur radius (higher = softer) |
| `rgba(0,0,0,0.3)` | Shadow colour (black at 30% opacity) |

### ✅ Best practices

- Use **unitless `line-height`** for body text so it scales proportionally.
- Use `letter-spacing` subtly — 1–3 px for headings, never more unless it is a deliberate design choice.
- Keep `text-shadow` subtle; heavy shadows look dated.

### ❌ Common mistakes

❌ **Wrong:** Using pixel line-height that breaks when font size changes
```css
p { font-size: 16px; line-height: 24px; }
```

✅ **Correct:** Using unitless line-height
```css
p { font-size: 16px; line-height: 1.6; }
```

---

## 5. CSS3 Rounded Corners (`border-radius`)

> 🖼 **Diagram:** `canvases/buoi-07.canvas.tsx` → `PolishLab` — slide `s7-corners-shadows` ("Rounded corners & shadows")

### 5.1 Definition

The `border-radius` property rounds the corners of an element's border box. Before CSS3, designers had to use corner images — now it is a single line of CSS.

### 5.2 Shorthand syntax

```
border-radius: TL  TR  BR  BL;     (clockwise from top-left)
border-radius: TL+BR  TR+BL;       (two-value shorthand)
border-radius: ALL;                 (single value = all four corners)
```

```css
/* All four corners equally rounded */
.card { border-radius: 10px; }

/* Top-left & bottom-right = 10px; top-right & bottom-left = 20px */
.fancy { border-radius: 10px 20px; }

/* Each corner different */
.asymmetric { border-radius: 10px 20px 30px 40px; }

/* Perfect circle (element must be square) */
.avatar { width: 80px; height: 80px; border-radius: 50%; }

/* Pill-shaped button */
.btn { border-radius: 25px; }
```

```
VISUAL: border-radius values

  10px ───────────────── 20px
   │                       │
   │      CONTENT          │
   │                       │
  40px ───────────────── 30px

  (top-left, top-right, bottom-right, bottom-left)
```

### ⚠️ Important notes

- `border-radius: 50%` only creates a perfect circle when **width equals height**. If the element is rectangular, you get an ellipse.
- `border-radius` also clips background images and gradients to the rounded shape.

---

## 6. CSS3 Shadows (`box-shadow`)

> 🖼 **Diagram:** `canvases/buoi-07.canvas.tsx` → `PolishLab` — slide `s7-corners-shadows` ("Rounded corners & shadows")

### 6.1 Definition

`box-shadow` adds a drop shadow to the outside (or inside) of an element's border box.

```css
/* Syntax: box-shadow: h-offset v-offset blur spread color; */
.card {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```

| Value | Description |
|---|---|
| `0` | Horizontal offset (0 = centred) |
| `2px` | Vertical offset (positive = downward) |
| `10px` | Blur radius (larger = softer, wider shadow) |
| *(omitted)* | Spread radius (optional; expands/shrinks the shadow) |
| `rgba(...)` | Shadow colour |

### Inner shadow

Add the `inset` keyword to place the shadow *inside* the element:

```css
.pressed-button {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
}
```

### Multiple shadows

Separate with commas:

```css
.glow-card {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1),
                0 0 20px rgba(52, 152, 219, 0.2);
}
```

### ✅ Best practices

- Use low-opacity colours (`rgba` with alpha 0.05 – 0.2) for subtle, modern shadows.
- Avoid pure black (`#000`) shadows; they look harsh. Use dark grey with transparency instead.
- Increase blur radius for a softer, more natural shadow.

### ❌ Common mistakes

❌ **Wrong:** Harsh solid-black shadow
```css
box-shadow: 5px 5px 0px #000000;
```

✅ **Correct:** Soft, transparent shadow
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
```

### 🧪 Try It Yourself — A Shadow That Looks Real

**Task (5 min):** Tune a shadow instead of copying one.

1. Start deliberately badly:
   ```css
   .card { box-shadow: 10px 10px 0 #000; }
   ```
2. Reload. It looks like a 1998 clip-art drop shadow.
3. Now change one value at a time, reloading after each:
   ```css
   .card { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
   .card { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
   .card { box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
   ```

**Expected result:** As blur grows and the colour becomes more transparent, the card appears to sit further off the page. The hard black shadow reads as a mistake; the soft transparent ones read as depth.

<details>
<summary>Reading the four values</summary>

`box-shadow: <x> <y> <blur> <colour>`

- **x** — keep it `0`. Light comes from above in almost every interface.
- **y** — how far the element floats. A larger value means higher.
- **blur** — roughly two to three times `y`. This is what separates soft from harsh.
- **colour** — always `rgba()` with low alpha, never a solid. A solid shadow cannot blend with whatever is behind it.

One more property pairs with this: `border-radius`. Sharp corners with a soft shadow look inconsistent, so raise both together. And if `border-radius` appears to do nothing, check the element is not `display: inline` — inline elements ignore it.

</details>


---

## 7. CSS3 Gradients

### 7.1 Definition

A **gradient** is a smooth transition between two or more colours rendered as a background image by the browser. There are two main types: **linear** (colours flow in a straight line) and **radial** (colours radiate outward from a point).

### 7.2 Linear gradients

```css
/* Simple two-colour, left to right */
.header {
    background: linear-gradient(to right, #1a5276, #3498db);
}

/* With angle (135 degrees = diagonal top-left to bottom-right) */
.banner {
    background: linear-gradient(135deg, #1a5276 0%, #2874a6 50%, #3498db 100%);
}

/* Direction keywords */
background: linear-gradient(to bottom, ...);   /* Top → bottom */
background: linear-gradient(to top, ...);      /* Bottom → top */
background: linear-gradient(to right, ...);    /* Left → right */
background: linear-gradient(to left, ...);     /* Right → left */
```

```
LINEAR GRADIENT DIRECTIONS:

  to bottom ↓        to right →        135deg ↘
  ┌──────────┐       ┌──────────┐      ┌──────────┐
  │ ████████ │       │ ██→█████ │      │ ██↘     │
  │ ▓▓▓▓▓▓▓▓ │       │ ▓▓▓▓▓▓▓▓ │      │   ▓▓▓▓  │
  │ ░░░░░░░░ │       │ ░░░░░░░░ │      │     ░░░░│
  └──────────┘       └──────────┘      └──────────┘
```

### 7.3 Radial gradients

```css
.spotlight {
    background: radial-gradient(circle, #ffcc00, #ff6600);
}

.ellipse-bg {
    background: radial-gradient(ellipse at center, #ffffff 0%, #e8eef3 100%);
}
```

### ✅ Best practices

- Use gradients for **headers, buttons, banners, and accent areas** — not for entire page backgrounds (it gets visually noisy).
- Stick to **2–3 colours** per gradient for a clean look.
- Test contrast: make sure white text on a gradient header is still readable at both ends of the gradient.

### ❌ Common mistakes

❌ **Wrong:** Too many colours creating a rainbow mess
```css
background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet);
```

✅ **Correct:** Two harmonious colours
```css
background: linear-gradient(135deg, #1a5276 0%, #3498db 100%);
```

---

## 8. CSS3 Transitions

### 8.1 Definition

A **transition** tells the browser to animate the change from one CSS property value to another over a specified duration. Without transitions, property changes (e.g., on `:hover`) happen instantly. With transitions, they happen smoothly.

### 8.2 Syntax

```css
/* Short form */
.element {
    transition: property duration timing-function delay;
}

/* Example */
a {
    color: #0066cc;
    transition: color 0.3s ease;
}

a:hover {
    color: #003366;
}
```

| Part | Values | Description |
|---|---|---|
| `property` | `color`, `background-color`, `transform`, `all`, etc. | Which property to animate |
| `duration` | `0.3s`, `500ms`, `1s` | How long the animation takes |
| `timing-function` | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear` | Speed curve of the animation |
| `delay` | `0s`, `0.2s` | Wait before starting (optional) |

### Timing functions explained

```
ease:         Starts slow → speeds up → slows down  (DEFAULT, natural feel)
ease-in:      Starts slow → speeds up                (like a car accelerating)
ease-out:     Starts fast → slows down                (like a ball rolling to stop)
ease-in-out:  Starts slow → speeds up → slows down   (symmetric)
linear:       Constant speed throughout              (robotic, rarely used for UI)
```

### Transitioning multiple properties

```css
.event-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
```

Or use `all` as a shortcut (animates every changed property):

```css
.event-card {
    transition: all 0.3s ease;
}
```

⚠️ `transition: all` is convenient but can cause unintended animations if you later add new properties. Prefer listing specific properties for production sites.

### ⚠️ Important notes

- The `transition` property goes on the **normal state**, NOT on the `:hover` state. This ensures the animation plays both *into* and *out of* the hover.
- Not all properties can be animated. You cannot transition `display`, `font-family`, or `position`. Check [MDN: Animatable CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

### ✅ Best practices

- Keep durations between **0.2 s and 0.5 s** for UI interactions. Longer feels sluggish; shorter feels jarring.
- Use `ease` or `ease-in-out` for most UI transitions.
- Always define the transition on the base selector, not the pseudo-class.

### ❌ Common mistakes

❌ **Wrong:** Transition defined only on `:hover`
```css
a:hover {
    transition: color 0.3s ease;
    color: red;
}
/* Result: smooth IN, instant OUT */
```

✅ **Correct:** Transition defined on the base selector
```css
a {
    transition: color 0.3s ease;
    color: blue;
}
a:hover {
    color: red;
}
/* Result: smooth IN and smooth OUT */
```

---

## 9. Hover Effects with Transitions and Transforms

### 9.1 Combining `transition` + `:hover` + `transform`

This is the recipe for interactive, tactile-feeling UI elements:

```css
.event-card {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}
```

What happens:
1. Normal state: card sits flat with a subtle shadow.
2. User hovers: card lifts 5 px upward AND shadow grows deeper.
3. Both changes animate smoothly over 0.3 seconds.
4. User moves mouse away: card settles back down smoothly.

### 9.2 Common transform functions

| Function | Effect | Example |
|---|---|---|
| `translateY(value)` | Move vertically | `translateY(-5px)` moves up 5 px |
| `translateX(value)` | Move horizontally | `translateX(10px)` moves right 10 px |
| `scale(factor)` | Resize | `scale(1.05)` grows 5% |
| `rotate(angle)` | Rotate | `rotate(10deg)` rotates clockwise |
| `skew(x-angle)` | Skew | `skew(5deg)` tilts horizontally |

### ✅ Best practices

- Use `transform` for movement/scale instead of changing `margin` or `top/left` — transforms are hardware-accelerated and much smoother.
- Small movements (3–8 px translation, 1.02–1.08 scale) feel elegant. Large movements feel cartoonish.
- Always pair `transform` changes with a `transition` so they animate rather than snap.

### ❌ Common mistakes

❌ **Wrong:** Changing `top`/`left` for hover movement (causes reflow, janky)
```css
.card:hover { top: -5px; }
```

✅ **Correct:** Using `transform` (GPU-accelerated, smooth)
```css
.card:hover { transform: translateY(-5px); }
```

### 🧪 Try It Yourself — Lift a Card on Hover

**Task (6 min):** Combine transition and transform into one polished effect.

1. Add to your card class:
   ```css
   .card {
       transition: transform 0.2s ease, box-shadow 0.2s ease;
   }
   .card:hover,
   .card:focus-within {
       transform: translateY(-4px);
       box-shadow: 0 8px 20px rgba(0,0,0,0.15);
   }
   ```
2. Reload and hover. The card lifts smoothly.
3. Now move `transition` from `.card` into the `.card:hover` rule and reload.
4. Put it back, then add this and reload once more:
   ```css
   @media (prefers-reduced-motion: reduce) {
       .card { transition: none; }
   }
   ```

**Expected result:** With `transition` on the base rule the card animates both in and out. Moved into `:hover`, it animates in but snaps back — because on mouse-out the hover rule no longer applies, so there is no transition left to obey.

<details>
<summary>Two things worth keeping</summary>

**Where `transition` belongs.** On the element, not the state. Read it as "this element animates changes to these properties", not "animate when hovered".

**Which properties to animate.** `transform` and `opacity` only, for anything that needs to be smooth. The browser can hand those to the GPU. Animating `width`, `height`, `top`, or `margin` forces it to recalculate layout on every frame, which is what makes an effect feel janky on a phone.

`prefers-reduced-motion` is not optional politeness — for users with vestibular disorders, motion can cause genuine nausea. Honouring the setting takes three lines.

</details>


---

# 📋 THEORY SUMMARY

| Concept | Definition | Example |
|---|---|---|
| Google Fonts | Free cloud-hosted font library; loaded via `<link>` | `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">` |
| Font stack | Comma-separated fallback list in `font-family` | `'Montserrat', Arial, sans-serif` |
| `text-align` | Horizontal alignment of inline content | `text-align: center;` |
| `line-height` | Vertical space between text baselines | `line-height: 1.6;` |
| `letter-spacing` | Horizontal space between characters | `letter-spacing: 2px;` |
| `text-shadow` | Shadow rendered behind text | `text-shadow: 2px 2px 4px rgba(0,0,0,0.3);` |
| `border-radius` | Rounds element corners | `border-radius: 10px;` or `50%` |
| `box-shadow` | Drop shadow on element box | `box-shadow: 0 4px 12px rgba(0,0,0,0.12);` |
| `linear-gradient` | Background colour transition in a line | `linear-gradient(135deg, #1a5276, #3498db)` |
| `radial-gradient` | Background colour transition radiating outward | `radial-gradient(circle, #ffcc00, #ff6600)` |
| `transition` | Smoothly animates property changes | `transition: all 0.3s ease;` |
| `transform` | Moves, scales, rotates elements | `transform: translateY(-5px) scale(1.05);` |
| `:hover` | Pseudo-class for mouse-over state | `.card:hover { ... }` |

---

# 💡 WORKED EXAMPLES

## Example 1: Loading and Applying Google Fonts

**Situation:** You want headings in Montserrat (Bold) and body text in Open Sans (Regular) on the Student Club home page.

**Code (HTML `<head>`):**
```html
<head>
    <meta charset="UTF-8">
    <title>Student Club - Home</title>

    <!-- 1. Preconnect for faster font loading -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- 2. Load Montserrat 400+700 and Open Sans 400+600 -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet">

    <!-- 3. Your own stylesheet (AFTER fonts so fonts are ready) -->
    <link rel="stylesheet" href="css/style.css">
</head>
```

**Code (CSS):**
```css
/* Headings use Montserrat */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', Arial, sans-serif;
}

/* Body text uses Open Sans */
body, p, li, a, td, th {
    font-family: 'Open Sans', Arial, sans-serif;
}
```

**Line-by-line explanation:**

| Line | What it does |
|---|---|
| `<link rel="preconnect" ...>` (×2) | Opens TCP connections to Google's servers early so the font download starts sooner. |
| `family=Montserrat:wght@400;700` | Requests Montserrat in Regular (400) and Bold (700) only. |
| `family=Open+Sans:wght@400;600` | Requests Open Sans in Regular (400) and Semi-Bold (600). |
| `display=swap` | Shows fallback text immediately, swaps in custom font when ready. |
| `font-family: 'Montserrat', Arial, sans-serif` | Uses Montserrat if available; falls back to Arial, then generic sans-serif. |

**Result:** Headings appear in the geometric, modern Montserrat typeface. Body paragraphs use the highly readable Open Sans. If the visitor is offline, Arial (or the system sans-serif) displays instead — the page remains perfectly usable.

---

## Example 2: Styled Event Card with Shadow, Rounded Corners, and Hover Lift

**Situation:** You want event cards on the home page that look like floating cards and lift slightly when hovered.

**Code (HTML):**
```html
<div class="event-card">
    <div class="event-date">March 15, 2024</div>
    <h3>Web Design Workshop</h3>
    <p class="event-location">Room 301, Building A</p>
    <p>Learn the fundamentals of responsive web design in this hands-on workshop.</p>
    <a href="events.html" class="btn">Learn More</a>
</div>
```

**Code (CSS):**
```css
.event-card {
    background-color: #f8f9fa;                          /* Light grey background */
    border-left: 5px solid #3498db;                     /* Blue accent bar on left */
    padding: 25px;                                      /* Inner spacing */
    margin-bottom: 20px;                                /* Gap between cards */
    border-radius: 8px;                                 /* Rounded corners */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);         /* Subtle shadow */
    transition: transform 0.3s ease,                    /* Animate transform */
                box-shadow 0.3s ease,                   /* Animate shadow */
                border-left-color 0.3s ease;            /* Animate accent colour */
}

.event-card:hover {
    transform: translateY(-3px);                        /* Lift card up 3 px */
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);       /* Deeper shadow */
    border-left-color: #1a5276;                         /* Darker accent */
}
```

**Line-by-line explanation:**

| Property | Purpose |
|---|---|
| `background-color: #f8f9fa` | Gives the card a light background distinct from the page. |
| `border-left: 5px solid #3498db` | Creates a coloured accent stripe — a common card-design pattern. |
| `padding: 25px` | Pushes content away from edges for breathing room. |
| `border-radius: 8px` | Softens corners for a modern, friendly appearance. |
| `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` | Adds a faint shadow underneath to create the illusion of depth/lifting. |
| `transition: transform 0.3s ease, ...` | Tells the browser to animate these three properties over 0.3 seconds. |
| `transform: translateY(-3px)` | On hover, shifts the card 3 pixels upward. Negative = up. |
| `box-shadow: 0 5px 20px rgba(0,0,0,0.15)` | On hover, makes the shadow larger and darker to reinforce the "lifting" illusion. |

**Result:** Cards sit flat with a subtle shadow. When the user hovers, the card gently rises and the shadow deepens, creating a satisfying tactile interaction. The blue accent bar darkens to provide additional visual feedback.

---

## Example 3: Gradient Header with Text Shadow

**Situation:** You want the site header to have a diagonal gradient background and the title to have a subtle text shadow for legibility.

**Code (HTML):**
```html
<header>
    <h1>Student Club</h1>
    <p>Building Community Through Technology</p>
</header>
```

**Code (CSS):**
```css
header {
    background: linear-gradient(135deg, #1a5276 0%, #2874a6 50%, #3498db 100%);
    color: white;
    text-align: center;
    padding: 40px 20px;
}

header h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: 2px;
}

header p {
    font-size: 20px;
    opacity: 0.9;
}
```

**Line-by-line explanation:**

| Property | Purpose |
|---|---|
| `linear-gradient(135deg, ...)` | Creates a diagonal gradient from dark blue (#1a5276) through medium blue (#2874a6) to lighter blue (#3498db). |
| `color: white` | Makes all text inside the header white for contrast against the dark gradient. |
| `text-align: center` | Centres heading and tagline horizontally. |
| `padding: 40px 20px` | 40 px top/bottom padding for vertical breathing room; 20 px left/right. |
| `text-shadow: 2px 2px 4px rgba(0,0,0,0.3)` | Adds a dark shadow offset 2 px right and 2 px down with 4 px blur, making white letters pop out of the blue background. |
| `letter-spacing: 2px` | Adds slight spacing between characters in the heading for a premium, editorial feel. |
| `opacity: 0.9` | Makes the tagline slightly translucent so it is visually subordinate to the heading. |

**Result:** The header displays a rich diagonal blue gradient. The title "Student Club" appears in bold white Montserrat with wide letter-spacing and a soft shadow. The tagline sits below in slightly faded white.

---

# 🛠️ HANDS-ON PRACTICE

## Setup

Make sure your project folder looks like this before starting:

```
student-club-site/
├── index.html
├── about.html
├── events.html
├── gallery.html
├── contact.html
├── css/
│   └── style.css
└── images/
```

Open `index.html` and `css/style.css` in your editor. You should already have the basic layout from Sessions 5–6.

---

### TASK 1: Add Google Fonts to All Pages

🎯 **Goal:** Load Montserrat (400, 700) and Open Sans (400, 600) and apply them across the site.

📝 **What you will do:** Add the Google Fonts `<link>` tags to every HTML page and update the CSS font-family declarations.

🔧 **Steps:**

1. Open `index.html`. Inside `<head>`, **before** the `<link>` to `style.css`, add:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@400;600&display=swap"
         rel="stylesheet">
   ```
2. Repeat step 1 for `about.html`, `events.html`, `gallery.html`, and `contact.html`.
3. Open `css/style.css`. At the top, add:
   ```css
   h1, h2, h3, h4, h5, h6 {
       font-family: 'Montserrat', Arial, sans-serif;
   }

   body, p, li, a, td, th, input, textarea, select, button {
       font-family: 'Open Sans', Arial, sans-serif;
   }
   ```
4. Save all files. Preview `index.html` in the browser (F12). Verify that headings now use Montserrat and body text uses Open Sans.

✅ **Check:** Headings look distinctly different from body text. If you disconnect from the internet and refresh, the page still displays correctly with Arial.

💾 **Save** all files.

---

### TASK 2: Apply Text Styling to the Header

🎯 **Goal:** Make the header text professional with proper alignment, spacing, and text shadow.

📝 **What you will do:** Update the header CSS with text-align, letter-spacing, line-height, and text-shadow.

🔧 **Steps:**

1. In `css/style.css`, find or create the `header` rule and update it:
   ```css
   header {
       background: linear-gradient(135deg, #1a5276 0%, #2874a6 50%, #3498db 100%);
       color: white;
       text-align: center;
       padding: 40px 20px;
   }

   header h1 {
       font-family: 'Montserrat', sans-serif;
       font-size: 48px;
       font-weight: 700;
       margin-bottom: 10px;
       text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
       letter-spacing: 2px;
   }

   header p {
       font-size: 20px;
       line-height: 1.4;
       opacity: 0.9;
   }
   ```
2. Save and preview. Confirm the heading has a shadow, wider letter spacing, and the tagline is centred below it.

✅ **Check:** The header text is clearly readable against the gradient. The shadow is visible but not overpowering.

💾 **Save** `style.css`.

---

### TASK 3: Create Interactive Event Cards with Hover Effects

🎯 **Goal:** Style event cards with rounded corners, shadows, and a smooth hover-lift animation.

📝 **What you will do:** Add CSS for `.event-card` with `border-radius`, `box-shadow`, `transition`, and `:hover` transform.

🔧 **Steps:**

1. In `events.html` (or wherever your event cards live), make sure each card uses this structure:
   ```html
   <div class="event-card">
       <div class="event-date">March 15, 2024</div>
       <h3>Web Design Workshop</h3>
       <p class="event-location">Room 301, Building A</p>
       <p>Learn responsive web design fundamentals.</p>
   </div>
   ```
2. In `css/style.css`, add:
   ```css
   .event-card {
       background-color: #f8f9fa;
       border-left: 5px solid #3498db;
       padding: 25px;
       margin-bottom: 20px;
       border-radius: 8px;
       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
       transition: transform 0.3s ease,
                   box-shadow 0.3s ease,
                   border-left-color 0.3s ease;
   }

   .event-card:hover {
       transform: translateY(-3px);
       box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
       border-left-color: #1a5276;
   }

   .event-date {
       color: #3498db;
       font-weight: 600;
       font-size: 14px;
       margin-bottom: 5px;
   }

   .event-location {
       color: #666;
       font-style: italic;
       font-size: 14px;
       margin-bottom: 10px;
   }
   ```
3. Save and preview. Hover your mouse over each event card.

✅ **Check:** Cards lift slightly on hover with a smooth animation. The shadow deepens. Moving the mouse away reverses the animation smoothly.

💾 **Save** all files.

---

### TASK 4: Style Navigation Links with Hover Transitions

🎯 **Goal:** Make navigation links animate their background colour on hover.

📝 **What you will do:** Add transition and hover styles to nav links.

🔧 **Steps:**

1. In `css/style.css`, find or create the nav link rules:
   ```css
   nav ul li a {
       display: block;
       color: white;
       text-decoration: none;
       padding: 15px 25px;
       font-family: 'Montserrat', sans-serif;
       font-size: 15px;
       font-weight: 600;
       transition: background-color 0.3s ease,
                   box-shadow 0.3s ease;
   }

   nav ul li a:hover,
   nav ul li a.active {
       background-color: #3498db;
       box-shadow: inset 0 -3px 0 #ffcc00;
   }
   ```
2. Save and preview. Hover over each nav link.

✅ **Check:** Background colour fades in smoothly on hover. Active page link stays highlighted. The yellow bottom border accent appears on hover.

💾 **Save** all files.

---

### TASK 5: Add a Gradient Welcome Banner

🎯 **Goal:** Create an eye-catching banner section with a gradient background and a call-to-action button.

📝 **What you will do:** Add HTML for the banner and CSS with gradient, text shadow, and button hover effect.

🔧 **Steps:**

1. In `index.html`, inside `<main>`, add:
   ```html
   <section class="welcome-banner">
       <div class="banner-content">
           <h2>Join Our Community</h2>
           <p>Become a member of the Student Club and unlock exciting opportunities!</p>
           <a href="contact.html" class="btn btn-large">Join Now</a>
       </div>
   </section>
   ```
2. In `css/style.css`, add:
   ```css
   .welcome-banner {
       background: linear-gradient(135deg, #2874a6 0%, #1a5276 50%, #0d3b5e 100%);
       color: white;
       text-align: center;
       padding: 50px 30px;
       margin: 20px 0;
       border-radius: 10px;
   }

   .welcome-banner h2 {
       font-family: 'Montserrat', sans-serif;
       font-size: 36px;
       color: white;
       border: none;
       margin-bottom: 15px;
       text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
   }

   .welcome-banner p {
       font-size: 18px;
       margin-bottom: 25px;
       opacity: 0.9;
   }

   .btn {
       display: inline-block;
       background: linear-gradient(to right, #2874a6, #3498db);
       color: white;
       padding: 10px 25px;
       text-decoration: none;
       border-radius: 25px;
       font-size: 14px;
       font-weight: 600;
       border: none;
       cursor: pointer;
       transition: all 0.3s ease;
       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
   }

   .btn:hover {
       background: linear-gradient(to right, #1a5276, #2874a6);
       transform: translateY(-2px);
       box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
   }

   .btn-large {
       font-size: 18px;
       padding: 15px 40px;
   }
   ```
3. Save and preview.

✅ **Check:** The banner has a dark diagonal gradient. The heading has a text shadow. The "Join Now" button is pill-shaped with its own gradient and lifts on hover.

💾 **Save** all files.

---

# 🐛 COMMON ERRORS — WHAT THE BROWSER SHOWS YOU

Web fonts and CSS3 effects fail quietly: the page still renders, just not the way you designed it.

| Symptom you see | Likely cause | How to confirm | Fix |
|---|---|---|---|
| Custom font never appears | The `<link>` to Google Fonts is missing or below the stylesheet | Network tab shows no request to `fonts.googleapis.com` | Put the font `<link>` in `<head>`, before your own CSS |
| Font loads but the page uses the fallback | The `font-family` name does not match, or quotes are missing | Computed pane shows the rendered family | Copy the exact name: `font-family: 'Roboto', sans-serif` |
| Bold and italic look wrong or "smeared" | Those weights were not requested from Google Fonts | Check the `<link>` URL for the weight list | Request the weights you use, e.g. `wght@400;700` |
| A flash of unstyled text on every load | Normal web-font behaviour before the font arrives | Throttle to Slow 3G in the Network tab | Add `&display=swap` to the font URL |
| `box-shadow` invisible | Zero blur and zero offset, or the colour matches the background | Inspect the computed value | Give it offset, blur, and a contrasting `rgba()` colour |
| `border-radius` has no effect | Applied to an inline element | Check the computed `display` | Set `display: inline-block` or `block` |
| Gradient renders as a flat colour | Only one colour stop, or a missing comma | Styles pane marks the value invalid | `linear-gradient(to right, #123, #456)` |
| Transition jumps instead of animating | `transition` declared on the `:hover` rule, not the base rule | Inspect the base rule | Put `transition` on the element itself |
| Animation ignores `auto` values | `height: auto` and `display` are not animatable | The transition simply snaps | Animate `max-height`, `opacity`, or `transform` instead |
| Text unreadable over a gradient or image | Insufficient contrast | Run the DevTools contrast checker | Darken the overlay, or use a solid backing colour behind the text |

**Check the font actually swapped, not just loaded.** In DevTools, select a heading and read the Computed panel's rendered font at the very bottom. It names the font the browser truly used — which is the only way to catch a silent fallback.

---


# ✅ SELF-CHECK QUESTIONS

Answer these from memory first, then expand the answer to check yourself.

**Q1. Where does the Google Fonts `<link>` go, and why there?**

<details>
<summary>Answer</summary>

Inside `<head>`, **before** your own `<link rel="stylesheet" href="css/style.css">`. The font must be requested early so the browser can start downloading it while parsing the rest of the page, and it must load before your CSS so your `font-family` rules have the font available.

</details>

---

**Q2. Why does `font-family` take a comma-separated list instead of a single name?**

<details>
<summary>Answer</summary>

It is a **fallback stack**. The browser tries each name in order and uses the first one available. `font-family: 'Roboto', Arial, sans-serif` means: use Roboto if it loaded; if the request failed, use Arial; if Arial is missing, use whatever sans-serif font the system provides. Always end with a generic family (`sans-serif`, `serif`, `monospace`).

</details>

---

**Q3. Should `transition` go on the base selector or on `:hover`? Why?**

<details>
<summary>Answer</summary>

On the **base** selector. Putting it on `:hover` only animates the mouse-enter; when the pointer leaves, the `:hover` rule (and its transition) no longer applies, so the element snaps back instantly. On the base selector, both directions animate smoothly.

</details>

---

**Q4. Read `box-shadow: 0 4px 12px rgba(0,0,0,0.15)` value by value.**

<details>
<summary>Answer</summary>

`0` horizontal offset (no left/right shift) · `4px` vertical offset (shadow sits below) · `12px` blur radius (soft edge) · `rgba(0,0,0,0.15)` colour — black at 15% opacity. Using `rgba` rather than a solid grey lets the page background show through, which looks natural on any background colour.

</details>

---

**Q5. Why prefer `rgba(0,0,0,0.15)` over a hex colour like `#cccccc` for shadows?**

<details>
<summary>Answer</summary>

`rgba` is semi-transparent, so the shadow tints whatever is behind it and looks correct on white, coloured, and image backgrounds alike. A solid `#cccccc` shadow looks right on white and obviously wrong on anything else.

</details>

---

**Q6. What is the difference between `text-shadow` and `box-shadow`?**

<details>
<summary>Answer</summary>

`text-shadow` applies to the **glyphs** of the text; `box-shadow` applies to the element's **box**. `text-shadow` takes no spread value and has no `inset` keyword. Use `text-shadow` sparingly — mainly to lift light text off a photo or gradient — and never on body copy, where it hurts readability.

</details>

---

**Q7. What does `135deg` mean in `linear-gradient(135deg, #667eea, #764ba2)`?**

<details>
<summary>Answer</summary>

The direction the gradient travels. `0deg` runs bottom to top, `90deg` left to right, `180deg` top to bottom; `135deg` runs diagonally from top-left to bottom-right. Note a gradient is a **background image**, so it replaces `background-color` — you cannot show both on the same element.

</details>

---

**Q8. Which properties are cheap to animate, and which cause slow repaints?**

<details>
<summary>Answer</summary>

**Cheap:** `transform` and `opacity` — the compositor handles them on the GPU without re-running layout. **Expensive:** `width`, `height`, `top`, `left`, `margin`, `padding` — each frame forces a re-layout of the page. To move something, use `transform: translateY(-2px)` rather than animating `top`.

</details>

---


# 📝 SELF-ASSESSMENT WORKSHEET

| # | I can... | Yes | No |
|---|---|---|---|
| 1 | Add Google Fonts to an HTML page using `<link>` tags | ☐ | ☐ |
| 2 | Write a font-family stack with proper fallback fonts | ☐ | ☐ |
| 3 | Explain the difference between `<link>` and `@import` for fonts | ☐ | ☐ |
| 4 | Use `text-align`, `line-height`, and `letter-spacing` effectively | ☐ | ☐ |
| 5 | Create rounded corners with `border-radius` | ☐ | ☐ |
| 6 | Add `box-shadow` and `text-shadow` for depth | ☐ | ☐ |
| 7 | Build linear and radial gradients as backgrounds | ☐ | ☐ |
| 8 | Write CSS transitions that animate hover effects smoothly | ☐ | ☐ |

If you answered **No** to any item, revisit the corresponding Theory section and redo the relevant Hands-On task before moving on.

---

# 🔗 FURTHER READING

- [CSS transitions — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
- [CSS transforms — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [Using CSS gradients — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_images/Using_CSS_gradients)
- [`box-shadow` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- [`border-radius` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius)
- [`@font-face` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
- [`text-shadow` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)
- [`line-height` — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height)
- [Google Fonts](https://fonts.google.com)
- [Web Fundamentals: Typography — web.dev](https://web.dev/articles/typography)

---

# ⏭️ NEXT SESSION

Session 8 is a **Review & Midterm Preparation** session — we will recap everything from Sessions 1–7, work through practice exam questions, and make sure you are fully ready for the midterm.
