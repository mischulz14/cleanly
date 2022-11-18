// export const days = [
//   { day: 'Monday' },
//   { day: 'Tuesday' },
//   { day: 'Wednesday' },
//   { day: 'Thursday' },
//   { day: 'Friday' },
//   { day: 'Saturday' },
//   { day: 'Sunday' },
// ];

// export function days() {
//   let curr = new Date();
//   let week = [];

//   for (let i = 1; i <= 7; i++) {
//     let first = curr.getDate() - curr.getDay() + i;
//     let day = new Date(curr.setDate(first)).toString().slice(0, 10);
//     week.push({ day: day });
//   }

//   return week;
// }

// function to put the days for the next two weeks into an array
export function days() {
  let curr = new Date();
  let daysOfTheMonth = [];

  for (let i = 1; i <= 30; i++) {
    if (i === 1) {
      let first = curr.getDate();
      let day = new Date(curr.setDate(first)).toString().slice(0, 15);
      daysOfTheMonth.push({ day: day });
    } else {
      let date = curr.getDate() + 1;
      let day = new Date(curr.setDate(date)).toString().slice(0, 15);
      daysOfTheMonth.push({ day: day });
    }
  }

  console.log(daysOfTheMonth);

  return daysOfTheMonth;
}
