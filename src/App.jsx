import React, { useState, useEffect } from "react";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Collaboration from "./components/Collaboration";
import Contributors from "./components/Contributors";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";
import Hero from "./components/Hero";
import Pricing from "./components/Publications";
import Services from "./components/Skills";
import ProjectsGrid from "./components/Projects";
import ClickSpark from "./components/ClickSpark";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoadingComplete} />;
  }

  return (
    <ClickSpark
      sparkColor="#00d4ff"
      sparkSize={12}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <About />
        <ProjectsGrid />
        <Collaboration />
        <Services />
        <Pricing />
        <Contributors />
        <Footer />
      </div>

      <ButtonGradient />
    </ClickSpark>
  );
};

export default App;
