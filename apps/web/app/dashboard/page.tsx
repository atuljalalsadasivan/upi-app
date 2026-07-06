const metrics = [
  { label: 'Gross volume', value: '$0.00' },
  { label: 'Transactions', value: '0' },
  { label: 'Open sessions', value: '0' }
];

export default function DashboardPage() {
  return (
    <section className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Merchant operations</p>
        <h1>Dashboard</h1>
        <p>Placeholder surface for future merchant analytics, settlements, and transactions.</p>
      </div>
      <div className="metric-grid">
        {metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>
      <div className="placeholder-panel">
        <h2>Recent activity</h2>
        <p>
          No transactions yet. Payment workflows are intentionally not implemented in this setup.
        </p>
      </div>
    </section>
  );
}
