import {
  Area,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define the prop type for the chart
type AreaChartData = {
  name: string; // X-axis label (e.g., month)
  value: number; // Y-axis value (e.g., revenue, shipment count)
}[];

// Component definition
export function AreaChart({ data }: { data: AreaChartData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsAreaChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`} // Format Y-axis values (optional)
        />
        <Tooltip formatter={(value) => `$${value}`} /> {/* Format tooltip values */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
