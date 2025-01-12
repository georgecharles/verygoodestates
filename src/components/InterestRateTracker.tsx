import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Register the required scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function InterestRateTracker() {
  const [timeframe, setTimeframe] = useState('1y');
  const [data, setData] = useState<any>(null);
  const [prediction, setPrediction] = useState({
    nextRate: 4.0,
    direction: 'down',
    confidence: 85,
    nextMeeting: '21 March 2024'
  });

  useEffect(() => {
    const fetchData = async () => {
      // Mock data with different timeframes and AI predictions
      const mockData = {
        '1y': {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          historical: [5.25, 5.25, 5.25, 5.0, 4.75, 4.5, 4.25, 4.0, 4.0, 4.0, 4.0, 4.0],
          forecast: [4.0, 3.75, 3.5, 3.5, 3.25, 3.25, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0]
        },
        '5y': {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
          historical: [0.1, 0.1, 3.5, 5.25, 4.0],
          forecast: [4.0, 3.5, 3.0, 2.75, 2.5, 2.25, 2.0, 2.0, 2.0]
        },
        '10y': {
          labels: Array.from({ length: 11 }, (_, i) => (2020 + i).toString()),
          historical: [0.1, 0.1, 3.5, 5.25, 4.0],
          forecast: [4.0, 3.5, 3.0, 2.75, 2.5, 2.25, 2.0, 1.75, 1.75, 1.75]
        }
      };

      const selectedData = mockData[timeframe as keyof typeof mockData];
      
      setData({
        labels: selectedData.labels,
        datasets: [
          {
            label: 'Historical Rate',
            data: selectedData.historical,
            borderColor: '#F59E0B',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            tension: 0.4,
            fill: false
          },
          {
            label: 'AI Forecast',
            data: selectedData.forecast,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false
          }
        ]
      });
    };

    fetchData();
  }, [timeframe]);

  if (!data) return null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
          font: {
            family: "'Quattrocento Sans', sans-serif",
            weight: '300'
          }
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: {
          family: "'Quattrocento Sans', sans-serif",
          weight: '300'
        },
        bodyFont: {
          family: "'Quattrocento Sans', sans-serif",
          weight: '300'
        },
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff',
          font: {
            family: "'Quattrocento Sans', sans-serif",
            weight: '300'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#fff',
          font: {
            family: "'Quattrocento Sans', sans-serif",
            weight: '300'
          },
          callback: (value: number) => `${value}%`
        }
      }
    }
  };

  return (
    <div className="bg-navy-800/50 rounded-lg p-6 border border-gold-500/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-light text-white">Interest Rate Forecast</h3>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px] bg-navy-900 border-gold-500/20">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1y">1 Year</SelectItem>
            <SelectItem value="5y">5 Years</SelectItem>
            <SelectItem value="10y">10 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">Next Rate</div>
          <div className="flex items-center">
            <span className="text-2xl font-light text-white">{prediction.nextRate}%</span>
            {prediction.direction === 'down' ? (
              <ArrowDownRight className="w-5 h-5 text-emerald-400 ml-2" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-red-400 ml-2" />
            )}
          </div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">AI Confidence</div>
          <div className="text-2xl font-light text-white">{prediction.confidence}%</div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">Next Meeting</div>
          <div className="text-2xl font-light text-white">{prediction.nextMeeting}</div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">Actions</div>
          <Button variant="ghost" className="text-gold-400 hover:text-gold-500 p-0">
            Set Alert
          </Button>
        </div>
      </div>

      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
      
      <div className="text-sm text-gray-400 mt-4">
        Data source: Bank of England Statistical Interactive Database
        <br />
        AI Forecast: Based on market indicators, economic data, and historical patterns
      </div>
    </div>
  );
}