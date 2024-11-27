const { Connection, PublicKey } = require('@solana/web3.js');
const { Metaplex } = require('@metaplex-foundation/js');

async function getTokenSocialLinks(tokenMintAddress) {
  const connection = new Connection('https://serene-autumn-shape.solana-mainnet.quiknode.pro/fb3256e1455d0f9b56753ffc0e95a5d2b4e79817');
  const metaplex = new Metaplex(connection);

  try {
    const mintPublicKey = new PublicKey(tokenMintAddress);
    const metadata = await metaplex.nfts().findByMint({ mintAddress: mintPublicKey });

    // Extract social links from token metadata
    const socialLinks = {
      website: metadata.uri ? metadata.uri : null,
      twitter: metadata.json?.twitter ? metadata.json.twitter : null,
      telegram: metadata.json?.telegram ? metadata.json.telegram : null,
      discord: metadata.json?.discord ? metadata.json.discord : null
    };

    return socialLinks;
  } catch (error) {
    console.error('Error fetching social links:', error);
    return null;
  }
}

// Example usage
const TOKEN_MINT_ADDRESS = 'H4WrSjmkgN6Np3dJWGPicduj7SV9pGRwAqSBxoKJ2jG4';
getTokenSocialLinks(TOKEN_MINT_ADDRESS)
  .then(links => console.log(links))
  .catch(console.error);