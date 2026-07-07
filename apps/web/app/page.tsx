import {
  ArrowDownLeft,
  ArrowUpRight,
  Banknote,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Download,
  FileBarChart2,
  KeyRound,
  QrCode,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  TriangleAlert,
  Users,
  WalletCards
} from 'lucide-react';

const metrics = [
  {
    label: 'Total wallet balance',
    value: '$2.48M',
    delta: '+8.2%',
    tone: 'positive',
    icon: WalletCards
  },
  {
    label: 'Today volume',
    value: '$428.6K',
    delta: '+12.4%',
    tone: 'positive',
    icon: CircleDollarSign
  },
  {
    label: 'Pending settlements',
    value: '$86.3K',
    delta: '18 batches',
    tone: 'neutral',
    icon: Banknote
  },
  {
    label: 'Disputes open',
    value: '14',
    delta: '3 urgent',
    tone: 'warning',
    icon: ShieldAlert
  }
];

const transactions = [
  {
    id: 'GP-TXN-10482',
    customer: 'Nadia Rahman',
    merchant: 'PortFlow Retail',
    method: 'UPI QR',
    amount: '$1,240.00',
    status: 'Settled',
    risk: 'Low',
    time: '10:42'
  },
  {
    id: 'GP-TXN-10481',
    customer: 'Ethan Moore',
    merchant: 'CloudCart EU',
    method: 'Wallet',
    amount: '$842.50',
    status: 'Review',
    risk: 'Medium',
    time: '10:36'
  },
  {
    id: 'GP-TXN-10480',
    customer: 'Aarav Menon',
    merchant: 'Metro Foods',
    method: 'Bank',
    amount: '$318.20',
    status: 'Processing',
    risk: 'Low',
    time: '10:29'
  },
  {
    id: 'GP-TXN-10479',
    customer: 'Lina Chen',
    merchant: 'SaaSDesk',
    method: 'Card',
    amount: '$5,920.00',
    status: 'Failed',
    risk: 'High',
    time: '10:18'
  },
  {
    id: 'GP-TXN-10478',
    customer: 'Rafael Costa',
    merchant: 'TravelOps',
    method: 'UPI Intent',
    amount: '$690.00',
    status: 'Settled',
    risk: 'Low',
    time: '10:04'
  }
];

const statusBreakdown = [
  { label: 'Settled', value: '72%', count: '8,124', className: 'settled' },
  { label: 'Processing', value: '18%', count: '1,902', className: 'processing' },
  { label: 'Review', value: '7%', count: '746', className: 'review' },
  { label: 'Failed', value: '3%', count: '318', className: 'failed' }
];

const activity = [
  {
    icon: ShieldCheck,
    title: 'KYC approved',
    body: 'AsterPay merchant cleared KYB review',
    time: '8 min'
  },
  {
    icon: ArrowUpRight,
    title: 'Transfer initiated',
    body: 'USD wallet to INR settlement account',
    time: '21 min'
  },
  {
    icon: QrCode,
    title: 'QR payment created',
    body: 'Static UPI QR for Metro Foods checkout',
    time: '34 min'
  },
  {
    icon: TriangleAlert,
    title: 'Risk rule triggered',
    body: 'Velocity rule on CloudCart EU wallet',
    time: '52 min'
  }
];

const adminControls = [
  { icon: KeyRound, label: 'API keys', description: 'Rotate sandbox credentials' },
  { icon: SlidersHorizontal, label: 'Risk rules', description: 'Tune limits and review queues' },
  { icon: FileBarChart2, label: 'Reports', description: 'Export settlements and disputes' }
];

const badgeClass = (value: string) => `badge ${value.toLowerCase()}`;

