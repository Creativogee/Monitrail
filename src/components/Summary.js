import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Summary = () => {
  const { state, transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.voucher.amount);
  const voucher = amounts.reduce((sum, amt) => (sum += amt), 0).toFixed(2);
  const balance = (state.balance - state.amount).toFixed(2);

  return (
    <div className='summary-container'>
      <div>
        <h4>Balance</h4>
        <p className='money plus'>{balance}</p>
      </div>
      <div>
        <h4>Vouchers</h4>
        <p className='money minus'>{voucher}</p>
      </div>
    </div>
  );
};
