const TimeSlotListItem = (props: any) => {
  const requestedTimeslot = {
    day: props.day.day,
    timeslot: props.timeslot,
  };

  function myFunc(obj: any, prop: any) {
    return obj.reduce(function (acc: any, item: any) {
      const key = item[prop];

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push({ ...item });

      return acc;
    }, {});
  }

  return (
    <li className="mt-3 bg-white text-md rounded-xl">
      <button
        onClick={(e) => {
          e.currentTarget.classList.toggle('bg-slate-500');
          e.currentTarget.classList.toggle('text-white');
          if (props.requestedTimeslots.includes(requestedTimeslot)) {
            props.requestedTimeslots.splice(
              props.requestedTimeslots.indexOf(requestedTimeslot),
              1,
            );
          } else {
            props.requestedTimeslots.push(requestedTimeslot);
          }
          console.log(props.requestedTimeslots);
          // props.groupedTimeslots = myFunc(props.requestedTimeslots, 'day');
        }}
        className=" px-4 py-2 text-md rounded-xl w-full h-full"
      >
        {props.timeslot.start} - {props.timeslot.end}
      </button>
    </li>
  );
};

export default TimeSlotListItem;
