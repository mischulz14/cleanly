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

  console.log(props.userId);

  useEffect(() => {
    setAvailabilities(props.availabilities);
  }, [render]);

  return (
    <div className="bg-[#DBCBD8] pt-8 h-[100vh] overflow-y-scroll">
      <MobileNavService
        page={page}
        setPage={setPage}
        serviceId={props.userId}
      />
    </div>
  );
};

export default ServiceHomepage;

export async function getServerSideProps(context: any) {
  const userId = context.query.userId;

  console.log(userId);

  const foundService = JSON.parse(
    JSON.stringify(await getServicesByUserId(userId)),
  );

  return {
    props: {
      userId: userId,
      foundService,
    },
  };
}
