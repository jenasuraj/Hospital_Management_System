import React from 'react'
import { Suspense } from 'react'
import LoginPage from '@/ui/LoginPage'

const LoginSuspenseWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="flex items-center justify-center min-h-screen text-white">
        <LoginPage/>
      </section>
    </Suspense>
  )
}

export default LoginSuspenseWrapper