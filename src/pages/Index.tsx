import { useRef } from "react";
import { Github, Linkedin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/emil-profile.jpeg";
import AsciiFlame from "@/components/AsciiFlame";
import ThemeToggle from "@/components/ThemeToggle";
import BurgerMenu from "@/components/BurgerMenu";
import PortfolioSection from "@/components/PortfolioSection";

const Index = () => {
  const portfolioRef = useRef<HTMLElement>(null);

  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background" style={{ scrollBehavior: "smooth" }}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AsciiFlame />
        <ThemeToggle />
        <BurgerMenu onPortfolioClick={scrollToPortfolio} />

        <main className="relative z-10 flex flex-col items-center gap-8 px-6 py-16 animate-fade-in">
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border shadow-lg">
            <img
              src={profileImage}
              alt="Emil Pekkinen"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Emil Pekkinen
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
              Leading the global hackathon revolution.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://linkedin.com/in/emilpekkinen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a
                href="https://github.com/emilpekkinen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <a
                href="https://cal.com/emil-pekkinen"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a call
              </a>
            </Button>
          </div>

          {/* Scroll hint */}
          <button
            onClick={scrollToPortfolio}
            className="mt-4 flex flex-col items-center gap-1 text-xs font-mono tracking-widest text-muted-foreground/50 hover:text-muted-foreground transition-colors uppercase"
            aria-label="Scroll to portfolio"
          >
            <span>Portfolio</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="animate-bounce">
              <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </main>
      </div>

      {/* ── Portfolio ─────────────────────────────────────── */}
      <PortfolioSection ref={portfolioRef} />
    </div>
  );
};

export default Index;
