export function captureVerificationToken(): string {
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
  return token && /^[A-Za-z0-9_-]{43}$/.test(token) ? token : '';
}
