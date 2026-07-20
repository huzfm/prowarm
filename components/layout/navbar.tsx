
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowRight, Flame, Menu, X } from "lucide-react";
// import { Magnetic } from "@/components/motion/magnetic";
// import { navLinks, siteConfig } from "@/lib/site";
// import { cn } from "@/lib/utils";

// const isActive = (href: string, pathname: string) =>
//   href === "/" ? pathname === "/" : pathname.startsWith(href);

// /** Button stays still; a soft diagonal shine sweeps across it once on hover. */
// function ShineWrap({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="group relative inline-block overflow-hidden rounded-full">
//       {children}
//       <span
//         aria-hidden
//         className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[calc(300%)] group-hover:opacity-100"
//       />
//     </div>
//   );
// }

// export function Navbar() {
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const closeMenu = () => setOpen(false);

//   return (
//     <header className="fixed inset-x-0 top-0 z-50">
//       <a
//         href="#main"
//         className="absolute left-6 -top-14 z-50 rounded-full bg-copper-500 px-4 py-2 text-sm font-medium text-white transition-[top] focus-visible:top-4"
//       >
//         Skip to content
//       </a>

//       <nav
//         aria-label="Main"
//         className={cn(
//           "flex items-center justify-between px-6 py-5 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-(--ease-out-quart) md:px-10 md:py-6",
//           scrolled
//             ? "border-b border-white/8 bg-charcoal-950/80 shadow-[0_2px_20px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
//             : "bg-linear-to-b from-black/45 via-black/10 to-transparent"
//         )}
//       >
//         {/* Logo */}
//         <Link
//           href="/"
//           className="group flex items-center gap-2.5 text-white"
//           aria-label={`${siteConfig.name}  home`}
//         >
//           <Flame
//             className="size-5 shrink-0 text-white transition-colors group-hover:text-copper-400"
//             strokeWidth={1.75}
//             aria-hidden
//           />
//           <span className="text-sm font-medium tracking-[0.28em] uppercase">
//             ProWarm
//           </span>
//         </Link>

//         {/* Desktop nav — small dot marks the active item */}
//         <ul className="hidden items-center gap-8 lg:flex">
//           {navLinks.map((link) => {
//             const active = isActive(link.href, pathname);
//             return (
//               <li key={link.href} className="flex flex-col items-center gap-1.5">
//                 <Link
//                   href={link.href}
//                   aria-current={active ? "page" : undefined}
//                   className={cn(
//                     "text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300",
//                     active ? "text-white" : "text-white/60 hover:text-white"
//                   )}
//                 >
//                   {link.label}
//                 </Link>
//                 <span
//                   aria-hidden
//                   className={cn(
//                     "size-1 rounded-full transition-colors duration-300",
//                     active ? "bg-copper-400" : "bg-transparent"
//                   )}
//                 />
//               </li>
//             );
//           })}
//         </ul>

