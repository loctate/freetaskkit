import Link from "next/link";

const footerLinks = [
  { name: "All Tools", href: "/tools" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
  { name: "Disclaimer", href: "/disclaimer" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-xl font-bold text-white">
              FreeTask<span className="text-blue-400">Kit</span>
            </p>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Free, practical web tools for everyday digital tasks. No account
              required.
            </p>
          </div>

          <nav
            className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3"
            aria-label="Footer navigation"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} FreeTaskKit. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
