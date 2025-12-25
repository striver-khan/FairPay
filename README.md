# FairPay 💼🔒

**Privacy-Preserving Salary Negotiation Platform using Fully Homomorphic Encryption (FHE)**

FairPay enables employers and candidates to negotiate salaries without revealing their acceptable ranges to each other. Using Zama's fhEVM technology, the platform calculates whether salary expectations overlap and finds the fair meeting point—all while keeping both parties' ranges completely private.

---

## 🌟 Features

- **🔐 Fully Private Negotiation**: Neither party ever sees the other's salary range
- **🎯 Fair Meeting Point**: Automatically calculates the midpoint of overlapping ranges
- **⛓️ Blockchain-Backed**: Smart contracts ensure trust and transparency
- **🔒 FHE-Powered**: Uses Fully Homomorphic Encryption for computation on encrypted data
- **✨ Modern UI**: Beautiful, responsive Angular interface
- **📱 Real-time Updates**: Live status tracking for negotiations

---

## 🏗️ Architecture

### Smart Contract (Solidity + fhEVM)
- Built with Zama's fhEVM v0.9 API
- Deployed on Ethereum Sepolia testnet
- Encrypted salary ranges stored on-chain
- Private match calculation using FHE operations

### Frontend (Angular 19)
- TypeScript-based SPA
- Zama Relayer SDK for encryption/decryption
- Ethers.js for blockchain interaction

