'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "./data/projects";

// Reusable animated count-up component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // 1.2s duration
    const stepTime = Math.max(Math.floor(duration / target), 20);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <>{count}{suffix}</>;
}

// Official Career Timeline from Resume
const experienceTimeline = [
  {
    role: "UX Lead Designer",
    company: "Aziro Technologies pvt. ltd",
    location: "Chennai, India",
    period: "Nov 2023 – Present",
    highlights: [
      "Led end-to-end UX design for enterprise cloud orchestration and infrastructure administration platforms.",
      "Simplified provisioning, RBAC, deployment monitoring, and operational workflows for enterprise users.",
      "Contributed to enterprise UX modernization, workflow restructuring, and scalable interface consistency.",
      "Designed an AI-powered onboarding platform that cut candidate onboarding time by 70%."
    ]
  },
  {
    role: "Senior Product Designer",
    company: "Swirepay Technologies",
    location: "Chennai, India",
    period: "Apr 2023 – Nov 2023",
    highlights: [
      "Conducted user research and usability audits, reducing transaction completion time by 50%.",
      "Created wireframes, prototypes, and responsive UI designs across desktop and mobile devices.",
      "Built a WCAG-compliant design system with custom iconography, ensuring visual consistency.",
      "Designed event seat booking flows with rich micro-interactions, boosting user retention by 25%."
    ]
  },
  {
    role: "Sr. Business Presentation Designer",
    company: "McKinsey & Company",
    location: "Chennai, India",
    period: "Apr 2016 – Mar 2023",
    highlights: [
      "Spearheaded UX for HRIS Dashboard during COVID, enabling safe office seat bookings across regions within 3 months.",
      "Created a global McKinsey design repository, cutting team asset search times by 60%.",
      "Drove visual storytelling initiatives, improving C-suite presentation engagement by 50%."
    ]
  },
  {
    role: "Senior Customer Service Agent",
    company: "Jet Airways",
    location: "Chennai, India",
    period: "Nov 2013 – Apr 2016",
    highlights: [
      "Managed and trained a 20-member distributed service team, improving complaint resolution KPIs by 40%.",
      "Authored standardized operational procedures (SOPs) for baggage service, resolving 500+ issues monthly.",
      "Awarded Star Performer for 3 consecutive years for leadership in team development."
    ]
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);

  // States for protecting contact details
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  // Clipboard copy handlers
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const emailParts = ["allwin110", "live.in"];
    const fullEmail = emailParts.join("@");
    navigator.clipboard.writeText(fullEmail);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const phoneParts = ["+91", "9677193923"];
    const fullPhone = phoneParts.join("");
    navigator.clipboard.writeText(fullPhone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };
  
  // Profile picture rotation parameters
  const [profileIndex, setProfileIndex] = useState(0);
  const profiles = [
    "/images/profile1.jpg?v=2",
    "/images/profile2.jpg?v=2",
    "/images/profile3.jpg?v=2"
  ];

  // Rotate profile image every 3 seconds dynamically
  useEffect(() => {
    const timer = setInterval(() => {
      setProfileIndex((prev) => (prev + 1) % profiles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Monitor scroll for visual border-progress effect and scroll-to-top FAB visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme ?? 'light';
    setTheme(initialTheme);
    const root = window.document.documentElement;
    if (initialTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Sync theme changes after mount
  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, mounted]);

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === "All") return true;
    return project.category === activeFilter;
  });

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-violet-500 selection:text-white overflow-x-hidden transition-colors duration-300">
      {/* Full Page Radial Gradient Background */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0" />

      {/* Scroll Progress Line */}
      <div 
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Header */}
      <header className="sticky top-4 z-40 w-full px-4 md:px-0">
        <nav className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 rounded-full py-3 px-6 shadow-xl flex items-center justify-between transition-all duration-300">
          <a href="#home" className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
            ALLWIN ALEX.
          </a>
             <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="relative group text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1">
              About
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-violet-600 dark:bg-violet-400 transition-all duration-300" />
            </a>
            <a href="#projects" className="relative group text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1">
              Projects
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-violet-600 dark:bg-violet-400 transition-all duration-300" />
            </a>
            <a href="#experience" className="relative group text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1">
              Experience
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-violet-600 dark:bg-violet-400 transition-all duration-300" />
            </a>
            <a href="#contact" className="relative group text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1">
              Contact
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-violet-600 dark:bg-violet-400 transition-all duration-300" />
            </a>
                 {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="group p-2.5 text-zinc-500 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-white rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer border border-zinc-200/20"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5 text-amber-400 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>
            <a 
              href="#contact" 
              className="text-xs font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-750 dark:bg-violet-600 dark:hover:bg-violet-550 text-white px-4 py-2 rounded-full transition-colors shadow-md shadow-violet-950/10"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile menu and theme buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="group p-2 text-zinc-500 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-white rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5 text-amber-400 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-500 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-white p-1 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden max-w-4xl mx-auto mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl animate-fade-in mx-4">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm">About</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm">Projects</a>
            <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm">Experience</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-zinc-650 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white py-2 border-b border-zinc-100 dark:border-zinc-800 text-sm">Contact</a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-violet-600 text-white font-medium py-2 rounded-xl text-sm"
            >
              Hire Me
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center py-20 px-6 md:px-8 lg:px-12 2xl:px-0">
        <div className="relative z-10 max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left gap-5 order-2 md:order-1 animate-slide-in-bottom">
            {/* Top tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 rounded-full text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                Enterprise UX
              </span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 rounded-full text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                AI Workflow Systems
              </span>
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 rounded-full text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                SaaS Platforms
              </span>
            </div>

            {/* Small uppercase subtitle */}
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mt-1">
              ENTERPRISE UX • AI WORKFLOWS • SYSTEMS THINKING
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
              Designing scalable enterprise experiences for AI-native products.
            </h1>

            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg lg:max-w-xl xl:max-w-2xl">
              Senior UX designer focused on enterprise systems, operational workflows, AI-assisted product experiences, and scalable design intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <a 
                href="#projects" 
                className="group inline-flex items-center justify-center px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-bold rounded-full transition-all text-sm gap-2 shadow-md cursor-pointer active:scale-[0.98]"
              >
                View Case Studies <span className="text-xs group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
              <a 
                href="/Allwin_Alex_Resume.pdf"
                download="Allwin_Alex_Resume.pdf"
                className="group inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold rounded-full transition-all text-sm gap-2 shadow-sm cursor-pointer active:scale-[0.98]"
              >
                Resume <span className="text-xs group-hover:translate-y-0.5 transition-transform duration-300">↓</span>
              </a>
            </div>

            {/* Bottom Stats Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/60 w-full max-w-lg lg:max-w-xl xl:max-w-2xl mt-2">
              <div>
                <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white block"><AnimatedCounter target={9} suffix="+" /></span>
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">Years Experience</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white block"><AnimatedCounter target={30} suffix="+" /></span>
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">Enterprise Projects</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white block"><AnimatedCounter target={5} suffix="+" /></span>
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">AI Workflows</span>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Profile Image with Two Floating Text Cards */}
          <div className="relative flex justify-center items-center order-1 md:order-2 w-full animate-slide-in-bottom animation-delay-150">

            {/* Premium Rounded Vertical Frame */}
            <div className="relative w-full max-w-[310px] lg:max-w-[360px] xl:max-w-[420px] 2xl:max-w-[460px] aspect-[3/4] p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-[44px] shadow-2xl dark:shadow-zinc-950/40 hover:scale-[1.01] transition-transform duration-500">
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-zinc-50 dark:bg-zinc-800">
                {profiles.map((src, idx) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      idx === profileIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Allwin Alex - Senior UX Designer ${idx + 1}`}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 310px, (max-width: 1024px) 360px, (max-width: 1280px) 420px, 460px"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>

              {/* Floating Badge 1 (Top Left — overlapping card) */}
              <div className="absolute -top-4 -left-4 sm:-left-8 lg:-left-12 xl:-left-16 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-lg max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] select-none animate-float-1 text-left">
                <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">AI WORKFLOW</span>
                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-100 leading-tight block">
                  Enterprise orchestration systems
                </span>
              </div>

              {/* Floating Badge 2 (Bottom Right — overlapping card) */}
              <div className="absolute -bottom-4 -right-4 sm:-right-8 lg:-right-12 xl:-right-16 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-lg max-w-[180px] lg:max-w-[200px] xl:max-w-[220px] select-none animate-float-2 text-left">
                <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">PLATFORM THINKING</span>
                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-100 leading-tight block">
                  Operational UX at scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Bento Grid Section */}
      <section id="about" className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-24 px-6 md:px-8 lg:px-12 2xl:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="flex flex-col gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">About Me</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-955 dark:text-white">The SaaS & Infra Specialist</h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Bio Card */}
          <div className="md:col-span-2 bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between gap-6 hover:border-zinc-350 dark:hover:border-zinc-800/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5 transition-all duration-300 shadow-sm dark:shadow-none animate-fade-in">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-zinc-955 dark:text-white">Allwin Alex</h3>
              <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
                Senior Product Designer with 9+ years of experience designing enterprise SaaS platforms, operational systems, and infrastructure-focused workflows. I specialize in enterprise UX, AI-assisted design workflows, scalable design systems, accessibility improvements, and implementation-aware product delivery.
              </p>
              <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
                I regularly collaborate with engineering teams, stakeholders, and product squads to simplify complex operational workflows across cloud orchestration, enterprise administration, and developer tools.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 font-semibold">Design Systems</span>
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 font-semibold">SaaS / Cloud Console</span>
              <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 font-semibold">WCAG Accessibility</span>
            </div>
          </div>

          {/* Experience Statistics Card */}
          <div className="bg-gradient-to-br from-violet-100/50 to-zinc-50 dark:from-violet-900/10 dark:to-zinc-900/40 border border-violet-200/50 dark:border-violet-900/20 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between hover:border-violet-300 dark:hover:border-violet-500/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5 transition-all duration-300 shadow-sm">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">Career Metrics</h3>
            <div className="flex flex-col gap-6 my-6">
              <div>
                <span className="text-4xl font-extrabold text-violet-600 dark:text-violet-400">9+ Yrs</span>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">UX & Product Design</p>
              </div>
              <div>
                <span className="text-4xl font-extrabold text-cyan-600 dark:text-cyan-400">~70%</span>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">Onboarding Simplicity Boost</p>
              </div>
            </div>
            <div className="text-zinc-500 dark:text-zinc-505 text-[10px] font-semibold">WCAG AA Certified.</div>
          </div>

          {/* Interactive Skills Card */}
          <div className="md:col-span-2 bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl hover:border-zinc-300 dark:hover:border-zinc-800/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5 transition-all duration-300 shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold text-zinc-955 dark:text-white mb-6">Expertise & Skills</h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                "Enterprise Product Design",
                "SaaS UX",
                "Infra & Ops Systems UX",
                "AI-Assisted UX Workflows",
                "Information Architecture",
                "Workflow Simplification",
                "UX Strategy",
                "Design Systems",
                "Accessibility (WCAG)",
                "Stakeholder Management",
                "Engineering Collaboration",
                "React-aware Prototyping",
                "GitLab Deployment Workflows",
                "Data-heavy Enterprise Applications"
              ].map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-300 cursor-default hover:text-zinc-950 dark:hover:text-white hover:-translate-y-0.5 hover:scale-105 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Location / Availability Card */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between hover:border-zinc-350 dark:hover:border-zinc-800/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5 dark:hover:shadow-violet-400/5 transition-all duration-300 shadow-sm dark:shadow-none">
            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider">Hometown</h3>
            <div className="my-4">
              <span className="text-xl font-bold text-zinc-955 dark:text-white block">Chennai, TN</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-xs mt-1 block font-semibold">India (GMT +5:30)</span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-850 px-3 py-2 rounded-xl text-[11px] text-zinc-600 dark:text-zinc-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              UX Lead @ Aziro Tech
            </div>
          </div>
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <section id="projects" className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-24 px-6 md:px-8 lg:px-12 2xl:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-955 dark:text-white">Enterprise Case Studies</h2>
          </div>
          
          {/* Filtering tabs */}
          <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1.5 rounded-xl">
            {["All", "Enterprise UX", "SaaS UX", "AI & Workflows"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeFilter === tab 
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm dark:shadow-md" 
                    : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={`${activeFilter}-${project.id}`}
              onClick={() => { setSelectedProject(project); setActiveImageIndex(0); }}
              className="project-card-transition group cursor-pointer bg-white dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/40 rounded-3xl overflow-hidden hover:border-zinc-350 dark:hover:border-zinc-700/80 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-cyan-500/5 dark:hover:shadow-cyan-400/5 transition-all duration-300 flex flex-col h-full shadow-sm dark:shadow-lg"
            >
              {/* Image Frame */}
              <div className="relative h-56 bg-zinc-900 overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-85" />
                <span className="absolute top-4 right-4 bg-zinc-950/80 border border-zinc-800/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-zinc-300">
                  {project.category}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">{project.subtitle}</span>
                  <h3 className="text-xl font-bold text-zinc-955 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed my-1 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-md text-zinc-650 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[9px] font-bold text-zinc-450 dark:text-zinc-500 self-center">+{project.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-zinc-950/80 dark:bg-zinc-950/90 backdrop-blur-md animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div 
            className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Frame */}
            <div className="relative h-64 md:h-[400px] bg-zinc-950 flex-shrink-0 group/gallery select-none overflow-hidden">
              <Image 
                src={
                  selectedProject.images && selectedProject.images.length > 0 
                    ? selectedProject.images[activeImageIndex] 
                    : selectedProject.image
                } 
                alt={selectedProject.title} 
                fill 
                className="object-cover opacity-95 transition-all duration-500 hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent pointer-events-none" />
              
              {/* Image Caption overlay */}
              {selectedProject.images && selectedProject.images.length > 1 && selectedProject.imageNames && selectedProject.imageNames[activeImageIndex] && (
                <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-zinc-800/60 backdrop-blur-md text-[11px] font-bold px-3 py-1.5 rounded-xl text-zinc-200 shadow-lg tracking-wide z-10">
                  {selectedProject.imageNames[activeImageIndex]}
                </div>
              )}

              {/* Navigation Arrows */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? selectedProject.images!.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-850 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === selectedProject.images!.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-850 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-lg z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-zinc-950/60 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-zinc-800/40">
                    {selectedProject.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          i === activeImageIndex 
                            ? "w-4 h-1.5 bg-cyan-400" 
                            : "w-1.5 h-1.5 bg-white/40 hover:bg-white/80"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800/60 backdrop-blur-md text-zinc-400 hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg z-20"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col gap-6 text-zinc-800 dark:text-zinc-300">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-600 dark:text-cyan-400 block mb-1">{selectedProject.subtitle}</span>
                <h3 className="text-3xl font-extrabold text-zinc-955 dark:text-white">{selectedProject.title}</h3>
              </div>

              {/* Tags panel */}
              <div className="flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800/60 pb-4">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 px-3 py-1 rounded-md text-zinc-700 dark:text-zinc-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Main columns */}
              <div className="flex flex-col gap-5 text-sm leading-relaxed">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-1.5 text-zinc-500 dark:text-zinc-400">The Problem & Challenge</h4>
                  <p>{selectedProject.challenge}</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-1.5 text-zinc-500 dark:text-zinc-400">The Strategic Solution</h4>
                  <p>{selectedProject.solution}</p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-250 dark:bg-emerald-950/20 dark:border-emerald-900/30 p-4 rounded-2xl">
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-xs uppercase tracking-wider mb-1">Key Results Achieved</h4>
                  <p className="text-zinc-850 dark:text-zinc-200">{selectedProject.results}</p>
                </div>
              </div>

              {/* Codebase connections */}
              <div className="flex flex-col sm:flex-row gap-4 border-t border-zinc-250 dark:border-zinc-800/60 pt-6 mt-4 justify-end">
                <a 
                  href="mailto:allwin110@live.in"
                  className="px-6 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-250 dark:border-zinc-700/80 text-center font-bold text-xs rounded-full transition-colors text-zinc-700 dark:text-zinc-200"
                >
                  Email Me
                </a>
                <Link 
                  href={`/projects/${selectedProject.id}`}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-955 text-center font-bold text-xs rounded-full transition-colors"
                >
                  View Full Case Study
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Timeline Section */}
      <section id="experience" className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-24 px-6 md:px-8 lg:px-12 2xl:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="flex flex-col gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Career Timeline</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-955 dark:text-white">Professional Experience</h2>
        </div>

        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 flex flex-col gap-12">
          {experienceTimeline.map((job, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Dot marker */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-800 group-hover:bg-violet-600 dark:group-hover:bg-violet-500 border border-zinc-50 dark:border-zinc-950 group-hover:scale-125 group-hover:ring-4 group-hover:ring-violet-500/20 dark:group-hover:ring-violet-400/20 transition-all duration-300" />
              
              <div className="flex flex-col gap-2 bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-900 dark:hover:border-zinc-800 p-6 rounded-2xl transition-all shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-955 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{job.role}</h3>
                    <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{job.company}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-550 block">{job.period}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-550">{job.location}</span>
                  </div>
                </div>

                <ul className="list-disc pl-4 mt-3 flex flex-col gap-1.5 text-xs text-zinc-650 dark:text-zinc-450 leading-relaxed font-medium">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-24 px-6 md:px-8 lg:px-12 2xl:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 animate-slide-in-bottom">
          
          {/* Info Details */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-955 dark:text-white">Let's craft something remarkable together.</h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mt-2 font-medium">
              Have an enterprise product that requires a clear, functional interface architecture, data-heavy dashboard configurations, or a robust WCAG accessibility audit? Feel free to reach out.
            </p>
          </div>



          {/* Professional Networks & Socials Redesign */}
          <div className="flex flex-col gap-6 border-t border-zinc-200 dark:border-zinc-850 pt-10 mt-2">
            <div className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Connect Globally</span>
              <h3 className="text-xl font-extrabold text-zinc-955 dark:text-white">Professional Networks & Social Profiles</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/allwin-alex91/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-500/5 transition-all duration-300 text-center gap-3 cursor-pointer"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-blue-500 dark:text-zinc-500 dark:group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">LinkedIn</span>
                  <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-semibold group-hover:text-blue-500/70 transition-colors">Professional Profile</span>
                </div>
              </a>

              {/* Behance */}
              <a 
                href="https://www.behance.net/allwinalex" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl hover:border-blue-600 hover:shadow-lg dark:hover:shadow-blue-600/5 transition-all duration-300 text-center gap-3 cursor-pointer"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-blue-600 dark:text-zinc-500 dark:group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 13.555h-4.321c.074.886.756 1.492 1.83 1.492 1.055 0 1.637-.478 1.815-.99h1.796c-.347 1.576-1.895 2.698-3.642 2.698-2.613 0-4.048-1.785-4.048-4.148 0-2.484 1.562-4.167 3.901-4.167 2.378 0 3.791 1.635 3.669 4.148zM20.102 12.164c-.046-.867-.655-1.378-1.574-1.378-1.01 0-1.634.549-1.77 1.378h3.344zM11.021 10.135h-3.418v1.78h3.181c.883 0 1.401-.334 1.401-.902s-.518-.878-1.164-.878zm-3.418 3.513v2.091h3.486c.928 0 1.503-.393 1.503-1.025 0-.663-.615-1.066-1.574-1.066h-3.415zm9.467-5.068h3.93v1.17h-3.93v-1.17zm-6.049.52c0-1.365-1.002-2.1-2.909-2.1h-5.02v10.9h5.197c1.986 0 3.197-.847 3.197-2.31 0-1.144-.691-1.787-1.758-2.046 1.007-.272 1.293-.976 1.293-2.444z"/>
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Behance</span>
                  <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-semibold group-hover:text-blue-600/70 transition-colors">Design Portfolio</span>
                </div>
              </a>

              {/* Naukri */}
              <a 
                href="https://www.naukri.com/mnjuser/profile" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl hover:border-emerald-500 hover:shadow-lg dark:hover:shadow-emerald-500/5 transition-all duration-300 text-center gap-3 cursor-pointer"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-emerald-500 dark:text-zinc-500 dark:group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Naukri</span>
                  <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-semibold group-hover:text-emerald-500/70 transition-colors">National CV</span>
                </div>
              </a>

              {/* Gulf Naukri */}
              <a 
                href="https://www.naukrigulf.com/mnj/userProfile/myCV?source=gnbHeader" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl hover:border-cyan-500 hover:shadow-lg dark:hover:shadow-cyan-500/5 transition-all duration-300 text-center gap-3 cursor-pointer"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-cyan-500 dark:text-zinc-500 dark:group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Naukri Gulf</span>
                  <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-semibold group-hover:text-cyan-500/70 transition-colors">Middle East CV</span>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/myself_allwin/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl hover:border-pink-500 hover:shadow-lg dark:hover:shadow-pink-500/5 transition-all duration-300 text-center gap-3 cursor-pointer"
              >
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-pink-500 dark:text-zinc-500 dark:group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-zinc-850 dark:text-zinc-200">Instagram</span>
                  <span className="text-[9px] text-zinc-450 dark:text-zinc-500 font-semibold group-hover:text-pink-500/70 transition-colors">Personal Social</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-12 px-6 md:px-8 lg:px-12 2xl:px-0 border-t border-zinc-200 dark:border-zinc-900 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-semibold transition-colors duration-400">
        <div>
          &copy; {new Date().getFullYear()} Allwin Alex. Designed with precision, coded for performance.
        </div>
        <div className="flex gap-4">
          <span>Next.js 16</span>
          <span>&bull;</span>
          <span>React 19</span>
          <span>&bull;</span>
          <span>Tailwind CSS v4</span>
        </div>
      </footer>

      {/* Scroll to Top FAB */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 p-3.5 bg-violet-600 hover:bg-violet-750 dark:bg-violet-600 dark:hover:bg-violet-550 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center ${
          showScrollTop ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
