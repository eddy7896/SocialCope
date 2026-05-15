import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { authApi, initializeApi } from '../../lib/api';
import { useAuthStore } from '../../lib/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      initializeApi();
      const response = await authApi.login(email, password);
      const { token, user } = response.data;
      setAuth(user, token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">socialCOPE</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gray-900 text-white rounded font-medium hover:bg-gray-800 disabled:bg-gray-500"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/register" className="font-medium text-gray-900 hover:underline">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}
