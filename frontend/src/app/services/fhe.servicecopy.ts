import { Injectable, NgZone } from '@angular/core';
import { ethers } from 'ethers';
import { from, Observable, of, throwError, timer } from 'rxjs';
import { catchError, concatMap, first, map, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const SDK_CDN_URL =
  'https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs';

declare const window: any;

export interface EncryptedResult {
  encryptedData: `0x${string}`;
  inputProof: `0x${string}`;
}

@Injectable({ providedIn: 'root' })
export class FheService1 {
  private instance: any | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  constructor(private ngZone: NgZone) {}

  /** Public entry point – call once (idempotent) */
  initialize1(): Promise<void> {
    console.log('FHEService1 initialize1 called');
    if (this.initialized) return Promise.resolve();
    if (this.initPromise) return this.initPromise;

    this.initPromise = this.ngZone.runOutsideAngular(() => this.doInitialize());
    return this.initPromise;
  }

  /** ------------------------------------------------------------------ */
  /** 1. Load SDK → initSDK() → createInstance()                        */
  /** ------------------------------------------------------------------ */
  private async doInitialize(): Promise<void> {
    // 1. Load the script + poll for window.relayerSDK
    await this.loadRelayerSDK();
    console.log('relayerSDK loaded');

    // 2. initSDK (global TFHE context – no options needed)
    if (!window.relayerSDK.__initialized__) {
      await window.relayerSDK.initSDK();
      window.relayerSDK.__initialized__ = true;
    }

    const config = {
      ...window.relayerSDK.SepoliaConfig,
      network: window.ethereum,
      aclContractAddress:
        window.relayerSDK.SepoliaConfig.aclContractAddress ||
        '0x687820221192C5B662b25367F70076A37bc79b6c',
      kmsVerifierAddress: '0x9D6891A6240D6130c54ae243d8005063D05fE14b', // ← Add this
      gatewayUrl: 'https://gateway.testnet.zama.ai', // ← Add this
    };

    // Verify we're on Sepolia
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    if (network.chainId !== 11155111n) {
      throw new Error(
        `Wrong network. Please switch to Sepolia testnet (chain ID 11155111)`
      );
    }

    const code = await provider.getCode(environment.contractAddress);
    if (code === '0x') {
      throw new Error(
        'Contract not found at address: ' + environment.contractAddress
      );
    }

    // 3. Create the instance
    // this.instance = await window.relayerSDK.createInstance(config);
    console.log(
      window.relayerSDK.SepoliaConfig,
      '##############fhevm sepolia config'
    );
  
   
    this.instance = await window.relayerSDK.createInstance({
      ...window.relayerSDK.SepoliaConfig,
      network: window.ethereum, // override/add the network field
      gatewayUrl: "https://gateway.testnet.zama.ai", // NEW in v0.9
    });

    this.initialized = true;
    console.log('FHEVM instance ready');
  }

  /** ------------------------------------------------------------------ */
  /** 2. Load SDK from CDN + exponential back-off polling                */
  /** ------------------------------------------------------------------ */
  private loadRelayerSDK(): Promise<void> {
    // If already on window → resolve immediately
    if ((window as any).relayerSDK?.initSDK) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SDK_CDN_URL;
      script.async = true;

      const maxAttempts = 12; // ~ 40 s total
      let attempt = 0;
      const poll = () => {
        if ((window as any).relayerSDK?.initSDK) {
          console.log(`relayerSDK ready after ${attempt} attempts`);
          resolve();
          return;
        }
        attempt++;
        if (attempt >= maxAttempts) {
          reject(new Error('relayer-sdk-js failed to load after max attempts'));
          return;
        }
        const delay = 100 * Math.pow(2, attempt - 1); // 100,200,400,...
        setTimeout(poll, delay);
      };

      script.onload = () => {
        console.log('relayer-sdk-js script loaded, start polling...');
        poll();
      };
      script.onerror = () => reject(new Error('Failed to load relayer-sdk-js'));

      document.head.appendChild(script);
    });
  }

 

  /** ------------------------------------------------------------------ */
  /** 6. Convenience helpers                                            */
  /** ------------------------------------------------------------------ */
  isReady(): boolean {
    return this.initialized && this.instance !== null;
  }

  getInstance(): any {
    if (!this.instance) throw new Error('FHEVM not ready');
    return this.instance;
  }

 

  async encryptRange(
    minSalary: number,
    maxSalary: number,
    userAddress: string,
    contractAddress: string
  ): Promise<{
    encryptedMin: any;
    encryptedMax: any;
    proof: any;
  }> {
    if (!this.instance) {
      throw new Error('FHE not initialized1');
    }

    if (minSalary > maxSalary) {
      throw new Error('Min must be <= max');
    }

    try {
      console.log('=== Encryption Request ===');
      console.log('Contract:', contractAddress);
      console.log('User:', userAddress);
      console.log('Values:', { min: minSalary, max: maxSalary });

      // Ensure addresses are properly formatted
      const checksummedContract = ethers.getAddress(contractAddress);
      const checksummedUser = ethers.getAddress(userAddress);

      console.log('Using addresses:');
      console.log('  Contract:', checksummedContract);
      console.log('  User:', checksummedUser);

      // Verify contract code one more time right before encryption
      const provider = new ethers.BrowserProvider(window.ethereum);
      const code = await provider.getCode(checksummedContract);
      console.log('Contract bytecode length:', code.length);

      if (code === '0x') {
        throw new Error('Contract not found at: ' + checksummedContract);
      }

      // Create input with checksummed addresses
      console.log('Creating encrypted input...');
      const input = this.instance.createEncryptedInput(
        checksummedContract,
        checksummedUser
      );

      console.log('Adding values...');
      input.add64(minSalary);
      input.add64(maxSalary);

      // Log the internal state if available
      console.log('Input internal state:', {
        contractAddress: (input as any)._input?.contractAddress,
        userAddress: (input as any)._input?.userAddress,
        values: (input as any)._input?.values,
      });

      console.log('Calling encrypt (this contacts the relayer)...');
      const encrypted = await input.encrypt();

      console.log('✓ Encryption successful!');
      console.log('Result structure:', {
        handles: encrypted.handles?.length,
        handleTypes: encrypted.handles?.map((h: any) => typeof h),
        proofType: typeof encrypted.inputProof,
        proofLength: encrypted.inputProof?.length,
      });

      return {
        encryptedMin: encrypted.handles[0],
        encryptedMax: encrypted.handles[1],
        proof: encrypted.inputProof,
      };
    } catch (error: any) {
      console.error('=== Encryption Failed ===');
      console.error('Error:', error);

      // Try to extract detailed error info
      if (error?.message) {
        console.error('Message:', error.message);

        // Parse the JSON error from relayer
        const jsonMatch = error.message.match(/Content: (\{.*\})/);
        if (jsonMatch) {
          try {
            const errorContent = JSON.parse(jsonMatch[1]);
            console.error('Relayer error details:', errorContent);

            // Make the error message more user-friendly
            if (
              errorContent.message?.includes(
                'backend connection task has stopped'
              )
            ) {
              throw new Error(
                'Zama relayer is temporarily unavailable. ' +
                  'This is usually temporary - please try again in a few minutes. ' +
                  'If the issue persists, the contract may need to be redeployed or ' +
                  'the relayer may be experiencing downtime.'
              );
            }
          } catch (parseError) {
            console.error('Could not parse error JSON');
          }
        }
      }

      throw error;
    }
  }

 

  async diagnoseContract(contractAddress: string): Promise<void> {
    console.log('=== Contract Diagnosis ===');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const checksummed = ethers.getAddress(contractAddress);

    // 1. Check contract exists
    const code = await provider.getCode(checksummed);
    console.log('✓ Contract exists:', code !== '0x');
    console.log('  Bytecode size:', code.length, 'bytes');

    // 2. Check network
    const network = await provider.getNetwork();
    console.log('✓ Network:', network.chainId, network.name);
    console.log('  Expected: 11155111 (Sepolia)');
    console.log('  Match:', network.chainId === 11155111n);

    // 3. Check SDK config
    console.log('✓ SDK Config:');
    console.log('  ACL:', window.relayerSDK.SepoliaConfig.aclContractAddress);
    console.log('  KMS:', window.relayerSDK.SepoliaConfig.kmsVerifierAddress);
    console.log('  Gateway:', window.relayerSDK.SepoliaConfig.gatewayUrl);

    // 4. Check instance
    console.log('✓ FHE Instance:');
    console.log('  Created:', this.instance !== null);
    console.log(
      '  Has public key:',
      this.instance?.hasPublicKey?.() ?? 'unknown'
    );

    // 5. Try a simple test
    try {
      const testInput = this.instance.createEncryptedInput(
        checksummed,
        checksummed
      );
      console.log('✓ Can create input: true');
    } catch (e) {
      console.error('✗ Cannot create input:', e);
    }
  }

  async decryptAndGetProof(
    handles: string[],
    requestId?: number
  ): Promise<{
    plaintexts: (boolean | bigint)[];
    proof: `0x${string}`;
  }> {
    if (!this.instance) throw new Error('FHEVM instance not initialized');

    // Use a proper unique requestId (Date.now() is fine)
    const rid = requestId ?? Date.now();

    // The relayer SDK supports batch decryption via .decrypt()
    // It automatically registers the requestId internally
    const plaintexts: (boolean | bigint)[] = [];

    for (const handle of handles) {
      // handle is bytes32 string like "0xabc123..."
      const pt = await this.instance.decrypt(handle);
      plaintexts.push(pt);
    }

    // Get the re-encryption proof for this requestId
    // This is the same proof expected by FHE.checkSignatures()
    const proof = this.instance.getReencryptionProof(rid);

    return { plaintexts, proof: proof as `0x${string}` };
  }

  



