import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the FreeTaskKit Privacy Policy and learn how information is handled when using our free web tools.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <Badge>Privacy Policy</Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FreeTaskKit is designed to provide practical web tools while
            minimizing unnecessary collection of personal information.
          </p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Information you provide
              </h2>

              <p className="mt-3 leading-7">
                Some FreeTaskKit tools allow you to enter text, numbers,
                links, phone numbers, messages, or select files. For tools
                described as browser-based or locally processed, that data is
                processed in your browser and is not intentionally uploaded to
                FreeTaskKit servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Contact information
              </h2>

              <p className="mt-3 leading-7">
                If you contact FreeTaskKit by email, the information you send
                may be retained as needed to respond to your message, resolve a
                problem, or review feedback.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Analytics and advertising
              </h2>

              <p className="mt-3 leading-7">
                FreeTaskKit may use analytics or advertising services in the
                future. These services may use cookies, device information, or
                similar technologies according to their own privacy policies.
                This page will be updated when such services are introduced.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Third-party links
              </h2>

              <p className="mt-3 leading-7">
                FreeTaskKit may provide links to third-party websites or
                services. We are not responsible for the privacy practices,
                security, or content of those external services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Changes to this policy
              </h2>

              <p className="mt-3 leading-7">
                This Privacy Policy may be updated when FreeTaskKit adds new
                tools, services, analytics, advertising, or other features.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Contact
              </h2>

              <p className="mt-3 leading-7">
                Questions about this Privacy Policy can be sent to
                bonarsidehustle@gmail.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
