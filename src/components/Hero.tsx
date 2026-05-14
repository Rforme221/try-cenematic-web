import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BackgroundCanvas from './BackgroundCanvas';
import laptopImg from '../assets/laptop.png';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const glowRedRef = useRef<HTMLDivElement>(null);
  const glowPurpleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered Text Reveal
      if (headlineRef.current) {
        const text = headlineRef.current.innerText;
        const characters = text.split('').map((char) => {
          const span = document.createElement('span');
          span.innerText = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(40px) scale(0.95)';
          span.style.filter = 'blur(10px)';
          return span;
        });

        headlineRef.current.innerHTML = '';
        characters.forEach((span) => headlineRef.current?.appendChild(span));

        gsap.to(characters, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.04,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.4,
        });
      }

      // 2. Laptop Entrance & Floating
      if (laptopRef.current) {
        // Entrance: Float up from below
        gsap.fromTo(
          laptopRef.current,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: 'power3.out',
            delay: 0.2,
          }
        );

        // Continuous Idle Float
        gsap.to(laptopRef.current, {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }

      // 3. Pulse Glows (Slower, breathing effect)
      if (glowRedRef.current && glowPurpleRef.current) {
        gsap.to(glowRedRef.current, {
          scale: 1.15,
          opacity: 0.5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to(glowPurpleRef.current, {
          scale: 1.25,
          opacity: 0.35,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      // 4. Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 2;
        const yPos = (clientY / window.innerHeight - 0.5) * 2;

        gsap.to(laptopRef.current, {
          rotationY: xPos * 8,
          rotationX: -yPos * 8,
          x: xPos * 15,
          y: yPos * 15,
          duration: 1.5,
          ease: 'power2.out',
        });

        gsap.to(glowRedRef.current, {
          x: xPos * 30,
          y: yPos * 30,
          duration: 2,
          ease: 'power2.out',
        });

        gsap.to(glowPurpleRef.current, {
          x: xPos * -20,
          y: yPos * -20,
          duration: 2.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] perspective-2000"
    >
      <BackgroundCanvas />

      {/* Radial Glows */}
      <div 
        ref={glowRedRef}
        id="glow-red"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/30 blur-[120px] rounded-full z-0 opacity-40 pointer-events-none"
      />
      <div 
        ref={glowPurpleRef}
        id="glow-purple"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full z-0 opacity-30 pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-7xl px-4 w-full">
        {/* Headline */}
        <h1 
          ref={headlineRef}
          id="hero-headline"
          className="text-white text-5xl md:text-8xl font-bold tracking-tight mb-16 text-center select-none"
        >
          Built For Impossible Frames.
        </h1>

        {/* Laptop Asset */}
        <div 
          ref={laptopRef}
          id="laptop-container"
          className="relative w-full max-w-4xl px-4 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src={laptopImg}
            alt="ASUS ROG Phantom X Gaming Laptop"
            className="w-full h-auto drop-shadow-[0_45px_65px_rgba(0,0,0,0.9)] rounded-lg pointer-events-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Decorative Accent Labels */}
          <div className="absolute -bottom-12 left-6 flex flex-col gap-1">
            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono">Serial: Phantom-X-9000</span>
            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono">Engineered in Neo-Tokyo</span>
          </div>
          <div className="absolute -bottom-12 right-6 text-right">
             <span className="text-red-600/80 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">Neural Link Active</span>
          </div>
        </div>
        
        {/* Branding */}
        <div className="absolute top-10 left-10">
            <span className="text-white/10 text-xs tracking-[0.8em] font-medium uppercase border-l border-white/20 pl-4 py-1">ROG // PHANTOM X</span>
        </div>
        
        {/* Technical Specs Footer (Decorative) */}
        <div className="absolute bottom-10 flex gap-12 text-[10px] text-white/20 uppercase tracking-widest font-mono">
            <div className="flex flex-col"><span className="text-white/40">Refresh</span> 360Hz</div>
            <div className="flex flex-col"><span className="text-white/40">Latency</span> 1.2ms</div>
            <div className="flex flex-col"><span className="text-white/40">Thermal</span> Vapor Chamber</div>
        </div>
      </div>
    </div>
  );
}
