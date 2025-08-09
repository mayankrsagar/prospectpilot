'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function GeneratePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', keywords: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch('/api/lead/generate', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(form),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Server responded ${res.status}`);
  //     }
  //     const { inputId } = await res.json();

  //     // Navigate directly to the new leads page:
  //     router.push(`/leads/${inputId}`);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const res = await fetch('/api/lead/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const payload = await res.json();
    if (!res.ok) {
      throw new Error(payload.error || `Status ${res.status}`);
    }

    router.push(`/leads/${payload.inputId}`);
  } catch (err) {
    console.error('generate error →', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Generate New Leads</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Business Name"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="keywords"
          value={form.keywords}
          onChange={handleChange}
          placeholder="Keywords (comma-separated)"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate Leads'}
        </button>
      </form>
      {error && (
        <p className="text-red-600">
          Something went wrong: {error}
        </p>
      )}
    </main>
  );
}
