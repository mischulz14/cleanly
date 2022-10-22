import Head from 'next/head';
import LoginOrRegisterScreen from '../components/molecules/registration/LoginOrRegister';

export default function LoginAndRegisterPage() {
  // const { login } = useAuth();

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
