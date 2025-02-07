import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { EditDialog } from "../Dialog/EditDialog";
import toast from "react-hot-toast";
import { ShipmentDetails } from "@/Types/TrackTypes";
import { BASE_URL } from "@/Constant/api";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

type DataTableProps = {
  data: any[];
  columns: { key: string; label: string }[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};

enum ShipmentStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  InTransit = "In Transit",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export function DataTable({ data, columns, onEdit, onDelete }: DataTableProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ShipmentDetails>();
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>(ShipmentStatus.Pending);

  const onSubmit: SubmitHandler<ShipmentDetails> = async (data) => {
    const packageId = localStorage.getItem("packageId");
    console.log(packageId, "packageId");
    setSubmitting(true); // Start submission
    try {
      const response = await fetch(`${BASE_URL}/track/shipments/${packageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast.success("Package updated successfully!");
      } else {
        toast.error(result.message || "Failed to update the package. Please try again.");
      }
    } catch (error: any) {
      console.error("Error updating package:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false); // End submission
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              onClick={() => localStorage.setItem("packageId", item?.trackingCode)}
              key={index}
            >
              {columns.map((column) => (
                <TableCell key={column.key}>{item[column.key]}</TableCell>
              ))}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit?.(item)}
                  >
                    <EditDialog />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      onDelete?.(item);
                      toast.success("Item deleted successfully!");
                    }}
                  >
                    <Trash2 className="h-4 text-red-400 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
