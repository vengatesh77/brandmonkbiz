import Image from "next/image";

type Props = { text?: string; logo?: string; bg?: string };

const CREAM = "#f2e8d8", TAN = "#a9795a";

export default function IntroLockup({
  text = "BRAND MONK",
  logo = "/logo.png",
  bg = "#0f0f0f",
}: Props) {
  return (
    <>
      {/* Mobile size override — phones below 640 px use a smaller --h */}
      <style>{`
        @media (max-width: 639px) {
          [data-intro="logo-wrap"] {
            --h: clamp(40px, 11vw, 56px) !important;
          }
        }
      `}</style>

      <div
        data-intro="logo-wrap"
        style={{
          ["--h" as string]: "clamp(52px, 5vw, 100px)",
          display: "inline-flex",
          alignItems: "stretch",
          boxSizing: "border-box",
          height: "var(--h)",
          border: `calc(var(--h) * 0.02) solid ${CREAM}`,
          borderRadius: "calc(var(--h) * 0.14)",
          overflow: "hidden",
          background: bg,
          /* Hidden before GSAP runs — autoAlpha:1 reveals it */
          visibility: "hidden",
        }}
      >
        {/* LEFT: cream block — logo absolutely centred with even inset */}
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "calc(var(--h) * 1.1)",
            flexShrink: 0,
            background: CREAM,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "9%",
              right: "9%",
              bottom: "9%",
              left: "9%",
            }}
          >
            <Image
              data-intro="logo"
              src="/logo-trim.png"
              alt="Brand Monk"
              fill
              priority
              sizes="120px"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                transformOrigin: "50% 50%",
              }}
            />
          </div>
        </div>

        {/* TAN vertical divider strip */}
        <span
          data-intro="divider"
          aria-hidden
          style={{
            width: "calc(var(--h) * 0.065)",
            flexShrink: 0,
            background: TAN,
          }}
        />

        {/* RIGHT: near-black panel with letter-split name in cream */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 calc(var(--h) * 0.12) 0 calc(var(--h) * 0.24)",
            color: CREAM,
          }}
        >
          <span
            data-intro="name"
            aria-label={text}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              fontSize: "calc(var(--h) * 0.4)",
              fontWeight: 500,
              letterSpacing: "0.2em",
              lineHeight: 1.2,
              textTransform: "uppercase",
            }}
          >
            {text.split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  paddingBottom: "0.1em",
                  marginBottom: "-0.1em",
                }}
              >
                <span data-intro="char" style={{ display: "inline-block" }}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
