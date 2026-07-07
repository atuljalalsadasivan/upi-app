'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { authApi, ApiClientError } from '../../lib/api-client';
import { authStorage } from '../../lib/auth-storage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await authApi.login({ email, password });
      authStorage.setToken(response.data.accessToken);
      router.push('/dashboard');
    } catch (caughtError) {
      setError(caughtError instanceof ApiClientError ? caughtError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell auth-layout">
      <div className="auth-card">
        <p className="eyebrow">Merchant access</p>
        <h1>Login</h1>
        <form
          className="form-preview"
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
        >
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="current-password"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="error-message">{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="auth-switch">
          New merchant? <Link href="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
