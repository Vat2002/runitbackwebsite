'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [bgColor, setBgColor] = useState('#000');

  useEffect(() => {
    const colors = ['#111', '#444', '#004466', '#800000', '#1a1a1a'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setBgColor(colors[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 1.5s ease-in-out',
      }}
    >
      <h1
        style={{
          fontFamily: '"Shadows Into Light", cursive',
          fontSize: 'clamp(2rem, 10vw, 5rem)',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 10px rgba(0,0,0,0.9)',
        }}
      >
        runitback?
      </h1>
    </div>
  );
}
