import React from 'react'
import { Link } from 'react-router-dom'

export default function Sales() {
  return (
    <div className='container'>
      <div style={{marginTop:'70px'}}>
                <h3 >Sales</h3>
                <p>
                    <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
                    / <span style={{ color: 'gray' }}>Sales</span>
                </p>
            </div>
    </div>
  )
}
