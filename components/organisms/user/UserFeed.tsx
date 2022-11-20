import Image from 'next/image';
import Link from 'next/link';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import PersonIcon from '../../atoms/icons/PersonIcon';
import FilterForm from '../../molecules/FilterForm';

const UserFeed = (props: any) => {
  return (
    <div className=" sm:h-[75%] sm:w-[80vw] justify-center hide-scrollbar flex bg-[#DBCBD8] pt-6 pb-2 sm:overflow-y-auto sm: px-6   sm:rounded-xl sm:pt-0 sm:mb-10 ">
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
        <ul className="flex flex-col items-center justify-center w-full gap-12 pb-10 mx-auto sm:flex-row sm:flex-wrap mt-28 sm:mt-12 grow mb-28">
          {props.serviceData &&
            props.serviceData.map((service: any) => {
              return (
                <li
                  key={service.id}
                  className="sm:w-[300px] relative grow flex flex-col items-center w-[80vw] gap-6 p-4 text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified"
                >
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
                    <span className="pl-2 text-xl text-center">
                      {service.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6 py-6 my-2 border-2 rounded-xl shadow-secondaryModified">
                    <div className="flex items-end w-full gap-3 text-lg px-14 ">
                      <Image src="/images/euro.svg" height="30" width="30" />
                      <span>{service.price}€/h</span>
                    </div>
                    <div className="flex items-end w-full gap-3 text-lg px-14">
                      <Image
                        src="/images/location.svg"
                        height="30"
                        width="30"
                      />
                      <span>{service.district}</span>
                    </div>
                  </div>
                  <Link href={`/service/info/${service.serviceId}`}>
                    <button className="my-2 btn-secondary">
                      Check availability
                    </button>
                  </Link>
                </li>
              );
            })}
        </ul>
      </SlideInFromLeft>
    </div>
  );
};

export default UserFeed;
