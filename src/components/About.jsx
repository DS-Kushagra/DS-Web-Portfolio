import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AICharacter from "../components/AICharacter";
import {
  Brain,
  Sparkles,
  Code2,
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ScrollText,
  Download,
  ChevronRight,
  Zap,
  Trophy,
  Target,
  Users,
  TrendingUp,
  LineChart,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ModernAboutSection = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [isInView, setIsInView] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const containerRef = useRef(null);

  // Personal details
  const personalInfo = {
    name: "Kushagra Agrawal",
    title: "Budding Data Scientist",
    location: "Surat, INDIA",
    experience: "4+ years",
    email: "kushagraagrawal128@gmail.com",
    bio: "Hi, I'm Kushagra! I'm a passionate data enthusiast with a growing expertise in data science and analytics. Beyond data, I enjoy exploring web development and collaborating on innovative projects. Let's connect and create something remarkable together!",
  };

  const skills = [
    { name: "Python", level: 85 },
    { name: "PowerBI", level: 75 },
    { name: "MongoDB", level: 60 },
    { name: "MySQL", level: 75 },
    { name: "AWS", level: 60 },
  ];

  // Impact metrics data
  const impactMetrics = {
    codeContributions: [
      { month: "Jan", contributions: 120 },
      { month: "Feb", contributions: 180 },
      { month: "Mar", contributions: 150 },
      { month: "Apr", contributions: 230 },
      { month: "May", contributions: 280 },
      { month: "Jun", contributions: 350 },
    ],
    keyAchievements: [
      {
        icon: Zap,
        metric: "45%",
        label: "Performance Boost",
        detail: "Improved application response time",
      },
      {
        icon: Users,
        metric: "500+",
        label: "Connections",
        detail: "Benefited with resources",
      },
      {
        icon: TrendingUp,
        metric: "98%",
        label: "Code Quality",
        detail: "Test coverage maintained",
      },
    ],
    innovationHighlights: [
      {
        title: "Model Integration",
        description:
          "Implemented machine learning models for predictive analytics",
        impact: "32% accuracy improvement",
      },
      {
        title: "Data Pipeline",
        description: "Built automated ETL workflows",
        impact: "3hr/day saved",
      },
      {
        title: "CI/CD Pipeline",
        description: "AWS",
        impact: "40% cost reduction",
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setSkillsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-6 py-3 rounded-lg ${
        activeTab === id
          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
          : "bg-white/5 hover:bg-white/10"
      }`}
    >
      <Icon className="w-5 h-5 mr-2" />
      {label}
    </motion.button>
  );

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-fuchsia-900/10 to-black" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
            backgroundSize: "100% 100%",
          }}
        />

        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-500 rounded-full"
            animate={{
              y: [-10, -30, -10],
              x: [-10, 10, -10],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* AI Character */}
          <AICharacter />

          <motion.h1
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500"
            variants={itemVariants}
          >
            {personalInfo.name}
          </motion.h1>

          <motion.h2
            className="text-2xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            {personalInfo.title}
          </motion.h2>

          <motion.p
            className="max-w-2xl mx-auto text-gray-400 text-lg"
            variants={itemVariants}
          >
            {personalInfo.bio}
          </motion.p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: Briefcase,
                label: "Experience in Coding",
                value: personalInfo.experience,
              },
              { icon: GraduationCap, label: "Projects", value: "20+" },
              { icon: Heart, label: "Endorsements", value: "100+" },
              { icon: Code2, label: "Technologies", value: "15+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-fuchsia-500" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <TabButton id="story" label="My Story" icon={ScrollText} />
          <TabButton id="skills" label="Skills" icon={Brain} />
          <TabButton id="impact" label="Impact Metrics" icon={LineChart} />
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === "story" && (
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">
                  From a curious learner to a budding data scientist, my journey
                  has been one of exploration. Starting with the basics of
                  Python, I gradually delved into the world of data science,
                  tackling challenges in machine learning, gen-ai, and deep
                  learning. Along the way, I have embraced internships,
                  simulations, and real-world projects, all of which have shaped
                  my skills and fueled my passion for uncovering insights from
                  data.
                </p>
                <p className="text-lg leading-relaxed mt-6">
                  My approach combines technical expertise with creative
                  problem-solving, always focusing on delivering value through
                  clean, maintainable code and intuitive user experiences.
                </p>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          skillsVisible ? { width: `${skill.level}%` } : {}
                        }
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "impact" && (
              <div className="space-y-12">
                {/* Contribution Graph */}
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm">
                  <h3 className="text-xl font-bold mb-6">
                    Code Contribution Trend
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={impactMetrics.codeContributions}>
                        <XAxis dataKey="month" stroke="#ffffff60" />
                        <YAxis stroke="#ffffff60" />
                        <Tooltip
                          contentStyle={{
                            background: "rgba(0,0,0,0.8)",
                            border: "none",
                            borderRadius: "8px",
                            color: "white",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="contributions"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          dot={{ fill: "#8b5cf6" }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {impactMetrics.keyAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
                    >
                      <achievement.icon className="w-8 h-8 text-fuchsia-500 mb-4" />
                      <div className="text-3xl font-bold mb-2">
                        {achievement.metric}
                      </div>
                      <div className="text-lg font-semibold mb-1">
                        {achievement.label}
                      </div>
                      <div className="text-gray-400">{achievement.detail}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Innovation Highlights */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-6">
                    Innovation Highlights
                  </h3>
                  {impactMetrics.innovationHighlights.map(
                    (highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white/5 p-6 rounded-xl backdrop-blur-sm flex items-center justify-between"
                      >
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            {highlight.title}
                          </h4>
                          <p className="text-gray-400">
                            {highlight.description}
                          </p>
                        </div>
                        <div className="text-fuchsia-500 font-bold text-xl">
                          {highlight.impact}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, link: "https://github.com/DS-Kushagra" },
              {
                icon: Linkedin,
                link: "https://www.linkedin.com/in/kushagra--agrawal/",
              },
              { icon: Twitter, link: "https://x.com/KushagraA15" },
              { icon: Mail, link: `mailto:${personalInfo.email}` },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/Resume.pdf"
            download="Kushagra-Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
            <ChevronRight className="w-5 h-5 ml-1" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModernAboutSection;
