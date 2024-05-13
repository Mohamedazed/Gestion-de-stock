import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Receipt from '../components/sales/Receipt';
import Calendar from 'react-calendar';

export default function PanierEmp() {
    const [cartItems, setCartItems] = useState([]);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [refreshPanier, setRefreshPanier] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
  
    useEffect(() => {
      fetchCartItems();
    }, [refreshPanier]);
  
    const fetchCartItems = () => {
      axios.get('http://localhost:8081/cart')
        .then(result => { 
          setCartItems(result.data.result);
        })
        .catch(error => {
          console.log('Error fetching cart items:', error);
        });
    };
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8081/cart/delete/${id}`)
        .then(() => {
          setCartItems(prevCartItems => prevCartItems.filter((cart) => cart.id !== id));
        })
        .catch((err) => console.log(err));
    };  
  
    const handleConfirm = () => {
      axios.post('http://localhost:8081/sales', cartItems)
        .then(response => {
          console.log('Products confirmed:', response.data); 
          setConfirmed(true); 
          setShowReceiptModal(true);
        })
        .catch(error => {
          console.log('Error confirming products:', error);
        });
    };
  
    const handleCloseReceiptModal = () => {
      setShowReceiptModal(false);
      setRefreshPanier(prev => !prev);
    };
  
    return (
      <aside className="aside-section me-4 mt-5">
        <div className='container ' >
          <div className='row mb-4'>
            <div className='border shadow p-3 rounded-5 border border-warning'>
              <div className='d-flex justify-content-between'>
                <h4 style={{color: 'brown'}}><b>Panier</b></h4>
                <span className='mt-1'><Link className='save bg-warning border border-dark' to='/employe/prodE'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mb-1 bi bi-cart-plus-fill" viewBox="0 0 16 16"><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1.5a.5.5 0 0 0 .528.47l.5-8a.5.5 0 0 0-.998-.06l.5 8a.5.5 0 0 0 .47.53zm11 0a.5.5 0 0 0 .528-.47l.5-8a.5.5 0 0 0-.998-.06l.5 8a.5.5 0 0 0 .47.53zm-12.251-9.25a.5.5 0 0 0-.5 0L2.75 8.561a.5.5 0 0 0 .5.866l1.499-.866a.5.5 0 0 0 0-.866z"/></svg> Buy </Link></span>
              </div><hr/>
              <div>
                {cartItems.map(item => (
                  <div key={item.id} className='row'>
                    <div className="d-flex justify-content-between">
                    <div >
                    <img src={`http://localhost:8081/${item.image}`} alt={item.name} style={{ width: '70px', height: '70px' }} className='col-sm-6 mb-2 rounded-circle'/>
                    <h5><b>{item.name}</b></h5>
                    </div>
                    <div className='col-sm-6 mt-1'>
                      <div>
                        <span className=' ' style={{color: 'gold'}}><b>{item.price} DH</b></span>
                        <p style={{ color: 'gray' ,marginBottom: '12px'}}> {item.quantity} pieces</p>
                        <button className='btn bg-danger-subtle rounded-pill border border-dark ' onClick={() => handleDelete(item.id)} style={{marginRight: '-52%'}}>Delete <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 0 .528.47l.5 8.5a.5.5 0 0 0-.998.06l.5-8.5a.5.5 0 0 0 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg></button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            
            <div className=' boder shadow p-3 mt-4 rounded-5 border border-warning'>
              <h4 style={{color: 'brown'}}><b>Estimate</b><hr/></h4>
              <div>
                <div className='d-flex justify-content-between mt-4'><p style={{ color: 'gray' }}>Total:</p> <p>{cartItems.length} Products</p></div><hr/>
                <h4 className='d-flex justify-content-between'><p style={{ color: 'gray' }}>Total Price: </p> <p><b>{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)} DH</b></p></h4>
                  {cartItems.length === 0 ? (
                    <button className="btn bg-primary-subtle shadow w-100 btn-lg rounded-pill" disabled>Confirm</button>
                  ) : (
                    <>
                      {confirmed ? (
                        <>
                          {showReceiptModal && <Receipt products={cartItems} onClose={handleCloseReceiptModal} />}
                          <button className="btn bg-primary-subtle shadow w-100 btn-lg rounded-pill" onClick={() => window.print()}>Print</button>
                        </>
                      ) : (
                        <button className="btn bg-primary-subtle shadow w-100 btn-lg rounded-pill" onClick={handleConfirm}>Confirm</button>
                      )}
                    </>
                  )}
  
              </div>
            </div>

            <div className="mt-4 border p-4 me-5 ps-5 rounded-5 border-warning shadow ">
            <Calendar className='ms-4 border-warning shadow-sm rounded-5 '/>
          </div>
          </div>
        </div>
      </aside>
    );
  }
