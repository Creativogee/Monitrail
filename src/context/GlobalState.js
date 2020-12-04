import React, {createContext, useReducer} from 'react'
import {reducer} from '../context/Reducer'

//default state
const defaultState = {
 transactions: JSON.parse(localStorage.getItem('transactions')) || [],
 vouchers: [],
 debt: [],
 errorMessage: '',
}

//create context
export const GlobalContext = createContext(defaultState)

//Provider

export const GlobalProvider = ({children}) => {
 const [state, dispatch] = useReducer(reducer, defaultState)
 localStorage.setItem('transactions', JSON.stringify(state.transactions))

 //actions
 
 function addTransaction (transaction) {
  dispatch({
   type: 'ADD_TRANSACTION',
   payload: transaction
  })
 }

 function deleteTransaction(id) {
  dispatch({
   type: 'DELETE_TRANSACTION',
   payload: id
  })
 }

 function openModal ({title, amount}) {
  if(!title) {
     dispatch({
   type: 'TITLE_ERROR'
  })
  }

  if(!amount) {
   dispatch({
    type: 'AMOUNT_ERROR',
   })
  }

  if(!amount && !title) {
   dispatch({
    type: 'EMPTY_FIELD',
   })
  }

  if(title && amount) {
   dispatch({
    type: 'ADDITION_SUCCESSFUL',
   })
  }

 }

 function closeModal () {
  dispatch({
    type: 'CLOSE_MODAL',
   })
 }

 return (
  <GlobalContext.Provider value = {{
   transactions: state.transactions,
   addTransaction,
   deleteTransaction,
   openModal, 
   closeModal,
   errorMessage: state.errorMessage,
  }}>
   {children}
  </GlobalContext.Provider>
 )
}