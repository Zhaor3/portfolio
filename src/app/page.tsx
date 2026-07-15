import AuroraBackground from '@/components/AuroraBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import VehicleBuilds from '@/components/VehicleBuilds';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="relative" tabIndex={-1}>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <VehicleBuilds />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
