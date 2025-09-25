"use client";

import Image from 'next/image';
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
            <div className="relative z-10 w-48 h-48 bg-transparent rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image
                    src="/nb1-logo.svg"
                    alt="NB1 Logo"
                    width={160}
                    height={160}
                    className="p-4"
                />
            </div>
        </div>
    );
};

export default AnimatedLogo;
