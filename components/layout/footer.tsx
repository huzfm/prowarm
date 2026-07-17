import Link from "next/link";
import { Flame, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { siteConfig } from "@/lib/site";

const exploreLinks = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/products?category=electric", label: "Electric heating mats" },
  { href: "/products?category=hydronic", label: "Water-based systems" },
  { href: "/products?category=thermostats", label: "Smart thermostats" },
  { href: "/products?category=insulation", label: "Insulation boards" },
];

const socials = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-950 text-white">
      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.name}  home`}>
            <span className="grid size-9 place-items-center rounded-full bg-copper-500">
              <Flame className="size-4.5" aria-hidden />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              ProWarm<span className="text-copper-400"> India</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            Invisible warmth for Indian homes  electric and water-based underfloor
            heating, designed, installed and supported end to end.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-copper-400" aria-hidden />
              {siteConfig.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-copper-400" aria-hidden />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-copper-400" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Explore" className="lg:col-span-2">
          <h2 className="text-eyebrow text-white/40">Explore</h2>
          <ul className="mt-5 space-y-3">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Products" className="lg:col-span-3">
          <h2 className="text-eyebrow text-white/40">Products</h2>
          <ul className="mt-5 space-y-3">
            {productLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-eyebrow text-white/40">Stay warm, stay posted</h2>
          <p className="mt-5 text-sm text-white/60">
            One email a month  seasonal offers, running-cost tips and project stories.
          </p>
          <div className="mt-4">
            <NewsletterForm id="footer-newsletter" />
          </div>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-copper-400 hover:text-copper-400"
                >
                  <Icon className="size-4.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>10-year warranty on every heating system we install.</p>
        </div>
      </div>
    </footer>
  );
}