//         {/* Right cluster */}
//         <div className="flex items-center gap-3">
//           <ShineWrap>
//             <Magnetic>
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center gap-2 rounded-full bg-[#BA6A35] px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-white uppercase shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] transition-colors duration-300 ease-out hover:bg-[#9C5A2C]"
//               >
//                 Book Free Survey
//                 <ArrowRight className="size-3.5" aria-hidden />
//               </Link>
//             </Magnetic>
//           </ShineWrap>

//           {/* Menu trigger — mobile only, desktop nav links cover this role */}
//           <Dialog.Root open={open} onOpenChange={setOpen}>
//             <Dialog.Trigger asChild>
//               <button
//                 className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:bg-white/5 lg:hidden"
//                 aria-label="Open menu"
//               >
//                 <Menu className="size-4" strokeWidth={1.75} aria-hidden />
//               </button>
//             </Dialog.Trigger>
//             <AnimatePresence>
//               {open && (
//                 <Dialog.Portal forceMount>
//                   <Dialog.Overlay asChild forceMount>
//                     <motion.div
//                       className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                     />
//                   </Dialog.Overlay>
//                   <Dialog.Content asChild forceMount aria-describedby={undefined}>
//                     <motion.div
//                       className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-charcoal-950 px-8 pt-6 pb-10 text-white"
//                       initial={{ x: "100%" }}
//                       animate={{ x: 0 }}
//                       exit={{ x: "100%" }}
//                       transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                     >
//                       <div
//                         aria-hidden
//                         className="absolute -top-24 right-0 size-64 rounded-full bg-copper-500/15 blur-3xl"
//                       />
//                       <div className="relative flex items-center justify-between">
//                         <Dialog.Title className="text-xs font-medium tracking-[0.25em] text-white/40 uppercase">
//                           Menu
//                         </Dialog.Title>
//                         <Dialog.Close asChild>
//                           <button
//                             className="grid size-11 place-items-center rounded-full hover:bg-white/10"
//                             aria-label="Close menu"
//                           >
//                             <X className="size-6" aria-hidden />
//                           </button>
//                         </Dialog.Close>
//                       </div>

//                       <ul className="relative mt-10 flex flex-col gap-1">
//                         {navLinks.map((link, i) => {
//                           const active = isActive(link.href, pathname);
//                           return (
//                             <motion.li
//                               key={link.href}
//                               initial={{ opacity: 0, x: 24 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
//                             >
//                               <Link
//                                 href={link.href}
//                                 onClick={closeMenu}
//                                 className={cn(
//                                   "flex items-center justify-between rounded-xl px-4 py-3 font-display text-2xl transition-colors",
//                                   active
//                                     ? "text-copper-400"
//                                     : "text-white/80 hover:bg-white/5 hover:text-white"
//                                 )}
//                               >
//                                 {link.label}
//                                 {active && (
//                                   <span aria-hidden className="size-1.5 rounded-full bg-copper-400" />
//                                 )}
//                               </Link>
//                             </motion.li>
//                           );
//                         })}
//                       </ul>

//                       <div className="relative mt-auto space-y-4">
//                         <Link
//                           href="/contact"
//                           onClick={closeMenu}
//                           className="flex w-full items-center justify-center gap-2 rounded-full bg-[#BA6A35] px-6 py-3.5 text-xs font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-300 ease-out hover:bg-[#9C5A2C]"
//                         >
//                           Book Free Survey
//                           <ArrowRight className="size-4" aria-hidden />
//                         </Link>
//                         <p className="text-center text-sm text-white/50">
//                           {siteConfig.phone} · {siteConfig.email}
//                         </p>
//                       </div>
//                     </motion.div>
//                   </Dialog.Content>
//                 </Dialog.Portal>
//               )}
//             </AnimatePresence>
//           </Dialog.Root>
//         </div>
//       </nav>
//     </header>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

/** Button stays still; a soft diagonal shine sweeps across it once on hover. */
function ShineWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative inline-block overflow-hidden rounded-full">
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[calc(300%)] group-hover:opacity-100"
      />
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="absolute left-6 -top-14 z-50 rounded-full bg-copper-500 px-4 py-2 text-sm font-medium text-white transition-[top] focus-visible:top-4"
      >
        Skip to content
      </a>

      <nav
        aria-label="Main"
        className={cn(
          "relative flex items-center justify-between px-6 py-5 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-(--ease-out-quart) md:px-10 md:py-6",
          scrolled
            ? "border-b border-white/8 bg-charcoal-950/80 shadow-[0_2px_20px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl"
            : "bg-linear-to-b from-black/45 via-black/10 to-transparent"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="relative z-10 flex items-center"
          aria-label={`${siteConfig.name}  home`}
        >
          <Image
            src="/logo.png"
            alt={siteConfig.name}
            width={140}
            height={36}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        {/* Desktop nav — true-centered in the bar, independent of logo/CTA width */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <li key={link.href} className="flex flex-col items-center gap-1.5">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300",
                    active ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
                <span
                  aria-hidden
                  className={cn(
                    "size-1 rounded-full transition-colors duration-300",
                    active ? "bg-copper-400" : "bg-transparent"
                  )}
                />
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="relative z-10 flex items-center gap-3">
          <ShineWrap>
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#BA6A35] px-5 py-2.5 text-xs font-semibold tracking-[0.15em] text-white uppercase shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset] transition-colors duration-300 ease-out hover:bg-[#9C5A2C]"
              >
                Book Free Survey
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </Magnetic>
          </ShineWrap>

          {/* Menu trigger — mobile only, desktop nav links cover this role */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:bg-white/5 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-4" strokeWidth={1.75} aria-hidden />
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
                        <Dialog.Title className="text-xs font-medium tracking-[0.25em] text-white/40 uppercase">
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
                        <Link
                          href="/contact"
                          onClick={closeMenu}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#BA6A35] px-6 py-3.5 text-xs font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-300 ease-out hover:bg-[#9C5A2C]"
                        >
                          Book Free Survey
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
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
        </div>
      </nav>
    </header>
  );
}
