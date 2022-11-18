import Image from 'next/image';
import { useState } from 'react';
import SlideInFromLeft from '../../../../components/animation/SlideInFromLeft';
import SlideInFromTop from '../../../../components/animation/SlideInFromTop';
import GoBackButton from '../../../../components/atoms/buttons/GoBackButton';
import { getServicesByUserId } from '../../../../data/services';
import { getValidSessionByToken } from '../../../../data/sessions';
import { getUserById } from '../../../../data/users';

const UserProfileSettings = (props: any) => {
  const [email, setEmail] = useState(props.user.email);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [showEmail, setShowEmail] = useState(false);
  const [showFirstName, setShowFirstName] = useState(false);
  const [showLastName, setShowLastName] = useState(false);

  function handleUserChange(e: any) {
    e.preventDefault();

    fetch('/api/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.user.id,
        email: email,
        lastName: lastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
      });

    setShowEmail(false);
  }

  return (
    <div className="h-[100vh] overflow-hidden bg-white">
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
            <button
              onClick={(e) => {
                handleUserChange(e);
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

export default UserProfileSettings;

export async function getServerSideProps(context: any) {
  const userId = context.query.id;

  const user = await getUserById(userId);

  const foundService = JSON.stringify(await getServicesByUserId(userId));

  const token = context.req.cookies.sessionToken;

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/user/${userId}/profile/settings`,
        permanent: false,
      },
    };
  }

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
