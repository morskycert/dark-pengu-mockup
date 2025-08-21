'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DarkPenguPage() {
  const sectionRef = useRef(null)
  const bgFadeRef = useRef(null)
  const titleRef = useRef(null)
  const cardRef = useRef(null)
  const penguRef = useRef(null)
  const chars = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }

      // Orchestrated entrance once user reaches the About section
      const tl = gsap.timeline({ scrollTrigger: trigger })
      tl.to(bgFadeRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' })
        .from(titleRef.current, { y: -20, autoAlpha: 0, duration: 0.9, ease: 'power2.out' }, 0.1)
        .from(cardRef.current, { y: 24, autoAlpha: 0, duration: 1, ease: 'power2.out' }, 0.3)
        .from(penguRef.current, { y: 80, autoAlpha: 0, duration: 1, ease: 'power2.out' }, 0.6)

      // Side characters reveal after the main beats
      const stack = chars.current.filter(Boolean)
      if (stack.length) {
        gsap.from(stack, {
          scrollTrigger: trigger,
          autoAlpha: 0,
          y: 50,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 1.0,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const setCharRef = (el, i) => (chars.current[i] = el)

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050607] text-white font-fredoka">
      {/* BACKGROUND LAYERS */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Swirl background */}
        <Image
          src="/art/swirl.jpeg"
          alt="swirling dark abstract background"
          fill
          priority
          className="object-cover opacity-1"
        />
        {/* Subtle top vignette that ends high (keeps background visible). Fades in via GSAP once in view. */}
        <div
          ref={bgFadeRef}
          className="absolute inset-0 opacity-1 bg-[linear-gradient(to_bottom,rgba(0,0,0,)_%,rgba(0,0,0,0)_100%)]"
        />
      </div>

      {/* CONTENT WRAPPER */}
      <section ref={sectionRef} className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-start gap-8 px-4 pb-40 pt-32 md:pt-40 lg:pb-44">
        {/* TITLE */}
        <header ref={titleRef} className="text-center">
          <h1 className="font-luck select-none text-4xl font-extrabold uppercase leading-[0.9] tracking-wide drop-shadow-[0_2px_0_rgba(0,0,0,0.6)] md:text-6xl lg:text-7xl">
            <span className="[text-shadow:2px_2px_0_#000,4px_4px_0_#000]">The Story of</span>
            <br />
            <span className="inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent [text-shadow:0_4px_0_#000,0_6px_0_#000]">
              Dark Pengu
            </span>
          </h1>
        </header>

        {/* BLUR GLASS CARD */}
        <div className="relative w-full max-w-3xl" ref={cardRef}>
          <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-blue-500/50 to-blue-400/30 opacity-60 blur-md" aria-hidden />
          <article className="relative rounded-3xl border border-blue-400/30 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(147,197,253,0.2),0_20px_60px_rgba(30,64,175,0.25)] md:p-7 lg:p-8 text-[clamp(1rem,2.5vw,1.15rem)]">
            <p>
              In the quiet corners of Abstract Chain’s liquidity pools, there lies an unspoken presence—Dark Pengu. A silhouette born from the shadows of the popular Pengu, older than light, darker than memory, he embodies his dark side.
            </p>
            <p className="mt-4">
              Dark Pengu is the shadowy counterpart to Pengu – sly, sharp, and always one step ahead. Better. Faster. Darker. Rarely seen but always felt, he shows up when it matters most.
            </p>
            <p className="mt-4">
              His movements are unpredictable: sharp entries, dank memes, and stealth charm. You don’t find Dark Pengu — he finds you.
            </p>
          </article>
        </div>

        {/* MAIN CHARACTER */}
        <div className="relative mt-12 w-full max-w-3xl">
          {/* soft focus ring behind main only */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(147,197,253,0.28),rgba(0,0,0,0)_62%)]" aria-hidden />
          <div ref={penguRef} className="mx-auto aspect-[5/4] w-full max-w-[600px] sm:max-w-[660px] md:max-w-[720px]">
            <Image src="/art/DPENGU.svg" alt="Dark Pengu" width={1000} height={1000} className="h-full w-full object-contain drop-shadow-[0_26px_70px_rgba(59,130,246,0.6)]" />
          </div>
        </div>
      </section>

      {/* FOREGROUND SIDE CHARACTERS (stacked like the reference) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 select-none">
        {/* Left stacked pair */}
        <div ref={(el) => setCharRef(el, 0)} className="absolute left-2 bottom-0 sm:left-6 md:left-10 w-[min(44vw,420px)] h-[min(28vh,260px)]">
          <div className="absolute bottom-0 left-0 w-[64%]">
            <Image src="/art/DP3.png" alt="Ninja pengu" width={400} height={400} className="h-auto w-full object-contain" />
          </div>
          <div className="absolute bottom-1 left-[42%] w-[46%]">
            <Image src="/art/D1.png" alt="Glasses pengu" width={320} height={320} className="h-auto w-full object-contain" />
          </div>
        </div>
        {/* Right dog */}
        <div ref={(el) => setCharRef(el, 1)} className="absolute right-2 bottom-0 sm:right-6 md:right-10 w-[min(40vw,360px)] h-[min(26vh,260px)]">
          <div className="absolute bottom-0 right-0 w-[70%]">
            <Image src="/art/DP2.png" alt="Companion dog" width={420} height={420} className="h-auto w-full object-contain" />
          </div>
        </div>
      </div>

      {/* MOBILE SAFE SPACE */}
      <div className="h-24 sm:h-28 md:h-20" />
    </main>
  )
}
