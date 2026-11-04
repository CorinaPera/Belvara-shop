import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";

const contactDetails = [
  { icon: "ti-mail", label: "Email", value: "office@belvara.ro" },
  { icon: "ti-phone", label: "Telefon", value: "0743 773 871" },
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

          <ContactForm />
        </div>
      </section>
    </>
  );
}
