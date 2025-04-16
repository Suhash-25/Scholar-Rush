
import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

export interface WalletState {
  provider: BrowserProvider | null;
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    provider: null,
    address: null,
    chainId: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      setWallet(prev => ({ ...prev, isConnecting: true, error: null }));

      // Request accounts from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      // Get chain ID
      const chainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
      const chainId = parseInt(chainIdHex, 16);

      // Create provider
      const provider = new BrowserProvider(window.ethereum);

      setWallet({
        provider,
        address,
        chainId,
        isConnected: true,
        isConnecting: false,
        error: null,
      });

      return { address, chainId, provider };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setWallet(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error : new Error('Failed to connect wallet'),
      }));
      throw error;
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWallet({
      provider: null,
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
  };

  // Switch network function
  const switchNetwork = async (targetChainId: number) => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      
      // Update chainId in state
      setWallet(prev => ({
        ...prev,
        chainId: targetChainId,
      }));
      
      return true;
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        // For Base Sepolia, we would add the network
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${targetChainId.toString(16)}`,
                chainName: 'Base Sepolia',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://sepolia.base.org'],
                blockExplorerUrls: ['https://sepolia.basescan.org'],
              },
            ],
          });
          
          // Update chainId in state
          setWallet(prev => ({
            ...prev,
            chainId: targetChainId,
          }));
          
          return true;
        } catch (addError) {
          console.error('Error adding network:', addError);
          throw addError;
        }
      }
      console.error('Error switching network:', error);
      throw error;
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else {
        // User switched accounts
        setWallet(prev => ({
          ...prev,
          address: accounts[0],
        }));
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      const chainId = parseInt(chainIdHex, 16);
      setWallet(prev => ({
        ...prev,
        chainId,
      }));
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' })
      .then((accounts: string[]) => {
        if (accounts.length > 0) {
          connectWallet().catch(console.error);
        }
      })
      .catch(console.error);

    return () => {
      if (!window.ethereum?.removeListener) return;
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return {
    ...wallet,
    connectWallet,
    disconnectWallet,
    switchNetwork,
  };
};

// Add type definition for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: any) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}
