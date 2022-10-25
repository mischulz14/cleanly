import { motion } from 'framer-motion';
import Link from 'next/link';
import SlideInFromLeft from '../../components/animation/SlideInFromLeft';
import GoBackIcon from '../../components/atoms/icons/GoBackIcon';
import { cleaningData } from '../../dummydata/cleaning';
import { colors } from '../../utils/colors';

const CleaningDetailsPage = (props: any) => {
  return (
    <SlideInFromLeft>
      <div
        className={`flex flex-col items-center justify-center h-[100vh] bg-[${colors.secondary}] relative`}
      >
        <Link href="/user">
          <div className="absolute top-2 left-2">
            <GoBackIcon />
          </div>
        </Link>
        <div>Availability</div>
        <div>{props.foundCleaning.price}</div>
        <button className="shadow-none btn-secondary">Request Service</button>
      </div>
    </SlideInFromLeft>
  );
};

export default CleaningDetailsPage;

export function getServerSideProps(context: any) {
  const cleaningArr = cleaningData;

  const cleaningId = parseInt(context.query.cleaningId);
  console.log(cleaningId);

  const foundCleaning = cleaningArr.find(
    (cleaning: any) => cleaning.id === cleaningId,
  );

  return {
    props: { cleaningData: cleaningArr, foundCleaning },
  };
}
