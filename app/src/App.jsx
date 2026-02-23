import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

export const BASE_URL = "https://foodzone-application.onrender.com";
// export const BASE_URL = "http://localhost:9000";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;