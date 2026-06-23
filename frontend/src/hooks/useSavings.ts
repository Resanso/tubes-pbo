import { useQuery } from '@tanstack/react-query';
import { savingsApi } from '@/api/decision.api';
import type { SavingsPlan } from '@/types/decision.types';

export function useSavings(customerId: number) {
  return useQuery({
    queryKey: ['savings', customerId],
    queryFn: () => savingsApi.getByCustomer(customerId),
    enabled: !!customerId,
  });
}
