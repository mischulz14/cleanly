import { motion } from 'framer-motion';
import Appear from '../../animation/Appear';

function RegistrationModal(props: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterUser: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Appear>
      <div className="absolute  top-0 left-0 w-full text-white flex flex-col items-center justify-center bg-[#564787] h-[100vh]">
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
      </div>
    </Appear>
  );
}

export default RegistrationModal;
