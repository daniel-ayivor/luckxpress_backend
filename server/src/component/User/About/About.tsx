import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import About_Us from "./About_Us"
import AboutCards from "./components/about/AboutCards"
import Stats from "./components/about/Stats"
import Story from "./components/about/Story"
import Testimony from "./components/about/Testimony"


const About = () => {
  return (
    <div>
   <Navbar />
   <About_Us/>
    <Stats />
 <Story />
 {/* <AboutCards /> */}
 <Testimony />
 <Footer />
    </div>
  )
}

export default About