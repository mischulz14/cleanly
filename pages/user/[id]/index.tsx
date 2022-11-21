import { useState } from 'react';
import FilterForm from '../../../components/molecules/FilterForm';
import DesktopNavUser from '../../../components/organisms/navbar/DesktopNavUser';
import MobileNavUser from '../../../components/organisms/navbar/MobileNavUser';
import UserFeed from '../../../components/organisms/user/UserFeed';
import { getValidSessionByToken } from '../../../data/sessions';
import { getUserById } from '../../../data/users';
import { selectAllServices } from '../../../data/usersServicesRelations';

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

  // console.log('service Array from backend', props.serviceArr);

  // console.log('serviceData that should show', serviceData);

  if (!props.foundUser) {
    return <div>404</div>;
  }

  return (
    <>
      <DesktopNavUser page={page} setPage={setPage} userId={props.userId} />
      <div className="flex flex-col justify-center items-center pt-40 sm:pt-8 h-[100vh] overflow-y-scroll sm:flex sm:gap-8 sm:justify-center hide-scrollbar">
        <h2 className="hidden sm:block">Find the best services:</h2>
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
    </>
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

  const token = context.req.cookies.sessionToken;

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/user/${userId}`,
        permanent: false,
      },
    };
  }

  const serviceArr = await selectAllServices();

  // console.log('serviceArr', serviceArr);

  return {
    props: {
      foundUser: JSON.parse(foundUser),
      serviceArr: serviceArr,
      userId,
      userIdCookie,
    },
  };
}
