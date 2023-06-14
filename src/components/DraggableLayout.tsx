import { ReactNode, useEffect, useRef, useState } from 'react'
import useDraggableLayout from '../hooks/useDraggableLayout'
import GraphSettings from './GraphSettings'

type Props = {
  children: ReactNode
}

const DraggableLayout = ({ children }: Props) => {
  const { x, y } = useDraggableLayout()

  return (
    <main className='w-screen h-screen cursor-all-scroll overflow-visible relative'>
      <div
        style={{
          translate: `${x}px ${y}px`,
        }}
      >
        {children}
      </div>
      <div
        style={{
          backgroundPosition: `${x}px ${y}px`,
        }}
        className='background absolute top-0 left-0 w-screen h-screen opacity-30'
      />
      <GraphSettings />
    </main>
  )
}

export default DraggableLayout
