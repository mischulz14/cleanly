import { handleSetNewAvailabilities } from '../../utils/availabilities';
import { groupObjectByProperties } from '../../utils/groupObjects';
import SlideInFromTop from '../animation/SlideInFromTop';
import TimeSlotListItem from './TimeslotListItem';

const AvailabilitiesCalendar = (props: {
  days: any;
  timeslots: any;
  requestedTimeslots: any;
}) => {
  return (
    <SlideInFromTop>
      <div className="flex flex-col items-center justify-center mt-2 availabilities-calendar">
        <ul className="flex overflow-x-scroll w-[95vw] gap-2 border-2 p-2 rounded-xl mx-auto">
          {props.days().map((day: any) => (
            <li key={Math.random()}>
              <ul className="h-[400px] w-[180px] overflow-y-scroll flex flex-col gap-1 pt-4 relative px-4">
                <div className="text-center ">
                  {day.day.toString().slice(0, 10)}
                </div>
                {props.timeslots.map((timeslot: any) => (
                  <TimeSlotListItem
                    key={Math.random()}
                    day={day}
                    timeslot={timeslot}
                    requestedTimeslots={props.requestedTimeslots}
                    // groupedTimeslots={groupedTimeslots}
                  />
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            console.log(
              groupObjectByProperties(props.requestedTimeslots, 'day'),
            );

            handleSetNewAvailabilities(
              groupObjectByProperties(props.requestedTimeslots, 'day'),
            );
          }}
          className="mx-auto mt-6 btn-secondary"
        >
          Set Availabilities
        </button>
      </div>
    </SlideInFromTop>
  );
};

export default AvailabilitiesCalendar;
