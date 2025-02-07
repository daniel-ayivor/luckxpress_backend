import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import cargoPlane from '../../../assets/port-de-barcelona-night.jpg'
import cargoPlanes from '../../../assets/eric-ak-HPYbhe20_4U-unsplash.jpg'
import cargoShip from '../../../assets/backgroundImg.jpg'
import cargoShips from '../../../assets/pexels-rafael-quaty-37077235-17443885.jpg'
const images = [
    {
      url: cargoPlane,
      alt: 'Professional courier in office',
      title: 'Professional Excellence',
      description: 'Our skilled team ensures every package is handled with care and delivered on time. Our professional couriers are trained to handle your deliveries with the utmost attention and precision, ensuring your items arrive safely and promptly.',
    },
    {
      url: cargoShip,
      alt: 'Modern delivery management',
      title: 'Smart Logistics',
      description: 'Using advanced technology, we optimize delivery routes for efficiency and reliability. Our logistics solutions ensure that your shipments are routed through the most effective paths, reducing delivery times and improving cost-efficiency.',
    },
    {
      url: cargoShips,
      alt: 'Future of delivery',
      title: 'Innovation First',
      description: 'We continuously innovate with AI and automation to improve courier services. From automated sorting facilities to AI-powered route optimization, we are always looking for ways to revolutionize the delivery industry and provide faster, smarter, and more sustainable services.',
    },
  ];
  

export const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const nextSlide = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const previousSlide = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(nextSlide, 1000); // Changed to 500ms interval
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const NavigationButton = ({ 
    onClick, 
    children, 
    className 
  }: { 
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 p-2 rounded-full",
        "bg-white/20 backdrop-blur-sm border border-white/10",
        "hover:bg-white/30 transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-white/50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      aria-label="Navigation button"
    >
      {children}
    </button>
  );

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <img
          src={`${images[currentIndex].url}?auto=format&fit=crop&w=2000&q=80`}
          alt={images[currentIndex].alt}
          className={cn(
            "absolute w-full h-full object-cover",
            "animate-fade-in",
            direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'
          )}
        />
        {/* Caption Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/60">
          <div className="text-center px-4 py-8">
            {/* <p className="text-white text-sm tracking-wider uppercase mb-2">
              {`${currentIndex + 1} / ${images.length}`}
            </p> */}
            <h2 className="text-white text-4xl font-bold mb-4">
              {images[currentIndex].title}
            </h2>
            <p className="mx-auto mb-8 max-w-md text-lg text-gray-200">
              {images[currentIndex].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <NavigationButton
        onClick={previousSlide}
        className="left-4"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </NavigationButton>

      <NavigationButton
        onClick={nextSlide}
        className="right-4"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </NavigationButton>

      {/* Progress Indicators */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'right' : 'left');
              setCurrentIndex(index);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              "focus:outline-none focus:ring-2 focus:ring-white/50",
              index === currentIndex 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
