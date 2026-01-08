# Polymarket Credential Manager

A web-based interface for managing Polymarket credentials and transferring funds between accounts.

## Features

- **Credential Management**: Securely load and display Polymarket API credentials
- **Fund Transfer**: Transfer funds (USDC) from your account to another address
- **Balance Checking**: View balances for USDC, ETH, and MATIC tokens
- **Transaction History**: Track all fund transfers with detailed information
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build process required - pure HTML/CSS/JavaScript

### Installation

1. Clone this repository:
```bash
git clone https://github.com/rkendel1/creds.git
cd creds
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply drag and drop `index.html` into your browser.

## Usage

### Loading Credentials

1. Click the **"Load Credentials"** button to load the default Polymarket credentials
2. Your credentials will be displayed with sensitive information partially masked
3. The account address will automatically populate in the transfer form

### Checking Balance

1. After loading credentials, click **"Check Balance"** to view your account balances
2. The interface will display balances for USDC, ETH, and MATIC

### Transferring Funds

1. Ensure credentials are loaded
2. Enter the destination address (must be a valid Ethereum address starting with 0x)
3. Enter the amount in USDC you wish to transfer
4. Optionally adjust the gas limit (defaults to 21000)
5. Click **"Transfer Funds"**
6. The transaction will be processed and appear in the Transaction History section

### Transaction History

All completed transfers are displayed in the Transaction History section, showing:
- Transfer amount
- From and to addresses
- Gas limit used
- Transaction hash
- Timestamp
- Status

## Default Credentials

The application comes pre-configured with the following credentials:

```json
{
  "address": "0xda2dECcf1C802fde00cDedBb9AcF7bD2a191b263",
  "apiKey": "8c478ebe-dfd6-52b6-1b5e-794a4f78eda8",
  "secret": "0EMa6ibLCmr-vvoYWd1rO0f5_yaaTXf8Wb5zqyED6pU=",
  "passphrase": "7b218b74c4503875287335cd1aff94bb77d53dffa66eba63fde5ce487a7a0cab",
  "generatedAt": "2025-11-22T18:52:41.729Z"
}
```

## Security Considerations

⚠️ **Important Security Notes:**

- This is a demonstration interface and simulates blockchain transactions
- Never use this application on untrusted networks or public computers
- Always verify transaction details before confirming any transfer
- Keep your credentials secure and never share them with others
- For production use, implement proper encryption and secure credential storage
- Consider using hardware wallets for managing large amounts of funds

## Technical Details

### File Structure

```
creds/
├── index.html      # Main HTML interface
├── styles.css      # Styling and responsive design
├── app.js          # Application logic and functionality
└── README.md       # This file
```

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Technologies Used

- Pure HTML5
- CSS3 with custom properties (CSS variables)
- Vanilla JavaScript (ES6+)
- No external dependencies or frameworks

## Customization

### Modifying Default Credentials

Edit the `defaultCredentials` object in `app.js`:

```javascript
const defaultCredentials = {
    address: "YOUR_ADDRESS",
    apiKey: "YOUR_API_KEY",
    secret: "YOUR_SECRET",
    passphrase: "YOUR_PASSPHRASE",
    generatedAt: "TIMESTAMP"
};
```

### Styling

All styles are contained in `styles.css`. You can customize colors by modifying CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #4f46e5;
    --success-color: #10b981;
    /* ... other variables ... */
}
```

## Limitations

- This is a client-side simulation and does not connect to actual blockchain networks
- Transaction processing is simulated with mock data
- Balance checking returns randomized sample data
- For real blockchain integration, you would need to integrate Web3 libraries and connect to Polymarket's API

## Future Enhancements

Potential improvements for production use:
- Integration with Web3.js or ethers.js for real blockchain transactions
- Connection to Polymarket's actual API
- Wallet connection (MetaMask, WalletConnect)
- Multi-signature transaction support
- Advanced transaction options (custom gas prices, etc.)
- Export transaction history
- Encrypted local storage for credentials
- Multi-account management

## License

This project is provided as-is for demonstration purposes.

## Contributing

Feel free to submit issues and enhancement requests!

---

**Disclaimer**: This software is for demonstration purposes only. Always exercise caution when handling cryptocurrency and API credentials.