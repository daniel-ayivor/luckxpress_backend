import cargoPlane from '../../../assets/port-de-barcelona-night.jpg'
import cargoShip from '../../../assets/backgroundImg.jpg'
import cargoShips from '../../../assets/pexels-rafael-quaty-37077235-17443885.jpg'
import {motion} from 'framer-motion'

const ServiceGallery = () => {
  return (

    <div className="flex min-h-screen w-screen">
      <div className="relative my-auto mx-auto flex flex-col px-4 sm:max-w-xl md:max-w-screen-xl md:flex-row">
   
        <div className="mx-auto flex w-full max-w-xl lg:max-w-screen-xl">
          <div className="mb-16 lg:my-auto lg:max-w-lg">
            <div className="mb-6 max-w-xl">
              <div>
                <motion.p   initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: -20 }} // Moves from left to right
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }} className="bg-teal-accent-400 mb-2 inline-block rounded-full bg-lime-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-900">25% off this summer</motion.p>
              </div>
              <motion.h2   initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -20 }} // Moves from left to right
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }}
           className="mb-6 max-w-lg text-3xl font-extrabold text-slate-700 sm:text-5xl sm:leading-snug">
  Experience Fast & Secure <br />
  Delivery Across  
  <motion.span 
    // initial={{ opacity: 0, y: 60 }}
    //       animate={{ opacity: 1, y: -20 }} // Moves from left to right
    //       exit={{ opacity: 0, y: 100 }}
    //       transition={{ duration: 3, ease: "easeInOut" }}
           className="rounded bg-gradient-to-r inline-block bg-sky-400 from-lime-400 to-sky-400 px-2 font-bold text-white">
  Delivery Across  
  </motion.span>
</motion.h2>

<motion.p   initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: -20 }} // Moves from left to right
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }} className="text-base text-gray-700 md:text-lg">
  We ensure fast, secure, and reliable delivery for your packages.  
  Whether it's local or international, our trusted courier service gets  
  your shipment to its destination on time, every time.
</motion.p>

            </div>
            <motion.div   initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 20 }} // Moves from left to right
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }}
           className="flex items-center">
              <a href="/about" className="bg-sky-400a mr-6 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-sky-400 px-8 font-medium tracking-wide text-white shadow-lg shadow-sky-300 outline-none transition duration-200 hover:scale-110 hover:bg-sky-500 focus:ring"> Get started </a>
              <a href="/about" className="inline-flex items-center font-semibold text-sky-400 transition-colors duration-200 hover:text-lime-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
                Watch Videos</a >
            </motion.div>
          </div>
        </div>

        <div className="flex h-full w-full space-x-3 overflow-hidden md:justify-end">
     
          <div className="hidden w-56 items-center space-y-3 lg:flex">
            <motion.div   initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -20 }} // Moves from left to right
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }}
           className="overflow-hidden rounded-xl bg-yellow-400">
              <img className="h-full w-full object-cover" src={cargoShips} alt="" />
            </motion.div>
          </div>
          <motion.div   initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -20 }} // Moves from left to right
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 3, ease: "easeInOut" }}
           className="w-full flex-col space-y-3 rounded-xl py-4 lg:flex lg:w-80">
            <div className="h-40 overflow-hidden rounded-xl bg-green-600/60">
              <img className="mx-auto h-full w-full object-cover" src={cargoShip} alt="" />
            </div>
            <div className="h-40 overflow-hidden rounded-xl bg-pink-600/60">
              <img className="mx-auto h-full w-full object-cover" src={cargoPlane} alt="" />
            </div>
            <div className="h-40 overflow-hidden rounded-xl bg-blue-600/60">
              <img className="mx-auto h-full w-full object-cover" src="https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1342&q=80" alt="" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
    
  )
}

export default ServiceGallery