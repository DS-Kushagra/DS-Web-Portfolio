import { useEffect, useState, useCallback, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useInView as useFramerInView,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "../assets";
import {
  dataAnalysisSkills,
  dataScienceTools,
  projectHighlights,
} from "../constants";
import { Gradient } from "./design/Services";
import Generating from "./Generating";
import {
  Brain,
  Database,
  LineChart,
  Network,
  Code2,
  FlaskRound as Flask,
  Cpu,
  Bot,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  GitBranch,
  Star,
  ArrowRight,
  Zap,
  Activity,
} from "lucide-react";
import { useHref } from "react-router-dom";

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const isInView = useFramerInView(cardRef);

  return (
    <motion.li
      ref={cardRef}
      initial={{ x: -20, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{ x: 8, scale: 1.02 }}
      className="flex items-start py-4 border-t border-n-6 transition-all duration-300 group cursor-pointer"
    >
      <div className="relative flex-shrink-0 p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <img
          width={24}
          height={24}
          src={check}
          alt="check"
          className="relative z-10 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="ml-4">
        <p className="text-n-3 group-hover:text-n-1 transition-colors duration-300 font-medium">
          {skill}
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ delay: index * 0.2, duration: 0.8 }}
          className="h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 mt-2"
        />
      </div>
    </motion.li>
  );
};

const SkillMeter = ({ skill, level, color, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const progress = useSpring(0, { stiffness: 100, damping: 20 });
  const width = useTransform(progress, [0, 100], ["0%", `${level}%`]);

  useEffect(() => {
    if (inView) {
      progress.set(level);
    }
  }, [inView, level, progress]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="mb-6 relative group"
    >
      <motion.div
        className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative">
        <div className="flex justify-between mb-2">
          <span className="text-n-3 font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            {skill}
          </span>
          <motion.span
            className="text-n-1 font-medium"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.3 }}
          >
            {level}%
          </motion.span>
        </div>
        <div className="h-3 bg-n-6 rounded-full overflow-hidden p-0.5">
          <motion.div
            style={{ width }}
            className={`h-full ${color} rounded-full relative group-hover:brightness-110 transition-all duration-300`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{
                x: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="relative pl-8 pb-8 group"
    >
      <div className="absolute left-0 top-0 h-full w-px bg-n-6 group-hover:bg-gradient-to-b group-hover:from-blue-500 group-hover:to-purple-500 transition-colors duration-300" />
      <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-n-6 -translate-x-[5px] group-hover:bg-blue-500 transition-colors duration-300">
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="pt-1">
        <span className="block text-sm text-blue-500 font-medium mb-2">
          {year}
        </span>
        <h3 className="text-lg font-bold text-n-1 mb-2 group-hover:text-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500">
          {title}
        </h3>
        <p className="text-n-3">{description}</p>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useFramerInView(cardRef);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2 }}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"
        animate={{
          scale: isHovered ? 1.02 : 1,
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative p-6 bg-n-7/90 backdrop-blur-sm rounded-3xl border border-n-1/10 overflow-hidden transition-all duration-300 hover:border-n-1/20">
        <div className="flex items-center mb-4">
          <motion.div
            className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {getProjectIcon(project.icon)}
          </motion.div>
          <h3 className="ml-4 text-xl font-semibold text-n-1">
            {project.title}
          </h3>
        </div>
        <p className="text-n-3 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="px-3 py-1 bg-n-6 rounded-full text-xs font-medium text-n-1 transition-all duration-300 hover:bg-n-5"
            >
              {skill}
            </motion.span>
          ))}
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 flex items-center justify-center bg-n-8/90 backdrop-blur-sm"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Navigate to project details page
                  window.open(project.url, "_blank");
                  // window.location.href = project.url;
                  // setIsHovered(false);

                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium group"
              >
                <span className="flex items-center gap-2">
                  View Details
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const getProjectIcon = (iconName) => {
  const icons = {
    brain: <Brain className="w-6 h-6 text-blue-500" />,
    database: <Database className="w-6 h-6 text-purple-500" />,
    chart: <LineChart className="w-6 h-6 text-green-500" />,
    network: <Network className="w-6 h-6 text-pink-500" />,
    code: <Code2 className="w-6 h-6 text-yellow-500" />,
    flask: <Flask className="w-6 h-6 text-cyan-500" />,
  };
  return icons[iconName] || <Star className="w-6 h-6 text-blue-500" />;
};

