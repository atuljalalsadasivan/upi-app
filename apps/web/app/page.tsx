import { DEFAULT_API_VERSION, GLOBALPAY_PLATFORM_NAME } from '@globalpay/shared';
import Link from 'next/link';

const capabilities = [
  {
    eyebrow: '01',
    title: 'Merchant onboarding',
    body: 'Create a merchant admin and business profile with a review-ready PENDING status.'
  },
  {
    eyebrow: '02',
    title: 'Checkout orchestration',
    body: 'Prepare hosted checkout sessions before adding real payment providers.'
  },
  {
    eyebrow: '03',
    title: 'Transaction records',
    body: 'Keep provider-neutral transaction records for auth, capture, refund, and reporting flows.'
  },
  {
    eyebrow: '04',
    title: 'Ledger foundation',
    body: 'Model debit and credit entries early so future money movement is auditable.'
  }
];

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero">
          <div className="hero-copy reveal-panel">
            <p className="eyebrow">GlobalPay API {DEFAULT_API_VERSION}</p>
            <h1>{GLOBALPAY_PLATFORM_NAME}</h1>
            <p className="hero-text">
              A PayPal-style payment orchestration console for merchant onboarding, hosted checkout,
              transaction records, and ledger-ready operations.
            </p>
            <div className="actions">
              <Link className="button primary" href="/register">
                Open merchant account
              </Link>
              <Link className="button secondary" href="/checkout">
                Preview checkout
              </Link>
            </div>
            <div className="trust-row" aria-label="Platform foundations">
              <span>JWT auth</span>
              <span>Prisma + PostgreSQL</span>
              <span>Provider-neutral</span>
            </div>
          </div>

          <div className="product-frame" aria-label="GlobalPay operations preview">
            <div className="window-bar">
              <span />
              <span />
              <span />
              <strong>Merchant console</strong>
            </div>
            <div className="console-header">
              <div>
                <span>Gross volume</span>
                <strong>$42,860.00</strong>
              </div>
              <span className="status-chip">Sandbox ready</span>
            </div>
            <div className="console-body">
              <article className="balance-card">
                <span>Checkout sessions</span>
                <strong>1,248</strong>
                <div className="mini-bars" aria-hidden="true">
                  <span style={{ height: '42%' }} />
                  <span style={{ height: '68%' }} />
                  <span style={{ height: '52%' }} />
                  <span style={{ height: '84%' }} />
                  <span style={{ height: '61%' }} />
                  <span style={{ height: '92%' }} />
                </div>
              </article>
              <article className="approval-card">
                <span>Auth readiness</span>
                <strong>98.4%</strong>
                <p>Checkout and ledger boundaries prepared for provider modules.</p>
              </article>
            </div>
            <div className="payment-timeline">
              <div>
                <span className="rail-dot settled" />
                <p>Merchant created</p>
                <strong>PENDING</strong>
              </div>
              <div>
                <span className="rail-dot processing" />
                <p>Session opened</p>
                <strong>READY</strong>
              </div>
              <div>
                <span className="rail-dot posted" />
                <p>Ledger entry</p>
                <strong>DRAFT</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-inner">
          <div className="section-heading">
            <p className="eyebrow">Operating model</p>
            <h2>One foundation for merchants, checkout, transactions, and ledgers.</h2>
          </div>
          <div className="orchestration-map">
            <article>
              <span>Collect</span>
              <strong>Hosted checkout</strong>
              <p>Buyer-facing checkout pages stay isolated from provider integrations.</p>
            </article>
            <article>
              <span>Authorize</span>
              <strong>Transaction core</strong>
              <p>Transaction records are ready for payment state transitions later.</p>
            </article>
            <article>
              <span>Settle</span>
              <strong>Ledger entries</strong>
              <p>Ledger placeholders give every future money movement a clear audit path.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-inner compact-section">
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article key={item.title}>
              <span>{item.eyebrow}</span>
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
            <h2>Ready for Module 3 without pretending payments exist today.</h2>
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
