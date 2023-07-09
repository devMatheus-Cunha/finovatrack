/* eslint-disable jsx-a11y/anchor-is-valid */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '..'

export default function Header() {
  const router = useRouter()
  return (
    <nav className="bg-white border-gray-200 bg-gray-800">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
        <h1 className="text-2xl font-bold">FinovaTrack</h1>
        <div className="flex items-center md:order-2 gap-7">
          <Button type="button" variant="link" routeLink="/login">
            Login
          </Button>
          <Button onClick={() => router.push('/signup')} variant="primary">
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  )
}
