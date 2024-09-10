'use client'

import { useState } from 'react';
import LoginPage from '../components/login-page';
import RegistrationPage from '../components/registration-page';
import PatientDashboard from '../pages/patient-dashboard';
import DoctorReportUpload from '../components/doctor-report-upload';

const Page = () => {
  const [currentPage, setCurrentPage] = useState('login');

  const handlePageSwitch = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'login' && <LoginPage onSwitch={() => handlePageSwitch('register')} />}
      {currentPage === 'register' && <RegistrationPage onSwitch={() => handlePageSwitch('login')} />}
      {currentPage === 'patient-dashboard' && <PatientDashboard />}
      {currentPage === 'doctor-dashboard' && <DoctorReportUpload />}
    </div>
  );
};

export default Page;
