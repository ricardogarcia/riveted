const brands = [
  "Google",
  "YouTube Ads",
  "LeaseLock",
  "Bend",
  "WeatherFreight",
  "Prima Pave",
  "MIT",
  "Caltech",
];

export default function TrustedBy() {
  return (
    <section className="bg-white pt-16 pb-14 px-[40px]">
      <h2 className="font-display text-center text-3xl md:text-4xl font-medium text-neutral-900 mb-12">
        Trusted by the{" "}
        <em className="font-serif italic font-normal">leading brands</em>
      </h2>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee gap-16">
          {[...brands, ...brands].map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 shrink-0 opacity-40"
            >
              <span className="font-display text-3xl font-bold text-black whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
