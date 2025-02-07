import About from "../About/About"
import AboutCards from "../About/components/about/AboutCards"
import Story from "../About/components/about/Story"
import Footer from "../Footer/Footer"
import Service from "../Service/Service"
import Hero from "./Hero"
import StatNumber from "./Stats/Stats"


const Home = () => {
  return (
    <div className="w-full overflow-x-hidden">
    <Hero />
    <div className="grid grid-cols-2 md:grid-cols-4 justify-center items-center h-[40vh] md:h-[40] lg:h-[20vh] mt-16 mb-16 gap-4">
      <StatNumber value={150} label="Active Projects" duration={3000} delay={1000} />
      <StatNumber value={250} label="Team Members" duration={3000} delay={1500} />
      <StatNumber value={150} label="Global Routes" delay={0} />
      <StatNumber value={500} label="Satisfied Clients" delay={200} />
    </div>
  
    <Story />
    <AboutCards />
    {/* <About /> */}
    <Service />
    <Footer />
  </div>
  
  )
}

export default Home