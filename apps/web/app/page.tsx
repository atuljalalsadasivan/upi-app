import { DEFAULT_API_VERSION, GLOBALPAY_PLATFORM_NAME } from '@globalpay/shared';
import Link from 'next/link';

const capabilities = [
  'Merchant onboarding foundation',
  'Checkout session lifecycle placeholders',
  'Transaction and ledger data model',
  'Provider-agnostic orchestration boundary'
];

export default function HomePage() {
  return (
    <section className="landing">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">API {DEFAULT_API_VERSION}</p>
          <h1>{GLOBALPAY_PLATFORM_NAME}</h1>
          <p className="hero-text">
            A production-ready foundation for merchant payments, checkout orchestration,
            transactions, and ledger workflows.
          </p>
          <div className="actions">
            <Link className="button primary" href="/dashboard">
              Merchant dashboard
            </Link>
            <Link className="button secondary" href="/checkout">
              Checkout preview
            </Link>
          </div>
        </div>
        <div className="payment-panel" aria-label="Payment orchestration preview">
          <div className="panel-row">
            <span>Checkout Session</span>
            <strong>Created</strong>
          </div>
          <div className="amount">$249.00</div>
          <div className="flow">
            <span>Merchant</span>
            <span>GlobalPay</span>
            <span>Ledger</span>
          </div>
        </div>
      </div>
      <div className="capability-grid">
        {capabilities.map((item) => (
          <article key={item}>
            <h2>{item}</h2>
            <p>Module boundary prepared for future implementation.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
