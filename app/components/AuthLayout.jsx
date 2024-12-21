import { redirect } from 'next/navigation'
import { getLoggedIn } from '@/context/auth'

export default async function AuthLayout({ children }) {
  const isLoggedIn = await getLoggedIn()
  
  if (!isLoggedIn) {
    redirect('/login')
  }

  return <>{children}</>
}