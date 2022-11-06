import Link from 'next/link';
import Appear from '../../animation/Appear';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import GoBackIcon from '../../atoms/icons/GoBackIcon';

function RegistrationModal() {
  return (
    <SlideInFromLeft>
      <div className="relative">
        <Link href="/">
          <button className="absolute top-2 left-2 z-[99999999]">
            <GoBackIcon />
          </button>
        </Link>
        <div className="absolute  top-0 left-0 w-full text-white flex flex-col items-center justify-center bg-[#564787] h-[100vh]">
          <span className="mb-6 text-lg">Register as:</span>
          <Link href="/registration/user">
            <button className="mb-4 btn-primary">User</button>
          </Link>
          <Link href="/registration/service">
            <button className="btn-primary">Cleaning Service</button>
          </Link>
        </div>
      </div>
    </SlideInFromLeft>
  );
}

export default RegistrationModal;
