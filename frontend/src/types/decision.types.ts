export type DecisionStatus = 'BELI' | 'NABUNG';

export interface DecisionRequest {
  customerId: number;
  itemId: number;
}

export interface DecisionResponse {
  decisionId: number;
  decisionStatus: DecisionStatus;
  regretScore: number;
  remainingBalance: number;
  advice: string;
  savingsPlan?: SavingsPlan;
}

export interface SavingsPlan {
  id: number;
  targetAmount: number;
  /** Duration in months */
  duration: number;
  result: string;
}

export interface HistoryEntry {
  id: number;
  decisionDate: string;
  result: string;
  purchaseDecision: DecisionResponse;
}
