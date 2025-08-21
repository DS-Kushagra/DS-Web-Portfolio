import React, { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  TrendingUp,
  Code,
  Users,
  Briefcase,
} from "lucide-react";

const WorkExperience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const experiences = [
    {
      id: 1,
      company: "TechCorp Innovation",
      position: "Senior Full Stack Developer",
      duration: "2023 - Present",
      location: "San Francisco, CA",
      type: "Full-time",
      website: "techcorp.com",
      description:
        "Leading development of scalable web applications serving 1M+ users. Architected microservices infrastructure and mentored junior developers.",
      achievements: [
        "Increased application performance by 300% through optimization",
        "Led team of 8 developers on flagship product launch",
        "Implemented CI/CD pipeline reducing deployment time by 75%",
        "Architected cloud infrastructure handling 10M+ requests daily",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "Docker",
        "GraphQL",
      ],
      projects: 15,
      impact: "300% Performance Boost",
      color: "from-blue-600 via-purple-600 to-indigo-800",
      icon: <Code className="w-6 h-6" />,
    },
    {
      id: 2,
      company: "Digital Dynamics",
      position: "Frontend Team Lead",
      duration: "2021 - 2023",
      location: "New York, NY",
      type: "Full-time",
      website: "digitaldynamics.io",
      description:
        "Spearheaded frontend architecture and user experience initiatives for enterprise clients. Built responsive applications with modern frameworks.",
      achievements: [
        "Delivered 25+ client projects with 100% on-time completion",
        "Reduced bundle size by 60% through code optimization",
        "Established design system adopted across 3 product lines",
        "Mentored 12 developers in frontend best practices",
      ],
      technologies: [
        "Vue.js",
        "React",
        "Tailwind CSS",
        "Webpack",
        "Jest",
        "Figma",
      ],
      projects: 25,
      impact: "100% On-time Delivery",
      color: "from-emerald-600 via-teal-600 to-cyan-800",
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: 3,
      company: "StartupLab",
      position: "Full Stack Developer",
      duration: "2019 - 2021",
      location: "Austin, TX",
      type: "Full-time",
      website: "startuplab.tech",
      description:
        "Developed MVP products for early-stage startups. Worked directly with founders to transform ideas into scalable solutions.",
      achievements: [
        "Built 8 MVP applications from concept to launch",
        "Implemented real-time features serving 50K+ concurrent users",
        "Contributed to $2M seed funding through technical demos",
        "Established development workflows for rapid prototyping",
      ],
      technologies: [
        "JavaScript",
        "Python",
        "MongoDB",
        "Redis",
        "Socket.io",
        "Heroku",
      ],
      projects: 8,
      impact: "$2M Funding Raised",
      color: "from-orange-600 via-red-600 to-pink-800",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      id: 4,
      company: "FreelanceHub",
      position: "Independent Developer",
      duration: "2018 - 2019",
      location: "Remote",
      type: "Freelance",
      website: "freelancehub.dev",
      description:
        "Provided custom web development solutions for small to medium businesses. Specialized in e-commerce and business automation.",
      achievements: [
        "Completed 40+ projects with 5-star client rating",
        "Generated $500K+ revenue for client businesses",
        "Built automated systems reducing manual work by 80%",
        "Maintained 95% client retention rate",
      ],
      technologies: [
        "PHP",
        "MySQL",
        "WordPress",
        "Shopify",
        "JavaScript",
        "CSS3",
      ],
      projects: 40,
      impact: "$500K+ Client Revenue",
      color: "from-violet-600 via-purple-600 to-fuchsia-800",
      icon: <Briefcase className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentExperience = experiences[activeTab];

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden py-20 px-4"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rotate-12 transform"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 -rotate-12 transform"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* Mouse Follower */}
        <div
          className="absolute pointer-events-none w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-6">
            <Award className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-300 font-medium">
              Professional Journey
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            Work Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my professional journey, showcasing
            impactful contributions and technical excellence across diverse
            environments
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Calendar className="w-6 h-6 text-blue-400 mr-3" />
                Timeline
              </h3>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`group relative cursor-pointer transition-all duration-500 ${
                      activeTab === index
                        ? "transform translate-x-2"
                        : "hover:translate-x-1"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-transparent"></div>

                    {/* Timeline Node */}
                    <div
                      className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        activeTab === index
                          ? "bg-blue-400 border-blue-400 shadow-lg shadow-blue-400/50"
                          : "bg-gray-800 border-gray-600 group-hover:border-blue-500"
                      }`}
                    ></div>

                    {/* Content Card */}
                    <div
                      className={`ml-12 p-6 rounded-xl border transition-all duration-500 backdrop-blur-sm ${
                        activeTab === index
                          ? `bg-gradient-to-r ${exp.color} border-white/20 shadow-2xl shadow-blue-500/20`
                          : "bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800/70"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              activeTab === index
                                ? "bg-white/20"
                                : "bg-gray-700"
                            }`}
                          >
                            {exp.icon}
                          </div>
                          <div>
                            <h4
                              className={`font-bold text-lg ${
                                activeTab === index
                                  ? "text-white"
                                  : "text-gray-200"
                              }`}
                            >
                              {exp.company}
                            </h4>
                            <p
                              className={`text-sm ${
                                activeTab === index
                                  ? "text-blue-100"
                                  : "text-gray-400"
                              }`}
                            >
                              {exp.position}
                            </p>
                          </div>
                        </div>
                        {activeTab === index && (
                          <ChevronRight className="w-5 h-5 text-white animate-pulse" />
                        )}
                      </div>

                      <div className="flex items-center text-sm space-x-4">
                        <span
                          className={`flex items-center ${
                            activeTab === index
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.duration}
                        </span>
                        <span
                          className={`${
                            activeTab === index
                              ? "text-blue-100"
                              : "text-gray-400"
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-3">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              {/* Company Header */}
              <div
                className={`p-8 rounded-2xl bg-gradient-to-r ${currentExperience.color} mb-8 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {currentExperience.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">
                          {currentExperience.company}
                        </h3>
                        <p className="text-xl text-blue-100">
                          {currentExperience.position}
                        </p>
                      </div>
                    </div>
                    <a
                      href={`https://${currentExperience.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Visit</span>
                    </a>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-200" />
                      <span className="text-blue-100">
                        {currentExperience.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-200" />
                      <span className="text-blue-100">
                        {currentExperience.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-200" />
                      <span className="text-blue-100">
                        {currentExperience.impact}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>
              </div>

              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Code className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {currentExperience.projects}+
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Projects Delivered
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Successfully completed and deployed
                  </p>
                </div>

                <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <Award className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-3xl font-bold text-white">
                      {currentExperience.achievements.length}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    Key Achievements
                  </h4>
                  <p className="text-gray-400 text-sm">Major accomplishments</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-white mb-4">
                  Role Overview
                </h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {currentExperience.description}
                </p>
              </div>

              {/* Key Achievements */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-white mb-6">
                  Key Achievements
                </h4>
                <div className="grid gap-4">
                  {currentExperience.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/10 ${
                        isVisible ? "animate-fade-in" : ""
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg mt-1 flex-shrink-0">
                          <ChevronRight className="w-4 h-4 text-blue-400" />
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-2xl font-bold text-white mb-6">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-3">
                  {currentExperience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-gray-200 text-sm font-medium border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-default ${
                        isVisible ? "animate-fade-in" : ""
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default WorkExperience;
