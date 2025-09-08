// Skip authentication check for the debug page
export default function DebugAuthLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return children
}
