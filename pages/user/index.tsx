import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNav';
import UserFeed from '../../components/organisms/user/UserFeed';
import UserProfile from '../../components/organisms/user/UserProfile';
import { cleaningData } from '../../dummydata/cleaning';

const UserHomepage = () => {
  const [clickedSideNavIcon, setClickedSideNavIcon] = useState(2);

  return (
    <div className="h-[100vh]">
      {clickedSideNavIcon === 2 && <UserFeed cleaningData={cleaningData} />}
      {clickedSideNavIcon === 3 && <UserProfile />}
      <MobileNav
        clickedSideNavIcon={clickedSideNavIcon}
        setClickedSideNavIcon={setClickedSideNavIcon}
      />
    </div>
  );
};

export default UserHomepage;

export function getServerSideProps(context: any) {
  const cleaningArr = cleaningData;

  return {
    props: { cleaningData: cleaningArr },
  };
}
