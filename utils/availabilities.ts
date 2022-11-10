export function handleSetNewAvailabilities(chosenAvailabilities: any) {
  fetch('/api/availabilities/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chosenAvailabilities }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
