import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  FolderKanban,
  Mail,
  Globe,
  Sparkles,
} from "lucide-react";
import { cn } from "../utils/cn";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const scrollTimeoutRef = useRef(null);
  const manualLockUntilRef = useRef(0);

  // Navigation items with icons (memoized to keep refs stable)
  const navItems = useMemo(
    () => [
      { name: "Home", url: "#Hero", icon: Home },
      { name: "About", url: "#About", icon: User },
      { name: "Experience", url: "#WorkExperience", icon: Briefcase },
      { name: "Projects", url: "#projects", icon: FolderKanban },
      { name: "Contact", url: "#contact", icon: Mail },
    ],
    []
  );

  // Scroll-based detection using viewport center and manual lock to avoid flicker
  useEffect(() => {
    const getSections = () =>
      navItems
        .map((item) => {
          const el = document.querySelector(item.url);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = rect.bottom + window.scrollY;
          const mid = (top + bottom) / 2;
          return { name: item.name, top, bottom, mid };
        })
        .filter(Boolean);

    let sections = getSections();

    const handleResize = () => {
      sections = getSections();
    };

    const handleScroll = () => {
      // Skip while manual lock active (after user clicks)
      if (Date.now() < manualLockUntilRef.current) return;

      if (!sections.length) return;

      // Use viewport center-ish to determine active section
      const center = window.scrollY + window.innerHeight * 0.15;

      let best = sections[0];
      let bestDistance = Math.abs(center - sections[0].mid);

      for (let i = 1; i < sections.length; i++) {
        const distance = Math.abs(center - sections[i].mid);
        if (distance < bestDistance) {
          best = sections[i];
          bestDistance = distance;
        }
      }

      if (best && best.name !== activeTab) {
        setActiveTab(best.name);
      }
    };

    // Initial sync
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [navItems, activeTab]);

  const handleClick = (item) => {
    setActiveTab(item.name);

    // Manual lock to keep lamp on clicked tab during smooth scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    manualLockUntilRef.current = Date.now() + 2000;

    const element = document.querySelector(item.url);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      manualLockUntilRef.current = 0;
    }, 2000);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mt-6 pointer-events-none"
      )}
    >
      <div className="pointer-events-auto flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                handleClick(item);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors outline-none focus:outline-none",
                "text-white/80 hover:text-purple-400",
                isActive && "bg-white/10 text-purple-400"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-purple-500/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-purple-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-purple-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-purple-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-purple-500/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
