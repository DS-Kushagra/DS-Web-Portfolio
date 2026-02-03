import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  Brain,
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
  Star,
} from "lucide-react";
import { ExpandableCard } from "./ExpandableCard";
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



// Enhanced tab button with better feedback
const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setActiveTab(id)}
    className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${activeTab === id
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
    title: "Data Scientist & Engineer",
    location: "Surat, INDIA",
    experience: "4+ years",
    email: "kushagraagrawal128@gmail.com",
    bio: "I transform complex data into actionable strategic insights. With a strong foundation in both engineering and data science, I build scalable AI solutions that drive measurable business growth.",
  };
  const storyContent = {
    highlights: [
      {
        title: "Engineering Foundation",
        content:
          "Leveraging a rigorous engineering background to build robust, scalable machine learning pipelines and production-grade AI systems.",
        icon: Brain,
      },
      {
        title: "Strategic Innovation",
        content:
          "Focusing on high-ROI initiatives, translating technical capability into tangible business value through predictive modeling and automation.",
        icon: Zap,
      },
      {
        title: "Collaborative Leadership",
        content:
          "Driving cross-functional success by bridging the gap between technical complexity and stakeholder goals.",
        icon: Users,
      },
    ],
  };

  const skills = [
    { name: "Machine Learning & AI", level: 90 },
    { name: "Data Engineering / ETL", level: 85 },
    { name: "Python & Statistical Analysis", level: 95 },
    { name: "Cloud Infrastructure (AWS)", level: 75 },
    { name: "Strategic Problem Solving", level: 90 },
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
        label: "Efficiency Gain",
        detail: "Optimization of core algorithms",
      },
      {
        icon: Users,
        metric: "20+",
        label: "Projects Delivered",
        detail: "End-to-end ML solutions",
      },
      {
        icon: TrendingUp,
        metric: "98%",
        label: "Accuracy",
        detail: "In predictive maintenance models",
      },
    ],
    innovationHighlights: [
      {
        title: "Predictive Analytics",
        description:
          "Deployed churn prediction models reducing customer attrition.",
        impact: "15% Retention ↑",
      },
      {
        title: "Automated Workflows",
        description: "Engineered ETL pipelines replacing manual reporting.",
        impact: "20hrs/week Saved",
      },
      {
        title: "Infrastructure Cost",
        description: "Optimized cloud resource allocation.",
        impact: "30% Reduction ↓",
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
    <div className="relative min-h-screen bg-slate-950 overflow-hidden font-sans">
      <AnimatedBackground />

      <motion.div
        ref={containerRef}
        className="relative z-10 px-4 py-24 mx-auto max-w-7xl"
      >
        {/* Enhanced Hero Section */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-7xl font-bold mb-6 tracking-tight relative"
            >
              <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 text-transparent bg-clip-text drop-shadow-sm" id="About" >
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.div
              className="text-2xl text-blue-200/80 font-light tracking-wide uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {personalInfo.title}
            </motion.div>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto p-1 backdrop-blur-3xl rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-slate-900/80 p-8 rounded-[22px] border border-white/5 shadow-2xl shadow-black/50">
              <p className="text-slate-300 text-lg leading-relaxed font-light">
                {personalInfo.bio}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid with Expandable Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-24">
          {[
            {
              title: "Experience",
              description: "4+ Years Programming",
              src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
              ctaText: "View Journey",
              content: () => (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Professional Journey</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Over 4+ years, I have honed my skills in programming, starting from basic Python scripting to architecting complex AI solutions. My journey involves continuous learning, adapting to new technologies, and solving real-world problems through code.
                  </p>
                </div>
              ),
            },
            {
              title: "Projects",
              description: "20+ Delivered Solutions",
              src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
              ctaText: "See Projects",
              content: () => (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Impactful Projects</h4>
                  <p className="text-slate-300 leading-relaxed">
                    I have successfully delivered over 20 projects ranging from web applications to sophisticated machine learning models. Each project represents a step forward in understanding user needs and technical feasibility.
                  </p>
                </div>
              ),
            },
            {
              title: "Community",
              description: "100+ Endorsements",
              src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop",
              ctaText: "View Community",
              content: () => (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Community Engagement</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Building connections is key. I have received over 100 endorsements from peers and mentors, reflecting my commitment to collaboration and high-quality work in the tech community.
                  </p>
                </div>
              ),
            },
            {
              title: "Tech Stack",
              description: "15+ Technologies",
              src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
              ctaText: "Explore Tech",
              content: () => (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Technical Arsenal</h4>
                  <p className="text-slate-300 leading-relaxed">
                    My toolkit includes over 15 distinct technologies, covering the full stack from frontend frameworks like React to backend services, databases, and advanced AI/ML libraries like TensorFlow and PyTorch.
                  </p>
                </div>
              ),
            },
          ].map((card, index) => (
            <ExpandableCard
              key={index}
              title={card.title}
              description={card.description}
              src={card.src}
              className="w-full bg-slate-900/60 dark:bg-slate-900/60 border-white/5 backdrop-blur-md"
            >
              {card.content()}
            </ExpandableCard>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mt-20 mb-16">
          {[
            { id: "story", label: "Professional Narrative", icon: ScrollText },
            { id: "skills", label: "Core Competencies", icon: Brain },
            { id: "impact", label: "Impact & ROI", icon: LineChart },
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-5xl mx-auto"
          >
            {activeTab === "story" && (
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <p className="text-xl leading-relaxed text-slate-300 font-light">
                    My career is built on a simple premise: <span className="text-white font-medium">Technology exists to solve meaningful problems.</span>
                  </p>
                  <p className="text-lg leading-relaxed text-slate-400">
                    From my early days of exploring Python to leading complex AI implementations, I've always prioritized structural integrity and scalability. I don't just write code; I engineer solutions that stand the test of time and scale with business needs.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5"
                  >
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
                      <Star className="w-5 h-5 text-indigo-400" />
                      Philosophy
                    </h3>
                    <p className="text-slate-300 leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-1">
                      "Precision in code, clarity in thought, and impact in execution."
                    </p>
                  </motion.div>
                </div>

                <div className="grid gap-6">
                  {storyContent.highlights.map((highlight, index) => (
                    <StoryCard key={index} {...highlight} index={index} />
                  ))}
                </div>
              </div>
            )}


            {activeTab === "skills" && (
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Technical Proficiency</h3>
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
                </div>
                <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-6">Strategic Focus</h3>
                  <div className="flex flex-wrap gap-3">
                    {["System Architecture", "Scalability", "Data Privacy", "Model Optimization", "API Design", "Agile Methodology"].map((tag, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "impact" && (
              <div className="space-y-16">
                {/* Key Achievements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {impactMetrics.keyAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-900/80 p-6 rounded-2xl border border-white/5 group hover:border-indigo-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                          <achievement.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="text-4xl font-bold mb-2 text-white tracking-tight">
                        {achievement.metric}
                      </div>
                      <div className="text-lg font-medium mb-1 text-slate-200">
                        {achievement.label}
                      </div>
                      <div className="text-slate-400 text-sm">{achievement.detail}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Innovation Highlights */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-indigo-400" />
                      Performance Trends
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={impactMetrics.codeContributions}>
                          <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              background: "#0f172a",
                              border: "1px solid #1e293b",
                              borderRadius: "8px",
                              padding: "12px",
                              color: "#f8fafc"
                            }}
                            itemStyle={{ color: "#e2e8f0" }}
                          />
                          <Line
                            type="monotone"
                            dataKey="contributions"
                            stroke="#6366f1"
                            strokeWidth={3}
                            dot={{ fill: "#6366f1", strokeWidth: 4, r: 4 }}
                            activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4 text-white pl-2">Strategic Initiatives</h3>
                    {impactMetrics.innovationHighlights.map(
                      (highlight, index) => (
                        <ImpactCard key={index} {...highlight} index={index} />
                      )
                    )}
                  </div>
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
          className="mt-32 border-t border-slate-800 pt-16 text-center"
        >
          <div className="flex justify-center space-x-8">
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
                whileHover={{ y: -3, color: "#fff" }}
                className="p-3 text-slate-400 hover:text-white transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          <motion.a
            href="/Resume.pdf"
            download="Kushagra-Resume.pdf"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center px-8 py-3 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernAboutSection;