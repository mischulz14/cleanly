import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const BirthdayInput = (props: {
  birthday: string;
  setBirthday: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.birthday}
        onChange={(e) => props.setBirthday(e.target.value)}
        type="date"
        placeholder="Birthday"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
      />
      <div className="absolute top-2 left-3">
        <Image src="/images/birthday.svg" height="40" width="40" />
      </div>
    </div>
  );
};

export default BirthdayInput;
