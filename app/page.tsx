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
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
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

  const visibleProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter((project) => project.category === activeCategory);

  const closeMenu = () => setMenuOpen(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText("+919677193923");
      setPhoneCopied(true);
      window.setTimeout(() => setPhoneCopied(false), 1800);
    } catch {
      setPhoneCopied(false);
    }
  };

  return (
    <div className="portfolio-shell" data-theme={theme}>
      <a className="skip-link" href="#about">Skip to main content</a>
      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
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
                <a className={buttonVariants({ variant: "default", size: "default", className: "header-cta" })} href="#contact">Contact</a>
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

          <div className="hero-layout page-width">
            <div className="hero-copy">
              <p className="hero-role">Senior product designer <span aria-hidden="true">·</span> Enterprise UX</p>
              <h1 id="hero-title">Allwin Alex<span className="hero-period">.</span></h1>
              <p className="hero-statement">I make complex cloud, SaaS, and AI products easier to understand and use.</p>
              <div className="hero-actions">
                <a className={buttonVariants({ variant: "default", size: "lg", className: "button-primary" })} href="#work">View selected work</a>
                <a className={buttonVariants({ variant: "outline", size: "lg", className: "button-quiet" })} href="/Allwin_Alex_Resume.pdf" download>Download résumé</a>
              </div>
              <div className="hero-stats" aria-label="Career highlights">
                <div><strong>9+</strong><span>Years in product design</span></div>
                <div><strong>30+</strong><span>Enterprise projects</span></div>
                <div><strong>5+</strong><span>AI workflows designed</span></div>
              </div>
            </div>
            <figure className="hero-media">
              <Image
                src="/images/profile1.jpg"
                alt="Allwin Alex standing outdoors in a suit and flat cap."
                fill
                priority
                sizes="(max-width: 700px) 100vw, 48vw"
                className="hero-photo"
              />
              <figcaption className="hero-image-caption glass-surface">
                <span>Allwin Alex</span>
                <span>Product design · Chennai, India</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="about-section page-width section-space" id="about" tabIndex={-1} aria-labelledby="about-title">
          <div className="section-lead">
            <p className="section-kicker">About</p>
            <h2 id="about-title">Making the complex feel clear.</h2>
          </div>
          <div className="about-copy">
            <p className="about-primary">I design enterprise products that help people make confident decisions in complex systems.</p>
            <p>With more than nine years across product design and service operations, I focus on cloud platforms, SaaS administration, AI-assisted workflows, and the design systems that bring them together.</p>
            <ul className="focus-list" aria-label="Areas of focus">
              <li>Cloud & infrastructure UX</li>
              <li>AI-assisted workflows</li>
              <li>Design systems & accessibility</li>
            </ul>
          </div>
        </section>

        <section className="work-section section-space" id="work" aria-labelledby="work-title">
          <div className="page-width">
            <div className="work-heading">
              <div>
                <p className="section-kicker">Selected work</p>
                <h2 id="work-title">Products built around real complexity.</h2>
                <p className="section-description">A selection of enterprise platforms, onboarding tools, and operational workflows.</p>
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
                <article className={`project-row${index % 2 === 1 ? " project-row-reverse" : ""}`} key={project.id}>
                  <Link className="project-image-link" href={`/projects/${project.id}`} aria-label={`View ${project.title} case study`}>
                    <Image
                      src={project.image}
                      alt={project.imageNames?.[0] ?? `${project.title} interface`}
                      fill
                      sizes="(max-width: 760px) 100vw, 56vw"
                      priority={index === 0}
                      className="project-image"
                    />
                    <span className="image-open" aria-hidden="true">↗</span>
                  </Link>
                  <div className="project-copy">
                    <p className="project-category">{project.category} <span aria-hidden="true">·</span> {project.subtitle}</p>
                    <h3><Link href={`/projects/${project.id}`}>{project.title}</Link></h3>
                    <p className="project-description">{project.description}</p>
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

        <section className="experience-section page-width section-space" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading">
            <p className="section-kicker">Experience</p>
            <h2 id="experience-title">A career shaped by people and systems.</h2>
            <p className="section-description">From customer operations to leading product design for enterprise software.</p>
          </div>
          <div className="experience-list">
            {experienceTimeline.map((job) => (
              <article className="experience-item" key={job.company}>
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
        </section>

        <section className="contact-section page-width section-space" id="contact" aria-labelledby="contact-title">
          <div className="contact-main">
            <p className="section-kicker">Contact</p>
            <h2 id="contact-title">Let’s make complex products easier to use.</h2>
            <p className="section-description">For product design roles, enterprise UX projects, or a thoughtful conversation about systems design.</p>
            <a className={buttonVariants({ variant: "default", size: "lg", className: "button-primary contact-email" })} href="mailto:allwin110@live.in">Email Allwin</a>
            <div className="phone-contact">
              <Button
                variant="link"
                size="default"
                type="button"
                onClick={() => setPhoneRevealed((revealed) => !revealed)}
                aria-expanded={phoneRevealed}
                aria-controls="phone-details"
              >
                {phoneRevealed ? "Hide phone number" : "Show phone number"}
              </Button>
              <div id="phone-details" className="phone-details" hidden={!phoneRevealed}>
                <a href="tel:+919677193923">+91 96771 93923</a>
                <Button variant="outline" size="default" type="button" onClick={copyPhone}>
                  {phoneCopied ? "Copied" : "Copy number"}
                </Button>
                <span className="visually-hidden" aria-live="polite">{phoneCopied ? "Phone number copied." : ""}</span>
              </div>
            </div>
          </div>
          <div className="contact-networks">
            <h3>Find me elsewhere</h3>
            <ul>
              {networks.map((network) => (
                <li key={network.label}><a href={network.href} target="_blank" rel="noopener noreferrer">{network.label}<span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span></a></li>
              ))}
            </ul>
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
