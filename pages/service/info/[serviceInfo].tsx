import { useEffect, useState } from 'react';
import ClickAnimation from '../../../components/animation/ClickAnimation';
import ConfirmationAnimation from '../../../components/animation/ConfirmationAnimation';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import SlideInFromTop from '../../../components/animation/SlideInFromTop';
import XAnimation from '../../../components/animation/XAnimation';
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
    fetch(`/api/requests/newRequest`, {
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
        if (data.error) {
          setErrors(data.error);
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
              {errors ? <XAnimation /> : <ConfirmationAnimation />}

              <span className="block pt-8 text-white">
                {errors ? errors : 'Request sent!'}
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
