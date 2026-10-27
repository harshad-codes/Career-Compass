import { TAMIL_NADU_CITIES } from '../data/locations';

// Calculate Haversine distance in kilometers between two lat/lng coordinates
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Get distance from student's preferred city to target college coordinates
export function getDistanceToCity(
  preferredCity: string,
  collegeLat: number,
  collegeLng: number
): number {
  if (preferredCity === 'Anywhere in Tamil Nadu' || !preferredCity) {
    return 0; // No distance penalty
  }

  const city = TAMIL_NADU_CITIES[preferredCity];
  if (!city) {
    return 0;
  }

  return calculateHaversineDistance(city.latitude, city.longitude, collegeLat, collegeLng);
}
