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
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

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
        duration: 0.3,
        ease: "power2.out",
        opacity: 1,
      });

      animationFrameId = requestAnimationFrame(render);
      target.removeEventListener("mousemove", onMouseMove as EventListener);
    };

    target.addEventListener("mousemove", onMouseMove as EventListener);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = `url(#filter-noise-x)`;
            lineVerticalRef.current.style.filter = `url(#filter-noise-y)`;
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute(
              "baseFrequency",
              String(primitiveValues.turbulence)
            );
            filterYRef.current.setAttribute(
              "baseFrequency",
              String(primitiveValues.turbulence)
            );
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = "none";
            lineVerticalRef.current.style.filter = "none";
          }
        },
      })
      .to(primitiveValues, {
        duration: 0.35,
        ease: "power1.out",
        startAt: { turbulence: 0.6 },
        turbulence: 0,
      });

    // Dynamic Event Delegation on document for all clickable elements
    const isInteractive = (element: Element | null): boolean => {
      if (!element) return false;
      return Boolean(
        element.closest(
          "a, button, [role='button'], input, select, textarea, .group, [data-interactive='true'], .cursor-pointer"
        )
      );
    };

    let lastInteractiveEl: Element | null = null;

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const interactiveParent = el?.closest(
        "a, button, [role='button'], input, select, textarea, .group, [data-interactive='true'], .cursor-pointer"
      );

      if (interactiveParent && interactiveParent !== lastInteractiveEl) {
        lastInteractiveEl = interactiveParent;
        tl.restart();
        if (lineHorizontalRef.current && lineVerticalRef.current) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.9)",
            duration: 0.15,
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
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
        if (lineHorizontalRef.current && lineVerticalRef.current) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.4)",
            duration: 0.2,
          });
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
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
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves={1}
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale={24} />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves={1}
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale={24} />
          </filter>
        </defs>
      </svg>
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
          opacity: 0,
        }}
      />
    </div>
  );
}
