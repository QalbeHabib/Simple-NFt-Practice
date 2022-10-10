import { useState, createContext, useEffect } from 'react';

// import { create as ipfsHttpClient } from 'ipfs-http-client';
import { NFTStorage, File, Blob } from 'nft.storage';
import nftFile from '../assets/nft6.jpeg';

const mime = require('mime');
const path = require('path');
const fs = require('fs');

console.log('filesystems', fs);
// import fs from 'fs';
// import Web3Modal from 'web3modal';
// import { ethers } from 'ethers';
// import axios from 'axios';
// import { MarketAddressABI, ContractDeployedOn } from './constant';
export const NFTContext = createContext();
const NFT_STORAGE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY4MTI1MTc3Njk1MEY1ZGMwQzZiOTY0YzAwNTlBQkI0MzNFNjYxQTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTM4MTExMjcyMCwibmFtZSI6Im5mdCJ9.BeEKoktynUTYrUJANW8sTby1DULZKjjMZHDm2-BYdA4';
console.log('api token', NFT_STORAGE_TOKEN);

export const NFTProvider = ({ children }) => {
  // const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');

  // checking if the wallet already connected
  const checkIfWalletConnected = async () => {
    if (!window.ethereum) {
      return alert('please install Metamask extension to your borowser');
    }
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('Wallet not Connected, please Connect the Wallet');
    }
  };
  // New Wallet connect
  const connectWallet = async () => {
    if (!window.ethereum) {
      return alert('please install Metamask extension to your borowser');
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    setCurrentAccount(accounts[0]);
    window.location.reload();
  };

  // UPloading file to IPFS

  async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath);
    // console.log('image content', content);
    const type = mime.getType(nftFile);
    console.log('image type', type);

    return new File([content], path.basename(filePath), { type });
  }
  const uploadToIPFS = async () => {
    try {
      const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
      const image = await fileFromPath(nftFile);

      console.log('Image data =>', image);
    } catch (error) {
      console.log('Error Uploading file :=>', error);
    }
  };

  // uploaded file to nft.storage
  useEffect(() => {
    checkIfWalletConnected();
    console.log('uploading file.. ');
    uploadToIPFS();
    console.log('uploaded ');
  }, []);
  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};
