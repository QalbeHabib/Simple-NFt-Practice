import { useState, createContext, useEffect } from 'react';

import { NFTStorage } from 'nft.storage';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { ContractDeployedOn, MarketAddressABI } from './constant';

export const NFTContext = createContext();
const NFT_STORAGE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFGZDkyMzM3ZTdDMTc0NkQ5YTQwODk5ODc2RDIxYUU2NTc0ODA2ZWIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTQyMjUxMzU4OSwibmFtZSI6InRlc3RpbmcifQ.prz1We13KLZ5RNOs7Rzr7RdOb1ZzMax8apm_SwMOQ-M';

export const NFTProvider = ({ children }) => {
  // const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

  const nftCurrency = 'ETH';
  const [currentAccount, setCurrentAccount] = useState('');

  const fetchContract = (ProviderOrSigner) =>
    new ethers.Contract(ContractDeployedOn, MarketAddressABI, ProviderOrSigner);
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

  // UPloading file to nft.storage

  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const uploadToNFTStorage = async (acceptedFile) => {
    const metaData = await client.store({
      name: acceptedFile.name,
      description: 'Some description here will be displayed',
      image: acceptedFile,
    });

    return metaData;
  };

  // const createNFT = async () => {
  //   await createSale(url, price);
  // };

  const createSale = async (url, formInputPrice) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const NftPrice = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, NftPrice, {
      value: listingPrice.toString(),
    });
    await transaction.wait();
    console.log('listingprice ==>', contract);
  };

  // uploaded file to nft.storage End
  useEffect(() => {
    checkIfWalletConnected();
    createSale('testing', '0.002');
  }, []);
  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToNFTStorage,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
