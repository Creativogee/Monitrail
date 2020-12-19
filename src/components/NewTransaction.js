import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Modal } from '../Modal';

export const NewTransaction = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState({ title: false, amount: false });
  const [locationAndWhen, setLocationAndWhen] = useState({
    location: { lat: '', long: '' },
    when: { time: '', date: '', dur: '' },
  });
  const { addTransaction, openModal } = useContext(GlobalContext);

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

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      title,
      amount: +amount,
      more: locationAndWhen,
    };

    if (title && amount && amount !== 0) {
      addTransaction(newTransaction);
      setTitle('');
      setAmount(0);
      setLocationAndWhen({
        location: { lat: '', long: '' },
        when: { time: '', date: '', dur: '' },
      });
    }

    if (!title) {
      setIsError({ ...isError, title: true });
      openModal(newTransaction);
    }

    if (amount === 0 || !amount) {
      setIsError({ ...isError, amount: true });
      openModal(newTransaction);
    }

    if (!title && (amount === 0 || !amount)) {
      setIsError({ title: true, amount: true });
    }
  };

  return (
    <>
      <h3>ADD NEW</h3>
      <form ClassName='form_manual' onSubmit={onSubmit}>
        <div className={isError.title ? 'error' : null}>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            value={title}
            onInput={() => setIsError({ ...isError, title: false })}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title...'
          />
        </div>
        <div className={isError.amount ? 'error' : null}>
          <label htmlFor='amount'>+ / - Amount</label>
          <input
            type='number'
            value={amount}
            onInput={() => setIsError({ ...isError, amount: false })}
            onChange={(e) => setAmount(e.target.value)}
            placeholder='Enter amount...'
          />
        </div>
        <button className='btn'>DONE</button>
        <Modal />
      </form>
    </>
  );
};
