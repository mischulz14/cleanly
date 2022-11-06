import Link from 'next/link';
import { useState } from 'react';
import SlideInFromLeft from '../../components/animation/SlideInFromLeft';
import GoBackIcon from '../../components/atoms/icons/GoBackIcon';
// import GoBackIcon from '../../components/atoms/icons/GoBackIcon';
import EmailInput from '../../components/atoms/inputs/EmailInput';
import PasswordInput from '../../components/atoms/inputs/PasswordInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  }

  return (
    <SlideInFromLeft>
      <Link href="/">
        <button className="absolute z-50 top-2 left-2">
          <GoBackIcon />
        </button>
      </Link>
      <form
        className="flex flex-col items-center justify-center h-[100vh] gap-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <Link href="/registration">
          <button
            onClick={async () => await loginHandler()}
            className="relative login-btn btn-primary"
          >
            Log in
          </button>
        </Link>
      </form>
    </SlideInFromLeft>
  );
};

export default Login;
