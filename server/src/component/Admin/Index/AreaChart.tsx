import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";

interface AreaChartProps {
  data: any[];
  title: string;
}

export const AreaChart = ({ data, title }: AreaChartProps) => {
  return (
    <Card className="chart-container">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262.1, 83.3%, 57.8%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(262.1, 83.3%, 57.8%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                background: "rgba(255, 255, 255, 0.8)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(12px)"
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(262.1, 83.3%, 57.8%)"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};