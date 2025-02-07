import { Card, CardContent } from "@/components/ui/card";
import { Ship, Truck, Package } from "lucide-react";
import photo1 from '../../../../../assets/pexels-tomfisk-3856433.jpg'
import photo2 from '../../../../../assets/markus-winkler-V0WETbEXG5Y-unsplash.jpg'
import photo4 from '../../../../../assets/elias-8QOpH6i3eQI-unsplash.jpg'
const AboutCards = () => {
  const galleryItems = [
    {
      title: "Cargo Ships",
      description: "Our fleet of modern cargo ships for international shipping",
      icon: <Ship className="w-12 h-12 text-primary" />,
      image: photo1
    },
    {
      title: "Freight Trucks",
      description: "Reliable ground transportation across the country",
      icon: <Truck className="w-12 h-12 text-primary" />,
      image: photo2
    },
    {
      title: "Cargo Services",
      description: "Comprehensive cargo handling and logistics",
      icon: <Package className="w-12 h-12 text-primary" />,
      image: photo4
    }
  ];

  return (
    <div className="container mx-auto px-4 lg:px-28 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Fleet Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, index) => (
          <Card key={index} className="hover-lift overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <img
                src={`${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AboutCards;