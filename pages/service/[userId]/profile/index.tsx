import { useState } from 'react';
import MobileNavService from '../../../../components/organisms/navbar/MobileNavService';
import UserProfile from '../../../../components/organisms/user/UserProfile';
import { getServicesByUserId } from '../../../../data/services';
import { getUserById } from '../../../../data/users';
import {
  selectAllServicesWithSpecificUserId,
  selectAllServicesWithSpecificUserIdAndServiceId,
} from '../../../../data/usersServicesRelations';

const serviceProfile = (props: any) => {
  const [page, setPage] = useState('profile');
  const [image, setImage] = useState(props.foundService.image);

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
    console.log(file.secure_url, 'file');
    setImage(file.secure_url);
  }

  return (
    <>
      <UserProfile
        settingsLink={`/service/${props.userId}/profile/settings`}
        user={props.foundService}
        userId={props.userId}
        image={image}
        uploadImage={uploadImage}
        setImage={setImage}
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

  const cloudinaryAPI = process.env.CLOUDINARY_NAME;

  const foundService = JSON.stringify(await getServicesByUserId(userId));

  return {
    props: {
      userId: userId,
      foundService: JSON.parse(foundService),
      cloudinaryAPI,
    },
  };
}
