import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingAnimation from '../../animation/LoadingAnimation';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import PersonIcon from '../../atoms/icons/PersonIcon';
import FilterForm from '../../molecules/FilterForm';
import ServiceInfoCard from '../../molecules/ServiceInfoCard';

const UserFeed = (props: any) => {
  return (
    <div className=" sm:h-[75%] sm:w-[80vw] justify-center hide-scrollbar flex bg-[#DBCBD8] sm:pt-6 pb-2 sm:overflow-y-auto sm: px-6 min-h-[100vh]  sm:rounded-xl  sm:mb-10 ">
      <div className="sm:top-20 sm:absolute fixed flex justify-center items-center top-0 left-0 py-4 z-20 rounded-b-xl w-full bg-[#101935]">
        <button
          onClick={() => props.setShowFilter(true)}
          className="btn-primary"
        >
          Filter
        </button>

        {props.showFilter && (
          <FilterForm
            price={props.price}
            district={props.district}
            setDistrict={props.setDistrict}
            setPrice={props.setPrice}
            showFilter={props.showFilter}
            serviceData={props.serviceData}
            setServiceData={props.setServiceData}
            setShowFilter={props.setShowFilter}
            serviceDataFromDB={props.serviceDataFromDB}
          />
        )}
      </div>
      <SlideInFromLeft>
        <ul className="relative flex flex-col items-center justify-center w-full gap-12 pb-32 mx-auto mt-10 mb-32 sm:pb-10 sm:flex-row sm:flex-wrap sm:mt-12 grow ">
          {props.loading && (
            <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
              <LoadingAnimation />
            </div>
          )}
          {!props.loading &&
            props.serviceData.map((service: any) => {
              return <ServiceInfoCard key={service.id} service={service} />;
            })}
        </ul>
      </SlideInFromLeft>
    </div>
  );
};

export default UserFeed;
