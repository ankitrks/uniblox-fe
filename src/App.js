import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddToCart from './components/AddToCart/AddToCart';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import PurchaseDetails from './components/PurchaseDetails/PurchaseDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/products" /> : <Login onLogin={handleLogin} />}
          />
          <Route path="/products" element={isLoggedIn ? <AddToCart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/purchase-details" element={isLoggedIn ? <PurchaseDetails /> : <Navigate to="/login" />} />
          <Route
            path="/logout"
            element={isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
