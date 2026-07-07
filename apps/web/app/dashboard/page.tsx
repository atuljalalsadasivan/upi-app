'use client';

import type { AuthProfile } from '@globalpay/shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authApi } from '../../lib/api-client';
import { authStorage } from '../../lib/auth-storage';

const metrics = [
  { label: 'Gross volume', value: '$0.00' },
  { label: 'Transactions', value: '0' },
  { label: 'Open sessions', value: '0' }
];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!authStorage.getToken()) {
        router.replace('/login');
        return;
      }

      try {
        const response = await authApi.me();
        setProfile(response.data);
      } catch {
        authStorage.clearToken();
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    void loadProfile();
  }, [router]);

  const handleLogout = () => {
    authStorage.clearToken();
    router.replace('/login');
  };

  if (isLoading) {
    return (
      <section className="page-shell">
        <div className="placeholder-panel">
          <p className="eyebrow">Merchant operations</p>
          <h1>Dashboard</h1>
        </div>
      </section>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <section className="page-shell">
      <div className="dashboard-top">
        <div className="page-heading">
          <p className="eyebrow">Merchant operations</p>
          <h1>{profile.merchant.businessName}</h1>
          <p>{profile.user.email}</p>
        </div>
        <button className="logout-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="profile-grid">
        <article>
          <span>Business status</span>
          <strong className="status-pill">{profile.merchant.status}</strong>
        </article>
        <article>
          <span>Business type</span>
          <strong>{profile.merchant.businessType}</strong>
        </article>
        <article>
          <span>Settlement currency</span>
          <strong>{profile.merchant.currency}</strong>
        </article>
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
        <p>No transactions yet. Payment workflows are intentionally not implemented.</p>
      </div>
    </section>
  );
}
