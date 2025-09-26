"use client";

import { FilePenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const AnimatedLogo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative flex items-center justify-center w-64 h-64 cursor-pointer group", className)}>
            {/* Outer circle */}
            <div className="absolute w-full h-full rounded-full border-2 border-dashed border-primary/20 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
            
            {/* Inner circle */}
            <div className="absolute w-2/3 h-2/3 rounded-full bg-primary/5 transition-transform duration-300 ease-in-out group-hover:scale-105" />

            <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-125">
                <FilePenLine className="w-24 h-24 text-primary/80 transition-colors duration-300 group-hover:text-primary" />
            </div>
        </div>
    );
};

export default AnimatedLogo;