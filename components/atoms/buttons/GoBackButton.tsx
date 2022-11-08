import Image from 'next/image';
import { goBack } from '../../../utils/goBack';

const GoBackButton = () => {
  return (
    <div className="absolute top-2 left-2 z-[10000000]">
      <button
        onClick={() => {
          goBack();
        }}
        className="flex items-center justify-center pl-2 bg-[#f2fdff] rounded-full h-14 w-14"
      >
        <Image src="/images/arrow-left.svg" width={30} height={30} />
      </button>
    </div>
  );
};

export default GoBackButton;
