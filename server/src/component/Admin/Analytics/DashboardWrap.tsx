import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export function DashboardWrap({ children, title, className = "" }: DashboardCardProps) {
  return (
    <Card className={`p-6 shadow-sm hover:shadow-md transition-shadow duration-300 card-animation ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-foreground/90">{title}</h3>
      {children}
    </Card>
  );
}