import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Bot, Server, Globe, Cloud, Image as ImageIcon, Search, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'a',
    title: 'Private AI Model',
    description: 'Self-hosted LLM with web search and tool use capabilities.',
    image: '/mosaic_tile_a.jpg',
    icon: Bot,
    link: 'https://ai.tyfsadik.org',
  },
  {
    id: 'b',
    title: 'Proxmox Homelab',
    description: 'Virtualized infrastructure for testing servers, networks, and services.',
    image: '/mosaic_tile_b.jpg',
    icon: Server,
    link: '#',
  },
  {
    id: 'c',
    title: 'Self-Hosted DNS + Mail',
    description: 'Pi-hole + Unbound recursive DNS and a secured SMTP mail server with custom domain.',
    image: '/mosaic_tile_c.jpg',
    icon: Globe,
    link: 'https://tyfsadik.org',
  },
  {
    id: 'd',
    title: 'Nextcloud + Photo Server',
    description: 'Private cloud storage and media management for personal use.',
    image: '/mosaic_tile_d.jpg',
    icon: Cloud,
    link: 'https://cloud.tyfsadik.org',
  },
];

const additionalProjects = [
  {
    title: 'Public Search Engine',
    description: 'Custom indexing search engine for public use.',
    icon: Search,
    link: 'https://search.tyfsadik.org',
  },
  {
    title: 'Public Wiki Server',
    description: 'Full Wikipedia mirror for restricted regions.',
    icon: BookOpen,
    link: 'https://wiki.tyfsadik.org',
  },
  {
    title: 'Photo Management',
    description: 'Self-hosted photo server with AI tagging.',
    icon: ImageIcon,
    link: 'https://photo.tyfsadik.org',
  },
];

// Project Tile Component
function ProjectTile({ 
  project, 
  tileRef, 
  style 
}: { 
  project: typeof projects[0]; 
  tileRef: React.RefObject<HTMLDivElement | null>;
  style: React.CSSProperties;
}) {
  const IconComponent = project.icon;
  
  return (
    <div
      ref={tileRef}
      className="absolute card-border overflow-hidden group cursor-pointer"
      style={style}
      onClick={() => window.open(project.link, '_blank')}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
        <div className="flex items-center gap-2 mb-2">
          <IconComponent className="text-neon" size={18} />
          <h3 className="font-heading font-semibold text-text-primary text-base lg:text-lg">
            {project.title}
          </h3>
        </div>
        <p className="text-text-secondary text-xs lg:text-sm mb-3">
          {project.description}
        </p>
        <div className="accent-line-tile w-10 h-[3px] bg-neon origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tileARef = useRef<HTMLDivElement>(null);
  const tileBRef = useRef<HTMLDivElement>(null);
  const tileCRef = useRef<HTMLDivElement>(null);
  const tileDRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        headingRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        tileARef.current,
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        tileBRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        tileCRef.current,
        { y: '60vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        tileDRef.current,
        { x: '40vw', y: '30vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Accent lines
      const accentLines = section.querySelectorAll('.accent-line-tile');
      scrollTl.fromTo(
        accentLines,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', stagger: 0.02 },
        0.2
      );

      // Additional projects
      scrollTl.fromTo(
        additionalRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.25
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [tileARef.current, tileCRef.current],
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [tileBRef.current, tileDRef.current],
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headingRef.current,
        { y: 0, opacity: 1 },
        { y: -20, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        additionalRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-pinned bg-bg-primary z-[60]"
    >
      {/* Heading */}
      <h2
        ref={headingRef}
        className="absolute left-[6vw] top-[4vh] font-heading font-bold text-[clamp(28px,3vw,42px)] leading-[1.0] tracking-[-0.01em] text-text-primary"
        style={{ opacity: 0 }}
      >
        Selected Projects
      </h2>

      {/* Mosaic Grid */}
      <div className="absolute inset-0 pt-[12vh] pb-[4vh] px-[6vw]">
        <div className="relative w-full h-full">
          {/* Tile A - Top Left */}
          <ProjectTile
            project={projects[0]}
            tileRef={tileARef}
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '23%',
              transform: 'translateX(-60vw)',
              opacity: 0,
            }}
          />

          {/* Tile B - Top Right (desktop) / below on mobile */}
          <ProjectTile
            project={projects[1]}
            tileRef={tileBRef}
            style={{
              left: 0,
              top: '25%',
              width: '100%',
              height: '23%',
              transform: 'translateX(60vw)',
              opacity: 0,
            }}
          />

          {/* Tile C - Bottom Left Wide */}
          <ProjectTile
            project={projects[2]}
            tileRef={tileCRef}
            style={{
              left: 0,
              top: '50%',
              width: '100%',
              height: '23%',
              transform: 'translateY(60vh)',
              opacity: 0,
            }}
          />

          {/* Tile D - Bottom Right */}
          <ProjectTile
            project={projects[3]}
            tileRef={tileDRef}
            style={{
              left: 0,
              top: '75%',
              width: '100%',
              height: '20%',
              transform: 'translate(40vw, 30vh)',
              opacity: 0,
            }}
          />
        </div>
      </div>

      {/* Additional Projects */}
      <div
        ref={additionalRef}
        className="absolute bottom-[2vh] left-[6vw] right-[6vw] hidden lg:flex items-center justify-center gap-6"
        style={{ opacity: 0 }}
      >
        {additionalProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-text-secondary hover:text-neon transition-colors duration-200"
          >
            <project.icon size={14} />
            <span className="text-xs">{project.title}</span>
            <ExternalLink size={10} />
          </a>
        ))}
      </div>
    </section>
  );
}
