
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { WalletConnect } from "@/components/WalletConnect";
import { useStellar } from "@/hooks/useStellar";
import { ESSAY_MIN_LENGTH, ESSAY_MAX_LENGTH, AGE_MIN, AGE_MAX } from "@/lib/constants";
import { submitApplication } from "@/lib/mockApi";
import { ScholarshipApplication } from "@/types";

// Form validation schema
const scholarshipFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  age: z.coerce.number().min(AGE_MIN).max(AGE_MAX),
  essay: z.string()
    .min(ESSAY_MIN_LENGTH, { message: `Essay must be at least ${ESSAY_MIN_LENGTH} characters.` })
    .max(ESSAY_MAX_LENGTH, { message: `Essay cannot exceed ${ESSAY_MAX_LENGTH} characters.` }),
  stellarWalletAddress: z.string().min(1, { message: "Stellar wallet address is required." }),
});

type ScholarshipFormValues = z.infer<typeof scholarshipFormSchema>;

interface ScholarshipFormProps {
  onSuccess: (application: ScholarshipApplication) => void;
}

export function ScholarshipForm({ onSuccess }: ScholarshipFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { validateStellarAddress } = useStellar();
  
  // Form default values
  const defaultValues: Partial<ScholarshipFormValues> = {
    name: "",
    age: undefined,
    essay: "",
    stellarWalletAddress: "",
  };

  // Initialize form
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(scholarshipFormSchema),
    defaultValues,
  });

  // Essay character count
  const essayValue = form.watch("essay") || "";
  const essayCharCount = essayValue.length;
  const isEssayValid = essayCharCount >= ESSAY_MIN_LENGTH && essayCharCount <= ESSAY_MAX_LENGTH;
  
  // Handle wallet connection
  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
  };

  // Handle form submission
  const onSubmit = async (values: ScholarshipFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Validate Stellar address
      if (!validateStellarAddress(values.stellarWalletAddress)) {
        form.setError("stellarWalletAddress", { 
          type: "manual", 
          message: "Invalid Stellar wallet address." 
        });
        return;
      }
      
      // Verify wallet connection
      if (!walletAddress) {
        alert("Please connect your MetaMask wallet before submitting.");
        return;
      }
      
      // Create application object
      const application: ScholarshipApplication = {
        name: values.name,
        age: values.age,
        essay: values.essay,
        stellarWalletAddress: values.stellarWalletAddress,
        walletAddress,
      };
      
      // Submit application (in a real app, this would go to an API)
      const response = await submitApplication(application);
      
      if (response.success && response.data) {
        onSuccess(response.data);
        form.reset(defaultValues);
      } else {
        alert(response.error || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg border-scholarship-accent/20">
      <CardHeader className="bg-gradient-to-r from-scholarship-primary to-scholarship-secondary text-white">
        <CardTitle className="text-2xl font-bold">Scholarship Application</CardTitle>
        <CardDescription className="text-white/80">
          Submit your application to receive XLM funding for your education
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="18" 
                        min={AGE_MIN} 
                        max={AGE_MAX} 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Must be between {AGE_MIN} and {AGE_MAX}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="essay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scholarship Essay</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your scholarship essay here..." 
                      className="min-h-[200px] resize-y"
                      {...field} 
                    />
                  </FormControl>
                  <div className="flex justify-between">
                    <FormDescription>
                      {ESSAY_MIN_LENGTH}-{ESSAY_MAX_LENGTH} characters
                    </FormDescription>
                    <p className={`text-xs ${isEssayValid ? 'text-green-600' : 'text-red-500'}`}>
                      {essayCharCount}/{ESSAY_MAX_LENGTH}
                    </p>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="stellarWalletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stellar Wallet Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="G..." 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Your Stellar testnet wallet address to receive XLM
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-muted/50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Connect MetaMask Wallet</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect your MetaMask wallet to record your application on Base Sepolia
              </p>
              <WalletConnect onConnect={handleWalletConnect} />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-scholarship-accent hover:bg-scholarship-accent/90"
              disabled={isSubmitting || !walletAddress}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t pt-6 flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          By submitting this form, you agree to have your essay evaluated by our AI system and your application recorded on the Base Sepolia blockchain.
        </p>
      </CardFooter>
    </Card>
  );
}
