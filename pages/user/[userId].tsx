import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNavUser';
import UserFeed from '../../components/organisms/user/UserFeed';
import UserProfile from '../../components/organisms/user/UserProfile';
import { serviceData } from '../../data/service';
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
  const [page, setPage] = useState('home');
  const [serviceData, setServiceData] = useState(props.serviceArr);

  if (!props.foundUser) {
    return <div>404</div>;
  }

  return (
    <div className="h-[100vh]">
      {page === 'home' && (
        <UserFeed serviceData={serviceData} user={props.foundUser} />
      )}
      {page === 'profile' && <UserProfile user={props.foundUser} />}
      <MobileNav page={page} setPage={setPage} />
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
