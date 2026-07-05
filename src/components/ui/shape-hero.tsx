"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function ShapeHero({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-white dark:bg-[#030303]">
      <FlickeringGrid
        color="#10b981"
        maxOpacity={0.15}
        flickerChance={0.5}
        squareSize={6}
        gridGap={8}
        className="absolute inset-0 h-full w-full"
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">{children}</div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
