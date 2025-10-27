"use client";

import { useMemo } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

type Primitive = string | number | boolean | null | undefined;

export type VehicleDetailEntry = { label: string; value: Primitive };

interface VehicleDetailsCardProps {
  details?: Record<string, Primitive> | VehicleDetailEntry[];
}

export default function VehicleDetailsCard({ details }: VehicleDetailsCardProps) {
  const { t } = useI18n();

  const entries: VehicleDetailEntry[] = useMemo(() => {
    if (!details) return [];
    if (Array.isArray(details)) {
      return details
        .filter((e): e is VehicleDetailEntry => typeof e === 'object' && e !== null && 'label' in e && 'value' in e)
        .map(e => ({ label: String(e.label), value: e.value }));
    }
    return Object.keys(details).map((key) => ({ label: key, value: (details as Record<string, Primitive>)[key] }));
  }, [details]);

  if (!entries.length) return null;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{t('vehicleDetail.detailsCardTitle')}</h2>
      <dl className="divide-y divide-gray-200">
        {entries.map((item, idx) => (
          <div key={`${item.label}-${idx}`} className="py-3 grid grid-cols-3 gap-4">
            <dt className="col-span-1 text-gray-600 font-medium break-words">{item.label}</dt>
            <dd className="col-span-2 break-words">
              {(() => {
                const isOptions = String(item.label).toLowerCase() === 'options';
                const raw = item.value;
                if (isOptions && typeof raw === 'string') {
                  const parts = raw
                    .split(/[\n;]+/)
                    .map((s) => s.trim())
                    .filter(Boolean);
                  if (parts.length > 1) {
                    return (
                      <ul className="space-y-1">
                        {parts.map((p, i) => (
                          <li key={i}>- {p}</li>
                        ))}
                      </ul>
                    );
                  }
                }
                return String(raw ?? '');
              })()}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}


