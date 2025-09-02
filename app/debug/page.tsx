'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createClient } from '@supabase/supabase-js'

export default function SupabaseTest() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTest = async () => {
    setIsLoading(true)
    setStatus(null)
    setError(null)

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      
      // Output the values for debugging (first few characters only)
      console.log('Testing with:', {
        url: url,
        key: key ? `${key.substring(0, 10)}...` : 'Missing'
      })
      
      if (!url || !key) {
        setError('Environment variables are missing')
        return
      }

      // First try a direct fetch to test basic connectivity
      setStatus('Testing direct connectivity to Supabase...')
      try {
        const response = await fetch(`${url}/rest/v1/?apikey=${key}`)
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }
        setStatus('Direct fetch successful ✅')
      } catch (e) {
        setError(`Direct fetch failed: ${e instanceof Error ? e.message : String(e)}`)
        return
      }
      
      // Now try using the Supabase client
      setStatus('Creating Supabase client...')
      const supabase = createClient(url, key)
      
      // Try a simple query
      setStatus('Testing database query...')
      const { data, error: queryError } = await supabase
        .from('tools')
        .select('count(*)')
        .limit(1)
      
      if (queryError) {
        throw queryError
      }
      
      setStatus(`All tests passed ✅ - Connected to Supabase successfully!`)
      console.log('Test data:', data)
    } catch (e) {
      console.error('Test error:', e)
      setError(`Test failed: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Try to fetch Supabase URL directly without using environment variables
  const testDirectUrl = async () => {
    setIsLoading(true)
    setStatus(null)
    setError(null)
    
    try {
      const url = 'https://nxlyskmnvdvrcnsumdej.supabase.co'
      setStatus(`Testing direct connection to ${url}...`)
      
      const response = await fetch(`${url}/rest/v1/`)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      
      const text = await response.text()
      setStatus(`Direct connection successful ✅ - Response: ${text.substring(0, 50)}...`)
    } catch (e) {
      setError(`Direct connection failed: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md mt-10">
      <div>
        <h2 className="text-xl font-bold mb-2">Supabase Connection Test</h2>
        <p className="text-sm text-gray-500">
          This tests if your application can connect to Supabase
        </p>
      </div>

      <div className="space-y-4">
        <Button 
          className="w-full"
          onClick={runTest}
          disabled={isLoading}
        >
          {isLoading ? 'Testing...' : 'Test Supabase Connection'}
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
          onClick={testDirectUrl}
          disabled={isLoading}
        >
          Test Direct URL (no env vars)
        </Button>

        {status && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">{status}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Common issues:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Network connectivity problems</li>
          <li>CORS restrictions</li>
          <li>Incorrect Supabase URL or key</li>
          <li>Firewall or security settings</li>
        </ul>
      </div>
    </div>
  )
}
