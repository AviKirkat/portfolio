import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certifications from './components/Certifications';
import Experience from './components/Experience';

function App() {
  return (
    <div className="bg-[#050510] min-h-screen font-sans antialiased text-white">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Certifications />
      <Projects />
      <Contact />

    </div>
  );
}

export default App;