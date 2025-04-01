import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';
import './App.css'; // Import CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">Customer & Order Management</h1>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Customers</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<CustomerForm />} />
            <Route path="/orders" element={<OrderForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
