'use client'

import { useState } from 'react';
import LoginPage from '../components/login-page';
import RegistrationPage from '../components/registration-page';

const Page = () => {
  const [currentPage, setCurrentPage] = useState('login');

  const handlePageSwitch = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'login' && <LoginPage onSwitch={() => handlePageSwitch('register')} />}
      {currentPage === 'register' && <RegistrationPage onSwitch={() => handlePageSwitch('login')} />}
        
    </div>
  );
};

export default Page;