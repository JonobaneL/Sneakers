import Footer from "./components/UI/footer/Footer"
import Header from "./components/Header/Header"
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import StoreRoute from "./routes/Routes";


function App() {
  return (
    <AuthProvider>
        <div className="App">
          <BrowserRouter>
            <Header/>
            <div className="content">
              <StoreRoute/>
            </div>
            <Footer/>
          </BrowserRouter>
        </div>
    </AuthProvider>
  )
}

export default App
