
// ScholarRush constants

// API URLs
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const SUBMIT_ENDPOINT = `${API_BASE_URL}/submit`;

// Blockchain Constants
export const BASE_SEPOLIA_CHAIN_ID = 84532;
export const BASE_SEPOLIA_RPC_URL = 'https://sepolia.base.org';
export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

// Stellar Constants
export const STELLAR_NETWORK = 'TESTNET';
export const STELLAR_HORIZON_URL = 'https://horizon-testnet.stellar.org';
export const SCHOLARSHIP_AMOUNT = '10';

// Groq API Constants
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
export const GROQ_MODEL = 'mixtral-8x7b-32768';

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// UI Constants
export const ESSAY_MIN_LENGTH = 250;
export const ESSAY_MAX_LENGTH = 5000;
export const AGE_MIN = 16;
export const AGE_MAX = 99;
