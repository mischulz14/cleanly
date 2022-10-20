import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const ConsumerRegistrationForm = (props: {
  setRegisterConsumer: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <form className="relative consumer__registration bg-[#564787] h-[100vh] flex flex-col pt-20 px-10">
        <button
          onClick={() => {
            props.setRegisterConsumer(false);
            props.setShowModal(true);
          }}
          className="flex items-center justify-center pl-2 bg-[#f2fdff] rounded-full h-14 w-14 absolute top-2 left-2"
        >
          <Image src="/images/arrow-left.svg" width={30} height={30} />
        </button>
        <div className="relative flex items-center mb-6 input-wrapper">
          <input
            placeholder="First Name"
            className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
          />
          <div className="absolute top-2 left-3">
            <Image src="/images/id.svg" height="40" width="40" />
          </div>
        </div>
        <div className="relative flex items-center mb-6 input-wrapper">
          <input
            placeholder="Last Name"
            className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
          />
          <div className="absolute top-2 left-3">
            <Image src="/images/id.svg" height="40" width="40" />
          </div>
        </div>
        <div className="relative flex items-center mb-6 input-wrapper">
          <input
            type="email"
            placeholder="Email"
            className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
          />
          <div className="absolute top-3 left-3">
            <Image src="/images/email.svg" height="40" width="40" />
          </div>
        </div>
        <div className="relative flex items-center mb-6 input-wrapper">
          <input
            type="date"
            placeholder="Birthday"
            className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
          />
          <div className="absolute top-2 left-3">
            <Image src="/images/birthday.svg" height="40" width="40" />
          </div>
        </div>
        <div className="relative flex items-center mb-6 input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
          />
          <div className="absolute top-3 left-3">
            <Image src="/images/password.svg" height="30" width="30" />
          </div>
        </div>
        <div className="relative flex items-center mb-6 input-wrapper">
          <input
            type="password"
            placeholder="Repeat Password"
            className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
          />
          <div className="absolute top-3 left-3">
            <Image src="/images/password.svg" height="30" width="30" />
          </div>
        </div>
        <button className="mx-auto mt-6 register-btn btn-primary">
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default ConsumerRegistrationForm;
