'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import swirl from "@/public/art/swirl.jpeg"
import Dpengu from "@/public/art/DPENGU.png"
import DP3 from "@/public/art/DP3.png"
import DP1 from "@/public/art/D1.png"
import DP2 from "@/public/art/DP2.png"


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
    /** Background, title, card animation same as before */
    const introTrigger = {
      trigger: sectionRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }

    gsap.to(bgFadeRef.current, { 
      scrollTrigger: introTrigger, 
      opacity: 1, 
      duration: 1.1, 
      ease: 'power2.out' 
    })

    gsap.from(titleRef.current, { 
      scrollTrigger: introTrigger,
      y: -20, 
      autoAlpha: 0, 
      duration: 0.9, 
      ease: 'power2.out' 
    })

    gsap.from(cardRef.current, { 
      scrollTrigger: introTrigger,
      y: 26, 
      duration: 1.0, 
      ease: 'power2.out', 
      delay: 0.1 
    })

    /** Main Pengu start only when he's in view */
    gsap.from(penguRef.current, {
      y: 110,
      autoAlpha: 0,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: penguRef.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse',
      },
    })

    /** Side characters reveal */
    const stack = chars.current.filter(Boolean)
    if (stack.length) {
      gsap.from(stack, {
        y: 100,
        autoAlpha: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      /** Parallax: start when section bottom nears top of viewport */
      stack.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 0 },         // start in place
          { 
            y: 250,         // move down until gone
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'bottom 95%',  // start when leaving section
              end: 'bottom top',       // finish after section fully left
              scrub: true,
            }
          }
        )
      })
    }
  }, sectionRef)

    return () => ctx.revert()
  }, [])

  const setCharRef = (el, i) => (chars.current[i] = el || chars.current[i])

  return (
    <section id="about" className="relative border-t-2 border-t-[#171717] min-h-screen w-full overflow-hidden bg-[#050607] text-white font-fredok">
      {/* ===== BACKGROUND ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image src={swirl} alt="" fill priority className="object-cover" />

        {/* Darker overlay + vignette (fades in) */}
        <div
      
          className="absolute inset-0 "
          style={{
            background:
              // heavy dark vignette similar to your screenshot
              'radial-gradient(120% 90% at 50% 8%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.82) 55%, rgba(0,0,0,0.93) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* ===== CONTENT ===== */}
      <section
        ref={sectionRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 pb-52 sm:pb-62 pt-24 md:pb-76 md:pt-32 lg:pb-72 xl:lg:pb-62"
      >
        {/* TITLE — reverted to your original look */}
        <header ref={titleRef} className="text-center">
          <h1 className="font-luck select-none text-6xl font-extrabold uppercase leading-[0.9] tracking-wide drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]
            lg:text-7xl  2xl:text-[10vh]">
            <span className="[text-shadow:2px_2px_0_#000,4px_4px_0_#000]">The Story of</span>
            <br />
            <span className="inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent [text-shadow:0_4px_0_#181818,2px_3px_0_#181818,0_9px_1px_#282FB6]">
              Dark Pengu
            </span>
          </h1>
        </header>

        {/* BLUR GLASS CARD */}
        <div ref={cardRef} className="relative text-justify mt-[10vh] w-[90%] mx-auto max-w-xl 2xl:max-w-3xl ">
          <div
            aria-hidden
            className="absolute -inset-[3px] rounded-[28px] opacity-70 blur-md"
            style={{
              background:
                'linear-gradient(180deg, rgba(96,165,250,0.55) 0%, rgba(40, 47, 182, 0.35) 100%)',
            }}
          />
          <article className="relative rounded-[28px] border border-blue-400/30 bg-white/5 p-5 md:p-7 lg:p-8 backdrop-blur-xl 
          shadow-[0_0_0_1px_rgba(147,197,253,0.18),0_18px_60px_rgba(37,99,235,0.25)] text-[clamp(1.1rem,1.4vw,1.4rem)] xl:text-[clamp(1.2rem,1.3vw,1.8rem)] leading-relaxed">
            <p>
              In the quiet corners of Abstract Chain’s liquidity pools, there lies an unspoken presence—Dark Pengu. A silhouette
              born from the shadows of the popular Pengu, older than light, darker than memory, he embodies his dark side.
            </p>
            <p className="mt-4">
              Dark Pengu is the shadowy counterpart to Pengu – sly, sharp, and always one step ahead. Better. Faster. Darker.
              Rarely seen but always felt, he shows up when it matters most.
            </p>
            <p className="mt-4">
              His movements are unpredictable: sharp entries, dank memes, and stealth charm. You don’t find Dark Pengu — he finds
              you.
            </p>
          </article>
        </div>

        {/* MAIN CHARACTER — bigger + lower */}
        <div className="relative mt-16 w-full">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(60% 48% at 50% 68%, rgba(40, 47, 182,0.38) 0%, rgba(0,0,0,0) 64%)',
            }}
          />
          <div
            ref={penguRef}
            className="mx-auto aspect-[5/4] w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[720px] 2xl:max-w-[860px] translate-y-6 md:translate-y-10"
          >
            <Image
              src={Dpengu}
              alt="Dark Pengu"
              width={1400}
              height={1400}
              className="h-full w-full object-contain drop-shadow-[0_36px_90px_rgba(40,47,182,0.5)]"
            />
          </div>
        </div>
      </section>

      {/* ===== FOREGROUND SIDE CHARACTERS ===== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 select-none">
        {/* Left stack */}
        <div
          ref={(el) => setCharRef(el, 0)}
          className="absolute left-1 bottom-0 sm:left-4 md:left-5 xl:left-8 h-[min(27vh,290px)] w-[min(46vw,450px)] 2xl:w-[clamp(500px,28vw,700px)]"
        >
          <div className="absolute bottom-0 left-0 w-[82%]">
            <Image
              src={DP3}
              alt="Ninja Pengu"
              width={520}
              height={520}
              className="h-auto w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)]"
            />
          </div>
          <div className="absolute bottom-0 left-[65%] w-[68%] 2xl:w-[clamp(250px,20vw,450px)]">
            <Image src={DP1} alt="Glasses Pengu" width={440} height={440} className="h-auto w-full object-contain" />
          </div>
        </div>

        {/* Right dog */}
        <div
          ref={(el) => setCharRef(el, 1)}
          className="absolute right-1 bottom-0 sm:right-0 md:right-2 xl:right-10 h-[min(26vh,280px)] w-[min(48vw,400px)] 2xl:w-[clamp(450px,24vw,720px)]"
        >
          <div className="absolute bottom-0 right-0 w-[76%]">
            <Image src={DP2} alt="Companion dog" width={560} height={560} className="h-auto w-full object-contain" />
          </div>
        </div>
      </div>

      {/* Safe space so bottom characters don’t overlap footer */}
    </section>
  )
}
