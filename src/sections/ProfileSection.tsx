import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Network, Server, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Shield,
    text: 'Active security clearances + multiple industry certifications',
  },
  {
    icon: Network,
    text: 'Hands-on with SIEM, packet analysis, and threat triage',
  },
  {
    icon: Server,
    text: 'Homelab: Proxmox, Docker, self-hosted DNS, cloud integrations',
  },
];

export default function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
        portraitRef.current,
        { x: '-55vw', rotate: -6, opacity: 0 },
        { x: 0, rotate: -1.2, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headingRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        underlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        paragraphRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('li');
        scrollTl.fromTo(
          items,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.2
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // SETTLE (30% - 70%) - Hold positions

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [headingRef.current, underlineRef.current, paragraphRef.current, listRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="profile"
      className="section-pinned bg-bg-primary z-20"
    >
      {/* Portrait Card */}
      <div
        ref={portraitRef}
        className="absolute left-[6vw] top-[14vh] w-[88vw] lg:w-[40vw] h-[40vh] lg:h-[72vh] card-border shadow-card-lg overflow-hidden"
        style={{ transform: 'rotate(-1.2deg) translateX(-55vw)', opacity: 0 }}
      >
        <img
          src="/profile_portrait.png"
          alt="Taki Sadik"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
      </div>

      {/* Text Block */}
      <div className="absolute left-[6vw] lg:left-[54vw] top-[58vh] lg:top-[22vh] w-[88vw] lg:w-[38vw]">
        <h2
          ref={headingRef}
          className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] leading-[1.0] tracking-[-0.01em] text-text-primary mb-4"
          style={{ opacity: 0 }}
        >
          Profile
        </h2>

        {/* Accent Underline */}
        <div
          ref={underlineRef}
          className="accent-line w-[10vw] mb-6 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />

        <p
          ref={paragraphRef}
          className="text-text-secondary text-base lg:text-lg leading-relaxed mb-8"
          style={{ opacity: 0 }}
        >
          I'm an IT professional currently completing a Cybersecurity diploma at
          Seneca Polytechnic. I've worked across incident response, network
          operations, and server administration—supported by a self-built homelab
          that mirrors real production environments.
        </p>

        {/* Highlights List */}
        <ul ref={listRef} className="space-y-4 mb-8">
          {highlights.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
              style={{ opacity: 0 }}
            >
              <item.icon className="text-neon mt-1 flex-shrink-0" size={18} />
              <span className="text-text-primary text-sm lg:text-base">
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#experience"
          className="text-link inline-flex items-center gap-2"
          style={{ opacity: 0 }}
        >
          Read the full story
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
