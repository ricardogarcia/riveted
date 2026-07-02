const brands = ["LeaseLock", "WeatherFreight", "Prima Pave"];

export default function TrustedBy() {
  return (
    <section className="bg-white pt-16 pb-14 px-[40px]">
      <h2 className="font-display text-center text-3xl md:text-4xl font-medium text-neutral-900 mb-12">
        Trusted by the{" "}
        <em className="font-serif italic font-normal">leading brands</em>
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
        {brands.map((name) => (
          <span
            key={name}
            className="font-display text-3xl font-bold text-black whitespace-nowrap opacity-40"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
