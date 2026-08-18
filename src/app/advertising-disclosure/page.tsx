import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Advertising Disclosure",
  description:
    "Learn how FreeTaskKit may use advertising, affiliate links, and other monetization methods.",
};

export default function AdvertisingDisclosurePage() {
  return (
    <section className="section-spacing">
      <div className="site-container">
        <div className="mx-auto max-w-3xl">
          <Badge>Advertising Disclosure</Badge>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Advertising Disclosure
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            FreeTaskKit may use advertising or other monetization methods to
            help support the ongoing development and operation of the website.
          </p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Advertising
              </h2>

              <p className="mt-3 leading-7">
                FreeTaskKit may display advertisements provided by third-party
                advertising networks. Those providers may use cookies or
                similar technologies according to their own policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Affiliate links
              </h2>

              <p className="mt-3 leading-7">
                Some future pages or recommendations may contain affiliate
                links. If you make a purchase or complete an action through an
                affiliate link, FreeTaskKit may receive a commission at no
                additional cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Independence of tools
              </h2>

              <p className="mt-3 leading-7">
                Advertising or affiliate relationships do not change the basic
                purpose of FreeTaskKit tools: to provide practical utility to
                users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950">
                Future updates
              </h2>

              <p className="mt-3 leading-7">
                This disclosure may be updated when specific advertising,
                affiliate, sponsorship, or other monetization programs are
                introduced.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
