import Image from 'next/image';
import { useState } from 'react';
import SlideInFromLeft from '../../../../components/animation/SlideInFromLeft';
import SlideInFromTop from '../../../../components/animation/SlideInFromTop';
import GoBackButton from '../../../../components/atoms/buttons/GoBackButton';
import MobileNavService from '../../../../components/organisms/navbar/MobileNavService';
import { getServicesByUserId } from '../../../../data/services';
import { getUserById } from '../../../../data/users';

const ProfileSettings = (props: any) => {
  const [page, setPage] = useState('settings');
  const [email, setEmail] = useState(props.user.email);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [district, setDistrict] = useState(props.foundService.district);
  const [price, setPrice] = useState(props.foundService.price);
  const [description, setDescription] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [showLastName, setShowLastName] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  function handleServiceChange(e: any) {
    e.preventDefault();

    fetch('/api/service/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId: props.foundService.serviceId,
        userId: props.user.id,
        lastName: lastName,
        email: email,
        district: district,
        price: price,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
      });

    setShowDistrict(false);
    setShowPrice(false);
    setShowDescription(false);
  }

  return (
    <div className="pb-10 bg-white">
      <SlideInFromLeft>
        <GoBackButton />

        <form className="px-10 pt-20 ">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-[70vw] gap-20 p-4 border-2 rounded-xl">
                  <div>Email</div>
                  <button
                    className="flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-full hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowEmail((prev) => !prev);
                    }}
                  >
                    <Image src="/images/edit.svg" width={20} height={20} />
                  </button>
                </div>
                {showEmail && (
                  <SlideInFromTop>
                    <div className="flex flex-col items-center w-full gap-4 pt-4">
                      <label htmlFor="email">New Email</label>
                      <input
                        className="p-2 rounded-xl"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </SlideInFromTop>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-[70vw] gap-20 p-4 border-2 rounded-xl">
                  <div>Last Name</div>
                  <button
                    className="flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-full hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLastName((prev) => !prev);
                    }}
                  >
                    <Image src="/images/edit.svg" width={20} height={20} />
                  </button>
                </div>
                {showLastName && (
                  <SlideInFromTop>
                    <div className="flex flex-col items-center justify-center w-full gap-4 pt-4">
                      <label htmlFor="lastName">New Last Name</label>
                      <input
                        className="p-2 rounded-xl"
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </SlideInFromTop>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-[70vw] gap-20 p-4 border-2 rounded-xl">
                  <div>Price</div>
                  <button
                    className="flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-full hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPrice((prev) => !prev);
                    }}
                  >
                    <Image src="/images/edit.svg" width={20} height={20} />
                  </button>
                </div>
                {showPrice && (
                  <SlideInFromTop>
                    <div className="flex flex-col items-center justify-center w-full gap-4 pt-4">
                      <label htmlFor="price">New Price</label>
                      <input
                        className="p-2 rounded-xl"
                        type="text"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </SlideInFromTop>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-[70vw] gap-20 p-4 border-2 rounded-xl">
                  <div>Description</div>
                  <button
                    className="flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-full hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDescription((prev: boolean) => !prev);
                    }}
                  >
                    <Image src="/images/edit.svg" width={20} height={20} />
                  </button>
                </div>
                {showDescription && (
                  <SlideInFromTop>
                    <div className="flex flex-col items-center justify-center w-full gap-4 pt-4">
                      <label htmlFor="description">New Description</label>
                      <input
                        className="h-32 p-2 rounded-xl"
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </SlideInFromTop>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between w-[70vw] gap-20 p-4 border-2 rounded-xl">
                  <div>District</div>
                  <button
                    className="flex items-center justify-center p-4 transition-all duration-300 border-2 rounded-full hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDistrict((prev) => !prev);
                    }}
                  >
                    <Image src="/images/edit.svg" width={20} height={20} />
                  </button>
                </div>
                {showDistrict && (
                  <SlideInFromTop>
                    <div className="flex flex-col items-center justify-center w-full gap-4 pt-4">
                      <label htmlFor="district">New District</label>
                      <input
                        className="p-2 rounded-xl"
                        type="text"
                        name="district"
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                  </SlideInFromTop>
                )}
              </div>
            </div>
            <button
              onClick={(e) => {
                handleServiceChange(e);
              }}
              className="btn-secondary"
            >
              Save Changes
            </button>
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
