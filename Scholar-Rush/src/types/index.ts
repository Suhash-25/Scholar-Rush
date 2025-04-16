
// Types for ScholarRush Application

export interface ScholarshipApplication {
  id?: string;
  name: string;
  age: number;
  essay: string;
  stellarWalletAddress: string;
  walletAddress?: string;
  status?: 'pending' | 'approved' | 'rejected';
  score?: number;
  reason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EssayEvaluation {
  score: number;
  decision: 'approve' | 'reject';
  reason: string;
}

export interface BlockchainRecord {
  txHash: string;
  applicantAddress: string;
  approved: boolean;
  timestamp: number;
}

export interface StellarTransaction {
  txHash: string;
  recipientAddress: string;
  amount: string;
  timestamp: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
