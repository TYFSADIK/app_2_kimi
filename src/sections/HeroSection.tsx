import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background scale
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
      );

      // Divider line
      tl.fromTo(
        dividerRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6 },
        '-=0.6'
      );

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Headline (word by word)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 },
          '-=0.2'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Body
      tl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Email
      tl.fromTo(
        emailRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([leftPanelRef.current, rightPanelRef.current], {
              x: 0,
              opacity: 1,
            });
            gsap.set(dividerRef.current, { scaleY: 1, opacity: 1 });
          },
        },
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        dividerRef.current,
        { scaleY: 1, opacity: 1 },
        { scaleY: 0.2, opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-bg-primary z-10"
    >
      {/* Background Image */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_city_bg.jpg"
          alt="City skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-bg-primary/55" />
      </div>

      {/* Divider Line */}
      <div
        ref={dividerRef}
        className="absolute left-1/2 top-[10vh] h-[80vh] w-px hairline z-20 origin-top hidden lg:block"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Left Panel - Text */}
      <div
        ref={leftPanelRef}
        className="absolute left-[6vw] top-0 w-full lg:w-[42vw] h-full flex flex-col justify-center z-20 px-6 lg:px-0"
      >
        {/* Eyebrow */}
        <div ref={eyebrowRef} className="eyebrow mb-6" style={{ opacity: 0 }}>
          IT Professional
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading font-bold text-[clamp(44px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-text-primary mb-6"
        >
          <span className="word inline-block">Taki</span>{' '}
          <span className="word inline-block">Sadik</span>
        </h1>

        {/* Subheadline */}
        <div
          ref={subheadRef}
          className="font-mono text-sm text-neon tracking-wide mb-6"
          style={{ opacity: 0 }}
        >
          Security • Networks • Systems • Cloud • SOC
        </div>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-md mb-10"
          style={{ opacity: 0 }}
        >
          I build resilient infrastructure, monitor threats, and keep services
          running—across cloud, on-prem, and hybrid environments.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-8" style={{ opacity: 0 }}>
          <a href="#projects" className="btn-primary inline-flex items-center gap-2">
            View Projects
            <ArrowRight size={16} />
          </a>
          <a
            href="/TakiSadik_Resume.pdf"
            download
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>

        {/* Email */}
        <a
          ref={emailRef}
          href="mailto:taki@tyfsadik.org"
          className="text-link inline-flex items-center gap-2"
          style={{ opacity: 0 }}
        >
          <Mail size={14} />
          taki@tyfsadik.org
        </a>
      </div>

      {/* Right Panel - Image */}
      <div
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-0 lg:w-[48vw] h-full z-10 overflow-hidden"
      >
        <img
          src="/hero_city_right.jpg"
          alt="City view"
          className="w-full h-full object-cover opacity-0 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 to-transparent lg:hidden" />
      </div>
    </section>
  );
}
