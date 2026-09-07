import { ZodSchema } from 'zod';

export const renderError = (
  error: unknown
): { message: string } => {
  return {
    message:
      error instanceof Error ? error.message : 'An error occurred',
  };
};

export const validateWithZodSchema = <T>(
  schema: ZodSchema<T>,
  data: unknown
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues.map((error) => error.message);
    throw new Error(errors.join(','));
  }

  return result.data;
};