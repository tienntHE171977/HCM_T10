// src/App.jsx
import { useState } from 'react';
import HomePage from './components/HomePage';
import JourneyMap from './components/JourneyMap';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'home') {
    return <HomePage onStartJourney={() => setCurrentPage('journey')} />;
  }

  return <JourneyMap onBackToHome={() => setCurrentPage('home')} />;
}

export default App;
