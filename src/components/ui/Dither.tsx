"use client";

import React, { useEffect, useRef } from "react";

export interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  className?: string;
}

// Bayer 8x8 Dithering Matrix
const BAYER_8X8 = [
  0.0 / 64.0, 48.0 / 64.0, 12.0 / 64.0, 60.0 / 64.0, 3.0 / 64.0, 51.0 / 64.0, 15.0 / 64.0, 63.0 / 64.0,
  32.0 / 64.0, 16.0 / 64.0, 44.0 / 64.0, 28.0 / 64.0, 35.0 / 64.0, 19.0 / 64.0, 47.0 / 64.0, 31.0 / 64.0,
  8.0 / 64.0, 56.0 / 64.0, 4.0 / 64.0, 52.0 / 64.0, 11.0 / 64.0, 59.0 / 64.0, 7.0 / 64.0, 55.0 / 64.0,
  40.0 / 64.0, 24.0 / 64.0, 36.0 / 64.0, 20.0 / 64.0, 43.0 / 64.0, 27.0 / 64.0, 39.0 / 64.0, 23.0 / 64.0,
  2.0 / 64.0, 50.0 / 64.0, 14.0 / 64.0, 62.0 / 64.0, 1.0 / 64.0, 49.0 / 64.0, 13.0 / 64.0, 61.0 / 64.0,
  34.0 / 64.0, 18.0 / 64.0, 46.0 / 64.0, 30.0 / 64.0, 33.0 / 64.0, 17.0 / 64.0, 45.0 / 64.0, 29.0 / 64.0,
  10.0 / 64.0, 58.0 / 64.0, 6.0 / 64.0, 54.0 / 64.0, 9.0 / 64.0, 57.0 / 64.0, 5.0 / 64.0, 53.0 / 64.0,
  42.0 / 64.0, 26.0 / 64.0, 38.0 / 64.0, 22.0 / 64.0, 41.0 / 64.0, 25.0 / 64.0, 37.0 / 64.0, 21.0 / 64.0,
];

// Fast 2D Simplex noise implementation
function createNoise2D() {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const n = Math.floor((i + 1) * Math.sin(i * 12.9898) * 43758.5453) & 255;
    const q = p[i];
    p[i] = p[n];
    p[n] = q;
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

  return function noise2D(xin: number, yin: number): number {
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const X0 = i - t;
    const Y0 = j - t;
    const x0 = xin - X0;
    const y0 = yin - Y0;

    let i1 = 0, j1 = 0;
    if (x0 > y0) {
      i1 = 1;
      j1 = 0;
    } else {
      i1 = 0;
      j1 = 1;
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1.0 + 2.0 * G2;
    const y2 = y0 - 1.0 + 2.0 * G2;

    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) {
      t0 *= t0;
      const gi0 = perm[ii + perm[jj]] % 8;
      const gx0 = gi0 < 4 ? (gi0 & 1 ? 1 : -1) : 0;
      const gy0 = gi0 < 4 ? 0 : (gi0 & 1 ? 1 : -1);
      n0 = t0 * t0 * (gx0 * x0 + gy0 * y0);
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) {
      t1 *= t1;
      const gi1 = perm[ii + i1 + perm[jj + j1]] % 8;
      const gx1 = gi1 < 4 ? (gi1 & 1 ? 1 : -1) : 0;
      const gy1 = gi1 < 4 ? 0 : (gi1 & 1 ? 1 : -1);
      n1 = t1 * t1 * (gx1 * x1 + gy1 * y1);
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) {
      t2 *= t2;
      const gi2 = perm[ii + 1 + perm[jj + 1]] % 8;
      const gx2 = gi2 < 4 ? (gi2 & 1 ? 1 : -1) : 0;
      const gy2 = gi2 < 4 ? 0 : (gi2 & 1 ? 1 : -1);
      n2 = t2 * t2 * (gx2 * x2 + gy2 * y2);
    }

    return 70.0 * (n0 + n1 + n2);
  };
}

