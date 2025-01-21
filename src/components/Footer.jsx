import React, { useState, useEffect } from 'react';
import { ChevronUp, Mail, ExternalLink, Check, Github, Linkedin, Twitter, Instagram, Copy, CheckCircle } from 'lucide-react';

const Footer = () => {
  const [isNewsletterFocused, setIsNewsletterFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);

  const currentYear = new Date().getFullYear();
  const myEmail = "kushagraagrawal128@gmail.com";

  // Floating particles effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
      }));
      setParticles(newParticles);
    };
    createParticles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold =
        document.documentElement.scrollHeight - window.innerHeight - 100;
      setIsVisible(scrolled > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myEmail);
      setIsEmailCopied(true);
      setTimeout(() => setIsEmailCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  const footerLinks = {
    company: [
      { name: "About", href: "#About" },
      { name: "Projects", href: "#projects" },
      { name: "Blog", href: "https://medium.com/@ds-kushagra" },
      { name: "Collaborate", href: "#collab" },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com/DS-Kushagra",
        icon: Github,
        color: "group-hover:text-gray-200",
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/kushagra--agrawal/",
        icon: Linkedin,
        color: "group-hover:text-blue-400",
      },
      {
        name: "Twitter",
        href: "https://x.com/KushagraA15",
        icon: Twitter,
        color: "group-hover:text-blue-400",
      },
      {
        name: "Instagram",
        href: "https://www.instagram.com/_kushagra.ag_/",
        icon: Instagram,
        color: "group-hover:text-pink-400",
      },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await navigator.clipboard.writeText(email);
      setShowCopyPopup(true);

      // Clear state and redirect after delay
      setTimeout(() => {
        setEmail("");
        setShowCopyPopup(false);
        window.open("https://beyondnums.substack.com/subscribe", "_blank");
      }, 3000);
    } catch (error) {
      alert("Error copying email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.speed * 10}s`,
          }}
        />
      ))}

      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 w-full h-[2px] animate-gradient-x bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-800/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 max-w-xl space-y-4 animate-fade-in-up">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Stay Updated
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Join our newsletter for exclusive insights, project updates, and
                tech discoveries.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <form onSubmit={handleSubscription} className="relative group">
                <div
                  className={`relative transform transition-all duration-300 ${
                    isNewsletterFocused ? "scale-105" : "scale-100"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full md:w-96 px-6 pr-16 py-4 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 focus:border-blue-500 focus:outline-none transition-all text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsNewsletterFocused(true)}
                    onBlur={() => setIsNewsletterFocused(false)}
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full transition-all duration-300 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Enhanced notification popup */}
              {showCopyPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white px-8 py-6 rounded-xl text-center shadow-2xl animate-fade-scale z-50 backdrop-blur-lg border border-gray-700/50">
                  <Check className="w-12 h-12 mx-auto mb-4 text-green-500 animate-bounce" />
                  <p className="text-lg font-semibold mb-2">
                    Email Copied Successfully!
                  </p>
                  <p className="text-gray-400">Redirecting to newsletter...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" id='contact'>
          {/* Enhanced Brand Section with Email */}
          <div className="space-y-6 animate-fade-in-up">
            <div
              className="group relative inline-block cursor-pointer"
              onClick={copyEmailToClipboard}
              onMouseEnter={() => setShowEmailTooltip(true)}
              onMouseLeave={() => setShowEmailTooltip(false)}
            >
              <h2 className="text-l font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text flex items-center gap-2">
                {myEmail}
                {!isEmailCopied ? (
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500 animate-bounce" />
                )}
              </h2>
              {showEmailTooltip && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap">
                  Click to copy email
                </div>
              )}
              {isEmailCopied && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap animate-fade-scale">
                  Copied!
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting digital experiences with passion and precision. Let's
              build something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            <h3 className="text-lg font-semibold mb-6 relative group">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="relative overflow-hidden">
                      {link.name}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Social Links */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="text-lg font-semibold mb-6 relative group">
              Connect
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative">
                    <social.icon
                      className={`w-6 h-6 transform group-hover:scale-110 transition-all duration-300 ${social.color}`}
                    />
                    <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
                  </div>
                  <span className="relative overflow-hidden">
                    {social.name}
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Status Section */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="text-lg font-semibold mb-6 relative group">
              Status
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500" />
            </h3>
            <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  Available for projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer Bottom */}
        <div className="py-6 border-t border-gray-800/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Kushagra. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className={`p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-500 transform group ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Add a subtle glow effect at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;