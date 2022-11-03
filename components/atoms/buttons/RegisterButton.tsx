import { Dispatch, SetStateAction } from 'react';

const RegisterButton = (props: {
  setConfirmation: Dispatch<SetStateAction<boolean>>;
  registerHandler: () => void;
}) => {
  return (
    <button
      onClick={() => {
        props.setConfirmation(true);
        props.registerHandler();
      }}
      className="mx-auto mt-6 register-btn btn-primary"
    >
      Register
    </button>
  );
};

export default RegisterButton;