import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FreeTaskKit to report a problem, share feedback, or suggest a useful tool.",
};

export default function ContactPage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <Badge variant="green">Contact</Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Help us improve FreeTaskKit
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Send feedback, report a problem, or suggest a practical tool that
            could help with an everyday digital task.
          </p>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-xl font-bold text-slate-950">
              Contact by email
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The contact form will be introduced later. During the foundation
              phase, messages can be sent directly by email.
            </p>

            <div className="mt-6">
              <Button href="mailto:bonarsidehustle@gmail.com" size="lg">
                Send an email
              </Button>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Email: bonarsidehustle@gmail.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
