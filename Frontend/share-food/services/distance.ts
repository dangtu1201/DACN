// Function to calculate distance between two coordinate points using Haversine formula
export const  calculateDistance = (lat1: number | undefined, lon1: number | undefined, lat2 : number | undefined, lon2: number | undefined) => {
    if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
      return 0;
    }
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2);
  }
  
  // Function to convert degrees to radians
  function deg2rad(deg : number) {
    return deg * (Math.PI / 180);
  }
  
  