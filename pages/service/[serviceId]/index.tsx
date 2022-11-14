import { useEffect, useState } from 'react';
import TimeSlotListItem from '../../../components/molecules/availability/TimeslotListItem';
import MobileNavService from '../../../components/organisms/navbar/MobileNavService';
import AvailabilityComponent from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { getServiceById, getServicesByUserId } from '../../../data/services';
import { handleSetNewAvailabilities } from '../../../utils/availabilities';

const ServiceHomepage = (props: any) => {
  const [page, setPage] = useState('home');
  const [availabilities, setAvailabilities] = useState([]);
  const [render, setRender] = useState(false);

  console.log(props.foundService[0]?.serviceId);

  useEffect(() => {
    setAvailabilities(props.foundService[0]?.serviceId);
  }, [render]);

  return (
    <div className="bg-[#DBCBD8] pt-8 h-[100vh] overflow-y-scroll">
      {page === 'availability' && (
        <AvailabilityComponent
          serviceId={props.foundService[0]?.serviceId}
          setRender={setRender}
          availabilities={props.availabilities}
        />
      )}

      <MobileNavService
        page={page}
        setPage={setPage}
        serviceId={props.serviceId}
      />
    </div>
  );
};

export default ServiceHomepage;

export async function getServerSideProps(context: any) {
  const serviceId = context.query.serviceId;

  const availabilities = await getAllAvailabilitiesById(serviceId);

  const foundService = JSON.stringify(await getServicesByUserId(serviceId));

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
      foundService: JSON.parse(foundService),
    },
  };
}
