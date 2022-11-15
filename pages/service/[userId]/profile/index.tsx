import { useState } from 'react';
import MobileNavService from '../../../../components/organisms/navbar/MobileNavService';
import UserProfile from '../../../../components/organisms/user/UserProfile';
import { getServicesByUserId } from '../../../../data/services';

const serviceProfile = (props: any) => {
  const [page, setPage] = useState('profile');

  return (
    <>
      <UserProfile
        settingsLink={`/service/${props.userId}/profile/settings`}
        user={props.foundService}
      />
      <MobileNavService
        page={page}
        setPage={setPage}
        serviceId={props.userId}
      />
    </>
  );
};

export default serviceProfile;

export async function getServerSideProps(context: any) {
  const userId = context.query.userId;

  const foundService = JSON.stringify(await getServicesByUserId(userId));

  // console.log('found service', foundService);

  return {
    props: {
      userId: userId,
      foundService: JSON.parse(foundService),
    },
  };
}
