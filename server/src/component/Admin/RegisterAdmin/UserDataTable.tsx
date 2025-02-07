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
import { SignUpTypes, UserType } from "@/Types/LoginTypes";
  
  type DataTableProps = {
    data: any[];
    columns: { key: string; label: string }[];
    // onEdit: (item: any) => void;
    onDelete: (item: any) => void;
  };
  

  
  export function UserDataTable({ data, columns, onDelete }: DataTableProps) {
    const [isSubmitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ShipmentDetails>();
  const [userDel , setUserDel]=useState<SignUpTypes[]>([])
    const deleteUser = async (UserId: string) => {
        setSubmitting(true);
        try {
          const token = localStorage.getItem("access_token");
          console.log(token, "token from delete")
          if (!token) {
            toast.error("No access token found. Please login again.");
            return;
          }
    
          const response = await fetch(`http://localhost:5000/auth/delete/${UserId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            toast.success("Package deleted successfully!");
            setUserDel((prev) => prev.filter((pkg) => pkg.id !== UserId));
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
    
    const onSubmit: SubmitHandler<ShipmentDetails> = async (data) => {
      setSubmitting(true); // Start submission
      try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
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
        setSubmitting(false);
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
                      onClick={async () => {
                     onDelete?.(item); 
                      
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
  