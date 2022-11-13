import { useEffect, useState } from 'react';
import TimeSlotListItem from '../../../components/molecules/TimeslotListItem';
import MobileNavService from '../../../components/organisms/navbar/MobileNavService';
import AvailabilityComponent from '../../../components/organisms/service/AvailabilityPage';
import { getAllAvailabilitiesById } from '../../../data/availabilities';
import { getServiceById } from '../../../data/services';
import { handleSetNewAvailabilities } from '../../../utils/availabilities';

const ServiceHomepage = (props: any) => {
  const [page, setPage] = useState('home');
  const [availabilities, setAvailabilities] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setAvailabilities(props.availabilities);
  }, [render]);

  return (
    <div className="bg-[#DBCBD8] pt-8 h-[100vh] overflow-y-scroll">
      {page === 'availability' && (
        <AvailabilityComponent
          serviceId={props.serviceId}
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

  const availabilities = await getAllAvailabilitiesById(2);

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
