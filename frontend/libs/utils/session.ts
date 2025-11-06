export const persistSession = async (token: string, expiresInSeconds?: number) => {
  await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, expiresIn: expiresInSeconds })
  });
};

export const clearSession = async () => {
  await fetch('/api/session', {
    method: 'DELETE'
  });
};
