import { useState } from 'react';
import MobileNavUser from '../../../../components/organisms/navbar/MobileNavUser';
import UserProfile from '../../../../components/organisms/user/UserProfile';
import { getServicesByUserId } from '../../../../data/services';
import { getUserById } from '../../../../data/users';

const UserProfilePage = (props: any) => {
  const [page, setPage] = useState('profile');
  // console.log('user id', props.userId);

  return (
    <>
      <UserProfile
        settingsLink={`/user/${props.userId}/profile/settings`}
        user={props.user}
        userId={props.userId}
      />
      <MobileNavUser page={page} setPage={setPage} userId={props.userId} />
    </>
  );
};

export default UserProfilePage;

export async function getServerSideProps(context: any) {
  const userId = context.query.id;

  const foundUser = JSON.stringify(await getUserById(userId));

  // console.log('found service', foundService);

  return {
    props: {
      userId: userId,
      user: JSON.parse(foundUser),
    },
  };
}
