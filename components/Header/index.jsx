import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Images from '../../assets';
import { NFTContext } from '../../context/NFTContext';

const Header = () => {
  const { connectWallet, currentAccount } = useContext(NFTContext);
  const { theme, setTheme } = useTheme();
  return (
    <nav className="flexBetween w-full fixrd z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start transition ease ">
        <Link href="/">
          <div className="flexCenter cursor-pointer " onClick={() => {}}>
            <Image
              src={Images.logo02}
              objectFit="contian"
              width={32}
              height={32}
              alt="logo"
            />
            <p className=" md:hidden  dark:text-white text-nft-black-1 font-semibold text-lg ml-2">
              OwnNft
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox "
            name=""
            id="checkbox"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween cursor-pointer w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="absolute w-3 h-3 rounded-full bg-white ball" />
          </label>
        </div>
        <div>
          <button
            type="button"
            className="ml-2 p-1 rounded text-sm bg-nft-red-violet"
            onClick={connectWallet}
          >
            {currentAccount ? 'Connected' : ' Connect'}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Header;
