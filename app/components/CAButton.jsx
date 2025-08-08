'use client'
import { useState } from 'react';

const CONTRACT_ADDRESS = '0x1234...YourContractHere...ABCD'; // ← your actual CA

export default function CopyCAButton({ className='' }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <>
        <button
            onClick={handleClick}
            className={`ripple_button
            relative overflow-hidden z-30 px-4 py-2 rounded-full font-semibold text-white
            bg-[#2c2c2c] border border-gray-700 tracking-widest
            transition
            ${copied ? 'cursor-default bg-[#282FB680]' : 'cursor-pointer '}
            ${className}
            `}
            disabled={copied}
            
        >
            {/* ✅ when copied */}
            {copied
            ? <span className="inline-flex items-center space-x-1">
                <span>Copied</span>
                <svg
                    className="w-5 h-5 text-green-400"
                    fill="none" stroke="currentColor" strokeWidth="3"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                </span>
            : 'Copy Contract'
            }
        </button>
    </>
  );

  
}