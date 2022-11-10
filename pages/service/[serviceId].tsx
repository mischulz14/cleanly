import { useState } from 'react';
import MobileNavService from '../../components/organisms/navbar/MobileNavService';
import AvailabilityComponent from '../../components/organisms/service/Availability';
import { getServiceById } from '../../data/services';
import { handleSetNewAvailabilities } from '../../utils/availabilities';

const ServiceHomepage = (props: any) => {
  const [page, setPage] = useState('home');

  return (
    <div className="bg-[#DBCBD8] pt-8">
      {page === 'availability' && (
        <AvailabilityComponent
        />
      )}
      <MobileNavService page={page} setPage={setPage} />
    </div>
  );
};

export default ServiceHomepage;

export async function getServerSideProps(context: any) {
  const serviceId = context.query.serviceId;

  console.log(serviceId);

  // const foundService = JSON.stringify(await getServiceById(serviceId));

  // console.log(foundService);

  // if (!(await getServiceById(serviceId))) {
  //   context.res.statusCode = 404;
  //   return {
  //     props: {},
  //   };
  // }

  return {
    props: {
      // foundService: JSON.parse(foundService),
    },
  };
}
