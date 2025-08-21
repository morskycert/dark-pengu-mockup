// "use client" directive enables client-side rendering for this component in Next.js
'use client'

// React hook for local component state
import { useState } from 'react'
// Next.js optimized Image component
import Image from 'next/image'
// FAQ data imported from a constants file
import { faqQuestions } from './constants'

const bp = process.env.NEXT_PUBLIC_BASE_PATH || ''
// images imports
import Chevron from "@/public/art/chevron.svg"

// FAQ component displaying a list of questions that can be toggled open/closed
export default function FAQ() {
  // Initialize an array of booleans for each FAQ question (all closed by default)
  const [openStates, setOpenStates] = useState(
    () => faqQuestions.map(() => false)
  )

  // Toggle open/closed state for question at given index
  const toggle = (index) => {
    setOpenStates((prev) => {
      // Copy previous state array and flip the boolean at the specific index
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  return (
    // Main FAQ section with background image and layout styling
    <section
      id="faq"
      className="
        relative flex flex-col items-center justify-center
        select-none
        min-h-[90vh]
        px-8 sm:px-10 lg:px-8
        py-12 sm:py-16
        bg-cover bg-center
        overflow-y-auto
      "
      style={{ backgroundImage: `url(${bp}/art/bg-dark-pengu.jpg)` }}
    >
      {/* Overlay to darken background image */}
      <div className="absolute inset-0 bg-black/85 pointer-events-none" />

      {/* Container for FAQ content, stacked with spacing */}
      <div className="relative z-10 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[100vh] space-y-6">
        {/* FAQ title */}
        <h1 className="
          font-luck text-white uppercase
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[6vh]
          text-center mb-12
        ">
          Frequently Asked Questions
        </h1>

        {/* Iterate over each FAQ question/answer pair */}
        {faqQuestions.map(({ question, answer }, i) => {
          // Determine if this question is currently open
          const isOpen = openStates[i]
          return (
            <div
              key={i}
              className="
                w-full
                bg-[linear-gradient(180deg,rgba(96,165,250,0.55)_0%,rgba(40,47,182,0.35)_100%)]
                border-2                
                border-blue-400/30                                         
                 shadow-[0_0_0_1px_rgba(147,197,253,0.18),0_18px_60px_rgba(37,99,235,0.25)] 
                rounded-xl  overflow-hidden
              "
            >
              {/* Button to toggle visibility of the answer */}
              <button
                onClick={() => toggle(i)}
                className="
                  w-full flex justify-between items-center
                  px-4 sm:px-6 lg:px-8   cursor-pointer   /* responsive padding */
                  py-3 sm:py-5 lg:py-6
                "
              >
                {/* Question text */}
                <span className="
                  text-white font-fredok font-extrabold
                  text-shadow-
                  text-sm sm:text-base md:text-lg
                  uppercase tracking-wide
                ">
                  {question}
                </span>
                {/* Chevron icon rotates when open/closed */}
                <div className={`
                  bg-black/30 rounded-full p-2
                  transition-transform duration-200
                  ${isOpen ? 'rotate-180' : ''}
                `}>
                  <Image
                    src={Chevron}
                    alt="toggle chevron"
                    width={20}
                    height={20}
                  />
                </div>
              </button>

              {/* Answer container that expands/collapses with animation */}
              <div className={`
                overflow-hidden
                transition-all
                duration-400    
                ease-out
                px-4 sm:px-6 lg:px-8
                ${isOpen ? 'max-h-[200px] opacity-100 mt-2 pb-3 sm:pb-4 ' : 'max-h-0 opacity-0'}
              `}>
                {/* Answer text */}
                <p className="text-white font-medium  lg:text-lg md:text-base text-sm">
                  {answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
