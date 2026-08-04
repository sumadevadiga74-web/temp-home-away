import * as React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

function Label({ className = '', ...props }: LabelProps) {
  return (
    <label
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    />
  );
}

export { Label };