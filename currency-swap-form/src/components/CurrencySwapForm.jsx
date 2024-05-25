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
  const {
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
      // const tokensRes = await axios.get(
      //   'https://github.com/Switcheo/token-icons/tree/main/tokens'
      // );
      setExchangeRates(pricesRes.data);
      // setCurrencies(tokensRes.data);
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log('Swapping currencies:', data);
    // Perform swap logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='currency-swap-form'>
      <div className='form-group'>
        <label>From Currency</label>
        <Controller
          name='fromCurrency'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={currencies.map((currency) => ({
                value: currency.symbol,
                label: currency.name,
              }))}
            />
          )}
        />
        {errors.fromCurrency && (
          <p className='error-message'>{errors.fromCurrency.message}</p>
        )}
      </div>
      <div className='form-group'>
        <label>To Currency</label>
        <Controller
          name='toCurrency'
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={currencies.map((currency) => ({
                value: currency.symbol,
                label: currency.name,
              }))}
            />
          )}
        />
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
    </form>
  );
};

export default CurrencySwapForm;
