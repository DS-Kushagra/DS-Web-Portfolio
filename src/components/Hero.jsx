import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollParallax } from "react-just-parallax";
import { curve, heroBackground, robot } from "../assets";
import { heroIcons } from "../constants";
import Generating from "./Generating";
import Notification from "./Notification";
// import PremiumCursor from '../components/PremiumCursor';
import { section } from "framer-motion/client";
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
          background: "linear-gradient(to right, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))",
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
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030014]">
      {/* Premium Geometric Background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <pattern
            id="grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="container relative z-10" ref={parallaxRef} id="Hero">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative pt-32 pb-20 text-center"
        >
          {/* Title Section */}
          <div className="relative inline-block">
            <h1 className="text-7xl md:text-7xl lg:text-9xl font-bold mb-8 tracking-tight">
              <motion.div
                className="overflow-hidden"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.span
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Transform Data
                </motion.span>
              </motion.div>

              <motion.div
                className="overflow-hidden"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
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
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <motion.span className="relative inline-block">
                  with{" "}
                  <span className="relative">
                    Kushagra
                    <motion.div
                      className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: isHovered ? 1 : 0,
                        filter: isHovered
                          ? "hue-rotate(90deg) brightness(1.2)"
                          : "none",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.span>
              </motion.div>
            </h1>
          </div>

          {/* Premium Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-6 mb-12"
          >
            {["Analytics", "ML Models", "Insights"].map((item, index) => (
              <motion.div
                key={item}
                className="backdrop-blur-xl bg-white/5 p-4 rounded-xl border border-white/10 w-40"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {`0${index + 6}`}
                </div>
                <div className="text-white mt-2">{item}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
          >
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
            to transform your data into actionable insights.
          </motion.p>

          {/* Premium Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="relative flex justify-center"
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

          {/* Main Image Container with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="relative mt-20 max-w-7xl mx-auto"
          >
            {/* Premium Border Gradient */}
            <div className="relative z-1 p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
              <div className="relative bg-gray-900 rounded-xl overflow-hidden backdrop-blur-xl bg-black/50">
                {/* Enhanced Window Controls */}
                <div className="h-8 bg-black/50 backdrop-blur-xl flex items-center px-4">
                  <div className="flex gap-2">
                    {["#ff5f57", "#ffbd2e", "#28c941"].map((color, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                  {/* Added Premium URL Bar */}
                  <div className="ml-4 flex-1 mx-4">
                    <div className="h-5 bg-black/30 rounded-md w-full flex items-center px-3">
                      <div className="w-4 h-4 rounded-full bg-white/10 mr-2" />
                      <div className="h-2 w-24 bg-white/10 rounded" />
                    </div>
                  </div>
                </div>

                {/* Content Area with Enhanced Image Effects */}
                <div className="relative aspect-video">
                  <motion.img
                    src={robot}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: [1, 1.02, 1],
                      rotate: [0, 1, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Enhanced Floating Elements */}
                  <ScrollParallax isAbsolutelyPositioned>
                    <motion.div
                      className="absolute -left-20 top-20 backdrop-blur-xl rounded-xl p-4 bg-white/5 border border-white/10"
                      animate={{
                        y: [-10, 10, -10],
                        rotate: [-1, 1, -1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.ul
                        className="flex gap-4"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {heroIcons.map((icon, index) => (
                          <motion.li
                            key={index}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <img
                              src={icon}
                              width={24}
                              height={24}
                              alt=""
                              className="opacity-80"
                            />
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </ScrollParallax>

                  <ScrollParallax isAbsolutelyPositioned>
                    <motion.div
                      className="absolute -right-20 bottom-20 backdrop-blur-xl rounded-xl p-4 bg-white/5 border border-white/10"
                      animate={{
                        y: [10, -10, 10],
                        rotate: [1, -1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Notification className="text-sm" title="AI Processing" />
                    </motion.div>
                  </ScrollParallax>
                </div>
              </div>
            </div>

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

      <style jsx>{`
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
      `}</style>
    </section>
  );
};

export default Hero;