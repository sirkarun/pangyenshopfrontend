import {

  Routes,
  Route

} from "react-router-dom";
import Pos from "./pages/Pos";
import Order from "./pages/Order";
import Newproduct from "./pages/newproduct";
import Navbar from "./Navbar";




function App() {
 
  return (
    <div>
    <Navbar/>
  
    <Routes>
      <Route path="/" element={<Pos/>} />
      <Route path="/pos" element={<Pos/>} />
      <Route path="/order" element={<Order/>} />
      <Route path="/new" element={<Newproduct/>} />
    </Routes>

    </div>
  );
}

export default App;
