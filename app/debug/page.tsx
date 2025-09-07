'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

export default function SupabaseTest() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const [authStatus, setAuthStatus] = useState<{
    hasUsername: boolean;
    hasPassword: boolean;
    hasSecretKey: boolean;
    secretKeyLength: number;
  }>({
    hasUsername: false,
    hasPassword: false,
    hasSecretKey: false,
    secretKeyLength: 0
  })

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

  // Check auth configuration on component mount
  useEffect(() => {
    // Check authentication config
    setAuthStatus({
      hasUsername: !!process.env.ADMIN_USERNAME,
      hasPassword: !!process.env.ADMIN_PASSWORD,
      hasSecretKey: !!process.env.SECRET_COOKIE_PASSWORD,
      secretKeyLength: process.env.SECRET_COOKIE_PASSWORD?.length || 0
    })
  }, [])
  
  const authConfigValid = authStatus.hasUsername && authStatus.hasPassword && 
                           authStatus.hasSecretKey && authStatus.secretKeyLength >= 32

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Diagnostics</h1>
        <p className="text-muted-foreground">
          This page helps identify configuration issues with your deployment
        </p>
      </div>

      {/* Authentication Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Authentication Configuration
            {authConfigValid ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
          </CardTitle>
          <CardDescription>
            Status of environment variables required for authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              ADMIN_USERNAME:
              <Badge variant={authStatus.hasUsername ? "default" : "destructive"}>
                {authStatus.hasUsername ? "Set" : "Missing"}
              </Badge>
            </li>
            <li className="flex justify-between">
              ADMIN_PASSWORD:
              <Badge variant={authStatus.hasPassword ? "default" : "destructive"}>
                {authStatus.hasPassword ? "Set" : "Missing"}
              </Badge>
            </li>
            <li className="flex justify-between">
              SECRET_COOKIE_PASSWORD:
              <Badge variant={authStatus.hasSecretKey ? "default" : "destructive"}>
                {authStatus.hasSecretKey ? "Set" : "Missing"}
              </Badge>
            </li>
            <li className="flex justify-between">
              SECRET_COOKIE_PASSWORD Length:
              <Badge variant={authStatus.secretKeyLength >= 32 ? "default" : "destructive"}>
                {authStatus.secretKeyLength} characters
                {authStatus.secretKeyLength < 32 && " (needs at least 32)"}
              </Badge>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            {authConfigValid
              ? "Authentication configuration is valid"
              : "Please fix the issues above in your environment variables"}
          </p>
        </CardFooter>
      </Card>
      
      {/* Supabase Connection Test Card */}
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>
            Test connectivity to your Supabase project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button 
                className="flex-1"
                onClick={runTest}
                disabled={isLoading}
              >
                {isLoading ? 'Testing...' : 'Test Supabase Connection'}
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1"
                onClick={testDirectUrl}
                disabled={isLoading}
              >
                Test Direct URL
              </Button>
            </div>

            {status && (
              <Alert variant="default" className="bg-primary/10 border-primary/20">
                <AlertDescription>{status}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Common issues:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Network connectivity problems</li>
              <li>CORS restrictions</li>
              <li>Incorrect Supabase URL or key</li>
              <li>Firewall or security settings</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex space-x-4">
        <Button asChild>
          <a href="/admin">Go to Admin Login</a>
        </Button>
        
        <Button variant="outline" asChild>
          <a href="/">Back to Homepage</a>
        </Button>
      </div>
    </div>
  )
}
