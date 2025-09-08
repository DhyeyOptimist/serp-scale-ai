// This ensures the login page doesn't use the admin layout
// which would otherwise cause a redirect loop
export default function LoginLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return children
}
