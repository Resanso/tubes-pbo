import apiClient from './axios.config';
import type { DecisionRequest, DecisionResponse, HistoryEntry, SavingsPlan } from '@/types/decision.types';

export const decisionApi = {
  evaluate: (data: DecisionRequest) =>
    apiClient.post<DecisionResponse>('/decisions', data).then((r) => r.data),

  getHistoryByCustomer: (customerId: number) =>
    apiClient.get<HistoryEntry[]>(`/decisions/customer/${customerId}`).then((r) => r.data),
};

export const savingsApi = {
  getByCustomer: (customerId: number) =>
    apiClient.get<SavingsPlan[]>(`/savings/customer/${customerId}`).then((r) => r.data),
};