export default function HomePage() {
  return (
    <section className="workspace">
      <div className="page-title-row">
        <div>
          <p className="eyebrow">Operations dashboard</p>
          <h1>Payment operations</h1>
          <p>
            Monitor UPI-style international payments, wallet liquidity, merchant onboarding,
            settlements, disputes, and compliance queues.
          </p>
        </div>
        <div className="title-actions">
          <button className="button ghost" type="button">
            <RefreshCcw size={16} />
            Sync
          </button>
          <button className="button outline" type="button">
            <Download size={16} />
            Export
          </button>
          <button className="button primary" type="button">
            <ArrowUpRight size={16} />
            New transfer
          </button>
        </div>
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article className="metric-card" key={metric.label}>
              <div className="card-icon">
                <Icon size={18} />
              </div>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small className={metric.tone}>{metric.delta}</small>
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <section className="card wallet-card">
          <div className="card-header">
            <div>
              <h2>Wallet overview</h2>
              <p>Balances across operating wallets and settlement rails.</p>
            </div>
            <span className="badge settled">Healthy</span>
          </div>
          <div className="wallet-list">
            <div>
              <span>USD operating wallet</span>
              <strong>$1,482,900</strong>
              <small>Available liquidity</small>
            </div>
            <div>
              <span>INR settlement wallet</span>
              <strong>₹62.4M</strong>
              <small>Next batch 18:00 IST</small>
            </div>
            <div>
              <span>EUR merchant reserve</span>
              <strong>€318,200</strong>
              <small>Rolling reserve 7 days</small>
            </div>
          </div>
        </section>

        <section className="card action-card">
          <div className="card-header">
            <div>
              <h2>QR and payment actions</h2>
              <p>Create operational payment artifacts without enabling live payments.</p>
            </div>
          </div>
          <div className="quick-actions">
            <button type="button">
              <QrCode size={17} />
              Generate QR
            </button>
            <button type="button">
              <ArrowUpRight size={17} />
              Send payout
            </button>
            <button type="button">
              <ArrowDownLeft size={17} />
              Request funds
            </button>
            <button type="button">
              <Building2 size={17} />
              Add merchant
            </button>
          </div>
        </section>

        <section className="card table-card">
          <div className="card-header">
            <div>
              <h2>Recent transactions</h2>
              <p>Live-style monitoring table for payment, risk, and settlement teams.</p>
            </div>
            <button className="button outline compact" type="button">
              View all
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Customer</th>
                  <th>Merchant</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <strong>{transaction.id}</strong>
                    </td>
                    <td>{transaction.customer}</td>
                    <td>{transaction.merchant}</td>
                    <td>{transaction.method}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <span className={badgeClass(transaction.status)}>{transaction.status}</span>
                    </td>
                    <td>{transaction.risk}</td>
                    <td>{transaction.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card status-card">
          <div className="card-header">
            <div>
              <h2>Payment status</h2>
              <p>Current day processing mix.</p>
            </div>
          </div>
          <div className="status-list">
            {statusBreakdown.map((item) => (
              <div key={item.label}>
                <div className="status-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="progress-track" aria-hidden="true">
                  <span className={item.className} style={{ width: item.value }} />
                </div>
                <small>{item.count} payments</small>
              </div>
            ))}
          </div>
        </section>

        <section className="card activity-card">
          <div className="card-header">
            <div>
              <h2>User and wallet activity</h2>
              <p>Recent actions from admins, merchants, and monitoring services.</p>
            </div>
          </div>
          <div className="activity-list">
            {activity.map((item) => {
              const Icon = item.icon;

              return (
                <div className="activity-item" key={item.title}>
                  <span className="activity-icon">
                    <Icon size={16} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                  <small>{item.time}</small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card admin-card">
          <div className="card-header">
            <div>
              <h2>Admin controls</h2>
              <p>Operational shortcuts for payment platform owners.</p>
            </div>
          </div>
          <div className="admin-list">
            {adminControls.map((item) => {
              const Icon = item.icon;

              return (
                <button type="button" key={item.label}>
                  <Icon size={17} />
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card form-card">
          <div className="card-header">
            <div>
              <h2>Manual review form</h2>
              <p>Dense admin form for payment investigations and KYC operations.</p>
            </div>
          </div>
          <form className="ops-form">
            <label>
              Case ID
              <input defaultValue="CASE-8841" />
            </label>
            <label>
              Merchant
              <input defaultValue="CloudCart EU" />
            </label>
            <label>
              Review reason
              <select defaultValue="velocity">
                <option value="velocity">Velocity rule</option>
                <option value="kyc">KYC mismatch</option>
                <option value="dispute">Dispute evidence</option>
              </select>
            </label>
            <label className="field-error">
              Hold amount
              <input defaultValue="$5,920.00" />
              <small>Requires senior approval above $5,000.</small>
            </label>
            <div className="form-actions">
              <button className="button outline" type="button">
                Save draft
              </button>
              <button className="button primary" type="button">
                Submit review
              </button>
            </div>
          </form>
        </section>

        <section className="card compliance-card">
          <div className="card-header">
            <div>
              <h2>KYC and compliance</h2>
              <p>Merchant onboarding status and verification coverage.</p>
            </div>
          </div>
          <div className="compliance-grid">
            <div>
              <CheckCircle2 size={18} />
              <strong>248</strong>
              <span>Verified merchants</span>
            </div>
            <div>
              <Clock3 size={18} />
              <strong>31</strong>
              <span>Pending KYB</span>
            </div>
            <div>
              <Users size={18} />
              <strong>12.8K</strong>
              <span>Customers monitored</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
