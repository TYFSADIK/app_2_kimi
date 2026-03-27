import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, MapPin, Phone, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const references = [
  {
    name: 'Saeed Naghizadeh, CISSP, M.Eng.',
    title: 'Cybersecurity Senior Manager, TD | Professor, Seneca Polytechnic',
    email: 'saeed.naghizadeh-qomi@senecapolytechnic.ca',
  },
  {
    name: 'Ionut Anghelache',
    title: 'Cyber Security Professor, Seneca College | Founder, IATEK',
    email: 'ionut_anghelache91@yahoo.com',
  },
  {
    name: 'Jason Carman',
    title: 'Professor & Program Coordinator, Seneca Polytechnic',
    email: 'jasonmcarman@gmail.com',
  },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const referencesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Main content animation
      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // References animation
      gsap.fromTo(
        referencesRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: referencesRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-flowing bg-bg-secondary py-20 lg:py-32 z-[90]"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Main Contact Content */}
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center mb-16 lg:mb-20"
          style={{ opacity: 0 }}
        >
          <h2 className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] leading-[1.0] tracking-[-0.01em] text-text-primary mb-6">
            Let's build something reliable.
          </h2>

          <p className="text-text-secondary text-base lg:text-lg leading-relaxed mb-8">
            I'm actively seeking SOC, NOC, and Infrastructure roles. If you need
            someone who learns fast, documents everything, and stays calm during
            incidents—let's talk.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href="mailto:taki@tyfsadik.org"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Send an email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-text-secondary text-sm">
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              North York, ON
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} />
              437-878-0011
            </span>
            <a
              href="https://tyfsadik.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-neon transition-colors"
            >
              <ExternalLink size={14} />
              tyfsadik.org
            </a>
          </div>
        </div>

        {/* References */}
        <div
          ref={referencesRef}
          className="max-w-4xl mx-auto"
          style={{ opacity: 0 }}
        >
          <h3 className="eyebrow text-center mb-8">References</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {references.map((ref, index) => (
              <div
                key={index}
                className="card-border p-4 lg:p-5 text-center hover:border-neon/20 transition-colors duration-300"
              >
                <h4 className="font-heading font-semibold text-text-primary text-sm mb-1">
                  {ref.name}
                </h4>
                <p className="text-text-secondary text-xs mb-3">{ref.title}</p>
                <a
                  href={`mailto:${ref.email}`}
                  className="text-neon text-xs hover:underline"
                >
                  {ref.email}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-text-primary/10 text-center">
          <p className="text-text-secondary/60 text-xs">
            © {new Date().getFullYear()} Taki Sadik • North York, ON
          </p>
        </div>
      </div>
    </section>
  );
}
