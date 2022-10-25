import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { variants } from '../../../utils/animationUtils';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import GoBackIcon from '../../atoms/icons/GoBackIcon';

const UserRegistrationForm = (props: {
  setRegisterUser: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleRegister: any;
}) => {
  return (
    <SlideInFromLeft>
      <form
        onSubmit={props.handleRegister}
        className="relative user__registration bg-[#564787] h-[100vh] flex flex-col pt-20 px-10"
      >
        <button
          onClick={() => {
            props.setRegisterUser(false);
            props.setShowModal(true);
          }}
          className="absolute top-2 left-2"
        >
          <GoBackIcon />
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
    </SlideInFromLeft>
  );
};

export default UserRegistrationForm;
