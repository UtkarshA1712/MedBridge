'use client'

import { useState } from 'react';
import LoginPage from '../components/login-page';
import RegistrationPage from '../components/registration-page';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const router = useRouter();

  const handlePageSwitch = (page: string) => {
    setCurrentPage(page);
  };

  const handleRedirect = (path: string) => {
    setCurrentPage(path);
  };
  return (
    <div>
      {currentPage === 'login' && <LoginPage onSwitch={() => handlePageSwitch('register')} onRedirect={handleRedirect}/>}
      {currentPage === 'register' && <RegistrationPage onSwitch={() => handlePageSwitch('login')} />}
    </div>
  );
};

export default Page;