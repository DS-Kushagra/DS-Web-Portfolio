import React, { useState, useEffect } from "react";

const PremiumPortfolioLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 - prev) * 0.02;
        if (next > 99.5) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsExiting(true);
            // Call onComplete after exit animation completes
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1000); // Wait for exit animation to complete
          }, 800);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const displayInterval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = Math.floor(progress);
        if (prev < target) {
          return prev + 1;
        }
        return target;
      });
    }, 20);

    return () => clearInterval(displayInterval);
  }, [progress]);

  useEffect(() => {
    if (displayProgress > 25 && currentPhase === 0) setCurrentPhase(1);
    if (displayProgress > 50 && currentPhase === 1) setCurrentPhase(2);
    if (displayProgress > 75 && currentPhase === 2) setCurrentPhase(3);
    if (displayProgress === 100 && currentPhase === 3) setCurrentPhase(4);
  }, [displayProgress, currentPhase]);

  const phases = [
    "INITIALIZING",
    "LOADING ASSETS",
    "RENDERING INTERFACE",
    "OPTIMIZING EXPERIENCE",
    "READY",
  ];
  const currentYear = new Date().getFullYear();

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-1000 ${
        isExiting ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      {/* Sophisticated background matching your website theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-n-8 via-n-7 to-n-6">
        {/* Animated gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-color-1/5 via-transparent to-color-5/5 animate-pulse" />

        {/* Subtle grain texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Premium progress line with website's accent colors */}
      <div className="absolute top-0 left-0 right-0 h-px bg-n-6/30 z-50">
        <div
          className="h-full bg-gradient-to-r from-transparent via-color-1 to-color-5 transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow:
              "0 0 30px rgba(172, 106, 255, 0.4), 0 0 60px rgba(172, 106, 255, 0.2)",
          }}
        />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-8">
          {/* Parallax container */}
          <div
            className="relative"
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${
                mousePosition.y * 0.1
              }px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {/* Grid markers for spatial reference with theme colors */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-0 w-full h-px bg-n-6/10" />
              <div className="absolute top-2/4 left-0 w-full h-px bg-n-6/10" />
              <div className="absolute top-3/4 left-0 w-full h-px bg-n-6/10" />
              <div className="absolute top-0 left-1/4 w-px h-full bg-n-6/10" />
              <div className="absolute top-0 left-2/4 w-px h-full bg-n-6/10" />
              <div className="absolute top-0 left-3/4 w-px h-full bg-n-6/10" />
            </div>

            {/* Main content area */}
            <div className="relative pt-32 pb-32">
              {/* Top row - Meta information with theme colors */}
              <div className="flex justify-between items-start mb-20">
                <div className="overflow-hidden">
                  <div
                    className={`transition-all duration-1000 ${
                      isReady
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <div className="text-[10px] tracking-[0.5em] text-n-3 font-thin uppercase">
                      Creative Developer
                    </div>
                  </div>
                </div>

                <div className="text-right overflow-hidden">
                  <div
                    className={`transition-all duration-1000 delay-100 ${
                      isReady
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0"
                    }`}
                  >
                    <div className="text-[10px] tracking-[0.3em] text-color-1/60 font-thin">
                      {String(displayProgress).padStart(3, "0")} / 100
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary typography with staggered reveal - Updated with theme colors */}
              <div className="relative mb-24">
                <h1
                  className="text-[11vw] leading-[0.82] font-thin tracking-tighter"
                  style={{
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
                    letterSpacing: "-0.055em",
                    fontWeight: 100,
                  }}
                >
                  <div className="overflow-hidden relative">
                    <div
                      className={`transition-all duration-1200 ease-out ${
                        isReady ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      <span className="text-n-1">PORTFOLIO</span>
                      <span className="absolute -right-4 top-0 text-xs tracking-wider text-color-1/60 font-normal">
                        ®
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <div
                      className={`transition-all duration-1200 delay-200 ease-out ${
                        isReady ? "translate-y-0" : "translate-y-full"
                      }`}
                    >
                      <span className="bg-gradient-to-r from-color-1 to-color-5 bg-clip-text text-transparent">
                        LOADING
                      </span>
                    </div>
                  </div>
                </h1>

                {/* Dynamic accent elements with theme colors */}
                <div className="absolute -left-12 top-1/2 flex items-center gap-2">
                  <div
                    className="w-8 h-px bg-gradient-to-r from-transparent to-color-1/40"
                    style={{
                      transform: `scaleX(${progress / 100})`,
                      transition: "transform 0.5s ease-out",
                    }}
                  />
                  <div className="text-[9px] text-n-3 tracking-widest">
                    {currentYear}
                  </div>
                </div>
              </div>

              {/* Central progress display with theme colors */}
              <div className="flex items-end justify-between mb-20">
                <div className="flex-1">
                  {/* Large progress number with decimal */}
                  <div className="flex items-baseline gap-1">
                    <div className="tabular-nums">
                      <span className="text-8xl font-thin text-n-1 leading-none tracking-tighter">
                        {String(displayProgress).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-thin text-color-1/70">
                        .{Math.floor((progress % 1) * 100)}
                      </span>
                      <span className="text-xs font-thin text-n-4 tracking-wider">
                        PERCENT
                      </span>
                    </div>
                  </div>

                  {/* Phase indicator with progress bar */}
                  <div className="mt-8">
                    <div className="text-[10px] tracking-[0.4em] text-n-3 uppercase mb-3">
                      {phases[currentPhase]}
                    </div>
                    <div className="w-full max-w-xs h-px bg-n-6/30 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-color-1 to-color-5 transition-all duration-500"
                        style={{ width: `${(currentPhase + 1) * 20}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Loading pulse indicator with theme colors */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-px h-4 transition-all duration-300 ${
                          i < currentPhase ? "bg-color-1/60" : "bg-n-6/30"
                        }`}
                        style={{
                          transform:
                            currentPhase > i ? "scaleY(1)" : "scaleY(0.5)",
                          transformOrigin: "bottom",
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-[9px] text-n-4 tracking-wider">
                    ACTIVE
                  </div>
                </div>
              </div>

              {/* Bottom section with sophisticated grid */}
              <div className="relative">
                <div className="grid grid-cols-4 gap-px bg-white/[0.03] p-px mb-12">
                  {["CONCEPT", "DESIGN", "DEVELOP", "DEPLOY"].map((text, i) => (
                    <div
                      key={text}
                      className="relative bg-black overflow-hidden group"
                    >
                      <div
                        className={`px-4 py-6 transition-all duration-700 delay-${
                          i * 100
                        }`}
                      >
                        <div
                          className={`text-[9px] tracking-[0.4em] transition-all duration-500 ${
                            currentPhase > i ? "text-white/50" : "text-white/10"
                          }`}
                        >
                          {text}
                        </div>
                        <div className="mt-2 text-[20px] font-thin text-white/20">
                          {currentPhase > i ? "✓" : "—"}
                        </div>
                      </div>
                      {/* Progress fill */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-px bg-white/20 transition-all duration-700"
                        style={{
                          transform:
                            currentPhase > i ? "scaleX(1)" : "scaleX(0)",
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Footer information */}
                <div className="flex justify-between items-end">
                  <div className="text-[9px] tracking-[0.3em] text-white/10 uppercase">
                    <span className="text-white/20">Location:</span> Worldwide
                  </div>
                  <div className="text-[9px] tracking-[0.5em] text-white/10 font-thin">
                    EST. MMXXV
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner details for framing with theme colors */}
      <div className="absolute top-6 left-6">
        <div className="w-16 h-px bg-n-6/20" />
        <div className="h-16 w-px bg-n-6/20" />
        <div className="text-[8px] text-n-4 tracking-[0.3em] mt-2 ml-1">
          LOADING
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <div className="w-16 h-px bg-n-6/20 ml-auto" />
        <div className="h-16 w-px bg-n-6/20 ml-auto" />
      </div>
      <div className="absolute bottom-6 left-6">
        <div className="w-16 h-px bg-n-6/20 mb-0" />
        <div className="h-16 w-px bg-n-6/20 -mt-16" />
      </div>
      <div className="absolute bottom-6 right-6">
        <div className="w-16 h-px bg-n-6/20 ml-auto" />
        <div className="h-16 w-px bg-n-6/20 ml-auto -mt-16" />
        <div className="text-[8px] text-color-1/50 tracking-[0.3em] mt-2 text-right mr-1">
          SYSTEM
        </div>
      </div>
    </div>
  );
};

export default PremiumPortfolioLoader;
