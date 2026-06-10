import SectionHeading from "@/src/components/ui/SectionHeading";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  return (
    <main className="bg-cream">
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch with the PawVerse team"
          subtitle="Have questions about a listing, breeder, or adoption process? Send us a message and our support team will get back to you right away."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-[2rem] border border-sand-dark/70 bg-white p-8 shadow-xl shadow-ink/5">
            <div>
              <h3 className="text-2xl font-semibold text-ink">
                Need help finding the perfect pet?
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                Whether you’re browsing dogs, cats, or birds, our team is
                available to answer questions about breeders, health guarantees,
                and the adoption process.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="rounded-3xl border border-sand-dark/70 bg-cream p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                    <FiMail size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Email us</p>
                    <p className="text-sm text-ink-soft">
                      support@pawverse.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sand-dark/70 bg-cream p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                    <FiPhone size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Call us</p>
                    <p className="text-sm text-ink-soft">+1 (800) 555-0137</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-sand-dark/70 bg-cream p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                    <FiMapPin size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">Office</p>
                    <p className="text-sm text-ink-soft">
                      Toronto, Ontario, Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-sand-dark/70 bg-sand p-5">
                <p className="text-xs uppercase tracking-[2px] text-ink-soft">
                  Response time
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  Within 24 hours
                </p>
              </div>
              <div className="rounded-3xl border border-sand-dark/70 bg-sand p-5">
                <p className="text-xs uppercase tracking-[2px] text-ink-soft">
                  Support hours
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  Mon–Fri · 9am–6pm ET
                </p>
              </div>
            </div>
          </div>

          <form className="rounded-[2rem] border border-sand-dark/70 bg-white p-8 shadow-xl shadow-ink/5">
            <h3 className="text-2xl font-semibold text-ink">
              Send us a message
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Fill out the form below and our experts will contact you with the
              best next steps.
            </p>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="text-sm font-medium text-ink">Full name</span>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  className="mt-3 w-full rounded-3xl border border-sand-dark/70 bg-cream px-5 py-4 text-sm text-ink outline-none transition focus:border-clay"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="mt-3 w-full rounded-3xl border border-sand-dark/70 bg-cream px-5 py-4 text-sm text-ink outline-none transition focus:border-clay"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink">Subject</span>
                <input
                  type="text"
                  placeholder="Question about a listing"
                  className="mt-3 w-full rounded-3xl border border-sand-dark/70 bg-cream px-5 py-4 text-sm text-ink outline-none transition focus:border-clay"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-ink">Message</span>
                <textarea
                  placeholder="Tell us what you need help with..."
                  rows={6}
                  className="mt-3 w-full rounded-[1.5rem] border border-sand-dark/70 bg-cream px-5 py-4 text-sm text-ink outline-none transition focus:border-clay"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm font-semibold uppercase tracking-[1px] text-cream transition hover:bg-clay-dark"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
