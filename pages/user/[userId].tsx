import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNav';
import UserFeed from '../../components/organisms/user/UserFeed';
import UserProfile from '../../components/organisms/user/UserProfile';
import { getUserById } from '../../data/users';
import { selectAllServices } from '../../data/usersServicesRelations';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  createdAt: string | null;
};

const UserHomePage = (props: any) => {
  const [clickedSideNavIcon, setClickedSideNavIcon] = useState(2);

  if (!props.foundUser) {
    return <div>404</div>;
  }

  return (
    <div className="h-[100vh]">
      {clickedSideNavIcon === 2 && (
        <UserFeed serviceData={props.serviceArr} user={props.foundUser} />
      )}
      {clickedSideNavIcon === 3 && <UserProfile user={props.foundUser} />}
      <MobileNav
        clickedSideNavIcon={clickedSideNavIcon}
        setClickedSideNavIcon={setClickedSideNavIcon}
      />
    </div>
  );
};

export default UserHomePage;

export async function getServerSideProps(context: any) {
  const userId = context.query.userId;

  const foundUser = JSON.stringify(await getUserById(userId));

  if (!(await getUserById(userId))) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  const serviceArr = await selectAllServices();

  return {
    props: {
      foundUser: JSON.parse(foundUser),
      serviceArr: serviceArr,
    },
  };
}
