'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function PublicAuthDebugPage() {
  const [authStatus, setAuthStatus] = useState<any>({
    loading: true,
    session: null,
    error: null,
    cookies: []
  })
  
  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch('/admin/api/debug-auth')
        const data = await response.json()
        setAuthStatus({
          loading: false,
          session: data.session,
          error: null,
          cookies: data.cookies || []
        })
      } catch (err) {
        console.error('Error checking auth status:', err)
        setAuthStatus({
          loading: false,
          session: null,
          error: 'Failed to check authentication status',
          cookies: []
        })
      }
    }
    
    checkAuthStatus()
  }, [])
  
  const resetSession = async () => {
    try {
      // Clear cookies by setting them to expire
      document.cookie = "serp-scale-ai-admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      // Force reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };
  
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Authentication Debug (Public)</h1>
        <p className="text-muted-foreground">
          This page helps diagnose authentication issues without requiring authentication
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Authentication Status</CardTitle>
          <CardDescription>
            Current session information and cookie details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {authStatus.loading ? (
            <p>Loading authentication status...</p>
          ) : authStatus.error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {authStatus.error}
            </div>
          ) : (
            <>
              <div>
                <h3 className="font-medium mb-2">Session Information:</h3>
                <pre className="bg-muted p-4 rounded-md overflow-auto">
                  {JSON.stringify(authStatus.session, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Cookie Information:</h3>
                <pre className="bg-muted p-4 rounded-md overflow-auto">
                  {JSON.stringify(authStatus.cookies, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Environment Variables Status:</h3>
                <ul className="space-y-2">
                  <li>ADMIN_USERNAME: {authStatus.session?.envVars?.hasUsername ? '✅ Set' : '❌ Not set'}</li>
                  <li>ADMIN_PASSWORD: {authStatus.session?.envVars?.hasPassword ? '✅ Set' : '❌ Not set'}</li>
                  <li>SECRET_COOKIE_PASSWORD: {authStatus.session?.envVars?.hasSecret ? '✅ Set' : '❌ Not set'}</li>
                  <li>SECRET_COOKIE_PASSWORD Length: {authStatus.session?.envVars?.secretLength || 0} characters 
                    {(authStatus.session?.envVars?.secretLength || 0) < 32 && ' (needs at least 32)'}
                  </li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button onClick={() => window.location.reload()}>
            Refresh Status
          </Button>
          
          <Button variant="outline" onClick={resetSession}>
            Reset Session Cookies
          </Button>
          
          <Button variant="outline" asChild>
            <a href="/admin/login">Go to Login Page</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
