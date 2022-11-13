import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import CalendarIcon from '../../atoms/icons/CalendarIcon';
import CleaningMop from '../../atoms/icons/CleaningMop';
import HomeIcon from '../../atoms/icons/HomeIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';

const MobileNav = (props: {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  serviceId: number;
}) => {
  return (
    <nav className="fixed bottom-0 left-0 flex items-center justify-between w-full px-10 pb-2 bg-white mobile-nav border-t-[1px] border-[rgba(0,0,0,0.1)]">
      <Link href={`/service/${props.serviceId}/availability`}>
        <button
          onClick={() => {
            props.setPage('availability');
          }}
          className={`
          ${props.page === 'availability' ? 'active' : ''}
             mobile-nav__button
        `}
        >
          <CalendarIcon />
        </button>
      </Link>
      <Link href={`/service/${props.serviceId}`}>
        <button
          onClick={() => {
            props.setPage('home');
          }}
          className={`
          ${props.page === 'home' ? 'active' : ''}
             mobile-nav__button
        `}
        >
          <CleaningMop />
        </button>
      </Link>
      <button
        onClick={() => {
          props.setPage('profile');
        }}
        className={`
          ${props.page === 'profile' ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <PersonIcon />
      </button>
    </nav>
  );
};

export default MobileNav;