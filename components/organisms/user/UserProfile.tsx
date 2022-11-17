import Image from 'next/image';
import Link from 'next/link';
import Appear from '../../animation/Appear';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import EditIcon from '../../atoms/icons/EditIcon';
import PersonIcon from '../../atoms/icons/PersonIcon';

const UserProfile = (props: any) => {
  return (
    <SlideInFromLeft>
      {/* <UserAvatar />
    <UserDetails /> */}
      <div className="flex flex-col h-[100vh] items-center pt-14 bg-white">
        <div className="relative p-4 mb-4 border-2 rounded-full">
          <PersonIcon />
          <button className="absolute flex items-center justify-center object-contain w-10 h-10 border-2 rounded-full -right-2 -bottom-3 bg-slate-300">
            <EditIcon width={20} height={20} />
          </button>
        </div>
        <ul className="flex flex-col items-center justify-center gap-8 pt-8 user__info">
          <li className="text-xl">
            Hello, {props.user.firstName} {props.user.lastName}!
          </li>

          <li>{props.user.email}</li>
          {/* <div>Description</div> */}
          {/* <div>Location</div> */}
          <Link href={props.settingsLink}>
            <li className="">
              <button className="flex items-center px-3 py-2 transition-all duration-300 border-2 hover:scale-105 active:scale-95 gap-14 rounded-xl">
                <span className="block">Settings</span>
                <Image src="/images/settings.svg" height="30" width="30" />
              </button>
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
