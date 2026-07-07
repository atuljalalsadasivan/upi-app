'use client';

import type { AuthProfile, CheckoutSession, CreateCheckoutSessionRequest } from '@globalpay/shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ApiClientError, authApi, checkoutApi } from '../../lib/api-client';
import { authStorage } from '../../lib/auth-storage';

const initialSessionForm: CreateCheckoutSessionRequest = {
  amount: 129,
  currency: 'USD',
  customerName: '',
  customerEmail: '',
  description: '',
  successUrl: 'http://localhost:3000/checkout/success',
  cancelUrl: 'http://localhost:3000/checkout/cancel'
};

const activeStatuses = new Set(['PENDING']);

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [sessions, setSessions] = useState<CheckoutSession[]>([]);
  const [sessionForm, setSessionForm] = useState<CreateCheckoutSessionRequest>(initialSessionForm);
  const [formError, setFormError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!authStorage.getToken()) {
        router.replace('/login');
        return;
      }

      try {
        const [profileResponse, sessionsResponse] = await Promise.all([
          authApi.me(),
          checkoutApi.listSessions()
        ]);

        setProfile(profileResponse.data);
        setSessions(sessionsResponse.data);
      } catch {
        authStorage.clearToken();
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [router]);

  const handleLogout = () => {
    authStorage.clearToken();
    router.replace('/login');
  };

  const updateSessionForm = (field: keyof CreateCheckoutSessionRequest, value: string) => {
    setSessionForm((currentForm) => ({
      ...currentForm,
      [field]:
        field === 'amount' ? Number(value) : field === 'currency' ? value.toUpperCase() : value
    }));
  };

  const handleCreateSession = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setFormMessage(null);
    setIsSubmitting(true);

    try {
      const response = await checkoutApi.createSession(sessionForm);
      setSessions((currentSessions) => [response.data, ...currentSessions]);
      setSessionForm({
        ...initialSessionForm,
        currency: profile?.merchant.currency ?? initialSessionForm.currency
      });
      setFormMessage(
        'Checkout session created. Copy the hosted URL and share it with the customer.'
      );
    } catch (error) {
      setFormError(
        error instanceof ApiClientError ? error.message : 'Unable to create checkout session.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUrl = async (checkoutUrl: string) => {
    try {
      await navigator.clipboard.writeText(checkoutUrl);
      setFormMessage('Checkout URL copied.');
    } catch {
      setFormError('Unable to copy checkout URL from this browser.');
    }
  };

  const handleCancelSession = async (sessionId: string) => {
    setFormError(null);
    setFormMessage(null);
    setCancellingId(sessionId);

    try {
      const response = await checkoutApi.cancelSession(sessionId);
      setSessions((currentSessions) =>
        currentSessions.map((session) => (session.id === sessionId ? response.data : session))
      );
      setFormMessage('Checkout session cancelled.');
    } catch (error) {
      setFormError(
        error instanceof ApiClientError ? error.message : 'Unable to cancel checkout session.'
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (isLoading) {
    return (
      <section className="page-shell">
        <div className="placeholder-panel loading-panel">
          <p className="eyebrow">Merchant operations</p>
          <h1>Dashboard</h1>
          <p>Loading merchant profile.</p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  const metrics = [
    { label: 'Gross volume', value: '$0.00' },
    { label: 'Checkout sessions', value: String(sessions.length) },
    {
      label: 'Open sessions',
      value: String(sessions.filter((session) => activeStatuses.has(session.status)).length)
    }
  ];

  return (
    <section className="page-shell">
      <div className="dashboard-top dashboard-hero">
        <div className="page-heading">
          <p className="eyebrow">Merchant operations</p>
          <h1>{profile.merchant.businessName}</h1>
          <p>
            Signed in as {profile.user.email}. Payments are not live yet; this dashboard is the
            merchant operating shell.
          </p>
        </div>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="profile-grid">
        <article>
          <span>Business status</span>
          <strong className="status-pill">{profile.merchant.status}</strong>
        </article>
        <article>
          <span>Business type</span>
          <strong>{profile.merchant.businessType}</strong>
        </article>
        <article>
          <span>Settlement currency</span>
          <strong>{profile.merchant.currency}</strong>
        </article>
      </div>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>

      <div className="dashboard-grid merchant-dashboard-grid">
        <section className="card form-card">
          <div className="card-header">
            <div>
              <h2>Create checkout session</h2>
              <p>
                Generate a hosted checkout URL for a customer. No payment provider is connected yet.
              </p>
            </div>
          </div>
          <form
            className="ops-form"
            onSubmit={(event) => {
              void handleCreateSession(event);
            }}
          >
            <label>
              Amount
              <input
                min="0.01"
                onChange={(event) => updateSessionForm('amount', event.target.value)}
                required
                step="0.01"
                type="number"
                value={sessionForm.amount}
              />
            </label>
            <label>
              Currency
              <input
                maxLength={3}
                minLength={3}
                onChange={(event) => updateSessionForm('currency', event.target.value)}
                required
                value={sessionForm.currency}
              />
            </label>
            <label>
              Customer name
              <input
                onChange={(event) => updateSessionForm('customerName', event.target.value)}
                required
                value={sessionForm.customerName}
              />
            </label>
            <label>
              Customer email
              <input
                onChange={(event) => updateSessionForm('customerEmail', event.target.value)}
                required
                type="email"
                value={sessionForm.customerEmail}
              />
            </label>
            <label className="full-span">
              Description
              <input
                onChange={(event) => updateSessionForm('description', event.target.value)}
                placeholder="Invoice, plan, order, or service description"
                value={sessionForm.description ?? ''}
              />
            </label>
            <label>
              Success URL
              <input
                onChange={(event) => updateSessionForm('successUrl', event.target.value)}
                required
                type="url"
                value={sessionForm.successUrl}
              />
            </label>
            <label>
              Cancel URL
              <input
                onChange={(event) => updateSessionForm('cancelUrl', event.target.value)}
                required
                type="url"
                value={sessionForm.cancelUrl}
              />
            </label>
            {formError ? <p className="error-message full-span">{formError}</p> : null}
            {formMessage ? <p className="success-message full-span">{formMessage}</p> : null}
            <div className="form-actions">
              <button className="button primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create checkout URL'}
              </button>
            </div>
          </form>
        </section>

        <section className="card table-card">
          <div className="card-header">
            <div>
              <h2>Recent checkout sessions</h2>
              <p>Copy hosted URLs, monitor status, and cancel pending sessions.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Expires</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <tr key={session.id}>
                      <td>
                        <strong>{session.id}</strong>
                      </td>
                      <td>
                        {session.customerName}
                        <small className="table-subtext">{session.customerEmail}</small>
                      </td>
                      <td>
                        {session.currency} {session.amount}
                      </td>
                      <td>
                        <span className={`badge ${session.status.toLowerCase()}`}>
                          {session.status}
                        </span>
                      </td>
                      <td>{new Date(session.expiresAt).toLocaleString()}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="button ghost compact"
                            type="button"
                            onClick={() => {
                              void handleCopyUrl(session.publicCheckoutUrl);
                            }}
                          >
                            Copy URL
                          </button>
                          <button
                            className="button outline compact"
                            type="button"
                            disabled={session.status !== 'PENDING' || cancellingId === session.id}
                            onClick={() => {
                              void handleCancelSession(session.id);
                            }}
                          >
                            {cancellingId === session.id ? 'Cancelling...' : 'Cancel'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No checkout sessions created yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <div className="placeholder-panel">
          <h2>Module 3 status</h2>
          <div className="activity-table">
            <div>
              <span>Checkout URLs</span>
              <strong>Hosted page ready</strong>
            </div>
            <div>
              <span>Payments</span>
              <strong>Provider integration comes next</strong>
            </div>
            <div>
              <span>Ledger entries</span>
              <strong>Waiting for real payment events</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
