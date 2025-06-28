import ButtonGradient from "./assets/svg/ButtonGradient";
// import Benefits from "./components/Projects";
// import ProjectsGrid from "./components/Projects";
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

const App = () => {
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
