export function handleSetNewAvailabilities(
  chosenAvailabilities: any,
  serviceId: number,
) {
  fetch('/api/availabilities/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chosenAvailabilities: chosenAvailabilities,
      serviceId: serviceId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function handleDeleteAvailabilities(
  chosenAvailabilities: any,
  serviceId: number,
) {
  fetch(`/api/availabilities/${serviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chosenAvailabilities: chosenAvailabilities,
      serviceId: serviceId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
