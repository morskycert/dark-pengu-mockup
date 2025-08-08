'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SpinningCoin3D() {
  const coinRef = useRef(null);

  useLayoutEffect(() => {
    if (!coinRef.current) return;

    const ctx = gsap.context(() => {
      // continuous spin
      gsap.to(coinRef.current, {
        rotationY: 360,
        duration: 4,
        ease: 'none',
        repeat: -1,
      });

      // shadow pulse to simulate light moving over the coin
      gsap.to(coinRef.current, {
        filter: 'drop-shadow(0px 20px 15px rgba(0,0,0,0.6))',
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, coinRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="w-[300px] h-[300px] mx-auto my-24"
      style={{ perspective: '800px' }}
    >
      <div
        ref={coinRef}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div
          className="absolute w-full h-full"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src="/art/coin.svg"
            alt="Coin Front"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back face (rotated 180°) */}
        <div
          className="absolute w-full h-full"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <img
            src="/art/coin.svg"
            alt="Coin Back"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
