import { z } from 'zod';

const isValidEmail = (email: string) => z.string().email().safeParse(email).success;

const isValidProvider = (provider: string) =>
	z.enum(['github', 'google']).safeParse(provider).success;

export { isValidEmail, isValidProvider };
