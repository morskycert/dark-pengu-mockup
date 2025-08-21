import HeroSection from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer"
import HowToBuy from './components/HowToBuy'
import Gallery from "./components/Gallery"
import FAQ from "./components/FAQ"
import Marquess from "./components/Marquess"


export default function Home() {
  
  return (
    <>
      <HeroSection/>
      <About/>
      <Marquess speed={100} />
      <HowToBuy/>
      <Marquess speed={100} reverse={true}/>
      <FAQ/>
      <Gallery/>
      <Footer/>
    </>
  );
}
