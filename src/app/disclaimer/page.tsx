import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the FreeTaskKit Disclaimer regarding tool results, information, and third-party services.",
};

export default function DisclaimerPage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <Badge>Disclaimer</Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Disclaimer
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FreeTaskKit provides general-purpose tools intended to help with
            everyday digital tasks.
          </p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Tool results
              </h2>

              <p className="mt-3 leading-7">
                While we aim to make tools accurate and useful, results may be
                affected by browser behavior, file formats, input values,
                device limitations, or other technical factors. Always review
                important results before using them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                No professional advice
              </h2>

              <p className="mt-3 leading-7">
                FreeTaskKit does not provide legal, financial, medical, tax,
                accounting, or other professional advice. Calculator outputs
                and informational content are general tools only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                External services
              </h2>

              <p className="mt-3 leading-7">
                References or links to third-party websites and services do not
                imply control, endorsement, or responsibility for their
                content, policies, or availability.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Use at your own discretion
              </h2>

              <p className="mt-3 leading-7">
                You are responsible for deciding whether a FreeTaskKit tool or
                result is suitable for your intended purpose.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
