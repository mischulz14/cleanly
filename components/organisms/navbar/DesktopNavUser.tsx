import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import CleaningMop from '../../atoms/icons/CleaningMop';
import HomeIcon from '../../atoms/icons/HomeIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';

const DesktopNavUser = (props: any) => {
  return (
    <nav className="border-b-2 text-[#564787] sm:justify-end items-center justify-between w-full pb-2 bg-white mobile-nav z-[9999999] hidden sm:flex">
      <Link href={`/user/${props.userId}/requests`}>
        <button
          onClick={() => {
            props.setPage('requests');
          }}
          className="sm:w-[200px] sm:items-center sm:justify-center sm:gap-6 mobile-nav__button"
        >
          <CleaningMop />
          <span>Requests</span>
        </button>
      </Link>
      <Link href={`/user/${props.userId}`}>
        <button
          onClick={() => {
            props.setPage('home');
          }}
          className="
          sm:w-[200px] sm:items-center sm:justify-center sm:gap-6 mobile-nav__button"
        >
          <div>
            <HomeIcon />
          </div>
          <span>Home</span>
        </button>
      </Link>
      <Link href={`/user/${props.userId}/profile`}>
        <button
          onClick={() => {
            props.setPage('profile');
          }}
          className="sm:w-[200px] sm:items-center sm:justify-center sm:gap-6 mobile-nav__button"
        >
          <PersonIcon />
          <span>Profile</span>
        </button>
      </Link>
    </nav>
  );
};

export default DesktopNavUser;
