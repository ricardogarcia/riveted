import Link from "next/link";

const footerLinks = [
  { href: "/#approach", label: "Approach" },
  { href: "/#services", label: "Services" },
  { href: "/#smb", label: "Small Business" },
  { href: "/#consulting", label: "Consulting" },
  { href: "/#coaching", label: "Coaching" },
  { href: "/blog", label: "Blog" },
  { href: "mailto:hello@rivetedinc.com", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-light px-4 sm:px-8 lg:px-16 py-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-display text-base tracking-[0.15em] text-foreground-light">
          RIVETED, INC.
        </span>
        <ul className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <li key={link.label}>
              {link.href.startsWith("mailto:") ? (
                <a
                  href={link.href}
                  className="text-foreground-light text-sm hover:text-rivet transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-foreground-light text-sm hover:text-rivet transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#aaa]">
          &copy; {new Date().getFullYear()} Riveted, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
