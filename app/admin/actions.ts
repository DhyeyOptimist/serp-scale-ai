'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'
import './config' // Import the edge runtime configuration
import type { FAQ, ToolInsert, ToolUpdate } from '@/models/Tool'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { AdminSession, defaultSession, sessionOptions, validateAuthConfig } from '@/lib/session'

export async function signIn(formData: FormData) {
  try {
    // Validate the auth configuration
    if (!validateAuthConfig()) {
      return { error: 'Authentication configuration is incomplete. Please check server logs.' }
    }

    // Get form data
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate input
    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    // Compare with environment variables
    const validUsername = process.env.ADMIN_USERNAME
    const validPassword = process.env.ADMIN_PASSWORD

    // Check if credentials match
    if (email !== validUsername || password !== validPassword) {
      console.log(`Failed login attempt with email: ${email}`)
      return { error: 'Invalid username or password' }
    }

    // Get the session from the cookies
    const session = await getIronSession<AdminSession>(cookies(), sessionOptions)
    
    // Update the session
    session.isLoggedIn = true
    session.username = email
    await session.save()
    
    console.log('Login successful for:', email)

    // Revalidate the admin path and redirect to dashboard
    revalidatePath('/admin')
    redirect('/admin/dashboard')
  } catch (err) {
    console.error('Unexpected error during login:', err)
    return { error: 'An unexpected error occurred. Please try again later.' }
  }
}

export async function signOut() {
  try {
    // Get the session from the cookies
    const session = await getIronSession<AdminSession>(cookies(), sessionOptions)
    
    // Destroy the session
    session.destroy()
    
    // Redirect to the homepage
    redirect('/')
  } catch (err) {
    console.error('Unexpected error during logout:', err)
    redirect('/')
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
    const pricing_model = formData.get('pricing_model') as string || null
    const category = formData.get('category') as string || null
    const is_featured = formData.has('is_featured')
    const slug = formData.get('slug') as string || null
    const rating = formData.get('rating') ? parseFloat(formData.get('rating') as string) : null
    
    // Handle logo file upload if provided
    let logo_url = null
    const logoFile = formData.get('logo') as File
    
    if (logoFile && logoFile.size > 0) {
      const fileExt = logoFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `tool-logos/${fileName}`
      
      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('tool-logos')
        .upload(filePath, logoFile)
      
      if (uploadError) {
        console.error('Error uploading logo:', uploadError)
        return { error: `Failed to upload logo: ${uploadError.message}` }
      }
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase
        .storage
        .from('tool-logos')
        .getPublicUrl(filePath)
      
      logo_url = publicUrlData.publicUrl
    }
    
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
    if (!name || !short_description || !website_url || !slug) {
      return { error: 'Name, short description, website URL, and slug are required' }
    }
    
    // Prepare the tool data
    const toolData: ToolInsert = {
      name,
      short_description,
      website_url,
      is_featured,
      slug,
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

    // Get the tool to find its logo URL before deletion
    const { data: tool, error: fetchError } = await supabase
      .from('tools')
      .select('logo_url')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      console.error('Error fetching tool for deletion:', fetchError);
      return { error: fetchError.message };
    }
    
    // Delete the logo from storage if it exists
    if (tool?.logo_url) {
      try {
        // Extract the path from the URL
        const url = new URL(tool.logo_url);
        const pathSegments = url.pathname.split('/');
        const filePath = pathSegments[pathSegments.length - 2] + '/' + pathSegments[pathSegments.length - 1];
        
        // Delete the file from storage
        const { error: deleteStorageError } = await supabase
          .storage
          .from('tool-logos')
          .remove([filePath]);
          
        if (deleteStorageError) {
          console.error('Error deleting logo from storage:', deleteStorageError);
          // Continue with deletion even if storage deletion fails
        }
      } catch (storageErr) {
        console.error('Error processing logo URL for deletion:', storageErr);
        // Continue with deletion even if URL processing fails
      }
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

export async function updateTool(id: number, formData: FormData) {
  try {
    const supabase = createClient()
    
    if (isNaN(id) || id <= 0) {
      return { error: 'Invalid tool ID' }
    }
    
    // Extract form data
    const name = formData.get('name') as string
    const short_description = formData.get('short_description') as string
    const full_description = formData.get('full_description') as string || null
    const website_url = formData.get('website_url') as string
    const pricing_model = formData.get('pricing_model') as string || null
    const category = formData.get('category') as string || null
    const is_featured = formData.has('is_featured')
    const slug = formData.get('slug') as string || null
    const existing_logo_url = formData.get('existing_logo_url') as string || null
    const rating = formData.get('rating') ? parseFloat(formData.get('rating') as string) : null
    
    // Handle logo file upload if provided
    let logo_url = existing_logo_url
    const logoFile = formData.get('logo') as File
    
    if (logoFile && logoFile.size > 0) {
      const fileExt = logoFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `tool-logos/${fileName}`
      
      // Upload the file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('tool-logos')
        .upload(filePath, logoFile)
      
      if (uploadError) {
        console.error('Error uploading logo:', uploadError)
        return { error: `Failed to upload logo: ${uploadError.message}` }
      }
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase
        .storage
        .from('tool-logos')
        .getPublicUrl(filePath)
      
      logo_url = publicUrlData.publicUrl
      
      // Delete the old logo if it exists and we're replacing it
      if (existing_logo_url) {
        try {
          // Extract the path from the URL
          const url = new URL(existing_logo_url);
          const pathSegments = url.pathname.split('/');
          const oldFilePath = pathSegments[pathSegments.length - 2] + '/' + pathSegments[pathSegments.length - 1];
          
          // Delete the old file from storage
          await supabase
            .storage
            .from('tool-logos')
            .remove([oldFilePath]);
        } catch (storageErr) {
          console.error('Error deleting old logo:', storageErr);
          // Continue with update even if old logo deletion fails
        }
      }
    }
    
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
    if (!name || !short_description || !website_url || !slug) {
      return { error: 'Name, short description, website URL, and slug are required' }
    }
    
    // Prepare the tool data
    const toolData: ToolUpdate = {
      id,
      name,
      short_description,
      website_url,
      is_featured,
      slug,
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
