export default function Pillars() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {[
        {
          title: "Products",
          body: "Curated professional brands — designed to support consistent performance in real-world use.",
        },
        {
          title: "Education",
          body: "Training and technical knowledge to help your team apply products correctly.",
        },
        {
          title: "Partnership",
          body: "A strategic partner for salons and barbershops — no retail gimmicks, no public pricing.",
        },
      ].map((x) => (
        <div key={x.title} className="rounded-2xl border border-zinc-200 p-6">
          <h2 className="text-base font-semibold">{x.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-700">{x.body}</p>
        </div>
      ))}
    </section>
  );
}
