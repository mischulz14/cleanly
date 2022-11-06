import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const EmailInput = (props: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.email}
        onChange={(e) => props.setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="text-center grow p-4 rounded-[26px] bg-[#F2FDFF] w-[300px]"
      />
      <div className="absolute top-3 left-3">
        <Image src="/images/email.svg" height="40" width="40" />
      </div>
    </div>
  );
};

export default EmailInput;
