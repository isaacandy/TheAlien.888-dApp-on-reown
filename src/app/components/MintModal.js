import React from 'react';
import Image from 'next/image';

const MintModal = ({ isOpen, onClose, onConnect, onMint, walletAddress, mintedCount, price, mintAmount, setMintAmount, status }) => {
  if (!isOpen) return null;
  return (
    <div id="mint-modal" className="mint-modal-overlay">
      <div className="mint-modal-content">
        <button className="close-mint-modal" onClick={onClose}>&times;</button>
        <h2 className="mint-modal-title">Mint Your TheAlien888 NFT</h2>
        <div className="mint-modal-flex">
          <div className="mint-modal-info">
            <div className="minted-count">Minted: {mintedCount} / 10,000</div>
            <div className="mint-modal-price" style={{ fontSize: '1.2em', color: '#fff', marginBottom: 10 }}>Price: {price} ETH each</div>
            <div className="minting-widget-modal">
              <div className="mint-modal-wallet">{walletAddress ? `Wallet: ${walletAddress}` : ''}</div>
              <input type="number" min="1" max="10" value={mintAmount} onChange={e => setMintAmount(parseInt(e.target.value, 10))} className="mint-modal-input" />
              <label className="mint-modal-label">NFT(s)</label>
              <br />
              <button className="mint-modal-btn" onClick={onConnect} style={{ display: !walletAddress ? 'inline-block' : 'none' }}>Connect</button>
              <button className="mint-modal-btn" onClick={onMint} style={{ display: walletAddress ? 'inline-block' : 'none' }}>Mint</button>
              <div className="mint-modal-status">{status}</div>
            </div>
          </div>
          <Image src="/config/images/MintTheAlien.gif" alt="Mint The Alien" width={180} height={180} className="mint-alien-img-side" />
        </div>
      </div>
    </div>
  );
};

export default MintModal;
