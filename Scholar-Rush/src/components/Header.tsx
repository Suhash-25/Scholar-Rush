
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="w-full py-4 px-6 border-b bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-scholarship-primary">
            ScholarRush
          </h1>
          <Badge variant="outline" className="bg-scholarship-accent/10 text-scholarship-accent border-scholarship-accent/20">
            Beta
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Base Sepolia
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
            Stellar Testnet
          </Badge>
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Groq LLM
          </Badge>
        </div>
      </div>
    </header>
  );
}
