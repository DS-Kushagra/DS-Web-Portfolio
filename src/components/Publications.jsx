import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import { LeftLine, RightLine } from "./design/Pricing";

const Publications = () => {
  const publications = [
    {
      id: 1,
      type: "Publication",
      title: "My Journey into the World of Data",
      author: "Author-Kushagra",
      year: "2024",
      description:
        "Briefly described how I discovered my passion for data analytics and turned it into a promising career path. .",
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
        " The blog captures the milestones, challenges, and lessons that have shaped my path.",
      link: "https://medium.com/@ds-kushagra/my-data-science-journey-so-far-a-reflection-of-growth-and-achievement-ac9a3e1d0052",
      tags: ["Statistical Analysis", "Data Mining"],
    },
  ];

  return (
    <Section className="overflow-hidden" id="publications">
      <div className="container relative z-2">
        {/* Decorative Background */}
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1 animate-spin-slow"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full opacity-50 animate-pulse"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        {/* Heading */}
        <Heading tag="My Publications" title="A showcase of my journey" />

        {/* Publications Grid */}
        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="relative p-6 rounded-3xl border border-n-1/10 bg-n-8/90 backdrop-blur-sm transform transition-transform hover:scale-105 hover:border-primary-500"
            >
              <div className="flex flex-col h-full">
                {/* Type and Year */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-primary-500 font-code">
                    {pub.type}
                  </span>
                  <span className="text-sm text-n-3">{pub.year}</span>
                </div>

                {/* Title and Journal */}
                <h4 className="h5 mb-4 transition-colors hover:text-primary-500">
                  {pub.title}
                </h4>
                <p className="text-sm text-n-3 mb-3 italic">{pub.author}</p>
                <p className="body-2 text-n-3 mb-4 flex-grow">
                  {pub.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pub.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-n-6 hover:bg-primary-500 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link to Read Paper */}
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-400 transition-all group"
                >
                  Read Paper
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          <LeftLine />
          <RightLine />
        </div>

        {/* Link to View All */}
        <div className="flex justify-center mt-10">
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b hover:text-primary-500 transition-colors"
            href="https://medium.com/@ds-kushagra"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all publications on Medium Platform
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Publications;
