import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../Dasboard/DashboardSidebar"
import { Navbar } from "../Dasboard/Navbar"
import { DataTable } from "../Dasboard/DataTable"
import { Card } from "../Dasboard/Card"
import { useEffect, useState } from "react"
import { IoFilter } from "react-icons/io5";
import { useUser } from "@/Constant/useUser"
import toast from "react-hot-toast"
import moment from "moment"
import { DialogDemo } from "../Dialog/Dialog"
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

const Trackings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);

  // Fetch Packages
  const fetchPackages = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("No access token found. Please login again.");
        return;
      }

      const response = await fetch(`http://localhost:5000/track/shipments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Packages retrieved successfully!");
        const formattedPackages = result.shipments.map((pkg: PackageType) => ({
          ...pkg,
          createdAt: moment(pkg.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          updatedAt: moment(pkg.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
        }));
        setPackages(formattedPackages);
      } else {
        toast.error(result.message || "Failed to retrieve packages.");
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Handle Delete Package
  const deletePackage = async (trackingCode: string) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      console.log(token, "token from delete")
      if (!token) {
        toast.error("No access token found. Please login again.");
        return;
      }

      const response = await fetch(`http://localhost:5000/track/shipments/${trackingCode}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Package deleted successfully!");
        setPackages((prev) => prev.filter((pkg) => pkg.trackingCode !== trackingCode));
      } else {
        const result = await response.json();
        toast.error(result.message || "Failed to delete package.");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Update Package
  const updatePackage = async (updatedPackage: PackageType) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("No access token found. Please login again.");
        return;
      }

      const response = await fetch(`http://localhost:5000/track/shipments/${updatedPackage.trackingCode}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPackage),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success("Package updated successfully!");
        setPackages((prev) =>
          prev.map((pkg) =>
            pkg.trackingCode === updatedPackage.trackingCode ? { ...pkg, ...updatedPackage } : pkg
          )
        );
        setEditingPackage(null); // Close the editing form
      } else {
        toast.error(result.message || "Failed to update package.");
      }
    } catch (error) {
      console.error("Error updating package:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Dropdown Handlers
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container space-y-6 p-6">
            <Card className="p-6">
              <div className="flex justify-between">
                <h2 className="mb-4 text-lg font-semibold">Recent Packages</h2>
                <form className="w-full max-w-md flex gap-2">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by name, type, etc."
                    className="w-full rounded-md py-1 border bg-gray-100 p-1 text-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  />

                  <DialogDemo />

                  <div className="relative">
                    <div
                      onClick={toggleDropdown}
                      className="flex items-center gap-2 rounded-md border text-xs bg-gray-100 px-3 py-2 cursor-pointer"
                    >
                      <IoFilter className="size-3 text-violet-400" />
                      Filter
                    </div>
                    {isOpen && (
                      <div style={{ zIndex: 99999 }} className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg">
                        <ul className="py-1 text-sm text-gray-700">
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log("Dispatched Out")}
                          >
                            Dispatched Out
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log("In Warehouse")}
                          >
                            In Warehouse
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => console.log("Being Brought In")}
                          >
                            Being Brought In
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <DataTable
                data={packages}
                columns={tableColumns}
                onEdit={(item) => setEditingPackage(item)} // Open editing form
                onDelete={(item) => deletePackage(item.trackingCode)}
              />
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Trackings;
