import { useState } from 'react';
import DesktopNavService from '../../../../components/organisms/navbar/DesktopNavService';
import MobileNavService from '../../../../components/organisms/navbar/MobileNavService';
import UserProfile from '../../../../components/organisms/user/UserProfile';
import { getServicesByUserId } from '../../../../data/services';
import { getValidSessionByToken } from '../../../../data/sessions';

const serviceProfile = (props: any) => {
  const [page, setPage] = useState('profile');
  const [image, setImage] = useState(
    props.foundService.image === null ? '' : props.foundService.image,
  );
  const [isLoading, setIsLoading] = useState(true);

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
      <DesktopNavService page={page} setPage={setPage} userId={props.userId} />
      <UserProfile
        settingsLink={`/service/${props.userId}/profile/settings`}
        user={props.foundService}
        userId={props.userId}
        image={image}
        uploadImage={uploadImage}
        setImage={setImage}
        isLoading={isLoading}
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

  const token = context.req.cookies.sessionToken;

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/service/${userId}/profile`,
        permanent: false,
      },
    };
  }

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
