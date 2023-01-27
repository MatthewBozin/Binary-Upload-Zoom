export function validateEnv(keys: string[]) {
  // we may be missing env vars during tests, which is fine
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  const missing = keys.filter(key => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
