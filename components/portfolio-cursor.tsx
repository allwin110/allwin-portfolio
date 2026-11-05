'use client';

import { useEffect, useRef } from 'react';

export function PortfolioCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!cursor || !finePointer.matches || reducedMotion.matches) return;
    document.documentElement.classList.add('custom-cursor-active');

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        cursor.style.setProperty('--cursor-x', `${x}px`);
        cursor.style.setProperty('--cursor-y', `${y}px`);
        cursor.classList.add('is-visible');
        frame = 0;
      });
    };
    const onOver = (event: PointerEvent) => {
      const target = event.type === 'pointerout' ? event.relatedTarget : event.target;
      cursor.classList.toggle('is-hovered', target instanceof Element && Boolean(target.closest('a, button, [role="button"]')));
    };
    const onLeave = () => cursor.classList.remove('is-visible', 'is-hovered');
    const onKeyDown = () => cursor.classList.remove('is-visible', 'is-hovered');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOver);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('custom-cursor-active');
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true" />;
}
