import { useState } from 'react';
import SlideInFromLeft from '../../../../components/animation/SlideInFromLeft';
import GoBackButton from '../../../../components/atoms/buttons/GoBackButton';
import MobileNavService from '../../../../components/organisms/navbar/MobileNavService';
import { getServicesByUserId } from '../../../../data/services';
import { getUserById } from '../../../../data/users';

const UserProfileSettings = (props: any) => {
  const [email, setEmail] = useState(props.user.email);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);

  return (
    <div className="h-[100vh] overflow-hidden bg-[#DBCBD8]">
      <SlideInFromLeft>
        <GoBackButton />
        <form>
          <div className="flex flex-col items-center">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </form>
      </SlideInFromLeft>
    </div>
  );
};

export default UserProfileSettings;

export async function getServerSideProps(context: any) {
  const userId = context.query.id;

  const user = await getUserById(userId);

  const foundService = JSON.stringify(await getServicesByUserId(userId));

  if (!foundService) {
    return {
      props: {
        userId: userId,
        user: user,
      },
    };
  } else {
    // console.log('found service', foundService);

    return {
      props: {
        userId: userId,
        foundService: JSON.parse(foundService),
        user: user,
      },
    };
  }
}
