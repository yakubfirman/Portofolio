export default function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(220,38,38,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Gradient orbs */}
      <div className="glow-pulse absolute -top-48 -left-48 h-[700px] w-[700px] rounded-full bg-red-100/40 blur-[200px]" />
      <div className="glow-pulse absolute top-[30%] -right-36 h-[550px] w-[550px] rounded-full bg-rose-100/30 blur-[180px]" style={{ animationDelay: "2s" }} />
      <div className="glow-pulse absolute bottom-[15%] -left-24 h-[500px] w-[500px] rounded-full bg-red-50/40 blur-[160px]" style={{ animationDelay: "4s" }} />
      <div className="absolute right-[10%] -bottom-32 h-[450px] w-[450px] rounded-full bg-rose-50/30 blur-[140px]" />
      {/* Center bloom */}
      <div className="absolute top-0 left-1/2 h-[250px] w-[800px] -translate-x-1/2 rounded-full bg-red-100/25 blur-[120px]" />
      {/* Edge vignette — white */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 50%, rgba(255,255,255,0.8) 100%)",
        }}
      />
    </div>
  );
}
