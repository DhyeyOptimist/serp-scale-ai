'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import './config' // Import the edge runtime configuration

export async function signIn(formData: FormData) {
  try {
    const supabase = createClient()

    // Get form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate input
    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    // Attempt to sign in
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message)
      return { error: 'Invalid credentials' }
    }

    // Revalidate the admin path and redirect to dashboard
    revalidatePath('/admin')
    redirect('/admin/dashboard')
  } catch (err) {
    console.error('Unexpected error during login:', err)
    return { error: 'An unexpected error occurred' }
  }
}
