// import { useState } from "react";
// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";

// const Tracking = () => {
//     const [trackingCode, setTrackingCode] = useState<string>("");
//     const [shipmentDetails, setShipmentDetails] = useState<any>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);

//     const handleTrackInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setTrackingCode(e.target.value);
//     };

//     const fetchTrackingDetails = async () => {
//         if (!trackingCode.trim()) {
//             setError("Please enter a tracking code.");
//             return;
//         }
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(`http://localhost:5000/track/shipments/${trackingCode}`);
//             if (!response.ok) {
//                 throw new Error("Tracking code not found.");
//             }

//             const data = await response.json();
//             setShipmentDetails(data.shipment);
//         } catch (err) {
//             setError((err as Error).message);
//             setShipmentDetails(null);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="flex justify-center items-center min-h-screen">
//                 <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 bg-gray-100 px-4 py-20 lg:px-20">
//                     <div className="flex w-full justify-center">
//                         <div className="relative w-full max-w-7xl flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
//                             <div className="m-10">
//                                 <div className=" relative border border-gray-900 p-1 focus-within:ring-1 focus-within:ring-gray-900 sm:flex-row">
//                                     <input 
//                                         type="text"
//                                         placeholder="Enter tracking code"
//                                         value={trackingCode}
//                                         onChange={handleTrackInput}
//                                         className="block text-xs w-full bg-transparent px-4 py-2 placeholder-gray-900 outline-none"
//                                     />
//                                     <div className="flex border-gray-900 sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:border-l">
//                                         <button 
//                                             type="button"
//                                             disabled={loading}                                    
//                                         onClick={fetchTrackingDetails}
//                                             className="inline-flex w-full items-center justify-center bg-slate-900 px-6 py-2 text-sm font-bold text-white outline-none transition-all sm:hover:translate-x-2 sm:hover:-translate-y-2 hover:bg-gray-600 focus:bg-gray-600"
//                                         >
//                                              {loading ? "Tracking..." : "Track"}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {error && <p className="text-red-600 mt-3">{error}</p>}

//                     {shipmentDetails && (
//                     <div className="flex w-72 justify-center">
//                         <div className="relative w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
//                             <hr className="opacity-50" />
//                             <div className="p-4">
//                                 <p className="font-light">
//                                     <span className="text-sm font-bold text-red-600">-3% </span>vs last month
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Tracking;




import { useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-hot-toast";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Tracking = () => {


    const [trackingCode, setTrackingCode] = useState<string>("");
    const [shipmentDetails, setShipmentDetails] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleTrackInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingCode(e.target.value);
    };

     const fetchTrackingDetails = async () => {
         if (!trackingCode.trim()) {
             setError("Please enter a tracking code.");
             return;
         }
         setLoading(true);
         setError(null);

         try {
             const response = await fetch(`http://localhost:5000/track/shipments/${trackingCode}`);
             if (!response.ok) {
                 throw new Error("Tracking code not found.");
             }

             const data = await response.json();
             setShipmentDetails(data.shipment);
         } catch (err) {
             setError((err as Error).message);
             setShipmentDetails(null);
         } finally {
             setLoading(false);
         }
     };

  return (
    <div className="">

<Navbar />
    <div className="min-h-screen pt-8">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold mb-4">Track Your Shipment</h1>
          <p className="text-gray-600">
            Enter your tracking number to get real-time updates
          </p>
        </div>


                    <div className="flex justify-center items-center min-h-screen">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 bg-gray-100 px-4 py-20 lg:px-40">
                    <div className="flex w-full justify-center">
                        <div className="relative w-full max-w-7xl flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                            <div className="m-10">
                                <div className="relative w-full border border-gray-900 p-1 focus-within:ring-1 focus-within:ring-gray-900 sm:flex-row">
                                    <input 
                                        type="text"
                                        placeholder="Enter tracking code"
                                        value={trackingCode}
                                        onChange={handleTrackInput}
                                        className="block text-xs  w-96 bg-transparent px-4 py-2 placeholder-gray-900 outline-none"
                                    />
                                    <div className="flex border-gray-900 sm:absolute sm:inset-y-0 sm:right-0 sm:h-full sm:border-l">
                                        <button 
                                            type="button"
                                            disabled={loading}                                    
                                        onClick={fetchTrackingDetails}
                                            className="inline-flex w-full items-center justify-center bg-slate-900 px-6 py-2 text-sm font-bold text-white outline-none transition-all  hover:bg-gray-600 focus:bg-gray-600"
                                        >
                                             {loading ? "Tracking..." : "Track"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {error && <p className="text-red-600 mt-3">{error}</p>}

                    {shipmentDetails && (
                    <div className="flex w-full justify-center">
                        <div className="relative w-full max-w-full flex-col break-words rounded-lg border border-gray-100 bg-white text-gray-600 shadow-lg">
                            <hr className="opacity-50" />
                            <div className="p-4">
                                <p className="font-light">
                                    <span className="text-sm font-bold text-red-600">-3% </span>vs last month
                                </p>
                            </div>
                        </div>
                    </div>

                    )}
                </div>
            </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default Tracking;
