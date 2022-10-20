import Image from 'next/image';

const LoginAndRegisterScreen = () => {
  return (
    <div className="homescreen relative flex flex-col items-center justify-center h-[100vh] gap-6 bg-[#564787]">
      <h1 className="text-3xl font-bold text-white uppercase mt-[-10px] mb-4 text-shadow">
        Cleanly
      </h1>
      <Image src="/images/cleaning-mop-colored.svg" width={100} height="100" />
      {/* <div>Logo</div> */}
      <div className="flex flex-col gap-4 mt-5 btn-wrapper">
        <button className="login-btn relative px-6 py-2 bg-[#F2FDFF] rounded-[26px] text-[#564787]  w-[180px]  shadow-login active:shadow-none active:translate-y-2 font-semibold transition-all duration-300">
          Log in
        </button>
        <button className="register-btn relative px-6 py-2 bg-[#F2FDFF] rounded-[26px] text-[#564787]  w-[180px]  shadow-login active:shadow-none active:translate-y-2 font-semibold transition-all duration-300">
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginAndRegisterScreen;
