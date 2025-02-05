'use client';
import {  WelcomeScreen } from '../components';
import { useState } from 'react';


export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <main >
        <WelcomeScreen onStart={() => setGameStarted(true)} />

    </main>
  );
}