### Technologies Used
- **Blockchain**: Ethereum Sepolia, Hardhat
- **Encryption**: Zama fhEVM (Fully Homomorphic Encryption)
- **Frontend**: Angular 19, TypeScript, Tailwind CSS
- **Smart Contracts**: Solidity 0.8.24
- **Web3**: Ethers.js v6, MetaMask

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** v18+ and npm
- **MetaMask** browser extension
- **Sepolia ETH** for gas fees ([Get from faucet](https://sepoliafaucet.com/))
- **Git** for cloning the repository

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/striver-khan/FairPay
cd fairpay
```

### 2. Backend Setup (Smart Contracts)

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PRIVATE_KEY=your_wallet_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.public.blastapi.io
ETHERSCAN_API_KEY=your_etherscan_api_key (optional, for verification)
```

**⚠️ Security Note**: Never commit your `.env` file. Add it to `.gitignore`.

Compile and deploy the smart contract:

```bash
npx hardhat compile
npx hardhat deploy --network sepolia
```

**📝 Save the deployed contract address** - you'll need it for the frontend!

### 3. Frontend Setup (Angular App)

```bash
cd ../frontend
npm install
```

Update `src/environments/environment.ts` with your contract address:

```typescript
export const environment = {
  production: false,
  contractAddress: '0xYourDeployedContractAddress', 
};
```

Start the development server:

```bash
ng serve
```

Open your browser to **http://localhost:4200**

---

## 🎮 How to Use FairPay

### For Employers:

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Create Negotiation**: 
   - Enter job title
   - Provide candidate's wallet address
   - Set negotiation deadline
3. **Submit Range**: 
   - Enter minimum acceptable salary (e.g., $80,000)
   - Enter maximum willing to pay (e.g., $120,000)
   - Click "Submit Encrypted Range"
4. **Wait for Candidate**: System waits for candidate to submit their range
5. **Reveal Result**: Once calculated, click "Reveal Match Result" to see outcome

### For Candidates:

1. **Connect Wallet**: Connect with MetaMask
2. **View Negotiation**: Navigate to the negotiation created by employer
3. **Submit Range**:
   - Enter minimum acceptable salary (e.g., $90,000)
   - Enter desired salary (e.g., $110,000)
   - Click "Submit Encrypted Range"
4. **Automatic Calculation**: Smart contract calculates match privately
5. **View Result**: See if ranges overlap and the fair meeting point

### Understanding Results:

- **✅ Match Found**: Ranges overlap! Shows the fair meeting point (midpoint)
- **❌ No Match**: Ranges don't overlap. Privacy preserved—neither party knows why
- **Meeting Point**: If match found, this is the recommended salary both can agree on

---

## 🔧 Project Structure

```
fairpay/
├── backend/                    # Smart contracts
│   ├── contracts/
│   │   └── FairPay.sol        # Main FHE contract
│   ├── scripts/
│   │   └── deploy.ts          # Deployment script
│   ├── hardhat.config.ts      # Hardhat configuration
│   └── package.json
│
└── frontend/                   # Angular application
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── list/      # Negotiations list
    │   │   │   ├── details/   # Negotiation details
    │   │   │   └── create/    # Create negotiation
    │   │   ├── services/
    │   │   │   ├── wallet.service.ts     # Web3 wallet
    │   │   │   ├── contract.service.ts   # Contract interaction
    │   │   │   └── fhe.service.ts        # FHE encryption
    │   │   └── models/
    │   │       └── negotiation.ts
    │   └── environments/
    │       └── environment.ts  # Config (contract address)
    └── package.json
```

---

## 🔐 How FHE Privacy Works

### The Magic Behind FairPay:

1. **Encryption**: 
   - Employer encrypts range: [80k, 120k] → encrypted ciphertext
   - Candidate encrypts range: [90k, 110k] → encrypted ciphertext

2. **On-Chain Computation** (All Encrypted!):
   ```solidity
   // Check if ranges overlap (without decrypting!)
   ebool hasMatch = FHE.and(
     FHE.le(candidateMin, employerMax),
     FHE.le(employerMin, candidateMax)
   );
   
   // Calculate meeting point (still encrypted!)
   euint64 overlapMin = FHE.select(...);
   euint64 overlapMax = FHE.select(...);
   euint64 meetingPoint = FHE.shr(FHE.add(overlapMin, overlapMax), 1);
   ```

3. **Public Decryption**:
   - Only the final result is decrypted
   - Individual ranges remain private forever
   - Zama Gateway handles secure decryption

### Privacy Guarantees:

- ✅ Employer never sees candidate's range
- ✅ Candidate never sees employer's range
- ✅ Only the final match result is revealed
- ✅ No one can reverse-engineer the inputs
- ✅ Blockchain provides immutable proof

---

## 🧪 Development

### Running Tests

```bash
cd backend
npx hardhat test
```

### Local Blockchain Development

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy to local
npx hardhat deploy --network localhost
```

### Building for Production

```bash
cd frontend
ng build --configuration production
```

---

## 📊 Smart Contract Functions

### Core Functions:

- `createNegotiation(candidate, title, deadline)` - Start new negotiation
- `submitEmployerRange(id, encMin, encMax, proof)` - Employer submits encrypted range
- `submitCandidateRange(id, encMin, encMax, proof)` - Candidate submits encrypted range
- `calculateMatch(id)` - Calculate if ranges overlap (automatic after both submit)
- `revealMatch(id, requestId, hasMatch, meetingPoint, cleartexts, proof)` - Reveal result

### View Functions:

- `getNegotiation(id)` - Get negotiation details
- `getUserNegotiations(address)` - Get user's negotiations
- `getMatchResult(id)` - Get revealed match result
- `isExpired(id)` - Check if deadline passed

---

## 🐛 Troubleshooting

### Common Issues:

**"Contract not initialized"**
- Ensure you've updated `environment.ts` with correct contract address
- Verify contract is deployed on Sepolia

**"Encryption failed"**
- Check MetaMask is connected to Sepolia network
- Ensure contract address is correct
- Try refreshing the page

**"Decryption not ready"**
- Zama Gateway needs 30s-2min to process encrypted values
- Wait a moment and click "Reveal Match Result" again
- Check browser console for detailed logs

**"Transaction failed"**
- Ensure you have enough Sepolia ETH for gas
- Check if deadline hasn't passed
- Verify you're the correct participant (employer/candidate)

**"Values not marked for decryption"**
- This is a contract issue - ensure `calculateMatch()` was called successfully
- Check transaction logs on Etherscan

---
- **Live Video Demo**: [demo](https://www.youtube.com/watch?v=e0zYYwtWx_E)
- **Live Demo**: [fairpay-six.vercel.com](https://fairpay-six.vercel.app/)
- **Zama fhEVM**: [docs.zama.ai/protocol](https://docs.zama.ai/protocol)


---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See [LICENSE](LICENSE) file for details.

---

## 💡 Use Cases

- **Corporate Hiring**: Fair salary negotiations for new hires
- **Promotions**: Private compensation discussions
- **Freelance Contracts**: Rate negotiations for contractors
- **Executive Search**: Confidential C-level salary negotiations
- **Recruiting Agencies**: Multiple candidate-employer matches

---

**Built with ❤️ using Fully Homomorphic Encryption**

*Making salary negotiations fair, private, and trustworthy.*
