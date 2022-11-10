export function groupObjectByProperties(object: any, property: string) {
  const reducedObject = object.reduce(function (
    accumulatedObject: any,
    itemThatGetsAddedToTheObject: any,
  ) {
    const reduceToThisPropertyKey = itemThatGetsAddedToTheObject[property];

    if (!accumulatedObject[reduceToThisPropertyKey]) {
      accumulatedObject[reduceToThisPropertyKey] = [];
    }

    accumulatedObject[reduceToThisPropertyKey].push(
      itemThatGetsAddedToTheObject.timeslot,
    );

    return accumulatedObject;
  },
  {});

  return Object.keys(reducedObject).map((key) => ({
    [property]: key,
    timeslots: reducedObject[key],
  }));
}
