import AuroraBackground from '@/components/AuroraBackground';
import GlobalBlueprint from '@/components/GlobalBlueprint';
import GlobalCursor from '@/components/GlobalCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import FeaturedShowcase from '@/components/FeaturedShowcase';
import VehicleBuilds from '@/components/VehicleBuilds';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <GlobalBlueprint />
      <GlobalCursor />
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Experience />
        <FeaturedShowcase />
        <Projects />
        <VehicleBuilds />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
