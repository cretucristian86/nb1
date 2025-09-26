
import { Header } from '@/components/header';
import { NextSteps } from '@/components/next-steps';

export default function NextStepsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary font-headline">Kit Registration Successful!</h1>
                    <p className="text-muted-foreground">Welcome aboard! Here are the next steps in your journey.</p>
                </div>
                <NextSteps />
            </main>
        </div>
    );
}
