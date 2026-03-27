import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Mail, Copy, Check, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('taki@tyfsadik.org');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        leftCardRef.current,
        { x: '-60vw', opacity: 0, rotate: -5 },
        { x: 0, opacity: 1, rotate: -1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: '60vw', opacity: 0, rotate: 5 },
        { x: 0, opacity: 1, rotate: 1, ease: 'none' },
        0
      );

      // Animate card content
      const leftContent = leftCardRef.current?.querySelectorAll('.card-content');
      const rightContent = rightCardRef.current?.querySelectorAll('.card-content');

      if (leftContent) {
        scrollTl.fromTo(
          leftContent,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      if (rightContent) {
        scrollTl.fromTo(
          rightContent,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        leftCardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightCardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-bg-primary z-30"
    >
      {/* Left Card - Certifications */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[18vh] w-[88vw] lg:w-[40vw] h-[35vh] lg:h-[64vh] card-border shadow-card overflow-hidden"
        style={{ transform: 'translateX(-60vw) rotate(-5deg)', opacity: 0 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/certs_card_bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 lg:p-10 h-full flex flex-col justify-center">
          <div className="card-content flex items-center gap-3 mb-4" style={{ opacity: 0 }}>
            <Award className="text-neon" size={24} />
            <span className="eyebrow">Credentials</span>
          </div>

          <h3
            className="card-content font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-4"
            style={{ opacity: 0 }}
          >
            Certifications
          </h3>

          <p
            className="card-content text-text-secondary text-sm lg:text-base leading-relaxed mb-6"
            style={{ opacity: 0 }}
          >
            AZ-900 • AWS Cloud Practitioner • OPSWAT CIP • MasterCard
            Cybersecurity • ICIP • MSSQL • ISC2 Candidate (CC)
          </p>

          <a
            href="#education"
            className="card-content text-link inline-flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            See all credentials
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Right Card - Contact */}
      <div
        ref={rightCardRef}
        className="absolute left-[6vw] lg:left-[54vw] top-[56vh] lg:top-[18vh] w-[88vw] lg:w-[40vw] h-[30vh] lg:h-[64vh] card-border shadow-card overflow-hidden"
        style={{ transform: 'translateX(60vw) rotate(5deg)', opacity: 0 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/contact_card_bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 lg:p-10 h-full flex flex-col justify-center">
          <div className="card-content flex items-center gap-3 mb-4" style={{ opacity: 0 }}>
            <Mail className="text-neon" size={24} />
            <span className="eyebrow">Get in Touch</span>
          </div>

          <h3
            className="card-content font-heading font-bold text-2xl lg:text-3xl text-text-primary mb-4"
            style={{ opacity: 0 }}
          >
            Let's work together
          </h3>

          <p
            className="card-content text-text-secondary text-sm lg:text-base leading-relaxed mb-6"
            style={{ opacity: 0 }}
          >
            Open to SOC, NOC, IT Support, and Infrastructure roles across North
            America.
          </p>

          <div className="card-content flex flex-wrap gap-3" style={{ opacity: 0 }}>
            <a href="mailto:taki@tyfsadik.org" className="btn-primary inline-flex items-center gap-2">
              <Mail size={16} />
              Send an email
            </a>
            <button
              onClick={handleCopyEmail}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
