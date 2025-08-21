'use client'
import Navbar from "./Navbar"
import CopyCAButton from "./CAButton"
import Image from "next/image"
import MobileModal from "./MobileModal"
import Link from "next/link";

import penguIsland from "@/public/art/darkpengucc_sign.png"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false)
  const rootRef  = useRef(null)

  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const pRef     = useRef(null)

  const islandRef = useRef(null)
  const bigRef    = useRef(null)
  const flyRef    = useRef(null)

  const orbRef  = useRef(null)
  const glowRef = useRef(null)

  // Scroll state — throttle changes
  useEffect(() => {
    let last = false
    const onScroll = () => {
      const next = window.scrollY > 10
      if (next !== last) {
        last = next
        setScrolled(next)
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useGSAP(() => {
    const H = window.innerHeight
    const W = window.innerWidth
    const timelines = []

    // Pre-set transforms (avoids first-frame reflow)
    gsap.set([line1Ref.current, line2Ref.current, pRef.current], { y: 0, opacity: 1 })
    gsap.set(islandRef.current, { x: 0, y: 0, rotation: 0 })
    gsap.set(bigRef.current,    { x: 0, opacity: 1 })
    gsap.set(flyRef.current,    { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, transformOrigin: "50% 50%" })
    gsap.set(orbRef.current,    { transformOrigin: "50% 50%" })
    gsap.set(glowRef.current,   { transformOrigin: "50% 50%" })

    // Intro text
    const tlIntro = gsap.timeline()
      .from(line1Ref.current, { y: H * 0.2, opacity: 0, duration: 0.9, ease: "power4.out" }, 0)
      .from(line2Ref.current, { y: H * 0.2, opacity: 0, duration: 0.9, ease: "power4.out" }, 0.15)
      .from(pRef.current,     { y: H * 0.2, opacity: 0, duration: 0.9, ease: "power4.out" }, 0.3)
    timelines.push(tlIntro)

    // Island bounce + float (single repeating tween is fine)
    gsap.from(islandRef.current, {
      y: H * 0.6,
      opacity: 0,
      duration: 0.8,
      ease: "circ.out",
    })

    const islandFloat = gsap.to(islandRef.current, {
      y: () => gsap.utils.random(32, 46),
      x: () => gsap.utils.random(-8, 8),
      rotation: () => gsap.utils.random(-1.5, 1.5),
      ease: "sine.inOut",
      duration: 2.0,
      yoyo: true,
      repeat: -1,
      repeatRefresh: true,
      delay: 0.9,
    })
    timelines.push(islandFloat)

    // Big penguin slide-in
    gsap.from(bigRef.current, {
      x: -W * 0.7,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 1,
    })

    // Flying penguin — use independent infinite tweens (no parent repeating timeline)
    const flyX = gsap.to(flyRef.current, {
      x: "+=56",
      duration: 5.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })
    const flyY = gsap.to(flyRef.current, {
      y: "-=26",
      duration: 1.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })
    const flyRot = gsap.to(flyRef.current, {
      rotation: "+=3.5",
      duration: 2.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    })
    const flySquish = gsap.to(flyRef.current, {
      scaleY: 0.92,
      scaleX: 1.06,
      duration: 0.14,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.32,
      delay: 0.2,
    })
    timelines.push(flyX, flyY, flyRot, flySquish)

    // Orb — split into independent tweens (no nested infinite timeline)
    const orbSpin = gsap.to(orbRef.current, {
      rotation: "+=360",
      duration: 10,
      ease: "none",
      repeat: -1,
    })
    const orbPulse = gsap.fromTo(orbRef.current,
      { scale: 0.97 },
      {
        scale: 1.04,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        overwrite: "auto",
      }
    )
    const glowPulse = gsap.fromTo(glowRef.current,
      { opacity: 0.35, scale: 1.05 },
      {
        opacity: 0.75,
        scale: 1.18,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        overwrite: "auto",
      }
    )
    timelines.push(orbSpin, orbPulse, glowPulse)

    // Pause timelines when off-screen and when tab hidden — less “flappy”
    const target = rootRef.current
    if (target) {
      let lastInView = null
      const io = new IntersectionObserver(
        (entries) => {
          const inView = !!(entries[0] && entries[0].isIntersecting)
          if (inView !== lastInView) {
            lastInView = inView
            // rAF to coalesce rapid flips
            requestAnimationFrame(() => {
              timelines.forEach(tl => (inView ? tl.play() : tl.pause()))
            })
          }
        },
        { root: null, threshold: 0 } // more forgiving; fires once when it leaves/enters
      )
      io.observe(target)

      const vis = () => {
        const hidden = document.visibilityState !== "visible"
        timelines.forEach(tl => (hidden ? tl.pause() : tl.play()))
      }
      document.addEventListener("visibilitychange", vis)

      return () => {
        io.disconnect()
        document.removeEventListener("visibilitychange", vis)
      }
    }
  }, { scope: rootRef })

  return (
    <section ref={rootRef} className="relative h-screen overflow-hidden bg-black text-white font-luck">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/media/hyper.mp4"
        poster="/art/poster.png"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disableRemotePlayback
      />

      <div className="absolute inset-0 bg-black/50" />

      {/* Navigation */}
      <header
        className={`fixed w-full z-20 flex items-center px-6 py-4 transition-colors duration-300
        ${scrolled ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <div className="flex-1 flex items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
              priority
            />
          </Link>
        </div>

        <div>
          <Navbar />
        </div>

        <div className="flex-1 flex items-center justify-end space-x-2">
          <CopyCAButton className="hidden lg:block" />
          <MobileModal />
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center mt-[8vh] pt-14 px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8vh] font-extrabold text-white drop-shadow-lg">
          <span ref={line1Ref} className="block stroke-text text-white will-change-transform">WELCOME TO THE</span>
          <span ref={line2Ref} className="block stroke-text text-white will-change-transform">DARK SIDE</span>
        </h1>
        <p ref={pRef} className="mt-6 text-lg md:text-xl 2xl:text-2xl font-bold tracking-wider will-change-transform">
          The darkest penguin on Abstract.
        </p>

        <div
          ref={islandRef}
          className="relative mt-[4vh] w-[clamp(400px,25vw,550px)] will-change-transform"
        >
          <a href="https://portal.abs.xyz/trade?buy=0x817c16910e27880f55ff2c57f206e458549d96e3">
            <Image
              src={penguIsland}
              alt="Penguin on Floating Island"
              width={400}
              height={400}
              className="cursor-pointer"
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
          </a>
        </div>
      </main>

      {/* Decorative images */}
      <Image
        ref={bigRef}
        src="/art/BigOne.png"
        alt="Big Pengu"
        className="hidden lg:block absolute left-0 bottom-[-5%] w-[clamp(25vw,30vw,45vw)] -translate-x-[5%] translate-y-[10%] will-change-transform"
        width={700}
        height={700}
        loading="lazy"
      />

      <Image
        ref={flyRef}
        src="/art/flyingdp.png"
        alt="Glowing Penguin"
        className="hidden md:block absolute bottom-[50%] right-[5%] 2xl:right-[8%] w-[clamp(100px,10vw,250px)] -translate-y-1/2 will-change-transform"
        width={300}
        height={300}
        loading="lazy"
      />

      <div
        ref={orbRef}
        className="hidden md:block absolute bottom-[22%] right-[8%] 2xl:right-[13%] w-[clamp(100px,14vw,300px)] will-change-transform"
        style={{ transformOrigin: "50% 50%" }}
      >
        <div
          ref={glowRef}
          className="absolute inset-0 w-[90%] h-[90%] translate-x-[5%] translate-y-[3%] rounded-full bg-[#8a8a8a] pointer-events-none"
          style={{ mixBlendMode: "screen" }}
        />
        <Image
          src="/art/dpball_new.png"
          alt="Energy orb"
          width={300}
          height={300}
          className="pointer-events-none"
          priority  // eager load to avoid visible stall
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 w-full h-[60vh] md:hidden">
        <Image
          src="/bgs/rocks_small.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          style={{ objectFit: 'cover', objectPosition: '50% 80%', imageRendering: 'auto' }}
        />
      </div>

      {/* DESKTOP (≥ md) */}
      <div className="hidden md:block absolute inset-x-0 bottom-0 w-full h-[50vh]">
        <Image
          src="/bgs/rocks.png"
          alt=""
          fill
          sizes="100vw"
          quality={85}
          style={{ objectFit: 'cover', objectPosition: '35% 80%', imageRendering: 'auto' }}
        />
      </div>
    </section>
  )
}
