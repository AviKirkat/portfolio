import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

// Brand icons as inline SVGs — recent lucide-react versions dropped
// logo/brand icons (GitHub, LinkedIn, Instagram, etc.) entirely.
function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: 'GitHub', href: 'https://github.com/AviKirkat', Icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/avinash-kirkat/', Icon: LinkedinIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: InstagramIcon },
  { label: 'Email', href: 'mailto:avikirkat5787@gmail.com', Icon: Mail },
];

function Contact() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#05050f] overflow-hidden">
      {/* Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-cyan-400 text-xs sm:text-sm font-mono tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hi? My inbox is always open — I&apos;ll
            get back to you as soon as possible.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto">
          {/* Contact info card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
            <h3 className="text-white font-semibold mb-5">Contact Info</h3>
            <div className="flex flex-col gap-4">
              <p className="text-slate-400 text-sm flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </span>
                Pune, India
              </p>
              <p className="text-slate-400 text-sm flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Mail className="w-4 h-4" />
                </span>
                <span className="break-all">avikirkat5787@gmail.com</span>
              </p>
              <p className="text-slate-400 text-sm flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Phone className="w-4 h-4" />
                </span>
                +91 86989 65787
              </p>
            </div>
          </div>

          {/* Socials card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-8">
            <h3 className="text-white font-semibold mb-8">Find Me On</h3>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {socials.map(({ label, href, Icon }) => {
                const isMail = href.startsWith('mailto:');
                return (
                  <a
                    key={label}
                    href={href}
                    // mailto/tel links shouldn't open in a new tab — target="_blank"
                    // on them silently fails to launch the mail client in some browsers.
                    {...(!isMail && { target: '_blank', rel: 'noreferrer' })}
                    title={label}
                    className="w-50 h-90 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:-translate-y-1 transition-all duration-300"
                  >
                    <Icon className="w-[50px] h-[50px] p-2" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;