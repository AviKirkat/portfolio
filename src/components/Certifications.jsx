import React, { useEffect, useRef, useState } from 'react';

const certifications = [
    {
        title: 'Pre-Cat Certification',
        issuer: 'SunBeam Institute of Information Technology, Pune-Karad',
        issued: 'Issued Sep 2022',
        expires: 'Expires Nov 2022',
        skills: ['Data Structures', 'Networking & Basics of AI/Big Data', 'C (Programming Language)', 'C++'],
        file: '/pdf/Pre%20Cat%20certificate.pdf',
        fileLabel: 'certificate.pdf',
        badge: 'SB',
    },
    {
        title: 'Web Expert Certification',
        issuer: 'BitCode Technologies Pvt. Ltd.',
        issued: 'Issued Mar 2023',
        expires: 'Expires Jul 2023',
        skills: ['Front-End Development', 'Node.js', 'React.js', "JavaScript", "HTML", "CSS"],
        file: '/pdf/Bitcode_Avinash%20Kirkat.pdf',
        fileLabel: 'Avinash Kirkat.pdf',
        badge: 'BC',
    },
];

function useInView(threshold = 0.15) {
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

function FileIcon({ className }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
            <path d="M14 3v5h5" strokeLinejoin="round" />
        </svg>
    );
}

function CertCard({ cert, inView, delay }) {
    return (
        <div
            className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-cyan-400/30 transition-colors duration-300"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease`,
            }}
        >
            {/* blueprint corner marks */}
            <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400/50 rounded-tl-sm" />
            <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 rounded-br-sm" />

            <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
                    {cert.badge}
                </div>
                <div className="min-w-0">
                    <h3 className="text-slate-100 font-semibold text-base leading-snug">{cert.title}</h3>
                    <p className="text-slate-400 text-sm">{cert.issuer}</p>
                </div>
            </div>

            <p className="font-mono text-xs text-amber-400/80 mb-4">
                {cert.issued} · {cert.expires}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
                {cert.skills.map((skill) => (
                    <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-white/10 bg-white/5"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            <a
                href={cert.file}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300"
            >
                <FileIcon className="w-4 h-4" />
                {cert.fileLabel}
            </a>
        </div>
    );
}

function Certifications() {
    const [sectionRef, inView] = useInView(0.15);

    return (
        <section id="certifications" className="relative py-20 sm:py-28 bg-[#05050f] overflow-hidden">
            {/* Ambient orbs, consistent with the rest of the site */}
            <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

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
                    className="text-center mb-14 sm:mb-16"
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(16px)',
                        transition: 'opacity 0.7s ease, transform 0.7s ease',
                    }}
                >
                    <p className="text-cyan-400 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-3">
                        Credentials
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Licenses &amp;{' '}
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Certifications
                        </span>
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                    {certifications.map((cert, i) => (
                        <CertCard key={cert.title} cert={cert} inView={inView} delay={i * 150} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Certifications;