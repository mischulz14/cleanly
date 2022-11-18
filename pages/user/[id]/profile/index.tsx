import { useState } from 'react';
import MobileNavUser from '../../../../components/organisms/navbar/MobileNavUser';
import UserProfile from '../../../../components/organisms/user/UserProfile';
import { getServicesByUserId } from '../../../../data/services';
import { getUserById } from '../../../../data/users';

const UserProfilePage = (props: any) => {
  const [page, setPage] = useState('profile');
  const [image, setImage] = useState(props.user.image);

  // console.log('user id', props.userId);

  async function uploadImage(event: any) {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'cleanly_images');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${props.cloudinaryAPI}/image/upload`,
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await response.json();
    setImage(file.secure_url);
  }

  return (
    <>
      <UserProfile
        settingsLink={`/user/${props.userId}/profile/settings`}
        user={props.user}
        userId={props.userId}
        image={image}
        uploadImage={uploadImage}
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

  return {
    props: {
      userId: userId,
      user: JSON.parse(foundUser),
      cloudinaryAPI,
    },
  };
}
