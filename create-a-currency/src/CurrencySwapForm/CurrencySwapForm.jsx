import React, { useState } from 'react';
import CurrrencyFormat from 'react-currency-format';

export default function CurrencySwapForm() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount: 
        <CurrrencyFormat
          value={amount}
          thousandSeparator={true}
          prefix={'$'}
          onValueChange={(values) => setAmount(values.value)}
        />
      </label>

      <button type='submit'>Swap</button>
    </form>
  );
}
