export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-primary">Serp-Scale-AI</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-foreground/60">
            <span>© 2025 Serp-Scale-AI. All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="/privacy" 
              className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}