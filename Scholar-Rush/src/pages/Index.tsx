
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScholarshipForm } from "@/components/ScholarshipForm";
import { ApplicationResult } from "@/components/ApplicationResult";
import { SmartContractCard } from "@/components/SmartContractCard";
import { ScholarshipApplication } from "@/types";

const Index = () => {
  const [application, setApplication] = useState<ScholarshipApplication | null>(null);
  
  const handleApplicationSuccess = (result: ScholarshipApplication) => {
    setApplication(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleReset = () => {
    setApplication(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-1 py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-scholarship-primary mb-4">
              Educational Scholarship Portal
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Apply for scholarships with real-time AI essay evaluation and receive funding through the Stellar blockchain. All applications are transparently recorded on Base Sepolia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex justify-center">
              {application ? (
                <ApplicationResult application={application} onReset={handleReset} />
              ) : (
                <ScholarshipForm onSuccess={handleApplicationSuccess} />
              )}
            </div>
            
            <div className="space-y-6">
              <SmartContractCard />
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-scholarship-accent/20">
                <h2 className="text-xl font-semibold text-scholarship-primary mb-4">How It Works</h2>
                
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-scholarship-accent text-white flex items-center justify-center text-sm font-medium">1</div>
                    <div>
                      <p className="font-medium">Complete Application</p>
                      <p className="text-sm text-gray-600 mt-1">Fill out the form with your personal information and scholarship essay.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-scholarship-accent text-white flex items-center justify-center text-sm font-medium">2</div>
                    <div>
                      <p className="font-medium">AI Evaluation</p>
                      <p className="text-sm text-gray-600 mt-1">Your essay is analyzed by Groq's LLM for scoring and feedback.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-scholarship-accent text-white flex items-center justify-center text-sm font-medium">3</div>
                    <div>
                      <p className="font-medium">Blockchain Recording</p>
                      <p className="text-sm text-gray-600 mt-1">Your application is recorded on Base Sepolia for transparency.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-scholarship-accent text-white flex items-center justify-center text-sm font-medium">4</div>
                    <div>
                      <p className="font-medium">Receive Funding</p>
                      <p className="text-sm text-gray-600 mt-1">Approved applications receive 10 XLM on Stellar testnet.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
