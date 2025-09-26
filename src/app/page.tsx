import Link from 'next/link';
import AnimatedLogo from '@/components/animated-logo';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <Link href="/login" aria-label="Go to login page" className="mb-8">
        <AnimatedLogo />
      </Link>
      <div className="text-center animate-unveil">
        <h1 className="text-4xl font-headline font-bold text-primary tracking-tight lg:text-5xl">
          Your <span style={{color: 'hsl(var(--ring))'}}>microbiome</span>.
        </h1>
        <p className="text-4xl font-headline font-bold text-primary tracking-tight lg:text-5xl mt-2">
          Your daily plan.
        </p>
      </div>
    </main>
  );
}
