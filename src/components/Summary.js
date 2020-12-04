import React, {useContext} from 'react'
import { GlobalContext} from '../context/GlobalState'


export const Summary = () => {
const { transactions } = useContext(GlobalContext)

const amounts = transactions.map(transaction => transaction.amount)

const voucher = amounts.filter(amt => amt > 0).reduce((sum, amt)=> (sum+=amt), 0).toFixed(2)
const debt = (amounts.filter(amt => amt < 0).reduce((sum, amt)=> (sum+=amt), 0)*-1).toFixed(2)



 return (
  <div className='inc-exp-container'>
   <div>
    <h4>Credit</h4>
 <p className= 'money plus'>{voucher}</p>
   </div>
   <div>
    <h4>Debt</h4>
 <p className= 'money minus'>{debt}</p>
   </div>
  </div>

 )
}
