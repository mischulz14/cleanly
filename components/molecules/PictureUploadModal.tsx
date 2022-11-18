import { useState } from 'react';
import SlideInFromTop from '../animation/SlideInFromTop';
import CloseButton from '../atoms/buttons/CloseBtn';

const PictureUploadModal = (props: {
  setShowPictureModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadImage(event: any): Promise<void>;
  image: string;
  handleUpdateUserImage(): Promise<void>;
}) => {
  const [showPreview, setShowPreview] = useState(false);
  function handleGoBackAction() {
    props.setShowPictureModal(false);
    setShowPreview(false);
  }

  return (
    <div className="p-8 w-full h-[100vh] absolute top-0 left-0 bg-white  z-[1000000000000000000]">
      <SlideInFromTop>
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center justify-center w-full gap-8">
            <CloseButton handleGoBackAction={handleGoBackAction} />
            <label
              htmlFor="file"
              className="block p-4 mt-10 text-black border-2 rounded-xl"
            >
              Choose an image
            </label>
            <input
              type="file"
              id="file"
              onChange={(event) => {
                props.uploadImage(event);
                setShowPreview(true);
              }}
              className="w-[300px] flex items-center mb-4 border-2 border-gray-300 rounded-lg"
            />
            {showPreview && (
              <div className="object-contain">
                <img
                  src={props.image}
                  alt="preview"
                  className=" w-[200px] h-[200px] rounded-full object-cover"
                />
                <button
                  onClick={() => {
                    props.handleUpdateUserImage();
                    handleGoBackAction();
                  }}
                  className="mt-16 border-2 btn-primary"
                >
                  Set Image
                </button>
              </div>
            )}
          </div>
        </div>
      </SlideInFromTop>
    </div>
  );
};

export default PictureUploadModal;
