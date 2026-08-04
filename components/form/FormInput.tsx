import { Input } from '@/components/ui/input';

type FormInputProps = {
  name: string;
  label?: string;
  type?: string;
  defaultValue?: string;
};

function FormInput({
  name,
  label,
  type = 'text',
  defaultValue,
}: FormInputProps) {
  return (
    <div className='mb-2'>
      <label htmlFor={name} className='capitalize block mb-1'>
        {label || name}
      </label>

      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
      />
    </div>
  );
}

export default FormInput;