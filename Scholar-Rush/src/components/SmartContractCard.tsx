
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_SEPOLIA_RPC_URL, CONTRACT_ADDRESS } from "@/lib/constants";

export function SmartContractCard() {
  return (
    <Card className="shadow-md border-scholarship-accent/20">
      <CardHeader className="bg-scholarship-primary/10">
        <CardTitle className="text-lg font-semibold text-scholarship-primary">Smart Contract Details</CardTitle>
        <CardDescription>
          Base Sepolia Test Network
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Contract Address</h3>
          <p className="font-mono text-xs break-all mt-1">{CONTRACT_ADDRESS}</p>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">Network RPC</h3>
          <p className="font-mono text-xs break-all mt-1">{BASE_SEPOLIA_RPC_URL}</p>
        </div>
        
        <div className="pt-2">
          <div className="bg-muted/50 p-3 rounded-md">
            <h3 className="font-medium text-sm">Contract Functions</h3>
            <ul className="mt-2 text-xs space-y-1">
              <li className="font-mono">recordDecision(address applicant, bool approved)</li>
              <li className="font-mono">event ApplicationLogged(address, bool, timestamp)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
