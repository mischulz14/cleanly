import { Dispatch, SetStateAction } from 'react';
import CleaningMop from '../../atoms/icons/CleaningMop';
import HomeIcon from '../../atoms/icons/HomeIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';

const MobileNav = (props: {
  clickedSideNavIcon: number;
  setClickedSideNavIcon: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <nav className="fixed bottom-0 left-0 flex items-center justify-between w-full px-10 pb-2 bg-white mobile-nav border-t-[1px] border-[rgba(0,0,0,0.1)]">
      <button
        onClick={() => {
          props.setClickedSideNavIcon(1);
        }}
        className={`
          ${props.clickedSideNavIcon === 1 ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <CleaningMop />
      </button>
      <button
        onClick={() => {
          props.setClickedSideNavIcon(2);
        }}
        className={`
          ${props.clickedSideNavIcon === 2 ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <HomeIcon />
      </button>
      <button
        onClick={() => {
          props.setClickedSideNavIcon(3);
        }}
        className={`
          ${props.clickedSideNavIcon === 3 ? 'active' : ''}
             mobile-nav__button
        `}
      >
        <PersonIcon />
      </button>
    </nav>
  );
};

export default MobileNav;
