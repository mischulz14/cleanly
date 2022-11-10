// 1. calendar test: https://devexpress.github.io/devextreme-reactive/react/scheduler/docs/guides/getting-started/
// import {
//   AppointmentTooltip,
//   EditingState,
//   IntegratedEditing,
//   ViewState,
// } from '@devexpress/dx-react-scheduler';
// import {
//   AppointmentForm,
//   Appointments,
//   DateNavigator,
//   EditRecurrenceMenu,
//   Scheduler,
//   Toolbar,
//   WeekView,
// } from '@devexpress/dx-react-scheduler-material-ui';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import { useState } from 'react';
// 2. calendar test: react-big-calendar + react-datepicker + date-fns
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
// 3. calendar test: daytimepicker from mooncake dev
// import DayTimePicker from '@mooncake-dev/react-day-time-picker';
// 4. calendar test: from scratch
import { days } from '../../../data/days';
import { timeslots } from '../../../data/timeslots';
import { groupObjectByProperties } from '../../../utils/groupObjects';
import SlideInFromLeft from '../../animation/SlideInFromLeft';
import AvailabilitiesCalendar from '../../molecules/AvailabilitiesCalendar';
import TimeSlotListItem from '../../molecules/TimeslotListItem';

const AvailabilityComponent = () => {
  const requestedTimeslots: any = [];
  const [changeAvailabilities, setChangeAvailabilities] = useState(false);
  const [newAvailabilities, setNewAvailabilities] = useState(false);
  const [currentAvailabilities, setCurrentAvailabilities] = useState(false);

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
  });

  return (
    <SlideInFromLeft>
      <div className="flex flex-col items-center  mx-auto h-[100vh]">
        <div className="mb-6 text-xl text-center text-[#564787]">
          Availability
        </div>

        <ul className="w-[95vw] sm:w-[60vw] flex flex-col justify-center items-center gap-4">
          <li className="w-full rounded-lg">
            <button
              onClick={() => {
                setNewAvailabilities((prevState) => !prevState);
              }}
              className="bg-[#564787] text-white px-8 py-4 rounded-lg w-full text-center cursor-pointer z-[99] shadow-secondary"
            >
              Set New Availabilities
            </button>
            {newAvailabilities && (
              <AvailabilitiesCalendar
                timeslots={timeslots}
                days={days}
                requestedTimeslots={requestedTimeslots}
              />
            )}
          </li>
          <li className="bg-[#564787] text-white px-8 py-4 rounded-lg w-full text-center cursor-pointer">
            <button>Change Availabilities</button>
          </li>
          <li className="bg-[#564787] text-white px-8 py-4 rounded-lg w-full text-center cursor-pointer">
            <button>See Current Availabilities</button>
          </li>
        </ul>
      </div>
    </SlideInFromLeft>
  );
};

export default AvailabilityComponent;
