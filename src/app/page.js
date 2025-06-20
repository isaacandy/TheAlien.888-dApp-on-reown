"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from './components/Navbar';
import MintModal from './components/MintModal';
import dynamic from 'next/dynamic';
import abi from '../../public/abi.json';
import Image from 'next/image';

// Set your contract address here
const CONTRACT_ADDRESS = '0x295a6a847e3715f224826aa88156f356ac523eef';

const ReownAppKitScript = dynamic(() => import('./components/ReownAppKitScript'), { ssr: false });

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [mintedCount, setMintedCount] = useState('...');
  const [price, setPrice] = useState('0.075');
  const [mintAmount, setMintAmount] = useState(1);
  const [status, setStatus] = useState('');
  const [reownLoaded, setReownLoaded] = useState(false);

  // Reown AppKit wallet connect logic
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.ReownAppKit) {
        setReownLoaded(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    setStatus('Connecting wallet...');
    if (typeof window !== 'undefined' && window.ReownAppKit) {
      if (!window.reownAppKit) {
        window.reownAppKit = new window.ReownAppKit.AppKit({
          projectId: '3676237887ce87c067bca62af19ff039',
          chains: [1],
          theme: 'dark',
        });
      }
      try {
        const reownProvider = await window.reownAppKit.connect();
        const ethers = (await import('ethers')).ethers;
        const providerInstance = new ethers.providers.Web3Provider(reownProvider);
        const signerInstance = providerInstance.getSigner();
        const userAddress = await signerInstance.getAddress();
        setWalletAddress(userAddress);
        setProvider(providerInstance);
        setSigner(signerInstance);
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signerInstance);
        setContract(contractInstance);
        setStatus('Wallet connected!');
        // Fetch minted count
        try {
          const totalMinted = await contractInstance.totalSupply();
          setMintedCount(totalMinted.toString());
        } catch (err) {
          setMintedCount('N/A');
        }
      } catch (err) {
        setStatus('Wallet connection cancelled.');
      }
    } else {
      setStatus('Reown AppKit not loaded.');
    }
  };

  // Mint logic
  const handleMint = async () => {
    if (!contract || !signer) {
      setStatus('Connect your wallet first.');
      return;
    }
    setStatus('Minting...');
    try {
      const pricePerNFT = await contract.PRICE();
      const totalPrice = pricePerNFT.mul(mintAmount);
      const tx = await contract.mint(walletAddress, mintAmount, { value: totalPrice });
      await tx.wait();
      setStatus('Minted!');
      // Refresh minted count
      const totalMinted = await contract.totalSupply();
      setMintedCount(totalMinted.toString());
    } catch (err) {
      setStatus('Mint failed: ' + (err.reason || err.message));
    }
  };

  return (
    <>
      <Head>
        <title>TheAlien888 Generative 10k Unique & Rare NFT Collection</title>
        <meta name="description" content="Welcome to TheAlienM.888 official NFT Portal. Mint your unique NFT!" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'TheAlien888 #1',
            image: ['https://ipfs.raribleuserdata.com/ipfs/QmYtaS4683Nzv6xJNKk9DHTjXDn2AHuVB6S73iyMebHtjN/0003.png'],
            description: 'A unique NFT from TheAlien888 Generative 10,000 NFT Collection.',
            brand: { '@type': 'Brand', name: 'TheAlien888' },
            offers: { '@type': 'Offer', priceCurrency: 'ETH', price: '0.075', availability: 'https://schema.org/InStock', url: 'https://thealien888.iznd.xyz/mint.html' }
          })
        }} />
      </Head>
      <ReownAppKitScript />
      <Navbar />
      <div className="bgall"></div>
      <div className="stars">
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <div className="bgimg-1">
        <div className="content">
          <div id="root">
            {/* Hero Section Example */}
            <section className="hero-section" style={{ textAlign: 'center', padding: '60px 0' }}>
              <Image src="/config/images/web/TheAlien888Showcase.png" alt="TheAlien888" width={320} height={320} style={{ maxWidth: '320px', width: '100%', margin: '0 auto', borderRadius: '24px', boxShadow: '0 4px 24px #0007' }} />
              <h1 style={{ fontFamily: 'Geometr415 Blk BT,sans-serif', fontSize: '2.5em', color: '#00e676', margin: '24px 0 12px' }}>TheAlien888 Generative NFT</h1>
              <p style={{ fontSize: '1.2em', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>Mint your unique and rare TheAlien888 NFT from the 10,000 generative collection. Connect your wallet and join the iZNDverse!</p>
            </section>
          </div>
        </div>
      </div>
      <main>
        <div className="mint-now-bottom">
          <button className="mint-now-btn" onClick={() => setModalOpen(true)}>MINT NOW</button>
        </div>
        <MintModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConnect={handleConnect}
          onMint={handleMint}
          walletAddress={walletAddress}
          mintedCount={mintedCount}
          price={price}
          mintAmount={mintAmount}
          setMintAmount={setMintAmount}
          status={status}
          reownLoaded={reownLoaded}
        />
      </main>
    </>
  );
}
