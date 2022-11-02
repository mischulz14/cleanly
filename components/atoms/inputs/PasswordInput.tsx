import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const PasswordInput = (props: {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.password}
        onChange={(e) => props.setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
      />
      <div className="absolute top-3 left-3">
        <Image src="/images/password.svg" height="30" width="30" />
      </div>
    </div>
  );
};

export default PasswordInput;
