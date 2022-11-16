import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import SlideInFromLeft from '../../components/animation/SlideInFromLeft';
import GoBackButton from '../../components/atoms/buttons/GoBackButton';
import GoBackIcon from '../../components/atoms/buttons/GoBackButton';
// import GoBackIcon from '../../components/atoms/icons/GoBackIcon';
import EmailInput from '../../components/atoms/inputs/EmailInput';
import PasswordInput from '../../components/atoms/inputs/PasswordInput';
import { getValidSessionByToken } from '../../data/sessions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  async function loginHandler() {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if ('errors' in data) {
      setErrors(data.errors);
      return console.log(data.errors);
    }

    const returnTo = Router.query.returnTo as string;

    if (returnTo && /^\/[a-zA-Z0-9\-_]+$/.test(returnTo)) {
      Router.push(returnTo);
      return;
    }

    if (data.user.role === 'user') {
      await Router.push(`/user/${data.user.id}`);
    }

    if (data.user.role === 'service') {
      await Router.push(`/service/${data.user.id}`);
    }
  }

  return (
    <SlideInFromLeft>
      <GoBackButton />
      <form
        className="flex flex-col items-center justify-center h-[100vh] gap-1 bg-[#564787]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        {errors &&
          errors.map((error) => {
            return (
              <p key={error.message} className="mb-4 text-red-500">
                {error.message}
              </p>
            );
          })}

        <button
          onClick={loginHandler}
          className="relative login-btn btn-primary"
        >
          Log in
        </button>
      </form>
    </SlideInFromLeft>
  );
};

export default Login;

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.sessionToken;

  if (token && (await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
