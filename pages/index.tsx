import Head from 'next/head';
import LoginOrRegisterScreen from '../components/molecules/registration/LoginOrRegister';
import { test } from '../data/connect';

export default function LoginAndRegisterPage(props: any) {
  // const { login } = useAuth();
  // console.log(props.testing);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      {/* <LoginForm onSubmit={login} /> */}
      <LoginOrRegisterScreen />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const testing = await test();
  console.log(testing);
  return {
    props: { testing }, // will be passed to the page component as props
  };
}
