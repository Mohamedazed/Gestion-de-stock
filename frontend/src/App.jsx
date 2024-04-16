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
import Sidebar from './components/Sidebar';
import Create from './components/categories/Create';
import Show from './components/categories/Show';
import Edit from './components/categories/Edit';
import CreateProd from './components/products/createProd';
import CreateSupp from './components/suppliers/CreateSupp';
import EditSupp from './components/suppliers/EditSupp';
import ShowSupp from './components/suppliers/ShowSupp';
import ShowProd from './components/products/ShowProd';
import EditProd from './components/products/EditProd';
import { Modal } from 'bootstrap';
import Types from './components/employes/types/types';
import Employees from './components/employes/Employees';
import CreateEmp from './components/employes/CreateEmp';
import EditEmp from './components/employes/EditEmp';
import EditType from './components/employes/types/EditType';
import CreateType from './components/employes/types/CreateType';
import EditProfil from './components/profiles/EditProfil';
import Profile from './components/profiles/Profile';
import Purchases from './components/sales/Purchases';
import Sales from './components/sales/Sales';
import Panier from './components/sales/Panier';
import Receipt from './components/sales/Receipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/receipt" element={<Receipt/>} />
        <Route
          path="/*"
          element={
            <div>
              <Sidebar >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/create" element={<CreateEmp />} />
                <Route path="/employees/edit/:id" element={<EditEmp />} />
                <Route path="/types" element={<Types />} />
                <Route path="/employees/types/create" element={<CreateType/>} />
                <Route path="/employees/types/edit/:id" element={<EditType />} />
                <Route path="/profile/:id" element={<Profile/>} />
                <Route path="/profile/edit/:id" element={<EditProfil />} />
                <Route path="/categories/create" element={<Create />} />
                {/* <Route path="/show/:id" element={<Show />} /> */}
                <Route path="/show/:id" element={<Modal />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path='/products/create' element={<CreateProd/>}/>
                <Route path='/products/edit/:id' element={<EditProd/>}/>
                <Route path='/products/show/:id' element={<ShowProd/>} />
                <Route path='/suppliers/create' element={<CreateSupp/>}/>
                <Route path="/suppliers/edit/:id" element={<EditSupp />} />
                <Route path="/suppliers/show/:id" element={<ShowSupp/>} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/purchases" element={<Purchases />} />
                {/* <Route path="/receipt" element={<Receipt/>} /> */}
              </Routes>
              </Sidebar >
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
