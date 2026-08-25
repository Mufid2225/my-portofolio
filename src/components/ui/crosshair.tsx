"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface CrosshairProps {
  color?: string;
  containerRef?: React.RefObject<HTMLElement | null> | null;
  className?: string;
}

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getMousePos = (e: MouseEvent, container: HTMLElement | null | undefined) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };
  }
  return { x: e.clientX, y: e.clientY };
};

export default function Crosshair({
  color = "rgba(255, 255, 255, 0.75)",
  containerRef = null,
  className = "",
}: CrosshairProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouse = { x: -1000, y: -1000 };
    let animationFrameId: number;

    const handleMouseMove = (ev: MouseEvent) => {
      mouse = getMousePos(ev, containerRef?.current);

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
            opacity: 0,
            duration: 0.15,
          });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
            opacity: 1,
            duration: 0.15,
          });
        }
      }
    };

    const target: EventTarget = containerRef?.current || window;
    target.addEventListener("mousemove", handleMouseMove as EventListener);

    // Responsive, high-speed tracking (amt: 0.85 = instantaneous and snappy)
    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.85 },
      ty: { previous: 0, current: 0, amt: 0.85 },
    };

    gsap.set([lineHorizontalRef.current, lineVerticalRef.current], {
      opacity: 0,
    });

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key in renderedStyles) {
        const k = key as "tx" | "ty";
        renderedStyles[k].previous = lerp(
          renderedStyles[k].previous,
          renderedStyles[k].current,
          renderedStyles[k].amt
        );
      }

      if (lineHorizontalRef.current && lineVerticalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const onMouseMove = () => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
        duration: 0.25,
        ease: "power2.out",
        opacity: 1,
      });

      animationFrameId = requestAnimationFrame(render);
      target.removeEventListener("mousemove", onMouseMove as EventListener);
    };

    target.addEventListener("mousemove", onMouseMove as EventListener);

    // High-performance GPU Tactical Hover Pulse (0 SVG invalidation)
    let isScrolling = false;
    let scrollTimer: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let lastInteractiveEl: Element | null = null;

    const triggerGlitchPulse = () => {
      if (isScrolling || !lineHorizontalRef.current || !lineVerticalRef.current) return;
      
      gsap.killTweensOf([lineHorizontalRef.current, lineVerticalRef.current]);
      
      // Fast cybernetic flash & settle without touching DOM filters
      gsap.timeline()
        .to([lineHorizontalRef.current, lineVerticalRef.current], {
          boxShadow: "0 0 12px rgba(255, 255, 255, 0.95)",
          opacity: 1,
          duration: 0.08,
          ease: "power2.out",
        })
        .to([lineHorizontalRef.current, lineVerticalRef.current], {
          boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
          opacity: 0.85,
          duration: 0.15,
          ease: "power1.inOut",
        });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (isScrolling) return;
      const el = e.target as Element | null;
      const interactiveParent = el?.closest(
        "a, button, [role='button'], input, select, textarea, .group, [data-interactive='true'], .cursor-pointer"
      );

      if (interactiveParent && interactiveParent !== lastInteractiveEl) {
        lastInteractiveEl = interactiveParent;
        triggerGlitchPulse();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (isScrolling) return;
      const el = e.target as Element | null;
      const related = e.relatedTarget as Element | null;

      const currentInteractive = el?.closest(
        "a, button, [role='button'], input, select, textarea, .group, [data-interactive='true'], .cursor-pointer"
      );
      const nextInteractive = related?.closest(
        "a, button, [role='button'], input, select, textarea, .group, [data-interactive='true'], .cursor-pointer"
      );

      if (currentInteractive && currentInteractive !== nextInteractive) {
        lastInteractiveEl = null;
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollTimer) clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
      target.removeEventListener("mousemove", handleMouseMove as EventListener);
      target.removeEventListener("mousemove", onMouseMove as EventListener);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none hidden md:block ${className}`}
      style={{
        position: containerRef ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <div
        ref={lineHorizontalRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: color,
          boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
          pointerEvents: "none",
          transform: "translateY(50%)",
          willChange: "transform, opacity, box-shadow",
          opacity: 0,
        }}
      />
      <div
        ref={lineVerticalRef}
        style={{
          position: "absolute",
          height: "100%",
          width: "1px",
          background: color,
          boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
          pointerEvents: "none",
          transform: "translateX(50%)",
          willChange: "transform, opacity, box-shadow",
          opacity: 0,
        }}
      />
    </div>
  );
}
