import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const PriceInput = (props: {
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="relative flex items-center mb-6 input-wrapper">
      <input
        value={props.price}
        onChange={(e) => props.setPrice(e.target.value)}
        type="number"
        placeholder="Price/hour"
        className="text-center grow p-4 rounded-[26px] stretch bg-[#F2FDFF] w-[300px]"
      />
      <div className="absolute top-3 left-3">
        <Image src="/images/euro.svg" height="30" width="30" />
      </div>
    </div>
  );
};

export default PriceInput;
