'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signIn(formData: FormData) {
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
    return { error: 'Invalid credentials' }
  }

  // Revalidate the admin path and redirect to dashboard
  revalidatePath('/admin')
  redirect('/admin/dashboard')
}
