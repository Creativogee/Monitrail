import React, {useContext, useEffect} from 'react'
import { GlobalContext } from './context/GlobalState'

export const Modal = () => {
 const {errorMessage, closeModal} = useContext(GlobalContext)

useEffect(() => {
  const timer = setTimeout(() => {
    closeModal()
  }, 3000);
  return () => clearTimeout(timer);
},[closeModal]);



 switch(errorMessage) {
  case 'title_error': 
    return (
  <div className= 'modal'>
   Please enter a valid title
  </div>
 )

 case 'amount_error': 
    return (
    <div className= 'modal'>
     Please enter a valid amount
    </div>
  )

 case 'empty_field': 
    return (
    <div className= 'modal'>
     Please fill transaction details
    </div>
  )

 case 'addition_successful': 
    return (
    <div className= 'modal'>
     Transaction successful
    </div>
  )

  default:
   return (
    <div>
    </div>
   )
 }

}
