// Ace — the provisional Target95 study companion.
// A 16x16 pixel-art character drawn as SVG rectangles. The pixel map is the single source of
// truth for the artwork; colours live in stitch-home.css (.ace-*) so the palette stays tokenised.
// Rendering is fully deterministic (no browser APIs), so it is safe for SSR and hydration.

const GRID = 16;

const BODY_ROWS = [
  ".......YY.......",
  ".......OO.......",
  "...OOOOOOOOOO...",
  "..OBBBBBBBBBBO..",
  "..OBBBBBBBBBBO..",
  "..OBWWWWWWWWBO..",
  "..OBWEWWWWEWBO..",
  "..OBWEWWWWEWBO..",
  "..OBWWEWWEWWBO..",
  "..OBWWWEEWWWBO..",
  "..OBBBIIIIBBBO..",
  "..OBBBIYYIBBBO..",
  "..OBBBIYYIBBBO..",
  "..OBBBIIIIBBBO..",
  "...OOOOOOOOOO...",
  "....II....II....",
];

const PIXEL_CLASS = { O: "ace-o", B: "ace-b", W: "ace-w", E: "ace-o", Y: "ace-y", I: "ace-i" };

// Merge horizontal runs of the same colour into one rect to keep the DOM small.
function buildRects(rows) {
  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      let end = x;
      while (end + 1 < row.length && row[end + 1] === key) end += 1;
      if (PIXEL_CLASS[key]) rects.push({ x, y, width: end - x + 1, className: PIXEL_CLASS[key] });
      x = end + 1;
    }
  });
  return rects;
}

const BODY_RECTS = buildRects(BODY_ROWS);

export default function AceMascot({ size = 64, className = "" }) {
  return (
    <svg
      className={`ace-mascot ${className}`.trim()}
      width={size}
      height={size}
      viewBox={`0 0 ${GRID} ${GRID}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g className="ace-sprite">
        {BODY_RECTS.map((rect) => (
          <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={rect.width} height="1" className={rect.className} />
        ))}
        <rect x="0" y="9" width="2" height="3" className="ace-arm ace-i" />
        <rect x="14" y="9" width="2" height="3" className="ace-arm ace-arm-wave ace-i" />
      </g>
    </svg>
  );
}
