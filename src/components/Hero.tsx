import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import BackgroundCanvas from './BackgroundCanvas';
import laptopImg from '../assets/laptop.png';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const glowRedRef = useRef<HTMLDivElement>(null);
  const glowPurpleRef = useRef<HTMLDivElement>(null);
  const glowBlueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered Text Reveal
      if (headlineRef.current) {
        const originalText = "Built For Impossible Frames.";
        const characters = originalText.split('').map((char) => {
          const span = document.createElement('span');
          span.innerText = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(40px) scale(0.95)';
          span.style.filter = 'blur(4px)';
          return span;
        });

        headlineRef.current.innerHTML = '';
        characters.forEach((span) => headlineRef.current?.appendChild(span));

        gsap.to(characters, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.03,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.8,
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
      if (glowRedRef.current && glowPurpleRef.current && glowBlueRef.current) {
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
        gsap.to(glowBlueRef.current, {
          scale: 1.2,
          opacity: 0.25,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
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
          x: xPos * -25,
          y: yPos * -25,
          duration: 2.5,
          ease: 'power2.out',
        });

        gsap.to(glowBlueRef.current, {
          x: xPos * 40,
          y: yPos * 40,
          duration: 3,
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
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-600/20 blur-[130px] rounded-full z-[1] opacity-40 pointer-events-none"
      />
      <div 
        ref={glowPurpleRef}
        id="glow-purple"
        className="absolute top-[10%] right-[10%] w-[900px] h-[900px] bg-purple-600/15 blur-[160px] rounded-full z-[0] opacity-30 pointer-events-none"
      />
      <div 
        ref={glowBlueRef}
        id="glow-blue"
        className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-500/15 blur-[100px] rounded-full z-[2] opacity-20 pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-7xl px-4 w-full h-full justify-center">
        {/* Laptop Asset */}
        <div 
          ref={laptopRef}
          id="laptop-container"
          className="relative w-full max-w-3xl px-8 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src={laptopImg}
            alt="ASUS ROG Phantom X Gaming Laptop"
            className="w-full h-auto drop-shadow-[0_45px_100px_rgba(0,0,0,1)] rounded-lg pointer-events-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Decorative Accent Labels */}
          <div className="absolute -bottom-16 left-12 flex flex-col gap-1">
            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono">Serial: Phantom-X-9000</span>
            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono">Engineered in Neo-Tokyo</span>
          </div>
          <div className="absolute -bottom-16 right-12 text-right">
             <span className="text-red-600/80 text-[10px] font-bold uppercase tracking-[0.5em] animate-pulse">Neural Link Active</span>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-20 overflow-visible flex justify-center">
          <h1 
            ref={headlineRef}
            id="hero-headline"
            className="text-white text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center select-none leading-none"
          >
            Built For Impossible Frames.
          </h1>
        </div>
        
        {/* Branding */}
        <div className="absolute top-10 left-10 flex flex-col gap-2">
            <div className="h-[2px] w-16 bg-red-600 mb-1" />
            <span className="text-white/60 text-xs tracking-[0.8em] font-medium uppercase border-l border-white/20 pl-4 py-1">ROG // PHANTOM X</span>
        </div>
        
        {/* Technical Specs Footer (Decorative) */}
        <div className="absolute bottom-10 flex gap-12 text-[10px] text-white/20 uppercase tracking-widest font-mono">
            <div className="flex flex-col"><span className="text-white/40">Refresh</span> 360Hz</div>
            <div className="flex flex-col"><span className="text-white/40">Latency</span> 1.2ms</div>
            <div className="flex flex-col"><span className="text-white/40">Thermal</span> Vapor Chamber</div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
            <span className="text-[8px] tracking-[0.6em] text-white uppercase font-bold">Scroll</span>
            <ChevronDown className="w-5 h-5 text-white animate-bounce" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
