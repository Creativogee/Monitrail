import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Transaction } from './Transaction'

export const TransactionList = () => {
 const { transactions } = useContext(GlobalContext)

 return (
   <>
    {
    (transactions.length>=1) && 
      <>
        <h3>HISTORY</h3>
        <ul className="list">
        {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
        </ul>
      </>
    }
    </>
 )
}
