// "use client" directive ensures this component is rendered on the client-side in Next.js
'use client'

// React hooks and utilities
import { useState, useRef } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// GSAP animation library and plugins
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

// Register GSAP plugins for scroll-triggered and text-splitting animations
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// DnD-kit drag-and-drop utilities for sortable lists
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

// Dynamically import the SortableItem component to avoid SSR issues
const SortableItem = dynamic(() => import('./SortableItem'), {
  ssr: false,
  loading: () => <p className="text-center py-4">Loading tiles…</p>,
})

// Array of image data used to populate the gallery
const allImages = [
  { id: '1', src: '/art/gallery/1.jpg', width: 1200, height: 600 },
  { id: '2', src: '/art/gallery/2.jpg', width: 600, height: 400 },
  { id: '3', src: '/art/gallery/3.jpg', width: 600, height: 400 },
  { id: '4', src: '/art/gallery/4.jpg', width: 400, height: 300 },
  { id: '5', src: '/art/gallery/5.jpg', width: 400, height: 300 },
  { id: '6', src: '/art/gallery/6.jpg', width: 400, height: 300 },
  { id: '7', src: '/art/gallery/7.jpg', width: 600, height: 400 },
  { id: '8', src: '/art/gallery/8.jpg', width: 600, height: 400 },
]

// Destructure first image and the rest for separate styling/layout
const [firstImage, ...initialRest] = allImages

// Main Gallery component
export default function Gallery() {
  // State to manage the order of the remaining images
  const [rest, setRest] = useState(initialRest)
  // Ref to the gallery section for scroll-triggered animations
  const sectionRef = useRef(null)

  // useGSAP hook to initialize animations when component mounts
  useGSAP(
    () => {
      // Split the title text into individual characters for staggered animation
      const split = new SplitText('#gallery-title', { type: 'chars' })

      // Create a GSAP timeline tied to scroll position of sectionRef
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%', // animation starts when top of section hits 75% of viewport
          end: 'bottom top',
        },
      })

      // Animate title characters in with opacity and y-offset
      tl.from(split.chars, {
        opacity: 0,
        y: 60,
        ease: 'back.out(1.7)',
        duration: 0.6,
        stagger: 0.04,
      })
        // Animate main image fade-in and slight scale
        .from('#gallery-img', {
          opacity: 0,
          scale: 0.95,
          y: 30,
          ease: 'power2.out',
          duration: 0.4,
        }, '-=0.4') // start this animation 0.4s before the previous ends
        // Animate the grid container fade-in
        .from('#gallery-div', {
          opacity: 0,
          y: 40,
          ease: 'power2.out',
          duration: 0.4,
        }, '-=0.4')

      // ScrollTrigger callbacks to control playback and reversal
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom top',
        onEnter: () => { tl.timeScale(1); tl.play() },
        onLeaveBack: () => { tl.timeScale(3); tl.reverse() },
      })
    },
    { scope: sectionRef }
  )

  // Setup drag sensor to require minimal pointer distance before activating drag
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  // Handler to reorder 'rest' state when drag ends
  function handleDragEnd({ active, over }) {
    // If dropped outside a valid target or in same position, do nothing
    if (!over || active.id === over.id) return

    // Update state by moving the dragged item to new index
    setRest(items => {
      const oldIndex = items.findIndex(i => i.id === active.id)
      const newIndex = items.findIndex(i => i.id === over.id)
      return arrayMove(items, oldIndex, newIndex)
    })
  }

  // Render gallery section
  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-[#000000] flex flex-col justify-center items-center select-none pt-20 pb-24 px-12"
    >
      {/* Gallery title */}
      <h1
        id="gallery-title"
        className="font-luck text-center text-5xl lg:text-[7vh] mb-16 text-white"
      >
        GALLERY
      </h1>

      {/* Featured first image */}
      <div
        id="gallery-img"
        className="gallery-item select-none cursor-default max-w-3xl lg:max-w-[100vh] mb-2"
      >
        <Image
          src={firstImage.src}
          alt={firstImage.id}
          width={firstImage.width}
          height={firstImage.height}
          className="w-full h-auto object-cover rounded-lg cursor-grab"
        />
      </div>

      {/* Grid of sortable thumbnail images */}
      <div id="gallery-div" className="mt-6 max-w-3xl lg:max-w-[100vh] mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={rest.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {/* First row: two images */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {rest.slice(0, 2).map(img => (
                <SortableItem key={img.id} {...img} />
              ))}
            </div>

            {/* Second row: three images */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {rest.slice(2, 5).map(img => (
                <SortableItem key={img.id} {...img} />
              ))}
            </div>

            {/* Third row: remaining images */}
            <div className="grid grid-cols-2 gap-4">
              {rest.slice(5).map(img => (
                <SortableItem key={img.id} {...img} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </section>
  )
}
