export default async function getFeedback(customData, uuid) {
  try {
    const response = await fetch(customData.DevelopersAssociationofGeorgiaAPI + uuid, {
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
}
