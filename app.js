// Polymarket Credential Manager Application

// Default credentials from the issue
const defaultCredentials = {
    address: "0xda2dECcf1C802fde00cDedBb9AcF7bD2a191b263",
    apiKey: "8c478ebe-dfd6-52b6-1b5e-794a4f78eda8",
    secret: "0EMa6ibLCmr-vvoYWd1rO0f5_yaaTXf8Wb5zqyED6pU=",
    passphrase: "7b218b74c4503875287335cd1aff94bb77d53dffa66eba63fde5ce487a7a0cab",
    generatedAt: "2025-11-22T18:52:41.729Z"
};

// Application state
let currentCredentials = null;
let transactionHistory = [];

// DOM Elements
const loadCredentialsBtn = document.getElementById('load-credentials-btn');
const clearCredentialsBtn = document.getElementById('clear-credentials-btn');
const credentialsDisplay = document.getElementById('credentials-display');
const transferForm = document.getElementById('transfer-form');
const fromAddress = document.getElementById('from-address');
const toAddress = document.getElementById('to-address');
const amountInput = document.getElementById('amount');
const gasLimitInput = document.getElementById('gas-limit');
const transferBtn = document.getElementById('transfer-btn');
const transferStatus = document.getElementById('transfer-status');
const balanceDisplay = document.getElementById('balance-display');
const checkBalanceBtn = document.getElementById('check-balance-btn');
const transactionHistoryDiv = document.getElementById('transaction-history');
const generatedDateSpan = document.getElementById('generated-date');

// Initialize the application
function init() {
    loadCredentialsBtn.addEventListener('click', loadCredentials);
    clearCredentialsBtn.addEventListener('click', clearCredentials);
    transferForm.addEventListener('submit', handleTransfer);
    checkBalanceBtn.addEventListener('click', checkBalance);
    
    // Set generated date
    if (defaultCredentials.generatedAt) {
        generatedDateSpan.textContent = new Date(defaultCredentials.generatedAt).toLocaleString();
    }
    
    updateUI();
}

// Load credentials
function loadCredentials() {
    currentCredentials = { ...defaultCredentials };
    displayCredentials();
    fromAddress.value = currentCredentials.address;
    
    // Enable buttons
    clearCredentialsBtn.disabled = false;
    transferBtn.disabled = false;
    checkBalanceBtn.disabled = false;
    
    showMessage('Credentials loaded successfully', 'success');
    updateUI();
}

// Display credentials
function displayCredentials() {
    if (!currentCredentials) {
        credentialsDisplay.innerHTML = '<p class="info-message">No credentials loaded. Click "Load Credentials" to begin.</p>';
        return;
    }
    
    credentialsDisplay.innerHTML = `
        <div class="credential-item">
            <span class="credential-label">Address:</span>
            <span class="credential-value">${currentCredentials.address}</span>
        </div>
        <div class="credential-item">
            <span class="credential-label">API Key:</span>
            <span class="credential-value">${maskString(currentCredentials.apiKey)}</span>
        </div>
        <div class="credential-item">
            <span class="credential-label">Secret:</span>
            <span class="credential-value">${maskString(currentCredentials.secret)}</span>
        </div>
        <div class="credential-item">
            <span class="credential-label">Passphrase:</span>
            <span class="credential-value">${maskString(currentCredentials.passphrase)}</span>
        </div>
        <div class="credential-item">
            <span class="credential-label">Generated At:</span>
            <span class="credential-value">${new Date(currentCredentials.generatedAt).toLocaleString()}</span>
        </div>
    `;
}

// Clear credentials
function clearCredentials() {
    if (confirm('Are you sure you want to clear the credentials?')) {
        currentCredentials = null;
        fromAddress.value = '';
        
        // Disable buttons
        clearCredentialsBtn.disabled = true;
        transferBtn.disabled = true;
        checkBalanceBtn.disabled = true;
        
        displayCredentials();
        balanceDisplay.innerHTML = '<p class="info-message">Load credentials to check balance</p>';
        showMessage('Credentials cleared', 'success');
        updateUI();
    }
}

