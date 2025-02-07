import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard = ({ title, value, change, icon, className }: StatCardProps) => {
  return (
    <Card className={cn("stat-card", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {change && (
            <p className={cn("text-sm font-medium", 
              change.startsWith("+") ? "text-green-500" : "text-red-500"
            )}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="h-8 w-8 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};