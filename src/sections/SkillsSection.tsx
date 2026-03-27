import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  Network,
  Server,
  Cloud,
  Database,
  Code,
  Wrench,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Shield,
    title: 'Security & SOC',
    skills: [
      'SIEM (Splunk, AlienVault)',
      'Threat Intelligence',
      'Incident Triage',
      'Digital Forensics',
      'Vulnerability Management',
      'OPSWAT ICIP',
    ],
  },
  {
    icon: Network,
    title: 'Networking',
    skills: [
      'TCP/IP',
      'VLANs',
      'Firewalls',
      'Routing & Switching',
      'WLAN/Wi-Fi 802.11',
      'SDN',
      'Cisco IOS',
      'DNS (Pi-hole + Unbound)',
    ],
  },
  {
    icon: Server,
    title: 'Systems & Servers',
    skills: [
      'Linux (Ubuntu, RHEL)',
      'Windows Server (AD, DHCP, DNS)',
      'Proxmox',
      'VMware',
      'Hyper-V',
      'Docker',
      'Server Monitoring',
      'Patch Management',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & Virtualization',
    skills: [
      'Azure (AZ-900)',
      'AWS (Cloud Practitioner)',
      'AWS Security',
      'Nextcloud',
      'Self-hosted Infrastructure',
      'Hybrid Cloud',
    ],
  },
  {
    icon: Database,
    title: 'Databases',
    skills: [
      'SQL',
      'MySQL',
      'PostgreSQL',
      'MS SQL Server',
      'Azure Database',
    ],
  },
  {
    icon: Code,
    title: 'Programming & Scripting',
    skills: [
      'Python',
      'Bash',
      'PHP',
      'JavaScript',
      'Rust',
      'Splunk SPL',
    ],
  },
  {
    icon: Wrench,
    title: 'Tools & Platforms',
    skills: [
      'Git',
      'GDB',
      'Make',
      'Visual Studio',
      'Eclipse',
      'SMTP',
      'Web Hosting',
      'AI Model Deployment',
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Grid items animation
      if (gridRef.current) {
        const tiles = gridRef.current.querySelectorAll('.skill-tile');
        gsap.fromTo(
          tiles,
          { y: 40, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.05,
            duration: 0.6,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              end: 'top 35%',
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-flowing bg-bg-secondary py-20 lg:py-32 z-40"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="mb-12 lg:mb-16" style={{ opacity: 0 }}>
          <h2 className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] leading-[1.0] tracking-[-0.01em] text-text-primary mb-4">
            Technical Skills
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl">
            Tools and platforms I use to keep systems secure, available, and
            observable.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
        >
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-tile card-border p-5 lg:p-6 relative group hover:border-neon/30 transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              {/* Accent corner */}
              <div className="absolute bottom-0 left-0 w-10 h-[3px] bg-neon" />

              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <category.icon
                  className="text-neon flex-shrink-0"
                  size={20}
                />
                <h3 className="font-heading font-semibold text-text-primary text-base">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <ul className="space-y-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="text-text-secondary text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-text-secondary/50 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
