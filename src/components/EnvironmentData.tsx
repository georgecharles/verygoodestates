import { useEffect, useState } from 'react';
import { Wind, Thermometer, Droplets, Sun, Gauge } from 'lucide-react';
import { getSensorData } from '@/lib/sensors';

interface EnvironmentDataProps {
  lat: number;
  lng: number;
}

interface SensorReading {
  feed: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
}

export function EnvironmentData({ lat, lng }: EnvironmentDataProps) {
  const [sensorData, setSensorData] = useState<SensorReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getSensorData(lat, lng);
      setSensorData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [lat, lng]);

  const getIcon = (metric: string) => {
    switch (metric.toLowerCase()) {
      case 'wind_speed':
        return <Wind className="w-5 h-5 text-gold-400" />;
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-gold-400" />;
      case 'humidity':
        return <Droplets className="w-5 h-5 text-gold-400" />;
      case 'solar_irradiance':
        return <Sun className="w-5 h-5 text-gold-400" />;
      default:
        return <Gauge className="w-5 h-5 text-gold-400" />;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'degC') return `${value.toFixed(1)}°C`;
    if (unit === '%') return `${value.toFixed(1)}%`;
    if (unit === 'm/s') return `${value.toFixed(1)} m/s`;
    return `${value.toFixed(1)} ${unit}`;
  };

  if (isLoading) {
    return (
      <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
        <h3 className="text-xl font-light text-white mb-4">Environmental Data</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-navy-900/50 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sensorData.length === 0) {
    return (
      <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
        <h3 className="text-xl font-light text-white mb-4">Environmental Data</h3>
        <p className="text-gray-400">No sensor data available for this location</p>
      </div>
    );
  }

  return (
    <div className="bg-navy-800/50 p-6 rounded-lg border border-gold-500/20">
      <h3 className="text-xl font-light text-white mb-4">Environmental Data</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sensorData.map((sensor, index) => (
          <div
            key={index}
            className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10"
          >
            <div className="flex items-center gap-2 mb-2">
              {getIcon(sensor.metric)}
              <span className="text-sm text-gray-400">
                {sensor.metric.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="text-2xl font-light text-white">
              {formatValue(sensor.value, sensor.unit)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(sensor.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-400 mt-4">
        Data provided by Urban Observatory
      </div>
    </div>
  );
}