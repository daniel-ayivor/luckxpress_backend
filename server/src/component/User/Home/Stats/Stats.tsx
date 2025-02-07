import { useEffect, useState } from "react";
import { Folder, Users, MapPin, Smile } from "lucide-react"; // Import icons
import { motion, AnimatePresence } from "framer-motion";
interface StatProps {
  value: number;
  label: string;
  duration?: number;
  delay?: number;
}

const StatNumber = ({ value, label, duration = 2000, delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, duration, delay]);

  // Function to get the correct icon based on label
  const getIcon = (label: string) => {
    switch (label) {
      case "Active Projects":
        return <Folder className="text-2xl text-blue-950 mr-3" />;
      case "Team Members":
        return <Users className="text-2xl text-blue-950 mr-3" />;
      case "Global Routes":
        return <MapPin className="text-2xl text-blue-950 mr-3" />;
      case "Satisfied Clients":
        return <Smile className="text-2xl text-blue-950 mr-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="text-center">
      <motion.div
        
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 30 }} 
         exit={{ opacity: 0, y: 100 }}
         transition={{ duration: 3, ease: "easeInOut" }}
       className="flex items-center text-gray-800 justify-center mb-2">
        {/* Icon and count side by side */}
        {getIcon(label)}
        <span className="text-4xl md:text-5xl font-bold text-gray-800">{count}+</span>
      </motion.div>
      <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 30 }} 
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 3, ease: "easeInOut" }}
       className="text-sm md:text-base text-gray-600">{label}</motion.div>
    </div>
  );
};

export default StatNumber;
