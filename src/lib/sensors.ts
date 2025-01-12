import axios from 'axios';
import { propertyDataCache } from './cache';

const BASE_URL = 'https://newcastle.urbanobservatory.ac.uk/api/v2/sensors/data/json';

// Mock data for when API is unavailable
const MOCK_SENSOR_DATA = [
  {
    feed: "Newcastle Urban Observatory",
    metric: "temperature",
    value: 18.5,
    unit: "degC",
    timestamp: new Date().toISOString()
  },
  {
    feed: "Newcastle Urban Observatory",
    metric: "humidity",
    value: 65,
    unit: "%",
    timestamp: new Date().toISOString()
  },
  {
    feed: "Newcastle Urban Observatory",
    metric: "wind_speed",
    value: 3.2,
    unit: "m/s",
    timestamp: new Date().toISOString()
  }
];

interface SensorData {
  feed: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
}

export async function getSensorData(lat: number, lng: number, radius: number = 1000): Promise<SensorData[]> {
  const cacheKey = `sensors-${lat}-${lng}-${radius}`;
  const cached = propertyDataCache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat,
        lng,
        radius,
        limit: 10
      }
    });
    
    if (!response.data || !response.data.sensors) {
      console.warn('Invalid sensor data format, using mock data');
      propertyDataCache.set(cacheKey, MOCK_SENSOR_DATA);
      return MOCK_SENSOR_DATA;
    }

    const sensorData = response.data.sensors
      .filter((sensor: any) => sensor.latest_reading && sensor.latest_reading.value)
      .map((sensor: any) => ({
        feed: sensor.feed,
        metric: sensor.metric,
        value: sensor.latest_reading.value,
        unit: sensor.unit,
        timestamp: sensor.latest_reading.timestamp
      }));

    propertyDataCache.set(cacheKey, sensorData);
    return sensorData;
  } catch (error) {
    // Ensure we only log clonable data
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Error fetching sensor data:', errorMessage, '- using mock data');
    propertyDataCache.set(cacheKey, MOCK_SENSOR_DATA);
    return MOCK_SENSOR_DATA;
  }
}