import { motion } from 'framer-motion';

const SlideInFromTop = (props: { children: any }) => {
  return (
    // framer motion to slide in from top with a bounce at the end
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      exit={{ y: -100, opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
};

export default SlideInFromTop;
