import React, { useContext } from 'react';
import QRCode from 'react-qr-code';
import { GlobalContext } from '../context/GlobalState';

const CreatedGiftCard = ({ newGiftCard }) => {
  const { transactions } = useContext(GlobalContext);

  const giftCardJSON = JSON.stringify(newGiftCard);

  const amount = transactions[0].voucher.amount;
  const retailer = transactions[0].voucher.retailer;

  return (
    <>
      <div className='voucher'>
        <div className='voucher_info'>
          <span>{retailer}</span>
          <span>$ {amount}</span>
        </div>
        <div id='photo' className='QRCode'>
          <QRCode value={giftCardJSON} />
        </div>
      </div>
      <button className='btn'>SAVE</button>
    </>
  );
};

export default CreatedGiftCard;
