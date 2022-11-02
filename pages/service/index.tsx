import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNav';

const CleaningHomepage = () => {
  const [clickedSideNavIcon, setClickedSideNavIcon] = useState(2);
  return (
    <MobileNav
      clickedSideNavIcon={clickedSideNavIcon}
      setClickedSideNavIcon={setClickedSideNavIcon}
    />
  );
};

export default CleaningHomepage;
