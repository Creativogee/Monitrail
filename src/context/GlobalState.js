import React, { createContext, useReducer } from 'react';
import { reducer } from '../context/Reducer';

//default state
const defaultState = {
  balance: 1000,
  amount: 0,
  transactions: /*JSON.parse(localStorage.getItem('transactions')) ||*/ [],
  giftCards: [],
  message: '',
  giftCardCreateOption: 'creating',
  isLoading: false,
};

//create context
export const GlobalContext = createContext(defaultState);

//Provider

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  localStorage.setItem('transactions', JSON.stringify(state.transactions));

  //actions
  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  }

  function getAmount(amount) {
    dispatch({
      type: 'GET_AMOUNT',
      payload: amount,
    });
  }

  function createGiftCard() {
    dispatch({ type: 'CREATING' });
  }
  function creatingGiftCard() {
    dispatch({ type: 'CREATE' });
  }

  function startLoader() {
    dispatch({ type: 'START_LOADER' });
  }
  function endLoader() {
    dispatch({ type: 'END_LOADER' });
  }

  function openModal({ retailer, amount }) {
    if (!retailer) {
      dispatch({
        type: 'RETAILER_ERROR',
      });
    }

    if (!amount) {
      dispatch({
        type: 'AMOUNT_ERROR',
      });
    }

    if (!amount && !retailer) {
      dispatch({
        type: 'EMPTY_FIELD',
      });
    }

    if (retailer && amount) {
      dispatch({
        type: 'ADDITION_SUCCESSFUL',
      });
    }
  }

  function closeModal() {
    dispatch({
      type: 'CLOSE_MODAL',
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        transactions: state.transactions,
        addTransaction,
        getAmount,
        openModal,
        closeModal,
        createGiftCard,
        creatingGiftCard,
        startLoader,
        endLoader,
        errorMessage: state.errorMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
