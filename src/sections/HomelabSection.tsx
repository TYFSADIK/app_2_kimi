import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Network, Monitor, Cloud } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const homelabFeatures = [
  {
    icon: Network,
    text: 'Virtualized networks with VLANs and firewall rules',
  },
  {
    icon: Monitor,
    text: 'Monitoring, backups, and patch management',
  },
  {
    icon: Cloud,
    text: 'Hybrid cloud integrations (Azure + self-hosted)',
  },
];

export default function HomelabSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        imageRef.current,
        { y: '-40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        panelRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headingRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        paragraphRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('li');
        scrollTl.fromTo(
          items,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.2
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        panelRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-bg-primary z-[70]"
    >
      {/* Top Image Strip */}
      <div
        ref={imageRef}
        className="absolute top-0 left-0 right-0 h-[45vh] lg:h-[52vh] overflow-hidden"
        style={{ transform: 'translateY(-40vh)', opacity: 0 }}
      >
        <img
          src="/homelab_rack.jpg"
          alt="Homelab server rack"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/30 via-transparent to-bg-primary" />
      </div>

      {/* Bottom Text Panel */}
      <div
        ref={panelRef}
        className="absolute top-[45vh] lg:top-[52vh] left-0 right-0 h-[55vh] lg:h-[48vh] bg-bg-secondary"
        style={{ transform: 'translateY(40vh)', opacity: 0 }}
      >
        <div className="h-full flex flex-col justify-center px-6 lg:px-[6vw]">
          <h2
            ref={headingRef}
            className="font-heading font-bold text-[clamp(28px,3.6vw,48px)] leading-[1.0] tracking-[-0.01em] text-text-primary mb-4"
            style={{ opacity: 0 }}
          >
            Homelab = Production Practice
          </h2>

          <p
            ref={paragraphRef}
            className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-2xl mb-6"
            style={{ opacity: 0 }}
          >
            I run Proxmox, Docker, self-hosted DNS, mail, Nextcloud, and a private
            AI stack—so my skills stay current under real load.
          </p>

          <ul ref={listRef} className="space-y-3 mb-8">
            {homelabFeatures.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-3"
                style={{ opacity: 0 }}
              >
                <feature.icon className="text-neon flex-shrink-0" size={18} />
                <span className="text-text-primary text-sm lg:text-base">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <a href="#projects" className="btn-primary inline-flex items-center gap-2">
              Explore projects
              <ArrowRight size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Github size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
