import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDarkMode } from "../hooks/useDarkMode";
import { Button } from "./ui/button";
import {
  Moon,
  Sun,
  Menu,
  X,
  Download,
  ChevronDown,
  Globe,
  Sparkles,
  Search,
  Bell,
} from "lucide-react";

// Advanced particle system for background effects
const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const createParticles = () => {
      const particleCount = 50;
      return Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    setParticles(createParticles());
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
};

// Enhanced magnetic button with spring physics
const MagneticButton = ({ children, strength = 0.2, className }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const springConfig = { stiffness: 150, damping: 15 };
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion) return;
    
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    
    setPosition({ x, y });
  }, [strength, prefersReducedMotion]);

  return (
    <motion.div
      ref={buttonRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        x: isHovered ? position.x : 0,
        y: isHovered ? position.y : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={springConfig}
    >
      {children}
    </motion.div>
  );
};

// Glassmorphic search component
const SearchBar = () => {
  // const [isFocused, setIsFocused] = useState(false);
  
  // return (
  //   <motion.div
  //     className="relative hidden lg:flex items-center"
  //     animate={{
  //       width: isFocused ? 300 : 200,
  //     }}
  //     transition={{ duration: 0.2 }}
  //   >
  //     <motion.div
  //       // className="absolute inset-0 rounded-xl"
  //       // style={{
  //       //   background: "rgba(255, 255, 255, 0.05)",
  //       //   backdropFilter: "blur(10px)",
  //       // }}
  //       // animate={{
  //       //   scale: isFocused ? 1.02 : 1,
  //       // }}
  //     />
  //     <Search className="absolute left-3 w-4 h-4 text-white/50" />
  //     <input
  //       type="text"
  //       placeholder="Search..."
  //       className="w-full bg-transparent pl-10 pr-4 py-2 text-sm text-white/90 placeholder-white/50 border-none focus:outline-none focus:ring-0"
  //       onFocus={() => setIsFocused(true)}
  //       onBlur={() => setIsFocused(false)}
  //     />
  //   </motion.div>
  // );
};


