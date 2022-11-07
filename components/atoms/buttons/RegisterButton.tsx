import { Dispatch, SetStateAction } from 'react';

const RegisterButton = (props: {
  setConfirmation: Dispatch<SetStateAction<boolean>>;
  registerHandler: () => void;
}) => {
  return (
    <button
      onClick={async () => {
        props.registerHandler();
      }}
      className="mx-auto mt-6 register-btn btn-primary"
    >
      Register
    </button>
  );
};

export default RegisterButton;
