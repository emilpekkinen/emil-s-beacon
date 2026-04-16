import { forwardRef, useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  tag: string;
  description: string;
  tech: string[];
  links: { label: string; href: string; icon: "github" | "external" }[];
}

const projects: Project[] = [
  {
    title: "ESP32 Sensor Node",
    tag: "Embedded / IoT",
    description:
      "A lightweight wireless sensor node built on the ESP32 microcontroller. Reads environmental data over I²C, publishes readings via MQTT over Wi-Fi, and enters deep sleep between cycles to maximise battery life. Designed for easy deployment in remote or low-power environments.",
    tech: ["C / Arduino", "ESP32", "MQTT", "I²C", "Deep Sleep"],
    links: [
      { label: "GitHub", href: "https://github.com/emilpekkinen", icon: "github" },
    ],
  },
  {
    title: "Whispering Vale",
    tag: "Game / AI",
    description:
      "A 3D browser RPG where every NPC is powered by a large language model. Characters hold persistent memories, form opinions, hand out quests, and reward players on completion. New areas of the world are procedurally generated mid-game whenever an NPC mentions an unexplored location.",
    tech: ["React", "Three.js", "Express", "Claude AI", "SQLite"],
    links: [
      { label: "GitHub", href: "https://github.com/emilpekkinen/whispering-vale", icon: "github" },
      { label: "Play", href: "/whispering-vale/", icon: "external" },
    ],
  },
];

const PortfolioSection = forwardRef<HTMLElement>((_, ref) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(projects.map(() => false));

  useEffect(() => {
    const observers = cardRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((v) => { const n = [...v]; n[i] = true; return n; });
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-background"
    >
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="w-full max-w-3xl">
        <div className="mb-14 text-center">
          <p className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase mb-3">
            Selected work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Portfolio
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={`group rounded-xl border border-border bg-card p-7 transition-all duration-700 ease-out ${
                visible[i]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                    {project.tag}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-1">
                    {project.title}
                  </h3>
                </div>
                <div className="flex gap-2 shrink-0">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("/") ? undefined : "_blank"}
                      rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-foreground/40 hover:bg-accent transition-colors"
                    >
                      {link.icon === "github" ? (
                        <Github className="h-3.5 w-3.5" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5" />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-border text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

PortfolioSection.displayName = "PortfolioSection";
export default PortfolioSection;
