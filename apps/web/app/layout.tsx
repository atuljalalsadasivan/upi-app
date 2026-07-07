import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Bell,
  Building2,
  CircleDollarSign,
  FileBarChart2,
  Home,
  LogOut,
  QrCode,
  Search,
  Settings,
  ShieldCheck,
  Users,
  WalletCards
} from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'GlobalPay',
  description: 'Payment orchestration for global merchants.'
};

const navigation = [
  { label: 'Overview', href: '/', icon: Home },
  { label: 'Wallets', href: '/', icon: WalletCards },
  { label: 'Transfers', href: '/', icon: CircleDollarSign },
  { label: 'Merchants', href: '/', icon: Building2 },
  { label: 'Customers', href: '/', icon: Users },
  { label: 'KYC', href: '/', icon: ShieldCheck },
  { label: 'QR Pay', href: '/checkout', icon: QrCode },
  { label: 'Reports', href: '/', icon: FileBarChart2 },
  { label: 'Admin', href: '/', icon: Settings }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar" aria-label="Primary navigation">
            <Link className="brand" href="/">
              <span className="brand-mark">G</span>
              <span>
                GlobalPay
                <small>Payment operations</small>
              </span>
            </Link>
            <nav className="sidebar-nav">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className={item.label === 'Overview' ? 'nav-item active' : 'nav-item'}
                    href={item.href}
                    key={item.label}
                  >
                    <Icon size={17} strokeWidth={1.9} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="app-frame">
            <header className="topbar">
              <div className="mobile-brand">
                <span className="brand-mark">G</span>
                <span>GlobalPay</span>
              </div>
              <label className="search-box">
                <Search size={16} />
                <input placeholder="Search payments, merchants, customers" type="search" />
              </label>
              <div className="topbar-actions">
                <button className="icon-button" type="button" aria-label="Notifications">
                  <Bell size={17} />
                  <span className="notification-dot" />
                </button>
                <Link className="profile-chip" href="/dashboard">
                  <span className="avatar">AJ</span>
                  <span>
                    Atul Jalal
                    <small>Ops admin</small>
                  </span>
                </Link>
                <Link className="button outline compact" href="/login">
                  <LogOut size={16} />
                  Logout
                </Link>
              </div>
            </header>

            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    className={
                      item.label === 'Overview' ? 'mobile-nav-item active' : 'mobile-nav-item'
                    }
                    href={item.href}
                    key={item.label}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
