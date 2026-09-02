#!/usr/bin/env bash
# INS2053 canvas QA sweep. Run from the canvases/ directory:
#   bash ../_tools/qa-canvases.sh
# Exit code is non-zero if any hard check fails.
set -u
WIN=$(pwd -W 2>/dev/null || pwd)
FAIL=0

echo "== 1. bracket balance =============================================="
# Counts brackets in code only: string literals and comments are blanked first,
# so prose like notes="...1) False..." or a "{" inside a label cannot skew it.
node "$(dirname "$0")/check-brackets.js" *.canvas.tsx || FAIL=1

echo "== 2. every diagram function is referenced by a slide ==============="
for f in *.canvas.tsx; do
  for fn in $(grep -o '^function [A-Za-z0-9_]*' "$f" | awk '{print $2}'); do
    [ "$(grep -c "<$fn " "$f")" -eq 0 ] && { echo "UNUSED-FN  $f :: $fn"; FAIL=1; }
  done
done

echo "== 3. unused named imports ========================================="
for f in *.canvas.tsx; do
  for c in $(sed -n '/^import {/,/} from "qoder\/canvas";/p' "$f" | grep -o '^  [A-Za-z][A-Za-z0-9]*,' | tr -d ' ,'); do
    # Used as a JSX tag (<Card ...) or called as a function (canvasImage(...)).
    n=$(grep -Ec "<$c([ />}]|$)|(^|[^A-Za-z0-9_])$c\(" "$f")
    [ "$n" -eq 0 ] && echo "UNUSED-IMPORT  $f :: $c"
  done
done

echo "== 4. svg accessibility (role=img + aria-label per svg) ============="
for f in *.canvas.tsx; do
  s=$(grep -c '<svg' "$f"); r=$(grep -c 'role="img"' "$f"); a=$(grep -c 'aria-label' "$f")
  [ "$s" -gt 0 ] && [ "$r" -lt "$s" ] && { echo "MISSING-ROLE  $f  svg=$s role=$r"; FAIL=1; }
  [ "$s" -gt 0 ] && [ "$a" -lt "$s" ] && { echo "MISSING-ARIA  $f  svg=$s aria=$a"; FAIL=1; }
done

echo "== 5. type floor: no fontSize below 11 ============================="
for f in *.canvas.tsx; do
  grep -o 'fontSize="[0-9.]*"' "$f" | sed 's/[^0-9.]//g' \
    | awk -v F="$f" '$1+0 < 11 {print "SMALL-TYPE  "F"  "$1"px"}'
done

echo "== 6. dangling url(#id) references ================================="
for f in *.canvas.tsx; do
  defs=$(grep -o 'id="[^"]*"' "$f" | sed 's/id="//;s/"//' | sort -u)
  for ref in $(grep -o 'url(#[^)]*)' "$f" | sed 's/url(#//;s/)//' | sort -u); do
    echo "$defs" | grep -qx "$ref" || { echo "DANGLING  $f :: url(#$ref)"; FAIL=1; }
  done
done

echo "== 7. duplicate svg defs ids inside one file ======================="
for f in *.canvas.tsx; do
  dup=$(grep -o '<\(marker\|linearGradient\|radialGradient\|pattern\|filter\|clipPath\) id="[^"]*"' "$f" \
        | grep -o 'id="[^"]*"' | sort | uniq -d)
  [ -n "$dup" ] && { echo "DUP-ID  $f :: $dup"; FAIL=1; }
done

echo "== 8. non-ASCII characters inside svg (labels must be English) ====="
node "$(dirname "$0")/check-svg-ascii.js" "$WIN" || FAIL=1

echo "== 9. estimated text width vs viewBox (labels must not run off) ===="
for f in *.canvas.tsx; do
  node "$(dirname "$0")/check-text-width.js" "$WIN/$f" | grep OVERFLOW && FAIL=1
done
[ "$FAIL" -eq 0 ] && echo "every measurable label fits inside its viewBox"

echo
[ "$FAIL" -eq 0 ] && echo "QA PASS (SMALL-TYPE and UNUSED-IMPORT lines are advisory)" || echo "QA FAIL - see BAD/MISSING/DANGLING/DUP/NON-ASCII/OVERFLOW lines"
exit $FAIL
