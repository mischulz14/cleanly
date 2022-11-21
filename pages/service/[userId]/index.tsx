import { useEffect, useState } from 'react';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import CalendarIcon from '../../../components/atoms/icons/CalendarIcon';
import ClockIcon from '../../../components/atoms/icons/ClockIcon';
import RequestsIcon from '../../../components/atoms/icons/RequestsIcon';
import RequestHeader from '../../../components/molecules/RequestHeader';
import DesktopNavService from '../../../components/organisms/navbar/DesktopNavService';
import MobileNavService from '../../../components/organisms/navbar/MobileNavService';
import { getRequestsByServiceId } from '../../../data/requests';
import { getServicesByUserId } from '../../../data/services';
import { getValidSessionByToken } from '../../../data/sessions';

const ServiceHomepage = (props: any) => {
  const [page, setPage] = useState('home');
  const [requests, setRequests] = useState([]);
  const [render, setRender] = useState(false);
  const [requestsTimeframe, setRequestsTimeframe] = useState('upcoming');

  // q: how to get the current date out of a string like "Thu Nov 17"?
  // a: use the Date constructor

  // console.log(props.userId);
  useEffect(() => {
    // sort requests by day
    const sortedRequests = props.foundRequests.sort((a: any, b: any) => {
      const aDate = new Date(a.timeslots.day);
      const bDate = new Date(b.timeslots.day);
      return aDate.getTime() - bDate.getTime();
    });
    setRequests(sortedRequests);
  }, []);

  async function getAllRequests(serviceId: string) {
    const response = await fetch(`/api/requests/service/${serviceId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    setRequests(data.requests);

    return data.requests;
  }

  async function handleShowUpcomingRequests() {
    const requests = await getAllRequests(props.foundService.serviceId);

    const upcomingRequests = requests.filter((request: any) => {
      const requestDate = new Date(request.day);
      const currentDate = new Date();
      return requestDate.getTime() > currentDate.getTime();
    });
    setRequests(upcomingRequests);
  }

  async function handleShowPastRequests() {
    const requests = await getAllRequests(props.foundService.serviceId);
    const pastRequests = requests.filter((request: any) => {
      const requestDate = new Date(request.day);
      const currentDate = new Date();
      return requestDate.getTime() < currentDate.getTime();
    });
    setRequests(pastRequests);
  }

  function handleRequestStatusUpdate(requestId: string, status: string) {
    fetch(`/api/requests/updateRequest`, {
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

  function handleDeleteRequest(requestId: string) {
    fetch(`/api/requests/deleteRequest`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: requestId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    const updatedRequests = requests.filter((request: any) => {
      return request.id !== requestId;
    });

    setRequests(updatedRequests);
  }

  return (
    <div className="bg-[#DBCBD8] h-[100vh] overflow-y-scroll relative">
      <DesktopNavService page={page} setPage={setPage} userId={props.userId} />
      <RequestHeader />
      <SlideInFromLeft>
        <div className="flex flex-col w-full text-center bg-[#DBCBD8]">
          <div className="flex items-center justify-center gap-4 px-2 mt-24 mb-6">
            <button
              onClick={() => {
                getAllRequests(props.foundService.serviceId);
                setRequestsTimeframe('all');
              }}
              className={`px-8 py-2 bg-white border-2 rounded-xl ${
                requestsTimeframe === 'all' && 'bg-[#101935] text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                handleShowUpcomingRequests();
                setRequestsTimeframe('upcoming');
              }}
              className={`px-8 py-2 bg-white border-2 rounded-xl ${
                requestsTimeframe === 'upcoming' && 'bg-[#101935] text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => {
                handleShowPastRequests();
                setRequestsTimeframe('past');
              }}
              className={`px-8 py-2 bg-white border-2 rounded-xl ${
                requestsTimeframe === 'past' && 'bg-[#101935] text-white'
              }`}
            >
              Past
            </button>
          </div>
          <ul className="mb-20 overflow-y-auto sm:w-[500px] sm:mx-auto sm:border-2 sm:pt-8 rounded-xl sm:h-[750px] hide-scrollbar">
            {requests &&
              requests.map((request: any) => {
                const date = new Date(request.day);
                return (
                  <li
                    key={request.id}
                    className={`z-1 px-10 py-6 mx-10 mb-6 relative flex flex-col items-center text-[#564787] text-center bg-white  rounded-xl shadow-secondaryModified gap-5 ${
                      date < new Date() || request.status === 'rejected'
                        ? 'bg-gray-300'
                        : ''
                    }`}
                  >
                    {(date < new Date() && request.status === 'pending') ||
                    request.status === 'rejected' ? (
                      <div className="p-4 absolute top-3 left-[50%] translate-x-[-50%] w-[70%] h-[90%] bg-white z-[100]  rounded-xl">
                        <div className="flex flex-col items-center justify-between h-full gap-2 text-sm">
                          <div className="flex flex-col text-sm">
                            <span>{request.day}</span>
                            <span>
                              {request.timeslots.start}- {request.timeslots.end}
                            </span>
                            <span> with {request.userName}</span>
                          </div>

                          <span className="">
                            This Request is either expired or has been rejected
                            by you.
                          </span>

                          <span>
                            You have to wait for the user to delete this
                            request.
                          </span>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
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
                            handleRequestStatusUpdate(request.id, 'accepted');
                            request.status = 'accepted';
                            setRender((prev) => !prev);
                          }}
                          className="btn-secondary"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => {
                            handleRequestStatusUpdate(request.id, 'rejected');
                            request.status = 'rejected';
                            setRender((prev) => !prev);
                          }}
                          className="border-2 btn-primary"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <a href={`mailto:${request.userEmail}`}>
                        <button className="btn-secondary">Contact</button>
                      </a>
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
  const foundRequests = await getRequestsByServiceId(foundService?.serviceId);

  // console.log('found service', foundService);
  // console.log('found requests', foundRequests);

  const token = context.req.cookies.sessionToken;

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/service/${userId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: userId,
      foundService,
      foundRequests,
    },
  };
}
