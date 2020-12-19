import React from 'react';
import { GlobalProvider } from './context/GlobalState';
import { Header } from './components/Header';
import { Summary } from './components/Summary';
// import { TransactionList } from './components/TransactionList';
import { GiftCard } from './components/GiftCard';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <div className='container'>
        <Header />
        <Summary />
        {/* <TransactionList /> */}
        <GiftCard />
        {/* <NewTransaction /> */}
      </div>
    </GlobalProvider>
  );
}

export default App;
