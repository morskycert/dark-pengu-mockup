'use client'
import React from "react";

export default function Navbar() {
    return (
        <>
        <nav className="hidden lg:flex space-x-8 bg-[#2C2C2C] border tracking-wideer border-[#282FB6] px-3 py-1 text-white z-30 rounded-full ">
            <button className="shadow-button"><a href="#about" className=" md:text-lg">Our Story</a></button>
            <button className="shadow-button"><a href="#how-to-buy" className="  md:text-lg  ">How to Buy</a></button>
            <button className="shadow-button"><a href="#gallery" className="  md:text-lg  ">Gallery</a></button>
            <button className="shadow-button"><a href="#faq" className="  md:text-lg">FAQ</a></button>
            <button className="shadow-button"><a href="#socials" className="  md:text-lg">Socials</a></button>
        </nav>
        </>
    );
}
