import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"


import Navbar from "./components/navbar";
import Footer from "./components/Footer";


import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import Settings from "./Pages/Settings";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import RecipePage from "./Pages/RecipePage";



function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container main">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path='/login' element={<Login/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/recipepage' element={<RecipePage/>} />
        

        </Routes>

       
      </div>
      <Footer />

    </Router>
   
  );
}

export default App;
