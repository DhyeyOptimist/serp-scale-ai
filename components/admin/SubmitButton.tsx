'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface Props {
  children: React.ReactNode
  loadingText?: string
}

export default function SubmitButton({ children, loadingText = 'Creating...' }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleClick = () => {
    setIsSubmitting(true)
    // Reset after a reasonable timeout to prevent permanent disabled state
    setTimeout(() => setIsSubmitting(false), 10000)
  }
  
  // Reset submitting state when component re-mounts (after navigation)
  useEffect(() => {
    setIsSubmitting(false)
  }, [])
  
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={isSubmitting}
      onClick={handleClick}
    >
      {isSubmitting ? loadingText : children}
    </Button>
  )
}

