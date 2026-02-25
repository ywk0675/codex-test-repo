import React from 'react';

export function Badge({ children, color, className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={color ? { backgroundColor: color + '22', color } : undefined}
    >
      {children}
    </span>
  );
}
