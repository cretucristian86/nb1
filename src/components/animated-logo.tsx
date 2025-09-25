"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';

const AnimatedLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex items-center justify-center w-64 h-64 cursor-pointer group", className)}>
            <div className="relative z-10 w-full h-full bg-transparent rounded-full flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110 animate-pulse-slow">
                <Image
                    src="/nb1-logo.svg"
                    alt="NB1 Logo"
                    width={200}
                    height={200}
                    className="p-4"
                />
            </div>
        </div>
    );
};

export default AnimatedLogo;

