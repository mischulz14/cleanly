import { motion } from 'framer-motion';

function RegistrationModal(props: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterUser: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute  top-0 left-0 w-full text-white flex flex-col items-center justify-center bg-[#564787] h-[100vh]"
    >
      <span className="mb-6 text-lg">Register as:</span>
      <button
        onClick={() => {
          props.setShowModal(false);
          props.setRegisterUser(true);
        }}
        className="mb-4 btn-primary"
      >
        User
      </button>
      <button className="btn-primary">Cleaning Service</button>
    </motion.div>
  );
}

export default RegistrationModal;
