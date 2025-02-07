
import missionImg from '../../../assets/pexels-attie-9296985.jpg'
const About_Us = () => {
  return (
    <>
  
<div className="relative w-full pt-12 top-0 h-full  bg-cover bg-center">
  {/* Overlay */}
  <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>

  {/* Content */}
  <div className="relative w-full flex flex-col justify-center items-center text-center h-[50vh] text-white">
    <h1 className="font-bold lg:text-4xl sm:text-xl md:text-xl">
      LuckyXpress Cargo
    </h1>
    <p className="p-4 text-lg px-8">
      At LuckyXpressCargo, we understand that knowing the status of your shipment<br></br> is crucial. That’s why we’ve implemented an advanced tracking system designed <br></br>to give you complete visibility and peace of mind throughout the entire delivery process.
    </p>
  </div>
</div>

<div className="w-full bg-gray-50 h-full mx-auto  text-neutral-600 py-16 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8  items-center py-4 mx-8">
        {/* Text Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="font-bold text-gray-900 text-4xl mb-4">Our Mission</h1>
          <p className="text-lg leading-relaxed mb-4">
            Our courier system is dedicated to providing fast, reliable, and secure delivery <br />
            services that connect communities locally and globally. We prioritize speed, efficiency, <br />
            and customer satisfaction while ensuring the safe handling of every package. <br/>
          </p>
          
          <p className="text-lg leading-relaxed mt-4">By leveraging advanced technology and sustainable practices, <br />
          we aim to transform the delivery experience and earn the trust of our customers every step of the way.</p>
         
        </div>
        
        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={missionImg}
            alt="Our Mission"
            className="max-w-full h-auto rounded shadow-lg"
          />
        </div>
      </div>
    </div>
</>

  )
}

export default About_Us