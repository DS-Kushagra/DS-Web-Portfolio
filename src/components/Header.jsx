import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { motion } from "framer-motion";
import { brainwaveSymbol } from "../assets";
import { navigation } from "../constants";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState, useEffect } from "react";

const Header = () => {
  const { hash } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${
        isMobile ? "relative" : "fixed"
      } top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "bg-n-8/90 backdrop-blur-sm" : "bg-n-8 border-b border-n-6"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        {/* Logo Section */}
        <a className="flex items-center space-x-3" href="#hero">
          <motion.img
            src={brainwaveSymbol}
            width={50}
            height={50}
            alt="Brainwave Icon"
            whileHover={{ rotate: 360, transition: { duration: 1 } }}
          />
          <motion.span
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-poppins"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4 },
            }}
          >
            Kushagra
          </motion.span>
        </a>

        {/* Navigation Links */}
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-20 flex flex-col items-center justify-center lg:flex-row">
            {/* Close button for mobile - positioned at the top */}
            <button
              className="absolute top-4 right-4 p-2 lg:hidden"
              onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white hover:text-color-1 transition-colors"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {navigation.map((item) => (
              <motion.a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                whileHover={{ scale: 1.05, color: "#FF5733" }}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </motion.a>
            ))}

            {/* Mobile Download Button */}
            <motion.a
              href="\Final-Resume.pdf"
              download="Kushagra-Resume.pdf"
              className="lg:hidden button text-n-1 font-bold border border-color-1 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-color-1 hover:text-white mt-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </div>
        </nav>

        {/* Desktop Download Button */}
        <motion.a
          href="\Final-Resume.pdf"
          download="Kushagra-Resume.pdf"
          className="button hidden lg:flex text-n-1 font-bold border border-color-1 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 hover:bg-color-1 hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Resume
        </motion.a>

        {/* Toggle Navigation Button */}
        <motion.button
          className="ml-auto lg:hidden p-2"
          onClick={toggleNavigation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MenuSvg openNavigation={openNavigation} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Header;
