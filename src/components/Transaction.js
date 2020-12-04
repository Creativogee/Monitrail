import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'


export const Transaction = ({transaction}) => {
  
 const {deleteTransaction} = useContext(GlobalContext)

 return (
  <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <span>{transaction.title.length < 20? transaction.title: transaction.title.substring(0,20).concat('...')}</span> <span>₦ {Math.abs(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
    </li>
 )
}
