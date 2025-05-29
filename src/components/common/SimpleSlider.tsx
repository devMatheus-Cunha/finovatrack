import React, { useRef, useState, useEffect } from 'react'

interface SimpleSliderProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  itemsToShow?: number
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ children, className }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [itemsVisible, setItemsVisible] = useState(1)

  // Garante que children seja sempre um array
  const childrenArray = React.Children.toArray(children)

  // Atualiza a visibilidade das setas
  const updateArrows = () => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setShowLeft(scrollLeft > 0)
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  // Calcula quantos itens cabem na tela
  const updateItemsVisible = () => {
    if (!sliderRef.current) return
    const sliderWidth = sliderRef.current.offsetWidth
    // Pega o primeiro filho para calcular a largura
    const firstChild = sliderRef.current.querySelector('div') as HTMLDivElement
    if (firstChild) {
      const itemWidth = firstChild.offsetWidth
      setItemsVisible(Math.floor(sliderWidth / itemWidth))
    }
  }

  useEffect(() => {
    updateArrows()
    updateItemsVisible()
    const handleResize = () => {
      updateArrows()
      updateItemsVisible()
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Atualiza setas ao rolar
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    slider.addEventListener('scroll', updateArrows)
    return () => slider.removeEventListener('scroll', updateArrows)
  }, [])

  // Scroll suave com botões
  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const width = sliderRef.current.offsetWidth
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -width : width,
        behavior: 'smooth'
      })
    }
  }

  // Esconde setas se todos os itens estão visíveis
  const hideArrows = itemsVisible >= childrenArray.length

  return (
    <div
      className={`relative w-full flex flex-col items-center ${className || ''}`}
    >
      {!hideArrows && showLeft && (
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/90 hover:bg-gray-900 text-white rounded-full shadow p-1.5 transition disabled:opacity-30 w-8 h-8 flex items-center justify-center"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div
        ref={sliderRef}
        className="flex overflow-x-hidden no-scrollbar scroll-smooth gap-2 lg:gap-4 px-8 justify-between items-center w-full"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {childrenArray.map((child, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[33vw] lg:w-[300px] scroll-snap-align-start flex justify-center"
          >
            {child}
          </div>
        ))}
      </div>
      {!hideArrows && showRight && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/90 hover:bg-gray-900 text-white rounded-full shadow p-1.5 transition disabled:opacity-30 w-8 h-8 flex items-center justify-center"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SimpleSlider
