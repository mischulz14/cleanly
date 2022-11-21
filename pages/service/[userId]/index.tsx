import { useEffect, useState } from 'react';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import RequestCard from '../../../components/molecules/RequestCard';
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

    const sortedRequests = data.requests.sort((a: any, b: any) => {
      const aDate = new Date(a.timeslots.day);
      const bDate = new Date(b.timeslots.day);
      return aDate.getTime() - bDate.getTime();
    });

    setRequests(sortedRequests);

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

  // JSX body starts here
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
                  <RequestCard
                    key={request.id}
                    date={date}
                    request={request}
                    setRender={setRender}
                    handleRequestStatusUpdate={handleRequestStatusUpdate}
                    name={request.userName}
                  />
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
