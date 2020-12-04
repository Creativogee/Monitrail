export const reducer =  (state, action) => {
 switch (action.type) {
  case 'ADD_TRANSACTION':
  
   return{
    ...state,
    transactions: [action.payload, ...state.transactions],
   }
   
  case 'DELETE_TRANSACTION':
   return{
    ...state,
    transactions: state.transactions.filter((transaction) => {
     return transaction.id !== action.payload
    })
   }
  case 'TITLE_ERROR':
    return {...state, errorMessage: 'title_error'}

  case 'AMOUNT_ERROR':
    return {...state, errorMessage: 'amount_error'}

  case 'EMPTY_FIELD':
    return {...state, errorMessage: 'empty_field'}

  case 'ADDITION_SUCCESSFUL':
    return {...state, errorMessage: 'addition_successful'}
  
  case 'CLOSE_MODAL': 
   return {...state, errorMessage: ''}

  default:
   return state
 }
}