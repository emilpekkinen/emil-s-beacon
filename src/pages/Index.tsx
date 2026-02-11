import { Github, Linkedin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/emil-profile.jpeg";
import AsciiFlame from "@/components/AsciiFlame";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <AsciiFlame />
      <ThemeToggle />

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
          <p className="text-muted-foreground text-sm sm:text-base max-w-md">
            Developer & builder of things.
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
      </main>
    </div>
  );
};

export default Index;
