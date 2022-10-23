import Image from 'next/image';

const GoBackIcon = () => {
  return (
    <div className="flex items-center justify-center pl-2 bg-[#f2fdff] rounded-full h-14 w-14">
      <Image src="/images/arrow-left.svg" width={30} height={30} />
    </div>
  );
};

export default GoBackIcon;
