import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const RepeatPasswordInput = (props: {
  repeatPassword: string;
  setRepeatPassword: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.repeatPassword}
        onChange={(e) => props.setRepeatPassword(e.target.value)}
        type="password"
        placeholder="Repeat Password"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
      />
      <div className="absolute top-3 left-3">
        <Image src="/images/password.svg" height="30" width="30" />
      </div>
    </div>
  );
};

export default RepeatPasswordInput;
