import Link from "next/link";

const footerLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "mailto:hello@rivetedinc.com", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#141413] rounded-t-3xl px-6 md:px-12 py-10">
      <div className="mx-auto max-w-[1360px] flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-display text-xl font-medium text-white">
          Riveted
        </span>
        <ul className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("mailto:") ? (
                <a
                  href={link.href}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-white/40">
          &copy; {new Date().getFullYear()} Riveted, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
