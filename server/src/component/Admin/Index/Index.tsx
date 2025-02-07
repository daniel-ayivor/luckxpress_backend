import { Activity, DollarSign, Users, ArrowUpRight } from "lucide-react";

import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { StatCard } from "./StatCard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../Dasboard/DashboardSidebar";
import { Navbar } from "../Dasboard/Navbar";
import { Card } from "../Dasboard/Card";
import { DataTable } from "../Dasboard/DataTable";
import toast from "react-hot-toast";
import moment from "moment";
import { useEffect, useState } from "react";
import { useUser } from "@/Constant/useUser";
import { groupBy } from "lodash";


const areaData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

const barData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 60 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 90 },
  { name: "Sun", value: 75 },
];

type DataTableProps = {
  data: any[];
  columns: { key: string; label: string }[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

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

const tableColumns = [
  { key: "id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "packageName", label: "Package Name" },
  { key: "trackingCode", label: "Tracking Code" },
  { key: "dimensions", label: "Dimensions" },
  { key: "weight", label: "Weight (kg)" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "shipmentStatus", label: "Status" },
];

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const  [Submitting,setSubmitting] = useState(false)
  const {access_token} =useUser()
  const [Package, setPackage] = useState<PackageType[]>([]); 

  const [shipmentData, setShipmentData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/track/shipments") // Adjust URL to your endpoint
      .then((res) => res.json())
      .then((data) => {
        if (data.shipments) {
          setShipmentData(data.shipments);
        }
      })
      .catch((error) => console.error("Error fetching shipments:", error));
  }, []);
  

  const Fetchpackage = async () => {
      setSubmitting(true); 
      try {
          const token = localStorage.getItem("access_token");
          console.log(token, "token package");
          
  
          if (!token) {
              toast.error("No access token found. Please login again.");
              return;
          }
  
          const response = await fetch(`http://localhost:5000/track/shipments`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
              },
          });
  
          const result = await response.json();
          console.log(result, "index");
  
          if (response.ok) {
              toast.success("Users retrieved successfully!");
              const formattedUsers = result.shipments.slice(0, 5).map((packages: PackageType) => ({
                  ...packages,
                  createdAt: moment(packages.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
                  updatedAt: moment(packages.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
              }));
  
              setPackage(formattedUsers);
          } else {
              toast.error(result.message || "Users retrieving failed. Please try again.");
          }
      } catch (error: any) {
          console.error("Error during users retrieving:", error);
          toast.error("Something went wrong. Please try again later.");
      } finally {
          setSubmitting(false); 
      }
  };
  
  useEffect(() => {
      Fetchpackage();
  }, []); 


// Transform data for AreaChart (e.g., Total Weight per Month)
const getMonthlyData = (data: any[]) => {
  const grouped = groupBy(data, (item) => moment(item.createdAt).format("MMM YYYY"));
  return Object.entries(grouped).map(([month, items]) => ({
    name: month,
    value: items.reduce((total, item) => total + item.weight, 0), // Sum weights
  }));
};

// Example: Fetch the monthly data
const areaChartData = getMonthlyData(shipmentData);

// Transform data for BarChart (e.g., Shipment Count per Month)
const getMonthlyCounts = (data: any[]) => {
  const grouped = groupBy(data, (item) => moment(item.createdAt).format("MMM YYYY"));
  return Object.entries(grouped).map(([month, items]) => ({
    name: month,
    value: items.length, // Count items per month
  }));
};

// Example: Fetch the monthly counts
const barChartData = getMonthlyCounts(shipmentData);


const [registeredUsersCount, setRegisteredUsersCount] = useState(0);
const [previousUsersCount, setPreviousUsersCount] = useState(0);

const [trackingDataCount, setTrackingDataCount] = useState(0);
const [previousTrackingDataCount, setPreviousTrackingDataCount] = useState(0);

const [userPercentageChange, setUserPercentageChange] = useState(0);
const [trackingPercentageChange, setTrackingPercentageChange] = useState(0);

// Fetch Users Count
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/getAllUser");
      const data = await response.json();

      if (data.users && Array.isArray(data.users)) {
        setPreviousUsersCount(registeredUsersCount); // Update previous count
        setRegisteredUsersCount(data.users.length); // Update current count
      } else {
        console.error("Unexpected response format:", data);
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users.");
    }
  };

  fetchUsers();
}, []);


// Fetch Tracking Data Count
useEffect(() => {
  fetch("http://localhost:5000/track/shipments")
    .then((res) => res.json())
    .then((data) => {
      if (data.shipments) {
        setPreviousTrackingDataCount(trackingDataCount);
        setTrackingDataCount(data.shipments.length);
      }
    })
    .catch((error) => console.error("Error fetching tracking data:", error));
}, []);

// Calculate Percentage Changes
useEffect(() => {
  if (previousUsersCount > 0) {
    setUserPercentageChange(
      ((registeredUsersCount - previousUsersCount) / previousUsersCount) * 100
    );
  }
  if (previousTrackingDataCount > 0) {
    setTrackingPercentageChange(
      ((trackingDataCount - previousTrackingDataCount) / previousTrackingDataCount) * 100
    );
  }
}, [registeredUsersCount, previousUsersCount, trackingDataCount, previousTrackingDataCount]);


// Pass the transformed data to your charts
  return (
    <SidebarProvider>
<>
<div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container space-y-6 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  <StatCard
    title="Total Revenue"
    value="$45,231.89"
    change="+20.1%"
    icon={<DollarSign className="h-4 w-4" />}
  />
  <StatCard
    title="Registered Users"
    value={registeredUsersCount.toString()}
    change={`${userPercentageChange > 0 ? "+" : ""}${userPercentageChange.toFixed(1)}%`}
    icon={<Users className="h-4 w-4" />}
  />
  <StatCard
    title="Tracking Data"
    value={trackingDataCount.toString()}
    change={`${trackingPercentageChange > 0 ? "+" : ""}${trackingPercentageChange.toFixed(1)}%`}
    icon={<Activity className="h-4 w-4" />}
  />
  <StatCard
    title="Conversion Rate"
    value="2.3%"
    change="+4.1%"
    icon={<ArrowUpRight className="h-4 w-4" />}
  />
</div>

           
        <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Recent Users</h2>
           
              <DataTable
                data={Package}
                columns={tableColumns}
                onEdit={(item) => console.log("Edit", item)}
                onDelete={(item) => console.log("Delete", item)}
              />
            </Card>
        <div className="grid gap-6 md:grid-cols-2">
        <AreaChart data={areaChartData} title="Shipment Weights by Package" />
                <BarChart data={barChartData} title="User Weights Distribution" />
        </div>           
          </main>
        </div>
      </div>
</>
    </SidebarProvider>
  );
};

export default Index;