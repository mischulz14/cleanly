import { useState } from 'react';
import RegistrationModal from '../../components/molecules/registration/RegistrationModal';
import ServiceRegistrationForm from '../../components/molecules/registration/ServiceRegistrationForm';
import UserRegistrationForm from '../../components/molecules/registration/UserRegistrationForm';

const RegistrationPage = () => {
  // TODO - add a confirmation page

  return (
    <div className="relative height-[100vh]">
      <RegistrationModal />
    </div>
  );
};

export default RegistrationPage;
