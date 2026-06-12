export default function SectionHeading({
  tag,
  title,
  centered = false,
}: {
  tag: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? "text-center" : ""}`}>
      <p
        className={`mb-3 flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] uppercase ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-1 w-1 rounded-full bg-red-500" />
        <span className="gradient-text">{tag}</span>
        <span className="h-px w-8 bg-gradient-to-r from-red-400/60 to-transparent" />
      </p>
      <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
    </div>
  );
}
