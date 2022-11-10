import { filterProps } from 'framer-motion';
import Link from 'next/link';
import SlideInFromLeft from '../../../components/animation/SlideInFromLeft';
import GoBackButton from '../../../components/atoms/buttons/GoBackButton';
import GoBackIcon from '../../../components/atoms/buttons/GoBackButton';
import AvailabilityComponent from '../../../components/organisms/service/Availability';
import { serviceData } from '../../../data/service';
import { getServiceById } from '../../../data/services';
import { colors } from '../../../utils/colors';

const ServiceInfo = (props: any) => {
  return (
    <SlideInFromLeft>
      <div className={`flex bg-[${colors.secondary}] relative py-10`}>
        {/* <div>{props.serviceId}</div> */}
        {/* <div>{props.foundService.price}</div> */}
        <AvailabilityComponent />
        {/* <div>{props.foundService.price}</div> */}

        {/* <GoBackButton /> */}
      </div>
    </SlideInFromLeft>
  );
};

export default ServiceInfo;

export async function getServerSideProps(context: any) {
  const serviceId = context.query.serviceInfo;

  console.log(serviceId);

  const foundService = JSON.stringify(await getServiceById(serviceId));

  if (!(await getServiceById(serviceId))) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: {
      foundService: JSON.parse(foundService),
      serviceId,
    },
  };
}
