import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import CalendarIcon from '../../atoms/icons/CalendarIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';
import RequestsIcon from '../../atoms/icons/RequestsIcon';

const DesktopNavService = (props: {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  userId: number;
}) => {
  return (
    <nav className="border-b-2 text-[#564787] sm:justify-end items-center justify-between w-full pb-2 bg-white mobile-nav z-[9999999] hidden sm:flex">
      <Link href={`/service/${props.userId}/availability`}>
        <button
          onClick={() => {
            props.setPage('availability');
          }}
          className="sm:w-[200px] sm:items-center sm:justify-center sm:gap-6 mobile-nav__button"
        >
          <CalendarIcon />
          <span>Availability</span>
        </button>
      </Link>
      <Link href={`/service/${props.userId}`}>
        <button
          onClick={() => {
            props.setPage('home');
          }}
          className="sm:w-[200px] sm:items-center sm:justify-center sm:gap-6 mobile-nav__button"
        >
          <RequestsIcon />
          <span>Requests</span>
        </button>
      </Link>
      <Link href={`/service/${props.userId}/profile`}>
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

export default DesktopNavService;
