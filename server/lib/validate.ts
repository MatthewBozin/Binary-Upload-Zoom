export function validateEnv(keys: string[]) {
  const missing = keys.filter(key => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
