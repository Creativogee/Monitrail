import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <div className='header-container'>
        <h2>MONITRAIL</h2>
        <FaUserCircle
          size={25}
          color='#312f2f'
          style={{ marginTop: 16 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
      {isMenuOpen && <Menu />}
    </header>
  );
};

const Menu = () => {
  return (
    <div className='menu-tab'>
      <ul className='menu-list'>
        <li>Profile</li>
        <li>Vouchers</li>
        <li>History</li>
        <li>About</li>
        <li>Settings</li>
        <li>Sign out</li>
      </ul>
    </div>
  );
};
