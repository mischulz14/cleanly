import { motion } from 'framer-motion';
import { variants } from '../../utils/animationUtils';

const SlideInFromLeft = (props: any) => {
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 250, damping: 30 },
        opacity: { duration: 0.6 },
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default SlideInFromLeft;
