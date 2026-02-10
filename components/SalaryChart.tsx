import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { SalaryInfo } from '../types';

interface SalaryChartProps {
  data: SalaryInfo[];
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899'];

const SalaryChart: React.FC<SalaryChartProps> = ({ data }) => {
  const formatCurrency = (value: number) => {
    // Simple heuristic: if value > 100000 implies annual or high currency, usually formatted compactly
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e5e7eb" />
          <XAxis type="number" tickFormatter={formatCurrency} stroke="#6b7280" fontSize={12} />
          <YAxis 
            type="category" 
            dataKey="role" 
            width={120} 
            stroke="#374151" 
            fontSize={12}
            tick={{fontSize: 11, width: 100}} 
          />
          <Tooltip 
            cursor={{fill: '#f3f4f6'}}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
            formatter={(value: number) => [value.toLocaleString(), 'Avg Estimate']}
          />
          <Bar dataKey="avgValue" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;