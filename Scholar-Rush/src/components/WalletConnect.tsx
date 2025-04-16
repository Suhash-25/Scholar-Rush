
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { BASE_SEPOLIA_CHAIN_ID } from '@/lib/constants';
import { Loader2, LinkIcon, UnlinkIcon } from 'lucide-react';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const { 
    address, 
    chainId, 
    isConnected, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet,
    switchNetwork 
  } = useWallet();
  
  const [switchingNetwork, setSwitchingNetwork] = useState(false);

  const handleConnect = async () => {
    try {
      const result = await connectWallet();
      if (result && onConnect) {
        onConnect(result.address);
      }
      
      // Check if connected to Base Sepolia
      if (result.chainId !== BASE_SEPOLIA_CHAIN_ID) {
        setSwitchingNetwork(true);
        await switchNetwork(BASE_SEPOLIA_CHAIN_ID);
        setSwitchingNetwork(false);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const isWrongNetwork = isConnected && chainId !== BASE_SEPOLIA_CHAIN_ID;

  return (
    <div className="flex flex-col space-y-2">
      {!isConnected ? (
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 border-scholarship-accent text-scholarship-primary hover:bg-scholarship-accent/10"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <LinkIcon className="h-4 w-4" />
              <span>Connect MetaMask</span>
            </>
          )}
        </Button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-scholarship-accent/10 rounded-md">
            <span className="text-sm font-medium text-scholarship-primary">
              {formatAddress(address || '')}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDisconnect}
              className="h-8 px-2 text-scholarship-primary hover:text-scholarship-danger hover:bg-red-50"
            >
              <UnlinkIcon className="h-4 w-4" />
            </Button>
          </div>
          
          {isWrongNetwork && (
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={() => switchNetwork(BASE_SEPOLIA_CHAIN_ID)}
              disabled={switchingNetwork}
            >
              {switchingNetwork ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span>Switching...</span>
                </>
              ) : (
                <span>Switch to Base Sepolia</span>
              )}
            </Button>
          )}
        </div>
      )}
      
      {error && (
        <p className="text-destructive text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};
