'use client';

import { useActionState, useEffect } from 'react';
import { SubmitButton } from './Buttons';

type FormContainerProps = {
  action: (
    prevState: { message: string },
    formData: FormData
  ) => Promise<{ message: string }>;
  children: React.ReactNode;
};

function FormContainer({
  action,
  children,
}: FormContainerProps) {
  const [state, formAction] = useActionState(action, {
    message: '',
  });

  useEffect(() => {
    if (state.message) {
      console.log('Form result:', state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      {children}

      {state.message && (
        <p className='mt-4 text-sm text-red-500'>
          {state.message}
        </p>
      )}
    </form>
  );
}

export default FormContainer;