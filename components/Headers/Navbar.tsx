"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "./Logo";
import { useAuth } from "@/context/authContext";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/venues", label: "Venues" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user, isLoggedIn, isLoading, logout } = useAuth();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <motion.nav className="w-full fixed top-0 left-0 right-0 shadow-xl bg-white z-50">
        <div className="flex items-center justify-between mx-auto max-w-5xl px-6 py-4">
          <div>
            <Logo />
          </div>
          <div>Loading...</div>
        </div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="w-full fixed top-0 left-0 right-0 shadow-xl bg-white z-50"
    >
      <div className="flex items-center justify-between mx-auto max-w-5xl px-6 py-4">
        <div>
          <Logo />
        </div>

        <div className="flex gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-black"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-[#247373] hover:bg-[#1A5F5F] text-white"
            >
              <Link href="/login">Login</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
