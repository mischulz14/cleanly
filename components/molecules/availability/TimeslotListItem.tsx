import ClickAnimation from '../../animation/ClickAnimation';

const TimeSlotListItem = (props: {
  day: string;
  timeslot: any;
  chosenTimeslotsArray: any;
  toDelete: boolean;
  showStatus: boolean;
}) => {
  const chosenTimeslotByService = {
    day: props.day,
    timeslot: props.timeslot,
  };

  return (
    <li className="relative mt-3 bg-white text-md rounded-xl">
      <button
        disabled={props.timeslot.status === 'booked' ? true : false}
        onClick={(e) => {
          if (!props.chosenTimeslotsArray) {
            return;
          }
          e.currentTarget.classList.toggle('bg-[#101935]');
          e.currentTarget.classList.toggle('text-white');
          if (props.chosenTimeslotsArray.includes(chosenTimeslotByService)) {
            props.chosenTimeslotsArray.splice(
              props.chosenTimeslotsArray.indexOf(chosenTimeslotByService),
              1,
            );
          } else {
            props.chosenTimeslotsArray.push(chosenTimeslotByService);
          }
          console.log(props.chosenTimeslotsArray);
          // props.groupedTimeslots = myFunc(props.requestedTimeslots, 'day');
        }}
        className="relative w-full px-4 py-2 overflow-visible text-md rounded-xl"
      >
        <div>
          {props.timeslot.start} - {props.timeslot.end}
        </div>
        {props.showStatus && (
          <div
            className={
              props.timeslot.status === 'booked'
                ? 'bg-red-400 rounded-xl mt-2'
                : 'bg-green-400 rounded-xl mt-2'
            }
          >
            {props.timeslot.status}
          </div>
        )}
        {props.toDelete && (
          <div className="btn-secondary  p-2 absolute top-[-10px] right-[-15px] w-7 h-7 flex justify-center items-center rounded-full hover:scale-105 active:scale-95">
            X
          </div>
        )}
      </button>
    </li>
  );
};

export default TimeSlotListItem;
