import { useQuery } from '@tanstack/react-query';
import { savingsApi } from '@/api/decision.api';
import type { SavingsPlan } from '@/types/decision.types';

const LOCAL_SAVINGS_KEY = 'mending_nabung_mock_savings';

function getLocalSavings(customerId: number): SavingsPlan[] {
  const data = localStorage.getItem(`${LOCAL_SAVINGS_KEY}_${customerId}`);
  if (!data) {
    const initialList: SavingsPlan[] = [
      {
        id: 501,
        targetAmount: 8200000, // PS5
        duration: 6,
        result: 'Nabung Rp 1.366.667 per bulan untuk PS5 Slim',
      },
      {
        id: 502,
        targetAmount: 21999000, // iPhone
        duration: 12,
        result: 'Nabung Rp 1.833.250 per bulan untuk iPhone 15 Pro Max',
      },
    ];
    localStorage.setItem(`${LOCAL_SAVINGS_KEY}_${customerId}`, JSON.stringify(initialList));
    return initialList;
  }
  return JSON.parse(data);
}

export function useSavings(customerId: number) {
  return useQuery({
    queryKey: ['savings', customerId],
    queryFn: async () => {
      try {
        const data = await savingsApi.getByCustomer(customerId);
        if (!data || data.length === 0) {
          return getLocalSavings(customerId);
        }
        return data;
      } catch (error) {
        console.warn('Backend API error, falling back to local savings:', error);
        return getLocalSavings(customerId);
      }
    },
    enabled: !!customerId,
  });
}
