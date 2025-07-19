'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [bgColor, setBgColor] = useState('#000');
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const colors = ['#111', '#333', '#004466', '#800000', '#1a1a1a'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setBgColor(colors[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const togglePlayback = () => {
    if (!iframeRef.current) return;

    const widget = iframeRef.current.contentWindow;

    if (isPlaying) {
      widget.postMessage(
        JSON.stringify({ method: 'pause' }),
        'https://w.soundcloud.com'
      );
    } else {
      widget.postMessage(
        JSON.stringify({ method: 'play' }),
        'https://w.soundcloud.com'
      );
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        backgroundColor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 1.5s ease-in-out',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontFamily: '"Shadows Into Light", cursive',
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 0 10px rgba(0,0,0,0.9)',
          margin: 0,
        }}
      >
        runitback?
      </h1>

      <span
        onClick={togglePlayback}
        className="material-symbols-outlined"
        style={{
          fontSize: 'clamp(3rem, 12vw, 5rem)',
          color: '#fff',
          cursor: 'pointer',
          marginTop: '1rem',
          userSelect: 'none',
        }}
      >
        {isPlaying ? 'pause_circle' : 'play_circle'}
      </span>

      <iframe
        ref={iframeRef}
        title="SoundCloud player"
        style={{ display: 'none' }}
        width="0"
        height="0"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/luminemusicofficial/disclosure-you-me-lumine-remix&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
      ></iframe>
    </div>
  );
}
