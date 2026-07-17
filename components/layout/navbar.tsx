"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Flame, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <a
        href="#main"
        className="absolute left-5 -top-14 z-50 rounded-full bg-copper-500 px-4 py-2 text-sm font-medium text-white transition-[top] focus-visible:top-4"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex items-center justify-between gap-4 rounded-full pr-2 pl-3 transition-[max-width,height,background-color,border-color,box-shadow] duration-500 ease-(--ease-out-quart) md:pr-2.5 md:pl-4",
          scrolled
            ? "h-15 max-w-4xl border border-white/12 bg-charcoal-950/80 shadow-glass backdrop-blur-xl md:h-16"
            : "h-16 max-w-6xl border border-white/8 bg-charcoal-950/25 shadow-[0_2px_20px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md md:h-18"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 pl-1 text-white"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="relative grid size-9 place-items-center rounded-full bg-copper-500 transition-transform duration-500 ease-(--ease-out-quart) group-hover:scale-105">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-copper-500 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-70"
            />
            <Flame className="relative size-4.5 text-white" aria-hidden />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            ProWarm
            <span className="text-copper-400"> India</span>
          </span>
        </Link>

        {/* Desktop nav with sliding indicator */}
        <ul
          className="hidden items-center lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href, pathname);
            const highlight = hovered ? hovered === link.href : active;
            return (
              <li key={link.href} onMouseEnter={() => setHovered(link.href)}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block px-4 py-2 text-sm font-medium transition-colors duration-300",
                    highlight ? "text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  {highlight && (
                    <motion.span
                      layoutId="nav-indicator"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Magnetic>
            <Button asChild size="sm" className="group/cta pr-4">
              <Link href="/contact">
                Get a free quote
                <ArrowRight
                  className="transition-transform duration-300 ease-(--ease-out-quart) group-hover/cta:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Button>
          </Magnetic>
        </div>

        {/* Mobile menu */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </Dialog.Trigger>
          <AnimatePresence>
            {open && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild forceMount>
                  <motion.div
                    className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild forceMount aria-describedby={undefined}>
                  <motion.div
                    className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-charcoal-950 px-8 pt-6 pb-10 text-white"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div
                      aria-hidden
                      className="absolute -top-24 right-0 size-64 rounded-full bg-copper-500/15 blur-3xl"
                    />
                    <div className="relative flex items-center justify-between">
                      <Dialog.Title className="text-eyebrow text-white/40">
                        Menu
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button
                          className="grid size-11 place-items-center rounded-full hover:bg-white/10"
                          aria-label="Close menu"
                        >
                          <X className="size-6" aria-hidden />
                        </button>
                      </Dialog.Close>
                    </div>

                    <ul className="relative mt-10 flex flex-col gap-1">
                      {navLinks.map((link, i) => {
                        const active = isActive(link.href, pathname);
                        return (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                          >
                            <Link
                              href={link.href}
                              onClick={closeMenu}
                              className={cn(
                                "flex items-center justify-between rounded-xl px-4 py-3 font-display text-2xl transition-colors",
                                active
                                  ? "text-copper-400"
                                  : "text-white/80 hover:bg-white/5 hover:text-white"
                              )}
                            >
                              {link.label}
                              {active && (
                                <span aria-hidden className="size-1.5 rounded-full bg-copper-400" />
                              )}
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>

                    <div className="relative mt-auto space-y-4">
                      <Button asChild size="lg" className="w-full">
                        <Link href="/contact" onClick={closeMenu}>
                          Get a free quote
                          <ArrowRight aria-hidden />
                        </Link>
                      </Button>
                      <p className="text-center text-sm text-white/50">
                        {siteConfig.phone} · {siteConfig.email}
                      </p>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>
      </nav>
    </header>
  );
}
