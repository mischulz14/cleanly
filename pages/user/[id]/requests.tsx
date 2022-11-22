import { useEffect, useState } from 'react';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import SlideInFromRight from '../../../components/animation/SlideInFromRight';
import RequestHeader from '../../../components/molecules/RequestHeader';
import RequestsFilter from '../../../components/molecules/RequestsFilter';
import UserRequestCard from '../../../components/molecules/UserRequestCard';
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

    const sortedRequests = data.requests.sort((a: any, b: any) => {
      const aDate = new Date(a.day);
      const bDate = new Date(b.day);
      return aDate.getTime() - bDate.getTime();
    });

    setRequests(sortedRequests);

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
    <div className="relative flex flex-col w-full h-full overflow-hidden text-center rounded-xl">
      <DesktopNavUser page={page} setPage={setPage} userId={props.userId} />
      <RequestHeader />
      <SlideInFromRight>
        <RequestsFilter
          handleShowUpcomingRequests={handleShowUpcomingRequests}
          handleShowPastRequests={handleShowPastRequests}
          getAllRequests={getAllRequests}
          id={props.userId}
          requestsTimeframe={requestsTimeframe}
          setRequestsTimeframe={setRequestsTimeframe}
        />
        <ul className="flex-wrap justify-center pt-6 mb-20 overflow-y-auto sm:mx-auto sm:flex hide-scrollbar">
          {requests &&
            requests.map((request: any) => {
              const date = new Date(request.day);
              return (
                <UserRequestCard
                  key={request.id}
                  request={request}
                  date={date}
                  handleDeleteRequest={handleDeleteRequest}
                  handleCreateNewRating={handleCreateNewRating}
                  stars={stars}
                  rating={rating}
                  setRating={setRating}
                  currentValue={currentValue}
                  hoverValue={hoverValue}
                  handleClickStars={handleClickStars}
                  handleHoverStars={handleHoverStars}
                  handleLeaveStars={handleLeaveStars}
                />
              );
            })}
        </ul>
      </SlideInFromRight>
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
