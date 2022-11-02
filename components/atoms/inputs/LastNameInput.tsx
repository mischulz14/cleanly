import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const LastNameInput = (props: {
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.lastName}
        onChange={(e) => props.setLastName(e.target.value)}
        placeholder="Last Name"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
      />
      <div className="absolute top-2 left-3">
        <Image src="/images/id.svg" height="40" width="40" />
      </div>
    </div>
  );
};

export default LastNameInput;
