import { useEffect, useState } from 'react';
import TimeSlotListItem from './TimeslotListItem';

const CurrentAvailabilities = (props: any) => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    // get api call to get current availabilities
    fetch(`/api/availabilities/${props.serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        // sort the array by day
        data.availabilities.sort((a: any, b: any) => {
          return new Date(a.day).getTime() - new Date(b.day).getTime();
        });
        setAvailabilities(data.availabilities);
        // console.log(data);
      });
  }, []);

  return (
    <>
      {' '}
      <ul className="flex flex-col items-center justify-center gap-2 p-2 mt-4 overflow-x-scroll border-2 hide-scrollbar rounded-xl">
        {availabilities &&
          availabilities?.map((availability: any) => (
            <li key={Math.random()}>
              <ul className="hide-scrollbar w-[180px] overflow-y-scroll flex flex-col gap-1 py-8 relative px-4">
                <div className="text-center ">
                  {availability.day.toString().slice(0, 10)}
                </div>
                {availability.timeslots.map((timeslot: any) => (
                  <TimeSlotListItem
                    key={Math.random()}
                    day={availability.day}
                    timeslot={timeslot}
                    chosenTimeslotsArray={props.chosenTimeslotsArray}
                    toDelete={false}
                    // groupedTimeslots={groupedTimeslots}
                    showStatus={true}
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
