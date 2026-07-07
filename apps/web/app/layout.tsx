import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'GlobalPay',
  description: 'Payment orchestration for global merchants.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            GlobalPay
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/checkout">Checkout</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/register">Register</Link>
            <Link className="login-link" href="/login">
              Login
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
