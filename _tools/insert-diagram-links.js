/* D4 — per-section diagram cross-links.

   Inserts one blockquote line under a chapter section heading, pointing at the
   canvas file, the diagram component, and the slide that mounts it.

     node _tools/insert-diagram-links.js <ebookDir> [--dry]

   Sections are matched by their "## N. " number, never by line number, so the
   script is safe to re-run and immune to line drift. A section that already
   carries a diagram line is skipped rather than duplicated. Every mapped
   section must exist exactly once or the run fails without writing. */
const fs = require("fs");
const path = require("path");

// chapter file -> { deck, sections: { N: [ [component, slideId, slideTitle] ] } }
const MAP = {
  "01-introduction-to-dreamweaver.md": {
    deck: "buoi-01",
    sections: {
      1: [["RequestResponseCycle", "how-web-works", "How the Web Works"]],
      2: [["TagAnatomy", "what-is-html", "What Is an HTML File?"]],
      6: [["HeadVsBody", "head-vs-body", "Where Does Each Part Show Up?"]],
      9: [["RequestResponseCycle", "how-web-works", "How the Web Works"]],
    },
  },
  "02-creating-a-new-site.md": {
    deck: "buoi-02",
    sections: {
      3: [
        ["PathResolver", "paths", "Relative vs Absolute Paths"],
        ["DotDotLadder", "dotdot-rule", "The ../ Rule"],
      ],
      5: [["GitFlow", "git-basics", "Git & GitHub Basics"]],
    },
  },
  "03-working-with-text-and-images.md": {
    deck: "buoi-03",
    sections: {
      1: [["HeadingOutline", "headings", "Headings: Page Structure"]],
      4: [
        ["ImgAnatomy", "images", "The img Tag"],
        ["AltTextCompare", "alt-text", "Alt Text & Accessibility"],
      ],
      5: [["FormatChooser", "image-formats", "Choosing Image Formats"]],
    },
  },
  "04-applying-css-to-website.md": {
    deck: "buoi-04",
    sections: {
      2: [["RuleAnatomy", "s04-rule-anatomy", "Anatomy of a CSS Rule"]],
      6: [["BoxModelDiagram", "s04-box-model", "The Box Model"]],
      7: [["SpecificityScale", "s04-specificity", "Specificity"]],
    },
  },
  "05-creating-page-layouts.md": {
    deck: "buoi-05",
    sections: {
      1: [["SemanticSkeleton", "s05-semantic", "Semantic HTML5"]],
      2: [["DisplayTypes", "s05-display", "Display Types"]],
      3: [["FlexAxesDiagram", "s05-flexbox", "Flexbox Basics"]],
    },
  },
  "06-creating-page-layouts-continued.md": {
    deck: "buoi-06",
    sections: {
      1: [["MultiPageNav", "s06-architecture", "Multi-Page Architecture"]],
      2: [["LinkTargets", "s06-relative-links", "Relative Links"]],
      3: [["ActiveClassWalk", "s06-active-class", "Active Navigation"]],
    },
  },
  "07-css3-and-web-fonts.md": {
    deck: "buoi-07",
    sections: {
      2: [["GoogleFontsFlow", "s7-google-fonts", "Google Fonts"]],
      3: [["FontStackChain", "s7-font-stacks", "Font stacks & text styling"]],
      5: [["PolishLab", "s7-corners-shadows", "Rounded corners & shadows"]],
      6: [["PolishLab", "s7-corners-shadows", "Rounded corners & shadows"]],
    },
  },
  "08-review-and-midterm.md": {
    deck: "buoi-08",
    sections: {
      1: [["CourseMap", "s8-course-map", "Everything So Far, On One Page"]],
      2: [["ExamBudget", "s8-exam-format", "Midterm format"]],
      3: [["MarkLosers", "s8-mistakes", "Common exam mistakes"]],
    },
  },
  "09-working-with-tables.md": {
    deck: "buoi-09",
    sections: {
      2: [["TableAnatomy", "s9-anatomy", "Table anatomy"]],
      4: [["SpanGrid", "s9-merging", "Merging cells"]],
      5: [["TableStylePreview", "s9-styling", "CSS table styling"]],
    },
  },
  "10-embedding-flash-video-and-sound.md": {
    deck: "buoi-10",
    sections: {
      2: [
        ["VideoAnatomy", "s10-video", "The video Element"],
        ["CodecFallback", "s10-codec", "Source & Codec Selection"],
      ],
      3: [["AutoplayRules", "s10-audio", "Audio & Autoplay Rules"]],
      5: [["IframeEmbed", "s10-iframe", "YouTube / Vimeo Embeds"]],
    },
  },
  "11-designing-a-compact-site.md": {
    deck: "buoi-11",
    sections: {
      2: [["BriefToSpec", "s11-clo2", "Requirements Analysis (CLO2)"]],
      3: [["SiteMap", "s11-sitemap", "Site Maps"]],
      4: [["DryPrinciple", "s11-dry", "DRY — Don't Repeat Yourself"]],
      5: [["VisualHierarchy", "s11-hierarchy", "Visual Hierarchy"]],
    },
  },
  "12-using-code-editing-tools.md": {
    deck: "buoi-12",
    sections: {
      1: [["VSCodeLayout", "s12-vscode", "VS Code Interface"]],
      3: [["EmmetExpand", "s12-emmet", "Emmet Abbreviations"]],
      6: [["ValidatorReport", "s12-validation", "W3C Validation"]],
      8: [["DevToolsLoop", "s12-devtools", "Browser DevTools"]],
    },
  },
  "13-creating-forms.md": {
    deck: "buoi-13",
    sections: {
      1: [["FormDataFlow", "s13-what-is-form", "What Is a Form?"]],
      3: [["InputTypeGallery", "s13-input-types", "Input Types"]],
      5: [["LabelWiring", "s13-labels", "Labels, Fieldsets & Legends"]],
    },
  },
  "14-working-with-spry-framework.md": {
    deck: "buoi-14",
    sections: {
      1: [["SpryVsModern", "s14-what-is-spry", "What Is Spry?"]],
      3: [["SpryRemoval", "s14-migration", "Migrating from Spry"]],
      4: [["DropdownAnatomy", "s14-dropdown-code", "CSS-Only Dropdown Navigation"]],
      5: [["DetailsAccordion", "s14-modern-css", "Modern CSS Alternatives"]],
    },
  },
  "15-mobile-interface-design-and-review.md": {
    deck: "buoi-15",
    sections: {
      2: [["ViewportMeta", "s15-responsive", "Viewport & Media Queries"]],
      3: [
        ["MediaQueryAnatomy", "s15-media-queries", "Media Query Breakpoints"],
        ["MobileFirstLadder", "s15-media-queries", "Media Query Breakpoints"],
      ],
      6: [["ResponsiveDevices", "s15-breakpoints", "Common Breakpoints"]],
    },
  },
};

