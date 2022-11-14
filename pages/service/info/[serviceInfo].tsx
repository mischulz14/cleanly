import { filterProps } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import ClickAnimation from '../../../components/animation/ClickAnimation';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import SlideInFromTop from '../../../components/animation/SlideInFromTop';
import GoBackButton from '../../../components/atoms/buttons/GoBackButton';
import GoBackIcon from '../../../components/atoms/buttons/GoBackButton';
import CurrentAvailabilities from '../../../components/molecules/availability/CurrentAvailabilities';
import AvailabilityComponent from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { serviceData } from '../../../data/service';
import { getServiceById } from '../../../data/services';
import { selectAllServicesWithSpecificUserId } from '../../../data/usersServicesRelations';
import { colors } from '../../../utils/colors';

const ServiceInfo = (props: any) => {
  const [currentAvailabilities, setCurrentAvailabilities] = useState(false);
  console.log(props.foundAvailabilities);
  const [toDelete, setToDelete] = useState(false);

  return (
    <SlideInFromLeft>
      <div
        className={`flex  items-center flex-col bg-[${colors.secondary}] relative py-20  h-[100vh]`}
      >
        <GoBackButton />
        {/* <div>{props.serviceId}</div> */}
        {/* <div>{props.foundService.price}</div> */}
        <div className="w-full px-4 flex flex-col items-center">
          <ClickAnimation>
            <button
              onClick={() => {
                setCurrentAvailabilities((prevState) => !prevState);
              }}
              className="bg-[#564787] text-white px-8 py-6 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
            >
              See Current Availabilities
            </button>
          </ClickAnimation>
          {currentAvailabilities && (
            <SlideInFromTop>
              <CurrentAvailabilities
                availabilities={props.availabilities}
                serviceId={props.serviceId}
                toDelete={toDelete}
              />
            </SlideInFromTop>
          )}
        </div>
        {/* <div>{props.foundService.price}</div> */}

        {/* <GoBackButton /> */}
      </div>
    </SlideInFromLeft>
  );
};

export default ServiceInfo;

export async function getServerSideProps(context: any) {
  const serviceId = context.query.serviceInfo;

  const foundService = await getServiceById(serviceId);

  const foundAvailabilities = JSON.stringify(
    // @ts-ignore
    await getAllAvailabilitiesById(foundService[0]?.id),
  );

  console.log(foundAvailabilities);

  if (!(await getServiceById(serviceId))) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: {
      foundService,
      serviceId,
      foundAvailabilities: JSON.parse(foundAvailabilities),
    },
  };
}
