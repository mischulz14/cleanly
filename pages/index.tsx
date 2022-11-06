import Head from 'next/head';
import Appear from '../components/animation/Appear';
import LoginOrRegisterScreen from '../components/molecules/LoginOrRegister';

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
