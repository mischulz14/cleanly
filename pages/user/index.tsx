import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNav';
import UserFeed from '../../components/organisms/user/UserFeed';
import UserProfile from '../../components/organisms/user/UserProfile';
import { serviceData } from '../../data/service';

const UserHomepage = () => {
  const [clickedSideNavIcon, setClickedSideNavIcon] = useState(2);

  return (
    <div className="h-[100vh]">
      {clickedSideNavIcon === 2 && <UserFeed serviceData={serviceData} />}
      {clickedSideNavIcon === 3 && <UserProfile />}
      <MobileNav
        clickedSideNavIcon={clickedSideNavIcon}
        setClickedSideNavIcon={setClickedSideNavIcon}
      />
    </div>
  );
};

export default UserHomepage;

export function getServerSideProps() {
  const serviceArr = serviceData;

  return {
    props: { serviceData: serviceArr },
  };
}
