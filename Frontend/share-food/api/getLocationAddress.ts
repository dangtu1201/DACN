import client from './base'

export const getLocationAddress = async (lat: number, lng: number) => {

    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const res = await client.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`);
    if (res.data.results.length > 0) {
        const address = res.data.results[0].formatted_address;
        return address;
      } else {
        return null;
      }
}
