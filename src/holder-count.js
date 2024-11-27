const { Connection, PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');

async function getTokenHolderCount(tokenMintAddress) {
  // Connect to Solana network (replace with your preferred RPC endpoint)
  const connection = new Connection('https://serene-autumn-shape.solana-mainnet.quiknode.pro/fb3256e1455d0f9b56753ffc0e95a5d2b4e79817', 'confirmed');

  try {
    // Get all token accounts for this mint
    const tokenAccounts = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
            dataSize: 165, // Size of token account state
          },
          {
            memcmp: {
              offset: 0,
              bytes: tokenMintAddress // Token mint address
            }
          }
        ]
      }
    );

    // Filter out accounts with non-zero token balance
    const activeHolders = tokenAccounts.filter(
      account => account.account.data.parsed.info.tokenAmount.amount !== '0'
    );

    return activeHolders.length;
  } catch (error) {
    console.error('Error fetching token holders:', error);
    return 0;
  }
}

// Example usage
const MINT = 'H4WrSjmkgN6Np3dJWGPicduj7SV9pGRwAqSBxoKJ2jG4';
getTokenHolderCount(MINT)
  .then(count => console.log('Total active token holders:', count))
  .catch(console.error);