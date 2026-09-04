/* ============================================================================
   Local stand-in for the host-provided "qoder/canvas" module.

   Why this file exists
   --------------------
   canvases/*.canvas.tsx are React components that import their layout
   primitives from "qoder/canvas", a module only the canvas host provides.
   To turn those decks into plain HTML we supply the same API here and render
   the decks with react-dom/server. Nothing in canvases/ is modified.

   The one design rule that makes this work
   ----------------------------------------
   useHostTheme() returns tokens whose values are CSS custom properties
   ("var(--chart-blue)") instead of literal colours. Every colour the decks
   bake into inline SVG therefore stays live in the exported HTML, so one
   static render supports both the light and the dark theme.
   ========================================================================== */

import { Children, isValidElement } from "react";

/* --- render-time collector, read by _tools/build-html-slides.mjs ---------- */
export const __deck = {
  isPresentation: false,
  options: {},
  slides: [],
  assets: [],
};

/** Clears the per-render state. `assets` is deliberately preserved: canvasImage()
    runs at module scope, so its registrations happen once, at import time. */
export function __resetDeck() {
  __deck.isPresentation = false;
  __deck.options = {};
  __deck.slides = [];
}

/* --- theme tokens -------------------------------------------------------- */
const v = (name) => `var(--${name})`;

export const TOKENS = {
  bg: { base: v("bg-base"), elevated: v("bg-elevated"), editor: v("bg-editor") },
  fill: {
    primary: v("fill-primary"),
    secondary: v("fill-secondary"),
    tertiary: v("fill-tertiary"),
  },
  stroke: {
    primary: v("stroke-primary"),
    secondary: v("stroke-secondary"),
    tertiary: v("stroke-tertiary"),
  },
  text: {
    primary: v("text-primary"),
    secondary: v("text-secondary"),
    tertiary: v("text-tertiary"),
    inverse: v("text-inverse"),
  },
  chart: {
    blue: v("chart-blue"),
    green: v("chart-green"),
    goldenYellow: v("chart-goldenYellow"),
    brightOrange: v("chart-brightOrange"),
    purple: v("chart-purple"),
    teal: v("chart-teal"),
    red: v("chart-red"),
    gray: v("chart-gray"),
  },
  accent: { primary: v("accent-primary"), secondary: v("accent-secondary") },
};

export function useHostTheme() {
  return { tokens: TOKENS, theme: "light", colorScheme: "light" };
}

/* --- assets -------------------------------------------------------------- */
/** canvasImage("./s1-datacenter.jpg") -> "assets/s1-datacenter.jpg" */
export function canvasImage(ref) {
  const clean = String(ref).replace(/^\.\//, "").replace(/^\/+/, "");
  const file = clean.split("/").pop();
  if (!__deck.assets.includes(clean)) __deck.assets.push(clean);
  return `assets/${file}`;
}

/* --- shared helpers ------------------------------------------------------ */
const cx = (...parts) => parts.filter(Boolean).join(" ");
const px = (n) => (typeof n === "number" ? `${n}px` : n);
const tone = (t) => (t ? `is-${t}` : null);

function flatten(children, out = []) {
  Children.toArray(children).forEach((child) => {
    if (Array.isArray(child)) flatten(child, out);
    else if (isValidElement(child) && child.type === Symbol.for("react.fragment"))
      flatten(child.props.children, out);
    else out.push(child);
  });
  return out;
}

function collectSlides(children, out = []) {
  flatten(children).forEach((child) => {
    if (!isValidElement(child)) return;
    if (child.type === PresentationSlide) out.push(child);
    else if (child.props && child.props.children)
      collectSlides(child.props.children, out);
  });
  return out;
}

function textOf(node) {
  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) return textOf(node.props.children);
  return "";
}

/* --- syntax highlighting -------------------------------------------------
   Regex tokenizers, deliberately small. The decks only use html, css, bash,
   text and markdown, so that is all this covers. Output is React elements —
   no dangerouslySetInnerHTML anywhere, so deck content cannot inject markup.
   ------------------------------------------------------------------------ */

