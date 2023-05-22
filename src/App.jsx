import Footer from "./components/UI/footer/Footer"
import Header from "./components/Header/Header"
import { BrowserRouter } from "react-router-dom";
import StoreRoute from "./components/StoreRoute";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
  <CartProvider>
    <div className="App">
     <BrowserRouter>
        <Header/>
        <div className="content">
          <StoreRoute/>
        </div>
          <Footer/>
     </BrowserRouter>
    </div>
    </CartProvider>
  )
}

export default App