// Enhanced NotificationBell with dropdown
const NotificationBell = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Project Update",
      message: "New projects will be updated soon",
      time: "just a minute ago",
      unread: true,
    },
    {
      id: 2,
      title: "New Features",
      message: "Feel free to contact for addition of new features",
      time: "1 hour ago",
      unread: true,
    },
    // {
    //   id: 3,
    //   title: "Project Milestone",
    //   message: "Reached 1000+ views on your latest project",
    //   time: "2 hours ago",
    //   unread: false,
    // },
  ]);

  return (
    <div className="relative">
      <motion.div
        className="cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5 text-white/80" />
        <AnimatePresence>
          {hasNotification && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="text-sm font-medium text-white">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  className="p-4 border-b border-white/10 hover:bg-white/5 cursor-pointer relative"
                  whileHover={{ x: 4 }}
                >
                  {notification.unread && (
                    <motion.div
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-purple-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                  <h4 className="text-sm font-medium text-white">
                    {notification.title}
                  </h4>
                  <p className="text-xs text-white/70 mt-1">
                    {notification.message}
                  </p>
                  <span className="text-xs text-white/50 mt-2 block">
                    {notification.time}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10">
              <button
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                onClick={() => {
                  setNotifications(prevNotifications =>
                    prevNotifications.map(n => ({ ...n, unread: false }))
                  );
                  setHasNotification(false);
                }}
              >
                Mark all as read
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const { hash } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDark, setIsDark] = useDarkMode();
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // Enhanced scroll handling with performance optimization
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (Math.abs(latest - (isScrolled ? 50 : 0)) > 50) {
      setIsScrolled(latest > 50);
    }
  });

  // Advanced parallax effects
  const headerY = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0%", prefersReducedMotion ? "0%" : "5%"]
  );
  const backdropBlur = useTransform(scrollYProgress, [0, 0.1], [0, 12]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1], [0.1, 0.8]);

  // Navigation items with enhanced structure
  const navigation = [
    { id: "home", title: "Home", url: "#Hero", icon: Globe },
    { id: "about", title: "About", url: "#About", icon: Sparkles },
    {
      id: "projects",
      title: "Projects",
      url: "#projects",
      icon: Sparkles,
      submenu: [
        {
          id: "ai-ml",
          title: "AI/ML Projects",
          url: "#ai-ml",
          description: "Cutting-edge artificial intelligence projects",
        },
        {
          id: "python",
          title: "Python Projects",
          url: "#python",
          description: "Advanced Python applications",
        },
        {
          id: "powerbi",
          title: "PowerBI Projects",
          url: "#powerbi",
          description: "Data visualization dashboards",
        },
      ],
    },
    { id: "contact", title: "Contact", url: "#contact" },
  ];

  // Enhanced logo with 3D perspective effect
  const AnimatedLogo = () => (
    <MagneticButton className="relative" strength={0.3}>
      <motion.a
        href="#home"
        className="text-2xl font-bold relative z-10 flex items-center perspective-[1000px]"
        whileHover={{
          rotateX: prefersReducedMotion ? 0 : 10,
          rotateY: prefersReducedMotion ? 0 : 10,
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-lg"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
              "linear-gradient(225deg, rgba(236,72,153,0.2), rgba(168,85,247,0.2))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
        <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Kushagra
        </span>
      </motion.a>
    </MagneticButton>
  );

  // Navigation item with enhanced interactions
  const NavItem = ({ item }) => {
    const [ref, isHovered] = useHover();

    return (
      <div className="relative group" ref={ref}>
        <MagneticButton>
          <motion.a
            href={item.url}
            className="text-white/90 hover:text-white px-3 py-2 text-sm font-medium relative flex items-center gap-2"
            onHoverStart={() => setHoveredItem(item.id)}
            onHoverEnd={() => setHoveredItem(null)}
            whileHover={{ y: -2 }}
          >
            {item.icon && (
              <motion.div
                animate={{
                  rotate: isHovered ? 360 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-4 h-4" />
              </motion.div>
            )}
            <span>{item.title}</span>
            {item.submenu && (
              <motion.div
                animate={{ rotate: isHovered ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            )}
            <motion.div
              className="absolute inset-0 rounded-lg bg-white/5"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            {item.url === hash && (
              <motion.div
                layoutId="activeNav"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600"
              />
            )}
          </motion.a>
        </MagneticButton>

        {item.submenu && (
          <AnimatePresence>
            {hoveredItem === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-64 rounded-lg bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at top right, rgba(168,85,247,0.1), transparent)",
                }}
              >
                {item.submenu.map((subItem) => (
                  <motion.a
                    key={subItem.id}
                    href={subItem.url}
                    className="block px-4 py-3 text-white/80 hover:text-white relative group"
                    whileHover={{
                      x: 4,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="text-sm font-medium">{subItem.title}</div>
                    <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                      {subItem.description}
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.header
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ y: headerY }}
    >
      <ParticleSystem />

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #9333EA, #EC4899, #9333EA)",
          backgroundSize: "200% 100%",
        }}
      />

      <motion.div
        className="relative"
        style={{
          backdropFilter: `blur(${backdropBlur}px)`,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-black/40"
          style={{ opacity: backgroundOpacity }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"
          animate={{
            background: [
              "linear-gradient(to right, rgba(147,51,234,0.1), rgba(236,72,153,0.1))",
              "linear-gradient(to right, rgba(236,72,153,0.1), rgba(147,51,234,0.1))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <AnimatedLogo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}

              <div className="flex items-center space-x-6">
                <SearchBar />

                {/* Enhanced notification system */}
                <NotificationBell />

                {/* Enhanced theme toggle with animation */}
                {/* <MagneticButton>
                  <motion.button
                    onClick={() => setIsDark(!isDark)}
                    className="relative p-2 rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isDark ? "dark" : "light"}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isDark ? (
                          <Moon className="w-5 h-5" />
                        ) : (
                          <Sun className="w-5 h-5" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </MagneticButton> */}

                {/* Enhanced Resume button */}
                <MagneticButton>
                  <Button
                    asChild
                    className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <motion.a
                      href="/Resume.pdf"
                      download="Kushagra-Resume.pdf"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 relative z-10"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                        animate={{
                          x: ["0%", "100%"],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <Download className="w-7 h-7" />
                      <span>Download Resume</span>
                    </motion.a>
                  </Button>
                </MagneticButton>
              </div>
            </nav>

            {/* Enhanced mobile menu button */}
            <motion.button
              className="lg:hidden relative p-2 rounded-full hover:bg-white/10 z-50"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                >
                  {isOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 rounded-full bg-white/5"
                initial={false}
                animate={{
                  scale: isOpen ? 1.2 : 1,
                  opacity: isOpen ? 0.2 : 0,
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced mobile navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden relative"
          >
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="relative px-4 pt-2 pb-6 space-y-2">
              {/* Mobile search */}
              <div className="py-4">
                <SearchBar />
              </div>

              {navigation.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: item.id === "home" ? 0 : 0.1 * parseInt(item.id),
                  }}
                >
                  <motion.a
                    href={item.url}
                    className="block py-3 text-white/90 hover:text-white text-lg font-medium"
                    whileHover={{
                      x: 4,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && (
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className="w-5 h-5" />
                        </motion.div>
                      )}
                      {item.title}
                    </span>
                  </motion.a>
                  {item.submenu && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-4 border-l border-white/10"
                    >
                      {item.submenu.map((subItem) => (
                        <motion.a
                          key={subItem.id}
                          href={subItem.url}
                          className="block py-2 pl-4 text-white/70 hover:text-white"
                          whileHover={{
                            x: 4,
                            backgroundColor: "rgba(255,255,255,0.05)",
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="text-sm font-medium">
                            {subItem.title}
                          </div>
                          <div className="text-xs text-white/50">
                            {subItem.description}
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Mobile Resume button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 relative overflow-hidden"
                >
                  <motion.a
                    href="/Resume.pdf"
                    download="Kushagra-Resume.pdf"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center space-x-2 relative z-10"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </motion.a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Custom hook for hover state
const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return [ref, isHovered];
};

export default Header;