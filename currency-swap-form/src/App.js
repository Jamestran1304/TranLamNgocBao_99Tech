import React from 'react';
import './App.css';
import CurrencySwapForm from './components/CurrencySwapForm';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Currency Swap</h1>
      </header>
      <main>
        <CurrencySwapForm />
      </main>
    </div>
  );
}

export default App;