const RULES = {
  html: [
    ["comment", /^<!--[\s\S]*?-->/],
    ["doctype", /^<!DOCTYPE[^>]*>/i],
    ["tag", /^<\/?[a-zA-Z][\w-]*/],
    ["punct", /^\/?>/],
    ["attr", /^[a-zA-Z-][\w:-]*(?==)/],
    ["op", /^=/],
    ["string", /^"[^"]*"|^'[^']*'/],
    ["entity", /^&[a-zA-Z#][\w]*;/],
    ["space", /^\s+/],
    ["text", /^[^<&\s]+/],
  ],
  css: [
    ["comment", /^\/\*[\s\S]*?\*\//],
    ["at", /^@[\w-]+/],
    ["string", /^"[^"]*"|^'[^']*'/],
    ["prop", /^[a-zA-Z-]+(?=\s*:)/],
    ["number", /^-?\d*\.?\d+(px|em|rem|%|vh|vw|s|ms|deg|fr)?\b/],
    ["color", /^#[0-9a-fA-F]{3,8}\b/],
    ["fn", /^[a-zA-Z-]+(?=\()/],
    ["punct", /^[{}();:,]/],
    ["sel", /^[.#][\w-]+|^&?:{1,2}[\w-]+|^\*|^[>+~]/],
    ["space", /^\s+/],
    ["text", /^[^\s{}();:,#.@"'*>+~-]+|^-|^./],
  ],
  bash: [
    ["comment", /^#.*/],
    ["string", /^"[^"]*"|^'[^']*'/],
    ["flag", /^\s-{1,2}[\w-]+/],
    ["cmd", /^(?:git|npm|npx|node|cd|mkdir|ls|dir|cp|mv|rm|echo|code|python|open|curl)\b/],
    ["punct", /^[|&><]+/],
    ["space", /^\s+/],
    ["text", /^[^\s"'#|&><]+/],
  ],
  markdown: [
    ["heading", /^#{1,6} .*/],
    ["fence", /^```[\s\S]*?```/],
    ["string", /^`[^`]*`/],
    ["bold", /^\*\*[^*]+\*\*/],
    ["space", /^\s+/],
    ["text", /^[^\s`*#>]+|^./],
  ],
};

function tokenize(code, language) {
  const rules = RULES[language];
  if (!rules) return [{ type: "text", value: code }];
  const out = [];
  let rest = code;
  let guard = 0;
  while (rest.length && guard++ < 60000) {
    let hit = null;
    for (const [type, re] of rules) {
      const m = re.exec(rest);
      if (m && m[0].length) {
        hit = { type, value: m[0] };
        break;
      }
    }
    if (!hit) hit = { type: "text", value: rest[0] };
    const prev = out[out.length - 1];
    if (prev && prev.type === hit.type && (hit.type === "text" || hit.type === "space"))
      prev.value += hit.value;
    else out.push(hit);
    rest = rest.slice(hit.value.length);
  }
  return out;
}

function highlight(code, language) {
  if (!language || language === "text") return code;
  return tokenize(code, language).map((tk, i) =>
    tk.type === "space" || tk.type === "text" ? (
      tk.value
    ) : (
      <span key={i} className={`tok-${tk.type}`}>
        {tk.value}
      </span>
    )
  );
}

/* --- layout primitives --------------------------------------------------- */

export function Stack({ gap = 8, align, children, className, style }) {
  return (
    <div
      className={cx("c-stack", align === "center" && "is-center", className)}
      style={{ gap: px(gap), ...style }}
    >
      {children}
    </div>
  );
}

export function Row({ gap = 8, align, children, className, style }) {
  return (
    <div
      className={cx("c-row", align === "center" && "is-center", className)}
      style={{ gap: px(gap), ...style }}
    >
      {children}
    </div>
  );
}

export function Grid({ columns = 2, gap = 12, children, className, style }) {
  const template =
    typeof columns === "number" ? `repeat(${columns}, minmax(0,1fr))` : columns;
  return (
    <div
      className={cx("c-grid", className)}
      style={{ gridTemplateColumns: template, gap: px(gap), ...style }}
    >
      {children}
    </div>
  );
}

export function Divider({ style }) {
  return <hr className="c-divider" style={style} />;
}

/* --- typography ----------------------------------------------------------
   Heading levels are shifted down one step from what the decks declare. Each
   emitted page already owns an <h1> (deck title) and gives every slide an
   <h2> (slide title), so a deck's <H2> becomes <h3> and <H3> becomes <h4>.
   A deck's <H1> is a visual restatement of the slide title, so it renders as
   a styled paragraph rather than a second document-level <h1>.
   ------------------------------------------------------------------------ */

export function H1({ children, style }) {
  return (
    <p className="c-h1" style={style}>
      {children}
    </p>
  );
}

export function H2({ children, tone: t, style }) {
  return (
    <h3 className={cx("c-h2", tone(t))} style={style}>
      {children}
    </h3>
  );
}

export function H3({ children, tone: t, style }) {
  return (
    <h4 className={cx("c-h3", tone(t))} style={style}>
      {children}
    </h4>
  );
}

export function Text({
  children,
  tone: t,
  size,
  as = "p",
  fontWeight,
  fontFamily,
  style,
}) {
  const Cmp = as === "span" ? "span" : as;
  return (
    <Cmp
      className={cx(
        "c-text",
        tone(t),
        size === "small" && "is-small",
        fontFamily === "mono" && "is-mono"
      )}
      style={{ fontWeight, ...style }}
    >
      {children}
    </Cmp>
  );
}

/* --- badges and callouts -------------------------------------------------- */

export function Tag({ children, tone: t, style }) {
  return (
    <span className={cx("c-tag", tone(t))} style={style}>
      {children}
    </span>
  );
}

export function Pill({ children, tone: t, style }) {
  return (
    <span className={cx("c-pill", tone(t))} style={style}>
      {children}
    </span>
  );
}

const CALLOUT_ICON = { info: "i", success: "✓", warning: "!", danger: "×" };

export function Callout({ children, tone: t = "info", title, style }) {
  return (
    <div className={cx("c-callout", tone(t))} style={style} role="note">
      <span className="c-callout-icon" aria-hidden="true">
        {CALLOUT_ICON[t] || "i"}
      </span>
      <div className="c-callout-body">
        {title ? <strong className="c-callout-title">{title}</strong> : null}
        <div>{children}</div>
      </div>
    </div>
  );
}

/* --- code ---------------------------------------------------------------- */

export function Code({ children, language, style }) {
  const source = textOf(children).replace(/\n$/, "");
  if (!source.includes("\n")) {
    return (
      <code className="c-code-inline" style={style}>
        {source}
      </code>
    );
  }
  const lines = source.split("\n");
  return (
    <div className={cx("c-code", language && `lang-${language}`)} style={style}>
      {language ? <span className="c-code-lang">{language}</span> : null}
      <pre className="c-code-pre">
        <code>
          {lines.map((line, i) => (
            <span className="c-code-line" key={i}>
              <span className="c-code-ln" aria-hidden="true">
                {i + 1}
              </span>
              <span className="c-code-src">{highlight(line, language)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* --- data display -------------------------------------------------------- */

export function Table({ headers = [], rows = [], caption, style }) {
  return (
    <div className="c-table-wrap" style={style}>
      <table className="c-table">
        {caption ? <caption>{caption}</caption> : null}
        {headers.length ? (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {(Array.isArray(row) ? row : [row]).map((cell, c) => (
                <td key={c}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Stat({ value, label, tone: t, style }) {
  return (
    <div className={cx("c-stat", tone(t))} style={style}>
      <span className="c-stat-value">{value}</span>
      <span className="c-stat-label">{label}</span>
    </div>
  );
}

const PIE_COLORS = [
  TOKENS.chart.blue,
  TOKENS.chart.goldenYellow,
  TOKENS.chart.green,
  TOKENS.chart.brightOrange,
  TOKENS.chart.purple,
  TOKENS.chart.teal,
];

export function PieChart({ data = [], donut, centerLabel, style }) {
  const total = data.reduce((s, d) => s + (Number(d.value) || 0), 0) || 1;
  const C = 90;
  const R = 74;
  const thickness = donut ? 26 : R;
  const r = donut ? R - thickness / 2 : R / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="c-pie" style={style}>
      <svg
        viewBox="0 0 180 180"
        width="180"
        height="180"
        role="img"
        aria-label={`Chart: ${data
          .map((d) => `${d.label} ${Math.round((d.value / total) * 100)} percent`)
          .join(", ")}`}
      >
        <g transform={`rotate(-90 ${C} ${C})`}>
          {data.map((d, i) => {
            const dash = ((Number(d.value) || 0) / total) * circumference;
            const el = (
              <circle
                key={i}
                cx={C}
                cy={C}
                r={r}
                fill="none"
                stroke={PIE_COLORS[i % PIE_COLORS.length]}
                strokeWidth={thickness}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return el;
          })}
        </g>
        {donut && centerLabel ? (
          <text
            x={C}
            y={C + 7}
            textAnchor="middle"
            fontSize="21"
            fontWeight="700"
            fill={TOKENS.text.primary}
          >
            {centerLabel}
          </text>
        ) : null}
      </svg>
      <ul className="c-pie-legend">
        {data.map((d, i) => (
          <li key={i}>
            <span
              className="c-pie-swatch"
              style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
              aria-hidden="true"
            />
            <span className="c-pie-label">{d.label}</span>
            <span className="c-pie-value">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- presentation --------------------------------------------------------
   Presentation returns null on purpose: it records the slide list on __deck
   and the builder renders each slide separately into its own HTML section.
   ------------------------------------------------------------------------ */

export function PresentationFragment({ children, index, effect }) {
  return (
    <div className="c-fragment" data-fragment-index={index} data-effect={effect}>
      {children}
    </div>
  );
}

export function PresentationSlide({ children }) {
  return <>{children}</>;
}

export function Presentation({ children, ...options }) {
  __deck.isPresentation = true;
  __deck.options = options;
  __deck.slides = collectSlides(children).map((s, i) => ({
    index: i,
    id: s.props.id || `slide-${i + 1}`,
    title: s.props.title || "",
    notes: s.props.notes || "",
    background: s.props.background || null,
    node: s,
  }));
  return null;
}

/* `type CanvasTokens` is erased by esbuild, so no runtime export is needed. */

