import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Categories from './components/categories/Categories';
import Products from './components/products/Products';
import Suppliers from './components/suppliers/Suppliers';
import Profile from './components/Profile';
import Employees from './components/Employees';
import Sidebar from './components/Sidebar';
import Create from './components/categories/Create';
import Show from './components/categories/Show';
import Edit from './components/categories/Edit';
import CreateProd from './components/products/createProd';
import CreateSupp from './components/suppliers/CreateSupp';
import EditSupp from './components/suppliers/EditSupp';
import ShowSupp from './components/suppliers/ShowSupp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <div>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories/create" element={<Create />} />
                <Route path="/show/:id" element={<Show />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path='/products/create' element={<CreateProd/>}/>
                <Route path='/suppliers/create' element={<CreateSupp/>}/>
                <Route path="/suppliers/edit/:id" element={<EditSupp />} />
                <Route path="/suppliers/show/:id" element={<ShowSupp/>} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
