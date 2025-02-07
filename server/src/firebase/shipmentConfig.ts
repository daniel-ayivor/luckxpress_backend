 // Import Firestore setup
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "./config";

export const submitShipmentDetails = async (packageDetails: any) => {
  const trackingCode = uuidv4();  // Generate unique tracking code
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;  // Initially the created and updated time are the same

  const shipmentDetails = {
    userDetails:{
 username:packageDetails.username,
 email:packageDetails.email,
 contact:packageDetails.contact
    },
    packageDetails: {
      packageName: packageDetails.packageName,
      packageTypes: packageDetails.packageTypes,
      weight: packageDetails.weight,
      dimensions: packageDetails.dimensions,
      shipmentStatus: packageDetails.shipmentStatus,
    },
    trackingCode,  // Add tracking code to the details
    timestamps: {
      createdAt,
      updatedAt,
    },
  };

  try {
    // Store shipment details in Firestore
    await setDoc(doc(db, "shipments", trackingCode), shipmentDetails);
    console.log("Shipment details saved successfully");
  } catch (error) {
    console.error("Error saving shipment details:", error);
  }
};
