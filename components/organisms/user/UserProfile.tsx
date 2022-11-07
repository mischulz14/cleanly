import { User } from '../../../pages/user/[userId]';
import Appear from '../../animation/Appear';
import PersonIcon from '../../atoms/icons/PersonIcon';

const UserProfile = (props: { user: User }) => {
  return (
    <Appear>
      {/* <UserAvatar />
    <UserDetails /> */}
      <div className="flex flex-col h-[100vh] items-center pt-14">
        <div className="p-4 mb-4 border-2 rounded-full">
          <PersonIcon />
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 pt-8 user__info">
          <li className="text-xl">
            Hello, {props.user.firstName} {props.user.lastName}!
          </li>

          <li>{props.user.email}</li>
          {/* <div>Description</div> */}
          {/* <div>Location</div> */}
          <li>General Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </Appear>
  );
};

export default UserProfile;
