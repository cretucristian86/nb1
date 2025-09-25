import Link from 'next/link';
import AnimatedLogo from '@/components/animated-logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary tracking-tight lg:text-5xl">
          Welcome to Campaign Enroller
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Click the logo to begin your enrollment.
        </p>
      </div>
      <Link href="/login" aria-label="Go to login page">
        <AnimatedLogo />
      </Link>
    </main>
  );
}
