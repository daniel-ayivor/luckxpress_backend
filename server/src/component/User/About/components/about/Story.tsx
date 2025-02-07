import React from 'react';
import { FaLightbulb, FaRegStar } from 'react-icons/fa';
import { FaRegHandshake } from 'react-icons/fa6';
import { PiTargetBold } from 'react-icons/pi';

// Array of feature objects containing title, description, and icon component
const features = [
  {
    title: "Innovation",
    description: "Committed to excellence in every delivery.",
    icon: FaLightbulb,
  },
  {
    title: "Reliability",
    description: "Dependable and on-time delivery every time.",
    icon: FaRegStar,
  },
  {
    title: "Integrity",
    description: "Transparent and honest service is our hallmark.",
    icon: FaRegHandshake,
  },
  {
    title: "Speed",
    description: "Swift delivery with optimized logistics.",
    icon: PiTargetBold,
  },
];

const Story = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center">
      <span className="inline-block px-4 py-1 mb-4 text-sm font-medium bg-gray-100 rounded-full">
        Our Story
      </span>
      <h2 className="text-4xl font-bold mb-6">Delivering Excellence Since 2010</h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        We started with a simple mission: to revolutionize the way packages are delivered.
        Today, we're proud to be one of the most trusted names in courier services,
        combining cutting-edge technology with personalized care to ensure your
        deliveries arrive safely and on time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {features.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="p-6 rounded-lg bg-gray-50 transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="text-4xl text-indigo-500 mb-4">
              <Icon />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Story;
