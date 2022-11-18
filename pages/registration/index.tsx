import RegistrationModal from '../../components/molecules/registration/RegistrationModal';
import { getValidSessionByToken } from '../../data/sessions';
import { getUserById } from '../../data/users';

const RegistrationPage = () => {
  return <RegistrationModal />;
};

export default RegistrationPage;

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.sessionToken;

  const userId = context.req.cookies.userId;

  const user = await getUserById(userId);

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `${
          user?.role === 'user' ? '/user' : '/service'
        }/${userId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
