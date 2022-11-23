import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ClickAnimation from '../../../components/animation/ClickAnimation';
import ConfirmationAnimation from '../../../components/animation/ConfirmationAnimation';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import SlideInFromTop from '../../../components/animation/SlideInFromTop';
import XAnimation from '../../../components/animation/XAnimation';
import GoBackButton from '../../../components/atoms/buttons/GoBackButton';
import PersonIcon from '../../../components/atoms/icons/PersonIcon';
import CurrentAvailabilities from '../../../components/molecules/availability/CurrentAvailabilities';
import { getRatingsByServiceId } from '../../../data/ratings';
import { getServiceById, getUserInfoByServiceId } from '../../../data/services';
import { getUserById } from '../../../data/users';
import { colors } from '../../../utils/colors';
import { getAverageRating } from '../../../utils/getAverageRating';

const ServiceInfo = (props: any) => {
  const [showCurrentAvailabilities, setShowCurrentAvailabilities] =
    useState(false);
  const [availabilities, setAvailabilities] = useState([]);
  const [errors, setErrors] = useState('');
  const chosenTimeslotsArray: any = [];
  const [sentRequest, setSentRequest] = useState(false);

  const rating = getAverageRating(props.ratings);

  // console.log('rating', rating);

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
        // console.log(data);
        if (data.error) {
          setErrors(data.error);
        }
      });
  }

  return (
    <SlideInFromLeft>
      <div
        className={`text-center flex flex-col bg-[${colors.secondary}] relative py-10  min-h-[100vh] overflow-y-scroll`}
      >
        <GoBackButton />

        <div className="flex flex-col w-full gap-3 px-4">
          {props.completeService.image ? (
            <img
              src={props.completeService.image}
              alt="service"
              className="object-cover w-32 h-32 mx-auto mb-4 border-2 rounded-full"
            />
          ) : (
            <div className="p-4 mx-auto mb-8 bg-white rounded-full">
              <PersonIcon />
            </div>
          )}
          {!Number.isNaN(rating) && (
            <div className="text-[#564787] flex items-center justify-center mb-2 w-full gap-1 ">
              <FaStar size={30} />{' '}
              <span className="translate-y-[2px]">{rating}</span>
            </div>
          )}
          {props.completeService.description && (
            <div className="p-4 mx-auto mb-4 text-center bg-white rounded-xl">
              {props.completeService.description}
            </div>
          )}

          <ClickAnimation>
            <button
              onClick={() => {
                setShowCurrentAvailabilities((prevState) => !prevState);
                setErrors('');
                setSentRequest(false);
              }}
              className="bg-[#564787] text-white px-8 py-6 rounded-lg mx-auto w-full text-center cursor-pointer z-[99] shadow-secondary"
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
                <div>
                  <CurrentAvailabilities
                    availabilities={availabilities}
                    serviceId={props.serviceId}
                    toDelete={false}
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
                        setErrors(
                          "Either this service doesn't have any availabilities or you haven't selected any",
                        );
                      } else {
                        handleUserRequest();
                        setSentRequest(true);
                        setShowCurrentAvailabilities(false);
                      }
                    }}
                    className="mx-auto mt-8 btn-secondary"
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

  const ratings = JSON.stringify(await getRatingsByServiceId(serviceId));

  // console.log('ratings', ratings);

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
      ratings: JSON.parse(ratings),
    },
  };
}
