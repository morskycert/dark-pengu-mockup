'use client'
import Navbar from "./Navbar"
import CopyCAButton from "./CAButton";
import Image from 'next/image';
import MobileModal from "./MobileModal";

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { MotionPathPlugin } from  'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin)

export default function HeroSection() {
   const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const orbRef  = useRef(null)
  const glowRef = useRef(null)
  const islandRef = useRef(null)
  const bigRef = useRef(null)   
  const flyRef = useRef(null)
  const line1Ref  = useRef(null)
  const line2Ref  = useRef(null)
  const pRef  = useRef(null)
    

    useGSAP(() => {
      const tl = gsap.timeline()
      tl.from(line1Ref.current, {
          y: window.innerHeight * 0.2,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        }, 0                // start immediately
      )
      .from(line2Ref.current, {
          y: window.innerHeight * 0.2,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        }, 0.2              // 0.3s after line1
      )
      .from(pRef.current, {
          y: window.innerHeight * 0.2,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        }, 0.3            // 0.6s after line1
      )  
        // Texts
      // ORB + GLOW TIMELINE
      const orbTl = gsap.timeline({ repeat: -1 })
      orbTl
        .to(orbRef.current, { rotation: 360, duration: 9, ease: 'none' }, 0)
        .fromTo(orbRef.current,
                { scale: 0.95 },
                { scale: 1.05, duration: 1.5, yoyo: true, repeat: 3, ease: 'sine.inOut' },
                0
        )
        .fromTo(glowRef.current,
                { scale: 1.1, opacity: 0.4, filter: 'blur(8px)' },
                { scale: 1.2, opacity: 0.8, filter: 'blur(16px)', duration: 1.5, yoyo: true, repeat: 5, ease: 'power1.inOut' },
                0
        )
        .to(glowRef.current,
            { filter: 'blur(12px)', duration: 0.1, yoyo: true, repeat: 90, ease: 'rough({ strength: 2, points: 20, template: linear, randomize: true })' },
            0
        )

      // ISLAND TIMELINE
      // 1) Bounce in from below
      gsap.from(islandRef.current, {
        y: window.innerHeight * 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'circ.out'
      });

      // 2) Randomised float forever:
      gsap.to(islandRef.current, {
        y: () => gsap.utils.random(35, 50),    // ±30px vertical
        x: () => gsap.utils.random(-10,  10),    // ±10px horizontal
        rotation: () => gsap.utils.random(-2,   2),    // ±2° tilt
        scale: () => gsap.utils.random(1.00, 1.03),    // tiny scale shift
        ease: 'sine.inOut',
        duration: 2.2,          // faster bob
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,    // recalc random on each cycle
        delay: 1.2             // start after the bounce ends
      });

      // BIG PENGUIN: single slide-in from left
      gsap.from(bigRef.current, {
        x: -window.innerWidth * 0.8,    // start well off-screen to the left
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.6                      // after island bounce begins
      })

        // ensure we start from a clean transform slate
      gsap.set(flyRef.current, { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1 })

      // build a single timeline with staggered, overlapping tweens
      const flyTl = gsap.timeline({ repeat: -1 })

      // 1) gentle forward/back drift (along x)
      flyTl.to(flyRef.current, {
        x: '+=60',              // move right 60px then back
        duration: 6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat:  -1
      }, 0)

      // 2) up/down bob (along y)
      flyTl.to(flyRef.current, {
        y: '-=30',              // up 30px then down
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      }, 0)

      // 3) subtle banking tilt
      flyTl.to(flyRef.current, {
        rotation: '+=4',        // tilt +/-4deg
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      }, 0)

      // 4) quick wing-flap pulse (scale)
      flyTl.to(flyRef.current, {
        scaleY: 0.90,
        scaleX: 1.1,
        duration: 0.15,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.3       // flap about every 0.45s
      }, 0.2)                // start flapping a bit after drift begins
      }, )

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white font-luck">

       {/* 1. Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/media/hyper.mp4"          // <-- root-relative (from /public)
        poster="/art/poster.png" // <-- add a poster image in /public/media
        autoPlay
        loop
        muted
        playsInline
      />


      {/* 2. Overlay (optional: tint it darker) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Navigation */}
         <header className={`fixed w-full z-20 flex items-center px-6 py-4 transition-colors duration-300 
          ${scrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'}`}>

          {/* Left: Logo with equal flex basis */}
          <div className="flex-1 flex items-center ">
            <a href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </a>
          </div>

          {/* Center: Navbar, naturally centered as siblings flex-1 on sides */}
          <div>
            <Navbar />
          </div>

          {/* Right: Controls with equal flex basis */}
          <div className="flex-1 flex items-center justify-end space-x-2">
            <CopyCAButton className="hidden lg:block" />
            <MobileModal />
          </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-1 flex flex-col items-center justify-center text-center mt-[8vh] pt-14 px-4">
        <h1 className="text-6xl md:text-7xl lg:text-[8vh] font-extrabold text-white drop-shadow-lg">
          <span ref={line1Ref} className="block stroke-text text-white">WELCOME TO THE</span>
          <span ref={line2Ref} className="block stroke-text text-white">DARK SIDE</span>
        </h1>
        <p ref={pRef} className="mt-6  text-lg md:text-xl 2xl:text-2xl font-bold tracking-wider">The darkest penguin on Abstract.</p>

        {/* Penguin + Island Image */}
        {/* <div className="relative mt-[4vh]">
          <img src="/art/darkpengucc_sign.svg" 
          alt="Penguin on Floating Island" 
          className="w-[45vh] md:w-[45vh] lg:w-[40vh] z-99" />
        </div> */}

        <div
          ref={islandRef}
          className="relative mt-[4vh] w-[clamp(400px,25vw,550px)] "
        ><a href="https://dexscreener.com/abstract/0xa91de33390dcc7c2a2fd586dc3bc7155953e9d1e">
          <Image
            src="/art/darkpengucc_sign.svg"
            alt="Penguin on Floating Island"
            width={400}
            height={400}
            className="z-2 cursor-pointer"
            style={{ width: '100%', height: 'auto' }}
            
          />
          </a>
        </div>
      </main>

       {/* decorative SVGs */}
        <Image
        ref={bigRef}
        src="/art/BigOne.png"
        alt="Big Pengu"
        className="hidden lg:block absolute left-0 bottom-[-3%] w-[clamp(25vw,30vw,45vw)] -translate-x-[5%] translate-y-[10%]"
        width={700}
        height={700}
      />

      <Image
        ref={flyRef}
        src="/art/flyingdp.png"
        alt="Glowing Penguin"
        className="hidden md:block absolute bottom-[50%] right-[5%] 2xl:right-[8%] w-[clamp(100px,10vw,250px)] -translate-y-1/2"
        width={300}
        height={300}
        priority
      />


      <div
        ref={orbRef}
        className="hidden  md:block absolute  bottom-[22%] right-[8%] 2xl:right-[13%] w-[clamp(100px,14vw,300px)]"
        style={{ transformOrigin: '50% 50%' }}
        >
        {/* Glow layer */}
        <div
        ref={glowRef}
          className="absolute inset-0 w-[90%] h-[90%] translate-x-[5%] z-[-1] translate-y-[3%] rounded-full bg-[#616161] pointer-events-none"
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Your 2D orb SVG */}
        <Image
          src="/art/dpball_new.svg"
          alt="Energy orb"
          width={300}
          height={300}
          className="pointer-events-none"
          
        />
      </div>
       <div
        className="
          absolute         /* take out of the flow and position against the parent */
          inset-x-0        /* left:0; right:0 for full-width */
          bottom-0         /* stick to the parent’s bottom */
          w-full
          h-[70vh] sm:h-[60vh] md:h-[50vh] lg:h-[50vh]
        "
      >
        <Image
          src="/bgs/rocks.png"
          alt=""                // decorative
          fill                  // makes it position:absolute; width/height:100%
          style={{
            objectFit: 'cover',
            objectPosition: '35% 80%',
          }}
          priority
          sizes="100vw"
        />
      </div>
      {/* <div className="absolute inset-x-0 bottom-0 w-full h-[60vh] md:hidden">
        <Image
        src="/bgs/rocks_small.png"  // taller/tighter crop
        alt=""
        fill
        sizes="100vw"
        quality={90}
        style={{ objectFit: 'cover', objectPosition: '50% 80%', imageRendering: 'auto' }}
        />
        </div>

        <div className="hidden md:block absolute inset-x-0 bottom-0 w-full h-[50vh]">
            <Image
            src="/bgs/rocks.png" // wide crop
            alt=""
            fill
            sizes="100vw"
            quality={85}
            style={{ objectFit: 'cover', objectPosition: '35% 80%', imageRendering: 'auto' }}
            />
        </div> */}
    </section>
  );
}