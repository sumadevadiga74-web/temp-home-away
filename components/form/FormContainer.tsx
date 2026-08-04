'use client';

import { useActionState } from 'react';
import { SubmitButton } from './Buttons';

type FormContainerProps = {
  action: any;
  children: React.ReactNode;
};

function FormContainer({ action, children }: FormContainerProps) {
  const [state, formAction] = useActionState(action, { message: '' });

  return (
    <form action={formAction}>
      {children}
    </form>
  );
}

export default FormContainer;