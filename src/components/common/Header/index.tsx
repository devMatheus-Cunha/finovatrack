'use client'

import { useRouter } from 'next/navigation'
import Logo from '../Logo'
import Button from '../Buttons/Button'

export default function Header() {
  const router = useRouter()

  return (
    <nav className="flex bg-gray-700 px-4 py-2 md:py-4 items-center justify-between w-full">
      <Logo />

      <div className="flex gap-7">
        <Button variant="link" routeLink="/">
          Login
        </Button>
        <Button onClick={() => router.push('/signup')}>Sign up</Button>
      </div>
    </nav>
  )
}
