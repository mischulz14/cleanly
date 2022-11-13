import { useState } from 'react';
import MobileNav from '../../../components/organisms/navbar/MobileNavService';
import AvailabilityPage from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { getServiceById } from '../../../data/services';

const AvailabilityServicePage = (props: any) => {
  const [page, setPage] = useState('availability');
  const [availabilities, setAvailabilities] = useState([]);
  const [render, setRender] = useState(false);
  return (
    <>
      <div className="bg-[#DBCBD8] pt-8 pb-24 overflow-y-scroll h-[100vh]">
        <AvailabilityPage
          serviceId={props.serviceId}
          availabilities={props.availabilities}
        />
      </div>
      <MobileNav page={page} setPage={setPage} serviceId={props.serviceId} />
    </>
  );
};

export default AvailabilityServicePage;

export async function getServerSideProps(context: any) {
  const serviceId = context.query.serviceId;

  const availabilities = await getAllAvailabilitiesById(serviceId);

  // const foundService = JSON.stringify(await getServiceById(serviceId));

  // console.log(foundService);

  if (!(await getServiceById(serviceId))) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: {
      serviceId,
      availabilities: availabilities,
    },
  };
}
