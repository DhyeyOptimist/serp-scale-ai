'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import EnvDebugger from '@/components/debug/EnvDebugger'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    
    try {
      // Log environment variables status (partial key for security)
      const supabaseUrl = (window as any).ENV_SUPABASE_URL || "Not found in window";
      const supabaseKeyStart = (window as any).ENV_SUPABASE_KEY_START || "Not found in window";
      
      console.log("Environment check (client-side):", { 
        url: supabaseUrl,
        keyStart: supabaseKeyStart,
        email: email
      });
      
      // Attempt signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      })
      
      if (error) {
        console.error('Signup error details:', { 
          message: error.message, 
          code: error.code,
          status: error.status,
          name: error.name
        })
        setError(error.message)
      } else {
        console.log('Signup response:', {
          user: data.user ? `ID: ${data.user.id}` : 'No user',
          session: data.session ? 'Session created' : 'No session', 
        })
        
        if (data.session) {
          setSuccess('Account created and you are logged in! Redirecting...')
          setTimeout(() => router.push('/admin'), 2000)
        } else if (data.user) {
          // If email confirmation is required, we'll have a user but no session
          setSuccess('Account created! Please check your email to verify your account.')
          
          // Try immediate login for development (will only work if email confirmation is disabled)
          console.log('Attempting immediate login...')
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          
          if (loginError) {
            console.log('Immediate login failed:', loginError.message)
          } else if (loginData.session) {
            console.log('Immediate login succeeded')
            setTimeout(() => router.push('/admin'), 2000)
          }
        } else {
          setError('Something went wrong. Account may not have been created.')
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <EnvDebugger />
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Create Admin Account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up for administrative access
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-1 w-full"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="mt-1 w-full"
                placeholder="Create a strong password"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 6 characters
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={async () => {
                try {
                  const { data, error } = await supabase.auth.getSession()
                  console.log('Current session:', data.session ? 'Active' : 'None')
                  
                  // Test connection to Supabase
                  const { error: pingError } = await supabase.from('tools').select('count(*)').limit(1)
                  
                  if (pingError) {
                    console.error('Database connection test failed:', pingError)
                    setError(`Database connection test failed: ${pingError.message}`)
                  } else {
                    console.log('Database connection successful!')
                    setSuccess('Database connection successful! Supabase is working.')
                  }
                } catch (e) {
                  console.error('Test failed:', e)
                  setError(`Test failed: ${e instanceof Error ? e.message : String(e)}`)
                }
              }}
            >
              Test Supabase Connection
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-800">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
