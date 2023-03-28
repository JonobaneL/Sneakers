import Footer from "./components/UI/footer/Footer"
import Header from "./components/UI/header/Header"
import { BrowserRouter } from "react-router-dom";
import StoreRoute from "./components/StoreRoute";




function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Header/>
        <StoreRoute/>
        <Footer/>
     </BrowserRouter>
     
    </div>
  )
}

export default App
