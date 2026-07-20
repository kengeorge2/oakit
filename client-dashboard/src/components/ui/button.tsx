import React from 'react';

export function Button({ children, className, variant, size, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }) {
  return <button className={className} {...props}>{children}</button>;
}
