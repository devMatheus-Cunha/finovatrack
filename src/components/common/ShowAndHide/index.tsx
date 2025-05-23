'use client'

import { ReactNode } from 'react'

interface ShowAndHideProps {
  children: ReactNode
  displayLg?: 'initial' | 'none'
  displayBase?: 'initial' | 'none'
}

const ShowAndHide: React.FC<ShowAndHideProps> = ({
  children,
  displayLg = 'initial',
  displayBase = 'none'
}) => {
  const baseClass = displayBase === 'none' ? 'hidden' : 'block'
  const lgClass = displayLg === 'none' ? 'lg:hidden' : 'lg:block'
  return <div className={`${baseClass} ${lgClass}`}>{children}</div>
}

export default ShowAndHide
