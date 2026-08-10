import React from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  href, 
  icon, 
  label, 
  active, 
  isCollapsed 
}) => {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${
        active
          ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 ring-1 ring-amber-400/30'
          : 'text-stone-500 hover:text-stone-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-stone-100 dark:hover:bg-slate-800/80'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      <div className={`transition-colors ${active ? 'text-amber-600 dark:text-amber-300' : 'group-hover:text-stone-900 dark:group-hover:text-slate-200'}`}>
        {icon}
      </div>
      
      {!isCollapsed && (
        <span className="font-medium truncate">{label}</span>
      )}
    </Link>
  );
};

export default SidebarItem;