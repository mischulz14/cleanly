import { Button } from '@mui/material';
import { useState } from 'react';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import CalendarIcon from '../../../components/atoms/icons/CalendarIcon';
import ClockIcon from '../../../components/atoms/icons/ClockIcon';
import RequestsIcon from '../../../components/atoms/icons/RequestsIcon';
import MobileNavUser from '../../../components/organisms/navbar/MobileNavUser';
import { getRequestByUserId } from '../../../data/requests';
import {
  getServiceById,
  getServicesByUserId,
  getUserInfoByServiceId,
} from '../../../data/services';
import { getValidSessionByToken } from '../../../data/sessions';
import { getUserById } from '../../../data/users';

const UserRequests = (props: any) => {
  const [page, setPage] = useState('requests');
  // console.log(props.foundRequests);

  return (
    <div className="flex flex-col w-full text-center bg-[#DBCBD8] relative">
      <div className=" shadow-secondaryModified py-4 rounded-b-xl pl-20 text-xl flex items-center gap-2 text-[#564787] fixed bg-white top-0 left-0 z-[1000000] w-full">
        <RequestsIcon />
        <span className="font-semibold">Your Requests</span>
      </div>
      <SlideInFromLeft>
        <ul className="pt-24 mb-20 overflow-y-scroll">
          {props.foundRequests &&
            props.foundRequests.map((request: any) => {
              return (
                <li
                  key={request.id}
                  className="px-10 py-6 mx-10 mb-6 relative flex flex-col items-center text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified gap-5"
                >
                  <div>{request.serviceName}</div>
                  <div className="flex flex-col gap-3 p-4 border-2 shadow-secondaryModified rounded-xl">
                    <div className="flex items-center justify-start w-full gap-2">
                      <CalendarIcon />

                      <div className="font-bold">{request.day}</div>
                    </div>
                    <div className="flex items-center w-full gap-4">
                      <ClockIcon />
                      <div className="text-center ">
                        {request.timeslots.start} - {request.timeslots.end}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="mr-2">Status:</span>
                    {request.status === 'pending' && (
                      <span className="text-[#F9A826]">Pending</span>
                    )}
                    {request.status === 'accepted' && (
                      <span className="text-[#4BB543]">Accepted</span>
                    )}
                    {request.status === 'rejected' && (
                      <span className="text-[#F95E5A]">Rejected</span>
                    )}
                  </div>
                  {request.status === 'accepted' && (
                    <button className="btn-secondary">Contact</button>
                  )}
                </li>
              );
            })}
        </ul>
      </SlideInFromLeft>
      <MobileNavUser page={page} setPage={setPage} userId={props.userId} />
    </div>
  );
};

export default UserRequests;

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.sessionToken;
  const userId = context.req.cookies.userId;
  const foundRequests = JSON.stringify(await getRequestByUserId(userId));

  const foundUser = await getUserById(userId);

  return {
    props: {
      userId,
      foundRequests: JSON.parse(foundRequests),
      foundUser,
    },
  };
}
