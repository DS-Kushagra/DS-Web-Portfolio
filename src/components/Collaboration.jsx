import { useState, useEffect } from "react";
import { brainwaveSymbol, check } from "../assets";
import { collabApps, collabContent } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";

const Collaboration = () => {
  const [copyText, setCopyText] = useState("Copy My Email");
  const email = "kushagraagrawal128@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyText("Email Copied! ✓");
      setTimeout(() => setCopyText("Copy My Email"), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
      setCopyText("Copy Failed!");
      setTimeout(() => setCopyText("Copy My Email"), 2000);
    }
  };

  return (
    <Section crosses>
      <div className="container lg:flex">
        {/* Left Section */}
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            Thinking of starting a new project.
            <br />
            Wanna join?
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item, index) => (
              <li
                key={item.id}
                className={`mb-3 py-3 transform transition-all duration-500 ease-in-out opacity-100 translate-y-0 animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="check" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button
            onClick={handleCopyEmail}
            className="transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
          >
            {copyText}
          </Button>
        </div>

        {/* Right Section */}
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            If you're interested in collaborating or starting a new project
            together, feel free to reach out! Just click the button to copy my
            email address.
          </p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-75 md:scale-100 animate-fade-in">
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full animate-pulse">
                  <img
                    src={brainwaveSymbol}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 45
                    } transition-transform duration-300 hover:scale-110 hover:shadow-lg`}
                  >
                    <img
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
