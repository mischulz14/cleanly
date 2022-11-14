import Image from 'next/image';
import Link from 'next/link';
import { serviceData } from '../../../data/service';
import Appear from '../../animation/Appear';
import PersonIcon from '../../atoms/icons/PersonIcon';
import FilterForm from '../../molecules/FilterForm';

const UserFeed = (props: any) => {
  return (
    <Appear>
      <div className="flex bg-[#DBCBD8] h-[100vh]">
        <ul className="flex flex-col items-center justify-center w-full gap-12 px-8 mx-auto mt-32 mb-28">
          <div className="fixed flex justify-center items-center top-0 z-20 pt-4 pb-6 w-full bg-[#101935]">
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
                setPrice={props.setPrice}
                showFilter={props.showFilter}
                serviceData={props.serviceData}
                setServiceData={props.setServiceData}
                setShowFilter={props.setShowFilter}
                serviceDataFromDB={props.serviceDataFromDB}
              />
            )}
          </div>
          {props.serviceData[0].length !== 0 &&
            props.serviceData?.map((service: any) => {
              return (
                <li
                  key={service[0].id}
                  className="relative flex flex-col items-center w-full gap-6 p-4 text-[#564787] text-center bg-white  rounded-xl shadow-secondary"
                >
                  <div className="absolute p-6 bg-white border-2 rounded-full -top-8 left-2 ">
                    <PersonIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="pt-6 text-xl text-center pl-2">
                      {service[0].firstName}
                    </span>
                    <span className="text-xl text-center pl-2">
                      {service[0].firstName}
                    </span>
                  </div>
                  <div className="px-14 w-full text-lg  flex justify-between items-end gap-10 ">
                    <Image src="/images/euro.svg" height="30" width="30" />
                    <span>{service[0].price}€/h</span>
                  </div>
                  <div className="px-14 w-full text-lg flex justify-between items-end gap-12">
                    <Image src="/images/location.svg" height="30" width="30" />
                    <span>{service[0].district}</span>
                  </div>
                  <Link href={`/service/info/${service[0].id}`}>
                    <button className="my-2 btn-secondary">
                      Check availability
                    </button>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </Appear>
  );
};

export default UserFeed;
