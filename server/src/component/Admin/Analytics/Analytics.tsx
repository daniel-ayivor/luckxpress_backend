import { SidebarProvider } from "@/components/ui/sidebar";
import { AreaChart } from "./AreaCharts";
import { BarChart } from "./BarChart";
import { DashboardWrap } from "./DashboardWrap";
import { DonutChart } from "./DonutChart";
import { LineChart } from "./LineChart";
import { DashboardSidebar } from "../Dasboard/DashboardSidebar";
import { Navbar } from "../Dasboard/Navbar";
import { groupBy } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type PackageType = {
  weight: number;
  id: number;
  username: string;
  email: string;
  contact: string;
  packageName: string;
  packageTypes: string; // If this should allow empty strings, keep it as a string type.
  dimensions: string;
  shipmentStatus: string;
  trackingCode: string;
  createdAt: string; // Consider using Date if you plan to work with date objects.
  updatedAt: string; // Similarly, use Date if you need date manipulation.
};


const Analytics = () => {
  const [Package, setPackage] = useState<PackageType[]>([]); 
  const [Submitting, setSubmitting] = useState(false);
  const [shipmentData, setShipmentData] = useState<PackageType[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/track/shipments")
      .then((res) => res.json())
      .then((data) => {
        if (data.shipments) {
          setShipmentData(data.shipments);
        }
      })
      .catch((error) => console.error("Error fetching shipments:", error));
  }, []);

  const getMonthlyData = (data: PackageType[]) => {
    const grouped = groupBy(data, (item) => moment(item.createdAt).format("MMM YYYY"));
    return Object.entries(grouped).map(([month, items]) => ({
      name: month,
      value: items.reduce((total, item) => total + item.weight, 0),
    }));
  };

  const getMonthlyCounts = (data: PackageType[]) => {
    const grouped = groupBy(data, (item) => moment(item.createdAt).format("MMM YYYY"));
    return Object.entries(grouped).map(([month, items]) => ({
      name: month,
      value: items.length,
    }));
  };

  const areaChartData = getMonthlyData(shipmentData);
  const barChartData = getMonthlyCounts(shipmentData);

  const getWeeklyData = (data: PackageType[]) => {
    const grouped = groupBy(data, (item) => moment(item.createdAt).startOf('week').format("YYYY-MM-DD"));
    return Object.entries(grouped).map(([weekStart, items]) => ({
      name: `Week of ${moment(weekStart).format("MMM Do")}`,
      value: items.reduce((total, item) => total + item.weight, 0), // Sum weights for the week
    }));
  };
  
  const getWeeklyCounts = (data: PackageType[]) => {
    const grouped = groupBy(data, (item) => moment(item.createdAt).startOf('week').format("YYYY-MM-DD"));
    return Object.entries(grouped).map(([weekStart, items]) => ({
      name: `Week of ${moment(weekStart).format("MMM Do")}`,
      value: items.length, // Count items for the week
    }));
  };

  const barChartDatas = getMonthlyCounts(shipmentData);
  const areaChartDatas =getWeeklyCounts(shipmentData);
  

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto space-y-6 p-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Your analytics overview.</p>
            </div>
            <p className="text-muted-foreground">Your weekly and monthly analytics overview</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2x">
              <DashboardWrap title="Revenue Trend" className="h-full min-h-[400px]">
                <LineChart data={areaChartDatas} />
              </DashboardWrap>
              <DashboardWrap title="Category Distribution" className="h-full min-h-[400px]">
                <BarChart data={barChartDatas} />
              </DashboardWrap>
            
              <DashboardWrap title="Cumulative Growth" className="h-full min-h-[400px]">
                <AreaChart data={areaChartData} />
              </DashboardWrap>
              <DashboardWrap title="Market Share" className="h-full min-h-[400px]">
                <DonutChart data={barChartData} />
              </DashboardWrap>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};


export default Analytics