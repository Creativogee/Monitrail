export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'ADD_GIFTCARD':
      return {
        ...state,
        giftcards: [action.payload, ...state.giftcards],
      };

    case 'GET_AMOUNT':
      return {
        ...state,
        amount: action.payload,
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((transaction) => {
          return transaction.id !== action.payload;
        }),
      };
    case 'CREATE':
      return { ...state, giftCardCreateOption: 'create' };
    case 'CREATING':
      return { ...state, giftCardCreateOption: 'creating' };

    case 'START_LOADER':
      return { ...state, isLoading: true };
    case 'END_LOADER':
      return { ...state, isLoading: false };

    case 'RETAILER_ERROR':
      return { ...state, message: 'retailer_error' };

    case 'AMOUNT_ERROR':
      return { ...state, message: 'amount_error' };

    case 'EMPTY_FIELD':
      return { ...state, message: 'empty_field' };

    case 'ADDITION_SUCCESSFUL':
      return { ...state, message: 'addition_successful' };

    case 'CLOSE_MODAL':
      return { ...state, message: '' };

    default:
      return state;
  }
};
