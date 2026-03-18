'use client';

import { useEffect, useState } from 'react';

interface ContactInfo {
  company_phone: string;
  company_phone_whatsapp: string;
  company_email: string;
  address_en: string;
}

interface ContactInfoModuleProps {
  layout?: 'default' | 'compact';
  showAddress?: boolean;
  showWhatsapp?: boolean;
}

export function ContactInfoModule({
  layout = 'default',
  showAddress = true,
  showWhatsapp = true,
}: ContactInfoModuleProps) {
  const [data, setData] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const result = await response.json();
          setData(result[0] || {});
        }
      } catch (error) {
        console.error('Failed to fetch contact info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (!data) {
    return null;
  }

  if (layout === 'compact') {
    return (
      <div className="flex flex-col gap-2 text-sm">
        {data.company_phone && (
          <div className="text-gray-300">📞 {data.company_phone}</div>
        )}
        {data.company_email && (
          <div className="text-gray-300">📧 {data.company_email}</div>
        )}
        {showWhatsapp && data.company_phone_whatsapp && (
          <div className="text-gray-300">💬 {data.company_phone_whatsapp}</div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.company_phone && (
        <div className="flex items-start gap-4">
          <div className="text-2xl">📞</div>
          <div>
            <h4 className="font-semibold text-white mb-1">Phone</h4>
            <p className="text-gray-400">{data.company_phone}</p>
          </div>
        </div>
      )}

      {data.company_email && (
        <div className="flex items-start gap-4">
          <div className="text-2xl">📧</div>
          <div>
            <h4 className="font-semibold text-white mb-1">Email</h4>
            <p className="text-gray-400">{data.company_email}</p>
          </div>
        </div>
      )}

      {showWhatsapp && data.company_phone_whatsapp && (
        <div className="flex items-start gap-4">
          <div className="text-2xl">💬</div>
          <div>
            <h4 className="font-semibold text-white mb-1">WhatsApp</h4>
            <p className="text-gray-400">{data.company_phone_whatsapp}</p>
          </div>
        </div>
      )}

      {showAddress && data.address_en && (
        <div className="flex items-start gap-4">
          <div className="text-2xl">📍</div>
          <div>
            <h4 className="font-semibold text-white mb-1">Address</h4>
            <p className="text-gray-400">{data.address_en}</p>
          </div>
        </div>
      )}
    </div>
  );
}
