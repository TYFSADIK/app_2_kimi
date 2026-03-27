import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Incident Analyst',
    company: 'Shield Security Systems',
    location: 'Torreon Metro Area, ON',
    period: 'Nov 2025 – Present',
    type: 'On-site',
    description: [
      'Monitor security systems and databases, triaging alerts and escalating events per defined SOPs.',
      'Perform ongoing threat assessments and vulnerability analysis using industry tools and databases.',
      'Coordinate with stakeholders to document and resolve security incidents, maintaining detailed logs.',
    ],
  },
  {
    title: 'Network Analyst Intern',
    company: 'CardiOCare',
    location: 'Greater Toronto Area',
    period: 'Jan 2025 – Sep 2025',
    type: 'Hybrid',
    description: [
      'Monitored and maintained network infrastructure, identifying and resolving connectivity and performance issues.',
      'Assisted with network documentation, topology diagrams, and capacity planning.',
      'Performed packet analysis and traffic monitoring to detect anomalies and support incident investigations.',
    ],
  },
  {
    title: 'Server Operator (Junior)',
    company: 'Fiera Foods',
    location: 'North York, ON',
    period: 'Jun 2024 – Jul 2025',
    type: 'On-site',
    description: [
      'Managed server alerts and system issues with priority-based response, maintaining first-time fix rates.',
      'Performed daily maintenance including backup verification, system updates, and performance monitoring.',
      'Leveraged SQL and cloud computing skills to support data workflows and reporting systems.',
    ],
  },
  {
    title: 'Customer Service Specialist',
    company: 'H&M',
    location: 'North York, ON',
    period: 'Jul 2025 – Present',
    type: 'On-site',
    description: [
      'Troubleshot and resolved customer issues related to orders, payments, and accounts.',
      'Leveraged AWS-backed retail systems and internal network services to access customer data.',
      'Coordinated with cross-functional teams to ensure timely problem resolution.',
    ],
  },
  {
    title: 'Surveillance Operator',
    company: 'Elite Force',
    location: 'Dhaka, Bangladesh',
    period: 'Sep 2022 – Nov 2023',
    type: 'Hybrid',
    description: [
      'Monitored multi-camera CCTV and IP surveillance systems across commercial facilities.',
      'Detected and reported suspicious activity, coordinating with on-ground security teams.',
      'Maintained surveillance logs and generated shift incident reports for management review.',
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      // Timeline line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 0.5,
            },
          }
        );
      }

      // Experience cards animation
      if (timelineRef.current) {
        const cards = timelineRef.current.querySelectorAll('.experience-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { x: -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-flowing bg-bg-primary py-20 lg:py-32 z-50"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16" style={{ opacity: 0 }}>
          <h2 className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] leading-[1.0] tracking-[-0.01em] text-text-primary mb-4">
            Experience
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl">
            Professional journey across security operations, network analysis,
            and server administration.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line (desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-[3vw] top-0 w-px h-full hairline origin-top"
            style={{ transform: 'scaleY(0)' }}
          />

          {/* Experience Cards */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card relative lg:ml-[6vw]"
                style={{ opacity: 0 }}
              >
                {/* Timeline Dot (desktop) */}
                <div className="hidden lg:block absolute -left-[3.5vw] top-2 w-3 h-3 rounded-full bg-neon" />

                {/* Card */}
                <div className="card-border p-5 lg:p-6 hover:border-neon/20 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary text-lg lg:text-xl mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-text-secondary text-sm">
                        <Briefcase size={14} />
                        {exp.company}
                      </div>
                    </div>
                    <div className="mt-2 lg:mt-0 flex flex-wrap items-center gap-3 text-text-secondary text-xs lg:text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                      <span className="px-2 py-0.5 bg-text-primary/10 rounded text-xs">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-text-secondary text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 bg-neon rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
