ScholarRush
<br>
A full-stack, production-ready web application for educational scholarship management. ScholarRush integrates Base blockchain for onboarding, Groq's LLM API for essay evaluation, and Stellar testnet for scholarship fund disbursement.

Features
<br>
User Interface: Clean, professional React UI with a scholarship application form
Blockchain Integration: MetaMask wallet connection via ethers.js
AI Evaluation: Essay evaluation using Groq's LLM API (simulated in this demo)
Scholarship Disbursement: Stellar testnet fund transfers to approved applicants
Technology Stack
Frontend: React, TypeScript, Tailwind CSS
Blockchain: Base Sepolia (Chain ID 84532)
Stellar: Stellar SDK for XLM transactions
AI: Groq LLM API integration
Project Structure
src/
├── components/            # UI components
│   ├── ApplicationResult.tsx   # Displays application outcome
│   ├── Footer.tsx              # Footer component
│   ├── Header.tsx              # Header component
│   ├── ScholarshipForm.tsx     # Application form
│   ├── SmartContractCard.tsx   # Displays contract details
│   └── WalletConnect.tsx       # MetaMask connection component
├── contracts/             # Smart contract files
│   ├── ScholarshipContract.sol       # Solidity contract
│   └── ScholarshipContract.abi.json  # Contract ABI
├── hooks/                 # Custom React hooks
│   ├── useStellar.ts      # Stellar integration hook
│   └── useWallet.ts       # MetaMask wallet hook
├── lib/                   # Utility functions and constants
│   ├── constants.ts       # Application constants
│   └── mockApi.ts         # Simulated API for demo
├── pages/                 # Application pages
│   ├── Index.tsx          # Main application page
│   └── NotFound.tsx       # 404 page
└── types/                 # TypeScript type definitions
    └── index.ts           # Application types
Smart Contract
The ScholarshipContract is deployed on Base Sepolia testnet and includes the following key functionality:

Record scholarship application decisions
Emit events for application logging
Track approved applications by applicant address
Backend Integration (Simulated)
The application includes simulated backend functionality:

Essay evaluation using Groq LLM (simulated)
Blockchain record logging (simulated)
Stellar payments (simulated)
Getting Started
Connect your MetaMask wallet to Base Sepolia testnet
Enter your application details including name, age, and essay
Provide your Stellar testnet wallet address for receiving XLM
Submit your application for review
View the real-time evaluation results
Environment Variables (For Real Deployment)
VITE_API_URL=backend-api-url
VITE_CONTRACT_ADDRESS=deployed-contract-address
VITE_GROQ_API_KEY=your-groq-api-key
VITE_STELLAR_PUBLIC_KEY=your-stellar-public-key
VITE_STELLAR_SECRET_KEY=your-stellar-secret-key
Deployment
For production deployment:

Frontend: Deploy on Vercel or similar platform
Backend: Deploy on Render, Railway, or similar service
Smart Contract: Deploy to Base Sepolia using Hardhat or Foundry
