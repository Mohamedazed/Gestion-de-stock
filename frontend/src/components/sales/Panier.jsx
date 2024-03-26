import React from 'react'
import { Link } from 'react-router-dom'
import Products from './../products/Products';

export default function Panier() {
  return (
    <div className='container'>
      <div style={{ marginTop: '70px' }}>
        <h3>Panier</h3>
        <p>
          <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link></span>
          / <span style={{ color: 'gray' }}>Panier</span>
        </p>
      </div>
      <div className='row'>
        <div className='col-sm-6'>
          <h4>Panier</h4><hr/>
          <div>
            // add her the image and name and price of product previos adding in panier and 
          </div>
        </div>
        <div className='col-sm-4'>
          <h4>Estimate</h4><hr/>
          <div>
            // add her the number of pieces user want to by this Products
            // and total : price DH
            // button confirmed when user click this button redirect it to impreme recu d'achat
          </div>
        </div>
      </div>
    </div>
  )
}
