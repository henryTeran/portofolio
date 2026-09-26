let capturedToken = '';
export function captureVerificationToken(): string {
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
  if (token !== null) {
    capturedToken = /^[A-Za-z0-9_-]{43}$/.test(token) ? token : '';
    window.history.replaceState(window.history.state, '', window.location.pathname);
  }
  return capturedToken;
}
