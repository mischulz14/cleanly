import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import GoBackButton from '../../atoms/buttons/GoBackButton';
import GoBackIcon from '../../atoms/buttons/GoBackButton';
import RegisterButton from '../../atoms/buttons/RegisterButton';
import BirthdayInput from '../../atoms/inputs/BirthdayInput';
import CompanyNameInput from '../../atoms/inputs/CompanyNameInput';
import DistrictInput from '../../atoms/inputs/DistrictInput';
import EmailInput from '../../atoms/inputs/EmailInput';
import FirstNameInput from '../../atoms/inputs/FirstNameInput';
import LastNameInput from '../../atoms/inputs/LastNameInput';
import PasswordInput from '../../atoms/inputs/PasswordInput';
import PriceInput from '../../atoms/inputs/PriceInput';
import RepeatPasswordInput from '../../atoms/inputs/RepeatPasswordInput';
import RegistrationConfirmation from './RegistrationConfirmation';

const ServiceRegistrationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [district, setDistrict] = useState('');
  const [email, setEmail] = useState('');
  // const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState([]);
  const [id, setId] = useState('');
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
        companyName,
        email,
        password,
        price,
        district,
      }),
    });
    const data = await res.json();
    console.log(data);

    if ('errors' in data) {
      setErrors(data.errors);
      return console.log(data.errors);
    }

    const returnTo = Router.query.returnTo as string;

    if (returnTo && /^\/[a-zA-Z0-9\-_]+$/.test(returnTo)) {
      Router.push(returnTo);
      return;
    }

    if (data.user.role === 'user') {
      await Router.push(`/user/${data.user.id}`);
    }

    if (data.user.role === 'service') {
      await Router.push(`/service/${data.user.id}`);
    }

    setId(data.user.id);
    setConfirmation(true);
  }

  return (
    <>
      {!confirmation && (
        <SlideInFromLeft>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative user__registration bg-[#564787] flex flex-col py-20 px-10 overflow-y-scroll
          scrollbar-hide"
          >
            <GoBackButton />
            <FirstNameInput firstName={firstName} setFirstName={setFirstName} />
            <LastNameInput lastName={lastName} setLastName={setLastName} />
            <CompanyNameInput
              companyName={companyName}
              setCompanyName={setCompanyName}
            />

            <EmailInput email={email} setEmail={setEmail} />
            {/* <BirthdayInput birthday={birthday} setBirthday={setBirthday} /> */}
            <DistrictInput district={district} setDistrict={setDistrict} />
            <PriceInput price={price} setPrice={setPrice} />
            <PasswordInput password={password} setPassword={setPassword} />
            <RepeatPasswordInput
              repeatPassword={repeatPassword}
              setRepeatPassword={setRepeatPassword}
            />
            <RegisterButton
              registerHandler={registerHandler}
              setConfirmation={setConfirmation}
            />
          </form>
        </SlideInFromLeft>
      )}

      {confirmation && (
        <div className="flex items-center justify-center bg-[#564787] h-[100vh]">
          <RegistrationConfirmation role={role} id={id} />
        </div>
      )}
    </>
  );
};

export default ServiceRegistrationForm;
