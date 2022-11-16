import { useEffect, useState } from 'react';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import CalendarIcon from '../../../components/atoms/icons/CalendarIcon';
import ClockIcon from '../../../components/atoms/icons/ClockIcon';
import RequestsIcon from '../../../components/atoms/icons/RequestsIcon';
import MobileNavService from '../../../components/organisms/navbar/MobileNavService';
import { getRequestByServiceId } from '../../../data/requests';
import { getServicesByUserId } from '../../../data/services';

const ServiceHomepage = (props: any) => {
  const [page, setPage] = useState('home');
  const [requests, setRequests] = useState([]);
  const [render, setRender] = useState(false);

  // console.log(props.userId);
  useEffect(() => {
    setRequests(props.foundRequests);
  }, []);

  function handleRequestAccept(requestId: string, status: string) {
    fetch(`/api/request/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: status,
        requestId: requestId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="bg-[#DBCBD8] h-[100vh] overflow-y-scroll relative">
      <div className="shadow-secondaryModified pl-20 mb-6 text-xl flex items-center gap-2 text-[#564787] bg-white rounded-b-xl p-4 fixed top-0 left-0 z-[10000] w-full border-b-2">
        <RequestsIcon />
        <span className="font-semibold ">Your Requests</span>
      </div>
      <SlideInFromLeft>
        <div className="flex flex-col w-full text-center bg-[#DBCBD8] pt-24">
          <ul className="mb-20 overflow-y-scroll">
            {requests &&
              requests.map((request: any) => {
                return (
                  <li
                    key={request.id}
                    className="px-10 py-6 mx-10 mb-6 relative flex flex-col items-center text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified gap-5 relative"
                  >
                    <div>{request.userName}</div>
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
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleRequestAccept(request.id, 'accepted');
                            request.status = 'accepted';
                            setRender((prev) => !prev);
                          }}
                          className="btn-secondary"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleRequestAccept(request.id, 'rejected')
                          }
                          className="border-2 btn-primary"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <button className="btn-secondary">Contact</button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </SlideInFromLeft>
      <MobileNavService
        page={page}
        setPage={setPage}
        serviceId={props.userId}
      />
    </div>
  );
};

export default ServiceHomepage;

export async function getServerSideProps(context: any) {
  const userId = context.query.userId;

  console.log(userId);

  const foundService = await getServicesByUserId(userId);
  const foundRequests = await getRequestByServiceId(foundService?.serviceId);

  // console.log('found service', foundService);
  // console.log('found requests', foundRequests);

  return {
    props: {
      userId: userId,
      foundService,
      foundRequests,
    },
  };
}
