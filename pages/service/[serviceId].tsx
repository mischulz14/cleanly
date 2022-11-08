import { useState } from 'react';
import MobileNav from '../../components/organisms/navbar/MobileNav';
import { getServiceById } from '../../data/services';

const ServiceHomepage = (props: any) => {
  const [clickedSideNavIcon, setClickedSideNavIcon] = useState(2);
  return (
    <>
      <div>{}</div>
      {/* <MobileNav
        clickedSideNavIcon={clickedSideNavIcon}
        setClickedSideNavIcon={setClickedSideNavIcon}
      /> */}
    </>
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
