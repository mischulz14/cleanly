import Link from 'next/link';
import { serviceData } from '../../../data/service';
import Appear from '../../animation/Appear';
import PersonIcon from '../../atoms/icons/PersonIcon';

const UserFeed = (props: any) => {
  return (
    <Appear>
      <div className="flex bg-[#DBCBD8] h-[100vh]">
        <ul className="flex flex-col items-center justify-center w-full gap-12 px-8 mx-auto mt-32 mb-28">
          <div className="fixed flex justify-center items-center top-0 z-20 pt-4 pb-6 w-full bg-[#101935]">
            <button className="btn-primary">Filter</button>
          </div>
          {props.serviceData &&
            props.serviceData.map((service: any) => {
              return (
                <li
                  key={service[0].id}
                  className="relative flex flex-col items-center w-full gap-4 p-4 text-center bg-white shadow-lg rounded-xl"
                >
                  <div className="absolute p-6 bg-white border-2 rounded-full -top-8 left-2 ">
                    <PersonIcon />
                  </div>
                  <span className="block pt-2 text-xl">
                    {service[0].firstName}
                  </span>
                  <span className="block text-lg font-bold">
                    {service[0].price}€/h
                  </span>
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
