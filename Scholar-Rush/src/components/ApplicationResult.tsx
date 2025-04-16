
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScholarshipApplication } from "@/types";
import { CheckCircle, XCircle, ArrowLeftCircle, FileCheck, Star } from "lucide-react";

interface ApplicationResultProps {
  application: ScholarshipApplication;
  onReset: () => void;
}

export function ApplicationResult({ application, onReset }: ApplicationResultProps) {
  const isApproved = application.status === 'approved';
  
  return (
    <Card className="w-full max-w-2xl shadow-lg border-scholarship-accent/20">
      <CardHeader className={`${
        isApproved 
          ? "bg-gradient-to-r from-green-600 to-green-700" 
          : "bg-gradient-to-r from-amber-600 to-amber-700"
        } text-white`}
      >
        <div className="flex items-center gap-2">
          {isApproved ? (
            <CheckCircle className="h-6 w-6" />
          ) : (
            <XCircle className="h-6 w-6" />
          )}
          <CardTitle className="text-2xl font-bold">
            Application {isApproved ? "Approved" : "Not Approved"}
          </CardTitle>
        </div>
        <CardDescription className="text-white/80">
          {isApproved 
            ? "Congratulations! Your scholarship application has been approved." 
            : "Thank you for your application. Unfortunately, it was not approved at this time."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        <div className="bg-muted/30 p-4 rounded-md space-y-2">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-scholarship-accent" />
            <h3 className="font-semibold text-lg">Application Details</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{application.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{application.age}</p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-sm text-muted-foreground">Stellar Wallet</p>
              <p className="font-medium break-all">{application.stellarWalletAddress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-md space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-scholarship-accent" />
              <h3 className="font-semibold text-lg">Essay Evaluation</h3>
            </div>
            <div className="bg-scholarship-accent text-white px-2 py-1 rounded-full text-sm font-medium">
              Score: {application.score}/10
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">Feedback</p>
            <p className="mt-1">{application.reason}</p>
          </div>
        </div>
        
        {isApproved && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <h3 className="font-medium text-green-800">Scholarship Awarded</h3>
            <p className="text-green-700 text-sm mt-1">
              10 XLM has been sent to your Stellar wallet. The transaction is being processed on the Stellar testnet.
            </p>
          </div>
        )}
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <h3 className="font-medium text-blue-800">Blockchain Record</h3>
          <p className="text-blue-700 text-sm mt-1">
            Your application has been recorded on the Base Sepolia blockchain for transparency and verification.
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-6">
        <Button 
          onClick={onReset} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeftCircle className="h-4 w-4" />
          Return to Application Form
        </Button>
      </CardFooter>
    </Card>
  );
}
