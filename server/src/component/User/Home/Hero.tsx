

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import Navbar from "../Navbar/Navbar";
import cargoPlane from '../../../assets/port-de-barcelona-night.jpg'
import cargoPlanes from '../../../assets/eric-ak-HPYbhe20_4U-unsplash.jpg'
import cargoShip from '../../../assets/backgroundImg.jpg'
import cargoShips from '../../../assets/pexels-rafael-quaty-37077235-17443885.jpg'
import { ImageCarousel } from "./Carosel";
const images = [
 { url:"https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg"},
 { url:cargoPlane},
 { url:cargoPlanes},
 { url:cargoShip},
 { url:cargoShips},
];

const headings = [
  "Seamless Goods Tracking",
  "Global Shipping, Simplified",
  "Fast & Reliable Freight Transport",
  "Real-Time Cargo Monitoring",
  "Effortless Logistics Management",
];

const subtitles = [
  "Monitor your shipments every step of the way with our advanced tracking system.",
  "Connect your business to the world with smooth and efficient global shipping.",
  "Deliver faster with our optimized freight network and real-time updates.",
  "Stay informed with accurate cargo tracking and instant notifications.",
  "Streamline your supply chain with smart logistics and automated tracking.",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* Image Slideshow */}
      <div className="absolute inset-0">
        <ImageCarousel images={images} />
        <AnimatePresence mode="wait">
          {images.map((image, index) => (
            <motion.img
              key={index}
              src={image?.url}
              alt="Hero background"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={currentIndex === index ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Content with sliding text */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 bg-black/50">
        <motion.div
          key={currentIndex} // Ensure motion effect applies when index changes
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 20 }} // Moves from left to right
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="text-center text-white"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            Track With Confidence
          </motion.span>

          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          >
            {headings[currentIndex]}
          </motion.h1>

          <motion.p
            className="mx-auto mb-8 max-w-md text-lg text-gray-200"
          >
            {subtitles[currentIndex]}
          </motion.p>

          <motion.div>
            <Button className="rounded-full bg-white px-8 py-6 text-base font-medium text-black transition-all hover:scale-105 hover:bg-gray-100">
              Start Tracking
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
