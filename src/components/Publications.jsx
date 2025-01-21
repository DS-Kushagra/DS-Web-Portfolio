import { motion } from "framer-motion";
import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import { LeftLine, RightLine } from "./design/Pricing";
import { ScrollText, ExternalLink, BookOpen } from "lucide-react";

const Publications = () => {
  const publications = [
    {
      id: 1,
      type: "Publication",
      title: "My Journey into the World of Data",
      author: "Author-Kushagra",
      year: "2024",
      description:
        "Briefly described how I discovered my passion for data analytics and turned it into a promising career path.",
      link: "https://medium.com/@ds-kushagra/my-journey-into-the-world-of-data-analytics-from-high-school-dreams-to-industry-certifications-9638ea7f6fff",
      tags: ["Starting Point", "Data Science"],
    },
    {
      id: 2,
      type: "Publication",
      title: "Struggles in My Data Science Journey",
      author: "Author-Kushagra",
      year: "2024",
      description:
        "This is a story not just about learning data science, but about navigating the realities of life that come with it.",
      link: "https://medium.com/@ds-kushagra/struggles-in-my-data-science-journey-a-story-of-persistence-and-growth-bc1dabf4d88e",
      tags: ["Learnings", "New Networks"],
    },
    {
      id: 3,
      type: "Publication",
      title: "My Data Science Learnings So Far",
      author: "Author-Kushagra",
      year: "2024",
      description:
        "The blog captures the milestones, challenges, and lessons that have shaped my path.",
      link: "https://medium.com/@ds-kushagra/my-data-science-journey-so-far-a-reflection-of-growth-and-achievement-ac9a3e1d0052",
      tags: ["Statistical Analysis", "Data Mining"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Section className="overflow-hidden" id="publications">
      <div className="container relative z-2">
        {/* Animated Background */}
        <motion.div
          className="hidden relative justify-center mb-[6.5rem] lg:flex"
          // initial={{ rotate: 0 }}
          // animate={{ rotate: 360 }}
          // transition={{ duration: 8, repeat:1, ease: "linear" }}
        >
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            variants={glowVariants}
            // initial="initial"
            // animate="animate"
          >
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </motion.div>
        </motion.div>

        {/* Heading with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading tag="My Publications" title="A showcase of my journey" />
        </motion.div>

        {/* Publications Grid with Stagger Animation */}
        <motion.div
          className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative p-6 rounded-3xl border border-n-1/10 bg-n-8/90 backdrop-blur-sm h-full flex flex-col">
                {/* Type and Year with Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-primary-500">
                    <ScrollText className="w-4 h-4" />
                    <span className="text-sm font-code">{pub.type}</span>
                  </div>
                  <span className="text-sm text-n-3">{pub.year}</span>
                </div>

                {/* Title with Hover Effect */}
                <h4 className="h5 mb-4 transition-colors group-hover:text-primary-500">
                  {pub.title}
                </h4>
                <p className="text-sm text-n-3 mb-3 italic flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {pub.author}
                </p>
                <p className="body-2 text-n-3 mb-4 flex-grow">
                  {pub.description}
                </p>

                {/* Animated Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pub.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className="text-xs px-3 py-1 rounded-full bg-n-6 hover:bg-primary-500 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Animated Link */}
                <motion.a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-400 transition-all group/link"
                  whileHover={{ x: 5 }}
                >
                  Read Paper
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:rotate-45" />
                </motion.a>
              </div>
            </motion.div>
          ))}
          <LeftLine />
          <RightLine />
        </motion.div>

        {/* View All Link with Animation */}
        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <a
            className="relative text-xs font-code font-bold tracking-wider uppercase hover:text-primary-500 transition-colors group"
            href="https://medium.com/@ds-kushagra"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View all publications on Medium Platform</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

export default Publications;
