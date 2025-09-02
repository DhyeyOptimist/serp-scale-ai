'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import './config' // Import the edge runtime configuration
import type { FAQ, ToolInsert, ToolUpdate } from '@/models/Tool'

export async function signIn(formData: FormData) {
  try {
    const supabase = createClient()

    // Log environment variables for debugging (remove in production)
    console.log('Environment check:', {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not Set',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'
    })

    // Get form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate input
    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error.message, error.code)
      
      // Return more detailed error messages based on error code
      if (error.message.includes('Email not confirmed')) {
        return { error: 'Please verify your email address before logging in' }
      } else if (error.message.includes('Invalid login credentials')) {
        return { error: 'The email or password you entered is incorrect' }
      } else {
        return { error: `Authentication failed: ${error.message}` }
      }
    }

    // Successful login
    console.log('Login successful for:', email)

    // Revalidate the admin path and redirect to dashboard
    revalidatePath('/admin')
    redirect('/admin/dashboard')
  } catch (err) {
    console.error('Unexpected error during login:', err)
    return { error: 'An unexpected error occurred. Please try again later.' }
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

export async function deleteTool(formData: FormData) {
  try {
    const supabase = createClient()
    
    // Get the tool ID from the form data
    const id = parseInt(formData.get('id') as string, 10)
    
    if (isNaN(id) || id <= 0) {
      return { error: 'Invalid tool ID' }
    }
    
    // Delete the tool from the database
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting tool:', error)
      return { error: error.message }
    }
    
    // Revalidate the dashboard path to update the tools list
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (err) {
    console.error('Unexpected error deleting tool:', err)
    return { error: 'An unexpected error occurred' }
  }
}

export async function updateTool(formData: FormData) {
  try {
    const supabase = createClient()
    
    // Get the tool ID from the form data
    const id = parseInt(formData.get('id') as string, 10)
    
    if (isNaN(id) || id <= 0) {
      return { error: 'Invalid tool ID' }
    }
    
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
    const toolData: ToolUpdate = {
      id,
      name,
      short_description,
      website_url,
      is_featured,
    }
    
    // Add optional fields if they exist
    if (full_description !== null) toolData.full_description = full_description || undefined
    if (logo_url !== null) toolData.logo_url = logo_url || undefined
    if (rating !== null) toolData.rating = rating
    if (pricing_model !== null) toolData.pricing_model = pricing_model || undefined
    if (category !== null) toolData.category = category || undefined
    if (faqs !== null) toolData.faqs = faqs
    
    // Update the tool in the database
    const { data, error } = await supabase
      .from('tools')
      .update(toolData)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating tool:', error)
      return { error: error.message }
    }
    
    // Revalidate the necessary paths
    revalidatePath('/admin/dashboard')
    revalidatePath(`/admin/tools/${id}/edit`)
    
    // Redirect to the dashboard
    redirect('/admin/dashboard')
  } catch (err) {
    console.error('Unexpected error updating tool:', err)
    return { error: 'An unexpected error occurred' }
  }
}
