// components/MobileModal.jsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import CopyCAButton from './CAButton';
import gsap from 'gsap';

// no plugins needed right now
gsap.registerPlugin();

export default function MobileModal() {
  const [isOpen, setIsOpen] = useState(false);

  // NEW: keep a ref to the open (hamburger) button so we can return focus after close
  const triggerRef = useRef(null);

  // Your existing panel ref (also used as our "dialog" ref)
  const modalRef = useRef(null);

  const toggleModal = () => setIsOpen(open => !open);

  // Body scroll lock (yours)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Slide-in animation (yours)
  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: '-100%' },
        { y: '0%', duration: 0.5, ease: 'power4.out' }
      );
    }
  }, [isOpen]);

  // NEW: Focus trap + Esc to close while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    // Move focus inside the modal
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    (first ?? modal).focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setIsOpen(false);
      }
      if (e.key === 'Tab' && focusable.length) {
        // trap focus within the modal
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // NEW: Return focus to the hamburger trigger after the modal closes
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <button
        ref={triggerRef}                    // NEW
        onClick={toggleModal}
        className="lg:hidden z-30 p-2 rounded-full bg-[#3a3a3a] focus:outline-none shadow-lg"
        aria-haspopup="dialog"              // NEW
        aria-expanded={isOpen}              // NEW
        aria-controls="mobile-menu"         // NEW (matches id on the dialog below)
      >
        <Menu size={24} />
        <span className="sr-only">Open menu</span>
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          id="mobile-menu"                   // NEW (ties to aria-controls)
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          tabIndex={-1}
          className="fixed inset-0 w-[100vw] h-screen bg-gradient-to-b from-[#2c2c2c] to-[#1f1f1f] text-white z-50 flex flex-col"
        >
          {/* Top Row: Logo + Close */}
          <div className="flex items-center justify-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center shadow-lg">
              <Image src="/logo.svg" alt="Logo" width={42} height={42} className="rounded-full"/>
            </div>

            <button
              onClick={toggleModal}
              className="absolute right-[5%] p-2 rounded-full bg-[#3a3a3a] focus:outline-none shadow-lg"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* NEW: Visible title for aria-labelledby (can be sr-only if you don't want it shown) */}
          <h2 id="mobile-menu-title" className="px-6 text-2xl uppercase mx-auto my-5  tracking-widest font-semibold">Menu</h2>

          {/* Menu Items */}
          <nav className=" flex-grow px-6 space-y-4 mt-2">
            {['Our Story','Music','Memes','How to Buy','FAQ','Socials'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="block w-full text-center py-3 rounded-lg bg-[#3a3a3a] font-bold text-lg shadow-inner tracking-widest"
              >
                {item.toUpperCase()}
              </a>
            ))}
            <CopyCAButton className="w-full bg-[#282FB6] tracking-widest" />
          </nav>


          {/* Bottom: Social Icons */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center shadow-lg">
              <Image src="/art/x-icon.svg" className="rounded-full" alt="Twitter / X" width={44} height={44} />
            </a>
            <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center shadow-lg">
              <Image src="/art/telegram-icon.svg" className="rounded-full" alt="Telegram" width={44} height={44} />
            </a>
            <a href="https://dexscreener.com/yourpair" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center shadow-lg">
              <Image src="/art/dex-icon.svg" className="rounded-full" alt="DexScreener" width={44} height={44} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
