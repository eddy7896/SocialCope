import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">socialCOPE</h1>
      </header>
      <main className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h2>
        <p className="text-gray-600">Phase 1 - Foundation ready</p>
        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-gray-700">Services deployed. Database schema initialized.</p>
        </div>
      </main>
    </div>
  );
}
