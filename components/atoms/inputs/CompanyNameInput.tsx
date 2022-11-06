import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const CompanyNameInput = (props: {
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.companyName}
        onChange={(e) => props.setCompanyName(e.target.value)}
        placeholder="Company (optional)"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF]"
      />
      <div className="absolute top-2 left-3">
        <Image src="/images/id.svg" height="40" width="40" />
      </div>
    </div>
  );
};

export default CompanyNameInput;
