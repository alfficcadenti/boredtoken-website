"use client"; // Add this line at the top

import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';

const FONT_SIZE_INITIAL = 48; // Initial font size in vw
const FONT_SIZE_FINAL = 96; // Final font size in vw
const SCROLL_THRESHOLD = 0.1; // Percentage of page scroll at which font size changes

export default function Home() {
  const [fontSize, setFontSize] = useState(FONT_SIZE_INITIAL);
  const [tokenData, setTokenData] = useState<any>(null); // Use 'any' type for tokenData

  useEffect(() => {

    fetch('https://api.dexscreener.com/latest/dex/tokens/5E4cppid8BSqgdsa4aKHu45rCUspuVqEty4Wa95ipump')
      .then(response => response.json())
      .then(data => {
        // Extract token data from the API response
        const tokenInfo = data.pairs[0];
        setTokenData(tokenInfo);
      })
      .catch(error => console.error('Error fetching data:', error));



    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;

      // Calculate the new font size based on the scroll percentage
      const newFontSize = FONT_SIZE_INITIAL - (scrollPercentage * (FONT_SIZE_INITIAL - FONT_SIZE_FINAL));

      // Update the font size
      setFontSize(newFontSize);
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-full overflow-x-hidden">

      <ThreeScene />
      <section className=" ">
        <div className="fw " style={{ fontSize: `${fontSize}vw` }}>BORED</div>
      </section>
      <section className="-pt-24 w-full flex justify-start items-center z-20">
        <div className='h-full text-[16vw] leading-none	'>
          STAY <br />BORED <br />
        </div>
      </section>
      <section className="pb-24 w-full flex justify-end items-center">
        <div className='h-full text-[8vw] leading-none	'>
          {tokenData && (
            <>
              <div>{tokenData.priceUsd}<span className='text-purple'>$</span></div>
              <div className='flex flex-col text-[4vw] text-center'>
                <div className='text-[3vw] text-yellow'>24h stats</div>
                <div>{tokenData.txns.h24.buys} <span className='text-purple'>buys</span> </div>
                <div>{tokenData.txns.h24.sells} <span className='text-purple'>sells</span></div>
                <div>{tokenData.volume.h24} $ <span className='text-purple'>volume</span></div>
                <div>{tokenData.priceChange.h24}% <span className='text-purple'>change</span></div>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="py-24 w-full flex flex-col justify-start items-center gap-4">
        <a target='blank' href="https://raydium.io/swap/?inputMint=5E4cppid8BSqgdsa4aKHu45rCUspuVqEty4Wa95ipump&outputMint=sol" className='z-20 bg-red hover:text-black w-full text-center rounded-full p-8 font-bold text-3xl'>BUY NOW</a>
        <a className='z-20 bg-yellow text-black w-full text-center px-6 py-2 rounded-full w-auto font-bold text-lg'>claim for top NFT holders coming soon</a>
      </section>
    </main>
  );
}
