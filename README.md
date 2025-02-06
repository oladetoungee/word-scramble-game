# Word Scramble Challenge

Welcome to the **Word Scramble Challenge** – an interactive, fast-paced word puzzle game built with a powerhouse stack of modern web technologies. This project is a testament to modern front-end development, leveraging the best of Next.js, Tailwind CSS, TypeScript, shadcn UI components, Zustand, Jest, and more to deliver an engaging and polished user experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

**Word Scramble Challenge** is a fun and challenging game where players unscramble letters to form words under time pressure. The game dynamically scrambles words, provides helpful hints, and delivers instant feedback through animations, sound effects, and confetti celebrations. Whether you're looking to test your vocabulary skills or simply enjoy a beautifully crafted UI, this project has something for everyone.

---

## Features

- **Interactive Gameplay:**  
  Engage in a dynamic word scramble experience. Select scrambled letters to form the correct word, with the system providing immediate visual and auditory feedback.

- **Smooth Animations:**  
  Enjoy fluid transitions and delightful animations powered by [Framer Motion](https://www.framer.com/motion/) that enhance user engagement and polish the overall experience.

- **Celebratory Effects:**  
  Experience bursts of confetti using [React Confetti](https://www.npmjs.com/package/react-confetti) when you score points or complete a round, adding a festive touch to your victories.

- **Responsive & Modern UI:**  
  The interface is built with [Tailwind CSS](https://tailwindcss.com/) and shadcn UI components, ensuring a clean, responsive design that looks great on any device.

- **Robust State Management:**  
  Leverage the power of [Zustand](https://github.com/pmndrs/zustand) for a lightweight, yet powerful, state management solution complete with session persistence.

- **Sound Effects:**  
  Integrated sound feedback using the [use-sound](https://www.npmjs.com/package/use-sound) hook, making the gameplay immersive and enjoyable.

- **Type Safety:**  
  Written entirely in [TypeScript](https://www.typescriptlang.org/), the codebase is robust, maintainable, and scalable.

- **Quality Assurance:**  
  Comprehensive testing is set up with [Jest](https://jestjs.io/), ensuring reliability and confidence in every commit.

---

## Tech Stack

- **[Next.js](https://nextjs.org/):**  
  A React framework for server-side rendering, static site generation, and seamless routing. It provides the backbone of our application, enabling fast performance and great SEO.

- **[React](https://reactjs.org/):**  
  The component-based UI library that powers the dynamic parts of our application.

- **[Tailwind CSS](https://tailwindcss.com/):**  
  A utility-first CSS framework that allows for rapid, responsive design without ever leaving your HTML.

- **[TypeScript](https://www.typescriptlang.org/):**  
  Enhances JavaScript with static type checking, improving code quality and maintainability.

- **[shadcn UI](https://ui.shadcn.com/):**  
  A collection of beautifully designed UI components that give the project a modern and consistent look.

- **[Zustand](https://github.com/pmndrs/zustand):**  
  A minimalistic state management library that keeps our game state organized and persistent across sessions.

- **[Jest](https://jestjs.io/):**  
  A delightful JavaScript testing framework ensuring our components and logic are reliable and bug-free.

- **[Framer Motion](https://www.framer.com/motion/):**  
  Delivers smooth animations and interactive transitions that elevate the user experience.

- **[React Confetti](https://www.npmjs.com/package/react-confetti):**  
  Provides celebratory confetti animations that light up the screen on your wins.

- **[use-sound](https://www.npmjs.com/package/use-sound):**  
  A lightweight hook for playing sound effects, adding another layer of interactivity.

---

## Installation

Follow these steps to get your local copy of **Word Scramble Challenge** up and running:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/word-scramble-challenge.git
   cd word-scramble-challenge

2. **Install Dependencies**

    ```bash
    npm install
    yarn install

3. **Running Locally**
   To start the development server, run:

     ```bash
    npm run dev
    yarn dev
     
4. Testing
    This project utilizes Jest for testing to ensure every feature works as expected. To run the tests:

     ```bash
    npm test
    yarn test
