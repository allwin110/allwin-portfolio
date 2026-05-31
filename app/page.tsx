'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "./data/projects";

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
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Monitor scroll for visual border-progress effect
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
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
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Header */}
      <header className="sticky top-4 z-40 w-full px-4 md:px-0">
        <nav className="max-w-4xl mx-auto bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 rounded-full py-3 px-6 shadow-xl flex items-center justify-between transition-all duration-300">
          <a href="#home" className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
            ALLWIN ALEX.
          </a>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Contact</a>
                 {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 text-zinc-500 hover:text-zinc-955 dark:text-zinc-400 dark:hover:text-white rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-colors cursor-pointer border border-zinc-200/20"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="p-2 text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-4.5 h-4.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white p-1"
              aria-label="Toggle navigation menu"
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
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center py-20 px-6 md:px-0">
        <div className="relative z-10 max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start text-left gap-5 order-2 md:order-1">
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
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
              Designing scalable enterprise experiences for AI-native products.
            </h1>

            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
              Senior UX designer focused on enterprise systems, operational workflows, AI-assisted product experiences, and scalable design intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-bold rounded-full transition-all text-sm gap-2 shadow-md cursor-pointer"
              >
                View Case Studies <span className="text-xs">→</span>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold rounded-full transition-all text-sm gap-2 shadow-sm cursor-pointer"
              >
                Resume <span className="text-xs">↓</span>
              </a>
            </div>

            {/* Bottom Stats Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/60 w-full max-w-lg mt-2">
              <div>
                <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white block">9+</span>
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">Years Experience</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white block">30+</span>
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">Enterprise Projects</span>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white block">5+</span>
                <span className="text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mt-1">AI Workflows</span>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Profile Image with Two Floating Text Cards */}
          <div className="relative flex justify-center items-center order-1 md:order-2 w-full">

            {/* Premium Rounded Vertical Frame */}
            <div className="relative w-full max-w-[310px] aspect-[3/4] p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-[44px] shadow-2xl dark:shadow-zinc-950/40 hover:scale-[1.01] transition-transform duration-500">
              <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-zinc-50 dark:bg-zinc-800">
                <Image
                  src="/images/profile.jpg"
                  alt="Allwin Alex - Senior UX Designer"
                  fill
                  priority
                  sizes="310px"
                  className="object-cover object-top transition-transform duration-500"
                />
              </div>

              {/* Floating Badge 1 (Top Left — overlapping card) */}
              <div className="absolute -top-4 -left-8 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-lg max-w-[180px] select-none animate-float-1 text-left">
                <span className="text-[8px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block mb-1">AI WORKFLOW</span>
                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-100 leading-tight block">
                  Enterprise orchestration systems
                </span>
              </div>

              {/* Floating Badge 2 (Bottom Right — overlapping card) */}
              <div className="absolute -bottom-4 -right-8 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-3 rounded-2xl shadow-lg max-w-[180px] select-none animate-float-2 text-left">
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
      <section id="about" className="max-w-4xl mx-auto py-24 px-6 md:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="flex flex-col gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">About Me</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">The SaaS & Infra Specialist</h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Bio Card */}
          <div className="md:col-span-2 bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between gap-6 hover:border-zinc-350 dark:hover:border-zinc-800/80 transition-all shadow-sm dark:shadow-none animate-fade-in">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-zinc-950 dark:text-white">Allwin Alex</h3>
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
          <div className="bg-gradient-to-br from-violet-100/50 to-zinc-50 dark:from-violet-900/10 dark:to-zinc-900/40 border border-violet-200/50 dark:border-violet-900/20 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between hover:border-violet-300 dark:hover:border-violet-500/30 transition-all shadow-sm">
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
            <div className="text-zinc-500 dark:text-zinc-500 text-[10px] font-semibold">WCAG AA Certified.</div>
          </div>

          {/* Interactive Skills Card */}
          <div className="md:col-span-2 bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl hover:border-zinc-300 dark:hover:border-zinc-800/80 transition-all shadow-sm dark:shadow-none">
            <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-6">Expertise & Skills</h3>
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
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-300 cursor-default hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Location / Availability Card */}
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-800/80 transition-all shadow-sm dark:shadow-none">
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
      <section id="projects" className="max-w-4xl mx-auto py-24 px-6 md:px-0 border-t border-zinc-200 dark:border-zinc-900">
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
              key={project.id}
              onClick={() => { setSelectedProject(project); setActiveImageIndex(0); }}
              className="group cursor-pointer bg-white dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/40 rounded-3xl overflow-hidden hover:border-zinc-350 dark:hover:border-zinc-700/80 transition-all hover:scale-[1.01] flex flex-col h-full shadow-sm dark:shadow-lg"
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
            className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
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
      <section id="experience" className="max-w-4xl mx-auto py-24 px-6 md:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="flex flex-col gap-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Career Timeline</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-955 dark:text-white">Professional Experience</h2>
        </div>

        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 flex flex-col gap-12">
          {experienceTimeline.map((job, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Dot marker */}
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-800 group-hover:bg-violet-600 dark:group-hover:bg-violet-500 border border-zinc-50 dark:border-zinc-950 transition-colors" />
              
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
      <section id="contact" className="max-w-4xl mx-auto py-24 px-6 md:px-0 border-t border-zinc-200 dark:border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Info Details */}
          <div className="flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Get in Touch</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-955 dark:text-white">Let's craft something remarkable together.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mt-2 font-medium">
                Have an enterprise product that requires a clear, functional interface architecture, data-heavy dashboard configurations, or a robust WCAG accessibility audit? Feel free to reach out.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-sm font-semibold">
              <a href="mailto:allwin110@live.in" className="inline-flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors">
                <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                allwin110@live.in
              </a>
              <a href="tel:+919677193923" className="inline-flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-955 dark:hover:text-white transition-colors">
                <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 9677193923
              </a>
              <span className="inline-flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Chennai, Tamil Nadu, India
              </span>
            </div>

            <div className="flex gap-4">
              <a href="https://linkedin.com/in/allwin" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">LinkedIn</a>
              <span className="text-zinc-300 dark:text-zinc-800">/</span>
              <a href="https://behance.net/allwin" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-wider">Behance</a>
            </div>
          </div>

          {/* Premium Form */}
          <div className="bg-white border border-zinc-200/80 dark:bg-zinc-900/40 dark:border-zinc-800/40 p-8 rounded-3xl shadow-lg dark:shadow-2xl">
            {contactSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-400/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl font-bold">✓</div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-955 dark:text-white">Message Sent!</h3>
                  <p className="text-zinc-550 dark:text-zinc-400 text-xs mt-1.5 leading-relaxed font-medium">Thank you for reaching out. I'll get back to your email within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setContactSubmitted(false)}
                  className="mt-4 px-5 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="flex flex-col gap-5"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="Jane Doe" 
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-violet-500 focus:bg-white text-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:focus:bg-zinc-950 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="jane@company.com" 
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-violet-500 focus:bg-white text-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:focus:bg-zinc-950 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Brief Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    required 
                    placeholder="Describe your project, timeline, and expectations..." 
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-violet-500 focus:bg-white text-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:focus:bg-zinc-950 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl transition-all active:scale-[0.98] text-sm mt-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto py-12 px-6 md:px-0 border-t border-zinc-200 dark:border-zinc-900 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-semibold transition-colors duration-400">
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
    </div>
  );
}
