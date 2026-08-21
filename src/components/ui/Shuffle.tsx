"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: "left" | "right" | "up" | "down";
  duration?: number;
  maxDelay?: number;
  ease?: string | ((t: number) => number);
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: "random" | "evenodd";
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

export default function Shuffle({
  text,
  className = "",
  style = {},
  shuffleDirection = "right",
  duration = 0.45,
  maxDelay = 0,
  ease = "power3.out",
  threshold = 0.1,
  tag = "span",
  textAlign,
  onShuffleComplete,
  shuffleTimes = 2,
  animationMode = "evenodd",
  loop = false,
  loopDelay = 0,
  stagger = 0.04,
  scrambleCharset = "!<>-_/[]{}—=+*^?#",
  colorFrom,
  colorTo,
  delay = 0.2,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = false,
}: ShuffleProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isPlayingRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  const randChar = useCallback(
    (originalChar: string) => {
      if (!scrambleCharset || originalChar === " ") return originalChar;
      return scrambleCharset.charAt(
        Math.floor(Math.random() * scrambleCharset.length)
      );
    },
    [scrambleCharset]
  );

  const buildAndPlay = useCallback(() => {
    const el = containerRef.current;
    if (!el || !text) return;

    if (
      respectReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      el.textContent = text;
      onShuffleComplete?.();
      return;
    }

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    isPlayingRef.current = true;

    // Step 1: Render character spans to accurately measure dimensions in the DOM
    el.innerHTML = "";
    const computedFont = window.getComputedStyle(el).fontFamily;
    const letters = text.split("");
    const charSpans: HTMLElement[] = [];

    letters.forEach((char) => {
      const span = document.createElement("span");
      span.className = "inline-block";
      span.style.fontFamily = computedFont;
      if (char === " ") {
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = char;
      }
      el.appendChild(span);
      charSpans.push(span);
    });

    // Step 2: Measure each character's exact bounding box
    requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const strips: HTMLElement[] = [];
      const wraps: HTMLElement[] = [];
      const isVertical = shuffleDirection === "up" || shuffleDirection === "down";
      const rolls = Math.max(1, Math.floor(shuffleTimes));

      charSpans.forEach((span, idx) => {
        const char = letters[idx];
        if (char === " ") return;

        const rect = span.getBoundingClientRect();
        const w = Math.ceil(rect.width || 18);
        const h = Math.ceil(rect.height || 28);

        // Container wrapper that hides overflowing strip
        const wrap = document.createElement("span");
        wrap.className = "inline-block overflow-hidden relative text-left align-baseline";
        wrap.style.width = `${w}px`;
        wrap.style.height = isVertical ? `${h}px` : "auto";
        wrap.style.verticalAlign = "baseline";

        // Inner strip of sliding characters
        const inner = document.createElement("span");
        inner.className = `inline-flex ${
          isVertical ? "flex-col" : "flex-row"
        } whitespace-nowrap will-change-transform`;

        // Strip order: [Initial, ...random rolls, Final Real Char]
        const charsInStrip: string[] = [];
        charsInStrip.push(char);
        for (let r = 0; r < rolls; r++) {
          charsInStrip.push(randChar(char));
        }
        charsInStrip.push(char);

        charsInStrip.forEach((c) => {
          const item = document.createElement("span");
          item.textContent = c;
          item.className = "inline-block text-center select-none";
          item.style.width = `${w}px`;
          item.style.height = `${h}px`;
          item.style.fontFamily = computedFont;
          inner.appendChild(item);
        });

        wrap.appendChild(inner);
        span.replaceWith(wrap);
        wraps.push(wrap);
        strips.push(inner);

        // Calculate start and final translation offsets
        const steps = rolls + 1;
        let startX = 0;
        let finalX = 0;
        let startY = 0;
        let finalY = 0;

        if (shuffleDirection === "right") {
          startX = -steps * w;
          finalX = 0;
        } else if (shuffleDirection === "left") {
          startX = 0;
          finalX = -steps * w;
        } else if (shuffleDirection === "down") {
          startY = -steps * h;
          finalY = 0;
        } else if (shuffleDirection === "up") {
          startY = 0;
          finalY = -steps * h;
        }

        if (!isVertical) {
          gsap.set(inner, { x: startX, y: 0, force3D: true });
          inner.setAttribute("data-final-x", String(finalX));
        } else {
          gsap.set(inner, { x: 0, y: startY, force3D: true });
          inner.setAttribute("data-final-y", String(finalY));
        }

        if (colorFrom) {
          gsap.set(inner, { color: colorFrom });
        }
      });

      // Step 3: Animate in evenodd mode or random mode
      const tl = gsap.timeline({
        delay,
        repeat: loop ? -1 : 0,
        repeatDelay: loop ? loopDelay : 0,
        onComplete: () => {
          isPlayingRef.current = false;
          if (!loop) {
            // Restore clean static text when finished
            el.textContent = text;
            onShuffleComplete?.();
          }
        },
      });

      const addTween = (targets: HTMLElement[], at: number) => {
        const vars: gsap.TweenVars = {
          duration,
          ease,
          force3D: true,
          stagger: animationMode === "evenodd" ? stagger : 0,
        };

        if (isVertical) {
          vars.y = (_: number, t: HTMLElement) =>
            parseFloat(t.getAttribute("data-final-y") || "0");
        } else {
          vars.x = (_: number, t: HTMLElement) =>
            parseFloat(t.getAttribute("data-final-x") || "0");
        }

        if (colorFrom && colorTo) {
          vars.color = colorTo;
        }

        tl.to(targets, vars, at);
      };

      if (animationMode === "evenodd") {
        const evenStrips = strips.filter((_, i) => i % 2 === 0);
        const oddStrips = strips.filter((_, i) => i % 2 === 1);
        const evenTotal = duration + Math.max(0, evenStrips.length - 1) * stagger;
        const oddStart = evenStrips.length ? evenTotal * 0.5 : 0;

        if (evenStrips.length) addTween(evenStrips, 0);
        if (oddStrips.length) addTween(oddStrips, oddStart);
      } else {
        strips.forEach((strip) => {
          const d = Math.random() * maxDelay;
          const vars: gsap.TweenVars = {
            duration,
            ease,
            force3D: true,
          };
          if (isVertical) {
            vars.y = parseFloat(strip.getAttribute("data-final-y") || "0");
          } else {
            vars.x = parseFloat(strip.getAttribute("data-final-x") || "0");
          }
          if (colorFrom && colorTo) {
            vars.color = colorTo;
          }
          tl.to(strip, vars, d);
        });
      }

      tlRef.current = tl;
      setReady(true);
    });
  }, [
    text,
    shuffleDirection,
    duration,
    maxDelay,
    ease,
    shuffleTimes,
    animationMode,
    loop,
    loopDelay,
    stagger,
    colorFrom,
    colorTo,
    respectReducedMotion,
    onShuffleComplete,
    randChar,
  ]);

  // Initial trigger (once on load)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasTriggeredRef.current || !triggerOnce) {
              hasTriggeredRef.current = true;
              buildAndPlay();
            }
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, [buildAndPlay, threshold, triggerOnce]);

  // Hover trigger (optional)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !triggerOnHover) return;

    const handleMouseEnter = () => {
      if (!isPlayingRef.current) {
        buildAndPlay();
      }
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    return () => el.removeEventListener("mouseenter", handleMouseEnter);
  }, [buildAndPlay, triggerOnHover]);

  const Tag = (tag || "span") as keyof React.JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      ref: containerRef as unknown as React.Ref<never>,
      className: `inline-block select-none ${
        ready ? "opacity-100" : "opacity-100"
      } ${className}`.trim(),
      style: {
        textAlign,
        ...style,
      },
    },
    text
  );
}
