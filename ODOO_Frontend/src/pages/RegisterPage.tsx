import { LoginPage } from './LoginPage';

/**
 * RegisterPage — Dedicated registration route entrypoint.
 * Renders the authentication interface with 'register' mode preselected.
 */
export function RegisterPage() {
  return <LoginPage initialMode="register" />;
}

export default RegisterPage;