async publicDecryptHandles(
  handles: string[],
  contractAddress: string
): Promise<{
  cleartexts: any[];
  proof: string;
  requestId: number;
}> {
  if (!this.instance) throw new Error('FHEVM instance not initialized');
  
  console.log('Starting public decryption:', { handles, contractAddress });
  
  try {
    const requestId = Date.now();
    
    // Call publicDecrypt on the instance
    // This contacts the Zama Relayer/Gateway
    const result = await this.instance.publicDecrypt(handles, contractAddress);
    
    console.log('Decryption result:', result);
    
    // Extract the data - format may vary
    const cleartexts = Array.isArray(result) ? result : (result.plaintexts || result.cleartexts || []);
    const proof = result.proof || result.signature || '0x';
    
    return {
      cleartexts,
      proof,
      requestId
    };
  } catch (error: any) {
    console.error('Public decryption error:', error);
    throw error;
  }
}




// Optional: Add a simpler method for testing





// Replace your decryptMatchResults and testDecryption methods with these:




async decryptMatchResults(
  hasMatchHandle: string,
  meetingPointHandle: string,
  requestId: number
): Promise<{
  hasMatch: boolean;
  meetingPoint: bigint;
  proof: string;
}> {
  if (!this.instance) throw new Error('FHEVM instance not initialized');
  
  console.log('=== Starting Decryption (v0.9 API) ===');
  console.log('Handles:', { hasMatchHandle, meetingPointHandle });
  console.log('RequestId:', requestId);
  
  try {
    // Call publicDecrypt with both handles
    console.log('Calling publicDecrypt with both handles...');
    
    const result = await this.instance.publicDecrypt([
      hasMatchHandle,
      meetingPointHandle
    ]);
    
    console.log('✅ PublicDecrypt successful!');
    console.log('Result type:', typeof result);
    console.log('Result is array:', Array.isArray(result));
    
    // Log result carefully (avoiding BigInt serialization issue)
    if (result && typeof result === 'object') {
      console.log('Result keys:', Object.keys(result));
    }
    
    let hasMatch: boolean;
    let meetingPoint: bigint;
    let proof: string = '0x';
    
    // The result structure from publicDecrypt v0.9:
    // {
    //   clearValues: { [handle: string]: boolean | bigint },
    //   abiEncodedClearValues: string,
    //   decryptionProof: string
    // }
    
    if (result.clearValues) {
      console.log('Found clearValues in result');
      
      // Extract values from clearValues object
      // The keys are the handles we passed in
      const values = Object.values(result.clearValues);
      
      console.log('Number of decrypted values:', values.length);
      
      if (values.length >= 2) {
        hasMatch = Boolean(values[0]);
        meetingPoint = BigInt(values[1] as string | number | bigint | boolean);
        proof = result.decryptionProof || '0x';
        
        console.log('✅ Decryption successful!');
        console.log('  Has match:', hasMatch);
        console.log('  Meeting point:', meetingPoint.toString()); // Convert to string for logging
        console.log('  Proof length:', proof.length);
        
        return { hasMatch, meetingPoint, proof };
      } else {
        throw new Error(`Expected 2 values, got ${values.length}`);
      }
    }
    
    // Fallback: try to access by handle directly
    if (result[hasMatchHandle] !== undefined && result[meetingPointHandle] !== undefined) {
      console.log('Found values by handle key');
      hasMatch = Boolean(result[hasMatchHandle]);
      meetingPoint = BigInt(result[meetingPointHandle]);
      proof = result.decryptionProof || result.proof || '0x';
      
      console.log('✅ Decryption successful!');
      console.log('  Has match:', hasMatch);
      console.log('  Meeting point:', meetingPoint.toString());
      console.log('  Proof length:', proof.length);
      
      return { hasMatch, meetingPoint, proof };
    }
    
    // If we get here, the structure is unexpected
    console.error('Unexpected result structure');
    console.error('Available properties:', Object.keys(result));
    throw new Error('Could not extract values from decryption result');
    
  } catch (error: any) {
    console.error('=== Decryption Failed ===');
    console.error('Error message:', error.message);
    
    // Don't try to stringify - it might contain BigInt
    if (error.stack) {
      console.error('Error stack:', error.stack.split('\n').slice(0, 3).join('\n'));
    }
    
    // Check for "not ready" errors
    if (error.message?.includes('not ready') || 
        error.message?.includes('not available') ||
        error.message?.includes('not decryptable') ||
        error.message?.includes('pending')) {
      throw new Error('Decryption not ready yet. Please wait a moment and try again.');
    }
    
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

// Fixed test method too
async testDecryption(handle: string): Promise<any> {
  if (!this.instance) throw new Error('FHEVM instance not initialized');
  
  console.log('=== Testing Decryption ===');
  console.log('Testing handle:', handle);
  
  try {
    const result = await this.instance.publicDecrypt([handle]);
    
    console.log('✓ Test decryption successful!');
    console.log('  Result type:', typeof result);
    
    // Don't stringify - might contain BigInt
    if (result.clearValues) {
      const value = Object.values(result.clearValues)[0];
      console.log('  Decrypted value:', typeof value === 'bigint' ? value.toString() : value);
      return value;
    }
    
    return result;
  } catch (error: any) {
    console.error('✗ Test failed:', error.message);
    throw error;
  }
}


// Alternative: Test with contract address
async testDecryptionWithContract(handle: string, contractAddress: string): Promise<any> {
  if (!this.instance) throw new Error('FHEVM instance not initialized');
  
  console.log('=== Testing Decryption With Contract ===');
  console.log('Handle:', handle);
  console.log('Contract:', contractAddress);
  
  try {
    // Some SDK versions might require the contract address
    const result = await this.instance.publicDecrypt([handle], contractAddress);
    
    console.log('✓ Result:', result);
    return result;
  } catch (error: any) {
    console.error('✗ Failed:', error.message);
    
    // Try without contract address
    console.log('Retrying without contract address...');
    const result = await this.instance.publicDecrypt([handle]);
    console.log('✓ Result (no contract):', result);
    return result;
  }
}


}
