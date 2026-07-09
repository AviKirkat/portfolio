import React, { useEffect, useRef, useState } from 'react';

// Replace with your real photo import/path, e.g. import photo from '../images/photo.png';
const PHOTO_SRC = '/images/photo.png';

const skills = [
  { name: 'JavaScript', level: 85 },
  { name: 'ReactJS', level: 80 },
  { name: 'Core Java', level: 75 },
  { name: 'MySQL', level: 78 },
  { name: 'HTML5', level: 90 },
  { name: 'CSS', level: 88 },
];

const education = [
  {
    year: '2018',
    title: 'HSC',
    place: 'Maharashtra State Board',
    score: '68.62%',
    scoreValue: 68.62,
  },
  {
    year: '2018 — 2022',
    title: 'BE, Mechanical Engineering',
    place: 'Savitribai Phule Pune University',
    score: '80.82%',
    scoreValue: 80.82,
  },
  {
    year: '2023 — 2024',
    title: 'PG-DAC',
    place: 'Center For Development Of Advanced Computing (C-DAC)',
    score: 'Completed',
    scoreValue: 100,
  },
];

/** Small hook: fires `true` once the element scrolls into view. */
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

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-1.5 font-mono text-xs">
        <span className="text-slate-300 tracking-wide group-hover:text-cyan-300 transition-colors">
          {name}
        </span>
        <span className="text-slate-500">{level}%</span>
      </div>
      <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-cyan-400 to-violet-500"
          style={{
            width: inView ? `${level}%` : '0%',
            transition: `width 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function TimelineItem({ item, isLast, inView, delay }) {
  return (
    <div className="relative pl-8">
      {/* dimension-line style connector, like a technical drawing */}
      {!isLast && (
        <span className="absolute left-[7px] top-4 bottom-[-28px] w-px bg-gradient-to-b from-amber-400/60 via-white/15 to-transparent" />
      )}
      <span
        className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-amber-400/70 bg-[#050510] transition-transform duration-500"
        style={{ transform: inView ? 'scale(1)' : 'scale(0)', transitionDelay: `${delay}ms` }}
      />
      <span
        className="absolute left-[4px] top-[9px] w-[7px] h-[7px] rounded-full bg-amber-400 transition-opacity duration-500"
        style={{ opacity: inView ? 1 : 0, transitionDelay: `${delay + 200}ms` }}
      />

      <p className="font-mono text-[11px] tracking-[0.2em] text-amber-400/80 uppercase mb-1">
        {item.year}
      </p>
      <h4 className="text-slate-100 font-semibold text-base mb-0.5">{item.title}</h4>
      <p className="text-slate-500 text-sm mb-1">{item.place}</p>
      <p className="text-cyan-400 font-mono text-xs">{item.score}</p>
    </div>
  );
}

function About() {
  const [skillsRef, skillsInView] = useInView(0.3);
  const [timelineRef, timelineInView] = useInView(0.2);
  const [photoRef, photoInView] = useInView(0.3);

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden bg-[#050510]"
    >
      {/* Ambient background, echoing Hero but amber-tinted to signal the engineering thread */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/5 w-80 h-80 rounded-full bg-violet-600/15 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <Reveal className="text-center mb-16">
          <p className="text-cyan-400 text-sm font-mono tracking-[0.3em] uppercase mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              From Blueprints to Code
            </span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[minmax(0,400px)_1fr] gap-14 items-start">
          {/* Photo, framed like a technical drawing sheet */}
          <Reveal delay={200}>
            <div ref={photoRef} className="relative mx-auto md:mx-0 w-74 md:w-full max-w-xl">
              <div
                className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] bg-gradient-to-br from-white/5 to-transparent transition-transform duration-700"
                style={{
                  transform: photoInView ? 'rotate(0deg) scale(1)' : 'rotate(-3deg) scale(0.96)',
                }}
              >
                <img
                  src={PHOTO_SRC}
                  alt="Avinash Kirkat"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center text-6xl font-extrabold text-slate-700">
                  AK
                </div>
              </div>

              {/* blueprint corner marks */}
              <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400/70 rounded-tl-md" />
              <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400/70 rounded-br-md" />

              <div className="mt-5 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-100">Avinash Kirkat</h3>
                <p className="text-slate-500 font-mono text-xs tracking-wide mt-1">
                  Mechanical Engineer → Software Developer
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bio + skills + timeline */}
          <div className="space-y-14">
            <Reveal delay={150}>
              <p className="text-slate-400 text-lg leading-relaxed">
                I graduated as a Mechanical Engineer in 2022, but the precision and
                problem-solving I learned on the drafting table pulled me toward
                Software. After completing PG-DAC at C-DAC at Pune, I now build with{' '}
                <span className="text-cyan-400">React JS</span>, {' '}
                <span className="text-cyan-400">JavaScript</span>, {' '}
                <span className="text-cyan-400">HTML5</span>, {' '}
                <span className="text-cyan-400">CSS</span>, {' '}and{' '}
                <span className="text-cyan-400">Core Java</span>, backend by{' '}
                <span className="text-cyan-400">Java</span>, {' '}
                <span className="text-cyan-400">Spring Boot</span>, and{' '}
                <span className="text-cyan-400">MySQL</span> — bringing an engineer's
                discipline to every interface I ship.
              </p>
            </Reveal>


            {/* Education timeline */}
            <Reveal delay={250}>
              <div ref={timelineRef}>
                <p className="text-slate-300 font-semibold mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Education
                </p>
                <div className="space-y-8">
                  {education.map((item, i) => (
                    <TimelineItem
                      key={item.title}
                      item={item}
                      isLast={i === education.length - 1}
                      inView={timelineInView}
                      delay={i * 200}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;