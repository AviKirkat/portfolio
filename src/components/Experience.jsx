import React, { useEffect, useRef, useState } from 'react';

const company = {
  name: 'HealthPlanet Edutech',
  duration: '8 mos',
  location: 'Pune City, Maharashtra, India',
  mode: 'On-site',
};

const roles = [
  {
    title: 'Software Engineer',
    type: 'Full-time',
    period: 'Mar 2026 — Present',
    duration: null,
    current: true,
  },
  {
    title: 'Junior Software Engineer',
    type: 'Internship',
    period: 'Dec 2025 — Feb 2026',
    duration: '3 mos',
    current: false,
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function RoleItem({ role, isLast, inView, delay }) {
  return (
    <div className="relative pl-7 sm:pl-8">
      {!isLast && (
        <span className="absolute left-[7px] top-4 bottom-[-20px] w-px bg-gradient-to-b from-amber-400/50 via-white/15 to-transparent" />
      )}

      <span
        className={`absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 ${
          role.current ? 'border-cyan-400' : 'border-amber-400/70'
        } bg-[#050510] transition-transform duration-500`}
        style={{ transform: inView ? 'scale(1)' : 'scale(0)', transitionDelay: `${delay}ms` }}
      >
        {role.current && (
          <span className="absolute inset-0.5 rounded-full bg-cyan-400 animate-ping" />
        )}
      </span>
      <span
        className={`absolute left-[4px] top-[5px] w-[7px] h-[7px] rounded-full ${
          role.current ? 'bg-cyan-400' : 'bg-amber-400'
        } transition-opacity duration-500`}
        style={{ opacity: inView ? 1 : 0, transitionDelay: `${delay + 200}ms` }}
      />

      <div className="flex flex-wrap items-baseline gap-x-2 mb-0.5">
        <h4 className="text-slate-100 font-semibold text-sm sm:text-base">{role.title}</h4>
        {role.current && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
            Current
          </span>
        )}
      </div>
      <p className="text-slate-500 text-xs sm:text-sm mb-1">{role.type}</p>
      <p className="font-mono text-[11px] sm:text-xs text-amber-400/80">
        {role.period} · {role.duration}
      </p>
    </div>
  );
}

function Experience() {
  const [sectionRef, inView] = useInView(0.2);

  return (
    <section id="experience" className="relative py-16 sm:py-20 md:py-28 bg-[#05050f] overflow-hidden">
      {/* Ambient orbs, consistent with the rest of the site */}
      <div className="absolute top-0 left-1/4 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-cyan-500/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-violet-600/10 blur-[90px] sm:blur-[100px] pointer-events-none" />

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6" ref={sectionRef}>
        {/* Header */}
        <div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="text-cyan-400 text-xs sm:text-sm font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3">
            Where I've Worked
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        {/* Company card — full width on mobile, comfortably inset on larger screens */}
        <div
          className="relative bg-white/[0.03] max-w-2xl mx-auto border border-white/10 rounded-2xl p-5 sm:p-7 md:p-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 100ms, transform 0.7s ease 100ms',
          }}
        >
          {/* blueprint corner marks */}
          <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm" />
          <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 rounded-br-sm" />

          {/* Company header */}
          <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-11 h-11 sm:w-14 sm:h-14 p-1 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center overflow-hidden">
              <img
                src="/images/android-chrome-192x192.png"
                alt="HealthPlanet Edutech logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-slate-100">{company.name}</h3>
              <p className="text-slate-500 text-xs sm:text-sm">{company.duration}</p>
              <p className="text-slate-500 text-xs sm:text-sm">
                {company.location} · {company.mode}
              </p>
            </div>
          </div>

          {/* Role timeline */}
          <div className="space-y-6 sm:space-y-8 pl-1">
            {roles.map((role, i) => (
              <RoleItem
                key={role.title}
                role={role}
                isLast={i === roles.length - 1}
                inView={inView}
                delay={i * 200 + 200}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;