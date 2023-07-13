import fetchWithTimeout from "./fetchWithTimeout";

export default async function getFeedback(customData, uuid) {
  try {
    const response = await fetchWithTimeout(customData.DevelopersAssociationofGeorgiaAPI + uuid, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 8000,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
