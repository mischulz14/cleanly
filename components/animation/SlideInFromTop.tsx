import { motion } from 'framer-motion';

const SlideInFromTop = (props: { children: any }) => {
  return (
    // framer motion to slide in from top
    <motion.div
      initial={{ y: -50, opacity: 0.3 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {props.children}
    </motion.div>
  );
};

export default SlideInFromTop;
