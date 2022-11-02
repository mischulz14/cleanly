export function groupObjectByProperties(obj: any, prop: string) {
  return obj.reduce(function (acc: any, item: any) {
    const key = item[prop];

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push({ ...item });

    return acc;
  }, {});
}
