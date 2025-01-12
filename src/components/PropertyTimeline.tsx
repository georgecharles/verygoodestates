import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { PropertyTimeline } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PropertyTimelineProps {
  data: PropertyTimeline[];
}

export function PropertyTimeline({ data }: PropertyTimelineProps) {
  const chartData = {
    labels: data.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Property Value',
        data: data.map(d => d.value),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const dataPoint = data[context.dataIndex];
            let label = `Value: £${context.parsed.y.toLocaleString()}`;
            if (dataPoint.event) {
              label += `\n${dataPoint.event}`;
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `£${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div className="bg-navy-800/50 rounded-lg p-6 border border-gold-500/20">
      <h3 className="text-xl font-semibold text-white mb-4">Value Timeline</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}