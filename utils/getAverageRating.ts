export function getAverageRating(ratingsArray: any) {
  const ratings = ratingsArray.map((rating: any) => rating.rating);
  const averageRating =
    ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length;

  console.log('averageRating', averageRating);
  return averageRating;
}
