import React, { useEffect, useRef, useState } from 'react';

const roles = ['Mechanical Engineer', 'Full-Stack Developer', 'React Developer'];

const chips = [
  { label: 'JavaScript', top: '4%', left: '2%', delay: '0s' },
  { label: 'ReactJS', top: '16%', left: '66%', delay: '0.6s' },
  { label: 'Core Java', top: '70%', left: '0%', delay: '1.1s' },
  { label: 'MySQL', top: '82%', left: '60%', delay: '1.6s' },
];

/** Cycles through role strings with a type / pause / delete rhythm. */
function useTypewriter(words, typeMs = 65, pauseMs = 1400, deleteMs = 35) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeMs);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), deleteMs);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typeMs, pauseMs, deleteMs]);

  return text;
}

function GearGlyph() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <defs>
        <linearGradient id="gearStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* dimension crosshairs */}
      <line x1="200" y1="10" x2="200" y2="70" stroke="#334155" strokeWidth="1" />
      <line x1="200" y1="330" x2="200" y2="390" stroke="#334155" strokeWidth="1" />
      <line x1="10" y1="200" x2="70" y2="200" stroke="#334155" strokeWidth="1" />
      <line x1="330" y1="200" x2="390" y2="200" stroke="#334155" strokeWidth="1" />

      {/* rotating gear outline, drawn on load then spun continuously */}
      <g className="gear-spin" style={{ transformOrigin: '200px 200px' }}>
        <path
          className="gear-draw"
          d="M200 60
             a140 140 0 0 1 24 278
             l6 34 a10 10 0 0 1-10 12h-40a10 10 0 0 1-10-12l6-34
             a140 140 0 0 1-97-56l-33 12a10 10 0 0 1-13-6l-14-38
             a10 10 0 0 1 6-13l33-13
             a140 140 0 0 1 0-113l-33-13a10 10 0 0 1-6-13l14-38
             a10 10 0 0 1 13-6l33 12
             a140 140 0 0 1 97-56l-6-34
             a10 10 0 0 1 10-12h0"
          fill="none"
          stroke="url(#gearStroke)"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 6" />
      </g>

      {/* static center, code glyph */}
      <circle cx="200" cy="200" r="70" fill="#0a0a18" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1" />
      <text
        x="200"
        y="214"
        textAnchor="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="34"
        fontWeight="700"
        fill="#e2e8f0"
      >
        {'</>'}
      </text>
    </svg>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const role = useTypewriter(roles);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050510] py-20 md:py-0"
    >
      <style>{`
        @keyframes gearDraw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
        .gear-draw { stroke-dasharray: 1000; animation: gearDraw 2.4s ease-out forwards; }
        @keyframes gearSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .gear-spin { animation: gearSpin 40s linear infinite; }
        @keyframes chipFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        .chip-float { animation: chipFloat 5s ease-in-out infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .type-caret { animation: blink 0.9s step-end infinite; }
      `}</style>

      {/* Ambient gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 md:w-96 md:h-96 rounded-full bg-violet-600/20 blur-[100px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-80 md:h-80 rounded-full bg-cyan-500/15 blur-[90px] md:blur-[100px]" />
        <div className="absolute top-10 right-1/3 w-48 h-48 md:w-64 md:h-64 rounded-full bg-amber-500/10 blur-[90px] md:blur-[100px]" />
      </div>

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
        {/* Left: content */}
        <div
          className="order-1"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="text-amber-400 text-xs sm:text-sm font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 sm:mb-5">
            Engineering the Web
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 leading-tight">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Avinash Kirkat
            </span>
          </h1>

          <h2 className="min-h-[2.5rem] sm:h-12 md:h-14 text-xl sm:text-2xl md:text-4xl font-bold mb-6 font-mono">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {role}
            </span>
            <span className="type-caret text-cyan-400">|</span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-8 sm:mb-10 leading-relaxed">
            A 2022 mechanical engineering graduate who traded blueprints for
            brackets. I bring an engineer's precision to building clean,
            reliable web experiences with JavaScript, React, and Java.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12">
            <button
              onClick={() => handleScroll('#projects')}
              className="px-8 py-3.5 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xl shadow-violet-700/40"
            >
              View My Work
            </button>
            <button
              onClick={() => handleScroll('#contact')}
              className="px-8 py-3.5 rounded-full font-semibold text-slate-200 border border-white/20 hover:border-cyan-400/50 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* mini tech strip */}
          <div className="flex flex-wrap gap-2 font-mono text-[11px] text-slate-500">
            {['JavaScript', 'React', 'Java', 'MySQL', 'HTML5', 'CSS'].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: animated blueprint gear + floating skill chips — now visible on every screen size */}
        <div
          className="order-2 relative w-full h-[260px] xs:h-[300px] sm:h-[360px] md:h-[420px]"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s ease 0.3s',
          }}
        >
          <GearGlyph />
          {chips.map((c) => (
            <div
              key={c.label}
              className="chip-float absolute px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono text-slate-200 bg-white/5 border border-white/10 backdrop-blur-sm whitespace-nowrap"
              style={{ top: c.top, left: c.left, animationDelay: c.delay }}
            >
              {c.label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator, styled like a dimension mark */}
      <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-500 text-[10px] font-mono tracking-[0.3em]">
        <span>SCROLL</span>
        <div className="relative w-px h-12 bg-gradient-to-b from-amber-400/70 via-slate-500 to-transparent">
          <span className="absolute -left-1 top-0 w-2 h-px bg-amber-400/70" />
          <span className="absolute -left-1 top-1/2 w-2 h-px bg-slate-500" />
        </div>
      </div>
    </section>
  );
}

export default Hero;