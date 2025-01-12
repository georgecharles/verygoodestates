import { Line } from 'react-chartjs-2';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Building2, Users, Home, PoundSterling } from 'lucide-react';
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

// Register ChartJS components
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
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Interest Rate',
        data: [5.25, 5.25, 5.0, 4.75, 4.5, 4.25, 4.0, 4.0, 3.75, 3.5, 3.5, 3.25],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4
      },
      {
        label: 'Forecast',
        data: [3.25, 3.0, 3.0, 2.75, 2.75, 2.5, 2.5, 2.5, 2.25, 2.25, 2.0, 2.0],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderDash: [5, 5],
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">Next Rate</div>
          <div className="flex items-center">
            <span className="text-2xl font-light text-white">4.0%</span>
            <ArrowDownRight className="w-5 h-5 text-emerald-400 ml-2" />
          </div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">AI Confidence</div>
          <div className="text-2xl font-light text-white">85%</div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">Next Meeting</div>
          <div className="text-2xl font-light text-white">21 Mar</div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="text-sm text-gray-400 mb-1">Actions</div>
          <button className="text-gold-400 hover:text-gold-500">
            Set Alert
          </button>
        </div>
      </div>

      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export function MarketPriceWidget() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Average Price',
        data: [450000, 455000, 460000, 458000, 465000, 470000, 475000, 480000, 485000, 490000, 495000, 500000],
        borderColor: '#F59E0B',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          callback: (value: number) => `£${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-light text-white">Average Property Prices</h3>
          <p className="text-gray-400">UK market overview</p>
        </div>
        <div className="flex items-center text-emerald-400">
          <ArrowUpRight className="w-5 h-5 mr-1" />
          <span>+5.2%</span>
        </div>
      </div>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export function MarketActivityWidget() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-gray-400">Properties Listed</span>
          </div>
          <div className="text-2xl font-light text-white">12,543</div>
          <div className="flex items-center text-emerald-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+8.3%</span>
          </div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-gray-400">Sales Volume</span>
          </div>
          <div className="text-2xl font-light text-white">8,721</div>
          <div className="flex items-center text-emerald-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+5.7%</span>
          </div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-gray-400">Buyer Demand</span>
          </div>
          <div className="text-2xl font-light text-white">High</div>
          <div className="flex items-center text-emerald-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+12.4%</span>
          </div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <div className="flex items-center gap-2 mb-2">
            <PoundSterling className="w-5 h-5 text-gold-400" />
            <span className="text-sm text-gray-400">Avg. Time to Sell</span>
          </div>
          <div className="text-2xl font-light text-white">45 days</div>
          <div className="flex items-center text-red-400 text-sm mt-1">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>-3.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegionalPerformanceWidget() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-4">Top Performing Regions</h4>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-400">
              <span>Manchester</span>
              <span className="text-emerald-400">+8.5%</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Birmingham</span>
              <span className="text-emerald-400">+7.2%</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Leeds</span>
              <span className="text-emerald-400">+6.8%</span>
            </li>
          </ul>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-4">Emerging Markets</h4>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-400">
              <span>Newcastle</span>
              <span className="text-gold-400">↑</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Sheffield</span>
              <span className="text-gold-400">↑</span>
            </li>
            <li className="flex justify-between text-gray-400">
              <span>Liverpool</span>
              <span className="text-gold-400">↑</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function MarketSentimentWidget() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-2">Overall Sentiment</h4>
          <div className="text-2xl font-light text-emerald-400">Positive</div>
          <div className="text-sm text-gray-400">Based on market indicators</div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-2">Buyer Confidence</h4>
          <div className="text-2xl font-light text-white">8.5/10</div>
          <div className="text-sm text-gray-400">Current index</div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-2">Market Momentum</h4>
          <div className="text-2xl font-light text-emerald-400">Strong</div>
          <div className="text-sm text-gray-400">Increasing activity</div>
        </div>
      </div>
    </div>
  );
}

export function AIPredictionsWidget() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-4">Short-term Forecast</h4>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400">3 Month Prediction</div>
              <div className="text-2xl font-light text-emerald-400">+2.5%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">6 Month Prediction</div>
              <div className="text-2xl font-light text-emerald-400">+4.8%</div>
            </div>
          </div>
        </div>
        <div className="bg-navy-900/50 p-4 rounded-lg border border-gold-500/10">
          <h4 className="text-lg font-light text-white mb-4">Long-term Forecast</h4>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400">1 Year Prediction</div>
              <div className="text-2xl font-light text-emerald-400">+7.2%</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">2 Year Prediction</div>
              <div className="text-2xl font-light text-emerald-400">+12.5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketAlertsWidget() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
          <h4 className="text-lg font-light text-emerald-400 mb-2">Price Increase Alert</h4>
          <p className="text-gray-400">Manchester market shows 5.2% increase in the last 30 days</p>
        </div>
        <div className="bg-gold-500/10 p-4 rounded-lg border border-gold-500/20">
          <h4 className="text-lg font-light text-gold-400 mb-2">New Market Opportunity</h4>
          <p className="text-gray-400">Emerging investment potential in Newcastle's regeneration zones</p>
        </div>
        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
          <h4 className="text-lg font-light text-blue-400 mb-2">Policy Update</h4>
          <p className="text-gray-400">New government housing scheme announced for first-time buyers</p>
        </div>
      </div>
    </div>
  );
}

export function MarketWidgets() {
  // This component is no longer used as we're composing widgets directly in the pages
  return null;
}