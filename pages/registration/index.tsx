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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute  top-0 left-0 w-full text-white flex flex-col items-center justify-center bg-[#564787] h-[100vh]"
        >
          <RegistrationModal
            setRegisterConsumer={setRegisterConsumer}
            setShowModal={setShowModal}
          />
        </motion.div>
      )}

      {registerConsumer && (
        <motion.div
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 250, damping: 30 },
            opacity: { duration: 0.6 },
          }}
        >
          <ConsumerRegistrationForm
            setRegisterConsumer={setRegisterConsumer}
            setShowModal={setShowModal}
            handleRegister={handleRegister}
          />
        </motion.div>
      )}
      {confirmation && (
        <div className="flex items-center justify-center bg-[#564787] h-[100vh]">
          <motion.div
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 250, damping: 30 },
              opacity: { duration: 0.6 },
            }}
            className="wrapper"
          >
            <RegistrationConfirmation />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
