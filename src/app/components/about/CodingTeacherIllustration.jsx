import styles from "./CodingTeacherIllustration.module.css";

// Original, code-drawn illustration: a friendly IT teacher typing at a desk.
// Pure SVG + CSS (no client JS, no external assets), so it is safe for SSR and cannot cause
// hydration mismatches. Motion is subtle and finite, and is removed entirely for users who
// prefer reduced motion (see the .module.css file).

// [indent, width, colour class] for each line of "code" on the laptop screen.
const CODE_LINES = [
  [0, 54, "kw"],
  [10, 70, "fn"],
  [10, 48, "str"],
  [20, 84, "txt"],
  [20, 40, "kw"],
  [10, 62, "fn"],
  [10, 30, "num"],
  [0, 24, "kw"],
  [0, 76, "txt"],
];

const LINE_HEIGHT = 8;
const LINE_STEP = 9;
const CODE_TOP = 172;
const CODE_LEFT = 140;

const FLOATING_SYMBOLS = [
  { text: "</>", x: 52, y: 112, delay: "0s" },
  { text: "{ }", x: 196, y: 100, delay: "1.2s" },
  { text: "01", x: 292, y: 92, delay: "2.4s" },
];

export default function CodingTeacherIllustration({ className = "" }) {
  const lastLineY = CODE_TOP + (CODE_LINES.length - 1) * LINE_STEP;
  const [lastIndent, lastWidth] = CODE_LINES[CODE_LINES.length - 1];

  return (
    <svg
      className={`${styles.scene} ${className}`.trim()}
      viewBox="0 0 480 360"
      role="img"
      aria-label="Illustration of a friendly teacher writing code on a laptop at a tidy desk"
      shapeRendering="geometricPrecision"
    >
      {/* Backdrop */}
      <rect x="0" y="0" width="480" height="360" rx="28" className={styles.backdrop} />
      <circle cx="400" cy="70" r="56" className={styles.glow} />
      <circle cx="60" cy="300" r="70" className={styles.glow} />

      {/* Wall shelf with books */}
      <rect x="336" y="76" width="108" height="6" rx="3" className={styles.shelf} />
      <rect x="346" y="46" width="12" height="30" rx="2" className={styles.bookBlue} />
      <rect x="360" y="38" width="12" height="38" rx="2" className={styles.bookIndigo} />
      <rect x="374" y="50" width="12" height="26" rx="2" className={styles.bookAmber} />
      <rect x="388" y="42" width="12" height="34" rx="2" className={styles.bookBlue} />

      {/* Floating programming symbols */}
      {FLOATING_SYMBOLS.map((symbol) => (
        <text
          key={symbol.text}
          x={symbol.x}
          y={symbol.y}
          className={styles.symbol}
          style={{ animationDelay: symbol.delay }}
        >
          {symbol.text}
        </text>
      ))}

      {/* Chair and teacher (drawn first so the desk overlaps the lower body) */}
      <rect x="378" y="176" width="12" height="104" rx="6" className={styles.chair} />
      <rect x="326" y="282" width="16" height="48" rx="6" className={styles.trousers} />
      <rect x="352" y="282" width="16" height="48" rx="6" className={styles.trousers} />
      <rect x="318" y="326" width="28" height="9" rx="4" className={styles.shoe} />
      <rect x="348" y="326" width="28" height="9" rx="4" className={styles.shoe} />
      <rect x="318" y="196" width="66" height="92" rx="24" className={styles.shirt} />
      <rect x="338" y="196" width="26" height="10" rx="5" className={styles.collar} />

      {/* Head: facing the laptop */}
      <circle cx="342" cy="160" r="27" className={styles.skin} />
      <path d="M316 158c-2-26 20-38 40-30 14 5 18 20 14 32-6-12-16-18-28-17-10 1-18 6-26 15z" className={styles.hair} />
      <circle cx="330" cy="162" r="8" className={styles.lens} />
      <path d="M338 162h8M322 160l-8-3" className={styles.glassesFrame} />
      <circle cx="330" cy="162" r="2" className={styles.pupil} />
      <path d="M326 176c4 4 10 4 14 0" className={styles.smile} />

      {/* Desk */}
      <rect x="36" y="268" width="408" height="12" rx="4" className={styles.desk} />
      <rect x="64" y="280" width="10" height="56" rx="3" className={styles.deskLeg} />
      <rect x="406" y="280" width="10" height="56" rx="3" className={styles.deskLeg} />

      {/* Laptop */}
      <rect x="112" y="258" width="184" height="11" rx="4" className={styles.laptopBase} />
      <rect x="126" y="148" width="156" height="112" rx="8" className={styles.laptopShell} />
      <rect x="134" y="156" width="140" height="96" rx="4" className={styles.screen} />
      <circle cx="144" cy="163" r="2.2" className={styles.dotRed} />
      <circle cx="152" cy="163" r="2.2" className={styles.dotAmber} />
      <circle cx="160" cy="163" r="2.2" className={styles.dotGreen} />

      {/* Code lines "type in" one after another, then rewrite, giving a believable coding rhythm */}
      {CODE_LINES.map(([indent, width, tone], index) => (
        <rect
          key={index}
          x={CODE_LEFT + indent}
          y={CODE_TOP + index * LINE_STEP}
          width={width}
          height={LINE_HEIGHT - 3}
          rx="1.5"
          className={`${styles.codeLine} ${styles[tone]}`}
          style={{ animationDelay: `${index * 0.8}s` }}
        />
      ))}
      <rect
        x={CODE_LEFT + lastIndent + lastWidth + 3}
        y={lastLineY - 1}
        width="3"
        height={LINE_HEIGHT}
        className={styles.cursor}
      />

      {/* Arms and hands: tiny alternating motion suggests typing */}
      <path d="M340 214L292 252" className={styles.armBack} />
      <path d="M350 218L304 256" className={styles.armFront} />
      <circle cx="288" cy="254" r="7" className={`${styles.skin} ${styles.handBack}`} />
      <circle cx="300" cy="258" r="7" className={`${styles.skin} ${styles.handFront}`} />

      {/* Books and graduation cap */}
      <rect x="48" y="244" width="62" height="12" rx="2" className={styles.bookBlue} />
      <rect x="54" y="256" width="56" height="12" rx="2" className={styles.bookIndigo} />
      <rect x="44" y="232" width="56" height="12" rx="2" className={styles.bookAmber} />
      <path d="M72 218l30-12 30 12-30 12z" className={styles.cap} />
      <path d="M86 226v10c0 4 32 4 32 0v-10" className={styles.capBase} />
      <path d="M132 218v14" className={styles.tassel} />

      {/* Small plant for warmth */}
      <rect x="418" y="246" width="16" height="22" rx="3" className={styles.pot} />
      <path d="M426 246c-12-10-10-24-2-30 2 12 4 20 2 30zM426 246c10-8 14-20 8-28-6 8-8 18-8 28z" className={styles.leaf} />
    </svg>
  );
}
