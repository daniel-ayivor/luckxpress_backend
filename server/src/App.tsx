import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import
import Login from './component/Auth/Login';
import SignUp from './component/Auth/Signup';
import { QueryClient } from "@tanstack/react-query";
import Index from './component/Admin/Index/Index';
import Tracking from './component/User/Tracking/Tracking';

import Register from './component/Admin/RegisterAdmin/Register';
import Analytics from './component/Admin/Analytics/Analytics';
import Home from './component/User/Home/Home';
import Services from './component/User/Services/Services';
import Contact from './component/User/Contact/Contact';
import About from './component/User/About/About';
import Trackings from './component/Admin/Trackings/Trackings';



const queryClient = new QueryClient();

function App() {
  return (

  
   < >


        <Router>
          <Routes>
            
            {/* Add other routes here */}
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/track" element={<Tracking />} />
            <Route path="/service" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
  
            {/* dashboard */}
            <Route path="/index" element={<Index />} />
            <Route path="/tracking" element={<Trackings/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Router>
   </>
  
  );
}

export default App;
