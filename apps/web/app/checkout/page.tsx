export default function CheckoutPage() {
  return (
    <section className="page-shell checkout-layout">
      <div className="page-heading">
        <p className="eyebrow">Hosted checkout</p>
        <h1>Checkout</h1>
        <p>
          A buyer-facing shell for future checkout sessions, payment methods, and confirmation
          states.
        </p>
      </div>
      <aside className="checkout-card" aria-label="Checkout preview">
        <div className="merchant-mini">
          <span className="brand-mark">G</span>
          <div>
            <strong>Acme Store</strong>
            <span>Order GP-1024</span>
          </div>
        </div>
        <div className="panel-row">
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
      </aside>
    </section>
  );
}
