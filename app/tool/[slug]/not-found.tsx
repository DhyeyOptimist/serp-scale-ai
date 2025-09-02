import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Tool Not Found</h2>
      <p className="text-foreground/60 text-center max-w-md mb-8">
        We couldn't find the tool you're looking for. It may have been moved or no longer exists.
      </p>
      <Button asChild>
        <Link href="/">
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}
