import React from 'react';
import RequestsIcon from '../atoms/icons/RequestsIcon';

export default function RequestHeader() {
  return (
    <div className="shadow-secondaryModified py-4 rounded-b-xl text-xl flex items-center gap-2 text-[#564787] fixed bg-white top-0 left-0 z-[1000000] w-full justify-center sm:pl-0 sm:left-[50%] sm:bg-transparent sm:shadow-none sm:pt-6 sm:translate-x-[-50%] sm:top-[90px]">
      <RequestsIcon />
      <span className="font-semibold">Your Requests</span>
    </div>
  );
}
