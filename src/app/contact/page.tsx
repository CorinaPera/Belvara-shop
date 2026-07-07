import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";

const contactDetails = [
  { icon: "ti-mail", label: "Email", value: "contact@belvara.ro" },
  { icon: "ti-phone", label: "Telefon", value: "+40 700 000 000" },
  { icon: "ti-clock", label: "Program", value: "Luni – Vineri, 09:00 – 17:00" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Scrie-ne sau sună-ne — îți răspundem în cel mai scurt timp posibil."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            {contactDetails.map((d) => (
              <div key={d.label} className="flex items-start gap-3 rounded-xl border border-line bg-white p-5">
                <i className={`ti ${d.icon} mt-0.5 text-xl text-wood`} />
                <div>
                  <p className="font-sans text-sm font-medium text-forest">{d.label}</p>
                  <p className="font-sans text-sm text-ink-soft">{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="font-sans text-sm font-medium text-forest">
                  Nume
                </label>
                <input
                  id="name"
                  type="text"
                  className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-sans text-sm font-medium text-forest">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-sans text-sm font-medium text-forest">
                Mesaj
              </label>
              <textarea
                id="message"
                rows={5}
                className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
              />
            </div>
            <Button type="button" variant="gold" className="self-start">
              Trimite mesajul
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
