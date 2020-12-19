import React, { lazy, Suspense, useState, useEffect, useContext } from 'react';
import { retailers } from './Retailers';
import { GlobalContext } from '../context/GlobalState';
import { Modal } from '../Modal';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
/*Component was export was export as default as the lazy feature only supports default export*/
const CreatedGiftCard = lazy(() => import('./CreatedGiftCard'));
/*this resets the default emotion css config*/
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const CreateGiftCard = () => {
  const [retailer, setRetailer] = useState('');
  const [amount, setAmount] = useState('');
  const [isError, setIsError] = useState({
    retailer: false,
    amount: false,
    password: false,
  });
  const [locationAndWhen, setLocationAndWhen] = useState({
    location: { lat: '', long: '' },
    when: { time: '', date: '', dur: '' },
  });

  //Global Contex actions
  const {
    state,
    addTransaction,
    openModal,
    creatingGiftCard,
    startLoader,
    getAmount,
  } = useContext(GlobalContext);

  const successCallBack = (locationAndWhen) => {
    const { coords, timestamp } = locationAndWhen;
    const { latitude, longitude } = coords;
    const currentDate = new Date(timestamp);
    const date = currentDate.toLocaleDateString('en-US');
    const hour = currentDate.getHours();
    const min = currentDate.getMinutes();
    setLocationAndWhen({
      location: { lat: latitude, long: longitude },
      when: { time: `${hour} : ${min}`, date: date },
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallBack, (error) =>
      console.log(error)
    );
  }, []);
  /*the transaction object is generated on form submitted and to be stored in the database
  It contains infomation on:
  1) voucher
  2) author of voucher
  3) current holder of voucher (in case of transfer of ownership) and
  4) viability
  */
  const transaction = {
    voucher: {
      referenceNo: Math.floor(Math.random() * 100000000),
      amount: +amount,
      retailer,
      locationAndWhen,
    },

    author: {
      name: 'Omowole Gbenga',
      id: 'USERID',
      img: '',
    },

    holder: {
      name: '',
      id: '',
      img: '',
      when: '',
    },

    spent: {
      status: 'ACTIVE || USED',
      when: '',
      Narration: '',
    },
  };

  const { voucher, author, holder } = transaction;

  /*the */

  const newGiftCard = {
    referenceNo: voucher.referenceNo,
    author: {
      name: author.name,
      id: author.id,
      when: voucher.locationAndWhen.when,
    },
    holder: holder,
    retailer,
    amount: voucher.amount,
  };

  const onSubmit = (e) => {
    e.preventDefault();
    /*logic ensures no negative*/
    if (retailer && amount && amount !== 0) {
      if (amount <= state.balance) {
        addTransaction(transaction);
        creatingGiftCard(); /*fn sets the giftCardCreateOption to 'create' */
        getAmount(amount);
        startLoader();
        setRetailer('');
        setAmount('');
        setLocationAndWhen({
          location: { lat: '', long: '' },
          when: { time: '', date: '', dur: '' },
        });
      } else {
        alert('You do not have enough money in your balance');
      }
    }

    // if (!retailer) {
    //   setIsError({ ...isError, retailer: true });
    //   openModal(newGiftCard);
    // }
    // if (password === defaultPassword) {
    //   setIsError({ ...isError, password: true });
    //   openModal(newGiftCard);
    // }

    // if (amount === 0 || !amount) {
    //   setIsError({ ...isError, amount: true });
    //   openModal(newGiftCard);
    // }

    // if (!retailer && (amount === 0 || !amount)) {
    //   setIsError({ retailer: true, amount: true });
    // }
  };

  return (
    <div className='voucher-container'>
      {state.giftCardCreateOption === 'create' ? (
        <Suspense
          fallback={
            <div className='loader'>
              <BeatLoader css={override} size={40} />
            </div>
          }
        >
          <CreatedGiftCard newGiftCard={{ newGiftCard }} />
        </Suspense>
      ) : (
        <form onSubmit={onSubmit}>
          <div className={isError.retailer ? 'error' : null}>
            <label htmlFor='retailer'>Retailer</label> <br />
            <select
              value={retailer}
              onChange={(e) => setRetailer(e.target.value)}
              name='Retailers'
              id=''
              className='dropdown'
            >
              <option hidden value=''>
                Please select a retailer...
              </option>
              {retailers.map((retailer) => {
                const { key, value, name } = retailer;
                return (
                  <option key={key} value={value}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={isError.amount ? 'error' : null}>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              value={amount}
              onInput={() => setIsError({ ...isError, amount: false })}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Please enter an amount...'
            />
          </div>
          {/* <div className={isError.password ? 'error' : null}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              value={password}
              onInput={() => setIsError({ ...isError, password: false })}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Please enter a password...'
            />
          </div> */}
          <button className='btn'>DONE</button>
        </form>
      )}
      {/* <Modal /> */}
    </div>
  );
};
