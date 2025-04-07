"use client";

import { siteConfig } from "@/config/site";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <MobileLink
          onOpenChange={setOpen}
          href="/"
          className="flex items-center"
        >
          <Image src="/obsidian.png" alt="logo" width={80} height={30} />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <div className="flex flex-col gap-3 mt-3">
          <MobileLink onOpenChange={setOpen} href="/">
            Home
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="#services">
            Services
          </MobileLink>
          <MobileLink onOpenChange={setOpen} href="/contact">
            Contact
          </MobileLink>
          <hr className=" py-1" />
          <div className="flex flex-row gap-6">
            <a target="_blank" rel="noreferrer" href={siteConfig.links.twitter}>
              <span className="sr-only">Twitter</span>
              <FaXTwitter size={20} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.facebook}
            >
              <span className="sr-only">Facebook</span>
              <FaFacebookF size={20} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.instagram}
            >
              <span className="sr-only">Instagram</span>
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
