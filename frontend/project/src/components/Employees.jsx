import React from 'react'
import { Link } from "react-router-dom";

export default function Employees() {
    return(
        <div className='container' >
            <div style={{marginTop:'70px'}}>
                <h3 >All Employees</h3>
                <p>
                    <span><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard </Link></span>
                    / <span style={{ color: 'gray' }}>Employees</span>
                </p>
            </div>

        </div>
    )
}
