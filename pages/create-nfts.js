import React, { useCallback, useContext, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { NFTContext } from '../context/NFTContext';
import Images from '../assets';
import { Input } from '../components';

const CreateNfts = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const { uploadToNFTStorage } = useContext(NFTContext);
  const [inputForm, setInputForm] = useState({
    name: '',
    description: '',
    price: '',
    file: null,
  });
  const { theme } = useTheme();
  const onDrop = useCallback(async (acceptedFile) => {
    console.log('Uploading file ');

    const nftUrl = await uploadToNFTStorage(acceptedFile[0]);
    console.log('nftmetadata', nftUrl);
    const urlPathname = nftUrl?.data?.image?.pathname.replace('//', '/');
    const url = `https://nftstorage.link/ipfs${urlPathname}`;
    setFileUrl(url);
  }, []);
  console.log(inputForm);
  const {
    getInputProps,
    isDragActive,
    getRootProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop, // it will accept a function that upload a file
    accept: 'image/*', // all images files accepted
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex 
      flex-col items-center p-5 eounded-sm border-dashed
      ${isDragActive && 'border-file-active'}
      ${isDragAccept && 'border-file-accept'}
      ${isDragReject && 'border-file-reject'}
      `,
    [isDragActive, isDragAccept, isDragReject]
  );

  const handleForm = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 sx:ml-0">
          Create NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold">
            upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />

              <div className="flexCenter flex-col text-center ">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG ,MPNG , GIF , SVG, WEBM Max 100mb
                </p>
                <div className="flex justify-center my-12 w-full">
                  <Image
                    src={Images.upload}
                    objectFit="contain"
                    width={100}
                    height={100}
                    alt="file upload"
                    className={theme === 'light' && 'filter invert'}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop file
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  or Upload edia from this PC
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file " />
                </div>
              </aside>
            )}
            <hr />

            <Input
              title="Name"
              Name="name"
              inputType="text"
              placeholder="NFT Name"
              handleClick={(e) => handleForm(e)}
            />
            <Input
              title="Description"
              Name="description"
              inputType="textarea"
              placeholder="Some Description"
              handleClick={(e) => handleForm(e)}
            />
            <Input
              title="Price"
              Name="price"
              inputType="number"
              placeholder="Nft Price in ETH"
              handleClick={(e) => handleForm(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNfts;
