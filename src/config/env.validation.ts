import { z } from 'zod';

export const envSchema = z.object({
  DB_HOST: z.string().min(1, 'DB_HOST es requerido'),
  DB_PORT: z.string().regex(/^\d+$/, 'DB_PORT debe ser un número'),
  DB_USERNAME: z.string().min(1, 'DB_USERNAME es requerido'),
  DB_PASSWORD: z.string().min(1, 'DB_PASSWORD es requerido'),
  DB_NAME: z.string().min(1, 'DB_NAME es requerido'),
  // Puedes agregar otras variables aquí
});

export function validateEnv(config: Record<string, any>) {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error('Invalid environment variables: ' + JSON.stringify(result.error.issues));
  }
  return result.data;
}
