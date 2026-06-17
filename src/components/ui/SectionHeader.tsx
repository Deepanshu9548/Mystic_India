
import React from 'react';
import ScrollReveal from './ScrollReveal';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
  description,
  centered = true,
  className,
}) => {
  return (
    <div className={cn(
      "mb-16",
      centered && "text-center",
      className
    )}>
      <ScrollReveal>
        {subtitle && (
          <p className="subtitle mb-3">{subtitle}</p>
        )}
        <h2 className={cn(
          "section-title",
          centered && "after:left-1/2 after:-translate-x-1/2"
        )}>
          {title}
        </h2>
        {description && (
          <p className="mt-8 max-w-2xl mx-auto text-foreground/70">
            {description}
          </p>
        )}
      </ScrollReveal>
    </div>
  );
};

export default SectionHeader;
