import { motion } from 'framer-motion';

const Appear = (props: any) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default Appear;
