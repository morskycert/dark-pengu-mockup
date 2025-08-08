'use client'

import { useRef } from 'react'
import { steps } from './constants'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export default function HowToBuy() {
  const sectionRef = useRef(null)

 useGSAP(() => {
    const mm = gsap.matchMedia()

    // md and up: highlight current row (opacity 1), dim others (opacity ~0.4)
    mm.add('(min-width: 768px)', () => {
      const rows = gsap.utils.toArray('.how-to-buy-card')

      // base state: all rows dimmed
      gsap.set(rows, { opacity: 0.4, willChange: 'opacity' })

      // quick opacity setter for each row
      const fadeTos = rows.map(() => gsap.quickTo({}, 'dummy', { duration: 0 })) // placeholder to keep indexes aligned
      rows.forEach((row, i) => {
        fadeTos[i] = gsap.quickTo(row, 'opacity', { duration: 0.2 })
      })

      let active = null
      const setActive = (el) => {
        if (active === el) return
        rows.forEach((r, i) => fadeTos[i](r === el ? 1 : 0.4))
        active = el
      }

      rows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top center+=5%',
          end: 'bottom center-=5%',
          // Whichever trigger is active takes control and dims the rest
          onToggle: (self) => {
            if (self.isActive) setActive(row)
          },
          // Ensure smooth handoff when leaving in either direction
          onLeave: (self) => {
            if (self.direction > 0 && rows[index + 1]) setActive(rows[index + 1])
          },
          onLeaveBack: (self) => {
            if (self.direction < 0 && rows[index - 1]) setActive(rows[index - 1])
          },
        })
      })

      // Make sure the correct row is active on load/refresh
      ScrollTrigger.addEventListener('refreshInit', () => {
        active = null
      })
      ScrollTrigger.refresh()
    })

    return () => mm.revert()
  }, [])

  return (
    <section id='how-to-buy' ref={sectionRef} className="bg-black select-none text-white py-24 lg:pb-[15vh] px-8">
      <h2
        id="how-to-buy-title"
        className="font-luck text-center text-5xl lg:text-[7vh] mb-16"
      >
        How to Buy
      </h2>

      {/* ======= MD AND UP: ROW FLEX STYLE ======= */}
      <div className="hidden md:flex flex-col space-y-16 max-w-[85vw] mx-auto px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`how-to-buy-card flex rounded-0 overflow-hidden bg-transparent items-center justify-center gap-12 ${
              step.reverse ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <img
              alt={step.title}
              width={200}
              height={200}
              src={step.image}
              className="w-full max-w-sm md:rounded-lg lg:max-w-md object-fill shadow-lg"
            />
            <div className="p-0 max-w-xl lg:max-w-[30vw]">
              <h3 className="py-2 text-2xl sm:text-3xl lg:text-4xl font-luck mb-4">
                {step.title}
              </h3>
              <p className="text-xl md:text-xl lg:text-2xl text-gray-300">
                {step.description}
                {step.links?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-[#858AF0] underline mx-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                ))}
                {step.extra}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ======= SMALL DEVICES: GRID CARDS STYLE ======= */}
      <div 
        className="grid auto-rows-fr md:hidden gap-8 mx-auto px-4"
        
        >
            
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl flex flex-col sticky top-15 items-center overflow-hidden bg-[#343333] "
            style={{ zIndex: index + 1 }}
          > 
                <img
                alt={step.title}
                src={step.image}
                className="object-cover w-full h-auto"
                />
            
            <div className="p-4 justify-between ">
                <h3 className=" pb-3 text-2xl sm:text-3xl font-luck">{step.title}</h3>
                <p className="text-xl sm:text-2xl text-gray-300 ">
                {step.description}
                {step.links?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-[#858AF0] underline mx-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                ))}
                {step.extra}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
