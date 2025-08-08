"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Marquess({
  text = "THE DARK PENGU RISES",
  speed = 50, // px/sec
  reverse = false, // scroll right if true
}) {
  const marqueeRef = useRef(null);
  const measureRef = useRef(null);
  const animationRef = useRef(null); // store GSAP animation
  const [repeatCount, setRepeatCount] = useState(1);

  // Calculate how many repeats we need to fill the viewport
  useEffect(() => {
    function calculateRepeats() {
      if (measureRef.current) {
        const chunkWidth = measureRef.current.offsetWidth;
        const viewportWidth = window.innerWidth;
        const needed = Math.ceil(viewportWidth / chunkWidth) + 1; // +1 to avoid gap
        setRepeatCount(needed);
      }
    }
    calculateRepeats();
    window.addEventListener("resize", calculateRepeats);
    return () => window.removeEventListener("resize", calculateRepeats);
  }, [text]);

  // Animate with GSAP
  useEffect(() => {
    if (!marqueeRef.current) return;

    const el = marqueeRef.current;
    const totalWidth = el.scrollWidth;
    const distance = totalWidth / 2; // one copy width
    const duration = distance / speed; // px/sec to seconds

    // Kill previous animation if it exists
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.fromTo(
      el,
      { x: reverse ? -distance : 0 },
      {
        x: reverse ? 0 : -distance,
        duration,
        ease: "none",
        repeat: -1,
      }
    );
  }, [speed, reverse, repeatCount]);

  const chunk = Array.from({ length: repeatCount }, () => text);

  return (
    <div className="w-full select-none overflow-hidden bg-[#111]">
      <div className="bg-[#1A1A41]">
        {/* Marquee track */}
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          onMouseEnter={() => animationRef.current?.pause()}
          onMouseLeave={() => animationRef.current?.resume()}
        >
          <Line items={chunk} />
          <Line items={chunk} ariaHidden />
        </div>

        {/* Hidden measure element */}
        <span
          ref={measureRef}
          className="absolute invisible whitespace-nowrap py-2 text-xl font-luck uppercase tracking-wider"
        >
          {text}
          <span className="mx-3">✦</span>
        </span>
      </div>
    </div>
  );
}

function Line({ items, ariaHidden = false }) {
  return (
    <div className="flex items-center" aria-hidden={ariaHidden}>
      {items.map((t, i) => (
        <span
          key={i}
          className="flex items-center py-2 text-xl font-luck uppercase tracking-wider text-white"
        >
          {t}
          <span className="mx-6 text-white/90">✦</span>
        </span>
      ))}
    </div>
  );
}
