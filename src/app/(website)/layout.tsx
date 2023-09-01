import { inter } from "@madx/lib/fonts";
import { cn } from "@madx/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "François Vaux",
  description: "Personal homepage of François Vaux, full-stack developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full min-h-screen">
      <body
        className={cn(
          "noisy dark relative min-h-full bg-bronze-background text-bronze-text-low",
          inter.className,
        )}
      >
        <div className="relative mx-auto w-full max-w-screen-lg space-y-8 p-8">
          {children}
        </div>
        <svg aria-hidden="true">
          <filter id="filter-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="6.29"
              numOctaves="6"
              stitchTiles="stitch"
            ></feTurbulence>
          </filter>
        </svg>
      </body>
    </html>
  );
}
