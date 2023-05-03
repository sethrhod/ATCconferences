
export default async function getFeedback(uuid) {
  const CustomData = require('../../custom-data.json');

  try {
    const response = await fetch(CustomData.flaskURL + uuid, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};