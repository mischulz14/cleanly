import { motion } from 'framer-motion';
import PersonIcon from '../../atoms/icons/PersonIcon';

const UserProfile = () => {
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
      className="flex flex-col items-center h-full gap-8 py-16 bg-white"
    >
      {/* <UserAvatar />
    <UserDetails /> */}
      <PersonIcon />
      <div>Name</div>
      <div>Description</div>
      <div>Location</div>
      <div>Settings</div>
    </motion.div>
  );
};

export default UserProfile;
