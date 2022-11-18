import Head from 'next/head';
import Appear from '../components/animation/Appear';
import LoginOrRegisterScreen from '../components/molecules/LoginOrRegister';
import { getValidSessionByToken } from '../data/sessions';
import { getUserById } from '../data/users';

export default function LoginAndRegisterPage(props: any) {
  // const { login } = useAuth();
  // console.log(props.testing);

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <Appear>
        <LoginOrRegisterScreen />
      </Appear>
    </>
  );
}

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
