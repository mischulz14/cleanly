import { useState } from 'react';
import MobileNavUser from '../../../components/organisms/navbar/MobileNavUser';
import UserFeed from '../../../components/organisms/user/UserFeed';
import UserProfile from '../../../components/organisms/user/UserProfile';
import { getUserById } from '../../../data/users';
import { selectAllServices } from '../../../data/usersServicesRelations';
import { getParsedCookie } from '../../../utils/cookies';

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
  const [showFilter, setShowFilter] = useState(false);
  const [district, setDistrict] = useState('');
  const [price, setPrice] = useState('15');

  if (!props.foundUser) {
    return <div>404</div>;
  }

  return (
    <div className="h-[100vh]">
      <UserFeed
        serviceData={serviceData}
        serviceDataFromDB={props.serviceArr}
        user={props.foundUser}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
        setServiceData={setServiceData}
        price={price}
        setPrice={setPrice}
        district={district}
        setDistrict={setDistrict}
      />

      <MobileNavUser page={page} setPage={setPage} userId={props.userId} />
    </div>
  );
};

export default UserHomePage;

export async function getServerSideProps(context: any) {
  const userId = context.query.id;
  const userIdCookie = JSON.parse(context.req.cookies.userId);
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
      userId,
      userIdCookie,
    },
  };
}
