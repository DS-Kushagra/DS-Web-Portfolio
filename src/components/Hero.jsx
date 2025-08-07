import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ScrollParallax } from "react-just-parallax";
import { curve, heroBackground, robot } from "../assets";
import { heroIcons } from "../constants";
import Generating from "./Generating";
import Notification from "./Notification";
import { useInView } from "react-intersection-observer";
// import PremiumCursor from '../components/PremiumCursor';
import { section } from "framer-motion/client";
// Enhanced Typing Animation Component - Optimized
const TypeWriter = ({ words, className = "" }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(words[0]);
      return;
    }

    const type = () => {
      const currentWord = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      }
    };

    const timeout = setTimeout(type, isDeleting ? 80 : 120);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, shouldReduceMotion]);

  return (
    <span className={className}>
      {currentText}
      {!shouldReduceMotion && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="border-r-2 border-purple-400 ml-1"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Optimized Particle System Component
const ParticleField = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 15 / particle.speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15,
          }}
        />
      ))}
    </div>
  );
};

// Mouse Follower Component
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-purple-500/20 rounded-full pointer-events-none z-50 mix-blend-screen"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 400,
      }}
    />
  );
};

// Premium Button Component

const PremiumButton = ({ children, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-50 blur-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600"
        animate={{
          opacity: isHovered ? 0.8 : 0.5,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkles */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}

      {/* Border gradient */}
      <motion.div
        className="absolute inset-0 rounded-full p-[1px]"
        style={{
          background:
            "linear-gradient(to right, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))",
        }}
        animate={{
          opacity: isHovered ? 1 : 0.5,
        }}
      >
        <div className="h-full w-full rounded-full bg-[#030014]/80 backdrop-blur-xl" />
      </motion.div>

      {/* Button content */}
      <div className="relative px-8 py-4">
        <motion.div
          className="relative z-10 font-semibold text-white"
          animate={{
            textShadow: isHovered
              ? "0 0 8px rgba(255,255,255,0.5)"
              : "0 0 0px rgba(255,255,255,0)",
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.button>
  );
};

const Hero = () => {
  const parallaxRef = useRef(null);
  const [scrolled, setScrolled] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const typeWriterWords = [
    "Innovation",
    "Excellence",
    "Intelligence",
    "Precision",
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#030014]"
      ref={ref}
    >
      {/* Particle Field */}
      <ParticleField />

      {/* Enhanced Grid Background with Dynamic Animation */}
      <div className="absolute inset-0">
        <motion.svg
          width="100%"
          height="100%"
          className="opacity-20"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="url(#gridGradient)"
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient
              id="gridGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.svg>
      </div>

      {/* Optimized Floating Orbs */}
      <AnimatePresence>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full opacity-15 mix-blend-screen"
            style={{
              background: `radial-gradient(circle, ${
                ["#8b5cf6", "#ec4899", "#06b6d4"][i]
              }, transparent)`,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container relative z-10" ref={parallaxRef} id="Hero">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="relative pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 text-center px-4 sm:px-6 md:px-8"
          style={{
            perspective: "1000px",
          }}
        >
          {/* Enhanced Title Section with Stable Animation */}
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-6 sm:mb-8 tracking-tight px-4 sm:px-0">
              <motion.div
                className="overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  Transform Data
                </span>
              </motion.div>

              <motion.div
                className="overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block text-white"
                  animate={{
                    color: ["#ffffff", "#e879f9", "#ffffff"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  into Magic
                </motion.span>
              </motion.div>

              <motion.div
                className="overflow-hidden"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: inView ? 0 : 100, opacity: inView ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <span className="relative inline-block">
                  with{" "}
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Innovation
                  </span>
                </span>
              </motion.div>
            </h1>
          </div>

          {/* Enhanced Description with Morphing Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 sm:px-0"
          >
            <div className="backdrop-blur-xl bg-white/5 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed relative z-10">
                Unleashing the power of{" "}
                <motion.span
                  animate={{
                    color: ["#e879f9", "#ffffff", "#e879f9"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="font-semibold"
                >
                  advanced analytics
                </motion.span>{" "}
                and{" "}
                <motion.span
                  animate={{
                    color: ["#ffffff", "#e879f9", "#ffffff"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="font-semibold"
                >
                  machine learning
                </motion.span>{" "}
                to transform your data into actionable insights that drive
                business growth and innovation.
              </p>
            </div>
          </motion.div>

          {/* Single Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex justify-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-0"
          >
            <PremiumButton
              onClick={() =>
                (window.location.href =
                  "https://topmate.io/kushagra_agrawal15/")
              }
              className="relative z-10"
            >
              Book a Session
            </PremiumButton>
          </motion.div>

          {/* Optimized Main Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: inView ? 1 : 0,
              scale: inView ? 1 : 0.95,
            }}
            transition={{ delay: 1.6, duration: 1 }}
            className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
          >
            {/* Simplified Background Elements */}
            <motion.div
              className="absolute -inset-10 sm:-inset-15 md:-inset-20 opacity-20"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  style={{
                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 4)}%`,
                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 4)}%`,
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>

            {/* Premium Border with Dynamic Gradient */}
            <motion.div
              className="relative z-1 p-1 rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(45deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="relative bg-gray-900 rounded-xl overflow-hidden backdrop-blur-xl bg-black/50">
                {/* Enhanced Window Controls with Realistic Animation */}
                <div className="h-8 sm:h-10 bg-black/50 backdrop-blur-xl flex items-center px-2 sm:px-4 relative">
                  <div className="flex gap-1 sm:gap-2 z-10">
                    {[
                      { color: "#ff5f57", name: "close" },
                      { color: "#ffbd2e", name: "minimize" },
                      { color: "#28c941", name: "maximize" },
                    ].map((control, i) => (
                      <motion.div
                        key={i}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer"
                        style={{ backgroundColor: control.color }}
                        whileHover={{
                          scale: 1.3,
                          boxShadow: `0 0 10px ${control.color}50`,
                        }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  {/* Realistic Browser URL Bar */}
                  <div className="ml-3 sm:ml-6 flex-1 mx-2 sm:mx-4">
                    <div className="h-5 sm:h-6 bg-black/30 rounded-md w-full flex items-center px-2 sm:px-3 border border-white/10">
                      <motion.div
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 mr-1 sm:mr-2"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <div className="text-xs sm:text-xs text-white/60">
                        data-science-portfolio.dev
                      </div>
                    </div>
                  </div>

                  {/* Window Action Buttons */}
                  <div className="flex gap-1">
                    {["⟨", "⟩", "↻"].map((symbol, i) => (
                      <motion.button
                        key={i}
                        className="w-6 h-6 rounded bg-white/10 text-white/60 text-xs flex items-center justify-center"
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {symbol}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Optimized Content Area with Smooth Image Effects */}
                <div className="relative aspect-video group">
                  <motion.img
                    src={robot}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: [1, 1.01, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Interactive Overlay with Hover Effects */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="absolute bottom-4 left-4 right-4">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="text-white"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          AI-Powered Analytics Dashboard
                        </h3>
                        <p className="text-sm text-white/80">
                          Real-time data visualization and insights
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Simplified Data Visualization Overlays */}
                  <motion.div
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 backdrop-blur-xl rounded-lg p-2 sm:p-3 bg-white/10 border border-white/20"
                    animate={{
                      y: [-3, 3, -3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <motion.div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      <span className="text-white text-xs sm:text-sm font-medium">
                        Live Processing
                      </span>
                    </div>
                    <div className="mt-1 sm:mt-2 flex gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-purple-400 rounded-full"
                          animate={{
                            height: [6, 12, 6],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Simplified Performance Metrics */}
                  <motion.div
                    className="absolute hidden md:block top-2 right-2 sm:top-4 sm:right-4 backdrop-blur-xl rounded-lg p-2 sm:p-3 bg-white/10 border border-white/20"
                    animate={{
                      y: [3, -3, 3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                      Performance
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      {[
                        {
                          label: "Accuracy",
                          value: 98.5,
                          color: "bg-green-400",
                        },
                        { label: "Speed", value: 94.2, color: "bg-blue-400" },
                        {
                          label: "Efficiency",
                          value: 96.8,
                          color: "bg-purple-400",
                        },
                      ].map((metric, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1 sm:gap-2"
                        >
                          <span className="text-xs text-white/80 w-8 sm:w-12">
                            {metric.label}
                          </span>
                          <div className="w-10 sm:w-16 h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${metric.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              transition={{
                                duration: 2,
                                delay: i * 0.2,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                          <span className="text-xs text-white font-medium">
                            {metric.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Simplified Floating Elements with ScrollParallax */}
                  <ScrollParallax isAbsolutelyPositioned>
                    <motion.div
                      className="hidden sm:block absolute -left-16 sm:-left-24 top-8 sm:top-16 backdrop-blur-xl rounded-xl p-2 sm:p-4 bg-white/10 border border-white/20 shadow-2xl"
                      animate={{
                        y: [-5, 5, -5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="mb-1 sm:mb-2 text-white text-xs sm:text-sm font-medium">
                        Tech Stack
                      </div>
                      <ul className="flex gap-2 sm:gap-3">
                        {heroIcons.map((icon, index) => (
                          <li
                            key={index}
                            className="p-1 sm:p-2 hover:bg-white/20 rounded-lg transition-all duration-300 cursor-pointer"
                          >
                            <img
                              src={icon}
                              width={16}
                              height={16}
                              alt=""
                              className="opacity-90 sm:w-6 sm:h-6"
                            />
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </ScrollParallax>

                  <ScrollParallax isAbsolutelyPositioned>
                    <motion.div
                      className="absolute -right-24 bottom-16 backdrop-blur-xl rounded-xl p-4 bg-white/10 border border-white/20 shadow-2xl"
                      animate={{
                        y: [5, -5, 5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Notification
                        className="text-sm"
                        title="AI Processing Complete"
                      />
                      <div className="mt-2 flex gap-2">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-green-400"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </ScrollParallax>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Ambient Glow */}
            <motion.div
              className="absolute -inset-40 bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Premium Corner Decorations */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32"
          style={{
            top: i < 2 ? 0 : "auto",
            bottom: i >= 2 ? 0 : "auto",
            left: i % 2 === 0 ? 0 : "auto",
            right: i % 2 === 1 ? 0 : "auto",
            background: `conic-gradient(from ${
              i * 90
            }deg, transparent, rgba(168, 85, 247, 0.2))`,
            borderRadius:
              i < 2 ? "0 0 100% 0" : i === 2 ? "0 100% 0 0" : "100% 0 0 0",
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Premium Light Trails */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            style={{
              width: "100%",
              top: `${30 + i * 20}%`,
              left: "-100%",
            }}
            animate={{
              left: ["100%", "-100%"],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Floating Shapes */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full mix-blend-screen filter blur-xl"
          style={{
            background: [
              "radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent)",
              "radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent)",
              "radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent)",
            ][i],
            top: `${20 + i * 30}%`,
            left: `${20 + i * 30}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Bottom Line Animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #e879f9, transparent)",
        }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <style>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .bg-gradient-move {
          animation: gradientMove 3s ease infinite;
          background-size: 200% 200%;
        }

        :root {
          --glow-spread: 70px;
          --glow-color: rgba(168, 85, 247, 0.2);
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @media (prefers-reduced-motion: no-preference) {
          .glow-effect {
            position: relative;
          }

          .glow-effect::after {
            content: "";
            position: absolute;
            inset: -20px;
            background: radial-gradient(
              circle at var(--x, 50%) var(--y, 50%),
              var(--glow-color) 0%,
              transparent var(--glow-spread)
            );
            opacity: 0;
            transition: opacity 0.3s;
          }

          .glow-effect:hover::after {
            opacity: 1;
          }
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          border-radius: 2px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #a855f7, #f472b6);
        }

        /* Selection color */
        ::selection {
          background: rgba(168, 85, 247, 0.3);
          color: white;
        }

        /* Smooth focus for accessibility */
        *:focus {
          outline: 2px solid rgba(168, 85, 247, 0.6);
          outline-offset: 2px;
        }

        /* Glass morphism utility */
        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Gradient text animation */
        .gradient-text {
          background: linear-gradient(
            45deg,
            #8b5cf6,
            #ec4899,
            #06b6d4,
            #8b5cf6
          );
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientMove 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
