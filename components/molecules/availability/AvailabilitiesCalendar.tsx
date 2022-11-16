import { Dispatch, SetStateAction } from 'react';
import { handleSetNewAvailabilities } from '../../../utils/availabilities';
import { groupObjectByProperties } from '../../../utils/groupObjects';
import ClickAnimation from '../../animation/ClickAnimation';
import SlideInFromTop from '../../animation/SlideInFromTop';
import TimeSlotListItem from './TimeslotListItem';

const AvailabilitiesCalendar = (props: {
  days: any;
  timeslots: any;
  chosenTimeslotsArray: any;
  serviceId: number;
  setNewAvailabilities: Dispatch<SetStateAction<boolean>>;
  setChosenTimeslotsArray: Dispatch<SetStateAction<any>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-2 availabilities-calendar">
      <ul className="flex overflow-x-scroll w-[95vw] gap-2 border-2 p-2 rounded-xl mx-auto mt-4">
        {props.days().map((day: any) => (
          <li key={Math.random()}>
            <ul className="h-[400px] w-[180px] overflow-y-scroll flex flex-col gap-1 pt-4 relative px-4">
              <div className="text-center ">{day.day}</div>
              {props.timeslots.map((timeslot: any) => (
                <TimeSlotListItem
                  key={Math.random()}
                  day={day.day}
                  timeslot={timeslot}
                  chosenTimeslotsArray={props.chosenTimeslotsArray}
                  showStatus={false}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <ClickAnimation>
        <button
          onClick={() => {
            handleSetNewAvailabilities(
              groupObjectByProperties(props.chosenTimeslotsArray, 'day'),
              props.serviceId,
            );
            props.setNewAvailabilities(false);
          }}
          className="mx-auto mt-6 btn-secondary"
        >
          Set Availabilities
        </button>
      </ClickAnimation>
    </div>
  );
};

export default AvailabilitiesCalendar;
