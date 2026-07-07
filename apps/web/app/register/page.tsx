'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { authApi, ApiClientError } from '../../lib/api-client';
import { authStorage } from '../../lib/auth-storage';

const initialForm = {
  fullName: '',
  email: '',
  password: '',
  businessName: '',
  businessType: '',
  country: 'US',
  currency: 'USD'
};

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: field === 'country' || field === 'currency' ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await authApi.register(form);
      authStorage.setToken(response.data.accessToken);
      router.push('/dashboard');
    } catch (caughtError) {
      setError(
        caughtError instanceof ApiClientError ? caughtError.message : 'Unable to create account.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-shell auth-layout">
      <div className="auth-card wide">
        <p className="eyebrow">Merchant onboarding</p>
        <h1>Register</h1>
        <p className="auth-copy">
          Create the merchant admin account and business profile used by the API.
        </p>
        <form
          className="form-preview form-grid"
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
        >
          <label>
            Full name
            <input
              autoComplete="name"
              onChange={(event) => updateField('fullName', event.target.value)}
              required
              value={form.fullName}
            />
          </label>
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => updateField('email', event.target.value)}
              required
              type="email"
              value={form.email}
            />
          </label>
          <label>
            Password
            <input
              autoComplete="new-password"
              minLength={8}
              onChange={(event) => updateField('password', event.target.value)}
              required
              type="password"
              value={form.password}
            />
          </label>
          <label>
            Business name
            <input
              onChange={(event) => updateField('businessName', event.target.value)}
              required
              value={form.businessName}
            />
          </label>
          <label>
            Business type
            <input
              onChange={(event) => updateField('businessType', event.target.value)}
              placeholder="SaaS, retail, marketplace"
              required
              value={form.businessType}
            />
          </label>
          <label>
            Country
            <input
              maxLength={2}
              minLength={2}
              onChange={(event) => updateField('country', event.target.value)}
              required
              value={form.country}
            />
          </label>
          <label>
            Currency
            <input
              maxLength={3}
              minLength={3}
              onChange={(event) => updateField('currency', event.target.value)}
              required
              value={form.currency}
            />
          </label>
          {error ? <p className="error-message full-span">{error}</p> : null}
          <button className="full-span" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch">
          Already registered? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
