'use client';

import { startTransition, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "./data/projects";
import { Button, buttonVariants } from "@/components/ui/button";
import { PortfolioCursor } from "@/components/portfolio-cursor";

const experienceTimeline = [
  {
    role: "UX Lead Designer",
    company: "Aziro Technologies Pvt. Ltd.",
    logo: "/images/companies/aziro.png",
    location: "Chennai, India",
    period: "Nov 2023 – Present",
    highlights: [
      "Led end-to-end UX for enterprise cloud orchestration and infrastructure administration platforms.",
      "Simplified provisioning, role-based access, deployment monitoring, and operational workflows.",
      "Designed an AI-assisted onboarding experience that cut candidate onboarding time by 70%.",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "Swirepay Technologies",
    logo: "/images/companies/swirepay.png",
    location: "Chennai, India",
    period: "Apr 2023 – Nov 2023",
    highlights: [
      "Research and usability work reduced transaction completion time by 50%.",
      "Built a WCAG-compliant design system and designed event seat booking flows that increased retention by 25%.",
    ],
  },
  {
    role: "Senior Business Presentation Designer",
    company: "McKinsey & Company",
    logo: "/images/companies/mckinsey.png",
    location: "Chennai, India",
    period: "Apr 2016 – Mar 2023",
    highlights: [
      "Designed an HRIS dashboard for safe office seat booking across regions during COVID.",
      "Created a global design repository that cut team asset search time by 60%.",
    ],
  },
  {
    role: "Senior Customer Service Agent",
    company: "Jet Airways",
    logo: "/images/companies/jet-airways.png",
    location: "Chennai, India",
    period: "Nov 2013 – Apr 2016",
    highlights: [
      "Managed and trained a 20-person service team, improving complaint resolution KPIs by 40%.",
      "Wrote baggage-service procedures supporting more than 500 issue resolutions each month.",
    ],
  },
];

const categories = ["All", "Enterprise UX", "SaaS UX", "AI & Workflows"];

const networks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/allwin-alex91/" },
  { label: "Behance", href: "https://www.behance.net/allwinalex" },
  { label: "Naukri", href: "https://www.naukri.com/mnjuser/profile" },
  { label: "Naukri Gulf", href: "https://www.naukrigulf.com/mnj/userProfile/myCV?source=gnbHeader" },
  { label: "Instagram", href: "https://www.instagram.com/myself_allwin/" },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFlippedProjectId, setActiveFlippedProjectId] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      startTransition(() => setTheme(savedTheme));
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("motion-ready");
    return () => document.documentElement.classList.remove("motion-ready");
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeCategory]);

  const visibleProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === activeCategory);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell" data-theme={theme}>
      <PortfolioCursor />
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header glass-surface">
        <Link className="wordmark" href="#home" onClick={closeMenu}>
          Allwin Alex<span aria-hidden="true">.</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            ref={menuButtonRef}
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 17a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4.22 4.22a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42Zm12.02 12.02a1 1 0 0 1 1.42 0l.7.7a1 1 0 0 1-1.42 1.42l-.7-.7a1 1 0 0 1 0-1.42ZM2 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Zm17 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.22 19.78a1 1 0 0 1 0-1.42l.7-.7a1 1 0 1 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0ZM16.24 5.64a1 1 0 0 1 0-1.42l.7-.7a1 1 0 0 1 1.42 1.42l-.7.7a1 1 0 0 1-1.42 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.37 5.51A8.5 8.5 0 0 0 18.49 14.6 8.5 8.5 0 1 1 9.37 5.51Zm3.04-2.3a10.5 10.5 0 1 0 8.38 13.91 1 1 0 0 0-1.16-1.38A6.5 6.5 0 0 1 10.1 6.2a1 1 0 0 0-1.38-1.16c1.04-.72 2.3-1.27 3.69-1.82Z" /></svg>
            )}
          </Button>
          <a className={buttonVariants({ variant: "default", size: "default", className: "header-cta" })} href="#contact">Let’s talk</a>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span />
            <span />
          </Button>
        </div>

        <nav className="mobile-nav glass-surface" id="mobile-navigation" aria-label="Mobile navigation" hidden={!menuOpen}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>
      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-layout page-width">
            <div className="hero-copy" data-reveal>
              <p className="hero-role"><span className="role-dot" aria-hidden="true" /> <span>Allwin Alex</span><span aria-hidden="true">·</span><span>Senior product designer</span></p>
              <h1 id="hero-title">Complex systems.<br /><span>Clear decisions.</span></h1>
              <p className="hero-statement">I design cloud, SaaS, and AI products that help people make confident decisions.</p>
              <div className="hero-actions">
                <a className={buttonVariants({ variant: "default", size: "lg", className: "button-primary" })} href="#work">View selected work</a>
                <a className={buttonVariants({ variant: "outline", size: "lg", className: "button-quiet" })} href="/Allwin_Alex_Resume.pdf" download>Download résumé <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" /></svg></a>
              </div>
            </div>
            <figure className="hero-media hero-hairline" data-reveal onPointerMove={(event) => {
              if (event.pointerType !== "mouse") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 2}`);
              event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 2}`);
            }} onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--pointer-x", "0");
              event.currentTarget.style.setProperty("--pointer-y", "0");
            }}>
              <div className="hero-glow" aria-hidden="true" />
              <div className="hero-portrait-backdrop" aria-hidden="true">
                <span className="portrait-orbit portrait-orbit-one" />
                <span className="portrait-orbit portrait-orbit-two" />
                <span className="portrait-grid" />
              </div>
                  <Image
                src={theme === "dark" ? "/images/allwin-hero-dark-cutout.png" : "/images/allwin-hero-light-cutout.png"}
                alt={theme === "dark" ? "Allwin Alex in a black suit, monochrome portrait." : "Allwin Alex in a blue blazer and white shirt."}
                fill
                priority
                sizes="(max-width: 700px) 96vw, 48vw"
                className="hero-photo"
              />
              <div className="hero-orbit-label glass-surface" aria-hidden="true">
                <span className="orbit-label-mark">A.</span>
                <span><strong>Product design</strong><small>Cloud · SaaS · AI</small></span>
              </div>
              <figcaption className="hero-image-caption glass-surface">
                <span>Designing for clarity</span>
                <span>Chennai, India <span aria-hidden="true">↗</span></span>
              </figcaption>
            </figure>
          </div>
          <div className="hero-proof page-width" aria-label="Career highlights">
            <div className="hero-proof-intro">Clarity, measured in outcomes</div>
            <div><strong>9+</strong><span>Years in product design</span></div>
            <div><strong>30+</strong><span>Enterprise projects</span></div>
            <div><strong>5+</strong><span>AI workflows designed</span></div>
            <a className="hero-proof-link" href="#work">Explore the work <svg className="explore-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7 17 17M17 7v10H7" /></svg></a>
          </div>
        </section>

        <section className="about-section page-width section-space" id="about" tabIndex={-1} aria-labelledby="about-title">
          <div className="about-index" data-reveal>
            <p className="section-kicker">A little context</p>
            <span className="about-index-number" aria-hidden="true">01</span>
          </div>
          <div className="about-content" data-reveal>
            <h2 id="about-title">I work where complex systems meet real people.</h2>
            <div className="about-bottom">
              <p className="about-primary">With more than nine years across product design and service operations, I turn dense workflows into clear, confident experiences.</p>
              <ul className="focus-list" aria-label="Areas of focus">
                <li>Cloud & infrastructure</li>
                <li>AI-assisted workflows</li>
                <li>Design systems & accessibility</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="approach-section" aria-labelledby="approach-title">
          <div className="approach-inner page-width">
            <div className="approach-intro" data-reveal>
              <p className="section-kicker">How I work</p>
              <h2 id="approach-title">Good design starts before the interface.</h2>
              <p>I connect user needs, system constraints, and engineering realities—so the result works beyond the prototype.</p>
              <div className="systems-map-panel">
                <div className="approach-hairline-caption"><span>Systems in motion</span><span>From insight to impact</span></div>
                <svg className="systems-route-map" viewBox="0 0 560 320" role="img" aria-labelledby="systems-map-title systems-map-description">
                  <title id="systems-map-title">A living map of the design process</title>
                  <desc id="systems-map-description">Three illuminated stages connect research, system design, and prototyping on a dimensional map.</desc>
                  <defs>
                    <linearGradient id="route-light" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#7bdcff" />
                      <stop offset=".52" stopColor="#9b9aff" />
                      <stop offset="1" stopColor="#ffb8e2" />
                    </linearGradient>
                    <filter id="route-glow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="4" result="softGlow" />
                      <feMerge><feMergeNode in="softGlow" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <path className="systems-map-plane" d="M280 24 535 160 280 296 25 160Z" />
                  <g className="systems-map-grid" aria-hidden="true">
                    <path d="M52 175 280 53 508 175M78 189 280 81 482 189M105 203 280 109 455 203M132 217 280 137 428 217M159 231 280 165 401 231M186 245 280 193 374 245" />
                    <path d="m72 135 228 121m-175-149 228 121m-175-149 228 121m-175-149 228 121M488 135 260 256m175-149L207 228m175-149L154 200m175-149L101 172m175-149L48 144" />
                  </g>
                  <path className="systems-route-base" d="M119 177 280 91 441 177" />
                  <path className="systems-route-flow" d="M119 177 280 91 441 177" />
                  <g className="systems-route-node node-research" transform="translate(119 177)">
                    <path className="node-face node-left" d="m0-34 39 21v25L0 34-39 12v-25Z" />
                    <path className="node-face node-top" d="m0-34 39 21L0 9-39-13Z" />
                    <path className="node-outline" d="m0-24 28 15L0 7-28-9Z" />
                    <circle className="node-light" cy="-9" r="5" />
                    <text x="0" y="57" textAnchor="middle">01 / DISCOVER</text>
                  </g>
                  <g className="systems-route-node node-shape" transform="translate(280 91)">
                    <path className="node-face node-left" d="m0-34 39 21v25L0 34-39 12v-25Z" />
                    <path className="node-face node-top" d="m0-34 39 21L0 9-39-13Z" />
                    <path className="node-outline" d="m0-24 28 15L0 7-28-9Z" />
                    <circle className="node-light" cy="-9" r="5" />
                    <text x="0" y="57" textAnchor="middle">02 / SHAPE</text>
                  </g>
                  <g className="systems-route-node node-prove" transform="translate(441 177)">
                    <path className="node-face node-left" d="m0-34 39 21v25L0 34-39 12v-25Z" />
                    <path className="node-face node-top" d="m0-34 39 21L0 9-39-13Z" />
                    <path className="node-outline" d="m0-24 28 15L0 7-28-9Z" />
                    <circle className="node-light" cy="-9" r="5" />
                    <text x="0" y="57" textAnchor="middle">03 / PROVE</text>
                  </g>
                  <circle className="systems-route-pulse" r="5">
                    <animateMotion dur="5s" repeatCount="indefinite" path="M119 177 280 91 441 177" />
                  </circle>
                </svg>
              </div>
            </div>
            <div className="approach-steps">
              <article className="approach-step" data-reveal>
                <span className="approach-node" aria-hidden="true">01</span>
                <div><h3>Find the real problem</h3><p>Map the people, decisions, and constraints behind a workflow.</p></div>
              </article>
              <article className="approach-step" data-reveal>
                <span className="approach-node" aria-hidden="true">02</span>
                <div><h3>Shape the system</h3><p>Make information, roles, and next steps feel clear and connected.</p></div>
              </article>
              <article className="approach-step" data-reveal>
                <span className="approach-node" aria-hidden="true">03</span>
                <div><h3>Prove it in context</h3><p>Prototype, test, and work with engineering toward a buildable answer.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="work-section section-space" id="work" aria-labelledby="work-title">
          <div className="page-width work-inner">
            <div className="work-heading" data-reveal>
              <div>
                <p className="section-kicker">Selected work <span aria-hidden="true">/ 04 case studies</span></p>
                <h2 id="work-title">Built for the moments that matter.</h2>
                <p className="section-description">A closer look at the systems, workflows, and decisions behind each product.</p>
              </div>
              <div className="work-filters glass-surface" role="group" aria-label="Filter projects by category">
                {categories.map((category) => (
                  <Button
                    variant={activeCategory === category ? "default" : "outline"}
                    size="default"
                    type="button"
                    key={category}
                    className={activeCategory === category ? "filter-button is-active" : "filter-button"}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="project-list" aria-live="polite">
              <svg className="project-hanging-rail" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="hanging-wire-gradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7899c8" stopOpacity=".5" /><stop offset=".5" stopColor="#9f91cf" /><stop offset="1" stopColor="#7899c8" stopOpacity=".5" /></linearGradient></defs>
                <path d="M0 8 Q500 180 1000 8" />
              </svg>
              {visibleProjects.map((project, index) => {
                const isProjectFlipped = activeFlippedProjectId === project.id;
                const ropePosition = (index + 0.5) / visibleProjects.length;
                const ropeDrop = 48 * 4 * ropePosition * (1 - ropePosition);
                return (
                <article
                  className="project-row"
                  key={project.id}
                  style={{ "--rope-drop": `${ropeDrop}px` } as CSSProperties}
                  data-reveal
                  data-flipped={isProjectFlipped}
                  onPointerMove={(event) => {
                    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
                    setActiveFlippedProjectId(project.id);
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
                    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
                    event.currentTarget.style.setProperty("--card-rotate-x", `${y * -7}deg`);
                    event.currentTarget.style.setProperty("--card-rotate-y", `${x * 8}deg`);
                    event.currentTarget.style.setProperty("--card-glow-x", `${(x + 1) * 50}%`);
                    event.currentTarget.style.setProperty("--card-glow-y", `${(y + 1) * 50}%`);
                    event.currentTarget.style.setProperty("--card-glow-hue", `${198 + ((x + 1) / 2) * 82}`);
                  }}
                  onPointerLeave={(event) => {
                    setActiveFlippedProjectId((current) => current === project.id ? null : current);
                    event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
                    event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
                    event.currentTarget.style.setProperty("--card-glow-x", "50%");
                    event.currentTarget.style.setProperty("--card-glow-y", "45%");
                    event.currentTarget.style.setProperty("--card-glow-hue", "218");
                  }}
                >
                  <div className="project-card-shell">
                    <span className="project-card-sheen" aria-hidden="true" />
                    <button className="project-flip-toggle" type="button" aria-pressed={isProjectFlipped} aria-label={isProjectFlipped ? `Show ${project.title} overview` : `Show ${project.title} objective`} onClick={() => setActiveFlippedProjectId((current) => current === project.id ? null : project.id)}>
                      {isProjectFlipped ? "Overview" : "Objective"}
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14-5L4 8m0 0V4m0 4h4M4 13a8 8 0 0 0 14 5l2-2m0 0v4m0-4h-4" /></svg>
                    </button>
                    <div className="project-card-flipper">
                    <div className="project-card-face project-card-front" inert={isProjectFlipped} aria-hidden={isProjectFlipped}>
                      <div className="project-card-image" aria-hidden="true">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          sizes="(max-width: 760px) 84vw, 25vw"
                          priority={index === 0}
                          className="project-image"
                        />
                        <span className="project-image-index" aria-hidden="true">0{index + 1} <span>/ 0{visibleProjects.length}</span></span>
                      </div>
                      <div className="project-copy">
                        <p className="project-category">{project.category} <span aria-hidden="true">·</span> {project.subtitle}</p>
                        <h3>{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <ul className="project-tags" aria-label={`${project.title} focus areas`}>
                          {project.tags.slice(0, 2).map((tag) => <li key={tag}>{tag}</li>)}
                        </ul>
                        <Link className="text-link" href={`/projects/${project.id}`} aria-label={`Read ${project.title} case study`}>Read case study <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10" /></svg></Link>
                      </div>
                    </div>
                    <div className="project-card-face project-card-back" inert={!isProjectFlipped} aria-hidden={!isProjectFlipped}>
                      <p className="project-back-eyebrow">Project objective <span aria-hidden="true">/ 0{index + 1}</span></p>
                      <h3>{project.title}</h3>
                      <p className="project-objective">{project.challenge}</p>
                      <div className="project-outcome"><span>Outcome</span><p>{project.results}</p></div>
                    </div>
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="experience-section section-space" id="experience" aria-labelledby="experience-title">
          <div className="page-width experience-inner">
          <div className="experience-heading">
            <p className="section-kicker">Experience</p>
            <h2 id="experience-title">A career shaped by people and systems.</h2>
            <p className="section-description">From customer operations to leading product design for enterprise software.</p>
          </div>
          <div className="experience-list">
            {experienceTimeline.map((job) => (
              <article className="experience-item" key={job.company} data-reveal>
                <div className="experience-meta">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
                <div className="experience-detail">
                  <h3>{job.role}</h3>
                  <div className="experience-company-line">
                    <p className="experience-company">{job.company}</p>
                    <Image src={job.logo} alt="" width={120} height={44} className="experience-company-logo" />
                  </div>
                  <ul>
                    {job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section className="contact-section section-space" id="contact" aria-labelledby="contact-title">
          <div className="page-width contact-inner">
            <div className="contact-main" data-reveal>
              <p className="section-kicker">Have a complex problem?</p>
              <h2 id="contact-title">Let’s make it feel clear.</h2>
              <p className="section-description">For product design roles, enterprise UX projects, or a thoughtful conversation about systems design.</p>
              <div className="contact-actions">
                <a className={buttonVariants({ variant: "default", size: "lg", className: "button-primary contact-email" })} href="mailto:allwin110@live.in">Email Allwin <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <aside className="contact-card glass-surface" data-reveal aria-label="Contact and social profiles">
              <div className="contact-card-heading"><span className="contact-card-mark"><Image src="/images/allwin-cutout.png" alt="" fill sizes="40px" className="contact-card-avatar" /></span><div><strong>Allwin Alex</strong><span>Product design · Chennai</span></div></div>
              <h3>Let’s start a conversation.</h3>
              <a className="contact-card-email" href="mailto:allwin110@live.in">allwin110@live.in <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10" /></svg></a>
              <div className="contact-networks">
                <h4>Elsewhere</h4>
                <ul>
                  {networks.map((network) => (
                    <li key={network.label}><a href={network.href} target="_blank" rel="noopener noreferrer">{network.label}<span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span></a></li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <Link className="wordmark" href="#home">Allwin Alex<span aria-hidden="true">.</span></Link>
        <p>© {new Date().getFullYear()} Allwin Alex <span aria-hidden="true">·</span> Product design, Chennai</p>
        <span className="footer-note">Designed for clarity, built with care.</span>
      </footer>
      <a className="back-to-top-fab" href="#home" aria-label="Back to top" title="Back to top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m0 0 6 6m-6-6-6 6" /></svg></a>
    </div>
  );
}
