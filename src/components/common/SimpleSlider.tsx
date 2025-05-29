import React from 'react'

interface SimpleSliderProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  itemsToShow?: number
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ children, className }) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={`w-full items-center flex ${className || ''}`}>
      <div
        className="flex overflow-x-auto no-scrollbar justify-around items-center"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {childrenArray.map((child, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 scroll-snap-align-start flex justify-center"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimpleSlider
