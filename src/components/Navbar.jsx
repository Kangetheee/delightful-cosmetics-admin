import React from 'react';
import logo from '../assets/logo.svg';
import profile from '../assets/profile.png';

const Navbar = () => {
  return (
    <div className='max-padd-container flex justify-between items-center py-2'>
      {/* Resize logo */}
      <img src={logo} alt='Logo' className='h-12 w-auto' /> {/* Adjust height to 48px */}

      {/* Resize profile image */}
      <img src={profile} alt='Profile' className='h-8 w-8 rounded-full' /> {/* Adjust height and width to 32px */}
    </div>
  );
};

export default Navbar;
