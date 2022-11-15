import Image from 'next/image';
import Link from 'next/link';
import Appear from '../../animation/Appear';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import PersonIcon from '../../atoms/icons/PersonIcon';

const UserProfile = (props: any) => {
  return (
    <SlideInFromLeft>
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
          <Link href={props.settingsLink}>
            <li className="flex items-center px-3 py-2 border-2 gap-14 rounded-xl">
              <span className="block">Settings</span>
              <Image src="/images/settings.svg" height="30" width="30" />
            </li>
          </Link>
          <Link href="/logout">
            <li>
              <button className="btn-secondary">Logout</button>
            </li>
          </Link>
        </ul>
      </div>
    </SlideInFromLeft>
  );
};

export default UserProfile;
