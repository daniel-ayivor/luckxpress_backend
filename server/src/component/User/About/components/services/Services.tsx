import { Truck, Package, MapPin } from 'lucide-react';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Same-day delivery service for urgent packages with real-time tracking and guaranteed safety."
  },
  {
    icon: Package,
    title: "Secure Packaging",
    description: "Professional packaging service ensuring your items are protected throughout their journey."
  },
  {
    icon: MapPin,
    title: "Global Shipping",
    description: "Worldwide delivery services with customs handling and international tracking capabilities."
  }
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-gray-100 rounded-full">
          Our Services
        </span>
        <h2 className="text-4xl font-bold mb-6">Delivery Solutions</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We offer comprehensive delivery solutions tailored to your needs, 
          ensuring your packages arrive safely and on time.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            {...service}
          />
        ))}
      </div>
      
    </div>
  );
};

export default Services;