import { useState } from 'react';
import CalendarIcon from '../../../components/atoms/icons/CalendarIcon';
import DesktopNavService from '../../../components/organisms/navbar/DesktopNavService';
import MobileNav from '../../../components/organisms/navbar/MobileNavService';
import AvailabilityPage from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { getServiceById, getServicesByUserId } from '../../../data/services';
import { getValidSessionByToken } from '../../../data/sessions';

const AvailabilityServicePage = (props: any) => {
  const [page, setPage] = useState('availability');

  return (
    <>
      <DesktopNavService page={page} setPage={setPage} userId={props.userId} />
      <div className="bg-[#DBCBD8] pt-24 pb-24 overflow-y-auto hide-scrollbar max-h-[100vh] relative">
        <div className="sm:absolute shadow-secondaryModified py-4 rounded-b-xl text-xl flex items-center gap-2 text-[#564787] fixed bg-white top-0 left-0 z-[1000000] w-full justify-center sm:pl-0 sm:left-[50%] sm:bg-transparent sm:shadow-none sm:pt-6 sm:translate-x-[-50%] sm:top-2">
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

  const availabilities = await getAllAvailabilitiesById(1);

  const token = context.req.cookies.sessionToken;

  if (!token || !(await getValidSessionByToken(token))) {
    return {
      redirect: {
        destination: `/login?returnTo=/service/${userId}/availability`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: userId,
      availabilities: availabilities,
      foundService: JSON.parse(foundService),
      serviceId: JSON.parse(service).serviceId,
    },
  };
}
