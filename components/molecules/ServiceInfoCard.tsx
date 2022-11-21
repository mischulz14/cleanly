import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PersonIcon from '../atoms/icons/PersonIcon';

export default function ServiceInfoCard({ service }: any) {
  return (
    <li className="sm:w-[300px] relative grow flex flex-col items-center w-[80vw] gap-6 p-4 text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified">
      <div
        className={
          service.image
            ? '-top-8 left-4 absolute'
            : 'absolute p-6 bg-white rounded-full shadow-secondaryModified -top-8 left-4 '
        }
      >
        {service.image ? (
          <img
            src={service.image}
            alt=""
            className="object-cover w-20 h-20 border-2 rounded-full shadow-secondaryModified"
          />
        ) : (
          <PersonIcon />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="pt-6 pl-2 text-xl text-center">
          {service.firstName}
        </span>
        <span className="pl-2 text-xl text-center">{service.lastName}</span>
      </div>
      <div className="flex flex-col gap-6 py-6 my-2 border-2 rounded-xl shadow-secondaryModified">
        <div className="flex items-end w-full gap-3 text-lg px-14 ">
          <Image src="/images/euro.svg" height="30" width="30" />
          <span>{service.price}€/h</span>
        </div>
        <div className="flex items-end w-full gap-3 text-lg px-14">
          <Image src="/images/location.svg" height="30" width="30" />
          <span>{service.district}</span>
        </div>
      </div>
      <Link href={`/service/info/${service.serviceId}`}>
        <button className="my-2 btn-secondary">Check availability</button>
      </Link>
    </li>
  );
}
