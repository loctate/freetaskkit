import Link from "next/link";

const navigation = [
  { name: "All Tools", href: "/tools" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="site-container flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950"
          aria-label="FreeTaskKit home"
        >
          <span
            className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-base font-bold text-white"
            aria-hidden="true"
          >
            ✓
          </span>

          <span>
            FreeTask<span className="text-blue-600">Kit</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link
          href="/tools"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Explore tools
        </Link>
      </div>
    </header>
  );
}
