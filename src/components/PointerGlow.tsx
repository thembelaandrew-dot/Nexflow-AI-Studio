import { useEffect, useRef } from 'react';

export default function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty('--x', e.clientX + 'px');
        glowRef.current.style.setProperty('--y', e.clientY + 'px');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-0 lg:opacity-100"
      style={{
        background: 'radial-gradient(600px at var(--x, 0px) var(--y, 0px), rgba(59, 130, 246, 0.06), transparent 80%)'
      }}
    />
  );
}
