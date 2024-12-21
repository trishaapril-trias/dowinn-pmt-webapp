import { getLoggedIn } from '@/context/auth'
import { NextResponse } from 'next/server'

export async function GET(request) {  
  try {
    const isAuthenticated = await getLoggedIn()
    return NextResponse.json({ isAuthenticated })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ isAuthenticated: false }, { status: 500 })
  }
}