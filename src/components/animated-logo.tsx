"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';

const AnimatedLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex items-center justify-center w-64 h-64 cursor-pointer group animate-unveil", className)}>
            <div className="transition-transform duration-500 ease-in-out group-hover:scale-110">
                <Image
                    src="/nb1-logo.svg"
                    alt="nb1 Logo"
                    width={256}
                    height={256}
                    priority
                />
            </div>
        </div>
    );
};

export default AnimatedLogo;
