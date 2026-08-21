import { BackgroundMesh } from './components/BackgroundMesh';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Vision } from './components/Vision';
import { Expertise } from './components/Expertise';
import { Enterprise } from './components/Enterprise';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundMesh />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Vision />
        <Expertise />
        <Enterprise />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
