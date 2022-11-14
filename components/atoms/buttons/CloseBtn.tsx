import ClickAnimation from '../../animation/ClickAnimation';

const CloseButton = (props: any) => {
  return (
    <button
      onClick={() => props.handleGoBackAction()}
      className="absolute top-[-15px] left-[-15px] border-2 rounded-full p-2 w-10 h-10 flex justify-center items-center bg-white border-[#564787] font-bold text-[#564787] hover:scale-105 active:scale-95 transition-all duration-300"
    >
      X
    </button>
  );
};

export default CloseButton;
