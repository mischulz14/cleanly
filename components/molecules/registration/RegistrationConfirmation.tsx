import Link from 'next/link';
import SlideInFromLeft from '../../animation/SlideInFromLeft';

const RegistrationConfirmation = () => {
  return (
    <SlideInFromLeft>
      <div className="flex flex-col items-center justify-center text-center wrapper ">
        <svg
          version="1.1"
          height={100}
          width={100}
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 98.5 98.5"
          enableBackground="new 0 0 98.5 98.5"
          xmlSpace="preserve"
        >
          <path
            className="checkmark"
            fill="none"
            strokeWidth="8"
            strokeMiterlimit="10"
            d="M81.7,17.8C73.5,9.3,62,4,49.2,4
	C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
          />
        </svg>
        <span className="block pt-8 text-white">Thanks for registering!</span>
        <Link href="/user">
          <button className="mt-8 btn-primary">Get started</button>
        </Link>
      </div>
    </SlideInFromLeft>
  );
};

export default RegistrationConfirmation;
