// @ts-ignore
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import { days } from '../../data/days';
import { timeslots } from '../../data/timeslots';
import { groupObjectByProperties } from '../../utils/groupObjects';
import TimeSlotListItem from '../molecules/TimeslotListItem';

const AvailabilityComponent = () => {
  const requestedTimeslots: any = [];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">Availability</div>
      {/* <ul className="flex overflow-x-scroll w-[300px] gap-2 border-2 p-2 rounded-xl">
        {days.map((day) => (
          <li key={Math.random()}>
            <ul className="w-[180px] h-[400px] overflow-y-scroll flex flex-col gap-1 pt-4 relative px-4">
              <div className="text-center ">{day.day}</div>
              {timeslots.map((timeslot) => (
                <TimeSlotListItem
                  key={Math.random()}
                  day={day}
                  timeslot={timeslot}
                  requestedTimeslots={requestedTimeslots}
                  // groupedTimeslots={groupedTimeslots}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul> */}
      <DayTimePicker timeSlotSizeMinutes={60} />
      <button
        onClick={() => {
          console.log(groupObjectByProperties(requestedTimeslots, 'day'));
        }}
        className="mx-auto mt-6 btn-secondary"
      >
        Request Service
      </button>
    </div>
  );
};

export default AvailabilityComponent;
