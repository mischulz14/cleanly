import { useState } from 'react';
import CalendarIcon from '../../../components/atoms/icons/CalendarIcon';
import MobileNav from '../../../components/organisms/navbar/MobileNavService';
import AvailabilityPage from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { getServiceById, getServicesByUserId } from '../../../data/services';

const AvailabilityServicePage = (props: any) => {
  const [page, setPage] = useState('availability');

  return (
    <>
      <div className="bg-[#DBCBD8] pt-24 pb-24 overflow-y-scroll h-[100vh] relative">
        <div className="pl-20 mb-6 text-xl flex items-center gap-2 text-[#564787] bg-white rounded-b-xl p-4 fixed top-0 left-0 z-[10000] w-full border-b-2">
          <CalendarIcon />
          <span className="font-semibold ">Your Availabilities</span>
        </div>
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
