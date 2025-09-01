'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import './config' // Import the edge runtime configuration
import type { FAQ, ToolInsert } from '@/models/Tool'

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

export async function createTool(formData: FormData) {
  try {
    const supabase = createClient()
    
    // Extract form data
    const name = formData.get('name') as string
    const short_description = formData.get('short_description') as string
    const full_description = formData.get('full_description') as string || null
    const website_url = formData.get('website_url') as string
    const logo_url = formData.get('logo_url') as string || null
    const rating = formData.get('rating') ? parseFloat(formData.get('rating') as string) : null
    const pricing_model = formData.get('pricing_model') as string || null
    const category = formData.get('category') as string || null
    const is_featured = formData.has('is_featured')
    
    // Parse FAQs JSON if provided
    let faqs: FAQ[] | null = null
    const faqsString = formData.get('faqs') as string
    if (faqsString && faqsString.trim()) {
      try {
        faqs = JSON.parse(faqsString)
        // Validate the structure
        if (!Array.isArray(faqs) || !faqs.every(item => typeof item === 'object' && 'q' in item && 'a' in item)) {
          return { error: 'FAQs must be an array of objects with "q" and "a" properties' }
        }
      } catch (e) {
        return { error: 'Invalid FAQs JSON format' }
      }
    }
    
    // Validate required fields
    if (!name || !short_description || !website_url) {
      return { error: 'Name, short description, and website URL are required' }
    }
    
    // Prepare the tool data
    const toolData: ToolInsert = {
      name,
      short_description,
      website_url,
      is_featured,
    }
    
    // Add optional fields if they exist
    if (full_description) toolData.full_description = full_description
    if (logo_url) toolData.logo_url = logo_url
    if (rating !== null) toolData.rating = rating
    if (pricing_model) toolData.pricing_model = pricing_model
    if (category) toolData.category = category
    if (faqs) toolData.faqs = faqs
    
    // Insert the tool into the database
    const { data, error } = await supabase
      .from('tools')
      .insert(toolData)
      .select()
    
    if (error) {
      console.error('Error inserting tool:', error)
      return { error: error.message }
    }
    
    // Revalidate the dashboard path to update the tools list
    revalidatePath('/admin/dashboard')
    redirect('/admin/dashboard')
  } catch (err) {
    console.error('Unexpected error creating tool:', err)
    return { error: 'An unexpected error occurred' }
  }
}
