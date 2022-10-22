import Image from 'next/image';
import Link from 'next/link';

const LoginOrRegisterScreen = () => {
  return (
    <div className="homescreen relative flex flex-col items-center justify-center h-[100vh] gap-6 bg-[#564787]">
      <h1 className="text-3xl font-bold text-white uppercase mt-[-10px] mb-4 text-shadow">
        Cleanly
      </h1>
      <Image src="/images/cleaning-mop-colored.svg" width={100} height="100" />
      {/* <div>Logo</div> */}
      <div className="flex flex-col gap-4 mt-5 btn-wrapper">
        <button className="relative login-btn btn-primary">Log in</button>
        <Link href="/registration">
          <button className="relative register-btn btn-primary">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginOrRegisterScreen;
