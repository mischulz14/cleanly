import { motion } from 'framer-motion';
import { variants } from '../../utils/animationUtils';

const SlideInFromRight = (props: any) => {
  return (
    //  framer motion to slide in from right
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{
        x: { type: 'spring', stiffness: 250, damping: 30 },
        opacity: { duration: 0.6 },
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default SlideInFromRight;
