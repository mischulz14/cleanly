import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import CleaningMop from '../../atoms/icons/CleaningMop';
import HomeIcon from '../../atoms/icons/HomeIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';

const MobileNavUser = (props: any) => {
  return (
    <nav className="fixed bottom-0 left-0 flex items-center justify-between w-full px-10 pb-2 bg-white mobile-nav border-t-[1px] border-[rgba(0,0,0,0.1)]">
      <Link href={`/user/${props.userId}`}>
        <button
          onClick={() => {
            props.setPage('requests');
          }}
          className={`
          ${props.page === 'requests' ? 'active' : ''}
             mobile-nav__button
        `}
        >
          <CleaningMop />
        </button>
      </Link>
      <Link href={`/user/${props.userId}`}>
        <button
          onClick={() => {
            props.setPage('home');
          }}
          className={`
          ${props.page === 'home' ? 'active' : ''}
             mobile-nav__button
        `}
        >
          <HomeIcon />
        </button>
      </Link>
      <Link href={`/user/${props.userId}/profile`}>
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
      </Link>
    </nav>
  );
};

export default MobileNavUser;
