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
    summary: "Lead product design across enterprise infrastructure and AI-assisted workflows.",
    highlights: [
      "Lead end-to-end UX for cloud orchestration and infrastructure administration.",
      "Design provisioning, role-based access, deployment monitoring, and operational workflows.",
      "Designed an AI-assisted onboarding journey around clear task ownership and status visibility.",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "Swirepay Technologies",
    logo: "/images/companies/swirepay.png",
    location: "Chennai, India",
    period: "Apr 2023 – Nov 2023",
    summary: "Improve payment and event-booking flows through research and accessible design.",
    highlights: [
      "Used research and usability testing to identify friction in transaction completion.",
      "Built a WCAG-compliant design system for consistent product experiences.",
      "Designed event seat selection and booking flows.",
    ],
  },
  {
    role: "Senior Business Presentation Designer",
    company: "McKinsey & Company",
    logo: "/images/companies/mckinsey.png",
    location: "Chennai, India",
    period: "Apr 2016 – Mar 2023",
    summary: "Turn complex information into clear visual systems and useful internal tools.",
    highlights: [
      "Designed an HRIS dashboard for safe office seat booking across regions during COVID.",
      "Created a global design repository to make team assets easier to find and reuse.",
    ],
  },
  {
    role: "Senior Customer Service Agent",
    company: "Jet Airways",
    logo: "/images/companies/jet-airways.png",
    location: "Chennai, India",
    period: "Nov 2013 – Apr 2016",
    summary: "Build a front-line service perspective on customer and operational experiences.",
    highlights: [
      "Managed and trained a 20-person customer service team.",
      "Wrote baggage-service procedures for recurring operational issues.",
      "Supported more than 500 baggage-service issue resolutions each month.",
    ],
  },
];

const categories = ["All", "Enterprise UX", "SaaS UX", "AI & Workflows"];

const networks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/allwin-alex91/", mark: "linkedin" },
  { label: "Behance", href: "https://www.behance.net/allwinalex", mark: "behance" },
  { label: "Naukri", href: "https://www.naukri.com/mnjuser/profile", mark: "naukri" },
  { label: "Naukri Gulf", href: "https://www.naukrigulf.com/mnj/userProfile/myCV?source=gnbHeader", mark: "naukri-gulf" },
  { label: "Instagram", href: "https://www.instagram.com/myself_allwin/", mark: "instagram" },
];

function SocialMark({ mark }: { mark: string }) {
  if (mark === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9.5H7v11H3.4v-11Zm5.8 0h3.4V11h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v5.95h-3.55v-5.27c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.79v5.36H9.2v-11Z" /></svg>;
  if (mark === "instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="social-mark-flash" cx="17.6" cy="6.6" r="1" /></svg>;
  if (mark === "behance") return <span className="social-wordmark social-wordmark-behance" aria-hidden="true">Bē</span>;
  if (mark === "naukri-gulf") return <span className="social-wordmark social-wordmark-naukri social-wordmark-gulf" aria-hidden="true"><span>naukri</span><small>GULF</small></span>;
  return <span className="social-wordmark social-wordmark-naukri" aria-hidden="true"><span>naukri</span></span>;
}

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

        <section className="ux-focus page-width section-space" id="about" tabIndex={-1} aria-labelledby="about-title">
          <div className="ux-focus-heading" data-reveal>
            <p className="section-kicker">Product design, in practice</p>
            <h2 id="about-title">I make the next step clear.</h2>
            <p>From cloud operations to onboarding, I design the moments where people need to understand a system and move work forward.</p>
          </div>
          <div className="ux-focus-grid">
            <article data-reveal><span>01 / SEE THE SYSTEM</span><h3>Complex workflows</h3><p>Map roles, states, permissions, and hand-offs so teams can see how work moves.</p></article>
            <article data-reveal><span>02 / SHAPE THE FLOW</span><h3>Useful interfaces</h3><p>Turn dense operational tasks into clear dashboards, guided steps, and readable decisions.</p></article>
            <article data-reveal><span>03 / MAKE IT BUILDABLE</span><h3>Product foundations</h3><p>Bring interaction patterns, accessibility, and engineering constraints into one coherent experience.</p></article>
          </div>
        </section>

        <section className="work-section section-space" id="work" aria-labelledby="work-title">
          <div className="page-width work-inner">
            <div className="work-heading" data-reveal>
              <div>
                <p className="section-kicker">Selected work <span aria-hidden="true">/ 04 case studies</span></p>
                <h2 id="work-title">The work, in practice.</h2>
                <p className="section-description">Four projects shaped by the people who use them and the systems they rely on.</p>
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
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                      setActiveFlippedProjectId(project.id);
                    }
                  }}
                  onPointerMove={(event) => {
                    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
                      <Link className="project-card-deep-dive" href={`/projects/${project.id}`} aria-label={`Open ${project.title} case study`}>
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
                      </div>
                      </Link>
                    </div>
                    <div className="project-card-face project-card-back" inert={!isProjectFlipped} aria-hidden={!isProjectFlipped}>
                      <p className="project-back-eyebrow">Project objective <span aria-hidden="true">/ 0{index + 1}</span></p>
                      <h3>{project.title}</h3>
                      <p className="project-objective">{project.challenge}</p>
                      <div className="project-outcome"><span>Outcome</span><p>{project.results}</p></div>
                      <Link className="text-link project-deep-dive-link" href={`/projects/${project.id}`} aria-label={`Explore the ${project.title} deep dive`}>Explore the deep dive <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10" /></svg></Link>
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
            {experienceTimeline.map((job, index) => (
            <article className="experience-item" key={job.company} data-reveal style={{ "--career-index": index } as CSSProperties}>
                <span className="experience-step" aria-hidden="true">0{index + 1}<span> / 0{experienceTimeline.length}</span></span>
                <div className="experience-meta">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
                <div className="experience-detail">
                  <h3>{job.role}</h3>
                  <p className="experience-summary">{job.summary}</p>
                  <div className="experience-company-line">
                    <p className="experience-company">{job.company}</p>
                    <Image src={job.logo} alt="" width={120} height={44} className="experience-company-logo" />
                  </div>
                  <ul className="career-highlights">
                    {job.highlights.map((highlight) => <li key={highlight}><span aria-hidden="true">↗</span><p>{highlight}</p></li>)}
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
                    <li key={network.label}><a className={`social-mark-link social-mark-link-${network.mark}`} href={network.href} target="_blank" rel="noopener noreferrer" aria-label={`${network.label} (opens in a new tab)`} title={network.label}><span className={`social-mark social-mark-${network.mark}`} aria-hidden="true"><SocialMark mark={network.mark} /></span></a></li>
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
