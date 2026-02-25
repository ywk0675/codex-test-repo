import React from 'react';

export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <input
        className={`
          w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-white
          placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          transition-colors ${error ? 'border-red-500' : ''} ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Select({ label, error, className = '', children, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <select
        className={`
          w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-white
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          transition-colors ${error ? 'border-red-500' : ''} ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <textarea
        className={`
          w-full rounded-lg bg-slate-800 border border-slate-600 px-3 py-2 text-sm text-white
          placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          transition-colors resize-none ${error ? 'border-red-500' : ''} ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
