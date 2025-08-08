'use client'
import Image from 'next/image'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SortableItem({ id, src, width, height }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} className="gallery-item" {...attributes} {...listeners}>
      <Image
        src={src}
        alt={id}
        width={width}
        height={height}
        className="w-full h-full object-cover rounded-lg  hover-img-grow"
      />
    </div>
  )
}
