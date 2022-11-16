import { useState } from 'react';
import MobileNav from '../../../components/organisms/navbar/MobileNavService';
import AvailabilityPage from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { getServiceById, getServicesByUserId } from '../../../data/services';

const AvailabilityServicePage = (props: any) => {
  const [page, setPage] = useState('availability');

  return (
    <>
      <div className="bg-[#DBCBD8] pt-8 pb-24 overflow-y-scroll h-[100vh]">
        <AvailabilityPage
          serviceId={props.foundService.serviceId}
          availabilities={props.availabilities}
        />
      </div>
      <MobileNav page={page} setPage={setPage} serviceId={props.userId} />
    </>
  );
};

export default AvailabilityServicePage;

export async function getServerSideProps(context: any) {
  const userId = context.query.userId;

  const service = JSON.stringify(await getServicesByUserId(userId));

  const foundService = JSON.stringify(await getServicesByUserId(userId));

  console.log('serviceId', JSON.parse(service).serviceId);

  const availabilities = await getAllAvailabilitiesById(1);

  console.log('availabilities', availabilities);

  console.log('found service', foundService);

  return {
    props: {
      userId: userId,
      availabilities: availabilities,
      foundService: JSON.parse(foundService),
      serviceId: JSON.parse(service).serviceId,
    },
  };
}
