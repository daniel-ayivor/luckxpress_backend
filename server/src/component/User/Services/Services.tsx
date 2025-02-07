
import Service from '../Service/Service'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { ServiceCarousel } from './ServiceCaroul'
const Services = () => {
  return (
    <div className=' overflow-x-hidden'>
    <ServiceCarousel />
        <Navbar />
        <Service />
        <Footer />
    </div>
  )
}

export default Services