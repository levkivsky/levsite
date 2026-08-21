import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest('a, button, input, textarea, [data-cursor="hover"]')
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed z-[9999] hidden md:block">
      <div
        className="fixed top-0 left-0 rounded-full border border-metallic-300/40 transition-[width,height,opacity,background-color] duration-200 ease-out"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          width: hovering ? 44 : 24,
          height: hovering ? 44 : 24,
          backgroundColor: hovering ? 'rgba(226,232,240,0.06)' : 'transparent',
        }}
      />
      <div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-metallic-100 transition-opacity duration-200"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
          opacity: hovering ? 0 : 0.8,
        }}
      />
    </div>
  );
}
