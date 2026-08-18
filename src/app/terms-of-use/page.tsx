import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the Terms of Use that apply when accessing and using FreeTaskKit tools and content.",
};

export default function TermsOfUsePage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <Badge>Terms of Use</Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Terms of Use
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            By using FreeTaskKit, you agree to use the website and its tools
            responsibly and in accordance with these terms.
          </p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Permitted use
              </h2>

              <p className="mt-3 leading-7">
                FreeTaskKit tools are provided for lawful personal, educational,
                and business-related tasks. You are responsible for ensuring
                that your use of the tools complies with applicable laws and
                third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                No guarantee of uninterrupted service
              </h2>

              <p className="mt-3 leading-7">
                We aim to keep FreeTaskKit available and useful, but we do not
                guarantee that every tool will always be available, error-free,
                or compatible with every browser, device, or file.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                User responsibility
              </h2>

              <p className="mt-3 leading-7">
                You are responsible for reviewing the results produced by a
                tool before relying on, sharing, publishing, or using them for
                important decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Prohibited use
              </h2>

              <p className="mt-3 leading-7">
                You may not use FreeTaskKit to abuse, disrupt, attack, reverse
                engineer, unlawfully access, or interfere with the website,
                its users, or third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Third-party services
              </h2>

              <p className="mt-3 leading-7">
                Some tools may create links or outputs intended for use with
                third-party services. FreeTaskKit is not responsible for the
                availability, policies, or behavior of those services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Changes to these terms
              </h2>

              <p className="mt-3 leading-7">
                These Terms of Use may be updated as FreeTaskKit evolves.
                Continued use of the website after an update means the revised
                terms apply to your use of the service.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
