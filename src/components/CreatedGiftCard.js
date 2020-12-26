import React, { useContext, useState } from 'react';
import QRCode from 'react-qr-code';
import html2Canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { GlobalContext } from '../context/GlobalState';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
  position: absolute;
  justify-content: center;
  display: flex;
  top: 40%;
  left: 28%;
`;

Modal.setAppElement('#myModal');

const CreatedGiftCard = ({ newGiftCard }) => {
  const { createGiftCard, transactions } = useContext(GlobalContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const giftCardJSON = JSON.stringify(newGiftCard);

  const amount = transactions[0].voucher.amount;
  const retailer = transactions[0].voucher.retailer;

  /*This function combines html2Canvas and jsPDF libraries. 
  html2Canvas takes a screenshot of the selected DOM node and
  jsPDF saves the screenshot as pdf file into the user's device */
  function saveVoucher(name) {
    const canvas = document.querySelector('#voucher');
    const myPromise = new Promise((resolve) => {
      setIsLoading(true);
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    myPromise.then(() => {
      html2Canvas(canvas, {
        scrollY: -window.scrollY,
        scale: 2,
      }).then((canvas) => {
        setIsLoading(false);
        setIsOpen(true);
        let dataURL = canvas.toDataURL('image/jpeg', 2.0);
        const voucher = new jsPDF({
          unit: 'px',
          format: [185, 240],
        });
        voucher.addImage(dataURL, 'JPEG', 0, 0, 185, 240);
        voucher.save(`${name}.pdf`);
      });
    });
  }

  function closeModal() {
    createGiftCard();
    setIsOpen(false);
  }

  return (
    <div className='voucher-display'>
      <div id='voucher' className='voucher'>
        <div className='voucher_info'>
          <span>{retailer}</span>
          <span>$ {amount}</span>
        </div>
        <div id='photo' className='QRCode'>
          <QRCode value={giftCardJSON} />
        </div>
      </div>
      {isLoading && (
        <div className='overlay-loader'>
          <BeatLoader
            css={override}
            size={40}
            color={'#312f2f'}
            loading={isLoading}
          />
        </div>
      )}
      <button
        onClick={() => {
          saveVoucher(`${retailer}${amount}`);
        }}
        className='btn'
      >
        CREATE
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='Modal scale-up-center'
        overlayClassName='Overlay'
        contentLabel='create is successful'
      >
        <h2 style={{ color: '#2ecc71' }}>Successful!</h2>
        <button className='closeModalBtn' onClick={closeModal}>
          X
        </button>
      </Modal>
    </div>
  );
};

export default CreatedGiftCard;
