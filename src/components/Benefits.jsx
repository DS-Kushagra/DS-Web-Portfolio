import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Have a look at my Recent Projects!!"
        />
        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] rounded-xl overflow-hidden group"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              {/* Hover Background Animation */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-1"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              ></div>

              {/* Animated border gradient */}
              <div
                className={`
                absolute -inset-[1px] rounded-[24px]
                bg-gradient-to-r ${item.borderColor}
                opacity-0 group-hover:opacity-100
                blur-sm group-hover:blur
                transition-all duration-500
                animate-gradient-xy
              `}
              />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col min-h-[22rem] p-[2.4rem] bg-gradient-to-t from-black/60 to-black/30 rounded-xl transition-transform duration-300 group-hover:scale-105">
                <h5 className="h5 mb-5 text-white group-hover:text-color-1 transition-colors duration-300">
                  {item.title}
                </h5>
                <p className="body-2 mb-6 text-gray-300">{item.text}</p>

                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${
                    item.status === "done"
                      ? "bg-[#1B3B31] text-[#29A381]"
                      : "bg-[#2A2B23] text-[#FFB224]"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full ${
                        item.status === "done"
                          ? "bg-[#29A381]"
                          : "bg-[#FFB224] animate-ping opacity-75"
                      }`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        item.status === "done" ? "bg-[#29A381]" : "bg-[#FFB224]"
                      }`}
                    ></span>
                  </span>
                  <span>
                    {item.status === "done" ? "Completed" : "In Progress"}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                    className="rounded-full border-2 border-white"
                  />
                  {item.sourceCodeUrl && (
                    <div className="ml-auto flex items-center group cursor-pointer">
                      <a
                        href={item.sourceCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-code text-xs font-bold text-color-1 uppercase tracking-wider transition-transform hover:translate-x-1"
                      >
                        Source Code
                      </a>
                      <Arrow className="ml-2 text-color-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  )}
                </div>
              </div>

              {/* Gradient and Clip Path */}
              {item.light && <GradientLight />}
              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              ></div>
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
