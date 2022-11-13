import { useEffect, useState } from 'react';
import TimeSlotListItem from './TimeslotListItem';

const CurrentAvailabilities = (props: any) => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    // get api call to get current availabilities
    fetch(`/api/availabilities/${props.serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailabilities(data.availabilities);
        console.log(data);
        console.log(availabilities);
      });
  }, []);

  return (
    <>
      {' '}
      <ul className="flex flex-col justify-center items-center overflow-x-scroll w-[95vw] gap-2 border-2 p-2 rounded-xl mx-auto mt-4">
        {availabilities &&
          availabilities?.map((availability: any) => (
            <li key={Math.random()}>
              <ul className=" w-[180px] overflow-y-scroll flex flex-col gap-1 py-8 relative px-4">
                <div className="text-center ">
                  {availability.day.toString().slice(0, 10)}
                </div>
                {availability.timeslots.map((timeslot: any) => (
                  <TimeSlotListItem
                    key={Math.random()}
                    day={availability.day}
                    timeslot={timeslot}
                    chosenTimeslotsArray={undefined}
                    // groupedTimeslots={groupedTimeslots}
                  />
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CurrentAvailabilities;