const Services = () => {
  const { scrollY } = useScroll();
  const [currentSkillSet, setCurrentSkillSet] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const scale1 = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const scale2 = useTransform(scrollY, [0, 1000], [1, 1.15]);

  const skillSets = [
    {
      title: "Machine Learning",
      skills: [
        {
          name: "Deep Learning",
          level: 40,
          color: "bg-gradient-to-r from-blue-500 to-blue-600",
        },
        {
          name: "Neural Networks",
          level: 40,
          color: "bg-gradient-to-r from-purple-500 to-purple-600",
        },
        {
          name: "Algorithms",
          level: 70,
          color: "bg-gradient-to-r from-pink-500 to-pink-600",
        },
        {
          name: "NLP",
          level: 40,
          color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
        },
      ],
    },
    {
      title: "Data Engineering",
      skills: [
        {
          name: "ETL Pipelines",
          level: 65,
          color: "bg-gradient-to-r from-green-500 to-green-600",
        },
        {
          name: "Big Data",
          level: 70,
          color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
        },
        {
          name: "Data Warehousing",
          level: 50,
          color: "bg-gradient-to-r from-orange-500 to-orange-600",
        },
        {
          name: "Data Collection",
          level: 75,
          color: "bg-gradient-to-r from-red-500 to-red-600",
        },
      ],
    },
    {
      title: "Analytics",
      skills: [
        {
          name: "Statistical Analysis",
          level: 90,
          color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
        },
        {
          name: "Data Visualization",
          level: 95,
          color: "bg-gradient-to-r from-teal-500 to-teal-600",
        },
        {
          name: "Predictive Modeling",
          level: 85,
          color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
        },
        {
          name: "Feature Engineering",
          level: 80,
          color: "bg-gradient-to-r from-lime-500 to-lime-600",
        },
      ],
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Advanced Machine Learning Specialization",
      description:
        "Mastering deep learning and neural networks",
    },
    {
      year: "2024",
      title: "Started preps for Data Science",
      description: "Started exploring & learning everything in Data Science",
    },
    {
      year: "2023",
      title: "Analytics Foundation",
      description:
        "Established core competencies in statistical analysis and visualization",
    },
  ];

  return (
    <Section id="skills" className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            title="Data Science Expertise & Skills"
            text="Transforming complex data into actionable insights through advanced analytics"
          />
        </motion.div>

        {/* Skill Metrics Section */}
        <div className="mb-20 relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="relative bg-n-8/50 backdrop-blur-xl rounded-3xl border border-n-1/10 p-8 lg:p-12">
            <div className="flex justify-between items-center mb-8">
              <motion.h3
                className="text-2xl font-bold text-n-1 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <Activity className="w-6 h-6 text-blue-500" />
                {skillSets[currentSkillSet].title}
              </motion.h3>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrentSkillSet((prev) =>
                      prev === 0 ? skillSets.length - 1 : prev - 1
                    )
                  }
                  className="p-2 bg-n-7 rounded-full hover:bg-n-6 transition-colors duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setCurrentSkillSet((prev) =>
                      prev === skillSets.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-2 bg-n-7 rounded-full hover:bg-n-6 transition-colors duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSkillSet}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {skillSets[currentSkillSet].skills.map((skill, index) => (
                  <SkillMeter
                    key={skill.name}
                    skill={skill.name}
                    level={skill.level}
                    color={skill.color}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl" />
          <div className="relative bg-n-8/50 backdrop-blur-xl rounded-3xl border border-n-1/10 p-8 lg:p-12">
            <motion.h3
              className="text-2xl font-bold text-n-1 mb-8 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <GitBranch className="w-6 h-6 text-blue-500" />
              Learning Journey
            </motion.h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <TimelineItem key={index} {...item} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projectHighlights.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Core Competencies */}
        <div className="relative" ref={ref}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="relative z-1 flex flex-col lg:flex-row items-center min-h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem] bg-gradient-to-br from-n-8/50 to-n-8/30 backdrop-blur-sm"
          >
            <motion.div
              style={{ scale: scale1 }}
              className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto"
            >
              <img
                className="w-full h-full object-contain sm:object-cover md:object-right pt-10 sm:pt-20 lg:pt-0"
                width={800}
                height={730}
                src={service1}
                alt="Data Science Visualization"
                loading="lazy"
              />
            </motion.div>

            <div className="relative z-1 max-w-[17rem] mt-auto lg:mt-0 lg:ml-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-2xl font-bold mb-4 text-n-1 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500" />
                  Core Competencies
                </h4>
                <p className="text-n-3 mb-12">
                  Specialized in machine learning, statistical analysis, and
                  data visualization
                </p>
                <ul className="space-y-2">
                  {dataAnalysisSkills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} index={index} />
                  ))}
                </ul>
              </motion.div>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg:right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </motion.div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
