import React from 'react';

import { notFound } from 'next/navigation';

import EmailForm from '@/components/EmailForm/EmailForm';
import { db } from '@/lib/db/index.js';
import {
  lead_analysis,
  leads,
} from '@/lib/db/schema.js';

// Server component
export default async function LeadPage({ params }) {
  const inputId = Number(params.id);

  // Fetch prospects and analysis
  const prospectRows = await db
    .select({
      id: leads.id,
      prospect_name: leads.prospect_name,
      email: leads.email,
      phone: leads.phone,
      score: lead_analysis.score,
      summary: lead_analysis.summary,
    })
    .from(leads)
    .leftJoin(lead_analysis, lead_analysis.lead_id.equals(leads.id))
    .where(leads.business_input_id.equals(inputId));

  if (!prospectRows.length) {
    notFound();
  }

  // You may retrieve original keywords/location for personalization here
  const { keywords, location } = await db
    .select({ keywords: leads.business_input_id, location: leads.business_input_id })
    .from(leads)
    .where(leads.business_input_id.equals(inputId))
    .limit(1)
    .then(rows => rows[0] || {});

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Prospects for Input #{inputId}</h1>

      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            {['Name', 'Email', 'Phone', 'Score', 'Summary'].map(h => (
              <th key={h} className="p-2 text-left">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prospectRows.map(row => (
            <tr key={row.id} className="border-t">
              <td className="p-2">{row.prospect_name}</td>
              <td className="p-2">{row.email}</td>
              <td className="p-2">{row.phone}</td>
              <td className="p-2">{row.score ?? '-'}</td>
              <td className="p-2">{row.summary ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Client-side EmailForm component for sending emails */}
      <EmailForm
        defaultTemplate={`Hi {{prospect_name}},\n\nI noticed your work in {{keywords}} at {{location}} and thought you might be interested in ...`}
        prospects={prospectRows.map(r => ({
          prospect_name: r.prospect_name,
          email: r.email,
          keywords,
          location,
        }))}
      />
    </div>
  );
}