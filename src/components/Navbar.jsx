import React, { useState, useEffect } from 'react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

function GearIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Navbar() {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = links.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a1a]/90 backdrop-blur-xl shadow-lg shadow-violet-900/20 border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, '#home')}
            className="group flex items-center gap-2 font-mono text-lg font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              {'< Avinash Kirkat />'}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-9">
            {links.map(({ href, label }) => {
              const isActive = active === href.slice(1);
              return (
                <li key={href} className="relative">
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-300 pb-2 ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {label}
                    {/* dimension-tick active indicator */}
                    <span
                      className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center transition-opacity duration-300"
                      style={{ opacity: isActive ? 1 : 0 }}
                    >
                      <span className="w-px h-1.5 bg-amber-400" />
                      <span className="w-1 h-1 rounded-full bg-cyan-400 -mt-0.5" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden relative z-[60] flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-slate-200 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2 bg-cyan-400' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-slate-200 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-slate-200 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2 bg-cyan-400' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[80%] bg-[#0a0a1a] border-l border-white/10 pt-24 px-8 transition-transform duration-400 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-amber-400/50 via-cyan-400/50 to-violet-500/50" />
          <ul className="flex flex-col gap-2">
            {links.map(({ href, label }, i) => {
              const isActive = active === href.slice(1);
              return (
                <li
                  key={href}
                  style={{
                    transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                  }}
                >
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className={`flex items-center gap-3 py-3 text-base font-medium border-b border-white/5 ${
                      isActive ? 'text-cyan-400' : 'text-slate-300'
                    }`}
                  >
                    <span className="font-mono text-xs text-amber-400/70">
                      0{i + 1}
                    </span>
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;