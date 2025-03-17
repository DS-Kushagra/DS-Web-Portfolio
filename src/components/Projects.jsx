import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  ArrowRight,
  Github,
  Globe,
  Code,
  ExternalLink,
  Star,
  GitFork,
  Users,
  Sparkles,
  ArrowUpRight,
  Activity,
  GitBranch,
  Eye,
} from "lucide-react";
import { projects } from "../constants/index";

const generateActivityData = () => ({
  commits: Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    value: Math.floor(Math.random() * 100),
    previous: Math.floor(Math.random() * 80),
  })),
  stats: {
    // stars: Math.floor(Math.random() * 20) + 50,
    // forks: Math.floor(Math.random() * 100) + 20,
    // contributors: Math.floor(Math.random(2) * 1000)+3 ,
  },
});

const ProjectsSection = ({ techFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    "NLP",
    "machine-learning",
    "data-analysis",
    "visualization",
  ];

  const filteredProjects = projects.filter(
    (project) =>
      (selectedCategory === "all" || project.category === selectedCategory) &&
      (techFilter ? project.technologies.includes(techFilter) : true)
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900/0" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />

      {/* Content Container */}
      <div className="relative">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16" id="projects">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
              Portfolio
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent mb-4"
          >
            Recent Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            Explore my latest work in data science and machine learning
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-4">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory()}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activityData] = useState(generateActivityData());
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-black backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500">
        {/* Project Preview */}
        <div className="relative h-48 overflow-hidden">
          {/* Background Patterns */}
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/80" />

          {/* Project Icon/Logo */}
          <motion.div
            initial={false}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md rounded-xl z-20"
          >
            {project.iconUrl ? (
              <img
                src={project.iconUrl}
                alt={`${project.title} icon`}
                className="w-8 h-8"
              />
            ) : (
              <Code className="w-8 h-8 text-purple-400" />
            )}
          </motion.div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4 z-20">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={`px-3 py-1.5 rounded-full text-sm backdrop-blur-md flex items-center gap-2
                ${
                  project.status === "done"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
              </span>
              {project.status === "done" ? "Completed" : "In Progress"}
            </motion.div>
          </div>

          {/* Project Links */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-black/40"
              >
                <motion.a
                  href={project.sourceCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6 group-hover:text-purple-400 transition-colors" />
                </motion.a>
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Globe className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
                  </motion.a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Project Info */}
        <div className="p-6 space-y-6">
          {/* Title & Description */}
          <div>
            <motion.h3
              className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-2 flex items-center gap-2"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              {project.title}
              <ArrowUpRight className="w-4 h-4 text-purple-400" />
            </motion.h3>
            <p className="text-gray-300/90 leading-relaxed text-sm">
              {project.text}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies?.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Activity Graph */}
          <div className="h-32 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData.commits}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#ffffff20" />
                <YAxis stroke="#ffffff20" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#ffffff20"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 py-3 border-t border-white/10">
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-base text-gray-300 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {activityData.stats.stars}
              </div>
              <p className="text-xs text-gray-500 mt-1">Stars</p>
            </motion.div>
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-base text-gray-300 flex items-center justify-center gap-1">
                <GitBranch className="w-4 h-4 text-blue-500" />
                {activityData.stats.forks}
              </div>
              <p className="text-xs text-gray-500 mt-1">Forks</p>
            </motion.div>
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-base text-gray-300 flex items-center justify-center gap-1">
                <Eye className="w-4 h-4 text-purple-500" />
                {activityData.stats.contributors}
              </div>
              <p className="text-xs text-gray-500 mt-1">Watchers</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
