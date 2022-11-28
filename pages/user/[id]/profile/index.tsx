import { useState } from 'react';
import DesktopNavUser from '../../../../components/organisms/navbar/DesktopNavUser';
import MobileNavUser from '../../../../components/organisms/navbar/MobileNavUser';
import UserProfile from '../../../../components/organisms/user/UserProfile';
import { getValidSessionByToken } from '../../../../data/sessions';
import { getUserById } from '../../../../data/users';

const UserProfilePage = (props: any) => {
  const [page, setPage] = useState('profile');
  const [image, setImage] = useState(props.user.image);
  const [isLoading, setIsLoading] = useState(false);

  // console.log('user id', props.userId);
  async function uploadImage(event: any) {
    setIsLoading(true);
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'cleanly_images');

    await fetch(
      `https://api.cloudinary.com/v1_1/${props.cloudinaryAPI}/image/upload`,
      {
        method: 'POST',
        body: data,
      },
    )
      .then((response) => response.json())
      .then((file) => {
        setImage(file.secure_url);
        setIsLoading(false);
      });
  }

  return (
    <>
      <DesktopNavUser page={page} setPage={setPage} userId={props.userId} />
      <UserProfile
        settingsLink={`/user/${props.userId}/profile/settings`}
        user={props.user}
        userId={props.userId}
        image={image}
        uploadImage={uploadImage}
        setImage={setImage}
        isLoading={isLoading}
      />
      <MobileNavUser page={page} setPage={setPage} userId={props.userId} />
    </>
  );
};

export default UserProfilePage;

export async function getServerSideProps(context: any) {
  const userId = context.query.id;

  const cloudinaryAPI = process.env.CLOUDINARY_NAME;

  const foundUser = JSON.stringify(await getUserById(userId));

  // console.log('found service', foundService);

  const token = context.req.cookies.sessionToken;

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/user/${userId}/profile`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: userId,
      user: JSON.parse(foundUser),
      cloudinaryAPI,
    },
  };
}
