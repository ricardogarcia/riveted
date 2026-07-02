const qualifications = ["MIT", "Caltech", "ex-Google"];

export default function Qualifications() {
  return (
    <section className="bg-white pb-16 px-[40px]">
      <h2 className="font-display text-center text-2xl md:text-3xl font-medium text-neutral-900 mb-10">
        Backed by{" "}
        <em className="font-serif italic font-normal">serious credentials</em>
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-6">
        {qualifications.map((name) => (
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
