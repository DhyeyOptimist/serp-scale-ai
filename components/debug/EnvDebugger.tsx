'use client'

import { useEffect } from 'react'

export default function EnvDebugger() {
  useEffect(() => {
    // Store partial environment info in window for debugging
    // Only storing first few chars of the key for security
    if (typeof window !== 'undefined') {
      // Supabase info
      (window as any).ENV_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'
      
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (anonKey) {
        (window as any).ENV_SUPABASE_KEY_START = anonKey.substring(0, 10) + '...'
      } else {
        (window as any).ENV_SUPABASE_KEY_START = 'Not set'
      }
      
      // Authentication info (safely check existence only, not values)
      (window as any).ENV_AUTH_CONFIG = {
        hasUsername: !!process.env.ADMIN_USERNAME,
        hasPassword: !!process.env.ADMIN_PASSWORD,
        hasSecretKey: !!process.env.SECRET_COOKIE_PASSWORD,
        secretKeyLength: process.env.SECRET_COOKIE_PASSWORD?.length || 0
      }
      
      console.log('Environment variables detected (client):', {
        supabase: {
          url: (window as any).ENV_SUPABASE_URL,
          keyStart: (window as any).ENV_SUPABASE_KEY_START
        },
        auth: (window as any).ENV_AUTH_CONFIG
      })
    }
  }, [])

  return null
}
