import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ethers } from 'ethers';
import { environment } from '../../environments/environment';

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private walletState = new BehaviorSubject<WalletState>({
    connected: false,
    address: null,
    chainId: null,
    balance: null
  });

  public walletState$ = this.walletState.asObservable();
  public provider: ethers.BrowserProvider| ethers.JsonRpcProvider| null = null;
  public signer: ethers.Signer | null = null;

  constructor() {
    this.setupListeners();
    this.checkConnection();
  }

  private setupListeners(): void {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          this.disconnect();
        } else {
          this.updateState();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }

  private async checkConnection(): Promise<void> {
    if (typeof window.ethereum === 'undefined') return;

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });
      
      if (accounts.length > 0) {
        await this.connect();
      }
    } catch (error) {
      console.error('Check connection error:', error);
    }
  }

  async connect(): Promise<void> {
    if (environment.localProvider ) {
      // Local dev mode: Connect directly to Hardhat without MetaMask
      this.provider = new ethers.JsonRpcProvider(environment.localRpcUrl);
      const wallet = new ethers.Wallet(environment.localPrivateKey, this.provider);
      // this.signer = wallet.connect(this.provider);
      this.signer = wallet;
      await this.updateState();
      return;
    }
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not installed');
    }

    try {
      await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();

      await this.updateState();
    } catch (error: any) {
      throw new Error(error.message || 'Connection failed');
    }
  }

  private async updateState(): Promise<void> {
    if (!this.provider || !this.signer) return;

    try {
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);

      this.walletState.next({
        connected: true,
        address,
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance)
      });
    } catch (error) {
      console.error('Update state error:', error);
    }
  }

  async switchNetwork(chainId: number): Promise<void> {
    if (environment.localProvider ) {
      // In local dev, switching isn't needed (or throw/log if attempted)
      console.log('Switching networks not supported in local dev mode.');
      return;
    }
    if (typeof window.ethereum === 'undefined') return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + chainId.toString(16) }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        await this.addNetwork(chainId);
      } else {
        throw error;
      }
    }
  }

  private async addNetwork(chainId: number): Promise<void> {
    const networks: Record<number, any> = {
      11155111: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://rpc.sepolia.org'],
        blockExplorerUrls: ['https://sepolia.etherscan.io']
      }
    };

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networks[chainId]],
    });
  }

  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.walletState.next({
      connected: false,
      address: null,
      chainId: null,
      balance: null
    });
  }

  getSigner(): ethers.Signer {
    if (!this.signer) throw new Error('Wallet not connected');
    return this.signer;
  }

  getAddress(): string {
    const state = this.walletState.value;
    if (!state.address) throw new Error('No address');
    return state.address;
  }

  isCorrectNetwork(targetChainId: number): boolean {
    return this.walletState.value.chainId === targetChainId;
  }
}