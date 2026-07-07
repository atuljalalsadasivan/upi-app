import { DEFAULT_API_VERSION, GLOBALPAY_PLATFORM_NAME } from '@globalpay/shared';
import Link from 'next/link';

const capabilities = [
  {
    title: 'Merchant onboarding',
    body: 'Register a merchant admin, create a merchant profile, and start from a pending business state.'
  },
  {
    title: 'Checkout orchestration',
    body: 'Prepared hosted checkout surfaces and session states for future payment-method modules.'
  },
  {
    title: 'Transaction records',
    body: 'A PostgreSQL-backed transaction model ready for authorization, capture, refunds, and reporting.'
  },
  {
    title: 'Ledger foundation',
    body: 'Debit and credit entries are modeled early so money movement can be auditable from day one.'
  }
];

export default function HomePage() {
  return (
    <>
      <section className="landing">
        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow">API {DEFAULT_API_VERSION} foundation</p>
            <h1>{GLOBALPAY_PLATFORM_NAME}</h1>
            <p className="hero-text">
              A merchant payment operating system for onboarding, checkout sessions, transaction
              records, and ledger-ready money movement.
            </p>
            <div className="actions">
              <Link className="button primary" href="/register">
                Create merchant
              </Link>
              <Link className="button secondary" href="/checkout">
                View checkout
              </Link>
            </div>
          </div>

          <div className="ops-preview" aria-label="GlobalPay operations preview">
            <div className="ops-toolbar">
              <div>
                <span>Today</span>
                <strong>$42,860.00</strong>
              </div>
              <span className="status-chip">Ready</span>
            </div>
            <div className="ops-metrics">
              <article>
                <span>Auth rate</span>
                <strong>98.4%</strong>
              </article>
              <article>
                <span>Sessions</span>
                <strong>1,248</strong>
              </article>
              <article>
                <span>Pending</span>
                <strong>12</strong>
              </article>
            </div>
            <div className="rail-list">
              <div>
                <span className="rail-dot settled" />
                <span>Checkout session</span>
                <strong>Created</strong>
              </div>
              <div>
                <span className="rail-dot processing" />
                <span>Transaction</span>
                <strong>Authorized</strong>
              </div>
              <div>
                <span className="rail-dot posted" />
                <span>Ledger entry</span>
                <strong>Prepared</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-inner dashboard-preview">
          <div className="section-heading">
            <p className="eyebrow">Merchant console</p>
            <h2>Built for operators, not a brochure.</h2>
          </div>
          <div className="console-grid">
            <article className="console-panel span-two">
              <div className="panel-row">
                <span>Gross volume</span>
                <strong>$0.00</strong>
              </div>
              <div className="bar-stack" aria-hidden="true">
                <span style={{ height: '42%' }} />
                <span style={{ height: '58%' }} />
                <span style={{ height: '35%' }} />
                <span style={{ height: '70%' }} />
                <span style={{ height: '64%' }} />
                <span style={{ height: '86%' }} />
                <span style={{ height: '52%' }} />
              </div>
            </article>
            <article className="console-panel">
              <span>Business status</span>
              <strong className="status-pill">PENDING</strong>
            </article>
            <article className="console-panel">
              <span>Settlement currency</span>
              <strong>USD</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="landing compact-section">
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band quiet">
        <div className="section-inner split-section">
          <div>
            <p className="eyebrow">Current scope</p>
            <h2>Auth and merchant setup are ready. Payments stay deliberately out.</h2>
            <p>
              The platform now has merchant signup, login, protected profile access, and the schema
              boundaries needed before real payment flows are introduced.
            </p>
          </div>
          <div className="scope-list">
            <span>No real payments</span>
            <span>No Stripe integration</span>
            <span>No KYC workflow yet</span>
            <span>Provider-neutral architecture</span>
          </div>
        </div>
      </section>
    </>
  );
}
