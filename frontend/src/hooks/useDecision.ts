import { useMutation, useQuery } from '@tanstack/react-query';
import { decisionApi } from '@/api/decision.api';
import type { DecisionRequest } from '@/types/decision.types';

export function useEvaluate() {
  return useMutation({
    mutationFn: (data: DecisionRequest) => decisionApi.evaluate(data),
  });
}

export function useDecisionHistory(customerId: number) {
  return useQuery({
    queryKey: ['decisions', customerId],
    queryFn: () => decisionApi.getHistoryByCustomer(customerId),
    enabled: !!customerId,
  });
}
