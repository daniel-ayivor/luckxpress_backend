export type PackageDetails = {
    weight: number;
    id: number;
    username: string;
    email: string;
    contact: string;
    packageName: string;
    packageTypes: string;
    dimensions: string;
    shipmentStatus: string;
    trackingCode: string;
    createdAt: string; // Use `Date` if you parse this string to a Date object
    updatedAt: string; // Use `Date` if you parse this string to a Date object
  };
  
  export type ShipmentDetails = {
    weight: number;
    id: number;
    username: string;
    email: string;
    contact: string;
    packageName: string;
    packageTypes: string;
    dimensions: string;
    shipmentStatus: "Pending" | "Shipped" | "In Transit" | "Delivered" | "Cancelled";
    trackingCode: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  