const MARKER = "> \u{1F5BC} **Diagram";

function buildLine(deck, entries) {
  const refs = entries
    .map(([fn, id, title]) => `\`${fn}\` — slide \`${id}\` ("${title}")`)
    .join("; ");
  const label = entries.length > 1 ? "Diagrams" : "Diagram";
  return `> \u{1F5BC} **${label}:** \`canvases/${deck}.canvas.tsx\` \u2192 ${refs}`;
}

const [dirArg, ...flags] = process.argv.slice(2);
if (!dirArg) {
  console.error("usage: insert-diagram-links.js <ebookDir> [--dry]");
  process.exit(2);
}
const dry = flags.includes("--dry");
let hardFail = 0;
const plan = [];

// Pass 1: locate every target and validate. Nothing is written in this pass, so
// a bad mapping cannot leave the ebook half-edited.
for (const [file, spec] of Object.entries(MAP)) {
  const full = path.join(dirArg, file);
  if (!fs.existsSync(full)) {
    console.log(`FAIL  ${file}  not found`);
    hardFail++;
    continue;
  }
  const src = fs.readFileSync(full, "utf8");
  const nl = src.includes("\r\n") ? "\r\n" : "\n";
  const lines = src.split(/\r?\n/);
  const inserts = [];

  // Chapter 11 embeds a requirements template whose lines start with "## 1. ",
  // "## 2. " and so on. Those are sample content, not chapter sections, so any
  // line inside a fenced block is invisible to the matcher below.
  const inFence = new Array(lines.length).fill(false);
  let fenced = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) {
      fenced = !fenced;
      inFence[i] = true;
      continue;
    }
    inFence[i] = fenced;
  }

  for (const [num, entries] of Object.entries(spec.sections)) {
    const re = new RegExp(`^## ${num}\\. `);
    const hits = lines.reduce(
      (a, l, i) => (!inFence[i] && re.test(l) ? a.concat(i) : a),
      []
    );
    if (hits.length !== 1) {
      console.log(`FAIL  ${file}  "## ${num}. " matched ${hits.length} times`);
      hardFail++;
      continue;
    }
    const head = hits[0];
    // Land after the blank line that follows the heading.
    let at = head + 1;
    while (at < lines.length && lines[at].trim() === "") at++;
    if (lines.slice(head, at + 2).some((l) => l.startsWith(MARKER))) {
      console.log(`skip  ${file}  section ${num} already linked`);
      continue;
    }
    inserts.push({ num, at, text: buildLine(spec.deck, entries) });
  }
  plan.push({ file, full, nl, lines, inserts });
}

if (hardFail) {
  console.log(`\n${hardFail} hard failure(s) — nothing written`);
  process.exit(1);
}

// Pass 2: apply bottom-up per file so earlier offsets stay valid.
let total = 0;
for (const p of plan) {
  if (p.inserts.length === 0) continue;
  const ordered = [...p.inserts].sort((a, b) => a.at - b.at);
  p.inserts.sort((a, b) => b.at - a.at);
  for (const ins of p.inserts) {
    p.lines.splice(ins.at, 0, ins.text, "");
    total++;
  }
  if (!dry) fs.writeFileSync(p.full, p.lines.join(p.nl), "utf8");
  console.log(
    `${dry ? "would write" : "wrote"} ${p.file.padEnd(42)} ` +
      `+${p.inserts.length} at sections ${ordered.map((i) => i.num).join(",")}`
  );
}
console.log(`\n${dry ? "planned" : "inserted"} ${total} diagram cross-link(s)`);
