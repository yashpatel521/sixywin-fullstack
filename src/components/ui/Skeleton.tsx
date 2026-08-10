import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-[#18120e] via-[#281d14] to-[#18120e] border border-[#9c663b]/20 ${className}`}
      {...props}
    />
  );
};
