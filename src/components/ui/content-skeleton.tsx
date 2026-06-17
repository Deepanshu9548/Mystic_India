
import React from 'react';
import { cn } from '@/lib/utils';

interface ContentSkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  variant?: 'card' | 'text' | 'image' | 'rectangle' | 'circle';
  animated?: boolean;
  children?: React.ReactNode;
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = ({
  className,
  height,
  width,
  variant = 'rectangle',
  animated = true,
  children
}) => {
  return (
    <div
      className={cn(
        'bg-secondary/50 dark:bg-gray-800/50',
        animated && 'animate-pulse',
        {
          'rounded-md': variant === 'rectangle' || variant === 'card' || variant === 'text',
          'rounded-full': variant === 'circle',
          'aspect-video rounded-md': variant === 'image',
          'p-4 border border-border/50': variant === 'card',
          'h-4 max-w-[20ch]': variant === 'text'
        },
        className
      )}
      style={{
        height: height,
        width: width
      }}
    >
      {children}
    </div>
  );
};

export const CardSkeleton: React.FC<ContentSkeletonProps> = (props) => (
  <ContentSkeleton {...props} variant="card">
    <div className="space-y-3">
      {props.children || (
        <>
          <ContentSkeleton variant="text" width="60%" className="h-5 mb-4" />
          <ContentSkeleton variant="text" width="90%" />
          <ContentSkeleton variant="text" width="70%" />
        </>
      )}
    </div>
  </ContentSkeleton>
);

export default ContentSkeleton;
