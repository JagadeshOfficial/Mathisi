import React from 'react';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    showTagline?: boolean;
}

export function MathisiLogo({ className = "h-12", showTagline = true }: LogoProps) {
    return (
        <div className={`flex items-center gap-3.5 ${className}`}>
            {/* Logo Image - Aspect ratio square for the icon */}
            <div className="relative h-full aspect-square flex-shrink-0">
                <Image
                    src="/logos/mathisi_logo.png"
                    alt="Mathisi Logo"
                    fill
                    unoptimized={true}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Brand Name Text */}
            <div className="flex flex-col justify-center select-none">
                <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 leading-none">
                    Mathisi
                </span>
                {showTagline && (
                    <span className="text-xs sm:text-sm font-bold tracking-wide text-indigo-600 dark:text-indigo-400 leading-tight mt-0.5">
                        School of AI
                    </span>
                )}
            </div>
        </div>
    );
}
