import React, { useEffect } from "react";
import AmbientBackground from "./AmbientBackground";

export default function PageShell({
  children,
  variant = "center"
}: {
  children: React.ReactNode;
  variant?: "center" | "wide";
}) {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mx", `${x}%`);
      document.documentElement.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={`stage ${variant === "center" ? "stage-center" : "stage-wide"}`}>
      <AmbientBackground />
      <div className="stage-inner">{children}</div>
    </div>
  );
}

