import { useState } from 'react';
import SlideInFromLeft from '../../../../components/animation/SlideInFromLeft';
import GoBackButton from '../../../../components/atoms/buttons/GoBackButton';
import MobileNavService from '../../../../components/organisms/navbar/MobileNavService';
import { getServicesByUserId } from '../../../../data/services';
import { getUserById } from '../../../../data/users';

const ProfileSettings = (props: any) => {
  const [page, setPage] = useState('settings');
  const [email, setEmail] = useState(props.user.email);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [district, setDistrict] = useState(props.foundService.district);
  const [price, setPrice] = useState(props.foundService.price);
  const [description, setDescription] = useState(
    props.foundService.description,
  );

  console.log('user ', props.user);
  console.log(props.foundService);

  return (
    <div className="h-[100vh] overflow-hidden bg-[#DBCBD8]">
      <SlideInFromLeft>
        <GoBackButton />
        <form>
          <div className="flex flex-col items-center">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            {props.user.role === 'service' && (
              <>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            )}
          </div>
        </form>
      </SlideInFromLeft>
    </div>
  );
};

export default ProfileSettings;

export async function getServerSideProps(context: any) {
  const userId = context.query.userId;

  const user = await getUserById(userId);

  const foundService = JSON.stringify(await getServicesByUserId(userId));

  // console.log('found service', foundService);

  return {
    props: {
      userId: userId,
      foundService: JSON.parse(foundService),
      user: user,
    },
  };
}
