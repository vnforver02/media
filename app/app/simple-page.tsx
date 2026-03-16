'use client';

import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n';

export default function SimplePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Media Today</h1>
      <p className="mb-8">Routing test page</p>
      <button
        onClick={() => router.push('/vi')}
        className="px-4 py-2 bg-brand-primary text-white rounded"
      >
        Go to Vietnamese
      </button>
    </div>
  );
}
