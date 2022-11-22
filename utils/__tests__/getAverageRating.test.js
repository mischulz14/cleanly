import { getAverageRating } from '../getAverageRating';

test('get average rating', () => {
  const data = [
    { rating: 1 },
    { rating: 2 },
    { rating: 3 },
    { rating: 4 },
    { rating: 5 },
  ];
  const average = getAverageRating(data);
  expect(average).toEqual(3);
});
