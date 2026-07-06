export default function LoginPage() {
  return (
    <section className="page-shell">
      <div className="placeholder-panel">
        <p className="eyebrow">Merchant access</p>
        <h1>Login</h1>
        <p>
          Authentication will be added in a future module. This placeholder keeps the route
          structure ready for merchant and operator sign-in flows.
        </p>
        <form className="form-preview">
          <label>
            Email
            <input type="email" placeholder="merchant@example.com" disabled />
          </label>
          <label>
            Password
            <input type="password" placeholder="Not enabled yet" disabled />
          </label>
          <button type="button" disabled>
            Sign in
          </button>
        </form>
      </div>
    </section>
  );
}
