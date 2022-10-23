import { Dispatch, SetStateAction } from 'react';
import CleaningMop from '../../atoms/icons/CleaningMop';
import HomeIcon from '../../atoms/icons/HomeIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';

const MobileNav = (props: {
  activeCleaning: boolean;
  setActiveCleaning: Dispatch<SetStateAction<boolean>>;
  activeHome: boolean;
  setActiveHome: Dispatch<SetStateAction<boolean>>;
  activeProfile: boolean;
  setActiveProfile: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <nav className="fixed bottom-0 left-0 flex items-center justify-between w-full px-10 pb-2 bg-white mobile-nav">
      <button
        onClick={() => {
          props.setActiveCleaning(true);
          props.setActiveHome(false);
          props.setActiveProfile(false);
        }}
        className={`
          ${props.activeCleaning ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <CleaningMop />
      </button>
      <button
        onClick={() => {
          props.setActiveCleaning(false);
          props.setActiveHome(true);
          props.setActiveProfile(false);
        }}
        className={`
          ${props.activeHome ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <HomeIcon />
      </button>
      <button
        onClick={() => {
          props.setActiveCleaning(false);
          props.setActiveHome(false);
          props.setActiveProfile(true);
        }}
        className={`
          ${props.activeProfile ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <PersonIcon />
      </button>
    </nav>
  );
};

export default MobileNav;
