import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FheService {
  private instance: any | null = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
    
      this.initialized = true;
      console.log('FHE initialized');
    } catch (error) {
      console.error('FHE init failed:', error);
      throw error;
    }
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
      throw new Error('FHE not initialized0');
    }

    if (minSalary > maxSalary) {
      throw new Error('Min must be <= max');
    }

    try {
      const input = this.instance.createEncryptedInput(
        contractAddress,
        userAddress
      );

      input.add64(minSalary);
      input.add64(maxSalary);

      

      const encrypted = await input.encrypt();

      return {
        encryptedMin: encrypted.handles[0],
        encryptedMax: encrypted.handles[1],
        proof: encrypted.inputProof,
      };
    } catch (error) {
      console.error('Encryption failed:', error);
      throw error;
    }
  }

  isReady(): boolean {
    return this.initialized && this.instance !== null;
  }
}
