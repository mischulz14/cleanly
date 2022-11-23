import Link from 'next/link';
import Router from 'next/router';
import ConfirmationAnimation from '../../animation/ConfirmationAnimation';
import SlideInFromLeft from '../../animation/SlideInFromLeft';

const RegistrationConfirmation = (props: { role: string; id: string }) => {
  console.log(props.id);

  return (
    <SlideInFromLeft>
      <div className="min-h-[100vh] flex flex-col items-center justify-center text-center wrapper ">
        <ConfirmationAnimation />
        <span className="block pt-8 text-white">Thanks for registering!</span>

        <button
          onClick={() => {
            if (props.role === 'user') {
              Router.push(`/user/${props.id}`);
            }

            if (props.role === 'service') {
              Router.push(`/service/${props.id}`);
            }
          }}
          className="mt-8 btn-primary"
        >
          Get started
        </button>
      </div>
    </SlideInFromLeft>
  );
};

export default RegistrationConfirmation;
