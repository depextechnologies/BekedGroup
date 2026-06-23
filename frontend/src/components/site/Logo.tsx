'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  prefix?: string;
  prefixColor?: string;
  className?: string;
  white?: boolean;
}

const sizes: Record<string, string> = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-6xl md:text-7xl',
  '2xl': 'text-[120px] md:text-[200px] lg:text-[260px]',
};

/**
 * Renders "bakēd" with the macron over the e.
 * Optional prefix renders as "PREFIXbakēd" with first part in brand color.
 */
export function Logo({ size = 'md', prefix, prefixColor, className, white = true }: LogoProps) {
  return (
    <span
      className={cn('baked-wordmark inline-flex items-baseline leading-none', sizes[size], className)}
      data-testid="baked-logo"
    >
      {prefix && (
        <span
          style={{ color: prefixColor }}
          className="font-black tracking-tighter"
        >
          {prefix}
        </span>
      )}
      <span className={cn(white ? 'text-white' : 'text-[#050505]', 'font-black tracking-tighter')}>
        bak<span className="relative inline-block">
          e
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 top-[0.18em] block h-[0.12em] w-[0.62em] rounded-[2px]"
            style={{ backgroundColor: white ? '#ffffff' : '#050505' }}
          />
        </span>d
      </span>
    </span>
  );
}
