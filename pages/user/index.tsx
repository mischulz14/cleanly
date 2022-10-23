import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNav';
import UserFeed from '../../components/organisms/UserFeed';

const UserHomepage = () => {
  const [activeCleaning, setActiveCleaning] = useState(false);
  const [activeHome, setActiveHome] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);

  return (
    <div className="h-[100vh]">
      {activeHome && <UserFeed />}
      <MobileNav
        activeCleaning={activeCleaning}
        setActiveCleaning={setActiveCleaning}
        activeHome={activeHome}
        setActiveHome={setActiveHome}
        activeProfile={activeProfile}
        setActiveProfile={setActiveProfile}
      />
    </div>
  );
};

export default UserHomepage;
