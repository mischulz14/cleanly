export function groupObjectByProperties(object: any, property: string) {
  // 1. group the received object by the property "day"
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

  //2. group the timeslots by the property
  return Object.keys(reducedObject).map((key) => ({
    [property]: key,
    timeslots: reducedObject[key],
  }));
}
