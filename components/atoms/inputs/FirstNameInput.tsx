import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const FirstNameInput = (props: {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.firstName}
        onChange={(e) => props.setFirstName(e.target.value)}
        placeholder="First Name"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
      />
      <div className="absolute top-2 left-3">
        <Image src="/images/id.svg" height="40" width="40" />
      </div>
    </div>
  );
};

export default FirstNameInput;
