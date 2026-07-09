import React, { useRef, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: 'WellKnora',
    type: 'Professional Work',
    desc: 'A platform for coaching, preschool, and daycare services focused on skill development — built and shipped as professional client work.',
    tags: ['React Js', 'Java', 'Spring Boot', 'MySql', 'JavaScript', 'Tailwind CSS', 'HTML5'],
    // Replace with an actual WellKnora screenshot in public/images.
    image: 'images/Screenshot 2026-07-09 105253.png',
    accent: 'from-emerald-400 to-cyan-500',
    border: 'hover:border-emerald-400/40',
    demo: 'https://www.wellknora.com/',
    code: null,
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    type: 'Personal Project',
    desc: 'This site — a fully responsive Personal Portfolio built from scratch with React, JavaScript, Tailwind CSS, and HTML5. Features scroll-triggered animations, a mobile-friendly nav, and sections for skills, experience.',
    tags: ['React Js', 'JavaScript', 'Tailwind CSS', 'HTML5'],
    // Served from public/images — spaces URL-encoded.
    image: '/images/Screenshot%202026-07-07%20154315.png',
    accent: 'from-cyan-400 to-violet-500',
    border: 'hover:border-cyan-400/40',
    demo: 'https://avi-kirkat1003.netlify.app/',
    code: 'https://github.com/AviKirkat/portfolio.git',
  },
  {
    id: 3,
    title: 'E-Commerce Website',
    type: 'Personal Project',
    desc: 'A full-featured e-commerce web app built with React, JavaScript, CSS, and HTML5 — includes product listings, a shopping cart, and a responsive checkout flow designed for a smooth shopping experience across devices.', tags: ['React Js', 'JavaScript', 'CSS', 'HTML5'],
    image: '/images/Screenshot%202024-04-14%20204856.png',
    accent: 'from-amber-400 to-orange-500',
    border: 'hover:border-amber-400/40',
    demo: null,
    code: 'https://github.com/AviKirkat/E-CommersWebsite',
  },
];

function ProjectCard({ project }) {
  const hasLinks = project.demo || project.code;

  return (
    <div
      className={`group relative h-full flex flex-col bg-white/[0.03] border border-white/10 ${project.border} rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-900/20`}
    >
      {/* Top gradient band */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Screenshot preview — fixed height, cropped not stretched */}
      <div className="relative h-44 shrink-0 rounded-xl mb-5 overflow-hidden border border-white/5 bg-white/5">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover object-top"
        />
        {/* type badge */}
        <span
          className={`absolute top-4 right-2 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm border ${project.type === 'Professional Work'
            ? 'bg-slate-900 text-white border-emerald-400/30'
            : 'bg-slate-800 text-white border-white/20'
            }`}
        >
          {project.type}
        </span>
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Spacer pushes links to the bottom so every card's footer lines up */}
      <div className="grow" />

      {/* Links */}
      {hasLinks && (
        <div className="flex gap-3 mt-auto">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 text-center py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r ${project.accent} hover:opacity-90 transition-opacity`}
            >
              Live Demo
            </a>
          )}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 rounded-xl text-sm font-medium text-slate-300 border border-white/15 hover:border-white/30 transition-colors"
            >
              Source Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.proj-card');
    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 100}ms`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="relative py-28 bg-[#070714] overflow-hidden">
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-3">My Work</p>
          <h2 className="text-4xl font-bold text-white">
            Featured{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        {/* Cards grid — items-stretch + h-full on the card makes every
            card in a row match the tallest one, and each grid track is
            an equal fraction of the row width, so cards are uniform
            both in height and width on desktop. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project) => (
            <div key={project.id} className="proj-card h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;