'use client';

import type { PublicCheckoutSession } from '@globalpay/shared';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ApiClientError, checkoutApi } from '../../../lib/api-client';

const terminalStatusMessages: Record<string, string> = {
  CANCELLED: 'This checkout session was cancelled by the merchant.',
  EXPIRED: 'This checkout session has expired. Ask the merchant for a new payment link.',
  COMPLETED: 'This checkout session has already been completed.'
};

export default function HostedCheckoutPage() {
  const params = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<PublicCheckoutSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await checkoutApi.getPublicSession(params.sessionId);
        setSession(response.data);
      } catch (caughtError) {
        setError(
          caughtError instanceof ApiClientError
            ? caughtError.message
            : 'Unable to load checkout session.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadSession();
  }, [params.sessionId]);

  if (isLoading) {
    return (
      <section className="page-shell checkout-layout">
        <div className="placeholder-panel loading-panel">
          <p className="eyebrow">Hosted checkout</p>
          <h1>Loading checkout</h1>
          <p>Retrieving secure checkout session details.</p>
        </div>
      </section>
    );
  }

  if (error || !session) {
    return (
      <section className="page-shell checkout-layout">
        <div className="placeholder-panel">
          <p className="eyebrow">Hosted checkout</p>
          <h1>Checkout unavailable</h1>
          <p>{error ?? 'Checkout session was not found.'}</p>
        </div>
      </section>
    );
  }

  const isPayable = session.status === 'PENDING';
  const terminalMessage = terminalStatusMessages[session.status];

  return (
    <section className="page-shell checkout-layout checkout-stage">
      <div className="page-heading checkout-copy">
        <p className="eyebrow">Hosted checkout</p>
        <h1>{session.merchantBusinessName}</h1>
        <p>
          Review the checkout details below. Payment provider integration is intentionally disabled
          until the next module.
        </p>
        <div className="checkout-notes">
          <span>Session {session.id}</span>
          <span>Status {session.status}</span>
        </div>
      </div>
      <aside className="checkout-card" aria-label="Hosted checkout session">
        <div className="checkout-secure-row">
          <span>Secure checkout</span>
          <strong>GlobalPay Sandbox</strong>
        </div>
        <div className="merchant-mini">
          <span className="brand-mark">G</span>
          <div>
            <strong>{session.merchantBusinessName}</strong>
            <span>{session.customerEmail}</span>
          </div>
        </div>
        <div className="checkout-total">
          <span>Amount due</span>
          <strong>
            {session.currency} {session.amount}
          </strong>
        </div>
        <div className="checkout-items">
          <div>
            <span>Description</span>
            <strong>{session.description ?? 'Checkout session'}</strong>
          </div>
          <div>
            <span>Customer</span>
            <strong>{session.customerName}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className={`badge ${session.status.toLowerCase()}`}>{session.status}</strong>
          </div>
        </div>
        {terminalMessage ? <p className="checkout-status-message">{terminalMessage}</p> : null}
        {isPayable ? (
          <button className="pay-button" type="button" disabled>
            Payment provider integration coming in next module
          </button>
        ) : null}
      </aside>
    </section>
  );
}
