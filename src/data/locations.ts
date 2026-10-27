export interface CityLocation {
  name: string;
  district: string;
  latitude: number;
  longitude: number;
  region: 'North' | 'South' | 'West' | 'Central';
  svgX: number; // Projected SVG coordinate (0-500)
  svgY: number; // Projected SVG coordinate (0-600)
}

export const TAMIL_NADU_CITIES: Record<string, CityLocation> = {
  'Chennai': {
    name: 'Chennai',
    district: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    region: 'North',
    svgX: 430,
    svgY: 70
  },
  'Chengalpattu': {
    name: 'Chengalpattu',
    district: 'Chengalpattu',
    latitude: 12.6841,
    longitude: 79.9836,
    region: 'North',
    svgX: 410,
    svgY: 105
  },
  'Vellore': {
    name: 'Vellore',
    district: 'Vellore',
    latitude: 12.9165,
    longitude: 79.1325,
    region: 'North',
    svgX: 325,
    svgY: 90
  },
  'Salem': {
    name: 'Salem',
    district: 'Salem',
    latitude: 11.6643,
    longitude: 78.1460,
    region: 'West',
    svgX: 230,
    svgY: 200
  },
  'Coimbatore': {
    name: 'Coimbatore',
    district: 'Coimbatore',
    latitude: 11.0168,
    longitude: 76.9558,
    region: 'West',
    svgX: 110,
    svgY: 270
  },
  'Tiruchirappalli': {
    name: 'Tiruchirappalli',
    district: 'Tiruchirappalli',
    latitude: 10.7905,
    longitude: 78.7047,
    region: 'Central',
    svgX: 280,
    svgY: 290
  },
  'Madurai': {
    name: 'Madurai',
    district: 'Madurai',
    latitude: 9.9252,
    longitude: 78.1198,
    region: 'South',
    svgX: 225,
    svgY: 375
  },
  'Tirunelveli': {
    name: 'Tirunelveli',
    district: 'Tirunelveli',
    latitude: 8.7139,
    longitude: 77.7567,
    region: 'South',
    svgX: 185,
    svgY: 490
  },
  'Erode': {
    name: 'Erode',
    district: 'Erode',
    latitude: 11.3410,
    longitude: 77.7172,
    region: 'West',
    svgX: 185,
    svgY: 235
  }
};

// Project lat/lng to SVG map coordinates (viewBox 0 0 500 600)
// Tamil Nadu bounds: Lat 8.1 - 13.5 N, Lng 76.2 - 80.4 E
export function projectLatLngToSvg(lat: number, lng: number): { x: number; y: number } {
  const minLat = 8.05;
  const maxLat = 13.6;
  const minLng = 76.15;
  const maxLng = 80.5;

  const width = 450;
  const height = 550;
  const paddingX = 25;
  const paddingY = 25;

  const x = paddingX + ((lng - minLng) / (maxLng - minLng)) * width;
  // Lat is inverted in screen coordinates (North is up, so larger lat means smaller Y)
  const y = paddingY + ((maxLat - lat) / (maxLat - minLat)) * height;

  return { x: Math.round(x), y: Math.round(y) };
}
