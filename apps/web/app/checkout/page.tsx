export default function CheckoutPage() {
  return (
    <section className="page-shell checkout-layout checkout-stage">
      <div className="page-heading checkout-copy">
        <p className="eyebrow">Hosted checkout</p>
        <h1>Buyer checkout preview</h1>
        <p>
          A clean hosted checkout shell for future session creation, payment methods, risk checks,
          and confirmation states.
        </p>
        <div className="checkout-notes">
          <span>PCI-friendly surface planned</span>
          <span>Provider-neutral session model</span>
          <span>No live payment execution yet</span>
        </div>
      </div>
      <aside className="checkout-card" aria-label="Checkout preview">
        <div className="checkout-secure-row">
          <span>Secure checkout</span>
          <strong>GlobalPay Sandbox</strong>
        </div>
        <div className="merchant-mini">
          <span className="brand-mark">G</span>
          <div>
            <strong>Acme Store</strong>
            <span>Order GP-1024 - USD</span>
          </div>
        </div>
        <div className="checkout-total">
          <span>Order total</span>
          <strong>$129.00</strong>
        </div>
        <div className="checkout-items">
          <div>
            <span>Premium plan</span>
            <strong>$99.00</strong>
          </div>
          <div>
            <span>Usage credits</span>
            <strong>$30.00</strong>
          </div>
        </div>
        <div className="method-list">
          <button type="button" disabled>
            Card
          </button>
          <button type="button" disabled>
            Bank
          </button>
          <button type="button" disabled>
            Wallet
          </button>
        </div>
        <button className="pay-button" type="button" disabled>
          Pay with GlobalPay
        </button>
        <p className="checkout-footnote">Payment methods activate after provider integration.</p>
      </aside>
    </section>
  );
}
