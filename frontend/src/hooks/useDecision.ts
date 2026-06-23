import { useMutation, useQuery } from '@tanstack/react-query';
import { decisionApi } from '@/api/decision.api';
import type { DecisionRequest } from '@/types/decision.types';

/**
 * Hook to evaluate a buy-or-save decision.
 * Sends customerId + itemId to POST /api/decisions.
 */
export function useEvaluate() {
  return useMutation({
    mutationFn: (data: DecisionRequest) => decisionApi.evaluate(data),
  });
}

/**
 * Hook to fetch decision history for a given customer.
 */
export function useDecisionHistory(customerId: number) {
  return useQuery({
    queryKey: ['decisions', customerId],
    queryFn: () => decisionApi.getHistoryByCustomer(customerId),
    enabled: !!customerId,
  });
}
