const RegistrationModal = (props: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterConsumer: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <span className="mb-6 text-lg">Register as:</span>
      <button
        onClick={() => {
          props.setShowModal(false);
          props.setRegisterConsumer(true);
        }}
        className="mb-4 btn-primary"
      >
        User
      </button>
      <button className="btn-primary">Cleaning Service</button>
    </>
  );
};

export default RegistrationModal;
