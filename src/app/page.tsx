'use client';
import {  WelcomeScreen } from '@/views';
import { useState } from 'react';


export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <main >
        <WelcomeScreen onStart={() => setGameStarted(true)} />

    </main>
  );
}