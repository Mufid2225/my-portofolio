"use client";

import Dither from "@/components/ui/Dither";

const WAVE_COLOR: [number, number, number] = [0.75, 0.75, 0.75];

export default function ShapeHero({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden bg-[#030303]">
      <Dither
        waveColor={WAVE_COLOR}
        disableAnimation={false}
        enableMouseInteraction={false}
        mouseRadius={0.35}
        colorNum={4}
        waveAmplitude={0.35}
        waveFrequency={2.5}
        waveSpeed={0.006}
        pixelSize={2.5}
        className="opacity-90"
      />

      <div className="container relative z-10 mx-auto px-4 pt-24 sm:pt-28 pb-16 md:px-6">
        <div className="mx-auto max-w-4xl text-center">{children}</div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}



