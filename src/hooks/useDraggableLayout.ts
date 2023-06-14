import { useEffect, useState } from 'react'

const useDraggableLayout = () => {
  const [translatePosition, setTranslatePosition] = useState(() => ({
    x: 0,
    y: 0,
  }))

  useEffect(() => {
    let prevX = 0,
      prevY = 0

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault()
      }
      const startPositionX = e.clientX - prevX
      const startPositionY = e.clientY - prevY

      const onMouseMove = (e: MouseEvent) => {
        const currentPositionX = e.clientX
        const currentPositionY = e.clientY

        const differenceX = currentPositionX - startPositionX
        const differenceY = currentPositionY - startPositionY

        prevX = differenceX
        prevY = differenceY
        setTranslatePosition({
          x: differenceX,
          y: differenceY,
        })
      }
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousedown', onMouseDown)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [])

  return translatePosition
}

export default useDraggableLayout
