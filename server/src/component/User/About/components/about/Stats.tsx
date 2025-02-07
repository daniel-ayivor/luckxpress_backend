import { useState, useEffect } from 'react';
import { Truck, Package, MapPin, Users } from 'lucide-react';

const stats = [
  { icon: Truck, label: "Deliveries", value: "10K+", suffix: "" },
  { icon: Users, label: "Happy Clients", value: "5000", suffix: "+" },
  { icon: Package, label: "Packages", value: "15", suffix: "M+" },
  { icon: MapPin, label: "Locations", value: "50", suffix: "+" },
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-24 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-12">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`stat-card fade-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <stat.icon className="w-8 h-8 mb-4 text-gray-600" />
          <h3 className="text-3xl font-bold mb-2">
            {stat.value}
            <span className="text-gray-500">{stat.suffix}</span>
          </h3>
          <p className="text-gray-600">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;

