import { icons } from "lucide-react";
import ServiceCard from "../About/components/services/ServiceCard";
import ServiceGallery from "./ServiceGallery";
import { motion, AnimatePresence } from "framer-motion";
import Services from "../About/components/services/Services";

const Service = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"></div>

      {/* Content Section */}
      <div className="relative z-10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 30 }} // Moves from left to right
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-balance">
              Why should you choose our service
            </motion.h1>
            <div className="mx-auto mt-2 h-1 w-16 bg-indigo-600"></div> {/* Bar beneath title */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 30 }} // Moves from left to right
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="mt-6 text-lg/8 text-gray-600">
              We have same day delivery services for people who want their packages and goods delivered within 24hrs or less.
            </motion.p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

              {/* Feature Item */}
              {[
                { title: "In Time Delivery", description: "Lifeline Shipping Company runs various shipping methods: road, air, and ocean freight services." },
                { title: "Safe Packing", description: "We offer fast economical air freight services. Your goods are safe with us!" },
                { title: "Fastest Shipping", description: "We deliver our goods within the stipulated time, often even earlier!" },
                { title: "Ship Everywhere", description: "We ship globally with seamless logistics and tracking." }
              ].map((item, index) => (
                <div key={index} className="relative pl-16">
                  <motion.dt
                    className="text-base font-semibold text-gray-900">
                    <motion.div initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 20 }} // Moves from left to right
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                      {/* Icon Placeholder */}
                      <svg

                        className="size-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                    </motion.div>
                    <motion.span initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 30 }} // Moves from left to right
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      className="">

                      {item.title}
                    </motion.span>
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 30 }} // Moves from left to right
                      exit={{ opacity: 0, x: 100 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                      className="w-16 h-1 bg-indigo-600 mt-2"></motion.div> {/* Bar beneath subtitle */}
                  </motion.dt>
                  <motion.dd
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 30 }} // Moves from left to right
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    className="mt-2 text-base text-gray-600">{item.description}</motion.dd>
                </div>
              ))}

            </dl>
          </div>
        </div>
      </div>
      <ServiceGallery />
      <Services />
    </div>
  );
};

export default Service;
