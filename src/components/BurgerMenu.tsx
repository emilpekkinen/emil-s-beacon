import { useState, useEffect, useRef } from "react";

interface BurgerMenuProps {
  onPortfolioClick: () => void;
}

const BurgerMenu = ({ onPortfolioClick }: BurgerMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={menuRef} className="fixed top-4 left-4 z-50">
      {/* Burger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
        className="flex flex-col justify-center gap-[5px] w-9 h-9 p-2 rounded-md border border-border bg-background/80 backdrop-blur-sm hover:bg-accent transition-colors"
      >
        <span
          className={`block h-[1.5px] w-full bg-foreground transition-all duration-300 origin-center ${
            open ? "rotate-45 translate-y-[6.5px]" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-full bg-foreground transition-all duration-300 ${
            open ? "opacity-0 scale-x-0" : ""
          }`}
        />
        <span
          className={`block h-[1.5px] w-full bg-foreground transition-all duration-300 origin-center ${
            open ? "-rotate-45 -translate-y-[6.5px]" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-11 left-0 min-w-[160px] rounded-md border border-border bg-background/95 backdrop-blur-sm shadow-lg overflow-hidden transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={() => { setOpen(false); onPortfolioClick(); }}
          className="w-full text-left px-4 py-3 text-sm font-mono text-foreground hover:bg-accent transition-colors tracking-wide"
        >
          Portfolio
        </button>
      </div>
    </div>
  );
};

export default BurgerMenu;
