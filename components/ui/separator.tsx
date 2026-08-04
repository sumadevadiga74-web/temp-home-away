import * as React from 'react';

function Separator({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`w-full h-px bg-border ${className}`}
    />
  );
}

export { Separator };