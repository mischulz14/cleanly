import { useEffect, useState } from 'react';
import { handleDeleteAvailabilities } from '../../../utils/availabilities';
import { groupObjectByProperties } from '../../../utils/groupObjects';
import ClickAnimation from '../../animation/ClickAnimation';
import TimeSlotListItem from './TimeslotListItem';

const DeleteAvailabilities = (props: any) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [chosenTimeslotsArray, setChosenTimeslotsArray] = useState([]);
  const [toDelete, setToDelete] = useState(true);

  useEffect(() => {
    // get api call to get current availabilities
    fetch(`/api/availabilities/${props.serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailabilities(data.availabilities);
        console.log(data);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {' '}
      <ul className="flex flex-col justify-center items-center w-[95vw] gap-2 border-2 p-2 rounded-xl mx-auto mt-4">
        {availabilities &&
          availabilities?.map((availability: any) => (
            <li key={Math.random()} className="relative">
              <ul className="relative flex flex-col gap-2 px-4 py-8 ">
                <div className="text-center ">
                  {availability.day.toString().slice(0, 10)}
                </div>
                <div className="relative">
                  {availability.timeslots.map((timeslot: any) => (
                    <TimeSlotListItem
                      key={Math.random()}
                      day={availability.day}
                      timeslot={timeslot}
                      chosenTimeslotsArray={chosenTimeslotsArray}
                      toDelete={toDelete}
                      showStatus={true}

                      // groupedTimeslots={groupedTimeslots}
                    />
                  ))}
                </div>
              </ul>
            </li>
          ))}
      </ul>
      <button
        onClick={() => {
          handleDeleteAvailabilities(chosenTimeslotsArray, props.serviceId);
          props.setDeleteAvailabilities(false);
          // props.setNewAvailabilities(false);
        }}
        className="mx-auto mt-6 btn-secondary"
      >
        Delete Availabilities
      </button>
    </div>
  );
};

export default DeleteAvailabilities;
