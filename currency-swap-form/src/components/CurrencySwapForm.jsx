import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select';
import './CurrencySwapForm.css';

const schema = yup.object().shape({
  fromCurrency: yup.string().required('From currency is required'),
  toCurrency: yup.string().required('To currency is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});

const CurrencySwapForm = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [swappedAmount, setSwappedAmount] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Fetch token data and prices
    const fetchData = async () => {
      const pricesRes = await axios.get(
        'https://interview.switcheo.com/prices.json'
      );
      setExchangeRates(pricesRes.data);

      setCurrencies(pricesRes.data);
      // setCurrencies(tokensRes.data);
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log('Swapping currencies:', data);
    const { fromCurrency, toCurrency } = data;
    const fromRate = fromCurrency;
    console.log(fromRate);
    const toRate = toCurrency;
    console.log(toRate);
    let { price: priceFromCurrency } = currencies.find(
      (currency) => currency.currency === fromCurrency
    );
    let { price: priceToCurrency } = currencies.find(
      (currency) => currency.currency === toRate
    );
    if (fromRate && toRate) {
      const result = (data.amount * priceFromCurrency) / priceToCurrency;
      setSwappedAmount(result);
    } else {
      setSwappedAmount('Invalid currency selection');
    }
  };

  // console.log(currencies);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='currency-swap-form'>
      <div className='form-group'>
        <label>From Currency</label>
        <select {...register('fromCurrency')}>
          {currencies.map((currency, index) => (
            <option
              value={currency.currency}
              key={index}
              style={{ padding: '200px', height: '150px' }}
            >
              <span>{currency.currency}</span>
              <span
                style={{
                  backgroundImage: `url('https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency.currency}.svg')`,
                  display: 'inline-block',
                  width: '50px',
                  height: '50px',
                }}
              ></span>
            </option>
          ))}
        </select>
        {errors.fromCurrency && (
          <p className='error-message'>{errors.fromCurrency.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label>To Currency</label>
        {/* <Controller
          name='fromCurrency'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={currencies.map((currency) => ({
                value: currency.currency,
                label: currency.currency,
              }))}
            />
          )}
        /> */}
        <select {...register('toCurrency')}>
          {currencies.map((currency, index) => (
            <option value={currency.currency} key={index}>
              {currency.currency}
            </option>
          ))}
        </select>
        {errors.toCurrency && (
          <p className='error-message'>{errors.toCurrency.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label>Amount</label>
        <Controller
          name='amount'
          control={control}
          render={({ field }) => <input type='number' {...field} />}
        />
        {errors.amount && (
          <p className='error-message'>{errors.amount.message}</p>
        )}
      </div>
      <button type='submit' className='submit-button'>
        Swap
      </button>
      {swappedAmount && (
        <div className='result'>
          <h3>Swapped Amount: {swappedAmount}</h3>
        </div>
      )}
    </form>
  );
};

export default CurrencySwapForm;
