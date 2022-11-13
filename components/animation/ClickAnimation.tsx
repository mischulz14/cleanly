import { motion } from 'framer-motion';

const ClickAnimation = (props: any) => {
  return (
    // framer motion animation when you click on a button
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {props.children}
    </motion.div>
  );
};

export default ClickAnimation;
