'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../data/projects';

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = projectsData.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Project Not Found</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
          The case study you are looking for does not exist or may have been relocated.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-955 font-bold rounded-full transition-all text-sm shadow-md"
        >
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  // Visual visual gallery logic
  const displayImage = project.images && project.images.length > 0
    ? project.images[activeImageIndex]
    : project.image;

  const displayImageName = project.images && project.images.length > 0 && project.imageNames
    ? project.imageNames[activeImageIndex]
    : project.title;

  // Global layout wrapper for unified presentation
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-violet-500 selection:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* Full Page Radial Gradient Background */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0" />

      {/* Dynamic Header */}
      <header className="sticky top-4 z-40 w-full px-4 md:px-0 mb-8">
        <nav className="max-w-6xl mx-auto bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/50 dark:border-zinc-800/40 rounded-full py-3.5 px-6 shadow-xl flex items-center justify-between transition-all duration-300">
          <Link href="/" className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
            ALLWIN ALEX.
          </Link>
          
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-1.5 px-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1 duration-200">←</span> Back to Portfolio
          </Link>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-0 pb-24 relative z-10">
        
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-550 mb-6">
          <Link href="/" className="hover:text-zinc-650 dark:hover:text-zinc-350 transition-colors">Home</Link>
          <span>/</span>
          <span className="hover:text-zinc-650 dark:hover:text-zinc-350 transition-colors">{project.category}</span>
          <span>/</span>
          <span className="text-zinc-850 dark:text-zinc-200">{project.title}</span>
        </div>

        {/* Dynamic Visual Screen Header Grid */}
        <section className="mb-12">
          <div className="relative w-full h-[280px] sm:h-[420px] md:h-[580px] bg-zinc-950 rounded-[32px] md:rounded-[48px] overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl select-none">
            <Image 
              src={displayImage}
              alt={displayImageName}
              fill
              priority
              className="object-cover opacity-95 transition-all duration-750 hover:scale-[1.005]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
            
            {/* Visual Indicator Name tag */}
            <div className="absolute bottom-6 left-6 bg-zinc-950/85 border border-zinc-800/60 backdrop-blur-md text-xs font-bold px-4 py-2.5 rounded-2xl text-zinc-100 shadow-2xl tracking-wide">
              {displayImageName}
            </div>

            {/* Slider Arrows */}
            {project.images && project.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1))}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800/60 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl z-10"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800/60 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl z-10"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dynamic Thumbnail list */}
          {project.images && project.images.length > 1 && (
            <div className="flex justify-center gap-3 mt-5 flex-wrap animate-fade-in">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-24 sm:w-32 h-14 sm:h-18 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    i === activeImageIndex
                      ? "border-cyan-500 scale-[1.02] shadow-xl"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`Thumbnail view ${i + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Bespoke Renders based on Project ID */}
        {project.id === "cloud-orchestration" && (
          <CloudOrchestrationLayout project={project} />
        )}
        {project.id === "cloud-director" && (
          <CloudDirectorLayout project={project} />
        )}
        {project.id === "developer-experience" && (
          <DeveloperExperienceLayout project={project} />
        )}
        {project.id === "ai-onboarding" && (
          <AIOnboardingLayout project={project} />
        )}

      </main>

      {/* Modern footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 py-12 text-center text-xs text-zinc-450 dark:text-zinc-550 max-w-6xl mx-auto relative z-10">
        <p>© 2026 {project.title}. All rights reserved.</p>
      </footer>

    </div>
  );
}

// -------------------------------------------------------------
// Component 1: Cloud Orchestration Layout
// -------------------------------------------------------------
function CloudOrchestrationLayout({ project }: { project: any }) {
  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-left">
        <span className="px-3.5 py-1.5 bg-violet-50 dark:bg-violet-950/20 border border-violet-200/50 dark:border-violet-900/30 rounded-full text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest inline-block mb-4 shadow-sm">
          Featured Case Study
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-955 dark:text-white mb-3 leading-[1.1] max-w-4xl">
          Cloud Orchestration Platform
        </h1>
        <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent leading-relaxed max-w-3xl">
          {project.subtitle}
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { title: "Industry", val: "Enterprise Infrastructure" },
          { title: "Target Users", val: "Infrastructure Admins / DevOps" },
          { title: "Responsibilities", val: "IA, Research, AI-assisted flows" },
          { title: "Major Constraints", val: "Technical complex workflows" }
        ].map((fact, idx) => (
          <div key={idx} className="bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/40 p-5 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{fact.title}</span>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{fact.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 dark:text-zinc-550 mb-3 block">Executive Summary & Context</h2>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Taming Infrastructure Complexity</h3>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-4">{project.description}</p>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed">
              Spearheaded a holistic UX strategy, from deep workflow research and information architecture to the critical integration of <strong>AI-assisted methodologies</strong> for accelerated iteration and implementation-aware validation. This approach was instrumental in crafting robust <strong>operational systems UX</strong> that simplified highly technical workflows.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/5 dark:to-zinc-900/40 border border-amber-200/40 dark:border-amber-950/20 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-amber-700 dark:text-amber-500">The Problem Space</h2>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Fragmented Configurations & Operational Friction</h3>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-medium">{project.challenge}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Deeply nested configuration structures that obscured dependencies.",
                "Overloaded administrative interfaces causing extreme cognitive fatigue.",
                "Limited/delayed orchestration state visibility during runs.",
                "Difficult and confusing RBAC hierarchy validation.",
                "High onboarding friction for newer DevOps operators."
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="text-amber-500 font-extrabold text-sm">✕</span>
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-zinc-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-violet-650/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-3">
              <span className="px-2.5 py-1 bg-violet-600/30 border border-violet-500/30 text-[9px] font-black tracking-widest text-violet-400 uppercase rounded-md">Core Differentiator</span>
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400">AI-Assisted Workflow</h2>
            </div>
            <h3 className="text-2xl font-black text-white mb-6 leading-tight">Revolutionizing discovery & validation with modern AI integration.</h3>
            <div className="flex flex-col gap-5">
              {[
                { label: "AI-Assisted PRD Analysis", desc: "Leveraged large language model clusters to automatically parse massive PRDs into structured workflow clusters. Successfully identified repeating operational patterns and edge cases." },
                { label: "Research Synthesis Automation", desc: "Clustered qualitative stakeholder feedback and mapped out hidden workflow inconsistencies. Surface dependency relationships and accelerated research discovery cycles by nearly 60%." },
                { label: "Cursor Prototyping Pipeline", desc: "Used advanced editor assistants to code, validate, and preview interactive components (like complex operational tables and dashboard flex-layouts) in real-time browser states." }
              ].map((proc, idx) => (
                <div key={idx} className="bg-zinc-950/40 border border-zinc-800/50 p-5 rounded-2xl flex flex-col gap-2">
                  <h4 className="text-sm font-black text-cyan-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {proc.label}
                  </h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">{proc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/10 dark:to-zinc-900/40 border border-emerald-250 dark:border-emerald-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400">Key Results Achieved</h2>
            </div>
            <h3 className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mb-5 leading-tight">Quantifiable Operational Simplicity</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Onboarding State Friction", val: "~70% Reduction" },
                { label: "Developer Handoff Cycle Time", val: "50% Shorter" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-900/30 p-4 rounded-2xl flex flex-col">
                  <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{metric.label}</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 leading-tight">{metric.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-8">
          <SidebarGeneral project={project} />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Component 2: Cloud Director Layout
// -------------------------------------------------------------
function CloudDirectorLayout({ project }: { project: any }) {
  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-left">
        <span className="px-3.5 py-1.5 bg-violet-50 dark:bg-violet-950/20 border border-violet-200/50 dark:border-violet-900/30 rounded-full text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest inline-block mb-4 shadow-sm">
          Platform Modernization
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-955 dark:text-white mb-3 leading-[1.1] max-w-4xl">
          Cloud Director Modernization
        </h1>
        <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { title: "Industry", val: "Enterprise Infrastructure" },
          { title: "Design System", val: "Carbon Design System" },
          { title: "Year", val: "2025" },
          { title: "Role", val: "Lead Product Designer" }
        ].map((fact, idx) => (
          <div key={idx} className="bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/40 p-5 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{fact.title}</span>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{fact.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 dark:text-zinc-550 mb-3 block">Executive Summary & Context</h2>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Unified Enterprise Infrastructure</h3>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              Led the UX modernization of an enterprise infrastructure management platform by migrating legacy interfaces to a Carbon Design System-based foundation.
            </p>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed">
              Over time, multiple products evolved independently, creating inconsistent user experiences, duplicated interactions, and fragmented workflows. Users frequently moved between applications to complete operational tasks. The modernization focused on creating a seamless experience across three interconnected applications.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/5 dark:to-zinc-900/40 border border-amber-200/40 dark:border-amber-950/20 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-amber-700 dark:text-amber-500">The Challenge</h2>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Ecosystem Usability Gaps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {[
                { title: "Inconsistent Experiences", desc: "Each application followed different interaction patterns, navigation models, and visual conventions." },
                { title: "Workflow Fragmentation", desc: "Users were required to switch between products to complete related operational tasks." },
                { title: "High Cognitive Load", desc: "Administrative workflows required excessive navigation and multiple configuration steps." },
                { title: "Design Debt", desc: "Years of product growth introduced inconsistencies across layouts, forms, and tables." }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 p-4 bg-white/40 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/40 rounded-2xl">
                  <span className="text-xs font-black text-amber-600 dark:text-amber-500 uppercase">{item.title}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-zinc-100">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 mb-3 block">Carbon Design System Migration</h2>
            <h3 className="text-2xl font-black text-white mb-6 leading-tight">Establishing a Unified Design Language</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-400">
              {[
                "Standardized enterprise UI patterns and components.",
                "Unified navigation structures across all products.",
                "Consistent interaction behaviors and visual language.",
                "Reusable layout elements and component architecture.",
                "Drastically improved accessibility (WCAG AA) standards.",
                "Scalable visual design foundations for future expansion."
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start bg-zinc-950/40 p-4 rounded-xl border border-zinc-850">
                  <span className="text-violet-400 font-extrabold">✓</span>
                  <span className="leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 dark:text-zinc-550 mb-3 block">Workflow Simplification</h2>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Optimizing Administrative Console States</h3>
            <div className="flex flex-col gap-5 text-sm">
              {[
                { title: "Configuration Management", desc: "Reduced unnecessary configuration steps and improved visual data hierarchy." },
                { title: "Administrative Setup", desc: "Simplified setup processes through clearer progression models and progressive disclosure." },
                { title: "System Management", desc: "Improved discoverability of key actions and reduced dashboard navigation depth." }
              ].map((work, idx) => (
                <div key={idx} className="flex gap-4 items-start border-t border-zinc-100 dark:border-zinc-850 pt-5 first:border-0 first:pt-0">
                  <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 text-xs font-black flex items-center justify-center flex-shrink-0">{idx + 1}</span>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase text-zinc-850 dark:text-zinc-250 mb-1">{work.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed font-medium">{work.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/10 dark:to-zinc-900/40 border border-emerald-250 dark:border-emerald-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400">Measurable Impact</h2>
            </div>
            <h3 className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mb-5 leading-tight">Operational Outcomes</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Task Completion Time", val: "~50% Faster" },
                { label: "Interaction Cycles Needed", val: "Significantly Reduced" },
                { label: "Onboarding Training Needs", val: "Drastically Lowered" },
                { label: "Design Consistency Audit", val: "100% Standardized" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-emerald-950/20 border border-emerald-250/40 dark:border-emerald-900/30 p-4 rounded-2xl flex flex-col">
                  <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{metric.label}</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 leading-tight">{metric.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-8">
          <SidebarGeneral project={project} />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Component 3: Developer Experience Layout
// -------------------------------------------------------------
function DeveloperExperienceLayout({ project }: { project: any }) {
  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-left">
        <span className="px-3.5 py-1.5 bg-violet-50 dark:bg-violet-950/20 border border-violet-200/50 dark:border-violet-900/30 rounded-full text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest inline-block mb-4 shadow-sm">
          Kubernetes & GPU Workloads
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-955 dark:text-white mb-3 leading-[1.1] max-w-4xl">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { title: "Industry", val: "Enterprise Infrastructure" },
          { title: "Core Workloads", val: "GPU Resource Allocation" },
          { title: "Deployments", val: "Kubernetes Containers" },
          { title: "Design Language", val: "Carbon UX Principles" }
        ].map((fact, idx) => (
          <div key={idx} className="bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/40 p-5 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{fact.title}</span>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{fact.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 dark:text-zinc-550 mb-3 block">Executive Summary & Context</h2>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Reimagining Enterprise Cloud Orchestration</h3>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              Led the redesign of an enterprise infrastructure orchestration platform supporting AI workloads, GPU resource allocation, provisioning workflows, operational monitoring, and multi-tenant administration.
            </p>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed">
              The platform supported enterprise infrastructure teams responsible for AI workload management, GPU resource allocation, multi-tenant administration, RBAC, and Kubernetes orchestration, serving administrators working within highly technical environments.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/5 dark:to-zinc-900/40 border border-amber-200/40 dark:border-amber-950/20 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-amber-700 dark:text-amber-500">The Challenge</h2>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Operational Complexity at Scale</h3>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-5">
              As platform capabilities expanded, usability and workflow scalability became increasingly difficult to maintain. Critical challenges included:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Highly dense, configuration-heavy provisioning flows.",
                "Limited telemetry, monitoring, and orchestration visibility.",
                "Deep workflow hierarchies creating navigational friction.",
                "Fragmented operational experiences and high cognitive load."
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="text-amber-500 font-extrabold text-sm">✕</span>
                  <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-zinc-100">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 mb-3 block">AI-Assisted UX Pipeline</h2>
            <h3 className="text-2xl font-black text-white mb-6 leading-tight">Leveraging Advanced Workflows</h3>
            <div className="flex flex-col gap-4 text-xs">
              <div className="bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl">
                <span className="font-extrabold text-cyan-400 block mb-1">Requirements Synthesis</span>
                <p className="text-zinc-400 leading-relaxed font-medium">Accelerated PRD requirement summarization, dependency mapping, and qualitative feedback clustering using advanced synthesis tools.</p>
              </div>
              <div className="bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl">
                <span className="font-extrabold text-cyan-400 block mb-1">Cursor Feasibility Validation</span>
                <p className="text-zinc-400 leading-relaxed font-medium">Validated frontend implementation details, responsive layout patterns, and enterprise table behaviors in browser runtime environments to bridge designs with engineering constraints.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 dark:text-zinc-550 mb-3 block">Workflow Redesign</h2>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Structuring Complex Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              <div>
                <h4 className="font-extrabold text-xs uppercase text-zinc-800 dark:text-zinc-250 mb-1.5">Guided Provisioning</h4>
                <p>Restructured configuration paths using progressive disclosure and clear navigation wizard paradigms to simplify multi-step IT configurations.</p>
              </div>
              <div>
                <h4 className="font-extrabold text-xs uppercase text-zinc-800 dark:text-zinc-250 mb-1.5">GPU Resource Allocation</h4>
                <p>Redesigned hardware allocation tables to provide instant operational transparent states and system observability metrics.</p>
              </div>
              <div className="border-t border-zinc-150 dark:border-zinc-850 pt-5 sm:border-t-0 sm:pt-0">
                <h4 className="font-extrabold text-xs uppercase text-zinc-800 dark:text-zinc-250 mb-1.5">RBAC Workflows</h4>
                <p>Reorganized access management structures, improving permission hierarchies and resolving security confusion.</p>
              </div>
              <div className="border-t border-zinc-150 dark:border-zinc-850 pt-5 sm:border-t-0 sm:pt-0">
                <h4 className="font-extrabold text-xs uppercase text-zinc-800 dark:text-zinc-250 mb-1.5">Monitoring & Observability</h4>
                <p>Constructed rich observability dashboards complete with unified metric summaries and actionable telemetry insights.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-8">
          <SidebarGeneral project={project} />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Component 4: AI Onboarding Layout
// -------------------------------------------------------------
function AIOnboardingLayout({ project }: { project: any }) {
  return (
    <div className="animate-fade-in">
      <section className="mb-10 text-left">
        <span className="px-3.5 py-1.5 bg-violet-50 dark:bg-violet-950/20 border border-violet-200/50 dark:border-violet-900/30 rounded-full text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest inline-block mb-4 shadow-sm">
          HR Technology & AI Consolidation
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-955 dark:text-white mb-3 leading-[1.1] max-w-4xl">
          AI-Powered Onboarding Platform
        </h1>
        <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 dark:from-violet-400 dark:to-cyan-400 bg-clip-text text-transparent leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { title: "Industry", val: "HR Technology" },
          { title: "Core Scope", val: "End-to-End Product Design" },
          { title: "Product Type", val: "AI workflow Consolidation" },
          { title: "Outcome", val: "50% Effort Reduction" }
        ].map((fact, idx) => (
          <div key={idx} className="bg-white/80 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/40 p-5 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{fact.title}</span>
            <span className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-tight">{fact.val}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 flex flex-col gap-12">
          
          <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 dark:text-zinc-550 mb-3 block">Executive Summary & Context</h2>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Consolidating Fragmented Operations</h3>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-4">
              Led the end-to-end design of an AI-powered employee onboarding platform that transformed a highly fragmented onboarding process into a unified operational experience.
            </p>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed">
              Consolidated multiple disconnected tools—including email, spreadsheets, messaging applications, and manual HR coordination—into a single workflow-driven system to resolve multi-stakeholder IT and administrative bottlenecks.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/5 dark:to-zinc-900/40 border border-amber-200/40 dark:border-amber-950/20 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-amber-700 dark:text-amber-500">The Challenge</h2>
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-5 leading-tight">Disconnected Tools & Visibility Gaps</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {[
                { title: "Disconnected Tools", desc: "Teams relied on emails, Excel trackers, WhatsApp groups, and manual files." },
                { title: "Lack of Visibility", desc: "Stakeholders had limited tracking visibility and depended entirely on HR follow-ups." },
                { title: "Manual Coordination", desc: "HR spent excessive cycles managing trackers, emails, and repeated task updates." },
                { title: "Process Bottlenecks", desc: "Disconnected systems generated critical onboarding bottlenecks and delays." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start bg-white/40 dark:bg-zinc-900/20 border border-zinc-200/40 dark:border-zinc-800/45 p-4 rounded-xl">
                  <span className="text-amber-500 font-bold">✕</span>
                  <div>
                    <h4 className="text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-zinc-550 dark:text-zinc-400 leading-relaxed font-semibold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl text-zinc-100">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-zinc-400 mb-3 block">AI-Assisted Features</h2>
            <h3 className="text-2xl font-black text-white mb-6 leading-tight">Thoughtful Administrative Automation</h3>
            <div className="flex flex-col gap-4 text-xs text-zinc-400 font-medium">
              <div className="flex gap-3 bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl">
                <span className="text-violet-400 font-black">⚙</span>
                <div>
                  <h4 className="font-extrabold text-cyan-400 mb-1">Intelligent Workflow Guidance</h4>
                  <p className="leading-relaxed">Instructs stakeholders on the exact next actions and documentation requirements automatically.</p>
                </div>
              </div>
              <div className="flex gap-3 bg-zinc-950/40 border border-zinc-850 p-4 rounded-xl">
                <span className="text-violet-400 font-black">⚙</span>
                <div>
                  <h4 className="font-extrabold text-cyan-400 mb-1">Automated Milestone Observability</h4>
                  <p className="leading-relaxed">Tracks and communicates progress instantly without manual intervention or spreadsheets.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/10 dark:to-zinc-900/40 border border-emerald-250 dark:border-emerald-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400">Onboarding Outcomes</h2>
            </div>
            <h3 className="text-2xl font-black text-emerald-800 dark:text-emerald-300 mb-5 leading-tight">Proven Operational Optimization</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Manual Coordination Effort", val: "~50% Less" },
                { label: "Progress Observability", val: "Real-Time Dashboard" },
                { label: "Process Transparency", val: "Centralized" },
                { label: "Onboarding Capacity", val: "Highly Scalable" }
              ].map((metric, idx) => (
                <div key={idx} className="bg-white/80 dark:bg-emerald-950/20 border border-emerald-250/40 dark:border-emerald-900/30 p-4 rounded-2xl flex flex-col">
                  <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">{metric.label}</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 leading-tight">{metric.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-8">
          <SidebarGeneral project={project} />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Sidebar Shared Panel Component
// -------------------------------------------------------------
function SidebarGeneral({ project }: { project: any }) {
  return (
    <>
      {/* Project Overview metadata */}
      <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 backdrop-blur-sm p-6 rounded-3xl shadow-sm flex flex-col gap-6">
        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-850 pb-3">
          Project Insights
        </h3>
        
        <div>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">DESIGN SPEC</span>
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Enterprise console workflows, accessibility compliant</span>
        </div>
        
        <div>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">Visual Focus</span>
          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Information clarity, interactive flows, layout hierarchies</span>
        </div>
        
        <div>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-550 uppercase tracking-widest block mb-1">Tags</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((tag: string, i: number) => (
              <span 
                key={i} 
                className="text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded-md text-zinc-650 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recruiter Differentiator card */}
      <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 p-6 rounded-3xl shadow-sm flex flex-col gap-6">
        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-850 pb-3">
          Recruiter Differentiators
        </h3>

        {[
          {
            title: "Deep Domain Expertise",
            desc: "Designs specialized, highly technical enterprise developer products involving Kubernetes, access structures, and container topologies."
          },
          {
            title: "Implementation-Aware",
            desc: "Bridges the gap with engineers by understanding React lifecycles, CSS limits, and layout parameters."
          },
          {
            title: "Systems Thinker",
            desc: "Focuses on complex operational processes over simple aesthetics, designing robust state flows and high-density layouts."
          }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1 text-left">
            <span className="text-xs font-black text-cyan-600 dark:text-cyan-400 block uppercase tracking-wider">
              {item.title}
            </span>
            <span className="text-zinc-500 dark:text-zinc-450 text-xs font-medium leading-relaxed">
              {item.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Key Learnings Panel */}
      <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/40 p-6 rounded-3xl shadow-sm flex flex-col gap-4">
        <h3 className="text-sm font-extrabold text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-850 pb-3">
          Key Learnings
        </h3>

        <ul className="flex flex-col gap-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-450 font-medium">
          <li>💡 **Enterprise UX** is fundamentally about operational efficiency and scan patterns over minimalism.</li>
          <li>⚙️ **Workflow Architecture** and state mapping hold much more priority than aesthetic modifications.</li>
          <li>🤖 **AI-Assisted discovery** models drastically accelerate document requirement clustering.</li>
          <li>🔍 **Progressive Disclosure** is critical in data-heavy administrative consoles.</li>
        </ul>
      </div>

      {/* Persistent CTA Box */}
      <div className="bg-gradient-to-br from-violet-50 to-zinc-50 dark:from-violet-950/10 dark:to-zinc-900/40 border border-violet-200/40 dark:border-violet-900/20 p-6 rounded-3xl shadow-lg flex flex-col gap-4 text-center">
        <h4 className="text-sm font-bold text-zinc-850 dark:text-zinc-200 leading-snug">
          Interested in modernizing your platform?
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          Let's collaborate on complex dashboards, UX audits, or system structures.
        </p>
        
        <div className="flex flex-col gap-3 mt-2 w-full">
          <a 
            href="mailto:allwin110@live.in"
            className="w-full inline-flex items-center justify-center px-6 py-3.5 bg-violet-600 hover:bg-violet-750 dark:bg-violet-600 dark:hover:bg-violet-550 text-white font-bold rounded-2xl transition-all text-xs shadow-md shadow-violet-950/10 cursor-pointer"
          >
            ✉ Email Me
          </a>
          <Link 
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold rounded-2xl transition-all text-xs cursor-pointer"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </>
  );
}
