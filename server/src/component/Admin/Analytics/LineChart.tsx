import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", value: 1000 },
  { month: "Feb", value: 2000 },
  { month: "Mar", value: 1500 },
  { month: "Apr", value: 3000 },
  { month: "May", value: 2500 },
  { month: "Jun", value: 4000 },
];
type AreaChartData = {
  name: string; // X-axis label (e.g., month)
  value: number; // Y-axis value (e.g., revenue, shipment count)
}[];
export function LineChart({data}:{data:AreaChartData}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}