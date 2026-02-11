import { useEffect, useRef, useCallback } from "react";

const FLAME_CHARS = " .:-=+*#%@";

const AsciiFlame = () => {
  const canvasRef = useRef<HTMLPreElement>(null);
  const bufferRef = useRef<number[]>([]);
  const animRef = useRef<number>(0);

  const COLS = 60;
  const ROWS = 30;

  const step = useCallback(() => {
    const buf = bufferRef.current;
    const size = COLS * ROWS;

    // Cool down
    for (let i = 0; i < size; i++) {
      if (i >= COLS * (ROWS - 1)) {
        // Bottom row: random heat
        buf[i] = Math.random() > 0.4 ? Math.floor(Math.random() * FLAME_CHARS.length) : 0;
      } else {
        const below = i + COLS;
        const avg =
          (buf[below] ?? 0) +
          (buf[below - 1] ?? 0) +
          (buf[below + 1] ?? 0) +
          (buf[i + COLS * 2] ?? 0);
        buf[i] = Math.max(0, Math.floor(avg / 4.08));
      }
    }

    // Render
    let output = "";
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const val = buf[y * COLS + x];
        output += FLAME_CHARS[Math.min(val, FLAME_CHARS.length - 1)];
      }
      output += "\n";
    }

    if (canvasRef.current) {
      canvasRef.current.textContent = output;
    }

    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    bufferRef.current = new Array(COLS * ROWS).fill(0);
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [step]);

  return (
    <pre
      ref={canvasRef}
      className="fixed inset-0 flex items-end justify-center overflow-hidden pointer-events-none select-none text-foreground leading-none text-[10px] sm:text-xs opacity-20 z-0"
      aria-hidden="true"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    />
  );
};

export default AsciiFlame;
