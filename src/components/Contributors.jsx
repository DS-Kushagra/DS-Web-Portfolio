import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Particles from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";
import {
  Brain,
  Database,
  Network,
  ChevronRight,
  Trophy,
  Bot,
  Cpu,
  Star,
  X,
  Check,
  Rocket,
  Users,
  Share2,
  Zap,
  MessageSquare,
  Sparkles,
  GitBranch,
  Code2,
  LineChart as ChartIcon,
  FlaskRound as Flask,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const Contributors = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contribution: "",
    availability: "full-time",
    expertise: "",
    github: "",
    projectInterest: "machine-learning",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const form = useRef();

  const projectCategories = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning Models",
      description:
        "Contribute to cutting-edge ML algorithms and model optimization",
      impact: "85% accuracy improvement",
      openIssues: 24,
      difficulty: "Advanced",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Pipeline Enhancement",
      description: "Optimize data processing and ETL workflows",
      impact: "3x faster processing",
      openIssues: 18,
      difficulty: "Intermediate",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Neural Network Architecture",
      description: "Design and implement novel neural network structures",
      impact: "40% less compute required",
      openIssues: 31,
      difficulty: "Expert",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Research Implementation",
      description: "Transform academic papers into practical code",
      impact: "12 papers implemented",
      openIssues: 15,
      difficulty: "Advanced",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Model Optimization",
      description: "Improve model performance and efficiency",
      impact: "60% faster inference",
      openIssues: 27,
      difficulty: "Intermediate",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Flask className="w-8 h-8" />,
      title: "Experiment Framework",
      description: "Enhance our experimentation and testing infrastructure",
      impact: "2x faster iterations",
      openIssues: 21,
      difficulty: "Intermediate",
      color: "from-violet-500 to-purple-500",
    },
  ];

  const contributionMetrics = [
    {
      month: "Jan",
      modelAccuracy: 78,
      computeEfficiency: 65,
      contributions: 42,
    },
    {
      month: "Feb",
      modelAccuracy: 82,
      computeEfficiency: 70,
      contributions: 58,
    },
    {
      month: "Mar",
      modelAccuracy: 85,
      computeEfficiency: 75,
      contributions: 64,
    },
    {
      month: "Apr",
      modelAccuracy: 88,
      computeEfficiency: 78,
      contributions: 71,
    },
    {
      month: "May",
      modelAccuracy: 92,
      computeEfficiency: 82,
      contributions: 85,
    },
    {
      month: "Jun",
      modelAccuracy: 95,
      computeEfficiency: 88,
      contributions: 92,
    },
  ];

  const contributorLevels = [
    {
      level: "Novice Data Scientist",
      icon: <Code2 className="w-6 h-6 text-blue-400" />,
      requirements: "5+ contributions",
      perks: ["Access to basic datasets", "Community support"],
      color: "from-blue-500/20 to-indigo-500/20",
    },
    {
      level: "ML Engineer",
      icon: <Brain className="w-6 h-6 text-indigo-400" />,
      requirements: "20+ contributions",
      perks: ["GPU compute credits", "Priority review"],
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      level: "Research Contributor",
      icon: <ChartIcon className="w-6 h-6 text-purple-400" />,
      requirements: "50+ contributions",
      perks: ["Research paper co-authorship", "Conference sponsorship"],
      color: "from-red-500/20 to-orange-500/20",
    },
    {
      level: "AI Architect",
      icon: <Network className="w-6 h-6 text-pink-400" />,
      requirements: "100+ contributions",
      perks: ["Project leadership", "Mentorship program"],
      color: "from-green-500/20 to-emerald-500/20",
    },
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.contribution.trim())
      errors.contribution = "Please describe your contribution";
    if (!formData.expertise.trim())
      errors.expertise = "Please specify your expertise";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      errors.email = "Please enter a valid email address";

    if (formData.github && !formData.github.startsWith("https://github.com/")) {
      errors.github = "Please enter a valid GitHub profile URL";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_duvj6oc",
        "template_msal7ie",
        form.current,
        "CYsCptsEz3iSaLxBA"
      );
      setShowSuccessCard(true);
      setTimeout(() => {
        setIsFormVisible(false);
        setShowSuccessCard(false);
        setFormData({
          name: "",
          email: "",
          contribution: "",
          availability: "full-time",
          expertise: "",
          github: "",
          projectInterest: "machine-learning",
        });
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      <div className="relative h-[600px] overflow-hidden bg-gray-900">
        {/* <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 220,
            interactivity: {
              events: {
                onClick: {
                  // enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  // mode: "grab",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 2,
                },
                grab: {
                  distance: 140,
                  links: {
                    opacity: 0.5,
                  },
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                // enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.2,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        /> */}

        <motion.div
          className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl font-extrabold mb-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Shape the Future of AI
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join our community of data scientists, researchers, and ML
              engineers in pushing the boundaries of artificial intelligence and
              machine learning.
            </motion.p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          {projectCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400 flex items-center">
                      <Rocket className="w-4 h-4 mr-1" />
                      Impact: {category.impact}
                    </span>
                    <span className="text-blue-400 flex items-center">
                      <GitBranch className="w-4 h-4 mr-1" />
                      Issues: {category.openIssues}
                    </span>
                  </div>
                  <div
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      category.difficulty === "Expert"
                        ? "bg-red-500/20 text-red-400"
                        : category.difficulty === "Advanced"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {category.difficulty}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <ChartIcon className="w-6 h-6 mr-2 text-purple-500" />
              Project Metrics
            </h3>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-400">Real-time Analytics</span>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contributionMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="modelAccuracy"
                  name="Model Accuracy"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="computeEfficiency"
                  name="Compute Efficiency"
                  stroke="#EC4899"
                  strokeWidth={3}
                  dot={{ fill: "#EC4899", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="contributions"
                  name="Contributions"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, staggerChildren: 0.1 }}
        >
          {contributorLevels.map((level, index) => (
            <motion.div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 bg-gradient-to-br ${level.color}`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                {level.icon}
                <h4 className="text-lg font-semibold text-white">
                  {level.level}
                </h4>
              </div>
              <p className="text-purple-400 text-sm mb-4 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                {level.requirements}
              </p>
              <ul className="space-y-2">
                {level.perks.map((perk, i) => (
                  <li
                    key={i}
                    className="text-gray-400 text-sm flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <button
            onClick={() => setIsFormVisible(true)}
            className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-lg hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1"
          >
            Start Contributing
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>

        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button
                  onClick={() => setIsFormVisible(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <GitBranch className="w-6 h-6 mr-2 text-purple-500" />
                  Join Our Contributors
                </h3>

                <form
                  ref={form}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Expertise
                    </label>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your areas of expertise"
                    />
                    {formErrors.expertise && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.expertise}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      GitHub Profile (optional)
                    </label>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://github.com/username"
                    />
                    {formErrors.github && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.github}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="weekends">Weekends</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Project Interest
                    </label>
                    <select
                      name="projectInterest"
                      value={formData.projectInterest}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="machine-learning">
                        Machine Learning Models
                      </option>
                      <option value="data-pipeline">
                        Data Pipeline Enhancement
                      </option>
                      <option value="neural-network">
                        Neural Network Architecture
                      </option>
                      <option value="ai-research">
                        AI Research Implementation
                      </option>
                      <option value="model-optimization">
                        Model Optimization
                      </option>
                      <option value="experiment-framework">
                        Experiment Framework
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      How would you like to contribute?
                    </label>
                    <textarea
                      name="contribution"
                      value={formData.contribution}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Describe how you'd like to contribute..."
                    />
                    {formErrors.contribution && (
                      <p className="mt-1 text-sm text-red-500">
                        {formErrors.contribution}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold py-4 rounded-lg relative overflow-hidden disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        Submit Application
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </span>
                    )}
                  </button>
                </form>

                <AnimatePresence>
                  {showSuccessCard && (
                    <motion.div
                      className="absolute inset-0 bg-gray-900 flex items-center justify-center rounded-2xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        </motion.div>
                        <h4 className="text-xl font-semibold text-white mb-2">
                          Application Submitted!
                        </h4>
                        <p className="text-gray-400">We'll be in touch soon.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Contributors;
