import React, { useState } from 'react';
import { CreateGiftCard } from './CreateGiftCard';

export const GiftCard = () => {
  const [giftCardOption, setGiftCardOption] = useState('create');

  return (
    <>
      <h3>VOUCHER</h3>
      <div className='voucher-options'>
        <ul>
          <li
            className={giftCardOption === 'create' ? 'selected' : 'unselected'}
            onClick={() => setGiftCardOption('create')}
          >
            Create
          </li>
          <li
            className={giftCardOption === 'load' ? 'selected' : 'unselected'}
            onClick={() => setGiftCardOption('load')}
          >
            Load
          </li>
        </ul>
      </div>
      {giftCardOption === 'create' ? <CreateGiftCard /> : <LoadGiftCard />}
    </>
  );
};

const LoadGiftCard = () => {
  return <div className='voucher-container'></div>;
};
