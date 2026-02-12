"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { type SVGProps } from "react";
import { Library, MessageSquare, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import LumachorMark from "../lumachormark";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="size-9" />;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative size-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {resolvedTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="size-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="size-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: "/", label: "Chat", icon: MessageSquare },
    { href: "/library", label: "Library", icon: Library },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 py-0.5 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2">
              <div className="dark:hidden">
                <LumachorMark
                  variant="white"
                  className="sm:size-10 border-2 rounded-xl"
                />
              </div>
              <div className="hidden dark:flex">
                <LumachorMark
                  variant="black"
                  className="sm:size-10 border-2 rounded-xl"
                />
              </div>
              <span className="text-lg font-bold tracking-wide">LUMACHOR</span>
            </Link>
          </motion.div>

          {/* Desktop: Animated Pill Navigation */}
          <nav className="hidden md:flex items-center gap-2 p-1 rounded-full border border-white/10 bg-white/5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors flex items-center gap-2",
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-indigo-600"
                      style={{ borderRadius: 9999 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}
                  <motion.div
                    animate={isActive ? { scale: 1.1, y: -1 } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10"
                  >
                    <link.icon className="h-4 w-4" />
                  </motion.div>
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop: CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="relative inline-flex items-center justify-center rounded-xl text-sm font-medium text-white h-9 px-5 py-2 group overflow-hidden"
              >
                <motion.div
                  animate={{ backgroundPosition: ["0% 50%", "150% 50%"] }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-[-200%] z-0 bg-[linear-gradient(110deg,theme(colors.indigo.500),45%,theme(colors.fuchsia.500),55%,theme(colors.indigo.500))] bg-[length:200%_100%]"
                />
                <span className="relative z-10">Get Started</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile: Hamburger Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-foreground transition-colors hover:bg-white/10"
              animate={isMenuOpen ? "open" : "closed"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  variants={{
                    closed: { d: "M 2 6 H 22" },
                    open: { d: "M 4 18 L 20 2" },
                  }}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d="M 2 12 H 22"
                  variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                  transition={{ duration: 0.1 }}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  variants={{
                    closed: { d: "M 2 18 H 22" },
                    open: { d: "M 4 2 L 20 18" },
                  }}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b border-white/10"
          >
            <motion.div
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
              className="p-4 space-y-2"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg text-lg font-semibold hover:bg-white/5 transition-colors"
                  >
                    <link.icon className="h-5 w-5 text-indigo-400" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 },
                }}
                className="flex items-center gap-3 p-3"
              >
                <ThemeToggle />
                <span className="text-lg font-semibold">Theme</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
