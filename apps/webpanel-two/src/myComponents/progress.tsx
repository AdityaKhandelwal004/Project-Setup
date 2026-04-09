'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from './utils';
import { brand, primitiveColors } from '@mono/theme/style.palette';

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number;
  indicatorColor?: string; // 👈 new prop
  trackColor?: string; // optional if you also want to change the track background
};

function Progress({
  className,
  value = 0,
  indicatorColor = primitiveColors.orange500, // default to your theme accent
  trackColor = '#E5E7EB', // default gray (like bg-gray-200)
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full',
        className
      )}
      style={{ backgroundColor: trackColor }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-500 ease-out"
        style={{
          transform: `translateX(-${100 - value}%)`,
          backgroundColor: indicatorColor,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
