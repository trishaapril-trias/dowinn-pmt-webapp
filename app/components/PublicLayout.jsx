// app/components/PublicLayout.jsx
import { redirect } from 'next/navigation'
import { getLoggedIn } from '@/context/auth' // adjust this import path based on where your getLoggedIn function is

export default async function PublicLayout({ children }) {
  const isLoggedIn = await getLoggedIn()
  
  if (isLoggedIn) {
    redirect('/project')
  }

  return <>{children}</>
}