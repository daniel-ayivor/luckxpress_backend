import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { category: "A", value: 400 },
  { category: "B", value: 300 },
  { category: "C", value: 600 },
  { category: "D", value: 200 },
  { category: "E", value: 500 },
];
type AreaChartData = {
  name: string; // X-axis label (e.g., month)
  value: number; // Y-axis value (e.g., revenue, shipment count)
}[];
export function BarChart({data}:{data:AreaChartData}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <XAxis dataKey="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
        <Tooltip />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}