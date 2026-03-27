import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Clock, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const activeCerts = [
  'Microsoft Certified: Azure Fundamentals (AZ-900)',
  'AWS Academy Graduate — Cloud Security',
  'AWS Cloud Practitioner',
  'OPSWAT Certified Information Professional (CIP)',
  'OPSWAT Introduction to Critical Infrastructure Protection (ICIP)',
  'MasterCard Cybersecurity Virtual Experience',
  'EASY Framework for Threat Intelligence — AttackIQ',
  'Introduction to Model Context Protocol — Anthropic',
  'Cisco Routing Course — APNIC Academy',
  'MSSQL Certification — Microsoft',
  'Ontario Security Guard Licence',
  'ISC2 Candidate (CC)',
];

const inProgressCerts = [
  'CompTIA Security+',
  'CompTIA A+',
  'CCNA Fundamentals',
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left column animation
      gsap.fromTo(
        leftColRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Right column animation
      gsap.fromTo(
        rightColRef.current,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Cert rows stagger
      const certRows = section.querySelectorAll('.cert-row');
      certRows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section-flowing bg-bg-primary py-20 lg:py-32 z-[80]"
    >
      <div className="px-6 lg:px-[6vw]">
        <h2 className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] leading-[1.0] tracking-[-0.01em] text-text-primary mb-12 lg:mb-16">
          Education & Certifications
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Education */}
          <div ref={leftColRef} style={{ opacity: 0 }}>
            <div className="card-border p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-neon" size={24} />
                <span className="eyebrow">Education</span>
              </div>

              <h3 className="font-heading font-semibold text-text-primary text-xl lg:text-2xl mb-2">
                Diploma — Computer Networking & Cybersecurity
              </h3>
              <p className="text-text-secondary text-sm lg:text-base mb-4">
                Seneca Polytechnic • Expected 2026
              </p>

              <div className="accent-line w-16 mb-6" />

              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Relevant coursework:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Incident Response',
                  'Linux Admin',
                  'SDN',
                  'Wireless',
                  'Azure',
                  'Databases',
                ].map((course, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-text-primary/10 text-text-secondary text-xs rounded"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* A+ Course */}
            <div className="card-border p-6 lg:p-8 mt-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-neon" size={20} />
                <span className="eyebrow">Additional Training</span>
              </div>
              <h4 className="font-heading font-semibold text-text-primary text-lg">
                A+ Certified Professional Course
              </h4>
              <p className="text-text-secondary text-sm">
                Scarborough Training Centre, Toronto, ON
              </p>
            </div>
          </div>

          {/* Right Column - Certifications */}
          <div ref={rightColRef} style={{ opacity: 0 }}>
            <div className="card-border p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-neon" size={24} />
                <span className="eyebrow">Active Certifications</span>
              </div>

              <ul className="space-y-3">
                {activeCerts.map((cert, index) => (
                  <li
                    key={index}
                    className="cert-row flex items-start gap-3"
                    style={{ opacity: 0 }}
                  >
                    <span className="w-2 h-2 bg-neon rounded-full mt-2 flex-shrink-0" />
                    <span className="text-text-primary text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In Progress */}
            <div className="card-border p-6 lg:p-8 mt-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-neon" size={24} />
                <span className="eyebrow">In Progress</span>
              </div>

              <ul className="space-y-3">
                {inProgressCerts.map((cert, index) => (
                  <li
                    key={index}
                    className="cert-row flex items-start gap-3"
                    style={{ opacity: 0 }}
                  >
                    <span className="w-2 h-2 bg-text-secondary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