// Handle fund transfer
async function handleTransfer(e) {
    e.preventDefault();
    
    if (!currentCredentials) {
        showMessage('Please load credentials first', 'error');
        return;
    }
    
    const toAddr = toAddress.value.trim();
    const amount = parseFloat(amountInput.value);
    const gasLimit = gasLimitInput.value ? parseInt(gasLimitInput.value) : 21000;
    
    // Validate inputs
    if (!isValidAddress(toAddr)) {
        showMessage('Invalid destination address', 'error');
        return;
    }
    
    if (amount <= 0) {
        showMessage('Amount must be greater than 0', 'error');
        return;
    }
    
    // Show processing message
    showMessage(`Processing transfer of ${amount} USDC to ${toAddr}...`, 'processing');
    transferBtn.disabled = true;
    
    // Simulate transaction processing
    setTimeout(() => {
        const transaction = {
            from: currentCredentials.address,
            to: toAddr,
            amount: amount,
            gasLimit: gasLimit,
            timestamp: new Date().toISOString(),
            status: 'success',
            txHash: generateMockTxHash()
        };
        
        transactionHistory.unshift(transaction);
        updateTransactionHistory();
        
        showMessage(`Transfer successful! Transaction hash: ${transaction.txHash}`, 'success');
        
        // Reset form
        toAddress.value = '';
        amountInput.value = '';
        gasLimitInput.value = '';
        
        transferBtn.disabled = false;
    }, 2000);
}

// Check balance
function checkBalance() {
    if (!currentCredentials) {
        showMessage('Please load credentials first', 'error');
        return;
    }
    
    showMessage('Checking balance...', 'processing');
    
    // Simulate balance check
    setTimeout(() => {
        const mockBalance = {
            usdc: (Math.random() * 1000).toFixed(2),
            eth: (Math.random() * 0.5).toFixed(4),
            matic: (Math.random() * 100).toFixed(2)
        };
        
        balanceDisplay.innerHTML = `
            <div class="balance-item">
                <span class="balance-label">USDC Balance:</span>
                <span class="balance-value">${mockBalance.usdc} USDC</span>
            </div>
            <div class="balance-item">
                <span class="balance-label">ETH Balance:</span>
                <span class="balance-value">${mockBalance.eth} ETH</span>
            </div>
            <div class="balance-item">
                <span class="balance-label">MATIC Balance:</span>
                <span class="balance-value">${mockBalance.matic} MATIC</span>
            </div>
        `;
        
        showMessage('Balance updated successfully', 'success');
    }, 1000);
}

// Update transaction history display
function updateTransactionHistory() {
    if (transactionHistory.length === 0) {
        transactionHistoryDiv.innerHTML = '<p class="info-message">No transactions yet</p>';
        return;
    }
    
    transactionHistoryDiv.innerHTML = transactionHistory.map(tx => `
        <div class="transaction-item ${tx.status}">
            <div class="transaction-header">
                <span class="transaction-type">Transfer: ${tx.amount} USDC</span>
                <span class="transaction-time">${new Date(tx.timestamp).toLocaleString()}</span>
            </div>
            <div class="transaction-details">
                <div><strong>From:</strong> ${tx.from}</div>
                <div><strong>To:</strong> ${tx.to}</div>
                <div><strong>Gas Limit:</strong> ${tx.gasLimit}</div>
                <div><strong>Status:</strong> ${tx.status}</div>
                <div><strong>TX Hash:</strong> ${tx.txHash}</div>
            </div>
        </div>
    `).join('');
}

// Show status message
function showMessage(message, type) {
    transferStatus.className = `transfer-status show ${type}`;
    transferStatus.textContent = message;
    
    setTimeout(() => {
        if (type !== 'processing') {
            transferStatus.className = 'transfer-status';
        }
    }, 5000);
}

// Update UI state
function updateUI() {
    // Any additional UI state updates can go here
}

// Utility Functions

// Mask sensitive strings
function maskString(str) {
    if (!str) return '';
    const visibleChars = 8;
    if (str.length <= visibleChars) return str;
    return str.substring(0, visibleChars) + '•'.repeat(Math.min(str.length - visibleChars, 20));
}

// Validate Ethereum address
function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Generate mock transaction hash
function generateMockTxHash() {
    return '0x' + Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
