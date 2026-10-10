import { Outfit } from "next/font/google";
import Link from "next/link";

const font = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const u = (n: number) => `calc(var(--u) * ${n})`;
const LINE = "1px solid #222";

export default function FounderQuote({
  name = "Arun Kumar",
  role = "Founder & Chairman, Brand Monk Group",
  href = "/founder",
}: { name?: string; role?: string; href?: string }) {
  const B = { fontWeight: 700, color: "#111" } as const;
  const mark = {
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: u(0.9),
    lineHeight: 1,
    color: "#222",
  } as const;

  return (
    <div
      className={font.className}
      style={{
        ["--u" as string]: "clamp(1.125rem, 1.55vw, 1.95rem)",
        fontSize: "var(--u)",
        color: "#333",
        width: "100%",
        maxWidth: u(28.5),
        letterSpacing: "0.01em",
      }}
    >
      {/* QUOTE BUBBLE */}
      <div style={{ position: "relative", paddingBottom: u(0.76) }}>
        {/* opening quote mark hangs in the left margin, top-aligned */}
        <span aria-hidden style={{ ...mark, position: "absolute", left: u(-0.76), top: u(0.05) }}>“</span>

        <p style={{ margin: 0, paddingRight: u(2.2), lineHeight: 1.38, fontWeight: 400, color: "#333" }}>
          We are not just building businesses. We are creating value, challenging mediocrity, and building something that lasts. I’ve never waited for the right path,{" "}
          <strong style={B}>I’ve always built my way forward</strong>. Because some things are worth the struggle, and I’ve always been willing to take it.
          {/* closing quote mark, raised, small gap after the period */}
          <span aria-hidden style={{ ...mark, marginLeft: u(0.08), verticalAlign: "top" }}>”</span>
        </p>

        {/* bottom line, from the left edge up to the tail */}
        <span aria-hidden style={{ position: "absolute", left: 0, bottom: 0, width: u(8.69), borderBottom: LINE }} />

        {/* right side + bottom line after the tail; rounded bottom-right corner; side starts mid second-to-last line */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: u(10.93),
            right: 0,
            bottom: 0,
            height: u(2.79),
            borderRight: LINE,
            borderBottom: LINE,
            borderBottomRightRadius: u(0.42),
          }}
        />

        {/* tail: vertical edge on the left going down, diagonal back up to the right (square 2.24u) */}
        <svg
          aria-hidden
          viewBox="0 0 65 65"
          fill="none"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            left: u(8.69),
            top: "calc(100% - 1px)",
            width: u(2.24),
            height: u(2.24),
            overflow: "visible",
          }}
        >
          <path d="M0.5 0V64.5L65 0" stroke="#222" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* AUTHOR INFO: starts at left edge (x = 0) matching the quote text left edge */}
      <div style={{ marginTop: u(2.3) }}>
        {/* NAME */}
        <h3
          style={{
            margin: 0,
            fontSize: u(1.24),
            lineHeight: 1.2,
            fontWeight: 400,
            color: "#222",
            letterSpacing: "0.01em",
          }}
        >
          {name}
        </h3>

        {/* DESIGNATION */}
        <p
          style={{
            margin: 0,
            marginTop: u(0.38),
            fontSize: u(0.76),
            lineHeight: 1.3,
            fontWeight: 400,
            color: "#444",
            letterSpacing: "0.02em",
          }}
        >
          {role}
        </p>

        {/* BUTTON */}
        <Link
          href={href}
          className="inline-flex items-center justify-center transition-colors duration-300 hover:bg-[#111] hover:text-white"
          style={{
            marginTop: u(1.3),
            width: u(6.59),
            height: u(2.55),
            border: "1px solid #333",
            borderRadius: u(0.28),
            fontSize: u(0.72),
            color: "#333",
            background: "transparent",
            textDecoration: "none",
          }}
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
