"use client";

import { Link2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { LinkedinIcon, XIcon } from "@/components/icons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on X",
      Icon: XIcon,
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Share on LinkedIn",
      Icon: LinkedinIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Share on WhatsApp",
      Icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-sm text-charcoal-400">Share</span>
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid size-10 place-items-center rounded-full border border-charcoal-900/15 text-charcoal-500 transition-colors hover:border-copper-500 hover:bg-copper-500 hover:text-white"
        >
          <Icon className="size-4" aria-hidden />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="grid size-10 cursor-pointer place-items-center rounded-full border border-charcoal-900/15 text-charcoal-500 transition-colors hover:border-copper-500 hover:bg-copper-500 hover:text-white"
      >
        <Link2 className="size-4" aria-hidden />
      </button>
    </div>
  );
}
