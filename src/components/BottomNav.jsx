import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Patterns', path: '/patterns', icon: 'bar_chart' },
    { name: 'Record', path: '/record', icon: 'add_circle', isHighlight: true },
    { name: 'Coach', path: '/coach', icon: 'smart_toy' },
    { name: 'Marketing', path: '/marketing', icon: 'campaign' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pb-safe-bottom pt-2 px-6 flex items-center justify-between z-40 h-[80px]">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors relative ${
              item.isHighlight ? '-top-5' : ''
            } ${
              isActive
                ? 'text-primary'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {item.isHighlight ? (
                 <div className="bg-primary hover:bg-primary-dark text-white h-14 w-14 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center transition-transform active:scale-95">
                   <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                 </div>
              ) : (
                <>
                  <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                    {item.name}
                  </span>
                </>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
