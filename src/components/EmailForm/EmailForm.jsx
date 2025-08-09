'use client';

import { useState } from 'react';

export default function EmailForm({ defaultTemplate, prospects }) {
  const [body, setBody] = useState(defaultTemplate);
  const [sending, setSending] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    setSending(true);

    for (const p of prospects) {
      const personalized = body
        .replace(/{{prospect_name}}/g, p.prospect_name)
        .replace(/{{location}}/g, p.location)
        .replace(/{{keywords}}/g, p.keywords);

      await fetch('/api/lead/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: p.email,
          subject: 'Quick intro',
          body: personalized,
        }),
      });
    }

    setSending(false);
    alert('All emails sent!');
  }

  return (
    <form onSubmit={handleSend} className="space-y-4">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        disabled={sending}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {sending ? 'Sending...' : 'Send Emails'}
      </button>
    </form>
  );
}
