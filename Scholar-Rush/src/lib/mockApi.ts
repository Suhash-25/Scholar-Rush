
// Mock API for ScholarRush application
// This simulates the backend functionality without requiring a real backend

import { EssayEvaluation, ScholarshipApplication, ApiResponse } from '@/types';
import { APPLICATION_STATUS } from '@/lib/constants';

// Mock database
let applications: ScholarshipApplication[] = [];

// Mock essay evaluation function (simulates Groq LLM)
const evaluateEssay = (essay: string): Promise<EssayEvaluation> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Simple evaluation logic (in production, this would call Groq API)
      const wordCount = essay.split(/\s+/).length;
      const score = Math.min(Math.max(Math.floor(wordCount / 100) + Math.random() * 3, 0), 10);
      const decision = score >= 7 ? 'approve' : 'reject';
      
      let reason = '';
      if (decision === 'approve') {
        reason = 'Your essay demonstrated excellent understanding of the topic with clear arguments and supporting evidence.';
      } else {
        reason = 'Your essay could benefit from more detailed examples and clearer structure. Consider revising for future applications.';
      }
      
      resolve({
        score,
        decision,
        reason
      });
    }, 2000); // 2-second delay to simulate API call
  });
};

// Mock blockchain interaction (simulates Base Sepolia contract call)
const recordOnBlockchain = (applicantAddress: string, approved: boolean): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate blockchain delay
    setTimeout(() => {
      // Generate a fake transaction hash
      const txHash = '0x' + Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      console.log(`[Mock Blockchain] Recorded decision for ${applicantAddress}: ${approved ? 'Approved' : 'Rejected'}`);
      console.log(`[Mock Blockchain] Transaction hash: ${txHash}`);
      
      resolve(txHash);
    }, 1500);
  });
};

// Mock Stellar payment (simulates Stellar SDK)
const sendStellarPayment = (recipientAddress: string, amount: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate Stellar payment delay
    setTimeout(() => {
      // Generate a fake transaction hash
      const txHash = Array.from({length: 64}, () => 
        Math.floor(Math.random() * 16).toString(16)).join('');
      
      console.log(`[Mock Stellar] Sent ${amount} XLM to ${recipientAddress}`);
      console.log(`[Mock Stellar] Transaction hash: ${txHash}`);
      
      resolve(txHash);
    }, 1800);
  });
};

// Submit application API
export const submitApplication = async (application: ScholarshipApplication): Promise<ApiResponse<ScholarshipApplication>> => {
  try {
    // 1. Evaluate the essay using mock Groq LLM
    const evaluation = await evaluateEssay(application.essay);
    
    // 2. Create application with evaluation results
    const newApplication: ScholarshipApplication = {
      ...application,
      id: Date.now().toString(),
      status: evaluation.decision === 'approve' ? 'approved' : 'rejected',
      score: evaluation.score,
      reason: evaluation.reason,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // 3. Save to mock database
    applications.push(newApplication);
    
    // 4. Record on mock blockchain
    await recordOnBlockchain(
      application.walletAddress || '0x0000000000000000000000000000000000000000',
      evaluation.decision === 'approve'
    );
    
    // 5. If approved, send mock Stellar payment
    if (evaluation.decision === 'approve') {
      await sendStellarPayment(application.stellarWalletAddress, '10');
    }
    
    // Return the application data with status
    return {
      success: true,
      data: newApplication
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    return {
      success: false,
      error: 'Failed to process application. Please try again later.'
    };
  }
};

// Get application by ID API
export const getApplicationById = (id: string): ApiResponse<ScholarshipApplication> => {
  const application = applications.find(app => app.id === id);
  
  if (!application) {
    return {
      success: false,
      error: 'Application not found'
    };
  }
  
  return {
    success: true,
    data: application
  };
};

// Get all applications API
export const getAllApplications = (): ApiResponse<ScholarshipApplication[]> => {
  return {
    success: true,
    data: applications
  };
};
