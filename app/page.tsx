'use client';

import { startTransition, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "./data/projects";
import { Button, buttonVariants } from "@/components/ui/button";

const experienceTimeline = [
  {
    role: "UX Lead Designer",
    company: "Aziro Technologies Pvt. Ltd.",
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

    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (revealItems.length === 0) return;

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    revealItems.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  const visibleProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === activeCategory);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell" data-theme={theme}>
      <a className="skip-link" href="#about">Skip to main content</a>
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
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.07-7.07-1.42 1.42M6.35 17.65l-1.42 1.42m14.14 0-1.42-1.42M6.35 6.35 4.93 4.93" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" /></svg>
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
              <p className="hero-role"><span className="role-dot" aria-hidden="true" /> Allwin Alex <span aria-hidden="true">·</span> Senior product designer</p>
              <h1 id="hero-title">Complex systems.<br /><span>Clear decisions.</span></h1>
              <p className="hero-statement">I design cloud, SaaS, and AI products that help people make confident decisions.</p>
              <div className="hero-actions">
                <a className={buttonVariants({ variant: "default", size: "lg", className: "button-primary" })} href="#work">View selected work</a>
                <a className={buttonVariants({ variant: "outline", size: "lg", className: "button-quiet" })} href="/Allwin_Alex_Resume.pdf" download>Download résumé <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" /></svg></a>
              </div>
            </div>
            <figure className="hero-media" data-reveal>
              <div className="hero-glow" aria-hidden="true" />
              <div className="hero-portrait-backdrop" aria-hidden="true">
                <span className="portrait-orbit portrait-orbit-one" />
                <span className="portrait-orbit portrait-orbit-two" />
                <span className="portrait-grid" />
              </div>
              <Image
                src="/images/allwin-cutout.png"
                alt="Allwin Alex seated in a light grey suit."
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
            <div className="hero-proof-intro">The work, in perspective</div>
            <div><strong>9+</strong><span>Years in product design</span></div>
            <div><strong>30+</strong><span>Enterprise projects</span></div>
            <div><strong>5+</strong><span>AI workflows designed</span></div>
            <a className="hero-proof-link" href="#work">Explore the work <span aria-hidden="true">↓</span></a>
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
              {visibleProjects.map((project, index) => (
                <article className={`project-row${index % 2 === 1 ? " project-row-reverse" : ""}${index === 0 ? " project-featured" : ""}`} key={project.id} data-reveal>
                  <Link className="project-image-link" href={`/projects/${project.id}`} aria-label={`View ${project.title} case study`}>
                    <Image
                      src={project.image}
                      alt={project.imageNames?.[0] ?? `${project.title} interface`}
                      fill
                      sizes="(max-width: 760px) 100vw, 56vw"
                      priority={index === 0}
                      className="project-image"
                    />
                    <span className="project-image-index" aria-hidden="true">0{index + 1} <span>/ 0{visibleProjects.length}</span></span>
                    <span className="image-open" aria-hidden="true">↗</span>
                  </Link>
                  <div className="project-copy">
                    <p className="project-category">{project.category} <span aria-hidden="true">·</span> {project.subtitle}</p>
                    <h3><Link href={`/projects/${project.id}`}>{project.title}</Link></h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-outcome"><span>Outcome</span><p>{project.results}</p></div>
                    <ul className="project-tags" aria-label={`${project.title} focus areas`}>
                      {project.tags.slice(0, 3).map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                    <Link className="text-link" href={`/projects/${project.id}`}>Read case study <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              ))}
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
                  <p className="experience-company">{job.company}</p>
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
              <a className="contact-card-email" href="mailto:allwin110@live.in">allwin110@live.in <span aria-hidden="true">↗</span></a>
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
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
