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
import { useEffect, useState } from "react";

const Services = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section id="skills">
      <div className="container">
        <Heading
          title="Data Science Expertise & Skills"
          text="Transforming complex data into actionable insights through advanced analytics"
        />

        <div className="relative">
          {/* Main Skills Section */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div
              className={`absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto transition-transform duration-700 ease-out`}
              style={{
                // transform: `translateY(${scrollY * 0.1}px)`,
                transform: `scale(${1 + scrollY * 0.00008})`,
                top: 0,
                left: 0,
                // position: "fixed", // Keep the image fixed in place
                zIndex: -1, // Ensure it stays behind the content
                objectFit: "cover", // Ensure the image scales properly
              }}
            >
              <img
                className="w-full h-full object-contain md:object-right" // Prevent image cropping
                width={800}
                alt="Data Science Visualization"
                height={730}
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Core Competencies</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Specialized in machine learning, statistical analysis, and data
                visualization
              </p>
              <ul className="body-2">
                {dataAnalysisSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6 transition-transform duration-500 hover:translate-x-2"
                  >
                    <img width={24} height={24} src={check} alt="check" />
                    <p className="ml-4">{skill}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          {/* Project Highlights Grid */}
          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            {/* Data Analysis Section */}
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out"
                style={{
                  transform: `scale(${1 + scrollY * 0.00015})`, // Reduced zoom effect
                }}
              >
                <img
                  src={service2}
                  className="h-full w-full object-contain" // Prevent image cropping
                  width={600}
                  height={700}
                  alt="Data Analysis Visualization"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">{projectHighlights[0].title}</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  {projectHighlights[0].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectHighlights[0].skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-n-6 rounded-full text-xs transition-transform duration-500 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Machine Learning Section */}
            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">{projectHighlights[2].title}</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  {projectHighlights[2].description}
                </p>

                <ul className="flex items-center justify-between mb-10">
                  {dataScienceTools.map((tool, index) => (
                    <li
                      key={tool.id}
                      className={`rounded-2xl flex items-center justify-center transition-transform duration-500 hover:scale-110 ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-n-6 md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]"
                            : ""
                        }
                      >
                        <img
                          src={tool.icon}
                          width={tool.width}
                          height={tool.height}
                          alt={tool.title}
                          className="transition-transform duration-300 transform hover:scale-110" // Hover zoom for icons
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {projectHighlights[2].skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-n-6 rounded-full text-xs transition-transform duration-500 hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                {/* Applying the fade-in animation to the third image only */}
                <img
                  src={service3}
                  className="w-full h-full object-contain transition-transform duration-700 hover:scale-105 animate-fade-in" // Apply fade-in animation here
                  width={520}
                  height={400}
                  alt="Deep Learning Visualization"
                />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
