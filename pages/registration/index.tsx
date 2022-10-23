// import ServiceRegistrationForm from '../components/molecules/ServiceRegistrationForm';
import { useState } from 'react';
import RegistrationConfirmation from '../../components/molecules/registration/RegistrationConfirmation';
import RegistrationModal from '../../components/molecules/registration/RegistrationModal';
import UserRegistrationForm from '../../components/molecules/registration/UserRegistrationForm';

const RegistrationPage = () => {
  const [registerUser, setRegisterUser] = useState(false);

  const [registerService, setRegisterService] = useState(false);

  const [showModal, setShowModal] = useState(true);

  const [confirmation, setConfirmation] = useState(false);

  // TODO - add a confirmation page

  function handleRegister(e: Event) {
    e.preventDefault();
    setConfirmation(true);
    setRegisterUser(false);
  }

  return (
    <div className="relative height-[100vh]">
      {showModal && (
        <RegistrationModal
          setRegisterUser={setRegisterUser}
          setShowModal={setShowModal}
        />
      )}

      {registerUser && (
        <UserRegistrationForm
          setRegisterUser={setRegisterUser}
          setShowModal={setShowModal}
          handleRegister={handleRegister}
        />
      )}
      {confirmation && (
        <div className="flex items-center justify-center bg-[#564787] h-[100vh]">
          <RegistrationConfirmation />
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
