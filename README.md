# FairPay Barebone Angular Frontend

Minimal functional frontend using latest Zama Relayer SDK and Ethers v6.


## 🔑 Features Implemented

### Wallet Connection
- ✅ MetaMask integration
- ✅ Network detection (Sepolia)
- ✅ Auto-reconnection
- ✅ Balance display
- ✅ Network switching

### Create Negotiation
- ✅ Form validation (address, title, deadline)
- ✅ Transaction submission
- ✅ Success/error handling
- ✅ Navigation to details

### List Negotiations
- ✅ Load user negotiations
- ✅ Display as employer/candidate
- ✅ Show state and time remaining
- ✅ Show match results
- ✅ Click to view details

### Negotiation Details 
- ✅ **State 0**: Employer can submit range, candidate waits
- ✅ **State 1**: Candidate can submit range, employer waits
- ✅ **State 2**: Validating (loading spinner)
- ✅ **State 3**: Calculating match (loading spinner)
- ✅ **State 4 + Match**: Show meeting point, celebration
- ✅ **State 4 + No Match**: Show no match, privacy notice
- ✅ **Expired**: Block submissions, show expired message
- ✅ **Not participant**: Error message
- ✅ **Auto-refresh**: Every 10 seconds
- ✅ **Live countdown**: Updates every second
- ✅ **Event listening**: Instant updates on match reveal
- ✅ **Form validation**: Min <= max, reasonable limits
- ✅ **FHE encryption**: Encrypt before submit
- ✅ **Error handling**: User-friendly messages


## 🔐 FHE Flow

1. User enters salary range (plain numbers)
2. Click submit → FHE service encrypts values
3. Encrypted values + proof sent to contract
4. Contract validates on encrypted data
5. Gateway decrypts only the result
6. UI updates with match/no-match

## 📊 State Machine

```
NOT_STARTED (0)
    ↓ (employer submits)
EMPLOYER_SUBMITTED (1)
    ↓ (candidate submits)
CANDIDATE_PENDING_VALIDATION (2)
    ↓ (validation callback)
CANDIDATE_SUBMITTED (3)
    ↓ (match calculation)
COMPLETED (4)
```

## 🎯 Edge Cases Handled

1. **Wallet not connected** → Show connect prompt
2. **Wrong network** → Show switch button
3. **Expired negotiation** → Block submissions
4. **Not employer/candidate** → Read-only view
5. **Pending validation** → Show spinner
6. **Calculating match** → Show spinner + info
7. **Match found** → Celebrate + show amount
8. **No match** → Privacy message
9. **Form invalid** → Disable submit
10. **Transaction error** → Show error message
11. **Load error** → Show error + retry
12. **No negotiations** → Empty state + create button

## 🛠️ Dependencies Used

- **ethers v6** - Web3 interactions
- **@zama-fhe/relayer-sdk** - FHE encryption
- **Angular 18** - Framework (standalone components)
- **RxJS** - State management
- **TypeScript** - Type safety


## 🔗 Important Links

- [Zama Relayer SDK Docs](https://docs.zama.ai/protocol/relayer-sdk-guides/fhevm-relayer/initialization)
- [Ethers v6 Docs](https://docs.ethers.org/v6/)
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [MetaMask](https://metamask.io/)


## 📦 Installation

```bash

npm install 

```

## 🚀 Run

```bash
# Development
ng serve

# Production build
ng build --configuration production
```
Navigate to `http://localhost:4200`

## 📁 structure


```
src/app/
├── components/
│   ├── wallet/
│   │   ├── wallet.component.ts
│   │   ├── wallet.component.html
│   │   └── wallet.component.css
│   ├── create/
│   │   ├── create.component.ts
│   │   ├── create.component.html
│   │   └── create.component.css
│   ├── list/
│   │   ├── list.component.ts
│   │   ├── list.component.html
│   │   └── list.component.css
│   └── details/
│       ├── details.component.ts
│       ├── details.component.html
│       └── details.component.css
├── services/
│   ├── wallet.service.ts
│   ├── contract.service.ts
│   └── fhe.service.ts
├── models/
│   └── negotiation.ts (create this folder)
├── app.component.ts
├── app.component.html (extract from app.component.ts comments)
├── app.component.css (extract from app.component.ts comments)
└── app.routes.ts
```

## ⚙️ Configuration

1. **Create environments folder** if not exists:
```bash
mkdir -p src/environments
```

2. **Create `src/environments/environment.ts`**:
```typescript
export const environment = {
  production: false,
  contractAddress: '0xYourDeployedContractAddress', // UPDATE!
  relayerUrl: 'https://relayer.sepolia.zama.ai',
  chainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org'
};
```

3. **Update `angular.json`** to include environments:
```json
{
  "projects": {
    "fairpay-app": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

## 🐛 Troubleshooting

### "Cannot find module '@zama-fhe/relayer-sdk'"
```bash
npm install @zama-fhe/relayer-sdk --force
```

### "FHE not initialized"
Check relayerUrl is correct in environment.ts

### "Contract not initialized"
Update contractAddress in environment.ts

### "Network error"
Check you're on Sepolia testnet

## 📄 License

BSD-3-Clause-Clear

---

Built with Angular 18 + Zama FHE + Ethers v6

