// Import Next.js optimized Image and Link components for media and navigation
import Image from "next/image"
import Link from "next/link"

import GlowingPengu from "@/public/art/glowing-pengu.jpg"
import xIcon from "@/public/art/footer-icons/x-icon.svg"
import tIcon from "@/public/art/footer-icons/telegram-icon.svg"
import dIcon from "@/public/art/footer-icons/dex-icon.svg"
import DIcon from "@/public/art/footer-icons/discord-icon.svg"
import logo from "@/public/logo.svg"


// SocialsFooter component renders a footer section with social links, mascot, and quick links
export default function SocialsFooter() {
  return (
    // Footer container with background color, padding, and typography settings
    <footer id="socials" className="bg-[#1A1A41] select-none text-white font-Fredoka py-12 px-6 md:px-14 ">
      {/* Main heading for the socials section */}
      <h1 className="font-luck text-center text-5xl lg:text-6xl text-white mb-12 mt-12">Socials</h1>

      {/* Flex container dividing content into three blocks on desktop, stacking on mobile */}
      <div className="max-w-6xl mx-auto 
                      flex flex-col 
                      md:flex-row 
                      justify-between
                      items-center 
                      gap-10">

        {/* 1) Mascot image block (hidden on mobile) and quick links */}
        <div className="flex md:gap-10 lg:gap-18 justify-end items-center order-2 md:order-1">
            {/* Mascot image: visible on md+ screens, scales on hover */}
            <div className="hidden md:flex cursor-grab transform transition duration-200 ease-in-out hover:scale-105">
                <Image
                    src={GlowingPengu}
                    alt="Mascot"
                    width={250}
                    height={250}
                    className=" border-4 rounded-2xl border-white"
                />
            </div>

            {/* 3) Quick links list for on-page navigation */}
            <div className="text-center md:text-left">
                <h3 className="text-xl lg:text-2xl text-[#a3a3ff] font-bold tracking-wider mb-4">
                    quick links
                </h3>
                <ul className="flex flex-col gap-2 text-base lg:text-xl font-semibold tracking-wider">
                    <li className="quick-link-item"><Link href="#about">about</Link></li>
                    <li className="quick-link-item"><Link href="#how-to-buy">how to buy</Link></li>
                    <li className="quick-link-item"><Link href="#faq">FAQ</Link></li>
                    <li className="quick-link-item"><Link href="#gallery">gallery</Link></li>
                </ul>
            </div>
        </div>
        

        {/* 2) Community buttons linking to external platforms */}
        <div className="order-1 md:order-2 text-center">
          {/* Section heading */}
          <h2 className="font-luck text-2xl lg:text-3xl mb-8">
            CHECK OUT OUR COMMUNITY!
          </h2>
          {/* Icon links container */}
          <div className="flex justify-center gap-4">
            {/* Each link wraps an icon image; using fill to fit container */}
            <a className="footer-link" href="https://dexscreener.com/abstract/0xa91de33390dcc7c2a2fd586dc3bc7155953e9d1e">
              <Image src={dIcon}      alt="Dex"      fill className="object-contain" />
            </a>
            <a className="footer-link" href="https://x.com/darkpenguonabs">
              <Image src={xIcon}         alt="X"        fill className="object-contain" />
            </a>
            <a className="footer-link" href="https://discord.com/">
              <Image src={DIcon}   alt="Discord"  fill className="object-contain" />
            </a>
            <a className="footer-link" href="https://t.me/darkpenguportal">
              <Image src={tIcon} alt="Telegram" fill className="object-contain" />
            </a>
          </div>
        </div>
        
        </div>

      {/* Footer bottom line with copyright and logo */}
      <div className="mt-10 md:mt-15 border-t border-gray-500 pt-4 text-center text-sm text-gray-300">
        All rights reserved © 2025
        <div className="mt-2 flex justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={30}
            height={30}
            className="rounded-3xl"
          />
        </div>
      </div>
    </footer>
  )
}
