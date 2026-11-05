'use client';

import { useEffect, useRef } from 'react';

export function PortfolioCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const root = document.documentElement;
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let resetTimer = 0;
    let x = -100;
    let y = -100;
    let lastX: number | null = null;
    let lastY: number | null = null;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      root.classList.add('custom-cursor-active');

      x = event.clientX;
      y = event.clientY;
      if (lastX !== null && lastY !== null) {
        const dx = x - lastX;
        const dy = y - lastY;
        const distance = Math.hypot(dx, dy);
        if (distance > 0.5) {
          cursor.style.setProperty('--cursor-angle', `${Math.atan2(dy, dx)}rad`);
          cursor.style.setProperty('--cursor-trail-length', `${Math.min(72, 14 + distance * 1.4)}px`);
        }
      }
      lastX = x;
      lastY = y;

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          cursor.style.setProperty('--cursor-x', `${x}px`);
          cursor.style.setProperty('--cursor-y', `${y}px`);
          cursor.classList.add('is-visible');
          frame = 0;
        });
      }

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        cursor.style.setProperty('--cursor-trail-length', '14px');
      }, 110);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.type === 'pointerout' ? event.relatedTarget : event.target;
      cursor.classList.toggle('is-hovered', target instanceof Element && Boolean(target.closest('a, button, [role="button"]')));
    };
    const onLeave = () => {
      cursor.classList.remove('is-visible', 'is-hovered');
      root.classList.remove('custom-cursor-active');
    };
    const onKeyDown = () => {
      cursor.classList.remove('is-visible', 'is-hovered');
      root.classList.remove('custom-cursor-active');
    };

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
      root.classList.remove('custom-cursor-active');
      window.clearTimeout(resetTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true">
      <span className="portfolio-cursor__trail"><i /><i /><i /></span>
      <svg className="portfolio-cursor__star" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0.8 14.7 9.3 23.2 12 14.7 14.7 12 23.2 9.3 14.7 .8 12 9.3 9.3 12 .8Z" />
        <circle cx="12" cy="12" r="2.1" />
      </svg>
    </div>
  );
}
