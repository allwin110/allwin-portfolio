'use client';

import { use, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '../../data/projects';
import { PortfolioCursor } from '@/components/portfolio-cursor';

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectsData.find((item) => item.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const images = project?.images?.length ? project.images : project ? [project.image] : [];
  const imageNames = project?.imageNames ?? [];
  const activeImage = images[activeImageIndex] ?? project?.image ?? '';
  const activeName = imageNames[activeImageIndex] ?? project?.title ?? '';

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const theme = savedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowRight') setActiveImageIndex((index) => (index + 1) % images.length);
      if (event.key === 'ArrowLeft') setActiveImageIndex((index) => (index - 1 + images.length) % images.length);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    closeRef.current?.focus();
    const trigger = triggerRef.current;
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [lightboxOpen, images.length]);

  if (!project) {
    return <main className="story-not-found"><p>Case file unavailable</p><h1>This project could not be found.</h1><Link href="/">Return to selected work <span aria-hidden="true">↗</span></Link></main>;
  }

  const moveGallery = (direction: number) => setActiveImageIndex((index) => (index + direction + images.length) % images.length);

  return (
    <div className="story-page">
      <PortfolioCursor />
      <header className="story-header page-width">
        <Link href="/" className="story-wordmark">Allwin Alex<span aria-hidden="true">.</span></Link>
        <Link href="/#work" className="story-back"><span aria-hidden="true">←</span> All projects</Link>
      </header>

      <main id="main-content" className="story-main page-width">
        <nav className="story-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/#work">Selected work</Link><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span></nav>

        <section className="story-opening" aria-labelledby="story-title">
          <div className="story-opening-copy">
            <p className="story-eyebrow"><span>{project.category}</span><i aria-hidden="true" />{project.subtitle}</p>
            <h1 id="story-title">{project.title}</h1>
            <p className="story-deck">{project.description}</p>
            <a href="#the-brief" className="story-scroll">Read the case <span aria-hidden="true">↓</span></a>
          </div>
          <div className="story-gallery" aria-label="Project interface gallery">
            <div className="story-gallery-frame">
              <Image src={activeImage} alt={activeName} fill priority sizes="(max-width: 800px) 100vw, 65vw" className="story-gallery-image" />
              <div className="story-gallery-caption"><span>{activeName}</span><span>{String(activeImageIndex + 1).padStart(2, '0')} <i aria-hidden="true">/</i> {String(images.length).padStart(2, '0')}</span></div>
              <button ref={triggerRef} className="story-zoom" type="button" aria-label={`View ${activeName} full size`} onClick={() => setLightboxOpen(true)}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5m-10-14v7m-3.5-3.5h7"/></svg></button>
              {images.length > 1 && <div className="story-gallery-controls"><button type="button" onClick={() => moveGallery(-1)} aria-label="Previous project image">←</button><button type="button" onClick={() => moveGallery(1)} aria-label="Next project image">→</button></div>}
            </div>
            {images.length > 1 && <div className="story-thumbnails" role="group" aria-label="Choose project image">{images.map((image, index) => <button key={image} type="button" className={index === activeImageIndex ? 'is-current' : ''} aria-label={`Show ${imageNames[index] ?? `image ${index + 1}`}`} aria-pressed={index === activeImageIndex} onClick={() => setActiveImageIndex(index)}><Image src={image} alt="" fill sizes="110px" /></button>)}</div>}
          </div>
        </section>

        <section className="story-brief" id="the-brief" aria-labelledby="brief-title">
          <div className="story-chapter-label"><span>01 / THE BRIEF</span><i aria-hidden="true">↘</i></div>
          <div className="story-brief-body"><p className="story-overline">Start with the people and the system</p><h2 id="brief-title">A complex system should still feel understandable.</h2><p>{project.description}</p><ul className="story-tags" aria-label="Project focus areas">{project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
        </section>

        <section className="story-friction" id="the-friction" aria-labelledby="friction-title">
          <div className="story-friction-heading"><p className="story-overline">02 / THE FRICTION</p><h2 id="friction-title">Where the experience broke down</h2></div>
          <div className="story-friction-copy"><span className="story-pullquote-mark" aria-hidden="true">“</span><p>{project.challenge}</p><span className="story-fineprint">The challenge that shaped the design work</span></div>
        </section>

        <section className="story-decisions" id="design-decisions" aria-labelledby="decisions-title">
          <div className="story-decisions-intro"><p className="story-overline">03 / DESIGN DECISIONS</p><h2 id="decisions-title">Make the next step easier to see.</h2><p>Rather than add another layer of controls, the work focused on making the system’s logic easier to follow.</p></div>
          <div className="story-decision-card"><span className="story-decision-number">A</span><div><h3>Bring related work together</h3><p>{project.solution}</p></div></div>
          <div className="story-decision-card story-gallery-index"><span className="story-decision-number">B</span><div><h3>Follow the interface</h3><ol>{images.map((image, index) => <li key={image}><span>{String(index + 1).padStart(2, '0')}</span>{imageNames[index] ?? `Project screen ${index + 1}`}</li>)}</ol></div></div>
        </section>

        <section className="related-screen" aria-labelledby="related-screen-title">
          <div className="related-screen-heading">
            <p className="story-overline">A RELATED SCREEN · SAMPLE UI</p>
            <h2 id="related-screen-title">The system, made easier to scan.</h2>
            <p>This illustrative interface uses fictional labels and sample values. It contains no client data.</p>
          </div>
          <figure className="sample-dashboard" aria-label="Illustrative product dashboard with dummy data">
            <div className="sample-dashboard-bar"><span className="sample-dashboard-brand"><i aria-hidden="true" /> northstar <small>WORKSPACE</small></span><span className="sample-dashboard-profile">JD</span></div>
            <div className="sample-dashboard-layout">
              <nav className="sample-dashboard-nav" aria-label="Sample dashboard"><strong>Workspace</strong><span className="is-current">Overview</span><span>Activity</span><span>Projects</span><span>Settings</span></nav>
              <div className="sample-dashboard-content">
                <div className="sample-dashboard-title"><div><span>MONDAY, 09:41 AM · SAMPLE DATA</span><h3>Good morning, Jordan</h3><p>Here’s a clear view of what needs attention.</p></div><button type="button" tabIndex={-1}>Last 7 days <span aria-hidden="true">⌄</span></button></div>
                <div className="sample-dashboard-stats"><article><span>Active workflows</span><strong>08</strong><small>Across 3 teams</small></article><article><span>System health</span><strong>96<span>%</span></strong><small>All services normal</small></article><article><span>Needs review</span><strong>04</strong><small>2 items due today</small></article></div>
                <div className="sample-dashboard-chart"><div><span>Workflow activity</span><small>Illustrative · not production data</small></div><svg viewBox="0 0 640 130" role="img" aria-label="Decorative sample line chart"><path className="sample-chart-grid" d="M0 25H640M0 65H640M0 105H640"/><path className="sample-chart-line" d="M0 90 C42 84 48 45 96 55 S152 89 198 67 S248 76 294 43 S350 62 395 51 S450 33 493 47 S548 69 586 31 S620 42 640 21"/><path className="sample-chart-area" d="M0 90 C42 84 48 45 96 55 S152 89 198 67 S248 76 294 43 S350 62 395 51 S450 33 493 47 S548 69 586 31 S620 42 640 21V130H0Z"/></svg></div>
                <div className="sample-dashboard-tasks"><span>RECENT ACTIVITY</span><div><i className="sample-task-dot" /> Pipeline Alpha <small>Ready for review</small><b>Today</b></div><div><i className="sample-task-dot is-blue" /> Workspace update <small>In progress</small><b>Yesterday</b></div></div>
              </div>
            </div>
            <figcaption>Illustrative concept · Fictional sample data</figcaption>
          </figure>
        </section>

        <section className="story-outcome" id="the-outcome" aria-labelledby="outcome-title">
          <p className="story-overline">04 / THE OUTCOME</p><h2 id="outcome-title">A clearer experience, with impact that matters.</h2><p className="story-outcome-statement">{project.results}</p><div className="story-outcome-bottom"><span>Next case</span><Link href={`/#work`}>Explore the full body of work <span aria-hidden="true">↗</span></Link></div>
        </section>
      </main>

      <footer className="story-footer page-width"><Link href="/">Allwin Alex<span aria-hidden="true">.</span></Link><a href="#main-content">Back to top ↑</a></footer>

      {lightboxOpen && <div className="story-lightbox" role="dialog" aria-modal="true" aria-label={`${activeName} full-size image`} onClick={() => setLightboxOpen(false)}><button ref={closeRef} type="button" className="story-lightbox-close" aria-label="Close image preview" onClick={() => setLightboxOpen(false)}>×</button><div className="story-lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={activeImage} alt={activeName} fill sizes="96vw" /></div><p>{activeName} <span>· Use arrow keys to browse</span></p></div>}
    </div>
  );
}
