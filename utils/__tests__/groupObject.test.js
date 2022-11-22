import { groupObjectByProperties } from '../groupObjects';

test('groupObject into date and timeslots', () => {
  const data = [
    { day: 'Mon 1 Nov', timeslot: { start: '10:00', end: '11:00' } },
    { day: 'Mon 1 Nov', timeslot: { start: '11:00', end: '12:00' } },
    { day: 'Mon 1 Nov', timeslot: { start: '12:00', end: '13:00' } },
    { day: 'Mon 1 Nov', timeslot: { start: '13:00', end: '14:00' } },
  ];

  const grouped = groupObjectByProperties(data, 'day');

  expect(grouped).toEqual([
    {
      day: 'Mon 1 Nov',
      timeslots: [
        { start: '10:00', end: '11:00' },
        { start: '11:00', end: '12:00' },
        { start: '12:00', end: '13:00' },
        { start: '13:00', end: '14:00' },
      ],
    },
  ]);
});
