import { useEffect, useState } from 'react';
import ClickAnimation from '../../../components/animation/ClickAnimation';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import SlideInFromTop from '../../../components/animation/SlideInFromTop';
import GoBackButton from '../../../components/atoms/buttons/GoBackButton';
import CurrentAvailabilities from '../../../components/molecules/availability/CurrentAvailabilities';
import { getServiceById, getUserInfoByServiceId } from '../../../data/services';
import { getUserById } from '../../../data/users';
import { colors } from '../../../utils/colors';

const ServiceInfo = (props: any) => {
  const [showCurrentAvailabilities, setShowCurrentAvailabilities] =
    useState(false);
  const [toDelete, setToDelete] = useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [errors, setErrors] = useState('');
  const chosenTimeslotsArray: any = [];
  const [sentRequest, setSentRequest] = useState(false);

  // console.log(props.userIdCookie, 'props.userIdCookie');

  useEffect(() => {
    // this useEffect fetches the availabilities of the service
    fetch(`/api/availabilities/${props.serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailabilities(data.availabilities);
        // console.log(data);
      });
  }, []);

  function handleUserRequest() {
    fetch(`/api/requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId: props.serviceId,
        userId: props.userIdCookie,
        chosenTimeslots: chosenTimeslotsArray,
        serviceName:
          props.completeService.firstName +
          ' ' +
          props.completeService.lastName,
        serviceEmail: props.completeService.email,
        userName: props.user.firstName + ' ' + props.user.lastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <SlideInFromLeft>
      <div
        className={`flex flex-col bg-[${colors.secondary}] relative py-20  h-[100vh] overflow-y-scroll`}
      >
        <GoBackButton />

        <div className="flex flex-col w-full px-4">
          <ClickAnimation>
            <button
              onClick={() => {
                setShowCurrentAvailabilities((prevState) => !prevState);
                setErrors('');
                setSentRequest(false);
              }}
              className="bg-[#564787] text-white px-8 py-6 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
            >
              See/Request Availabilities
            </button>
          </ClickAnimation>
          {sentRequest && (
            <div className="shadow-secondary flex flex-col items-center justify-center rounded-xl mt-6 py-12 bg-[#564787]">
              <svg
                version="1.1"
                height={100}
                width={100}
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 98.5 98.5"
                enableBackground="new 0 0 98.5 98.5"
                xmlSpace="preserve"
              >
                <path
                  className="checkmark"
                  fill="none"
                  strokeWidth="8"
                  strokeMiterlimit="10"
                  d="M81.7,17.8C73.5,9.3,62,4,49.2,4
	C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
                />
              </svg>
              <span className="block pt-8 text-white">
                Request has been sent!
              </span>
            </div>
          )}
          {showCurrentAvailabilities && (
            <div className="">
              <SlideInFromTop>
                <div className="flex flex-col grow">
                  <CurrentAvailabilities
                    availabilities={availabilities}
                    serviceId={props.serviceId}
                    toDelete={toDelete}
                    chosenTimeslotsArray={chosenTimeslotsArray}
                  />
                  {errors && (
                    <div className="mt-4 text-center text-red-500">
                      {errors}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (chosenTimeslotsArray.length === 0) {
                        setErrors('Please select at least one timeslot');
                      } else {
                        handleUserRequest();
                        setSentRequest(true);
                        setShowCurrentAvailabilities(false);
                      }
                    }}
                    className="mx-auto mt-4 btn-secondary"
                  >
                    Request Availabilities
                  </button>
                </div>
              </SlideInFromTop>
            </div>
          )}
        </div>
      </div>
    </SlideInFromLeft>
  );
};

export default ServiceInfo;

export async function getServerSideProps(context: any) {
  const serviceId = context.query.serviceInfo;

  const foundService = await getServiceById(serviceId);

  const completeService = await getUserInfoByServiceId(serviceId);

  // console.log(completeService, 'completeService');

  const userIdCookie = JSON.parse(context.req.cookies.userId);

  const user = JSON.stringify(await getUserById(userIdCookie));

  return {
    props: {
      foundService,
      serviceId,
      userIdCookie,
      completeService,
      user: JSON.parse(user),
    },
  };
}
