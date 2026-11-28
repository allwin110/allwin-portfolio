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
    let x = -100;
    let y = -100;
    let targetX = x;
    let targetY = y;
    let hasPosition = false;

    const animate = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x = Math.abs(dx) < 0.15 ? targetX : x + dx * 0.34;
      y = Math.abs(dy) < 0.15 ? targetY : y + dy * 0.34;
      cursor.style.setProperty('--cursor-x', `${x}px`);
      cursor.style.setProperty('--cursor-y', `${y}px`);
      if (x !== targetX || y !== targetY) frame = window.requestAnimationFrame(animate);
      else frame = 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      root.classList.add('custom-cursor-active');

      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPosition) {
        x = targetX;
        y = targetY;
        cursor.style.setProperty('--cursor-x', `${x}px`);
        cursor.style.setProperty('--cursor-y', `${y}px`);
        cursor.classList.add('is-visible');
        hasPosition = true;
      }
      if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.type === 'pointerout' ? event.relatedTarget : event.target;
      cursor.classList.toggle('is-hovered', target instanceof Element && Boolean(target.closest('a, button, [role="button"]')));
    };
    const onLeave = () => {
      cursor.classList.remove('is-visible', 'is-hovered');
      root.classList.remove('custom-cursor-active');
      hasPosition = false;
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
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="portfolio-cursor" aria-hidden="true" />
  );
}

