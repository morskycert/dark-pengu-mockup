"use client";

const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';

import React, { useEffect, useRef, useState } from "react";

/**
 * Preloader (JSX) — Next.js + Tailwind
 *
 * What it does
 * - Full-screen overlay + progress bar while images & fonts load
 * - Locks scroll during load
 * - On ready (or timeout), scrolls to your hero/top BEFORE fade-out
 *
 * Props
 * - heroId   : string  (default: "hero") — element id to snap to; falls back to top if not found
 * - timeoutMs: number  (default: 8000)   — hard cap so we never hang forever
 * - brand    : ReactNode                  — optional content next to the logo (e.g. your name)
 */

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

function clamp(n, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export default function Preloader({ heroId = "hero", timeoutMs = 8000, minDurationMs = 800, brand }) {
  const isMounted = useIsMounted();
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const lockApplied = useRef(false);

  useEffect(() => {
    if (!isMounted) return;

    const root = document.documentElement;
    if (!lockApplied.current) {
      root.classList.add("overflow-hidden", "h-full");
      lockApplied.current = true;
    }

    const imgs = Array.from(document.images);
    const totalImgs = Math.max(1, imgs.length);
    let loadedImgs = 0;

    const updateVisual = () => {
      const real = (loadedImgs / totalImgs) * 80; // images count toward ~80%
      setPercent((p) => clamp(p + (real - p) * 0.15)); // ease toward target
    };

    const tick = setInterval(updateVisual, 100);

    const onDoneOne = () => { loadedImgs++; };
    imgs.forEach((img) => {
      if (img.complete) loadedImgs++;
      else {
        img.addEventListener("load", onDoneOne, { once: true });
        img.addEventListener("error", onDoneOne, { once: true });
      }
    });

    const fontsReady = (document.fonts && document.fonts.ready && document.fonts.ready.catch(() => {})) || Promise.resolve();
    const onWindowLoad = new Promise((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });

    const hardTimeout = new Promise((res) => setTimeout(() => res(), timeoutMs));
    const minDuration = new Promise((res) => setTimeout(res, minDurationMs));

    Promise.all([
    Promise.race([Promise.all([onWindowLoad, fontsReady]).then(() => {}), hardTimeout]),
    minDuration,
    ]).then(() => {
    clearInterval(tick);

    const ramp = () => setPercent((p) => {
        const next = p + (100 - p) * 0.25;
        if (next > 99.4) {
        requestAnimationFrame(finish);
        return 100;
        }
        requestAnimationFrame(ramp);
        return next;
    });

    const finish = () => {
        const hero = heroId ? document.getElementById(heroId) : null;
        if (hero) {
        const y = hero.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: "auto" });
        if (typeof hero.focus === "function") {
            hero.setAttribute("tabindex", "-1");
            hero.focus();
        }
        } else {
        window.scrollTo({ top: 0, behavior: "auto" });
        }

        requestAnimationFrame(() => {
        setHidden(true);
        root.classList.remove("overflow-hidden", "h-full");
        });
    };

    ramp();
    });

    // Cleanup listeners
    return () => {
      clearInterval(tick);
      imgs.forEach((img) => {
        img.removeEventListener("load", onDoneOne);
        img.removeEventListener("error", onDoneOne);
      });
    };
  }, [heroId, isMounted, timeoutMs]);

  if (!isMounted) return null; // Avoid SSR mismatch

  return (
    <div
  id="preloader-overlay"
  aria-hidden
  className={[
    "fixed inset-0 grid place-items-center z-[9999] bg-black shadow-2xl ring-1 ", // solid black background
    hidden ? "hidden" : "",
  ].join(" ")}
>
  <div className="w-[min(560px,86vw)] rounded-2xl p-6 md:p-7 bg-black backdrop-blur">
    
    {/* Character video above progress bar */}
    <div className="mb-4 flex justify-center">
       <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="h-48 w-48 rounded-xl"   // whatever classes you use
    >
      <source src={`${bp}/art/rising-dp.mp4`} type="video/mp4" />
    </video>
    </div>

    {/* Brand / Logo */}
    <div className=" items-center text-center w-full gap-3 mb-3 text-white tracking-wide uppercase text-md font-semibold">
      <p className="font-luck">Loading</p>
    </div>

    {/* Progress bar */}
    <div className="h-5 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#282FB680] via-[#60a5fa8c] to-white/80"
        style={{ width: `${percent | 0}%` }}
      />
    </div>

    {/* Progress text */}
    <div className="mt-2 flex items-center justify-between text-[11px] font-fredok text-white/80">
      <span className="opacity-80">Preparing assets…</span>
      <span className="font-bold text-white tabular-nums">{percent | 0}%</span>
    </div>
  </div>
</div>

  );
}