export default function Dither({
  waveSpeed = 0.02,
  waveFrequency = 2.5,
  waveAmplitude = 0.35,
  waveColor = [0.85, 0.85, 0.85],
  colorNum = 4,
  pixelSize = 3,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.4,
  className = "",
}: DitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stable props reference so re-renders in parent never restart time or cause blink
  const propsRef = useRef({
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
  });

  propsRef.current = {
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    colorNum,
    pixelSize,
    disableAnimation,
    enableMouseInteraction,
    mouseRadius,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const noise2D = createNoise2D();

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    let width = 0;
    let height = 0;
    let lowW = 0;
    let lowH = 0;
    let offscreenCanvas: HTMLCanvasElement | null = null;
    let offscreenCtx: CanvasRenderingContext2D | null = null;
    let imageData: ImageData | null = null;
    let buf32: Uint32Array | null = null;

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      canvas.width = width;
      canvas.height = height;

      const scale = Math.max(1, propsRef.current.pixelSize);
      lowW = Math.max(1, Math.floor(width / scale));
      lowH = Math.max(1, Math.floor(height / scale));

      offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = lowW;
      offscreenCanvas.height = lowH;
      offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });

      if (offscreenCtx) {
        imageData = offscreenCtx.createImageData(lowW, lowH);
        buf32 = new Uint32Array(imageData.data.buffer);
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!propsRef.current.enableMouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / (rect.width || 1);
      mouse.targetY = (e.clientY - rect.top) / (rect.height || 1);
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const fbm = (px: number, py: number, freqVal: number, ampVal: number): number => {
      let value = 0.0;
      let amp = 1.0;
      let freq = freqVal;
      let cx = px;
      let cy = py;

      for (let i = 0; i < 4; i++) {
        value += amp * Math.abs(noise2D(cx, cy));
        cx *= freq;
        cy *= freq;
        amp *= ampVal;
      }
      return value;
    };

    let time = 0;

    const render = () => {
      const {
        waveSpeed: currentSpeed,
        waveFrequency: currentFreq,
        waveAmplitude: currentAmp,
        waveColor: currentColor,
        colorNum: currentColorNum,
        disableAnimation: currentDisableAnim,
        enableMouseInteraction: currentMouseEnabled,
        mouseRadius: currentMouseRadius,
      } = propsRef.current;

      if (!currentDisableAnim) {
        // Continuous, smooth, non-repeating slow time increment
        time += currentSpeed * 0.25;
      }

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      if (buf32 && imageData && offscreenCtx && lowW > 0 && lowH > 0) {
        const aspect = lowW / lowH;
        const invColorStep = currentColorNum - 1.0;
        const colorStep = 1.0 / invColorStep;

        const baseR = currentColor[0];
        const baseG = currentColor[1];
        const baseB = currentColor[2];

        for (let y = 0; y < lowH; y++) {
          const uvY = (y / lowH - 0.5);
          const bayerRow = (y & 7) * 8;

          for (let x = 0; x < lowW; x++) {
            const uvX = (x / lowW - 0.5) * aspect;

            const p2x = uvX - time;
            const p2y = uvY - time;
            const f1 = fbm(p2x, p2y, currentFreq, currentAmp);
            let f = fbm(uvX + f1, uvY + f1, currentFreq, currentAmp);

            if (currentMouseEnabled && mouse.active) {
              const mouseNDC_x = (mouse.x - 0.5) * aspect;
              const mouseNDC_y = (mouse.y - 0.5);
              const dx = uvX - mouseNDC_x;
              const dy = uvY - mouseNDC_y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < currentMouseRadius) {
                const effect = 1.0 - (dist / currentMouseRadius);
                f -= 0.45 * Math.max(0, Math.min(1, effect * effect));
              }
            }

            const bayerVal = BAYER_8X8[bayerRow + (x & 7)] - 0.25;
            let val = f + bayerVal * colorStep - 0.2;
            val = Math.max(0.0, Math.min(1.0, val));
            const quantized = Math.floor(val * invColorStep + 0.5) / invColorStep;

            const r = Math.floor(quantized * baseR * 255);
            const g = Math.floor(quantized * baseG * 255);
            const b = Math.floor(quantized * baseB * 255);

            buf32[y * lowW + x] = (255 << 24) | (b << 16) | (g << 8) | r;
          }
        }

        offscreenCtx.putImageData(imageData, 0, 0);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreenCanvas!, 0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Run once on mount!

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full pointer-events-none" />
    </div>
  );
}
