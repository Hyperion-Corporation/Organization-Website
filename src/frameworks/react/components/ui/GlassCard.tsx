import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
  <div className={`backdrop-blur-md bg-stone-50/75 dark:bg-slate-900/70 border border-stone-200/60 dark:border-amber-500/10 shadow-sm rounded-xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

export default GlassCard;