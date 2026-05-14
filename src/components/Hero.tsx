import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import BackgroundCanvas from './BackgroundCanvas';
import laptopImg from '../assets/laptop.png';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const glowRedRef = useRef<HTMLDivElement>(null);
  const glowPurpleRef = useRef<HTMLDivElement>(null);
  const glowBlueRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const scanlineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline();

      // 1. Scanline Sweep Animation
      if (scanlineRef.current && scanlineLineRef.current) {
        masterTl.set(scanlineRef.current, { opacity: 1 });
        masterTl.fromTo(scanlineLineRef.current, 
          { y: '-10vh' }, 
          { y: '115vh', duration: 1.2, ease: "power1.inOut" }
        );
        masterTl.to(scanlineRef.current, { opacity: 0, duration: 0.4, ease: "power2.out" });
      }

      // 2. Laptop Entrance
      if (laptopRef.current) {
        masterTl.fromTo(
          laptopRef.current,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.5"
        );

        // Continuous Idle Float
        gsap.to(laptopRef.current, {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 3,
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

      {/* Scanline Sweep Overlay */}
      <div 
        ref={scanlineRef}
        className="fixed inset-0 z-50 pointer-events-none opacity-0"
        style={{
          background: 'repeating-linear-gradient(rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)'
        }}
      >
        <div 
          ref={scanlineLineRef}
          className="absolute w-full h-[2px] bg-white opacity-15 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        />
      </div>

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
      <div className="relative z-30 flex flex-col items-center max-w-7xl px-4 w-full h-full justify-center">
        {/* Laptop Asset */}
        <div 
          ref={laptopRef}
          id="laptop-container"
          className="relative w-full max-w-[280px] sm:max-w-md md:max-w-2xl lg:max-w-3xl px-4 will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <img
            src={laptopImg}
            alt="ASUS ROG Phantom X Gaming Laptop"
            className="w-full h-auto drop-shadow-[0_45px_100px_rgba(0,0,0,1)] rounded-lg pointer-events-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Decorative Accent Labels */}
          <div className="absolute -bottom-12 sm:-bottom-16 left-4 lg:left-12 flex flex-col gap-1">
            <span className="text-[7px] sm:text-[9px] text-white/40 uppercase tracking-[0.3em] font-mono whitespace-nowrap">Serial: Phantom-X-9000</span>
            <span className="text-[7px] sm:text-[9px] text-white/40 uppercase tracking-[0.3em] font-mono whitespace-nowrap">Engineered in Neo-Tokyo</span>
          </div>
          <div className="absolute -bottom-12 sm:-bottom-16 right-4 lg:right-12 text-right">
             <span className="text-red-600 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] animate-pulse">Neural Link Active</span>
          </div>
        </div>
        
        {/* Branding */}
        <div className="absolute top-6 left-6 lg:top-12 lg:left-12 flex flex-col gap-2 lg:gap-3 group">
            <div className="h-[1px] lg:h-[2px] w-8 lg:w-16 bg-red-600 lg:mb-1 group-hover:w-24 transition-all duration-500" />
            <span className="text-white/70 text-[8px] lg:text-xs tracking-[0.6em] lg:tracking-[0.8em] font-medium uppercase border-l border-white/20 pl-3 lg:pl-4 py-1">ROG // PHANTOM X</span>
        </div>
        
        {/* Technical Specs Footer (Decorative) */}
        <div className="absolute bottom-10 flex gap-4 sm:gap-8 lg:gap-16 text-[7px] sm:text-[10px] text-white/30 uppercase tracking-[0.1em] sm:tracking-widest font-mono">
            <div className="flex flex-col items-center sm:items-start"><span className="text-white/50 mb-0.5 sm:mb-1">Refresh</span> <span className="text-white">360Hz</span></div>
            <div className="flex flex-col items-center sm:items-start"><span className="text-white/50 mb-0.5 sm:mb-1">Latency</span> <span className="text-white">1.2ms</span></div>
            <div className="flex flex-col items-center sm:items-start"><span className="text-white/50 mb-0.5 sm:mb-1">Thermal</span> <span className="text-white text-center sm:text-left">Vapor Chamber</span></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
            <span className="text-[8px] tracking-[0.6em] text-white/80 uppercase font-bold">Scroll</span>
            <ChevronDown className="w-5 h-5 text-white animate-bounce" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
