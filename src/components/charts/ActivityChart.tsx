
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { cn } from '@/lib/utils';

interface ActivityChartProps {
  data: Array<{
    month: string;
    scans: number;
    malignant: number;
  }>;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-lg shadow-md border border-border text-sm">
        <p className="font-medium">{label}</p>
        <p className="text-blue-500">
          <span className="font-medium">Total Scans:</span> {payload[0].value}
        </p>
        <p className="text-red-500">
          <span className="font-medium">Malignant:</span> {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

const ActivityChart: React.FC<ActivityChartProps> = ({ data, className }) => {
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  return (
    <div className={cn('w-full bg-card p-6 rounded-xl border border-border', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Scanning Activity</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={cn(
              'px-3 py-1 text-sm rounded-md transition-colors',
              chartType === 'line' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            )}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('area')}
            className={cn(
              'px-3 py-1 text-sm rounded-md transition-colors',
              chartType === 'area' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            )}
          >
            Area
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="scans" 
                stroke="#3b82f6" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="malignant" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          ) : (
            <AreaChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorMalignant" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="scans" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorScans)" 
              />
              <Area 
                type="monotone" 
                dataKey="malignant" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorMalignant)" 
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8">
        <h4 className="text-base font-medium mb-3">Raw Scan Data Output</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-border rounded-md">
            <thead>
              <tr className="bg-secondary">
                <th className="p-2 border-b border-border text-left">Month</th>
                <th className="p-2 border-b border-border text-left">Total Scans</th>
                <th className="p-2 border-b border-border text-left">Malignant Cases</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={row.month} className={idx % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                  <td className="p-2 border-b border-border">{row.month}</td>
                  <td className="p-2 border-b border-border">{row.scans}</td>
                  <td className="p-2 border-b border-border">{row.malignant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;

