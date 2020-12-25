import React, { useContext } from 'react';
import QRCode from 'react-qr-code';
import html2Canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { GlobalContext } from '../context/GlobalState';

const CreatedGiftCard = ({ newGiftCard }) => {
  const { transactions } = useContext(GlobalContext);

  const giftCardJSON = JSON.stringify(newGiftCard);

  const amount = transactions[0].voucher.amount;
  const retailer = transactions[0].voucher.retailer;

  //New Feature: Saves voucher to the user's device

  function saveVoucher(name) {
    const canvas = document.querySelector('#voucher');
    html2Canvas(canvas, {
      scrollY: -window.scrollY,
      scrollX: -window.scrollX,
      scale: 2,
    }).then((canvas) => {
      let dataURL = canvas.toDataURL('image/jpeg', 2.0);
      const voucher = new jsPDF({
        unit: 'px',
        format: [300, 355],
      });
      voucher.addImage(dataURL, 'JPEG', 0, 0, 285, 355);
      voucher.save(`${name}.pdf`);
    });
  }
  return (
    <>
      <div id='voucher' className='voucher'>
        <div className='voucher_info'>
          <span>{retailer}</span>
          <span>$ {amount}</span>
        </div>
        <div id='photo' className='QRCode'>
          <QRCode value={giftCardJSON} />
        </div>
      </div>
      <button
        onClick={() => saveVoucher(`${retailer}-${amount}-voucher`)}
        className='btn'
      >
        SAVE
      </button>
    </>
  );
};

export default CreatedGiftCard;
