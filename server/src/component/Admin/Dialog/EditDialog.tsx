import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/Constant/api";
import { ShipmentDetails } from "@/Types/TrackTypes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdEditLocationAlt } from "react-icons/md";
enum ShipmentStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  InTransit = "In Transit",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export function EditDialog() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ShipmentDetails>();
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>(ShipmentStatus.Pending);

  const onSubmit: SubmitHandler<ShipmentDetails> = async (data) => {
    const packageId = localStorage.getItem("packageId")
    console.log(packageId, "packageId")
    setSubmitting(true); // Start submission
    try {
      const response = await fetch(`${BASE_URL}/track/shipments/${packageId }`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result)
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MdEditLocationAlt className="text-violet-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-4">
        <DialogHeader>
          <DialogTitle className="text-center text-neutral-700">Update Package</DialogTitle>
        </DialogHeader>
        <div className="m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Client Name</label>
                  <input
                    type="text"
                    {...register("username", { required: "Client name is required" })}
                    placeholder="Client Name"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.username && <p className="text-red-600 text-xs">{errors.username.message}</p>}
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Email"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Contact</label>
                  <input
                    type="text"
                    {...register("contact", { required: "Contact is required" })}
                    placeholder="Contact"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.contact && <p className="text-red-600 text-xs">{errors.contact.message}</p>}
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Package Name</label>
                  <input
                    type="text"
                    {...register("packageName", { required: "Package name is required" })}
                    placeholder="Package Name"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.packageName && <p className="text-red-600 text-xs">{errors.packageName.message}</p>}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Package Type</label>
                  <input
                    type="text"
                    {...register("packageTypes", { required: "Package type is required" })}
                    placeholder="Package Type"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.packageTypes && <p className="text-red-600 text-xs">{errors.packageTypes.message}</p>}
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Weight</label>
                  <input
                    type="number"
                    {...register("weight", { required: "Weight is required", valueAsNumber: true })}
                    placeholder="Weight"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.weight && <p className="text-red-600 text-xs">{errors.weight.message}</p>}
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Shipment Status</label>
                  <select
                    {...register("shipmentStatus", { required: "Shipment status is required" })}
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as ShipmentStatus)}
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  >
                    {Object.values(ShipmentStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Dimensions</label>
                  <input
                    type="text"
                    {...register("dimensions", { required: "Dimensions are required" })}
                    placeholder="Dimensions"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                  {errors.dimensions && <p className="text-red-600 text-xs">{errors.dimensions.message}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full rounded-md py-2 text-sm font-semibold text-white ${
                isSubmitting ? "bg-gray-500" : "bg-blue-600 hover:opacity-90"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Update Package"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
