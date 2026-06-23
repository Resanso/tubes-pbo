import apiClient from './axios.config';
import type { DecisionRequest, DecisionResponse, HistoryEntry, SavingsPlan } from '@/types/decision.types';

/**
 * API wrapper for decision-related endpoints.
 * Maps to DecisionController (/api/decisions) and SavingsController (/api/savings).
 */
export const decisionApi = {
  /** POST /api/decisions — evaluate buy vs save for a customer+item */
  evaluate: (data: DecisionRequest) =>
    apiClient.post<DecisionResponse>('/decisions', data).then((r) => r.data),

  /** GET /api/decisions/customer/{customerId} — decision history */
  getHistoryByCustomer: (customerId: number) =>
    apiClient.get<HistoryEntry[]>(`/decisions/customer/${customerId}`).then((r) => r.data),
};

export const savingsApi = {
  /** GET /api/savings/customer/{customerId} — all savings plans for a customer */
  getByCustomer: (customerId: number) =>
    apiClient.get<SavingsPlan[]>(`/savings/customer/${customerId}`).then((r) => r.data),
};
