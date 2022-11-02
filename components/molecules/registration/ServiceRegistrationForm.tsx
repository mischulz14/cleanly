import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import RegisterButton from '../../atoms/buttons/RegisterButton';
import GoBackIcon from '../../atoms/icons/GoBackIcon';
import BirthdayInput from '../../atoms/inputs/BirthdayInput';
import EmailInput from '../../atoms/inputs/EmailInput';
import FirstNameInput from '../../atoms/inputs/FirstNameInput';
import LastNameInput from '../../atoms/inputs/LastNameInput';
import PasswordInput from '../../atoms/inputs/PasswordInput';
import RepeatPasswordInput from '../../atoms/inputs/RepeatPasswordInput';
import RegistrationConfirmation from './RegistrationConfirmation';

const ServiceRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const role = 'service';

  async function registerHandler() {
    const res = await fetch('/api/registration/service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        birthday,
        password,
        repeatPassword,
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <>
      {!confirmation && (
        <SlideInFromLeft>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative user__registration bg-[#564787] h-[100vh] flex flex-col pt-20 px-10"
          >
            <Link href="/registration">
              <button className="absolute top-2 left-2">
                <GoBackIcon />
              </button>
            </Link>
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
            <LastNameInput lastName={lastName} setLastName={setLastName} />
            <EmailInput email={email} setEmail={setEmail} />
            <BirthdayInput birthday={birthday} setBirthday={setBirthday} />
            <PasswordInput password={password} setPassword={setPassword} />
            <RepeatPasswordInput
              repeatPassword={repeatPassword}
              setRepeatPassword={setRepeatPassword}
            />
            <RegisterButton registerHandler={registerHandler} setConfirmation={setConfirmation} />
          </form>
        </SlideInFromLeft>
      )}

      {confirmation && (
        <div className="flex items-center justify-center bg-[#564787] h-[100vh]">
          <RegistrationConfirmation role={role} />
        </div>
      )}
    </>
  );
};

export default ServiceRegistrationForm;
