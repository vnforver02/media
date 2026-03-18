import { Suspense } from 'react';
import ServicesContent from '@/components/site/ServicesContent';

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="bg-brand-dark min-h-screen" />}>
      <ServicesContent />
    </Suspense>
  );
}
