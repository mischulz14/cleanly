// import ServiceRegistrationForm from '../components/molecules/ServiceRegistrationForm';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ConsumerRegistrationForm from '../../components/molecules/registration/ConsumerRegistrationForm';
import RegistrationConfirmation from '../../components/molecules/registration/RegistrationConfirmation';
import RegistrationModal from '../../components/molecules/registration/RegistrationModal';
import { variants } from '../../utils/animationUtils';

const RegistrationPage = () => {
  const [registerConsumer, setRegisterConsumer] = useState(false);

  const [registerService, setRegisterService] = useState(false);

  const [showModal, setShowModal] = useState(true);

  const [confirmation, setConfirmation] = useState(false);

  // TODO - add a confirmation page

  function handleRegister(e: Event) {
    e.preventDefault();
    setConfirmation(true);
    setRegisterConsumer(false);
  }

  return (
    <div className="relative height-[100vh]">
      {showModal && (
        <RegistrationModal
          setRegisterConsumer={setRegisterConsumer}
          setShowModal={setShowModal}
        />
      )}

      {registerConsumer && (
        <ConsumerRegistrationForm
          setRegisterConsumer={setRegisterConsumer}
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
