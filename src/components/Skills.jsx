import React, { useEffect, useRef, useState } from 'react';

const skillGroups = [
  {
    category: 'Frontend',
    accent: 'from-cyan-400 to-blue-500',
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'React JS', level: 80 },
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 88 },
      { name: 'Tailwind CSS', level: 78 },
    ],
  },
  {
    category: 'Backend',
    accent: 'from-violet-500 to-fuchsia-500',
    skills: [
      { name: 'Java', level: 50 },
      { name: 'MySQL', level: 80 },
      { name: 'Spring Boot', level: 65 },
      { name: 'REST APIs', level: 72 },
      
    ],
  },
  {
    category: 'Tools & Technologies',
    accent: 'from-amber-400 to-orange-500',
    skills: [
      { name: 'VS Code', level: 92 },
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 78 },
      { name: 'Spring Tool Suite', level: 68 },
      { name: 'PostgreSQL', level: 60 },
    ],
  },
];


function SkillBar({ name, level, accent, animate, delay }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
      </div>
      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${accent}`}
          style={{
            width: animate ? `${level}%` : '0%',
            transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, accent, skills, animate, groupDelay }) {
  return (
    <div
      className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors duration-300"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${groupDelay}ms, transform 0.6s ease ${groupDelay}ms, border-color 0.3s ease`,
      }}
    >
      {/* blueprint corner marks */}
      <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm" />
      <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 rounded-br-sm" />

      <h3
        className={`text-sm font-semibold uppercase tracking-widest mb-6 bg-gradient-to-r ${accent} bg-clip-text text-transparent`}
      >
        {category}
      </h3>

      {skills.map((s, i) => (
        <SkillBar key={s.name} {...s} accent={accent} animate={animate} delay={i * 100} />
      ))}
    </div>
  );
}

function Skills() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-28 bg-[#05050f] overflow-hidden">
      {/* Ambient orbs, consistent with the rest of the page */}
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-violet-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 w-56 h-56 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6" ref={sectionRef}>
        {/* Section header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-amber-400 text-sm font-mono tracking-[0.3em] uppercase mb-3">
            My Stack Tech
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Skills &amp;{' '}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
        </div>

        {/* Skill cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} {...group} animate={animate} groupDelay={i * 150} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;