"use client";

import { cn } from '@/lib/utils';

const AnimatedLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex items-center justify-center w-48 h-48 cursor-pointer group", className)}>
            <style jsx>{`
                .pulse {
                    animation: pulse-animation 2s infinite;
                    border-radius: 50%;
                }
                @keyframes pulse-animation {
                    0% {
                        box-shadow: 0 0 0 0px hsl(var(--primary) / 0.7);
                    }
                    100% {
                        box-shadow: 0 0 0 25px hsl(var(--primary) / 0);
                    }
                }
            `}</style>
            <div className="pulse absolute inset-0" />
            <div className="relative z-10 w-32 h-32 bg-background rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg
                    className="w-20 h-20 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            </div>
        </div>
    );
};

export default AnimatedLogo;
