export default function CheckoutPage() {
  return (
    <section className="page-shell checkout-layout">
      <div className="page-heading">
        <p className="eyebrow">Hosted checkout</p>
        <h1>Checkout</h1>
        <p>Placeholder checkout route prepared for future session rendering and payment methods.</p>
      </div>
      <aside className="checkout-card" aria-label="Checkout preview">
        <div className="panel-row">
          <span>Order total</span>
          <strong>$129.00</strong>
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
