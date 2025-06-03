import ButtonGradient from "./assets/svg/ButtonGradient";
// import Benefits from "./components/Projects";
// import ProjectsGrid from "./components/Projects";
import Collaboration from "./components/Collaboration";
import Contributors from "./components/Contributors";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./components/About";
import Hero from "./components/Hero";
import Pricing from "./components/Publications"
import Services from "./components/Skills";
import ProjectsGrid from "./components/Projects";

const App = () => {
  return (
    <>
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
    </>
  );
};

export default App;
