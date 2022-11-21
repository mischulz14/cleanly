import { request } from 'http';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import CalendarIcon from '../../../components/atoms/icons/CalendarIcon';
import ClockIcon from '../../../components/atoms/icons/ClockIcon';
import RequestHeader from '../../../components/molecules/RequestHeader';
import DesktopNavUser from '../../../components/organisms/navbar/DesktopNavUser';
import MobileNavUser from '../../../components/organisms/navbar/MobileNavUser';
import { getRequestsByUserId } from '../../../data/requests';
import { getValidSessionByToken } from '../../../data/sessions';
import { getUserById } from '../../../data/users';

const UserRequests = (props: any) => {
  const [page, setPage] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [rating, setRating] = useState(0);
  const [requestsTimeframe, setRequestsTimeframe] = useState('upcoming');
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState<undefined | number>(undefined);

  // sort requests by day
  const sortedRequests = props.foundRequests.sort((a: any, b: any) => {
    const aDate = new Date(a.day);
    const bDate = new Date(b.day);
    return aDate.getTime() - bDate.getTime();
  });

  useEffect(() => {
    const upcomingRequests = sortedRequests.filter((request: any) => {
      const requestDate = new Date(request.day);
      const currentDate = new Date();
      return requestDate.getTime() > currentDate.getTime();
    });
    setRequests(upcomingRequests);
  }, []);

  async function getAllRequests(idFromRequest: string) {
    const response = await fetch(`/api/requests/${idFromRequest}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    setRequests(data.requests);

    return data.requests;
  }

  const stars = Array(5).fill(0);

  function handleClickStars(value: number) {
    setCurrentValue(value);
  }

  function handleHoverStars(value: number) {
    setHoverValue(value);
  }

  function handleLeaveStars() {
    setHoverValue(undefined);
  }

  async function handleShowUpcomingRequests() {
    const requests = await getAllRequests(props.userId);

    const upcomingRequests = requests.filter((request: any) => {
      const requestDate = new Date(request.day);
      const currentDate = new Date();
      return requestDate.getTime() > currentDate.getTime();
    });
    setRequests(upcomingRequests);
  }

  async function handleShowPastRequests() {
    const requests = await getAllRequests(props.userId);
    const pastRequests = requests.filter((request: any) => {
      const requestDate = new Date(request.day);
      const currentDate = new Date();
      return requestDate.getTime() < currentDate.getTime();
    });
    setRequests(pastRequests);
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

  function handleCreateNewRating(serviceId: string, rating: number) {
    fetch(`/api/ratings/createRating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId: serviceId,
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="relative flex flex-col w-full text-center rounded-xl">
      <DesktopNavUser page={page} setPage={setPage} userId={props.userId} />
      <RequestHeader />
      <SlideInFromLeft>
        <div className="flex items-center justify-center gap-4 px-2 mt-24">
          <button
            onClick={() => {
              getAllRequests(props.userId);
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
        <ul className="flex-wrap justify-center pt-6 mb-20 overflow-y-auto sm:mx-auto sm:flex hide-scrollbar">
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
                  {date < new Date() && request.status !== 'pending' ? (
                    <div className="p-4 absolute top-4 left-[50%] translate-x-[-50%] w-[70%] h-[90%] bg-white z-[100]  rounded-xl">
                      <span className="">
                        How was the service from {request.serviceName} on{' '}
                        {request.day.slice(0, 10)} from{' '}
                        {request.timeslots.start} - {request.timeslots.end}?
                      </span>
                      <div className=" flex items-center justify-center w-full pt-8 text-[#9AD]">
                        {stars.map((star, index) => (
                          <FaStar
                            size={30}
                            key={index}
                            color={
                              index < (hoverValue || currentValue)
                                ? '#564787'
                                : '#9AD'
                            }
                            onClick={() => {
                              handleClickStars(index + 1);
                              setRating(index + 1);
                              console.log(index + 1);
                            }}
                            onMouseEnter={() => handleHoverStars(index + 1)}
                            onMouseLeave={handleLeaveStars}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          handleCreateNewRating(request.serviceId, rating);
                          setRating(0);
                          handleDeleteRequest(request.id);
                        }}
                        className="mt-10 btn-secondary"
                      >
                        Submit Rating
                      </button>
                    </div>
                  ) : (
                    ''
                  )}

                  {(date < new Date() && request.status === 'pending') ||
                  request.status === 'rejected' ? (
                    <div className="overflow-y-auto p-4 absolute top-4 left-[50%] translate-x-[-50%] w-[70%] h-[90%] bg-white z-[100]  rounded-xl">
                      <div className="flex flex-col items-center justify-between h-full">
                        <div className="flex flex-col text-sm">
                          <span>{request.day}</span>
                          <span>
                            {request.timeslots.start}- {request.timeslots.end}
                          </span>
                          <span> with {request.serviceName}</span>
                        </div>
                        <span className="">
                          This Request is expired or has been rejected.
                        </span>

                        <button
                          onClick={() => {
                            handleDeleteRequest(request.id);
                          }}
                          className="mt-3 text-sm btn-secondary"
                        >
                          Delete Request
                        </button>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
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
                    <a href={`mailto:${request.serviceEmail}`}>
                      <button className="btn-secondary">Contact</button>
                    </a>
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
  const foundRequests = JSON.stringify(await getRequestsByUserId(userId));

  const foundUser = await getUserById(userId);

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/user/${userId}/requests`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId,
      foundRequests: JSON.parse(foundRequests),
      foundUser,
    },
  };
}
