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
import { GiArchiveRegister } from "react-icons/gi";

enum ShipmentStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  InTransit = "In Transit",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export function DialogDemo() {
  const [selectedStatus, setSelectedStatus] = useState<ShipmentStatus>(ShipmentStatus.Pending);
  const [shipmentDetail, setShipmentDetails] = useState<ShipmentDetails>()

  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ShipmentDetails>();
  const [showPassword, setShowPassword] = useState(false);


  const onSubmit: SubmitHandler<ShipmentDetails> = async (data) => {
    setSubmitting(true); // Start submission
    console.log("package")
    try {
      const response = await fetch(`${BASE_URL}/track/shipments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result, "result")
      if (response.ok) {
        toast.success("Registration successful!");

      } else {
        toast.error(result.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false); // End submission
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value as ShipmentStatus);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <GiArchiveRegister className="text-violet-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-4">
        <DialogHeader>
          <DialogTitle className="text-center text-neutral-700"></DialogTitle>
        </DialogHeader>
        <div className="m-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="mb-4 text-lg font-semibold text-neutral-800">Update Profile</h1>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Client Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("username", {
                      required: "Name is required", // Validation rule
                    })}
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Email</label>
                  <input
                    type="email"

                    {...register("email", {
                      required: "Email is required", // Validation rule
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Your Email"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Contact</label>
                  <input
                    type="text"
                    {...register("contact", {
                      required: "Contact is required", // Validation rule
                    })}
                    placeholder="Your Contact"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Package Name</label>
                  <input
                    type="text"
                    {...register("packageName", {
                      required: "Package Name is required", // Validation rule
                    })}
                    placeholder="Package Name"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Package Type</label>
                  <input
                    type="text"
                    {...register("packageTypes", {
                      required: "Package Type is required", // Validation rule
                    })}
                    placeholder="Package Type"
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Weight</label>
                  <input
                    type="text"
                    placeholder="Weight"
                    {...register("weight", {
                      required: "Weight is required", // Validation rule
                    })}
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
              </div>

              <div className=" flex w-full justify-between gap-4">
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Shipment Status</label>
                  <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  >
                    {Object.values(ShipmentStatus).map((status) => (
                      <option
                        {...register("shipmentStatus", {
                          required: "Shipment Status is required", // Validation rule
                        })}
                        key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-sm text-neutral-700">Weight</label>
                  <input
                    type="text"
                    placeholder="Dimension"
                    {...register("dimensions", {
                      required: "Dimension is required",
                    })}
                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Add Package
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
