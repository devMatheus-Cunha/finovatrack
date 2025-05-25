import React, { useEffect, useRef, Fragment } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  isCentered?: boolean
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  isCentered = false
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)

    if (modalRef.current) {
      modalRef.current.focus()
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  }

  if (!isOpen) return null

  return (
    <Fragment>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div
          className={`flex min-h-full ${
            isCentered ? 'items-center' : 'items-start pt-16'
          } justify-center p-4 text-center`}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-lg bg-gray-700 text-left align-middle shadow-xl transition-all`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
            )}
            <div className="px-6 py-4">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Modal
