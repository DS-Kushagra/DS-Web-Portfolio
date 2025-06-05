import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  Brain,
  Code2,
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

// Optimized animated background
const AnimatedBackground = () => (
  <div className="absolute inset-0">
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1] }}>
      <Stars 
        radius={100} 
        depth={50} 
        count={3000} 
        factor={4} 
        saturation={0.5}
        fade
        speed={0.5}
      />
    </Canvas>
    <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#030014]/90 to-[#030014] pointer-events-none" />
  </div>
);

// Optimized skill bar with smoother animations
const SkillBar = ({ skill, index, isVisible }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="space-y-2"
  >
    <div className="flex justify-between text-sm">
      <span className="font-medium">{skill.name}</span>
      <span className="text-purple-400">{skill.level}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isVisible ? `${skill.level}%` : "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-purple-600 to-cyan-400"
      />
    </div>
  </motion.div>
);

// Enhanced stat card with better hover effects
const StatCard = ({ icon: Icon, label, value, color, index }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
  >
    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-lg"
         style={{ background: color }} />
    <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
      <div className="flex flex-col items-center">
        <Icon className="w-8 h-8 mb-4 text-purple-500 group-hover:text-purple-400 transition-colors duration-300" />
        <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-sm text-gray-400 group-hover:text-gray-300">{label}</div>
      </div>
    </div>
  </motion.div>
);

// Enhanced tab button with better feedback
const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setActiveTab(id)}
    className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
      activeTab === id
        ? "bg-gradient-to-r from-purple-600 to-cyan-400 text-white shadow-lg shadow-purple-500/20"
        : "bg-white/5 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10"
    }`}
  >
    <Icon className="w-5 h-5 mr-2" />
    {label}
  </motion.button>
);

// Enhanced impact card
const ImpactCard = ({ title, description, impact, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
  >
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-lg font-semibold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {title}
        </h4>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {impact}
      </div>
    </div>
  </motion.div>
);
const StoryCard = ({ title, content, icon: Icon, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
  >
    <div className="flex items-start space-x-4">
      <div className="p-3 rounded-lg bg-purple-500/10">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          {title}
        </h4>
        <p className="text-gray-400 leading-relaxed">{content}</p>
      </div>
    </div>
  </motion.div>
);


const ModernAboutSection = () => {
  const [activeTab, setActiveTab] = useState("story");
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
  const storyContent = {
    highlights: [
      {
        title: "Data Science Journey",
        content:
          "Started with Python basics and gradually evolved into machine learning and deep learning, tackling complex real-world challenges.",
        icon: Brain,
      },
      {
        title: "Innovation Focus",
        content:
          "Developed multiple end-to-end ML solutions, focusing on practical applications and business impact.",
        icon: Zap,
      },
      {
        title: "Collaborative Spirit",
        content:
          "Actively participated in team projects and hackathons, learning from peers and contributing to shared success.",
        icon: Users,
      },
    ],

  };

  const skills = [
    { name: "Machine Learning", level: 85 },
    { name: "Generative AI", level: 75 },
    { name: "Python", level: 85 },
    { name: "MongoDB", level: 60 },
    { name: "AWS", level: 60 },
  ];

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
        impact: "32% accuracy improved ↑ ",
      },
      {
        title: "Data Pipeline",
        description: "Built automated ETL workflows",
        impact: "3hr/day saved ↓",
      },
      {
        title: "CI/CD Pipeline",
        description: "AWS",
        impact: "40% cost reduction ↓",
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  return (
    <div className="relative min-h-screen bg-[#030014] overflow-hidden">
      <AnimatedBackground />

      <motion.div
        ref={containerRef}
        className="relative z-10 px-4 py-24 mx-auto max-w-7xl"
      >
        {/* Enhanced Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.h1
              className="text-7xl font-bold mb-6 relative"
              animate={{
                textShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 35px rgba(139, 92, 246, 0.3)",
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-purple-500 via-cyan-300 to-purple-500 text-transparent bg-clip-text" id="About" >
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.div
              className="text-2xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {personalInfo.title}
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10 shadow-xl shadow-purple-500/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              {personalInfo.bio}
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: Briefcase,
              label: "Experience in programming",
              value: personalInfo.experience,
              color: "from-purple-600 to-cyan-400",
            },
            {
              icon: GraduationCap,
              label: "Projects",
              value: "20+",
              color: "from-cyan-400 to-blue-500",
            },
            {
              icon: Heart,
              label: "Endorsements",
              value: "100+",
              color: "from-blue-500 to-purple-600",
            },
            {
              icon: Code2,
              label: "Technologies",
              value: "15+",
              color: "from-purple-600 to-pink-500",
            },
          ].map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mt-20 mb-12">
          {[
            { id: "story", label: "My Story", icon: ScrollText },
            { id: "skills", label: "Skills", icon: Brain },
            { id: "impact", label: "Impact Metrics", icon: LineChart },
          ].map((tab) => (
            <TabButton
              key={tab.id}
              {...tab}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

        {/* Enhanced Content Sections */}
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
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert max-w-none"
            >
              <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10">
                <p className="text-lg leading-relaxed text-gray-300">
                  From a curious learner to a budding data scientist, my journey has been one of continuous exploration and growth. I've progressively immersed myself in the fascinating world of data science, focusing on creating meaningful impact through technology and innovation.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {storyContent.highlights.map((highlight, index) => (
                <StoryCard key={index} {...highlight} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Philosophy & Approach
              </h3>
              <p className="text-gray-300 leading-relaxed">
                My approach combines technical expertise with creative problem-solving, always focusing on delivering value through clean, maintainable code and intuitive user experiences. I believe in the power of data to drive innovation and create positive impact, while maintaining a strong commitment to continuous learning and growth.
              </p>
            </motion.div>
          </div>
        )}


            {activeTab === "skills" && (
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index}
                    isVisible={skillsVisible}
                  />
                ))}
              </div>
            )}

            {activeTab === "impact" && (
              <div className="space-y-12">
                {/* Enhanced Contribution Graph */}
                <div className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
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
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                            padding: "8px 12px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="contributions"
                          stroke="url(#gradient)"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2 }}
                        />
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
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
                      className="bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <achievement.icon className="w-8 h-8 mb-4 text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text" />
                      <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        {achievement.metric}
                      </div>
                      <div className="text-lg font-semibold mb-1 text-gray-300">
                        {achievement.label}
                      </div>
                      <div className="text-gray-400">{achievement.detail}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Innovation Highlights */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    Innovation Highlights
                  </h3>
                  {impactMetrics.innovationHighlights.map(
                    (highlight, index) => (
                      <ImpactCard key={index} {...highlight} index={index} />
                    )
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact & Social Links */}
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
            className="mt-8 inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Resume
            <ChevronRight className="w-5 h-5 ml-1" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernAboutSection;