import axios from "axios";
import axiosRetry from "axios-retry";

const map = axios.create();
axiosRetry(map, {
    retries: 3, retryDelay: (retryCount: number) => {
        return Math.pow(2, retryCount) * 300;
    }
});

export const getLocationAddress = async (lat: number, lng: number) => {

    const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const res = await map.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`);
    if (res.data.results.length > 0) {
        const address = res.data.results[0].formatted_address;
        return address;
      } else {
        return null;
      }
}
