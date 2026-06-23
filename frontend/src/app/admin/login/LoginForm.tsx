'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/site/Logo';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary text-white flex items-center justify-center p-6" data-testid="admin-login-page">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-brand-gold/10 blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-purple/10 blur-[160px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-10">
          <Logo size="lg" />
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-brand-gold mt-4">
            Admin Console
          </div>
        </div>

        <form onSubmit={submit} className="rounded-baked border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 space-y-5" data-testid="admin-login-form">
          <h1 className="font-heading text-2xl font-bold">Sign in</h1>

          <label className="block">
            <span className="text-xs uppercase tracking-wider font-bold text-white/60 mb-2 block">Email</span>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="admin-email-input"
                className="w-full bg-white/[0.04] border border-white/10 focus:border-brand-gold rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-colors"
                placeholder="admin@baked.group"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-xs uppercase tracking-wider font-bold text-white/60 mb-2 block">Password</span>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="admin-password-input"
                className="w-full bg-white/[0.04] border border-white/10 focus:border-brand-gold rounded-xl py-3 pl-11 pr-4 text-white outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </label>

          {error && <div className="text-brand-red text-sm" data-testid="admin-login-error">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-gold text-bg-primary font-bold text-sm uppercase tracking-wider hover:bg-yellow-400 transition-colors disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center text-xs text-white/40 pt-2">
            ← <a href="/" className="hover:text-brand-gold transition-colors">Back to site</a>
          </div>
        </form>
      </div>
    </div>
  );
}
