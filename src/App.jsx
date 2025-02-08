import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"


import Navbar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import Login from './pages/Login'
import Register from "./pages/Register";
import RecipePage from "./pages/RecipePage";
import VerifyOtp from "./pages/VerifyOtp"
import ProtectedRoute from "./common/ProtectedRoute";
import { AuthProvider } from "./hooks/UseAuthContext";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verify' element={<VerifyOtp />} />
                    <Route path="/recipe/:id" element={<RecipePage />} />
                <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path='/recipepage' element={<ProtectedRoute><RecipePage /></ProtectedRoute>} />
            </Routes>
        </Router>

    );
}

export default App;
