const PageBackground = () => (
  <>
    {/* Crossed diagonal lines */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.07) 0px,
            rgba(255,255,255,0.07) 1px,
            transparent 1px,
            transparent 28px
          ),
          repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.04) 0px,
            rgba(255,255,255,0.04) 1px,
            transparent 1px,
            transparent 28px
          )
        `,
      }}
    />
    {/* Grid lines */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.06) 0px,
            rgba(255,255,255,0.06) 1px,
            transparent 1px,
            transparent 64px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 0px,
            rgba(255,255,255,0.04) 1px,
            transparent 1px,
            transparent 64px
          )
        `,
      }}
    />
    {/* Radial vignette */}
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgb(3 7 18) 100%)",
      }}
    />
    {/* Blue glow top center */}
    <div
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-225 h-150 z-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.22) 0%, transparent 65%)",
      }}
    />
    {/* Purple accent glow bottom right */}
    <div
      className="pointer-events-none absolute bottom-0 right-0 w-150 h-100 z-0"
      style={{
        background:
          "radial-gradient(ellipse at 100% 100%, rgba(147,51,234,0.12) 0%, transparent 60%)",
      }}
    />
  </>
);

export default PageBackground;
