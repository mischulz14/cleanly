import Link from 'next/link';
import SlideInFromLeft from '../../components/animation/SlideInFromLeft';
import GoBackIcon from '../../components/atoms/icons/GoBackIcon';
import AvailabilityComponent from '../../components/organisms/Availability';
import { serviceData } from '../../data/service';
import { colors } from '../../utils/colors';

const ServiceDetailsPage = (props: any) => {
  return (
    <SlideInFromLeft>
      <div
        className={`flex flex-col items-center justify-center h-[100vh] bg-[${colors.secondary}] relative`}
      >
        <AvailabilityComponent />
        {/* <div>{props.foundService.price}</div> */}
        <Link href="/user">
          <div className="absolute top-2 left-2">
            <GoBackIcon />
          </div>
        </Link>
      </div>
    </SlideInFromLeft>
  );
};

export default ServiceDetailsPage;

export function getServerSideProps(context: any) {
  const serviceArr = serviceData;

  const serviceId = parseInt(context.query.serviceId);

  const foundService = serviceArr.find(
    (service: any) => service.id === serviceId,
  );

  return {
    props: { serviceData: serviceArr, foundService },
  };
}
